document.addEventListener('DOMContentLoaded', function() {
  // Prevent body scroll when touching the menu container
  const mobileMenuContainer = document.querySelector('.mobile-menu-container');
  
  if (mobileMenuContainer) {
    mobileMenuContainer.addEventListener('touchstart', function(e) {
      // This prevents the touch event from propagating to the body
      e.stopPropagation();
    }, { passive: true });
    
    mobileMenuContainer.addEventListener('touchmove', function(e) {
      // This prevents the touch event from propagating to the body
      e.stopPropagation();
    }, { passive: true });
  }
  
  // Handle menu scrolling issue for iOS
  const hamburgerBtn = document.querySelector('.hamburger-menu');
  const mobileMenu = document.querySelector('.mobile-menu');
  const closeBtn = document.querySelector('.mobile-close');
  const body = document.body;
  
  // Store scroll position to restore it after menu closes
  let scrollPosition = 0;
  
  // Toggle menu when hamburger is clicked
  if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', function() {
      hamburgerBtn.classList.toggle('active');
      mobileMenu.classList.toggle('active');
      
      if (mobileMenu.classList.contains('active')) {
        // Save current scroll position
        scrollPosition = window.pageYOffset;
        body.classList.add('menu-open');
        body.style.top = `-${scrollPosition}px`;
      } else {
        // Restore scroll position
        body.classList.remove('menu-open');
        body.style.top = '';
        window.scrollTo(0, scrollPosition);
      }
    });
  }
  
  // Close menu when close button is clicked
  if (closeBtn) {
    closeBtn.addEventListener('click', function() {
      hamburgerBtn.classList.remove('active');
      mobileMenu.classList.remove('active');
      body.classList.remove('menu-open');
      body.style.top = '';
      window.scrollTo(0, scrollPosition);
    });
  }
  
  // Close menu when clicking a menu item
  document.querySelectorAll('.mobile-nav a').forEach(function(link) {
    link.addEventListener('click', function() {
      hamburgerBtn.classList.remove('active');
      mobileMenu.classList.remove('active');
      body.classList.remove('menu-open');
      body.style.top = '';
      window.scrollTo(0, scrollPosition);
    });
  });
});
