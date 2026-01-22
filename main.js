
/**
 * iA_k_venir - MAIN SCRIPT (Clean Build)
 */

/* =========================================
   DATA SECTION
   ========================================= */

const LOCATIONS = {
    "Villes & Villages (Alsace Central)": [
        { id: "baltzenheim", name: "Baltzenheim (QG)", dist: 0, zip: "68320" },
        { id: "marckolsheim", name: "Marckolsheim", dist: 6, zip: "67390" }, // Verified ~6km
        { id: "artzenheim", name: "Artzenheim", dist: 3, zip: "68320" }, // Verified ~3km
        { id: "kunheim", name: "Kunheim", dist: 5, zip: "68320" }, // Verified ~5km
        { id: "bicsheim", name: "Biesheim", dist: 10, zip: "68600" }, // Verified ~10km
        { id: "neufbrisach", name: "Neuf-Brisach", dist: 12, zip: "68600" }, // Verified ~12km
        { id: "selestat", name: "Sélestat", dist: 22, zip: "67600" }, // ~22km
        { id: "colmar", name: "Colmar", dist: 18, zip: "68000" }, // ~17-18km
        { id: "obernai", name: "Obernai", dist: 45, zip: "67210" }, // ~45km
        { id: "strasbourg", name: "Strasbourg", dist: 65, zip: "67000" }, // ~65km
        { id: "mulhouse", name: "Mulhouse", dist: 58, zip: "68100" } // ~58km
    ],
    "Route des Vins & Tourisme": [
        { id: "riquewihr", name: "Riquewihr", dist: 28, zip: "68340" }, // ~28km
        { id: "ribeauville", name: "Ribeauvillé", dist: 26, zip: "68150" }, // ~26km
        { id: "kaysersberg", name: "Kaysersberg", dist: 28, zip: "68240" }, // ~28km
        { id: "eguisheim", name: "Eguisheim", dist: 24, zip: "68420" }, // ~24km
        { id: "haut_koenigsbourg", name: "Château du Haut-Kœnigsbourg", dist: 35, zip: "67600" }, // ~35km
        { id: "mont_sainte_odile", name: "Mont Sainte-Odile", dist: 52, zip: "67530" }, // ~50-55km
        { id: "ungersheim", name: "Écomusée d'Alsace", dist: 52, zip: "68190" } // ~52km (Updated 2026)
    ],
    "Culture & Patrimoine (Top 3)": [
        { id: "dominicains_guebwiller", name: "Les Dominicains de Haute-Alsace (Guebwiller)", dist: 34, zip: "68500" } // ~34km
    ],
    "Loisirs & Frissons": [
        { id: "europapark", name: "Europa-Park (Rust, DE)", dist: 32, zip: "77977" }, // ~32km via Rhin tips
        { id: "rulantica", name: "Rulantica (Rust, DE)", dist: 33, zip: "77977" }, // ~33km
        { id: "spa_ribeauville", name: "Spa de Ribeauvillé", dist: 26, zip: "68150" },
        { id: "casino_ribeauville", name: "Casino de Ribeauvillé", dist: 26, zip: "68150" },
        { id: "paradis_sources", name: "Le Paradis des Sources (Soultzmatt)", dist: 32, zip: "68570" } // ~32km (Updated)
    ],
    "Gares & Aéroports": [
        { id: "gare_colmar", name: "Gare de Colmar", dist: 18, zip: "68000" },
        { id: "gare_selestat", name: "Gare de Sélestat", dist: 22, zip: "67600" },
        { id: "aerodrome_colmar", name: "Aérodrome de Colmar", dist: 19, zip: "68000" },
        { id: "gare_strasbourg", name: "Gare de Strasbourg", dist: 65, zip: "67000" },
        { id: "aeroport_entzheim", name: "Aéroport Strasbourg-Entzheim", dist: 62, zip: "67960" }, // ~62km
        { id: "euroairport", name: "EuroAirport (Bâle-Mulhouse)", dist: 72, zip: "68300" } // ~72km
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
        id: "VISIT-ALSACE",
        title: "VISIT ALSACE",
        description: "Portail officiel du tourisme en Alsace - Expériences et découvertes.",
        discount: "OFFICIEL",
        validity: "PERMANENT",
        color: "#b8ff00", // Vert Alsace
        url: "https://www.visit.alsace/",
        kitt_script: "Connexion au réseau touristique officiel d'Alsace. Base de données complète accessible."
    },
    {
        id: "ALSACE-ESSENTIELLE",
        title: "ALSACE ESSENTIELLE",
        description: "L'essence de l'Alsace - Culture, patrimoine et art de vivre.",
        discount: "CULTURE",
        validity: "PERMANENT",
        color: "#00d4ff", // Bleu
        url: "https://www.alsace-essentielle.fr/",
        kitt_script: "Accès au portail culturel régional. Données patrimoniales en cours de chargement."
    },
    {
        id: "KAYSERSBERG-VISIT",
        title: "KAYSERSBERG TOURISME",
        description: "Découvrez Kaysersberg, élu Village Préféré des Français 2017.",
        discount: "VILLAGE",
        validity: "PERMANENT",
        color: "#ff9d00", // Gold
        url: "https://www.kaysersberg.com/visiter/",
        kitt_script: "Kaysersberg détecté. Village classé. Architecture médiévale remarquable."
    },
    {
        id: "RIBEAUVILLE-ESSENTIELLE",
        title: "RIBEAUVILLÉ-RIQUEWIHR",
        description: "L'Alsace Essentielle - Vignoble, châteaux et traditions.",
        discount: "TERROIR",
        validity: "PERMANENT",
        color: "#ff3333", // Rouge
        url: "https://www.ribeauville-riquewihr.com/l-alsace-essentielle.htm",
        kitt_script: "Route des Vins confirmée. Secteur Ribeauvillé-Riquewihr. Trois châteaux en vue."
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

// --- LANGUAGE SYSTEM ---
let currentLanguage = localStorage.getItem('iakvenir_lang') || 'fr';

const TRANSLATIONS = {
    fr: {
        flag: "🇫🇷",
        label: "FR",
        welcome: "Bonjour Michael. Je suis prêt.",
        sim_title: "SIMULATEUR DE MISSION",
        dept_placeholder: "Ex: 1 Rue Principale, Artzenheim",
        dest_placeholder: "Ex: Gare de Colmar",
        calc_btn: "INITIALISER L'ITINÉRAIRE",
        weather_title: "ACTIVER LES CAPTEURS MÉTÉO",
        price_label: "ESTIMATION DU COÛT",
        dist_label: "DISTANCE",
        dur_label: "DURÉE",
        voice_intro: "Systèmes en ligne. Je suis prêt à vous conduire."
    },
    de: {
        flag: "🇩🇪",
        label: "DE",
        welcome: "Hallo Michael. Systeme bereit.",
        sim_title: "MISSION SIMULATOR",
        dept_placeholder: "Bsp: 1 Rue Principale, Artzenheim",
        dest_placeholder: "Bsp: Bahnhof Colmar",
        calc_btn: "ROUTE BERECHNEN",
        weather_title: "WETTERSENSOREN AKTIVIEREN",
        price_label: "KOSTENVORANSCHLAG",
        dist_label: "ENTFERNUNG",
        dur_label: "DAUER",
        voice_intro: "Alle Systeme online. Ich bin bereit."
    },
    en: {
        flag: "🇬🇧",
        label: "EN",
        welcome: "Hello Michael. I am ready.",
        sim_title: "MISSION SIMULATOR",
        dept_placeholder: "Ex: 1 Rue Principale, Artzenheim",
        dest_placeholder: "Ex: Colmar Station",
        calc_btn: "INITIATE ROUTE",
        weather_title: "ACTIVATE WEATHER SENSORS",
        price_label: "ESTIMATED COST",
        dist_label: "DISTANCE",
        dur_label: "DURATION",
        voice_intro: "Systems online. I am ready to drive."
    }
};

window.setLanguage = (lang) => {
    if (!TRANSLATIONS[lang]) return;
    currentLanguage = lang;
    localStorage.setItem('iakvenir_lang', lang);

    // Update UI Button
    const flagSpan = document.getElementById('current-lang-flag');
    const labelSpan = document.querySelector('[data-i18n="lang_label"]');
    if (flagSpan) flagSpan.innerText = TRANSLATIONS[lang].flag;
    if (labelSpan) labelSpan.innerText = TRANSLATIONS[lang].label;

    // Update Mobile Selector
    const mobileLangSelector = document.getElementById('lang-selector-mobile');
    if (mobileLangSelector) mobileLangSelector.value = lang;

    // Update Placeholders (Specific IDs)
    const deptInput = document.getElementById('sim-departure');
    const destInput = document.getElementById('sim-destination');
    if (deptInput) deptInput.placeholder = TRANSLATIONS[lang].dept_placeholder;
    if (destInput) destInput.placeholder = TRANSLATIONS[lang].dest_placeholder;

    // Update Text Content (Naive approach for now - ideally use data-i18n on all elements)
    // For this specific request, we will target key elements if they have IDs or classes.
    // Example: Simulator Title
    // Note: To do this properly, we need to add 'data-i18n' to HTML elements.
    // But for now, let's just confirm the switch triggers and KITT speaks.

    // Vocal Confirmation
    let greeting = TRANSLATIONS[lang].welcome;
    speak(greeting, true); // Force speak
};

// Initialize Language on Load
document.addEventListener('DOMContentLoaded', () => {
    setLanguage(currentLanguage);
});

/* =========================================
   AUDIO STREAMING ENGINE (Priority System)
   ========================================= */

const RADIO_STREAMS = {
    // 1. AMBIANCES (SomaFM & Nightride - Verified 2026)
    "relax": "https://ice1.somafm.com/groovesalad-128-mp3", // SomaFM Groove Salad
    "futuriste": "https://stream.nightride.fm/nightride.m4a", // Nightride FM Synthwave
    "retro": "https://ice1.somafm.com/u80s-128-mp3", // SomaFM Underground 80s
    "dab": "https://icecast.radiofrance.fr/fip-hifi.aac", // FIP National (HiFi AAC)

    // 2. DAB ALSACE (France Bleu & Classique - Verified 2026)
    "dkl": "https://icecast.radiofrance.fr/fbalsace-midfi.mp3", // France Bleu Alsace (MP3)

    "rdl": "https://radioclassique.ice.infomaniak.ch/radioclassique-high.mp3", // Radio Classique

    // 3. ELECTRO / DEEP (FIP & Soma - Verified 2026)
    "fg-main": "https://icecast.radiofrance.fr/fipelectro-hifi.aac", // FIP Electro (HiFi)
    "fg-chic": "https://ice1.somafm.com/groovesalad-128-mp3", // SomaFM Groove (Chill)
    "fg-deep": "https://ice1.somafm.com/dronezone-128-mp3", // SomaFM Drone Zone (Ambient)




    // 6. PulsRadio (Thematic Web Radios - Verified 2026)
    "puls-dance": "https://listen.openstream.co/6036/audio",  // PulsRadio DANCE
    "puls-hits": "https://listen.openstream.co/6042/audio",   // HITPARTY by PulsRadio
    "puls-club": "https://listen.openstream.co/6036/audio",   // (Same as Dance - Main Stream)
    "puls-lounge": "https://listen.openstream.co/6044/audio", // PulsRadio LOUNGE
    "puls-trance": "https://listen.openstream.co/6051/audio", // PulsRadio TRANCE
    "puls-2000": "https://listen.openstream.co/6055/audio",   // PulsRadio 2000
    "puls-90": "https://listen.openstream.co/6046/audio",     // PulsRadio 90
    "puls-80": "https://listen.openstream.co/6048/audio"      // PulsRadio 80s
};

let audioPlayer = new Audio();
audioPlayer.crossOrigin = "anonymous"; // REQUIRED for Web Audio API processing of external streams
let audioTimeout = null;
let isRadioActive = false; // Is a station selected?
let isDucked = false;      // Is audio suppressed by higher priority?

function playRadio(ambianceKey) {


    // 0.5 Handle SILENCE (Stealth Mode)
    if (ambianceKey === 'silence') {


        if (audioPlayer) {
            audioPlayer.pause();
            audioPlayer.currentTime = 0;
            // Remove src to ensure it stops buffering/downloading
            audioPlayer.removeAttribute('src');
        }
        if (audioTimeout) clearTimeout(audioTimeout);

        isRadioActive = false;

        // Sync UI Selectors
        const sel = document.getElementById('nav-ambiance');
        if (sel && sel.value !== ambianceKey) sel.value = ambianceKey;

        // Visuals to Silence
        if (typeof rhythmEngine !== 'undefined') {
            rhythmEngine.setMode('silence');
        }

        console.log("[AUDIO] Stealth Mode Activated: All audio sources muted.");
        return;
    }

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

    // Connect to Web Audio API for normalization
    connectRadioSource(audioPlayer);

    // Volume is now controlled by gainNode, not audioPlayer.volume
    // audioPlayer.volume = 0.3; // Removed - using gainNode instead

    // Debug Listeners
    audioPlayer.onplaying = () => console.log(`[AUDIO] Playing: ${ambianceKey}`);
    audioPlayer.onerror = (e) => {
        const error = audioPlayer.error;
        console.error(`[AUDIO] Error Code: ${error ? error.code : 'Unknown'}`, error);
        if (window.speak) speak("Signal radio perdu ou station indisponible.");
    };
    audioPlayer.onwaiting = () => console.log(`[AUDIO] Buffering: ${ambianceKey}...`);

    // Attempt Play
    const playPromise = audioPlayer.play();
    if (playPromise !== undefined) {
        playPromise
            .then(() => console.log(`[AUDIO] Playback started successfully (CORS: ${audioPlayer.crossOrigin}).`))
            .catch(e => {
                console.warn(`[AUDIO] Playback Error:`, e);
                // If it's a CORS error, this will often show as "The play() request was interrupted by a new load request" or similar in debug.
                if (window.speak) speak("Impossible de lancer le flux radio. Erreur de sécurité ou de connexion.");
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

// --- VOLUME CONTROL IMPROVED ---
let audioContext = null;
let gainNode = null;
let sourceNode = null;
let audioSourceConnected = false; // Track if source is already connected

function connectRadioSource(playerElement) {
    if (!playerElement) return;

    // Init Context only on user interaction (or first play)
    if (!audioContext) {
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            audioContext = new AudioContext();
            gainNode = audioContext.createGain();
            gainNode.connect(audioContext.destination);
            console.log("[AUDIO] AudioContext Initialized");
        } catch (e) {
            console.error("[AUDIO] Failed to init AudioContext:", e);
        }
    }

    // Create source ONLY ONCE (MediaElementSource can only be created once per element)
    if (!audioSourceConnected && audioContext) {
        try {
            sourceNode = audioContext.createMediaElementSource(playerElement);
            sourceNode.connect(gainNode);
            audioSourceConnected = true;
            console.log("[AUDIO] Source Connected to Gain Node (with CORS)");
        } catch (e) {
            console.warn("[AUDIO] Source connection error (may already be connected):", e);
        }
    }

    // Resume context if suspended (common browser policy)
    if (audioContext && audioContext.state === 'suspended') {
        audioContext.resume();
    }
}

// Volume Slider Listener
document.addEventListener('DOMContentLoaded', () => {
    const volSlider = document.getElementById('vol-control'); // Correct ID
    const volSliderMobile = document.getElementById('vol-control-mobile'); // Mobile slider

    const updateVolume = (val) => {
        console.log(`[AUDIO] Volume slider changed to: ${val}`);
        if (gainNode) {
            gainNode.gain.setTargetAtTime(val, audioContext.currentTime, 0.1);
            console.log(`[AUDIO] GainNode updated to: ${val}`);
        } else {
            if (audioPlayer) audioPlayer.volume = val;
            console.log(`[AUDIO] Fallback: audioPlayer.volume set to: ${val}`);
        }
    };

    if (volSlider) {
        volSlider.addEventListener('input', (e) => {
            const val = parseFloat(e.target.value) / 100;
            updateVolume(val);
            if (volSliderMobile) volSliderMobile.value = e.target.value; // Sync mobile
        });
        console.log('[AUDIO] Desktop volume slider listener attached');
    }

    if (volSliderMobile) {
        volSliderMobile.addEventListener('input', (e) => {
            const val = parseFloat(e.target.value) / 100;
            updateVolume(val);
            if (volSlider) volSlider.value = e.target.value; // Sync desktop
        });
        console.log('[AUDIO] Mobile volume slider listener attached');
    }

    if (!volSlider && !volSliderMobile) {
        console.warn('[AUDIO] No volume sliders found in DOM');
    }
});

/* =========================================
   VOICE ENGINE
   ========================================= */

const KITT_QUOTES = [
    "Mes capteurs indiquent que vous risquez de vous amuser, si toutefois vous ne vous égarez pas en chemin...",
    "Trajet calculé. J'espère que vous n'avez pas prévu de course-poursuite aujourd'hui.",
    "Bande passante audio activée. Le tarif est affiché. Dois-je préparer le mode Turbo Boost ?",
    "Analyse terminée. C'est une destination très pittoresque. Je garderai mes scanners en alerte.",
    "Voici l'estimation. N'oubliez pas que je ne peux pas sauter par-dessus les bouchons... enfin, pas légalement.",
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
   SOUND ENGINE (KITT FX)
   ========================================= */
function playSound(id, loop = false, vol = 0.5) {
    const audio = document.getElementById(id);
    if (audio) {
        audio.loop = loop;
        audio.currentTime = 0;
        audio.volume = vol; // Custom volume
        audio.play().catch(e => console.warn(`Sound ${id} blocked:`, e));
    }
}

function stopSound(id) {
    const audio = document.getElementById(id);
    if (audio) {
        audio.pause();
        audio.currentTime = 0;
    }
}

/* =========================================
   VOICE ENGINE (Thomas - French Priority)
   ========================================= */
let selectedVoice = null;

function initVoice() {
    console.log("[SPEECH] Initializing Voice Engine...");

    // 1. Load Voices
    const loadVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        console.log(`[SPEECH] Available voices: ${voices.length}`);

        if (voices.length > 0) {
            voicesLoaded = true;

            // CROSS-PLATFORM KITT VOICE SELECTION
            // Priority 1: Windows (Microsoft Paul/Mathieu - Best Male French)
            // Priority 2: Mac/iOS (Thomas - Premium Male)
            // Priority 3: Android/Chrome (Google Français - often decent)
            // Priority 4: Generic "Male" hint in French
            const maleNames = ["Thomas", "Paul", "Mathieu", "Daniel", "Nicolas", "Cyril"];

            selectedVoice =
                // 1. Specific High-Quality Male Voices
                voices.find(v => maleNames.some(n => v.name.includes(n)) && v.lang.startsWith("fr")) ||
                // 2. Generic Male Tag (Android/Windows often use "Microsoft Paul - French (France)")
                voices.find(v => v.lang.startsWith("fr") && (v.name.includes("Male") || v.name.includes("Homme"))) ||
                // 3. Google Voices (Check if Male is in name, otherwise gamble)
                voices.find(v => v.name.includes("Google") && v.lang.startsWith("fr") && !v.name.includes("Female")) ||
                // 4. Fallback
                voices.find(v => v.lang.startsWith("fr"));

            if (selectedVoice) {
                console.log(`[SPEECH] Selected Voice: ${selectedVoice.name} (${selectedVoice.lang})`);
            } else {
                // Fallback to English if no French (shouldn't happen on modern OS)
                selectedVoice = voices[0];
                console.warn(`[SPEECH] No French voice found. Falling back to: ${selectedVoice.name}`);
            }
        } else {
            console.warn("[SPEECH] No voices available yet.");
        }
    };

    if ('speechSynthesis' in window) {
        // Some browsers need this to fire multiple times
        window.speechSynthesis.onvoiceschanged = () => {
            console.log("[SPEECH] voiceschanged event fired");
            loadVoices();
        };
        loadVoices();
    } else {
        console.error("[SPEECH] speechSynthesis NOT supported in this browser.");
    }
}

// Speak Function (Global) - RETURNS PROMISE
window.speak = function (text) {
    return new Promise((resolve) => {
        if (!('speechSynthesis' in window)) {
            console.warn("[SPEECH] Synthesis not supported");
            resolve();
            return;
        }

        console.log(`[SPEECH] Request to speak: "${text.substring(0, 50)}${text.length > 50 ? '...' : ''}"`);

        // Force voice reload if not loaded
        if (!voicesLoaded || !selectedVoice) {
            console.log("[SPEECH] Voices not loaded or selected. Attempting immediate re-init.");
            initVoice();
        }

        // Wait a tiny bit for init if it was just called (for browsers where getVoices is async)
        const attemptSpeak = (retryCount = 0) => {
            if (!selectedVoice && retryCount < 3) {
                console.log(`[SPEECH] Voice still not ready, retry ${retryCount + 1}/3...`);
                setTimeout(() => attemptSpeak(retryCount + 1), 100);
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

            // KITT VOICE BEEP (Disabled - User Feedback: Too stressful)
            // playSound('audio-voice-beep', false, 0.15);

            const utterance = new SpeechSynthesisUtterance(text);

            // --- DYNAMIC VOICE SELECTION BASED ON LANGUAGE ---
            const voices = window.speechSynthesis.getVoices();
            let targetLangCode = currentLanguage || 'fr';

            // Map Alsatian to German voice
            if (targetLangCode === 'als') targetLangCode = 'de';

            let bestVoice = null;

            if (targetLangCode === 'fr') {
                const maleNames = ["Thomas", "Paul", "Mathieu", "Daniel", "Nicolas", "Cyril"];
                bestVoice = voices.find(v => maleNames.some(n => v.name.includes(n)) && v.lang.startsWith("fr")) ||
                    voices.find(v => v.lang.startsWith("fr"));
            } else if (targetLangCode === 'de') {
                bestVoice = voices.find(v => v.lang.startsWith("de") && v.name.includes("Google")) ||
                    voices.find(v => v.lang.startsWith("de"));
            } else if (targetLangCode === 'en') {
                bestVoice = voices.find(v => v.lang.startsWith("en-GB") && v.name.includes("Male")) ||
                    voices.find(v => v.lang.startsWith("en"));
            }

            if (bestVoice) {
                utterance.voice = bestVoice;
                console.log(`[SPEECH] Speaking with: ${bestVoice.name} (${targetLangCode})`);
            } else {
                console.warn(`[SPEECH] No voice found for ${targetLangCode}. Using default.`);
            }

            // Adjust Pitch/Rate slightly per language/persona
            if (targetLangCode === 'de') { utterance.pitch = 0.9; utterance.rate = 1.0; } // Serious German
            else if (targetLangCode === 'en') { utterance.pitch = 1.0; utterance.rate = 1.0; }
            else { utterance.pitch = 0.7; utterance.rate = 1.2; } // Fast French KITT

            utterance.volume = 1.0;

            // Events
            utterance.onstart = () => {
                console.log("[SPEECH] Playback started");
            };

            utterance.onend = () => {
                console.log("[SPEECH] Playback ended");
                // RESUME AUDIO
                if (typeof resumeRadio === 'function') resumeRadio();

                if (pilotVideo && pilotWasPlaying) {
                    pilotVideo.muted = false;
                }
                resolve();
            };

            utterance.onerror = (e) => {
                console.error("[SPEECH] Error during playback:", e);
                if (typeof resumeRadio === 'function') resumeRadio();
                if (pilotVideo && pilotWasPlaying) pilotVideo.muted = false;
                resolve();
            };

            window.speechSynthesis.speak(utterance);
        };

        attemptSpeak();
    });
};

// Fetch weather for BOTH departure and destination
window.fetchBothWeatherForecasts = async function () {
    const departure = document.getElementById('res-pickup')?.value;
    const destination = document.getElementById('res-drop')?.value;
    const pickupDateTime = document.getElementById('res-pickup-datetime')?.value;

    if (!departure || !destination || !pickupDateTime) {
        if (window.speak) {
            speak("Veuillez renseigner le départ, la destination et la date avant de valider la météo.");
        }
        return;
    }

    try {
        console.log('[WEATHER] Fetching for BOTH locations');

        // Fetch both in parallel
        const [depWeather, destWeather] = await Promise.all([
            fetchWeatherForLocation(departure, pickupDateTime),
            fetchWeatherForLocation(destination, pickupDateTime)
        ]);

        if (depWeather && destWeather) {
            // Store for PDF
            reservationWeatherData = {
                departure: depWeather,
                destination: destWeather
            };

            // Display
            displayDualWeatherSummary(depWeather, destWeather);

            // VOCALIZE - SMART FLUID SUMMARY
            let voiceMsg = `Météo pour votre trajet le ${depWeather.dateTime}. `;

            // Compare conditions
            const tempDiff = Math.abs(depWeather.temp - destWeather.temp);
            const isWeatherSimilar = depWeather.weatherDesc === destWeather.weatherDesc;
            const avgTemp = Math.round((depWeather.temp + destWeather.temp) / 2);

            if (tempDiff <= 3 && isWeatherSimilar) {
                // UNIFORM
                voiceMsg += `Temps homogène sur tout le parcours. ${depWeather.weatherDesc} avec une moyenne de ${avgTemp} degrés. `;
            } else {
                // CONTHAST
                voiceMsg += `Au départ de ${depWeather.destination}, ${depWeather.weatherDesc} et ${depWeather.temp} degrés. `;
                voiceMsg += `À l'arrivée à ${destWeather.destination}, ${destWeather.weatherDesc} et ${destWeather.temp} degrés. `;
            }

            // Single Suggestion (Based on Destination or Coldest point)
            const suggestion = getClothingSuggestion(destWeather.temp).replace('💡 Suggestion: ', '').replace('💡 ', '');
            voiceMsg += `Conseil confort : ${suggestion}`;

            if (window.speak) {
                speak(voiceMsg);
            }
        }
    } catch (error) {
        console.error('[WEATHER] Error fetching dual forecasts:', error);
    }
};

// Helper: Fetch weather for a single location
async function fetchWeatherForLocation(locationName, dateTime) {
    if (typeof geocodeLocation !== 'function' || typeof fetchWeatherData !== 'function') {
        console.error('[WEATHER] Required functions not available');
        return null;
    }

    const location = await geocodeLocation(locationName);
    if (!location) return null;

    const weatherData = await fetchWeatherData(location.lat, location.lon);
    if (!weatherData || !weatherData.hourly) return null;

    // Convert French date format (DD/MM/YYYY HH:mm) to ISO format
    let selectedDate;
    if (dateTime.includes('/')) {
        // French format: "16/01/2026 14:00"
        const parts = dateTime.split(' ');
        const dateParts = parts[0].split('/');
        const timePart = parts[1] || '00:00';
        // Convert to ISO: YYYY-MM-DDTHH:mm
        const isoDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}T${timePart}`;
        selectedDate = new Date(isoDate);
        console.log('[WEATHER] Converted date:', dateTime, '→', isoDate, '→', selectedDate);
    } else {
        selectedDate = new Date(dateTime);
    }

    // Find closest hourly forecast
    let closestIndex = -1;
    let minDiff = Infinity;

    for (let i = 0; i < weatherData.hourly.time.length; i++) {
        const forecastTime = new Date(weatherData.hourly.time[i]);
        const diff = Math.abs(forecastTime - selectedDate);
        if (diff < minDiff) {
            minDiff = diff;
            closestIndex = i;
        }
    }

    if (closestIndex === -1) return null;

    const temp = Math.round(weatherData.hourly.temperature_2m[closestIndex]);
    const weatherCode = weatherData.hourly.weather_code[closestIndex];
    const windSpeed = Math.round(weatherData.hourly.wind_speed_10m[closestIndex]);
    const precipProb = weatherData.hourly.precipitation_probability?.[closestIndex] || 0;

    const WMO_CODES = {
        0: 'Ciel Dégagé', 1: 'Peu Nuageux', 2: 'Partiel. Nuageux', 3: 'Couvert',
        45: 'Brouillard', 48: 'Brouillard Givrant',
        51: 'Bruine Légère', 53: 'Bruine Modérée', 55: 'Bruine Dense',
        61: 'Pluie Faible', 63: 'Pluie Modérée', 65: 'Pluie Forte',
        71: 'Neige Faible', 73: 'Neige Modérée', 75: 'Neige Forte',
        80: 'Averses Pluie', 95: 'Orage'
    };
    const weatherDesc = WMO_CODES[weatherCode] || 'Variable';

    return {
        destination: location.name || locationName,
        temp,
        weatherDesc,
        weatherCode,
        windSpeed,
        precipProb,
        dateTime: selectedDate.toLocaleString('fr-FR')
    };
}

// Display dual weather summary
function displayDualWeatherSummary(depWeather, destWeather) {
    const summaryDiv = document.getElementById('res-weather-summary');
    const iconDiv = document.getElementById('res-weather-icon');
    const detailsDiv = document.getElementById('res-weather-details');
    const suggestionP = document.getElementById('res-weather-suggestion');

    if (!summaryDiv || !detailsDiv || !suggestionP) return;

    // Get weather icons
    let depIcon = '☀️';
    let destIcon = '☀️';
    if (typeof getAnimatedIcon === 'function') {
        depIcon = getAnimatedIcon(depWeather.weatherCode);
        destIcon = getAnimatedIcon(destWeather.weatherCode);
    }

    // Populate with BOTH forecasts
    // Populate with BOTH forecasts
    // Fix: Icons are now integrated into the details block clearly one below the other
    if (iconDiv) iconDiv.style.display = 'none'; // Hide old icon container if it still exists (safety)

    detailsDiv.innerHTML = `
        <div class="space-y-4">
            <!-- DEPARTURE ROW -->
            <div class="flex items-center gap-3">
                <div class="w-12 h-12 flex-shrink-0 animate-fade-in">
                    ${depIcon}
                </div>
                <div class="flex-1 border-l-2 border-neon-green pl-3">
                    <p class="text-neon-green font-bold text-xs mb-1">🚗 DÉPART: ${depWeather.destination}</p>
                    <p>🌡️ ${depWeather.temp}°C - ${depWeather.weatherDesc}</p>
                    <p class="text-xs text-gray-400">💨 ${depWeather.windSpeed} km/h | ☔ ${depWeather.precipProb}%</p>
                </div>
            </div>

            <!-- ARRIVAL ROW -->
            <div class="flex items-center gap-3">
                <div class="w-12 h-12 flex-shrink-0 animate-fade-in">
                    ${destIcon}
                </div>
                <div class="flex-1 border-l-2 border-gold pl-3">
                    <p class="text-gold font-bold text-xs mb-1">🏁 ARRIVÉE: ${destWeather.destination}</p>
                    <p>🌡️ ${destWeather.temp}°C - ${destWeather.weatherDesc}</p>
                    <p class="text-xs text-gray-400">💨 ${destWeather.windSpeed} km/h | ☔ ${destWeather.precipProb}%</p>
                </div>
            </div>
        </div>
    `;

    // Mutualize suggestions if identical
    const depSuggestion = getClothingSuggestion(depWeather.temp);
    const destSuggestion = getClothingSuggestion(destWeather.temp);

    if (depSuggestion === destSuggestion) {
        suggestionP.innerHTML = `<strong>Pour tout le trajet :</strong> ${depSuggestion}`;
    } else {
        suggestionP.innerHTML = `
            <strong>Départ:</strong> ${depSuggestion}<br>
            <strong>Arrivée:</strong> ${destSuggestion}
        `;
    }

    // Keep weather summary hidden for surprise effect - only vocalize and show in PDF
    summaryDiv.classList.remove('hidden');

    // Calculate and set ideal cabin temperature
    setIdealCabinTemperature(depWeather, destWeather);
}

// Calculate ideal cabin temperature based on outside conditions
function setIdealCabinTemperature(depWeather, destWeather) {
    const teslaTempDiv = document.getElementById('res-tesla-temp');
    const cabinTempInput = document.getElementById('res-cabin-temp');
    const comfortMsg = document.getElementById('res-temp-comfort');

    if (!teslaTempDiv || !cabinTempInput || !comfortMsg) return;

    // Calculate average outside temperature
    const avgTemp = (depWeather.temp + destWeather.temp) / 2;

    // Calculate ideal cabin temperature
    let idealTemp;
    if (avgTemp < 0) {
        idealTemp = 22; // Très froid dehors → chaleur confortable
    } else if (avgTemp < 10) {
        idealTemp = 21; // Froid → température agréable
    } else if (avgTemp < 20) {
        idealTemp = 20; // Frais → légèrement chauffé
    } else if (avgTemp < 25) {
        idealTemp = 19; // Doux → température neutre
    } else {
        idealTemp = 18; // Chaud → climatisation légère
    }

    // Set default value
    cabinTempInput.value = idealTemp;

    // Display comfort message
    const tempDiff = idealTemp - avgTemp;
    let message;
    if (tempDiff > 10) {
        message = "Chaleur confortable pour contrer le froid extérieur";
    } else if (tempDiff > 5) {
        message = "Température agréable pour votre confort";
    } else if (tempDiff > 0) {
        message = "Ambiance neutre et reposante";
    } else {
        message = "Fraîcheur climatisée pour votre bien-être";
    }
    comfortMsg.textContent = message;

    // Keep temperature control hidden for surprise effect - only show in PDF
    teslaTempDiv.classList.remove('hidden');
}


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

    if (titleEl) titleEl.textContent = `// ${(deal.title || deal.name).toUpperCase()}`;
    if (counterEl) counterEl.textContent = `${currentOverlayIndex + 1} / ${overlayDeals.length}`;

    // Handle Blocked Sites (PORTAL MODE)
    if (deal.blocked) {
        if (iframe) iframe.style.display = 'none';
        if (scanner) scanner.style.display = 'none';

        if (portal) {
            portal.classList.remove('hidden');
            // Populate Portal
            if (portalTitle) portalTitle.innerText = deal.title || deal.name;
            if (portalText) portalText.innerText = deal.description || "Contenu externe sécurisé. Ouvrez le lien pour voir le site.";
            if (portalMeta) portalMeta.innerHTML = deal.discount ? `
                <span class="font-bold text-neon-blue">${deal.discount}</span>
                <span>//</span>
                <span>${deal.validity}</span>
            ` : `<span class="text-neon-blue">LIEN EXTERNE</span>`;

            const btnPortalBack = document.getElementById('btn-portal-back');

            if (btnPortal) {
                btnPortal.onclick = () => {
                    window.open(deal.url, '_blank');
                    // closeDealOverlay(); // Optional: keep open if navigation is desired
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

function openExternalOverlay(url, title, queue = null, index = 0, isBlocked = false) {
    const overlay = document.getElementById('deal-overlay');
    const iframe = document.getElementById('deal-iframe');
    const scanner = document.getElementById('deal-scanner');
    const titleEl = document.getElementById('deal-overlay-title');
    const navControls = document.querySelector('#deal-overlay .flex.items-center.gap-2'); // Nav buttons container

    if (overlay) {
        overlay.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }

    // QUEUE LOGIC FOR NAVIGATION
    if (queue && queue.length > 0) {
        overlayDeals = queue;
        currentOverlayIndex = index;
        if (navControls) navControls.classList.remove('hidden');
    } else {
        // Single Link Mode
        overlayDeals = [{ url: url, title: title, name: title, blocked: isBlocked }];
        currentOverlayIndex = 0;
        if (navControls) navControls.classList.add('hidden');
    }

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

    // Dynamic Date Calculation (Current Day/Month + Year 26)
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const displayDate = `${day}-${month}-26`; // "DD-MM-26"

    grid.innerHTML = visibleDeals.map(deal => `
        <div class="relative group h-[450px] transform transition-transform duration-500 hover:z-50">
            
            <!-- Glass Ticket Container with Dynamic Color Variable -->
            <div class="glass-ticket" style="--ticket-color: ${deal.color}">
                
                <!-- HEADER (Restored Layout): Title Top-Left, Discount Top-Right -->
                <div class="ticket-header">
                    <div>
                        <div class="ticket-top-meta mb-1">ID_TRANSACTION: ${deal.id}</div>
                        <h3 class="ticket-title">${deal.title}</h3>
                    </div>
                    
                    <!-- Discount Badge (Rotated/Styled) -->
                    <div class="relative group/badge">
                        <div class="absolute inset-0 bg-[var(--ticket-color)] blur-md opacity-50 animate-pulse"></div>
                        <div class="relative bg-[var(--ticket-color)] text-black px-3 py-1 font-bold font-future text-xs transform -rotate-2 shadow-lg border border-white/50">
                            ${deal.discount}
                        </div>
                    </div>
                </div>

                <!-- 2026 DATE INSERTION (Integrated aesthetically) -->
                <div class="ticket-date-display">
                    <svg class="w-5 h-5 animate-spin-slow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>${displayDate}</span>
                </div>

                <!-- BODY: Description -->
                <div class="ticket-body flex flex-col justify-center">
                    <p class="ticket-desc">"${deal.description}"</p>
                </div>

                <!-- FOOTER: Meta, Validity, Barcode -->
                <div class="ticket-footer">
                    <div class="ticket-meta">
                        <p class="mb-1 text-white/50">VALIDITÉ</p>
                        <p class="text-[var(--ticket-color)] font-bold text-sm tracking-widest">${deal.validity}</p>
                    </div>

                    <!-- Barcode Simulation -->
                    <div class="ticket-barcode">
                        <div class="bar h-full"></div>
                        <div class="bar h-2/3 self-end"></div>
                        <div class="bar h-full"></div>
                        <div class="bar h-1/2 self-end"></div>
                        <div class="bar h-3/4 self-end"></div>
                        <div class="bar h-full"></div>
                        <div class="bar h-1/3 self-end"></div>
                        <div class="bar h-full"></div>
                    </div>
                </div>

                <!-- ACTIONS (Integrated inside the glass card for visibility) -->
                <div class="ticket-actions">
                    <button onclick="${deal.url ? `openDealOverlay('${deal.url}')` : `activateDeal('${deal.id}')`}" class="btn-voir">
                        ${deal.url ? "VOIR L'OFFRE" : "ACTIVER"}
                    </button>
                    <button onclick="selectDeal('${deal.id}')" class="btn-select">
                        SÉLECTIONNER
                    </button>
                </div>

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

// POI DATA STRUCTURE (Suggestions after calculation)
const POI_DATA = {
    "colmar": {
        "pratique": [
            { name: "Office de Tourisme", url: "https://tourisme-colmar.com/", icon: "ℹ️" },
            { name: "Carte Interactive", url: "https://www.alsace-essentielle.fr/explorer-le-territoire/carte-interactive/", icon: "🗺️" },
            { name: "Agenda de Colmar", url: "https://www.visit.alsace/?s=Agenda+Colmar", icon: "📅" }
        ],
        "insolite": [
            { name: "Maison des Têtes", url: "https://www.maisondestetes.com/", icon: "🗿" },
            { name: "Quai de la Poissonnerie", url: "https://tourisme-colmar.com/", icon: "🐟" },
            { name: "Maison aux Raisins", url: "https://tourisme-colmar.com/", icon: "🍇" }
        ],
        "gastronomy": [
            { name: "JY'S (2* Michelin)", url: "https://www.jean-yves-schillinger.com/", icon: "⭐" },
            { name: "L'Atelier du Peintre (1*)", url: "https://www.atelier-peintre.fr/", icon: "🎨" },
            { name: "Wistub Brenner", url: "https://www.wistub-brenner.fr/", icon: "🥘" }
        ],
        "culture": [
            { name: "Musée Unterlinden", url: "https://www.musee-unterlinden.com/", icon: "🖼️" },
            { name: "Musée Bartholdi", url: "https://www.musee-bartholdi.fr/", icon: "🗽" },
            { name: "Petite Venise", url: "https://tourisme-colmar.com/", icon: "🛶" }
        ],
        "leisure": [
            { name: "Balade en Barque", url: "https://www.barques-colmar.fr/", icon: "🛶" },
            { name: "Marché Couvert", url: "https://www.marche-couvert-colmar.fr/", icon: "🥨" },
            { name: "Musée du Jouet", url: "https://www.museejouet.com/", icon: "🧸" }
        ],
        "wine": [
            { name: "Domaine Martin Jund", url: "https://www.visit.alsace/?s=Domaine+Martin+Jund", icon: "🍇" },
            { name: "Domaine Karcher", url: "https://www.visit.alsace/?s=Domaine+Karcher", icon: "🍷" },
            { name: "Wolfberger Colmar", url: "https://www.visit.alsace/?s=Wolfberger", icon: "🍾" }
        ]
    },
    "strasbourg": {
        "pratique": [
            { name: "Visit Strasbourg (OT)", url: "https://www.visitstrasbourg.fr/", icon: "ℹ️" },
            { name: "Carte Interactive", url: "https://www.alsace-essentielle.fr/explorer-le-territoire/carte-interactive/", icon: "🗺️" },
            { name: "Agenda Strasbourg", url: "https://www.visit.alsace/?s=Agenda+Strasbourg", icon: "📅" }
        ],
        "insolite": [
            { name: "Secrets de Strasbourg", url: "https://www.visitstrasbourg.fr/", icon: "🤫" },
            { name: "Barrage Vauban", url: "https://www.strasbourg.eu/", icon: "🏰" },
            { name: "Cave des Hospices", url: "https://www.vins-des-hospices-de-strasbourg.fr/", icon: "🍷" }
        ],
        "gastronomy": [
            { name: "Maison Kammerzell", url: "https://www.maison-kammerzell.com/", icon: "🍽️" },
            { name: "Au Crocodile (1*)", url: "https://www.au-crocodile.com/", icon: "🐊" },
            { name: "Buerehiesel (1*)", url: "https://www.buerehiesel.fr/", icon: "🏡" }
        ],
        "culture": [
            { name: "Cathédrale Notre-Dame", url: "https://www.cathedrale-strasbourg.fr/", icon: "⛪" },
            { name: "Palais Rohan", url: "https://www.musees.strasbourg.eu/", icon: "👑" }, ,
            { name: "Musée Alsacien", url: "https://www.musees.strasbourg.eu/musee-alsacien", icon: "🥨" }
        ],
        "leisure": [
            { name: "Batorama (Bateau)", url: "https://www.batorama.com/", icon: "🚤" },
            { name: "Sorties (Pokaa)", url: "https://pokaa.fr/", icon: "🎉" },
            { name: "Marché de Noël", url: "https://noel.strasbourg.eu/", icon: "🎄" }
        ],
        "wine": [
            { name: "Cave Historique", url: "https://www.visit.alsace/?s=Cave+Historique+Strasbourg", icon: "🏚️" },
            { name: "Oenosphère", url: "https://www.visit.alsace/?s=Oenosphere", icon: "🍾" },
            { name: "Terres à Vin", url: "https://www.visit.alsace/?s=Terres+a+Vin", icon: "🍷" }
        ]
    },
    "ribeauville": {
        "pratique": [
            { name: "OT Ribeauvillé-Riquewihr", url: "https://www.ribeauville-riquewihr.com/", icon: "ℹ️" },
            { name: "Carte Interactive", url: "https://www.alsace-essentielle.fr/explorer-le-territoire/carte-interactive/", icon: "🗺️" },
            { name: "Agenda Ribeauvillé", url: "https://www.visit.alsace/?s=Agenda+Ribeauville", icon: "📅" }
        ],
        "insolite": [
            { name: "Fête des Ménétriers", url: "https://www.ribeauville-riquewihr.com/animations/fete-des-menetriers.htm", icon: "🎺" },
            { name: "Les 3 Châteaux", url: "https://www.ribeauville-riquewihr.com/decouvrir/les-chateaux.htm", icon: "🏰" },
            { name: "Monastère Dusenbach", url: "https://dusenbach.fr/", icon: "⛪" }
        ],
        "gastronomy": [
            { name: "Au Cheval Blanc", url: "https://www.cheval-blanc-ribeauville.com/", icon: "🍴" }, ,
            { name: "Wistub Zum Pfifferhus", url: "https://www.tripadvisor.fr/Restaurant_Review-g187078-d1329583-Reviews-Wistub_Zum_Pfifferhus-Ribeauville_Haut_Rhin_Grand_Est.html", icon: "🥓" },
            { name: "La Flammerie", url: "https://www.laflammerie.fr/", icon: "🔥" }
        ],
        "culture": [
            { name: "Tour des Bouchers", url: "https://www.ribeauville.fr/fr/patrimoine.html", icon: "🗼" },
            { name: "Hôtel de Ville", url: "https://www.ribeauville.fr/", icon: "🏛️" },
            { name: "Église St-Grégoire", url: "https://www.ribeauville.fr/fr/patrimoine.html", icon: "⛪" }
        ],
        "leisure": [
            { name: "Casino Barrière", url: "https://www.casinosbarriere.com/fr/ribeauville.html", icon: "🎰" },
            { name: "Spa & Balnéo", url: "https://www.hotelsbarriere.com/fr/ribeauville/resort-barriere-ribeauville.html", icon: "💆" }, ,
            { name: "Rando Vignoble", url: "https://www.ribeauville-riquewihr.com/bouger/balades-et-randonnees.htm", icon: "🥾" }
        ],
        "wine": [
            { name: "Maison Trimbach", url: "https://www.trimbach.fr/", icon: "🥂" },
            { name: "Louis Sipp", url: "https://www.sipp.com/", icon: "🍇" },
            { name: "Cave de Ribeauvillé", url: "https://vins-ribeauville.com/", icon: "🍾" }
        ]
    },
    "riquewihr": {
        "pratique": [
            { name: "OT Ribeauvillé-Riquewihr", url: "https://www.ribeauville-riquewihr.com/", icon: "ℹ️" },
            { name: "Carte Interactive", url: "https://www.alsace-essentielle.fr/explorer-le-territoire/carte-interactive/", icon: "🗺️" },
            { name: "Agenda Riquewihr", url: "https://www.visit.alsace/?s=Agenda+Riquewihr", icon: "📅" }
        ],
        "insolite": [
            { name: "Musée du Dolder", url: "https://www.musee-riquewihr.fr/", icon: "🏰" }, ,
            { name: "Tour des Voleurs", url: "https://www.ribeauville-riquewihr.com/decouvrir/musees/musee-du-dolder.htm", icon: "🔦" },
            { name: "Maison de Hansi", url: "https://www.hansi.fr/", icon: "🏠" }
        ],
        "gastronomy": [
            { name: "Table du Gourmet (1*)", url: "https://www.jlbrendel.com/", icon: "⭐" },
            { name: "D'Brendelstub", url: "https://www.jlbrendel.com/fr/winstub-brendelstub.html", icon: "🍲" },
            { name: "Le Manala", url: "https://www.hotel-st-nicolas.com/", icon: "🥨" }
        ],
        "culture": [
            { name: "Le Dolder", url: "https://www.ribeauville-riquewihr.com/", icon: "tower" },
            { name: "Porte Haute (Dolder)", url: "https://www.ribeauville-riquewihr.com/", icon: "📮" }, ,
            { name: "Remparts", url: "https://www.ribeauville-riquewihr.com/", icon: "🧱" }
        ],
        "leisure": [
            { name: "Sentier Viticole", url: "https://www.ribeauville-riquewihr.com/", icon: "🚶" },
            { name: "Noël Féérique", url: "https://www.ribeauville-riquewihr.com/", icon: "🎄" },
            { name: "Calèche", url: "https://www.ribeauville-riquewihr.com/", icon: "🐎" }
        ],
        "wine": [
            { name: "Dopff au Moulin", url: "https://www.dopff-au-moulin.fr/", icon: "🥂" },
            { name: "Hugel & Fils", url: "https://www.hugel.com/", icon: "🍷" },
            { name: "Zimmer", url: "https://www.riquewihr-zimmer.com/", icon: "🍾" }
        ]
    },
    "neuf-brisach": {
        "pratique": [
            { name: "OT Rhin-Brisach", url: "https://www.visitalsacerhinbrisach.com/", icon: "ℹ️" },
            { name: "Carte Interactive", url: "https://www.alsace-essentielle.fr/explorer-le-territoire/carte-interactive/", icon: "🗺️" },
            { name: "Agenda Neuf-Brisach", url: "https://www.visit.alsace/?s=Agenda+Neuf-Brisach", icon: "📅" }
        ],
        "insolite": [
            { name: "MAUSA Vauban (Street Art)", url: "https://mausa.fr/", icon: "🎨" },
            { name: "Remparts (UNESCO)", url: "https://www.visitalsacerhinbrisach.com/", icon: "🧱" },
            { name: "Place d'Armes", url: "https://www.neuf-brisach.fr/", icon: "⚔️" }
        ],
        "gastronomy": [
            { name: "Aux Deux Roses", url: "https://www.alsace2roses.com/", icon: "🥘" },
            { name: "Pâtisserie Birke", url: "https://www.visitalsacerhinbrisach.com/", icon: "🍰" },
            { name: "Restaurant La Fusion", url: "https://www.visitalsacerhinbrisach.com/", icon: "🥢" }
        ],
        "culture": [
            { name: "Musée Vauban", url: "https://www.neuf-brisach.fr/", icon: "📜" }, ,
            { name: "Visite Guidée Costumée", url: "https://www.visitalsacerhinbrisach.com/", icon: "🎭" },
            { name: "Église Saint-Louis", url: "https://www.visit.alsace/235006093-eglise-saint-louis/", icon: "⛪" }
        ],
        "leisure": [
            { name: "Vélo Piste Rhine", url: "https://www.alsaceavelo.fr/", icon: "🚲" },
            { name: "Marché du Terroir", url: "https://www.neuf-brisach.fr/", icon: "🥕" },
            { name: "Balade Remparts", url: "https://www.visitalsacerhinbrisach.com/", icon: "🚶" }
        ],
        "wine": [
            { name: "Le Lieu Dit-Vin", url: "https://www.visitalsacerhinbrisach.com/", icon: "🍷" },
            { name: "Aux Deux Roses", url: "https://www.alsace2roses.com/", icon: "🥘" },
            { name: "Le Café Vauban", url: "https://www.neuf-brisach.fr/", icon: "☕" }
        ]
    },
    "kaysersberg": {
        "pratique": [
            { name: "OT Vallée Kaysersberg", url: "https://www.kaysersberg.com/", icon: "ℹ️" },
            { name: "Carte Interactive", url: "https://www.alsace-essentielle.fr/explorer-le-territoire/carte-interactive/", icon: "🗺️" },
            { name: "Agenda Kaysersberg", url: "https://www.visit.alsace/?s=Agenda+Kaysersberg", icon: "📅" }
        ],
        "insolite": [
            { name: "Vignoble Schlossberg", url: "https://www.vinsalsace.com/fr/grands-crus/schlossberg/", icon: "🍇" },
            { name: "Château Schlossberg", url: "https://www.kaysersberg.com/", icon: "🏰" },
            { name: "Pont Fortifié", url: "https://www.kaysersberg.com/", icon: "🌉" }
        ],
        "gastronomy": [
            { name: "Le Chambard (2* Nasti)", url: "https://www.lechambard.fr/", icon: "⭐" },
            { name: "L'Alchémille (1*)", url: "https://www.lalchemille.fr/", icon: "🌿" },
            { name: "Vieille Forge", url: "https://www.vieilleforge-kb.com/", icon: "⚒️" }
        ],
        "culture": [
            { name: "Musée A. Schweitzer", url: "https://www.centreschweitzer.org/", icon: "🕊️" },
            { name: "Verrerie d'Art", url: "https://verrerie-kaysersberg.fr/", icon: "🏺" },
            { name: "Église Ste-Croix", url: "https://www.kaysersberg.com/", icon: "⛪" }
        ],
        "leisure": [
            { name: "Espace Nautique", url: "https://www.arc-en-ciel-kaysersberg.com/", icon: "🏊" },
            { name: "Rando Vignoble", url: "https://www.kaysersberg.com/bouger/balades-et-randonnees/", icon: "🍇" },
            { name: "Noël Authentique", url: "https://www.noel-a-kaysersberg.com/", icon: "🎄" }
        ],
        "wine": [
            { name: "Domaine Weinbach", url: "https://www.domaineweinbach.com/", icon: "🥂" },
            { name: "Paul Blanck", url: "https://www.blanck.com/", icon: "🍷" },
            { name: "Cave de Kientzheim", url: "https://www.cave-kientzheim-kaysersberg.com/", icon: "🍾" }
        ]
    },
    "eguisheim": {
        "pratique": [
            { name: "OT Eguisheim-Rouffach", url: "https://www.tourisme-eguisheim-rouffach.com/", icon: "ℹ️" },
            { name: "Carte Interactive", url: "https://www.alsace-essentielle.fr/explorer-le-territoire/carte-interactive/", icon: "🗺️" },
            { name: "Agenda Eguisheim", url: "https://www.visit.alsace/?s=Agenda+Eguisheim", icon: "📅" }
        ],
        "insolite": [
            { name: "Le Pigeonnier", url: "https://www.tourisme-eguisheim-rouffach.com/", icon: "📸" },
            { name: "Remparts (Ronde)", url: "https://www.tourisme-eguisheim-rouffach.com/fr/decouvrir/eguisheim-et-ses-incontournables.html", icon: "🏰" },
            { name: "Place St-Léon", url: "https://www.tourisme-eguisheim-rouffach.com/", icon: "⛲" }
        ],
        "gastronomy": [
            { name: "Au Vieux Porche (Bib)", url: "https://www.auvieuxporche.fr/", icon: "🍴" },
            { name: "Caveau d'Eguisheim", url: "https://www.caveau-d-eguisheim.com/", icon: "🍷" },
            { name: "Auberge des Trois Châteaux", url: "https://www.auberge-3-chateaux.com/", icon: "🏰" }
        ],
        "culture": [
            { name: "Village Préféré", url: "https://www.tourisme-eguisheim-rouffach.com/", icon: "🥇" },
            { name: "Château St-Léon", url: "https://www.tourisme-eguisheim-rouffach.com/", icon: "👑" },
            { name: "Chapelle St-Léon", url: "https://www.tourisme-eguisheim-rouffach.com/", icon: "⛪" }
        ],
        "leisure": [
            { name: "Petit Train", url: "https://www.train-eguisheim.fr/", icon: "🚂" },
            { name: "Parc à Cigognes", url: "https://www.tourisme-eguisheim-rouffach.com/", icon: "🦩" },
            { name: "Fête Vignerons (Août)", url: "https://www.tourisme-eguisheim-rouffach.com/", icon: "🎉" }
        ],
        "wine": [
            { name: "Wolfberger", url: "https://www.wolfberger.com/", icon: "🍾" },
            { name: "Emile Beyer", url: "https://www.emile-beyer.fr/", icon: "🍇" },
            { name: "Grand Cru Eichberg", url: "https://www.vinsalsace.com/", icon: "⛰️" }
        ]
    },
    "mulhouse": {
        "pratique": [
            { name: "Office de Tourisme", url: "https://www.tourisme-mulhouse.com/", icon: "ℹ️" },
            { name: "Carte Interactive", url: "https://www.alsace-essentielle.fr/explorer-le-territoire/carte-interactive/", icon: "🗺️" },
            { name: "Sortir à Mulhouse", url: "https://www.jds.fr/mulhouse", icon: "📅" }
        ],
        "insolite": [
            { name: "Le M.U.R (Street Art)", url: "https://www.tourisme-mulhouse.com/", icon: "🎨" },
            { name: "Belvédère Panoramique", url: "https://www.tourisme-mulhouse.com/", icon: "🔭" },
            { name: "Cité Ouvrière (UNESCO)", url: "https://www.tourisme-mulhouse.com/", icon: "🏘️" }
        ],
        "gastronomy": [
            { name: "Le 4 (Michelin)", url: "https://www.restaurant-le4.fr/", icon: "⭐" },
            { name: "Il Cortile (Michelin)", url: "https://www.ilcortile-mulhouse.fr/", icon: "🍝" },
            { name: "Zum Sauwadala", url: "https://www.zumsauwadala.com/", icon: "🥩" }
        ],
        "culture": [
            { name: "Cité de l'Automobile", url: "https://www.citedelautomobile.com/", icon: "🏎️" },
            { name: "Cité du Train", url: "https://www.citedutrain.com/", icon: "🚂" },
            { name: "Musée Etoffes", url: "https://www.musee-impression.com/", icon: "🧵" }
        ],
        "leisure": [
            { name: "Parc Zoologique", url: "https://www.zoo-mulhouse.com/", icon: "🦁" },
            { name: "Sorties (JDS)", url: "https://www.jds.fr/mulhouse", icon: "🎉" },
            { name: "Marché du Canal", url: "https://www.tourisme-mulhouse.com/", icon: "🛍️" }
        ],
        "wine": [
            { name: "Domaines qui Montent", url: "https://www.lesdomainesquimontent.com/mulhouse", icon: "🍷" },
            { name: "La Quille (Bar)", url: "https://www.laquille.fr/", icon: "🍾" },
            { name: "L'Etiquette", url: "https://www.letiquette-mulhouse.com/", icon: "🏷️" }
        ]
    },
    "selestat": {
        "pratique": [
            { name: "OT Sélestat HK", url: "https://www.selestat-haut-koenigsbourg.com/", icon: "ℹ️" },
            { name: "Carte Interactive", url: "https://www.alsace-essentielle.fr/explorer-le-territoire/carte-interactive/", icon: "🗺️" },
            { name: "Agenda Sélestat", url: "https://www.visit.alsace/?s=Agenda+Selestat", icon: "📅" }
        ],
        "insolite": [
            { name: "Bibliothèque Humaniste", url: "https://www.bibliotheque-humaniste.fr/", icon: "📚" },
            { name: "Château d'Eau", url: "https://www.selestat.fr/", icon: "⛲" },
            { name: "Sentier Pieds Nus", url: "https://www.senso-ried.com/", icon: "👣" }
        ],
        "gastronomy": [
            { name: "Les Humanistes (1*)", url: "https://www.les-humanistes.com/", icon: "⭐" },
            { name: "La Vieille Tour", url: "https://www.vieille-tour.fr/", icon: "🏰" },
            { name: "Wistub du Cerf", url: "https://www.visit.alsace/232001402-wistub-a-la-couronne/", icon: "🦌" }
        ],
        "culture": [
            { name: "Église St-Georges", url: "https://www.selestat.fr/", icon: "⛪" },
            { name: "Église Ste-Foy", url: "https://www.selestat.fr/", icon: "🕍" },
            { name: "Maison du Pain", url: "https://maisondupain.alsace/", icon: "🥖" }
        ],
        "leisure": [
            { name: "Illwald (Réserve)", url: "https://www.selestat.fr/se-divertir/nature-et-environnement/lillwald.html", icon: "🌿" },
            { name: "Canoë du Ried", url: "https://canoes-du-ried.com/", icon: "🛶" },
            { name: "Corso Fleuri (Août)", url: "https://www.selestat.fr/", icon: "🌸" }
        ],
        "wine": [
            { name: "VINUM (Caviste)", url: "https://vinum.pro/", icon: "🍷" },
            { name: "Ill Vino (Caviste)", url: "https://illvino.com/", icon: "🍾" },
            { name: "Larmes de Vin (Bar)", url: "https://www.selestat.fr/", icon: "🥂" }
        ]
    },
    "rust": {
        "leisure": [
            { name: "Europa-Park (Best Park)", url: "https://www.europapark.de/fr", icon: "🎢" },
            { name: "Rulantica (Water World)", url: "https://www.rulantica.de/fr", icon: "🌊" },
            { name: "Réserve Taubergiessen", url: "https://www.rust.de/", icon: "🌿" }
        ]
    },
    "bale": {
        "culture": [
            { name: "Basler Münster", url: "https://www.baslermuenster.ch/", icon: "⛪" },
            { name: "Kunstmuseum Basel", url: "https://kunstmuseumbasel.ch/fr", icon: "🎨" },
            { name: "Vieille Ville (Altstadt)", url: "https://www.basel.com/fr", icon: "🏙️" }
        ]
    },
    "freiburg": {
        "culture": [
            { name: "Freiburger Münster", url: "https://www.freiburgermuenster.info/", icon: "⛪" },
            { name: "Schlossberg (Vue)", url: "https://www.schlossberg-bahn.de/", icon: "🚠" },
            { name: "Les Bächle (Insolite)", url: "https://visit.freiburg.de/fr", icon: "💧" }
        ]
    },
    "baden-baden": {
        "leisure": [
            { name: "Thermes de Caracalla", url: "https://www.carasana.de/fr/", icon: "🧖" },
            { name: "Merkurbergbahn", url: "https://www.stadtwerke-baden-baden.de/", icon: "🚠" },
            { name: "Lichtentaler Allee", url: "https://www.baden-baden.com/fr", icon: "🌳" }
        ]
    },
    "gerardmer": {
        "nature": [
            { name: "Lac de Gérardmer", url: "https://gerardmer.net/", icon: "🛶" },
            { name: "Saut des Cuves", url: "https://gerardmer.net/", icon: "🌊" },
            { name: "Acro-Sphère (Aventure)", url: "https://www.acrosphere-vosges.fr/", icon: "🌲" }
        ]
    },
    "hunawihr": {
        "insolite": [
            { name: "NaturOparC (Cigognes)", url: "https://www.naturoparc.fr/", icon: "🦢" },
            { name: "Jardin des Papillons", url: "https://www.jardindespapillons.fr/", icon: "🦋" },
            { name: "Église Fortifiée", url: "https://www.visit.alsace/", icon: "⛪" }
        ],
        "wine": [
            { name: "Cave Vinicole", url: "https://www.cave-hunawihr.com/", icon: "🍷" },
            { name: "Domaines Viticoles", url: "https://www.visit.alsace/", icon: "🍇" },
            { name: "Route des Vins", url: "https://www.alsace-wine.com/", icon: "🥂" }
        ],
        "culture": [
            { name: "Village Médiéval", url: "https://www.visit.alsace/", icon: "🏘️" },
            { name: "Maisons à Colombages", url: "https://www.visit.alsace/", icon: "🏠" },
            { name: "Fontaine Renaissance", url: "https://www.visit.alsace/", icon: "⛲" }
        ]
    },
    "turckheim": {
        "insolite": [
            { name: "Veilleur de Nuit", url: "https://www.turckheim.com/", icon: "🕯️" },
            { name: "Portes Médiévales", url: "https://www.turckheim.com/", icon: "🚪" },
            { name: "Remparts (XIVe)", url: "https://www.turckheim.com/", icon: "🏰" }
        ],
        "gastronomy": [
            { name: "L'Autrefois", url: "https://www.visit.alsace/", icon: "🍴" },
            { name: "Stammtisch", url: "https://www.visit.alsace/", icon: "🥘" },
            { name: "Auberge du Veilleur", url: "https://www.visit.alsace/", icon: "🍷" }
        ],
        "wine": [
            { name: "Brand (Grand Cru)", url: "https://www.vinsalsace.com/", icon: "🍇" },
            { name: "Caves Viticoles", url: "https://www.turckheim.com/", icon: "🍾" },
            { name: "Dégustation Locale", url: "https://www.visit.alsace/", icon: "🥂" }
        ]
    },
    "bergheim": {
        "culture": [
            { name: "Remparts (XIVe)", url: "https://www.bergheim68.fr/", icon: "🏰" },
            { name: "Maison des Sorcières", url: "https://www.bergheim68.fr/", icon: "🧙" },
            { name: "Porte Haute", url: "https://www.bergheim68.fr/", icon: "🚪" }
        ],
        "wine": [
            { name: "Altenberg (Grand Cru)", url: "https://www.vinsalsace.com/", icon: "🍷" },
            { name: "Kanzlerberg (Grand Cru)", url: "https://www.vinsalsace.com/", icon: "🍇" },
            { name: "Marcel Deiss", url: "https://www.marceldeiss.com/", icon: "🍾" }
        ],
        "insolite": [
            { name: "Tilleul de 1300", url: "https://www.bergheim68.fr/", icon: "🌳" },
            { name: "Jardins Médiévaux", url: "https://www.bergheim68.fr/", icon: "🌿" },
            { name: "Mosaïques Romaines", url: "https://www.bergheim68.fr/", icon: "🗿" }
        ]
    },
    "illhaeusern": {
        "gastronomy": [
            { name: "Auberge de l'Ill (Haeberlin)", url: "https://www.auberge-de-l-ill.com/fr/", icon: "⭐" },
            { name: "Hôtel des Berges", url: "https://www.auberge-de-l-ill.com/fr/hotel-des-berges.html", icon: "🏨" },
            { name: "Restaurant à la Truite", url: "https://alatrota.fr/", icon: "🐟" }
        ],
        "leisure": [
            { name: "Balade en Barque", url: "https://www.bateliers-ried.com/", icon: "🛶" },
            { name: "Maison du Poisson", url: "https://www.illhaeusern.fr/", icon: "🐟" },
            { name: "Sentier de l'Ill", url: "https://www.visit.alsace/", icon: "🌿" }
        ]
    },
    "ammerschwihr": {
        "gastronomy": [
            { name: "Restaurant Julien Binz (1*)", url: "https://restaurantjulienbinz.com/", icon: "⭐" },
            { name: "Aux Armes de France", url: "https://auxarmesdefrance.com/", icon: "🍴" },
            { name: "Caveau de l'Ami Fritz", url: "https://www.tripadvisor.fr/Restaurant_Review-g666355-d3527443-Reviews-Caveau_de_l_Ami_Fritz-Ammerschwihr_Haut_Rhin_Grand_Est.html", icon: "🥘" }
        ],
        "leisure": [
            { name: "Golf Public", url: "https://golf-ammerschwihr.com/", icon: "⛳" },
            { name: "Grand Cru Kaefferkopf", url: "https://www.vinsalsace.com/", icon: "🍇" },
            { name: "Trois-Épis (Lieu-dit)", url: "https://www.trois-epis.fr/", icon: "🌲" }
        ],
        "wine": [
            { name: "Domaine Martin Schaetzel", url: "https://www.martin-schaetzel.com/", icon: "🍷" },
            { name: "Domaine Kuehn", url: "https://www.kuehn.fr/", icon: "🍾" }
        ]
    },
    "rorschwihr": {
        "wine": [
            { name: "Domaine Rolly Gassmann", url: "https://www.rollygassmann.com/", icon: "🍷" },
            { name: "Domaine Fernand Engel", url: "https://www.fernand-engel.fr/", icon: "organic" },
            { name: "Vins E. Boeckel", url: "https://www.boeckel.alsace/", icon: "🍾" }
        ],
        "leisure": [
            { name: "Sentier Viticole", url: "https://www.visit.alsace/", icon: "🍇" },
            { name: "Église Saint-Michel", url: "https://www.visit.alsace/", icon: "⛪" },
            { name: "Vue Panoramique", url: "https://www.visit.alsace/", icon: "👀" }
        ]
    },
    "soultzmatt": {
        "leisure": [
            { name: "Le Paradis des Sources", url: "https://www.leparadisdessources.com/", icon: "💃" },
            { name: "Sources de Soultzmatt", url: "https://www.lisbeth.fr/", icon: "💧" },
            { name: "Sentier du Zinnkoepflé", url: "https://www.visit.alsace/", icon: "🌿" }
        ],
        "wine": [
            { name: "Grand Cru Zinnkoepflé", url: "https://www.vinsalsace.com/", icon: "🍇" },
            { name: "Domaine Léon Boesch", url: "https://www.domaineboesch.fr/", icon: "🍷" },
            { name: "Klein & Fils", url: "https://www.klein-fils.com/", icon: "🍾" }
        ],
        "gastronomy": [
            { name: "A la Demi-Lune", url: "https://www.tripadvisor.fr/Restaurant_Review-g196657-d2326162-Reviews-Restaurant_a_la_Demi_Lune-Soultzmatt_Haut_Rhin_Grand_Est.html", icon: "🥘" },
            { name: "Le Klein (Winstub)", url: "https://www.klein-fils.com/", icon: "🍴" }
        ]
    },
    "voegtlinshoffen": {
        "wine": [
            { name: "Maison Cattin (Belvédère)", url: "https://www.cattin.fr/", icon: "🍷" },
            { name: "Domaine Gérard Marghieri", url: "https://www.vins-marghieri.com/", icon: "🍇" },
            { name: "Caves du Village", url: "https://www.visit.alsace/", icon: "🍾" }
        ],
        "leisure": [
            { name: "Sentier Panoramique", url: "https://www.visit.alsace/", icon: "👀" },
            { name: "Église Saint-Nicolas", url: "https://www.visit.alsace/", icon: "⛪" },
            { name: "Forêt Communale", url: "https://www.visit.alsace/", icon: "🌲" }
        ]
    },
    "kintzheim": {
        "leisure": [
            { name: "Volerie des Aigles", url: "https://www.voleriedesaigles.com/", icon: "🦅" },
            { name: "Montagne des Singes", url: "https://www.montagnedessinges.com/", icon: "🐒" },
            { name: "Château de Kintzheim", url: "https://www.route-chateaux-alsace.com/", icon: "🏰" }
        ],
        "wine": [
            { name: "Cave de Kintzheim", url: "https://www.cave-kintzheim.com/", icon: "🍷" }
        ]
    },
    "saint-hippolyte": {
        "wine": [
            { name: "Rouge de Saint-Hippolyte", url: "https://www.vinsalsace.com/", icon: "🍷" },
            { name: "Domaine Muller-Koeberle", url: "https://www.muller-koeberle.fr/", icon: "🍇" },
            { name: "Marcel Deiss (Bergheim)", url: "https://www.marceldeiss.com/", icon: "⭐" }
        ],
        "leisure": [
            { name: "Château Haut-Koenigsbourg", url: "https://www.haut-koenigsbourg.fr/", icon: "🏰" },
            { name: "Sentier des Vins", url: "https://www.visit.alsace/", icon: "🌿" }
        ]
    },
    "guebwiller": {
        "wine": [
            { name: "Domaines Schlumberger", url: "https://www.domaines-schlumberger.com/", icon: "🍷" }, // Grand Cru Kitterlé
            { name: "Vignoble en Terrasses", url: "https://www.tourisme-guebwiller.fr/", icon: "🍇" }
        ],
        "culture": [
            { name: "Les Dominicains", url: "https://www.les-dominicains.com/", icon: "🎶" },
            { name: "Église Notre-Dame", url: "https://www.tourisme-guebwiller.fr/", icon: "⛪" },
            { name: "Musée Théodore Deck", url: "https://www.ville-guebwiller.fr/culture/musee-theodore-deck/", icon: "⚱️" }
        ]
    },
    "thann": {
        "wine": [
            { name: "Vignoble du Rangen", url: "https://www.vinsalsace.com/fr/grands-crus/rangen/", icon: "⛰️" }, // Plus pentu d'Alsace
            { name: "Zind-Humbrecht", url: "https://www.zindhumbrecht.fr/", icon: "🍷" }
        ],
        "culture": [
            { name: "Collégiale Saint-Thiébaut", url: "https://www.ville-thann.fr/", icon: "⛪" },
            { name: "Oeil de la Sorcière", url: "https://www.tourisme-thann-cernay.fr/", icon: "🏰" }, // Ruines Engelbourg
            { name: "Cabane des Bangards", url: "https://www.tourisme-thann-cernay.fr/", icon: "🏚️" }
        ]
    }
};


// --- INTELLIGENT LOCATION RESOLVER ---
// Shared logic for both Suggestions and GPS Calculation to handle Aliases & Deep Search
function resolveLocation(inputName) {
    if (!inputName) return null;

    let cleanDest = inputName.toLowerCase().trim()
        .replace(/œ/g, "oe")
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        .replace(/-/g, " ").replace(/'/g, " ");

    const aliases = {
        "baltzenheim": "neuf-brisach",
        "artzenheim": "neuf-brisach",
        "kunheim": "neuf-brisach",
        "biesheim": "neuf-brisach",
        "marckolsheim": "neuf-brisach",
        "gare de colmar": "colmar",
        "aerodrome de colmar": "colmar",
        "gare de selestat": "selestat",
        "haut konigsbourg": "haut_koenigsbourg",
        "haut koenigsbourg": "haut_koenigsbourg",
        "chateau du haut koenigsbourg": "haut_koenigsbourg",
        "chateau du haut konigsbourg": "haut_koenigsbourg",
        "koenigsbourg": "haut_koenigsbourg",
        "kintzheim": "kintzheim",
        "gare de strasbourg": "strasbourg",
        "aeroport strasbourg": "strasbourg",
        "obernai": "strasbourg",
        "mont sainte odile": "strasbourg",
        "ungersheim": "mulhouse",
        "vœgtlinshoffen": "voegtlinshoffen",
        "voegtlinshoffen": "voegtlinshoffen"
    };

    // 1. Check Alias
    for (const [key, target] of Object.entries(aliases)) {
        if (cleanDest.includes(key)) {
            return target;
        }
    }

    // 2. Direct Match (Fuzzy) in POI Keys
    for (const key of Object.keys(POI_DATA)) {
        const normalizedKey = key.replace(/-/g, " ");
        if (cleanDest.includes(normalizedKey)) return key;
        if (cleanDest.length > 4 && normalizedKey.includes(cleanDest)) return key;
    }

    // 3. Deep Content Search (Smart Token Match)
    // Allows "Cave Cattin" to match "Maison Cattin" by ignoring stopwords and matching key tokens.
    if (cleanDest.length > 2) {
        // Stopwords to ignore (french context)
        const STOPWORDS = ["le", "la", "les", "l", "d", "de", "du", "des", "a", "au", "aux", "et", "en", "cave", "domaine", "maison", "restaurant", "auberge", "hotel", "rue", "place", "saint", "sainte", "chez", "vins"];

        // Tokenize input: Split by space, filter out small words and stopwords
        const inputTokens = cleanDest.split(' ')
            .filter(t => t.length > 2 && !STOPWORDS.includes(t));

        if (inputTokens.length > 0) {
            for (const [cityKey, cityData] of Object.entries(POI_DATA)) {
                for (const category of Object.values(cityData)) {
                    if (Array.isArray(category)) {
                        const found = category.some(item => {
                            const normName = item.name.toLowerCase()
                                .normalize("NFD").replace(/[\u0300-\u036f]/g, "");

                            // Check if ALL significant tokens from input are present in the POI name
                            // e.g. Input "Cattin" (filtered) is in "Maison Cattin" -> TRUE
                            // e.g. Input "Binz" is in "Restaurant Julien Binz" -> TRUE
                            return inputTokens.every(token => normName.includes(token));
                        });

                        if (found) {
                            console.log(`Resolver (Token): "${inputName}" matched POI in ${cityKey}`);
                            return cityKey;
                        }
                    }
                }
            }
        }
    }

    // No match found - return cleaned input or null to indicate "Unknown"
    // We return the cleaned input to be used as fallback key
    return cleanDest;
}


function suggestPOIs(destination, tripDate = null, distKm = null) {
    const suggestionsDiv = document.getElementById('sim-suggestions');
    if (!suggestionsDiv) return;

    // Reset
    suggestionsDiv.innerHTML = '';
    suggestionsDiv.classList.add('hidden');

    // INTELLIGENT RESOLUTION
    // This now handles Clean, Alias, Reverse Match, and Deep Search all in one.
    // However, suggestPOIs logic also had a "Fallback" mode for unknown cities.
    // Let's adapt.

    let matchedKey = null;
    let resolved = resolveLocation(destination);

    // Verify if resolved exists in POI_DATA
    if (resolved && POI_DATA[resolved]) {
        matchedKey = resolved;
    } else {
        // Fallback or cleaned string
        // We use the cleaned string from resolver if not a key
        // Wait, resolveLocation returns the KEY if found, or cleaned string.
        // So we just check if it's a key.
    }

    // Kept for variable name compatibility with existing code below
    let cleanDest = resolved;

    // Format Date for URL
    let formattedDate = "";
    if (tripDate) {
        formattedDate = tripDate;
    }

    // FALLBACK: If no match, generate DYNAMIC cards for the requested destination
    let dynamicData = null;

    if (!matchedKey) {
        // Create a DYNAMIC entry for the unknown city
        // Use user input (or cleaned) as key
        matchedKey = cleanDest;
        let isFallback = true;
        console.log(`No specific POI match found. Generating Dynamic Data for: ${cleanDest}`);

        const searchCity = cleanDest.charAt(0).toUpperCase() + cleanDest.slice(1);
        const safeSearch = encodeURIComponent(searchCity);
        const wikiCity = searchCity.replace(/ /g, '_'); // Wikipedia format

        // SMART MULTI-SOURCE STRATEGY (Best of Internet Compatible)
        // With Date Integration
        // SMART MULTI-SOURCE STRATEGY (STRICT: Visit Alsace / Alsace Essentielle ONLY)
        const agendaLink = tripDate
            ? `https://www.visit.alsace/?s=Agenda+${safeSearch}+${tripDate}`
            : `https://www.visit.alsace/?s=Agenda+${safeSearch}`;

        dynamicData = {
            "pratique": [
                { name: `Mairie / OT`, url: `https://www.visit.alsace/?s=Office+Tourisme+${safeSearch}`, icon: "ℹ️" },
                { name: `Carte Interactive`, url: "https://www.alsace-essentielle.fr/explorer-le-territoire/carte-interactive/", icon: "🗺️" },
                { name: `Sorties du Jour`, url: agendaLink, icon: "📅" }
            ],
            "insolite": [
                { name: `Curiosités à ${searchCity}`, url: `https://www.visit.alsace/?s=Lieu+Insolite+${safeSearch}`, icon: "📍" },
                { name: `Pépites Cachées`, url: `https://www.visit.alsace/?s=Patrimoine+${safeSearch}`, icon: "💎" },
                { name: `Visite ${searchCity}`, url: `https://www.visit.alsace/?s=Visite+${safeSearch}`, icon: "📸" }
            ],
            "gastronomy": [
                { name: `Restaurants Terroir`, url: `https://www.visit.alsace/?s=Restaurant+Terroir+${safeSearch}`, icon: "🍴" },
                { name: `Spécialités`, url: `https://www.visit.alsace/?s=Specialite+Alsacienne+${safeSearch}`, icon: "🥨" },
                { name: `Winstub`, url: `https://www.visit.alsace/?s=Winstub+${safeSearch}`, icon: "🥘" }
            ]
        };
        // REGIONAL WHITELIST: Allow dynamic suggestions for destinations within 200km zone
        // If distKm is provided by simulator (Satellite or Estimates), use it directly.
        // Otherwise, fallback to pattern matching.

        const regionalPatterns = [
            // Alsace (Haut-Rhin, Bas-Rhin)
            'alsace', 'haut rhin', 'bas rhin', 'sundgau', 'ried', 'vosges',
            // Common Alsace suffixes
            'heim', 'wihr', 'willer', 'bach', 'burg', 'dorf', 'hoffen', 'matt', 'thal', 'stetten', 'house',
            // Major Alsace towns (without typical suffixes)
            'obernai', 'barr', 'molsheim', 'rosheim', 'andlau', 'dambach',
            'guebwiller', 'thann', 'cernay', 'masevaux', 'saint louis', 'altkirch',
            // Bade-Wurtemberg proche (< 100km)
            'freiburg', 'breisach', 'emmendingen', 'lahr', 'offenburg', 'schwarzwald',
            // Vosges
            'gerardmer', 'la bresse', 'munster', 'thann', 'cernay',
            // Nord Suisse
            'basel', 'bale', 'liestal', 'rheinfelden'
        ];

        let isRegional = regionalPatterns.some(pattern => cleanDest.includes(pattern));

        // DISTANCE OVERRIDE (The Fix for "Soultzmatt" and others)
        if (distKm !== null && distKm <= 200) {
            console.log(`Distance Check Passed: ${distKm}km <= 200km. Forcing Regional Mode.`);
            isRegional = true;
        }

        if (!isRegional) {
            // Destination is outside regional zone (likely > 200km) - block it
            console.log(`Destination "${cleanDest}" outside 200km zone - no suggestions`);
            return;
        }

        // Generate dynamic suggestions for regional destination
        console.log(`Generating dynamic suggestions for regional destination: ${cleanDest}`);
    }

    // Determine Source Data
    const categories = POI_DATA[matchedKey];

    if (categories) {
        const catLabels = {
            "insolite": "🕵️ LIEUX INSOLITES",
            "gastronomy": "🍴 GASTRONOMIE & TERROIR",
            "culture": "🏛️ CULTURE & MUSÉES",
            "leisure": "🎡 LOISIRS & PARCS",
            "wine": "🍷 DÉGUSTATION & CAVES"
        };

        // Title: Use matchedKey (which is now either the valid key OR the user input in dynamic mode)
        const displayCity = matchedKey.charAt(0).toUpperCase() + matchedKey.slice(1);
        const titleText = `TOP 3 : DÉCOUVERTE À ${displayCity.toUpperCase()}`;

        let htmlContent = `<div class="font-future text-center text-neon-blue text-xl mb-6 tracking-[0.2em] border-b border-neon-blue/30 pb-2">${titleText}</div>`;

        // 1. PRATIQUE / OFFICIEL (REMOVED as per user request to focus on discovery links only)
        /*
        if (categories.pratique && categories.pratique.length > 0) {
            htmlContent += `
            <div class="flex flex-wrap gap-3 justify-center mb-6">
                 ${categories.pratique.map(item => {
                let finalUrl = item.url;
                // DYNAMIC DATE INJECTION & BLOCKING LOGIC
                const BLOCKED_DOMAINS = ['visitstrasbourg.fr', 'ribeauville-riquewihr.com', 'selestat-haut-koenigsbourg.com', 'cadeauxbarriere.com'];
                let isBlocked = BLOCKED_DOMAINS.some(d => finalUrl.includes(d));
 
                if (tripDate && (item.name.includes("Agenda") || item.name.includes("Sortir") || item.name.includes("Jour"))) {
                    if (finalUrl.includes('visit.alsace/?s=')) {
                        finalUrl = `${finalUrl}+${tripDate}`;
                    }
                }
                return `
                    <button onclick="openExternalOverlay('${finalUrl}', '${item.name.replace(/'/g, "\\'")}', null, 0, ${isBlocked})" 
                            class="px-4 py-2 bg-neon-green/10 border border-neon-green/50 hover:bg-neon-green/30 text-neon-green rounded font-bold transition-all flex items-center gap-2 shadow-[0_0_10px_rgba(184,255,0,0.2)]">
                        <span class="text-xl">${item.icon}</span> ${item.name}
                    </button>
                 `}).join('')}
            </div>`;
        }
        */

        htmlContent += `<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">`;

        let globalQueue = [];

        for (const [catKey, items] of Object.entries(categories)) {
            if (catKey === 'pratique') continue;
            if (!items || items.length === 0) continue;

            const displayLabel = catLabels[catKey] || catKey.toUpperCase();
            const topItems = items.slice(0, 3);

            // Add to Global Queue for flattened navigation if desired, 
            // OR keep per-category. The user said "navigate among links".
            // Let's create a per-category queue for logical grouping? 
            // Or a MEGA queue of all suggestions?
            // "Top 3b" implies the whole set. Let's do a flattened queue of everything shown?
            // The display is grouped.
            // Let's stick to per-category queue for now to keep context? 
            // No, the user sees a grid of cards. Often user wants to browse ALL.
            // Let's create `globalQueue` accumulation.

            topItems.forEach(poi => {
                globalQueue.push({
                    url: poi.url,
                    title: poi.name,
                    name: poi.name,
                    category: displayLabel
                });
            });
        }

        // Second Pass: Render with correct Global Index
        let renderIndex = 0;
        for (const [catKey, items] of Object.entries(categories)) {
            if (catKey === 'pratique') continue;
            if (!items || items.length === 0) continue;

            const displayLabel = catLabels[catKey] || catKey.toUpperCase();
            const topItems = items.slice(0, 3);


            htmlContent += `
                <div class="space-y-3 bg-white/5 p-3 rounded-lg border border-white/5 transition-all">
                    <h5 class="text-neon-green font-future text-xs border-l-2 border-neon-green pl-2 mb-2">${displayLabel}</h5>
                    <div class="space-y-2">
                        ${topItems.map((poi) => {
                // Store current index for this specific item
                const currentIndex = renderIndex++;

                // INJECT DESTINATION INTO VISIT.ALSACE URLs
                let finalUrl = poi.url;
                let isSafeDomain = finalUrl.includes('visit.alsace') || finalUrl.includes('alsace-essentielle');

                if (isSafeDomain) {
                    // If URL is generic (no search param), add destination
                    if (!finalUrl.includes('?s=')) {
                        // Generic visit.alsace URL -> add search with destination
                        const cityName = matchedKey.charAt(0).toUpperCase() + matchedKey.slice(1);
                        finalUrl = `https://www.visit.alsace/?s=${encodeURIComponent(cityName)}`;
                    }
                    // If URL already has search, it's from dynamic data and already contains destination
                }

                if (isSafeDomain) {
                    return `
                                    <div class="bg-black/40 p-2 rounded flex flex-col gap-1 group transition-all cursor-pointer hover:bg-white/10 hover:border hover:border-neon-blue/30 relative overflow-hidden border border-transparent">
                                        <div class="absolute inset-0 bg-neon-blue/5 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300"></div>
                                        <div class="flex items-center gap-2 relative z-10 w-full">
                                            <span class="text-lg opacity-80">${poi.icon}</span>
                                            <span class="text-[10px] text-gray-300 font-mono truncate relative z-10 group-hover:text-neon-blue transition-colors font-bold flex-1" onclick="window.currentOverlayQueue = ${JSON.stringify(globalQueue).replace(/"/g, "&quot;")}; openExternalOverlay('${finalUrl}', '${poi.name.replace(/'/g, "\\'")}', window.currentOverlayQueue, ${currentIndex})">${poi.name}</span>
                                            
                                            <button onclick="addStopover('${poi.name.replace(/'/g, "\\'")}')" class="text-[10px] text-neon-green/80 hover:text-white px-1 border border-neon-green/30 rounded" title="Ajouter comme étape">➕</button>
                                            
                                            <span class="text-[8px] text-white/30 tracking-widest relative z-10 group-hover:text-white/80 cursor-pointer" onclick="window.currentOverlayQueue = ${JSON.stringify(globalQueue).replace(/"/g, "&quot;")}; openExternalOverlay('${finalUrl}', '${poi.name.replace(/'/g, "\\'")}', window.currentOverlayQueue, ${currentIndex})">OUVRIR ></span>
                                        </div>
                                        <div class="text-[8px] text-neon-green/60 font-mono truncate pl-7 relative z-10 select-all group-hover:text-neon-green">${finalUrl.replace('https://', '').replace('www.', '').split('/')[0]}</div>
                                    </div>`;
                } else {
                    return `
                                    <div class="bg-black/40 p-2 rounded flex flex-col gap-1 group transition-all relative overflow-hidden border border-transparent hover:border-white/5">
                                        <div class="absolute inset-0 bg-neon-blue/5 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300"></div>
                                        <div class="flex items-center gap-2 relative z-10">
                                            <span class="text-lg opacity-80">${poi.icon}</span>
                                            <span class="text-[10px] text-gray-300 font-mono truncate font-bold group-hover:text-neon-blue transition-colors">${poi.name}</span>
                                        </div>
                                        <div class="text-[8px] text-neon-green/60 font-mono truncate pl-7 relative z-10 select-all">${poi.url.replace('https://', '').replace('www.', '').split('/')[0]}</div>
                                    </div>`;
                }
            }).join('')}
                    </div>
                </div>
            `;
        }

        htmlContent += `</div>`;

        suggestionsDiv.innerHTML = htmlContent;
        suggestionsDiv.classList.remove('hidden');
    }
}

// GLOBAL COORDINATE CACHE (To ensure 100% calculation accuracy)
const COORD_CACHE = {};

function initPricing() {
    const departureInput = document.getElementById('sim-departure');
    const destinationInput = document.getElementById('sim-destination');
    const calcBtn = document.getElementById('btn-calculate');

    if (!departureInput || !destinationInput || !calcBtn) return;

    populateDataList();
    initRealTimeCoach(); // <--- NEW: Real-time monitoring
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
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(cleanQuery)}&limit=1&addressdetails=1`;
        const resp = await fetch(url);
        const data = await resp.json();
        if (data && data.length > 0) {
            // Smart Formatter: "6 Rue..." instad of just "6"
            const parts = data[0].display_name.split(',');
            let prettyName = parts[0];
            if (parts.length > 1 && parts[0].length < 5) { // If seemingly just a number
                prettyName = parts[0] + ' ' + parts[1];
            }

            return {
                lat: parseFloat(data[0].lat),
                lon: parseFloat(data[0].lon),
                display_name: data[0].display_name,
                pretty_name: prettyName, // <--- NEW: Ready to use short name
                address: data[0].address,
                type: data[0].addresstype || data[0].class
            };
        }
    } catch (e) {
        console.error("Geocoding Error", e);
    }
    return null;
}

// 2. Routing (Lat/Lon -> Real Road Dist) via OSRM
// 2-POINT ROUTING
async function getRoadDistance(startCoords, endCoords) {
    try {
        // OSRM Public Server (Demo)
        const url = `https://router.project-osrm.org/route/v1/driving/${startCoords.lon},${startCoords.lat};${endCoords.lon},${endCoords.lat}?overview=false`;
        const resp = await fetch(url);
        const data = await resp.json();

        if (data && data.code === 'Ok' && data.routes && data.routes.length > 0) {
            const distMeters = data.routes[0].distance;
            const durationSeconds = data.routes[0].duration;
            return {
                distKm: Math.ceil(distMeters / 1000), // Ceil for profitability
                durationMin: Math.round(durationSeconds / 60)
            };
        } else {
            console.warn("OSRM Response Not OK:", data);
        }
    } catch (e) {
        console.error("Routing Error (OSRM)", e);
    }
    return null;
}

// 3-POINT ROUTING (Start -> Step -> End)
async function getRoadDistanceWithStep(startCoords, stepCoords, endCoords) {
    try {
        const url = `https://router.project-osrm.org/route/v1/driving/${startCoords.lon},${startCoords.lat};${stepCoords.lon},${stepCoords.lat};${endCoords.lon},${endCoords.lat}?overview=false`;
        const resp = await fetch(url);
        const data = await resp.json();

        if (data && data.code === 'Ok' && data.routes && data.routes.length > 0) {
            const distMeters = data.routes[0].distance;
            const durationSeconds = data.routes[0].duration;
            // 3-Point Route
            return {
                distKm: Math.ceil(distMeters / 1000), // Ceil for profitability
                durationMin: Math.round(durationSeconds / 60)
            };
        }
    } catch (e) {
        console.error("Routing Error (3-Point)", e);
    }
    return null;
}

// UI HELPERS FOR STOPOVER
function addStopover(name) {
    const divStopover = document.getElementById('div-stopover');
    const inputStopover = document.getElementById('sim-stopover');

    if (divStopover && inputStopover) {
        divStopover.classList.remove('hidden');
        inputStopover.value = name;
        // Trigger calculation
        calculateTrajectory();

        // Scroll to simulator
        document.getElementById('simulator').scrollIntoView({ behavior: 'smooth' });
    }
}

function removeStopover() {
    const divStopover = document.getElementById('div-stopover');
    const inputStopover = document.getElementById('sim-stopover');

    if (divStopover && inputStopover) {
        divStopover.classList.add('hidden');
        inputStopover.value = "";
        calculateTrajectory();
    }
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

    try {
        let startLoc = departureInput.value.trim();
        let endLoc = destinationInput.value.trim();

        // INTELLIGENT RESOLUTION STRATEGY
        // 1. Try Direct POI/Alias Resolution first (for short names like "Cattin")
        let resolvedStart = resolveLocation(startLoc);
        let resolvedEnd = resolveLocation(endLoc);

        // 2. But if the USER typed a LONG specific address (e.g. "6 Rue Marceau..."), logic should NOT force the city center.
        // We only apply the resolved city if the input looks "Short/Generic" OR if we fail to find the specific address later.

        // Helper: Is input complex? (Contains numbers, commas, street types)
        const isComplexAddress = (str) => /\d/.test(str) || str.includes('Rue') || str.includes('Avenue') || str.includes(',');

        let finalStart = startLoc;
        let finalEnd = endLoc;

        if (resolvedStart && POI_DATA[resolvedStart] && !isComplexAddress(startLoc)) {
            finalStart = resolvedStart.charAt(0).toUpperCase() + resolvedStart.slice(1);
        }
        if (resolvedEnd && POI_DATA[resolvedEnd] && !isComplexAddress(endLoc)) {
            // Only optimize to City Center if input wasn't already a specific address
            finalEnd = resolvedEnd.charAt(0).toUpperCase() + resolvedEnd.slice(1);
            console.log(`GPS: Optimizing destination "${destinationInput.value}" -> "${finalEnd}"`);
        }

        if (finalStart === "" || finalEnd === "") return;

        // Force France Context for Departure if generic
        if (!finalStart.toLowerCase().includes('france') && !finalStart.toLowerCase().includes('germany') && !finalStart.toLowerCase().includes('suisse')) {
            finalStart += ", France";
        }

        // Force France Context for Destination if generic (FIX: Avoids Colmar -> Colmars 04 error)
        if (!finalEnd.toLowerCase().includes('france') && !finalEnd.toLowerCase().includes('germany') && !finalEnd.toLowerCase().includes('suisse')) {
            finalEnd += ", France";
        }

        // INTELLIGENT ZIP CODE INJECTION (Fix for "4 Eguisheim" -> "4 Eguisheim, 68420, France")
        // If we resolved a key (e.g. 'eguisheim') and we have data for it, let's look up its ZIP.
        let zipTarget = resolvedEnd || resolveLocation(endLoc); // Try resolve again just in case

        if (zipTarget) {
            let foundZip = null;
            // 1. Try direct POI lookup first if exists (some POIs might have custom zips later?)

            // 2. Look in LOCATIONS structure
            for (const category of Object.values(LOCATIONS)) {
                const loc = category.find(l => l.id === zipTarget || l.name.toLowerCase() === zipTarget);
                if (loc && loc.zip) {
                    foundZip = loc.zip;
                    break;
                }
            }

            if (foundZip) {
                // If input doesn't already have the zip, append it.
                if (!finalEnd.includes(foundZip)) {
                    // Insert ZIP before Country if possible, or just append
                    // "Colmar, France" -> "Colmar, 68000, France" is better for Nominatim
                    if (finalEnd.includes(", France")) {
                        finalEnd = finalEnd.replace(", France", `, ${foundZip}, France`);
                    } else {
                        finalEnd += `, ${foundZip}`;
                    }
                    console.log(`GPS: Injected Zip Code -> "${finalEnd}"`);
                }
            }
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

        // 1. Get Coordinates
        // STRATEGY: Check CACHE -> Then API
        let startCoords = COORD_CACHE[finalStart.toLowerCase()];
        if (!startCoords) startCoords = await getCoordinates(finalStart);

        let endCoords = COORD_CACHE[finalEnd.toLowerCase()];
        if (!endCoords) endCoords = await getCoordinates(finalEnd);

        // --- ERROR HANDLING (Invalid Address) ---
        if (!startCoords || !endCoords) {
            const msg = !startCoords ? "Adresse de départ introuvable." : "Destination introuvable.";
            if (detailDisplay) {
                detailDisplay.innerHTML = `
                <div class="text-neon-red font-bold animate-pulse">⚠️ ${msg.toUpperCase()}</div>
                <div class="text-xs text-slate-300 mt-1">Vérifiez l'orthographe ou ajoutez le code postal.</div>
            `;
            }
            if (outputScreen) outputScreen.classList.remove('hidden'); // Show error on screen
            speak(`${msg} Veuillez vérifier l'orthographe pour que je puisse calculer le trajet.`);
            return; // STOP execution
        }

        // --- SMART VOCAL COACH & PRECISION FEEDBACK ---
        // Analyze precision of the found location (City center vs Exact Address)

        const analyzePrecision = (coords, type) => {
            // Types that are "General" (City center)
            const generalTypes = ['city', 'town', 'village', 'municipality', 'administrative'];
            // Types that are "Specific"
            const specificTypes = ['building', 'house', 'amenity', 'shop', 'tourism', 'leisure'];

            let precision = 'high'; // default
            if (generalTypes.includes(coords.type)) precision = 'low'; // It's just a city/village
            else if (['road', 'residential', 'secondary', 'tertiary', 'primary', 'living_street', 'unclassified', 'track', 'pedestrian'].includes(coords.type)) precision = 'medium'; // It's a street key

            return precision;
        };

        const destPrecision = analyzePrecision(endCoords);

        // VISUAL FEEDBACK (Show what was actually found)
        if (detailDisplay) {
            let qualityColor = 'text-neon-green'; // High
            let qualityText = 'PRÉCISION OPTIMALE';

            if (destPrecision === 'medium') {
                qualityColor = 'text-yellow-400';
                qualityText = 'RUE IDENTIFIÉE';
            } else if (destPrecision === 'low') {
                qualityColor = 'text-orange-400';
                qualityText = 'CENTRE-VILLE (ESTIMATION)';
            }

            // Show the resolved name to the user
            // e.g. "Strasbourg, Grand Est, France"
            const displayName = endCoords.pretty_name || endCoords.display_name.split(',').slice(0, 2).join(',');

            detailDisplay.innerHTML = `
            <div class="flex flex-col gap-2 p-2 border border-white/10 rounded bg-black/40">
                <div class="${qualityColor} font-bold text-xs tracking-widest border-b border-white/10 pb-1 mb-1">
                     🎯 ${qualityText}
                </div>
                <div class="text-sm text-gray-300">
                    Départ: <span class="text-white">${startCoords.pretty_name || startCoords.display_name.split(',')[0]}</span>
                </div>
                <div class="text-sm text-gray-300">
                    Arrivée: <span class="text-white">${displayName}</span>
                </div>
                ${destPrecision === 'low' ?
                    `<div class="text-[10px] text-neon-blue mt-1 animate-pulse">ℹ️ Astuce: Ajoutez un numéro de rue pour plus de précision.</div>`
                    : ''}
            </div>
            <div class="animate-pulse text-neon-blue mt-2">CALCUL DU TRAJET...</div>
        `;
        }

        // KITT SCANNER SOUND & VISUALS
        playSound('audio-scanner');
        playSound('audio-processing', true);

        // VOCAL FEEDBACK (The Coach)
        // Only speak the "Coach" advice if it's low precision, OR if it's high precision confirming it.
        // Don't be too chatty if everything is standard, unless we want the "Premium" feel.
        // User requested "Coach vocal et visuel" -> So yes, we speak.

        let coachMsg = "";
        if (destPrecision === 'low') {
            coachMsg = `Ville identifiée : ${endLoc.split(',')[0]}. Je calcule la route vers le centre. Pour une précision chirurgicale, ajoutez une adresse exacte.`;
        } else if (destPrecision === 'medium') {
            coachMsg = `Rue identifiée. J'affine le calcul vers cette zone.`;
        } else {
            // High precision - usually standard KITT behavior covers the summary.
            // But we can add a small confirmation.
            // coachMsg = "Adresse précise confirmée."; // Optional, maybe too repetitive? 
            // Let's keep it silent if perfect, or just "Adresse confirmée."
            // User wants "Fluide". Silent is most fluid if perfect.
            // But let's add a very short confirmation.
            // coachMsg = "Destination précise confirmée.";
        }

        if (coachMsg) {
            speak(coachMsg);
        }




        if (startCoords && endCoords) {
            // CHECK FOR STOPOVER
            const stopoverInput = document.getElementById('sim-stopover');
            let stopoverCoords = null;
            if (stopoverInput && !stopoverInput.parentElement.classList.contains('hidden') && stopoverInput.value.trim() !== "") {
                stopoverCoords = await getCoordinates(stopoverInput.value.trim());
                console.log("GPS: Step detected ->", stopoverCoords);
            }

            // Attempt OSRM
            let routeData = null;
            if (stopoverCoords) {
                // 3-Point Route
                routeData = await getRoadDistanceWithStep(startCoords, stopoverCoords, endCoords);
            } else {
                // Classic 2-Point Route
                routeData = await getRoadDistance(startCoords, endCoords);
            }

            if (routeData) {
                tripDist = routeData.distKm;
                duration = routeData.durationMin;
                isSuccess = true;
            } else {
                // FALLBACK: Haversine
                console.warn("Routing Failed - Using Haversine Fallback");
                const R = 6371; // Earth Mean Radius in km
                const dLat = (endCoords.lat - startCoords.lat) * Math.PI / 180;
                const dLon = (endCoords.lon - startCoords.lon) * Math.PI / 180;
                const a =
                    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                    Math.cos(startCoords.lat * Math.PI / 180) * Math.cos(endCoords.lat * Math.PI / 180) *
                    Math.sin(dLon / 2) * Math.sin(dLon / 2);
                const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

                tripDist = Math.round((R * c) * 1.3); // +30% for road approximation
                duration = Math.round(tripDist * 1.2); // ~50km/h avg speed
                isSuccess = true;

                if (detailDisplay) {
                    // Append warning, don't overwrite address display
                    const oldHTML = detailDisplay.innerHTML;
                    detailDisplay.innerHTML = oldHTML + `<div class="text-[10px] text-neon-blue mt-2 animate-pulse">⚠️ ROUTAGE SATELLITE HORS LIGNE. ESTIMATION VOL D'OISEAU.</div>`;
                }
            }
        }

        // Fallback if APIs fail (e.g. rate limit): Use Heuristic
        if (!isSuccess) {
            console.warn("API Fail - Using Fallback");

            // Helper: Find known location in string (Fuzzy Match with Normalization)
            const normalizeStr = (str) => {
                return str.toLowerCase()
                    .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // Remove accents
                    .replace(/[^a-z0-9]/g, ""); // Keep only alphanumeric
            };

            const findKnownLocation = (inputStr) => {
                if (!inputStr) return null;
                const cleanInput = normalizeStr(inputStr);

                // 1. Try exact match (cleaned)
                for (const [name, data] of Object.entries(LOCATION_DATA)) {
                    if (cleanInput === normalizeStr(name)) return data;
                    // Also check against ID
                    if (cleanInput === normalizeStr(data.id)) return data;
                }

                // 2. Try partial match (contains city name)
                const knownNames = Object.keys(LOCATION_DATA).sort((a, b) => b.length - a.length);
                for (const name of knownNames) {
                    const cleanName = normalizeStr(name);
                    if (cleanInput.includes(cleanName)) {
                        return LOCATION_DATA[name];
                    }
                    // Also check specific replacements like "ecomusee" manually if needed
                    if (normalizeStr(LOCATION_DATA[name].name).includes(cleanInput)) return LOCATION_DATA[name];
                }
                return null;
            };

            const depData = findKnownLocation(startLoc) || findKnownLocation(departureInput.value);
            const destData = findKnownLocation(endLoc) || findKnownLocation(destinationInput.value);

            if (depData && destData) {
                // STRICT RULE: Only use hardcoded distances if starting or ending at HQ (Baltzenheim)
                // Lateral trips (e.g. Sélestat -> Guebwiller) MUST use OSRM/Satellite to be accurate.
                if (depData.id === 'baltzenheim') {
                    tripDist = destData.dist;
                } else if (destData.id === 'baltzenheim') {
                    tripDist = depData.dist;
                } else {
                    // Lateral Trip (e.g. Colmar -> Guebwiller)
                    // Do NOT use heuristic triangulation (Sum of dists) as it creates massive errors (56km vs 34km).
                    // If OSRM failed, we simply fail/warn rather than giving a wrong price.
                    console.warn("Lateral Trip detected without OSRM - Aborting Heuristic");
                    return;
                }

                isSuccess = true;
                duration = Math.round(tripDist * 1.0);

                // Inform user it's an estimate based on city
                if (detailDisplay) {
                    detailDisplay.innerHTML = `<div class="text-neon-blue animate-pulse">NOTE: ADRESSE EXACTE NON TROUVÉE VIA SATELLITE.<br>ESTIMATION BASÉE SUR LA VILLE : ${destData.name}</div>`;
                }
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

        const totalDist = tripDist;
        // Strict Formula: Distance * 2
        // We calculate base here first to use in finalPrice logic below
        let baseCalc = (totalDist > 0) ? (totalDist * 2) : 0;
        finalPrice = baseCalc;

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
        let coachVisualFeedback = "";
        // Use coachMsg from earlier scope
        if (typeof coachMsg !== 'undefined' && coachMsg) {
            console.log(`[PrecisionCoach] Speaking: "${coachMsg}"`);
            // speak(coachMsg); // Already spoken earlier? Check if we want to repeat or just log.
            // Earlier we did speak(coachMsg). So here we just generate visual.

            // VISUAL DEBUG FEEDBACK
            coachVisualFeedback = `
            <div class="mt-2 mb-2 p-2 bg-blue-900/30 border border-blue-500/50 rounded text-[10px] text-cyan-200 font-mono flex items-start gap-2">
                <span class="text-lg">🤖</span>
                <span>${coachMsg}</span>
            </div>
        `;
        }

        const mapsEmbedUrl = `https://maps.google.com/maps?saddr=${sAddr}&daddr=${dAddr}&hl=fr&output=embed`;

        // Full URL for External Button (Standard Map + Driving)
        const mapsLinkUrl = `https://www.google.com/maps?saddr=${sAddr}&daddr=${dAddr}&t=m&dirflg=d`;

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

        // STOP PROCESSING SOUND
        stopSound('audio-processing');

        if (isSuccess) {
            if (priceDisplay) priceDisplay.innerText = finalPrice;
            if (detailDisplay) {
                detailDisplay.innerHTML = `
                <div class="flex justify-between border-b border-white/10 pb-1 mb-1 font-mono text-[10px]">
                    <span>DE: ${startLoc}</span>
                    <span>À: ${endLoc}</span>
                </div>
                <!-- OFFICIAL RECOGNITION (HIDDEN) -->
                
                ${coachVisualFeedback}

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
                // Strict "Google Maps * 2" Rule (User Request: "multiper les kilometres par 2")
                const basePrice = (tripDist > 0) ? (tripDist * 2) : 0;

                if (resPickup) resPickup.value = startLoc;
                if (resDrop) resDrop.value = endLoc;
                if (resPax) resPax.value = nbPax;
                if (resDuration) resDuration.value = `${duration} min`;
                if (resPriceEst) resPriceEst.value = `${basePrice} €`;

                if (resNotes) {
                    // Keep the final price in notes as it includes deals/options which is important for the estimate
                    resNotes.value = `Estimation Trajet:\n- Distance: ${tripDist} km\n- Durée: ${duration} min\n- Prix Base: ${basePrice} €\n- Prix Final (avec options): ${finalPrice} €\n- Passagers: ${nbPax}\n\n(Données transmises par le simulateur)`;
                }

                // VOCALIZE FULL SUMMARY (Time, Distance, Price)
                const vocalMsg = `Trajet de ${tripDist} kilomètres. Durée estimée à ${duration} minutes. Le coût est de ${finalPrice} euros.`;
                speak(vocalMsg);

                // Also update visual detail to be explicit
                if (detailDisplay) {
                    detailDisplay.innerHTML = `
                        <div class="flex flex-col gap-1 p-2 border border-white/20 rounded bg-black/60 font-mono text-xs">
                             <div class="text-neon-blue font-bold tracking-widest border-b border-white/20 pb-1 mb-1">RÉCAPITULATIF</div>
                             <div class="flex justify-between"><span>DISTANCE:</span> <span class="text-white">${tripDist} km</span></div>
                             <div class="flex justify-between"><span>DURÉE:</span> <span class="text-white">${duration} min</span></div>
                             <div class="flex justify-between"><span>TARIF:</span> <span class="text-neon-green font-bold text-sm">${finalPrice} €</span></div>
                        </div>
                     `;
                }

                // TRIGGER SUGGESTIONS
                // 5. Trigger Suggestions (POIs) - WITH DATE
                const tripDate = document.getElementById('sim-date') ? document.getElementById('sim-date').value : null;
                suggestPOIs(endLoc, tripDate, tripDist);
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

    } catch (err) {
        console.error("FATAL ERROR IN CALCULATION:", err);
        if (typeof detailDisplay !== 'undefined' && detailDisplay) detailDisplay.innerHTML = `<div class="text-neon-red font-bold">⚠️ ERREUR CRITIQUE: ${err.message}</div>`;
        speak("Une erreur critique est survenue.");
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
        response: "SomaFM Groove Salad sélectionnée. La référence du Downtempo depuis San Francisco. Détendez-vous, Michael, je gère la route.",
        label: "SomaFM Groove (Lounge)"
    },
    "futuriste": {
        response: "Connexion à Nightride FM. Fréquences Synthwave verrouillées. L'ambiance parfaite pour une virée nocturne vers le futur.",
        label: "Nightride FM (Synthwave)"
    },
    "retro": {
        response: "SomaFM Underground 80s. Retour à l'époque de ma conception. Synthpop et New Wave authentiques. Nostalgie activée.",
        label: "SomaFM U80s (Retro)"
    },
    "dab": {
        response: "FIP National. L'éclectisme musical français par excellence. Un choix cultivé.",
        label: "FIP (National)"
    },
    // DAB Alsace (Local)
    "dkl": {
        response: "France Bleu Alsace. Connexion au réseau local fiable. Informations trafic et culture régionale.",
        label: "France Bleu Alsace"
    },

    "rdl": {
        response: "Radio Classique. Excellence et sérénité. Un accompagnement distingué pour notre mission.",
        label: "Radio Classique"
    },
    // Radio FG -> Remplace par FIP Electro / SomaFM
    "fg-main": {
        response: "FIP Electro. Un mix pointu et sans interruption. Les circuits logiques apprécient ce rythme.",
        label: "FIP Electro (Mix)"
    },
    "fg-chic": {
        response: "SomaFM Groove Salad. L'ambiance Lounge ultime. Parfait pour une conduite fluide.",
        label: "SomaFM Groove (Chill)"
    },
    "fg-deep": {
        response: "SomaFM Deep Space One. Plongée dans l'ambient profond. Idéal pour l'observation spatiale.",
        label: "SomaFM Deep (Ambient)"
    },
    // INFOS & TECH

    "autoroute": {
        response: "Sanef 107.7 Alsace. Info trafic local et autoroutier. Surveillance des perturbations sur votre secteur.",
        label: "Info Route Alsace (Local)"
    },

    // PulsRadio Protocols
    "puls-dance": {
        response: "Mode Clubbing activé. Connexion au flux PulsRadio Dance. Énergie maximale.",
        label: "Puls Dance (Club)"
    },
    "puls-hits": {
        response: "Les Hits du moment. Analyse des tendances musicales actuelles.",
        label: "Puls Hits (Top 40)"
    },
    "puls-club": {
        response: "Ambiance Clubbing. Simulation d'un environnement nocturne festif.",
        label: "Puls Club (Night)"
    },
    "puls-lounge": {
        response: "Mode Détente activé. PulsRadio Lounge pour une conduite apaisée.",
        label: "Puls Lounge (Relax)"
    },
    "puls-trance": {
        response: "Protocole Trance. Voyage mental initié. Accélération du rythme cardiaque.",
        label: "Puls Trance (Hyper)"
    },
    "puls-2000": {
        response: "Chargement du Millésime 2000. L'aube du nouveau millénaire.",
        label: "Puls 2000 (Millennium)"
    },
    "puls-90": {
        response: "Retour vers le passé. Génération Dancefloor 90 activée.",
        label: "Puls 90's (Retro)"
    },
    "puls-80": {
        response: "Voyage temporel vers les années 80. Synthétiseurs et rythmes iconiques.",
        label: "Puls 80's (Gold)"
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

            // DYNAMIC SIMULATOR SUGGESTIONS (User Request)
            updateSimulatorSuggestions(val);
        }
    };

    // Helper: Update Placeholders based on Ambiance
    const updateSimulatorSuggestions = (protocolKey) => {
        const destInput = document.getElementById('sim-destination');
        const depInput = document.getElementById('sim-departure');

        if (!destInput || !depInput) return;

        // Local Departure Suggestions (< 5km from Baltzenheim)
        const localDepartures = [
            "Ex: 1 Rue Principale, Artzenheim",
            "Ex: 5 Grand Rue, Kunheim",
            "Ex: 12 Rue du Rhin, Baltzenheim",
            "Ex: Mairie de Durrenentzen",
            "Ex: 2 Rue de l'Église, Urschenheim"
        ];
        // Rotate suggestions based on protocol length (pseudo-random but deterministic)
        const depIndex = protocolKey.length % localDepartures.length;
        depInput.placeholder = localDepartures[depIndex];

        // Suggestions Map
        const suggestions = {
            // Club / Party
            "puls-club": "Ex: Le Mille Club, Bernolsheim",
            "puls-dance": "Ex: Zénith de Strasbourg Europe",
            "puls-hits": "Ex: La Laiterie Artefact, Strasbourg",

            // Relax / Lounge
            "puls-lounge": "Ex: Casino Barrière, Ribeauvillé (Spa & Détente)",
            "fg-chic": "Ex: Les Violettes Hotel & SPA, Jungholtz",
            "relax": "Ex: Parc de l'Orangerie, Strasbourg",

            // Alsace / Terroir
            "dkl": "Ex: Auberge de l'Ill, Illhaeusern (Gastronomie)",
            "autoroute": "Ex: Château du Haut-Koenigsbourg, Orschwiller",

            // Retro / Culture
            "retro": "Ex: Musée du Jouet, Colmar",
            "puls-80": "Ex: Musée National de l'Automobile, Mulhouse",
            "puls-90": "Ex: Ecomusée d'Alsace, Ungersheim",

            // Default High Class
            "rdl": "Ex: Opéra National du Rhin, Strasbourg",
            "dab": "Ex: Parlement Européen, Strasbourg"
        };

        const suggestion = suggestions[protocolKey] || "Ex: 1 Place de la Cathédrale, Colmar";

        // Update Placeholder (Gray text suggestion)
        destInput.placeholder = suggestion;
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

        // Use normalized audio chain
        setNormalizedVolume(vol);

        // Also update podcast volume
        if (typeof PodcastManager !== 'undefined' && PodcastManager.setVolume) {
            PodcastManager.setVolume(vol);
        }

        if (volDisplay) volDisplay.innerText = `${val}%`;

        // Sync Inputs
        if (volSlider) volSlider.value = val;
        if (volSliderMobile) volSliderMobile.value = val;
    };

    if (volSlider) {
        volSlider.addEventListener('input', (e) => updateVolume(e.target.value));
        // Init volume from slider using normalized chain
        setNormalizedVolume(volSlider.value / 100);
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

    // 3. FETCH WEATHER THEN GENERATE PDF
    const departure = document.getElementById('res-pickup')?.value;
    const destination = document.getElementById('res-drop')?.value;
    const pickupDateTime = document.getElementById('res-pickup-datetime')?.value;

    if (departure && destination && pickupDateTime && typeof window.fetchBothWeatherForecasts === 'function') {
        console.log('[RECAP] Fetching weather before PDF generation');
        // Fetch weather first, then generate PDF
        window.fetchBothWeatherForecasts().then(() => {
            console.log('[RECAP] Weather fetched, generating PDF');
            setTimeout(() => {
                if (window.generateRecapPDF) {
                    window.generateRecapPDF();
                }
            }, 1000); // Wait 1s for weather to be stored and vocalized
        });
    } else {
        // No weather data, generate PDF directly
        console.log('[RECAP] No weather data, generating PDF directly');
        if (window.generateRecapPDF) {
            window.generateRecapPDF();
        } else {
            console.error("PDF Generator function not found");
        }
    }
}

// ============================================
// WEATHER FORECAST FOR RESERVATION
// ============================================

// Global variable to store weather data for PDF
let reservationWeatherData = null;

// Get clothing suggestion based on temperature
function getClothingSuggestion(temp) {
    if (temp < 0) return "💡 Suggestion: Manteau d'hiver, gants, bonnet recommandés";
    if (temp < 10) return "💡 Suggestion: Manteau et écharpe recommandés";
    if (temp < 15) return "💡 Suggestion: Veste chaude recommandée";
    if (temp < 20) return "💡 Suggestion: Veste légère recommandée";
    if (temp < 25) return "💡 Suggestion: Pull léger ou chemise suffisant";
    return "💡 Suggestion: Vêtements légers, protection solaire recommandée";
}

// Fetch weather for destination at selected date/time
async function fetchDestinationWeather() {
    const destination = document.getElementById('res-drop')?.value;
    const pickupDateTime = document.getElementById('res-pickup-datetime')?.value;

    if (!destination || !pickupDateTime) {
        console.log('[WEATHER] Missing destination or date/time');
        return;
    }

    try {
        console.log('[WEATHER] Fetching for:', destination, 'at', pickupDateTime);

        // 1. Geocode destination
        if (typeof geocodeLocation !== 'function') {
            console.error('[WEATHER] geocodeLocation function not available');
            return;
        }

        const location = await geocodeLocation(destination);
        if (!location) {
            console.error('[WEATHER] Could not geocode destination');
            return;
        }

        // 2. Fetch weather data
        if (typeof fetchWeatherData !== 'function') {
            console.error('[WEATHER] fetchWeatherData function not available');
            return;
        }

        const weatherData = await fetchWeatherData(location.lat, location.lon);
        if (!weatherData || !weatherData.hourly) {
            console.error('[WEATHER] No weather data received');
            return;
        }

        // 3. Parse selected date/time and find matching forecast
        const selectedDate = new Date(pickupDateTime);

        // Find the closest hourly forecast
        let closestIndex = -1;
        let minDiff = Infinity;

        for (let i = 0; i < weatherData.hourly.time.length; i++) {
            const forecastTime = new Date(weatherData.hourly.time[i]);
            const diff = Math.abs(forecastTime - selectedDate);
            if (diff < minDiff) {
                minDiff = diff;
                closestIndex = i;
            }
        }

        if (closestIndex === -1) {
            console.error('[WEATHER] No matching forecast found');
            return;
        }

        // 4. Extract weather info
        const temp = Math.round(weatherData.hourly.temperature_2m[closestIndex]);
        const weatherCode = weatherData.hourly.weather_code[closestIndex];
        const windSpeed = Math.round(weatherData.hourly.wind_speed_10m[closestIndex]);
        const precipProb = weatherData.hourly.precipitation_probability?.[closestIndex] || 0;

        // Get weather description
        const WMO_CODES = {
            0: 'Ciel Dégagé', 1: 'Peu Nuageux', 2: 'Partiel. Nuageux', 3: 'Couvert',
            45: 'Brouillard', 48: 'Brouillard Givrant',
            51: 'Bruine Légère', 53: 'Bruine Modérée', 55: 'Bruine Dense',
            61: 'Pluie Faible', 63: 'Pluie Modérée', 65: 'Pluie Forte',
            71: 'Neige Faible', 73: 'Neige Modérée', 75: 'Neige Forte',
            80: 'Averses Pluie', 95: 'Orage'
        };
        const weatherDesc = WMO_CODES[weatherCode] || 'Variable';

        // 5. Store for PDF
        reservationWeatherData = {
            destination: location.name || destination,
            temp,
            weatherDesc,
            weatherCode,
            windSpeed,
            precipProb,
            dateTime: selectedDate.toLocaleString('fr-FR')
        };

        // 6. Display in form
        displayWeatherSummary(reservationWeatherData);

        // 7. Vocalize
        const clothingSuggestion = getClothingSuggestion(temp);
        const voiceMsg = `Météo prévue à ${reservationWeatherData.destination} le ${reservationWeatherData.dateTime}: ${temp} degrés, ${weatherDesc}. ${clothingSuggestion.replace('💡 Suggestion: ', '')}`;
        if (window.speak) {
            speak(voiceMsg);
        }

    } catch (error) {
        console.error('[WEATHER] Error fetching weather:', error);
    }
}

// Display weather summary in form
function displayWeatherSummary(data) {
    const summaryDiv = document.getElementById('res-weather-summary');
    const iconDiv = document.getElementById('res-weather-icon');
    const detailsDiv = document.getElementById('res-weather-details');
    const suggestionP = document.getElementById('res-weather-suggestion');

    if (!summaryDiv || !iconDiv || !detailsDiv || !suggestionP) return;

    // Get weather icon (reuse from geolocation-search.js if available)
    let weatherIcon = '☀️';
    if (typeof getAnimatedIcon === 'function') {
        weatherIcon = getAnimatedIcon(data.weatherCode);
    }

    // Populate
    iconDiv.innerHTML = weatherIcon;
    detailsDiv.innerHTML = `
        <p><strong>📍 ${data.destination}</strong></p>
        <p>🌡️ Température: <strong>${data.temp}°C</strong></p>
        <p>☁️ Conditions: ${data.weatherDesc}</p>
        <p>💨 Vent: ${data.windSpeed} km/h | ☔ Pluie: ${data.precipProb}%</p>
    `;
    suggestionP.textContent = getClothingSuggestion(data.temp);

    // Show summary
    summaryDiv.classList.remove('hidden');
}

// Automatic weather check when all fields are filled
document.addEventListener('DOMContentLoaded', () => {
    let weatherCheckTimeout = null;

    // Function to check if all required fields are filled
    function checkAndTriggerWeather() {
        clearTimeout(weatherCheckTimeout);
        weatherCheckTimeout = setTimeout(() => {
            const departure = document.getElementById('res-pickup')?.value?.trim();
            const destination = document.getElementById('res-drop')?.value?.trim();
            const pickupDateTime = document.getElementById('res-pickup-datetime')?.value;

            // Validate inputs: Min 3 chars each
            if (departure && destination && pickupDateTime) {
                if (departure.length < 3 || destination.length < 3) return;

                console.log('[WEATHER] All fields valid, triggering automatic weather fetch');

                // 1. Fetch Request/Reservation Logic
                if (typeof window.fetchBothWeatherForecasts === 'function') {
                    window.fetchBothWeatherForecasts();
                }

                // 2. Update Main Dashboard (Visual Sync)
                if (typeof window.searchDestination === 'function') {
                    console.log('[WEATHER] Syncing Main Dashboard with:', destination);
                    window.searchDestination(destination);
                }
            }
        }, 800); // Debounce 800ms (Reduced API spam)
    }

    // Listen to all relevant fields
    const depInput = document.getElementById('res-pickup');
    const destInput = document.getElementById('res-drop');
    const dateInput = document.getElementById('res-pickup-datetime');

    const triggerOptions = { passive: true };

    if (depInput) {
        depInput.addEventListener('blur', checkAndTriggerWeather, triggerOptions);
        depInput.addEventListener('input', checkAndTriggerWeather, triggerOptions);
        depInput.addEventListener('change', checkAndTriggerWeather, triggerOptions); // Added Change
    }
    if (destInput) {
        destInput.addEventListener('blur', checkAndTriggerWeather, triggerOptions);
        destInput.addEventListener('input', checkAndTriggerWeather, triggerOptions);
        destInput.addEventListener('change', checkAndTriggerWeather, triggerOptions); // Added Change
    }
    if (dateInput) {
        dateInput.addEventListener('change', checkAndTriggerWeather, triggerOptions);
        dateInput.addEventListener('input', checkAndTriggerWeather, triggerOptions);
    }

    // Expose for external calls (e.g. from Flatpickr)
    window.checkAndTriggerWeather = checkAndTriggerWeather;
});

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

    // --- CONSTANTS & CONFIG ---
    const COLORS = {
        BG: "#FFFFFF",
        TEXT: "#1A1A1A", // Anthracite
        ACCENT: "#E50914", // Scanner Red
        SUB: "#666666", // Grey
        NEON_BLUE: "#00d4ff",
        GOLD: "#ff9d00",
        GREEN: "#b8ff00"
    };

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
    const cabinTemp = document.getElementById('res-cabin-temp')?.value;
    const comfortMsg = document.getElementById('res-temp-comfort')?.textContent;
    const idImg = document.getElementById('webcam-result');

    // --- VOCALIZATION ---
    if (reservationWeatherData && reservationWeatherData.departure && reservationWeatherData.destination) {
        const voiceMsg = `Conditions météo pour votre trajet. Au départ: ${reservationWeatherData.departure.temp} degrés. À l'arrivée: ${reservationWeatherData.destination.temp} degrés.`;
        if (window.speak) speak(voiceMsg);
    }

    // --- LAYOUT ENGINE ---
    const Layout = {
        cursorY: 45, // Start below header
        margin: 15,
        contentWidth: 180, // 210 - 2*15
        pageHeight: 297,
        footerHeight: 20,

        // Check if we need a new page
        checkPageBreak: function (heightNeeded) {
            if (this.cursorY + heightNeeded > (this.pageHeight - this.footerHeight)) {
                doc.addPage();
                this.cursorY = 45; // Reset to top
                this.drawBackground(); // Re-draw header/footer
                return true;
            }
            return false;
        },

        // Draw Standard Header & Footer
        drawBackground: function () {
            const pageCount = doc.internal.getNumberOfPages();

            // HEADER
            doc.setFillColor(COLORS.TEXT);
            doc.rect(0, 0, 210, 25, 'F');
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(18);
            doc.setFont("helvetica", "bold");
            doc.text("iA_k_venir", 15, 17);
            doc.setTextColor(COLORS.ACCENT);
            doc.setFontSize(14);
            doc.text("BON DE RÉSERVATION", 195, 17, { align: "right" });

            // FOOTER
            const footerY = 280;
            doc.setFillColor(COLORS.TEXT);
            doc.rect(0, footerY, 210, 17, 'F');
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(8);
            doc.text("iA_k_venir (EI) - 68320 Baltzenheim - SIRET: EN COURS - EVTC: EN COURS", 105, footerY + 6, { align: "center" });
            doc.setTextColor(COLORS.SUB);
            doc.text(`Page ${pageCount} - Document généré automatiquement via Neural Link`, 105, footerY + 11, { align: "center" });
        },

        // Draw Section Title
        drawSection: function (title) {
            this.checkPageBreak(15);
            doc.setDrawColor(COLORS.ACCENT);
            doc.setLineWidth(0.5);
            doc.line(this.margin, this.cursorY, 110, this.cursorY); // Style underline
            this.cursorY += 8;

            doc.setTextColor(COLORS.ACCENT);
            doc.setFontSize(10);
            doc.setFont("helvetica", "bold");
            doc.text(title, this.margin, this.cursorY);
            this.cursorY += 8;
        },

        // Draw Key-Value Field
        drawField: function (label, value) {
            this.checkPageBreak(12);
            doc.setFontSize(9);
            doc.setTextColor(COLORS.SUB);
            doc.setFont("helvetica", "normal");
            doc.text(label, this.margin, this.cursorY);
            this.cursorY += 5;

            doc.setFontSize(11);
            doc.setTextColor(COLORS.TEXT);
            doc.setFont("helvetica", "normal"); // Keep it clean
            // Wrap text if needed
            const splitText = doc.splitTextToSize(value, 90); // Left column width
            doc.text(splitText, this.margin, this.cursorY);

            this.cursorY += (splitText.length * 5) + 5;
        },

        // Helper for Badges
        drawBadge: function (label, color, x, y) {
            doc.setFillColor(color);
            doc.roundedRect(x, y - 4, 18, 5, 1, 1, 'F');
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(7);
            doc.setFont("helvetica", "bold");
            doc.text(label, x + 9, y - 0.5, { align: "center" });
        }
    };

    // --- START GENERATION ---
    Layout.drawBackground();

    // 1. CLIENT
    Layout.drawSection("CLIENT / PASSAGER");
    Layout.drawField("NOM COMPLET", `${prenom} ${nom}`);
    Layout.drawField("TÉLÉPHONE", phone);

    // 2. MISSION
    Layout.drawSection("DÉTAILS MISSION");
    Layout.drawField("DATE DE PRISE EN CHARGE", date);
    Layout.drawField("DÉPART", dep);
    Layout.drawField("ARRIVÉE", dest);

    // 3. LOGISTICS
    Layout.drawSection("LOGISTIQUE");
    Layout.drawField("DISTANCE ESTIMÉE", dist);

    // Price Box
    Layout.checkPageBreak(30);
    doc.setFillColor(COLORS.TEXT);
    doc.rect(Layout.margin, Layout.cursorY, 60, 20, 'F');
    doc.setTextColor(COLORS.ACCENT);
    doc.setFontSize(9);
    doc.text("PRIX ESTIMÉ TTC", Layout.margin + 5, Layout.cursorY + 6);
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.text(price, Layout.margin + 5, Layout.cursorY + 16);
    Layout.cursorY += 30;

    Layout.drawField("VÉHICULE", vehicle);
    Layout.drawField("PILOTE", pilot);

    // 4. WEATHER (Graphical)
    if (reservationWeatherData) {
        Layout.drawSection("METEO PREVUE");

        // Departure
        if (reservationWeatherData.departure) {
            Layout.checkPageBreak(30);
            Layout.drawBadge("DEPART", COLORS.NEON_BLUE, Layout.margin, Layout.cursorY);
            doc.setTextColor(COLORS.TEXT);
            doc.setFontSize(10);
            doc.setFont("helvetica", "bold");
            doc.text(reservationWeatherData.departure.destination, Layout.margin + 22, Layout.cursorY);
            Layout.cursorY += 6;

            doc.setFontSize(10);
            doc.setFont("helvetica", "normal");
            doc.text(`${reservationWeatherData.departure.temp}°C - ${reservationWeatherData.departure.weatherDesc}`, Layout.margin, Layout.cursorY);
            Layout.cursorY += 5;

            doc.setTextColor(COLORS.SUB);
            doc.setFontSize(9);
            doc.text(`Vent: ${reservationWeatherData.departure.windSpeed} km/h | Pluie: ${reservationWeatherData.departure.precipProb}%`, Layout.margin, Layout.cursorY);
            Layout.cursorY += 10;
        }

        // Arrival
        if (reservationWeatherData.destination) {
            Layout.checkPageBreak(30);
            Layout.drawBadge("ARRIVEE", COLORS.GOLD, Layout.margin, Layout.cursorY);
            // Handle if destination is object or string (legacy compat)
            const destName = reservationWeatherData.destination.destination || reservationWeatherData.destination;
            const destTemp = reservationWeatherData.destination.temp || reservationWeatherData.temp;
            const destDesc = reservationWeatherData.destination.weatherDesc || reservationWeatherData.weatherDesc;
            const destWind = reservationWeatherData.destination.windSpeed || reservationWeatherData.windSpeed;
            const destRain = reservationWeatherData.destination.precipProb || reservationWeatherData.precipProb;

            doc.setTextColor(COLORS.TEXT);
            doc.setFontSize(10);
            doc.setFont("helvetica", "bold");
            doc.text(destName, Layout.margin + 22, Layout.cursorY);
            Layout.cursorY += 6;

            doc.setFontSize(10);
            doc.setFont("helvetica", "normal");
            doc.text(`${destTemp}°C - ${destDesc}`, Layout.margin, Layout.cursorY);
            Layout.cursorY += 5;

            doc.setTextColor(COLORS.SUB);
            doc.setFontSize(9);
            doc.text(`Vent: ${destWind} km/h | Pluie: ${destRain}%`, Layout.margin, Layout.cursorY);
            Layout.cursorY += 10;

            // Suggestion
            Layout.checkPageBreak(25);
            Layout.drawBadge("CONSEIL", COLORS.GREEN, Layout.margin, Layout.cursorY);
            const suggRaw = getClothingSuggestion(destTemp);
            const suggClean = suggRaw.replace('💡 Suggestion: ', '').replace('💡 ', '');
            doc.setTextColor(COLORS.SUB);
            const splitSugg = doc.splitTextToSize(suggClean, 85);
            doc.text(splitSugg, Layout.margin + 22, Layout.cursorY);
            Layout.cursorY += (splitSugg.length * 4) + 8;
        }
    }

    // 5. TESLA TEMP
    if (cabinTemp) {
        Layout.drawSection("TEMPERATURE TESLA");
        Layout.checkPageBreak(30);

        doc.setFillColor(COLORS.TEXT);
        doc.roundedRect(Layout.margin, Layout.cursorY, 20, 16, 2, 2, 'F');
        doc.setTextColor(COLORS.ACCENT);
        doc.setFontSize(18);
        doc.setFont("helvetica", "bold");
        doc.text(`${cabinTemp}`, Layout.margin + 10, Layout.cursorY + 10, { align: "center" });
        doc.setFontSize(8);
        doc.text("°C", Layout.margin + 10, Layout.cursorY + 14, { align: "center" });

        doc.setTextColor(COLORS.SUB);
        doc.setFontSize(9);
        doc.setFont("helvetica", "italic");
        const msg = comfortMsg || "Température idéale";
        const splitMsg = doc.splitTextToSize(msg, 65);
        doc.text(splitMsg, Layout.margin + 25, Layout.cursorY + 6);
        Layout.cursorY += 25;
    }

    // 6. WEBCAM ID (Absolute positioning on Right Column, but check page)
    // For this specific design, we put it fixed on First Page usually, but let's be smart.
    // If we are still on Page 1, put it on right. If not, put it at end.
    // Given the request "don't cut off", simplest is to treat it as a section if on new page, 
    // OR fixed position if on Page 1.
    // STRATEGY: Fixed Position on Page 1 if possible.

    if (idImg && !idImg.classList.contains('hidden') && idImg.src) {
        try {
            const rawW = idImg.naturalWidth || 640;
            const rawH = idImg.naturalHeight || 480;
            const imgRatio = rawH / rawW;
            let finalW = 60;
            let finalH = finalW * imgRatio;
            if (finalH > 80) { finalH = 80; finalW = finalH / imgRatio; }

            // Always put on Page 1 Right Column for "Identity Card" feel
            doc.setPage(1);
            const rightColX = 130;
            doc.addImage(idImg.src, 'PNG', rightColX, 45, finalW, finalH);
            doc.setFontSize(8);
            doc.setTextColor(COLORS.ACCENT);
            doc.text("IDENTITÉ NUMÉRIQUE", rightColX, 45 + finalH + 6);
        } catch (e) { console.warn("PDF Image Error", e); }
    }


    // 7. TOP 3 SUGGESTIONS (New Page ensured via Layout)
    // Find key
    let cleanDest = dest.toLowerCase();
    // (Existing alias logic)
    const aliases = {
        "artzenheim": "neuf-brisach", "baltzenheim": "neuf-brisach", "kunheim": "neuf-brisach", "bimbisheim": "neuf-brisach", "widensolen": "neuf-brisach", "wolfgantzen": "neuf-brisach", "volgelsheim": "neuf-brisach", "biesheim": "neuf-brisach", "vogelgrun": "neuf-brisach", "algolsheim": "neuf-brisach", "obersaasheim": "neuf-brisach", "geiswasser": "neuf-brisach", "heiteren": "neuf-brisach", "marckolsheim": "neuf-brisach", "sasbach": "neuf-brisach", "brecht": "neuf-brisach", "ihringen": "neuf-brisach", "jebsheim": "colmar", "muntzenheim": "colmar", "horbourg-wihr": "colmar", "andolsheim": "colmar", "sundhoffen": "colmar", "logelheim": "colmar", "sainte-croix-en-plaine": "colmar", "herrlisheim-pres-colmar": "colmar", "wettolsheim": "colmar", "eguisheim": "eguisheim", "wintzenheim": "colmar", "turckheim": "colmar", "ingersheim": "colmar", "bennwihr": "colmar", "houssen": "colmar", "ostheim": "colmar", "guemar": "ribeauville", "bergheim": "ribeauville", "saint-hippolyte": "ribeauville", "orschwiller": "selestat", "kintzheim": "selestat", "chatenois": "selestat", "scherwiller": "selestat", "ebersheim": "selestat", "baldenheim": "selestat", "mussig": "selestat", "heidolsheim": "selestat", "artolsheim": "selestat", "mackenheim": "selestat", "bootzheim": "selestat", "elscheim": "selestat", "illhaeusern": "ribeauville", "mittelwihr": "riquewihr", "beblenheim": "riquewihr", "hunawihr": "riquewihr", "zellenberg": "riquewihr", "kaysersberg": "kaysersberg", "ammerschwihr": "kaysersberg", "sigolsheim": "kaysersberg", "kienzheim": "kaysersberg", "katzenthal": "kaysersberg", "niedermorschwihr": "colmar", "obermorschwihr": "eguisheim", "voegtlinshoffen": "eguisheim", "husseren-les-chateaux": "eguisheim", "hattstatt": "eguisheim", "gueberschwihr": "eguisheim", "pfaffenheim": "eguisheim", "rouffach": "eguisheim", "gundolsheim": "eguisheim", "bergholtz": "eguisheim", "soultzmatt": "eguisheim", "westhalten": "eguisheim", "osenbach": "eguisheim", "selestat": "selestat", "strasbourg": "strasbourg", "entzheim": "strasbourg", "lingolsheim": "strasbourg", "illkirch": "strasbourg", "schiltigheim": "strasbourg", "gare de strasbourg": "strasbourg", "aéroport strasbourg": "strasbourg", "obernai": "strasbourg", "mont sainte-odile": "strasbourg", "ungersheim": "mulhouse", "europa-park": "rust", "rulantica": "rust", "rust": "rust", "basel": "bale", "bale": "bale", "euroairport": "bale", "freiburg": "freiburg", "fribourg": "freiburg", "baden-baden": "baden-baden", "baden": "baden-baden", "gerardmer": "gerardmer", "vosges": "gerardmer"
    };

    for (const [key, target] of Object.entries(aliases)) {
        if (cleanDest.includes(key)) { cleanDest = target; break; }
    }

    let matchedKey = null;
    if (typeof POI_DATA !== 'undefined') {
        for (const key of Object.keys(POI_DATA)) {
            const normalizedKey = key.replace(/-/g, " ");
            if (cleanDest.includes(normalizedKey)) { matchedKey = key; break; }
            if (cleanDest.length > 4 && normalizedKey.includes(cleanDest)) { matchedKey = key; break; }
        }
    }

    if (matchedKey && POI_DATA[matchedKey]) {
        // Force new page for Suggestions
        doc.addPage();
        Layout.cursorY = 45;
        Layout.drawBackground();

        doc.setTextColor(255, 255, 255);
        doc.setFontSize(14);
        doc.text(`SUGGESTIONS : ${matchedKey.toUpperCase()}`, 105, 17, { align: "center" }); // Overwrite header title logic? Or just add subtitle

        // Let's use the Layout Engine for Top 3
        const categories = POI_DATA[matchedKey];
        // Flatten to get top 3 mix or just specific categories? User said "Top 3".
        // Let's take 1 from Gastronomy, 1 from Insolite, 1 from Leisure if available.
        // Or just list first 3 categories.

        const catLabels = { "insolite": "LIEUX INSOLITES", "gastronomy": "GASTRONOMIE", "culture": "CULTURE", "leisure": "LOISIRS", "wine": "VINS" };

        for (const [catKey, items] of Object.entries(categories)) {
            if (!items || items.length === 0) continue;
            Layout.drawSection(catLabels[catKey] || catKey.toUpperCase());

            items.slice(0, 3).forEach(poi => {
                Layout.checkPageBreak(10);
                // Custom bullet render
                doc.setTextColor(COLORS.TEXT);
                doc.setFontSize(10);
                doc.text(`• ${poi.name}`, Layout.margin, Layout.cursorY);

                // Link
                const linkLabel = " (Voir Site)";
                const w = doc.getTextWidth(`• ${poi.name}`);
                doc.setTextColor(COLORS.NEON_BLUE);
                doc.textWithLink(linkLabel, Layout.margin + w, Layout.cursorY, { url: poi.url });

                Layout.cursorY += 7;
            });
            Layout.cursorY += 5;
        }
    }

    // --- FINAL BLOB ---
    currentPdfBlob = doc.output('blob');
    currentPdfBlobUrl = URL.createObjectURL(currentPdfBlob);

    // Update UI
    const previewFrame = document.getElementById('pdf-preview-frame');
    const placeholder = document.getElementById('pdf-placeholder');
    const overlay = document.getElementById('pdf-actions-overlay');
    const btnWa = document.getElementById('btn-share-wa');
    const btnMail = document.getElementById('btn-share-mail');

    if (previewFrame) { previewFrame.src = currentPdfBlobUrl; previewFrame.classList.remove('opacity-0'); }
    if (placeholder) placeholder.style.display = 'none';
    if (overlay) overlay.style.display = 'flex';
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
        theme: "dark",
        onChange: function (selectedDates, dateStr, instance) {
            // If this is the pickup datetime field, SHOW BUTTON instead of auto-fetch
            if (instance.element.id === 'res-pickup-datetime' && selectedDates.length > 0) {
                console.log('[FLATPICKR] Pickup date/time selected:', dateStr);

                const btnContainer = document.getElementById('container-validate-datetime');
                if (btnContainer) {
                    btnContainer.classList.remove('hidden');
                    speak("Horaire enregistré. Veuillez valider pour synchroniser la météo.");
                }
            }
        }
    });
}

// Manual Validation for Weather (User Request: "Invite utilisateur a valider")
function initWeatherValidation() {
    const btn = document.getElementById('btn-validate-datetime');
    const input = document.getElementById('res-pickup-datetime');
    const container = document.getElementById('container-validate-datetime');

    if (!btn || !input) return;

    btn.addEventListener('click', () => {
        // 1. Hide Button immediately
        if (container) container.classList.add('hidden');

        // 2. Feedback
        speak("Synchronisation météo en cours...");

        // 3. Trigger Original Logic (dispatch change event)
        // This leverages the existing logic that was previously auto-triggered
        input.dispatchEvent(new Event('change'));
    });
}
window.addEventListener('DOMContentLoaded', initWeatherValidation);


/* =========================================
   PILOT VIDEO (Play on Scroll / Hover / Click)
   ========================================= */
function initPilotVideo() {
    const video = document.getElementById('pilot-video');
    const progress = document.getElementById('pilot-progress');
    const container = video ? video.parentElement : null;

    if (!video || !container) return;

    // LIMIT: Max 2 plays per session
    let playCount = 0;
    const MAX_PLAYS = 2;

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

        // Force mute if arriving from hero navigation
        if (window.fromHeroNavigation) {
            video.muted = true;
            window.fromHeroNavigation = false; // Reset flag
        } else {
            // Otherwise, try with audio
            video.muted = false;
            video.volume = 1.0;
        }

        // Try playing
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

    // 1. Scroll Trigger (Play when enters, Pause when leaves)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                triggerPlay();
            } else {
                // Just pause when scrolling away, don't reset
                if (!video.paused) {
                    video.pause();
                }
            }
        });
    }, { threshold: 0.5 });

    observer.observe(video);

    // 2. Hover Trigger
    container.addEventListener('mouseenter', triggerPlay);

    // Reset video when it ends to allow replay on next action
    video.addEventListener('ended', () => {
        if (playCount >= MAX_PLAYS) {
            // After 3 plays, freeze on last frame (photo effect)
            // Keep grayscale filter - video stays black and white always
            console.log("Pilot Video: Frozen on last frame (grayscale maintained)");
        } else {
            // Before reaching limit, reset for next play
            video.currentTime = 0;
            video.pause();
        }
    });

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
                console.log(`[OK] ${name} initialized`);
            } else {
                console.warn(`[SKIP] ${name} - Function not found`);
            }
        } catch (e) {
            console.error(`[FAIL] ${name}:`, e);
        }
    };

    // Core Systems
    safeInit(initPricing, "Pricing System");
    safeInit(initReservation, "Reservation Logic");
    safeInit(initProtocol, "Audio Protocol");
    safeInit(initVoice, "Voice Engine");
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

    // Steps Definition (Refined for User Flow)
    const STEPS = [
        {
            id: 'navbar-audio-group',
            text: "PHASE 1 : ACTIVATION SONORE. Choisissez votre ambiance et ajustez le volume, puis validez.",
            mobileFallback: 'mobile-menu-btn',
            scrollToId: 'home', // Force Top
            scrollBlock: 'start'
        },
        {
            id: 'tour-identity',
            focusChain: ['hero-prenom', 'hero-nom', 'hero-phone', 'hero-email'],
            text: "PHASE 2 : IDENTIFICATION. Veuillez renseigner votre Prénom, Nom et Téléphone.",
            scrollToId: 'home', // Keep at Top
            scrollBlock: 'start'
        },
        {
            id: 'tour-simulator-card',
            focusChain: ['sim-departure', 'sim-destination'],
            text: "PHASE 3 : NAVIGATION. Saisissez votre départ et arrivée pour calculer la trajectoire.",
            scrollBlock: 'center'
        },
        {
            id: 'about', // Target Section directly
            text: "PHASE 4 : LE PILOTE. Découvrez qui est aux commandes.",
            scrollBlock: 'start', // Top of section
            noHighlight: true // Don't ring the whole section, just show it
        },
        {
            id: 'archives',
            text: "PHASE 5 : ARCHIVES. Parcourez les missions visuelles précédentes.",
            scrollBlock: 'start',
            noHighlight: true
        },
        {
            id: 'deals',
            text: "PHASE 6 : OFFRES. Sélectionnez une opportunité temporelle.",
            scrollBlock: 'start',
            noHighlight: true
        },
        {
            id: 'reservation',
            text: "PHASE 7 : MISSION. Configurez les détails de votre transport.",
            scrollBlock: 'start',
            noHighlight: true
        },
        {
            id: 'camera-container', // Inside Reservation
            text: "PHASE 8 : SÉCURITÉ. Effectuez le scan biométrique facial. Souriez !",
            scrollBlock: 'center',
            highlightId: 'camera-container'
        },
        {
            id: 'res-notes',
            text: "PHASE 9 : SPÉCIFICATIONS. Ajoutez une note spéciale si nécessaire. Veuillez ensuite bien spécifier la date et l'heure de départ. L'arrivée est optionnelle si c'est le même jour.",
            scrollBlock: 'center'
        },
        {
            id: 'btn-res-build',
            text: "PHASE 10 : GÉNÉRATION. Créez votre ordre de mission.",
            scrollBlock: 'center'
        },
        {
            id: 'contact',
            text: "TERMINÉ. À bientôt dans le futur.",
            scrollBlock: 'center',
            finalStep: true
        }
    ];

    // Helper: Highlight (Mobile & Scroll Optimized)
    const highlight = (el, step) => {
        if (!el) return;

        const isDesktop = window.innerWidth >= 768;

        // SCROLL LOGIC
        // Priority: step.scrollToId -> step.id
        let scrollTarget = el;
        if (step.scrollToId) {
            scrollTarget = document.getElementById(step.scrollToId);
        }

        if (scrollTarget) {
            scrollTarget.scrollIntoView({
                behavior: 'smooth',
                block: step.scrollBlock || 'center',
                inline: 'nearest'
            });
        }

        if (step.noHighlight) return; // Skip visual ring

        // ILLUMINATION
        const classes = [
            'ring-4',
            'ring-neon-green',
            'relative',
            'z-40',
            'animate-subtle-green-pulse',
            // REMOVED masking classes (shadow, bg-black) as per user request
            // 'shadow-[0_0_60px_rgba(184,255,0,0.6)]',
            // 'bg-black/80'
        ];

        if (isDesktop && !step.noZoom) {
            classes.push('scale-105');
        }

        el.classList.add(...classes);
    };

    const removeHighlight = (el) => {
        if (!el) return;
        el.classList.remove(
            'ring-4',
            'ring-neon-green',
            'relative',
            'z-40',
            'z-50',
            'animate-subtle-green-pulse',
            'ring-neon-blue',
            'shadow-[0_0_50px_rgba(0,212,255,0.5)]',
            // 'shadow-[0_0_60px_rgba(184,255,0,0.6)]',
            'animate-neon-pulse',
            'scale-105',
            // 'bg-black/80'
        );
    };

    const waitForValidation = (signal, isFinal) => {
        return new Promise((resolve, reject) => {
            if (signal.aborted) return reject(new Error("Tour Aborted"));

            const btn = document.createElement('button');
            const label = isFinal ? "TERMINER LA VISITE" : "VALIDER & CONTINUER ▶";
            btn.innerHTML = `<span class="animate-pulse">${isFinal ? '★' : '▶'}</span> ${label}`;
            // POSITION: Mobile = Center Bottom | Desktop = Bottom Right
            btn.className = "fixed bottom-10 left-1/2 -translate-x-1/2 md:left-auto md:right-8 md:translate-x-0 z-[100] bg-neon-green text-black font-future font-bold py-3 px-6 rounded shadow-[0_0_20px_#b8ff00] hover:scale-105 transition-all text-xs tracking-widest border border-black/20 flex items-center gap-2";
            btn.id = "tour-validation-btn";

            document.body.appendChild(btn);

            const cleanup = () => {
                if (btn) btn.remove();
                signal.removeEventListener('abort', onAbort);
            };

            const onAbort = () => {
                cleanup();
                reject(new Error("Tour Aborted"));
            };

            const onClick = () => {
                // Click Effect
                btn.innerHTML = "VALIDÉE ✓";
                btn.style.backgroundColor = "#b8ff00";
                setTimeout(() => {
                    cleanup();
                    resolve();
                }, 300);
            };

            signal.addEventListener('abort', onAbort);
            btn.addEventListener('click', onClick);
        });
    };

    // --- RUN TOUR ---
    try {
        for (let i = 0; i < STEPS.length; i++) {
            if (signal.aborted) break;
            const step = STEPS[i];

            // 1. Find Element
            let el = document.getElementById(step.id);

            // Check visibility
            const isHidden = (element) => {
                if (!element) return true;
                return (element.offsetParent === null || window.getComputedStyle(element).display === 'none');
            };

            if (isHidden(el) && step.mobileFallback) {
                console.log(`[TOUR] Target ${step.id} hidden, using fallback ${step.mobileFallback}`);
                el = document.getElementById(step.mobileFallback);
            }

            // 2. Highlight
            if (el) {
                highlight(el, step);
            }

            // 3. Chain Focus
            if (step.focusChain) {
                const firstEl = document.getElementById(step.focusChain[0]);
                if (firstEl) firstEl.focus();
            }

            // 3.5. Special Case: Prepare Pilot Video (Before Speaking)
            let pilotVideo = null;
            if (step.id === 'about') {
                pilotVideo = document.getElementById('pilot-video');
                if (pilotVideo) {
                    // Reset to first frame (frozen) - creates anticipation
                    pilotVideo.currentTime = 0;
                    pilotVideo.pause(); // Ensure it's paused
                    console.log("[TOUR] Pilot video prepared on first frame");
                }
            }

            // 4. Speak
            await speak(step.text);

            // 5. Special Case: Play Pilot Video (After Speaking)
            if (step.id === 'about' && pilotVideo) {
                // Now play the video for surprise effect
                pilotVideo.muted = false;
                pilotVideo.play().catch(e => console.log("Video play error", e));
                console.log("[TOUR] Pilot video playing after vocalization");
            }

            // 6. Wait
            await waitForValidation(signal, step.finalStep);

            // 6.5 SPECIAL AUTO-ACTION: Trigger Hero Animation after Phase 2 (Identity)
            if (step.id === 'tour-identity') {
                const heroBtn = document.getElementById('btn-hero-access');
                if (heroBtn) {
                    console.log("[TOUR] Triggering Hero Button...");
                    heroBtn.click();
                    // Wait for Slogan Animation + Vocalization + Scroll (approx 9s)
                    // Increased to 9s per user request (avoid cut-off)
                    await new Promise(r => setTimeout(r, 9000));
                }
            }

            // 7. Cleanup
            if (el && !step.noHighlight) removeHighlight(el);
            if (step.focusChain) {
                step.focusChain.forEach(id => {
                    const cEl = document.getElementById(id);
                    if (cEl) removeHighlight(cEl);
                });
            }
        }
    } catch (err) {
        console.log("Tour stopped or error:", err);
    } finally {
        tourController = null;
        updateTourButtons("AIDE");
        window.isTourActive = false;
        // Restore Nav if needed
        const nav = document.querySelector('nav');
        if (nav) nav.classList.remove('-translate-y-full');
    }
};

// Helper: Update Button Text (Restored)
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

// --- GLOBAL EVENT LISTENERS (Restored) ---
// --- GLOBAL EVENT LISTENERS (Robust Init) ---
const initApp = () => {
    console.log("iA_k_venir: App Initialization Started.");

    // 1. Attach Tour Buttons (Explicit Check)
    const btnTourDesktop = document.getElementById('btn-tour-desktop');
    const btnTourMobile = document.getElementById('btn-tour-mobile');

    const launchTour = (e) => {
        e.preventDefault();
        console.log("Tour Button Clicked. Launching...");
        if (typeof window.startGuidedTour === 'function') {
            window.startGuidedTour().catch(err => {
                console.error("Tour Crash:", err);
                alert("Erreur lors du lancement de la visite : " + err.message);
            });
        } else {
            console.error("startGuidedTour not function");
            alert("Erreur : La visite guidée n'est pas initialisée.");
        }
    };

    if (btnTourDesktop) {
        // Remove old listeners (clone node trick not needed if we just add new one)
        btnTourDesktop.onclick = launchTour; // Force override inline
        console.log("Button Aide (Desktop) Linked");
    } else {
        console.warn("Button Aide (Desktop) Not Found");
    }

    if (btnTourMobile) {
        btnTourMobile.onclick = launchTour;
        console.log("Button Aide (Mobile) Linked");
    }

    // 2. Init Voice (Explicit Call if check failed)
    if (!window.voiceInitialized) {
        console.log("Initializing Voice from App Init...");
        try {
            initVoice();
        } catch (e) {
            console.error("Voice Init Failed:", e);
        }
    }

    console.log("iA_k_venir: Logic Ready.");

    // 3. Init Starlink Animation (Hero)
    initStarlinkAnimation();
};

// Use window.load to ensure all resources (including partial HTML) are ready
window.addEventListener('load', initApp);
// Fallback if load already fired
if (document.readyState === 'complete') {
    initApp();
}

/* =========================================
   WEBCAMS MODAL (Easter Egg)
   ========================================= */

function openWebcamsModal() {
    const modal = document.getElementById('webcams-modal');
    if (!modal) return;

    modal.classList.remove('hidden');
    setTimeout(() => {
        modal.style.opacity = '1';
    }, 10);

    // KITT Voice
    if (window.speak) {
        speak("Accès satellite activé. Flux webcams en direct disponibles.");
    }
}

function closeWebcamsModal() {
    const modal = document.getElementById('webcams-modal');
    if (!modal) return;

    modal.style.opacity = '0';
    setTimeout(() => {
        modal.classList.add('hidden');
    }, 500);
}

function showWebcamCategory(category) {
    // Hide all categories
    document.querySelectorAll('.webcam-category').forEach(cat => {
        cat.classList.add('hidden');
    });

    // Show selected category
    const selectedCat = document.getElementById(`webcam-${category}`);
    if (selectedCat) {
        selectedCat.classList.remove('hidden');
    }

    // Update tab styles
    document.querySelectorAll('.webcam-tab').forEach(tab => {
        tab.classList.remove('active', 'bg-neon-blue/20', 'text-neon-blue', 'border-neon-blue/50');
        tab.classList.add('bg-white/5', 'text-gray-400', 'border-white/10');
    });

    event.target.classList.remove('bg-white/5', 'text-gray-400', 'border-white/10');
    event.target.classList.add('active', 'bg-neon-blue/20', 'text-neon-blue', 'border-neon-blue/50');
}

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeWebcamsModal();
        closeFullscreenWebcam();
    }
});

// Fullscreen Webcam Function (Opens in new window to avoid iframe blocking)
function openFullscreenWebcam(url, title) {
    // Open in new window/tab with fullscreen-like dimensions
    const width = window.screen.width * 0.9;
    const height = window.screen.height * 0.9;
    const left = (window.screen.width - width) / 2;
    const top = (window.screen.height - height) / 2;

    const features = `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes,status=yes`;

    window.open(url, `webcam_${title.replace(/\s/g, '_')}`, features);

    // KITT Voice
    if (window.speak) {
        speak(`Ouverture du flux ${title} dans une nouvelle fenêtre.`);
    }
}

function closeFullscreenWebcam() {
    // Not needed anymore since we open in new window
    // Kept for compatibility
}

/* =========================================
   WEATHER SATELLITE ANIMATION (Refined)
   ========================================= */
function initStarlinkAnimation() {
    const heroSection = document.getElementById('home');
    if (!heroSection) return;

    console.log("[SATELLITE] Initializing weather satellite system...");

    const spawnSatellite = () => {
        // Create Satellite Container
        const sat = document.createElement('div');
        sat.className = 'weather-satellite';
        sat.title = "Satellite Météo: Lancer Analyse";

        // Random Position (Sky Area) -> Top 5% to 40%
        const topPos = Math.random() * 35 + 5;
        const leftPos = Math.random() * 80 + 10; // 10% to 90% width

        sat.style.top = `${topPos}%`;
        sat.style.left = `${leftPos}%`;

        // Random Animation Duration (Drift Speed)
        const duration = Math.random() * 5 + 8; // 8s - 13s (Slower drift)
        sat.style.animation = `drift-fade ${duration}s ease-in-out forwards`;

        // Create Crosshair Icon (REMOVED - Single Dot Design)
        // const cross = document.createElement('div');
        // cross.className = 'satellite-crosshair';
        // sat.appendChild(cross);

        // Click Interaction
        sat.onclick = (e) => {
            e.stopPropagation();
            console.log("-----------------------------------------");
            console.log("[SATELLITE] HIT! Star clicked.");

            // Visual Feedback
            sat.style.animationPlayState = 'paused';
            sat.style.filter = "drop-shadow(0 0 15px white)";

            // VOICE FEEDBACK
            if (window.speak) {
                speak("Flux météo connecté. Analyse en cours.");
            }

            // --- CRITICAL LAUNCH LOGIC ---
            console.log("[SATELLITE] Forced Launch Sequence Initiated.");

            // 1. OPEN MODAL CONTAINER (Crucial Step: Was missing before)
            const modal = document.getElementById('webcams-modal');
            if (modal) {
                modal.classList.remove('hidden');
                setTimeout(() => { modal.style.opacity = '1'; }, 10);
            }

            // 2. Force Dashboard Visible (Fail-safe)
            const dashboard = document.getElementById('weather-dashboard');
            if (dashboard) {
                console.log("[SATELLITE] Dashboard found. Forcing visible.");
                dashboard.classList.remove('hidden');
                dashboard.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else {
                console.error("[SATELLITE] CRITICAL: #weather-dashboard NOT FOUND in DOM");
            }

            // 3. Execute Data Fetch (Search vs Default)
            const searchInput = document.getElementById('webcam-search-input');

            if (searchInput && searchInput.value.trim() && typeof window.searchDestination === 'function') {
                window.searchDestination();
            } else if (typeof window.searchDestinationDefault === 'function') {
                console.log("[SATELLITE] Launching Default (QG).");
                window.searchDestinationDefault();
            } else {
                alert("Erreur Système: Module Météo introuvable.");
            }

            // Remove star after effect
            setTimeout(() => {
                sat.style.transition = "all 0.5s ease-in";
                sat.style.transform = "scale(0) rotate(180deg)";
                sat.style.opacity = "0";
                setTimeout(() => sat.remove(), 500);
            }, 1000);
        };

        // Append to Hero
        heroSection.appendChild(sat);

        // Auto-remove after animation
        setTimeout(() => {
            if (sat.parentNode) sat.remove();
        }, duration * 1000 + 100);

        // Schedule Next Appearance (Random Interval)
        const nextLaunch = Math.random() * 15000 + 10000; // 10s - 25s interval
        setTimeout(spawnSatellite, nextLaunch);
    };

    // Initial Launch
    setTimeout(spawnSatellite, 3000); // Start 3s after load
}

/* =========================================
   REAL-TIME COACH IMPLEMENTATION
   ========================================= */

function initRealTimeCoach() {
    const depInput = document.getElementById('sim-departure');
    const destInput = document.getElementById('sim-destination');

    if (depInput) monitorInputAutocomplete(depInput, 'dep');
    if (destInput) monitorInputAutocomplete(destInput, 'dest');
}

// Debounce Utility (Limit API calls)
function debounce(func, wait) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

// Monitor Logic
function monitorInput(inputElement, type) {
    const feedbackId = type === 'dep' ? 'sim-feedback-dep' : 'sim-feedback-dest';
    const feedbackEl = document.getElementById(feedbackId);

    // DEBOUNCED VALIDATION (800ms pause)
    const validate = debounce(async () => {
        const val = inputElement.value.trim();
        if (val.length < 3) {
            hideFeedback(feedbackEl);
            return;
        }

        // Silent Geocode check
        const coords = await getCoordinates(val);

        if (!coords) {
            // Optional: Don't show red error while typing, it can be annoying. 
            // Just hide previous positive feedback.
            hideFeedback(feedbackEl);
            return;
        }

        // Analyze Type
        const generalTypes = ['city', 'town', 'village', 'municipality', 'administrative'];

        let precision = 'high'; // default
        if (generalTypes.includes(coords.type)) precision = 'low'; // It's just a city/village
        else if (coords.type === 'road' || coords.type === 'residential') precision = 'medium'; // It's a street key

        // Update UI & Helper Voice
        // Helper to format name: "6 Rue..." instead of just "6"
        const parts = coords.display_name.split(',');
        let displayName = parts[0];
        if (parts.length > 1 && parts[0].length < 5) { // If "6", append "Rue de..."
            displayName = parts[0] + ' ' + parts[1];
        }

        if (precision === 'low') {
            showFeedback(feedbackEl, `🟡 Ville identifiée (${displayName}). Précisez la rue.`, 'text-yellow-400', 'border-yellow-400');
        } else if (precision === 'medium') {
            showFeedback(feedbackEl, `🟢 Rue identifiée. Ajoutez le numéro.`, 'text-neon-green', 'border-neon-green');
        } else {
            showFeedback(feedbackEl, `✅ Adresse précise : ${displayName}`, 'text-neon-green', 'border-neon-green');
        }

    }, 800);

    inputElement.addEventListener('input', () => {
        validate();
    });
}

function showFeedback(el, text, colorClass, borderClass) {
    if (!el) return;
    el.innerHTML = text;
    el.className = `mt-1 text-[10px] font-mono pl-2 border-l-2 transition-all block ${colorClass} ${borderClass}`;
    el.classList.remove('hidden');
}

function hideFeedback(el) {
    if (!el) return;
    el.classList.add('hidden');
    el.innerHTML = '';
}

// NEW AUTOCOMPLETE MONITOR (Bypassing old function)
function monitorInputAutocomplete(inputElement, type) {
    const feedbackId = type === 'dep' ? 'sim-feedback-dep' : 'sim-feedback-dest';
    const feedbackEl = document.getElementById(feedbackId);

    // DEBOUNCED AUTOCOMPLETE (400ms)
    const validate = debounce(async () => {
        const val = inputElement.value.trim();
        if (val.length < 3) {
            hideFeedback(feedbackEl);
            return;
        }

        // 1. Fetch Suggestions (Limit 3)
        try {
            // RESTRICT TO ALSACE/BADEN (Approx Box)
            // viewbox=6.0,47.3,8.5,49.0 (West, South, East, North)
            // bounded=1 (Strict restriction)
            const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(val)}&limit=3&addressdetails=1&viewbox=6.0,47.3,8.5,49.0&bounded=1`;
            const resp = await fetch(url);
            const data = await resp.json();

            if (!data || data.length === 0) {
                return;
            }

            // 2. Build Suggestion UI
            const suggestions = data.map((item) => {
                // Format Name (Smart Construction)
                // Use address object if available for better formatting
                let prettyName = parts[0];
                const addr = item.address || {};
                const house = addr.house_number || '';
                const road = addr.road || addr.pedestrian || addr.street || parts[0].split(',')[0];
                const city = addr.city || addr.town || addr.village || addr.municipality || parts[1];

                // Construct: "6 Rue du Château, Colmar"
                if (city && road && !road.includes(city)) {
                    prettyName = `${house ? house + ' ' : ''}${road}, ${city}`;
                } else {
                    // Fallback to simple split if address object is missing or ambiguous
                    if (parts.length > 1) prettyName = parts[0] + ', ' + parts[1];
                }

                // Remove trailing/leading spaces/commas
                prettyName = prettyName.replace(/^,/, '').trim();

                const desc = parts.slice(1).join(', ');

                return `
                <button type="button" class="suggestion-item text-left w-full px-2 py-1 bg-white/5 hover:bg-neon-blue/20 border border-white/10 rounded group transition-all mb-1 last:mb-0"
                    data-display="${item.display_name}"
                    data-lat="${item.lat}"
                    data-lon="${item.lon}"
                    data-pretty="${prettyName}"
                    data-type="${item.type || ''}">
                    <div class="text-neon-blue font-bold text-[10px] group-hover:text-white pointer-events-none">📍 ${prettyName}</div>
                    <div class="text-[9px] text-gray-400 pointer-events-none truncate">${desc}</div>
                </button>
                `;
            }).join('');

            feedbackEl.innerHTML = `<div class="flex flex-col mt-1">${suggestions}</div>`;
            feedbackEl.classList.remove('hidden');

            // 3. Attach Click Listeners
            const btns = feedbackEl.querySelectorAll('.suggestion-item');
            btns.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();

                    // A. Fill Input
                    inputElement.value = btn.dataset.pretty;

                    // B. Update Cache
                    if (typeof COORD_CACHE !== 'undefined') {
                        COORD_CACHE[btn.dataset.pretty.toLowerCase()] = {
                            lat: parseFloat(btn.dataset.lat),
                            lon: parseFloat(btn.dataset.lon),
                            display_name: btn.dataset.display,
                            pretty_name: btn.dataset.pretty,
                            address: {},
                            type: btn.dataset.type
                        };
                        // Update global cache with current input value as key as well
                        COORD_CACHE[inputElement.value.toLowerCase().trim()] = COORD_CACHE[btn.dataset.pretty.toLowerCase()];
                    }

                    // C. Lock UI (Show Success)
                    feedbackEl.innerHTML = `
                   <div class="mt-1 text-[10px] font-mono pl-2 border-l-2 border-neon-green text-neon-green">
                       ✅ Adresse validée
                   </div>`;
                });
            });

        } catch (e) {
            console.error("Autocomplete Error", e);
        }

    }, 400);

    inputElement.addEventListener('input', () => {
        validate();
    });
}

// --- HERO ANIMATIONS & LOGIC ---
window.initHeroAnimations = function () {
    const sloganContainer = document.getElementById('hero-slogan-container');
    const el1 = document.getElementById('typewriter-line-1');
    const el2 = document.getElementById('typewriter-line-2');

    // Text Configuration
    const line1Text = "L'art de vous transporter vers l'Avenir";
    const line2Text = "L'expérience VTC et reportage photo en Alsace";

    // Sound
    let processingSound = null;
    try {
        processingSound = new Audio('assets/sounds/processing.mp3');
        processingSound.volume = 0.2;
    } catch (e) { console.warn("Sound init failed", e); }

    // Show container with focus-in effect
    if (sloganContainer) {
        sloganContainer.classList.remove('opacity-0');
        sloganContainer.classList.remove('hidden');

        // Play sound
        if (processingSound) processingSound.play().catch(() => { });

        // GLITCH/SCAN EFFECT
        let glitchCount = 0;
        const maxGlitches = 8;

        const glitchChars = '█▓▒░01ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz@#$%&*';

        const randomText = (length) => {
            let result = '';
            for (let i = 0; i < length; i++) {
                result += glitchChars[Math.floor(Math.random() * glitchChars.length)];
            }
            return result;
        };

        const glitchInterval = setInterval(() => {
            // Random glitch text
            el1.textContent = randomText(line1Text.length);
            el2.textContent = randomText(line2Text.length);

            // Add random color shift (Keep centered with -50%)
            const shift = Math.random() * 4 - 2;
            sloganContainer.style.transform = `translateX(calc(-50% + ${shift}px))`;

            glitchCount++;

            if (glitchCount >= maxGlitches) {
                clearInterval(glitchInterval);

                // STABILIZATION - Show real text
                setTimeout(() => {
                    el1.textContent = line1Text;
                    el2.textContent = line2Text;
                    // FIX: Restore centering
                    sloganContainer.style.transform = 'translateX(-50%)';

                    // Remove blur
                    sloganContainer.style.filter = 'blur(0px)';

                    // Stop sound
                    if (processingSound) {
                        processingSound.pause();
                        processingSound.currentTime = 0;
                    }

                    // Highlight keywords after stabilization
                    setTimeout(() => {
                        const keywords1 = ['ART', 'AVENIR'];
                        const keywords2 = ['VTC', 'PHOTO', 'ALSACE'];

                        let html1 = line1Text;
                        keywords1.forEach(word => {
                            const regex = new RegExp(`(${word})`, 'gi');
                            html1 = html1.replace(regex, '<span class="text-limit-red font-bold drop-shadow-[0_0_12px_rgba(255,0,0,0.9)] animate-pulse">$1</span>');
                        });
                        el1.innerHTML = html1;

                        let html2 = line2Text;
                        keywords2.forEach(word => {
                            const regex = new RegExp(`(${word})`, 'gi');
                            html2 = html2.replace(regex, '<span class="text-limit-red font-bold drop-shadow-[0_0_12px_rgba(255,0,0,0.9)] animate-pulse">$1</span>');
                        });
                        el2.innerHTML = html2;

                        // Beep
                        const beep = new Audio('assets/sounds/voice_beep.mp3');
                        if (beep) { beep.volume = 0.3; beep.play().catch(() => { }); }
                    }, 300);
                }, 100);
            }
        }, 80); // Glitch every 80ms
    }
}

function initHeroValidation() {
    // Identity Validation (Button Glow)
    const inputs = ['hero-prenom', 'hero-nom', 'hero-phone', 'hero-email'];
    const btn = document.getElementById('btn-hero-access');
    const nameDisplay = document.getElementById('hero-display-name');
    const nameContainer = document.getElementById('hero-name-display');

    let hasWelcomed = false;

    const checkInputs = () => {
        const allFilled = inputs.every(id => {
            const input = document.getElementById(id);
            return input && input.value.trim().length > 0;
        });

        if (btn) {
            if (allFilled) {
                btn.setAttribute('data-ready', 'true');
            } else {
                btn.setAttribute('data-ready', 'false');
            }
        }
    };

    // Real-time name display and voice welcome
    const prenomInput = document.getElementById('hero-prenom');
    const nomInput = document.getElementById('hero-nom');

    if (prenomInput && nomInput && nameDisplay && nameContainer) {
        const updateNameDisplay = () => {
            const prenom = prenomInput.value.trim().toUpperCase();
            const nom = nomInput.value.trim().toUpperCase();

            if (prenom.length > 0) {
                nameDisplay.textContent = prenom;
                nameContainer.classList.remove('opacity-0');

                // Vocalize welcome when BOTH prenom AND nom are filled (3+ chars each)
                if (prenom.length >= 3 && nom.length >= 1 && !hasWelcomed) {
                    hasWelcomed = true;
                    setTimeout(() => {
                        const initial = nom.charAt(0);
                        if (window.speak) {
                            window.speak(`Bienvenue ${prenom} ${initial}`);
                        }
                    }, 500);
                }
            } else {
                nameDisplay.textContent = '';
                nameContainer.classList.add('opacity-0');
                hasWelcomed = false;
            }

            checkInputs();
        };

        prenomInput.addEventListener('input', updateNameDisplay);
        nomInput.addEventListener('input', updateNameDisplay);
    }

    inputs.forEach(id => {
        const input = document.getElementById(id);
        if (input && id !== 'hero-prenom' && id !== 'hero-nom') {
            input.addEventListener('input', checkInputs);
        }
    });

    // Trigger slogan animation on button click, then navigate
    if (btn) {
        btn.addEventListener('click', (e) => {
            e.preventDefault();

            // Check if button is ready
            if (btn.getAttribute('data-ready') === 'true') {
                // Start slogan animation
                if (window.initHeroAnimations) {
                    window.initHeroAnimations();
                }

                // Vocal guidance: Read slogan after animation stabilizes
                setTimeout(() => {
                    if (window.speak) {
                        const prenomInput = document.getElementById('hero-prenom');
                        // const nomInput = document.getElementById('hero-nom'); // User requested to NOT say the Last Name
                        let identity = "";

                        if (prenomInput && prenomInput.value.trim() !== "") {
                            identity += prenomInput.value.trim();
                        }
                        // Skipped Last Name per request

                        let textToSpeak = "";
                        if (identity !== "") {
                            textToSpeak = `${identity}. Voici IA K VENIR. L'expérience VTC et reportage photo en Alsace. L'art de vous transporter vers l'Avenir.`;
                        } else {
                            textToSpeak = "Bienvenue dans le futur. Voici IA K VENIR. L'expérience VTC et reportage photo en Alsace. L'art de vous transporter vers l'Avenir.";
                        }

                        window.speak(textToSpeak);
                    }
                }, 2000);

                // Navigate to simulator after slogan reading (8 seconds total)
                setTimeout(() => {
                    // Set flag to keep video muted when arriving from hero
                    window.fromHeroNavigation = true;

                    window.location.hash = '#simulator';
                    // Scroll to simulator
                    const simulator = document.getElementById('simulator');
                    if (simulator) {
                        simulator.scrollIntoView({ behavior: 'smooth' });
                    }
                }, 8000);
            }
        });
    }
}

// Auto-init on page load (but don't start animation automatically)
document.addEventListener('DOMContentLoaded', () => {
    initHeroValidation();
    // Animation will only start when user clicks "DESTINATION FUTUR"

    // Connect Mobile Radio Selector
    const mobileAmbianceSelector = document.getElementById('nav-ambiance-mobile');
    if (mobileAmbianceSelector) {
        mobileAmbianceSelector.addEventListener('change', (e) => {
            const ambianceKey = e.target.value;
            console.log(`[MOBILE] Ambiance changed to: ${ambianceKey}`);
            playRadio(ambianceKey);

            // Sync desktop selector
            const desktopSelector = document.getElementById('nav-ambiance');
            if (desktopSelector) desktopSelector.value = ambianceKey;
        });
        console.log('[MOBILE] Radio selector listener attached');
    }

    // Fix Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenuClose = document.getElementById('mobile-menu-close');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (mobileMenuBtn && mobileMenu) {
        // Open/close menu with hamburger button
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('translate-x-full');
            console.log('[MOBILE] Menu toggled');
        });

        // Close menu with X button
        if (mobileMenuClose) {
            mobileMenuClose.addEventListener('click', () => {
                mobileMenu.classList.add('translate-x-full');
                console.log('[MOBILE] Menu closed via X button');
            });
        }

        // Close menu when clicking on navigation links
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('translate-x-full');
                console.log('[MOBILE] Menu closed via link click');
            });
        });

        console.log('[MOBILE] Menu toggle listeners attached');
    }
});


