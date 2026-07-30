// Modern Portfolio JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS animations
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        mirror: false,
        offset: 100,
        delay: 0
    });

    // Performance optimization: Preload critical images
    const criticalImages = [
        'images/pankaj.jpg',
        'images/pankaj2.jpg'
    ];
    
    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });

    // Loading screen
    const loading = document.getElementById('loading');
    if (loading) {
        window.addEventListener('load', function() {
            setTimeout(() => {
                loading.style.opacity = '0';
                setTimeout(() => {
                    loading.style.display = 'none';
                }, 500);
            }, 1000);
        });
    }

    // Theme toggle functionality
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const currentTheme = localStorage.getItem('theme') || 'dark';
    
    // Set initial theme
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
        });
    }
    
    function updateThemeIcon(theme) {
        if (themeIcon) {
            if (theme === 'dark') {
                themeIcon.className = 'fas fa-sun';
            } else {
                themeIcon.className = 'fas fa-moon';
            }
        }
    }

    // Navigation functionality
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (hamburger && navMenu) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
            
            // Update active link
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Scroll functionality
    const scrollUpBtn = document.getElementById('scrollUp');
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        
        // Show/hide scroll up button
        if (scrollUpBtn) {
            if (scrollTop > 300) {
                scrollUpBtn.classList.add('show');
            } else {
                scrollUpBtn.classList.remove('show');
            }
        }
        
        // Update active navigation link based on scroll position
        updateActiveNavLink();
    });
    
    if (scrollUpBtn) {
        scrollUpBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section');
        const scrollPos = window.scrollY + 200;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // Typing animation
    const typingText = document.getElementById('typingText');
    const phrases = [
        'AI & Data Science Enthusiast',
        'IoT Innovator',
        'Building Intelligent Systems',
        'Machine Learning Specialist',
        'Full-Stack Developer',
        'Problem Solver'
    ];
    
    if (typingText) {
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        
        function typeWriter() {
            const currentPhrase = phrases[phraseIndex];
            
            if (isDeleting) {
                typingText.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingText.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
            }
            
            let typeSpeed = isDeleting ? 50 : 100;
            
            if (!isDeleting && charIndex === currentPhrase.length) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                typeSpeed = 500;
            }
            
            setTimeout(typeWriter, typeSpeed);
        }
        
        typeWriter();
    }

    // Animated counters for stats
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            const increment = target / 100;
            let current = 0;
            
            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    counter.textContent = Math.ceil(current);
                    setTimeout(updateCounter, 20);
                } else {
                    counter.textContent = target;
                }
            };
            
            // Start animation when element is in view
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        updateCounter();
                        observer.unobserve(entry.target);
                    }
                });
            });
            
            observer.observe(counter);
        });
    }
    
    animateCounters();

    // Particle animation for hero section
    function createParticles() {
        const particlesContainer = document.getElementById('particles');
        if (particlesContainer) {
            const particleCount = 50;
            
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.style.position = 'absolute';
                particle.style.width = Math.random() * 4 + 1 + 'px';
                particle.style.height = particle.style.width;
                particle.style.background = 'rgba(0, 255, 198, 0.5)';
                particle.style.borderRadius = '50%';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.top = Math.random() * 100 + '%';
                particle.style.animation = `float ${Math.random() * 3 + 2}s ease-in-out infinite`;
                particle.style.animationDelay = Math.random() * 2 + 's';
                
                particlesContainer.appendChild(particle);
            }
        }
    }
    
    // Add floating animation CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 1; }
            50% { transform: translateY(-20px) rotate(180deg); opacity: 0.5; }
        }
    `;
    document.head.appendChild(style);
    
    createParticles();

    function escapeSvgText(text) {
        return (text || 'Portfolio image')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&apos;');
    }

    function createFallbackImage(label) {
        const safeLabel = escapeSvgText(label);
        const svg = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 560" role="img" aria-label="${safeLabel}">
                <defs>
                    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stop-color="#0A0F24" />
                        <stop offset="100%" stop-color="#1A1F35" />
                    </linearGradient>
                    <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stop-color="#00FFC6" />
                        <stop offset="100%" stop-color="#4A90E2" />
                    </linearGradient>
                </defs>
                <rect width="800" height="560" rx="32" fill="url(#bg)" />
                <circle cx="120" cy="120" r="90" fill="#00FFC6" fill-opacity="0.12" />
                <circle cx="680" cy="460" r="140" fill="#4A90E2" fill-opacity="0.12" />
                <rect x="60" y="60" width="680" height="440" rx="26" fill="none" stroke="url(#accent)" stroke-opacity="0.35" stroke-width="4" stroke-dasharray="14 10" />
                <text x="50%" y="46%" text-anchor="middle" fill="#FFFFFF" font-family="Arial, sans-serif" font-size="42" font-weight="700">${safeLabel}</text>
                <text x="50%" y="57%" text-anchor="middle" fill="#B0B3C1" font-family="Arial, sans-serif" font-size="22">Preview unavailable</text>
            </svg>
        `;

        return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
    }

    function setupImageFallbacks() {
        document.querySelectorAll('img').forEach(image => {
            if (image.dataset.fallbackBound === 'true') {
                return;
            }

            image.dataset.fallbackBound = 'true';

            const applyFallback = () => {
                if (image.dataset.fallbackApplied === 'true') {
                    return;
                }

                image.dataset.fallbackApplied = 'true';
                image.src = createFallbackImage(image.alt);
            };

            image.addEventListener('error', applyFallback, { once: true });

            if (image.complete && image.naturalWidth === 0) {
                applyFallback();
            }
        });
    }

    setupImageFallbacks();
    window.addEventListener('load', setupImageFallbacks);
    setTimeout(setupImageFallbacks, 0);

    // Enhanced contact form functionality
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        // Add form validation styling
        const formInputs = contactForm.querySelectorAll('input, textarea');
        
        formInputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                if (this.classList.contains('error')) {
                    validateField(this);
                }
            });
        });
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const name = formData.get('name').trim();
            const email = formData.get('email').trim();
            const subject = formData.get('subject').trim();
            const message = formData.get('message').trim();
            
            // Validate all fields
            let isValid = true;
            
            if (!name || name.length < 2) {
                showFieldError('name', 'Name must be at least 2 characters long');
                isValid = false;
            } else {
                clearFieldError('name');
            }
            
            if (!email || !isValidEmail(email)) {
                showFieldError('email', 'Please enter a valid email address');
                isValid = false;
            } else {
                clearFieldError('email');
            }
            
            if (!subject || subject.length < 3) {
                showFieldError('subject', 'Subject must be at least 3 characters long');
                isValid = false;
            } else {
                clearFieldError('subject');
            }
            
            if (!message || message.length < 10) {
                showFieldError('message', 'Message must be at least 10 characters long');
                isValid = false;
            } else {
                clearFieldError('message');
            }
            
            if (isValid) {
                // Show loading state
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                submitBtn.disabled = true;
                
                // Simulate form submission with delay
                setTimeout(() => {
                    showSuccessMessage('Thank you for your message! I will get back to you soon.');
                    contactForm.reset();
                    
                    // Reset button
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }, 2000);
            }
        });
    }
    
    function validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        
        switch(fieldName) {
            case 'name':
                if (!value || value.length < 2) {
                    showFieldError(fieldName, 'Name must be at least 2 characters long');
                    return false;
                }
                break;
            case 'email':
                if (!value || !isValidEmail(value)) {
                    showFieldError(fieldName, 'Please enter a valid email address');
                    return false;
                }
                break;
            case 'subject':
                if (!value || value.length < 3) {
                    showFieldError(fieldName, 'Subject must be at least 3 characters long');
                    return false;
                }
                break;
            case 'message':
                if (!value || value.length < 10) {
                    showFieldError(fieldName, 'Message must be at least 10 characters long');
                    return false;
                }
                break;
        }
        
        clearFieldError(fieldName);
        return true;
    }
    
    function showFieldError(fieldName, message) {
        const field = document.getElementById(fieldName);
        const formGroup = field.closest('.form-group');
        
        field.classList.add('error');
        
        // Remove existing error message
        const existingError = formGroup.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Add new error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        formGroup.appendChild(errorDiv);
    }
    
    function clearFieldError(fieldName) {
        const field = document.getElementById(fieldName);
        const formGroup = field.closest('.form-group');
        
        field.classList.remove('error');
        
        const errorMessage = formGroup.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    }
    
    function showSuccessMessage(message) {
        // Create success notification
        const notification = document.createElement('div');
        notification.className = 'success-notification';
        notification.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <span>${message}</span>
        `;
        
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        // Hide and remove notification
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 4000);
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Chatbot functionality
    const chatbotToggle = document.getElementById('chatbotToggle');
    const chatbotContainer = document.getElementById('chatbot');
    const chatbotClose = document.getElementById('chatbotClose');
    const chatbotInput = document.getElementById('chatbotInput');
    const chatbotSend = document.getElementById('chatbotSend');
    const chatbotMessages = document.getElementById('chatbotMessages');
    
    if (chatbotToggle && chatbotContainer) {
        chatbotToggle.addEventListener('click', function() {
            chatbotContainer.style.display = chatbotContainer.style.display === 'flex' ? 'none' : 'flex';
        });
    }
    
    if (chatbotClose && chatbotContainer) {
        chatbotClose.addEventListener('click', function() {
            chatbotContainer.style.display = 'none';
        });
    }
    
    if (chatbotSend) {
        chatbotSend.addEventListener('click', sendChatMessage);
    }
    
    if (chatbotInput) {
        chatbotInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendChatMessage();
            }
        });
    }
    
    function sendChatMessage() {
        if (!chatbotInput || !chatbotMessages) return;
        
        const message = chatbotInput.value.trim();
        if (!message) return;
        
        // Add user message
        addChatMessage(message, 'user');
        chatbotInput.value = '';
        
        // Add bot response after delay
        setTimeout(() => {
            const response = getBotResponse(message);
            addChatMessage(response, 'bot');
        }, 1000);
    }
    
    function addChatMessage(message, sender) {
        if (!chatbotMessages) return;
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `${sender}-message`;
        messageDiv.textContent = message;
        chatbotMessages.appendChild(messageDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
    
    function getBotResponse(message) {
        const msg = message.toLowerCase();
        
        // Greetings
        if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey') || msg.includes('greeting')) {
            return "Hello! I'm Pankaj's AI assistant. I can tell you about his projects, skills, education, or how to contact him. What would you like to know?";
        } 
        
        // About / Identity
        else if (msg.includes('who are you') || msg.includes('about pankaj') || msg.includes('about yourself') || msg.includes('who is pankaj')) {
            return "Pankaj Kushwah is a 4th-year Computer Science student at SISTec GN, Bhopal, specializing in AI and Data Science. He loves building intelligent systems and solving real-world problems.";
        }
        
        // Projects - General
        else if (msg.includes('project') || msg.includes('work') || msg.includes('portfolio')) {
            if (msg.includes('face') || msg.includes('attendance')) {
                return "The Group Face Recognition Attendance System uses Django, OpenCV, and InsightFace to detect and recognize multiple faces for automated attendance. It uses PostgreSQL for data management.";
            } else if (msg.includes('loan') || msg.includes('prediction')) {
                return "The Loan Eligibility Prediction System is a machine learning app (90%+ accuracy) that predicts loan approvals based on financial data. Built with Python, Django, and Scikit-learn.";
            } else if (msg.includes('disease') || msg.includes('health')) {
                return "The Multiple Disease Prediction app predicts Diabetes, Heart Disease, and Parkinson's using ML algorithms. It's a user-friendly Streamlit web application.";
            } else if (msg.includes('lic') || msg.includes('agent')) {
                return "The LIC Agent Portfolio is a professional website for insurance agents with an admin dashboard and WhatsApp integration, built using Django and Bootstrap.";
            } else {
                return "Pankaj has worked on several exciting projects: 1. Group Face Recognition System, 2. Loan Eligibility Prediction, 3. Multiple Disease Prediction, and 4. LIC Agent Portfolio. Which one would you like to know more about?";
            }
        }
        
        // Specific Project Shortcuts (without "project" keyword)
        else if (msg.includes('face') || msg.includes('attendance') || msg.includes('recognition')) {
            return "The Group Face Recognition Attendance System uses Django, OpenCV, and InsightFace to detect and recognize multiple faces for automated attendance. It uses PostgreSQL for data management.";
        } else if (msg.includes('loan') && msg.includes('prediction')) {
            return "The Loan Eligibility Prediction System is a machine learning app (90%+ accuracy) that predicts loan approvals based on financial data. Built with Python, Django, and Scikit-learn.";
        } else if (msg.includes('disease') || msg.includes('health') || msg.includes('medical')) {
            return "The Multiple Disease Prediction app predicts Diabetes, Heart Disease, and Parkinson's using ML algorithms. It's a user-friendly Streamlit web application.";
        } else if (msg.includes('lic') || msg.includes('insurance')) {
            return "The LIC Agent Portfolio is a professional website for insurance agents with an admin dashboard and WhatsApp integration, built using Django and Bootstrap.";
        }
        
        // Skills
        else if (msg.includes('skill') || msg.includes('stack') || msg.includes('technology') || msg.includes('tech')) {
            return "Pankaj is proficient in Python, C++, SQL, Django, TensorFlow, Streamlit, and Databases (PostgreSQL, MySQL). He also knows Git, Docker, and VS Code. Core concepts: DSA, OS, DBMS, OOP, AI/ML, and Computer Networks.";
        } else if (msg.includes('python') || msg.includes('django') || msg.includes('c++') || msg.includes('sql') || msg.includes('ml') || msg.includes('ai')) {
            return "Yes! Pankaj has strong expertise in Python, Django, C++, SQL, and AI/ML technologies. He applies these skills in his projects like the Face Recognition System and Loan Prediction App.";
        }
        
        // Education
        else if (msg.includes('education') || msg.includes('college') || msg.includes('study') || msg.includes('degree')) {
            return "Pankaj is currently pursuing a B.Tech in Computer Science (2022-2026) at SISTec GN, Bhopal. He specializes in Artificial Intelligence and Data Science.";
        }
        
        // Contact
        else if (msg.includes('contact') || msg.includes('email') || msg.includes('phone') || msg.includes('hire')) {
            return "You can contact Pankaj via email at pankajkushwahabhisek@gmail.com or call +91 7223017603. He is based in Bhopal, Madhya Pradesh, India.";
        }
        
        // Resume
        else if (msg.includes('resume') || msg.includes('cv')) {
            return "You can download Pankaj's resume from the 'Download Resume' button in the Home section of this portfolio.";
        }
        
        // Location
        else if (msg.includes('location') || msg.includes('where') || msg.includes('city')) {
            return "Pankaj is based in Bhopal, Madhya Pradesh, India.";
        }
        
        // GitHub / Code
        else if (msg.includes('github') || msg.includes('code') || msg.includes('repo')) {
            return "Check out Pankaj's GitHub profile at https://github.com/Pankaj7223 for all project source codes.";
        }
        
        // Default
        else {
            return "I'm not sure about that, but I can tell you about Pankaj's Projects, Skills, Education, or Contact info. Try asking 'What projects has he made?' or 'What are his skills?'";
        }
    }

    // Enhanced smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                // Close mobile menu if open
                if (hamburger && navMenu) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                }
                
                // Calculate offset for fixed navbar
                const navbarHeight = navbar ? navbar.offsetHeight : 80;
                const targetPosition = target.offsetTop - navbarHeight;
                
                // Smooth scroll to target
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update active nav link
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    // Add hover effects to skill items
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.05)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Enhanced project card interactions
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        // Click functionality for mobile devices
        card.addEventListener('click', function(e) {
            // Don't trigger if clicking on the actual buttons
            if (e.target.closest('.project-btn')) {
                return;
            }
            
            // Toggle the show-overlay class for mobile
            if (window.innerWidth <= 768) {
                this.classList.toggle('show-overlay');
                
                // Remove show-overlay from other cards
                projectCards.forEach(otherCard => {
                    if (otherCard !== this) {
                        otherCard.classList.remove('show-overlay');
                    }
                });
            }
        });

        // Enhanced hover effects for desktop
        card.addEventListener('mouseenter', function() {
            if (window.innerWidth > 768) {
                // Add subtle tilt effect
                this.style.transform = 'translateY(-15px) scale(1.02) rotateX(2deg)';
            }
        });

        card.addEventListener('mouseleave', function() {
            if (window.innerWidth > 768) {
                this.style.transform = '';
            }
        });

    });

    // Close overlay when clicking outside (mobile)
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.project-card') && window.innerWidth <= 768) {
            projectCards.forEach(card => {
                card.classList.remove('show-overlay');
            });
        }
    });

    // Add perspective for 3D effects
    const cardStyle = document.createElement('style');
    cardStyle.textContent = `
        .project-card {
            perspective: 1000px;
        }
    `;
    document.head.appendChild(cardStyle);

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const projectObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Apply initial styles and observe project cards
    projectCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        projectObserver.observe(card);
    });

    // Enhanced button interactions with proper link handling
    const projectBtns = document.querySelectorAll('.project-btn');
    projectBtns.forEach(btn => {
        const href = btn.getAttribute('href');
        
        // Hover effects
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        // Click handling
        btn.addEventListener('click', function(e) {
            // Stop propagation to prevent card click
            e.stopPropagation();
            
            // Add click animation
            this.style.transform = 'translateY(-1px) scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'translateY(-3px) scale(1.05)';
            }, 150);
            
            // Handle placeholder links
            if (href === '#') {
                e.preventDefault();
                
                if (this.classList.contains('github-btn')) {
                    alert('GitHub repository link is not available yet.');
                } else if (this.classList.contains('demo-btn')) {
                    alert('Live demo is not available yet.');
                }
                return false;
            }
            
            // For real GitHub links, let them work naturally
            console.log('Opening link:', href);
            // The target="_blank" in HTML will handle opening in new tab
        });
    });
});
