// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Hamburger Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Header scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Load products dynamically
    loadProducts();
});

// Function to load products from the images folder
function loadProducts() {
    // Using your actual Hot Wheels product images
    const products = [
        { name: "Hot Wheels 2-Pack (Toyota Supra Red and Subaru WRX STi Pink)", image: "images/Hot Wheels 2-Pack (Toyota Supra Red and Subaru WRX STi Pink).png" },
        { name: "Hot Wheels Porsche 911 Carrera Clip", image: "images/Hot Wheels Porsche 911 Carrera Clip..jpg" },
        { name: "Pagani Utopia", image: "images/Pagani Utopia..jpg" },
        { name: "Porsche 904 Carrera GTS", image: "images/Porsche 904 Carrera GTS..jpg" },
        { name: "Hot Wheels 2024 Formula 1 (5-Car Pack)", image: "images/hot Wheels 2024 Formula 1 (5-Car Pack)..jpg" }
    ];
    
    // Update products carousel
    const productsContainer = document.getElementById('productsContainer');
    if (productsContainer) {
        productsContainer.innerHTML = '';
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card tilt-effect';
            productCard.innerHTML = `
                <div class="image-container">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <h3>${product.name}</h3>
                <p>Premium Hot Wheels Collection</p>
            `;
            // Add click event to redirect to Instagram
            productCard.addEventListener('click', () => {
                window.open('https://www.instagram.com/carsmainly', '_blank');
            });
            productsContainer.appendChild(productCard);
        });
        
        // Reinitialize products carousel functionality
        initProductsCarousel();
    }
}

// Initialize products carousel
function initProductsCarousel() {
    const productsCarousel = document.querySelector('.products-carousel');
    const productCards = document.querySelectorAll('.product-card');
    const productsPrevBtn = document.querySelector('.products-carousel-nav.prev');
    const productsNextBtn = document.querySelector('.products-carousel-nav.next');
    let productsCurrentIndex = 0;
    
    // Function to update products carousel
    function updateProductsCarousel() {
        if (productCards.length > 0 && productsCarousel) {
            const cardWidth = productCards[0].offsetWidth + 30; // width + margin
            productsCarousel.style.transform = `translateX(-${productsCurrentIndex * cardWidth}px)`;
        }
    }
    
    if (productsPrevBtn && productsNextBtn) {
        productsPrevBtn.addEventListener('click', () => {
            if (productCards.length > 0) {
                productsCurrentIndex = (productsCurrentIndex - 1 + productCards.length) % productCards.length;
                updateProductsCarousel();
            }
        });
        
        productsNextBtn.addEventListener('click', () => {
            if (productCards.length > 0) {
                productsCurrentIndex = (productsCurrentIndex + 1) % productCards.length;
                updateProductsCarousel();
            }
        });
    }
    
    // Tilt effect for cards
    const tiltElements = document.querySelectorAll('.tilt-effect');
    
    tiltElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateY = (x - centerX) / 10;
            const rotateX = (centerY - y) / 10;
            
            element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });
}

// Function to generate product name from file name
function generateProductName(fileName) {
    // Remove file extension
    let name = fileName.replace(/\.[^/.]+$/, "");
    
    // Convert underscores and hyphens to spaces
    name = name.replace(/[_-]/g, " ");
    
    // Capitalize first letter of each word
    name = name.replace(/\b\w/g, function(l) { return l.toUpperCase(); });
    
    return name;
}