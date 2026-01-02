// ===== Mobile Navigation =====
const mobileToggle = document.querySelector('.nav-mobile-toggle');
const mobileMenu = document.querySelector('.mobile-menu');

mobileToggle?.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    mobileToggle.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        mobileToggle.classList.remove('active');
    });
});

// ===== Feature Cards Interaction =====
const featureCards = document.querySelectorAll('.feature-card');
const featureScreens = document.querySelectorAll('.feature-screen');

featureCards.forEach(card => {
    card.addEventListener('click', () => {
        const feature = card.dataset.feature;

        // Update active card
        featureCards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');

        // Update active screen
        featureScreens.forEach(screen => {
            if (screen.dataset.screen === feature) {
                screen.classList.add('active');
            } else {
                screen.classList.remove('active');
            }
        });
    });
});

// ===== FAQ Accordion =====
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');

    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close all other items
        faqItems.forEach(i => i.classList.remove('active'));

        // Toggle current item
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// ===== Smooth Scroll for Anchor Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;

        e.preventDefault();
        const target = document.querySelector(href);

        if (target) {
            const navHeight = document.querySelector('.nav').offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== App Store Link Detection =====
const storeBadges = document.querySelectorAll('.store-badge');

storeBadges.forEach(badge => {
    badge.addEventListener('click', (e) => {
        e.preventDefault();

        const store = badge.dataset.store;
        const userAgent = navigator.userAgent.toLowerCase();
        const isIOS = /iphone|ipad|ipod/.test(userAgent);
        const isAndroid = /android/.test(userAgent);

        // Replace these with actual App Store URLs when available
        const iosUrl = 'https://apps.apple.com/app/pillar';
        const androidUrl = 'https://play.google.com/store/apps/details?id=com.pillar.app';

        if (store === 'ios' || (store === 'ios' && isIOS)) {
            window.open(iosUrl, '_blank');
        } else if (store === 'android' || (store === 'android' && isAndroid)) {
            window.open(androidUrl, '_blank');
        } else {
            // Default behavior - go to appropriate store based on device
            if (isIOS) {
                window.open(iosUrl, '_blank');
            } else if (isAndroid) {
                window.open(androidUrl, '_blank');
            } else {
                // Desktop - go to clicked store
                window.open(store === 'ios' ? iosUrl : androidUrl, '_blank');
            }
        }
    });
});

// ===== Navbar Background on Scroll =====
const nav = document.querySelector('.nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        nav.style.boxShadow = '0 1px 10px rgba(0,0,0,0.1)';
    } else {
        nav.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
});

// ===== Intersection Observer for Animations =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Add fade-in animation to sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Make nav always visible
document.querySelector('.nav').style.opacity = '1';
document.querySelector('.nav').style.transform = 'none';
