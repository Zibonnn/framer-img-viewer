// Image viewer for CMS content - Enhanced version
(function() {
  let initialized = false;
  
  function initImageViewer() {
    if (initialized) return;
    initialized = true;
    
    // Add modal HTML
    const modal = document.createElement('div');
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
    
    // Add click handlers to all images
    function addImageHandlers() {
      const images = document.querySelectorAll('img');
      
      images.forEach(img => {
        if (!img.hasAttribute('data-imageviewer')) {
          img.setAttribute('data-imageviewer', 'true');
          img.style.cursor = 'pointer';
          img.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const modalImg = document.querySelector('#image-modal img');
            const modal = document.querySelector('#image-modal');
            
            modalImg.src = this.src;
            modal.style.display = 'flex';
          });
        }
      });
    }
    
    // Close modal
    modal.addEventListener('click', function(e) {
      if (e.target === modal || e.target === close) {
        modal.style.display = 'none';
      }
    });
    
    // Initial setup
    addImageHandlers();
    
    // Watch for new images (CMS content loads dynamically)
    const observer = new MutationObserver(function(mutations) {
      let shouldCheck = false;
      mutations.forEach(function(mutation) {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          shouldCheck = true;
        }
      });
      
      if (shouldCheck) {
        setTimeout(addImageHandlers, 100); // Small delay to let DOM settle
      }
    });
    
    observer.observe(document.body, { childList: true, subtree: true });
    
    // Also check periodically for the first few seconds
    let checkCount = 0;
    const interval = setInterval(function() {
      addImageHandlers();
      checkCount++;
      if (checkCount >= 10) { // Check for 5 seconds (10 * 500ms)
        clearInterval(interval);
      }
    }, 500);
  }
  
  // Multiple initialization attempts
  function tryInit() {
    if (document.body) {
      initImageViewer();
    } else {
      setTimeout(tryInit, 100);
    }
  }
  
  // Try to initialize immediately
  tryInit();
  
  // Also try on various events
  document.addEventListener('DOMContentLoaded', initImageViewer);
  window.addEventListener('load', initImageViewer);
  
  // Framer-specific: try after a delay
  setTimeout(initImageViewer, 1000);
  setTimeout(initImageViewer, 2000);
  setTimeout(initImageViewer, 3000);
})(); 