// Asset Preview UI Module
class AssetPreview {
    constructor() {
        this.currentAssets = null;
        this.previewContainer = null;
    }

    displayAssets(bundle) {
        this.currentAssets = bundle;
        this.previewContainer = document.getElementById('assetPreview');
        
        if (!this.previewContainer) {
            console.error('Asset preview container not found');
            return;
        }

        // Clear existing content
        this.previewContainer.innerHTML = '';

        // Create preview sections
        this.createImagePreview(bundle.assets.images);
        this.createSVGPreview(bundle.assets.svgs);
        this.createAudioPreview(bundle.assets.audio);
        this.createAnimationPreview(bundle.assets.animations);
    }

    createImagePreview(images) {
        if (!images || images.length === 0) return;

        const section = this.createSection('Images', images.length);
        const grid = this.createGrid();

        // Group images by type and mode
        const groupedImages = this.groupImages(images);

        Object.entries(groupedImages).forEach(([groupName, groupImages]) => {
            const groupContainer = this.createGroupContainer(groupName);
            
            groupImages.forEach(image => {
                const imageCard = this.createImageCard(image);
                groupContainer.appendChild(imageCard);
            });

            grid.appendChild(groupContainer);
        });

        section.appendChild(grid);
        this.previewContainer.appendChild(section);
    }

    createSVGPreview(svgs) {
        if (!svgs || svgs.length === 0) return;

        const section = this.createSection('SVG Icons', svgs.length);
        const grid = this.createGrid();

        // Group SVGs by category
        const groupedSVGs = this.groupSVGs(svgs);

        Object.entries(groupedSVGs).forEach(([category, categorySVGs]) => {
            const groupContainer = this.createGroupContainer(category);
            
            categorySVGs.forEach(svg => {
                const svgCard = this.createSVGCard(svg);
                groupContainer.appendChild(svgCard);
            });

            grid.appendChild(groupContainer);
        });

        section.appendChild(grid);
        this.previewContainer.appendChild(section);
    }

    createAudioPreview(audioFiles) {
        if (!audioFiles || audioFiles.length === 0) return;

        const section = this.createSection('Audio Files', audioFiles.length);
        const list = document.createElement('div');
        list.className = 'audio-list';

        audioFiles.forEach(audio => {
            const audioCard = this.createAudioCard(audio);
            list.appendChild(audioCard);
        });

        section.appendChild(list);
        this.previewContainer.appendChild(section);
    }

    createAnimationPreview(animations) {
        if (!animations || animations.length === 0) return;

        const section = this.createSection('Animations', animations.length);
        const grid = this.createGrid();

        animations.forEach(animation => {
            const animationCard = this.createAnimationCard(animation);
            grid.appendChild(animationCard);
        });

        section.appendChild(grid);
        this.previewContainer.appendChild(section);
    }

    createSection(title, count) {
        const section = document.createElement('div');
        section.className = 'preview-section';
        
        const header = document.createElement('div');
        header.className = 'section-header';
        header.innerHTML = `
            <h3>${title}</h3>
            <span class="asset-count">${count} assets</span>
        `;
        
        section.appendChild(header);
        return section;
    }

    createGrid() {
        const grid = document.createElement('div');
        grid.className = 'asset-grid';
        return grid;
    }

    createGroupContainer(groupName) {
        const container = document.createElement('div');
        container.className = 'asset-group';
        
        const header = document.createElement('div');
        header.className = 'group-header';
        header.textContent = this.formatGroupName(groupName);
        
        container.appendChild(header);
        return container;
    }

    createImageCard(image) {
        const card = document.createElement('div');
        card.className = 'asset-card image-card';
        
        const preview = document.createElement('div');
        preview.className = 'image-preview';
        
        const img = document.createElement('img');
        
        // Handle both blob and URL reference formats
        if (image.urlReference) {
            img.src = image.urlReference;
            img.crossOrigin = 'anonymous';
        } else if (image.blob && image.blob instanceof Blob) {
            img.src = URL.createObjectURL(image.blob);
            img.onload = () => URL.revokeObjectURL(img.src);
        } else if (image.blob && image.blob.isUrl) {
            // Handle URL reference in blob field
            img.src = image.blob.urlReference || image.blob.url;
            img.crossOrigin = 'anonymous';
        }
        
        img.alt = image.filename;
        
        preview.appendChild(img);
        
        const info = document.createElement('div');
        info.className = 'asset-info';
        info.innerHTML = `
            <div class="asset-name">${image.filename}</div>
            <div class="asset-details">
                ${image.actualSize ? `${image.actualSize}×${image.actualSize}px` : ''}
                ${image.density ? ` @${image.density}x` : ''}
            </div>
            ${image.note ? `<div class="asset-note" style="font-size: 0.8em; color: #666; margin-top: 4px;">${image.note}</div>` : ''}
        `;
        
        card.appendChild(preview);
        card.appendChild(info);
        
        // Add click handler for full-size preview
        card.addEventListener('click', () => this.showFullPreview(image));
        
        return card;
    }

    createSVGCard(svg) {
        const card = document.createElement('div');
        card.className = 'asset-card svg-card';
        
        const preview = document.createElement('div');
        preview.className = 'svg-preview';
        preview.innerHTML = svg.content;
        
        const info = document.createElement('div');
        info.className = 'asset-info';
        info.innerHTML = `
            <div class="asset-name">${svg.filename}</div>
            <div class="asset-details">${svg.generated || 'Generated'}</div>
        `;
        
        card.appendChild(preview);
        card.appendChild(info);
        
        // Add click handler for SVG code preview
        card.addEventListener('click', () => this.showSVGCode(svg));
        
        return card;
    }

    createAudioCard(audio) {
        const card = document.createElement('div');
        card.className = 'asset-card audio-card';
        
        const preview = document.createElement('div');
        preview.className = 'audio-preview';
        preview.innerHTML = '🎵';
        
        const info = document.createElement('div');
        info.className = 'asset-info';
        info.innerHTML = `
            <div class="asset-name">${audio.filename}</div>
            <div class="asset-details">${audio.type || 'Audio'}</div>
        `;
        
        const controls = document.createElement('div');
        controls.className = 'audio-controls';
        
        const playButton = document.createElement('button');
        playButton.textContent = '▶️ Play';
        playButton.onclick = () => this.playAudio(audio);
        
        controls.appendChild(playButton);
        
        card.appendChild(preview);
        card.appendChild(info);
        card.appendChild(controls);
        
        return card;
    }

    createAnimationCard(animation) {
        const card = document.createElement('div');
        card.className = 'asset-card animation-card';
        
        const preview = document.createElement('div');
        preview.className = 'animation-preview';
        
        if (animation.format === 'lottie') {
            preview.innerHTML = '🎬 Lottie';
        } else {
            preview.innerHTML = '✨ Animation';
        }
        
        const info = document.createElement('div');
        info.className = 'asset-info';
        info.innerHTML = `
            <div class="asset-name">${animation.filename}</div>
            <div class="asset-details">${animation.format || 'Animation'}</div>
        `;
        
        card.appendChild(preview);
        card.appendChild(info);
        
        return card;
    }

    groupImages(images) {
        const groups = {};
        
        images.forEach(image => {
            let groupKey = image.type || 'misc';
            
            if (image.type === 'app-icon') {
                groupKey = `App Icons (${image.mode} mode)`;
            } else if (image.type === 'launch-screen') {
                groupKey = 'Launch Screens';
            } else if (image.type === 'tab-bar-icon') {
                groupKey = 'Tab Bar Icons';
            }
            
            if (!groups[groupKey]) {
                groups[groupKey] = [];
            }
            groups[groupKey].push(image);
        });
        
        return groups;
    }

    groupSVGs(svgs) {
        const groups = {};
        
        svgs.forEach(svg => {
            const category = svg.category || 'misc';
            const groupKey = this.formatGroupName(category);
            
            if (!groups[groupKey]) {
                groups[groupKey] = [];
            }
            groups[groupKey].push(svg);
        });
        
        return groups;
    }

    formatGroupName(groupName) {
        return groupName
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }

    showFullPreview(image) {
        const modal = this.createModal();
        const img = document.createElement('img');
        
        // Handle both blob and URL reference formats
        if (image.urlReference) {
            img.src = image.urlReference;
            img.crossOrigin = 'anonymous';
        } else if (image.blob && image.blob instanceof Blob) {
            img.src = URL.createObjectURL(image.blob);
            img.onload = () => URL.revokeObjectURL(img.src);
        } else if (image.blob && image.blob.isUrl) {
            // Handle URL reference in blob field
            img.src = image.blob.urlReference || image.blob.url;
            img.crossOrigin = 'anonymous';
        }
        
        img.style.maxWidth = '90vw';
        img.style.maxHeight = '90vh';
        
        const info = document.createElement('div');
        info.className = 'modal-info';
        info.innerHTML = `
            <h3>${image.filename}</h3>
            <p>Size: ${image.actualSize || 'Unknown'}×${image.actualSize || 'Unknown'}px</p>
            <p>Density: @${image.density || 1}x</p>
            <p>Type: ${image.type || 'Image'}</p>
        `;
        
        modal.appendChild(img);
        modal.appendChild(info);
        this.showModal(modal);
    }

    showSVGCode(svg) {
        const modal = this.createModal();
        
        const header = document.createElement('div');
        header.className = 'modal-header';
        header.innerHTML = `<h3>${svg.filename}</h3>`;
        
        const preview = document.createElement('div');
        preview.className = 'svg-large-preview';
        preview.innerHTML = svg.content;
        
        const codeContainer = document.createElement('div');
        codeContainer.className = 'code-container';
        
        const code = document.createElement('pre');
        code.className = 'svg-code';
        code.textContent = svg.content;
        
        const copyButton = document.createElement('button');
        copyButton.textContent = 'Copy SVG Code';
        copyButton.onclick = () => this.copySVGCode(svg.content);
        
        codeContainer.appendChild(copyButton);
        codeContainer.appendChild(code);
        
        modal.appendChild(header);
        modal.appendChild(preview);
        modal.appendChild(codeContainer);
        this.showModal(modal);
    }

    createModal() {
        const modal = document.createElement('div');
        modal.className = 'asset-modal';
        return modal;
    }

    showModal(modal) {
        const overlay = document.createElement('div');
        overlay.className = 'modal-overlay';
        
        const closeButton = document.createElement('button');
        closeButton.className = 'modal-close';
        closeButton.textContent = '×';
        closeButton.onclick = () => document.body.removeChild(overlay);
        
        modal.appendChild(closeButton);
        overlay.appendChild(modal);
        document.body.appendChild(overlay);
        
        // Close on overlay click
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                document.body.removeChild(overlay);
            }
        });
    }

    async copySVGCode(svgContent) {
        try {
            await navigator.clipboard.writeText(svgContent);
            // Show temporary success message
            const button = event.target;
            const originalText = button.textContent;
            button.textContent = 'Copied!';
            setTimeout(() => {
                button.textContent = originalText;
            }, 2000);
        } catch (error) {
            console.error('Failed to copy SVG code:', error);
        }
    }

    async playAudio(audio) {
        try {
            const audioElement = new Audio(URL.createObjectURL(audio.blob));
            await audioElement.play();
            audioElement.onended = () => URL.revokeObjectURL(audioElement.src);
        } catch (error) {
            console.error('Failed to play audio:', error);
        }
    }

    // Export individual asset
    exportAsset(asset) {
        const url = URL.createObjectURL(asset.blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = asset.filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    // Clear preview
    clear() {
        if (this.previewContainer) {
            this.previewContainer.innerHTML = '';
        }
        this.currentAssets = null;
    }

    // Get preview statistics
    getStats() {
        if (!this.currentAssets) return null;
        
        const stats = {
            totalAssets: 0,
            byType: {}
        };
        
        Object.entries(this.currentAssets.assets).forEach(([type, assets]) => {
            stats.byType[type] = assets.length;
            stats.totalAssets += assets.length;
        });
        
        return stats;
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AssetPreview;
}
