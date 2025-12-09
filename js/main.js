// ===================================
// CEYPA VISION - Main JavaScript
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ===================================
    // Preloader (Enhanced - 3 seconds minimum)
    // ===================================
    const preloader = document.querySelector('.preloader');
    const preloaderLogo = preloader ? preloader.querySelector('.loader img') : null;
    const preloaderText = preloader ? preloader.querySelector('.loader-inner') : null;
    
    window.addEventListener('load', function() {
        // Enhanced preloader animation
        if (preloaderLogo) {
            preloaderLogo.style.animation = 'logoFloat 2s ease-in-out infinite';
        }
        if (preloaderText) {
            preloaderText.style.animation = 'textPulse 1.5s ease-in-out infinite';
        }
        
        // Minimum 3 seconds display time
        setTimeout(function() {
            if (preloader) {
                preloader.style.opacity = '0';
                preloader.style.transition = 'opacity 0.5s ease';
                setTimeout(function() {
                    preloader.classList.add('hidden');
                }, 500);
            }
        }, 3000);
    });

    // ===================================
    // Navbar Scroll Effect
    // ===================================
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ===================================
    // Mobile Menu Toggle
    // ===================================
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }

    // ===================================
    // Smooth Scroll for Navigation Links
    // ===================================
    const navLinks = document.querySelectorAll('.nav-link, .dropdown-menu a, .footer-links a, .service-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Check if it's an anchor link (starts with #)
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    // Close mobile menu if open
                    if (navMenu) navMenu.classList.remove('active');
                    if (menuToggle) menuToggle.classList.remove('active');
                    
                    // Calculate offset (navbar height + some padding)
                    const navbarHeight = navbar ? navbar.offsetHeight : 80;
                    const offsetTop = targetSection.offsetTop - navbarHeight - 20;
                    
                    // Smooth scroll to section
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    
                    // Update active link
                    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                    
                    // Find and activate the corresponding nav link
                    const correspondingNavLink = document.querySelector(`.nav-link[href="${href}"]`);
                    if (correspondingNavLink) {
                        correspondingNavLink.classList.add('active');
                    }
                }
            }
        });
    });
    
    // ===================================
    // Dropdown Menu Functionality
    // ===================================
    const dropdown = document.querySelector('.dropdown');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    
    if (dropdown && dropdownMenu) {
        // Desktop hover
        dropdown.addEventListener('mouseenter', function() {
            if (window.innerWidth > 768) {
                dropdownMenu.style.display = 'block';
                setTimeout(() => {
                    dropdownMenu.style.opacity = '1';
                    dropdownMenu.style.transform = 'translateY(0)';
                }, 10);
            }
        });
        
        dropdown.addEventListener('mouseleave', function() {
            if (window.innerWidth > 768) {
                dropdownMenu.style.opacity = '0';
                dropdownMenu.style.transform = 'translateY(-10px)';
                setTimeout(() => {
                    dropdownMenu.style.display = 'none';
                }, 300);
            }
        });
        
        // Mobile click
        const dropdownToggle = dropdown.querySelector('.nav-link');
        if (dropdownToggle) {
            dropdownToggle.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    dropdown.classList.toggle('active');
                    
                    if (dropdown.classList.contains('active')) {
                        dropdownMenu.style.display = 'block';
                        setTimeout(() => {
                            dropdownMenu.style.opacity = '1';
                            dropdownMenu.style.transform = 'translateY(0)';
                        }, 10);
                    } else {
                        dropdownMenu.style.opacity = '0';
                        dropdownMenu.style.transform = 'translateY(-10px)';
                        setTimeout(() => {
                            dropdownMenu.style.display = 'none';
                        }, 300);
                    }
                }
            });
        }
    }

    // ===================================
    // Active Navigation on Scroll
    // ===================================
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', function() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    // ===================================
    // Counter Animation for Stats (Ultra Enhanced - Premium - Fixed)
    // ===================================
    const statNumbers = document.querySelectorAll('.stat-number');
    let animated = false;
    
    function animateCounters() {
        if (animated) return;
        
        statNumbers.forEach((stat, index) => {
            // Stagger animation start for each counter
            setTimeout(() => {
                const target = parseInt(stat.getAttribute('data-count'));
                const duration = 8000; // 8 seconds
                let current = 0;
                let lastUpdate = Date.now();
                
                // Add premium styling - only to the number, not the container
                stat.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
                stat.style.textShadow = '0 0 20px rgba(184, 115, 51, 0.5)';
                
                const updateCounter = () => {
                    const now = Date.now();
                    const deltaTime = now - lastUpdate;
                    lastUpdate = now;
                    
                    // Smooth increment based on time
                    const increment = (target / duration) * deltaTime;
                    current += increment;
                    
                    // Advanced easing with bounce
                    const progress = Math.min(current / target, 1);
                    const easeOutElastic = progress === 1 ? 1 : 
                        Math.pow(2, -10 * progress) * Math.sin((progress - 0.1) * 5 * Math.PI) + 1;
                    const displayValue = Math.floor(target * Math.min(easeOutElastic, 1));
                    
                    if (current < target) {
                        stat.textContent = displayValue;
                        
                        // Dynamic color pulse based on progress
                        const hue = 30 + (progress * 20); // Gold to lighter gold
                        stat.style.color = `hsl(${hue}, 70%, 60%)`;
                        
                        // Continuous subtle scale - only on the number
                        const scale = 1 + Math.sin(progress * Math.PI * 4) * 0.05;
                        stat.style.transform = `scale(${scale}) rotateY(${progress * 360}deg)`;
                        
                        requestAnimationFrame(updateCounter);
                    } else {
                        stat.textContent = target;
                        
                        // Epic final celebration - only on the number
                        stat.style.transform = 'scale(1.3) rotateY(360deg)';
                        stat.style.color = '#C9A961';
                        stat.style.textShadow = '0 0 30px rgba(201, 169, 97, 0.8), 0 0 60px rgba(201, 169, 97, 0.4)';
                        
                        setTimeout(() => {
                            stat.style.transform = 'scale(1) rotateY(0deg)';
                        }, 600);
                    }
                };
                
                requestAnimationFrame(updateCounter);
            }, index * 400); // 400ms delay between each counter
        });
        
        animated = true;
    }
    
    // Trigger counter animation when stats section is in view
    const statsSection = document.querySelector('.hero-stats');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(statsSection);
    }

    // ===================================
    // Portfolio Filter
    // ===================================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    const applyPortfolioFilter = (filterValue) => {
        portfolioItems.forEach(item => {
            const status = item.getAttribute('data-status');
            const shouldShow = filterValue === 'all' || status === filterValue;

            if (shouldShow) {
                item.classList.remove('hide');
                setTimeout(() => {
                    item.style.display = 'block';
                }, 10);
            } else {
                item.classList.add('hide');
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    };

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');
            applyPortfolioFilter(filterValue);
        });
    });

    const defaultFilter = document.querySelector('.filter-btn.active');
    if (defaultFilter) {
        applyPortfolioFilter(defaultFilter.getAttribute('data-filter'));
    }

    // ===================================
    // GLightbox Initialization
    // ===================================
    if (typeof GLightbox !== 'undefined') {
        const lightbox = GLightbox({
            touchNavigation: true,
            loop: true,
            autoplayVideos: true
        });
    }

    // ===================================
    // Contact Form Handling
    // ===================================
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });
            
            // Here you would typically send the data to a server
            // For now, we'll just show a success message
            console.log('Form Data:', data);
            
            // Show success message
            alert('Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.');
            
            // Reset form
            this.reset();
            
            // In a real application, you would do something like:
            /*
            fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(data => {
                alert('Mesajınız başarıyla gönderildi!');
                this.reset();
            })
            .catch(error => {
                alert('Bir hata oluştu. Lütfen tekrar deneyin.');
            });
            */
        });
    }

    // ===================================
    // Language Switcher
    // ===================================
    const languageToggle = document.querySelector('.language-toggle');
    const languageMenu = document.getElementById('languageMenu');
    const languageLabel = document.querySelector('.language-label');
    const languageOptions = document.querySelectorAll('.language-option');

    const setLanguage = (lang) => {
        const label = lang.toUpperCase();
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        localStorage.setItem('preferredLanguage', lang);

        if (languageLabel) {
            languageLabel.textContent = label;
        }

        if (languageMenu) {
            languageMenu.classList.remove('open');
        }

        if (languageToggle) {
            languageToggle.setAttribute('aria-expanded', 'false');
        }
    };

    if (languageToggle && languageMenu) {
        languageToggle.addEventListener('click', () => {
            const isOpen = languageMenu.classList.toggle('open');
            languageToggle.setAttribute('aria-expanded', isOpen);
        });

        document.addEventListener('click', (event) => {
            if (!languageMenu.contains(event.target) && !languageToggle.contains(event.target)) {
                languageMenu.classList.remove('open');
                languageToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    languageOptions.forEach(option => {
        option.addEventListener('click', () => setLanguage(option.getAttribute('data-lang')));
    });

    const storedLang = localStorage.getItem('preferredLanguage');
    if (storedLang) {
        setLanguage(storedLang);
    }

    // ===================================
    // Cookie Consent
    // ===================================
    const cookieBanner = document.getElementById('cookieBanner');
    const acceptCookiesBtn = document.getElementById('acceptCookies');
    const rejectCookiesBtn = document.getElementById('rejectCookies');
    const saveCookiePreferencesBtn = document.getElementById('saveCookiePreferences');
    const analyticsCheckbox = document.getElementById('cookieAnalytics');
    const marketingCheckbox = document.getElementById('cookieMarketing');

    const saveCookiePreferences = (preferences) => {
        localStorage.setItem('cookieConsent', JSON.stringify({
            necessary: true,
            analytics: preferences.analytics,
            marketing: preferences.marketing,
            timestamp: new Date().toISOString()
        }));
    };

    const hideCookieBanner = () => {
        if (cookieBanner) {
            cookieBanner.classList.add('hide');
            setTimeout(() => {
                cookieBanner.style.display = 'none';
            }, 300);
        }
    };

    const showCookieBanner = () => {
        if (cookieBanner) {
            cookieBanner.style.display = 'flex';
            cookieBanner.classList.remove('hide');
        }
    };

    if (cookieBanner && acceptCookiesBtn && rejectCookiesBtn && saveCookiePreferencesBtn) {
        const storedConsent = localStorage.getItem('cookieConsent');
        if (!storedConsent) {
            showCookieBanner();
        } else {
            const consentData = JSON.parse(storedConsent);
            if (analyticsCheckbox) analyticsCheckbox.checked = !!consentData.analytics;
            if (marketingCheckbox) marketingCheckbox.checked = !!consentData.marketing;
        }

        acceptCookiesBtn.addEventListener('click', () => {
            saveCookiePreferences({ analytics: true, marketing: true });
            if (analyticsCheckbox) analyticsCheckbox.checked = true;
            if (marketingCheckbox) marketingCheckbox.checked = true;
            hideCookieBanner();
        });

        rejectCookiesBtn.addEventListener('click', () => {
            saveCookiePreferences({ analytics: false, marketing: false });
            if (analyticsCheckbox) analyticsCheckbox.checked = false;
            if (marketingCheckbox) marketingCheckbox.checked = false;
            hideCookieBanner();
        });

        saveCookiePreferencesBtn.addEventListener('click', () => {
            saveCookiePreferences({
                analytics: analyticsCheckbox ? analyticsCheckbox.checked : false,
                marketing: marketingCheckbox ? marketingCheckbox.checked : false
            });
            hideCookieBanner();
        });
    }

    // ===================================
    // Scroll to Top Button
    // ===================================
    const scrollTopBtn = document.getElementById('scrollTop');
    
    if (scrollTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                scrollTopBtn.classList.add('active');
            } else {
                scrollTopBtn.classList.remove('active');
            }
        });
        
        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ===================================
    // Parallax Effect for Hero Section
    // ===================================
    const heroSection = document.querySelector('.hero');
    
    if (heroSection) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.5;
            
            if (scrolled < window.innerHeight) {
                heroSection.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
            }
        });
    }

    // ===================================
    // Form Input Focus Effects
    // ===================================
    const formInputs = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (this.value === '') {
                this.parentElement.classList.remove('focused');
            }
        });
    });

    // ===================================
    // Lazy Loading for Images
    // ===================================
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));

    // ===================================
    // Video Background Fallback
    // ===================================
    const heroVideo = document.querySelector('.hero-video video');
    
    if (heroVideo) {
        heroVideo.addEventListener('error', function() {
            console.log('Video failed to load, using fallback background');
            const heroSection = document.querySelector('.hero');
            heroSection.style.background = 'linear-gradient(135deg, rgba(10, 10, 10, 0.9) 0%, rgba(15, 52, 96, 0.8) 100%)';
        });
    }

    // ===================================
    // Prevent Default for Empty Links
    // ===================================
    const emptyLinks = document.querySelectorAll('a[href="#"]');
    
    emptyLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
        });
    });

    // ===================================
    // Theme Switcher
    // ===================================
    const themeButtons = document.querySelectorAll('.theme-btn');
    const body = document.body;
    
    // Check for saved theme preference or default to 'dark'
    const currentTheme = localStorage.getItem('theme') || 'dark';
    
    // Apply saved theme
    if (currentTheme === 'light') {
        body.classList.add('light-theme');
        body.removeAttribute('data-theme');
    } else if (currentTheme === 'premium') {
        body.classList.remove('light-theme');
        body.setAttribute('data-theme', 'premium');
    } else {
        body.classList.remove('light-theme');
        body.removeAttribute('data-theme');
    }
    
    // Update active button
    themeButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.theme === currentTheme);
    });
    
    // Theme switch event
    themeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const theme = this.dataset.theme;
            
            // Remove active from all buttons
            themeButtons.forEach(b => b.classList.remove('active'));
            // Add active to clicked button
            this.classList.add('active');
            
            // Apply theme
            if (theme === 'light') {
                body.classList.add('light-theme');
                body.removeAttribute('data-theme');
                localStorage.setItem('theme', 'light');
            } else if (theme === 'premium') {
                body.classList.remove('light-theme');
                body.setAttribute('data-theme', 'premium');
                localStorage.setItem('theme', 'premium');
            } else {
                body.classList.remove('light-theme');
                body.removeAttribute('data-theme');
                localStorage.setItem('theme', 'dark');
            }
        });
    });

    // ===================================
    // Footer Designer Credit Animation
    // ===================================
    const designerCredit = document.querySelector('.designer-credit');
    
    if (designerCredit) {
        // Intersection Observer for scroll animation
        const creditObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    designerCredit.classList.add('pop');
                    setTimeout(() => {
                        designerCredit.classList.remove('pop');
                    }, 600);
                }
            });
        }, { threshold: 0.5 });
        
        creditObserver.observe(designerCredit);
    }

    // ===================================
    // Console Welcome Message
    // ===================================
    console.log('%c🏗️ Ceypa Vision', 'font-size: 20px; font-weight: bold; color: #B87333;');
    console.log('%cLüks İnşaat & İç Mimarlık', 'font-size: 14px; color: #0f3460;');
    console.log('%cWebsite: ceypavision.com.tr', 'font-size: 12px; color: #cccccc;');
    console.log('%cTelefon: 444 04 03', 'font-size: 12px; color: #cccccc;');

});

// ===================================
// Service Worker Registration (Optional)
// ===================================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Uncomment to enable service worker
        /*
        navigator.serviceWorker.register('/sw.js')
            .then(registration => console.log('ServiceWorker registered'))
            .catch(err => console.log('ServiceWorker registration failed'));
        */
    });
}
