// JavaScript for VOICEtheme26

document.addEventListener('DOMContentLoaded', function() {
    console.log('VOICE 2026 Theme loaded');
    
    // Dropdown Menu
    const setupDropdowns = () => {
        const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
        
        // Toggle dropdown on click
        dropdownToggles.forEach(toggle => {
            toggle.addEventListener('click', function(e) {
                e.preventDefault();
                const parent = this.parentElement;
                const menu = parent.querySelector('.dropdown-menu');
                
                // Close all other open dropdowns
                document.querySelectorAll('.dropdown-menu.show').forEach(openMenu => {
                    if (openMenu !== menu) {
                        openMenu.classList.remove('show');
                    }
                });
                
                // Toggle current dropdown
                menu.classList.toggle('show');
            });
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.dropdown')) {
                document.querySelectorAll('.dropdown-menu.show').forEach(menu => {
                    menu.classList.remove('show');
                });
            }
        });
        
        console.log('Dropdown menus initialized');
    };
    
    // Mobile Navigation Toggle
    const setupMobileNav = () => {
        // This would be implemented with appropriate HTML for mobile menu toggle
        console.log('Mobile navigation ready');
    };
    
    // Countdown Timer
    const updateCountdown = () => {
        const conferenceDate = new Date('May 18, 2026 09:00:00').getTime();
        const now = new Date().getTime();
        const distance = conferenceDate - now;
        
        // Calculate days, hours, minutes, seconds
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        
        // Update DOM if element exists
        const countdownEl = document.getElementById('countdown');
        if (countdownEl) {
            const daysEl = countdownEl.querySelector('.days');
            if (daysEl) {
                daysEl.textContent = days;
            }
        }
    };
    
    // Initialize countdown
    updateCountdown();
    // Update countdown daily
    setInterval(updateCountdown, 86400000);
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Form submission handler (for newsletter subscription)
    const subscribeForm = document.querySelector('.subscribe-form');
    if (subscribeForm) {
        subscribeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            console.log(`Subscription requested for: ${email}`);
            // Here you would send the data to your backend
            
            // Show success message
            alert('Thank you for subscribing to VOICE 2026 updates!');
            this.reset();
        });
    }
    
    // FAQ Accordion
    const setupAccordion = () => {
        const accordionHeaders = document.querySelectorAll('.accordion-header');

        accordionHeaders.forEach(header => {
            header.addEventListener('click', function() {
                const item = this.parentElement;
                const isActive = item.classList.contains('active');

                // Toggle current item
                item.classList.toggle('active');
                this.setAttribute('aria-expanded', !isActive);
            });
        });

        if (accordionHeaders.length > 0) {
            console.log('Accordion initialized');
        }
    };

    // Initialize all components
    setupDropdowns();
    setupMobileNav();
    setupAccordion();
});