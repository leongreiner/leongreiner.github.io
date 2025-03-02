$(document).ready(function() {
  // Add active class to current page nav item
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  $('.header--nav a[href="' + currentPage + '"]').addClass('active');

  // Handle dropdown interaction
  $('.dropdown > a').click(function(e) {
    // If clicking the arrow or any part of dropdown except main link
    if ($(e.target).hasClass('dropdown-arrow') || !$(e.target).hasClass('projects-link')) {
      e.preventDefault();
      const $dropdown = $(this).parent('.dropdown');
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

function initializeCarousel() {
  const carousel = document.querySelector('.carousel-track');
  if (!carousel) return;

  const slides = carousel.querySelectorAll('img');
  const indicatorsContainer = document.querySelector('.carousel-indicators');
  let currentSlide = 0;

  // Create indicators
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

document.addEventListener('DOMContentLoaded', initializeCarousel);