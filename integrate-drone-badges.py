#!/usr/bin/env python3
"""
Intégration des badges drone dans les prévisions horaires
"""

# Lire le fichier
with open('geolocation-search.js', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Modifier renderHourlyMini pour ajouter le badge drone
old_badge_section = '''        let badge = '';
        let borderClass = 'border-white/10';
        
        if (isSunrise) {
            badge = '<div class="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 rounded-full flex items-center justify-center text-[8px]">🌅</div>';
            borderClass = 'border-orange-500/50';
        } else if (isSunset) {
            badge = '<div class="absolute -top-1 -right-1 w-4 h-4 bg-orange-600 rounded-full flex items-center justify-center text-[8px]">🌇</div>';
            borderClass = 'border-orange-600/50';
        } else if (isGoldenMorning || isGoldenEvening) {
            badge = '<div class="absolute -top-1 -right-1 w-4 h-4 bg-gold rounded-full flex items-center justify-center text-[8px]">✨</div>';
            borderClass = 'border-gold/50';
        }'''

new_badge_section = '''        // Check drone compliance
        const droneCheck = getDroneCompliance(sunrise, sunset, weatherInfo.code, hourly.wind_speed_10m[i], precipProb, hourly.cloud_cover[i], hour);
        
        let badge = '';
        let borderClass = 'border-white/10';
        
        // Priority: Drone status > Sun events > Golden hours
        if (droneCheck.status === 'AUTORISÉ') {
            badge = '<div class="absolute -top-1 -left-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-[10px] shadow-lg" title="Vol drone autorisé">🚁</div>';
            borderClass = 'border-green-500/50';
        } else if (droneCheck.status === 'PRUDENCE') {
            badge = '<div class="absolute -top-1 -left-1 w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center text-[10px] shadow-lg" title="Vol drone: prudence">⚠️</div>';
            borderClass = 'border-yellow-500/50';
        } else if (droneCheck.status === 'INTERDIT') {
            badge = '<div class="absolute -top-1 -left-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-[10px] shadow-lg" title="Vol drone interdit">🚫</div>';
            borderClass = 'border-red-500/50';
        }
        
        // Add sun/golden hour badges on the right
        if (isSunrise) {
            badge += '<div class="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 rounded-full flex items-center justify-center text-[8px]">🌅</div>';
        } else if (isSunset) {
            badge += '<div class="absolute -top-1 -right-1 w-4 h-4 bg-orange-600 rounded-full flex items-center justify-center text-[8px]">🌇</div>';
        } else if (isGoldenMorning || isGoldenEvening) {
            badge += '<div class="absolute -top-1 -right-1 w-4 h-4 bg-gold rounded-full flex items-center justify-center text-[8px]">✨</div>';
        }'''

# Remplacer
if old_badge_section in content:
    content = content.replace(old_badge_section, new_badge_section)
    print("✅ Badges drone ajoutés aux prévisions horaires")
else:
    print("⚠️  Section badges non trouvée")

# Sauvegarder
with open('geolocation-search.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("\n📋 Badges ajoutés:")
print("  🚁 Vert (gauche) : Vol autorisé")
print("  ⚠️ Jaune (gauche) : Prudence requise")
print("  🚫 Rouge (gauche) : Vol interdit")
print("  🌅🌇✨ (droite) : Événements solaires")
