// Asset Packaging Module
class AssetPackager {
    constructor() {
        this.zip = null;
    }

    async createBundle(bundle) {
        this.zip = new JSZip();
        
        try {
            // Create folder structure
            await this.createFolderStructure();
            
            // Add images
            if (bundle.assets.images && bundle.assets.images.length > 0) {
                await this.addImages(bundle.assets.images);
            }
            
            // Add SVGs
            if (bundle.assets.svgs && bundle.assets.svgs.length > 0) {
                await this.addSVGs(bundle.assets.svgs);
            }
            
            // Add audio files
            if (bundle.assets.audio && bundle.assets.audio.length > 0) {
                await this.addAudio(bundle.assets.audio);
            }
            
            // Add animations
            if (bundle.assets.animations && bundle.assets.animations.length > 0) {
                await this.addAnimations(bundle.assets.animations);
            }
            
            // Add documentation
            if (bundle.assets.documentation && bundle.assets.documentation.length > 0) {
                await this.addDocumentation(bundle.assets.documentation);
            }
            
            // Add manifest file
            await this.addManifest(bundle);
            
            // Generate ZIP
            const zipBlob = await this.zip.generateAsync({
                type: "blob",
                compression: "DEFLATE",
                compressionOptions: {
                    level: 6
                }
            });
            
            return zipBlob;
            
        } catch (error) {
            console.error('Bundle creation failed:', error);
            throw new Error(`Bundle creation failed: ${error.message}`);
        }
    }

    async createFolderStructure() {
        // Create main folders
        this.zip.folder("images");
        this.zip.folder("images/app-icons");
        this.zip.folder("images/app-icons/light-mode");
        this.zip.folder("images/app-icons/dark-mode");
        this.zip.folder("images/launch-screens");
        this.zip.folder("images/tab-bar-icons");
        
        this.zip.folder("vectors");
        this.zip.folder("vectors/ui-icons");
        this.zip.folder("vectors/illustrations");
        this.zip.folder("vectors/themed");
        
        this.zip.folder("audio");
        this.zip.folder("audio/ui-sounds");
        this.zip.folder("audio/game-sounds");
        
        this.zip.folder("animations");
        this.zip.folder("animations/ui");
        this.zip.folder("animations/lottie");
        
        this.zip.folder("documentation");
        this.zip.folder("documentation/usage-examples");
    }

    async addImages(images) {
        for (const image of images) {
            let folderPath = "images/";
            
            // Determine folder based on image type and mode
            switch (image.type) {
                case 'app-icon':
                    folderPath += `app-icons/${image.mode}-mode/`;
                    break;
                case 'launch-screen':
                    folderPath += "launch-screens/";
                    break;
                case 'tab-bar-icon':
                    folderPath += "tab-bar-icons/";
                    break;
                default:
                    folderPath += "misc/";
                    break;
            }
            
            // Add image to ZIP
            this.zip.file(folderPath + image.filename, image.blob);
        }
    }

    async addSVGs(svgs) {
        for (const svg of svgs) {
            let folderPath = "vectors/";
            
            // Determine folder based on SVG category
            switch (svg.category) {
                case 'app':
                case 'tab-bar':
                case 'navigation':
                case 'ui':
                    folderPath += "ui-icons/";
                    break;
                case 'themed':
                    folderPath += "themed/";
                    break;
                case 'illustration':
                    folderPath += "illustrations/";
                    break;
                default:
                    folderPath += "misc/";
                    break;
            }
            
            // Add SVG to ZIP
            this.zip.file(folderPath + svg.filename, svg.content);
        }
    }

    async addAudio(audioFiles) {
        for (const audio of audioFiles) {
            let folderPath = "audio/";
            
            // Determine folder based on audio type
            if (audio.type && audio.type.includes('ui')) {
                folderPath += "ui-sounds/";
            } else if (audio.type && audio.type.includes('game')) {
                folderPath += "game-sounds/";
            } else {
                folderPath += "misc/";
            }
            
            // Add audio to ZIP
            this.zip.file(folderPath + audio.filename, audio.blob);
        }
    }

    async addAnimations(animations) {
        for (const animation of animations) {
            let folderPath = "animations/";
            
            // Determine folder based on animation type
            if (animation.format === 'lottie') {
                folderPath += "lottie/";
            } else {
                folderPath += "ui/";
            }
            
            // Add animation to ZIP
            this.zip.file(folderPath + animation.filename, animation.content);
        }
    }

    async addDocumentation(docs) {
        for (const doc of docs) {
            let folderPath = "documentation/";
            
            // Determine subfolder
            if (doc.filename.includes('example') || doc.filename.includes('usage')) {
                folderPath += "usage-examples/";
            }
            
            // Add document to ZIP
            this.zip.file(folderPath + doc.filename, doc.content);
        }
    }

    async addManifest(bundle) {
        const manifest = {
            name: "iOS Asset Bundle",
            version: "1.0.0",
            generated: new Date().toISOString(),
            prompt: bundle.metadata.prompt,
            types: bundle.metadata.types,
            assets: {
                images: bundle.assets.images.length,
                svgs: bundle.assets.svgs.length,
                audio: bundle.assets.audio.length,
                animations: bundle.assets.animations.length,
                documentation: bundle.assets.documentation.length
            },
            structure: {
                "images/": "PNG image assets for iOS apps",
                "images/app-icons/": "App icons in all required iOS sizes",
                "images/app-icons/light-mode/": "App icons optimized for light mode",
                "images/app-icons/dark-mode/": "App icons optimized for dark mode",
                "images/launch-screens/": "Launch screen backgrounds",
                "images/tab-bar-icons/": "Tab bar icons (if generated)",
                "vectors/": "SVG vector graphics",
                "vectors/ui-icons/": "User interface icons",
                "vectors/illustrations/": "Decorative illustrations",
                "vectors/themed/": "Themed icon variations",
                "audio/": "Audio assets (if generated)",
                "audio/ui-sounds/": "User interface sound effects",
                "audio/game-sounds/": "Game-specific audio",
                "animations/": "Animation assets (if generated)",
                "animations/ui/": "UI animations",
                "animations/lottie/": "Lottie JSON animations",
                "documentation/": "Implementation guides and documentation"
            },
            usage: {
                xcode: "Drag and drop the images folder into your Xcode project",
                swift: "Use the SVG files with SF Symbols or custom image views",
                implementation: "See documentation/implementation-guide.md for details"
            }
        };

        this.zip.file("asset-manifest.json", JSON.stringify(manifest, null, 2));
    }

    // Create a Contents.json file for Xcode asset catalogs
    generateContentsJSON(images) {
        const contents = {
            images: [],
            info: {
                author: "iOS Asset Generator",
                version: 1
            }
        };

        // Group images by base name and size
        const imageGroups = {};
        
        images.forEach(image => {
            if (image.type === 'app-icon') {
                const baseName = `AppIcon-${image.size}x${image.size}`;
                if (!imageGroups[baseName]) {
                    imageGroups[baseName] = [];
                }
                imageGroups[baseName].push(image);
            }
        });

        // Generate image entries
        Object.entries(imageGroups).forEach(([baseName, groupImages]) => {
            const imageEntry = {
                filename: baseName + ".png",
                idiom: "universal",
                scale: "1x"
            };

            // Add different scales
            groupImages.forEach(img => {
                if (img.density === 2) {
                    contents.images.push({
                        ...imageEntry,
                        filename: baseName + "@2x.png",
                        scale: "2x"
                    });
                } else if (img.density === 3) {
                    contents.images.push({
                        ...imageEntry,
                        filename: baseName + "@3x.png",
                        scale: "3x"
                    });
                }
            });
        });

        return JSON.stringify(contents, null, 2);
    }

    // Generate README for the bundle
    generateBundleReadme(bundle) {
        const totalAssets = Object.values(bundle.assets).reduce((total, assets) => total + assets.length, 0);
        
        return `# iOS Asset Bundle

Generated on: ${new Date().toLocaleDateString()}
Prompt: "${bundle.metadata.prompt}"

## Contents

- **${bundle.assets.images.length}** Image assets (PNG)
- **${bundle.assets.svgs.length}** Vector graphics (SVG)
- **${bundle.assets.audio.length}** Audio files
- **${bundle.assets.animations.length}** Animations
- **${bundle.assets.documentation.length}** Documentation files

**Total: ${totalAssets} assets**

## Quick Start

1. **For Xcode Projects:**
   - Drag the \`images/\` folder into your Xcode project
   - Select "Copy items if needed" and add to target

2. **For SVG Icons:**
   - Use the files in \`vectors/ui-icons/\` for interface elements
   - Import into your design system or use with SF Symbols

3. **For Audio:**
   - Add files from \`audio/\` to your project
   - Use for UI feedback and game sounds

## File Structure

\`\`\`
├── images/
│   ├── app-icons/
│   │   ├── light-mode/     # Light theme app icons
│   │   └── dark-mode/      # Dark theme app icons
│   ├── launch-screens/     # Launch screen backgrounds
│   └── tab-bar-icons/      # Tab bar icons
├── vectors/
│   ├── ui-icons/          # Interface icons (SVG)
│   ├── illustrations/     # Decorative graphics
│   └── themed/           # Theme variations
├── audio/                # Sound effects (if generated)
├── animations/           # Lottie animations (if generated)
└── documentation/        # Implementation guides
\`\`\`

## iOS Compliance

All assets are generated following Apple's Human Interface Guidelines:
- App icons include all required sizes (20pt to 1024pt)
- Multiple density versions (@1x, @2x, @3x)
- Proper corner radius and visual effects
- Light and dark mode variations

## Implementation

See \`documentation/implementation-guide.md\` for detailed integration instructions.

---

Generated by iOS Asset Generator
`;
    }

    // Validate bundle before packaging
    validateBundle(bundle) {
        const errors = [];
        
        // Check required assets
        if (!bundle.assets.images || bundle.assets.images.length === 0) {
            errors.push("No images generated");
        }
        
        // Check app icon completeness
        const appIcons = bundle.assets.images.filter(img => img.type === 'app-icon');
        const requiredSizes = [20, 29, 40, 58, 60, 76, 80, 87, 120, 152, 167, 180, 1024];
        const lightModeIcons = appIcons.filter(img => img.mode === 'light');
        const darkModeIcons = appIcons.filter(img => img.mode === 'dark');
        
        if (lightModeIcons.length === 0) {
            errors.push("No light mode app icons generated");
        }
        
        if (darkModeIcons.length === 0) {
            errors.push("No dark mode app icons generated");
        }
        
        // Check SVG validity
        bundle.assets.svgs.forEach((svg, index) => {
            if (!svg.content || !svg.content.includes('<svg')) {
                errors.push(`Invalid SVG at index ${index}`);
            }
        });
        
        return {
            isValid: errors.length === 0,
            errors: errors
        };
    }

    // Get bundle statistics
    getBundleStats(bundle) {
        const stats = {
            totalAssets: 0,
            totalSize: 0,
            breakdown: {}
        };

        Object.entries(bundle.assets).forEach(([type, assets]) => {
            stats.breakdown[type] = {
                count: assets.length,
                size: 0
            };
            stats.totalAssets += assets.length;
        });

        return stats;
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AssetPackager;
}
