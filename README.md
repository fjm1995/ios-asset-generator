# iOS Asset Generator

A powerful web application that generates complete iOS app asset bundles from text prompts using AI APIs.

## Features

- **AI-Powered Generation**: Uses OpenAI DALL-E 3 for images and GPT-4 for SVG creation
- **Complete iOS Coverage**: Generates app icons, UI icons, launch screens, and supporting assets
- **Professional Compliance**: All assets follow Apple's Human Interface Guidelines
- **Multiple Asset Types**: Images (PNG), vectors (SVG), audio files, animations, and documentation
- **Light/Dark Mode Support**: Generates assets optimized for both iOS themes
- **Configuration File Support**: Load API keys and settings from a config file
- **Real-time Progress**: Visual progress tracking during generation
- **Asset Preview**: Interactive preview of all generated assets
- **Professional Packaging**: Creates organized ZIP bundles with documentation

## Quick Start

### Option 1: Using Configuration File (Recommended)

1. **Configure API Keys**: Edit the `js/config/config.js` file with your API keys:

```javascript
window.AssetGeneratorConfig = {
    apiKeys: {
        openai: "sk-proj-your-openai-api-key-here",
        elevenlabs: "your-elevenlabs-api-key-here"
    },
    settings: {
        autoConnect: true,
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
```

2. **Open the Application**: Open `index.html` in your web browser

3. **Generate Assets**: The app will automatically load your API keys and you can start generating assets immediately

### Option 2: Manual API Key Entry

1. Open `index.html` in your web browser
2. Enter your OpenAI API key (required)
3. Optionally enter your ElevenLabs API key for audio generation
4. Click "Connect APIs"
5. Start generating assets

## Configuration File Reference

### API Keys Section

```json
"apiKeys": {
  "openai": "sk-proj-...",     // Required: Your OpenAI API key
  "elevenlabs": "..."          // Optional: For audio generation
}
```

### Settings Section

```json
"settings": {
  "autoConnect": true,                                    // Auto-connect APIs on startup
  "defaultAssetTypes": ["images", "svgs", "documentation"], // Default selected asset types
  "maxRetries": 3,                                        // API retry attempts
  "requestDelay": 1000                                    // Delay between requests (ms)
}
```

### Generation Settings

```json
"generation": {
  "imageSettings": {
    "quality": "hd",              // Image quality: "standard" or "hd"
    "style": "natural",           // Image style: "natural" or "vivid"
    "sizes": ["1024x1024"]        // Generated image sizes
  },
  "svgSettings": {
    "optimize": true,             // Optimize SVG files
    "minify": true               // Minify SVG code
  }
}
```

## Asset Types

### 🖼️ App Icons
- All required iOS app icon sizes (20pt to 1024pt)
- Light and dark mode variants
- Multiple density versions (@1x, @2x, @3x)
- Proper corner radius and visual effects

### 📐 SVG Icons
- Scalable vector graphics for UI elements
- Optimized for iOS interface guidelines
- Theme-aware color schemes
- Consistent design language

### 🔊 Audio SFX (Requires ElevenLabs API)
- UI interaction sounds
- Notification sounds
- Success/error feedback audio
- Custom sound effects based on app theme

### 🎬 Animations
- Lottie JSON animations
- Loading indicators
- Micro-interactions
- Transition effects

### 📱 Launch Screens
- iPhone and iPad optimized backgrounds
- Multiple device size support
- Light and dark theme variants

### 📚 Documentation
- README with implementation instructions
- Asset manifest with file details
- Usage examples and best practices
- Implementation guide for Xcode

## Generated Bundle Structure

```
iOS-Asset-Bundle-YYYY-MM-DD.zip
├── images/
│   ├── app-icons/
│   │   ├── light-mode/
│   │   │   ├── icon-20@1x.png
│   │   │   ├── icon-20@2x.png
│   │   │   ├── icon-20@3x.png
│   │   │   ├── icon-29@1x.png
│   │   │   ├── icon-29@2x.png
│   │   │   ├── icon-29@3x.png
│   │   │   ├── icon-40@1x.png
│   │   │   ├── icon-40@2x.png
│   │   │   ├── icon-40@3x.png
│   │   │   ├── icon-60@2x.png
│   │   │   ├── icon-60@3x.png
│   │   │   ├── icon-76@1x.png
│   │   │   ├── icon-76@2x.png
│   │   │   ├── icon-83.5@2x.png
│   │   │   └── icon-1024@1x.png
│   │   └── dark-mode/
│   │       └── [same structure as light-mode]
│   └── launch-screens/
│       ├── light-mode/
│       └── dark-mode/
├── vectors/
│   ├── ui-icons/
│   └── themed/
├── audio/
│   ├── ui-sounds/
│   └── notifications/
├── animations/
│   └── lottie/
└── documentation/
    ├── README.md
    ├── implementation-guide.md
    ├── asset-manifest.json
    └── usage-examples.md
```

## API Requirements

### OpenAI API (Required)
- **Purpose**: Image generation (DALL-E 3) and SVG creation (GPT-4)
- **Cost**: ~$0.16 for a complete image set, ~$0.15 for SVG generation
- **Get API Key**: [OpenAI Platform](https://platform.openai.com/api-keys)

### ElevenLabs API (Optional)
- **Purpose**: Audio generation for UI sounds and effects
- **Cost**: ~$1.50 for a complete audio set
- **Subscription Required**: Starter plan ($5/month) or higher - Free tier has very limited characters
- **Get API Key**: [ElevenLabs](https://elevenlabs.io/)
- **Recommended Plan**: Starter ($5/month) provides 30,000 characters, sufficient for multiple asset generations

## Usage Examples

### Basic App Icons
```
Prompt: "Modern fitness app, green and blue gradient, minimalist design, health-focused"
Asset Types: ✅ App Icons, ✅ Documentation
```

### Complete Asset Bundle
```
Prompt: "E-commerce shopping app, purple and gold theme, luxury brand, elegant design"
Asset Types: ✅ App Icons, ✅ SVG Icons, ✅ Launch Screens, ✅ Documentation
```

### Gaming App with Audio
```
Prompt: "Retro arcade game, neon colors, 80s aesthetic, fun and energetic"
Asset Types: ✅ App Icons, ✅ SVG Icons, ✅ Audio SFX, ✅ Animations, ✅ Documentation
```

## Viewing Logs and Debugging

### How to View Console Logs

**In Chrome/Safari:**
1. Right-click on the page and select "Inspect" or "Inspect Element"
2. Click on the "Console" tab
3. You'll see all application logs, errors, and debug information
4. Look for messages like "Configuration loaded from config.js" or any error messages

**In Firefox:**
1. Right-click and select "Inspect Element"
2. Click on the "Console" tab
3. View logs and error messages

**What to Look For:**
- `Configuration loaded from config.js` - Confirms config file loaded successfully
- `APIs connected successfully!` - Confirms API connection worked
- Error messages in red - Indicate problems that need fixing
- Network errors - May indicate API key or connectivity issues

### Common Log Messages

**Success Messages:**
- `Configuration loaded from config.js` - Config file loaded properly
- `APIs connected successfully!` - API keys validated and connected
- `Generation complete` - Asset generation finished successfully

**Warning Messages:**
- `Configuration validation failed` - Check your API keys in config.js
- `No configuration found in config.js` - Config file not loaded or empty
- `Could not load configuration` - Config file has syntax errors

**Error Messages:**
- `Invalid OpenAI API key` - Check your OpenAI API key format and validity
- `Failed to generate` - API request failed, check network and credits
- `CORS policy` - File access blocked (use a local server instead)

## Troubleshooting

### Configuration Issues

**Problem**: "Configuration file not found"
- **Solution**: Ensure `config.json` exists in the same directory as `index.html`

**Problem**: "OpenAI API key is required"
- **Solution**: Add your OpenAI API key to the `config.json` file or enter it manually

**Problem**: "Invalid OpenAI API key"
- **Solution**: Verify your API key starts with `sk-proj-` and has sufficient credits

### Generation Issues

**Problem**: Generation fails or produces poor results
- **Solution**: 
  - Check your internet connection
  - Verify API keys are valid and have sufficient credits
  - Try a more detailed prompt
  - Reduce the number of selected asset types

**Problem**: Audio generation not working
- **Solution**: Ensure you have a valid ElevenLabs API key configured

### Performance Issues

**Problem**: Generation is slow
- **Solution**: 
  - Increase `requestDelay` in config to avoid rate limits
  - Generate fewer asset types at once
  - Check your internet connection speed

## Development

### File Structure
```
├── index.html                          # Main application
├── config.json                         # Configuration file
├── css/
│   ├── styles.css                      # Main styles
│   └── components.css                  # Component styles
└── js/
    ├── config/
    │   └── config-manager.js           # Configuration management
    ├── api/
    │   └── openai.js                   # OpenAI API integration
    ├── generators/
    │   ├── image-generator.js          # Image generation
    │   ├── svg-generator.js            # SVG generation
    │   ├── audio-generator.js          # Audio generation
    │   └── animation-generator.js      # Animation generation
    ├── processors/
    │   ├── image-processor.js          # Image processing
    │   ├── svg-optimizer.js            # SVG optimization
    │   └── asset-packager.js           # Bundle packaging
    ├── ui/
    │   ├── progress.js                 # Progress tracking
    │   ├── asset-preview.js            # Asset preview
    │   └── interface-manager.js        # UI management
    ├── templates/
    │   ├── svg-templates.js            # SVG templates
    │   └── documentation-templates.js  # Documentation templates
    └── main.js                         # Main application controller
```

### Adding Custom Asset Types

1. Create a new generator in `js/generators/`
2. Add the asset type to the UI in `index.html`
3. Update the generation logic in `js/main.js`
4. Add processing logic if needed

## License

This project is open source and available under the MIT License.

## Support

For issues, questions, or feature requests, please check the troubleshooting section above or create an issue in the project repository.
