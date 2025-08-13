// Enhanced Interactive Animations for SaarthiX
document.addEventListener('DOMContentLoaded', function() {
    
    // Node interaction effects
    const nodes = document.querySelectorAll('.node');
    const connectionLines = document.querySelectorAll('.connection-line');
    const flowParticles = document.querySelectorAll('.flow-particle');
    
    // Add click effects to nodes
    nodes.forEach(node => {
        node.addEventListener('click', function() {
            // Create ripple effect
            const ripple = document.createElement('div');
            ripple.className = 'click-ripple';
            this.appendChild(ripple);
            
            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 600);
            
            // Highlight connections temporarily
            highlightConnections(this.classList[1]);
        });
        
        // Enhanced hover effects
        node.addEventListener('mouseenter', function() {
            // Pause other animations
            nodes.forEach(otherNode => {
                if (otherNode !== this) {
                    otherNode.style.animationPlayState = 'paused';
                }
            });
            
            // Enhance connection visibility
            connectionLines.forEach(line => {
                line.style.opacity = '0.8';
                line.style.transform += ' scale(1.1)';
            });
        });
        
        node.addEventListener('mouseleave', function() {
            // Resume animations
            nodes.forEach(otherNode => {
                otherNode.style.animationPlayState = 'running';
            });
            
            // Reset connections
            connectionLines.forEach(line => {
                line.style.opacity = '';
                line.style.transform = line.style.transform.replace(' scale(1.1)', '');
            });
        });
    });
    
    // Function to highlight specific connections
    function highlightConnections(nodeType) {
        let targetConnections = [];
        
        switch(nodeType) {
            case 'node-student':
                targetConnections = ['.student-to-institute', '.student-to-industry'];
                break;
            case 'node-institute':
                targetConnections = ['.student-to-institute', '.institute-to-industry'];
                break;
            case 'node-industry':
                targetConnections = ['.student-to-industry', '.institute-to-industry'];
                break;
        }
        
        targetConnections.forEach(selector => {
            const connection = document.querySelector(selector);
            if (connection) {
                connection.style.background = 'linear-gradient(90deg, #FFD700, #FFA500, #FF6B6B)';
                connection.style.height = '4px';
                connection.style.boxShadow = '0 0 15px rgba(255, 215, 0, 0.6)';
                
                setTimeout(() => {
                    connection.style.background = '';
                    connection.style.height = '';
                    connection.style.boxShadow = '';
                }, 2000);
            }
        });
    }
    
    // Animated counter for trust indicators
    const trustNumbers = document.querySelectorAll('.trust-number');
    
    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, 16);
    }
    
    // Intersection Observer for trust indicators
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const trustNumber = entry.target.querySelector('.trust-number');
                if (trustNumber && !trustNumber.classList.contains('animated')) {
                    trustNumber.classList.add('animated');
                    animateCounter(trustNumber);
                }
            }
        });
    }, observerOptions);
    
    // Observe trust indicators
    const trustItems = document.querySelectorAll('.trust-item');
    trustItems.forEach(item => observer.observe(item));
    
    // Enhanced particle system
    function createParticles() {
        const particlesContainer = document.getElementById('particles');
        if (!particlesContainer) return;
        
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 8 + 's';
            particle.style.animationDuration = (Math.random() * 3 + 5) + 's';
            particlesContainer.appendChild(particle);
        }
    }
    
    // Initialize particles
    createParticles();
    
    // Login Modal functionality
    initializeLoginModal();
    
    // Smooth scroll for action buttons
    const actionButtons = document.querySelectorAll('.btn-primary, .btn-secondary');
    actionButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Check if this is the demo button
            if (this.id === 'learnMoreBtn' || this.textContent.includes('Watch Demo')) {
                // Open NattLabs website in new tab
                window.open('https://nattlabs.com', '_blank');
                console.log('Opening NattLabs demo website...');
            } else {
                // You can add other navigation logic here
                console.log('Button clicked:', this.textContent.trim());
            }
        });
    });
    
    // Dynamic background gradient
    let gradientAngle = 135;
    setInterval(() => {
        gradientAngle += 0.5;
        const heroBackground = document.querySelector('.bg-gradient-overlay');
        if (heroBackground) {
            heroBackground.style.background = `linear-gradient(${gradientAngle}deg, 
                rgba(102, 126, 234, 0.9) 0%, 
                rgba(118, 75, 162, 0.8) 50%, 
                rgba(240, 147, 251, 0.7) 100%)`;
        }
    }, 100);
});

// CSS for click ripple effect (injected via JavaScript)
const style = document.createElement('style');
style.textContent = `
    .click-ripple {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 0;
        height: 0;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: translate(-50%, -50%);
        animation: clickRipple 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes clickRipple {
        to {
            width: 200px;
            height: 200px;
            opacity: 0;
        }
    }
    
    .trust-number {
        transition: all 0.3s ease;
    }
    
    .trust-number.animated {
        color: #FFD700;
        text-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
    }
`;
document.head.appendChild(style);

// Login Modal Functions
function initializeLoginModal() {
    const loginBtn = document.getElementById('loginBtn');
    const loginModal = document.getElementById('loginModal');
    const closeModal = document.getElementById('closeModal');
    const loginForm = document.getElementById('loginForm');
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');
    const loginSubmitBtn = document.querySelector('.login-submit-btn');
    
    // Open modal when login button is clicked
    if (loginBtn) {
        loginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            openLoginModal();
        });
    }
    
    // Close modal when close button is clicked
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            closeLoginModal();
        });
    }
    
    // Close modal when clicking outside
    if (loginModal) {
        loginModal.addEventListener('click', function(e) {
            if (e.target === loginModal) {
                closeLoginModal();
            }
        });
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && loginModal && loginModal.classList.contains('show')) {
            closeLoginModal();
        }
    });
    
    // Toggle password visibility
    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            
            // Toggle eye icon
            if (type === 'text') {
                this.classList.remove('fa-eye');
                this.classList.add('fa-eye-slash');
            } else {
                this.classList.remove('fa-eye-slash');
                this.classList.add('fa-eye');
            }
        });
    }
    
    // Handle form submission
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleLogin();
        });
    }
    
    // Social login buttons
    const googleBtn = document.querySelector('.google-btn');
    const linkedinBtn = document.querySelector('.linkedin-btn');
    
    if (googleBtn) {
        googleBtn.addEventListener('click', function() {
            handleSocialLogin('google');
        });
    }
    
    if (linkedinBtn) {
        linkedinBtn.addEventListener('click', function() {
            handleSocialLogin('linkedin');
        });
    }
    
    // Signup link
    const signupLink = document.getElementById('signupLink');
    if (signupLink) {
        signupLink.addEventListener('click', function(e) {
            e.preventDefault();
            // You can redirect to signup page or open signup modal
            alert('Signup functionality will be implemented here!');
        });
    }
    
    // Forgot password link
    const forgotPassword = document.querySelector('.forgot-password');
    if (forgotPassword) {
        forgotPassword.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Forgot password functionality will be implemented here!');
        });
    }
}

function openLoginModal() {
    const loginModal = document.getElementById('loginModal');
    if (loginModal) {
        loginModal.style.display = 'flex';
        // Small delay to ensure display is set before adding show class
        setTimeout(() => {
            loginModal.classList.add('show');
        }, 10);
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
        
        // Focus on email input
        const emailInput = document.getElementById('email');
        if (emailInput) {
            setTimeout(() => emailInput.focus(), 300);
        }
    }
}

function closeLoginModal() {
    const loginModal = document.getElementById('loginModal');
    if (loginModal) {
        loginModal.classList.remove('show');
        
        // Wait for animation to complete before hiding
        setTimeout(() => {
            loginModal.style.display = 'none';
            // Restore body scroll
            document.body.style.overflow = '';
            
            // Reset form
            const loginForm = document.getElementById('loginForm');
            if (loginForm) {
                loginForm.reset();
            }
            
            // Reset password visibility
            const passwordInput = document.getElementById('password');
            const togglePassword = document.getElementById('togglePassword');
            if (passwordInput && togglePassword) {
                passwordInput.setAttribute('type', 'password');
                togglePassword.classList.remove('fa-eye-slash');
                togglePassword.classList.add('fa-eye');
            }
        }, 300);
    }
}

function handleLogin() {
    const loginSubmitBtn = document.querySelector('.login-submit-btn');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const rememberMe = document.getElementById('rememberMe');
    
    if (!emailInput || !passwordInput) return;
    
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    
    // Basic validation
    if (!email || !password) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    // Show loading state
    if (loginSubmitBtn) {
        loginSubmitBtn.classList.add('loading');
        loginSubmitBtn.disabled = true;
    }
    
    // Simulate API call
    setTimeout(() => {
        // Remove loading state
        if (loginSubmitBtn) {
            loginSubmitBtn.classList.remove('loading');
            loginSubmitBtn.disabled = false;
        }
        
        // For demo purposes, accept any email/password combination
        // In real implementation, you would make an API call here
        if (email && password) {
            showNotification('Login successful! Welcome back!', 'success');
            updateLoginButton(email);
            closeLoginModal();
            
            // Store login state if remember me is checked
            if (rememberMe && rememberMe.checked) {
                localStorage.setItem('userEmail', email);
                localStorage.setItem('isLoggedIn', 'true');
            } else {
                sessionStorage.setItem('userEmail', email);
                sessionStorage.setItem('isLoggedIn', 'true');
            }
        } else {
            showNotification('Invalid email or password', 'error');
        }
    }, 2000);
}

function handleSocialLogin(provider) {
    showNotification(`${provider.charAt(0).toUpperCase() + provider.slice(1)} login will be implemented here!`, 'info');
    
    // In real implementation, you would redirect to OAuth provider
    // For demo purposes, we'll simulate a successful login
    setTimeout(() => {
        const demoEmail = `user@${provider}.com`;
        showNotification(`Successfully logged in with ${provider.charAt(0).toUpperCase() + provider.slice(1)}!`, 'success');
        updateLoginButton(demoEmail);
        closeLoginModal();
        
        sessionStorage.setItem('userEmail', demoEmail);
        sessionStorage.setItem('isLoggedIn', 'true');
    }, 1500);
}

function updateLoginButton(email) {
    const loginBtn = document.getElementById('loginBtn');
    const btnText = loginBtn.querySelector('.btn-text');
    const loginIcon = loginBtn.querySelector('.login-icon');
    const logoutIcon = loginBtn.querySelector('.logout-icon');
    
    if (loginBtn && btnText) {
        // Update button appearance
        loginBtn.classList.add('logged-in');
        btnText.textContent = email.split('@')[0]; // Show username part of email
        
        // Switch icons
        if (loginIcon && logoutIcon) {
            loginIcon.style.display = 'none';
            logoutIcon.style.display = 'inline-block';
        }
        
        // Update click handler for logout
        loginBtn.removeEventListener('click', openLoginModal);
        loginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            handleLogout();
        });
    }
}

function handleLogout() {
    const loginBtn = document.getElementById('loginBtn');
    const btnText = loginBtn.querySelector('.btn-text');
    const loginIcon = loginBtn.querySelector('.login-icon');
    const logoutIcon = loginBtn.querySelector('.logout-icon');
    
    // Clear storage
    localStorage.removeItem('userEmail');
    localStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('userEmail');
    sessionStorage.removeItem('isLoggedIn');
    
    // Reset button appearance
    if (loginBtn && btnText) {
        loginBtn.classList.remove('logged-in');
        btnText.textContent = 'Login';
        
        // Switch icons back
        if (loginIcon && logoutIcon) {
            loginIcon.style.display = 'inline-block';
            logoutIcon.style.display = 'none';
        }
        
        // Restore original click handler
        loginBtn.removeEventListener('click', handleLogout);
        loginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            openLoginModal();
        });
    }
    
    showNotification('Successfully logged out!', 'success');
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">&times;</button>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Auto remove after 5 seconds
    const autoRemove = setTimeout(() => removeNotification(notification), 5000);
    
    // Manual close
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        clearTimeout(autoRemove);
        removeNotification(notification);
    });
}

function removeNotification(notification) {
    notification.classList.remove('show');
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

function getNotificationIcon(type) {
    switch (type) {
        case 'success': return 'fa-check-circle';
        case 'error': return 'fa-exclamation-circle';
        case 'warning': return 'fa-exclamation-triangle';
        default: return 'fa-info-circle';
    }
}

// Check for existing login state on page load
document.addEventListener('DOMContentLoaded', function() {
    const storedEmail = localStorage.getItem('userEmail') || sessionStorage.getItem('userEmail');
    const isLoggedIn = localStorage.getItem('isLoggedIn') || sessionStorage.getItem('isLoggedIn');
    
    if (storedEmail && isLoggedIn === 'true') {
        updateLoginButton(storedEmail);
    }
});