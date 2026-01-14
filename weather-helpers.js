// ============================================
// HELPER FUNCTIONS FOR COLOR-CODED METRICS
// ============================================

// Get temperature color class based on celsius value
function getTempColorClass(temp) {
    if (temp >= 30) return 'temp-hot';
    if (temp >= 20) return 'temp-warm';
    if (temp >= 10) return 'temp-mild';
    if (temp >= 0) return 'temp-cool';
    return 'temp-cold';
}

// Get wind color class based on km/h
function getWindColorClass(windSpeed) {
    if (windSpeed >= 60) return 'wind-danger';
    if (windSpeed >= 40) return 'wind-strong';
    if (windSpeed >= 20) return 'wind-moderate';
    return 'wind-calm';
}

// Get precipitation color class based on mm
function getPrecipColorClass(precip) {
    if (precip >= 10) return 'precip-heavy';
    if (precip >= 5) return 'precip-moderate';
    if (precip > 0) return 'precip-light';
    return 'precip-none';
}

// Get humidity color class based on percentage
function getHumidityColorClass(humidity) {
    if (humidity >= 70) return 'humidity-high';
    if (humidity >= 30) return 'humidity-normal';
    return 'humidity-low';
}

// Get UV color class and label
function getUVInfo(uvIndex) {
    if (uvIndex >= 11) return { class: 'uv-extreme', label: 'Extrême' };
    if (uvIndex >= 8) return { class: 'uv-very-high', label: 'Très Élevé' };
    if (uvIndex >= 6) return { class: 'uv-high', label: 'Élevé' };
    if (uvIndex >= 3) return { class: 'uv-moderate', label: 'Modéré' };
    return { class: 'uv-low', label: 'Faible' };
}
