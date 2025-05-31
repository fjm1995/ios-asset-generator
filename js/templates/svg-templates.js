// SVG Templates for Programmatic Generation
class SVGTemplates {
    constructor() {
        this.defaultViewBox = "0 0 24 24";
        this.defaultStrokeWidth = "2";
    }

    generateHomeIcon(color = "#007AFF") {
        return `<svg viewBox="${this.defaultViewBox}" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" fill="none" stroke="${color}" stroke-width="${this.defaultStrokeWidth}" stroke-linecap="round" stroke-linejoin="round"/>
            <polyline points="9,22 9,12 15,12 15,22" fill="none" stroke="${color}" stroke-width="${this.defaultStrokeWidth}" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`;
    }

    generateSearchIcon(color = "#007AFF") {
        return `<svg viewBox="${this.defaultViewBox}" xmlns="http://www.w3.org/2000/svg">
            <circle cx="11" cy="11" r="8" fill="none" stroke="${color}" stroke-width="${this.defaultStrokeWidth}" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="m21 21-4.35-4.35" fill="none" stroke="${color}" stroke-width="${this.defaultStrokeWidth}" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`;
    }

    generateProfileIcon(color = "#007AFF") {
        return `<svg viewBox="${this.defaultViewBox}" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" fill="none" stroke="${color}" stroke-width="${this.defaultStrokeWidth}" stroke-linecap="round" stroke-linejoin="round"/>
            <circle cx="12" cy="7" r="4" fill="none" stroke="${color}" stroke-width="${this.defaultStrokeWidth}" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`;
    }

    generateSettingsIcon(color = "#007AFF") {
        return `<svg viewBox="${this.defaultViewBox}" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="3" fill="none" stroke="${color}" stroke-width="${this.defaultStrokeWidth}" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" fill="none" stroke="${color}" stroke-width="${this.defaultStrokeWidth}" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`;
    }

    generateBackIcon(color = "#007AFF") {
        return `<svg viewBox="${this.defaultViewBox}" xmlns="http://www.w3.org/2000/svg">
            <polyline points="15,18 9,12 15,6" fill="none" stroke="${color}" stroke-width="${this.defaultStrokeWidth}" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`;
    }

    generateForwardIcon(color = "#007AFF") {
        return `<svg viewBox="${this.defaultViewBox}" xmlns="http://www.w3.org/2000/svg">
            <polyline points="9,18 15,12 9,6" fill="none" stroke="${color}" stroke-width="${this.defaultStrokeWidth}" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`;
    }

    generateCloseIcon(color = "#007AFF") {
        return `<svg viewBox="${this.defaultViewBox}" xmlns="http://www.w3.org/2000/svg">
            <line x1="18" y1="6" x2="6" y2="18" stroke="${color}" stroke-width="${this.defaultStrokeWidth}" stroke-linecap="round" stroke-linejoin="round"/>
            <line x1="6" y1="6" x2="18" y2="18" stroke="${color}" stroke-width="${this.defaultStrokeWidth}" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`;
    }

    generateMenuIcon(color = "#007AFF") {
        return `<svg viewBox="${this.defaultViewBox}" xmlns="http://www.w3.org/2000/svg">
            <line x1="3" y1="6" x2="21" y2="6" stroke="${color}" stroke-width="${this.defaultStrokeWidth}" stroke-linecap="round" stroke-linejoin="round"/>
            <line x1="3" y1="12" x2="21" y2="12" stroke="${color}" stroke-width="${this.defaultStrokeWidth}" stroke-linecap="round" stroke-linejoin="round"/>
            <line x1="3" y1="18" x2="21" y2="18" stroke="${color}" stroke-width="${this.defaultStrokeWidth}" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`;
    }

    generatePlusIcon(color = "#007AFF") {
        return `<svg viewBox="${this.defaultViewBox}" xmlns="http://www.w3.org/2000/svg">
            <line x1="12" y1="5" x2="12" y2="19" stroke="${color}" stroke-width="${this.defaultStrokeWidth}" stroke-linecap="round" stroke-linejoin="round"/>
            <line x1="5" y1="12" x2="19" y2="12" stroke="${color}" stroke-width="${this.defaultStrokeWidth}" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`;
    }

    generateStarIcon(color = "#007AFF", filled = false) {
        const fillColor = filled ? color : "none";
        return `<svg viewBox="${this.defaultViewBox}" xmlns="http://www.w3.org/2000/svg">
            <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" fill="${fillColor}" stroke="${color}" stroke-width="${this.defaultStrokeWidth}" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`;
    }

    generateHeartIcon(color = "#007AFF", filled = false) {
        const fillColor = filled ? color : "none";
        return `<svg viewBox="${this.defaultViewBox}" xmlns="http://www.w3.org/2000/svg">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" fill="${fillColor}" stroke="${color}" stroke-width="${this.defaultStrokeWidth}" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`;
    }

    generateBookmarkIcon(color = "#007AFF", filled = false) {
        const fillColor = filled ? color : "none";
        return `<svg viewBox="${this.defaultViewBox}" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" fill="${fillColor}" stroke="${color}" stroke-width="${this.defaultStrokeWidth}" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`;
    }

    generateShareIcon(color = "#007AFF") {
        return `<svg viewBox="${this.defaultViewBox}" xmlns="http://www.w3.org/2000/svg">
            <circle cx="18" cy="5" r="3" fill="none" stroke="${color}" stroke-width="${this.defaultStrokeWidth}" stroke-linecap="round" stroke-linejoin="round"/>
            <circle cx="6" cy="12" r="3" fill="none" stroke="${color}" stroke-width="${this.defaultStrokeWidth}" stroke-linecap="round" stroke-linejoin="round"/>
            <circle cx="18" cy="19" r="3" fill="none" stroke="${color}" stroke-width="${this.defaultStrokeWidth}" stroke-linecap="round" stroke-linejoin="round"/>
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" stroke="${color}" stroke-width="${this.defaultStrokeWidth}" stroke-linecap="round" stroke-linejoin="round"/>
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" stroke="${color}" stroke-width="${this.defaultStrokeWidth}" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`;
    }

    generateDownloadIcon(color = "#007AFF") {
        return `<svg viewBox="${this.defaultViewBox}" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" fill="none" stroke="${color}" stroke-width="${this.defaultStrokeWidth}" stroke-linecap="round" stroke-linejoin="round"/>
            <polyline points="7,10 12,15 17,10" fill="none" stroke="${color}" stroke-width="${this.defaultStrokeWidth}" stroke-linecap="round" stroke-linejoin="round"/>
            <line x1="12" y1="15" x2="12" y2="3" stroke="${color}" stroke-width="${this.defaultStrokeWidth}" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`;
    }

    generateUploadIcon(color = "#007AFF") {
        return `<svg viewBox="${this.defaultViewBox}" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" fill="none" stroke="${color}" stroke-width="${this.defaultStrokeWidth}" stroke-linecap="round" stroke-linejoin="round"/>
            <polyline points="17,8 12,3 7,8" fill="none" stroke="${color}" stroke-width="${this.defaultStrokeWidth}" stroke-linecap="round" stroke-linejoin="round"/>
            <line x1="12" y1="3" x2="12" y2="15" stroke="${color}" stroke-width="${this.defaultStrokeWidth}" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`;
    }

    generateEditIcon(color = "#007AFF") {
        return `<svg viewBox="${this.defaultViewBox}" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" fill="none" stroke="${color}" stroke-width="${this.defaultStrokeWidth}" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" fill="none" stroke="${color}" stroke-width="${this.defaultStrokeWidth}" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`;
    }

    generateDeleteIcon(color = "#FF3B30") {
        return `<svg viewBox="${this.defaultViewBox}" xmlns="http://www.w3.org/2000/svg">
            <polyline points="3,6 5,6 21,6" fill="none" stroke="${color}" stroke-width="${this.defaultStrokeWidth}" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" fill="none" stroke="${color}" stroke-width="${this.defaultStrokeWidth}" stroke-linecap="round" stroke-linejoin="round"/>
            <line x1="10" y1="11" x2="10" y2="17" stroke="${color}" stroke-width="${this.defaultStrokeWidth}" stroke-linecap="round" stroke-linejoin="round"/>
            <line x1="14" y1="11" x2="14" y2="17" stroke="${color}" stroke-width="${this.defaultStrokeWidth}" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`;
    }

    generateCheckIcon(color = "#34C759") {
        return `<svg viewBox="${this.defaultViewBox}" xmlns="http://www.w3.org/2000/svg">
            <polyline points="20,6 9,17 4,12" fill="none" stroke="${color}" stroke-width="${this.defaultStrokeWidth}" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`;
    }

    generateAlertIcon(color = "#FF9500") {
        return `<svg viewBox="${this.defaultViewBox}" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" fill="none" stroke="${color}" stroke-width="${this.defaultStrokeWidth}" stroke-linecap="round" stroke-linejoin="round"/>
            <line x1="12" y1="9" x2="12" y2="13" stroke="${color}" stroke-width="${this.defaultStrokeWidth}" stroke-linecap="round" stroke-linejoin="round"/>
            <line x1="12" y1="17" x2="12.01" y2="17" stroke="${color}" stroke-width="${this.defaultStrokeWidth}" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`;
    }

    generateInfoIcon(color = "#007AFF") {
        return `<svg viewBox="${this.defaultViewBox}" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" fill="none" stroke="${color}" stroke-width="${this.defaultStrokeWidth}" stroke-linecap="round" stroke-linejoin="round"/>
            <line x1="12" y1="16" x2="12" y2="12" stroke="${color}" stroke-width="${this.defaultStrokeWidth}" stroke-linecap="round" stroke-linejoin="round"/>
            <line x1="12" y1="8" x2="12.01" y2="8" stroke="${color}" stroke-width="${this.defaultStrokeWidth}" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`;
    }

    generateRefreshIcon(color = "#007AFF") {
        return `<svg viewBox="${this.defaultViewBox}" xmlns="http://www.w3.org/2000/svg">
            <polyline points="23,4 23,10 17,10" fill="none" stroke="${color}" stroke-width="${this.defaultStrokeWidth}" stroke-linecap="round" stroke-linejoin="round"/>
            <polyline points="1,20 1,14 7,14" fill="none" stroke="${color}" stroke-width="${this.defaultStrokeWidth}" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" fill="none" stroke="${color}" stroke-width="${this.defaultStrokeWidth}" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`;
    }

    // Generate a complete icon set with consistent styling
    generateIconSet(primaryColor = "#007AFF", secondaryColor = "#5856D6") {
        const icons = {
            // Navigation
            'home': this.generateHomeIcon(primaryColor),
            'search': this.generateSearchIcon(primaryColor),
            'profile': this.generateProfileIcon(primaryColor),
            'settings': this.generateSettingsIcon(primaryColor),
            'back': this.generateBackIcon(primaryColor),
            'forward': this.generateForwardIcon(primaryColor),
            
            // Actions
            'close': this.generateCloseIcon(primaryColor),
            'menu': this.generateMenuIcon(primaryColor),
            'plus': this.generatePlusIcon(primaryColor),
            'edit': this.generateEditIcon(primaryColor),
            'delete': this.generateDeleteIcon('#FF3B30'),
            'share': this.generateShareIcon(primaryColor),
            'download': this.generateDownloadIcon(primaryColor),
            'upload': this.generateUploadIcon(primaryColor),
            'refresh': this.generateRefreshIcon(primaryColor),
            
            // Status
            'check': this.generateCheckIcon('#34C759'),
            'alert': this.generateAlertIcon('#FF9500'),
            'info': this.generateInfoIcon(primaryColor),
            
            // Social
            'star': this.generateStarIcon(secondaryColor),
            'star-filled': this.generateStarIcon(secondaryColor, true),
            'heart': this.generateHeartIcon('#FF2D92'),
            'heart-filled': this.generateHeartIcon('#FF2D92', true),
            'bookmark': this.generateBookmarkIcon(primaryColor),
            'bookmark-filled': this.generateBookmarkIcon(primaryColor, true)
        };

        return icons;
    }

    // Generate iOS-specific icon variations
    generateIOSIconVariations(baseIcon, color) {
        return {
            regular: baseIcon,
            filled: baseIcon.replace(/fill="none"/g, `fill="${color}"`),
            outlined: baseIcon.replace(/stroke-width="2"/g, 'stroke-width="1"'),
            bold: baseIcon.replace(/stroke-width="2"/g, 'stroke-width="3"')
        };
    }

    // Create custom SVG from path data
    createCustomSVG(pathData, color = "#007AFF", viewBox = "0 0 24 24") {
        return `<svg viewBox="${viewBox}" xmlns="http://www.w3.org/2000/svg">
            <path d="${pathData}" fill="${color}"/>
        </svg>`;
    }

    // Create SVG with multiple paths
    createMultiPathSVG(paths, viewBox = "0 0 24 24") {
        const pathElements = paths.map(path => 
            `<path d="${path.d}" fill="${path.fill || 'none'}" stroke="${path.stroke || '#007AFF'}" stroke-width="${path.strokeWidth || '2'}" stroke-linecap="round" stroke-linejoin="round"/>`
        ).join('\n');

        return `<svg viewBox="${viewBox}" xmlns="http://www.w3.org/2000/svg">
            ${pathElements}
        </svg>`;
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SVGTemplates;
}
