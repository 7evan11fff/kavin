// JavaScript for Scutum Caeli website

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
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
    
    // Set the reply-to field to the user's email
    const replyToField = e.target.querySelector('input[name="_replyto"]');
    if (replyToField) {
        replyToField.value = data.email;
    }
    
    // Show loading state
    const submitButton = e.target.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    // Submit the form to Formspree
    fetch(e.target.action, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            alert('Thank you for your request! We\'ll contact you within 24 hours to discuss your event security needs.');
            e.target.reset();
        } else {
            throw new Error('Form submission failed');
        }
    })
    .catch(error => {
        alert('There was a problem sending your message. Please try again or contact us directly at kavin.lingham@alpha.school');
        console.error('Error:', error);
    })
    .finally(() => {
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    });
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
    
    section {
        opacity: 0;
        transform: translateY(30px);
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
    
    .step, .kpi-card, .credibility-item, .pricing-card {
        opacity: 0;
        transform: translateY(30px);
    }
`;
document.head.appendChild(style);
