
document.addEventListener('DOMContentLoaded', function() {
  // Get the current page URL to mark the active link
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  
  // Are we in a project subdirectory?
  const isSubdirectory = window.location.pathname.includes('/projects/');
  const pathPrefix = isSubdirectory ? '../' : '';
  
  // Build desktop navigation
  function buildDesktopNav() {
    const desktopNav = document.querySelector('.header--nav ul');
    if (!desktopNav) return;
    
    // Clear existing navigation
    desktopNav.innerHTML = '';
    
    // Build new navigation
    window.navData.mainNav.forEach(item => {
      const li = document.createElement('li');
      
      if (item.dropdown) {
        // Create dropdown menu
        li.classList.add('dropdown');
        
        const mainLink = document.createElement('a');
        mainLink.href = pathPrefix + item.url;
        mainLink.innerHTML = `${item.text} <span class="dropdown-arrow">▼</span>`;
        li.appendChild(mainLink);
        
        // Create dropdown content
        const dropdownContent = document.createElement('div');
        dropdownContent.classList.add('dropdown-content');
        
        // Add each child item
        item.children.forEach(child => {
          const childLink = document.createElement('a');
          childLink.href = pathPrefix + child.url;
          childLink.textContent = child.text;
          // Check if this is the current page
          if (currentPage === child.url.split('/').pop()) {
            childLink.classList.add('active');
          }
          dropdownContent.appendChild(childLink);
        });
        
        li.appendChild(dropdownContent);
      } else {
        // Create regular link
        const link = document.createElement('a');
        link.href = pathPrefix + item.url;
        link.textContent = item.text;
        
        // Check if this is the current page
        if (currentPage === item.url) {
          link.classList.add('active');
        }
        
        li.appendChild(link);
      }
      
      desktopNav.appendChild(li);
    });
  }
  
  // Build mobile navigation
  function buildMobileNav() {
    const mobileNav = document.querySelector('.mobile-nav ul');
    if (!mobileNav) return;
    
    // Clear existing navigation
    mobileNav.innerHTML = '';
    
    // Build main mobile nav links (without dropdowns)
    window.navData.mainNav.forEach(item => {
      const li = document.createElement('li');
      const link = document.createElement('a');
      
      link.href = pathPrefix + item.url;
      link.textContent = item.text;
      
      // Check if this is the current page
      if (currentPage === item.url) {
        link.classList.add('active');
      }
      
      li.appendChild(link);
      mobileNav.appendChild(li);
    });
    
    // Add project submenu if it exists
    const projectData = window.navData.mainNav.find(item => item.dropdown);
    if (projectData && projectData.children.length > 0) {
      // Create the submenu container if it doesn't exist
      let submenuContainer = document.querySelector('.mobile-submenu');
      
      if (!submenuContainer) {
        submenuContainer = document.createElement('div');
        submenuContainer.classList.add('mobile-submenu');
        
        const heading = document.createElement('h3');
        heading.textContent = 'Projects';
        submenuContainer.appendChild(heading);
        
        // Add container after the mobile nav
        document.querySelector('.mobile-nav').after(submenuContainer);
      } else {
        submenuContainer.innerHTML = '<h3>Projects</h3>';
      }
      
      // Create the project links list
      const ul = document.createElement('ul');
      
      projectData.children.forEach(project => {
        const li = document.createElement('li');
        const link = document.createElement('a');
        
        link.href = pathPrefix + project.url;
        link.textContent = project.text;
        
        // Check if this is the current page
        if (currentPage === project.url.split('/').pop()) {
          link.classList.add('active');
        }
        
        li.appendChild(link);
        ul.appendChild(li);
      });
      
      submenuContainer.appendChild(ul);
    }
  }
  
  // Initialize both navigations
  buildDesktopNav();
  buildMobileNav();
});
