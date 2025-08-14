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

// Auto-inject Login Modal on all pages
function injectLoginModal() {
    // Check if modal already exists
    if (document.getElementById('loginModal')) {
        return;
    }

    const modalHTML = `
    <!-- Login Modal -->
    <div id="loginModal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <h2>Welcome Back</h2>
                <span class="close" id="closeModal">&times;</span>
            </div>
            <div class="modal-body">
                <form id="loginForm" class="login-form">
                    <div class="form-group">
                        <label for="userType">I am a:</label>
                        <select id="userType" name="userType" required>
                            <option value="">Select your role</option>
                            <option value="student">Student</option>
                            <option value="institute">Institute</option>
                            <option value="industry">Industry Partner</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label for="email">Email Address</label>
                        <input type="email" id="email" name="email" required placeholder="Enter your email">
                        <i class="fas fa-envelope input-icon"></i>
                    </div>
                    
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input type="password" id="password" name="password" required placeholder="Enter your password">
                        <i class="fas fa-lock input-icon"></i>
                        <i class="fas fa-eye toggle-password" id="togglePassword"></i>
                    </div>
                    
                    <div class="form-options">
                        <label class="checkbox-container">
                            <input type="checkbox" id="rememberMe">
                            <span class="checkmark"></span>
                            Remember me
                        </label>
                        <a href="#" class="forgot-password">Forgot Password?</a>
                    </div>
                    
                    <button type="submit" class="login-submit-btn">
                        <span class="btn-text">Sign In</span>
                        <i class="fas fa-arrow-right btn-arrow"></i>
                    </button>
                    
                    <div class="divider">
                        <span>or</span>
                    </div>
                    
                    <div class="social-login">
                        <button type="button" class="social-btn google-btn">
                            <i class="fab fa-google"></i>
                            Continue with Google
                        </button>
                        <button type="button" class="social-btn linkedin-btn">
                            <i class="fab fa-linkedin"></i>
                            Continue with LinkedIn
                        </button>
                    </div>
                    
                    <div class="signup-link">
                        <p>Don't have an account? <a href="#" id="signupLink">Sign up here</a></p>
                    </div>
                </form>
            </div>
        </div>
    </div>`;

    // Insert modal before closing body tag
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

// Login Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Auto-inject login modal on every page
    injectLoginModal();
    const loginBtn = document.getElementById('loginBtn');
    const loginModal = document.getElementById('loginModal');
    const closeModal = document.getElementById('closeModal');
    const loginForm = document.getElementById('loginForm');
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');
    const signupLink = document.getElementById('signupLink');

    // Open modal when login button is clicked
    if (loginBtn) {
        loginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            openModal();
        });
    }

    // Close modal when X is clicked
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            closeModalFunc();
        });
    }

    // Close modal when clicking outside
    if (loginModal) {
        loginModal.addEventListener('click', function(e) {
            if (e.target === loginModal) {
                closeModalFunc();
            }
        });
    }

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && loginModal.classList.contains('show')) {
            closeModalFunc();
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
            
            // Get form data
            const formData = new FormData(this);
            const userType = formData.get('userType');
            const email = formData.get('email');
            const password = formData.get('password');
            const rememberMe = formData.get('rememberMe');

            // Basic validation
            if (!userType || !email || !password) {
                showNotification('Please fill in all required fields', 'error');
                return;
            }

            // Show loading state
            const submitBtn = this.querySelector('.login-submit-btn');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing In...';
            submitBtn.disabled = true;

            // Simulate login process (replace with actual authentication)
            setTimeout(() => {
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;

                // Show success message
                showNotification(`Welcome back! Logging in as ${userType}`, 'success');
                
                // Update login button to show logged in state
                updateLoginButton(true, userType);
                
                // Close modal
                closeModalFunc();
                
                // Here you would typically redirect or update the UI
                console.log('Login successful:', { userType, email, rememberMe });
            }, 2000);
        });
    }

    // Handle social login buttons
    const socialBtns = document.querySelectorAll('.social-btn');
    socialBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const provider = this.classList.contains('google-btn') ? 'Google' : 'LinkedIn';
            showNotification(`${provider} login will be implemented soon`, 'info');
        });
    });

    // Handle signup link
    if (signupLink) {
        signupLink.addEventListener('click', function(e) {
            e.preventDefault();
            showNotification('Signup form will be implemented soon', 'info');
        });
    }

    // Functions
    function openModal() {
        if (loginModal) {
            loginModal.style.display = 'flex';
            setTimeout(() => {
                loginModal.classList.add('show');
            }, 10);
            document.body.style.overflow = 'hidden';
        }
    }

    function closeModalFunc() {
        if (loginModal) {
            loginModal.classList.remove('show');
            setTimeout(() => {
                loginModal.style.display = 'none';
                document.body.style.overflow = '';
            }, 300);
        }
    }

    function updateLoginButton(isLoggedIn, userType = '') {
        if (loginBtn) {
            const btnText = loginBtn.querySelector('.btn-text');
            const loginIcon = loginBtn.querySelector('.login-icon');
            const logoutIcon = loginBtn.querySelector('.logout-icon');

            if (isLoggedIn) {
                btnText.textContent = `${userType} Portal`;
                loginIcon.style.display = 'none';
                logoutIcon.style.display = 'inline-block';
                loginBtn.classList.add('logged-in');
                
                // Add logout functionality
                loginBtn.removeEventListener('click', openModal);
                loginBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    logout();
                });
            } else {
                btnText.textContent = 'Login';
                loginIcon.style.display = 'inline-block';
                logoutIcon.style.display = 'none';
                loginBtn.classList.remove('logged-in');
            }
        }
    }

    function logout() {
        showNotification('Logged out successfully', 'success');
        updateLoginButton(false);
        
        // Reset login button event listener
        loginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            openModal();
        });
    }

    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${getNotificationIcon(type)}"></i>
                <span>${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;

        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10003;
            background: ${getNotificationColor(type)};
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
            transform: translateX(400px);
            transition: transform 0.3s ease;
            max-width: 350px;
            font-size: 14px;
        `;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Close button functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => notification.remove(), 300);
        });

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.transform = 'translateX(400px)';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }

    function getNotificationIcon(type) {
        switch(type) {
            case 'success': return 'fa-check-circle';
            case 'error': return 'fa-exclamation-circle';
            case 'warning': return 'fa-exclamation-triangle';
            default: return 'fa-info-circle';
        }
    }

    function getNotificationColor(type) {
        switch(type) {
            case 'success': return 'linear-gradient(135deg, #10b981, #059669)';
            case 'error': return 'linear-gradient(135deg, #ef4444, #dc2626)';
            case 'warning': return 'linear-gradient(135deg, #f59e0b, #d97706)';
            default: return 'linear-gradient(135deg, #3b82f6, #2563eb)';
        }
    }
});