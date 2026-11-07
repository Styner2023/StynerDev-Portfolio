// Mushroom Decorations Interactive Effects
document.addEventListener('DOMContentLoaded', function() {
    
    // Add scroll-based parallax effect to mushroom decorations
    function addParallaxEffect() {
        const mushrooms = document.querySelectorAll('[src*="mushroom-hand-drawn-vintage-illustration"]');
        
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            mushrooms.forEach((mushroom, index) => {
                const speed = (index % 2 === 0) ? 0.3 : 0.5;
                const yPos = -(scrolled * speed);
                mushroom.style.transform = `translateY(${yPos}px)`;
            });
        });
    }
    
    // Add random gentle movement to mushrooms
    function addRandomMovement() {
        const mushrooms = document.querySelectorAll('[src*="mushroom-hand-drawn-vintage-illustration"]');
        
        mushrooms.forEach((mushroom, index) => {
            setInterval(() => {
                const randomX = Math.random() * 4 - 2; // -2 to 2px
                const randomY = Math.random() * 4 - 2; // -2 to 2px
                const currentTransform = mushroom.style.transform || '';
                
                // Preserve existing transforms and add subtle movement
                if (!currentTransform.includes('translate(')) {
                    mushroom.style.transform = currentTransform + ` translate(${randomX}px, ${randomY}px)`;
                }
            }, 3000 + (index * 500)); // Stagger the intervals
        });
    }
    
    // Add hover effects to mushroom decorations
    function addHoverEffects() {
        const mushrooms = document.querySelectorAll('[src*="mushroom-hand-drawn-vintage-illustration"]');
        
        mushrooms.forEach(mushroom => {
            mushroom.addEventListener('mouseenter', function() {
                this.style.transition = 'all 0.3s ease';
                this.style.filter = 'brightness(1.2) saturate(1.3)';
                this.style.transform += ' scale(1.05)';
            });
            
            mushroom.addEventListener('mouseleave', function() {
                this.style.filter = '';
                this.style.transform = this.style.transform.replace(' scale(1.05)', '');
            });
        });
    }
    
    // Initialize effects only on desktop/tablet (not mobile)
    if (window.innerWidth > 768) {
        addParallaxEffect();
        addRandomMovement();
        addHoverEffects();
    }
    
    // Add intersection observer for fade-in effects
    function addScrollAnimations() {
        const mushrooms = document.querySelectorAll('[src*="mushroom-hand-drawn-vintage-illustration"]');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = entry.target.dataset.originalOpacity || '0.4';
                    entry.target.style.transform += ' translateY(0)';
                } else {
                    entry.target.style.opacity = '0';
                    entry.target.style.transform += ' translateY(20px)';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '50px'
        });
        
        mushrooms.forEach(mushroom => {
            // Store original opacity
            const computedStyle = window.getComputedStyle(mushroom);
            mushroom.dataset.originalOpacity = computedStyle.opacity;
            
            observer.observe(mushroom);
        });
    }
    
    addScrollAnimations();
});

// Add seasonal color variations (optional enhancement)
function addSeasonalEffects() {
    const month = new Date().getMonth();
    const mushrooms = document.querySelectorAll('[src*="mushroom-hand-drawn-vintage-illustration"]');
    
    let seasonalFilter = '';
    
    // Spring (March-May): Fresh green tint
    if (month >= 2 && month <= 4) {
        seasonalFilter = 'hue-rotate(30deg) saturate(1.1)';
    }
    // Summer (June-August): Warm tint
    else if (month >= 5 && month <= 7) {
        seasonalFilter = 'hue-rotate(-10deg) brightness(1.1)';
    }
    // Fall (September-November): Warm autumn colors
    else if (month >= 8 && month <= 10) {
        seasonalFilter = 'hue-rotate(-30deg) saturate(1.2) brightness(0.9)';
    }
    // Winter (December-February): Cool tint
    else {
        seasonalFilter = 'hue-rotate(180deg) saturate(0.8) brightness(0.8)';
    }
    
    mushrooms.forEach(mushroom => {
        if (mushroom.style.filter) {
            mushroom.style.filter += ' ' + seasonalFilter;
        } else {
            mushroom.style.filter = seasonalFilter;
        }
    });
}

// Initialize seasonal effects
document.addEventListener('DOMContentLoaded', addSeasonalEffects);