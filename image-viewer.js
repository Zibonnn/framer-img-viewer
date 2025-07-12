// Image viewer for CMS content - Enhanced version with immediate loading
(function() {
  let initialized = false;
  let modal = null;
  
  function createModal() {
    // Check if modal already exists in DOM
    let existingModal = document.getElementById('image-modal');
    if (existingModal) {
      return existingModal;
    }
    
    // Remove any duplicate modals that might exist
    const allModals = document.querySelectorAll('#image-modal');
    if (allModals.length > 1) {
      for (let i = 1; i < allModals.length; i++) {
        allModals[i].remove();
      }
    }
    
    // Create new modal only if it doesn't exist
    modal = document.createElement('div');
    modal.id = 'image-modal';
    modal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.9);
      display: none;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      cursor: pointer;
    `;
    
    const img = document.createElement('img');
    img.style.cssText = `
      max-width: 90%;
      max-height: 90%;
      object-fit: contain;
    `;
    
    const close = document.createElement('div');
    close.innerHTML = '×';
    close.style.cssText = `
      position: absolute;
      top: 20px;
      right: 20px;
      color: white;
      font-size: 30px;
      cursor: pointer;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
    `;
    
    modal.appendChild(img);
    modal.appendChild(close);
    document.body.appendChild(modal);
    
    // Close modal
    modal.addEventListener('click', function(e) {
      if (e.target === modal || e.target === close) {
        modal.style.display = 'none';
        // Clear the image source when closing
        const modalImg = modal.querySelector('img');
        if (modalImg) {
          modalImg.src = '';
        }
      }
    });
    
    return modal;
  }
  
  function addImageHandlers() {
    const images = document.querySelectorAll('img:not([data-imageviewer])');
    
    images.forEach(img => {
      // Skip if already processed or if it's part of the modal
      if (img.closest('#image-modal')) return;
      
      img.setAttribute('data-imageviewer', 'true');
      img.style.cursor = 'pointer';
      
      img.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        // Ensure we have a modal and get the existing one
        const modal = createModal();
        const modalImg = modal.querySelector('img');
        
        // Set the image source and show the modal
        modalImg.src = this.src;
        modal.style.display = 'flex';
        
        // Ensure the modal is on top
        modal.style.zIndex = '9999';
      });
    });
  }
  
  function initImageViewer() {
    if (initialized) return;
    initialized = true;
    
    // Create modal immediately
    createModal();
    
    // Add handlers to existing images
    addImageHandlers();
    
    // Watch for new images with improved observer
    const observer = new MutationObserver(function(mutations) {
      let hasNewImages = false;
      
      mutations.forEach(function(mutation) {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach(function(node) {
            if (node.nodeType === 1) { // Element node
              if (node.tagName === 'IMG') {
                hasNewImages = true;
              } else if (node.querySelectorAll) {
                const images = node.querySelectorAll('img');
                if (images.length > 0) {
                  hasNewImages = true;
                }
              }
            }
          });
        }
      });
      
      if (hasNewImages) {
        // Use requestAnimationFrame for better performance
        requestAnimationFrame(addImageHandlers);
      }
    });
    
    observer.observe(document.body, { 
      childList: true, 
      subtree: true 
    });
    
    // Also listen for image load events
    document.addEventListener('load', function(e) {
      if (e.target.tagName === 'IMG') {
        requestAnimationFrame(addImageHandlers);
      }
    }, true);
  }
  
  // Initialize as soon as possible
  function tryInit() {
    if (document.body) {
      initImageViewer();
    } else {
      // If body doesn't exist yet, wait for it
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initImageViewer);
      } else {
        setTimeout(tryInit, 50);
      }
    }
  }
  
  // Multiple initialization strategies
  tryInit();
  
  // Backup initialization on various events
  document.addEventListener('DOMContentLoaded', initImageViewer);
  window.addEventListener('load', initImageViewer);
  
  // For frameworks that load content dynamically
  window.addEventListener('pageshow', initImageViewer);
  
  // Framer-specific: try after common delays
  setTimeout(initImageViewer, 100);
  setTimeout(initImageViewer, 500);
  setTimeout(initImageViewer, 1000);
  
  // Continuous monitoring for the first 10 seconds
  let continuousCheckCount = 0;
  const continuousInterval = setInterval(function() {
    addImageHandlers();
    continuousCheckCount++;
    if (continuousCheckCount >= 20) { // 10 seconds (20 * 500ms)
      clearInterval(continuousInterval);
    }
  }, 500);
})(); 