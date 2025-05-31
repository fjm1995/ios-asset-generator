// Configuration file for iOS Asset Generator
// Edit the values below with your API keys and preferences

window.AssetGeneratorConfig = {
    apiKeys: {
        // Required: Your OpenAI API key (get from https://platform.openai.com/api-keys)
        openai: "",
        
        // Optional: Your ElevenLabs API key for audio generation (get from https://elevenlabs.io/)
        elevenlabs: ""
    },
    
    settings: {
        // Automatically connect APIs when the app loads (if keys are provided)
        autoConnect: true,
        
        // Default asset types to select when the app loads
        defaultAssetTypes: ["images", "svgs", "documentation"],
        
        // Maximum number of retry attempts for failed API calls
        maxRetries: 3,
        
        // Delay between API requests in milliseconds (helps avoid rate limits)
        requestDelay: 1000
    },
    
    generation: {
        imageSettings: {
            // Image quality: "standard" or "hd"
            quality: "hd",
            
            // Image style: "natural" or "vivid"
            style: "natural",
            
            // Generated image sizes (DALL-E 3 supports 1024x1024, 1024x1792, 1792x1024)
            sizes: ["1024x1024"]
        },
        
        svgSettings: {
            // Optimize SVG files for smaller size
            optimize: true,
            
            // Minify SVG code
            minify: true
        }
    }
};

// Instructions for setup:
// 1. Replace the empty strings above with your actual API keys
// 2. Customize the settings as needed
// 3. Save this file and reload the application

// Example configuration:
/*
window.AssetGeneratorConfig = {
    apiKeys: {
        openai: "sk-proj-your-actual-openai-key-here",
        elevenlabs: "your-actual-elevenlabs-key-here"
    },
    settings: {
        autoConnect: true,
        defaultAssetTypes: ["images", "svgs", "audio", "documentation"],
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
*/
