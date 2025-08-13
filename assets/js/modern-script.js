// Modern JavaScript for Bem Pilates Studio

// DOM Ready
document.addEventListener('DOMContentLoaded', function() {
    initializeComponents();
});

// Initialize all components
function initializeComponents() {
    initNavbar();
    initSwiper();
    initAOS();
    initSmoothScroll();
    initLazyLoading();
    initPerformanceOptimizations();
}

// Navbar functionality
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    
    // Navbar scroll effect
    function handleNavbarScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    }
    
    // Throttled scroll event
    let scrollThrottle = false;
    window.addEventListener('scroll', () => {
        if (!scrollThrottle) {
            requestAnimationFrame(() => {
                handleNavbarScroll();
                scrollThrottle = false;
            });
            scrollThrottle = true;
        }
    });
    
    // Close mobile menu when clicking on links
    const navLinks = document.querySelectorAll('.nav-link');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                bsCollapse.hide();
            }
        });
    });
}

// Initialize Swiper Gallery
function initSwiper() {
    const gallerySwiper = new Swiper('.gallery-swiper', {
        // Basic parameters
        loop: true,
        centeredSlides: true,
        spaceBetween: 30,
        
        // Autoplay
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
        },
        
        // Navigation
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        
        // Pagination
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: true,
        },
        
        // Effects
        effect: 'coverflow',
        coverflowEffect: {
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
        },
        
        // Responsive breakpoints
        breakpoints: {
            320: {
                slidesPerView: 1,
                effect: 'slide',
                coverflowEffect: {
                    rotate: 0,
                }
            },
            640: {
                slidesPerView: 1,
                effect: 'slide',
            },
            768: {
                slidesPerView: 1,
                effect: 'coverflow',
            },
            1024: {
                slidesPerView: 1,
                effect: 'coverflow',
            },
        },
        
        // Performance
        watchSlidesProgress: true,
        watchSlidesVisibility: true,
        
        // Accessibility
        a11y: {
            prevSlideMessage: 'Slide anterior',
            nextSlideMessage: 'Próximo slide',
            firstSlideMessage: 'Este é o primeiro slide',
            lastSlideMessage: 'Este é o último slide',
        },
        
        // Keyboard control
        keyboard: {
            enabled: true,
            onlyInViewport: true,
        },
        
        // Mouse wheel control
        mousewheel: {
            invert: false,
        },
    });
    
    // Pause autoplay when user hovers over swiper
    const swiperContainer = document.querySelector('.gallery-swiper');
    if (swiperContainer) {
        swiperContainer.addEventListener('mouseenter', () => {
            gallerySwiper.autoplay.stop();
        });
        
        swiperContainer.addEventListener('mouseleave', () => {
            gallerySwiper.autoplay.start();
        });
    }
}

// Initialize AOS (Animate On Scroll)
function initAOS() {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100,
        disable: window.innerWidth < 768 ? true : false,
    });
    
    // Refresh AOS on window resize
    window.addEventListener('resize', () => {
        AOS.refresh();
    });
}

// Smooth scroll for anchor links
function initSmoothScroll() {
    // Handle smooth scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (!target) return;
            e.preventDefault();

            // Fecha o menu mobile antes de calcular o scroll
            const navbarCollapse = document.querySelector('.navbar-collapse');
            let menuWasOpen = navbarCollapse && navbarCollapse.classList.contains('show');
            if (menuWasOpen) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                bsCollapse.hide();
                // Aguarda o menu recolher antes de rolar
                setTimeout(() => {
                    const headerHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight - 20;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }, 350); // tempo do collapse do Bootstrap
            } else {
                const headerHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Lazy loading for images
function initLazyLoading() {
    // Create intersection observer for lazy loading
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    // Observe all images with data-src attribute
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Performance optimizations
function initPerformanceOptimizations() {
    // Preload critical resources
    preloadCriticalResources();
    
    // Optimize scroll performance
    optimizeScrollPerformance();
    
    // Handle resize events efficiently
    handleResizeEvents();
}

function preloadCriticalResources() {
    // Preload hero image
    const heroImage = new Image();
    heroImage.src = 'assets/img/foto1.jpg';
    
    // Preload gallery images
    const galleryImages = [
        'assets/img/foto2%20(1).jpg',
        'assets/img/foto3%20(1).jpg',
        'assets/img/foto4%20(2).jpg',
        'assets/img/foto5.jpg'
    ];
    
    galleryImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

function optimizeScrollPerformance() {
    let ticking = false;
    
    function updateScrollRelatedElements() {
        // Add any scroll-related animations or effects here
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateScrollRelatedElements);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
}

function handleResizeEvents() {
    let resizeTimer;
    
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            // Refresh AOS
            if (typeof AOS !== 'undefined') {
                AOS.refresh();
            }
            
            // Update any responsive elements
            updateResponsiveElements();
        }, 150);
    });
}

function updateResponsiveElements() {
    // Update any elements that need recalculation on resize
    const isMobile = window.innerWidth < 768;
    
    // Disable/enable certain features on mobile
    if (isMobile) {
        // Mobile-specific optimizations
        document.body.classList.add('mobile-device');
    } else {
        document.body.classList.remove('mobile-device');
    }
}

// Utility functions
const Utils = {
    // Debounce function
    debounce: function(func, wait, immediate) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                timeout = null;
                if (!immediate) func(...args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func(...args);
        };
    },
    
    // Throttle function
    throttle: function(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },
    
    // Check if element is in viewport
    isInViewport: function(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
};

// Contact form functionality (if needed in the future)
function initContactForm() {
    const contactForm = document.querySelector('#contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Form validation and submission logic here
            const formData = new FormData(this);
            
            // Show loading state
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Enviando...';
            submitButton.disabled = true;
            
            // Simulate form submission (replace with actual submission logic)
            setTimeout(() => {
                // Reset form
                this.reset();
                
                // Reset button
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                
                // Show success message
                showNotification('Mensagem enviada com sucesso!', 'success');
            }, 2000);
        });
    }
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '15px 20px',
        borderRadius: '5px',
        color: 'white',
        backgroundColor: type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#17a2b8',
        zIndex: '9999',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease'
    });
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Analytics and tracking (if needed)
function initAnalytics() {
    // Google Analytics or other tracking code can be added here
    
    // Track important interactions
    document.querySelectorAll('.cta-button').forEach(button => {
        button.addEventListener('click', () => {
            // Track CTA clicks
            if (typeof gtag !== 'undefined') {
                gtag('event', 'click', {
                    event_category: 'CTA',
                    event_label: 'Contact Button'
                });
            }
        });
    });
    
    // Track social media clicks
    document.querySelectorAll('.social-link').forEach(link => {
        link.addEventListener('click', () => {
            const platform = link.getAttribute('aria-label');
            if (typeof gtag !== 'undefined') {
                gtag('event', 'click', {
                    event_category: 'Social',
                    event_label: platform
                });
            }
        });
    });
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // You could send this to an error tracking service
});

// Service Worker registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Export for module systems (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        Utils,
        initializeComponents,
        showNotification
    };
}
