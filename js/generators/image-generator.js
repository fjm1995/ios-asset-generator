// Image Generation Module
class ImageGenerator {
    constructor() {
        this.openaiClient = null;
        this.iosSizes = {
            appIcon: [20, 29, 40, 58, 60, 76, 80, 87, 120, 152, 167, 180, 1024],
            tabBar: [25, 50, 75],
            notification: [20, 40, 60],
            spotlight: [40, 80, 120],
            settings: [29, 58, 87]
        };
        this.densities = [1, 2, 3]; // @1x, @2x, @3x
    }

    async generate(prompt, apiKey) {
        this.openaiClient = new OpenAIClient(apiKey);
        
        const assets = [];
        
        try {
            // Generate light mode app icon
            const lightModePrompt = await this.openaiClient.enhancePrompt(prompt + ", light mode, bright background", 'app-icon');
            const lightModeImage = await this.openaiClient.generateImage(lightModePrompt);
            
            // Generate dark mode app icon
            const darkModePrompt = await this.openaiClient.enhancePrompt(prompt + ", dark mode, dark background", 'app-icon');
            const darkModeImage = await this.openaiClient.generateImage(darkModePrompt);
            
            // Download and process images
            const lightImageData = await this.openaiClient.downloadImage(lightModeImage.url);
            const darkImageData = await this.openaiClient.downloadImage(darkModeImage.url);
            
            // Handle CORS-restricted environments
            if (lightImageData.isUrl || darkImageData.isUrl) {
                // Return URL references for CORS-restricted environments
                assets.push({
                    filename: 'app-icon-light-mode.png',
                    urlReference: lightModeImage.url,
                    type: 'app-icon',
                    mode: 'light',
                    prompt: lightModePrompt,
                    note: 'Image available via URL (CORS restricted - right-click to save)'
                });
                
                assets.push({
                    filename: 'app-icon-dark-mode.png',
                    urlReference: darkModeImage.url,
                    type: 'app-icon',
                    mode: 'dark',
                    prompt: darkModePrompt,
                    note: 'Image available via URL (CORS restricted - right-click to save)'
                });
            } else {
                // Normal blob processing
                const lightAssets = await this.generateAllSizes(lightImageData, 'light', prompt);
                const darkAssets = await this.generateAllSizes(darkImageData, 'dark', prompt);
                assets.push(...lightAssets, ...darkAssets);
            }
            
        } catch (error) {
            console.error('Image generation failed:', error);
            throw new Error(`Image generation failed: ${error.message}`);
        }
        
        return assets;
    }

    async generateLaunchScreens(prompt, apiKey) {
        this.openaiClient = new OpenAIClient(apiKey);
        
        const assets = [];
        
        try {
            // Generate iPhone launch screen
            const iPhonePrompt = await this.openaiClient.enhancePrompt(
                prompt + ", iPhone launch screen, vertical orientation, 9:19.5 aspect ratio", 
                'launch-screen'
            );
            const iPhoneImage = await this.openaiClient.generateImage(iPhonePrompt, { size: "1024x1792" });
            
            // Generate iPad launch screen
            const iPadPrompt = await this.openaiClient.enhancePrompt(
                prompt + ", iPad launch screen, can be portrait or landscape, 4:3 aspect ratio", 
                'launch-screen'
            );
            const iPadImage = await this.openaiClient.generateImage(iPadPrompt, { size: "1024x1024" });
            
            // Download and process
            const iPhoneBlob = await this.openaiClient.downloadImage(iPhoneImage.url);
            const iPadBlob = await this.openaiClient.downloadImage(iPadImage.url);
            
            // Create launch screen assets
            assets.push({
                filename: 'LaunchScreen-iPhone.png',
                blob: iPhoneBlob,
                type: 'launch-screen',
                device: 'iPhone',
                width: 1024,
                height: 1792,
                prompt: iPhonePrompt
            });
            
            assets.push({
                filename: 'LaunchScreen-iPad.png',
                blob: iPadBlob,
                type: 'launch-screen',
                device: 'iPad',
                width: 1024,
                height: 1024,
                prompt: iPadPrompt
            });
            
        } catch (error) {
            console.error('Launch screen generation failed:', error);
            throw new Error(`Launch screen generation failed: ${error.message}`);
        }
        
        return assets;
    }

    async generateAllSizes(sourceBlob, mode, originalPrompt) {
        const assets = [];
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // Load source image
        const sourceImage = await this.blobToImage(sourceBlob);
        
        // Generate all app icon sizes
        for (const size of this.iosSizes.appIcon) {
            for (const density of this.densities) {
                const actualSize = size * density;
                
                // Set canvas size
                canvas.width = actualSize;
                canvas.height = actualSize;
                
                // Clear canvas
                ctx.clearRect(0, 0, actualSize, actualSize);
                
                // Draw resized image with high quality
                ctx.imageSmoothingEnabled = true;
                ctx.imageSmoothingQuality = 'high';
                ctx.drawImage(sourceImage, 0, 0, actualSize, actualSize);
                
                // Convert to blob
                const blob = await this.canvasToBlob(canvas);
                
                // Create asset object
                const densityString = density === 1 ? '' : `@${density}x`;
                const filename = `AppIcon-${size}x${size}${densityString}.png`;
                
                assets.push({
                    filename: filename,
                    blob: blob,
                    type: 'app-icon',
                    mode: mode,
                    size: size,
                    density: density,
                    actualSize: actualSize,
                    prompt: originalPrompt
                });
            }
        }
        
        return assets;
    }

    async generateTabBarIcons(prompt, apiKey) {
        this.openaiClient = new OpenAIClient(apiKey);
        
        const assets = [];
        
        try {
            // Generate simple tab bar icon
            const tabBarPrompt = await this.openaiClient.enhancePrompt(prompt, 'tab-bar');
            const tabBarImage = await this.openaiClient.generateImage(tabBarPrompt);
            
            const blob = await this.openaiClient.downloadImage(tabBarImage.url);
            const sourceImage = await this.blobToImage(blob);
            
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            // Generate tab bar icon sizes
            for (const size of this.iosSizes.tabBar) {
                for (const density of this.densities) {
                    const actualSize = size * density;
                    
                    canvas.width = actualSize;
                    canvas.height = actualSize;
                    ctx.clearRect(0, 0, actualSize, actualSize);
                    
                    // Convert to grayscale for tab bar icons
                    ctx.filter = 'grayscale(100%)';
                    ctx.imageSmoothingEnabled = true;
                    ctx.imageSmoothingQuality = 'high';
                    ctx.drawImage(sourceImage, 0, 0, actualSize, actualSize);
                    
                    const iconBlob = await this.canvasToBlob(canvas);
                    const densityString = density === 1 ? '' : `@${density}x`;
                    
                    assets.push({
                        filename: `TabBarIcon-${size}x${size}${densityString}.png`,
                        blob: iconBlob,
                        type: 'tab-bar-icon',
                        size: size,
                        density: density,
                        actualSize: actualSize,
                        prompt: tabBarPrompt
                    });
                }
            }
            
        } catch (error) {
            console.error('Tab bar icon generation failed:', error);
            throw new Error(`Tab bar icon generation failed: ${error.message}`);
        }
        
        return assets;
    }

    // Utility methods
    async blobToImage(blob) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = URL.createObjectURL(blob);
        });
    }

    async canvasToBlob(canvas, quality = 0.95) {
        return new Promise((resolve) => {
            canvas.toBlob(resolve, 'image/png', quality);
        });
    }

    async optimizeImage(blob, targetSize) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = await this.blobToImage(blob);
        
        canvas.width = targetSize;
        canvas.height = targetSize;
        
        // Apply iOS-specific optimizations
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        
        // Add subtle corner rounding for app icons
        const radius = targetSize * 0.2237; // iOS corner radius ratio
        this.drawRoundedImage(ctx, img, 0, 0, targetSize, targetSize, radius);
        
        return this.canvasToBlob(canvas);
    }

    drawRoundedImage(ctx, img, x, y, width, height, radius) {
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + width - radius, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        ctx.lineTo(x + width, y + height - radius);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        ctx.lineTo(x + radius, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(img, x, y, width, height);
        ctx.restore();
    }

    // Generate preview thumbnails
    async generatePreview(blob, size = 64) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = await this.blobToImage(blob);
        
        canvas.width = size;
        canvas.height = size;
        
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, size, size);
        
        return this.canvasToBlob(canvas);
    }

    // Validate generated images
    async validateImage(blob) {
        try {
            const img = await this.blobToImage(blob);
            
            // Check minimum dimensions
            if (img.width < 20 || img.height < 20) {
                throw new Error('Image too small');
            }
            
            // Check aspect ratio (should be square for app icons)
            if (Math.abs(img.width - img.height) > 2) {
                console.warn('Image is not square, may need adjustment');
            }
            
            return true;
        } catch (error) {
            console.error('Image validation failed:', error);
            return false;
        }
    }

    // Get iOS size requirements
    getIOSSizeRequirements() {
        return {
            appIcon: {
                sizes: this.iosSizes.appIcon,
                densities: this.densities,
                format: 'PNG',
                description: 'App icons for all iOS devices and contexts'
            },
            tabBar: {
                sizes: this.iosSizes.tabBar,
                densities: this.densities,
                format: 'PNG',
                description: 'Tab bar icons (should be simple, monochrome)'
            },
            launchScreen: {
                sizes: ['iPhone', 'iPad'],
                format: 'PNG',
                description: 'Launch screen backgrounds'
            }
        };
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ImageGenerator;
}
