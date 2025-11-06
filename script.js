// DOM Elements
const navbar = document.getElementById('navbar');
const navMenu = document.getElementById('nav-menu');
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelectorAll('.nav-link');
const contactForm = document.getElementById('contact-form');
const typewriterElement = document.getElementById('typewriter');

// Typewriter Effect with writing and erasing
const typewriterTexts = [
    "Building innovative solutions for tomorrow",
    "Creating technology that makes a difference",
    "Turning ideas into reality through code",
    "Learning and growing in the world of technology"
];

let currentTextIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;
let typewriterSpeed = 100;

// ---------------- PHRASE ROTATOR (typewriter effect) ----------------
document.addEventListener("DOMContentLoaded", function () {
    const phraseEl = document.getElementById("phrase");
    const wrapEl = document.getElementById("phrase-wrap");
    if (!phraseEl || !wrapEl) return;

    const phrases = [
        "Web Developer",
        "Tech Geek",
        "Data Analyst",
        "Problem Solver",
        "AI/ML Enthusiast",
        "Engineer"
    ];

    const measure = document.createElement('span');
    Object.assign(measure.style, { visibility: 'hidden', position: 'absolute', whiteSpace: 'nowrap' });
    const cs = window.getComputedStyle(phraseEl);
    measure.style.font = cs.font; measure.style.letterSpacing = cs.letterSpacing;
    document.body.appendChild(measure);
    let maxW = 0; phrases.forEach(p => { measure.textContent = p; maxW = Math.max(maxW, measure.getBoundingClientRect().width); });
    measure.remove();
    wrapEl.style.display = 'inline-block';
    wrapEl.style.width = Math.ceil(maxW) + 'px';

    let i = 0;
    let char = 0;
    let deleting = false;
    const typeSpeed = 95;
    const deleteSpeed = 55;
    const pauseAtEnd = 1200;
    const pauseAtStart = 300;

    function tick() {
        const full = phrases[i];
        if (!deleting) {
            if (char < full.length) {
                phraseEl.textContent = full.slice(0, char + 1);
                char++;
                setTimeout(tick, typeSpeed);
            } else {
                setTimeout(() => { deleting = true; tick(); }, pauseAtEnd);
            }
        } else {
            if (char > 0) {
                phraseEl.textContent = full.slice(0, char - 1);
                char--;
                setTimeout(tick, deleteSpeed);
            } else {
                deleting = false;
                i = (i + 1) % phrases.length;
                setTimeout(tick, pauseAtStart);
            }
        }
    }

    tick();
});


// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    if (navMenu.classList.contains('active')) {
        document.body.classList.add('no-scroll');
    } else {
        document.body.classList.remove('no-scroll');
    }
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('no-scroll');
    });
});

// Reset mobile menu on resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('no-scroll');
    }
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
            // Immediately reflect active state for clicked link to avoid wrong underline during scroll
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Active section highlighting
function updateActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const viewportCenter = window.scrollY + (window.innerHeight / 2);

    let activeId = null;
    sections.forEach(section => {
        const top = section.offsetTop;
        const bottom = top + section.offsetHeight;
        const id = section.getAttribute('id');
        if (viewportCenter >= top && viewportCenter < bottom) {
            activeId = id;
        }
    });

    if (activeId) {
        navLinks.forEach(link => link.classList.remove('active'));
        const link = document.querySelector(`.nav-link[href="#${activeId}"]`);
        if (link) link.classList.add('active');
    }
}

window.addEventListener('scroll', updateActiveSection);

// Intersection Observer for popup animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe sections for fade-in animation
const fadeElements = document.querySelectorAll('.about, .skills, .projects, .achievements, .experience, .contact');
fadeElements.forEach(element => {
    element.classList.add('fade-in');
    observer.observe(element);
});

// Observe individual cards for staggered animation
const projectCards = document.querySelectorAll('.project-card');
const skillCards = document.querySelectorAll('.skill-card');
const achievementCards = document.querySelectorAll('.achievement-card');

[...projectCards, ...skillCards, ...achievementCards].forEach(card => {
    observer.observe(card);
});

// Per-item reveal for timeline items (one-by-one)
const timelineItems = document.querySelectorAll('.timeline-item');
if (timelineItems.length) {
    const timelineObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.6, rootMargin: '0px 0px -10% 0px' });

    timelineItems.forEach(item => {
        timelineObserver.observe(item);
    });
}

// Contact form removed - only email button functionality remains

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show form error
function showFormError(message) {
    const existingError = document.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }

    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.cssText = `
        background: rgba(239, 68, 68, 0.1);
        color: #ef4444;
        padding: 1rem;
        border-radius: 8px;
        border: 1px solid rgba(239, 68, 68, 0.3);
        margin-top: 1rem;
        text-align: center;
    `;
    errorDiv.textContent = message;

    contactForm.appendChild(errorDiv);

    // Remove error after 5 seconds
    setTimeout(() => {
        if (errorDiv.parentNode) {
            errorDiv.remove();
        }
    }, 5000);
}

// Show form success
function showFormSuccess() {
    const existingSuccess = document.querySelector('.success-message');
    if (existingSuccess) {
        existingSuccess.remove();
    }

    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.style.display = 'block';
    successDiv.textContent = 'Message sent successfully! I\'ll get back to you soon.';

    contactForm.appendChild(successDiv);

    // Remove success message after 5 seconds
    setTimeout(() => {
        if (successDiv.parentNode) {
            successDiv.remove();
        }
    }, 5000);
}

// Handle contact form submit to Google Sheets via Apps Script
const contactFormEl = document.getElementById('contact-form');
const GOOGLE_APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw5-anOsH943cG60XzYyFxPoCD341ZlZ1L8ymLRZqQ7CwLktj4bD08T-XwZeZ2W3dbH/exec";
if (contactFormEl) {
    contactFormEl.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(contactFormEl);
        const payload = Object.fromEntries(formData.entries());
        const submitBtn = contactFormEl.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';

        try {
            if (!GOOGLE_APPS_SCRIPT_URL) throw new Error('Apps Script URL missing');
            // 1) Try JSON POST (preferred)
            let ok = false;
            try {
                const res = await fetch(GOOGLE_APPS_SCRIPT_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                });
                if (res.ok) {
                    ok = true;
                }
            } catch (_) { /* fall through */ }

            // 2) Fallback: FormData POST with no-cors (Apps Script reads e.parameter)
            if (!ok) {
                const fd = new FormData();
                fd.append('firstName', payload.firstName || '');
                fd.append('lastName', payload.lastName || '');
                fd.append('email', payload.email || '');
                fd.append('phone', payload.phone || '');
                fd.append('message', payload.message || '');
                await fetch(GOOGLE_APPS_SCRIPT_URL, {
                    method: 'POST',
                    body: fd,
                    mode: 'no-cors'
                });
                // Opaque response – assume success if no exception
            }

            showFormSuccess();
            contactFormEl.reset();
        } catch (err) {
            showFormError('Failed to send. Please try again in a moment.');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    });
}

// Removed parallax effect for hero section to avoid conflicting transforms

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Smooth reveal animation for hero elements (excluding hero-name which types letter-by-letter)
const heroElements = document.querySelectorAll('.hero-title, .hero-tagline, .hero-buttons, .profile-img');
heroElements.forEach((element, index) => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    setTimeout(() => {
        element.style.transition = 'all 0.8s ease';
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
    }, 300 + (index * 200));
});

// Letter-by-letter typing for hero name
document.addEventListener('DOMContentLoaded', () => {
    const heroNameEl = document.querySelector('.hero-name');
    if (!heroNameEl) return;
    const fullText = heroNameEl.textContent;
    heroNameEl.textContent = '';
    heroNameEl.style.opacity = '1';
    heroNameEl.style.transform = 'none';
    let i = 0;
    const typeSpeed = 150; // slower typing speed for hero name
    const typeName = () => {
        if (i <= fullText.length) {
            heroNameEl.textContent = fullText.substring(0, i++);
            setTimeout(typeName, typeSpeed);
        }
    };
    typeName();
});

// Add hover effects for project cards
const projectCards2 = document.querySelectorAll('.project-card');
projectCards2.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Add click effects for buttons
const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;

        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply throttling to scroll events
const throttledScrollHandler = throttle(() => {
    updateActiveSection();
}, 100);

window.addEventListener('scroll', throttledScrollHandler);

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu if open
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Add focus management for accessibility
navLinks.forEach(link => {
    // On focus/keyboard navigation, highlight like active (underline), no box outline
    link.addEventListener('focus', () => {
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
    link.addEventListener('blur', () => {
        // Remove only if not the one corresponding to the current section
        updateActiveSection();
    });
});

// Preload critical images
const criticalImages = [
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=600&fit=crop&crop=face'
];

criticalImages.forEach(src => {
    const img = new Image();
    img.src = src;
});

// Add error handling and robust autoplay for video
const heroVideo = document.querySelector('.hero-video video');
if (heroVideo) {
    heroVideo.addEventListener('error', () => {
        console.log('Video failed to load, using fallback background');
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            heroSection.style.background = 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)';
        }
    });

    const tryPlay = () => {
        // enforce autoplay-friendly attributes at runtime
        heroVideo.muted = true;
        heroVideo.setAttribute('muted', '');
        heroVideo.setAttribute('playsinline', '');
        heroVideo.setAttribute('webkit-playsinline', '');
        heroVideo.removeAttribute('controls');
        const p = heroVideo.play();
        if (p && typeof p.then === 'function') {
            p.catch(() => {/* ignore - will retry on interaction */ });
        }
    };

    window.addEventListener('load', tryPlay);
    const playOnInteract = () => { tryPlay(); window.removeEventListener('click', playOnInteract); window.removeEventListener('touchstart', playOnInteract); };
    window.addEventListener('click', playOnInteract, { once: true });
    window.addEventListener('touchstart', playOnInteract, { once: true });

    // When the video can play, ensure it's fully visible
    heroVideo.addEventListener('canplay', () => {
        heroVideo.style.opacity = '1';
    });
}


// Show resume download success message
function showResumeDownloadSuccess() {
    const existingMessage = document.querySelector('.resume-success-message');
    if (existingMessage) {
        existingMessage.remove();
    }

    const successDiv = document.createElement('div');
    successDiv.className = 'resume-success-message';
    successDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(34, 197, 94, 0.1);
        color: #22c55e;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        border: 1px solid rgba(34, 197, 94, 0.3);
        z-index: 10000;
        font-weight: 500;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    `;
    successDiv.textContent = 'Resume downloaded successfully!';

    document.body.appendChild(successDiv);

    // Remove message after 3 seconds
    setTimeout(() => {
        if (successDiv.parentNode) {
            successDiv.remove();
        }
    }, 3000);
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio website loaded successfully!');
    // Add loading class to body for initial animations
    document.body.classList.add('loading');
    // Remove loading class after a short delay
    setTimeout(() => {
        document.body.classList.remove('loading');
        document.body.classList.add('loaded');
    }, 500);
});
