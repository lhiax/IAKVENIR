/**
 * Voice Assistant Core Module
 * Handles Web Speech API integration for voice recognition and synthesis
 * Supports FR/EN/DE with personality-based voice selection
 */

class VoiceAssistant {
    constructor() {
        this.isListening = false;
        this.currentLanguage = 'fr-FR';
        this.voicePersonality = 'masculine'; // 'masculine' or 'feminine'
        this.isAwake = false;
        this.isAwakeManually = false;
        this.recognition = null;
        this.synthesis = window.speechSynthesis;
        this.voices = [];
        this.wakePhrases = [
            'hey ia k', 'salut ia k', 'hey k', 'ok k', 'ia k',
            'hé ia k', 'iak', 'i a k', 'hey iak', 'salut iak',
            'ok google', 'dis k', 'hello k', 'yaka', 'haka', 'ka', 'cas', 'k', 'y'
        ];

        // Language configurations
        this.languages = {
            'fr-FR': { code: 'fr-FR', name: 'Français', voiceFilter: 'fr' },
            'en-US': { code: 'en-US', name: 'English', voiceFilter: 'en' },
            'de-DE': { code: 'de-DE', name: 'Deutsch', voiceFilter: 'de' }
        };

        this.init();
        this.initAudioProcessing();
    }

    init() {
        // Check browser support
        if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
            console.error('Web Speech API not supported in this browser');
            return;
        }

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        this.recognition = new SpeechRecognition();
        this.recognition.continuous = true;
        this.recognition.interimResults = true; // IMPORTANT: Must be true for live transcript
        this.recognition.lang = 'fr-FR'; // Force French for testing
        console.log('🎤 Recognition initialized with lang:', this.recognition.lang);

        // Load available voices
        this.loadVoices();
        if (this.synthesis.onvoiceschanged !== undefined) {
            this.synthesis.onvoiceschanged = () => this.loadVoices();
        }

        this.setupRecognitionHandlers();
    }

    loadVoices() {
        this.voices = this.synthesis.getVoices();
        console.log(`Loaded ${this.voices.length} voices`);

        // Retry if no voices loaded yet (common in Chrome)
        if (this.voices.length === 0) {
            setTimeout(() => {
                this.voices = this.synthesis.getVoices();
                console.log(`[Retry] Loaded ${this.voices.length} voices`);
            }, 100);
        }
    }

    setupRecognitionHandlers() {
        this.recognition.onstart = () => {
            this.isListening = true;
            this.onListeningStateChange?.(true);
            console.log('🎤 Voice recognition started');
        };

        this.recognition.onend = () => {
            this.isListening = false;
            this.onListeningStateChange?.(false);
            console.log('🎤 Voice recognition ended');
        };

        this.recognition.onresult = (event) => {
            console.log(`🎤 Raw Event Index: ${event.resultIndex}, Total: ${event.results.length}`);

            let interimTranscript = '';
            let finalTranscript = '';

            for (let i = event.resultIndex; i < event.results.length; ++i) {
                const transcript = event.results[i][0].transcript;
                if (event.results[i].isFinal) {
                    finalTranscript += transcript;
                } else {
                    interimTranscript += transcript;
                }
            }

            const activeTranscript = (finalTranscript || interimTranscript).toLowerCase().trim();
            if (activeTranscript) console.log('💬 HEARD:', activeTranscript, finalTranscript ? '(FINAL)' : '(interim)');

            // UPDATE LIVE DISPLAY
            const liveDisplay = document.getElementById('live-transcript');
            if (liveDisplay && activeTranscript) {
                liveDisplay.textContent = `"${activeTranscript}"`;
                liveDisplay.style.color = finalTranscript ? '#ff0000' : '#cc3333';
            }

            if (finalTranscript) {
                const cleanTranscript = finalTranscript.toLowerCase().trim();

                // Wake word check
                const hasWakePhrase = this.wakePhrases.some(phrase => cleanTranscript.includes(phrase));

                if (hasWakePhrase || this.isAwakeManually) {
                    console.log('🚀 TRIGGER ACTION:', cleanTranscript);

                    let command = cleanTranscript;
                    if (hasWakePhrase) {
                        this.wakePhrases.forEach(phrase => command = command.replace(phrase, '').trim());
                    }

                    this.isAwakeManually = false;
                    this.onCommandReceived?.(command || 'bonjour', this.currentLanguage);
                } else {
                    console.log('🔇 Ignoring (No wake word in:', cleanTranscript, ')');
                }
            }
        };

        this.recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
            this.onError?.(event.error);
        };
    }

    startListening() {
        if (!this.recognition) {
            console.error('Speech recognition not initialized');
            return;
        }

        try {
            this.recognition.start();
            this.isAwake = true;
            this.isAwakeManually = true; // Allow direct speech after manual click
            console.log('🎤 Recognition started (Direct Mode enabled)');
        } catch (error) {
            console.warn('🎤 Recognition already running or error:', error);
        }
    }

    stopListening() {
        if (this.recognition && this.isListening) {
            this.recognition.stop();
            this.isAwake = false;
        }
    }

    speak(text, options = {}) {
        // Cancel any ongoing speech
        this.synthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);

        // Set language
        utterance.lang = options.lang || this.currentLanguage;

        // Select voice based on personality and language
        const voice = this.selectVoice(utterance.lang);
        if (voice) {
            utterance.voice = voice;
        }

        // Voice parameters
        const isKITT = this.voicePersonality === 'masculine';
        utterance.rate = options.rate || (isKITT ? 1.4 : 1.0); // Reset to 1.4 for balanced speed
        utterance.pitch = options.pitch || (isKITT ? 0.9 : 1.0); // Slightly lower pitch for KITT
        utterance.volume = options.volume || 1.0;

        // Event handlers
        utterance.onstart = () => {
            this.onSpeakingStateChange?.(true);
            console.log('🔊 Speaking:', text);
            // DUCK AUDIO
            if (window.pauseRadio) window.pauseRadio();

            // Pause Pilot Video
            const pilotVideo = document.getElementById('pilot-video');
            if (pilotVideo && !pilotVideo.paused) {
                pilotVideo.pause();
                this._pilotWasPausedByAssistant = true;
            }
        };

        utterance.onend = () => {
            this.onSpeakingStateChange?.(false);
            console.log('🔊 Speech ended');
            // RESUME AUDIO
            if (window.resumeRadio) window.resumeRadio();

            // Resume Pilot Video
            const pilotVideo = document.getElementById('pilot-video');
            if (pilotVideo && this._pilotWasPausedByAssistant) {
                pilotVideo.play().catch(() => { });
                this._pilotWasPausedByAssistant = false;
            }
        };

        utterance.onerror = (event) => {
            console.error('Speech synthesis error:', event);
            this.onSpeakingStateChange?.(false);
        };

        this.synthesis.speak(utterance);
    }

    selectVoice(lang) {
        if (this.voices.length === 0) {
            this.loadVoices();
        }

        const langCode = lang.split('-')[0]; // 'fr', 'en', 'de'

        // Filter voices by language
        let availableVoices = this.voices.filter(voice =>
            voice.lang.startsWith(langCode)
        );

        if (availableVoices.length === 0) {
            console.warn(`No voices found for language: ${lang}`);
            return null;
        }

        // Select based on personality
        let selectedVoice;

        if (this.voicePersonality === 'feminine') {
            // Prefer female voices
            selectedVoice = availableVoices.find(v =>
                v.name.toLowerCase().includes('female') ||
                v.name.toLowerCase().includes('femme') ||
                v.name.toLowerCase().includes('woman') ||
                v.name.toLowerCase().includes('samantha') ||
                v.name.toLowerCase().includes('amelie') ||
                v.name.toLowerCase().includes('anna')
            );
        } else {
            // Prefer male voices (KITT style)
            selectedVoice = availableVoices.find(v =>
                v.name.toLowerCase().includes('male') ||
                v.name.toLowerCase().includes('homme') ||
                v.name.toLowerCase().includes('man') ||
                v.name.toLowerCase().includes('thomas') ||
                v.name.toLowerCase().includes('daniel')
            );
        }

        // Fallback to first available voice
        return selectedVoice || availableVoices[0];
    }

    setLanguage(langCode) {
        if (this.languages[langCode]) {
            this.currentLanguage = langCode;
            if (this.recognition) {
                this.recognition.lang = langCode;
            }
            console.log(`Language changed to: ${this.languages[langCode].name}`);
        }
    }

    setVoicePersonality(personality) {
        if (personality === 'masculine' || personality === 'feminine') {
            this.voicePersonality = personality;
            console.log(`Voice personality changed to: ${personality}`);
        }
    }

    getAvailableLanguages() {
        return Object.values(this.languages);
    }

    // Event handlers (to be set by external code)
    onListeningStateChange = null;
    onSpeakingStateChange = null;
    onCommandReceived = null;
    onError = null;

    /**
     * K.I.T.T. Audio Processing Chain (Web Audio API)
     * For future integration with advanced TTS engines or capture
     */
    initAudioProcessing() {
        if (!window.AudioContext && !window.webkitAudioContext) return;

        try {
            this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();

            // 1. High Pass Filter (Coupe-Bas 150Hz)
            this.hpFilter = this.audioCtx.createBiquadFilter();
            this.hpFilter.type = 'highpass';
            this.hpFilter.frequency.value = 150;

            // 2. Low Pass Filter (Coupe-Haut 6.5kHz)
            this.lpFilter = this.audioCtx.createBiquadFilter();
            this.lpFilter.type = 'lowpass';
            this.lpFilter.frequency.value = 6500;

            // 3. Nasal Boost (Boost +2dB @ 2kHz)
            this.eqBoost = this.audioCtx.createBiquadFilter();
            this.eqBoost.type = 'peaking';
            this.eqBoost.frequency.value = 2000;
            this.eqBoost.Q.value = 1.0;
            this.eqBoost.gain.value = 2.0;

            // 4. Dynamics Compressor
            this.compressor = this.audioCtx.createDynamicsCompressor();
            this.compressor.threshold.setValueAtTime(-24, this.audioCtx.currentTime);
            this.compressor.knee.setValueAtTime(30, this.audioCtx.currentTime);
            this.compressor.ratio.setValueAtTime(12, this.audioCtx.currentTime);
            this.compressor.attack.setValueAtTime(0.003, this.audioCtx.currentTime);
            this.compressor.release.setValueAtTime(0.25, this.audioCtx.currentTime);

            // Connect Chain: Source -> HP -> LP -> EQ -> Compressor -> Destination
            this.hpFilter.connect(this.lpFilter);
            this.lpFilter.connect(this.eqBoost);
            this.eqBoost.connect(this.compressor);
            this.compressor.connect(this.audioCtx.destination);

            console.log("🎙️ K.I.T.T. Audio Processing Chain initialized");
        } catch (e) {
            console.warn("Failed to init audio processing:", e);
        }
    }
}

// Export for use in other modules
window.VoiceAssistant = VoiceAssistant;
