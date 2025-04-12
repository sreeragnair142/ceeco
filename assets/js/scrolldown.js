document.addEventListener('DOMContentLoaded', function() {
    // Add ID to the contact section (which contains the eligibility form)
    const contactSection = document.querySelector('.contact-section');
    if (contactSection) {
        contactSection.id = 'eligibility-form';
    }
    
    // Add smooth scrolling for all buttons/links targeting the eligibility form
    document.querySelectorAll('a[href="#eligibility-form"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetElement = document.getElementById('eligibility-form');
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const contactSection = document.querySelector('.contact-section');
    if (contactSection) {
        contactSection.id = 'eligibility-form';
    }
    
    // Add smooth scrolling for the CTA button
    document.querySelectorAll('a[href="#eligibility-form"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetElement = document.getElementById('eligibility-form');
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});



// testimonials//////////////////

document.addEventListener('DOMContentLoaded', function() {
    const track = document.getElementById('testimonialTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dotsContainer = document.getElementById('indicatorDots');
    
    const cards = track.querySelectorAll('.testimonial-card');
    const cardWidth = cards[0].offsetWidth;
    const cardMargin = 20; // 10px on each side
    const totalCardWidth = cardWidth + cardMargin;
    
    let currentPosition = 0;
    let cardsPerView = window.innerWidth >= 768 ? 2 : 1;
    let maxPosition = Math.max(0, cards.length - cardsPerView);
    
    // Generate indicator dots
    for (let i = 0; i < Math.ceil(cards.length / cardsPerView); i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            goToSlide(i * cardsPerView);
        });
        dotsContainer.appendChild(dot);
    }
    
    // Update active dot
    function updateDots() {
        const dots = dotsContainer.querySelectorAll('.dot');
        const activeIndex = Math.floor(currentPosition / cardsPerView);
        
        dots.forEach((dot, index) => {
            if (index === activeIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    // Go to specific slide
    function goToSlide(position) {
        currentPosition = position;
        if (currentPosition < 0) currentPosition = 0;
        if (currentPosition > maxPosition) currentPosition = maxPosition;
        
        const translateX = currentPosition * -totalCardWidth;
        track.style.transform = `translateX(${translateX}px)`;
        
        updateDots();
    }
    
    // Previous slide
    prevBtn.addEventListener('click', () => {
        goToSlide(currentPosition - cardsPerView);
    });
    
    // Next slide
    nextBtn.addEventListener('click', () => {
        goToSlide(currentPosition + cardsPerView);
    });
    
    // Auto slide (every 5 seconds)
    setInterval(() => {
        if (currentPosition >= maxPosition) {
            goToSlide(0);
        } else {
            goToSlide(currentPosition + cardsPerView);
        }
    }, 5000);
    
    // Responsive adjustments
    window.addEventListener('resize', () => {
        cardsPerView = window.innerWidth >= 768 ? 2 : 1;
        maxPosition = Math.max(0, cards.length - cardsPerView);
        
        // Clear existing dots and regenerate
        dotsContainer.innerHTML = '';
        for (let i = 0; i < Math.ceil(cards.length / cardsPerView); i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (i === Math.floor(currentPosition / cardsPerView)) dot.classList.add('active');
            dot.addEventListener('click', () => {
                goToSlide(i * cardsPerView);
            });
            dotsContainer.appendChild(dot);
        }
        
        // Adjust current position if needed
        if (currentPosition > maxPosition) {
            goToSlide(maxPosition);
        } else {
            goToSlide(currentPosition);
        }
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const galleryRow = document.querySelector('.gallery-row');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    // Define how many items to show per page based on screen size
    let itemsPerPage = window.innerWidth >= 992 ? 6 : window.innerWidth >= 576 ? 4 : 2;
    let currentPage = 0;
    
    // Calculate total pages
    const totalPages = Math.ceil(galleryItems.length / itemsPerPage);
    
    // Function to update visible items
    function updateGallery() {
        galleryItems.forEach((item, index) => {
            const startIndex = currentPage * itemsPerPage;
            const endIndex = startIndex + itemsPerPage - 1;
            
            if (index >= startIndex && index <= endIndex) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    }
    
    // Initialize gallery
    updateGallery();
    
    // Previous page
    prevBtn.addEventListener('click', () => {
        if (currentPage > 0) {
            currentPage--;
            updateGallery();
        }
    });
    
    // Next page
    nextBtn.addEventListener('click', () => {
        if (currentPage < totalPages - 1) {
            currentPage++;
            updateGallery();
        }
    });
    
    // Update items per page on window resize
    window.addEventListener('resize', () => {
        const oldItemsPerPage = itemsPerPage;
        itemsPerPage = window.innerWidth >= 992 ? 6 : window.innerWidth >= 576 ? 4 : 2;
        
        if (oldItemsPerPage !== itemsPerPage) {
            // Recalculate total pages
            const newTotalPages = Math.ceil(galleryItems.length / itemsPerPage);
            
            // Adjust current page if needed
            if (currentPage >= newTotalPages) {
                currentPage = newTotalPages - 1;
            }
            
            updateGallery();
        }
    });
});