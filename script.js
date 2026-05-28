/**
 * Keerthu Makeup - JavaScript Logic
 * Follows strict specifications for data rendering, filtering, and animations.
 */

// --- 1. Data Arrays (Highly Reliable Unsplash Image Links) ---
const portfolioData = [
    {
        id: 1,
        title: 'Traditional Elegance',
        category: 'bridal',
        image: 'https://images.unsplash.com/photo-1595959183082-7b570b7e08e2?auto=format&fit=crop&q=80&w=800',
        description: 'Classic bridal radiance with flawless skin.'
    },
    {
        id: 2,
        title: 'High Fashion Matte',
        category: 'editorial',
        image: 'https://images.unsplash.com/photo-1542452255191-c85a98f2c5d1?auto=format&fit=crop&q=80&w=800',
        description: 'Avant-garde styling for studio lighting.'
    },
    {
        id: 3,
        title: 'Evening Glamour',
        category: 'party',
        image: 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&q=80&w=800',
        description: 'Sophisticated contour and dramatic eyes.'
    },
    {
        id: 4,
        title: 'Soft Glow',
        category: 'everyday_glam',
        image: 'https://images.unsplash.com/photo-1512303452027-750531d7cb7f?auto=format&fit=crop&q=80&w=800',
        description: 'Enhancing natural beauty seamlessly.'
    },
    {
        id: 5,
        title: 'Modern Bride',
        category: 'bridal',
        image: 'https://images.unsplash.com/photo-1583391733958-6752478ebf9f?auto=format&fit=crop&q=80&w=800',
        description: 'Contemporary bridal styling.'
    },
    {
        id: 6,
        title: 'Event Ready',
        category: 'party',
        image: 'https://images.unsplash.com/photo-1529154261765-b1a9cc9e7ec7?auto=format&fit=crop&q=80&w=800',
        description: 'Flawless base for all-night wear.'
    }
];

const testimonialsData = [
    {
        id: 1,
        name: 'Priya Sharma',
        quote: 'Keerthu made me feel like an absolute queen on my wedding day. The makeup didn’t budge despite all the crying!',
        rating: 5,
        service: 'Bridal Makeup'
    },
    {
        id: 2,
        name: 'Ananya Desai',
        quote: 'Her understanding of skin tones and high-end products gave me the most luxurious, flawless finish for my reception.',
        rating: 5,
        service: 'Party Glamour'
    },
    {
        id: 3,
        name: 'Meera Reddy',
        quote: 'Professional, punctual, and incredibly talented. The everyday glam look was perfect for my pre-wedding shoot.',
        rating: 5,
        service: 'Everyday Glam'
    }
];

// --- 2. DOM Elements & Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    renderPortfolio('all');
    renderTestimonials();
    initScrollAnimations();
    initCounters();
});

// --- 3. Render Portfolio & Filtering ---
const portfolioGrid = document.getElementById('portfolio-grid');
const filterBtns = document.querySelectorAll('.filter-btn');

function renderPortfolio(filterCategory) {
    portfolioGrid.innerHTML = ''; // Clear current grid
    
    const filteredData = filterCategory === 'all' 
        ? portfolioData 
        : portfolioData.filter(item => item.category === filterCategory);

    filteredData.forEach((item, index) => {
        const delay = (index % 3) * 0.1; // Stagger effect
        const html = `
            <div class="portfolio-item show" style="transition-delay: ${delay}s">
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

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active to clicked
        btn.classList.add('active');
        // Render based on data-filter attribute
        renderPortfolio(btn.getAttribute('data-filter'));
    });
});

// --- 4. Render Testimonials ---
function renderTestimonials() {
    const testimonialsGrid = document.getElementById('testimonials-grid');
    testimonialsData.forEach((item, index) => {
        const delay = index + 1; // Used for animation class mapping
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

// --- 5. Scroll Animations (Intersection Observer) ---
function initScrollAnimations() {
    const navbar = document.getElementById('navbar');
    const heroBg = document.querySelector('.hero-bg');
    
    // Sticky Nav & Parallax Hero
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Subtle Parallax
        if(heroBg) {
            heroBg.style.transform = `scale(1.05) translateY(${window.scrollY * 0.3}px)`;
        }
    });

    // Observer for staggered entrance animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                // Optional: Stop observing once animated
                // observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-up, .scale-in').forEach(el => {
        observer.observe(el);
    });
}

// --- 6. Number Counter Animation ---
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    const speed = 200; // The lower the slower

    const counterObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const updateCount = () => {
                    const target = +counter.getAttribute('data-target');
                    const count = +counter.innerText;
                    const inc = target / speed;

                    if (count < target) {
                        counter.innerText = Math.ceil(count + inc);
                        setTimeout(updateCount, 15);
                    } else {
                        counter.innerText = target;
                    }
                };
                updateCount();
                obs.unobserve(counter); // Only run once
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));
}

// --- 7. WhatsApp Booking Flow ---
const bookingForm = document.getElementById('booking-form');

bookingForm.addEventListener('submit', function(e) {
    e.preventDefault(); 
    
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const date = document.getElementById('date').value;
    const service = document.getElementById('service').value;
    const message = document.getElementById('message').value;

    // Format Date for readability
    const formattedDate = new Date(date).toLocaleDateString('en-US', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });

    const whatsappMessage = `✨ *New Appointment Request: Keerthu Makeup* ✨\n\n*Client Details:*\nName: ${name}\nPhone: ${phone}\n\n*Booking Details:*\nDate: ${formattedDate}\nService: ${service}\nAdditional Info: ${message ? message : 'N/A'}\n\nHello Keerthu, I would love to confirm my booking with you!`;
    
    const encodedMessage = encodeURIComponent(whatsappMessage);
    
    // UPDATE THIS NUMBER (Use Country Code, no plus sign)
    const whatsappNumber = '919876543210'; 
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    // Open in new tab
    window.open(whatsappURL, '_blank');
});
