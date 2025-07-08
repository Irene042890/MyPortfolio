// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 30px rgba(0,0,0,0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    }
});

// Active nav link highlighting
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('appear');
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.research-card, .cert-card, .publication-item, .about-content, .skills-category');
    animateElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});

// Statistics counter animation
const animateCounters = () => {
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
        const target = parseInt(counter.innerText.replace('+', ''));
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.innerText = Math.ceil(current) + (counter.innerText.includes('+') ? '+' : '');
                setTimeout(updateCounter, 20);
            } else {
                counter.innerText = target + (counter.innerText.includes('+') ? '+' : '');
            }
        };
        updateCounter();
    });
};

// Trigger counter animation when stats section is visible
const statsSection = document.querySelector('.stats');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

if (statsSection) {
    statsObserver.observe(statsSection);
}

// Contact form handling
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Simple validation
    if (!name || !email || !subject || !message) {
        showNotification('Please fill in all fields.', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
    }
    
    // Simulate form submission
    const submitBtn = this.querySelector('.btn-primary');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
        this.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
});

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#2ecc71' : type === 'error' ? '#e74c3c' : '#3498db'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto close after 5 seconds
    setTimeout(() => {
        if (document.body.contains(notification)) {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// CV download functionality
document.getElementById('download-cv').addEventListener('click', function(e) {
    e.preventDefault();
    
    // Create a mock CV content
    const cvContent = `
Dr. Marina Aquatica - Curriculum Vitae

CONTACT INFORMATION
Email: marina.aquatica@university.edu
Phone: +1 (555) 123-4567
Address: Marine Science Institute, Coastal University
ORCID: 0000-0002-1234-5678

EDUCATION
Ph.D. in Marine Biology - Scripps Institution of Oceanography (2008)
M.S. in Aquatic Sciences - University of California, San Diego (2005)
B.S. in Marine Biology - University of Miami (2003)

PROFESSIONAL EXPERIENCE
Senior Research Scientist - Marine Science Institute (2015-Present)
Research Associate - NOAA Research Laboratory (2010-2015)
Postdoctoral Fellow - EPA Marine Laboratory (2008-2010)

RESEARCH INTERESTS
- Water Quality Analysis and Assessment
- Marine Biodiversity and Conservation
- Climate Change Impact on Aquatic Ecosystems
- Environmental Monitoring and Assessment

SELECTED PUBLICATIONS
1. "Impact of Microplastics on Marine Food Webs: A Comprehensive Analysis" 
   Marine Environmental Research, 2023
2. "Novel Biomarkers for Early Detection of Aquatic Ecosystem Stress" 
   Environmental Science & Technology, 2022
3. "Climate Change Adaptation Strategies for Coastal Marine Protected Areas" 
   Conservation Biology, 2021

AWARDS AND HONORS
- Excellence in Marine Research Award (2022)
- Environmental Protection Agency Merit Award (2020)
- Outstanding Young Scientist Award (2018)

CERTIFICATIONS
- PADI Divemaster (2020)
- Water Quality Specialist, EPA (2019)
- Analytical Chemistry Certification, ACS (2018)
- Marine Safety Certification, IMO (2021)

TECHNICAL SKILLS
Field Research: Water Sampling, SCUBA Diving, Underwater Photography
Laboratory: Microscopy, PCR & DNA Sequencing, Spectrophotometry
Data Analysis: R Programming, Python, MATLAB, GIS Mapping
Equipment: CTD Sensors, Multi-parameter Probes, YSI Instruments
    `;
    
    // Create and download the CV file
    const blob = new Blob([cvContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Dr_Marina_Aquatica_CV.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    showNotification('CV downloaded successfully!', 'success');
});

// Skill tags hover animation
document.querySelectorAll('.skill-tag').forEach(tag => {
    tag.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05) translateY(-2px)';
        this.style.boxShadow = '0 5px 15px rgba(52, 152, 219, 0.4)';
    });
    
    tag.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) translateY(0)';
        this.style.boxShadow = 'none';
    });
});

// Research cards enhanced hover effects
document.querySelectorAll('.research-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Bubble animation enhancement
document.querySelectorAll('.bubble').forEach((bubble, index) => {
    bubble.addEventListener('click', function() {
        this.style.animation = 'none';
        this.style.transform = 'scale(1.5)';
        this.style.opacity = '0';
        
        setTimeout(() => {
            this.style.animation = `float 6s ease-in-out infinite`;
            this.style.animationDelay = `${index * 2}s`;
            this.style.transform = 'scale(1)';
            this.style.opacity = '1';
        }, 500);
    });
});

// Typing effect for hero text
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-text h1');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 100);
    }
});

// Publication items click to expand
document.querySelectorAll('.publication-item').forEach(item => {
    item.addEventListener('click', function() {
        const abstract = this.querySelector('.pub-abstract');
        if (abstract.style.display === 'none' || !abstract.style.display) {
            abstract.style.display = 'block';
            this.style.backgroundColor = '#e8f4fd';
        } else {
            abstract.style.display = 'none';
            this.style.backgroundColor = '#f8f9fa';
        }
    });
});

// Add loading animation when page loads
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Remove any loading elements
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 500);
    }
});

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
window.addEventListener('scroll', throttle(() => {
    // Your scroll-dependent code here
}, 16)); // ~60fps

// Accessibility improvements
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu if open
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        
        // Close any notifications
        const notification = document.querySelector('.notification');
        if (notification) {
            notification.remove();
        }
    }
});

// Focus management for accessibility
document.querySelectorAll('.btn, .nav-link, .social-link').forEach(element => {
    element.addEventListener('focus', function() {
        this.style.outline = '2px solid #3498db';
        this.style.outlineOffset = '2px';
    });
    
    element.addEventListener('blur', function() {
        this.style.outline = 'none';
    });
});

console.log('🌊 Aquatic Science Portfolio - Loaded successfully! 🐠');