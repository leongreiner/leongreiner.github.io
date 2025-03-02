$(document).ready(function() {
  // Add active class to current page nav item
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  $('.header--nav a[href="' + currentPage + '"]').addClass('active');

  // Handle dropdown interaction
  $('.dropdown > a').click(function(e) {
    e.preventDefault();
    const $dropdown = $(this).parent('.dropdown');
    
    // If it's a direct click on the Projects link, navigate to projects.html
    if ($(e.target).closest('a').attr('href') === 'projects.html') {
      window.location.href = 'projects.html';
      return;
    }
    
    $dropdown.toggleClass('open');
    if ($dropdown.hasClass('open')) {
      setTimeout(() => {
        $dropdown.find('.dropdown-content').css({
          'opacity': '1',
          'visibility': 'visible',
          'transform': 'translateY(0)'
        });
      }, 100);
    } else {
      $dropdown.find('.dropdown-content').css({
        'opacity': '0',
        'visibility': 'hidden',
        'transform': 'translateY(-10px)'
      });
    }
  });

  // Close dropdown when clicking outside
  $(document).click(function(e) {
    if (!$(e.target).closest('.dropdown').length) {
      $('.dropdown').removeClass('open');
    }
  });
});

function typeWriterEffect(element, text, speed = 100) {
  let i = 0;
  // Create placeholder with same dimensions but transparent text
  const placeholder = element.innerHTML;
  element.innerHTML = `<span class="placeholder">${placeholder}</span><span class="typed"></span>`;
  const typedElement = element.querySelector('.typed');
  element.classList.add('typing');
  
  function type() {
    if (i < text.length) {
      if (text.slice(i, i + 4) === "<br>") {
        typedElement.innerHTML += "<br>";
        i += 4;
      } else {
        typedElement.innerHTML += text.charAt(i);
        i++;
      }
      setTimeout(type, speed);
    } else {
      element.classList.remove('typing');
      element.innerHTML = text; // Clean up after animation
    }
  }
  type();
}

document.addEventListener('DOMContentLoaded', function() {
  // Check if this is a direct visit to index.html
  if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
    // Check if this is the first visit
    if (!sessionStorage.getItem('visited')) {
      const h1Element = document.querySelector('.intro--banner h1');
      // Get HTML content instead of textContent to preserve <br>
      const originalText = h1Element.innerHTML;
      typeWriterEffect(h1Element, originalText, 100);
      sessionStorage.setItem('visited', 'true');
    }
  }
  // Add any other initialization code here if needed
});