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

  /* Contact form — front-end only handling (safe selectors) */
  var form = document.querySelector('#contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // Funcao auxiliar para capturar o valor sem quebrar se o elemento nao existir
      var getVal = function(selector) {
        var el = form.querySelector(selector);
        return el ? el.value : '';
      };

      var name = getVal('#f-name').trim();
      if (!name) { return; }

      var phone = getVal('#f-phone');
      var email = getVal('#f-email');
      var service = getVal('#f-service');
      var datetime = getVal('#f-datetime');
      var message = getVal('#f-message');

      var status = document.querySelector('#form-status');
      var subject = encodeURIComponent('Booking enquiry — Brazilian Wax Studio London');
      var body = encodeURIComponent(
        'Name: ' + name + '\n' +
        'Phone: ' + phone + '\n' +
        'Email: ' + email + '\n' +
        'Service requested: ' + service + '\n' +
        'Preferred date/time: ' + datetime + '\n\n' +
        'Message:\n' + message
      );

      window.location.href = 'mailto:info@brazilianwaxstudiolondon.co.uk?subject=' + subject + '&body=' + body;
      
      if (status) {
        status.textContent = 'Opening your email app to send this enquiry to Marcia…';
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
      var booking = {
        service: document.querySelector('#booking-service').value,
        date: document.querySelector('#booking-date').value,
        time: document.querySelector('#booking-time').value,
        name: document.querySelector('#booking-name').value,
        email: document.querySelector('#booking-email').value
      };
      sessionStorage.setItem('waxBooking', JSON.stringify(booking));
      window.location.href = 'payment.html';
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
});