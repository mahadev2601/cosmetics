/**
 * Keerthu Makeup - Premium Luxury JavaScript
 * Handles dynamic rendering, advanced scroll animations, and the WhatsApp booking flow.
 */

// --- 1. Data Arrays ---

const portfolioData = [
    {
        id: 1,
        title: 'EDITORIAL MATTE',
        category: 'editorial',
        // The custom generated luxury image
        image: 'http://googleusercontent.com/image_generation_content/0', 
        description: 'High-fashion precision styling.'
    },
    {
        id: 2,
        title: 'BRIDAL RADIANCE',
        category: 'bridal',
        // Stable Unsplash Indian Bridal Link
        image: 'https://images.unsplash.com/photo-1595959183082-7b570b7e08e2?auto=format&fit=crop&q=80&w=800',
        description: 'Timeless cultural elegance.'
    },
    {
        id: 3,
        title: 'EVENING GLAM',
        category: 'party',
        // Stable High-End Glamour Link
        image: 'https://images.unsplash.com/photo-1512303452027-750531d7cb7f?auto=format&fit=crop&q=80&w=800',
        description: 'Command the room with sophistication.'
    },
    {
        id: 4,
        title: 'STUDIO GLOW',
        category: 'editorial',
        // Stable Editorial Portrait
        image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=800',
        description: 'Flawless camera-ready skin.'
    },
    {
        id: 5,
        title: 'TRADITIONAL LUXE',
        category: 'bridal',
        // Stable Traditional Look
        image: 'https://images.unsplash.com/photo-1583391733958-6752478ebf9f?auto=format&fit=crop&q=80&w=800',
        description: 'Classic perfection for your special day.'
    },
    {
        id: 6,
        title: 'RECEPTION SOPHISTICATE',
        category: 'party',
        // Stable Evening Look
        image: 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&q=80&w=800',
        description: 'Sleek, sophisticated, and memorable.'
    },
    {
        id: 7,
        title: 'SOFT GLAM',
        category: 'everyday_glam',
        image: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&q=80&w=800',
        description: 'Enhancing natural beauty seamlessly.'
    },
    {
        id: 8,
        title: 'MODERN BRIDE',
        category: 'bridal',
        image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=800',
        description: 'Contemporary elegance.'
    }
];

const testimonialsData = [
    {
        id: 1,
        name: 'Priya Sharma',
        quote: 'Keerthu made me feel like an absolute queen. The makeup didn’t budge despite all the happy tears. Truly a luxury experience from start to finish.',
        rating: 5,
        service: 'Bridal Artistry'
    },
    {
        id: 2,
        name: 'Ananya Desai',
        quote: 'Her understanding of skin tones and high-end products gave me the most flawless finish for my reception. I received compliments all night long.',
        rating: 5,
        service: 'Party Glamour'
    },
    {
        id: 3,
        name: 'Meera Reddy',
        quote: 'Professional, punctual, and incredibly talented. The editorial look she created for my photoshoot was exactly what I envisioned, but better.',
        rating: 5,
        service: 'Editorial Matte'
    }
];

// --- 2. Initialization ---

document.addEventListener('DOMContentLoaded', () => {
    renderPortfolio('all');
    renderTestimonials();
    initScrollAnimations();
    initCounters();
    initMobileMenu();
});

// --- 3. Portfolio Rendering & Filtering ---

const portfolioGrid = document.getElementById('portfolio-grid');
const filterBtns = document.querySelectorAll('.filter-btn');

function renderPortfolio(filterCategory) {
    // Clear current grid
    portfolioGrid.innerHTML = ''; 
    
    // Filter data based on category
    const filteredData = filterCategory === 'all' 
        ? portfolioData 
        : portfolioData.filter(item => item.category === filterCategory);

    // Inject HTML
    filteredData.forEach((item, index) => {
        // Stagger animation delay based on index
        const delay = (index % 4) * 0.1; 
        
        const html = `
            <div class="portfolio-item animate-up in-view" style="transition-delay: ${delay}s">
                <img src="${item.image}" alt="${item.title}" loading="lazy">
                <div class="portfolio-overlay">
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                </div>
            </div>
        `;
        portfolioGrid.insertAdjacentHTML('beforeend', html);
    });
}

// Event Listeners for Filter Buttons
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        // Render specific category
        renderPortfolio(btn.getAttribute('data-filter'));
    });
});

// --- 4. Testimonials Rendering ---

function renderTestimonials() {
    const testimonialsGrid = document.getElementById('testimonials-grid');
    if (!testimonialsGrid) return;

    testimonialsData.forEach((item, index) => {
        const delay = index + 1; // Used for staggered CSS classes (.delay-1, .delay-2)
        const stars = '★'.repeat(item.rating);
        
        const html = `
            <div class="testimonial-card animate-up delay-${delay}">
                <div class="stars">${stars}</div>
                <p class="quote">"${item.quote}"</p>
                <span class="client-name">${item.name}</span>
                <span class="client-service">${item.service}</span>
            </div>
        `;
        testimonialsGrid.insertAdjacentHTML('beforeend', html);
    });
}

// --- 5. Scroll & Observer Animations ---

function initScrollAnimations() {
    const navbar = document.getElementById('navbar');
    
    // Sticky Navbar & Blur effect on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Intersection Observer for triggering staggered animations
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                // Stop observing once animated
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    // Attach observer to all elements with animation classes
    document.querySelectorAll('.animate-up, .scale-in').forEach(el => {
        observer.observe(el);
    });
}

// --- 6. Number Counter Animation ---

function initCounters() {
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
                        setTimeout(updateCount, 15);
                    } else {
                        counter.innerText = target;
                    }
                };
                
                updateCount();
                obs.unobserve(counter); // Only run the counter once
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));
}

// --- 7. Mobile Navigation (Hamburger) ---

function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            // Toggle display of links
            if (navLinks.style.display === 'flex') {
                navLinks.style.display = 'none';
            } else {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.backgroundColor = 'rgba(10, 10, 10, 0.98)';
                navLinks.style.padding = '2rem';
                navLinks.style.borderBottom = '1px solid rgba(184, 151, 90, 0.2)';
            }
        });

        // Close menu when a link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 900) {
                    navLinks.style.display = 'none';
                }
            });
        });
        
        // Reset styles on window resize
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
}

// --- 8. WhatsApp Booking Flow ---

const bookingForm = document.getElementById('booking-form');

if (bookingForm) {
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent standard page reload
        
        // Gather form data
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const date = document.getElementById('date').value;
        const service = document.getElementById('service').value;
        const message = document.getElementById('message').value;

        // Format Date for premium readability
        const dateObj = new Date(date);
        const formattedDate = dateObj.toLocaleDateString('en-US', {
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
        });

        // Construct the WhatsApp Message
        const whatsappMessage = `✦ *LUXURY APPOINTMENT REQUEST* ✦\n\n*Client Details:*\nName: ${name}\nPhone: ${phone}\n\n*Booking Request:*\nDate: ${formattedDate}\nService: ${service}\nAdditional Info: ${message ? message : 'None provided'}\n\nHello Keerthu, I would like to inquire about your availability for this date.`;
        
        // Encode for URL
        const encodedMessage = encodeURIComponent(whatsappMessage);
        
        // REPLACE WITH ACTUAL BUSINESS WHATSAPP NUMBER (Include country code, omit the plus sign)
        const whatsappNumber = '919876543210'; 
        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
        
        // Open WhatsApp in a new tab
        window.open(whatsappURL, '_blank');
    });
}
