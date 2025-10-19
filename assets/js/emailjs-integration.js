/* ========================================
   EmailJS Integration for Forms
   Hero Form + Contact Form
   ======================================== */

// EmailJS Configuration - FILL THESE IN
const EMAILJS_CONFIG = {
    serviceID: 'service_65ze147', // Your EmailJS Service ID
    heroTemplateID: 'template_4sxdae1', // Template ID for Hero Form
      // Template ID for Contact Form
    publicKey: '6ytGjjlj8MyqqFGVs' // Your EmailJS Public Key
};

// Initialize EmailJS when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Only initialize if credentials are provided
    if (EMAILJS_CONFIG.publicKey) {
        emailjs.init(EMAILJS_CONFIG.publicKey);
    }
    
    // Setup Hero Form
    setupHeroForm();
    
    // Setup Contact Form
    setupContactForm();
});

// ============================================
// HERO FORM HANDLER
// ============================================
function setupHeroForm() {
    const heroForm = document.getElementById('heroContactForm');
    
    if (!heroForm) return;
    
    heroForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Check if EmailJS is configured
        if (!EMAILJS_CONFIG.publicKey || !EMAILJS_CONFIG.serviceID || !EMAILJS_CONFIG.heroTemplateID) {
            showFormMessage('hero', 'error', 'EmailJS is not configured. Please add your credentials.');
            return;
        }
        
        // Get form data
        const formData = {
            from_name: document.getElementById('fullName').value,
            from_email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            message: document.getElementById('message').value,
            form_type: 'Hero Section Form',
            submitted_at: new Date().toLocaleString()
        };
        
        // Disable submit button
        const submitBtn = heroForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Sending...';
        
        // Send email using EmailJS
        emailjs.send(
            EMAILJS_CONFIG.serviceID,
            EMAILJS_CONFIG.heroTemplateID,
            formData
        )
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            showFormMessage('hero', 'success', 'Thank you! Your message has been sent successfully. We\'ll contact you within 24 hours.');
            heroForm.reset();
            
            // Re-enable button
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        })
        .catch(function(error) {
            console.error('FAILED...', error);
            showFormMessage('hero', 'error', 'Oops! Something went wrong. Please try again or contact us directly.');
            
            // Re-enable button
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        });
    });
}

// ============================================
// CONTACT FORM HANDLER
// ============================================
function setupContactForm() {
    const contactForm = document.getElementById('contactUsForm');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Check if EmailJS is configured
        if (!EMAILJS_CONFIG.publicKey || !EMAILJS_CONFIG.serviceID || !EMAILJS_CONFIG.heroContactForm) {
            showFormMessage('contact', 'error', 'EmailJS is not configured. Please add your credentials.');
            return;
        }
        
        // Get form data
        const formData = {
            from_name: document.getElementById('contactName').value,
            from_email: document.getElementById('contactEmail').value,
            phone: document.getElementById('contactPhone').value,
            subject: document.getElementById('contactSubject').value,
            message: document.getElementById('contactMessage').value,
            form_type: 'Contact Us Form',
            submitted_at: new Date().toLocaleString()
        };
        
        // Disable submit button
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Sending...';
        
        // Send email using EmailJS
        emailjs.send(
            EMAILJS_CONFIG.serviceID,
            EMAILJS_CONFIG.heroContactForm,
            formData
        )
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            showFormMessage('contact', 'success', 'Thank you for contacting us! We\'ve received your message and will respond shortly.');
            contactForm.reset();
            
            // Re-enable button
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        })
        .catch(function(error) {
            console.error('FAILED...', error);
            showFormMessage('contact', 'error', 'Oops! Something went wrong. Please try again or contact us directly.');
            
            // Re-enable button
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        });
    });
}

// ============================================
// SHOW FORM MESSAGE
// ============================================
function showFormMessage(formType, type, message) {
    let messageContainer;
    
    if (formType === 'hero') {
        // Create message container if it doesn't exist
        const heroForm = document.getElementById('heroContactForm');
        messageContainer = heroForm.querySelector('.form-message');
        
        if (!messageContainer) {
            messageContainer = document.createElement('div');
            messageContainer.className = 'form-message';
            heroForm.appendChild(messageContainer);
        }
    } else {
        messageContainer = document.getElementById('heroContactForm');
    }
    
    if (!messageContainer) return;
    
    // Set message
    messageContainer.className = `form-message ${type}`;
    messageContainer.innerHTML = `<i class="fa fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i> ${message}`;
    messageContainer.style.display = 'block';
    
    // Auto-hide after 5 seconds
    setTimeout(function() {
        messageContainer.style.display = 'none';
    }, 5000);
}

// ============================================
// PHONE NUMBER FORMATTING (US Format)
// ============================================
function formatPhoneNumber(input) {
    // Remove all non-digit characters
    let phone = input.value.replace(/\D/g, '');
    
    // Format as (XXX) XXX-XXXX
    if (phone.length >= 6) {
        phone = `(${phone.slice(0, 3)}) ${phone.slice(3, 6)}-${phone.slice(6, 10)}`;
    } else if (phone.length >= 3) {
        phone = `(${phone.slice(0, 3)}) ${phone.slice(3)}`;
    }
    
    input.value = phone;
}

// Apply phone formatting to both forms
document.addEventListener('DOMContentLoaded', function() {
    const heroPhone = document.getElementById('phone');
    const contactPhone = document.getElementById('contactPhone');
    
    if (heroPhone) {
        heroPhone.addEventListener('input', function() {
            formatPhoneNumber(this);
        });
    }
    
    if (contactPhone) {
        contactPhone.addEventListener('input', function() {
            formatPhoneNumber(this);
        });
    }
});
