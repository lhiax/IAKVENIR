/**
 * Personality Engine
 * Adaptive AI personality based on context (time, music, activity)
 * Manages proactive assistance and inactivity detection
 */

class PersonalityEngine {
    constructor(voiceAssistant, aiProvider) {
        this.voiceAssistant = voiceAssistant;
        this.aiProvider = aiProvider;

        this.personality = 'masculine'; // 'masculine' or 'feminine'
        this.language = 'fr-FR';

        // Inactivity detection
        this.inactivityTimeout = null;
        this.inactivityThreshold = 120000; // 2 minutes
        this.lastActivityTime = Date.now();

        // Context tracking
        this.currentContext = {
            timeOfDay: this.getTimeOfDay(),
            musicAmbiance: null,
            userActivity: 'browsing'
        };

        this.setupActivityTracking();
        this.startInactivityMonitoring();
    }

    getTimeOfDay() {
        const hour = new Date().getHours();
        if (hour >= 5 && hour < 12) return 'morning';
        if (hour >= 12 && hour < 18) return 'afternoon';
        if (hour >= 18 && hour < 22) return 'evening';
        return 'night';
    }

    setupActivityTracking() {
        // Track user activity
        const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];

        events.forEach(event => {
            document.addEventListener(event, () => {
                this.resetInactivityTimer();
            }, { passive: true });
        });
    }

    resetInactivityTimer() {
        this.lastActivityTime = Date.now();

        if (this.inactivityTimeout) {
            clearTimeout(this.inactivityTimeout);
        }

        this.inactivityTimeout = setTimeout(() => {
            this.handleInactivity();
        }, this.inactivityThreshold);
    }

    startInactivityMonitoring() {
        this.resetInactivityTimer();
    }

    async handleInactivity() {
        console.log('👤 User inactive - unsolicited suggestions disabled per user request');

        /* Suggested removed:
        const suggestions = this.getContextualSuggestions();

        if (suggestions.length > 0) {
            const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)];
            this.voiceAssistant.speak(randomSuggestion);
        }
        */
    }

    getContextualSuggestions() {
        const { timeOfDay, musicAmbiance, userActivity } = this.currentContext;
        const suggestions = [];

        if (this.language === 'fr-FR') {
            if (timeOfDay === 'morning') {
                suggestions.push("Bonjour. Prêt pour une nouvelle mission ?");
                suggestions.push("Puis-je vous assister dans la configuration d'un trajet ?");
            } else if (timeOfDay === 'evening') {
                suggestions.push("Bonsoir. Une destination spécifique en tête ?");
                suggestions.push("Je suis à votre disposition pour planifier votre prochaine étape.");
            } else if (timeOfDay === 'night') {
                suggestions.push("Toujours opérationnel. En quoi puis-je vous être utile ?");
            }

            // Activity-based suggestions
            if (userActivity === 'browsing') {
                suggestions.push("Exploration en cours. Souhaitez-vous une présentation des fonctionnalités ?");
                suggestions.push("Le simulateur est prêt. Voulez-vous que je vous détaille son fonctionnement ?");
            }
        } else if (this.language === 'en-US') {
            if (timeOfDay === 'morning') {
                suggestions.push("Good morning! Need help planning your day?");
                suggestions.push("Can I help you configure a trip?");
            } else if (timeOfDay === 'evening') {
                suggestions.push("Good evening! Looking for something specific?");
                suggestions.push("I can help you book a trip for tomorrow.");
            }

            if (userActivity === 'browsing') {
                suggestions.push("You seem to be exploring. Would you like a guided tour?");
                suggestions.push("I can explain how the trip simulator works.");
            }
        } else if (this.language === 'de-DE') {
            if (timeOfDay === 'morning') {
                suggestions.push("Guten Morgen! Brauchen Sie Hilfe bei der Planung Ihres Tages?");
                suggestions.push("Kann ich Ihnen bei der Konfiguration einer Reise helfen?");
            } else if (timeOfDay === 'evening') {
                suggestions.push("Guten Abend! Suchen Sie etwas Bestimmtes?");
                suggestions.push("Ich kann Ihnen helfen, eine Reise für morgen zu buchen.");
            }

            if (userActivity === 'browsing') {
                suggestions.push("Sie scheinen zu erkunden. Möchten Sie eine Führung?");
                suggestions.push("Ich kann erklären, wie der Reisesimulator funktioniert.");
            }
        }

        return suggestions;
    }

    setPersonality(personality) {
        this.personality = personality;
        this.voiceAssistant.setVoicePersonality(personality);
    }

    setLanguage(language) {
        this.language = language;
        this.voiceAssistant.setLanguage(language);
    }

    setMusicAmbiance(ambiance) {
        this.currentContext.musicAmbiance = ambiance;
    }

    setUserActivity(activity) {
        this.currentContext.userActivity = activity;
        this.resetInactivityTimer();
    }

    async processCommand(command) {
        // Update context
        this.currentContext.timeOfDay = this.getTimeOfDay();

        // Build context for AI
        const context = {
            personality: this.personality,
            language: this.language,
            timeOfDay: this.currentContext.timeOfDay,
            musicAmbiance: this.currentContext.musicAmbiance,
            userActivity: this.currentContext.userActivity,
            mode: this.voiceAssistant.processingMode // Pass current mode (immersive, tactical, silent)
        };

        // Send to AI provider
        const result = await this.aiProvider.sendMessage(command, context);

        if (result.success) {
            // Speak the response
            this.voiceAssistant.speak(result.response, { lang: this.language });

            console.log(`✅ Response from ${result.provider}:`, result.response);
            if (result.remainingRequests !== null) {
                console.log(`📊 Remaining requests today: ${result.remainingRequests}`);
            }
        } else {
            // Fallback response
            const errorMessage = this.getErrorMessage();
            this.voiceAssistant.speak(errorMessage, { lang: this.language });
            console.error('❌ AI Error:', result.error);
        }

        return result;
    }

    getErrorMessage() {
        if (this.language === 'fr-FR') {
            return "Incident technique détecté. Mes processeurs sont sur le coup. Réessayez dans un instant.";
        } else if (this.language === 'en-US') {
            return "Sorry, I'm experiencing technical difficulties. Please try again in a moment.";
        } else if (this.language === 'de-DE') {
            return "Entschuldigung, ich habe technische Schwierigkeiten. Bitte versuchen Sie es in einem Moment erneut.";
        }
    }

    getGreeting() {
        const { timeOfDay } = this.currentContext;

        if (this.language === 'fr-FR') {
            if (timeOfDay === 'morning') return "Bonjour. Systèmes opérationnels. Comment puis-je vous servir ?";
            if (timeOfDay === 'afternoon') return "Bon après-midi. Je suis à votre écoute.";
            if (timeOfDay === 'evening') return "Bonsoir. Prêt pour le briefing de votre prochaine mission ?";
            return "Opérationnel h-24. Comment puis-je vous assister ?";
        } else if (this.language === 'en-US') {
            if (timeOfDay === 'morning') return "Good morning! How can I help you?";
            if (timeOfDay === 'afternoon') return "Good afternoon! What can I do for you?";
            if (timeOfDay === 'evening') return "Good evening! How may I assist you?";
            return "Good night! How can I help you?";
        }
        else if (this.language === 'de-DE') {
            if (timeOfDay === 'morning') return "Guten Morgen! Wie kann ich Ihnen helfen?";
            if (timeOfDay === 'afternoon') return "Guten Tag! Was kann ich für Sie tun?";
            if (timeOfDay === 'evening') return "Guten Abend! Wie kann ich Ihnen behilflich sein?";
            return "Gute Nacht! Wie kann ich Ihnen helfen?";
        }
    }
}

// Export for use in other modules
window.PersonalityEngine = PersonalityEngine;
