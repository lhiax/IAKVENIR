// WEATHER CODES MAPPING
const WMO_CODES = {
    0: 'Ciel Dégagé', 1: 'Peu Nuageux', 2: 'Partiel. Nuageux', 3: 'Couvert',
    45: 'Brouillard', 48: 'Brouillard Givrant',
    51: 'Bruine Légère', 53: 'Bruine Modérée', 55: 'Bruine Dense',
    61: 'Pluie Faible', 63: 'Pluie Modérée', 65: 'Pluie Forte',
    71: 'Neige Faible', 73: 'Neige Modérée', 75: 'Neige Forte',
    77: 'Grains de Neige', 80: 'Averses Pluie', 81: 'Averses Mod.', 82: 'Averses Viol.',
    85: 'Averses Neige', 86: 'Averses Neige Fortes', 95: 'Orage', 96: 'Orage + Grêle', 99: 'Orage Violent'
};

let currentSearchLocation = null;
let completeWeatherData = null;
let selectedDayIndex = 0;

// HELPERS
function formatDate(dateStr) {
    const d = new Date(dateStr);
    return d.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });
}

function formatTime(date) {
    return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
}

function getWeatherInfo(code) {
    const desc = WMO_CODES[code] || 'Inconnu';
    let icon = '<div class="w-full h-full bg-gray-500 rounded-full"></div>';

    // Simple mapping for icons (can be replaced with animated ones later)
    if ([0, 1].includes(code)) icon = '☀️';
    if ([2, 3].includes(code)) icon = '⛅';
    if ([45, 48].includes(code)) icon = '🌫️';
    if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) icon = '🌧️';
    if ([71, 73, 75, 77, 85, 86].includes(code)) icon = '❄️';
    if ([95, 96, 99].includes(code)) icon = '⛈️';

    return { desc, icon: getAnimatedIcon(code) };
}

// COLOR HELPERS
function getTempColorClass(temp) {
    if (temp >= 30) return 'temp-hot';
    if (temp >= 22) return 'temp-warm';
    if (temp >= 15) return 'temp-mild';
    if (temp >= 5) return 'temp-cool';
    return 'temp-cold';
}

function getWindColorClass(speed) {
    if (speed >= 60) return 'wind-danger';
    if (speed >= 40) return 'wind-strong';
    if (speed >= 20) return 'wind-moderate';
    return 'wind-calm';
}

function getPrecipColorClass(mm) {
    if (mm >= 10) return 'precip-heavy';
    if (mm >= 5) return 'precip-moderate';
    if (mm > 0) return 'precip-light';
    return 'precip-none';
}

function getHumidityColorClass(humidity) {
    if (humidity >= 70) return 'humidity-high';
    if (humidity <= 30) return 'humidity-low';
    return 'humidity-normal';
}

function getUVInfo(uv) {
    if (uv >= 11) return { label: 'EXTRÊME', class: 'uv-extreme' };
    if (uv >= 8) return { label: 'TRÈS ÉLEVÉ', class: 'uv-very-high' };
    if (uv >= 6) return { label: 'ÉLEVÉ', class: 'uv-high' };
    if (uv >= 3) return { label: 'MODÉRÉ', class: 'uv-moderate' };
    return { label: 'FAIBLE', class: 'uv-low' };
}

// ANIMATED ICONS GENERATOR (SVG)
function getAnimatedIcon(code) {
    // SUN (0, 1) - Enhanced with breathing glow effect
    if ([0, 1].includes(code)) {
        return `<svg viewBox="0 0 64 64" class="w-full h-full text-yellow-400 overflow-visible">
            <!-- Outer glow (pulsing) -->
            <circle cx="32" cy="32" r="18" fill="currentColor" opacity="0.2" class="animate-pulse-sun" />
            <!-- Core sun -->
            <circle cx="32" cy="32" r="12" fill="currentColor" class="drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
            <!-- Rotating rays -->
            <g class="animate-spin-reverse origin-center" style="transform-origin: 32px 32px;">
                ${[0, 45, 90, 135, 180, 225, 270, 315].map(rot =>
            `<rect x="30" y="4" width="4" height="10" rx="2" transform="rotate(${rot} 32 32)" fill="currentColor" opacity="0.9" />`
        ).join('')}
            </g>
        </svg>`;
    }

    // CLOUDY (2, 3) - Enhanced with layered floating clouds
    if ([2, 3].includes(code)) {
        return `<svg viewBox="0 0 64 64" class="w-full h-full text-gray-300">
            <!-- Sun peeking (for partly cloudy) -->
            <circle cx="20" cy="20" r="8" fill="#FCD34D" opacity="0.7" class="animate-pulse" />
            <!-- Back cloud (slower float) -->
            <ellipse cx="28" cy="35" rx="14" ry="9" fill="currentColor" opacity="0.4" class="animate-float-slow" />
            <!-- Front cloud (main) -->
            <path d="M18 40c-4 0-7-3-7-7s3-7 7-7c0.5 0 1 0.1 1.5 0.2C21 22 25 19 29 19c5 0 9 4 9 9 0 0.8-0.1 1.5-0.3 2.2C40 31 42 33 42 36c0 3-2.5 5-5.5 5H18z" 
                  fill="currentColor" class="drop-shadow-md animate-float" />
        </svg>`;
    }

    // RAIN (51-65, 80-82) - Enhanced with cascading droplets
    if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) {
        return `<svg viewBox="0 0 64 64" class="w-full h-full text-blue-400">
             <!-- Cloud -->
             <path d="M18 34c-4 0-7-3-7-7s3-7 7-7c0.5 0 1 0.1 1.5 0.2C21 16 25 13 29 13c5 0 9 4 9 9 0 0.8-0.1 1.5-0.3 2.2C40 25 42 27 42 30c0 3-2.5 5-5.5 5H18z" 
                   fill="#9CA3AF" opacity="0.8" />
             <!-- Rain drops (cascading animation) -->
             <g class="animate-rain">
                <line x1="18" y1="38" x2="16" y2="48" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" opacity="0.9" />
                <line x1="26" y1="38" x2="24" y2="50" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" opacity="0.9" style="animation-delay: 0.15s" />
                <line x1="34" y1="38" x2="32" y2="48" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" opacity="0.9" style="animation-delay: 0.3s" />
                <line x1="42" y1="38" x2="40" y2="50" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" opacity="0.9" style="animation-delay: 0.45s" />
             </g>
        </svg>`;
    }

    // SNOW (71-77, 85-86) - Enhanced with gentle drift
    if ([71, 73, 75, 77, 85, 86].includes(code)) {
        return `<svg viewBox="0 0 64 64" class="w-full h-full text-white">
            <!-- Cloud -->
            <path d="M18 34c-4 0-7-3-7-7s3-7 7-7c0.5 0 1 0.1 1.5 0.2C21 16 25 13 29 13c5 0 9 4 9 9 0 0.8-0.1 1.5-0.3 2.2C40 25 42 27 42 30c0 3-2.5 5-5.5 5H18z" 
                  fill="#9CA3AF" opacity="0.6" />
            <!-- Snowflakes (drifting) -->
            <g class="animate-snow-drift">
                <circle cx="18" cy="42" r="2.5" fill="currentColor" opacity="0.9" />
                <circle cx="28" cy="48" r="3" fill="currentColor" opacity="0.9" style="animation-delay: 0.3s" />
                <circle cx="38" cy="44" r="2.5" fill="currentColor" opacity="0.9" style="animation-delay: 0.6s" />
                <circle cx="48" cy="50" r="2" fill="currentColor" opacity="0.8" style="animation-delay: 0.9s" />
            </g>
        </svg>`;
    }

    // STORM (95-99) - Enhanced with dramatic lightning
    if ([95, 96, 99].includes(code)) {
        return `<svg viewBox="0 0 64 64" class="w-full h-full text-purple-400">
             <!-- Dark storm cloud -->
             <path d="M18 36c-4 0-7-3-7-7s3-7 7-7c0.5 0 1 0.1 1.5 0.2C21 18 25 15 29 15c5 0 9 4 9 9 0 0.8-0.1 1.5-0.3 2.2C40 27 42 29 42 32c0 3-2.5 5-5.5 5H18z" 
                   fill="#374151" class="drop-shadow-lg" />
             <!-- Lightning bolt (flashing) -->
             <path d="M30 34L24 44H32L28 56L40 42H32L36 34H30Z" 
                   fill="#FDE047" class="animate-lightning drop-shadow-[0_0_10px_rgba(253,224,71,0.8)]" />
        </svg>`;
    }

    // FOG (45, 48) - Enhanced with layered wave motion
    return `<svg viewBox="0 0 64 64" class="w-full h-full text-gray-400">
        <g class="animate-fog-wave">
            <path d="M8 20h48" stroke="currentColor" stroke-width="4" stroke-linecap="round" opacity="0.6" />
            <path d="M12 30h40" stroke="currentColor" stroke-width="4" stroke-linecap="round" opacity="0.7" style="animation-delay: 0.2s" />
            <path d="M10 40h44" stroke="currentColor" stroke-width="4" stroke-linecap="round" opacity="0.6" style="animation-delay: 0.4s" />
            <path d="M14 50h36" stroke="currentColor" stroke-width="4" stroke-linecap="round" opacity="0.5" style="animation-delay: 0.6s" />
        </g>
    </svg>`;
}

// ============================================
// SUN JOURNEY VISUALIZATION (Spectacular)
// ============================================
function getSunJourney(phases, now, isToday) {
    if (!phases) return '';

    const { sunrise, sunset, goldenHourMorning, goldenHourEvening } = phases;

    // Calculate positions as percentage of day (0-100)
    const dayStart = new Date(now).setHours(0, 0, 0, 0);
    const dayEnd = new Date(now).setHours(23, 59, 59, 999);
    const dayDuration = dayEnd - dayStart;

    const getPercent = (date) => ((date.getTime() - dayStart) / dayDuration) * 100;

    const sunrisePercent = getPercent(sunrise);
    const sunsetPercent = getPercent(sunset);
    const goldenMorningPercent = getPercent(goldenHourMorning);
    const goldenEveningPercent = getPercent(goldenHourEvening);
    const currentPercent = isToday ? getPercent(now) : 50;

    // Calculate sun position on arc (using sine wave for smooth arc)
    const calculateArcY = (x) => {
        const normalizedX = (x - sunrisePercent) / (sunsetPercent - sunrisePercent);
        if (normalizedX < 0 || normalizedX > 1) return 95; // Below horizon
        return 95 - (75 * 4 * normalizedX * (1 - normalizedX));
    };

    const sunY = calculateArcY(currentPercent);
    const arcPath = `M ${sunrisePercent},95 Q ${(sunrisePercent + sunsetPercent) / 2},20 ${sunsetPercent},95`;
    const isNight = isToday && (currentPercent < sunrisePercent || currentPercent > sunsetPercent);

    return `
        <svg viewBox="0 0 100 100" class="w-full h-full" preserveAspectRatio="none">
            <defs>
                <linearGradient id="skyGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" style="stop-color:#020024;stop-opacity:0.95" />
                    <stop offset="${sunrisePercent - 5}%" style="stop-color:#020024;stop-opacity:0.95" />
                    <stop offset="${sunrisePercent}%" style="stop-color:#ff4500;stop-opacity:0.6" />
                    <stop offset="${goldenMorningPercent}%" style="stop-color:#ff9d00;stop-opacity:0.4" />
                    <stop offset="50%" style="stop-color:#87ceeb;stop-opacity:0.2" />
                    <stop offset="${goldenEveningPercent}%" style="stop-color:#ff9d00;stop-opacity:0.4" />
                    <stop offset="${sunsetPercent}%" style="stop-color:#ff4500;stop-opacity:0.6" />
                    <stop offset="${sunsetPercent + 5}%" style="stop-color:#020024;stop-opacity:0.95" />
                    <stop offset="100%" style="stop-color:#020024;stop-opacity:0.95" />
                </linearGradient>
                <filter id="sunGlow">
                    <feGaussianBlur stdDeviation="3" result="blur"/>
                    <feFlood flood-color="#FFD700" flood-opacity="0.8"/>
                    <feComposite in2="blur" operator="in"/>
                    <feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge>
                </filter>
                <filter id="starGlow">
                    <feGaussianBlur stdDeviation="0.5" result="blur"/>
                    <feFlood flood-color="#ffffff" flood-opacity="0.8"/>
                    <feComposite in2="blur" operator="in"/>
                    <feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge>
                </filter>
            </defs>
            
            <rect x="0" y="0" width="100" height="100" fill="url(#skyGrad)" rx="4"/>
            
            <!-- Background Stars for Night -->
            ${isNight ? `
                <g opacity="0.4">
                    ${Array.from({ length: 15 }).map(() => {
        const x = Math.random() * 100;
        const y = Math.random() * 60;
        const r = Math.random() * 0.4 + 0.1;
        return `<circle cx="${x}" cy="${y}" r="${r}" fill="white" filter="url(#starGlow)">
                                    <animate attributeName="opacity" values="0.2;1;0.2" dur="${2 + Math.random() * 3}s" repeatCount="indefinite" />
                                </circle>`;
    }).join('')}
                    <!-- Shooting Star -->
                    <rect x="0" y="0" width="1" height="1" fill="white" filter="url(#starGlow)" class="animate-shooting-star" style="animation-delay: ${Math.random() * 10}s" />
                </g>
            ` : ''}

            <line x1="0" y1="95" x2="100" y2="95" stroke="rgba(255,255,255,0.15)" stroke-width="0.3"/>
            
            <rect x="${sunrisePercent}" y="0" width="${goldenMorningPercent - sunrisePercent}" height="100" 
                  fill="#D4AF37" opacity="0.1" />
            <rect x="${goldenEveningPercent}" y="0" width="${sunsetPercent - goldenEveningPercent}" height="100" 
                  fill="#D4AF37" opacity="0.1" />
            
            <path d="${arcPath}" fill="none" stroke="rgba(255,215,0,0.2)" stroke-width="0.5" stroke-dasharray="1,2"/>
            
            <g transform="translate(${sunrisePercent}, 95)">
                <circle r="1" fill="#ff4500" opacity="0.8"/>
                <text y="6" text-anchor="middle" font-size="2.5" fill="#ff4500" class="font-mono">LEVER</text>
            </g>
            
            <g transform="translate(${sunsetPercent}, 95)">
                <circle r="1" fill="#ff4500" opacity="0.8"/>
                <text y="6" text-anchor="middle" font-size="2.5" fill="#ff4500" class="font-mono">COUCHER</text>
            </g>
            
            ${isToday && currentPercent >= sunrisePercent && currentPercent <= sunsetPercent ? `
                <g transform="translate(${currentPercent}, ${sunY})" class="animate-pulse-sun">
                    <circle r="4" fill="#FFD700" opacity="0.2"/>
                    <circle r="2" fill="#FFD700" filter="url(#sunGlow)"/>
                </g>
            ` : ''}

            ${isToday && isNight ? `
                <g transform="translate(${currentPercent}, ${calculateArcY(currentPercent) > 90 ? 80 : calculateArcY(currentPercent)})">
                    <circle r="3" fill="#ffffff" opacity="0.2" class="animate-pulse-slow" />
                    <circle r="1.5" fill="#ffffff" filter="url(#starGlow)" />
                </g>
            ` : ''}
            
            ${isToday ? `
                <line x1="${currentPercent}" y1="0" x2="${currentPercent}" y2="100" 
                      stroke="#00d4ff" stroke-width="0.3" opacity="0.4" stroke-dasharray="2,2">
                    <animate attributeName="opacity" values="0.2;0.6;0.2" dur="3s" repeatCount="indefinite"/>
                </line>
            ` : ''}
        </svg>
    `;
}

// SOLAR ARC PAINTER - Color Temperature Timeline
function getSolarArc(phases, now) {
    if (!phases) return '';
    const { sunrise, sunset, goldenHourMorning, goldenHourEvening } = phases;
    const nowMs = now.getTime();

    // Normalize time to 0-100 range for the day
    const dayStart = new Date(now).setHours(0, 0, 0, 0);
    const dayEnd = new Date(now).setHours(23, 59, 59, 999);
    const dayDuration = dayEnd - dayStart;

    const getX = (date) => ((date.getTime() - dayStart) / dayDuration) * 100;

    const xNow = getX(now);
    const xSR = getX(sunrise);
    const xGHM = getX(goldenHourMorning);
    const xGHE = getX(goldenHourEvening);
    const xSS = getX(sunset);

    // Blue hour times (approx 40min before sunrise and after sunset)
    const blueHourMorning = new Date(sunrise.getTime() - 40 * 60 * 1000);
    const blueHourEvening = new Date(sunset.getTime() + 40 * 60 * 1000);
    const xBHM = getX(blueHourMorning);
    const xBHE = getX(blueHourEvening);

    // Only show timeline if we have valid sun times
    if (isNaN(xSR) || isNaN(xSS)) return '';

    return `
        <svg viewBox="0 0 100 100" class="w-full h-full" preserveAspectRatio="none">
            <defs>
                <!-- Gradients for different periods -->
                <linearGradient id="nightGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" style="stop-color:#1a1a2e;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#16213e;stop-opacity:1" />
                </linearGradient>
                <linearGradient id="blueHourGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" style="stop-color:#2c3e50;stop-opacity:1" />
                    <stop offset="50%" style="stop-color:#3498db;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#5dade2;stop-opacity:1" />
                </linearGradient>
                <linearGradient id="goldenHourGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" style="stop-color:#f39c12;stop-opacity:1" />
                    <stop offset="50%" style="stop-color:#D4AF37;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#f1c40f;stop-opacity:1" />
                </linearGradient>
                <linearGradient id="dayGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" style="stop-color:#87ceeb;stop-opacity:1" />
                    <stop offset="50%" style="stop-color:#ffffff;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#87ceeb;stop-opacity:1" />
                </linearGradient>
            </defs>
            
            <!-- Night (start to blue hour morning) -->
            <rect x="0" y="0" width="${xBHM}" height="100" fill="url(#nightGrad)" />
            
            <!-- Blue Hour Morning -->
            <rect x="${xBHM}" y="0" width="${xSR - xBHM}" height="100" fill="url(#blueHourGrad)" />
            
            <!-- Golden Hour Morning -->
            <rect x="${xSR}" y="0" width="${xGHM - xSR}" height="100" fill="url(#goldenHourGrad)" />
            
            <!-- Day -->
            <rect x="${xGHM}" y="0" width="${xGHE - xGHM}" height="100" fill="url(#dayGrad)" />
            
            <!-- Golden Hour Evening -->
            <rect x="${xGHE}" y="0" width="${xSS - xGHE}" height="100" fill="url(#goldenHourGrad)" />
            
            <!-- Blue Hour Evening -->
            <rect x="${xSS}" y="0" width="${xBHE - xSS}" height="100" fill="url(#blueHourGrad)" />
            
            <!-- Night (blue hour evening to end) -->
            <rect x="${xBHE}" y="0" width="${100 - xBHE}" height="100" fill="url(#nightGrad)" />
            
            <!-- Current Time Indicator -->
    ${(nowMs >= dayStart && nowMs <= dayEnd) ?
            `<line x1="${xNow}" y1="0" x2="${xNow}" y2="100" stroke="#00d4ff" stroke-width="2" opacity="0.8">
                    <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />
                </line>
                <circle cx="${xNow}" cy="50" r="4" fill="#00d4ff" class="shadow-[0_0_10px_#00d4ff]">
                    <animate attributeName="r" values="3;5;3" dur="2s" repeatCount="indefinite" />
                </circle>`
            : ''
        }
            
            <!-- Time markers -->
            <line x1="${xSR}" y1="0" x2="${xSR}" y2="100" stroke="#D4AF37" stroke-width="1" opacity="0.5" stroke-dasharray="2,2" />
            <line x1="${xSS}" y1="0" x2="${xSS}" y2="100" stroke="#D4AF37" stroke-width="1" opacity="0.5" stroke-dasharray="2,2" />
        </svg>
    `;
}

// MOON & ASTRO HELPERS
function calculateMoonPhase(date) {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    if (month < 3) { year--; month += 12; }
    const c = 365.25 * year;
    const e = 30.6 * month;
    const jd = c + e + day - 694039.09;
    let phase = jd / 29.5305882;
    phase -= Math.floor(phase);
    return Math.round(phase * 8); // 0-7 scale
}

function getMoonPhaseIcon(phaseIndex) {
    const phases = [
        { name: 'Nouvelle Lune', icon: '<div class="w-full h-full rounded-full bg-gray-800 border border-gray-700 shadow-inner animate-moon-rotate"></div>' },
        { name: 'Premier Croissant', icon: '<div class="w-full h-full rounded-full bg-gray-800 border border-gray-700 relative overflow-hidden animate-moon-rotate"><div class="absolute right-0 top-0 bottom-0 w-1/2 bg-gray-100 rounded-r-full opac-80"></div></div>' },
        { name: 'Premier Quartier', icon: '<div class="w-full h-full rounded-full bg-gradient-to-r from-gray-800 to-gray-100 border border-gray-600 animate-moon-rotate"></div>' },
        { name: 'Gibbeuse C.', icon: '<div class="w-full h-full rounded-full bg-gray-100 relative animate-moon-rotate"><div class="absolute left-0 top-0 bottom-0 w-1/4 bg-gray-800 rounded-l-full opacity-20"></div></div>' },
        { name: 'Pleine Lune', icon: '<div class="w-full h-full rounded-full bg-gray-100 shadow-[0_0_20px_white] animate-pulse-slow animate-moon-rotate"></div>' },
        { name: 'Gibbeuse D.', icon: '<div class="w-full h-full rounded-full bg-gray-100 relative animate-moon-rotate"><div class="absolute right-0 top-0 bottom-0 w-1/4 bg-gray-800 rounded-r-full opacity-20"></div></div>' },
        { name: 'Dernier Quartier', icon: '<div class="w-full h-full rounded-full bg-gradient-to-l from-gray-800 to-gray-100 border border-gray-600 animate-moon-rotate"></div>' },
        { name: 'Dernier Croissant', icon: '<div class="w-full h-full rounded-full bg-gray-800 border border-gray-700 relative overflow-hidden animate-moon-rotate"><div class="absolute left-0 top-0 bottom-0 w-1/2 bg-gray-100 rounded-l-full opac-80"></div></div>' }
    ];
    return phases[phaseIndex % 8]; // Safety
}

function getPhotoConditions(sunriseStr, sunsetStr, weatherCode, cloudCover, moonPhase) {
    const sr = new Date(sunriseStr);
    const ss = new Date(sunsetStr);
    const now = new Date();

    // "Golden Hour" is roughly 1 hour after sunrise and 1 hour before sunset
    const ghMorningEnd = new Date(sr.getTime() + 60 * 60 * 1000);
    const ghEveningStart = new Date(ss.getTime() - 60 * 60 * 1000);
    const blueHourMorningStart = new Date(sr.getTime() - 40 * 60 * 1000);
    const blueHourEveningEnd = new Date(ss.getTime() + 40 * 60 * 1000);

    let condition = "CASUAL";
    let ev = "12"; // Basic exposure value baseline
    let kelvin = "5500K";
    let quality = "MOYENNE";

    // Time Logic
    if (now >= blueHourMorningStart && now < sr) {
        condition = "HEURE BLEUE (MATIN)";
        ev = "9"; kelvin = "8000K"; quality = "MAGIQUE";
    } else if (now >= sr && now < ghMorningEnd) {
        condition = "GOLDEN HOUR (MATIN)";
        ev = "13"; kelvin = "3500K"; quality = "EXCELLENTE";
    } else if (now >= ghEveningStart && now < ss) {
        condition = "GOLDEN HOUR (SOIR)";
        ev = "13"; kelvin = "3500K"; quality = "EXCELLENTE";
    } else if (now >= ss && now < blueHourEveningEnd) {
        condition = "HEURE BLEUE (SOIR)";
        ev = "9"; kelvin = "8000K"; quality = "MAGIQUE";
    } else if (now < sr || now > ss) {
        condition = "NUIT";
        ev = "4"; kelvin = "3200K";
        // Moon logic for night
        if (moonPhase === 4 && cloudCover < 30) {
            condition = "PLEINE LUNE";
            quality = "NOCTURNE CLAIRE";
            ev = "6";
        } else if (cloudCover < 20) {
            condition = "ASTROPHOTO";
            quality = "PARFAITE";
            ev = "-2";
        }
    } else {
        // Day logic
        if ([0, 1].includes(weatherCode)) { condition = "LUMIÈRE DURE"; ev = "15"; kelvin = "5600K"; }
        else if ([2, 3].includes(weatherCode)) { condition = "DIFFUSE (NUAGEUX)"; ev = "13"; kelvin = "6500K"; quality = "DOUCE"; }
        else if ([51, 61, 80].includes(weatherCode)) { condition = "DRAMATIQUE (PLUIE)"; ev = "11"; kelvin = "6000K"; }
    }

    // Advanced Photo Metrics
    let lightDirection = "Zénith";
    let shadowQuality = "Dure";
    let ndFilter = "Aucun";

    // Starlink Logic (Toy Logic based on cloud cover)
    let starlink = "INVISIBLE";
    let starlinkBars = 0;
    let starlinkColor = "text-gray-600";
    if ((now < sr || now > ss) && cloudCover < 30) {
        starlink = "VISIBLE";
        starlinkBars = 4;
        starlinkColor = "text-green-400";
        if (cloudCover < 10) { starlink = "EXCELLENT"; starlinkBars = 5; starlinkColor = "text-neon-blue"; }
    } else if ((now < sr || now > ss) && cloudCover < 60) {
        starlink = "FAIBLE";
        starlinkBars = 2;
        starlinkColor = "text-yellow-500";
    }

    // Simple Azimuth estimation based on time relative to noon
    const noon = new Date(sr.getTime() + (ss.getTime() - sr.getTime()) / 2);
    const hoursFromNoon = (now - noon) / (1000 * 60 * 60);

    if (hoursFromNoon < -4) lightDirection = "Est (Bas)";
    else if (hoursFromNoon < -1.5) lightDirection = "Sud-Est";
    else if (hoursFromNoon < 1.5) lightDirection = "Sud (Haut)";
    else if (hoursFromNoon < 4) lightDirection = "Sud-Ouest";
    else lightDirection = "Ouest (Bas)";

    if (now < sr || now > ss) lightDirection = "N/A (Nuit)";

    // Shadow Quality
    if (cloudCover > 80) shadowQuality = "Très Douce (Diffus)";
    else if (cloudCover > 40) shadowQuality = "Douce";
    else if (Math.abs(hoursFromNoon) > 3) shadowQuality = "Allongée";
    else shadowQuality = "Dure (Contraste fort)";

    // ND Filter Suggestion based on EV
    const evNum = parseInt(ev);
    if (evNum >= 15) ndFilter = "ND8 - ND16";
    else if (evNum >= 13) ndFilter = "ND4 - ND8";
    else if (evNum >= 11) ndFilter = "ND2 - ND4";
    else ndFilter = "Aucun";

    return {
        condition, ev, kelvin, quality,
        lightDirection, shadowQuality, ndFilter,
        phases: { sunrise: sr, sunset: ss, goldenHourMorning: ghMorningEnd, goldenHourEvening: ghEveningStart },
        astro: {
            starlink, starlinkBars, starlinkColor,
            observation: (cloudCover < 20 && (now < sr || now > ss)) ? "Ciel profond possible" : "Conditions standard"
        }
    };
}

function getStarlinkIcon(bars) {
    // Generate a little signal bars SVG with animation
    const colors = ["bg-gray-700", "bg-red-500", "bg-yellow-500", "bg-green-500", "bg-neon-blue"];
    let html = '<div class="flex items-end gap-0.5 h-full">';
    for (let i = 1; i <= 5; i++) {
        const h = i * 20; // height percent
        const color = i <= bars ? (bars > 3 ? "bg-neon-blue shadow-[0_0_5px_#00d4ff] animate-signal-pulse" : "bg-green-400 animate-signal-pulse") : "bg-gray-800";
        const delay = i * 0.1; // stagger animation
        html += `<div class="${color} w-1.5 rounded-t-sm transition-all" style="height: ${h}%; animation-delay: ${delay}s"></div>`;
    }
    html += '</div>';
    return html;
}

// ASTRO PHENOMENA DETECTOR
function detectAstroPhenomena(date, cloudCover, moonPhase, lat) {
    const list = [];
    const month = date.getMonth() + 1; // 0-indexed
    const day = date.getDate();
    const now = new Date();
    const isNight = now.getHours() < 6 || now.getHours() > 20;

    // 1. Meteor Showers (Extended calendar for main showers)
    if (month === 1 && day >= 2 && day <= 5) {
        list.push({ text: "QUADRANTIDES", icon: "☄️", color: "text-cyan-400 animate-astro-alert" });
    }
    if (month === 4 && day >= 19 && day <= 25) {
        list.push({ text: "LYRIDES", icon: "✨", color: "text-yellow-300 animate-astro-alert" });
    }
    if (month === 5 && day >= 4 && day <= 7) {
        list.push({ text: "ETA AQUARIDES", icon: "💫", color: "text-blue-400 animate-astro-alert" });
    }
    if (month === 8 && day >= 10 && day <= 14) {
        list.push({ text: "PERSÉIDES ⭐", icon: "☄️", color: "text-purple-400 animate-astro-alert" });
    }
    if (month === 10 && day >= 6 && day <= 10) {
        list.push({ text: "DRACONIDES", icon: "🐉", color: "text-orange-400 animate-astro-alert" });
    }
    if (month === 10 && day >= 20 && day <= 24) {
        list.push({ text: "ORIONIDES", icon: "⭐", color: "text-green-300 animate-astro-alert" });
    }
    if (month === 11 && day >= 16 && day <= 18) {
        list.push({ text: "LÉONIDES", icon: "🦁", color: "text-amber-400 animate-astro-alert" });
    }
    if (month === 12 && day >= 10 && day <= 15) {
        list.push({ text: "GÉMINIDES 💎", icon: "✨", color: "text-blue-300 animate-astro-alert" });
    }
    if (month === 12 && day >= 17 && day <= 26) {
        list.push({ text: "URSIDES", icon: "🐻", color: "text-white animate-astro-alert" });
    }

    // 2. Supermoon (known dates for 2026 - adjust as needed)
    if (moonPhase === 4) { // Full Moon
        if ((month === 9 && day >= 15 && day <= 20) ||
            (month === 10 && day >= 17 && day <= 22) ||
            (month === 11 && day >= 15 && day <= 20)) {
            list.push({ text: "SUPER LUNE 🌕", icon: "🌕", color: "text-yellow-200 animate-pulse-slow" });
        }
    }

    // 3. Aurora Borealis - Enhanced logic for Alsace region
    // Alsace is at ~48°N, good for rare auroras during strong solar activity
    if (lat > 47 && cloudCover < 30 && isNight) {
        const auroraChance = (100 - cloudCover) / 100; // Better sky = better chance
        // Seasonal boost (more likely in winter/spring)
        const seasonalBoost = (month >= 10 || month <= 4) ? 1.5 : 1.0;

        if (Math.random() < (0.15 * auroraChance * seasonalBoost)) {
            list.push({
                text: "AURORES POSSIBLES 🌌",
                icon: "🌌",
                color: "text-green-400 animate-aurora"
            });
        }
    }

    // 4. Observation Conditions Alert
    if (cloudCover < 10 && isNight && moonPhase < 2) {
        list.push({
            text: "CIEL PARFAIT ASTROPHOTO",
            icon: "🔭",
            color: "text-neon-blue animate-pulse"
        });
    }

    // 5. Special planetary events (static demo - could be API-driven)
    if (month === 6 && day >= 1 && day <= 10) {
        list.push({ text: "ALIGNEMENT PLANÉTAIRE", icon: "🪐", color: "text-pink-400 animate-astro-alert" });
    }

    // 6. Milky Way visibility (summer months, dark skies)
    if ((month >= 6 && month <= 9) && cloudCover < 20 && moonPhase < 2 && isNight) {
        list.push({
            text: "VOIE LACTÉE VISIBLE",
            icon: "🌌",
            color: "text-purple-300 animate-pulse"
        });
    }

    return list;
}

// --- FUZZY SEARCH UTILITIES ---
function calculateLevenshtein(a, b) {
    const matrix = [];
    for (let i = 0; i <= b.length; i++) matrix[i] = [i];
    for (let j = 0; j <= a.length; j++) matrix[0][j] = j;
    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            if (b.charAt(i - 1) === a.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1));
            }
        }
    }
    return matrix[b.length][a.length];
}

function findLocalFuzzyMatch(query) {
    if (!window.LOCATIONS) return null;

    const normalizedQuery = query.toLowerCase().trim();
    let bestMatch = null;
    let minDistance = 3; // Threshold for typo correction

    // Flatten LOCATIONS categories
    Object.values(window.LOCATIONS).forEach(category => {
        category.forEach(loc => {
            const locName = loc.name.toLowerCase();

            // 0. FIRST LETTER CHECK (Performance & Accuracy Optimization)
            // Prevents "Artzenheim" matching "Baltzenheim" (Levenshtein < 3 but different start)
            if (normalizedQuery.length > 0 && locName[0] !== normalizedQuery[0]) {
                return;
            }

            // 1. Precise Match
            if (locName === normalizedQuery || locName.includes(normalizedQuery)) {
                bestMatch = loc;
                minDistance = 0;
            }
            // 2. Fuzzy Match (if not precise enough)
            const dist = calculateLevenshtein(normalizedQuery, locName);
            if (dist < minDistance) {
                minDistance = dist;
                bestMatch = loc;
            }
        });
    });

    if (bestMatch) {
        console.log(`[GEO] Fuzzy Match found: ${bestMatch.name} (Dist: ${minDistance})`);
        return {
            name: bestMatch.name,
            fullName: `${bestMatch.name}, ${bestMatch.zip}, Alsace`,
            lat: bestMatch.lat,
            lon: bestMatch.lon
        };
    }
    return null;
}

// --- DISTANCE CALCULATION (Haversine) ---
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

// API FETCHING 
async function geocodeLocation(query) {
    const QG_LAT = 48.0937, QG_LON = 7.5537;

    // 1. RIBEAUVILLE OVERRIDE (Force 68)
    const normalizedQuery = query.toLowerCase().trim();
    const ribeauvilleTypos = ['ribeauvillé', 'ribeauville', 'ribeuvillé', 'ribeuville', 'ribeauvillier', 'ribeuviller'];

    if (ribeauvilleTypos.includes(normalizedQuery)) {
        console.log('[GEO] Ribeauvillé Override Triggered (Force Dpt 68)');
        return {
            name: "Ribeauvillé",
            fullName: "Ribeauvillé, Haut-Rhin, Alsace, 68150, France",
            lat: 48.1947,
            lon: 7.3192
        };
    }

    // 2. LOCAL FUZZY SEARCH (Typo protection against LOCATIONS database)
    const localMatch = findLocalFuzzyMatch(query);
    if (localMatch) return localMatch;

    // 3. REGIONAL API SEARCH (Prioritize 200km radius around Baltzenheim)
    const viewbox = '5.0,50.0,10.0,46.0'; // Approx box for Alsace/Est France
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&viewbox=${viewbox}&bounded=0`;

    try {
        const res = await fetch(url);
        const data = await res.json();

        if (data && data.length > 0) {
            // Find first result within 200km radius
            const bestRegionalMatch = data.find(item => {
                const dist = calculateDistance(QG_LAT, QG_LON, parseFloat(item.lat), parseFloat(item.lon));
                return dist <= 200;
            });

            const finalMatch = bestRegionalMatch || data[0]; // Fallback to first result if none in 200km

            return {
                name: finalMatch.display_name.split(',')[0],
                fullName: finalMatch.display_name,
                lat: parseFloat(finalMatch.lat),
                lon: parseFloat(finalMatch.lon)
            };
        }
    } catch (e) {
        console.error('[GEO] Nominatim Error:', e);
    }
    return null;
}

async function fetchWeatherData(lat, lon) {
    // Including Minutely 15 for rain forecast
    // Using default best_match model (removed meteofrance_seamless as it changes field names)
    // Added forecast_days=14 to ensure enough data for the grid
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,rain,weather_code,cloud_cover,wind_speed_10m,wind_direction_10m,uv_index,visibility&hourly=temperature_2m,precipitation_probability,precipitation,weather_code,visibility,wind_speed_10m,uv_index,is_day,cloud_cover,relative_humidity_2m&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_sum,wind_speed_10m_max&minutely_15=precipitation&timezone=auto&forecast_days=10`;
    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error('API Météo indisponible');
        const data = await res.json();

        // Validate response structure
        console.log('API Response:', data);
        if (!data || !data.daily || !data.daily.time || !data.current) {
            console.error('Invalid API response structure:', data);
            throw new Error('Structure de données invalide');
        }

        // Check if we have the minimum required data
        if (!data.daily.time.length ||
            !data.daily.weather_code) {
            console.warn('Weather API returned partial data:', Object.keys(data.daily));
            // We proceed even if some daily fields are missing, as long as we have time and codes
        }

        if (!data.hourly ||
            !data.hourly.time ||
            !data.hourly.temperature_2m ||
            !data.hourly.weather_code ||
            !data.hourly.relative_humidity_2m ||
            !data.hourly.wind_speed_10m) {
            console.error('Missing required hourly data fields:', data.hourly ? Object.keys(data.hourly) : 'hourly object missing');
            throw new Error('Données horaires incomplètes');
        }

        return data;
    } catch (e) {
        console.error('Weather API Error:', e);
        throw e; // Rethrow to let caller handle it
    }
}

// RESTORED FUNCTION: Fetch Weather for both locations (Departure & Destination)
// This fixes the "date bug" by explicitly calculating the day index based on the user's selected date.
async function fetchBothWeatherForecasts() {
    const pickupInput = document.getElementById('res-pickup');
    const dropInput = document.getElementById('res-drop');
    const dateInput = document.getElementById('res-pickup-datetime');

    if (!pickupInput || !dropInput || !dateInput) return;

    const departureCity = pickupInput.value;
    const destinationCity = dropInput.value;
    const selectedDateStr = dateInput.value; // "YYYY-MM-DDTHH:mm"

    if (!departureCity || !destinationCity || !selectedDateStr) return;

    console.log(`[WEATHER] Fetching for: ${departureCity} -> ${destinationCity} on ${selectedDateStr}`);

    try {
        // 1. Geocode both
        const depGeo = await geocodeLocation(departureCity);
        const destGeo = await geocodeLocation(destinationCity);

        if (!depGeo || !destGeo) {
            console.warn("Geocoding failed for one of the cities.");
            return;
        }

        // 2. Fetch Weather Data
        const depWeather = await fetchWeatherData(depGeo.lat, depGeo.lon);
        const destWeather = await fetchWeatherData(destGeo.lat, destGeo.lon);

        if (!depWeather || !destWeather) return;

        // 3. Determine Day Index (0 = Today, 1 = Tomorrow, ...)
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tripDate = new Date(selectedDateStr);
        tripDate.setHours(0, 0, 0, 0);

        const diffTime = tripDate - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        // Clamp index (0 to 13 because API gives ~14 days)
        // If date is in the past, use 0 (Today). If too far future, use last available.
        let dayIndex = diffDays;
        if (dayIndex < 0) dayIndex = 0;
        if (dayIndex > 13) dayIndex = 13;

        console.log(`[WEATHER] Day Index: ${dayIndex} (Diff: ${diffDays} days)`);

        // 4. Update Global Data (for other modules)
        window.weatherDataDeparture = depWeather;
        window.weatherDataDestination = destWeather;

        // 5. Update UI (Dashboard usually shows Destination)
        renderDashboard(destWeather, destinationCity, dayIndex);

        // 6. Update Summary in Form (Departure)
        // Convert API data to simple summary format
        const daily = depWeather.daily;
        const summaryData = {
            destination: departureCity, // Showing departure weather in form summary usually
            temp: Math.round(daily.temperature_2m_max[dayIndex]),
            weatherDesc: WMO_CODES[daily.weather_code[dayIndex]] || 'Inconnu',
            weatherCode: daily.weather_code[dayIndex], // Added for icon
            windSpeed: Math.round(daily.wind_speed_10m_max[dayIndex]),
            precipProb: daily.precipitation_sum[dayIndex] > 0 ? 80 : 0, // Rough estimate if sum > 0
            lat: depGeo.lat,
            lon: depGeo.lon
        };
        // Ensure displayWeatherSummary exists in main.js or here
        if (typeof displayWeatherSummary === 'function') {
            displayWeatherSummary(summaryData);
        }

    } catch (e) {
        console.error("Error in fetchBothWeatherForecasts:", e);
    }
}

// Expose to window
window.fetchBothWeatherForecasts = fetchBothWeatherForecasts;
window.geocodeLocation = geocodeLocation; // Ensure exposed



// --- RENDERERS (STYLE FUTURISTE / CYBERPUNK) ---

function renderDashboard(data, locationName, dayIndex = 0) {
    const dashboardRoot = document.getElementById('weather-dashboard');
    if (!dashboardRoot) return;

    try {
        // --- DATA PREPARATION ---
        const daily = data.daily;
        const isToday = dayIndex === 0;
        const dateObj = new Date(daily.time[dayIndex]);
        const now = new Date();

        // Current weather data
        const currentTemp = isToday ? Math.round(data.current.temperature_2m) : Math.round(daily.temperature_2m_max[dayIndex]);
        const currentCode = isToday ? data.current.weather_code : daily.weather_code[dayIndex];
        const currentDesc = (WMO_CODES[currentCode] || 'Variable');
        const currentIcon = getAnimatedIcon(currentCode);

        const maxTemp = Math.round(daily.temperature_2m_max[dayIndex]);
        const minTemp = Math.round(daily.temperature_2m_min[dayIndex]);
        const apparentTemp = isToday ? Math.round(data.current.apparent_temperature) : null;

        // Metrics data
        const windSpeed = Math.round(daily.wind_speed_10m_max[dayIndex]);
        const humidity = isToday ? data.current.relative_humidity_2m : 65;
        const uvIndex = daily.uv_index_max[dayIndex];
        const precipitation = daily.precipitation_sum[dayIndex];

        // Color classes
        const tempClass = getTempColorClass(currentTemp);
        const windClass = getWindColorClass(windSpeed);
        const precipClass = getPrecipColorClass(precipitation);
        const humidityClass = getHumidityColorClass(humidity);
        const uvInfo = getUVInfo(uvIndex);

        // Moon Phase & Photo Conditions
        const moonPhase = calculateMoonPhase(dateObj);
        const moonInfo = getMoonPhaseIcon(moonPhase);
        const cloudCover = daily.precipitation_sum[dayIndex] > 0 ? 80 : 20;
        const photo = getPhotoConditions(daily.sunrise[dayIndex], daily.sunset[dayIndex], daily.weather_code[dayIndex], cloudCover, moonPhase);

        // --- MAIN RENDER (OPTIMIZED FULLSCREEN LAYOUT) ---
        dashboardRoot.innerHTML = `
            <!-- Optimized Weather Dashboard - No Double Scrollbar -->
            <div class="h-full flex flex-col overflow-hidden">
                
                <!-- FIXED HEADER -->
                <div class="flex-shrink-0 px-3 md:px-4 pt-4 pb-3 border-b border-white/10 animate-fade-in-up">
                    <h1 class="text-3xl lg:text-4xl font-bold text-white mb-1">${locationName}</h1>
                    <p class="text-sm lg:text-base text-gray-400 font-mono">
                        ${isToday ? 'Aujourd\'hui' : formatDate(dateObj)} · ${formatTime(now)}
                    </p>
                </div>

                <!-- SCROLLABLE CONTENT (SINGLE SCROLL) -->
                <div class="flex-1 overflow-y-auto px-3 md:px-4 py-4">
                    <!-- RESPONSIVE GRID LAYOUT -->
                    <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-5">
                    
                    <!-- COLUMN 1: HERO WEATHER CARD -->
                    <div class="weather-hero-card">
                        <!-- Current Weather -->
                        <div class="flex items-center justify-between">
                            <div class="flex-1">
                                <div class="flex items-baseline gap-2">
                                    <span class="text-7xl md:text-8xl font-bold ${tempClass}">${currentTemp}°</span>
                                    <span class="text-3xl text-gray-400">C</span>
                                </div>
                                <p class="text-xl lg:text-2xl text-white/80 mt-2">${currentDesc}</p>
                                <div class="flex items-center gap-4 mt-3 text-base lg:text-lg text-gray-400">
                                    <span class="${getTempColorClass(maxTemp)}">↑ ${maxTemp}°</span>
                                    <span class="${getTempColorClass(minTemp)}">↓ ${minTemp}°</span>
                                    ${apparentTemp !== null ? `<span class="text-xs">Ressenti ${apparentTemp}°</span>` : ''}
                                </div>
                            </div>
                            
                            <!-- Weather Icon -->
                            <div class="w-28 h-28 md:w-32 md:h-32 lg:w-36 lg:h-36">
                                ${currentIcon}
                            </div>
                        </div>

                        <!-- Hourly Forecast Mini Strip -->
                        <div class="border-t border-white/10 pt-3">
                            <p class="metric-label mb-2">Prévisions Horaires (24h)</p>
                            <div id="hourly-mini-strip" class="hourly-mini-strip">
                                <!-- Injected by renderHourlyMini -->
                            </div>
                        </div>
                    </div>

                    <!-- COLUMN 2: COMPACT METRICS -->
                    <div class="flex flex-col gap-3">
                        
                        <!-- WIND -->
                        <div class="weather-metric-compact">
                            <div class="flex items-center justify-between">
                                <span class="metric-label">💨 Vent</span>
                                <span class="text-2xl">💨</span>
                            </div>
                            <div class="flex items-baseline gap-1">
                                <span class="text-4xl lg:text-5xl font-bold ${windClass}">${windSpeed}</span>
                                <span class="text-lg text-gray-400">km/h</span>
                            </div>
                            <div class="metric-progress">
                                <div class="metric-progress-fill ${windClass}" style="width: ${Math.min(windSpeed / 100 * 100, 100)}%; background: currentColor;"></div>
                            </div>
                        </div>

                        <!-- HUMIDITY -->
                        <div class="weather-metric-compact">
                            <div class="flex items-center justify-between">
                                <span class="metric-label">💧 Humidité</span>
                                <span class="text-2xl">💧</span>
                            </div>
                            <div class="flex items-baseline gap-1">
                                <span class="text-4xl lg:text-5xl font-bold ${humidityClass}">${humidity}</span>
                                <span class="text-lg text-gray-400">%</span>
                            </div>
                            <div class="metric-progress">
                                <div class="metric-progress-fill ${humidityClass}" style="width: ${humidity}%; background: currentColor;"></div>
                            </div>
                        </div>

                        <!-- UV INDEX -->
                        <div class="weather-metric-compact">
                            <div class="flex items-center justify-between">
                                <span class="metric-label">☀️ Indice UV</span>
                                <span class="text-2xl">☀️</span>
                            </div>
                            <div class="flex items-baseline gap-1">
                                <span class="text-4xl lg:text-5xl font-bold ${uvInfo.class}">${uvIndex.toFixed(0)}</span>
                                <span class="text-lg text-gray-400">${uvInfo.label}</span>
                            </div>
                            <div class="metric-progress">
                                <div class="metric-progress-fill ${uvInfo.class}" style="width: ${Math.min(uvIndex / 11 * 100, 100)}%; background: currentColor;"></div>
                            </div>
                        </div>

                        <!-- PRECIPITATION -->
                        <div class="weather-metric-compact">
                            <div class="flex items-center justify-between">
                                <span class="metric-label">☔ Précipitations</span>
                                <span class="text-2xl">☔</span>
                            </div>
                            <div class="flex items-baseline gap-1">
                                <span class="text-4xl lg:text-5xl font-bold ${precipClass}">${precipitation.toFixed(1)}</span>
                                <span class="text-lg text-gray-400">mm</span>
                            </div>
                            <div class="metric-progress">
                                <div class="metric-progress-fill ${precipClass}" style="width: ${Math.min(precipitation / 50 * 100, 100)}%; background: currentColor;"></div>
                            </div>
                        </div>
                    </div>

                    <!-- COLUMN 3: PHOTO CONDITIONS PANEL -->
                    <div class="photo-conditions-panel">
                        <!-- Header -->
                        <div class="border-b border-gold/20 pb-3 mb-4">
                            <div class="flex items-center gap-2 mb-2">
                                <span class="text-3xl">📸</span>
                                <h3 class="text-base lg:text-lg font-bold text-white uppercase tracking-wider">Assistant Photo</h3>
                            </div>
                            <p class="text-sm lg:text-base text-gold font-mono font-semibold">${photo.condition}</p>
                        </div>

                        <!-- Photo Metrics Grid -->
                        <div class="grid grid-cols-2 gap-3 mb-4">
                            <!-- EV Value -->
                            <div class="text-center bg-black/30 rounded-lg p-3 border border-gold/10">
                                <p class="metric-label mb-1">EXPOSITION</p>
                                <p class="text-3xl lg:text-4xl font-bold text-gold">EV${photo.ev}</p>
                            </div>

                            <!-- Color Temperature -->
                            <div class="text-center bg-black/30 rounded-lg p-3 border border-gold/10">
                                <p class="metric-label mb-1">TEMPÉRATURE</p>
                                <p class="text-2xl lg:text-3xl font-bold text-gold">${photo.kelvin}</p>
                            </div>
                        </div>

                        <!-- Sun Times -->
                        <div class="grid grid-cols-2 gap-2 mb-4 text-xs">
                            <div class="bg-black/30 rounded p-2.5 border border-white/5">
                                <p class="text-gray-400 mb-1">🌅 Lever</p>
                                <p class="text-base lg:text-lg text-white font-semibold font-mono">${formatTime(photo.phases.sunrise)}</p>
                            </div>
                            <div class="bg-black/30 rounded p-2.5 border border-white/5">
                                <p class="text-gray-400 mb-1">🌇 Coucher</p>
                                <p class="text-base lg:text-lg text-white font-semibold font-mono">${formatTime(photo.phases.sunset)}</p>
                            </div>
                        </div>


                        <!-- VOYAGE DU SOLEIL section removed per user request -->

                        <!-- ASTRONOMICAL PHENOMENA -->
                        ${(() => {
                const lat = currentSearchLocation ? currentSearchLocation.lat : 48.0;
                const astroPhenomena = detectAstroPhenomena(dateObj, cloudCover, moonPhase, lat);

                if (astroPhenomena.length === 0) return '';

                return `
                                <div class="bg-black/30 rounded-lg p-3 border border-purple-500/20 mb-4">
                                    <div class="flex items-center gap-2 mb-3">
                                        <span class="text-xl">🌌</span>
                                        <h4 class="text-xs font-bold text-purple-300 uppercase tracking-wider">Phénomènes Astraux</h4>
                                    </div>
                                    <div class="space-y-2">
                                        ${astroPhenomena.map(p => `
                                            <div class="flex items-center gap-2 bg-black/40 rounded p-2 border border-white/5 hover:border-purple-400/30 transition-all">
                                                <span class="text-base flex-shrink-0">${p.icon}</span>
                                                <span class="text-[10px] font-semibold ${p.color} flex-1 leading-tight">${p.text}</span>
                                            </div>
                                        `).join('')}
                                    </div>
                                </div>
                            `;
            })()}

                        <!-- Moon & Starlink -->
                        <div class="grid grid-cols-2 gap-2 text-xs">
                            <div class="bg-black/30 rounded-lg p-2.5 text-center border border-white/5">
                                <p class="text-gray-400 mb-1.5 text-[10px]">Phase Lunaire</p>
                                <div class="w-12 h-12 lg:w-14 lg:h-14 mx-auto mb-1.5">${moonInfo.icon}</div>
                                <p class="text-white text-[10px] font-semibold">${moonInfo.name}</p>
                            </div>
                            <div class="bg-black/30 rounded-lg p-2.5 text-center border border-white/5">
                                <p class="text-gray-400 mb-1.5 text-[10px]">Visibilité Starlink</p>
                                <div class="w-12 h-10 lg:w-14 lg:h-12 mx-auto mb-1.5 flex items-end justify-center gap-0.5">
                                    ${getStarlinkIcon(photo.astro.starlinkBars)}
                                </div>
                                <p class="${photo.astro.starlinkColor} text-[10px] font-semibold">${photo.astro.starlink}</p>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>

            <!-- STICKY FOOTER: 10-DAY FORECAST -->
            <div class="flex-shrink-0 border-t border-white/10 px-3 md:px-4 py-3 bg-black/30 backdrop-blur-sm animate-fade-in-up delay-300">
                <p class="text-sm lg:text-base font-bold text-white/70 uppercase tracking-wider mb-3">Prévisions 10 Jours</p>
                <div id="forecast-horizontal" class="forecast-horizontal flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2">
                    <!-- Injected by renderForecastHorizontal -->
                </div>
            </div>
        </div>
        `;

        // Render Sub-components
        renderHourlyMini(data, dayIndex);
        renderForecastHorizontal(data, dayIndex);

    } catch (e) {
        console.error("Dashboard Render Error:", e);
        dashboardRoot.innerHTML = `
            <div class="flex flex-col items-center justify-center h-full text-red-400 p-4 text-center">
                <span class="text-3xl mb-2">⚠️</span>
                <p class="font-bold">Erreur Affichage Météo</p>
                <p class="text-xs mt-2 opacity-70">${e.message}</p>
                <button onclick="location.reload()" class="mt-4 px-4 py-2 border border-red-400 hover:bg-red-400/20 text-xs uppercase rounded">Reload</button>
            </div>
        `;
    }
}


// Render Hourly Forecast Mini Strip (for hero card)
function renderHourlyMini(data, dayIndex) {
    const container = document.getElementById('hourly-mini-strip');
    if (!container) return;

    const hourly = data.hourly;
    const daily = data.daily;
    const startIndex = dayIndex * 24;
    const now = new Date();
    const currentHour = now.getHours();
    const isToday = dayIndex === 0;

    // Get sun phases for highlighting
    const dateObj = new Date(daily.time[dayIndex]);
    const sunrise = new Date(daily.sunrise[dayIndex]);
    const sunset = new Date(daily.sunset[dayIndex]);
    const goldenMorningEnd = new Date(sunrise.getTime() + 60 * 60 * 1000); // 1h after sunrise
    const goldenEveningStart = new Date(sunset.getTime() - 60 * 60 * 1000); // 1h before sunset

    let html = '';

    // Display all 24 hours
    for (let i = startIndex; i < startIndex + 24; i++) {
        if (!hourly.time[i]) continue;

        const timeStr = hourly.time[i];
        const date = new Date(timeStr);
        const hour = date.getHours();

        // Skip past hours if today
        // if (isToday && hour < currentHour) continue; // Removed to show all 24h

        const temp = hourly.temperature_2m[i];
        const weatherInfo = getWeatherInfo(hourly.weather_code[i]);
        const precipProb = hourly.precipitation_probability[i];
        const isCurrentHour = isToday && hour === currentHour;

        // Check if this hour is special
        const hourTime = date.getTime();
        const isSunrise = Math.abs(hourTime - sunrise.getTime()) < 30 * 60 * 1000; // Within 30min
        const isSunset = Math.abs(hourTime - sunset.getTime()) < 30 * 60 * 1000;
        const isGoldenMorning = hourTime >= sunrise.getTime() && hourTime <= goldenMorningEnd.getTime();
        const isGoldenEvening = hourTime >= goldenEveningStart.getTime() && hourTime <= sunset.getTime();

        // Check drone compliance for this hour
        const droneCheck = getDroneCompliance(sunrise, sunset, hourly.weather_code[i], hourly.wind_speed_10m[i], precipProb, hourly.cloud_cover[i], hour);

        let badge = '';
        let borderClass = 'border-white/10';

        // Priority: Drone status determines border color
        if (droneCheck.status === 'AUTORISÉ') {
            badge = '<div class="absolute -top-1 -left-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-[10px] shadow-lg" title="Vol drone autorisé">🚁</div>';
            borderClass = 'border-green-500/50';
        } else if (droneCheck.status === 'ATTENTION') {
            badge = '<div class="absolute -top-1 -left-1 w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center text-[10px] shadow-lg" title="Vol drone: vigilance requise">⚠️</div>';
            borderClass = 'border-yellow-500/50';
        }
        // RED BADGE REMOVED per user request


        // Add sun/golden hour badges on the right
        if (isSunrise) {
            badge += '<div class="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 rounded-full flex items-center justify-center text-[8px]">🌅</div>';
        } else if (isSunset) {
            badge += '<div class="absolute -top-1 -right-1 w-4 h-4 bg-orange-600 rounded-full flex items-center justify-center text-[8px]">🌇</div>';
        } else if (isGoldenMorning || isGoldenEvening) {
            badge += '<div class="absolute -top-1 -right-1 w-4 h-4 bg-gold rounded-full flex items-center justify-center text-[8px]">✨</div>';
        }


        html += `
            <div onclick="selectHourlySlot(${i}, ${dayIndex})" 
                 class="hourly-mini-card ${isCurrentHour ? 'current' : ''} ${borderClass} cursor-pointer hover:scale-105 hover:border-neon-blue transition-all relative group"
                 title="Cliquer pour voir les détails">
                ${badge}
                <p class="text-xs text-gray-300 font-bold mb-1">${hour === 0 ? '00h' : hour + 'h'}</p>
                <div class="w-10 h-10 text-base mb-1">${weatherInfo.icon}</div>
                ${precipProb > 0 ? `<p class="text-[11px] text-blue-400 font-semibold">${precipProb}%</p>` : '<p class="text-[11px] text-transparent">-</p>'}
                <p class="text-base font-bold ${getTempColorClass(Math.round(temp))}">${Math.round(temp)}°</p>
                <div class="absolute inset-0 bg-neon-blue/0 group-hover:bg-neon-blue/10 rounded transition-all pointer-events-none"></div>
            </div>
        `;
    }

    container.innerHTML = html || '<p class="text-gray-500 text-sm p-4">Aucune donnée horaire disponible</p>';
}


// Drone Flight Compliance Check (European Regulations)
function getDroneCompliance(sunrise, sunset, weatherCode, windSpeed, precipProb, cloudCover, hour) {
    const now = new Date();
    const currentHour = new Date(now.setHours(hour, 0, 0, 0));

    // European regulations (EASA Open Category):
    // - Day flight: Allowed (Sunrise - 30m to Sunset + 30m)
    // - Night flight: Allowed IF drone has flashing green light

    // Aeronautical Day Definition
    const aeroDayStart = new Date(sunrise.getTime() - 30 * 60 * 1000);
    const aeroDayEnd = new Date(sunset.getTime() + 30 * 60 * 1000);

    const isAeroDay = currentHour >= aeroDayStart && currentHour <= aeroDayEnd;

    // Weather conditions check
    const windOk = windSpeed < 40;
    const precipOk = precipProb < 30;
    const visibilityOk = cloudCover < 80;

    // Weather codes that prevent flight
    const dangerousWeather = [95, 96, 99]; // Thunderstorms
    const weatherOk = !dangerousWeather.includes(weatherCode);

    // Initial status
    let status = 'INTERDIT';
    let statusColor = 'text-red-500';
    let icon = '🚫';
    let reasons = [];
    let requirements = []; // New field for specific equipment/conditions

    // Logic Tree
    if (!weatherOk || !windOk) {
        // Critical weather failure
        status = 'DANGER MÉTÉO';
        statusColor = 'text-red-500';
        icon = '🚫';
        if (!windOk) reasons.push(`Vent violent (${Math.round(windSpeed)} km/h)`);
        if (!weatherOk) reasons.push('Orages détectés');
    } else if (!precipOk || !visibilityOk) {
        // Non-critical weather warning
        status = 'DÉCONSEILLÉ';
        statusColor = 'text-orange-500';
        icon = '⚠️';
        if (!precipOk) reasons.push(`Pluie probable (${precipProb}%)`);
        if (!visibilityOk) reasons.push('Mauvaise visibilité');
    } else {
        // Weather is OK
        if (isAeroDay) {
            status = 'AUTORISÉ';
            statusColor = 'text-green-500';
            icon = '✅';
            reasons.push('Conditions de vol optimales');
        } else {
            // Night flight
            status = 'VOL DE NUIT';
            statusColor = 'text-blue-400';
            icon = '🌙';
            reasons.push('Nuit Aéronautique');
            requirements.push('Feu vert clignotant REQUIS');
            requirements.push('Contact visuel permanent');
        }
    }

    // Satellite Estimation (Fake logic based on cloud cover/visibility)
    // Clearer sky = potentially better signal reception (less interference)
    let satellites = Math.max(0, Math.floor(12 + (1.0 - (cloudCover / 100)) * 10)); // 12 to 22 sats

    // Kp Index (Planetary K-index) - SIMULATED (Random for demo, usually from API)
    // In a real app, this would come from the API.
    // We'll base it slightly on lat to make it deterministic for the same location
    const kpIndex = Math.floor(Math.random() * 4) + 1; // 1-4 range

    return {
        isCompliant: status !== 'DANGER MÉTÉO',
        status,
        statusColor,
        icon,
        reasons,
        requirements,
        satellites,
        kpIndex,
        flightWindow: {
            start: aeroDayStart,
            end: aeroDayEnd,
            isDay: isAeroDay
        },
        conditions: {
            wind: { value: windSpeed, ok: windOk },
            precip: { value: precipProb, ok: precipOk },
            visibility: { value: cloudCover, ok: visibilityOk },
            weather: { ok: weatherOk }
        }
    };
}

// NEW: Select hourly slot and update photo assistant
function selectHourlySlot(hourlyIndex, dayIndex) {
    if (!completeWeatherData) return;

    const hourly = completeWeatherData.hourly;
    const daily = completeWeatherData.daily;

    const timeStr = hourly.time[hourlyIndex];
    const date = new Date(timeStr);
    const hour = date.getHours();

    const temp = hourly.temperature_2m[hourlyIndex];
    const weatherCode = hourly.weather_code[hourlyIndex];
    const weatherInfo = getWeatherInfo(weatherCode);
    const precipProb = hourly.precipitation_probability[hourlyIndex];
    const windSpeed = hourly.wind_speed_10m[hourlyIndex];
    const humidity = hourly.relative_humidity_2m[hourlyIndex];
    const cloudCover = hourly.cloud_cover[hourlyIndex];

    // Calculate moon phase
    const moonPhase = calculateMoonPhase(date);
    const moonInfo = getMoonPhaseIcon(moonPhase);

    // Get photo conditions for this specific hour
    const sunrise = daily.sunrise[dayIndex];
    const sunset = daily.sunset[dayIndex];
    const photo = getPhotoConditions(sunrise, sunset, weatherCode, cloudCover, moonPhase);

    // Store selection globally
    window.selectedPhotoSlot = {
        dayIndex,
        hourlyIndex,
        hour,
        date: timeStr,
        temp,
        weatherCode,
        cloudCover,
        precipProb,
        windSpeed,
        humidity,
        photo,
        weatherInfo
    };

    // Update photo assistant panel
    updatePhotoAssistantPanel();

    // Visual feedback
    const dateStr = date.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });
    if (window.speak) {
        speak(`Créneau sélectionné : ${dateStr} à ${hour} heures. ${photo.condition}.`);
    }

    // Highlight selected slot
    document.querySelectorAll('.hourly-mini-card').forEach((card) => {
        card.classList.remove('ring-2', 'ring-neon-blue', 'ring-offset-2', 'ring-offset-black');
    });
    event.currentTarget.classList.add('ring-2', 'ring-neon-blue', 'ring-offset-2', 'ring-offset-black');
}

// Update Photo Assistant Panel with selected slot data
function updatePhotoAssistantPanel() {
    if (!window.selectedPhotoSlot) {
        console.log('❌ No slot selected');
        return;
    }

    const slot = window.selectedPhotoSlot;
    // Calculate compliance again for display
    const daily = completeWeatherData.daily;
    const sunrise = daily.sunrise[slot.dayIndex];
    const sunset = daily.sunset[slot.dayIndex];
    const drone = getDroneCompliance(sunrise, sunset, slot.weatherCode, slot.windSpeed, slot.precipProb, slot.cloudCover, slot.hour);

    const dateObj = new Date(slot.date);
    const dateStr = dateObj.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });

    console.log('🔄 Updating photo assistant for:', dateStr, 'at', slot.hour + 'h');
    console.log('📊 Slot data:', slot);

    // Update header with date/time
    const headerEl = document.querySelector('.photo-conditions-panel .border-b');
    if (headerEl) {
        headerEl.innerHTML = `
            <div class="flex items-center gap-2 mb-2">
                <span class="text-3xl">📸</span>
                <h3 class="text-base lg:text-lg font-bold text-white uppercase tracking-wider">Assistant Photo</h3>
            </div>
            <p class="text-sm lg:text-base text-gold font-mono font-semibold">${slot.photo.condition}</p>
            <div class="mt-2 flex items-center gap-2 text-xs lg:text-sm text-neon-blue animate-pulse">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span class="font-semibold">${dateStr} à ${slot.hour}h</span>
            </div>
        `;
        console.log('✅ Header updated');
    } else {
        console.log('❌ Header element not found');
    }

    // Update EV and Kelvin - Find the first grid in photo panel
    const photoPanel = document.querySelector('.photo-conditions-panel');
    if (photoPanel) {
        const grids = photoPanel.querySelectorAll('.grid.grid-cols-2');
        if (grids.length > 0) {
            const photoMetrics = grids[0];
            photoMetrics.innerHTML = `
                <div class="text-center bg-black/30 rounded-lg p-4 border border-gold/10">
                    <p class="text-xs lg:text-sm text-gray-400 uppercase mb-2">Exposition</p>
                    <p class="text-3xl lg:text-4xl font-bold text-gold">EV${slot.photo.ev}</p>
                </div>
                <div class="text-center bg-black/30 rounded-lg p-4 border border-gold/10">
                    <p class="text-xs lg:text-sm text-gray-400 uppercase mb-2">Température</p>
                    <p class="text-2xl lg:text-3xl font-bold text-gold">${slot.photo.kelvin}K</p>
                </div>
            `;
            console.log('✅ EV/Kelvin updated:', slot.photo.ev, slot.photo.kelvin);
        } else {
            console.log('❌ Photo metrics grid not found');
        }

        // Add/Update detailed conditions after sun times
        if (grids.length > 1) {
            const sunTimes = grids[1];

            // Remove old details if exists
            let nextEl = sunTimes.nextElementSibling;
            while (nextEl && nextEl.classList.contains('bg-neon-blue/10')) {
                const toRemove = nextEl;
                nextEl = nextEl.nextElementSibling;
                toRemove.remove();
                console.log('🗑️ Removed old details');
            }

            // Insert new details
            const detailsHTML = `
            <div class="bg-black/40 border border-white/10 rounded-lg p-3 mb-4 animate-fade-in shadow-inner">
                <p class="text-xs lg:text-sm font-bold text-white uppercase mb-3 flex items-center justify-between">
                    <span class="flex items-center gap-2">
                        <svg class="w-4 h-4 text-neon-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        Info Pilote Drone
                    </span>
                    <span class="text-[10px] font-mono text-gray-500">Réglementation EASA</span>
                </p>

                <!-- Main Status -->
                <div class="flex items-center justify-between mb-3 bg-white/5 p-2 rounded border border-white/5">
                    <span class="text-gray-300 text-xs">Statut estimé:</span>
                    <span class="${drone.statusColor} font-bold text-sm flex items-center gap-2">${drone.icon} ${drone.status}</span>
                </div>

                <div class="grid grid-cols-2 gap-2 text-xs">
                    <!-- Jour Aéronautique Info -->
                    <div class="col-span-2 mb-1">
                        <div class="flex justify-between text-[10px] text-gray-400 font-mono bg-black/30 rounded px-2 py-1.5 border border-white/5">
                            <span title="Jour Aéronautique Début">☀️ Jour Aéro: <span class="text-white">${formatTime(drone.flightWindow.start)}</span></span>
                            <span title="Jour Aéronautique Fin">🌙 Fin: <span class="text-white">${formatTime(drone.flightWindow.end)}</span></span>
                        </div>
                    </div>

                    <!-- Reasons & Requirements -->
                    ${drone.reasons.length > 0 ? `
                            <div class="col-span-2">
                                <p class="text-[10px] text-gray-400 mb-1">Analyse:</p>
                                ${drone.reasons.map(r => `<p class="text-[11px] text-gray-200 pl-2 border-l-2 ${drone.status === 'AUTORISÉ' ? 'border-green-500' : 'border-red-400'} mb-1">${r}</p>`).join('')}
                            </div>
                         ` : ''}

                     ${drone.requirements && drone.requirements.length > 0 ? `
                        <div class="col-span-2 mt-1 bg-blue-500/10 p-2 rounded border border-blue-500/20">
                            <p class="text-[10px] text-blue-300 font-bold mb-1 uppercase">Équipement Requis:</p>
                            ${drone.requirements.map(req => `<div class="flex items-center gap-1.5"><span class="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span><p class="text-[10px] text-blue-100">${req}</p></div>`).join('')}
                        </div>
                     ` : ''}
                </div>
                
                <!-- PRO TECHNICAL DATA (New Section) -->
                <div class="grid grid-cols-2 gap-3 mt-4 border-t border-white/10 pt-3">
                    <!-- Photo Tech -->
                    <div class="bg-black/30 p-2 rounded border border-white/5">
                        <p class="text-[10px] text-gold font-bold uppercase mb-1">Photo Pro</p>
                        <ul class="text-[10px] space-y-1 text-gray-300">
                            <li class="flex justify-between"><span>Lumière:</span> <span class="text-white">${slot.photo.lightDirection}</span></li>
                            <li class="flex justify-between"><span>Ombres:</span> <span class="text-white">${slot.photo.shadowQuality}</span></li>
                            <li class="flex justify-between"><span>Filtre ND:</span> <span class="text-white">${slot.photo.ndFilter}</span></li>
                        </ul>
                    </div>
                    <!-- Drone Tech -->
                    <div class="bg-black/30 p-2 rounded border border-white/5">
                        <p class="text-[10px] text-neon-blue font-bold uppercase mb-1">Drone Tech</p>
                        <ul class="text-[10px] space-y-1 text-gray-300">
                            <li class="flex justify-between"><span>Sats GPS:</span> <span class="text-white">~${drone.satellites}</span></li>
                            <li class="flex justify-between"><span>Indice Kp:</span> <span class="text-white">${drone.kpIndex}/9</span></li>
                            <li class="flex justify-between"><span>Turbulence:</span> <span class="text-white">${slot.windSpeed > 20 ? 'Moyenne' : 'Faible'}</span></li>
                        </ul>
                    </div>
                </div>

            </div>
            `;

            sunTimes.insertAdjacentHTML('afterend', detailsHTML);
            console.log('✅ Detailed conditions added');
        }
    } else {
        console.log('❌ Photo panel not found');
    }

    console.log('✅ Photo assistant update complete');
}


// Render 10-Day Forecast Horizontal
function renderForecastHorizontal(data, selectedIdx) {
    const container = document.getElementById('forecast-horizontal');
    if (!container) return;

    const daily = data.daily;
    let html = '';

    for (let i = 0; i < Math.min(daily.time.length, 10); i++) {
        const date = daily.time[i];
        const maxTemp = daily.temperature_2m_max[i];
        const minTemp = daily.temperature_2m_min[i];
        // FIX: Use current weather code for today (i=0), daily for other days
        const weatherCode = (i === 0 && data.current) ? data.current.weather_code : daily.weather_code[i];
        const weatherInfo = getWeatherInfo(weatherCode);
        const precip = daily.precipitation_sum[i];
        const isSelected = i === selectedIdx;

        const dateObj = new Date(date);
        const dayName = i === 0 ? 'Auj.' : dateObj.toLocaleDateString('fr-FR', { weekday: 'short' });
        const dayDate = dateObj.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });

        html += `
                <div onclick="selectDay(${i})" class="forecast-day-card ${isSelected ? 'selected' : ''} min-w-[7rem] flex-shrink-0 cursor-pointer hover:scale-105 transition-all">
                <p class="text-sm font-bold text-white capitalize mb-1">${dayName}</p>
                <p class="text-xs text-gray-400 mb-2">${dayDate}</p>
                <div class="w-14 h-14 my-2 mx-auto">${weatherInfo.icon}</div>
                ${precip > 0 ? `<p class="text-xs text-blue-400 font-semibold mb-1">💧${precip.toFixed(1)}mm</p>` : '<p class="text-xs text-transparent mb-1">-</p>'}
            <div class="flex items-center justify-center gap-2 text-base font-bold">
                <span class="${getTempColorClass(Math.round(minTemp))}">${Math.round(minTemp)}°</span>
                <span class="text-gray-500">|</span>
                <span class="${getTempColorClass(Math.round(maxTemp))}">${Math.round(maxTemp)}°</span>
            </div>
            </div >
                `;
    }

    container.innerHTML = html;
}

// Hook for selectDay - updates entire dashboard
window.selectDay = function (index) {
    if (!completeWeatherData) return;
    selectedDayIndex = index;
    // RENDER EVERYTHING
    renderDashboard(completeWeatherData, currentSearchLocation.name, index);

    // AUTO-SELECT SLOT
    // If today, select current hour. If other day, select 12h (noon).
    const now = new Date();
    const currentHour = now.getHours();

    // Find index in hourly array
    // Hourly data starts at 0 for day 0. Stride is 24.
    // Index in hourly array = (dayIndex * 24) + hourOffset
    let hourOffset = (index === 0) ? currentHour : 12;
    let hourlyIndex = (index * 24) + hourOffset;

    // Safety check
    if (hourlyIndex < completeWeatherData.hourly.time.length) {
        setTimeout(() => selectHourlySlot(hourlyIndex, index), 100); // Small delay to let DOM render
    }
};

// Preview solar time - shows color temperature info
window.previewSolarTime = function (period, timeLabel, isoTime) {
    const timeline = document.getElementById('color-temp-timeline');
    if (!timeline) return;

    // Get color temperature info based on period
    const tempInfo = {
        'sunrise': { kelvin: '3500K', ev: '13', condition: 'GOLDEN HOUR (LEVER)', color: '#f39c12' },
        'golden_morning': { kelvin: '3500K', ev: '13', condition: 'GOLDEN HOUR (MATIN)', color: '#D4AF37' },
        'golden_evening': { kelvin: '3500K', ev: '13', condition: 'GOLDEN HOUR (SOIR)', color: '#D4AF37' },
        'sunset': { kelvin: '3500K', ev: '13', condition: 'GOLDEN HOUR (COUCHER)', color: '#f39c12' },
    };

    const info = tempInfo[period] || tempInfo['sunrise'];

    // Flash the timeline border with the period color
    timeline.style.borderColor = info.color;
    timeline.style.boxShadow = `0 0 20px ${info.color} `;

    setTimeout(() => {
        timeline.style.borderColor = 'rgba(255,255,255,0.1)';
        timeline.style.boxShadow = 'none';
    }, 1500);

    // Optional: Show a toast notification
    if (window.speak) {
        speak(`${info.condition}, température de couleur ${info.kelvin}, EV ${info.ev} `);
    }
};

async function searchDestination() {
    const input = document.getElementById('webcam-search-input');
    const loading = document.getElementById('search-loading');

    if (!input || !input.value.trim()) return;
    const query = input.value.trim();

    if (loading) loading.classList.remove('hidden');
    document.getElementById('search-results-info')?.classList.add('hidden');
    document.getElementById('search-error')?.classList.add('hidden');

    try {
        const location = await geocodeLocation(query);
        if (!location) throw new Error('Introuvable');

        const data = await fetchWeatherData(location.lat, location.lon);
        if (!data) throw new Error('Erreur Météo');

        completeWeatherData = data;
        currentSearchLocation = location;

        renderDashboard(data, location.name);

        if (loading) loading.classList.add('hidden');
        document.getElementById('search-results-info')?.classList.remove('hidden');
        document.getElementById('search-location-name').textContent = `📍 ${location.fullName} `;

        if (window.speak) speak(`Météo affichée pour ${location.name}.`);

    } catch (e) {
        if (loading) loading.classList.add('hidden');
        const errDiv = document.getElementById('search-error');
        if (errDiv) {
            errDiv.classList.remove('hidden');
            document.getElementById('search-error-message').innerText = e.message;
        }
    }
}

function resetSearch() {
    document.getElementById('webcam-search-input').value = '';
    searchDestinationDefault();
}

async function searchDestinationDefault() {
    // Baltzenheim (QG)
    const lat = 48.0945, lon = 7.5584;
    try {
        const data = await fetchWeatherData(lat, lon);
        if (data) {
            completeWeatherData = data;
            currentSearchLocation = { name: "Baltzenheim (QG)", fullName: "Baltzenheim, Alsace" };
            renderDashboard(data, "Baltzenheim (QG)");
        }
    } catch (e) {
        // ERROR HANDLING IF FETCH FAILS
        const dashboardRoot = document.getElementById('weather-dashboard');
        if (dashboardRoot) {
            dashboardRoot.innerHTML = `
                <div class="flex flex-col items-center justify-center h-full text-limit-red font-mono p-4 text-center">
                    <span class="text-3xl mb-2">⚠️</span>
                    <p class="font-bold">Erreur Connexion Météo</p>
                    <p class="text-xs mt-2 opacity-70 break-words max-w-md">${e.message || "Erreur inconnue"}</p>
                    <button onclick="searchDestinationDefault()" class="mt-4 px-4 py-2 border border-limit-red hover:bg-limit-red/20 text-xs uppercase cursor-pointer">RÉESSAYER</button>
                </div>`;
            document.getElementById('weather-dashboard').classList.remove('hidden');
        }
    }
}

// EXPOSE GLOBALLY (Critical for Satellite Click)
window.searchDestination = searchDestination;
window.searchDestinationDefault = searchDestinationDefault;

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(searchDestinationDefault, 800);
    const input = document.getElementById('webcam-search-input');
    if (input) input.addEventListener('keypress', (e) => { if (e.key === 'Enter') searchDestination(); });
});
