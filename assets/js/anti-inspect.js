/* ========================================
   ANTI-INSPECT PROTECTION
   Disable Inspect Element, DevTools, Copy
   ======================================== */

(function() {
    'use strict';
    
    // ============================================
    // DISABLE RIGHT-CLICK
    // ============================================
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        showProtectionMessage('Right-click is disabled on this website.');
        return false;
    }, false);
    
    // ============================================
    // DISABLE KEYBOARD SHORTCUTS
    // ============================================
    document.addEventListener('keydown', function(e) {
        // F12 (DevTools)
        if (e.keyCode === 123) {
            e.preventDefault();
            showProtectionMessage('Developer Tools are disabled.');
            return false;
        }
        
        // Ctrl+Shift+I (DevTools)
        if (e.ctrlKey && e.shiftKey && e.keyCode === 73) {
            e.preventDefault();
            showProtectionMessage('Developer Tools are disabled.');
            return false;
        }
        
        // Ctrl+Shift+J (Console)
        if (e.ctrlKey && e.shiftKey && e.keyCode === 74) {
            e.preventDefault();
            showProtectionMessage('Developer Console is disabled.');
            return false;
        }
        
        // Ctrl+Shift+C (Inspect Element)
        if (e.ctrlKey && e.shiftKey && e.keyCode === 67) {
            e.preventDefault();
            showProtectionMessage('Inspect Element is disabled.');
            return false;
        }
        
        // Ctrl+U (View Source)
        if (e.ctrlKey && e.keyCode === 85) {
            e.preventDefault();
            showProtectionMessage('View Source is disabled.');
            return false;
        }
        
        // Ctrl+S (Save Page)
        if (e.ctrlKey && e.keyCode === 83) {
            e.preventDefault();
            showProtectionMessage('Saving page is disabled.');
            return false;
        }
        
        // Ctrl+P (Print)
        if (e.ctrlKey && e.keyCode === 80) {
            e.preventDefault();
            showProtectionMessage('Printing is disabled.');
            return false;
        }
        
        // Ctrl+C (Copy - Optional, uncomment if needed)
        // if (e.ctrlKey && e.keyCode === 67) {
        //     e.preventDefault();
        //     showProtectionMessage('Copying is disabled.');
        //     return false;
        // }
    }, false);
    
    // ============================================
    // DISABLE TEXT SELECTION
    // ============================================
    document.addEventListener('selectstart', function(e) {
        // Allow selection in input fields and textareas
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
            return true;
        }
        e.preventDefault();
        return false;
    }, false);
    
    // ============================================
    // DISABLE DRAG AND DROP
    // ============================================
    document.addEventListener('dragstart', function(e) {
        e.preventDefault();
        return false;
    }, false);
    
    // ============================================
    // DETECT DEVTOOLS OPENING
    // ============================================
    let devtoolsOpen = false;
    const threshold = 160;
    
    setInterval(function() {
        // Check window size difference (DevTools open detection)
        if (window.outerWidth - window.innerWidth > threshold || 
            window.outerHeight - window.innerHeight > threshold) {
            
            if (!devtoolsOpen) {
                devtoolsOpen = true;
                handleDevToolsOpen();
            }
        } else {
            devtoolsOpen = false;
        }
    }, 1000);
    
    function handleDevToolsOpen() {
        // You can redirect, show warning, or take other actions
        showProtectionMessage('Developer Tools detected! Please close them.');
        
        // Optional: Redirect to blank page
        // document.body.innerHTML = '<h1 style="text-align:center; margin-top:50px;">Developer Tools are not allowed on this website.</h1>';
        
        // Optional: Redirect to another page
        // window.location.href = 'about:blank';
    }
    
    // ============================================
    // SHOW PROTECTION MESSAGE
    // ============================================
    function showProtectionMessage(message) {
        // Check if message container exists
        let messageDiv = document.getElementById('protection-message');
        
        if (!messageDiv) {
            messageDiv = document.createElement('div');
            messageDiv.id = 'protection-message';
            messageDiv.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
                color: white;
                padding: 15px 25px;
                border-radius: 10px;
                box-shadow: 0 10px 30px rgba(231, 76, 60, 0.4);
                z-index: 999999;
                font-family: Arial, sans-serif;
                font-size: 14px;
                font-weight: 600;
                animation: slideInRight 0.4s ease-out;
                max-width: 300px;
            `;
            document.body.appendChild(messageDiv);
            
            // Add animation CSS
            const style = document.createElement('style');
            style.textContent = `
                @keyframes slideInRight {
                    from {
                        opacity: 0;
                        transform: translateX(100px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
                @keyframes slideOutRight {
                    from {
                        opacity: 1;
                        transform: translateX(0);
                    }
                    to {
                        opacity: 0;
                        transform: translateX(100px);
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        messageDiv.innerHTML = `<i class="fa fa-exclamation-triangle"></i> ${message}`;
        messageDiv.style.display = 'block';
        
        // Auto-hide after 3 seconds
        setTimeout(function() {
            messageDiv.style.animation = 'slideOutRight 0.4s ease-out';
            setTimeout(function() {
                messageDiv.style.display = 'none';
                messageDiv.style.animation = 'slideInRight 0.4s ease-out';
            }, 400);
        }, 3000);
    }
    
    // ============================================
    // DISABLE CONSOLE
    // ============================================
    (function() {
        try {
            const disableConsole = function() {
                const methods = ['log', 'debug', 'info', 'warn', 'error', 'dir', 'trace'];
                methods.forEach(function(method) {
                    console[method] = function() {};
                });
            };
            
            // Disable console
            if (typeof console !== 'undefined') {
                disableConsole();
            }
            
            // Override console object
            Object.defineProperty(window, 'console', {
                get: function() {
                    return {
                        log: function() {},
                        debug: function() {},
                        info: function() {},
                        warn: function() {},
                        error: function() {},
                        dir: function() {},
                        trace: function() {}
                    };
                },
                set: function() {}
            });
        } catch(e) {
            // Fail silently
        }
    })();
    
    // ============================================
    // DETECT DEBUGGER
    // ============================================
    setInterval(function() {
        debugger; // This will pause execution if DevTools is open
    }, 100);
    
    // ============================================
    // DISABLE COPY (Optional)
    // ============================================
    document.addEventListener('copy', function(e) {
        // Allow copy in input fields and textareas
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
            return true;
        }
        
        e.preventDefault();
        showProtectionMessage('Copying content is disabled.');
        return false;
    }, false);
    
    // ============================================
    // CLEAR CLIPBOARD
    // ============================================
    document.addEventListener('copy', function(e) {
        if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
            e.clipboardData.setData('text/plain', 'Copying is disabled on this website.');
            e.preventDefault();
        }
    });
    
    // ============================================
    // DISABLE CUT (Optional)
    // ============================================
    document.addEventListener('cut', function(e) {
        if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
            e.preventDefault();
            return false;
        }
    }, false);
    
    // ============================================
    // DISABLE PASTE (Optional - Uncomment if needed)
    // ============================================
    // document.addEventListener('paste', function(e) {
    //     if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
    //         e.preventDefault();
    //         return false;
    //     }
    // }, false);
    
    // ============================================
    // PROTECT IMAGES
    // ============================================
    document.addEventListener('DOMContentLoaded', function() {
        const images = document.getElementsByTagName('img');
        for (let i = 0; i < images.length; i++) {
            images[i].addEventListener('contextmenu', function(e) {
                e.preventDefault();
                return false;
            });
            
            images[i].addEventListener('dragstart', function(e) {
                e.preventDefault();
                return false;
            });
        }
    });
    
    // ============================================
    // CLEAR CONSOLE PERIODICALLY
    // ============================================
    setInterval(function() {
        console.clear();
    }, 2000);
    
    // ============================================
    // PREVENT IFRAME EMBEDDING
    // ============================================
    if (window.top !== window.self) {
        window.top.location = window.self.location;
    }
    
    console.log('%cSTOP!', 'color: red; font-size: 50px; font-weight: bold;');
    console.log('%cThis is a browser feature intended for developers. If someone told you to copy-paste something here, it is a scam and will give them access to your account.', 'font-size: 16px;');
    
})();

// ============================================
// CSS PROTECTION - Disable Selection
// ============================================
(function() {
    const style = document.createElement('style');
    style.textContent = `
        * {
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
        }
        
        input, textarea {
            -webkit-user-select: text !important;
            -moz-user-select: text !important;
            -ms-user-select: text !important;
            user-select: text !important;
        }
        
        img {
            pointer-events: none;
            -webkit-user-drag: none;
            -khtml-user-drag: none;
            -moz-user-drag: none;
            -o-user-drag: none;
            user-drag: none;
        }
    `;
    document.head.appendChild(style);
})();
