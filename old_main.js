
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
    "azur-fm": "http://live.radioking.fr/azur-fm-68",
    "rdl": "https://stream.rcs.revma.com/aguwyw7fkzzuv.mp3", // RDL 68 (Colmar) - HTTPS
    // Radio FG
    "fg-main": "http://radiofg.impek.com/fg",
    "fg-chic": "https://stream.rcs.revma.com/8actzfn0742vv.mp3",
    "fg-deep": "http://radiofg.impek.com/fgd",
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
    // Stop current
    if (audioPlayer) {
        audioPlayer.pause();
        audioPlayer.currentTime = 0;
    }
    if (audioTimeout) clearTimeout(audioTimeout);

    isRadioActive = false;

    const streamUrl = RADIO_STREAMS[ambianceKey];
    if (!streamUrl) return; // Silence

    // Setup New Stream
    isRadioActive = true;
    audioPlayer.src = streamUrl;
    audioPlayer.volume = 0.3;

    // Delay start (managed by KITT usually, but we set a safe timeout just in case)
    // The speak() function will duck it anyway if it starts speaking.
    // We rely on speak() to Unduck at the end, which triggers playback if isRadioActive is true.
    // But if speak() fails or isn't called, we need a fallback start?
    // Let's assume playRadio is always called with speak().
    // We don't auto-play here to avoid conflict. We rely on the "Resume" from the voice end.
    // BUT: If user changes ambiance, `speak` is called. It ducks. Then onend resumes.
    // So we just need to ensure `isRadioActive` is true.
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

if ('speechSynthesis' in window) {
    window.speechSynthesis.onvoiceschanged = loadVoices;
}

function speak(text) {
    if (!('speechSynthesis' in window)) return;
    if (!voicesLoaded) loadVoices();

    window.speechSynthesis.cancel();

    // Personalization
    const sPrenom = document.getElementById('res-prenom');
    let userName = "Monsieur"; // Default KITT default
    if (sPrenom && sPrenom.value.trim() !== "") {
        userName = sPrenom.value.trim();
    }
    const personalizedText = text.replace(/Michael/gi, userName);

    const utterance = new SpeechSynthesisUtterance(personalizedText);
    const voices = window.speechSynthesis.getVoices();

    // Voice Strategy: Target "Thomas" for French KITT feel (Deep, Calm)
    // If Thomas not found, try Google Français
    const frVoice = voices.find(v => v.name.includes('Thomas')) // macOS default cool guy
        || voices.find(v => v.name.includes('Google') && v.lang.startsWith('fr'))
        || voices.find(v => v.lang === 'fr-FR');

    if (frVoice) {
        utterance.voice = frVoice;
        utterance.pitch = 0.7; // Deeper
        utterance.rate = 0.95; // Slightly slower
    }

    // DUCKING LOGIC
    utterance.onstart = () => {
        pauseRadio();
    };

    utterance.onend = () => {
        resumeRadio();
    };

    try {
        window.speechSynthesis.speak(utterance);
    } catch (e) {
        console.warn("Speech Error:", e);
        // Fallback resume if speech fails immediately
        resumeRadio();
    }
}

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
    // 1. FESTIVALS (54 items)
    // Auto-generated standard filenames: festival_001.jpg to festival_054.jpg
    const festivalFilenames = Array.from({ length: 54 }, (_, i) =>
        `festival_${String(i + 1).padStart(3, '0')}.jpg`
    );

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

function generateMissionRecap() {
    // Collect Data
    const sPrenom = document.getElementById('res-prenom').value || "Inconnu";
    const sNom = document.getElementById('res-nom').value || "";
    const sDate = document.getElementById('res-date').value || "Date non définie";
    const sPickup = document.getElementById('res-pickup').value || "Non spécifié";
    const sDrop = document.getElementById('res-drop').value || "Non spécifié";
    const sAmbianceVal = document.getElementById('res-ambiance').value;

    // Get Simulator Data (if available) - Assuming global variables or DOM reading
    // Ideally we should store the last calculated price. 
    // For now, let's read the display or default to "Sur Devis"
    const priceEl = document.getElementById('price-display');
    const priceText = priceEl ? priceEl.innerText : "0";

    // Determine Ambiance Label
    const ambianceLabel = AMBIANCE_PROTOCOLS[sAmbianceVal] ? AMBIANCE_PROTOCOLS[sAmbianceVal].label : "Standard";

    // Distance Calculation (Heuristic or from Sim)
    // We try to grab it from Sim Detail HTML or calculate vaguely
    // Let's assume the user ran a sim. If not, we say "Calcul en cours"
    let distanceText = "Calcul en cours";
    const detailsEl = document.getElementById('sim-details');
    if (detailsEl && detailsEl.innerText.includes('DIST. RÉELLE')) {
        // Extract basic number
        const match = detailsEl.innerText.match(/DIST\. RÉELLE : (\d+)/);
        if (match) distanceText = match[1];
    }

    // Sound FX (Simulated by Text)
    // (Son : Wou-wou du scanner) -> We can't easily play sound files without assets, so we speak it or skip.
    // The prompt says "Format de sortie obligatoire", suggesting TEXT output in the console.

    const recapText = `
(Son : Wou-wou du scanner)

Bonjour ${sPrenom}.

Ici l'interface iAkvenir. J'ai bien reçu vos instructions finales. Voici le récapitulatif de votre mission de transport :

Protocole activé pour le : ${sDate}
Au nom de : ${sNom}, ${sPrenom}

Point d'extraction : ${sPickup}
Destination cible : ${sDrop}
Distance : ${distanceText} kilomètres.

Configuration du véhicule : L'ambiance sonore a été verrouillée sur le mode : ${ambianceLabel}.

Validation financière : Le montant final estimé pour ce service est de ${priceText} euros.

Mes systèmes sont parés. Laissez-vous transporter. Terminé.

(Son : Bruit de fermeture électronique)
    `.trim();

    // 1. Display in Console
    const consoleOut = document.getElementById('res-summary');
    if (consoleOut) {
        consoleOut.innerText = recapText;
        consoleOut.scrollTop = consoleOut.scrollHeight;
    }

    // 2. Vocalize (Read only the speech parts, skip sound fx descriptions for cleaner audio?)
    // Or read everything as requested "Speak the recap".
    // Let's clean up sound FX text for speech
    const speechText = recapText.replace(/\(Son : .*?\)/g, "").trim();
    speak(speechText);
}

// Initialize on Load
document.addEventListener('DOMContentLoaded', () => {
    initPricing();
    initProtocol();

    // ... any other inits

    // Initial Greeting if desired? No, per user instructions wait for user input.
});
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
}

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
        // Stop if limit reached or already playing
        if (playCount >= MAX_PLAYS || !video.paused) return;

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
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                canvas.getContext('2d').drawImage(video, 0, 0);

                // Convert to Image
                const dataUrl = canvas.toDataURL('image/png');
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

                // Reset Button Text (for next time if needed)
                btnCapture.classList.remove('opacity-50', 'pointer-events-none');
                btnCapture.innerText = "CAPTURER";

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

        const item = currentItems[currentIndex];

        // Preload
        const tempImg = new Image();
        tempImg.src = item.img;
        tempImg.onload = () => {
            img.src = item.img;
            caption.innerText = `${item.title} (${currentIndex + 1}/${currentItems.length})`;
            loader.classList.add('hidden');
            img.classList.remove('opacity-50');

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
        };
    };

    // Close Lightbox
    const closeLightbox = () => {
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
    try {
        initPricing();
        initReservation();
        initFlatpickr(); // Calendar
        initMobileMenu();
        initScrollEffect(); // KITT Scanner scrollbar
        initIdentitySync(); // Hero form to Reservation sync
        initHybridAutocomplete(); // Hybrid Address Logic
        initPilotVideo(); // Pilot Video Logic
        initWebcamNew(); // Face ID Scanner (V2)
        initLightbox(); // Full Screen Gallery
        renderGallery();
        renderDeals();
        console.log("System Ready.");
    } catch (e) {
        console.error("Critical System Failure:", e);
    }
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
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                canvas.getContext('2d').drawImage(video, 0, 0);

                // Convert to Image
                const dataUrl = canvas.toDataURL('image/png');
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
    tourController = new AbortController();
    const signal = tourController.signal;
    updateTourButtons("ARRÊT");

    // Steps Definition
    const STEPS = [
        {
            id: 'nav-ambiance',
            text: "ÉTAPE 1 : ACTIVATION SONORE. Choisissez votre ambiance et ajustez le volume, puis validez.",
            mobileFallback: 'mobile-menu-btn'
        },
        {
            id: 'tour-identity',
            text: "ÉTAPE 2 : IDENTIFICATION. Veuillez renseigner votre Prénom, Nom et Téléphone."
        },
        {
            id: 'simulator',
            text: "ÉTAPE 3 : NAVIGATION. Saisissez votre départ et arrivée pour calculer la trajectoire."
        },
        {
            id: 'about',
            text: "ÉTAPE 4 : LE PILOTE. Découvrez qui est aux commandes."
        },
        {
            id: 'archives',
            text: "ÉTAPE 5 : ARCHIVES. Parcourez les missions visuelles précédentes."
        },
        {
            id: 'deals',
            text: "ÉTAPE 6 : OFFRES. Sélectionnez une opportunité temporelle."
        },
        {
            id: 'reservation',
            text: "ÉTAPE 7 : VÉRIFICATION. Contrôlez les données importées dans le module final."
        },
        {
            id: 'camera-container', // Scan step
            text: "ÉTAPE 8 : SÉCURITÉ. Effectuez le scan biométrique facial. Souriez !"
        },
        {
            id: 'res-notes',
            text: "ÉTAPE 9 : SPÉCIFICATIONS. Ajoutez une note spéciale si nécessaire."
        },
        {
            id: 'btn-res-build',
            text: "ÉTAPE 10 : GÉNÉRATION. Créez votre ordre de mission."
        },
        {
            id: 'contact',
            text: "TERMINÉ. Transmettez le document ou contactez le QG. À bientôt."
        }
    ];

    // Helper: Highlight
    const highlight = (el) => {
        if (!el) return;
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        el.classList.add('ring-4', 'ring-neon-blue', 'relative', 'z-20', 'shadow-[0_0_50px_rgba(0,212,255,0.5)]');
    };

    const removeHighlight = (el) => {
        if (!el) return;
        el.classList.remove('ring-4', 'ring-neon-blue', 'relative', 'z-20', 'shadow-[0_0_50px_rgba(0,212,255,0.5)]');
    };

    // Helper: Update Button Text
    function updateTourButtons(text) {
        const dBtn = document.getElementById('btn-tour-desktop');
        const mBtn = document.getElementById('btn-tour-mobile');
        if (dBtn) dBtn.innerText = text;
        if (mBtn) mBtn.innerText = text;

        if (text === "ARRÊT") {
            if (dBtn) dBtn.classList.replace('bg-neon-blue', 'bg-limit-red');
            if (mBtn) mBtn.classList.replace('bg-neon-blue', 'bg-limit-red');
        } else {
            if (dBtn) dBtn.classList.replace('bg-limit-red', 'bg-neon-blue');
            if (mBtn) mBtn.classList.replace('bg-limit-red', 'bg-neon-blue');
        }
    }

    // Helper: Create Validation Button Promise
    const waitForValidation = (signal) => {
        return new Promise((resolve, reject) => {
            if (signal.aborted) return reject(new Error('Aborted'));

            const btn = document.createElement('button');
            btn.innerHTML = `<span class="animate-pulse">▶</span> VALIDER & CONTINUER`;
            btn.className = "fixed bottom-8 left-1/2 transform -translate-x-1/2 z-[100] bg-neon-blue text-black font-future font-bold py-4 px-8 rounded shadow-[0_0_20px_#00d4ff] hover:scale-105 transition-all text-sm tracking-widest border border-white/50";
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
        // Execution Loop
        for (const step of STEPS) {
            if (signal.aborted) break;

            // 1. Find Element
            let el = document.getElementById(step.id);
            if (window.innerWidth < 768 && step.mobileFallback) {
                const mobileEl = document.getElementById(step.mobileFallback);
                if (mobileEl) el = mobileEl;
            }

            // 2. Highlight
            if (el) highlight(el);

            // 3. Speak
            speak(step.text);

            // 4. Wait
            await waitForValidation(signal);

            // 5. Cleanup Highlight
            if (el) removeHighlight(el);
        }
    } catch (err) {
        console.log("Tour stopped:", err.message);
        document.querySelectorAll('.ring-neon-blue').forEach(el => removeHighlight(el));
        const vBtn = document.getElementById('tour-validation-btn');
        if (vBtn) vBtn.remove();
    } finally {
        tourController = null;
        updateTourButtons("AIDE");
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // Re-init mainly for safety if missing
    if (typeof initScrollEffect === 'function') initScrollEffect();
    if (typeof initTypewriter === 'function') initTypewriter();
    if (typeof initLightbox === 'function') initLightbox();
    // initWebcamNew is called inside initLightbox block usually, but fine here
});
