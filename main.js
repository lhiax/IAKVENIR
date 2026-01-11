
/**
 * iA_k_venir - MAIN SCRIPT (Clean Build)
 */

/* =========================================
   DATA SECTION
   ========================================= */

const LOCATIONS = {
    "Villes & Villages (Alsace Central)": [
        { id: "baltzenheim", name: "Baltzenheim (QG)", dist: 0 },
        { id: "marckolsheim", name: "Marckolsheim", dist: 6 }, // Verified ~6km
        { id: "artzenheim", name: "Artzenheim", dist: 3 }, // Verified ~3km
        { id: "kunheim", name: "Kunheim", dist: 5 }, // Verified ~5km
        { id: "bicsheim", name: "Biesheim", dist: 10 }, // Verified ~10km
        { id: "neufbrisach", name: "Neuf-Brisach", dist: 12 }, // Verified ~12km
        { id: "selestat", name: "Sélestat", dist: 22 }, // ~22km
        { id: "colmar", name: "Colmar", dist: 18 }, // ~17-18km
        { id: "obernai", name: "Obernai", dist: 45 }, // ~45km
        { id: "strasbourg", name: "Strasbourg", dist: 65 }, // ~65km
        { id: "mulhouse", name: "Mulhouse", dist: 58 } // ~58km
    ],
    "Route des Vins & Tourisme": [
        { id: "riquewihr", name: "Riquewihr", dist: 28 }, // ~28km
        { id: "ribeauville", name: "Ribeauvillé", dist: 26 }, // ~26km
        { id: "kaysersberg", name: "Kaysersberg", dist: 28 }, // ~28km
        { id: "eguisheim", name: "Eguisheim", dist: 24 }, // ~24km
        { id: "haut_koenigsbourg", name: "Château du Haut-Kœnigsbourg", dist: 35 }, // ~35km
        { id: "mont_sainte_odile", name: "Mont Sainte-Odile", dist: 52 }, // ~50-55km
        { id: "ungersheim", name: "Écomusée d'Alsace", dist: 48 } // ~48km
    ],
    "Loisirs & Frissons": [
        { id: "europapark", name: "Europa-Park (Rust, DE)", dist: 32 }, // ~32km via Rhin tips
        { id: "rulantica", name: "Rulantica (Rust, DE)", dist: 33 }, // ~33km
        { id: "casino_baden", name: "Casino Baden-Baden (DE)", dist: 95 } // ~95km
    ],
    "Gares & Aéroports": [
        { id: "gare_colmar", name: "Gare de Colmar", dist: 18 },
        { id: "gare_selestat", name: "Gare de Sélestat", dist: 22 },
        { id: "gare_strasbourg", name: "Gare de Strasbourg", dist: 65 },
        { id: "aeroport_entzheim", name: "Aéroport Strasbourg-Entzheim", dist: 62 }, // ~62km
        { id: "euroairport", name: "EuroAirport (Bâle-Mulhouse)", dist: 72 } // ~72km
    ]
};

const ARCHIVES = [
    {
        id: 1,
        title: "Main Square Festival 2023",
        category: "festivals",
        image: "https://images.unsplash.com/photo-1533174072545-e8d4aa97edf9?q=80&w=800&auto=format&fit=crop",
        date: "04 JUILLET 2023"
    },
    {
        id: 2,
        title: "Vignes de Riquewihr",
        category: "gastronomy",
        image: "https://images.unsplash.com/photo-1597246219803-e8c9a632d430?q=80&w=800&auto=format&fit=crop",
        date: "15 SEPTEMBRE 2023"
    },
    {
        id: 3,
        title: "Concert Zénith Strasbourg",
        category: "festivals",
        image: "https://images.unsplash.com/photo-1459749411177-0473ef7161a8?q=80&w=800&auto=format&fit=crop",
        date: "23 MAI 2024"
    },
    {
        id: 4,
        title: "Gastronomie Alsacienne",
        category: "gastronomy",
        image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=800&auto=format&fit=crop",
        date: "10 NOVEMBRE 2023"
    },
    {
        id: 5,
        title: "Shooting Mode Urbain",
        category: "corporate",
        image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=800&auto=format&fit=crop",
        date: "20 JANVIER 2024"
    },
    {
        id: 6,
        title: "Eurockéennes - The Crowd",
        category: "festivals",
        image: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=800&auto=format&fit=crop",
        date: "02 JUILLET 2022"
    }
];

const DEALS = [
    {
        id: "VISIT-ALSACE",
        title: "DÎNERS INSOLITES",
        description: "Une expérience culinaire unique dans des lieux d'exception en Alsace.",
        discount: "DÉCOUVERTE",
        validity: "SAISONNIER",
        color: "#ff3333", // Rouge
        url: "https://www.visit.alsace/vos-diners-insolites-en-alsace/diners-insolites-en-alsace/",
        kitt_script: "Les humains ont une façon étrange de se nourrir... mais le cadre semble acceptable."
    },
    {
        id: "ETOILES-ALSACE",
        title: "FORMULES ÉTOILÉES",
        description: "L'excellence gastronomique alsacienne à portée de main.",
        discount: "PREMIUM",
        validity: "TOUTE L'ANNÉE",
        color: "#ff9d00", // Gold
        url: "https://www.etoiles-alsace.com/nos-formules/",
        kitt_script: "Attention aux miettes, Michael. Ces établissements sont prestigieux."
    },
    {
        id: "PAUSE-COLMAR",
        title: "PAUSE COLMARIENNE",
        description: "Détente et découverte au coeur de Colmar.",
        discount: "RELAX",
        validity: "EN COURS",
        color: "#b8ff00", // Vert
        url: "https://pausecolmarienne.com/",
        kitt_script: "Un arrêt stand à Colmar ? Je surveillerai le véhicule."
    },
    {
        id: "NOUVELLES-GASTRO",
        title: "ACTU GASTRONOMIE",
        description: "Toute l'actualité culinaire et gastronomique en Alsace.",
        discount: "INFO",
        validity: "TEMPS RÉEL",
        color: "#00d4ff", // Bleu
        url: "https://nouvellesgastronomiques.com/categories/alsace-actualites/",
        kitt_script: "Mise à jour de la base de données culinaire en cours..."
    },
    {
        id: "CASINO-MENU",
        title: "CASINO & GOURMANDISE",
        description: "Menu Gourmand et accès Casino Barrière Ribeauvillé.",
        discount: "VIP",
        validity: "EXCLUSIF",
        color: "#000000", // Black
        url: "https://cadeauxbarriere.com/products/menu-gourmand-et-casino-ribeauville",
        kitt_script: "Accès accrédité niveau Omega. Faites vos jeux, Michael.",
        admin: true,
        blocked: true
    },
    {
        id: "CASINO-CHAMP",
        title: "CHAMPAGNE & JEU",
        description: "Champagne et Soirée Casino Barrière Ribeauvillé.",
        discount: "ELITE",
        validity: "PRESTIGE",
        color: "#D4AF37", // Gold
        url: "https://cadeauxbarriere.com/products/champagne-et-soiree-casino-ribeauville?variant=51862693839189",
        kitt_script: "Protocole de célébration activé. La chance semble être un facteur déterminant.",
        admin: true,
        blocked: true
    },
    {
        id: "CASINO-BALNEO",
        title: "2H BALNÉO & SPA",
        description: "Accès 2h Espace Balnéo - Casino Barrière.",
        discount: "ZEN",
        validity: "DÉTENTE",
        color: "#00ffff", // Cyan Neon
        url: "https://cadeauxbarriere.com/products/2h-de-balneo?_pos=3&_fid=f518ca29b&_ss=c&variant=51862665855317",
        kitt_script: "Analyse des paramètres vitaux... Niveau de stress détecté. Une immersion en eau thermale est recommandée.",
        admin: true,
        blocked: true
    },
    {
        id: "LOCAL-ROOT",
        title: "INTERFACE LOCALE",
        description: "Accès direct au fichier source local (Self-Test).",
        discount: "DEV",
        validity: "SYSTEM",
        color: "#ffffff", // Matrix White
        url: "file:///Volumes/DD%202%20TERRAS/3_SITE%20IA%20VTC%20PHOTO/index.html",
        kitt_script: "Boucle de rétroaction détectée. Je me regarde... me regarder.",
        admin: true,
        blocked: true
    }
];

// STATE
let currentDeal = null;
let voicesLoaded = false;
let currentPdfBlob = null; // Store actual blob data
let currentPdfBlobUrl = null; // Store URL for display

/* =========================================
   AUDIO STREAMING ENGINE (Priority System)
   ========================================= */

const RADIO_STREAMS = {
    "relax": "https://ice1.somafm.com/groovesalad-128-mp3", // SomaFM Groove Salad
    "futuriste": "https://stream.nightride.fm/nightride.mp3", // Nightride FM
    "retro": "https://ice1.somafm.com/u80s-128-mp3", // SomaFM Underground 80s
    "dab": "https://icecast.radiofrance.fr/fip-midfi.mp3", // FIP
    // DAB Alsace (Local)
    "dkl": "https://stream.rcs.revma.com/wcrk7f9fkzzuv",
    "azur-fm": "https://stream.rcs.revma.com/8327h51fkzzuv", // Azur FM (HTTPS Proxy/Alt)
    "rdl": "https://stream.rcs.revma.com/aguwyw7fkzzuv.mp3", // RDL 68 (Colmar) - HTTPS
    // Radio FG
    "fg-main": "https://stream.rcs.revma.com/fg00000000001", // Radio FG HTTPS
    "fg-chic": "https://stream.rcs.revma.com/8actzfn0742vv.mp3",
    "fg-deep": "https://stream.rcs.revma.com/fg64000000001", // FG Deep HTTPS
    // PulsRadio Channels
    "puls-dance": "https://icecast.pulsradio.com/pulsHD.mp3",
    "puls-trance": "https://icecast.pulsradio.com/pulstranceHD.mp3",
    "puls-90": "https://icecast.pulsradio.com/puls90HD.mp3",
    "puls-2000": "https://icecast.pulsradio.com/puls2000HD.mp3"
};

let audioPlayer = new Audio();
let audioTimeout = null;
let isRadioActive = false; // Is a station selected?
let isDucked = false;      // Is audio suppressed by higher priority?

function playRadio(ambianceKey) {
    if (!RADIO_STREAMS[ambianceKey]) return;

    // 1. Set Rhythm (Visuals)
    if (typeof rhythmEngine !== 'undefined') {
        rhythmEngine.setMode(ambianceKey);
    }

    // 2. Play Audio
    // Stop current
    if (audioPlayer) {
        audioPlayer.pause();
        audioPlayer.currentTime = 0;
    }
    if (audioTimeout) clearTimeout(audioTimeout);

    isRadioActive = false;

    const streamUrl = RADIO_STREAMS[ambianceKey];

    // Setup New Stream
    isRadioActive = true;
    audioPlayer.src = streamUrl;
    audioPlayer.volume = 0.3;

    // Debug Listeners
    audioPlayer.onplaying = () => console.log(`[AUDIO] Playing: ${ambianceKey}`);
    audioPlayer.onerror = (e) => {
        const error = audioPlayer.error;
        console.error(`[AUDIO] Error Code: ${error ? error.code : 'Unknown'}`, error);
        console.error(`[AUDIO] Stream URL: ${streamUrl}`);
    };
    audioPlayer.onwaiting = () => console.log(`[AUDIO] Buffering: ${ambianceKey}...`);

    // Attempt Play
    const playPromise = audioPlayer.play();
    if (playPromise !== undefined) {
        playPromise
            .then(() => console.log(`[AUDIO] Playback started successfully.`))
            .catch(e => {
                console.warn(`[AUDIO] Autoplay Blocked or Stream Error:`, e);
                // Optional: Show UI hint to user "Click to Play"
            });
    }

    // 3. UI Updates
    if (typeof updateRadioUI === 'function') updateRadioUI(ambianceKey);

    // Update active state in selector if needed
    const sel = document.getElementById('nav-ambiance');
    if (sel && sel.value !== ambianceKey) sel.value = ambianceKey;
}

function pauseRadio() {
    isDucked = true;
    if (audioPlayer) audioPlayer.pause();
    if (audioTimeout) clearTimeout(audioTimeout);
}

function resumeRadio() {
    isDucked = false;
    if (isRadioActive && audioPlayer.src) {
        // Resume playback
        audioPlayer.play().catch(e => console.log("Resume prevented:", e));
    }
}

/* =========================================
   VOICE ENGINE
   ========================================= */

const KITT_QUOTES = [
    "Trajet calculé. J'espère que vous n'avez pas prévu de course-poursuite aujourd'hui, Michael.",
    "Bande passante audio activée. Le tarif est affiché. Dois-je préparer le mode Turbo Boost ?",
    "Analyse terminée. C'est une destination très pittoresque. Je garderai mes scanners en alerte.",
    "Voici l'estimation, Michael. N'oubliez pas que je ne peux pas sauter par-dessus les bouchons... enfin, pas légalement.",
    "Les capteurs indiquent une route dégagée. Estimation du coût affichée. Prêt à partir quand vous l'êtes.",
    "J'ai calculé l'itinéraire optimal. Je me suis permis d'éviter les chemins de terre, pour mes suspensions.",
    "Destination verrouillée. Le tarif semble raisonnable pour une technologie de ma classe.",
    "Veuillez consulter l'écran. Si Devone appelle, dites-lui que je suis en maintenance."
];

function loadVoices() {
    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
        voicesLoaded = true;
    }
}

/* =========================================
   VOICE ENGINE (Thomas - French Priority)
   ========================================= */
let selectedVoice = null;

function initVoice() {
    // 1. Load Voices
    const loadVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        if (voices.length > 0) voicesLoaded = true;

        // Priority: "Thomas" (Mac/iOS High Quality) -> "Google Français" -> Any "fr-FR"
        selectedVoice = voices.find(v => v.name.includes("Thomas")) ||
            voices.find(v => v.name.includes("Google") && v.lang.startsWith("fr")) ||
            voices.find(v => v.lang.startsWith("fr"));

        if (!selectedVoice && voices.length > 0) {
            // Fallback to English if no French (shouldn't happen on modern OS)
            selectedVoice = voices[0];
        }
    };

    if ('speechSynthesis' in window) {
        window.speechSynthesis.onvoiceschanged = loadVoices;
        loadVoices();
    }
}

// Speak Function (Global) - RETURNS PROMISE
window.speak = function (text) {
    return new Promise((resolve) => {
        if (!('speechSynthesis' in window)) {
            console.warn("Speech Synthesis not supported");
            resolve();
            return;
        }

        // Cancel previous
        window.speechSynthesis.cancel();

        // DUCK AUDIO (Radio & Video)
        if (typeof pauseRadio === 'function') pauseRadio();

        // Mute Pilot Video specifically if playing
        const pilotVideo = document.getElementById('pilot-video');
        let pilotWasPlaying = false;
        if (pilotVideo && !pilotVideo.paused) {
            pilotVideo.muted = true;
            pilotWasPlaying = true;
        }

        const utterance = new SpeechSynthesisUtterance(text);
        if (selectedVoice) utterance.voice = selectedVoice;

        // Settings (Pitch/Rate for KITT Effect)
        utterance.pitch = 0.9; // Slightly deeper
        utterance.rate = 1.1;  // Slightly faster
        utterance.volume = 1.0;

        // Events
        utterance.onend = () => {
            // RESUME AUDIO
            if (typeof resumeRadio === 'function') resumeRadio();

            // Unmute Pilot Video if it was playing (or let logic handle it)
            // But wait! User wants video sound ONLY after speech.
            // So we muted it above. Now we can unmute it?
            // Or better: The specific section logic dictates playback.
            // For general 'speak' calls (like feedback), unmuting is safe if it was already playing background.
            if (pilotVideo && pilotWasPlaying) {
                // But for the Tour, we might want to handle this explicitly in the tour step?
                // Let's safe unmute here, as 'Tour Active' flag prevents new autoplays anyway.
                pilotVideo.muted = false;
            }
            resolve();
        };

        utterance.onerror = (e) => {
            console.error("Speech Error:", e);
            if (typeof resumeRadio === 'function') resumeRadio();
            if (pilotVideo && pilotWasPlaying) pilotVideo.muted = false;
            resolve();
        };

        window.speechSynthesis.speak(utterance);
    });
};

/* =========================================
   SIMULATOR CALCULATOR (OSRM + Nominatim)
   ========================================= */

function speakSummary(data) {
    const { destination, price, distance } = data;
    const randomQuote = KITT_QUOTES[Math.floor(Math.random() * KITT_QUOTES.length)];
    const text = `Calcul terminé. Destination : ${destination}. Distance : ${distance} kilomètres. L'estimation est de ${price} euros. ${randomQuote}`;
    speak(text);
}

/* =========================================
   DEALS LOGIC
   ========================================= */

function activateDeal(dealId) {
    const deal = DEALS.find(d => d.id === dealId);
    if (!deal) return;

    currentDeal = deal;
    const simulatorSection = document.getElementById('simulator');
    const supplementDiv = document.getElementById('div-supplement');

    if (simulatorSection) simulatorSection.scrollIntoView({ behavior: 'smooth' });

    if (deal.id === "GASTRO-STAR") {
        if (supplementDiv) supplementDiv.classList.remove('hidden');
    } else {
        if (supplementDiv) {
            supplementDiv.classList.add('hidden');
            const inp = document.getElementById('sim-supplement');
            if (inp) inp.value = "";
        }
    }
    speak(deal.kitt_script);
}

// Attach to window for HTML onclick events
window.activateDeal = activateDeal;

/* =========================================
   OVERLAY LOGIC (Scanner Edition)
   ========================================= */

let overlayDeals = [];
let currentOverlayIndex = 0;

function initOverlayDeals() {
    const isAdmin = true; // TEMPORARY FORCE SHOW
    overlayDeals = DEALS.filter(d => d.url && (!d.admin || isAdmin));
}

function openDealOverlay(url) {
    if (overlayDeals.length === 0) initOverlayDeals();
    // ... (rest of function unchanged, just ensuring context)

    const overlay = document.getElementById('deal-overlay');
    const iframe = document.getElementById('deal-iframe');
    const scanner = document.getElementById('deal-scanner');

    // DUCK RADIO ON OPEN
    pauseRadio();

    // Find index of this url
    const index = overlayDeals.findIndex(d => d.url === url);
    if (index !== -1) currentOverlayIndex = index;

    // Show Overlay
    if (overlay) {
        overlay.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }

    // Initialize Content (Trigger Scanner)
    updateOverlayContent();
}

function closeDealOverlay() {
    // Clear Auto-Launch Timers
    if (window.autoLaunchTimer) clearTimeout(window.autoLaunchTimer);
    if (window.autoLaunchInterval) clearInterval(window.autoLaunchInterval);

    const overlay = document.getElementById('deal-overlay');
    const iframe = document.getElementById('deal-iframe');
    const navControls = document.querySelector('#deal-overlay .flex.items-center.gap-2'); // Nav buttons container

    if (overlay) {
        overlay.classList.add('hidden');
        document.body.style.overflow = '';

        // Restore Nav Controls for next use
        if (navControls) navControls.classList.remove('hidden');

        if (iframe) {
            iframe.src = 'about:blank';
            iframe.onload = null; // Remove listener
        }

        // RESUME RADIO ON CLOSE
        resumeRadio();
    }
}

function navigateDeal(direction) {
    currentOverlayIndex += direction;

    if (currentOverlayIndex >= overlayDeals.length) currentOverlayIndex = 0;
    if (currentOverlayIndex < 0) currentOverlayIndex = overlayDeals.length - 1;

    updateOverlayContent();
}

function updateOverlayContent() {
    const iframe = document.getElementById('deal-iframe');
    const scanner = document.getElementById('deal-scanner');
    const titleEl = document.getElementById('deal-overlay-title');
    const counterEl = document.getElementById('deal-counter');

    // Portal Elements
    const portal = document.getElementById('deal-portal');
    const portalTitle = document.getElementById('portal-title');
    const portalText = document.getElementById('portal-text');
    const portalMeta = document.getElementById('portal-meta');
    const btnPortal = document.getElementById('btn-portal-open');

    const deal = overlayDeals[currentOverlayIndex];
    if (!deal) return;

    if (titleEl) titleEl.textContent = `// ${deal.title}`;
    if (counterEl) counterEl.textContent = `${currentOverlayIndex + 1} / ${overlayDeals.length}`;

    // Handle Blocked Sites (PORTAL MODE)
    if (deal.blocked) {
        if (iframe) iframe.style.display = 'none';
        if (scanner) scanner.style.display = 'none';

        if (portal) {
            portal.classList.remove('hidden');
            // Populate Portal
            if (portalTitle) portalTitle.innerText = deal.title;
            if (portalText) portalText.innerText = deal.description;
            if (portalMeta) portalMeta.innerHTML = `
                <span class="font-bold text-neon-blue">${deal.discount}</span>
                <span>//</span>
                <span>${deal.validity}</span>
            `;

            const btnPortalBack = document.getElementById('btn-portal-back');

            if (btnPortal) {
                btnPortal.onclick = () => {
                    window.open(deal.url, '_blank');
                    closeDealOverlay(); // Auto-close to return to dashboard
                };
            }

            if (btnPortalBack) {
                btnPortalBack.onclick = () => closeDealOverlay();
            }
        }

    } else {
        // Normal Behavior
        if (portal) portal.classList.add('hidden'); // Hide portal
        if (iframe) iframe.style.display = 'block';

        // Reset UI for Loading
        if (scanner) scanner.style.display = 'flex'; // Show scanner
        if (iframe) {
            iframe.style.opacity = '0'; // Hide frame during load
            iframe.src = deal.url;

            // On Load Event
            iframe.onload = () => {
                setTimeout(() => {
                    if (scanner) scanner.style.display = 'none';
                    iframe.style.opacity = '1';
                    console.log("Overlay Loaded: " + deal.title);
                }, 800);
            };
        }
    }

    if (deal.kitt_script) speak(deal.kitt_script);
}

// Make globally available
window.openDealOverlay = openDealOverlay;
window.closeDealOverlay = closeDealOverlay;
window.navigateDeal = navigateDeal;

function openExternalOverlay(url, title) {
    const overlay = document.getElementById('deal-overlay');
    const iframe = document.getElementById('deal-iframe');
    const scanner = document.getElementById('deal-scanner');
    const titleEl = document.getElementById('deal-overlay-title');
    const navControls = document.querySelector('#deal-overlay .flex.items-center.gap-2'); // Nav buttons container

    if (overlay) {
        overlay.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }

    // Hide Nav Controls for external links
    if (navControls) navControls.classList.add('hidden');

    // DUCK RADIO ON OPEN
    pauseRadio();

    // Set Title
    if (titleEl) titleEl.textContent = `// ${title.toUpperCase()}`;

    // Handle YouTube Conversion
    // Handle YouTube Conversion
    let finalUrl = url;
    if (url.includes('youtu.be/')) {
        const videoId = url.split('youtu.be/')[1].split('?')[0];
        finalUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    } else if (url.includes('youtube.com/watch?v=')) {
        const videoId = url.split('v=')[1].split('&')[0];
        finalUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    }
    // Handle Canva Embeds (Force Embed Mode to avoid X-Frame-Options)
    else if (url.includes('canva.com') && url.includes('/view')) {
        // Remove query params and ensure ?embed
        const baseUrl = url.split('?')[0];
        finalUrl = `${baseUrl}?embed`;
    }

    // Load Iframe
    if (iframe) {
        iframe.style.display = 'block';
        iframe.style.opacity = '0';
        iframe.src = finalUrl;

        if (scanner) scanner.style.display = 'flex';

        iframe.onload = () => {
            setTimeout(() => {
                if (scanner) scanner.style.display = 'none';
                iframe.style.opacity = '1';
            }, 800);
        };
    }
}

window.openExternalOverlay = openExternalOverlay;

/* =========================================
   UI RENDER
   ========================================= */

/* =========================================
   DEAL SELECTION LOGIC
   ========================================= */

function selectDeal(dealId) {
    const deal = DEALS.find(d => d.id === dealId);
    if (!deal) return;

    // 1. Close Overlay if open
    closeDealOverlay();

    // 2. Scroll to Reservation Form
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
    }

    // 3. Pre-fill Notes
    const notesField = document.getElementById('res-notes');
    if (notesField) {
        // Add visual highlight
        notesField.style.transition = 'all 0.5s';
        notesField.style.borderColor = deal.color;
        notesField.style.boxShadow = `0 0 20px ${deal.color}40`;

        setTimeout(() => {
            notesField.style.borderColor = ''; // Revert to CSS default
            notesField.style.boxShadow = '';
        }, 2000);

        // Avoid duplicate entries
        if (!notesField.value.includes(selectionText)) {
            notesField.value = selectionText + notesField.value;
        }
    }

    // 4. Auto-select Option "Expérience / Bons Plans"
    const optField = document.getElementById('res-opt');
    if (optField) {
        optField.value = 'bons-plans';
        // Visual feedback
        optField.style.transition = 'all 0.5s';
        optField.style.borderColor = deal.color;
        setTimeout(() => optField.style.borderColor = '', 2000);
    }

    // 5. Voice Confirmation
    speak(`Offre ${deal.title} sélectionnée. Option Expérience validée.`);
}

// Make globally available
window.selectDeal = selectDeal;

/* =========================================
   GALLERY / REPORTAGES LOGIC
   ========================================= */
function renderGallery() {
    const grid = document.getElementById('gallery-grid');
    if (!grid) return;

    // 1. FESTIVALS (Real Data from 'assets/gallery/festivals/')
    // 1. FESTIVALS (Data from 'assets/gallery/festivals/')
    // Updated with User Renamed Files (Artist Integration)
    const festivalFilenames = [
        "Avicii festival_001.jpg",
        "festival_002 JOACHIM GARRAUD.jpg",
        "festival_003 JOACHIM GARRAUD.jpg",
        "festival_004 DAVID GUETTA.jpg",
        "festival_005 Afrojack.jpg",
        "festival_006 DAVID GUETTA.jpg",
        "festival_007 DAVID GUETTA.jpg",
        "festival_008 Charles Aznavour.jpg",
        "festival_009 Charles Aznavour.jpg",
        "festival_010 johnny hallyday.jpg",
        "festival_011 LMFAO.jpg",
        "festival_012 Gad Elmaleh.jpg",
        "festival_013 Gotan Project.jpg",
        "festival_014 Renan Luce.jpg",
        "festival_015 Alice Cooper.jpg",
        "festival_016 Yannick Noah.jpg",
        "festival_017 Jacques Dutronc.jpg",
        "festival_018.jpg",
        "festival_019.jpg",
        "festival_020.jpg",
        "festival_021.jpg",
        "festival_022.jpg",
        "festival_023.jpg",
        "festival_024 Scorpions.jpg",
        "festival_025 Tryo.jpg",
        "festival_026 Superbus.jpg",
        "festival_027 Superbus.jpg",
        "festival_028 amy macdonald.jpg",
        "festival_029 amy macdonald.jpg",
        "festival_030 DAVID GUETTA.jpg",
        "festival_031 DAVID GUETTA.jpg",
        "festival_032 DAVID GUETTA.jpg",
        "festival_033 DAVID GUETTA.jpg",
        "festival_034 DAVID GUETTA.jpg",
        "festival_035 DAVID GUETTA.jpg",
        "festival_036 Nina Agen.jpg",
        "festival_037.jpg",
        "festival_038.jpg",
        "festival_039 Pete Doherty.jpg",
        "festival_040 Pete Doherty.jpg",
        "festival_041 DAVID GUETTA.jpg",
        "festival_042 Lost Frequencies.jpg",
        "festival_043 DAVID GUETTA.jpg",
        "festival_044.jpg",
        "festival_045.jpg",
        "festival_046.jpg",
        "festival_047.jpg",
        "festival_048.jpg",
        "festival_049.jpg",
        "festival_050 Steve Aoki.jpg",
        "festival_051 Morgan Nagoya.jpg",
        "festival_052.jpg",
        "festival_053 Lost Frequencies.jpg",
        "festival_054.jpg"
    ];

    // 2. GASTRONOMIE (25 items)
    // Auto-generated standard filenames: gastronomie_001.jpg to gastronomie_025.jpg
    const gastronomieFilenames = Array.from({ length: 25 }, (_, i) =>
        `gastronomie_${String(i + 1).padStart(3, '0')}.jpg`
    );

    // 3. IMMOBILIER (6 items)
    // Auto-generated standard filenames: immobilier_001.jpg to immobilier_006.jpg
    const immobilierFilenames = Array.from({ length: 6 }, (_, i) =>
        `immobilier_${String(i + 1).padStart(3, '0')}.jpg`
    );

    // 4. MÉMOIRE (25 items)
    // Auto-generated standard filenames: memoire_001.jpg to memoire_025.jpg
    const memoireFilenames = Array.from({ length: 25 }, (_, i) =>
        `memoire_${String(i + 1).padStart(3, '0')}.jpg`
    );

    // 5. TOURISME (Formerly Salons - 48 items)
    // Auto-generated standard filenames: tourisme_001.jpg to tourisme_048.jpg
    const tourismeFilenames = Array.from({ length: 48 }, (_, i) =>
        `tourisme_${String(i + 1).padStart(3, '0')}.jpg`
    );

    // --- MAP TO OBJECTS ---

    // Unified Title and Date for Consistency
    const unifiedTitle = (index) => `PHOTO CERTIFIÉE AUTHENTIQUE PAR LAURENT HABERSETZER #${index + 1}`;
    const unifiedDate = 'ARCHIVES OFFICIELLES';

    const festivalItems = festivalFilenames.map((name, i) => ({
        cat: 'festival',
        title: unifiedTitle(i),
        date: 'SAISON 2024',
        img: `assets/gallery/festivals/${name}`
    }));

    const gastronomieItems = gastronomieFilenames.map((name, i) => ({
        cat: 'gastronomie',
        title: unifiedTitle(i),
        date: 'ALSACE GOURMANDE',
        img: `assets/gallery/gastronomie/${name}`
    }));

    const immobilierItems = immobilierFilenames.map((name, i) => ({
        cat: 'immobilier',
        title: unifiedTitle(i),
        date: 'PROPRIÉTÉS',
        img: `assets/gallery/immobilier/${name}`
    }));

    const memoireItems = memoireFilenames.map((name, i) => ({
        cat: 'memoire',
        title: unifiedTitle(i),
        date: 'MÉMOIRE & EXERCICES',
        img: `assets/gallery/memoire/${name}`
    }));

    const tourismeItems = tourismeFilenames.map((name, i) => ({
        cat: 'tourisme',
        title: unifiedTitle(i),
        date: 'DÉCOUVERTE',
        img: `assets/gallery/tourisme/${name}`
    }));

    // Combine All
    const galleryData = [
        ...festivalItems,
        ...gastronomieItems,
        ...immobilierItems,
        ...memoireItems,
        ...tourismeItems
    ];

    // Filter Logic
    const filterButtons = document.querySelectorAll('.gallery-filter');

    // Function to render items
    const renderItems = (category) => {
        // Clear grid
        grid.innerHTML = '';

        // Filter
        const itemsToShow = category === 'all'
            ? galleryData
            : galleryData.filter(item => item.cat === category);

        // Render Cards
        itemsToShow.forEach((item, index) => {
            const card = document.createElement('div');
            // CHANGED: aspect-video (16:9) -> aspect-[3/2] (Taller, better for portraits)
            card.className = "group relative aspect-[3/2] bg-gray-900 overflow-hidden border border-white/10 hover:border-limit-red transition-all cursor-pointer";

            // UNIFIED OVERLAY: HOLOGRAPHIC SEAL (CA-LH) FOR ALL
            const overlayContent = `
               <div class="holo-seal">
                    <div class="holo-seal-main">CA-LH</div>
                    <div class="holo-seal-sub">CERTIFIÉ<br>AUTHENTIQUE<br>LAURENT H</div>
               </div>
            `;

            card.innerHTML = `
                <img src="${item.img}" alt="${item.title}" loading="lazy" id="thumb-${index}"
                     class="w-full h-full object-cover transform transition-all duration-700 grayscale group-hover:grayscale-0 group-hover:scale-110"
                     style="object-position: 50% 0%;">
                
                ${overlayContent}
                
                <!-- Glitch Overlay -->
                <div class="absolute inset-0 bg-limit-red/10 opacity-0 group-hover:opacity-100 mix-blend-overlay pointer-events-none"></div>
                
                <!-- Category Badge -->
                <div class="absolute top-2 right-2 px-2 py-1 bg-black/80 border border-white/20 text-[8px] font-future text-gray-400 uppercase tracking-widest backdrop-blur-sm">
                    ${item.cat}
                </div>
            `;

            // Smart Crop Integration
            // Reactivating SmartCrop as requested for adaptive composition
            const imgElement = card.querySelector('img');
            imgElement.onload = () => applySmartCrop(imgElement);

            // Lightbox Click Event
            card.addEventListener('click', () => {
                if (window.openLightbox) {
                    window.openLightbox(index, itemsToShow);
                }
            });

            grid.appendChild(card);
        });
    };

    // MANUAL CROP OVERRIDES (Fixing specific photos)
    const cropOverrides = {
        'festival_027.jpg': '50% 0%',   // Festival #27
        'gastronomie_018.jpg': '50% 0%', // Gastronomy #18 (Serge Dubs)
        'gastronomie_015.jpg': '50% 0%', // Gastronomy #15
        'gastronomie_017.jpg': '50% 0%', // Gastronomy #17
        'gastronomie_025.jpg': '50% 50%', // Gastronomy #25 (Plate - Center Align)
    };

    // AI Smart Crop Function (Adaptive Composition)
    const applySmartCrop = (img) => {
        // Wait for load
        if (!img.complete || img.naturalWidth === 0) return;

        // 1. Check for Manual Override
        const filename = img.src.split('/').pop();
        if (cropOverrides[filename]) {
            img.style.objectPosition = cropOverrides[filename];
            return; // Skip AI and use manual value
        }

        // Use Smartcrop for intelligent analysis
        if (typeof smartcrop !== 'undefined') {
            smartcrop.crop(img, {
                width: 300,
                height: 200,
                minScale: 1.0, // Prevent zooming in too much (cutting heads)
                ruleOfThirds: true, // Enable artistic composition rules
                // Strong suggestion to look at the top (Face Zone) but allow deviation if action is elsewhere
                boost: [{
                    x: 0,
                    y: 0,
                    width: img.naturalWidth,
                    height: img.naturalHeight * 0.6,
                    weight: 3.0
                }]
            }).then(result => {
                const crop = result.topCrop;
                const centerX = (crop.x + crop.width / 2) / img.naturalWidth * 100;
                const centerY = (crop.y + crop.height / 2) / img.naturalHeight * 100;
                img.style.objectPosition = `${centerX}% ${centerY}%`;
            });
        } else {
            // Fallback: Smartcrop failed/missing -> Absolute Top
            img.style.objectPosition = '50% 20%';
        }
    };

    // Attach Listeners
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class
            filterButtons.forEach(b => {
                b.classList.remove('active', 'bg-neon-blue/20', 'border-neon-blue', 'text-white');
                b.classList.add('border-white/20', 'text-gray-400', 'hover:border-neon-blue', 'hover:text-white');
            });

            // Add active class to clicked
            btn.classList.add('active', 'bg-neon-blue/20', 'border-neon-blue', 'text-white');
            btn.classList.remove('border-white/20', 'text-gray-400', 'hover:border-neon-blue', 'hover:text-white');

            const category = btn.getAttribute('data-category');
            renderItems(category);
        });
    });

    // Initial Render - Default to 'festival' as requested
    renderItems('festival');

    // Visually activate the FESTIVAL button
    const festivalBtn = document.querySelector('button[data-category="festival"]');
    if (festivalBtn) {
        // Reset others (if any were hardcoded active html)
        filterButtons.forEach(b => {
            b.classList.remove('active', 'bg-neon-blue/20', 'border-neon-blue', 'text-white');
            b.classList.add('border-white/20', 'text-gray-400');
        });
        // Activate this one
        festivalBtn.classList.add('active', 'bg-neon-blue/20', 'border-neon-blue', 'text-white');
        festivalBtn.classList.remove('border-white/20', 'text-gray-400');
    }
}

function renderDeals() {
    const grid = document.getElementById('deals-grid');
    if (!grid) return;

    const isAdmin = true; // TEMPORARY FORCE SHOW
    const visibleDeals = DEALS.filter(d => !d.admin || isAdmin);

    grid.innerHTML = visibleDeals.map(deal => `
        <div class="relative group transform hover:-translate-y-1 transition-transform duration-300">
            <div class="bg-retro-paper text-black p-8 shadow-[10px_10px_0px_#00d4ff] relative overflow-hidden">
                <div class="absolute top-0 left-0 w-full h-2 ticket-edge opacity-50"></div>
                <div class="flex justify-between items-start mb-6 border-b-2 border-dashed border-black/20 pb-4">
                    <div>
                        <p class="font-mono text-[10px] text-black/50">ID_TRANSACTION: ${deal.id}</p>
                        <h3 class="font-future text-xl mt-1 font-bold">${deal.title}</h3>
                    </div>
                    <div class="text-white px-3 py-1 font-future text-sm font-bold shadow-sm transform -rotate-2" style="background-color: ${deal.color}">
                        ${deal.discount}
                    </div>
                </div>
                <p class="font-body italic text-lg mb-8 text-black/80 leading-relaxed">"${deal.description}"</p>
                <div class="flex justify-between items-end">
                    <div class="font-mono text-[10px] space-y-1">
                        <p class="text-red-600 font-bold tracking-widest">${deal.validity}</p>
                        <p>PRIORITÉ : HAUTE</p>
                    </div>
                    <div class="flex gap-1 h-8 items-end opacity-70">
                        <div class="bg-black w-1 h-full"></div>
                        <div class="bg-black w-2 h-2/3"></div>
                        <div class="bg-black w-1 h-full"></div>
                        <div class="bg-black w-3 h-1/2"></div>
                        <div class="bg-black w-1 h-full"></div>
                    </div>
                </div>
            </div>
            <div class="absolute -bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-1">
                <button onclick="${deal.url ? `openDealOverlay('${deal.url}')` : `activateDeal('${deal.id}')`}"
                    class="bg-neon-green text-black font-future px-4 py-3 text-xs border-2 border-black shadow-[4px_4px_0_black] hover:translate-y-1 hover:shadow-none whitespace-nowrap cursor-pointer">
                    ${deal.url ? "VOIR L'OFFRE" : "ACTIVER LE PASS"}
                </button>
                <button onclick="selectDeal('${deal.id}')"
                    class="bg-white text-black font-future px-4 py-3 text-xs border-2 border-black shadow-[4px_4px_0_black] hover:translate-y-1 hover:shadow-none whitespace-nowrap cursor-pointer hover:bg-neon-blue hover:text-white transition-colors">
                    SÉLECTIONNER
                </button>
            </div>
        </div>
    `).join('');
}

/* =========================================
   PRICING
   ========================================= */

const PRICE_PER_KM = 2.0;
const FREE_KM_LIMIT = 333; // Updated to 333km as requested (Zone Europe)
let LOCATION_DATA = {}; // Map name -> {id, dist, name}
let LAST_SIMULATION = null; // Store last result for export

function initPricing() {
    const departureInput = document.getElementById('sim-departure');
    const destinationInput = document.getElementById('sim-destination');
    const calcBtn = document.getElementById('btn-calculate');

    if (!departureInput || !destinationInput || !calcBtn) return;

    populateDataList();
    calcBtn.addEventListener('click', calculateTrajectory);
}

function populateDataList() {
    const dataList = document.getElementById('locations-list');
    if (!dataList) return;

    dataList.innerHTML = '';
    LOCATION_DATA = {};

    Object.entries(LOCATIONS).forEach(([category, places]) => {
        places.forEach(p => {
            // Populate Map
            LOCATION_DATA[p.name] = p;

            // Populate Datalist
            const opt = document.createElement('option');
            opt.value = p.name;
            dataList.appendChild(opt);
        });
    });
}

// --- OPEN SOURCE ROUTING IMPLEMENTATION ---

// 1. Geocoding (Address -> Lat/Lon) via Nominatim
async function getCoordinates(query) {
    // START FIX: Clean query of suffixes like (QG) or (Rust, DE) etc.
    // This allows "Baltzenheim (QG), France" -> "Baltzenheim, France" which works.
    const cleanQuery = query.replace(/\s*\(.*?\)/g, '').trim();

    try {
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(cleanQuery)}&limit=1`;
        const resp = await fetch(url);
        const data = await resp.json();
        if (data && data.length > 0) {
            return { lat: data[0].lat, lon: data[0].lon, display_name: data[0].display_name };
        }
    } catch (e) {
        console.error("Geocoding Error", e);
    }
    return null;
}

// 2. Routing (Lat/Lon -> Real Road Dist) via OSRM
async function getRoadDistance(startCoords, endCoords) {
    try {
        // OSRM Public Server (Demo)
        const url = `https://router.project-osrm.org/route/v1/driving/${startCoords.lon},${startCoords.lat};${endCoords.lon},${endCoords.lat}?overview=false`;
        const resp = await fetch(url);
        const data = await resp.json();

        if (data.code === 'Ok' && data.routes.length > 0) {
            const distMeters = data.routes[0].distance;
            const durationSeconds = data.routes[0].duration;
            return {
                distKm: Math.round(distMeters / 1000),
                durationMin: Math.round(durationSeconds / 60)
            };
        }
    } catch (e) {
        console.error("Routing Error", e);
    }
    return null;
}

// Main Calculator
async function calculateTrajectory() {
    const departureInput = document.getElementById('sim-departure');
    const destinationInput = document.getElementById('sim-destination');
    const paxSelect = document.getElementById('sim-pax');
    const supplementInput = document.getElementById('sim-supplement');
    const outputScreen = document.getElementById('sim-result');
    const priceDisplay = document.getElementById('price-display');
    const detailDisplay = document.getElementById('sim-details');
    const mapFrame = document.getElementById('sim-map-frame');
    const mapOverlay = document.getElementById('map-overlay');

    if (!departureInput || !destinationInput) return;

    let startLoc = departureInput.value.trim();
    let endLoc = destinationInput.value.trim();

    if (startLoc === "" || endLoc === "") {
        return; // Silent return if empty
    }

    // Force France Context for Departure if generic
    if (!startLoc.toLowerCase().includes('france') && !startLoc.toLowerCase().includes('germany') && !startLoc.toLowerCase().includes('suisse')) {
        startLoc += ", France";
    }

    // Show loading state
    if (outputScreen) outputScreen.classList.remove('hidden');
    if (priceDisplay) priceDisplay.innerText = "...";
    if (detailDisplay) detailDisplay.innerHTML = `<div class="animate-pulse text-neon-blue">CALCUL SATELLITE EN COURS...</div>`;

    // 1. Get Coordinates
    // Prioritize Presets to save API calls/time if possible? 
    // Actually, user wants "Google Accuracy", so let's check basic Presets first for speed, 
    // BUT since user complained about accuracy, maybe we force OSRM even for known?
    // Let's force OSRM for accuracy if 'Location Data' doesn't have exact coordinates.
    // We don't have coords in LOCATION_DATA. So we fetch everything.

    // Allow UI to breathe
    await new Promise(r => setTimeout(r, 10));

    const startCoords = await getCoordinates(startLoc);
    const endCoords = await getCoordinates(endLoc);

    let tripDist = 0;
    let duration = 0;
    let isSuccess = false;

    if (startCoords && endCoords) {
        const routeData = await getRoadDistance(startCoords, endCoords);
        if (routeData) {
            tripDist = routeData.distKm;
            duration = routeData.durationMin;
            isSuccess = true;
        }
    }

    // Fallback if APIs fail (e.g. rate limit): Use Heuristic
    if (!isSuccess) {
        console.warn("API Fail - Using Fallback");
        const depData = LOCATION_DATA[startLoc];
        const destData = LOCATION_DATA[endLoc];
        if (depData && destData) {
            if (depData.id === 'baltzenheim') tripDist = destData.dist;
            else tripDist = Math.round((depData.dist + destData.dist) * 0.9);
            isSuccess = true;
            duration = Math.round(tripDist * 1.0);
        }
    }

    // Calculate Price
    let nbPax = 1;
    if (paxSelect && paxSelect.value) nbPax = parseInt(paxSelect.value, 10);

    let finalPrice = 0;
    const approachDist = Math.max(0, 0 - FREE_KM_LIMIT); // Essentially 0 now
    // For now, assume Approach is 0 for simplicity unless we calc Baltzenheim -> Start.
    // Let's keep Approach logic simple: If Start != Baltzenheim, we assume standard approach logic or ignored.
    // Re-implementing basic approach fee if Start is far? 
    // User asked "Simple calculation: KM * 2". Let's stick to that strictly as requested.

    const totalDist = tripDist; // Ignoring approach logic to satisfy "Just take Google value * 2"
    // Minimum fare of 20€ for trips < 10km (2€ * 10km = 20€)
    // If distance > 0, ensure min price is 20
    finalPrice = (totalDist > 0) ? Math.max(20, Math.round(totalDist * PRICE_PER_KM)) : 0;

    let dealText = "";

    // Map Embed Update
    const cleanForMaps = (str) => {
        let clean = str.replace(/\(.*\)/, '').trim();
        // Removed "Alsace, France" enforcement for 800km radius
        if (clean.toLowerCase().includes('europa-park') || clean.toLowerCase().includes('rulantica')) return clean + ", Germany";
        return clean;
    };
    // Update Map Embed
    // STRATEGY:
    // 1. Embed URL: Use legacy 'maps.google.com' which is often more permissive for non-API embeds than 'www.google.com'.
    // 2. Link URL: Full "Satellite + Driving" mode for the external button (Always works).
    const sAddr = encodeURIComponent(cleanForMaps(startLoc));
    const dAddr = encodeURIComponent(cleanForMaps(endLoc));

    // Legacy URL for Iframe (Higher success rate without Key)
    // Added 'hl=fr' for French UI
    const mapsEmbedUrl = `https://maps.google.com/maps?saddr=${sAddr}&daddr=${dAddr}&hl=fr&output=embed`;

    // Full URL for External Button (Satellite + Driving)
    const mapsLinkUrl = `https://www.google.com/maps?saddr=${sAddr}&daddr=${dAddr}&t=k&dirflg=d`;

    if (mapFrame) {
        if (mapFrame.src !== mapsEmbedUrl) {
            mapFrame.src = mapsEmbedUrl;
            mapFrame.onload = () => {
                if (mapOverlay) mapOverlay.classList.add('hidden');
            };
        }
    }

    // Deal Logic
    if (currentDeal) {
        if (currentDeal.id === "GASTRO-STAR") {
            const supp = supplementInput && supplementInput.value ? parseFloat(supplementInput.value) : 0;
            finalPrice += (supp * nbPax);
            dealText = `<div class="text-neon-blue font-bold mt-2">✨ OPTION GASTRO : +${supp * nbPax}€</div>`;
        } else if (currentDeal.id === "DEAL-KITT") {
            finalPrice += (20 * nbPax);
            dealText = `<div class="text-neon-blue font-bold mt-2">⚡ PACK ${currentDeal.title} : ACTIVÉ</div>`;
        } else {
            finalPrice += (20 * nbPax);
            dealText = `<div class="text-neon-blue font-bold mt-2">⚡ PACK ${currentDeal.title} : +${20 * nbPax}€</div>`;
        }
    }

    if (isSuccess) {
        if (priceDisplay) priceDisplay.innerText = finalPrice;
        if (detailDisplay) {
            detailDisplay.innerHTML = `
                <div class="flex justify-between border-b border-white/10 pb-1 mb-1 font-mono text-[10px]">
                    <span>DE: ${startLoc}</span>
                    <span>À: ${endLoc}</span>
                </div>
                <div class="font-mono text-xs space-y-1">
                    <div>DIST. RÉELLE : ${tripDist} KM (${nbPax} pers.)</div>
                ${dealText}
            `;

            // --- SYNC TO RESERVATION FORM ---
            const resPickup = document.getElementById('res-pickup');
            const resDrop = document.getElementById('res-drop');
            const resPax = document.getElementById('res-pax');
            const resDuration = document.getElementById('res-duration');
            const resPriceEst = document.getElementById('res-price-est');
            const resNotes = document.getElementById('res-notes');

            // Calculate Base Price (Sans Options)
            const basePrice = (tripDist > 0) ? Math.max(20, Math.round(tripDist * PRICE_PER_KM)) : 0;

            if (resPickup) resPickup.value = startLoc;
            if (resDrop) resDrop.value = endLoc;
            if (resPax) resPax.value = nbPax;
            if (resDuration) resDuration.value = `${duration} min`;
            if (resPriceEst) resPriceEst.value = `${basePrice} €`;

            if (resNotes) {
                // Keep the final price in notes as it includes deals/options which is important for the estimate
                resNotes.value = `Estimation Trajet:\n- Distance: ${tripDist} km\n- Durée: ${duration} min\n- Prix Base: ${basePrice} €\n- Prix Final (avec options): ${finalPrice} €\n- Passagers: ${nbPax}\n\n(Données transmises par le simulateur)`;
            }

            speakSummary({ destination: endLoc, distance: tripDist, price: finalPrice });
        }
    } else {
        if (detailDisplay) {
            detailDisplay.innerHTML = `
                <div class="text-limit-red font-bold text-xs border border-limit-red/30 p-2 rounded">
                    ⚠️ ERREUR DE KALCUL <br/>
                    Impossible de déterminer la route exacte. Veuillez nous contacter.
                </div>
            `;
        }
    }
}


/* =========================================
/* =========================================
   RESERVATION & LEGAL
   ========================================= */

/* =========================================
   iAkvenir PROTOCOL IMPLEMENTATION
   ========================================= */

const AMBIANCE_PROTOCOLS = {
    "silence": {
        response: "Bien reçu. Activation du protocole furtif. Le calme est propice à la réflexion. Je coupe les circuits audio non essentiels.",
        label: "Silence (Furtif)"
    },
    "relax": {
        response: "Configuration 'Lounge' activée. Sélection d'une playlist instrumentale apaisante. Détendez-vous, je gère la route.",
        label: "Relax (Lounge)"
    },
    "futuriste": {
        response: "Excellent choix. Activation du protocole Synthwave. Les basses fréquences sont synchronisées avec le scanner avant. En route vers le futur.",
        label: "Futuriste (Synthwave)"
    },
    "retro": {
        response: "Chargement des archives temporelles. Retour aux classiques intemporels. Nostalgie activée.",
        label: "Rétro (Archives)"
    },
    "dab": {
        response: "Balayage des fréquences numériques alsaciennes... Connexion établie au réseau local. Vous aurez le contrôle de la station.",
        label: "Radio DAB"
    },
    // DAB Alsace (Local)
    "dkl": {
        response: "Dreyeckland. La puissance des trois frontières. Connexion au réseau tri-national.",
        label: "DKL (Dreyeckland)"
    },
    "azur-fm": {
        response: "Le rythme du Centre-Alsace. Parfait pour traverser le vignoble.",
        label: "Azur FM (Centre)"
    },
    "rdl": {
        response: "RDL 68. La radio libre de Colmar. Connexion immédiate.",
        label: "RDL 68 (Colmar)"
    },
    // Radio FG
    "fg-main": {
        response: "Connexion au réseau FG. Feel Good. House music validée.",
        label: "Radio FG (Officiel)"
    },
    "fg-chic": {
        response: "Ambiance Lounge de luxe. Sélection Chic activée.",
        label: "FG Chic (Lounge)"
    },
    "fg-deep": {
        response: "Plongée en eaux profondes. Fréquences Deep House verrouillées.",
        label: "FG Deep (House)"
    },
    // PulsRadio Protocols
    "puls-dance": {
        response: "Mode Clubbing activé. Connexion au flux PulsRadio Dance. Énergie maximale.",
        label: "Puls Dance (Club)"
    },
    "puls-trance": {
        response: "Protocole Trance. Voyage mental initié. Accélération du rythme cardiaque.",
        label: "Puls Trance (Hyper)"
    },
    "puls-90": {
        response: "Retour vers le passé. Génération Dancefloor 90 activée.",
        label: "Puls 90's (Retro)"
    },
    "puls-2000": {
        response: "Chargement du Millésime 2000. L'aube du nouveau millénaire.",
        label: "Puls 2000 (Millennium)"
    }
};

function initProtocol() {
    const ambianceSelect = document.getElementById('res-ambiance');
    const navAmbianceSelect = document.getElementById('nav-ambiance');

    // Function to handle change
    const handleAmbianceChange = (val) => {
        // Sync both selectors if they exist
        if (ambianceSelect && ambianceSelect.value !== val) ambianceSelect.value = val;
        if (navAmbianceSelect && navAmbianceSelect.value !== val) navAmbianceSelect.value = val;

        if (AMBIANCE_PROTOCOLS[val]) {
            speak(AMBIANCE_PROTOCOLS[val].response);
            playRadio(val); // Trigger Radio Logic
        }
    };

    // Form Selector Listener
    if (ambianceSelect) {
        ambianceSelect.addEventListener('change', (e) => handleAmbianceChange(e.target.value));
    }

    // Navbar Selector Listener
    // Navbar Selector Listener (Desktop + Mobile Sync)
    const navAmbianceSelectMobile = document.getElementById('nav-ambiance-mobile');

    const updateAmbianceUI = (val) => {
        if (navAmbianceSelect) navAmbianceSelect.value = val;
        if (navAmbianceSelectMobile) navAmbianceSelectMobile.value = val;
        handleAmbianceChange(val);
    };

    if (navAmbianceSelect) {
        navAmbianceSelect.addEventListener('change', (e) => updateAmbianceUI(e.target.value));
    }
    if (navAmbianceSelectMobile) {
        navAmbianceSelectMobile.addEventListener('change', (e) => updateAmbianceUI(e.target.value));
    }

    // Volume Control Listener (Desktop + Mobile Sync)
    const volSlider = document.getElementById('vol-control');
    const volSliderMobile = document.getElementById('vol-control-mobile');
    const volDisplay = document.getElementById('vol-percent');

    const updateVolume = (val) => {
        const vol = val / 100;
        if (audioPlayer) audioPlayer.volume = vol;
        if (volDisplay) volDisplay.innerText = `${val}%`;

        // Sync Inputs
        if (volSlider) volSlider.value = val;
        if (volSliderMobile) volSliderMobile.value = val;
    };

    if (volSlider) {
        volSlider.addEventListener('input', (e) => updateVolume(e.target.value));
        // Init volume from slider
        if (audioPlayer) audioPlayer.volume = volSlider.value / 100;
    }
    if (volSliderMobile) {
        volSliderMobile.addEventListener('input', (e) => updateVolume(e.target.value));
    }

    // Reservation Button Override
    const btnRes = document.getElementById('btn-res-build');
    if (btnRes) {
        btnRes.addEventListener('click', generateMissionRecap);
    }
}

/* =========================================
   RHYTHM ENGINE (Audio-Reactive Visuals)
   ========================================= */
class RhythmEngine {
    constructor() {
        this.bpm = 0;
        this.intervalId = null;
        this.isActive = false;
        this.elements = {
            stars: document.querySelectorAll('.rhythm-star'),
            path: document.querySelector('.rhythm-path'),
            gallery: document.querySelectorAll('.gallery-img, .lightbox-content'),
            badges: document.querySelectorAll('.neon-badge')
        };
        this.currentType = 'relax';
        this.currentCategory = null;
    }

    setGalleryCategory(cat) {
        this.currentCategory = cat;
        this.updateVisuals();
    }

    updateVisuals() {
        const type = this.currentType;
        // AMBILIGHT FLUID ANIMATION & SNAKE SPEED
        const glowLayer = document.getElementById('lightbox-glow-layer');
        const frame = document.getElementById('lightbox-frame');

        // Calculate Speeds
        const snakeSpeed = type === 'strobe' ? '40s' : (type === 'pulse' ? '120s' : '240s');

        // Lava Lamp Duration
        const lavaSpeed = type === 'strobe' ? '1.5s' : '4s';

        if (glowLayer) {
            // "Partie Festival" Logic: Animation ON only for Strobe (Techno/Puls) AND Category == 'festival'
            if (type === 'strobe' && this.currentCategory === 'festival') {
                glowLayer.classList.add('animate-lava');
                glowLayer.style.animationDuration = lavaSpeed;
            } else {
                // Relax/Retro/Silence OR Non-Festival = Static Glow (No Animation)
                glowLayer.classList.remove('animate-lava');
                glowLayer.style.animationDuration = '';
                glowLayer.style.transform = 'scale(1.05)'; // Default slight scale
                glowLayer.style.opacity = '0.6';
            }
        }

        if (frame) {
            frame.style.setProperty('--snake-speed', snakeSpeed);
        }
    }

    setMode(ambiance) {
        this.stop();
        // Refresh elements
        this.elements.stars = document.querySelectorAll('.rhythm-star animate');
        this.elements.path = document.querySelector('.rhythm-path');

        switch (ambiance) {
            case 'relax':
            case 'silence':
                this.start(60, 'breath'); // Slow breath
                break;
            case 'futuriste':
            case 'dkl':
            case 'dab':
            case 'retro':
                this.start(110, 'pulse'); // Medium
                break;
            case 'puls-trance':
            case 'puls-dance':
            case 'puls-2000':
                this.start(140, 'strobe'); // Fast
                break;
            default:
                this.start(90, 'pulse');
        }
    }

    start(bpm, type) {
        if (this.isActive) return;
        this.isActive = true;
        const interval = (60 / bpm) * 1000;

        console.log(`RhythmEngine Started: ${bpm} BPM (${type})`);

        // Apply Global Class for CSS
        document.body.setAttribute('data-rhythm', type);

        // Update SVG Animation Durations
        if (this.elements.stars) {
            this.elements.stars.forEach(anim => {
                const duration = (120 / bpm) * 2;
                anim.setAttribute('dur', `${duration}s`);
            });
        }

        this.currentType = type;
        this.updateVisuals();

        // JS Pulse (Trigger Loop for other sharp elements if any)
        this.intervalId = setInterval(() => {
            this.triggerBeat(type);
        }, interval);
    }

    stop() {
        this.isActive = false;
        if (this.intervalId) clearInterval(this.intervalId);
        document.body.removeAttribute('data-rhythm');

        const glowLayer = document.getElementById('lightbox-glow-layer');
        if (glowLayer) {
            glowLayer.classList.remove('animate-lava');
            glowLayer.style.animationDuration = '';
            glowLayer.style.transform = '';
            glowLayer.style.opacity = '';
        }
    }

    triggerBeat(type) {
        // Main 'Beat' Logic (Kept for other potential effects, or subtle variations)
        // Ambilight is now handled by CSS 'animate-lava' for fluidity.
        // We can add very subtle extra kicks here if needed, but user requested "moins brutal".
        // So we leave this empty for the glow layer.
    }
}

const rhythmEngine = new RhythmEngine();


function generateMissionRecap() {

    let distanceText = "--";
    const detailsEl = document.getElementById('sim-details');
    if (detailsEl && detailsEl.innerText.includes('DIST. RÉELLE')) {
        const match = detailsEl.innerText.match(/DIST\. RÉELLE : (\d+)/);
        if (match) distanceText = match[1];
    }

    const ambianceLabel = AMBIANCE_PROTOCOLS[sAmbianceVal] ? AMBIANCE_PROTOCOLS[sAmbianceVal].label : "Standard";

    // 1. CONCISE SUMMARY (Console)
    const recapText = `
_ORDRE DE MISSION GÉNÉRÉ.

[CONTACT]
ID: ${sNom} ${sPrenom}
TEL: ${sPhone}
PAX: ${sPax}

[MISSION]
DATE: ${sDateTime}
TRAJET: ${sPickup} >> ${sDrop}
DIST: ${distanceText} km

[CONFIG]
AMBIANCE: ${ambianceLabel}
OPTION: ${sOption}
NOTES: ${sNotes}

[FINANCE]
ESTIMATION: ${priceText} €

_DOCUMENT CERTIFIÉ PRÊT.
    `.trim();

    const consoleOut = document.getElementById('res-summary');
    if (consoleOut) {
        consoleOut.innerText = recapText;
        consoleOut.scrollTop = consoleOut.scrollHeight;
    }

    // 2. CONCISE VOCAL
    const voiceMsg = `Dossier complet pour ${sPrenom}. Le Bon de Réservation a été édité avec photo et détails légaux. Envoyez ce document au QG immédiatement. Terminé.`;
    speak(voiceMsg);

    // 3. GENERATE GRAPHIC PDF (FULL VTC LEGAL)
    if (window.generateRecapPDF) {
        window.generateRecapPDF();
    } else {
        console.error("PDF Generator function not found");
    }
}

window.generateRecapPDF = async function () {
    if (!window.jspdf) {
        console.error("jsPDF not loaded");
        return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
    });

    // --- DATA COLLECTION ---
    const prenom = document.getElementById('hero-prenom')?.value || "CLIENT";
    const nom = document.getElementById('hero-nom')?.value || "INCONNU";
    const phone = document.getElementById('hero-phone')?.value || "Non renseigné";
    const date = document.getElementById('res-pickup-datetime')?.value || "Immédiat";
    const price = document.getElementById('sim-price-display')?.innerText || "SUR DEVIS";
    const dist = document.getElementById('sim-dist-display')?.innerText || "--";
    const dep = document.getElementById('sim-departure')?.value || "Non défini";
    const dest = document.getElementById('sim-destination')?.value || "Non défini";
    const vehicle = "TESLA MODEL 3 (Blanc Nacré)";
    const pilot = "Laurent (Certifié iA_k)";

    // --- STYLING CONSTANTS ---
    const COL_BG = "#FFFFFF";
    const COL_TEXT = "#1A1A1A"; // Anthracite
    const COL_ACCENT = "#E50914"; // Scanner Red
    const COL_SUB = "#666666";

    // --- BACKGROUND ---
    doc.setFillColor(COL_BG);
    doc.rect(0, 0, 210, 297, 'F');

    // --- HEADER ---
    doc.setFillColor(COL_TEXT);
    doc.rect(0, 0, 210, 25, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("iA_k_venir", 15, 17);

    doc.setTextColor(COL_ACCENT);
    doc.setFontSize(14);
    doc.text("BON DE RÉSERVATION", 195, 17, { align: "right" });

    // --- CONTENT LAYOUT (Split) ---
    const leftX = 15;
    const rightX = 130;
    let y = 45;

    // --- LEFT COLUMN: DATA ---
    // 1. CLIENT
    doc.setDrawColor(COL_ACCENT);
    doc.setLineWidth(0.5);
    doc.line(leftX, y, 110, y);
    y += 8;
    doc.setFontSize(10);
    doc.setTextColor(COL_ACCENT);
    doc.text("CLIENT / PASSAGER", leftX, y);
    y += 7;
    doc.setFontSize(12);
    doc.setTextColor(COL_TEXT);
    doc.text(`${prenom} ${nom}`, leftX, y);
    y += 6;
    doc.setFontSize(10);
    doc.setTextColor(COL_SUB);
    doc.text(`Tél: ${phone}`, leftX, y);
    y += 15;

    // 2. MISSION
    doc.setDrawColor(COL_ACCENT);
    doc.line(leftX, y, 110, y);
    y += 8;
    doc.setTextColor(COL_ACCENT);
    doc.text("DÉTAILS MISSION", leftX, y);
    y += 7;
    doc.setTextColor(COL_TEXT);
    doc.text(`Date: ${date}`, leftX, y);
    y += 10;
    doc.setFontSize(9);
    doc.setTextColor(COL_SUB);
    doc.text("DÉPART", leftX, y);
    y += 5;
    doc.setFontSize(11);
    doc.setTextColor(COL_TEXT);
    doc.text(dep, leftX, y, { maxWidth: 90 });
    const splitDep = doc.splitTextToSize(dep, 90);
    y += (splitDep.length * 5) + 5;
    doc.setFontSize(9);
    doc.setTextColor(COL_SUB);
    doc.text("ARRIVÉE", leftX, y);
    y += 5;
    doc.setFontSize(11);
    doc.setTextColor(COL_TEXT);
    doc.text(dest, leftX, y, { maxWidth: 90 });
    const splitDest = doc.splitTextToSize(dest, 90);
    y += (splitDest.length * 5) + 15;

    // 3. LOGISTICS
    doc.setDrawColor(COL_ACCENT);
    doc.line(leftX, y, 110, y);
    y += 8;
    doc.setTextColor(COL_ACCENT);
    doc.setFontSize(10);
    doc.text("LOGISTIQUE", leftX, y);
    y += 7;
    doc.setTextColor(COL_TEXT);
    doc.text(`Distance estimée: ${dist}`, leftX, y);
    y += 10;
    doc.setFillColor(COL_TEXT);
    doc.rect(leftX, y, 60, 20, 'F');
    doc.setTextColor(COL_ACCENT);
    doc.setFontSize(9);
    doc.text("PRIX ESTIMÉ TTC", leftX + 5, y + 6);
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.text(price, leftX + 5, y + 16);
    y += 35;

    // 4. FLEET - FIXED
    doc.setDrawColor(COL_ACCENT);
    doc.line(leftX, y, 110, y);
    y += 8;
    doc.setTextColor(COL_ACCENT);
    doc.setFontSize(10);
    doc.text("UNITÉ DE TRANSPORT", leftX, y);
    y += 7;
    doc.setTextColor(COL_TEXT);
    doc.text(vehicle, leftX, y);
    y += 6;
    doc.setTextColor(COL_SUB);
    doc.setFontSize(10);
    doc.text(`Pilote: ${pilot}`, leftX, y);
    y += 6;
    doc.text("Motorisation: 100% Électrique", leftX, y);

    // --- RIGHT COLUMN: VISUAL ID ---
    const idImg = document.getElementById('webcam-result');
    if (idImg && !idImg.classList.contains('hidden') && idImg.src) {
        try {
            // FIX: Portrait Mode Aspect Ratio
            // We want to fit the image within a box of 65mm width and reasonable height (e.g. 80mm)
            // while preserving the aspect ratio.
            const rawW = idImg.naturalWidth || 640;
            const rawH = idImg.naturalHeight || 480;
            const imgRatio = rawH / rawW;

            const columnW = 65; // Full available width
            const maxImageW = 60; // Restrict width for margin
            const maxImageH = 80; // Max allowed height

            let finalW = maxImageW;
            let finalH = finalW * imgRatio;

            // If height exceeds max, scale down
            if (finalH > maxImageH) {
                finalH = maxImageH;
                finalW = finalH / imgRatio;
            }

            // Center horizontally in the 65mm column
            const xOffset = rightX + (columnW - finalW) / 2;

            doc.addImage(idImg.src, 'PNG', xOffset, 45, finalW, finalH);
            doc.setFontSize(8);
            doc.setTextColor(COL_ACCENT);
            // Place label below the image with a small margin
            doc.text("IDENTITÉ NUMÉRIQUE", rightX, 45 + finalH + 6);
        } catch (e) {
            console.warn("Could not add image to PDF", e);
        }
    } else {
        doc.setDrawColor(COL_SUB);
        doc.setLineWidth(0.2);
        doc.rect(rightX, 45, 65, 40);
        doc.setTextColor(COL_SUB);
        doc.setFontSize(8);
        doc.text("AUCUNE PHOTO VALIDÉE", rightX + 32.5, 65, { align: "center" });
    }

    // --- FOOTER ---
    const footerY = 280;
    doc.setFillColor(COL_TEXT);
    doc.rect(0, footerY, 210, 17, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(8);
    doc.text("iA_k_venir (EI) - 68320 Baltzenheim - SIRET: EN COURS - EVTC: EN COURS", 105, footerY + 6, { align: "center" });
    doc.setTextColor(COL_SUB);
    doc.text("Document généré automatiquement. Merci de votre confiance.", 105, footerY + 11, { align: "center" });

    // --- OUTPUT ---
    // Store BLOB directly to avoid fetch errors later
    currentPdfBlob = doc.output('blob');
    currentPdfBlobUrl = URL.createObjectURL(currentPdfBlob);

    // Update UI
    const previewFrame = document.getElementById('pdf-preview-frame');
    const placeholder = document.getElementById('pdf-placeholder');
    const overlay = document.getElementById('pdf-actions-overlay');
    const btnWa = document.getElementById('btn-share-wa');
    const btnMail = document.getElementById('btn-share-mail');

    if (previewFrame) {
        previewFrame.src = currentPdfBlobUrl;
        previewFrame.classList.remove('opacity-0');
    }
    if (placeholder) placeholder.style.display = 'none';
    if (overlay) overlay.style.display = 'flex';

    // Enable Buttons
    if (btnWa) { btnWa.disabled = false; btnWa.classList.remove('opacity-50', 'cursor-not-allowed'); }
    if (btnMail) { btnMail.disabled = false; btnMail.classList.remove('opacity-50', 'cursor-not-allowed'); }

    speak("Bon de réservation généré.");
};

// EXPORT TO NEW WINDOW (Fullscreen) -> NOW IN-SITE OVERLAY
function viewPdfFullscreen() {
    if (currentPdfBlobUrl) {
        const overlay = document.getElementById('pdf-fullscreen-overlay');
        const frame = document.getElementById('pdf-fullscreen-frame');

        if (overlay && frame) {
            frame.src = currentPdfBlobUrl;
            overlay.classList.remove('hidden');
            speak("Affichage du document en plein écran.");
        } else {
            console.error("PDF Overlay elements not found");
        }
    } else {
        speak("Veuillez d'abord générer le document.");
        alert("Erreur : Aucun document PDF n'a été généré. Veuillez cliquer sur 'GÉNÉRER ORDRE DE MISSION' d'abord.");
    }
}

function closePdfFullscreen() {
    const overlay = document.getElementById('pdf-fullscreen-overlay');
    const frame = document.getElementById('pdf-fullscreen-frame');

    if (overlay) {
        overlay.classList.add('hidden');
    }
    if (frame) {
        frame.src = 'about:blank'; // Clear memory/state
    }
}

// Global expose
window.viewPdfFullscreen = viewPdfFullscreen;
window.closePdfFullscreen = closePdfFullscreen;

/* =========================================
   SHARING LOGIC (WhatsApp & Email)
   ========================================= */

async function getReservationDataForShare() {
    // UPDATED: Use 'res-' IDs from the main reservation form (the "left" form)
    const prenom = document.getElementById('res-prenom')?.value || "CLIENT";
    const nom = document.getElementById('res-nom')?.value || "INCONNU";
    const email = document.getElementById('res-email')?.value || "Non renseigné";
    const phone = document.getElementById('res-phone')?.value || "Non renseigné";

    // Mission Details
    const depart = document.getElementById('res-pickup')?.value || "Non défini";
    const destination = document.getElementById('res-drop')?.value || "Non défini";
    const dateDepart = document.getElementById('res-pickup-datetime')?.value || "DATE_NON_DEFINIE";
    const dateArrivee = document.getElementById('res-arrival-datetime')?.value || "";

    // Logistics
    const duree = document.getElementById('res-duration')?.value || "--";
    const tarif = document.getElementById('res-price-est')?.value || "--";
    const pax = document.getElementById('res-pax')?.value || "1";
    const option = document.getElementById('res-opt')?.options[document.getElementById('res-opt')?.selectedIndex]?.text || "Aucune";
    const ambiance = document.getElementById('res-ambiance')?.options[document.getElementById('res-ambiance')?.selectedIndex]?.text || "Silence";
    const notes = document.getElementById('res-notes')?.value || "Aucune note";

    const subject = `RÉSERVATION VTC - ${nom.toUpperCase()} ${prenom} - ${dateDepart}`;

    // Validating "Document Texte" Request: Full Summary
    const body = `*ORDRE DE MISSION VTC - iA_k_venir*

*👤 CLIENT*
Nom : ${nom.toUpperCase()} ${prenom}
Tél : ${phone}
Email : ${email}

*🚘 MISSION*
Date Début : ${dateDepart}
${dateArrivee ? 'Date Fin (Souhaitée) : ' + dateArrivee + '\n' : ''}Départ : ${depart}
Arrivée : ${destination}
Durée Est. : ${duree}

*⚙️ LOGISTIQUE*
Passagers : ${pax}
Véhicule : TESLA MODEL 3
Tarif Est. : ${tarif}
Option : ${option}
Ambiance : ${ambiance}

*📝 NOTES / CONSIGNES*
${notes}

--------------------------------
*MENTIONS LÉGALES & CONFIRMATION*
Ce document tient lieu de bon de réservation préalable obligatoire (Art. R.3120-2 du Code des Transports).

*ENTREPRISE :*
Raison Sociale : iA_k_venir (EI) - Laurent HABERSETZER
Siège Social : 13 Rue du Rhin, 68320 BALTZENHEIM
SIRET : EN COURS D'IMMATRICULATION
Registre EVTC : EN COURS
TVA : Franchise de base (TVA non applicable, art. 293 B du CGI)

*CONDITIONS :*
Le tarif estimé est donné à titre indicatif et peut être ajusté en cas de modification de l'itinéraire ou d'attente prolongée.
En cas d'annulation moins de 24h avant, des frais peuvent s'appliquer.

*CONTACT & URGENCE :*
Tél : 07 50 98 92 97
Email : contact@iakvenir.fr
--------------------------------
Document généré via iA_k_venir Interface.
(PDF disponible sur demande ou ci-joint si supporté)
`;

    // Get Blob
    let file = null;

    // PRIORITY: Use valid in-memory blob if available
    if (currentPdfBlob) {
        console.log("Using cached PDF Blob directly.");
        file = new File([currentPdfBlob], `RESERVATION_${nom}_${dateDepart.replace(/[\s/:]/g, '-')}.pdf`, { type: 'application/pdf' });
    }
    // FALLBACK: Try URL fetch if blob missing but URL exists (Legacy support)
    else if (typeof currentPdfBlobUrl !== 'undefined' && currentPdfBlobUrl) {
        try {
            console.log("Attempting to fetch PDF from URL:", currentPdfBlobUrl);
            const blob = await fetch(currentPdfBlobUrl).then(r => r.blob());
            file = new File([blob], `RESERVATION_${nom}_${dateDepart.replace(/[\s/:]/g, '-')}.pdf`, { type: 'application/pdf' });
        } catch (e) {
            console.error("Blob conversion failed", e);
            alert("Erreur interne : Impossible de récupérer le fichier PDF. Veuillez régénérer le document.");
        }
    } else {
        console.warn("No PDF generated yet.");
    }

    return { title: subject, text: body, file: file };
}

window.shareWhatsApp = async function () {
    speak("Préparation de l'envoi WhatsApp...");
    const data = await getReservationDataForShare();

    // 1. Try Native Share (Mobile/Supported Browsers)
    if (navigator.share && data.file && navigator.canShare && navigator.canShare({ files: [data.file] })) {
        try {
            await navigator.share({
                files: [data.file],
                title: data.title,
                text: data.text
            });
            speak("Partage effectué.");
            return;
        } catch (err) {
            console.warn("Native share failed or cancelled", err);
        }
    }

    // 2. Fallback: WA Link (Text Only, no file attachment possible via URL)
    const encodedText = encodeURIComponent(`${data.title}\n\n${data.text}`);
    window.open(`https://wa.me/?text=${encodedText}`, '_blank');
    speak("Ouverture de WhatsApp. Le PDF ne peut pas être joint automatiquement via le web, veuillez l'enregistrer d'abord.");
};

// Helper to create .eml content
async function createEML(data) {
    const boundary = "----=_NextPart_000_0010_01D9";
    const to = "contact@iakvenir.fr"; // Default recipient? Or let user fill it. Usually blank or client's email if sending TO client. Let's leave TO blank for now or put company email.
    // For a reservation sent BY client TO company:
    const from = data.email || "";

    // We need Base64 of the PDF
    let pdfBase64 = "";
    if (data.file) {
        try {
            const reader = new FileReader();
            pdfBase64 = await new Promise((resolve, reject) => {
                // Safety Timeout (3s)
                const timeout = setTimeout(() => reject(new Error("File reading timed out")), 3000);

                reader.onloadend = () => {
                    clearTimeout(timeout);
                    if (reader.result) {
                        resolve(reader.result.split(',')[1]);
                    } else {
                        reject(new Error("Empty file result"));
                    }
                };
                reader.onerror = () => {
                    clearTimeout(timeout);
                    reject(new Error("File reading failed"));
                };
                reader.readAsDataURL(data.file);
            });
        } catch (readErr) {
            console.error("Base64 Failed:", readErr);
            alert("Erreur technique : La lecture du fichier PDF a échoué. Veuillez régénérer le document."); // Specific alert
            throw readErr;
        }
    }

    const now = new Date().toUTCString();
    const emlContent = `Date: ${now}
To: contact@iakvenir.fr
From: contact@iakvenir.fr
Subject: ${data.title}
MIME-Version: 1.0
X-Unsent: 1
Content-Type: multipart/mixed; boundary="${boundary}"

--${boundary}
Content-Type: text/plain; charset=UTF-8
Content-Transfer-Encoding: 8bit

${data.text}

--${boundary}
Content-Type: application/pdf; name="${data.file.name}"
Content-Transfer-Encoding: base64
Content-Disposition: attachment; filename="${data.file.name}"

${pdfBase64}

--${boundary}--`;

    return new Blob([emlContent], { type: 'message/rfc822' });
}

window.shareEmail = async function () {
    try {
        speak("Préparation de l'email...");
        const data = await getReservationDataForShare();

        // CHECK: Ensure File Exists
        if (!data.file) {
            console.warn("No PDF file generated.");
            fallbackMailto(data);
            return;
        }

        // 1. STRATÉGIE PRIORITAIRE : PARTAGE NATIF
        let canShareFiles = false;
        try {
            if (navigator.share && navigator.canShare) {
                canShareFiles = navigator.canShare({ files: [data.file] });
            }
        } catch (e) {
            console.warn("canShare check failed", e);
        }

        if (canShareFiles) {
            try {
                await navigator.share({
                    files: [data.file],
                    title: data.title,
                    text: data.text
                });
                speak("Votre logiciel de messagerie devrait être ouvert. Veuillez sélectionner le destinataire contact@iakvenir.fr si le champ est vide.");
                return;
            } catch (err) {
                console.warn("Share API error or cancelled", err);
                if (err.name === 'AbortError') return;
            }
        }

        // 2. DESKTOP STRATEGY: Generate .eml file (The "Magic File")
        // This allows opening Outlook/Mail with Attachment pre-loaded.

        if (data.file) {
            speak("Génération du brouillon avec pièce jointe...");
            try {
                const emlBlob = await createEML(data);
                const link = document.createElement('a');
                link.href = URL.createObjectURL(emlBlob);
                link.download = `RESERVATION_${data.file.name.replace('.pdf', '')}.eml`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

                // FEEDBACK
                const msg = "Le dossier email est prêt. Veuillez cliquer sur le fichier qui vient de se télécharger.";
                speak(msg);
                alert("⚠️ DOSSIER EMAIL GÉNÉRÉ (EML)\n\nUn fichier '.eml' a été téléchargé car votre navigateur bloque l'envoi direct.\n\n👉 CLIQUEZ SUR CE FICHIER POUR OUVRIR LE MAIL AVEC LA PIÈCE JOINTE.");

            } catch (e) {
                console.error("EML Generation Error", e);
                fallbackMailto(data);
            }
        } else {
            fallbackMailto(data);
        }

    } catch (globalErr) {
        console.error("Critical Share Error", globalErr);
        alert("Erreur technique lors du partage : " + globalErr.message);
        try { fallbackMailto(await getReservationDataForShare()); } catch (e) { }
    }
};

function fallbackMailto(data) {
    const subject = encodeURIComponent(data.title);
    const body = encodeURIComponent(data.text);
    window.location.href = `mailto:contact@iakvenir.fr?subject=${subject}&body=${body}`;
    speak("Ouverture de la messagerie (Mode Texte uniquement).");
}


// Explicit Download for Email Button (Direct EML Generation)
window.downloadEmlForMail = async function () {
    speak("Génération du dossier email...");
    const data = await getReservationDataForShare();

    if (!data.file) {
        speak("Veuillez d'abord générer le document.");
        return;
    }

    try {
        const emlBlob = await createEML(data);
        const link = document.createElement('a');
        link.href = URL.createObjectURL(emlBlob);
        link.download = `RESERVATION_${data.file.name.replace('.pdf', '')}.eml`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        speak("Fichier téléchargé. Cliquez dessus pour ouvrir votre messagerie.");
        alert("✅ DOSSIER EMAIL TÉLÉCHARGÉ\n\nCliquez sur le fichier téléchargé (.eml) pour ouvrir votre logiciel de messagerie avec le PDF inclus.");
    } catch (e) {
        console.error("EML Download Error", e);
        speak("Erreur lors de la génération.");
    }
};

const COMPANY_INFO = {
    name: "iA_k_venir (EI)",
    address: "68320 Baltzenheim",
    siret: "SIRET EN COURS",
    evtc: "EVTC EN COURS",
    phone: "07 50 98 92 97",
    email: "contact@iakvenir.fr"
};

function initReservation() {
    const btnBuild = document.getElementById('btn-res-build');
    const btnSpeak = document.getElementById('btn-res-speak');
    const btnWhatsapp = document.getElementById('btn-whatsapp');
    const btnEmail = document.getElementById('btn-email');

    if (btnBuild) btnBuild.addEventListener('click', updateUI);
    if (btnSpeak) btnSpeak.addEventListener('click', speakReservation);
    if (btnWhatsapp) btnWhatsapp.addEventListener('click', exportToWhatsApp);
    if (btnEmail) btnEmail.addEventListener('click', exportToEmail);

    // VALIDATION LISTENER
    const requiredIds = ['res-prenom', 'res-nom', 'res-phone', 'res-pickup', 'res-drop'];
    const validateInputs = () => {
        if (window.checkMissionReady) window.checkMissionReady();
    };

    requiredIds.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('input', validateInputs);
            el.addEventListener('change', validateInputs);
        }
    });
}

// Global Validation Function
window.checkMissionReady = () => {
    const btn = document.getElementById('btn-res-build');
    if (!btn) return;

    const ids = ['res-prenom', 'res-nom', 'res-phone', 'res-pickup', 'res-drop'];
    const isFormComplete = ids.every(id => {
        const el = document.getElementById(id);
        return el && el.value.trim().length > 0;
    });

    // Check Photo (Optional but good for status)
    const resultImg = document.getElementById('webcam-result');
    const isPhotoTaken = resultImg && !resultImg.classList.contains('hidden');

    // Condition: Form must be complete. Photo is a plus.
    // User asked: "une fois tout le formulaire rempli et ou ainsi que la photo"
    // We'll require Form.
    if (isFormComplete) {
        // ACTIVATE VISUALS
        btn.classList.remove('bg-neon-blue', 'text-black');
        btn.classList.add('bg-yellow-400', 'text-black', 'animate-pulse', 'shadow-[0_0_30px_rgba(255,230,0,0.8)]', 'border-yellow-400');
        // Update Text if needed? No, keeps "GENERER..."
    } else {
        // RESET
        btn.classList.remove('bg-yellow-400', 'text-black', 'animate-pulse', 'shadow-[0_0_30px_rgba(255,230,0,0.8)]', 'border-yellow-400');
        btn.classList.add('bg-neon-blue', 'text-black');
    }
};

function buildData() {
    const sPrenom = document.getElementById('res-prenom');
    const sNom = document.getElementById('res-nom');
    const sEmail = document.getElementById('res-email'); // Added Email
    const sPhone = document.getElementById('res-phone');
    const sPickup = document.getElementById('res-pickup');
    const sDrop = document.getElementById('res-drop');
    const sPax = document.getElementById('res-pax'); // New Pax

    // NEW FLATPICKR FIELDS
    const sPickupDateTime = document.getElementById('res-pickup-datetime');
    const sArrivalDateTime = document.getElementById('res-arrival-datetime');

    const sOpt = document.getElementById('res-opt');
    const sNotes = document.getElementById('res-notes');


    return {
        prenom: (sPrenom.value || 'INCONNU').trim(),
        nom: (sNom.value || 'INCONNU').trim().toUpperCase(),
        email: (sEmail && sEmail.value) ? sEmail.value.trim() : 'NON RENSEIGNÉ', // Added Email
        phone: (sPhone && sPhone.value) ? sPhone.value.trim() : 'NON RENSEIGNÉ',
        pickup: (sPickup.value || 'NON RENSEIGNÉ').trim(),
        drop: (sDrop.value || 'NON RENSEIGNÉ').trim(),
        pax: (sPax && sPax.value) ? sPax.value : '1', // Pax

        // Use New Datetime Fields
        date: (sPickupDateTime && sPickupDateTime.value) ? sPickupDateTime.value : '—', // Stores "DD/MM/YYYY HH:mm"
        time: (sArrivalDateTime && sArrivalDateTime.value) ? sArrivalDateTime.value : 'NON DÉFINIE', // Arrival Request

        opt: sOpt.options[sOpt.selectedIndex].text,
        notes: (sNotes.value || 'AUCUNE').trim(),
        created: new Date().toLocaleString('fr-FR'),
        price: "SUR DEVIS (>100€) ou TAXIMÈTRE" // Simplification for demo
    };
}

function generateLegalText(data) {
    const dashedLine = "--------------------------------------------------";

    // 1. BON DE RÉSERVATION (Obligatoire à bord)
    const bon = `
${dashedLine}
   BON DE RÉSERVATION (Art. R.3122-1)
${dashedLine}
ENTREPRISE : ${COMPANY_INFO.name}
SIÈGE : ${COMPANY_INFO.address}
EVTC : ${COMPANY_INFO.evtc}

CLIENT : ${data.prenom} ${data.nom}
EMAIL : ${data.email}
TÉL : ${data.phone}

MISSION :
- Date commande : ${data.created}
- Prise en charge : ${data.date} à ${data.time}
- Lieu départ : ${data.pickup}
- Lieu arrivée : ${data.drop}
- Passagers : ${data.pax}
- Note / Offre : ${data.notes}
${dashedLine}
`;

    // 2. DEVIS (Si > 100€)
    const devis = `
${dashedLine}
        DEVIS ESTIMATIF (Valable 30j)
${dashedLine}
ÉMETTEUR : ${COMPANY_INFO.name}
SIRET : ${COMPANY_INFO.siret}
TVA : ${COMPANY_INFO.tva}
RC PRO : ${COMPANY_INFO.insurance}

DÉTAIL PRESTATION :
- Trajet : ${data.pickup} >> ${data.drop}
- Passagers : ${data.pax}
- Option : ${data.opt}
- Option : ${data.opt}
- NOTES / OFFRES : ${data.notes}

PRIX ESTIMÉ : ${data.price}
(TVA 10% sur transfert / 20% sur mise à dispo)

Bon pour accord (Date & Signature) :
.
.
${dashedLine}
`;

    // 3. FACTURE (Mentions légales)
    const facture = `
${dashedLine}
        FACTURE N° [À GÉNÉRER]
${dashedLine}
DATE ÉMISSION : [DATE DU JOUR]
DATE PRESTATION : ${data.date}

DÉPART : ${data.pickup}
ARRIVÉE : ${data.drop}
NOTES / OFFRES : ${data.notes}

KILOMÈTRES : [À RÉEL] km
CO2 : [X] g/km

TOTAL HT : ... €
TVA : ... €
TOTAL TTC : ... €

Cond. règlement : Comptant.
Indemnité retard (Pro) : 40€.
${dashedLine}
`;

    return { bon, devis, facture };
}

function generateKITTScript(data) {
    return `Analyse terminée. Je viens de compiler les données pour votre prochain trajet. J'ai pris la liberté de vérifier l'itinéraire deux fois... au cas où vos capteurs humains seraient défaillants.

RÉCAPITULATIF DE LA MISSION :

PASSAGER : ${data.prenom} (Espérons qu'il n'ait pas oublié son sens de l'aventure...)
PRISE EN CHARGE : ${data.pickup}
DESTINATION : ${data.drop}
DATE : ${data.date} à ${data.time}
ACTIVITÉ : ${data.opt}

KITT : "${getKITTHumor(data)}"`;
}

function getKITTHumor(data) {
    const text = (data.pickup + " " + data.drop + " " + data.opt).toLowerCase();
    const time = data.time;

    // Time-based (Simple heuristic for demo)
    if (time.includes('22:') || time.includes('23:') || time.includes('00:') || time.includes('01:') || time.includes('02:') || time.includes('03:') || time.includes('04:')) {
        return "Mode furtif activé. Les scanners sont à portée maximale.";
    }

    // Context-based
    if (text.includes('vin') || text.includes('dégustation')) {
        return "Je surveillerai votre trajectoire à pied avec attention.";
    }
    if (text.includes('noël') || text.includes('marche')) {
        return "J'ai activé les capteurs thermiques pour contrer le vin chaud.";
    }
    if (text.includes('casino')) {
        return "Mes calculs indiquent 99% de chances que la banque gagne.";
    }
    if (text.includes('europa') || text.includes('park')) {
        return "Mes accélérations sont plus fluides que le Silver Star.";
    }
    if (text.includes('aérodrome') || text.includes('aéroport') || text.includes('bâle') || text.includes('strasbourg')) {
        return "Synchronisation avec les plans de vol effectuée.";
    }
    if (text.includes('mariage')) {
        return "J'ai préparé la playlist 'Romance Algorithmique'.";
    }

    // Default randoms
    const defaults = [
        "Système paré. Turbines à 110%.",
        "Je suis prêt. Espérons que la route soit dégagée.",
        "Mes circuits frémissent d'impatience.",
        "Un choix d'itinéraire logique.",
        "Je garderai un oeil sur le trafic, et l'autre sur vous."
    ];
    return defaults[Math.floor(Math.random() * defaults.length)];
}

function updateUI() {
    const data = buildData();
    const docs = generateLegalText(data);
    const kittTxt = generateKITTScript(data);

    const summaryEl = document.getElementById('res-summary');
    const photoImg = document.getElementById('webcam-result');
    let photoHtml = "";

    // Check if valid photo exists (non-hidden and has src)
    if (photoImg && !photoImg.classList.contains('hidden') && photoImg.src && photoImg.src.startsWith('data:image')) {
        photoHtml = `
            <div class="mb-4 flex items-start gap-4 p-4 border border-neon-blue/30 bg-neon-blue/5 rounded-lg">
                <div class="relative shrink-0">
                    <img src="${photoImg.src}" class="w-24 h-32 object-cover border-2 border-neon-blue rounded shadow-[0_0_10px_#00d4ff]" alt="ID Face">
                    <div class="absolute bottom-1 right-1 w-3 h-3 bg-neon-green rounded-full border border-black animate-pulse"></div>
                </div>
                <div class="font-future text-xs text-neon-blue space-y-1 mt-1">
                    <div class="text-white font-bold">IDENTITÉ CONFIRMÉE</div>
                    <div class="truncate max-w-[150px] text-neon-green">${data.prenom} ${data.nom.toUpperCase()}</div>
                    <div>SCANNÉ LE : ${new Date().toLocaleTimeString()}</div>
                    <div class="text-[10px] text-gray-400">ARCHIVAGE SÉCURISÉ</div>
                </div>
            </div>
        `;
    }

    if (summaryEl) {
        // Use HTML for visual richness
        summaryEl.innerHTML = photoHtml + `<pre class="font-mono whitespace-pre-wrap break-words text-neon-blue/80 font-sans">${kittTxt}\n\n=== DOCUMENTATION LÉGALE GÉNÉRÉE ===\n${docs.bon}</pre>`;
    }

    speakReservation();
}

function speakReservation() {
    // Read the content of the right window (Console / System Ready)
    const summaryEl = document.getElementById('res-summary');
    if (summaryEl && summaryEl.textContent) {
        // Speak the text displayed in the console, stripping punctuation for fluidity
        // Replace dashes, underscores, equals with spaces
        // Replace multiple newlines with a pause (dot)
        const cleanText = summaryEl.textContent
            .replace(/[-_=*]/g, ' ') // Remove visual separators
            .replace(/\s+/g, ' ')    // Collapse multiple spaces
            .trim();

        speak(cleanText);
    } else {
        // Fallback if empty
        const data = buildData();
        speak(`Document généré pour ${data.prenom} ${data.nom}. Prêt.`);
    }
}

async function exportToWhatsApp() {
    const data = buildData();
    const docs = generateLegalText(data);
    const photoImg = document.getElementById('webcam-result');

    // Construct Base Text
    const fullText = `*RÉSERVATION VTC iA_k_venir*\n\n${docs.bon}\n\n*OPTIONS*\n${data.opt}\n${data.notes}`;

    // CHECK FOR WEB SHARE API SUPPORT (Mobile/Modern)
    if (navigator.share && photoImg && !photoImg.classList.contains('hidden') && photoImg.src.startsWith('data:image')) {
        try {
            // Convert DataURL to Blob/File
            const fetchRes = await fetch(photoImg.src);
            const blob = await fetchRes.blob();
            const file = new File([blob], "identite_passager.png", { type: "image/png" });

            if (navigator.canShare && navigator.canShare({ files: [file] })) {
                await navigator.share({
                    title: 'Réservation VTC iA_k_venir',
                    text: fullText,
                    files: [file]
                });
                console.log("Partage réussi via Web Share API");
                return; // Stop here if shared
            }
        } catch (err) {
            console.warn("Web Share API Error (Fallback to Link):", err);
        }
    }

    // FALLBACK: Standard WhatsApp Link (Text Only)
    const url = `https://wa.me/?text=${encodeURIComponent(fullText + "\n\n[PHOTO NON INCLUSE - VEUILLEZ JOINDRE VOTRE CAPTURE MANUELLEMENT]")}`;
    window.open(url, '_blank');
}

function exportToEmail() {
    const data = buildData();
    const docs = generateLegalText(data);
    const subject = `RÉSERVATION VTC - ${data.nom}`;
    const body = `${docs.bon}\n\n${docs.devis}\n\n${docs.facture}\n\n(Note: La photo d'identité doit être jointe manuellement si nécessaire)`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/* =========================================
   MOBILE MENU LOGIC
   ========================================= */

function initMobileMenu() {
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    const links = document.querySelectorAll('.mobile-link');

    if (!btn || !menu) return;

    btn.addEventListener('click', () => {
        const isClosed = menu.classList.contains('translate-x-full');
        if (isClosed) {
            menu.classList.remove('translate-x-full');
        } else {
            menu.classList.add('translate-x-full');
        }
    });

    links.forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.add('translate-x-full');
        });
    });
}

// Passager Identity Sync (Hero -> Reservation)
function initIdentitySync() {
    const fields = ['prenom', 'nom', 'email', 'phone'];

    fields.forEach(field => {
        const heroInput = document.getElementById(`hero-${field}`);
        const resInput = document.getElementById(`res-${field}`);

        if (heroInput && resInput) {
            heroInput.addEventListener('input', (e) => {
                resInput.value = e.target.value;
                // Optional: visual feedback or validation could go here
            });
        }
    });
}

// Scroll Effect (KITT Scanner on Scrollbar)
function initScrollEffect() {
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        document.body.classList.add('kitt-scrolling');

        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            document.body.classList.remove('kitt-scrolling');
        }, 1000); // Keep active for 1s after scroll stops
    });
}

/* =========================================
   HYBRID AUTOCOMPLETE (Static + Dynamic)
   ========================================= */
function initHybridAutocomplete() {
    const inputs = [
        document.getElementById('sim-departure'),
        document.getElementById('sim-destination')
    ];

    const datalist = document.getElementById('locations-list');
    // Baltzenheim coordinates for bias
    const LAT = 48.084;
    const LON = 7.556;

    if (!datalist) return;

    let debounceTimer;

    const fetchSuggestions = async (query) => {
        try {
            const url = `https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(query)}&lat=${LAT}&lon=${LON}&limit=5`;
            const response = await fetch(url);
            const data = await response.json();

            // Clear previous options
            datalist.innerHTML = '';

            if (data.features && data.features.length > 0) {
                data.features.forEach(feature => {
                    const option = document.createElement('option');
                    option.value = feature.properties.label;
                    datalist.appendChild(option);
                });
            }
        } catch (err) {
            console.error("Autocomplete Error:", err);
        }
    };

    inputs.forEach(input => {
        if (!input) return;

        input.addEventListener('input', (e) => {
            clearTimeout(debounceTimer);
            const val = e.target.value;

            // HYBRID LOGIC:
            // < 3 chars OR empty: Show Static Favorites
            if (val.length < 3) {
                populateDataList(); // Restore default list
                return;
            }

            // >= 3 chars: Fetch Dynamic Suggestions
            debounceTimer = setTimeout(() => {
                fetchSuggestions(val);
            }, 300); // 300ms debounce
        });

        // Ensure static list is there on focus if empty
        input.addEventListener('focus', () => {
            if (input.value.length < 3) populateDataList();
        });
    });
}

/* =========================================
   FLATPICKR (Calendar & Time)
   ========================================= */
function initFlatpickr() {
    flatpickr(".flatpickr-input", {
        enableTime: true,
        dateFormat: "d/m/Y H:i",
        time_24hr: true,
        minDate: "today",
        locale: "fr",
        disableMobile: "true", // Force custom theme on mobile
        theme: "dark"
    });
}


/* =========================================
   PILOT VIDEO (Play on Scroll / Hover / Click)
   ========================================= */
function initPilotVideo() {
    const video = document.getElementById('pilot-video');
    const progress = document.getElementById('pilot-progress');
    const container = video ? video.parentElement : null;

    if (!video || !container) return;

    // LIMIT: Max 3 plays per session
    let playCount = 0;
    const MAX_PLAYS = 3;

    // Helper: Create Unmute Overlay
    const addUnmuteOverlay = () => {
        if (container.querySelector('#pilot-unmute')) return;

        const btn = document.createElement('div');
        btn.id = 'pilot-unmute';
        btn.className = 'absolute inset-0 flex items-center justify-center bg-black/50 z-30 cursor-pointer group';
        btn.innerHTML = `
            <div class="bg-black/80 border border-neon-blue p-4 rounded-full group-hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-neon-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                </svg>
            </div>
            <div class="absolute bottom-4 text-white font-future text-xs tracking-widest animate-pulse">CLIQUER POUR LE SON</div>
        `;

        btn.onclick = () => {
            video.muted = false;
            video.volume = 1.0;
            btn.remove();
            video.currentTime = 0; // Restart for impact
            video.play();
        };
        container.appendChild(btn);
    };

    // Helper: Trigger Play with Fallback
    const triggerPlay = () => {
        // Stop if limit reached or already playing OR TOUR IS ACTIVE
        if (playCount >= MAX_PLAYS || !video.paused || window.isTourActive) return;

        // Try playing with sound first
        video.play()
            .then(() => {
                // If browser allowed play, check if it forced mute?
                if (video.muted) {
                    addUnmuteOverlay();
                }
                handlePlaySuccess();
            })
            .catch(error => {
                console.log("Autoplay with sound blocked. Retrying Muted...", error);
                video.muted = true;
                video.play()
                    .then(() => {
                        addUnmuteOverlay(); // Show button to unmute
                        handlePlaySuccess();
                    })
                    .catch(e => console.error("Playback failed:", e));
            });
    };

    const handlePlaySuccess = () => {
        playCount++;
        console.log(`Pilot Video Played: ${playCount}/${MAX_PLAYS}`);

        if (playCount >= MAX_PLAYS) {
            cleanup();
        }
    };

    const cleanup = () => {
        if (typeof observer !== 'undefined') observer.disconnect();
        container.removeEventListener('mouseenter', triggerPlay);
        const unmuteBtn = container.querySelector('#pilot-unmute');
        if (unmuteBtn) unmuteBtn.remove();
        console.log("Pilot Video: Max plays reached. Disabled.");
    };

    // Progress Bar Logic
    if (progress) {
        video.addEventListener('timeupdate', () => {
            if (video.duration) {
                const percentage = (video.currentTime / video.duration) * 100;
                progress.style.width = `${percentage}%`;
            }
        });
    }

    // 1. Scroll Trigger (Play when enters, Pause/Reset when leaves)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                triggerPlay();
            } else {
                // Pause and Reset when scrolling away
                video.pause();
                video.currentTime = 0;
            }
        });
    }, { threshold: 0.5 });

    observer.observe(video);

    // 2. Hover Trigger
    container.addEventListener('mouseenter', triggerPlay);

    // 3. Link Trigger (Ensure play on jump)
    const pilotLink = document.querySelector('a[href="#about"]');
    if (pilotLink) {
        pilotLink.addEventListener('click', () => {
            setTimeout(triggerPlay, 800);
        });
    }
}


/* =========================================
   WEBCAM SCANNER
   ========================================= */
function initWebcam() {
    const video = document.getElementById('webcam-video');
    const canvas = document.getElementById('webcam-canvas');
    const resultImg = document.getElementById('webcam-result');
    const placeholder = document.getElementById('camera-placeholder');
    const overlay = document.getElementById('camera-overlay');

    const btnStart = document.getElementById('btn-start-camera');
    const btnCapture = document.getElementById('btn-capture-photo');
    const btnRetake = document.getElementById('btn-retake-photo');

    let stream = null;

    if (!btnStart) return;

    // Start Camera
    btnStart.addEventListener('click', async () => {
        try {
            stream = await navigator.mediaDevices.getUserMedia({ video: true });
            video.srcObject = stream;
            video.classList.remove('hidden');
            overlay.classList.remove('hidden');
            placeholder.classList.add('hidden');
            resultImg.classList.add('hidden');

            btnStart.classList.add('hidden');
            btnCapture.classList.remove('hidden');
            btnRetake.classList.add('hidden');
        } catch (err) {
            console.error("Webcam Error:", err);
            alert("Accès caméra refusé ou impossible. Vérifiez vos permissions.");
        }
    });

    // Capture Photo with Countdown & KITT Humor
    btnCapture.addEventListener('click', () => {
        if (!stream) {
            console.warn("Webcam: Stream not ready.");
            return;
        }

        // Disable button to prevent spam
        btnCapture.classList.add('opacity-50', 'pointer-events-none');
        btnCapture.innerText = "SCAN EN COURS...";

        // KITT Humor Database
        const KITT_JOKES = [
            "Attention Michael, vos cheveux sont... intéressants.",
            "Ne bougez pas, je scanne votre rétine... et votre âme.",
            "J'espère que vous n'êtes pas recherché par la police galactique.",
            "Sourire activé. Flash nucléaire dans 3, 2, 1...",
            "Dites 'Turbo Boost' !",
            "Analyse faciale terminée. Résultat : Magnifique.",
            "Attention, un petit oiseau va sortir... non je plaisante, c'est un laser."
        ];

        let randomJoke = "Sourire activé.";
        if (KITT_JOKES.length > 0) {
            randomJoke = KITT_JOKES[Math.floor(Math.random() * KITT_JOKES.length)];
        }

        // Define Capture Logic (Scoped)
        const performCapture = () => {
            try {
                // PORTRAIT CROP LOGIC (3:4 Ratio)
                const vw = video.videoWidth;
                const vh = video.videoHeight;
                const targetRatio = 3 / 4;

                let cropW, cropH, cropX, cropY;

                // Calculate Crop Dimensions (Center Weighted)
                if (vw / vh > targetRatio) {
                    // Too wide: Crop sides
                    cropH = vh;
                    cropW = vh * targetRatio;
                    cropX = (vw - cropW) / 2;
                    cropY = 0;
                } else {
                    // Too tall (unlikely for webcam, but robust): Crop top/bottom
                    cropW = vw;
                    cropH = vw / targetRatio;
                    cropX = 0;
                    cropY = (vh - cropH) / 2;
                }

                // Set Canvas to Portrait
                canvas.width = cropW;
                canvas.height = cropH;

                // Draw Cropped Frame
                const ctx = canvas.getContext('2d');
                ctx.drawImage(video, cropX, cropY, cropW, cropH, 0, 0, cropW, cropH);

                // Convert to Image (JPEG for Portrait/Doc)
                const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
                resultImg.src = dataUrl;

                // Update UI state
                resultImg.classList.remove('hidden');
                video.classList.add('hidden');
                overlay.classList.add('hidden');

                // Stop Stream
                if (stream) {
                    stream.getTracks().forEach(track => track.stop());
                }
                stream = null;

                btnCapture.classList.add('hidden');
                btnRetake.classList.remove('hidden');

                // Reset Button Text (for next time if needed)
                btnCapture.classList.remove('opacity-50', 'pointer-events-none');
                btnCapture.innerText = "CAPTURER";

                // VALIDATE MISSION READY
                if (window.checkMissionReady) window.checkMissionReady();

            } catch (err) {
                console.error("Capture Failed:", err);
                alert("Erreur lors de la capture.");
                // Reset UI
                btnCapture.classList.remove('opacity-50', 'pointer-events-none');
                btnCapture.innerText = "CAPTURER";
            }
        };

        // Sequence
        const runSequence = async () => {
            try {
                // 1. Init
                speak("Initialisation du protocole photo.");
                await new Promise(r => setTimeout(r, 2000));

                // 2. Countdown
                speak("3");
                await new Promise(r => setTimeout(r, 1000));

                speak("2");
                await new Promise(r => setTimeout(r, 1000));

                speak("1");
                await new Promise(r => setTimeout(r, 1000));

                // 3. Joke & Capture
                speak(randomJoke);

                // Capture during reaction (1.5s delay)
                setTimeout(() => {
                    performCapture();
                    speak("Photo sauvegardée dans la base de données.");
                }, 1500);
            } catch (e) {
                console.error("Sequence Error:", e);
                // Fallback to immediate capture if sequence fails
                performCapture();
            }
        };

        runSequence();
    });

    // Retake Photo
    btnRetake.addEventListener('click', () => {
        resultImg.classList.add('hidden');
        placeholder.classList.remove('hidden');
        btnRetake.classList.add('hidden');
        btnStart.classList.remove('hidden');
        btnStart.click(); // Auto-restart

        // VALIDATE
        if (window.checkMissionReady) window.checkMissionReady();
    });
}


/* =========================================
   INITIALIZATION
   ========================================= */

/* =========================================
   LIGHTBOX LOGIC (Professional Full Screen)
   ========================================= */
function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const img = document.getElementById('lightbox-img');
    const caption = document.getElementById('lightbox-caption');
    const btnClose = document.getElementById('lightbox-close');
    const btnPrev = document.getElementById('lightbox-prev');
    const btnNext = document.getElementById('lightbox-next');
    const loader = document.getElementById('lightbox-loader');
    const seal = document.getElementById('lightbox-seal'); // New Seal Element

    if (!lightbox || !img) return;

    let currentIndex = 0;
    let currentItems = [];

    // Track if certification has been spoken for a category
    const certifiedCategories = new Set();

    // Open Lightbox
    window.openLightbox = (index, items) => {
        currentIndex = index;
        currentItems = items;

        updateLightboxImage();

        lightbox.classList.remove('hidden');
        // Fade in
        setTimeout(() => lightbox.classList.remove('opacity-0'), 10);
        document.body.style.overflow = 'hidden'; // Lock scroll

        // Start Stars
        startShootingStars();
    };

    // Update Image
    const updateLightboxImage = () => {
        if (!currentItems[currentIndex]) return;

        // Show loader
        loader.classList.remove('hidden');
        img.classList.add('opacity-50');

        // Reset Seal State
        if (seal) {
            seal.classList.remove('seal-appear');
            seal.style.opacity = '0';
        }

        // Reset Glow
        img.style.boxShadow = '';

        const item = currentItems[currentIndex];

        // Pass Category to Rhythm Engine
        if (typeof rhythmEngine !== 'undefined') {
            rhythmEngine.setGalleryCategory(item.cat);
        }

        // Preload
        const tempImg = new Image();
        tempImg.crossOrigin = "Anonymous";
        tempImg.src = item.img;

        tempImg.onload = () => {
            img.src = item.img;
            caption.innerText = `${item.title} (${currentIndex + 1}/${currentItems.length})`;
            loader.classList.add('hidden');
            img.classList.remove('opacity-50');

            // AMBILIGHT VISUAL (CSS Back Layer)
            const glowLayer = document.getElementById('lightbox-glow-layer');
            if (glowLayer) {
                glowLayer.src = item.img;
            }
            // Reset Shadow
            img.style.boxShadow = `0 0 30px rgba(0,0,0,0.5)`;

            // EXTRACT COLOR FOR SNAKE BORDER
            // We use the tempImg which is already loaded
            try {
                let canvas = document.createElement('canvas');
                let ctx = canvas.getContext('2d');
                canvas.width = 1; canvas.height = 1;
                ctx.drawImage(tempImg, 0, 0, 1, 1);
                let [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
                let borderColor = `rgb(${r},${g},${b})`; // Full opacity for border

                // Set CSS Variable on Frame
                const frame = document.getElementById('lightbox-frame');
                if (frame) {
                    frame.style.setProperty('--border-color', borderColor);

                    // Random Start Point
                    frame.style.setProperty('--start-offset', Math.random());
                }

            } catch (e) {
                // Fallback to Neon Blue
                const frame = document.getElementById('lightbox-frame');
                if (frame) frame.style.setProperty('--border-color', '#00d4ff');
            }


            // DELAYED SEAL & VOICE LOGIC (Universal for All Galleries)
            if (seal) {

                // If NOT spoken yet for this category: Speak then Show
                if (!certifiedCategories.has(item.cat)) {
                    speak("Ces documents visuels sont certifiés authentiques, par Laurent.");
                    certifiedCategories.add(item.cat);

                    // Approximate delay for speech (2.5s)
                    setTimeout(() => {
                        seal.classList.add('seal-appear');
                    }, 2500);
                } else {
                    // If already spoken: Show immediately (or with slight delay for effect)
                    setTimeout(() => {
                        seal.classList.add('seal-appear');
                    }, 200);
                }
            }

            // ARTIST MUSIC AUTO-PLAY (Festival Gallery Only)
            if (item.cat === 'festival' && typeof window.playArtistMusic === 'function') {
                // Délai pour laisser l'image se charger complètement
                setTimeout(() => {
                    window.playArtistMusic(item.img);
                }, 1000);
            }
        };
    };

    // SHOOTING STARS ENGINE
    let starInterval = null;
    const startShootingStars = () => {
        if (starInterval) clearInterval(starInterval);

        // Create Container if missing
        let starContainer = document.getElementById('lightbox-stars');
        if (!starContainer) {
            starContainer = document.createElement('div');
            starContainer.id = 'lightbox-stars';
            starContainer.className = 'absolute inset-0 pointer-events-none overflow-hidden z-0';
            lightbox.insertBefore(starContainer, lightbox.firstChild);
        }

        // Spawn Loop
        starInterval = setInterval(() => {
            const star = document.createElement('div');
            star.className = 'shooting-star';

            // Random Position
            const startX = Math.random() * window.innerWidth + 200;
            const startY = Math.random() * window.innerHeight / 2;

            star.style.left = `${startX}px`;
            star.style.top = `${startY}px`;

            // Random Animation Speed (Faster for realism)
            const dur = 0.5 + Math.random() * 1; // 0.5s - 1.5s
            star.style.animation = `shooting ${dur}s linear forwards`;

            starContainer.appendChild(star);

            // Cleanup
            setTimeout(() => { star.remove(); }, dur * 1000);
        }, 2000 + Math.random() * 2000); // Every 2-4 seconds
    };

    const stopShootingStars = () => {
        if (starInterval) clearInterval(starInterval);
        const container = document.getElementById('lightbox-stars');
        if (container) container.innerHTML = '';
    };

    // Close Lightbox
    const closeLightbox = () => {
        stopShootingStars(); // Stop Background

        // Stop YouTube Music if playing
        if (typeof window.stopYouTubeMusic === 'function') {
            window.stopYouTubeMusic();
        }

        lightbox.classList.add('opacity-0');
        setTimeout(() => {
            lightbox.classList.add('hidden');
            img.src = ""; // Clear memory
            document.body.style.overflow = ''; // Unlock scroll
        }, 300);
    };

    // Navigation
    const nextImage = (e) => {
        if (e) e.stopPropagation();
        currentIndex = (currentIndex + 1) % currentItems.length;
        updateLightboxImage();
    };

    const prevImage = (e) => {
        if (e) e.stopPropagation();
        currentIndex = (currentIndex - 1 + currentItems.length) % currentItems.length;
        updateLightboxImage();
    };

    // Listeners
    btnClose.addEventListener('click', closeLightbox);
    btnNext.addEventListener('click', nextImage);
    btnPrev.addEventListener('click', prevImage);

    // Close on background click
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    // Keyboard Support
    document.addEventListener('keydown', (e) => {
        if (lightbox.classList.contains('hidden')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
    });
}


/* =========================================
   INITIALIZATION
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {
    console.log("iA_k_venir System Initializing...");

    // Helper for robust initialization
    const safeInit = (fn, name) => {
        try {
            if (typeof fn === 'function') {
                fn();
                // console.log(`[OK] ${name}`); // Uncomment for debug
            } else {
                console.warn(`[SKIP] ${name} - Function not found`);
            }
        } catch (e) {
            console.error(`[FAIL] ${name}:`, e);
            // Continue execution despite error
        }
    };

    // Core Systems
    safeInit(initPricing, "Pricing System");
    safeInit(initReservation, "Reservation Logic");
    safeInit(initProtocol, "Audio Protocol"); // Added missing init
    safeInit(initFlatpickr, "Calendar (Flatpickr)");
    safeInit(initMobileMenu, "Mobile Menu");
    safeInit(initScrollEffect, "Scroll FX");
    safeInit(initIdentitySync, "Identity Sync");
    safeInit(initHybridAutocomplete, "Autocomplete");

    // Multimedia & Hardware
    safeInit(initPilotVideo, "Pilot Video");
    safeInit(initWebcamNew, "Webcam V2");

    // Content Rendering
    safeInit(initLightbox, "Lightbox");
    safeInit(renderGallery, "Gallery");
    safeInit(renderDeals, "Deals");

    console.log("System Ready.");
});

/* =========================================
   WEBCAM SCANNER V2 (Fixed Sequence: Instr -> Joke -> Count -> Zero)
   ========================================= */
function initWebcamNew() {
    const video = document.getElementById('webcam-video');
    const canvas = document.getElementById('webcam-canvas');
    const resultImg = document.getElementById('webcam-result');
    const placeholder = document.getElementById('camera-placeholder');
    const overlay = document.getElementById('camera-overlay');

    const btnStart = document.getElementById('btn-start-camera');
    const btnCapture = document.getElementById('btn-capture-photo');
    const btnRetake = document.getElementById('btn-retake-photo');

    let stream = null;

    if (!btnStart) return;

    // Start Camera
    btnStart.addEventListener('click', async () => {
        try {
            stream = await navigator.mediaDevices.getUserMedia({ video: true });
            video.srcObject = stream;
            video.classList.remove('hidden');
            overlay.classList.remove('hidden');
            placeholder.classList.add('hidden');
            resultImg.classList.add('hidden');

            btnStart.classList.add('hidden');
            btnCapture.classList.remove('hidden');
            btnRetake.classList.add('hidden');
        } catch (err) {
            console.error("Webcam Error:", err);
            alert("Accès caméra refusé ou impossible. Vérifiez vos permissions.");
        }
    });

    // Capture Photo with Countdown & KITT Humor
    btnCapture.addEventListener('click', () => {
        if (!stream) {
            console.warn("Webcam: Stream not ready.");
            return;
        }

        // Disable button to prevent spam
        btnCapture.classList.add('opacity-50', 'pointer-events-none');
        btnCapture.innerText = "SÉQUENCE EN COURS...";

        // KITT Humor Database
        const KITT_JOKES = [
            "Attention Michael, vos cheveux sont... intéressants.",
            "Ne bougez pas, je scanne votre rétine... et votre âme.",
            "J'espère que vous n'êtes pas recherché par la police galactique.",
            "Sourire activé. Flash nucléaire dans quelques secondes...",
            "Dites 'Turbo Boost' !",
            "Analyse faciale terminée. Résultat : Magnifique.",
            "Attention, un petit oiseau va sortir... non je plaisante, c'est un laser."
        ];

        let randomJoke = "Sourire activé.";
        if (KITT_JOKES.length > 0) {
            randomJoke = KITT_JOKES[Math.floor(Math.random() * KITT_JOKES.length)];
        }

        // Define Capture Logic (Scoped)
        const performCapture = () => {
            try {
                // PORTRAIT CROP LOGIC (3:4 Ratio)
                const vw = video.videoWidth;
                const vh = video.videoHeight;
                const targetRatio = 3 / 4;

                let cropW, cropH, cropX, cropY;

                // Calculate Crop Dimensions (Center Weighted)
                if (vw / vh > targetRatio) {
                    // Too wide: Crop sides
                    cropH = vh;
                    cropW = vh * targetRatio;
                    cropX = (vw - cropW) / 2;
                    cropY = 0;
                } else {
                    // Too tall: Crop top/bottom
                    cropW = vw;
                    cropH = vw / targetRatio;
                    cropX = 0;
                    cropY = (vh - cropH) / 2;
                }

                // Set Canvas to Portrait
                canvas.width = cropW;
                canvas.height = cropH;

                const ctx = canvas.getContext('2d');
                ctx.drawImage(video, cropX, cropY, cropW, cropH, 0, 0, cropW, cropH);

                // Convert to Image (JPEG)
                // Clean image, no text overlays as per user request
                const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
                resultImg.src = dataUrl;
                resultImg.classList.remove('hidden');
                video.classList.add('hidden');
                overlay.classList.add('hidden');

                // Stop Stream
                if (stream) {
                    stream.getTracks().forEach(track => track.stop());
                }
                stream = null;

                btnCapture.classList.add('hidden');
                btnRetake.classList.remove('hidden');

                // Reset Button Text
                btnCapture.classList.remove('opacity-50', 'pointer-events-none');
                btnCapture.innerText = "CAPTURER";

                // Update generated doc (Already updated to show Name/Surname)
                updateUI();

            } catch (err) {
                console.error("Capture Failed:", err);
                alert("Erreur lors de la capture.");
                btnCapture.classList.remove('opacity-50', 'pointer-events-none');
                btnCapture.innerText = "CAPTURER";
            }
        };

        // Sequence: Instruction -> Joke -> Countdown -> Zero -> Capture
        const runSequence = async () => {
            try {
                // 1. Instruction
                speak("Veuillez vous placer au centre du cadre.");
                await new Promise(r => setTimeout(r, 4000));

                // 2. Joke (Wait dynamic duration)
                speak(randomJoke);
                const jokeDuration = (randomJoke.length * 80) + 1500;
                await new Promise(r => setTimeout(r, jokeDuration));

                // 3. Countdown
                speak("3");
                await new Promise(r => setTimeout(r, 1000));

                speak("2");
                await new Promise(r => setTimeout(r, 1000));

                speak("1");
                await new Promise(r => setTimeout(r, 1000));

                // 4. Zero & Capture
                speak("Zéro !");
                performCapture();
                speak("Identité confirmée.");

            } catch (e) {
                console.error("Sequence Error:", e);
                performCapture();
            }
        };

        runSequence();
    });

    // Retake Photo
    btnRetake.addEventListener('click', () => {
        resultImg.classList.add('hidden');
        placeholder.classList.remove('hidden');
        btnRetake.classList.add('hidden');
        btnStart.classList.remove('hidden');
        btnStart.click(); // Auto-restart
    });
}

/* =========================================
   GUIDED ONBOARDING TOUR (INTERACTIVE WIZARD)
   ========================================= */
let tourController = null;

window.startGuidedTour = async function () {
    // TOGGLE: STOP IF RUNNING
    if (tourController) {
        console.log("Stopping Tour...");
        tourController.abort();
        tourController = null;
        updateTourButtons("AIDE");
        return;
    }

    console.log("Starting Interactive Guided Tour...");

    // VISUAL FLASH REMOVED AS PER USER REQUEST
    // const dBtn = document.getElementById('btn-tour-desktop');
    // const mBtn = document.getElementById('btn-tour-mobile');
    // ... logic removed


    tourController = new AbortController();
    const signal = tourController.signal;
    updateTourButtons("ARRÊT");

    // Flag for global components to know tour is running (stops autoplay)
    window.isTourActive = true;

    // Steps Definition
    const STEPS = [
        {
            id: 'navbar-audio-group', // Target the whole container
            text: "PHASE 1 : ACTIVATION SONORE. Choisissez votre ambiance et ajustez le volume, puis validez.",
            mobileFallback: 'mobile-menu-btn'
        },
        {
            // PHASE 2: Identity Chain
            id: 'tour-identity', // Highlighting the Card Container
            focusChain: ['hero-prenom', 'hero-nom', 'hero-phone', 'hero-email'],
            text: "PHASE 2 : IDENTIFICATION. Veuillez renseigner votre Prénom, Nom et Téléphone."
        },
        {
            // PHASE 3: Simulator Chain
            id: 'tour-simulator-card', // Highlighting the Card Container
            focusChain: ['sim-departure', 'sim-destination'],
            text: "PHASE 3 : NAVIGATION. Saisissez votre départ et arrivée pour calculer la trajectoire."
        },
        {
            id: 'pilot-container', // Precise video container target
            text: "PHASE 4 : LE PILOTE. Découvrez qui est aux commandes."
        },
        {
            id: 'gallery-grid', // Precise grid target
            text: "PHASE 5 : ARCHIVES. Parcourez les missions visuelles précédentes.",
            // filterDemo: ['all', 'festival', 'gastronomie', 'memoire', 'tourisme', 'immobilier', 'festival'] // DISABLED for Professionalism
        },
        {
            id: 'deals-grid', // Precise deals grid target
            text: "PHASE 6 : OFFRES. Sélectionnez une opportunité temporelle.",
            // dealsDemo: true // DISABLED for Professionalism
        },
        {
            id: 'res-pickup-datetime', // Highlight Date/Time as requested
            text: "PHASE 7 : VÉRIFICATION. Contrôlez l'ensemble de vos informations. Une fois prêt, sélectionnez votre DATE DE DÉPART pour valider."
        },
        {
            id: 'btn-start-camera', // Targeted highlight: 'Initialiser Scan' button
            text: "PHASE 8 : SÉCURITÉ. Effectuez le scan biométrique facial. Souriez !"
        },
        {
            id: 'res-notes',
            text: "PHASE 9 : SPÉCIFICATIONS. Ajoutez une note spéciale si nécessaire."
        },
        {
            id: 'btn-res-build',
            text: "PHASE 10 : GÉNÉRATION. Créez votre ordre de mission."
        },
        {
            id: 'contact',
            text: "TERMINÉ. Transmettez le document ou contactez le QG. À bientôt."
        }
    ];

    // Helper: Highlight
    const highlight = (el, stepId) => {
        if (!el) return;

        // NAVBAR SPECIAL CASE
        if (stepId === 'nav-ambiance' || el.closest('nav')) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        // STANDARD LOGIC: Show Section Overview on Desktop, Element on Mobile
        else {
            const section = el.closest('section');
            const isDesktop = window.innerWidth >= 768;

            // REVISED SCROLL LOGIC based on latest request:
            // "bouger la fenetre de navigation pour bien voir les elelments suivant"
            // This implies dynamic scrolling.

            // Wait, previous request was "Section Top".
            // Let's do Section Top ONLY if it's a huge container (like Grid).
            // If it's an INPUT, Center it.

            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.tagName === 'SELECT') {
                el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            } else if (section && isDesktop) {
                const offset = 80;
                const sectionTop = section.getBoundingClientRect().top + window.pageYOffset;
                window.scrollTo({ top: sectionTop - offset, behavior: 'smooth' });
            } else {
                el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }

        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.tagName === 'SELECT') {
            el.classList.add('scale-105', 'z-50'); // Pop Effect for Inputs
        }

        el.classList.add(
            'ring-4',
            'ring-neon-green',
            'relative',
            'z-40',
            'animate-subtle-green-pulse',
            'shadow-[0_0_60px_rgba(184,255,0,0.6)]',
            'bg-black/80' // Darken background to make input pop
        );
    };

    const removeHighlight = (el) => {
        if (!el) return;
        el.classList.remove(
            'ring-4', // Increased border
            'ring-neon-green',
            'relative',
            'z-40',
            'z-50',
            'animate-subtle-green-pulse',
            'ring-neon-blue',
            'shadow-[0_0_50px_rgba(0,212,255,0.5)]',
            'shadow-[0_0_60px_rgba(184,255,0,0.6)]',
            'animate-neon-pulse',
            'scale-105',
            'bg-black/80'
        );
    };

    // Helper: Update Button Text
    function updateTourButtons(text) {
        const dBtn = document.getElementById('btn-tour-desktop');
        const mBtn = document.getElementById('btn-tour-mobile');
        if (dBtn) dBtn.innerText = text;
        if (mBtn) mBtn.innerText = text;

        if (text === "ARRÊT") {
            if (dBtn) {
                dBtn.classList.remove('bg-neon-green/10', 'text-neon-green', 'border-neon-green');
                dBtn.classList.add('bg-limit-red', 'text-white', 'border-limit-red');
            }
            if (mBtn) {
                mBtn.classList.remove('bg-neon-green/10', 'text-neon-green', 'border-neon-green');
                mBtn.classList.add('bg-limit-red', 'text-white', 'border-limit-red');
            }
        } else {
            if (dBtn) {
                dBtn.classList.remove('bg-limit-red', 'text-white', 'border-limit-red');
                dBtn.classList.add('bg-neon-green/10', 'text-neon-green', 'border-neon-green');
            }
            if (mBtn) {
                mBtn.classList.remove('bg-limit-red', 'text-white', 'border-limit-red');
                mBtn.classList.add('bg-neon-green/10', 'text-neon-green', 'border-neon-green');
            }
        }
    }

    // Helper: Create Validation Button Promise
    const waitForValidation = (signal) => {
        return new Promise((resolve, reject) => {
            if (signal.aborted) return reject(new Error('Aborted'));

            const btn = document.createElement('button');
            btn.innerHTML = `<span class="animate-pulse">▶</span> VALIDER & CONTINUER`;
            btn.className = "fixed bottom-8 right-8 z-[100] bg-neon-green text-black font-future font-bold py-3 px-6 rounded shadow-[0_0_20px_#b8ff00] hover:scale-105 transition-all text-xs tracking-widest border border-black/20 flex items-center gap-2";
            btn.id = "tour-validation-btn";

            const cleanup = () => {
                if (btn) btn.remove();
                signal.removeEventListener('abort', onAbort);
            };

            const onAbort = () => {
                cleanup();
                reject(new Error('Aborted'));
            };

            signal.addEventListener('abort', onAbort);

            btn.onclick = () => {
                // Click Effect
                btn.innerHTML = "VALIDÉE ✓";
                btn.style.backgroundColor = "#b8ff00"; // Neon Green
                setTimeout(() => {
                    cleanup();
                    resolve();
                }, 300);
            };
            document.body.appendChild(btn);
        });
    };

    try {
        const nav = document.querySelector('nav');

        // Execution Loop
        for (const step of STEPS) {
            if (signal.aborted) break;

            // 1. Navigation Visibility: KEPT VISIBLE (User Request)
            if (nav) nav.classList.remove('-translate-y-full');

            // 2. Find Element (Initial)
            let el = document.getElementById(step.id);
            if (window.innerWidth < 768 && step.mobileFallback) {
                const mobileEl = document.getElementById(step.mobileFallback);
                if (mobileEl) el = mobileEl;
            }

            // 3. Highlight & Scroll
            if (el) highlight(el, step.id);

            // --- FOCUS CHAIN LOGIC (Auto-Advance Highlights) ---
            if (step.focusChain && Array.isArray(step.focusChain)) {

                // We don't block execution, we just set up listeners
                // The Validation step (Wait) handles the pause.
                // While waiting, we guide the user internally.

                let currentChainIndex = 0;
                const chainIds = step.focusChain;

                // Function to advance
                const advanceChain = () => {
                    // Remove current
                    const currentId = chainIds[currentChainIndex];
                    const currentEl = document.getElementById(currentId);
                    if (currentEl) removeHighlight(currentEl);

                    // Move to next
                    currentChainIndex++;
                    if (currentChainIndex < chainIds.length) {
                        const nextId = chainIds[currentChainIndex];
                        const nextEl = document.getElementById(nextId);
                        if (nextEl) {
                            highlight(nextEl, nextId); // This triggers scroll
                            setupChainListener(nextEl);
                        }
                    } else {
                        // End of chain - maybe highlight Validation Button?
                        const vBtn = document.getElementById('tour-validation-btn');
                        if (vBtn) vBtn.classList.add('animate-subtle-green-pulse', 'ring-2', 'ring-neon-green');
                    }
                };

                // Listener Setup
                const setupChainListener = (element) => {
                    if (!element) return;

                    const onInput = () => {
                        // Check if valid/filled
                        if (element.value && element.value.length > 0) {
                            // Small delay for UI smoothness
                            setTimeout(advanceChain, 500);
                            element.removeEventListener('input', onInput);
                            element.removeEventListener('change', onInput);
                        }
                    };

                    // Support both Input and Change (for selects/dates)
                    element.addEventListener('input', onInput);
                    element.addEventListener('change', onInput);
                };

                // INITIALIZE FIRST ELEMENT OF CHAIN (Always)
                // Even if the Step Highlight is on the Container, we must hook the first input
                if (chainIds.length > 0) {
                    const firstId = chainIds[0];
                    const firstEl = document.getElementById(firstId);
                    if (firstEl) {
                        highlight(firstEl, firstId); // Explicitly highight the first input too
                        currentChainIndex = 0;
                        setupChainListener(firstEl);
                    }
                }
            }
            // ---------------------------------------------------

            // 4. Speak & Wait for Speech to Finish (Audio Prioritization)
            await speak(step.text);

            // 5. Special Case: Pilot Video Autoplay (AFTER Speech)
            if (step.id === 'pilot-container') {
                const pilotVideo = document.getElementById('pilot-video');
                if (pilotVideo) {
                    pilotVideo.muted = false;
                    pilotVideo.play().catch(e => console.log("Video play error", e));
                }
            }

            // 6. ANIMATION LOGIC (Filter Demo & Deals Demo)
            // ----------------------------------------------------------------
            // DISABLED FOR FLUIDITY & PROFESSIONALISM (Ref Step Id: 1359)
            /*
            if (step.filterDemo) {
                // Wait a bit before starting demo
                await new Promise(r => setTimeout(r, 1000));
    
                for (const cat of step.filterDemo) {
                    if (signal.aborted) break;
    
                    const btn = document.querySelector(`button[data-category="${cat}"]`);
                    if (btn) {
                        highlight(btn, 'filter-demo'); // Use arbitrary ID to trigger scroll/highlight
                        btn.click(); // Trigger Filter
    
                        // Wait 2 seconds for user to see
                        await new Promise(r => setTimeout(r, 2000));
                        removeHighlight(btn);
                    }
                }
            }
    
            if (step.dealsDemo) {
                // Wait a bit
                await new Promise(r => setTimeout(r, 1000));
    
                const dealCards = document.querySelectorAll('#deals-grid > div');
                if (dealCards.length > 0) {
                    for (const card of dealCards) {
                        if (signal.aborted) break;
    
                        // Randomly choose between the Card Body OR the Selection Button
                        const coinFlip = Math.random() > 0.5;
                        let target = null;
    
                        if (coinFlip) {
                            // Target the Card (bg-retro-paper)
                            target = card.querySelector('.bg-retro-paper');
                        } else {
                            // Target the Selection Button (last button)
                            const buttons = card.querySelectorAll('button');
                            if (buttons.length > 0) target = buttons[buttons.length - 1];
                        }
    
                        if (!target) target = card; // Fallback
    
                        highlight(target, 'deal-demo');
                        await new Promise(r => setTimeout(r, 2000));
                        removeHighlight(target);
                    }
                }
            }
            */
            // ----------------------------------------------------------------

            // 7. Wait for User Validation
            await waitForValidation(signal);

            // 7. Cleanup Highlight (Cleanup ALL potential chain highlights)
            if (step.focusChain) {
                step.focusChain.forEach(id => {
                    const cEl = document.getElementById(id);
                    if (cEl) removeHighlight(cEl);
                });
            } else {
                if (el) removeHighlight(el);
            }
        }
    } catch (err) {
        console.log("Tour stopped:", err.message);
        document.querySelectorAll('.animate-subtle-green-pulse').forEach(el => removeHighlight(el));
        const vBtn = document.getElementById('tour-validation-btn');
        if (vBtn) vBtn.remove();
    } finally {
        tourController = null;
        updateTourButtons("AIDE");
        window.isTourActive = false; // Reset Flag
        // Restore Nav
        const nav = document.querySelector('nav');
        if (nav) nav.classList.remove('-translate-y-full');
    }
};



