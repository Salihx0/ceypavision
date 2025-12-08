// ===================================
// CEYPA VISION - Animations
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ===================================
    // AOS (Animate On Scroll) Initialization
    // ===================================
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: true,
            mirror: false,
            offset: 100,
            delay: 0,
            anchorPlacement: 'top-bottom'
        });
        
        // Refresh AOS on window resize
        window.addEventListener('resize', function() {
            AOS.refresh();
        });
    }

    // ===================================
    // Custom Scroll Animations
    // ===================================
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100 && elementBottom > 0) {
                element.classList.add('animated');
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Initial check

    // ===================================
    // Parallax Scroll Effect
    // ===================================
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.parallax || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });

    // ===================================
    // Fade In Animation
    // ===================================
    const fadeInElements = document.querySelectorAll('.fade-in');
    
    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    fadeInElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        fadeInObserver.observe(element);
    });

    // ===================================
    // Slide In Animation
    // ===================================
    const slideInElements = document.querySelectorAll('.slide-in-left, .slide-in-right');
    
    const slideInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    slideInElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        if (element.classList.contains('slide-in-left')) {
            element.style.transform = 'translateX(-50px)';
        } else {
            element.style.transform = 'translateX(50px)';
        }
        
        slideInObserver.observe(element);
    });

    // ===================================
    // Scale Animation on Hover
    // ===================================
    const scaleElements = document.querySelectorAll('.scale-on-hover');
    
    scaleElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // ===================================
    // Rotate Animation on Hover
    // ===================================
    const rotateElements = document.querySelectorAll('.rotate-on-hover');
    
    rotateElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'rotate(5deg)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'rotate(0deg)';
        });
    });

    // ===================================
    // Typing Effect
    // ===================================
    const typingElements = document.querySelectorAll('[data-typing]');
    
    typingElements.forEach(element => {
        const text = element.dataset.typing;
        const speed = parseInt(element.dataset.typingSpeed) || 100;
        let index = 0;
        
        element.textContent = '';
        
        const typeWriter = () => {
            if (index < text.length) {
                element.textContent += text.charAt(index);
                index++;
                setTimeout(typeWriter, speed);
            }
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    typeWriter();
                    observer.unobserve(element);
                }
            });
        });
        
        observer.observe(element);
    });

    // ===================================
    // Stagger Animation
    // ===================================
    const staggerContainers = document.querySelectorAll('[data-stagger]');
    
    staggerContainers.forEach(container => {
        const children = container.children;
        const delay = parseInt(container.dataset.stagger) || 100;
        
        Array.from(children).forEach((child, index) => {
            child.style.opacity = '0';
            child.style.transform = 'translateY(20px)';
            child.style.transition = `opacity 0.5s ease ${index * delay}ms, transform 0.5s ease ${index * delay}ms`;
        });
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    Array.from(children).forEach(child => {
                        child.style.opacity = '1';
                        child.style.transform = 'translateY(0)';
                    });
                    observer.unobserve(container);
                }
            });
        }, { threshold: 0.2 });
        
        observer.observe(container);
    });

    // ===================================
    // Reveal Animation
    // ===================================
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, {
        threshold: 0.15
    });
    
    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    // ===================================
    // Pulse Animation
    // ===================================
    const pulseElements = document.querySelectorAll('.pulse');
    
    pulseElements.forEach(element => {
        setInterval(() => {
            element.style.animation = 'pulse 1s ease';
            setTimeout(() => {
                element.style.animation = '';
            }, 1000);
        }, 3000);
    });

    // ===================================
    // Bounce Animation on Scroll
    // ===================================
    const bounceElements = document.querySelectorAll('.bounce-on-scroll');
    
    const bounceObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'bounce 1s ease';
                setTimeout(() => {
                    entry.target.style.animation = '';
                }, 1000);
            }
        });
    }, { threshold: 0.5 });
    
    bounceElements.forEach(element => {
        bounceObserver.observe(element);
    });

    // ===================================
    // Progress Bar Animation
    // ===================================
    const progressBars = document.querySelectorAll('.progress-bar');
    
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.dataset.progress || '0';
                bar.style.width = width + '%';
                bar.style.transition = 'width 1.5s ease';
            }
        });
    }, { threshold: 0.5 });
    
    progressBars.forEach(bar => {
        bar.style.width = '0%';
        progressObserver.observe(bar);
    });

    // ===================================
    // Smooth Reveal for Images
    // ===================================
    const imageReveal = document.querySelectorAll('.image-reveal');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.clipPath = 'inset(0 0 0 0)';
                img.style.transition = 'clip-path 1s ease';
            }
        });
    }, { threshold: 0.2 });
    
    imageReveal.forEach(img => {
        img.style.clipPath = 'inset(0 100% 0 0)';
        imageObserver.observe(img);
    });

    // ===================================
    // Text Reveal Animation
    // ===================================
    const textReveal = document.querySelectorAll('.text-reveal');
    
    textReveal.forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        
        const words = text.split(' ');
        words.forEach((word, index) => {
            const span = document.createElement('span');
            span.textContent = word + ' ';
            span.style.opacity = '0';
            span.style.display = 'inline-block';
            span.style.transform = 'translateY(20px)';
            element.appendChild(span);
        });
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const spans = entry.target.querySelectorAll('span');
                    spans.forEach((span, index) => {
                        setTimeout(() => {
                            span.style.opacity = '1';
                            span.style.transform = 'translateY(0)';
                            span.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                        }, index * 100);
                    });
                    observer.unobserve(element);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(element);
    });

    // ===================================
    // Mouse Follow Effect
    // ===================================
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        border: 2px solid #d4af37;
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.2s ease;
        display: none;
    `;
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.display = 'block';
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
    });
    
    document.addEventListener('mousedown', () => {
        cursor.style.transform = 'scale(0.8)';
    });
    
    document.addEventListener('mouseup', () => {
        cursor.style.transform = 'scale(1)';
    });

    // ===================================
    // Magnetic Button Effect
    // ===================================
    const magneticButtons = document.querySelectorAll('.btn-primary, .btn-outline');
    
    magneticButtons.forEach(button => {
        button.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            this.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translate(0, 0)';
        });
    });

    console.log('%c✨ Animations Loaded', 'color: #d4af37; font-weight: bold;');
});

// ===================================
// CSS Keyframes (Added dynamically)
// ===================================
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }
    
    @keyframes bounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-20px); }
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .revealed {
        animation: fadeInUp 0.8s ease forwards;
    }
`;
document.head.appendChild(style);
