/**
 * Simple content protection that hides content from crawlers not using JS
 * The content is initially hidden with CSS and only revealed by this script
 */
document.addEventListener('DOMContentLoaded', function() {
    // Function to check password in URL or local storage
    function checkAccessGranted() {
        // Check URL parameters first
        const urlParams = new URLSearchParams(window.location.search);
        const accessParam = urlParams.get('access');
        
        // If URL has valid access parameter, save it to localStorage
        if (accessParam === 'voice2026preview') {
            localStorage.setItem('voice_access_granted', 'true');
            // Remove the parameter from URL for cleaner appearance
            window.history.replaceState({}, document.title, window.location.pathname);
            return true;
        }
        
        // Check localStorage for saved access
        return localStorage.getItem('voice_access_granted') === 'true';
    }
    
    // Show content if access is granted
    if (checkAccessGranted()) {
        document.body.classList.add('content-visible');
        document.getElementById('access-overlay').style.display = 'none';
    } else {
        // Show the overlay
        document.getElementById('access-overlay').style.display = 'flex';
        
        // Set up the password form
        const accessForm = document.getElementById('access-form');
        if (accessForm) {
            accessForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const passwordInput = document.getElementById('access-password');
                
                if (passwordInput.value === 'voice2026') {
                    // Set access granted in localStorage
                    localStorage.setItem('voice_access_granted', 'true');
                    
                    // Show content
                    document.body.classList.add('content-visible');
                    document.getElementById('access-overlay').style.display = 'none';
                } else {
                    // Show error message
                    document.getElementById('access-error').style.display = 'block';
                    passwordInput.value = '';
                    passwordInput.focus();
                }
            });
        }
    }
});