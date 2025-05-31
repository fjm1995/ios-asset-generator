// Main Application Controller
class AssetGenerator {
    constructor() {
        this.configManager = new ConfigManager();
        this.apiKeys = {
            openai: null,
            elevenlabs: null
        };
        this.isConnected = false;
        this.currentBundle = null;
        this.generators = {};
        this.processors = {};
        
        this.init();
    }

    async init() {
        this.setupEventListeners();
        this.initializeComponents();
        await this.loadConfiguration();
    }

    setupEventListeners() {
        // API Configuration
        document.addEventListener('DOMContentLoaded', () => {
            this.updateCostEstimate();
        });

        // Asset type checkboxes
        const assetCheckboxes = document.querySelectorAll('input[type="checkbox"][id^="generate"]');
        assetCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => this.updateCostEstimate());
        });

        // Prompt input
        const promptInput = document.getElementById('promptInput');
        if (promptInput) {
            promptInput.addEventListener('input', () => this.updateCostEstimate());
        }
    }

    initializeComponents() {
        // Initialize generators
        this.generators = {
            image: new ImageGenerator(),
            svg: new SVGGenerator(),
            audio: new AudioGenerator(),
            animation: new AnimationGenerator()
        };

        // Initialize processors
        this.processors = {
            image: new ImageProcessor(),
            svg: new SVGOptimizer(),
            packager: new AssetPackager()
        };

        // Initialize UI components
        this.ui = {
            progress: new ProgressTracker(),
            preview: new AssetPreview(),
            interface: new InterfaceManager()
        };
    }

    async loadConfiguration() {
        try {
            await this.configManager.initialize();
            const status = this.configManager.getStatus();
            
            if (status.loaded) {
                this.apiKeys.openai = this.configManager.getApiKey('openai');
                this.apiKeys.elevenlabs = this.configManager.getApiKey('elevenlabs');
                
                this.updateConfigurationUI(status);
                
                if (status.autoConnect && status.hasOpenAI) {
                    await this.connectAPIsFromConfig();
                }
                
                this.setDefaultAssetTypes();
            } else {
                this.showMessage('Configuration file not found. Using manual API key input.', 'warning');
            }
        } catch (error) {
            console.warn('Could not load configuration:', error);
            this.showMessage('Failed to load configuration. Please enter API keys manually.', 'warning');
        }
    }

    updateCostEstimate() {
        const selectedTypes = this.getSelectedAssetTypes();
        let estimatedCost = 0;

        // Cost calculation based on selected asset types
        if (selectedTypes.includes('images')) {
            estimatedCost += 0.16; // 2 DALL-E calls (light/dark mode)
        }
        if (selectedTypes.includes('svgs')) {
            estimatedCost += 0.15; // GPT-4 SVG generation
        }
        if (selectedTypes.includes('audio')) {
            estimatedCost += 1.50; // ElevenLabs audio generation
        }
        if (selectedTypes.includes('launchScreens')) {
            estimatedCost += 0.16; // Additional DALL-E calls
        }

        const costElement = document.getElementById('costEstimate');
        if (costElement) {
            costElement.textContent = `Estimated cost: $${estimatedCost.toFixed(2)}`;
        }
    }

    getSelectedAssetTypes() {
        const types = [];
        const checkboxes = {
            'generateImages': 'images',
            'generateSVGs': 'svgs',
            'generateAudio': 'audio',
            'generateAnimations': 'animations',
            'generateLaunchScreens': 'launchScreens',
            'generateDocumentation': 'documentation'
        };

        Object.entries(checkboxes).forEach(([id, type]) => {
            const checkbox = document.getElementById(id);
            if (checkbox && checkbox.checked) {
                types.push(type);
            }
        });

        return types;
    }

    async connectAPIs() {
        const openaiKey = document.getElementById('openaiKey').value.trim();
        const elevenlabsKey = document.getElementById('elevenlabsKey').value.trim();

        if (!openaiKey) {
            this.showMessage('OpenAI API key is required', 'error');
            return;
        }

        try {
            // Store API keys
            this.apiKeys.openai = openaiKey;
            this.apiKeys.elevenlabs = elevenlabsKey;

            // Store in localStorage for convenience
            localStorage.setItem('openai_api_key', openaiKey);
            if (elevenlabsKey) {
                localStorage.setItem('elevenlabs_api_key', elevenlabsKey);
            }

            // Test OpenAI connection
            await this.testOpenAIConnection();

            // Test ElevenLabs connection if key provided
            if (elevenlabsKey) {
                await this.testElevenLabsConnection();
            }

            this.isConnected = true;
            this.updateAPIStatus(true);
            this.showGenerationInterface();
            this.showMessage('APIs connected successfully!', 'success');

        } catch (error) {
            console.error('API connection failed:', error);
            this.showMessage(`Connection failed: ${error.message}`, 'error');
            this.updateAPIStatus(false);
        }
    }

    async testOpenAIConnection() {
        const response = await fetch('https://api.openai.com/v1/models', {
            headers: {
                'Authorization': `Bearer ${this.apiKeys.openai}`
            }
        });

        if (!response.ok) {
            throw new Error('Invalid OpenAI API key');
        }
    }

    async testElevenLabsConnection() {
        // Test ElevenLabs connection if needed
        // For now, we'll assume it's valid if provided
        return true;
    }

    updateAPIStatus(connected) {
        const statusElement = document.getElementById('apiStatus');
        const indicator = statusElement.querySelector('.status-indicator');
        const text = statusElement.querySelector('.status-text');

        if (connected) {
            indicator.textContent = '🟢';
            text.textContent = 'APIs Connected';
        } else {
            indicator.textContent = '🔴';
            text.textContent = 'APIs Disconnected';
        }
    }

    showGenerationInterface() {
        document.getElementById('configPanel').style.display = 'none';
        document.getElementById('inputPanel').style.display = 'block';
        document.getElementById('inputPanel').classList.add('fade-in');
    }

    async generateAssetBundle() {
        if (!this.isConnected) {
            this.showMessage('Please connect your APIs first', 'error');
            return;
        }

        const prompt = document.getElementById('promptInput').value.trim();
        if (!prompt) {
            this.showMessage('Please enter a description for your assets', 'error');
            return;
        }

        const selectedTypes = this.getSelectedAssetTypes();
        if (selectedTypes.length === 0) {
            this.showMessage('Please select at least one asset type', 'error');
            return;
        }

        try {
            // Show progress panel
            this.showProgressPanel();
            
            // Disable generate button
            const generateBtn = document.getElementById('generateBtn');
            generateBtn.disabled = true;
            generateBtn.querySelector('.btn-text').textContent = 'Generating...';

            // Start generation process
            this.ui.progress.start();
            
            const bundle = await this.processAssetGeneration(prompt, selectedTypes);
            
            // Show results
            this.currentBundle = bundle;
            this.ui.preview.displayAssets(bundle);
            this.showDownloadSection(bundle);
            
            this.ui.progress.complete();
            this.showMessage('Asset bundle generated successfully!', 'success');

        } catch (error) {
            console.error('Generation failed:', error);
            this.showMessage(`Generation failed: ${error.message}`, 'error');
            this.ui.progress.error();
        } finally {
            // Re-enable generate button
            const generateBtn = document.getElementById('generateBtn');
            generateBtn.disabled = false;
            generateBtn.querySelector('.btn-text').textContent = 'Generate Asset Bundle';
        }
    }

    async processAssetGeneration(prompt, selectedTypes) {
        const bundle = {
            metadata: {
                prompt,
                timestamp: new Date().toISOString(),
                types: selectedTypes
            },
            assets: {
                images: [],
                svgs: [],
                audio: [],
                animations: [],
                documentation: []
            }
        };

        // Process each asset type
        for (const type of selectedTypes) {
            this.ui.progress.updateStep(type, 'active');
            
            try {
                switch (type) {
                    case 'images':
                        bundle.assets.images = await this.generators.image.generate(prompt, this.apiKeys.openai);
                        break;
                    case 'svgs':
                        bundle.assets.svgs = await this.generators.svg.generate(prompt, this.apiKeys.openai);
                        break;
                    case 'audio':
                        if (this.apiKeys.elevenlabs) {
                            bundle.assets.audio = await this.generators.audio.generate(prompt, this.apiKeys.elevenlabs);
                        }
                        break;
                    case 'animations':
                        bundle.assets.animations = await this.generators.animation.generate(prompt);
                        break;
                    case 'launchScreens':
                        const launchScreens = await this.generators.image.generateLaunchScreens(prompt, this.apiKeys.openai);
                        bundle.assets.images.push(...launchScreens);
                        break;
                    case 'documentation':
                        bundle.assets.documentation = await this.generateDocumentation(bundle);
                        break;
                }
                
                this.ui.progress.updateStep(type, 'completed');
            } catch (error) {
                console.error(`Failed to generate ${type}:`, error);
                this.ui.progress.updateStep(type, 'error');
                // Continue with other types
            }
        }

        // Process and package assets
        this.ui.progress.updateStep('processing', 'active');
        await this.processors.image.processAll(bundle.assets.images);
        await this.processors.svg.optimizeAll(bundle.assets.svgs);
        this.ui.progress.updateStep('processing', 'completed');

        return bundle;
    }

    async generateDocumentation(bundle) {
        const docs = [];
        
        // Generate README
        const readme = DocumentationTemplates.generateReadme(bundle.metadata);
        docs.push({
            filename: 'README.md',
            content: readme,
            type: 'markdown'
        });

        // Generate asset manifest
        const manifest = DocumentationTemplates.generateManifest(bundle);
        docs.push({
            filename: 'asset-manifest.json',
            content: JSON.stringify(manifest, null, 2),
            type: 'json'
        });

        // Generate implementation guide
        const guide = DocumentationTemplates.generateImplementationGuide(bundle);
        docs.push({
            filename: 'implementation-guide.md',
            content: guide,
            type: 'markdown'
        });

        return docs;
    }

    showProgressPanel() {
        document.getElementById('previewPanel').style.display = 'block';
        document.getElementById('previewPanel').classList.add('slide-up');
    }

    showDownloadSection(bundle) {
        const downloadSection = document.getElementById('downloadSection');
        downloadSection.style.display = 'block';
        
        // Update bundle info
        this.updateBundleInfo(bundle);
        
        // Setup download button
        const downloadBtn = document.getElementById('downloadBtn');
        downloadBtn.onclick = () => this.downloadBundle(bundle);
    }

    updateBundleInfo(bundle) {
        const bundleInfo = document.getElementById('bundleInfo');
        const totalAssets = Object.values(bundle.assets).reduce((total, assets) => total + assets.length, 0);
        
        bundleInfo.innerHTML = `
            <div class="bundle-stats">
                <div class="bundle-stat">
                    <span class="bundle-stat-number">${totalAssets}</span>
                    <span class="bundle-stat-label">Total Assets</span>
                </div>
                <div class="bundle-stat">
                    <span class="bundle-stat-number">${bundle.assets.images.length}</span>
                    <span class="bundle-stat-label">Images</span>
                </div>
                <div class="bundle-stat">
                    <span class="bundle-stat-number">${bundle.assets.svgs.length}</span>
                    <span class="bundle-stat-label">SVGs</span>
                </div>
                <div class="bundle-stat">
                    <span class="bundle-stat-number">${bundle.assets.audio.length}</span>
                    <span class="bundle-stat-label">Audio Files</span>
                </div>
            </div>
        `;
    }

    async downloadBundle(bundle) {
        try {
            this.showMessage('Preparing download...', 'info');
            
            const zipBlob = await this.processors.packager.createBundle(bundle);
            const timestamp = new Date().toISOString().slice(0, 10);
            const filename = `iOS-Assets-${timestamp}.zip`;
            
            // Create download link
            const url = URL.createObjectURL(zipBlob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            this.showMessage('Download started!', 'success');
        } catch (error) {
            console.error('Download failed:', error);
            this.showMessage(`Download failed: ${error.message}`, 'error');
        }
    }

    updateConfigurationUI(status) {
        if (status.hasOpenAI) {
            document.getElementById('openaiKey').value = '••••••••••••••••';
            document.getElementById('openaiKey').disabled = true;
        }
        
        if (status.hasElevenLabs) {
            document.getElementById('elevenlabsKey').value = '••••••••••••••••';
            document.getElementById('elevenlabsKey').disabled = true;
        }
        
        const connectBtn = document.querySelector('.connect-apis-btn');
        if (connectBtn && status.hasOpenAI) {
            connectBtn.textContent = 'APIs Loaded from Config';
        }
    }

    async connectAPIsFromConfig() {
        try {
            await this.testOpenAIConnection();
            
            if (this.apiKeys.elevenlabs) {
                await this.testElevenLabsConnection();
            }
            
            this.isConnected = true;
            this.updateAPIStatus(true);
            this.showGenerationInterface();
            this.showMessage('APIs connected automatically from configuration!', 'success');
        } catch (error) {
            console.error('Auto-connection failed:', error);
            this.showMessage(`Auto-connection failed: ${error.message}`, 'error');
            this.updateAPIStatus(false);
        }
    }

    setDefaultAssetTypes() {
        const defaultTypes = this.configManager.getDefaultAssetTypes();
        const checkboxes = {
            'generateImages': 'images',
            'generateSVGs': 'svgs',
            'generateAudio': 'audio',
            'generateAnimations': 'animations',
            'generateLaunchScreens': 'launchScreens',
            'generateDocumentation': 'documentation'
        };
        
        Object.entries(checkboxes).forEach(([id, type]) => {
            const checkbox = document.getElementById(id);
            if (checkbox) {
                checkbox.checked = defaultTypes.includes(type);
            }
        });
    }

    showMessage(text, type = 'info') {
        // Create message element
        const message = document.createElement('div');
        message.className = `message message-${type}`;
        
        const icons = {
            success: '✅',
            error: '❌',
            warning: '⚠️',
            info: 'ℹ️'
        };
        
        message.innerHTML = `
            <span class="message-icon">${icons[type]}</span>
            <span>${text}</span>
            <button class="message-close" onclick="this.parentElement.remove()">×</button>
        `;
        
        // Add to page
        const workspace = document.querySelector('.generator-workspace');
        workspace.insertBefore(message, workspace.firstChild);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (message.parentElement) {
                message.remove();
            }
        }, 5000);
    }
}

// Global functions for HTML event handlers
function togglePasswordVisibility(inputId) {
    const input = document.getElementById(inputId);
    const button = input.nextElementSibling;
    
    if (input.type === 'password') {
        input.type = 'text';
        button.textContent = '🙈';
    } else {
        input.type = 'password';
        button.textContent = '👁️';
    }
}

function connectAPIs() {
    window.assetGenerator.connectAPIs();
}

function generateAssetBundle() {
    window.assetGenerator.generateAssetBundle();
}

// Initialize application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.assetGenerator = new AssetGenerator();
});
