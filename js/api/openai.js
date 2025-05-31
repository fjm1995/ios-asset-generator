// OpenAI API Integration
class OpenAIClient {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseURL = 'https://api.openai.com/v1';
        this.rateLimiter = new RateLimiter();
    }

    async generateImage(prompt, options = {}) {
        await this.rateLimiter.checkLimit();

        const requestBody = {
            model: "dall-e-3",
            prompt: prompt,
            size: options.size || "1024x1024",
            quality: options.quality || "hd",
            style: options.style || "vivid",
            n: 1
        };

        try {
            const response = await this.makeRequest('/images/generations', {
                method: 'POST',
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error?.message || 'Image generation failed');
            }

            const data = await response.json();
            return {
                url: data.data[0].url,
                revisedPrompt: data.data[0].revised_prompt,
                originalPrompt: prompt
            };
        } catch (error) {
            console.error('DALL-E generation failed:', error);
            throw error;
        }
    }

    async generateSVG(prompt, options = {}) {
        await this.rateLimiter.checkLimit();

        const svgPrompt = `Generate clean, scalable SVG code for: ${prompt}

Requirements:
- Valid SVG markup only
- iOS-compliant design
- Proper viewBox and dimensions
- Optimized paths and shapes
- ${options.colors ? `Colors: ${options.colors}` : 'Use appropriate colors'}
- ${options.size ? `Target size: ${options.size}` : 'Scalable design'}
- No text elements unless specifically requested
- Clean, minimal design suitable for app icons

Return only the SVG code, no explanations or markdown formatting.`;

        try {
            const response = await this.makeRequest('/chat/completions', {
                method: 'POST',
                body: JSON.stringify({
                    model: "gpt-4",
                    messages: [
                        {
                            role: "system",
                            content: "You are an expert SVG designer. Generate clean, optimized SVG code for iOS app assets. Return only valid SVG markup."
                        },
                        {
                            role: "user",
                            content: svgPrompt
                        }
                    ],
                    temperature: 0.7,
                    max_tokens: 2000
                })
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error?.message || 'SVG generation failed');
            }

            const data = await response.json();
            let svgContent = data.choices[0].message.content.trim();
            
            // Clean up the response - remove any markdown formatting
            svgContent = svgContent.replace(/```svg\n?/g, '').replace(/```\n?/g, '');
            
            // Validate SVG
            if (!svgContent.includes('<svg') || !svgContent.includes('</svg>')) {
                throw new Error('Invalid SVG generated');
            }

            return {
                content: svgContent,
                prompt: prompt
            };
        } catch (error) {
            console.error('SVG generation failed:', error);
            throw error;
        }
    }

    async analyzeImage(imageUrl, prompt) {
        await this.rateLimiter.checkLimit();

        try {
            const response = await this.makeRequest('/chat/completions', {
                method: 'POST',
                body: JSON.stringify({
                    model: "gpt-4-vision-preview",
                    messages: [
                        {
                            role: "user",
                            content: [
                                {
                                    type: "text",
                                    text: prompt || "Analyze this image for iOS app compliance and suggest improvements."
                                },
                                {
                                    type: "image_url",
                                    image_url: {
                                        url: imageUrl
                                    }
                                }
                            ]
                        }
                    ],
                    max_tokens: 500
                })
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error?.message || 'Image analysis failed');
            }

            const data = await response.json();
            return data.choices[0].message.content;
        } catch (error) {
            console.error('Image analysis failed:', error);
            throw error;
        }
    }

    async enhancePrompt(originalPrompt, assetType) {
        const enhancementPrompts = {
            'app-icon': 'iOS app icon style, centered design, no text, clean background, professional',
            'tab-bar': 'simple line icon, minimal detail, black and white, iOS tab bar style',
            'launch-screen': 'mobile app launch screen, vertical orientation, branded background',
            'ui-element': 'clean UI element, iOS design guidelines, modern interface'
        };

        const enhancement = enhancementPrompts[assetType] || enhancementPrompts['ui-element'];
        return `${originalPrompt}, ${enhancement}`;
    }

    async makeRequest(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        
        const defaultOptions = {
            headers: {
                'Authorization': `Bearer ${this.apiKey}`,
                'Content-Type': 'application/json'
            }
        };

        const requestOptions = {
            ...defaultOptions,
            ...options,
            headers: {
                ...defaultOptions.headers,
                ...options.headers
            }
        };

        // Add timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 60000); // 60 second timeout

        try {
            const response = await fetch(url, {
                ...requestOptions,
                signal: controller.signal
            });
            
            clearTimeout(timeoutId);
            return response;
        } catch (error) {
            clearTimeout(timeoutId);
            if (error.name === 'AbortError') {
                throw new Error('Request timeout - please try again');
            }
            throw error;
        }
    }

    // Utility method to download image from URL
    async downloadImage(imageUrl) {
        try {
            // For file:// URLs, we need to handle CORS differently
            if (window.location.protocol === 'file:') {
                return await this.downloadImageViaProxy(imageUrl);
            }
            
            const response = await fetch(imageUrl);
            if (!response.ok) {
                throw new Error('Failed to download image');
            }
            
            const blob = await response.blob();
            return blob;
        } catch (error) {
            console.error('Image download failed, using URL reference:', error);
            // Return URL reference instead of failing completely
            return { url: imageUrl, isUrl: true };
        }
    }

    // Alternative download method for CORS-restricted environments
    async downloadImageViaProxy(imageUrl) {
        return new Promise((resolve) => {
            const img = new Image();
            img.crossOrigin = 'anonymous';
            
            img.onload = () => {
                try {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    canvas.width = img.width;
                    canvas.height = img.height;
                    
                    ctx.drawImage(img, 0, 0);
                    
                    canvas.toBlob((blob) => {
                        if (blob) {
                            resolve(blob);
                        } else {
                            resolve({ url: imageUrl, isUrl: true });
                        }
                    }, 'image/png');
                } catch (error) {
                    console.warn('Canvas conversion failed, using URL reference:', error);
                    resolve({ url: imageUrl, isUrl: true });
                }
            };
            
            img.onerror = () => {
                console.warn('Image load failed, using URL reference');
                resolve({ url: imageUrl, isUrl: true });
            };
            
            // Set a timeout to prevent hanging
            setTimeout(() => {
                console.warn('Image load timeout, using URL reference');
                resolve({ url: imageUrl, isUrl: true });
            }, 10000);
            
            img.src = imageUrl;
        });
    }

    // Convert blob to data URL for processing
    async blobToDataURL(blob) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    }

    // Validate API key format
    static validateAPIKey(apiKey) {
        if (!apiKey) return false;
        if (!apiKey.startsWith('sk-')) return false;
        if (apiKey.length < 20) return false;
        return true;
    }
}

// Rate limiting utility
class RateLimiter {
    constructor() {
        this.requests = [];
        this.maxRequestsPerMinute = 50; // Conservative limit for OpenAI
        this.maxRequestsPerDay = 1000;
    }

    async checkLimit() {
        const now = Date.now();
        
        // Clean old requests (older than 1 minute)
        this.requests = this.requests.filter(time => now - time < 60000);
        
        // Check if we're at the limit
        if (this.requests.length >= this.maxRequestsPerMinute) {
            const oldestRequest = this.requests[0];
            const waitTime = 60000 - (now - oldestRequest);
            
            if (waitTime > 0) {
                console.log(`Rate limit reached, waiting ${waitTime}ms`);
                await this.sleep(waitTime);
            }
        }
        
        // Add current request
        this.requests.push(now);
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    getRequestCount() {
        const now = Date.now();
        return this.requests.filter(time => now - time < 60000).length;
    }

    getRemainingRequests() {
        return Math.max(0, this.maxRequestsPerMinute - this.getRequestCount());
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { OpenAIClient, RateLimiter };
}
