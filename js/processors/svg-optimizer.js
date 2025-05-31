// SVG Optimization Module
class SVGOptimizer {
    constructor() {
        this.optimizationRules = {
            removeComments: true,
            removeMetadata: true,
            removeEditorsNSData: true,
            cleanupAttrs: true,
            mergeStyles: true,
            inlineStyles: true,
            minifyStyles: true,
            cleanupNumericValues: true,
            convertColors: true,
            removeUnknownsAndDefaults: true,
            removeNonInheritGroupAttrs: true,
            removeUselessStrokeAndFill: true,
            removeViewBox: false,
            cleanupEnableBackground: true,
            removeHiddenElems: true,
            removeEmptyText: true,
            convertShapeToPath: false,
            moveElemsAttrsToGroup: true,
            moveGroupAttrsToElems: true,
            collapseGroups: true,
            convertPathData: true,
            convertTransform: true,
            removeEmptyAttrs: true,
            removeEmptyContainers: true,
            mergePaths: true,
            removeUnusedNS: true,
            sortAttrs: true,
            removeTitle: false,
            removeDesc: false
        };
    }

    async optimizeAll(svgs) {
        console.log(`Optimizing ${svgs.length} SVG files...`);
        
        for (const svg of svgs) {
            svg.content = await this.optimize(svg.content);
        }
        
        return svgs;
    }

    async optimize(svgContent) {
        try {
            // Basic SVG optimization
            let optimized = svgContent;
            
            // Remove comments
            optimized = optimized.replace(/<!--[\s\S]*?-->/g, '');
            
            // Remove unnecessary whitespace
            optimized = optimized.replace(/\s+/g, ' ');
            optimized = optimized.replace(/>\s+</g, '><');
            
            // Remove empty attributes
            optimized = optimized.replace(/\s+[a-zA-Z-]+=""/g, '');
            
            // Optimize numeric values
            optimized = optimized.replace(/(\d+\.\d{3,})/g, (match) => {
                return parseFloat(match).toFixed(2);
            });
            
            // Remove default values
            optimized = optimized.replace(/fill="black"/g, '');
            optimized = optimized.replace(/stroke="none"/g, '');
            
            return optimized.trim();
        } catch (error) {
            console.error('SVG optimization failed:', error);
            return svgContent; // Return original if optimization fails
        }
    }

    validateSVG(svgContent) {
        // Basic SVG validation
        return svgContent.includes('<svg') && svgContent.includes('</svg>');
    }

    minifySVG(svgContent) {
        // Remove all unnecessary whitespace
        return svgContent
            .replace(/\s+/g, ' ')
            .replace(/>\s+</g, '><')
            .trim();
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SVGOptimizer;
}
