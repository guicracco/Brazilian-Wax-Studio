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