// ============================================
// HELPER FUNCTIONS FOR COLOR-CODED METRICS
// ============================================

// Get temperature color class based on celsius value (5 levels for better distinction)
function getTempColorClass(temp) {
    if (temp >= 30) return 'temp-hot';            // Very Hot -> Red (Enhanced)
    if (temp >= 25) return 'text-orange-400';     // Warm -> Orange
    if (temp > 15) return 'text-white';           // Mild -> White
    if (temp > 5) return 'text-blue-300';         // Cool -> Light Blue
    return 'text-neon-blue';                      // Very Cold -> Neon Blue
}

// Get wind color class based on km/h
function getWindColorClass(windSpeed) {
    if (windSpeed >= 60) return 'wind-danger';
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
    if (uvIndex >= 8) return { class: 'red-alert-text', label: 'Très Élevé' };
    if (uvIndex >= 6) return { class: 'text-orange-400', label: 'Élevé' };
    if (uvIndex >= 3) return { class: 'text-gold', label: 'Modéré' };
    return { class: 'text-neon-blue', label: 'Faible' };
}
