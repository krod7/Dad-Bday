// Wait for the DOM to be fully loaded before running our code
document.addEventListener('DOMContentLoaded', function() {
    
    // Get references to important elements
    const dadImage = document.getElementById('dadImage');
    const confettiBtn = document.getElementById('confettiBtn');
    const confettiContainer = document.getElementById('confettiContainer');
    
    // Variables to track mouse movement and confetti creation
    let mouseX = 0;
    let mouseY = 0;
    let isDancing = false;
    let confettiTrail = [];
    
    // ===== MOUSE CONFETTI TRAIL =====
    // Track mouse movement to create confetti trail
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Create confetti trail every few pixels of movement
        if (Math.random() < 0.3) { // 30% chance to create confetti on each move
            createMouseConfetti(mouseX, mouseY);
        }
    });
    
    // Function to create confetti particles that follow the mouse
    function createMouseConfetti(x, y) {
        const confetti = document.createElement('div');
        confetti.className = 'mouse-confetti';
        confetti.style.left = x + 'px';
        confetti.style.top = y + 'px';
        
        // Randomize confetti properties for variety
        confetti.style.background = getRandomConfettiColor();
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
        
        document.body.appendChild(confetti);
        
        // Remove confetti after animation completes
        setTimeout(() => {
            if (confetti.parentNode) {
                confetti.parentNode.removeChild(confetti);
            }
        }, 1000);
    }
    
    // ===== DAD'S HEAD CLICK ANIMATION =====
    // Add click event to dad's image for bounce effect and dancing
    dadImage.addEventListener('click', function() {
        // Remove any existing bounce class
        dadImage.classList.remove('bounce');
        
        // Force a reflow to ensure the animation plays
        void dadImage.offsetWidth;
        
        // Add bounce class to trigger animation
        dadImage.classList.add('bounce');
        
        // Create extra confetti around the image when clicked
        createImageClickConfetti();
        
        // Toggle dancing - if already dancing, stop; if not dancing, start
        if (isDancing) {
            stopDancing();
        } else {
            startDancing();
        }
        
        // Remove bounce class after animation completes
        setTimeout(() => {
            dadImage.classList.remove('bounce');
        }, 600);
    });
    
    // Function to create confetti burst when image is clicked
    function createImageClickConfetti() {
        const rect = dadImage.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Create multiple confetti pieces in a burst pattern around the image
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                
                // Position confetti around the image perimeter, not from center
                const angle = (Math.PI * 2 * i) / 20;
                const radius = 220; // Position outside the image
                const offsetX = Math.cos(angle) * radius;
                const offsetY = Math.sin(angle) * radius;
                
                confetti.style.left = (centerX + offsetX) + 'px';
                confetti.style.top = (centerY + offsetY) + 'px';
                confetti.style.background = getRandomConfettiColor();
                
                // Randomize confetti movement outward
                const distance = 100 + Math.random() * 150;
                const velocityX = Math.cos(angle) * distance;
                const velocityY = Math.sin(angle) * distance;
                
                confetti.style.setProperty('--velocity-x', velocityX + 'px');
                confetti.style.setProperty('--velocity-y', velocityY + 'px');
                
                document.body.appendChild(confetti);
                
                // Remove confetti after animation
                setTimeout(() => {
                    if (confetti.parentNode) {
                        confetti.parentNode.removeChild(confetti);
                    }
                }, 3000);
            }, i * 40); // Stagger confetti creation
        }
    }
    
    // ===== CONFETTI BUTTON FUNCTIONALITY =====
    // Add click event to confetti button
    confettiBtn.addEventListener('click', function() {
        createConfettiShower();
        
        // Add button click effect
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
    });
    
    // Function to create a confetti shower from the top of the screen
    function createConfettiShower() {
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                confetti.style.left = Math.random() * window.innerWidth + 'px';
                confetti.style.top = '-10px';
                confetti.style.background = getRandomConfettiColor();
                confetti.style.animationDelay = Math.random() * 2 + 's';
                
                document.body.appendChild(confetti);
                
                // Remove confetti after animation
                setTimeout(() => {
                    if (confetti.parentNode) {
                        confetti.parentNode.removeChild(confetti);
                    }
                }, 5000);
            }, i * 100); // Stagger confetti creation
        }
    }
    
    // ===== AUTOMATIC DANCING FUNCTIONALITY =====
    // Function to start dancing automatically
    function startDancing() {
        if (isDancing) return; // Already dancing
        
        isDancing = true;
        dadImage.classList.add('dancing');
        
        // Create dance confetti
        createDanceConfetti();
    }
    
    // Function to stop dancing
    function stopDancing() {
        isDancing = false;
        dadImage.classList.remove('dancing');
    }
    
    // Function to create confetti while dancing
    function createDanceConfetti() {
        const danceInterval = setInterval(() => {
            if (isDancing) {
                const rect = dadImage.getBoundingClientRect();
                const x = rect.left + Math.random() * rect.width;
                const y = rect.top + Math.random() * rect.height;
                
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                confetti.style.left = x + 'px';
                confetti.style.top = y + 'px';
                confetti.style.background = getRandomConfettiColor();
                confetti.style.animationDuration = '2s';
                
                document.body.appendChild(confetti);
                
                setTimeout(() => {
                    if (confetti.parentNode) {
                        confetti.parentNode.removeChild(confetti);
                    }
                }, 2000);
            } else {
                clearInterval(danceInterval);
            }
        }, 200);
    }
    
    // ===== UTILITY FUNCTIONS =====
    // Function to get random confetti colors
    function getRandomConfettiColor() {
        const colors = [
            'linear-gradient(45deg, #ff6b6b, #ff8e8e)',
            'linear-gradient(45deg, #4ecdc4, #6ee7df)',
            'linear-gradient(45deg, #45b7d1, #67c7d9)',
            'linear-gradient(45deg, #96ceb4, #a8d5c0)',
            'linear-gradient(45deg, #feca57, #fed976)',
            'linear-gradient(45deg, #ff9ff3, #f368e0)',
            'linear-gradient(45deg, #54a0ff, #74b9ff)',
            'linear-gradient(45deg, #5f27cd, #786fa6)'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    // ===== ADDITIONAL FUN FEATURES =====
    // Add keyboard shortcuts for extra fun
    document.addEventListener('keydown', function(e) {
        switch(e.key.toLowerCase()) {
            case 'c':
                createConfettiShower();
                break;
            case 'd':
                startDancing();
                break;
            case ' ':
                e.preventDefault();
                dadImage.click();
                break;
        }
    });
    
    // Add welcome message and instructions
    setTimeout(() => {
        const welcomeMsg = document.createElement('div');
        welcomeMsg.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 15px 25px;
            border-radius: 25px;
            font-size: 14px;
            z-index: 1001;
            animation: fadeInOut 4s ease-in-out forwards;
        `;
        welcomeMsg.innerHTML = '🎉 Press C for confetti, D for dance, SPACE or click dad to toggle dancing! 🎉';
        document.body.appendChild(welcomeMsg);
        
        // Remove welcome message after animation
        setTimeout(() => {
            if (welcomeMsg.parentNode) {
                welcomeMsg.parentNode.removeChild(welcomeMsg);
            }
        }, 4000);
    }, 2000);
    
    // Add CSS for welcome message animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInOut {
            0% { opacity: 0; transform: translateX(-50%) translateY(-20px); }
            20% { opacity: 1; transform: translateX(-50%) translateY(0); }
            80% { opacity: 1; transform: translateX(-50%) translateY(0); }
            100% { opacity: 0; transform: translateX(-50%) translateY(-20px); }
        }
    `;
    document.head.appendChild(style);
    
    // ===== PERFORMANCE OPTIMIZATION =====
    // Throttle mouse confetti creation for better performance
    let lastConfettiTime = 0;
    const confettiThrottle = 50; // Minimum time between confetti creation (ms)
    
    // Override the mouse confetti creation with throttling
    const originalCreateMouseConfetti = createMouseConfetti;
    createMouseConfetti = function(x, y) {
        const now = Date.now();
        if (now - lastConfettiTime > confettiThrottle) {
            originalCreateMouseConfetti(x, y);
            lastConfettiTime = now;
        }
    };
    
    // Console log for debugging and fun
    console.log('🎂 Happy Birthday Card loaded successfully! 🎂');
    console.log('🎮 Interactive features: Click dad or press SPACE to dance, move mouse for confetti trail! 🎮');
});
