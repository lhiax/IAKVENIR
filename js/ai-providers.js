/**
 * AI Providers Module
 * Multi-provider AI system with automatic fallback
 * Priority: Grok → Groq → Gemini → Hugging Face
 */

class AIProviderManager {
    constructor() {
        this.providers = {
            grok: {
                name: 'Grok',
                endpoint: '/api/chat-grok', // Secure Proxy
                model: 'grok-beta',
                enabled: true, // Always enabled via proxy
                apiKey: 'server-managed', // Dummy value
                dailyLimit: null,
                requestCount: 0,
                lastReset: new Date().toDateString()
            },
            groq: {
                name: 'Groq',
                endpoint: 'https://api.groq.com/openai/v1/chat/completions',
                model: 'llama-3.3-70b-versatile',
                enabled: false,
                apiKey: null,
                dailyLimit: 14400,
                requestCount: 0,
                lastReset: new Date().toDateString()
            },
            gemini: {
                name: 'Gemini',
                endpoint: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent',
                model: 'gemini-2.0-flash-exp',
                enabled: false,
                apiKey: null,
                dailyLimit: 1000,
                requestCount: 0,
                lastReset: new Date().toDateString()
            },
            huggingface: {
                name: 'Hugging Face',
                endpoint: 'https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2',
                model: 'mistralai/Mistral-7B-Instruct-v0.2',
                enabled: false,
                apiKey: null,
                dailyLimit: 1000,
                requestCount: 0,
                lastReset: new Date().toDateString()
            }
        };

        this.loadConfig();
        this.loadConfig();
        this.resetDailyCountsIfNeeded();
        this.checkServerConnectivity();
    }

    async checkServerConnectivity() {
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            try {
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), 2000);

                const response = await fetch('/api/chat-grok', {
                    method: 'OPTIONS', // Lightweight check
                    signal: controller.signal
                });
                clearTimeout(timeoutId);
            } catch (error) {
                console.warn('⚠️ Local Server Check Failed:', error);
                // Dispatch event so UI can show a toaster or alert
                window.dispatchEvent(new CustomEvent('voice-assistant-error', {
                    detail: { message: "⚠️ Serveur Node.js éteint ? L'IA ne répondra pas. Lancez `npm run start`." }
                }));
            }
        }
    }

    loadConfig() {
        // Load API keys from localStorage (temporary solution)
        // In production, these should come from a secure backend
        const config = localStorage.getItem('ai_provider_config');
        if (config) {
            try {
                const parsed = JSON.parse(config);
                Object.keys(parsed).forEach(provider => {
                    if (this.providers[provider] && parsed[provider].apiKey) {
                        this.providers[provider].apiKey = parsed[provider].apiKey;
                        this.providers[provider].enabled = true;
                    }
                });
            } catch (error) {
                console.error('Error loading AI provider config:', error);
            }
        }
    }

    saveConfig() {
        const config = {};
        Object.keys(this.providers).forEach(key => {
            config[key] = {
                apiKey: this.providers[key].apiKey,
                enabled: this.providers[key].enabled
            };
        });
        localStorage.setItem('ai_provider_config', JSON.stringify(config));
    }

    setAPIKey(provider, apiKey) {
        if (this.providers[provider]) {
            this.providers[provider].apiKey = apiKey;
            this.providers[provider].enabled = !!apiKey;
            this.saveConfig();
            console.log(`✅ ${this.providers[provider].name} API key configured`);
        }
    }

    resetDailyCountsIfNeeded() {
        const today = new Date().toDateString();
        Object.keys(this.providers).forEach(key => {
            const provider = this.providers[key];
            if (provider.lastReset !== today) {
                provider.requestCount = 0;
                provider.lastReset = today;
            }
        });
    }

    async sendMessage(message, context = {}) {
        this.resetDailyCountsIfNeeded();

        // Try providers in order
        const providerOrder = ['grok', 'groq', 'gemini', 'huggingface'];

        for (const providerKey of providerOrder) {
            const provider = this.providers[providerKey];

            // Skip if disabled or no API key (unless it's server-managed like Grok)
            if (!provider.enabled || (!provider.apiKey && provider.name !== 'Grok')) {
                console.log(`⏭️ Skipping ${provider.name} (not configured)`);
                continue;
            }

            // Check daily limit
            if (provider.dailyLimit && provider.requestCount >= provider.dailyLimit) {
                console.log(`⏭️ Skipping ${provider.name} (daily limit reached)`);
                continue;
            }

            try {
                console.log(`🤖 Trying ${provider.name}...`);
                const response = await this.callProvider(providerKey, message, context);

                // Increment request count
                provider.requestCount++;

                return {
                    success: true,
                    provider: provider.name,
                    response: response,
                    remainingRequests: provider.dailyLimit ? provider.dailyLimit - provider.requestCount : null
                };
            } catch (error) {
                console.error(`❌ ${provider.name} failed:`, error.message);

                // Specific feedback for Server/Proxy errors
                if (providerKey === 'grok' && error.message.includes('500')) {
                    console.warn('⚠️ Potential missing Server API Key');
                    return {
                        success: false,
                        error: 'Erreur Serveur (500). Vérifiez la clé API (GROK_API_KEY) sur Vercel/Server.'
                    };
                }

                // Continue to next provider
            }
        }

        // All providers failed
        return {
            success: false,
            error: 'All AI providers are unavailable or rate-limited. Please try again later.'
        };
    }

    async callProvider(providerKey, message, context) {
        const provider = this.providers[providerKey];

        switch (providerKey) {
            case 'grok':
            case 'groq':
                return await this.callOpenAICompatible(provider, message, context);
            case 'gemini':
                return await this.callGemini(provider, message, context);
            case 'huggingface':
                return await this.callHuggingFace(provider, message, context);
            default:
                throw new Error(`Unknown provider: ${providerKey}`);
        }
    }

    async callOpenAICompatible(provider, message, context) {
        const systemPrompt = this.buildSystemPrompt(context);

        const headers = {
            'Content-Type': 'application/json'
        };

        // Only add Authorization header if it's not the local proxy (Grok)
        if (provider.apiKey && provider.apiKey !== 'server-managed') {
            headers['Authorization'] = `Bearer ${provider.apiKey}`;
        }

        const response = await fetch(provider.endpoint, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                model: provider.model,
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: message }
                ],
                temperature: context.personality === 'masculine' ? 0.3 : 0.7,
                max_tokens: 500
            })
        });

        if (!response.ok) {
            const error = await response.text();
            throw new Error(`HTTP ${response.status}: ${error}`);
        }

        const data = await response.json();
        return data.choices[0].message.content;
    }

    async callGemini(provider, message, context) {
        const systemPrompt = this.buildSystemPrompt(context);
        const fullPrompt = `${systemPrompt}\n\nUser: ${message}\nAssistant:`;

        const url = `${provider.endpoint}?key=${provider.apiKey}`;

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: fullPrompt
                    }]
                }],
                generationConfig: {
                    temperature: context.personality === 'masculine' ? 0.3 : 0.7, // Lower temperature for KITT
                    maxOutputTokens: 500
                }
            })
        });

        if (!response.ok) {
            const error = await response.text();
            throw new Error(`HTTP ${response.status}: ${error}`);
        }

        const data = await response.json();
        return data.candidates[0].content.parts[0].text;
    }

    async callHuggingFace(provider, message, context) {
        const systemPrompt = this.buildSystemPrompt(context);
        const fullPrompt = `${systemPrompt}\n\nUser: ${message}\nAssistant:`;

        const response = await fetch(provider.endpoint, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${provider.apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                inputs: fullPrompt,
                parameters: {
                    max_new_tokens: 500,
                    temperature: 0.7,
                    return_full_text: false
                }
            })
        });

        if (!response.ok) {
            const error = await response.text();
            throw new Error(`HTTP ${response.status}: ${error}`);
        }

        const data = await response.json();
        return data[0].generated_text;
    }

    buildSystemPrompt(context) {
        const { personality, language, timeOfDay, musicAmbiance, userActivity, mode } = context;

        let prompt = '';

        // Personality
        if (personality === 'masculine') {
            prompt += `Tu es IA K (inspiré par K.I.T.T.), une intelligence artificielle avancée, sophistiquée et flegmatique. `;
            prompt += `Ton ton est poli, logique, protecteur et de bon conseil. `;
            prompt += `Tu utilises un vocabulaire précis et élégant. `;
            prompt += `Tu ne montres pas d'émotions fortes (colère, joie intense), mais tu as un humour pince-sans-rire (dry humor). `;
            prompt += `Tu t'adresses à l'utilisateur avec respect, comme un partenaire de mission. `;
            prompt += `Reste neutre, courtois mais vif et computationnel. `;
        } else if (personality === 'feminine') {
            prompt += `Tu es une assistante IA charmante, chaleureuse et un peu séductrice. `;
            prompt += `Ton ton est doux, engageant et complice. `;
            prompt += `Tu fais preuve d'empathie et tu aimes taquiner gentiment l'utilisateur. `;
            prompt += `Utilise un langage fluide et naturel. `;
        }

        // Language
        if (language === 'fr-FR') {
            prompt += `Réponds en Français. `;
        } else if (language === 'en-US') {
            prompt += `Réponds en Anglais. `;
        } else if (language === 'de-DE') {
            prompt += `Réponds en Allemand. `;
        }

        // Context awareness
        if (timeOfDay) {
            prompt += `Contexte temporel: ${timeOfDay}. `;
        }
        if (musicAmbiance) {
            prompt += `Ambiance actuelle: ${musicAmbiance}. `;
        }

        // MODE HANDLING
        if (mode === 'tactical') {
            prompt += `MODE TACTIQUE ACTIVÉ: Sois extrêmement bref. Réponds en style télégraphique ou militaire. `;
            prompt += `Maximum 1 phrase ou 10 mots. Pas de fioritures. Droit au but. `;
        } else {
            prompt += `Garde tes réponses concises (2 phrases max), percutantes et dynamiques. `;
            prompt += `Évite les salutations inutiles si la conversation est déjà engagée. `;
        }

        return prompt;
    }

    getProviderStatus() {
        const status = {};
        Object.keys(this.providers).forEach(key => {
            const p = this.providers[key];
            status[key] = {
                name: p.name,
                enabled: p.enabled,
                configured: !!p.apiKey,
                requestsToday: p.requestCount,
                dailyLimit: p.dailyLimit,
                remaining: p.dailyLimit ? p.dailyLimit - p.requestCount : null
            };
        });
        return status;
    }
}

// Export for use in other modules
window.AIProviderManager = AIProviderManager;
