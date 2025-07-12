// Minimal CSS Lightbox Helper - Just for click handling
(function() {
    'use strict';
    
    // Create modal container if it doesn't exist
    function createModal() {
        if (document.getElementById('css-image-modal')) return;
        
        const modal = document.createElement('div');
        modal.id = 'css-image-modal';
        modal.className = 'css-image-modal';
        modal.innerHTML = `
            <img src="" alt="Lightbox Image">
            <div class="close"></div>
        `;
        document.body.appendChild(modal);
        
        // Close handlers
        const closeBtn = modal.querySelector('.close');
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
        
        // Keyboard close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                modal.classList.remove('active');
            }
        });
    }
    
    // Add click handlers to images
    function addImageHandlers() {
        const images = document.querySelectorAll('[data-framer-component-type="RichText"] img:not([data-lightbox-ready])');
        
        images.forEach(img => {
            img.setAttribute('data-lightbox-ready', 'true');
            
            img.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                const modal = document.getElementById('css-image-modal');
                const modalImg = modal.querySelector('img');
                
                modalImg.src = img.src;
                modalImg.alt = img.alt || 'Lightbox Image';
                
                modal.classList.add('active');
            });
        });
    }
    
    // Initialize
    function init() {
        createModal();
        addImageHandlers();
    }
    
    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    // Re-run when new content is added (for dynamic content)
    const observer = new MutationObserver(() => {
        setTimeout(addImageHandlers, 100);
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
    
})(); 