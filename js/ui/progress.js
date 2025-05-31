// Progress Tracking UI Module
class ProgressTracker {
    constructor() {
        this.currentStep = 0;
        this.totalSteps = 7;
        this.steps = [
            'parsing',
            'images', 
            'svgs',
            'audio',
            'animations',
            'processing',
            'packaging'
        ];
        this.stepNames = {
            'parsing': 'Parsing prompt',
            'images': 'Generating images',
            'svgs': 'Creating SVGs',
            'audio': 'Generating audio',
            'animations': 'Creating animations',
            'processing': 'Processing assets',
            'packaging': 'Packaging bundle'
        };
    }

    start() {
        this.currentStep = 0;
        this.updateProgress(0);
        this.updateText('Starting generation...');
        this.resetSteps();
    }

    updateStep(stepName, status) {
        const stepElement = document.querySelector(`[data-step="${stepName}"]`);
        if (stepElement) {
            // Remove existing status classes
            stepElement.classList.remove('active', 'completed', 'error');
            
            // Add new status class
            stepElement.classList.add(status);
            
            if (status === 'active') {
                this.updateText(this.stepNames[stepName] || stepName);
            } else if (status === 'completed') {
                this.currentStep++;
                const progress = (this.currentStep / this.totalSteps) * 100;
                this.updateProgress(progress);
            }
        }
    }

    updateProgress(percentage) {
        const progressFill = document.getElementById('progressFill');
        if (progressFill) {
            progressFill.style.width = `${percentage}%`;
        }
    }

    updateText(text) {
        const progressText = document.getElementById('progressText');
        if (progressText) {
            progressText.textContent = text;
        }
    }

    complete() {
        this.updateProgress(100);
        this.updateText('Generation complete!');
        
        // Mark all steps as completed
        this.steps.forEach(step => {
            this.updateStep(step, 'completed');
        });
    }

    error(message = 'Generation failed') {
        this.updateText(message);
        
        // Mark current step as error
        const currentStepName = this.steps[this.currentStep];
        if (currentStepName) {
            this.updateStep(currentStepName, 'error');
        }
    }

    resetSteps() {
        const stepElements = document.querySelectorAll('.step');
        stepElements.forEach(element => {
            element.classList.remove('active', 'completed', 'error');
        });
    }

    // Set custom step progress for specific operations
    setCustomProgress(stepName, progress, text) {
        this.updateStep(stepName, 'active');
        this.updateProgress(progress);
        this.updateText(text);
    }

    // Show detailed progress for image generation
    showImageProgress(current, total, mode) {
        const percentage = (current / total) * 100;
        const text = `Generating ${mode} mode images (${current}/${total})`;
        this.setCustomProgress('images', percentage * 0.3, text); // Images take 30% of total
    }

    // Show detailed progress for SVG generation
    showSVGProgress(current, total) {
        const percentage = (current / total) * 100;
        const text = `Creating SVG icons (${current}/${total})`;
        this.setCustomProgress('svgs', 30 + (percentage * 0.2), text); // SVGs take 20% of total
    }

    // Show detailed progress for audio generation
    showAudioProgress(current, total) {
        const percentage = (current / total) * 100;
        const text = `Generating audio files (${current}/${total})`;
        this.setCustomProgress('audio', 50 + (percentage * 0.15), text); // Audio takes 15% of total
    }

    // Show processing progress
    showProcessingProgress(operation, percentage) {
        const text = `Processing: ${operation}`;
        this.setCustomProgress('processing', 65 + (percentage * 0.25), text); // Processing takes 25% of total
    }

    // Show packaging progress
    showPackagingProgress(operation, percentage) {
        const text = `Packaging: ${operation}`;
        this.setCustomProgress('packaging', 90 + (percentage * 0.1), text); // Packaging takes 10% of total
    }

    // Animate progress bar
    animateProgress(targetPercentage, duration = 500) {
        const progressFill = document.getElementById('progressFill');
        if (!progressFill) return;

        const startPercentage = parseFloat(progressFill.style.width) || 0;
        const difference = targetPercentage - startPercentage;
        const startTime = Date.now();

        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smooth animation
            const easeOutCubic = 1 - Math.pow(1 - progress, 3);
            const currentPercentage = startPercentage + (difference * easeOutCubic);
            
            progressFill.style.width = `${currentPercentage}%`;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }

    // Add step completion animation
    animateStepCompletion(stepName) {
        const stepElement = document.querySelector(`[data-step="${stepName}"]`);
        if (stepElement) {
            stepElement.style.transform = 'scale(1.05)';
            stepElement.style.transition = 'transform 0.3s ease';
            
            setTimeout(() => {
                stepElement.style.transform = 'scale(1)';
            }, 300);
        }
    }

    // Show estimated time remaining
    updateTimeEstimate(estimatedSeconds) {
        const progressText = document.getElementById('progressText');
        if (progressText && estimatedSeconds > 0) {
            const minutes = Math.floor(estimatedSeconds / 60);
            const seconds = estimatedSeconds % 60;
            
            let timeText = '';
            if (minutes > 0) {
                timeText = `${minutes}m ${seconds}s remaining`;
            } else {
                timeText = `${seconds}s remaining`;
            }
            
            progressText.textContent += ` • ${timeText}`;
        }
    }

    // Show current operation details
    showOperationDetails(operation, details) {
        const progressText = document.getElementById('progressText');
        if (progressText) {
            progressText.innerHTML = `
                <div class="operation-main">${operation}</div>
                <div class="operation-details">${details}</div>
            `;
        }
    }

    // Add progress indicators for API calls
    showAPIProgress(apiName, callNumber, totalCalls) {
        const percentage = (callNumber / totalCalls) * 100;
        const text = `${apiName} API call ${callNumber}/${totalCalls}`;
        
        // Update the current step with API progress
        const currentStepName = this.steps[this.currentStep];
        this.setCustomProgress(currentStepName, percentage, text);
    }

    // Show retry progress
    showRetryProgress(operation, attempt, maxAttempts) {
        const text = `Retrying ${operation} (${attempt}/${maxAttempts})`;
        this.updateText(text);
    }

    // Get current progress percentage
    getCurrentProgress() {
        const progressFill = document.getElementById('progressFill');
        if (progressFill) {
            return parseFloat(progressFill.style.width) || 0;
        }
        return 0;
    }

    // Check if generation is in progress
    isInProgress() {
        return this.currentStep > 0 && this.currentStep < this.totalSteps;
    }

    // Get step status
    getStepStatus(stepName) {
        const stepElement = document.querySelector(`[data-step="${stepName}"]`);
        if (stepElement) {
            if (stepElement.classList.contains('completed')) return 'completed';
            if (stepElement.classList.contains('active')) return 'active';
            if (stepElement.classList.contains('error')) return 'error';
        }
        return 'pending';
    }

    // Add visual feedback for long operations
    addPulseEffect(stepName) {
        const stepElement = document.querySelector(`[data-step="${stepName}"]`);
        if (stepElement) {
            stepElement.classList.add('pulse');
        }
    }

    removePulseEffect(stepName) {
        const stepElement = document.querySelector(`[data-step="${stepName}"]`);
        if (stepElement) {
            stepElement.classList.remove('pulse');
        }
    }

    // Show success message with confetti effect
    showSuccess(message = 'Assets generated successfully!') {
        this.updateText(message);
        this.addSuccessAnimation();
    }

    addSuccessAnimation() {
        // Add success animation class to progress container
        const progressContainer = document.querySelector('.progress-container');
        if (progressContainer) {
            progressContainer.classList.add('success-animation');
            
            setTimeout(() => {
                progressContainer.classList.remove('success-animation');
            }, 2000);
        }
    }

    // Show warning for partial completion
    showWarning(message, completedSteps) {
        this.updateText(`⚠️ ${message}`);
        
        // Mark completed steps
        completedSteps.forEach(step => {
            this.updateStep(step, 'completed');
        });
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ProgressTracker;
}
