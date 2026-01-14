// ============================================
// HELPER FUNCTIONS FOR COLOR-CODED METRICS
// ============================================

// Get temperature color class based on celsius value
// Get temperature color class based on celsius value
function getTempColorClass(temp) {
    if (temp >= 25) return 'text-limit-red'; // Hot -> Red
    if (temp <= 10) return 'text-neon-blue'; // Cold -> Blue
    return 'text-white'; // Mild/Current -> White
}

// Get wind color class based on km/h
function getWindColorClass(windSpeed) {
    if (windSpeed >= 60) return 'text-limit-red';
    if (windSpeed >= 40) return 'text-neon-blue'; // Strong wind -> Blue/Cold feeling? Or maybe keep it semantic
    return 'text-gold'; // Default for other parameters
}

// Get precipitation color class based on mm
function getPrecipColorClass(precip) {
    if (precip >= 10) return 'text-neon-blue';
    if (precip > 0) return 'text-blue-300';
    return 'text-gray-400';
}

// Get humidity color class based on percentage
function getHumidityColorClass(humidity) {
    if (humidity >= 80) return 'text-neon-blue';
    return 'text-gold';
}

// Get UV color class and label
function getUVInfo(uvIndex) {
    if (uvIndex >= 8) return { class: 'text-limit-red', label: 'Très Élevé' };
    if (uvIndex >= 6) return { class: 'text-orange-400', label: 'Élevé' };
    if (uvIndex >= 3) return { class: 'text-gold', label: 'Modéré' };
    return { class: 'text-neon-blue', label: 'Faible' };
}
