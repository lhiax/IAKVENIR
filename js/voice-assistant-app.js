/**
 * Voice Assistant Main Integration
 * Connects all voice assistant modules and manages the UI
 */

class VoiceAssistantApp {
    constructor() {
        this.voiceAssistant = null;
        this.aiProvider = null;
        this.personalityEngine = null;
        this.isInitialized = false;

        // UI elements
        this.voiceBtn = null;
        this.settingsBtn = null;
        this.settingsPanel = null;
        this.transcriptPanel = null;

        // Audio Visualizer states
        this.micStream = null;
        this.audioContext = null;
        this.analyser = null;
        this.visualizerFrame = null;
    }

    async init() {
        if (this.isInitialized) return;

        console.log('🚀 Initializing Voice Assistant...');

        // Initialize modules
        this.voiceAssistant = new VoiceAssistant();
        this.aiProvider = new AIProviderManager();
        this.personalityEngine = new PersonalityEngine(this.voiceAssistant, this.aiProvider);

        // Setup event handlers
        this.setupVoiceAssistantHandlers();

        // Create UI
        this.createUI();

        // Load saved preferences
        this.loadPreferences();

        // Pre-configure specific keys
        this.preConfigureDemoAPIs();

        this.isInitialized = true;
        console.log('✅ Voice Assistant initialized');
    }

    setupVoiceAssistantHandlers() {
        // Listening state change
        this.voiceAssistant.onListeningStateChange = (isListening) => {
            if (this.voiceBtn) {
                if (isListening) {
                    this.voiceBtn.classList.add('listening');
                    this.voiceBtn.classList.remove('speaking');
                } else {
                    this.voiceBtn.classList.remove('listening');
                }
            }
        };

        // Speaking state change
        this.voiceAssistant.onSpeakingStateChange = (isSpeaking) => {
            if (this.voiceBtn) {
                if (isSpeaking) {
                    this.voiceBtn.classList.add('speaking');
                    this.voiceBtn.classList.remove('listening');
                } else {
                    this.voiceBtn.classList.remove('speaking');
                }
            }
        };

        // Command received
        this.voiceAssistant.onCommandReceived = async (command, language) => {
            console.log('🎯 Command received:', command);

            // Show transcript
            this.showTranscript('Vous', command);

            // Process with personality engine
            const result = await this.personalityEngine.processCommand(command);

            if (result.success) {
                this.showTranscript('IA K', result.response);
            } else {
                this.showTranscript('Système', 'Erreur: ' + result.error);
            }
        };

        // Error handler
        this.voiceAssistant.onError = (error) => {
            console.error('Voice error:', error);
            // Hide overlay on critical error to allow retry
            const overlay = document.getElementById('voice-listening-overlay');
            if (overlay && error === 'network') {
                this.showNotification('Erreur réseau - Vérifiez votre connexion', 'error');
            }
        };
    }

    createUI() {
        // Find navbar
        const navbar = document.querySelector('nav');
        if (!navbar) return;

        // Create container
        const wrapper = document.createElement('div');
        wrapper.className = 'voice-control-container';
        wrapper.style.display = 'flex';
        wrapper.style.alignItems = 'center';
        wrapper.style.gap = '10px';

        wrapper.innerHTML = `
            <!-- Settings Button -->
            <button class="voice-settings-btn" id="voice-settings-btn" title="Paramètres Vocaux">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="#00d4ff"><path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"/></svg>
            </button>

            <!-- Settings Panel -->
            <div class="voice-settings hidden" id="voice-settings-panel">
                <h3>⚙️ Paramètres Vocaux</h3>
                <div class="voice-setting-group">
                    <label class="voice-setting-label">Langue</label>
                    <select class="voice-select" id="voice-language">
                        <option value="fr-FR">🇫🇷 Français</option>
                        <option value="en-US">🇬🇧 English</option>
                        <option value="de-DE">🇩🇪 Deutsch</option>
                    </select>
                </div>
                <div class="voice-setting-group">
                    <label class="voice-setting-label">Personnalité</label>
                    <div class="voice-toggle">
                        <button class="voice-toggle-btn active" data-personality="masculine">IA K</button>
                        <button class="voice-toggle-btn" data-personality="feminine">Féminine</button>
                    </div>
                </div>
                <div class="voice-setting-group" style="display: none;">
                    <label class="voice-setting-label">Clé API Grok (Gérée par le Serveur)</label>
                    <input type="password" class="voice-input" id="api-key-grok" placeholder="Serveur configuré" disabled>
                </div>
                <div class="api-status">
                    <div class="api-status-dot" id="api-status-dot"></div>
                    <div class="api-status-text" id="api-status-text">Prêt</div>
                </div>
            </div>

            <!-- Main Voice Button -->
            <button class="voice-btn" id="voice-main-btn" title="Activer l'assistant vocal">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="white">
                    <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
                    <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
                </svg>
            </button>
        `;

        // Insert into navbar (look for aide button or end)
        const navTarget = navbar.querySelector('.hidden.md\\:flex');
        if (navTarget) navTarget.appendChild(wrapper);

        // Create listening overlay (Below Navbar)
        const listeningOverlay = document.createElement('div');
        listeningOverlay.className = 'voice-listening-overlay hidden';
        listeningOverlay.id = 'voice-listening-overlay';
        listeningOverlay.innerHTML = `
            <div class="listening-pulse"></div>
            <div class="listening-text" style="font-size: 0.8rem; color: #1a1a1a;">IA K SCANNER</div>
            <canvas id="mic-visualizer" width="120" height="30" style="margin: 0 1rem;"></canvas>
            <div id="live-transcript" style="font-family: 'Poppins', sans-serif; font-size: 14px; color: #ff3333; min-width: 250px; font-weight: 500;">
                (En attente de voix...)
            </div>
            <button id="btn-force-test" style="margin-left: 15px; padding: 4px 8px; font-size: 10px; cursor: pointer; background: #eee; border: 1px solid #ccc; border-radius: 4px;">TEST IA</button>
        `;
        document.body.appendChild(listeningOverlay);

        // Create Transcript Panel
        const transcriptPanel = document.createElement('div');
        transcriptPanel.className = 'voice-transcript hidden';
        transcriptPanel.id = 'voice-transcript-panel';
        transcriptPanel.innerHTML = `
            <div class="voice-transcript-label">Conversation</div>
            <div class="voice-transcript-text" id="voice-transcript-text"></div>
        `;
        document.body.appendChild(transcriptPanel);

        // References
        this.voiceBtn = document.getElementById('voice-main-btn');
        this.settingsBtn = document.getElementById('voice-settings-btn');
        this.settingsPanel = document.getElementById('voice-settings-panel');
        this.transcriptPanel = document.getElementById('voice-transcript-panel');

        this.setupUIEventListeners();
    }

    preConfigureDemoAPIs() {
        const forcedGrokKey = ''; // API Key removed for security
        this.aiProvider.setAPIKey('grok', forcedGrokKey);

        const inputGrok = document.getElementById('api-key-grok');
        if (inputGrok) inputGrok.value = forcedGrokKey;

        this.updateAPIStatus();
    }

    setupUIEventListeners() {
        // Voice Button Toggle
        if (this.voiceBtn) {
            this.voiceBtn.addEventListener('click', () => {
                const overlay = document.getElementById('voice-listening-overlay');
                const isVisible = overlay && !overlay.classList.contains('hidden');

                if (isVisible) {
                    this.voiceAssistant.stopListening();
                    overlay.classList.add('hidden');
                    this.stopMicVisualizer();
                } else {
                    this.voiceAssistant.startListening();
                    overlay.classList.remove('hidden');
                    this.startMicVisualizer();
                }
            });
        }

        // Settings
        if (this.settingsBtn) {
            this.settingsBtn.addEventListener('click', () => {
                this.settingsPanel.classList.toggle('hidden');
            });
        }

        // Language
        const langSel = document.getElementById('voice-language');
        if (langSel) {
            langSel.addEventListener('change', (e) => {
                this.personalityEngine.setLanguage(e.target.value);
                this.savePreferences();
            });
        }

        // Personality
        document.querySelectorAll('.voice-toggle-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.voice-toggle-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.personalityEngine.setPersonality(e.target.dataset.personality);
                this.savePreferences();
            });
        });

        // Test Button
        const testBtn = document.getElementById('btn-force-test');
        if (testBtn) {
            testBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.voiceAssistant.onCommandReceived('Bonjour', 'fr-FR');
            });
        }
    }

    showTranscript(speaker, text) {
        const el = document.getElementById('voice-transcript-text');
        if (el) {
            el.innerHTML = `<strong>${speaker}:</strong> ${text}`;
            if (this.transcriptPanel) this.transcriptPanel.classList.remove('hidden');
            setTimeout(() => this.transcriptPanel.classList.add('hidden'), 8000);
        }
    }

    updateAPIStatus() {
        const dot = document.getElementById('api-status-dot');
        const text = document.getElementById('api-status-text');
        if (dot) dot.classList.add('active');
        if (text) {
            text.classList.add('active');
            text.textContent = 'Grok Connecté';
        }
    }

    savePreferences() {
        localStorage.setItem('voice_assistant_prefs', JSON.stringify({
            language: this.personalityEngine.language,
            personality: this.personalityEngine.personality
        }));
    }

    loadPreferences() {
        const prefs = JSON.parse(localStorage.getItem('voice_assistant_prefs') || '{}');
        if (prefs.language) {
            this.personalityEngine.setLanguage(prefs.language);
            const el = document.getElementById('voice-language');
            if (el) el.value = prefs.language;
        }
        if (prefs.personality) {
            this.personalityEngine.setPersonality(prefs.personality);
            document.querySelectorAll('.voice-toggle-btn').forEach(btn => {
                btn.classList.toggle('active', btn.dataset.personality === prefs.personality);
            });
        }
    }

    startMicVisualizer() {
        if (this.micStream) return;
        navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
            this.micStream = stream;
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.analyser = this.audioContext.createAnalyser();
            this.source = this.audioContext.createMediaStreamSource(stream);
            this.source.connect(this.analyser);
            this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
            this.drawVisualizer();
        }).catch(err => {
            console.error('Mic error:', err);
            const liveDisplay = document.getElementById('live-transcript');
            if (liveDisplay) {
                liveDisplay.textContent = "Erreur micro: Accès refusé";
                liveDisplay.style.color = "#ff3333";
            }
            this.showNotification('Accès microphone refusé', 'error');
        });
    }

    stopMicVisualizer() {
        if (this.micStream) this.micStream.getTracks().forEach(t => t.stop());
        this.micStream = null;
        cancelAnimationFrame(this.visualizerFrame);
    }

    drawVisualizer() {
        const canvas = document.getElementById('mic-visualizer');
        if (!canvas || !this.analyser) return;
        const ctx = canvas.getContext('2d');
        this.visualizerFrame = requestAnimationFrame(() => this.drawVisualizer());
        this.analyser.getByteFrequencyData(this.dataArray);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let x = 0;
        const barWidth = (canvas.width / this.dataArray.length) * 10;
        for (let i = 0; i < 40; i++) {
            const h = this.dataArray[i] / 4;
            ctx.fillStyle = `rgb(${150 + h * 2}, 0, 0)`;
            ctx.fillRect(x, canvas.height - h, barWidth, h);
            x += barWidth + 2;
        }
    }

    showNotification(msg, type) {
        console.log(`[${type}] ${msg}`);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.voiceAssistantApp = new VoiceAssistantApp();
    window.voiceAssistantApp.init();
});
