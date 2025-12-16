// JavaScript for Scutum Caeli website

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
    // Hamburger menu functionality
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            
            // Update active link
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Add smooth scrolling to all anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
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

    // Form submission handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmission);
    }

    // Add scroll effect to hero section
    window.addEventListener('scroll', handleScroll);
    
    // Update active navigation link on scroll
    window.addEventListener('scroll', updateActiveNavLink);
});

// Handle form submission
function handleFormSubmission(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // Basic validation
    if (!data.name || !data.email || !data.eventDate || !data.venueCity) {
        alert('Please fill in all required fields.');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        alert('Please enter a valid email address.');
        return;
    }
    
    // Date validation (event should be in the future)
    const eventDate = new Date(data.eventDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (eventDate < today) {
        alert('Event date must be in the future.');
        return;
    }
    
    // Send email using mailto
    sendEmail(data);
    
    // Reset form
    e.target.reset();
}

// Send email function
function sendEmail(data) {
    const recipient = 'kavin.lingham@alpha.school';
    const subject = `Security Drone Service Request - ${data.name}`;
    
    // Format the email body
    const body = `New Security Drone Service Request

Contact Information:
Name: ${data.name}
Email: ${data.email}

Event Details:
Event Date: ${data.eventDate}
Guest Count: ${data.guestCount || 'Not specified'}
Venue City: ${data.venueCity}
Security Lead: ${data.securityLead || 'Not specified'}

Additional Notes:
${data.notes || 'No additional notes provided'}

---
This request was submitted through the Scutum Caeli website contact form.`;

    // Create mailto link
    const mailtoLink = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Open email client
    window.open(mailtoLink);
    
    // Show success message
    alert('Thank you for your request! Your email client should open with a pre-filled message to our team. Please send the email to complete your request.');
}

// Handle scroll effects
function handleScroll() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
    
    // Add fade-in animation to sections as they come into view
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const windowHeight = window.innerHeight;
        
        if (scrolled > sectionTop - windowHeight + sectionHeight / 2) {
            section.classList.add('fade-in');
        }
    });
}

// Update active navigation link on scroll
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Open booking modal or redirect to booking system
function openBooking() {
    const bookingEmail = 'kavin.lingham@alpha.school';
    const subject = 'Site Walk Request - Security Drone Services';
    const body = `Hello Kavin,\n\nI would like to schedule a site walk for my upcoming event. Please contact me to arrange a convenient time.\n\nEvent Details:\n- Event Date: [Please specify]\n- Venue: [Please specify]\n- Expected Guest Count: [Please specify]\n- Contact Information: [Please provide your phone number]\n\nThank you for your time.\n\nBest regards,\n[Your Name]`;
    
    const mailtoLink = `mailto:${bookingEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoLink);
}

// Request quote function
function requestQuote() {
    // Scroll to contact form
    const contactSection = document.querySelector('.contact');
    if (contactSection) {
        contactSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        
        // Focus on the first input field
        setTimeout(() => {
            const nameInput = document.getElementById('name');
            if (nameInput) {
                nameInput.focus();
            }
        }, 500);
    }
}

// Add loading animation for images
function preloadImages() {
    const imageUrls = [
        'https://images.unsplash.com/photo-1519501025264-65ba15a82390?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
        'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
    ];
    
    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

// Initialize image preloading
preloadImages();

// Add intersection observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.step, .kpi-card, .credibility-item, .pricing-card');
    animateElements.forEach(el => {
        observer.observe(el);
    });
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .fade-in {
        opacity: 1;
        transform: translateY(0);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .animate-in {
        animation: slideInUp 0.6s ease forwards;
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);
