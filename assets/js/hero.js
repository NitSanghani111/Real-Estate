/**
 * Hero Section - Contact Form Handler
 * Modern, conversion-focused hero section with form validation
 */

(function() {
    'use strict';

    // Form validation and submission
    document.addEventListener('DOMContentLoaded', function() {
        
        // Add loaded class for animation
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            setTimeout(() => {
                heroSection.classList.add('loaded');
            }, 100);
        }

        const heroForm = document.getElementById('heroContactForm');
        
        if (!heroForm) return;

        // Form submission handler
        heroForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                fullName: document.getElementById('fullName').value.trim(),
                email: document.getElementById('email').value.trim(),
                phone: document.getElementById('phone').value.trim(),
                message: document.getElementById('message').value.trim()
            };

            // Validate form
            if (!validateForm(formData)) {
                return false;
            }

            // Show loading state
            const submitBtn = heroForm.querySelector('.hero-form-submit');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;

            // Simulate form submission (replace with actual backend call)
            setTimeout(() => {
                // Success message
                showSuccessMessage();
                
                // Reset form
                heroForm.reset();
                
                // Restore button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;

                // Send to backend (example)
                // fetch('/api/contact', {
                //     method: 'POST',
                //     headers: { 'Content-Type': 'application/json' },
                //     body: JSON.stringify(formData)
                // }).then(response => response.json())
                //   .then(data => console.log(data))
                //   .catch(error => console.error('Error:', error));

            }, 1500);
        });

        // Real-time validation
        const inputs = heroForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });

            input.addEventListener('input', function() {
                if (this.classList.contains('error')) {
                    validateField(this);
                }
            });
        });
    });

    // Validate individual field
    function validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        // Remove previous error
        removeError(field);

        // Validation rules
        switch(field.id) {
            case 'fullName':
                if (value.length < 2) {
                    isValid = false;
                    errorMessage = 'Please enter your full name';
                }
                break;
            
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid email address';
                }
                break;
            
            case 'phone':
                const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
                if (!phoneRegex.test(value)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid phone number';
                }
                break;
            
            case 'message':
                if (value.length < 10) {
                    isValid = false;
                    errorMessage = 'Message must be at least 10 characters';
                }
                break;
        }

        if (!isValid) {
            showError(field, errorMessage);
        }

        return isValid;
    }

    // Validate entire form
    function validateForm(data) {
        let isValid = true;

        // Validate full name
        if (data.fullName.length < 2) {
            showError(document.getElementById('fullName'), 'Please enter your full name');
            isValid = false;
        }

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            showError(document.getElementById('email'), 'Please enter a valid email address');
            isValid = false;
        }

        // Validate phone
        const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
        if (!phoneRegex.test(data.phone)) {
            showError(document.getElementById('phone'), 'Please enter a valid phone number');
            isValid = false;
        }

        // Validate message
        if (data.message.length < 10) {
            showError(document.getElementById('message'), 'Message must be at least 10 characters');
            isValid = false;
        }

        return isValid;
    }

    // Show error message
    function showError(field, message) {
        field.classList.add('error');
        field.style.borderColor = '#e74c3c';
        
        // Remove existing error message
        const existingError = field.parentElement.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }

        // Add error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.color = '#e74c3c';
        errorDiv.style.fontSize = '13px';
        errorDiv.style.marginTop = '5px';
        errorDiv.textContent = message;
        field.parentElement.appendChild(errorDiv);
    }

    // Remove error message
    function removeError(field) {
        field.classList.remove('error');
        field.style.borderColor = '#e0e0e0';
        
        const errorMessage = field.parentElement.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    }

    // Show success message
    function showSuccessMessage() {
        const formCard = document.querySelector('.hero-form-card');
        
        // Create success message
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: #fff;
            padding: 40px;
            border-radius: 15px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.2);
            text-align: center;
            z-index: 1000;
            width: 90%;
            max-width: 400px;
        `;
        
        successDiv.innerHTML = `
            <div style="font-size: 60px; color: #27ae60; margin-bottom: 20px;">
                <i class="fa fa-check-circle"></i>
            </div>
            <h3 style="color: #2c3e50; margin-bottom: 10px;">Thank You!</h3>
            <p style="color: #666; margin-bottom: 20px;">
                We've received your message and will get back to you within 24 hours.
            </p>
            <button onclick="this.parentElement.remove()" style="
                padding: 12px 30px;
                background: #FFA500;
                color: #fff;
                border: none;
                border-radius: 8px;
                cursor: pointer;
                font-weight: 600;
            ">Got it!</button>
        `;
        
        formCard.style.position = 'relative';
        formCard.appendChild(successDiv);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (successDiv.parentElement) {
                successDiv.remove();
            }
        }, 5000);
    }

    // Track form interactions (for analytics)
    function trackFormInteraction(action, label) {
        // Google Analytics or other tracking
        if (typeof gtag !== 'undefined') {
            gtag('event', action, {
                'event_category': 'Hero Form',
                'event_label': label
            });
        }
        console.log('Track:', action, label);
    }

    // Phone number formatting (US format)
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 0) {
                if (value.length <= 3) {
                    value = value;
                } else if (value.length <= 6) {
                    value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
                } else {
                    value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
                }
            }
            e.target.value = value;
        });
    }

})();
