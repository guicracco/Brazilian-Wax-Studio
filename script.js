// Brazilian Wax Studio London — shared behaviours
document.addEventListener('DOMContentLoaded', function () {

  /* Mobile nav toggle */
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var isOpen = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { links.classList.remove('open'); });
    });
  }

  /* Price list tab switching (male / female waxing pages) */
  var tabButtons = document.querySelectorAll('.price-tab');
  if (tabButtons.length) {
    tabButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var target = btn.getAttribute('data-target');
        document.querySelectorAll('.price-tab').forEach(function (b) { b.classList.remove('is-active'); });
        btn.classList.add('is-active');
        document.querySelectorAll('.price-panel').forEach(function (panel) {
          panel.style.display = (panel.getAttribute('data-panel') === target) ? '' : 'none';
        });
      });
    });
  }

  /* Contact form — consultation request (front-end only handling) */
  var form = document.querySelector('#contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var getVal = function(selector) {
        var el = form.querySelector(selector);
        return el ? el.value : '';
      };

      var name = getVal('#f-name').trim();
      if (!name) { return; }

      var phone = getVal('#f-phone');
      var message = getVal('#f-message');

      var status = document.querySelector('#form-status');
      var subject = encodeURIComponent('Consultation — Brazilian Wax Studio London');
      var body = encodeURIComponent(
        'Name: ' + name + '\n' +
        'Phone: ' + phone + '\n\n' +
        'Message:\n' + message
      );

      window.location.href = 'mailto:marciareginacc@yahoo.co.uk?subject=' + subject + '&body=' + body;

      if (status) {
        status.textContent = 'Opening your email to send your consultation request…';
        status.classList.add('show', 'ok');
      }
      form.reset();
    });
  }

  /* Appointment request and payment notice */
  var bookingForm = document.querySelector('#booking-form');
  var bookingDate = document.querySelector('#booking-date');
  if (bookingDate) {
    bookingDate.min = new Date().toISOString().split('T')[0];
  }
  if (bookingForm) {
    bookingForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var getBookingValue = function (selector) {
        var el = document.querySelector(selector);
        return el ? el.value.trim() : '';
      };

      var service = getBookingValue('#booking-service');
      var date = getBookingValue('#booking-date');
      var time = getBookingValue('#booking-time');
      var name = getBookingValue('#booking-name');
      var email = getBookingValue('#booking-email');

      // Save booking details to sessionStorage for payment page
      var bookingData = {
        service: service,
        date: date,
        time: time,
        name: name,
        email: email
      };
      sessionStorage.setItem('waxBooking', JSON.stringify(bookingData));

      var bookingStatus = document.querySelector('#booking-status');
      if (bookingStatus) {
        bookingStatus.textContent = 'Processing your booking...';
        bookingStatus.classList.add('show');
      }

      bookingForm.reset();

      // Redirect to payment page
      setTimeout(function() {
        window.location.href = 'payment.html';
      }, 1000);
    });
  }

  /* Payment step for the appointment deposit */
  var savedBooking = sessionStorage.getItem('waxBooking');
  var payButton = document.querySelector('#pay-deposit');
  if (savedBooking) {
    var paymentBooking = JSON.parse(savedBooking);
    var paymentValues = {
      '#payment-service': paymentBooking.service,
      '#payment-date': paymentBooking.date,
      '#payment-time': paymentBooking.time,
      '#payment-name': paymentBooking.name
    };
    Object.keys(paymentValues).forEach(function (selector) {
      var paymentValue = document.querySelector(selector);
      if (paymentValue) { paymentValue.textContent = paymentValues[selector]; }
    });
  }
  if (payButton) {
    payButton.addEventListener('click', function () {
      var paymentStatus = document.querySelector('#payment-status');
      if (paymentStatus) {
        paymentStatus.textContent = 'Payment gateway setup is required to process the £10 deposit. Please call or WhatsApp the studio to pay and confirm this appointment.';
        paymentStatus.classList.add('show');
      }
    });
  }

  /* Footer year */
  var yearEl = document.querySelector('#year');
  if (yearEl) { yearEl.textContent = new Date().getFullYear(); }

  /* Scroll-reveal: fade + rise elements marked .reveal-target as they enter view */
  var revealEls = document.querySelectorAll('.reveal-target');
  if (revealEls.length && 'IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* Testimonials carousel */
  var testiTrack = document.querySelector('.testi-track');
  if (testiTrack) {
    var fullReviewsCarousel = document.querySelector('.testi-carousel--full');
    if (fullReviewsCarousel) {
      var testiCards = Array.prototype.slice.call(document.querySelectorAll('.testi-card'));
      if (testiCards.length) {
        testiCards.forEach(function (card) {
          var slide = document.createElement('div');
          slide.className = 'testi-slide';
          slide.innerHTML = card.innerHTML;
          testiTrack.appendChild(slide);
        });
      }
      var testiGrid = document.querySelector('.testi-grid');
      if (testiGrid) testiGrid.style.display = 'none';
    }

    var slides = Array.prototype.slice.call(testiTrack.querySelectorAll('.testi-slide'));
    var current = 0;
    var timer;
    var prevBtn = document.querySelector('.testi-arrow--prev');
    var nextBtn = document.querySelector('.testi-arrow--next');

    function goTo(i) {
      if (!slides.length) return;
      slides[current] && slides[current].classList.remove('is-active');
      current = (i + slides.length) % slides.length;
      slides[current].classList.add('is-active');
    }
    function next() { goTo(current + 1); }
    function prev() { goTo(current - 1); }
    function resetTimer() {
      clearInterval(timer);
      timer = setInterval(next, 5500);
    }

    if (prevBtn) prevBtn.addEventListener('click', function () { prev(); resetTimer(); });
    if (nextBtn) nextBtn.addEventListener('click', function () { next(); resetTimer(); });

    if (slides.length) {
      slides[0].classList.add('is-active');
      resetTimer();
    }
  }

  /* Testimonials search filter (comments page) */
  var testiSearch = document.querySelector('#testi-search');
  if (testiSearch) {
    var testiSlides = Array.prototype.slice.call(document.querySelectorAll('.testi-slide'));
    var testiEmpty = document.querySelector('.testi-empty');
    testiSearch.addEventListener('input', function () {
      var q = testiSearch.value.trim().toLowerCase();
      var visibleCount = 0;
      testiSlides.forEach(function (slide) {
        var match = slide.textContent.toLowerCase().indexOf(q) !== -1;
        slide.classList.toggle('is-hidden', !match);
        if (match) visibleCount++;
      });
      if (visibleCount) {
        var firstVisible = testiSlides.find(function (slide) { return !slide.classList.contains('is-hidden'); });
        testiSlides.forEach(function (slide) { slide.classList.remove('is-active'); });
        if (firstVisible) firstVisible.classList.add('is-active');
      }
      if (testiEmpty) testiEmpty.classList.toggle('show', visibleCount === 0);
    });
  }

  /* Hide header when scrolling down, show when scrolling up */
  var header = document.querySelector('.site-header');
  if (header) {
    var lastScrollY = window.scrollY;
    var ticking = false;
    window.addEventListener('scroll', function () {
      if (!ticking) {
        window.requestAnimationFrame(function () {
          var currentScrollY = window.scrollY;
          if (currentScrollY > lastScrollY && currentScrollY > 120) {
            header.classList.add('header--hidden');
          } else {
            header.classList.remove('header--hidden');
          }
          lastScrollY = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    });
  }
});