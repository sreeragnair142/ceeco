document.addEventListener('DOMContentLoaded', function() {
    // Image data array - all possible images with their captions
    const galleryImages = [
        {
            src: 'assets/images/gallery/gnew1.jpeg',
            alt: 'Students at graduation ceremony',
            title: 'Graduation Day',
            location: 'Harvard University, USA'
        },
        {
            src: 'assets/images/gallery/gnmew2.jpeg',
            alt: 'Student consultation session',
            title: 'Personalized Advising',
            location: 'Our New York Office'
        },
        {
            src: 'assets/images/gallery/gnew3.jpeg',
            alt: 'International students networking',
            title: 'International Meetup',
            location: 'London, UK'
        },
        {
            src: 'assets/images/gallery/gnew4.jpeg',
            alt: 'Educational workshop',
            title: 'Career Workshop',
            location: 'Singapore Branch Office'
        },
        {
            src: 'assets/images/gallery/gnew5.jpeg',
            alt: 'University campus tour',
            title: 'Campus Tour Program',
            location: 'University of Melbourne, Australia'
        },
        {
            src: 'assets/images/gallery/gnew6.jpeg',
            alt: 'Student visa approval celebration',
            title: 'Visa Success',
            location: 'Ceeco Students, 2023'
        },
        {
            src: 'assets/images/gallery/gnew7.jpg',
            alt: 'Student orientation program',
            title: 'First Day Abroad',
            location: 'University of Toronto, Canada'
        },
        {
            src: 'assets/images/gallery/gnew8.jpg',
            alt: 'Scholarship award ceremony',
            title: 'Scholarship Recipients',
            location: 'Annual Awards Ceremony, 2024'
        },
        {
            src: 'assets/images/gallery/gnew9.jpg',
            alt: 'Student group photo',
            title: 'Alumni Network',
            location: 'Global Reunion Event'
        },
        {
            src: 'assets/images/gallery/gnew10.jpg',
            alt: 'Campus facilities tour',
            title: 'Campus Life',
            location: 'ETH Zurich, Switzerland'
        }
    ];
    
    // Shuffle function
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    
    // Function to generate gallery items
    function generateGallery() {
        // Shuffle the array
        const shuffledImages = shuffleArray([...galleryImages]);
        
        // Take first 6 images (or however many you want to display)
        const selectedImages = shuffledImages.slice(0, 6);
        
        // Get gallery container
        const galleryContainer = document.getElementById('shuffleGallery');
        if (!galleryContainer) return; // Safety check
        
        // Clear existing content with fade out effect
        const existingItems = galleryContainer.querySelectorAll('.gallery-item');
        existingItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(15px)';
        });
        
        // Short delay before replacing content
        setTimeout(() => {
            galleryContainer.innerHTML = '';
            
            // Create HTML for each image
            selectedImages.forEach(image => {
                const galleryItem = document.createElement('div');
                galleryItem.className = 'gallery-item';
                
                galleryItem.innerHTML = `
                    <img src="${image.src}" alt="${image.alt}" class="shuffle-image">
                    <div class="gallery-overlay">
                        <div class="gallery-caption">
                            <h4 style="color: #fff;">${image.title}</h4>
                            <p>${image.location}</p>
                            <a href="${image.src}" class="gallery-zoom" data-fancybox="gallery">
                                <i class="fas fa-expand-alt"></i>
                            </a>
                        </div>
                    </div>
                `;
                
                galleryContainer.appendChild(galleryItem);
            });
            
            // Initialize Fancybox if it exists
            if (typeof $.fancybox === 'function') {
                $('[data-fancybox="gallery"]').fancybox();
            }
        }, 400); // Wait for fade out animation
    }
    
    // Initialize gallery
    generateGallery();
    
    // Auto refresh every 6 seconds
    setInterval(generateGallery, 6000);
    
    // Also shuffle when user returns to tab
    document.addEventListener('visibilitychange', function() {
        if (document.visibilityState === 'visible') {
            generateGallery();
        }
    });
});