import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { saveReservation, saveIdentity, getCachedRoute, saveToCache, checkQuotaAndIncrement, checkUserQuotaAndIncrement } from './db.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the root directory
app.use(express.static(__dirname));

// PROXY for Google Routes API (v2) (High precision, modern protocol)
app.get('/api/route', async (req, res) => {
    const { origin, destination, points, user } = req.query;
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;

    if (!apiKey) {
        return res.status(500).json({ error: 'Google Maps API key not configured on server' });
    }

    // 1. GENERATE CACHE KEY
    const routeKey = points ? `POINTS:${points}` : `${origin}|${destination}`;

    try {
        // 2. CHECK CACHE FIRST
        const cached = await getCachedRoute(routeKey);
        if (cached) {
            console.log(`[SERVER] Serving from CACHE: ${routeKey} (${cached.dist_km} km)`);
            return res.json({
                distKm: cached.dist_km,
                durationMin: cached.duration_min,
                source: 'cache'
            });
        }

        // 3. CHECK GLOBAL QUOTA (Limit 9999)
        const quota = await checkQuotaAndIncrement(9999);
        if (!quota.allowed) {
            console.warn(`[SERVER] Quota Reached (${quota.currentCount}/9999). Blocking Google API call.`);
            return res.status(429).json({
                error: 'Monthly Quota Reached',
                msg: 'Le quota mensuel Google est atteint. Utilisation du calcul de secours.'
            });
        }

        // 3.5 CHECK USER DAILY QUOTA (Limit 4)
        const userQuota = await checkUserQuotaAndIncrement(user, 4);
        if (!userQuota.allowed) {
            console.warn(`[SERVER] User Quota Reached for ${user}. Blocking Google API call.`);
            return res.status(429).json({
                error: 'User Quota Reached',
                msg: 'Votre quota quotidien de calculs précis est atteint (4/4). Utilisation du calcul de secours.'
            });
        }

        const url = 'https://routes.googleapis.com/directions/v2:computeRoutes';

        let body;
        if (points) {
            const pts = points.split(';');
            const start = pts[0];
            const end = pts[pts.length - 1];
            const intermediates = pts.slice(1, -1).map(addr => ({ address: addr }));

            body = {
                origin: { address: start },
                destination: { address: end },
                intermediates: intermediates,
                travelMode: 'DRIVE',
                routingPreference: 'TRAFFIC_AWARE',
                units: 'METRIC'
            };
        } else {
            body = {
                origin: { address: origin },
                destination: { address: destination },
                travelMode: 'DRIVE',
                routingPreference: 'TRAFFIC_AWARE',
                units: 'METRIC'
            };
        }

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Goog-Api-Key': apiKey,
                'X-Goog-FieldMask': 'routes.distanceMeters,routes.duration'
            },
            body: JSON.stringify(body)
        });

        const data = await response.json();

        if (data.routes && data.routes.length > 0) {
            const route = data.routes[0];
            const distKm = Math.round(route.distanceMeters / 1000);
            const durationMin = Math.round(parseInt(route.duration) / 60);

            console.log(`[SERVER] Google Routes Result: ${distKm} km, ${durationMin} min for ${origin} -> ${destination}`);

            // 4. SAVE TO CACHE
            await saveToCache(routeKey, distKm, durationMin);

            res.json({
                distKm,
                durationMin,
                source: 'google'
            });
        } else {
            console.error(`[SERVER] Routes API Error:`, JSON.stringify(data));
            res.status(400).json({
                error: 'Could not find route',
                details: data.error || 'No routes found'
            });
        }
    } catch (err) {
        console.error(`[SERVER] Proxy Crash:`, err);
        res.status(500).json({ error: 'Failed to fetch routes' });
    }
});

// Validation Helpers
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const isValidPhone = (phone) => {
    const clean = phone.replace(/\s+/g, '');
    return /^(\+33|0)[1-9]\d{8}$/.test(clean);
};

// API Endpoint for Identity
app.post('/api/identity', async (req, res) => {
    try {
        const { prenom, nom, email, phone } = req.body;

        if (!prenom || prenom.length < 2 || !nom || nom.length < 2) {
            return res.status(400).json({ success: false, message: 'Nom/Prénom invalide' });
        }
        if (!isValidEmail(email)) {
            return res.status(400).json({ success: false, message: 'Email invalide' });
        }
        if (!isValidPhone(phone)) {
            return res.status(400).json({ success: false, message: 'Numéro de téléphone invalide' });
        }

        const id = await saveIdentity({ prenom, nom, email, phone });
        res.status(201).json({ success: true, id });
    } catch (err) {
        console.error('[SERVER] Identity API Error:', err);
        res.status(500).json({ success: false, message: 'Erreur lors de la sauvegarde de l\'identité' });
    }
});

// API Endpoint for reservations
app.post('/api/reservations', async (req, res) => {
    try {
        const d = req.body;

        // Basic Validation
        if (!d['res-prenom'] || d['res-prenom'].length < 2) return res.status(400).json({ success: false, message: 'Prénom requis' });
        if (!d['res-nom'] || d['res-nom'].length < 2) return res.status(400).json({ success: false, message: 'Nom requis' });
        if (!isValidEmail(d['res-email'])) return res.status(400).json({ success: false, message: 'Email invalide' });
        if (!isValidPhone(d['res-phone'])) return res.status(400).json({ success: false, message: 'Téléphone invalide' });
        if (!d['res-pickup'] || d['res-pickup'].length < 5) return res.status(400).json({ success: false, message: 'Adresse de départ trop courte ou incohérente' });
        if (!d['res-drop'] || d['res-drop'].length < 5) return res.status(400).json({ success: false, message: 'Destination trop courte ou incohérente' });

        const reservationData = {
            prenom: d['res-prenom'].trim(),
            nom: d['res-nom'].trim(),
            email: d['res-email'].trim(),
            phone: d['res-phone'].trim(),
            pickup: d['res-pickup'].trim(),
            drop: d['res-drop'].trim(),
            pax: parseInt(d['res-pax']) || 1,
            duration: d['res-duration'] || '',
            price_est: d['res-price-est'] || '',
            pickup_datetime: d['res-pickup-datetime'] || '',
            arrival_datetime: d['res-arrival-datetime'] || '',
            option_type: d['res-opt'] || '',
            ambiance: d['res-ambiance'] || '',
            notes: d['res-notes'] || ''
        };

        const id = await saveReservation(reservationData);

        res.status(201).json({
            success: true,
            message: 'Reservation saved successfully',
            id: id
        });
    } catch (err) {
        console.error('[SERVER] Reservation API Error:', err);
        res.status(500).json({
            success: false,
            message: 'Error saving reservation'
        });
    }
});

// API Endpoint for Grok (Proxy)
const grokIpRequests = new Map();
const GROK_RATE_LIMIT_WINDOW = 24 * 60 * 60 * 1000;
const GROK_MAX_REQUESTS = 50;

app.post('/api/chat-grok', async (req, res) => {
    const apiKey = process.env.GROK_API_KEY;
    if (!apiKey) {
        return res.status(500).json({ error: 'Server misconfiguration: GROK_API_KEY missing' });
    }

    // Rate Limiting
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
    const now = Date.now();
    let clientData = grokIpRequests.get(ip) || { count: 0, lastReset: now };

    if (now - clientData.lastReset > GROK_RATE_LIMIT_WINDOW) {
        clientData.count = 0;
        clientData.lastReset = now;
    }

    if (clientData.count >= GROK_MAX_REQUESTS) {
        return res.status(429).json({
            error: 'Rate limit exceeded',
            msg: 'Quota journalier atteint pour préserver la gratuité.'
        });
    }

    clientData.count++;
    grokIpRequests.set(ip, clientData);

    try {
        const { messages, temperature, max_tokens, model } = req.body;

        const response = await fetch('https://api.x.ai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: model || 'grok-beta',
                messages: messages,
                temperature: temperature || 0.7,
                max_tokens: max_tokens || 500,
                stream: false
            })
        });

        if (!response.ok) {
            const errText = await response.text();
            throw new Error(`Grok API Error: ${response.status} - ${errText}`);
        }

        const data = await response.json();
        res.json(data);
    } catch (err) {
        console.error('[SERVER] Grok Proxy Error:', err);
        res.status(500).json({ error: 'Failed to fetch from Grok' });
    }
});


// Fallback to index.html for unknown routes (SPA favor)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`[SERVER] Running at http://localhost:${PORT}`);
});
