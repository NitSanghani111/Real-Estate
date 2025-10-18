/**
 * Partial Loader - Load Header and Footer dynamically
 * This script loads header.html and footer.html into the page
 */

(function() {
    'use strict';

    // Function to load HTML partial
    function loadPartial(elementId, filePath, callback) {
        var element = document.getElementById(elementId);
        if (!element) {
            console.error('Element not found: ' + elementId);
            return;
        }

        // Use XMLHttpRequest for better browser compatibility
        var xhr = new XMLHttpRequest();
        xhr.open('GET', filePath, true);
        
        xhr.onload = function() {
            if (xhr.status === 200) {
                element.innerHTML = xhr.responseText;
                
                // Set active menu item based on current page
                setActiveMenuItem();
                
                if (callback) callback();
            } else {
                console.error('Failed to load ' + filePath + ': ' + xhr.status);
            }
        };
        
        xhr.onerror = function() {
            console.error('Error loading ' + filePath);
        };
        
        xhr.send();
    }

    // Function to set active menu item
    function setActiveMenuItem() {
        var currentPage = window.location.pathname.split('/').pop() || 'index.html';
        
        // Remove active class from all nav items
        var navLinks = document.querySelectorAll('.main-nav a');
        navLinks.forEach(function(link) {
            link.classList.remove('active');
        });
        
        // Add active class to current page
        if (currentPage === 'index.html' || currentPage === '') {
            var homeLink = document.getElementById('nav-home');
            if (homeLink) homeLink.classList.add('active');
        } else if (currentPage === 'contact.html') {
            var contactLink = document.getElementById('nav-contact');
            if (contactLink) contactLink.classList.add('active');
        } else if (currentPage === 'faq.html') {
            var faqLink = document.getElementById('nav-faq');
            if (faqLink) faqLink.classList.add('active');
        } else if (currentPage === 'submit-property.html') {
            var submitLink = document.getElementById('nav-properties');
            if (submitLink) submitLink.classList.add('active');
        }
    }

    // Load partials when DOM is ready
    function init() {
        loadPartial('header-placeholder', 'partials/header.html', function() {
            // Re-initialize WOW.js for header animations if available
            if (typeof WOW !== 'undefined') {
                new WOW().init();
            }
        });
        
        loadPartial('footer-placeholder', 'partials/footer.html', function() {
            // Re-initialize WOW.js for footer animations if available
            if (typeof WOW !== 'undefined') {
                new WOW().init();
            }
        });
    }

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
