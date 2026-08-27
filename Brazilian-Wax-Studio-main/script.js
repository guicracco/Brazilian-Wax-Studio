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

  /* Footer year */
  var yearEl = document.querySelector('#year');
  if (yearEl) { yearEl.textContent = new Date().getFullYear(); }
});