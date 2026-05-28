document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Bulletproof Scroll Reveal Animations ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Trigger animation when element is just 5% visible
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.05, rootMargin: '0px 0px -20px 0px' });

    document.querySelectorAll('.reveal').forEach((el) => {
        observer.observe(el);
    });

    // --- 2. Mobile Hamburger Menu ---
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            if (navLinks.style.display === 'flex') {
                navLinks.style.display = 'none';
            } else {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100px'; // Header height
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.backgroundColor = '#0a0a0a';
                navLinks.style.padding = '2rem';
            }
        });

        // Close menu automatically on link click
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 900) {
                    navLinks.style.display = 'none';
                }
            });
        });

        // Handle window resizing safely
        window.addEventListener('resize', () => {
            if (window.innerWidth > 900) {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'row';
                navLinks.style.position = 'static';
                navLinks.style.padding = '0';
                navLinks.style.backgroundColor = 'transparent';
            } else {
                navLinks.style.display = 'none';
            }
        });
    }

    // --- 3. Portfolio Gallery Filtering ---
    const tabBtns = document.querySelectorAll('.tab-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active state
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filterValue = btn.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                // Remove the CSS fallback animation when filtering
                item.style.animation = 'none'; 
                
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                    // Re-trigger visual fade-in
                    item.offsetHeight; 
                    item.style.animation = 'failsafeReveal 0.5s ease forwards';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // --- 4. WhatsApp Booking Form Integration ---
    const bookingForm = document.getElementById('booking-form');

    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault(); 
            
            // Gather form inputs
            const name = document.getElementById('name').value.trim();
            const date = document.getElementById('date').value;
            const service = document.getElementById('service').value;
            const message = document.getElementById('message').value.trim();

            // Format WhatsApp Message string
            const whatsappMessage = `✦ *LUXURY APPOINTMENT REQUEST* ✦\n\n*Client Name:* ${name}\n*Event Date:* ${date}\n*Service:* ${service}\n*Event Details & Venue:* ${message ? message : 'None provided'}\n\nHi Keerthu! I would like to inquire about your availability for this date.`;
            
            // Encode message for URL
            const encodedMessage = encodeURIComponent(whatsappMessage);

            // Set the correct business WhatsApp number
            const whatsappNumber = '918147197853'; 
            
            // Open new tab to WhatsApp
            window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
        });
    }
});
