// Animation handling for Dubai Yacht Registration Website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations
    initAnimations();
    
    // Add wave animations to hero sections
    addWaveAnimations();
    
    // Add boat animations
    addBoatAnimations();
    
    // Initialize counters
    initCounters();
    
    // Add shimmer effect to primary buttons
    addButtonEffects();
});

// Initialize scroll-triggered animations
function initAnimations() {
    // Set up Intersection Observer for animations
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // If it's a counter, start counting
                if (entry.target.classList.contains('counter-value')) {
                    animateCounter(entry.target);
                }
                
                // Only trigger once for certain animations
                if (entry.target.dataset.animateOnce === 'true') {
                    animationObserver.unobserve(entry.target);
                }
            } else if (!entry.target.dataset.animateOnce) {
                // Remove visible class if not set to animate once
                entry.target.classList.remove('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe elements with animation classes
    document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .zoom-in, .counter-value').forEach(el => {
        animationObserver.observe(el);
    });
    
    // Add floating animation to specific elements
    document.querySelectorAll('.service-icon, .card-icon, .value-icon').forEach(el => {
        el.classList.add('float-animation');
    });
    
    // Add rotating animation to specific icons
    document.querySelectorAll('.logo-icon .fa-anchor').forEach(el => {
        el.classList.add('rotate-animation');
    });
    
    // Add pulse animation to CTA buttons
    document.querySelectorAll('.btn-primary').forEach(el => {
        el.classList.add('pulse-animation');
    });
}

// Add wave animations to hero sections
// function addWaveAnimations() {
//     const heroSections = document.querySelectorAll('.hero');
    
//     heroSections.forEach(hero => {
//         // Create three wave layers
//         for (let i = 0; i < 3; i++) {
//             const wave = document.createElement('div');
//             wave.classList.add('wave-animation');
//             hero.appendChild(wave);
//         }
//     });
// }

// Add boat animations
function addBoatAnimations() {
    const heroSections = document.querySelectorAll('.hero');
    
    heroSections.forEach(hero => {
        const boat = document.createElement('div');
        boat.classList.add('boat-animation');
        hero.appendChild(boat);
    });
}

// Animate counter elements
function animateCounter(counterElement) {
    const target = parseInt(counterElement.dataset.target);
    const duration = parseInt(counterElement.dataset.duration || 2000);
    const startTime = performance.now();
    const startValue = 0;
    
    function updateCounter(currentTime) {
        const elapsedTime = currentTime - startTime;
        
        if (elapsedTime < duration) {
            const progress = elapsedTime / duration;
            const currentValue = Math.floor(startValue + progress * (target - startValue));
            counterElement.textContent = currentValue + (counterElement.dataset.suffix || '');
            requestAnimationFrame(updateCounter);
        } else {
            counterElement.textContent = target + (counterElement.dataset.suffix || '');
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// Initialize counter elements
function initCounters() {
    // Convert static numbers to animated counters
    document.querySelectorAll('.stat-number').forEach(statElement => {
        const text = statElement.textContent.trim();
        const match = text.match(/(\d+)(\+|%)?/);
        
        if (match) {
            const number = parseInt(match[1]);
            const suffix = match[2] || '';
            
            statElement.classList.add('counter-animation');
            statElement.innerHTML = `<span class="counter-value" data-target="${number}" data-suffix="${suffix}">0</span>`;
        }
    });
}

// Add shimmer effect to buttons
function addButtonEffects() {
    document.querySelectorAll('.btn-primary, .btn-success').forEach(button => {
        button.classList.add('btn-shimmer');
    });
}

// Add ripple effect to sections with water theme
function addRippleEffect() {
    document.querySelectorAll('.cta-section, .about-cta').forEach(section => {
        const ripple = document.createElement('div');
        ripple.classList.add('ripple-background');
        section.appendChild(ripple);
    });
}

// Add parallax effect to background images
function initParallax() {
    document.querySelectorAll('.hero').forEach(hero => {
        hero.classList.add('parallax-bg');
    });
    
    // Simple parallax effect on scroll
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        document.querySelectorAll('.parallax-bg').forEach(bg => {
            const speed = bg.dataset.speed || 0.5;
            bg.style.backgroundPositionY = -(scrolled * speed) + 'px';
        });
    });
}

// Add typing animation to headlines
function addTypingAnimation() {
    const headlines = document.querySelectorAll('.hero h1, .page-header h1');
    
    headlines.forEach(headline => {
        // Only apply to short headlines to avoid layout issues
        if (headline.textContent.length < 30) {
            headline.classList.add('typing-animation');
        }
    });
}

// Initialize all animations
window.addEventListener('load', function() {
    addRippleEffect();
    initParallax();
    addTypingAnimation();
    
    // Add anchor animation to logo icons
    document.querySelectorAll('.logo-icon').forEach(icon => {
        icon.classList.add('anchor-animation');
    });
    
    // Check for reduced motion preference
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        // Initialize all animations
        document.body.classList.add('animations-enabled');
    } else {
        document.body.classList.add('animations-disabled');
    }
});