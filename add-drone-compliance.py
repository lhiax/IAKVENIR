#!/usr/bin/env python3
"""
Ajout des indicateurs de conformité drone selon réglementation européenne
"""

# Lire le fichier
with open('geolocation-search.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Trouver où insérer la nouvelle fonction (après getPhotoConditions)
insert_marker = "// NEW: Select hourly slot and update photo assistant"

# Nouvelle fonction pour vérifier la conformité drone
drone_function = '''
// Drone Flight Compliance Check (European Regulations)
function getDroneCompliance(sunrise, sunset, weatherCode, windSpeed, precipProb, cloudCover, hour) {
    const now = new Date();
    const currentHour = new Date(now.setHours(hour, 0, 0, 0));
    
    // European regulations: Flight allowed from 30min before sunrise to 30min after sunset
    const flightStart = new Date(sunrise.getTime() - 30 * 60 * 1000); // 30min before sunrise
    const flightEnd = new Date(sunset.getTime() + 30 * 60 * 1000);   // 30min after sunset
    
    const isWithinTimeWindow = currentHour >= flightStart && currentHour <= flightEnd;
    
    // Weather conditions check
    const windOk = windSpeed < 40; // Max wind speed 40 km/h for safe flight
    const precipOk = precipProb < 30; // Low precipitation probability
    const visibilityOk = cloudCover < 80; // Reasonable visibility
    
    // Weather codes that prevent flight
    const dangerousWeather = [95, 96, 99]; // Thunderstorms
    const weatherOk = !dangerousWeather.includes(weatherCode);
    
    // Overall compliance
    const isCompliant = isWithinTimeWindow && windOk && precipOk && visibilityOk && weatherOk;
    
    // Determine status
    let status = 'INTERDIT';
    let statusColor = 'text-red-500';
    let icon = '🚫';
    let reasons = [];
    
    if (!isWithinTimeWindow) {
        reasons.push('Hors plage horaire autorisée');
    }
    if (!windOk) {
        reasons.push(`Vent trop fort (${Math.round(windSpeed)} km/h)`);
    }
    if (!precipOk) {
        reasons.push(`Risque de précipitations (${precipProb}%)`);
    }
    if (!visibilityOk) {
        reasons.push(`Visibilité réduite (${cloudCover}% nuages)`);
    }
    if (!weatherOk) {
        reasons.push('Conditions météo dangereuses');
    }
    
    if (isCompliant) {
        status = 'AUTORISÉ';
        statusColor = 'text-green-500';
        icon = '✅';
        reasons = ['Toutes les conditions sont réunies'];
    } else if (isWithinTimeWindow && windOk && weatherOk) {
        status = 'PRUDENCE';
        statusColor = 'text-yellow-500';
        icon = '⚠️';
    }
    
    return {
        isCompliant,
        status,
        statusColor,
        icon,
        reasons,
        flightWindow: {
            start: flightStart,
            end: flightEnd,
            isWithin: isWithinTimeWindow
        },
        conditions: {
            wind: { value: windSpeed, ok: windOk },
            precip: { value: precipProb, ok: precipOk },
            visibility: { value: cloudCover, ok: visibilityOk },
            weather: { ok: weatherOk }
        }
    };
}

'''

# Insérer la fonction avant le marker
content = content.replace(insert_marker, drone_function + insert_marker)

# Sauvegarder
with open('geolocation-search.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("✅ Fonction getDroneCompliance ajoutée")
print("\n📋 Critères de conformité drone (UE):")
print("  ✓ Plage horaire: 30min avant lever → 30min après coucher")
print("  ✓ Vent: < 40 km/h")
print("  ✓ Précipitations: < 30%")
print("  ✓ Visibilité: < 80% nuages")
print("  ✓ Pas d'orage")
print("\n🎯 Statuts:")
print("  • AUTORISÉ (vert) : Toutes conditions OK")
print("  • PRUDENCE (jaune) : Conditions limites")
print("  • INTERDIT (rouge) : Vol non conforme")
