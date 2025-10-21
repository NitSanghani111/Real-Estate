/* ========================================
   EmailJS Integration for VM RankUp Forms
   Single Template for All Forms
   ======================================== */

// EmailJS Configuration - Update these with your actual values
const EMAILJS_CONFIG = {
    serviceID: 'service_65ze147',
    templateID: 'template_rygct6n',  // Single template for both forms
    publicKey: '6ytGjjlj8MyqqFGVs'
};

// Initialize EmailJS when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('EmailJS Initializing...');
    
    if (EMAILJS_CONFIG.publicKey) {
        emailjs.init(EMAILJS_CONFIG.publicKey);
        console.log('EmailJS initialized with key:', EMAILJS_CONFIG.publicKey);
    } else {
        console.error('EmailJS public key is missing!');
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
    if (!heroForm) {
        console.log('Hero form not found on this page');
        return;
    }
    
    console.log('Hero form found and listener attached');
    
    heroForm.addEventListener('submit', function(e) {
        e.preventDefault();
        console.log('Hero form submitted');
        
        if (!validateEmailJSConfig()) {
            alert('Email service is not configured properly. Please contact support.');
            return;
        }
        
        // Get form data
        const formData = {
            fullName: document.getElementById('fullName').value,
            email: document.getElementById('email').value,
            contactNo: document.getElementById('phone').value,
            message: document.getElementById('message').value
        };
        
        console.log('Hero Form Data:', formData);
        
        const submitBtn = heroForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Sending...';
        
        // Send email using EmailJS
        console.log('Sending email via EmailJS...');
        emailjs.send(
            EMAILJS_CONFIG.serviceID,
            EMAILJS_CONFIG.templateID,
            formData
        )
        .then(function(response) {
            console.log('SUCCESS! Email sent:', response.status, response.text);
            alert('Success! Email sent. Redirecting to thank you page...');
            // Redirect to thank you page
            window.location.href = 'thankyou.html';
        })
        .catch(function(error) {
            console.error('FAILED! Email not sent:', error);
            alert('Error: ' + JSON.stringify(error) + '\n\nPlease check:\n1. Service ID: ' + EMAILJS_CONFIG.serviceID + '\n2. Template ID: ' + EMAILJS_CONFIG.templateID + '\n3. Public Key is correct\n4. Template has fields: fullName, email, contactNo, message');
            
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
    if (!contactForm) {
        console.log('Contact form not found on this page');
        return;
    }
    
    console.log('Contact form found and listener attached');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        console.log('Contact form submitted');
        
        if (!validateEmailJSConfig()) {
            alert('Email service is not configured properly. Please contact support.');
            return;
        }
        
        // Get form data - Same field names as hero form
        const formData = {
            fullName: document.getElementById('contactName').value,
            email: document.getElementById('contactEmail').value,
            contactNo: document.getElementById('contactPhone').value,
            message: document.getElementById('contactMessage').value
        };
        
        console.log('Contact Form Data:', formData);
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Sending...';
        
        // Send email using EmailJS - Same template!
        console.log('Sending email via EmailJS...');
        emailjs.send(
            EMAILJS_CONFIG.serviceID,
            EMAILJS_CONFIG.templateID,
            formData
        )
        .then(function(response) {
            console.log('SUCCESS! Email sent:', response.status, response.text);
            alert('Success! Email sent. Redirecting to thank you page...');
            // Redirect to thank you page
            window.location.href = 'thankyou.html';
        })
        .catch(function(error) {
            console.error('FAILED! Email not sent:', error);
            alert('Error: ' + JSON.stringify(error) + '\n\nPlease check:\n1. Service ID: ' + EMAILJS_CONFIG.serviceID + '\n2. Template ID: ' + EMAILJS_CONFIG.templateID + '\n3. Public Key is correct\n4. Template has fields: fullName, email, contactNo, message');
            
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        });
    });
}

// ============================================
// VALIDATION & UTILITY FUNCTIONS
// ============================================
function validateEmailJSConfig() {
    const isValid = EMAILJS_CONFIG.publicKey && 
                    EMAILJS_CONFIG.serviceID && 
                    EMAILJS_CONFIG.templateID;
    
    if (!isValid) {
        console.error('EmailJS Config Invalid:', EMAILJS_CONFIG);
    }
    
    return isValid;
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

// Log configuration on load for debugging
console.log('EmailJS Configuration:', {
    serviceID: EMAILJS_CONFIG.serviceID,
    templateID: EMAILJS_CONFIG.templateID,
    publicKey: EMAILJS_CONFIG.publicKey ? '***' + EMAILJS_CONFIG.publicKey.slice(-4) : 'MISSING'
});
