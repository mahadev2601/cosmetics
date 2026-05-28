/**
 * Keerthu Makeup - The Luxury Artistry
 * Main JavaScript File
 */

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Sticky Navbar Scroll Effect ---
    const navbar = document.getElementById('navbar');
    
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // --- 2. Mobile Hamburger Menu Toggle ---
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            // Toggle menu visibility
            if (navLinks.style.display === 'flex') {
                navLinks.style.display = 'none';
            } else {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = 'var(--header-height)';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.backgroundColor = 'var(--bg-darkest)';
                navLinks.style.padding = '2rem';
                navLinks.style.borderBottom = '1px solid rgba(184, 151, 90, 0.2)';
            }
        });

        // Close menu automatically when a link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 900) {
                    navLinks.style.display = 'none';
                }
            });
        });

        // Reset styles securely on window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 900) {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'row';
                navLinks.style.position = 'static';
                navLinks.style.padding = '0';
                navLinks.style.backgroundColor = 'transparent';
                navLinks.style.borderBottom = 'none';
            } else {
                navLinks.style.display = 'none';
            }
        });
    }

    // --- 3. High-Visibility Scroll Reveal Animations ---
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, revealOptions);

    document.querySelectorAll('.reveal').forEach((el) => {
        observer.observe(el);
    });

    // --- 4. Number Counters Animation (About Section) ---
    const counters = document.querySelectorAll('.counter');
    const speed = 200; // The higher the number, the slower the count

    const counterObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                
                const updateCount = () => {
                    const target = +counter.getAttribute('data-target');
                    const count = +counter.innerText;
                    const increment = target / speed;

                    if (count < target) {
                        counter.innerText = Math.ceil(count + increment);
                        setTimeout(updateCount, 15); // Adjust for frame smoothness
                    } else {
                        counter.innerText = target;
                    }
                };
                
                updateCount();
                obs.unobserve(counter); // Only run the counter animation once
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));

    // --- 5. Portfolio Gallery Filtering ---
    const tabBtns = document.querySelectorAll('.tab-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    if (tabBtns.length > 0 && portfolioItems.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                tabBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                btn.classList.add('active');
                
                const filterValue = btn.getAttribute('data-filter');

                portfolioItems.forEach(item => {
                    if (filterValue === 'all' || item.classList.contains(filterValue)) {
                        item.style.display = 'block';
                        // Reset and re-trigger the CSS fade-in animation
                        item.style.animation = 'none';
                        item.offsetHeight; // Trigger reflow
                        item.style.animation = 'fadeInUp 0.5s ease forwards';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }

    // --- 6. WhatsApp Booking Form Integration ---
    const bookingForm = document.getElementById('booking-form');

    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault(); 
            
            // Capture form values
            const name = document.getElementById('name').value.trim();
            const date = document.getElementById('date').value;
            const service = document.getElementById('service').value;
            const message = document.getElementById('message').value.trim();

            // Format Date for premium readability
            let formattedDate = date;
            try {
                const dateObj = new Date(date);
                formattedDate = dateObj.toLocaleDateString('en-US', {
                    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
                });
            } catch(error) {
                // Fallback to standard input value if parsing fails
                formattedDate = date;
            }

            // Construct the luxury WhatsApp Message
            const whatsappMessage = `✦ *LUXURY APPOINTMENT REQUEST* ✦\n\n*Client Name:* ${name}\n*Event Date:* ${formattedDate}\n*Service:* ${service}\n*Event Details & Venue:* ${message ? message : 'None provided'}\n\nHi Keerthu! I would like to inquire about your availability for this date.`;
            
            // Encode message for URL compatibility
            const encodedMessage = encodeURIComponent(whatsappMessage);

            // Verified WhatsApp Number assigned
            const whatsappNumber = '918147197853'; 
            
            // Generate WhatsApp API URL and open in new tab
            const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
            window.open(whatsappURL, '_blank');
        });
    }
});
