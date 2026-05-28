// --- Highly Reliable Image Data ---
const portfolioData = [
    {
        id: 1,
        title: 'EDITORIAL MATTE',
        category: 'editorial',
        // YOUR CUSTOM GENERATED IMAGE
        image: 'http://googleusercontent.com/image_generation_content/0',
        description: 'High-fashion precision.'
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
        description: 'Command the room.'
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
        title: 'TRADITIONAL',
        category: 'bridal',
        // Stable Traditional Look
        image: 'https://images.unsplash.com/photo-1583391733958-6752478ebf9f?auto=format&fit=crop&q=80&w=800',
        description: 'Classic perfection.'
    },
    {
        id: 6,
        title: 'RECEPTION LUXE',
        category: 'party',
        // Stable Evening Look
        image: 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&q=80&w=800',
        description: 'Sleek and sophisticated.'
    }
];

// --- Render Portfolio & Filtering ---
document.addEventListener('DOMContentLoaded', () => {
    renderPortfolio('all');
    initScrollAnimations();
});

const portfolioGrid = document.getElementById('portfolio-grid');
const filterBtns = document.querySelectorAll('.filter-btn');

function renderPortfolio(filterCategory) {
    portfolioGrid.innerHTML = ''; 
    
    const filteredData = filterCategory === 'all' 
        ? portfolioData 
        : portfolioData.filter(item => item.category === filterCategory);

    filteredData.forEach((item) => {
        const html = `
            <div class="portfolio-item animate-up in-view">
                <img src="${item.image}" alt="${item.title}" loading="lazy">
                <div class="portfolio-overlay">
                    <h3>${item.title}</h3>
                </div>
            </div>
        `;
        portfolioGrid.insertAdjacentHTML('beforeend', html);
    });
}

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderPortfolio(btn.getAttribute('data-filter'));
    });
});

// --- Scroll Animations ---
function initScrollAnimations() {
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-up').forEach(el => {
        observer.observe(el);
    });
}

// --- WhatsApp Booking ---
document.getElementById('booking-form').addEventListener('submit', function(e) {
    e.preventDefault(); 
    
    const name = document.getElementById('name').value;
    const date = document.getElementById('date').value;
    const service = document.getElementById('service').value;
    const message = document.getElementById('message').value;

    const whatsappMessage = `*LUXURY APPOINTMENT REQUEST*\n\n*Name:* ${name}\n*Date:* ${date}\n*Service:* ${service}\n*Notes:* ${message ? message : 'N/A'}\n\nHello, I would like to inquire about availability.`;
    
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappNumber = '919876543210'; // Replace with actual number
    
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
});
