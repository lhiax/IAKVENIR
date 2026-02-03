export const config = {
    runtime: 'edge',
};

const RATE_LIMIT_WINDOW = 24 * 60 * 60 * 1000; // 24 heures
const MAX_REQUESTS_PER_IP = 50; // Limite généreuse pour une utilisation personnelle mais bloquant les abus
const REFILL_RATE = 5 * 60 * 1000; // 1 requête toutes les 5 minutes (token bucket simplifié)

// Note: En serverless "edge" ou "serverless", la mémoire n'est pas persistante entre toutes les exécutions,
// mais Vercel garde souvent les instances chaudes. C'est une protection basique.
// Pour une protection robuste en production, il faudrait utiliser Vercel KV (Redis).
const ipRequests = new Map();

export default async function handler(request) {
    // 1. Validation de la méthode
    if (request.method !== 'POST') {
        return new Response(JSON.stringify({ error: 'Method not allowed' }), {
            status: 405,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    // 2. Vérification de la clé API serveur
    const API_KEY = process.env.GROK_API_KEY;
    if (!API_KEY) {
        return new Response(JSON.stringify({ error: 'Server misconfiguration: GROK_API_KEY missing' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    try {
        // 3. Rate Limiting (Basique par IP)
        const ip = request.headers.get('x-forwarded-for') || 'unknown';
        const now = Date.now();

        let clientData = ipRequests.get(ip) || { count: 0, lastReset: now };

        // Reset si la fenêtre de temps est passée
        if (now - clientData.lastReset > RATE_LIMIT_WINDOW) {
            clientData.count = 0;
            clientData.lastReset = now;
        }

        if (clientData.count >= MAX_REQUESTS_PER_IP) {
            return new Response(JSON.stringify({
                error: 'Rate limit exceeded. Try again tomorrow.',
                details: 'Quota journalier atteint pour préserver la gratuité.'
            }), {
                status: 429,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        clientData.count++;
        ipRequests.set(ip, clientData);

        // 4. Lecture du corps de la requête client
        const body = await request.json();
        const { messages, temperature, max_tokens, model } = body;

        // 5. Appel à l'API xAI (Grok)
        const grokResponse = await fetch('https://api.x.ai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                model: model || 'grok-beta',
                messages: messages,
                temperature: temperature || 0.7,
                max_tokens: max_tokens || 500,
                stream: false // On ne gère pas le streaming pour simplifier l'exemple
            })
        });

        if (!grokResponse.ok) {
            const errorText = await grokResponse.text();
            return new Response(JSON.stringify({ error: `Grok API Error: ${grokResponse.status}`, details: errorText }), {
                status: grokResponse.status,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const data = await grokResponse.json();

        // 6. Réponse au client
        return new Response(JSON.stringify(data), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-store'
            }
        });

    } catch (error) {
        return new Response(JSON.stringify({ error: 'Internal Server Error', details: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
