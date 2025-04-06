$(document).ready(function() {
  // Add active class to current page nav item
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  $('.header--nav a[href="' + currentPage + '"]').addClass('active');

  // Handle dropdown hover
  $('.dropdown').hover(
    function() {
      const $dropdown = $(this);
      $dropdown.data('hoverTimeout', setTimeout(() => {
        $dropdown.addClass('open');
      }, 800));
    },
    function() {
      const $dropdown = $(this);
      clearTimeout($dropdown.data('hoverTimeout'));
      $dropdown.removeClass('open');
    }
  );

  // Handle dropdown interaction
  $('.dropdown > a').click(function(e) {
    const $dropdown = $(this).parent('.dropdown');
    const isArrowClick = $(e.target).hasClass('dropdown-arrow');
    
    if (isArrowClick) {
      e.preventDefault();
      $dropdown.toggleClass('open');
      // No need for setTimeout here since we're using CSS transitions
    } else {
      // Allow direct navigation to projects.html
      window.location.href = $(this).attr('href');
    }
  });

  // Close dropdown and rotate arrow back when clicking outside
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

function initializeCarousel() {
  const carousel = document.querySelector('.carousel-track');
  if (!carousel) return;

  // Clear existing indicators first
  const indicatorsContainer = document.querySelector('.carousel-indicators');
  indicatorsContainer.innerHTML = '';  // Add this line to clear existing indicators

  const slides = carousel.querySelectorAll('img');
  let currentSlide = 0;

  // Create indicators based on actual number of slides
  slides.forEach((_, index) => {
    const indicator = document.createElement('div');
    indicator.classList.add('indicator');
    if (index === 0) indicator.classList.add('active');
    indicator.addEventListener('click', () => goToSlide(index));
    indicatorsContainer.appendChild(indicator);
  });

  const indicators = indicatorsContainer.querySelectorAll('.indicator');

  function updateSlides() {
    // Hide all slides
    slides.forEach(slide => {
      slide.style.display = 'none';
      slide.classList.remove('active');
    });
    indicators.forEach(ind => ind.classList.remove('active'));

    // Show current slide
    slides[currentSlide].style.display = 'block';
    slides[currentSlide].classList.add('active');
    indicators[currentSlide].classList.add('active');
  }

  function goToSlide(index) {
    currentSlide = index;
    updateSlides();
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlides();
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateSlides();
  }

  document.querySelector('.next').addEventListener('click', nextSlide);
  document.querySelector('.prev').addEventListener('click', prevSlide);
}

window.onload = function() {
    initializeCarousel();
  };

// Utility function to debounce resize events
function debounce(func, wait) {
  let timeout;
  return function() {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, arguments), wait);
  };
}