// Configuration Manager Module
class ConfigManager {
    constructor() {
        this.config = null;
        this.configPath = './config.json';
    }

    async loadConfig() {
        try {
            // Check if config is available from the global window object
            if (window.AssetGeneratorConfig) {
                this.config = window.AssetGeneratorConfig;
                console.log('Configuration loaded from config.js');
                return this.config;
            } else {
                console.warn('No configuration found in config.js, using defaults');
                this.config = this.getDefaultConfig();
                return this.config;
            }
        } catch (error) {
            console.error('Error loading configuration:', error);
            // Return default config if loading fails
            this.config = this.getDefaultConfig();
            return this.config;
        }
    }

    getDefaultConfig() {
        return {
            apiKeys: {
                openai: "",
                elevenlabs: ""
            },
            settings: {
                autoConnect: false,
                defaultAssetTypes: ["images", "svgs", "documentation"],
                maxRetries: 3,
                requestDelay: 1000
            },
            generation: {
                imageSettings: {
                    quality: "hd",
                    style: "natural",
                    sizes: ["1024x1024"]
                },
                svgSettings: {
                    optimize: true,
                    minify: true
                }
            }
        };
    }

    getApiKey(service) {
        if (!this.config) {
            console.warn('Configuration not loaded');
            return null;
        }
        return this.config.apiKeys[service] || null;
    }

    getSetting(key) {
        if (!this.config) {
            console.warn('Configuration not loaded');
            return null;
        }
        return this.config.settings[key];
    }

    getGenerationSetting(category, key) {
        if (!this.config) {
            console.warn('Configuration not loaded');
            return null;
        }
        return this.config.generation[category]?.[key];
    }

    hasValidApiKeys() {
        const openaiKey = this.getApiKey('openai');
        return openaiKey && openaiKey.length > 0;
    }

    validateConfig() {
        if (!this.config) {
            return { valid: false, errors: ['Configuration not loaded'] };
        }

        const errors = [];

        // Check required API keys
        if (!this.config.apiKeys.openai) {
            errors.push('OpenAI API key is required');
        }

        // Validate API key format
        if (this.config.apiKeys.openai && !this.config.apiKeys.openai.startsWith('sk-')) {
            errors.push('OpenAI API key should start with "sk-"');
        }

        // Check settings
        if (typeof this.config.settings.maxRetries !== 'number' || this.config.settings.maxRetries < 1) {
            errors.push('maxRetries must be a positive number');
        }

        if (typeof this.config.settings.requestDelay !== 'number' || this.config.settings.requestDelay < 0) {
            errors.push('requestDelay must be a non-negative number');
        }

        return {
            valid: errors.length === 0,
            errors: errors
        };
    }

    async initialize() {
        await this.loadConfig();
        const validation = this.validateConfig();
        
        if (!validation.valid) {
            console.warn('Configuration validation failed:', validation.errors);
            return false;
        }

        return true;
    }

    // Get configuration status for UI display
    getStatus() {
        if (!this.config) {
            return {
                loaded: false,
                hasOpenAI: false,
                hasElevenLabs: false,
                autoConnect: false
            };
        }

        return {
            loaded: true,
            hasOpenAI: !!this.config.apiKeys.openai,
            hasElevenLabs: !!this.config.apiKeys.elevenlabs,
            autoConnect: this.config.settings.autoConnect
        };
    }

    // Get default asset types from config
    getDefaultAssetTypes() {
        return this.getSetting('defaultAssetTypes') || ['images', 'svgs', 'documentation'];
    }

    // Get image generation settings
    getImageSettings() {
        return this.config?.generation?.imageSettings || {
            quality: "hd",
            style: "natural",
            sizes: ["1024x1024"]
        };
    }

    // Get SVG generation settings
    getSVGSettings() {
        return this.config?.generation?.svgSettings || {
            optimize: true,
            minify: true
        };
    }

    // Get rate limiting settings
    getRateLimitSettings() {
        return {
            maxRetries: this.getSetting('maxRetries') || 3,
            requestDelay: this.getSetting('requestDelay') || 1000
        };
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ConfigManager;
}
