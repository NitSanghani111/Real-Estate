/* ========================================
   EmailJS Integration for VM RankUp Forms
   Optimized & Production Ready
   ======================================== */

// EmailJS Configuration
const EMAILJS_CONFIG = {
    serviceID: 'service_65ze147',
    heroTemplateID: 'template_rygct6n',
    contactTemplateID: 'template_rygct6n',
    publicKey: '6ytGjjlj8MyqqFGVs'
};

// Initialize EmailJS when page loads
document.addEventListener('DOMContentLoaded', function() {
    if (EMAILJS_CONFIG.publicKey) {
        emailjs.init(EMAILJS_CONFIG.publicKey);
    }
    
    setupHeroForm();
    setupContactForm();
    initPhoneFormatting();
});

// ============================================
// HERO FORM HANDLER
// ============================================
function setupHeroForm() {
    const heroForm = document.getElementById('heroContactForm');
    if (!heroForm) return;
    
    heroForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!validateEmailJSConfig()) {
            showFormMessage('heroFormMessage', 'error', 'Email service is not configured.');
            return;
        }
        
        const formData = {
            fullName: document.getElementById('fullName').value,
            email: document.getElementById('email').value,
            contactNo: document.getElementById('phone').value,
            message: document.getElementById('message').value
        };
        
        const submitBtn = heroForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Sending...';
        
        emailjs.send(
            EMAILJS_CONFIG.serviceID,
            EMAILJS_CONFIG.heroTemplateID,
            formData
        )
        .then(function(response) {
            console.log('Email sent successfully!', response.status);
            window.location.href = 'thankyou.html';
        })
        .catch(function(error) {
            console.error('Email failed:', error);
            showFormMessage('heroFormMessage', 'error', 'Failed to send message. Please try again.');
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
        
        if (!validateEmailJSConfig()) {
            showFormMessage('contactFormMessage', 'error', 'Email service is not configured.');
            return;
        }
        
        const formData = {
            fullName: document.getElementById('contactName').value,
            email: document.getElementById('contactEmail').value,
            contactNo: document.getElementById('contactPhone').value,
            message: document.getElementById('contactMessage').value
        };
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Sending...';
        
        emailjs.send(
            EMAILJS_CONFIG.serviceID,
            EMAILJS_CONFIG.contactTemplateID,
            formData
        )
        .then(function(response) {
            console.log('Email sent successfully!', response.status);
            window.location.href = 'thankyou.html';
        })
        .catch(function(error) {
            console.error('Email failed:', error);
            showFormMessage('contactFormMessage', 'error', 'Failed to send message. Please try again.');
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        });
    });
}

// ============================================
// VALIDATION & UTILITY FUNCTIONS
// ============================================
function validateEmailJSConfig() {
    return EMAILJS_CONFIG.publicKey && 
           EMAILJS_CONFIG.serviceID && 
           (EMAILJS_CONFIG.heroTemplateID || EMAILJS_CONFIG.contactTemplateID);
}

function showFormMessage(messageId, type, message) {
    const messageContainer = document.getElementById(messageId);
    if (!messageContainer) return;
    
    messageContainer.className = `hero-form-message ${type} show`;
    messageContainer.innerHTML = `<i class="fa fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i> ${message}`;
    
    setTimeout(() => {
        messageContainer.classList.remove('show');
    }, 5000);
}

function formatPhoneNumber(input) {
    let phone = input.value.replace(/\D/g, '');
    
    if (phone.length >= 6) {
        phone = `(${phone.slice(0, 3)}) ${phone.slice(3, 6)}-${phone.slice(6, 10)}`;
    } else if (phone.length >= 3) {
        phone = `(${phone.slice(0, 3)}) ${phone.slice(3)}`;
    }
    
    input.value = phone;
}

function initPhoneFormatting() {
    const phoneInputs = ['phone', 'contactPhone'];
    
    phoneInputs.forEach(id => {
        const input = document.getElementById(id);
        if (input) {
            input.addEventListener('input', function() {
                formatPhoneNumber(this);
            });
        }
    });
}
