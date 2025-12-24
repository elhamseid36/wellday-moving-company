// =======================================================
// assets/scripts.js: WELLDAY Moving Co. — Cleaned & Fixed
// =======================================================

document.addEventListener('DOMContentLoaded', () => {
  // ---------------------------------------------
  // Helper: safe element getter
  // ---------------------------------------------
  const $ = (id) => document.getElementById(id);

  // ---------------------------------------------
  // 1. Mobile Menu Toggling
  // ---------------------------------------------
  const menuButton = $('menu-button');
  const mobileMenu = $('mobile-menu');

  if (menuButton && mobileMenu) {
    menuButton.addEventListener('click', () => {
      const isHidden = mobileMenu.classList.toggle('hidden');
      // Accessibility: reflect state
      menuButton.setAttribute('aria-expanded', String(!isHidden));
    });
    console.log('Mobile Menu Toggling initialized.');
  }

  // ---------------------------------------------
  // 2. Dark Mode / Theme Toggling
  // ---------------------------------------------
  const themeToggle = $('theme-toggle');
  const sunIcon = $('sun-icon');
  const moonIcon = $('moon-icon');

  function updateThemeIcons() {
    if (!sunIcon || !moonIcon) return;
    if (document.documentElement.classList.contains('dark')) {
      sunIcon.classList.add('hidden');
      moonIcon.classList.remove('hidden');
    } else {
      sunIcon.classList.remove('hidden');
      moonIcon.classList.add('hidden');
    }
  }

  function initializeTheme() {
    const stored = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (stored === 'dark' || (!stored && prefersDark)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    updateThemeIcons();
  }

  function toggleTheme() {
    if (document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
    updateThemeIcons();
  }

  if (themeToggle) {
    initializeTheme();
    themeToggle.addEventListener('click', toggleTheme);
    console.log('Theme Toggling initialized.');
  }

  // ---------------------------------------------
  // 3. Services Page Tab Logic (for services.html)
  // ---------------------------------------------
  const tabButtons = document.querySelectorAll('.service-tab-button');
  const tabContents = document.querySelectorAll('.service-tab-content');

  if (tabButtons.length > 0 && tabContents.length > 0) {
    const deactivateButton = (btn) => {
      btn.classList.remove('bg-primary-blue', 'text-white', 'dark:bg-accent-gold');
      btn.classList.add('bg-gray-100', 'text-gray-700', 'dark:bg-gray-700', 'dark:text-gray-300');
    };

    const activateButton = (btn) => {
      btn.classList.add('bg-primary-blue', 'text-white', 'dark:bg-accent-gold');
      btn.classList.remove('bg-gray-100', 'text-gray-700', 'dark:bg-gray-700', 'dark:text-gray-300');
    };

    tabButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const targetId = button.getAttribute('data-target');

        tabButtons.forEach(deactivateButton);
        tabContents.forEach((c) => c.classList.add('hidden'));

        activateButton(button);
        const targetContent = document.getElementById(targetId);
        if (targetContent) targetContent.classList.remove('hidden');
      });
    });

    // Ensure the first tab is active on load
    if (tabButtons[0]) tabButtons[0].click();
    console.log('Services Tab Logic initialized.');
  }

  // ---------------------------------------------
  // assets/scripts.js (Add this inside the document.addEventListener('DOMContentLoaded', ...) block)

    // ---------------------------------------------
// ---------------------------------------------
// ---------------------------------------------
// 4. Sliding Testimonials Logic (SAFE VERSION)
// ---------------------------------------------
const slider = document.getElementById('testimonial-slider');

if (slider) {
    const slides = Array.from(slider.children);
    const totalSlides = slides.length;
    let currentIndex = 0;
    const intervalTime = 7000; // Auto-advance every 7 seconds

    const nextButton = document.getElementById('next-testimonial');
    const prevButton = document.getElementById('prev-testimonial');
    const dotsContainer = document.getElementById('testimonial-dots');

    // Function to update the slider position
    function updateSlider() {
        const offset = -currentIndex * 100;
        slider.style.transform = `translateX(${offset}%)`;
        updateDots();
    }

    // Function to go to the next slide
    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateSlider();
    }

    // Function to go to the previous slide
    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateSlider();
    }

    // Navigation handlers
    if (nextButton) {
        nextButton.addEventListener('click', () => {
            nextSlide();
            resetInterval();
        });
    }

    if (prevButton) {
        prevButton.addEventListener('click', () => {
            prevSlide();
            resetInterval();
        });
    }

    // Create and handle navigation dots
    function createDots() {
        if (!dotsContainer) return;
        slides.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.classList.add('w-3', 'h-3', 'rounded-full', 'mx-1', 'transition-colors', 'duration-300');
            dot.dataset.index = index;
            dot.addEventListener('click', () => {
                currentIndex = index;
                updateSlider();
                resetInterval();
            });
            dotsContainer.appendChild(dot);
        });
        updateDots();
    }

    // Function to visually update the dots
    function updateDots() {
        if (!dotsContainer) return;
        Array.from(dotsContainer.children).forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.remove('bg-gray-400', 'dark:bg-gray-600');
                dot.classList.add('bg-primary-blue', 'dark:bg-accent-gold');
            } else {
                dot.classList.remove('bg-primary-blue', 'dark:bg-accent-gold');
                dot.classList.add('bg-gray-400', 'dark:bg-gray-600');
            }
        });
    }

    // Auto-advance logic
    let slideInterval = setInterval(nextSlide, intervalTime);

    // Reset the auto-advance interval on user interaction
    function resetInterval() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, intervalTime);
    }

    // Initialize the slider
    createDots();
    updateSlider();

    console.log("Testimonials slider initialized.");
}
else {
    console.log("Testimonials slider not found on this page.");
}

  // ---------------------------------------------
  // 5. Contact Form Validation Logic (contact.html)
  // ---------------------------------------------
  const quoteForm = $('quote-form');

  if (quoteForm) {
    // Helper validators
    function validateEmail(value) {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(value).toLowerCase());
    }

    const validateSelect = (v) => v !== '' && v !== null;

    function validateMoveDate(value) {
      if (!value) return false;
      const selectedDate = new Date(value);
      const today = new Date();
      selectedDate.setHours(0, 0, 0, 0);
      today.setHours(0, 0, 0, 0);
      return selectedDate >= today;
    }

    function toggleError(id, show, message) {
      const errorElement = $(id + '-error');
      const inputElement = $(id);
      if (!errorElement || !inputElement) return;

      if (show) {
        errorElement.textContent = message;
        errorElement.classList.remove('hidden');
        inputElement.classList.add('border-red-500', 'ring-red-500');
      } else {
        errorElement.classList.add('hidden');
        errorElement.textContent = '';
        inputElement.classList.remove('border-red-500', 'ring-red-500');
      }
    }

    // Ensure form-message exists and is accessible
    let formMessage = $('form-message');
    if (!formMessage) {
      formMessage = document.createElement('p');
      formMessage.id = 'form-message';
      formMessage.className = 'hidden p-3 mb-6 rounded-lg font-medium text-center transition duration-300';
      // insert at top of form
      quoteForm.parentNode.insertBefore(formMessage, quoteForm);
    }

    quoteForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      // reset message visibility while computing
      formMessage.classList.add('hidden');

      const requiredFields = [
        { id: 'full-name', message: 'Please enter your full name.' },
        { id: 'email', message: 'Please enter a valid email address.', validator: validateEmail },
        { id: 'service-type', message: 'Please select a service type.', validator: validateSelect },
        { id: 'move-date', message: 'Please select a valid future move date.', validator: validateMoveDate },
        { id: 'origin', message: 'Please enter the origin location.' },
        { id: 'destination', message: 'Please enter the destination location.' }
      ];

      requiredFields.forEach((field) => {
        const input = $(field.id);
        const value = input ? input.value.trim() : '';
        let fieldValid = true;

        if (value === '') fieldValid = false;
        else if (field.validator && !field.validator(value)) fieldValid = false;

        if (!fieldValid) {
          isValid = false;
          toggleError(field.id, true, field.message);
        } else {
          toggleError(field.id, false, '');
        }
      });

      if (isValid) {
        console.log('Form data valid. Submitting...');
        formMessage.textContent = 'Thank you! Your quote request has been sent successfully. A specialist will contact you shortly.';
        formMessage.classList.remove('hidden','text-red-600','dark:text-red-400','bg-red-200','dark:bg-red-800');
        formMessage.classList.add('text-green-800','dark:text-green-300','bg-green-100','dark:bg-green-900');
        quoteForm.reset();

        // OPTIONAL: here you can integrate fetch() to send to an API endpoint
        // fetch('/api/quote', { method: 'POST', body: new FormData(quoteForm) }) ...
      } else {
        formMessage.textContent = 'Please correct the highlighted errors above to submit your quote request.';
        formMessage.classList.remove('hidden','text-green-800','dark:text-green-300','bg-green-100','dark:bg-green-900');
        formMessage.classList.add('text-red-600','dark:text-red-400','bg-red-200','dark:bg-red-800');
      }
    });

    console.log('Contact form validation initialized.');

    // ---------------------------------------------
    // 6. Auto-Populate Service Tier from URL (if present)
    // ---------------------------------------------
    (function checkTierParam() {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const tier = urlParams.get('tier');
        if (!tier) return;
        const selectElement = $('service-type');
        if (!selectElement) return;

        let optionValue = '';
        if (tier === 'gold' || tier === 'platinum') optionValue = 'residential';
        else if (tier === 'diamond') optionValue = 'corporate';

        if (optionValue) selectElement.value = optionValue;
      } catch (err) {
        // silently fail if URL parsing not available
        console.warn('checkTierParam failed', err);
      }
    })();
  }

  // ---------------------------------------------
  // 7. Scroll Animation (Intersection Observer)
  // ---------------------------------------------
  const sections = document.querySelectorAll('.fade-in-section');
  if (sections.length > 0 && 'IntersectionObserver' in window) {
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.2 };
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, observerOptions);

    sections.forEach((s) => observer.observe(s));
    console.log('Scroll Animation initialized.');
  }

});
