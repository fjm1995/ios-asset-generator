// Interface Manager Module
class InterfaceManager {
    constructor() {
        this.currentPanel = 'config';
        this.animations = {
            fadeIn: 'fade-in',
            slideUp: 'slide-up',
            slideDown: 'slide-down'
        };
    }

    showPanel(panelId, animation = 'fade-in') {
        const panel = document.getElementById(panelId);
        if (panel) {
            panel.style.display = 'block';
            panel.classList.add(animation);
            this.currentPanel = panelId;
        }
    }

    hidePanel(panelId) {
        const panel = document.getElementById(panelId);
        if (panel) {
            panel.style.display = 'none';
            panel.classList.remove(...Object.values(this.animations));
        }
    }

    switchPanel(fromPanelId, toPanelId, animation = 'fade-in') {
        this.hidePanel(fromPanelId);
        setTimeout(() => {
            this.showPanel(toPanelId, animation);
        }, 150);
    }

    updateButtonState(buttonId, state) {
        const button = document.getElementById(buttonId);
        if (button) {
            button.disabled = state === 'disabled';
            if (state === 'loading') {
                button.classList.add('loading');
            } else {
                button.classList.remove('loading');
            }
        }
    }

    showToast(message, type = 'info', duration = 3000) {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, duration);
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = InterfaceManager;
}
