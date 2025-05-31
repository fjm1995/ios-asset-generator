// SVG Generation Module
class SVGGenerator {
    constructor() {
        this.openaiClient = null;
        this.templates = new SVGTemplates();
    }

    async generate(prompt, apiKey) {
        this.openaiClient = new OpenAIClient(apiKey);
        
        const assets = [];
        
        try {
            // Generate different types of SVG assets
            const svgTypes = [
                { type: 'app-icon', description: 'main app icon' },
                { type: 'tab-bar-home', description: 'home tab bar icon' },
                { type: 'tab-bar-search', description: 'search tab bar icon' },
                { type: 'tab-bar-profile', description: 'profile tab bar icon' },
                { type: 'tab-bar-settings', description: 'settings tab bar icon' },
                { type: 'navigation-back', description: 'back navigation arrow' },
                { type: 'navigation-forward', description: 'forward navigation arrow' },
                { type: 'ui-close', description: 'close button icon' },
                { type: 'ui-menu', description: 'hamburger menu icon' },
                { type: 'ui-plus', description: 'add/plus button icon' }
            ];

            // Generate AI-powered SVGs for complex assets
            const complexTypes = ['app-icon'];
            for (const svgType of svgTypes) {
                if (complexTypes.includes(svgType.type)) {
                    const aiSVG = await this.generateAISVG(prompt, svgType);
                    if (aiSVG) {
                        assets.push(aiSVG);
                    }
                } else {
                    // Use programmatic generation for simple UI icons
                    const programmaticSVG = this.generateProgrammaticSVG(svgType, prompt);
                    if (programmaticSVG) {
                        assets.push(programmaticSVG);
                    }
                }
            }

            // Generate additional themed SVGs
            const themedSVGs = await this.generateThemedSVGs(prompt);
            assets.push(...themedSVGs);

        } catch (error) {
            console.error('SVG generation failed:', error);
            throw new Error(`SVG generation failed: ${error.message}`);
        }
        
        return assets;
    }

    async generateAISVG(prompt, svgType) {
        try {
            const enhancedPrompt = `${prompt}, ${svgType.description}, SVG icon style`;
            const svgResult = await this.openaiClient.generateSVG(enhancedPrompt, {
                colors: this.extractColorsFromPrompt(prompt),
                size: '24x24'
            });

            // Optimize the generated SVG
            const optimizedSVG = this.optimizeSVG(svgResult.content);

            return {
                filename: `${svgType.type}.svg`,
                content: optimizedSVG,
                type: 'svg',
                category: svgType.type.split('-')[0], // 'app', 'tab-bar', 'navigation', 'ui'
                prompt: enhancedPrompt,
                generated: 'ai'
            };
        } catch (error) {
            console.error(`Failed to generate AI SVG for ${svgType.type}:`, error);
            return null;
        }
    }

    generateProgrammaticSVG(svgType, prompt) {
        try {
            const colors = this.extractColorsFromPrompt(prompt);
            const primaryColor = colors[0] || '#007AFF';
            
            let svgContent = '';

            switch (svgType.type) {
                case 'tab-bar-home':
                    svgContent = this.templates.generateHomeIcon(primaryColor);
                    break;
                case 'tab-bar-search':
                    svgContent = this.templates.generateSearchIcon(primaryColor);
                    break;
                case 'tab-bar-profile':
                    svgContent = this.templates.generateProfileIcon(primaryColor);
                    break;
                case 'tab-bar-settings':
                    svgContent = this.templates.generateSettingsIcon(primaryColor);
                    break;
                case 'navigation-back':
                    svgContent = this.templates.generateBackIcon(primaryColor);
                    break;
                case 'navigation-forward':
                    svgContent = this.templates.generateForwardIcon(primaryColor);
                    break;
                case 'ui-close':
                    svgContent = this.templates.generateCloseIcon(primaryColor);
                    break;
                case 'ui-menu':
                    svgContent = this.templates.generateMenuIcon(primaryColor);
                    break;
                case 'ui-plus':
                    svgContent = this.templates.generatePlusIcon(primaryColor);
                    break;
                default:
                    return null;
            }

            return {
                filename: `${svgType.type}.svg`,
                content: svgContent,
                type: 'svg',
                category: svgType.type.split('-')[0],
                prompt: prompt,
                generated: 'programmatic'
            };
        } catch (error) {
            console.error(`Failed to generate programmatic SVG for ${svgType.type}:`, error);
            return null;
        }
    }

    async generateThemedSVGs(prompt) {
        const assets = [];
        const colors = this.extractColorsFromPrompt(prompt);
        
        try {
            // Generate themed variations
            const themes = ['light', 'dark'];
            const baseIcons = ['star', 'heart', 'bookmark', 'share'];

            for (const theme of themes) {
                for (const icon of baseIcons) {
                    const themedPrompt = `${prompt}, ${icon} icon, ${theme} theme, minimal design`;
                    
                    try {
                        const svgResult = await this.openaiClient.generateSVG(themedPrompt, {
                            colors: theme === 'dark' ? ['#FFFFFF', '#F2F2F7'] : ['#000000', '#1C1C1E']
                        });

                        const optimizedSVG = this.optimizeSVG(svgResult.content);

                        assets.push({
                            filename: `${icon}-${theme}.svg`,
                            content: optimizedSVG,
                            type: 'svg',
                            category: 'themed',
                            theme: theme,
                            prompt: themedPrompt,
                            generated: 'ai'
                        });
                    } catch (error) {
                        console.warn(`Failed to generate ${icon} ${theme} theme:`, error);
                        // Continue with other icons
                    }
                }
            }
        } catch (error) {
            console.error('Themed SVG generation failed:', error);
        }

        return assets;
    }

    optimizeSVG(svgContent) {
        try {
            // Remove unnecessary whitespace
            svgContent = svgContent.replace(/\s+/g, ' ').trim();
            
            // Ensure proper SVG structure
            if (!svgContent.startsWith('<svg')) {
                throw new Error('Invalid SVG content');
            }

            // Add iOS-specific optimizations
            svgContent = this.addIOSOptimizations(svgContent);
            
            // Validate and clean up paths
            svgContent = this.optimizePaths(svgContent);
            
            return svgContent;
        } catch (error) {
            console.error('SVG optimization failed:', error);
            return svgContent; // Return original if optimization fails
        }
    }

    addIOSOptimizations(svgContent) {
        // Ensure viewBox is set for proper scaling
        if (!svgContent.includes('viewBox')) {
            svgContent = svgContent.replace('<svg', '<svg viewBox="0 0 24 24"');
        }

        // Add iOS-specific attributes
        if (!svgContent.includes('xmlns')) {
            svgContent = svgContent.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"');
        }

        // Ensure proper fill rules for iOS
        svgContent = svgContent.replace(/fill-rule="evenodd"/g, 'fill-rule="evenodd"');
        
        return svgContent;
    }

    optimizePaths(svgContent) {
        // Simplify path data (basic optimization)
        svgContent = svgContent.replace(/(\d+\.\d{3,})/g, (match) => {
            return parseFloat(match).toFixed(2);
        });

        // Remove redundant path commands
        svgContent = svgContent.replace(/([ML])\s*\1/g, '$1');
        
        return svgContent;
    }

    extractColorsFromPrompt(prompt) {
        const colorMap = {
            'blue': '#007AFF',
            'red': '#FF3B30',
            'green': '#34C759',
            'orange': '#FF9500',
            'purple': '#5856D6',
            'pink': '#FF2D92',
            'yellow': '#FFCC00',
            'gray': '#8E8E93',
            'black': '#000000',
            'white': '#FFFFFF'
        };

        const colors = [];
        const lowerPrompt = prompt.toLowerCase();

        Object.entries(colorMap).forEach(([colorName, colorValue]) => {
            if (lowerPrompt.includes(colorName)) {
                colors.push(colorValue);
            }
        });

        // Default colors if none found
        if (colors.length === 0) {
            colors.push('#007AFF', '#5856D6'); // iOS blue and purple
        }

        return colors;
    }

    generateColorVariations(baseSVG, colors) {
        const variations = [];
        
        colors.forEach((color, index) => {
            let coloredSVG = baseSVG;
            
            // Replace fill colors
            coloredSVG = coloredSVG.replace(/fill="[^"]*"/g, `fill="${color}"`);
            
            // Replace stroke colors
            coloredSVG = coloredSVG.replace(/stroke="[^"]*"/g, `stroke="${color}"`);
            
            variations.push({
                color: color,
                content: coloredSVG,
                index: index
            });
        });

        return variations;
    }

    validateSVG(svgContent) {
        try {
            // Basic SVG validation
            if (!svgContent.includes('<svg') || !svgContent.includes('</svg>')) {
                return false;
            }

            // Check for balanced tags
            const openTags = (svgContent.match(/<[^/][^>]*>/g) || []).length;
            const closeTags = (svgContent.match(/<\/[^>]*>/g) || []).length;
            const selfClosingTags = (svgContent.match(/<[^>]*\/>/g) || []).length;
            
            // Basic tag balance check
            if (openTags !== closeTags + selfClosingTags) {
                console.warn('SVG may have unbalanced tags');
            }

            return true;
        } catch (error) {
            console.error('SVG validation failed:', error);
            return false;
        }
    }

    // Generate SVG sprite for efficient loading
    generateSVGSprite(svgAssets) {
        const symbols = svgAssets.map(asset => {
            const id = asset.filename.replace('.svg', '');
            const content = asset.content.replace(/<svg[^>]*>/, '').replace('</svg>', '');
            
            return `<symbol id="${id}" viewBox="0 0 24 24">${content}</symbol>`;
        }).join('\n');

        return `<svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
${symbols}
</svg>`;
    }

    // Convert SVG to different formats if needed
    async svgToPNG(svgContent, size = 512) {
        return new Promise((resolve, reject) => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const img = new Image();
            
            canvas.width = size;
            canvas.height = size;
            
            img.onload = () => {
                ctx.drawImage(img, 0, 0, size, size);
                canvas.toBlob(resolve, 'image/png');
            };
            
            img.onerror = reject;
            
            const blob = new Blob([svgContent], { type: 'image/svg+xml' });
            img.src = URL.createObjectURL(blob);
        });
    }

    // Get SVG metadata
    getSVGMetadata(svgContent) {
        const viewBoxMatch = svgContent.match(/viewBox="([^"]+)"/);
        const widthMatch = svgContent.match(/width="([^"]+)"/);
        const heightMatch = svgContent.match(/height="([^"]+)"/);
        
        return {
            viewBox: viewBoxMatch ? viewBoxMatch[1] : null,
            width: widthMatch ? widthMatch[1] : null,
            height: heightMatch ? heightMatch[1] : null,
            hasViewBox: !!viewBoxMatch,
            isScalable: !!viewBoxMatch
        };
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SVGGenerator;
}
