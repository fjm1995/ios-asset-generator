# iOS Asset Generator Setup

## Secure Deployment with GitHub Secrets

This repository uses GitHub Actions to securely deploy the iOS Asset Generator with your API keys injected from repository secrets.

### Setup Instructions

#### 1. Add Repository Secrets

Go to your repository: https://github.com/fjm1995/ios-asset-generator

1. Click **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret**
3. Add these secrets:

**Required:**
- **Name**: `OPENAI_API_KEY`
- **Value**: Your OpenAI API key (starts with `sk-proj-...`)

**Optional (for audio generation):**
- **Name**: `ELEVENLABS_API_KEY` 
- **Value**: Your ElevenLabs API key (starts with `sk_...`)

#### 2. Enable GitHub Pages

1. Go to **Settings** → **Pages**
2. Under **Source**, select **GitHub Actions**
3. The workflow will automatically deploy when you push changes

#### 3. Access Your App

Your secure iOS Asset Generator will be available at:
**https://fjm1995.github.io/ios-asset-generator**

### How It Works

- API keys are stored securely as GitHub repository secrets
- GitHub Actions injects the keys during deployment
- Keys are never exposed in the source code or browser
- Automatic deployment on every push to main branch

### Security Benefits

✅ **API keys never exposed** in source code  
✅ **Secure server-side injection** during build  
✅ **No client-side key storage**  
✅ **Automatic deployment** with secrets  
✅ **Professional security practices**  

### Manual Deployment

If you prefer to deploy manually:

1. Clone the repository
2. Edit `js/config/config.js` with your API keys
3. Deploy to your preferred hosting service
4. **Never commit API keys to version control**

### Getting API Keys

**OpenAI API Key:**
1. Go to https://platform.openai.com/api-keys
2. Create a new secret key
3. Copy the key (starts with `sk-proj-...`)

**ElevenLabs API Key (Optional):**
1. Go to https://elevenlabs.io/
2. Sign up for an account
3. Go to Profile → API Keys
4. Copy your API key (starts with `sk_...`)

### Cost Information

**OpenAI DALL-E 3:**
- HD Quality: $0.080 per image
- Standard Quality: $0.040 per image
- Complete asset bundle: ~$2-5 depending on complexity

**ElevenLabs Audio:**
- Starter Plan: $5/month (30,000 characters)
- Complete audio set: ~$1.50 per generation

### Support

For issues or questions:
1. Check the browser console for error messages
2. Verify your API keys are correctly set in repository secrets
3. Ensure you have sufficient API credits
4. Review the generation logs in GitHub Actions
