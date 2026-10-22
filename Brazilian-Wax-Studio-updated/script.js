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
      var subject = encodeURIComponent('Consulta — Brazilian Wax Studio London');
      var body = encodeURIComponent(
        'Nome: ' + name + '\n' +
        'Telefone: ' + phone + '\n\n' +
        'Mensagem:\n' + message
      );

      window.location.href = 'mailto:marciareginacc@yahoo.co.uk?subject=' + subject + '&body=' + body;

      if (status) {
        status.textContent = 'Abrindo seu e-mail para enviar a solicitação de consulta…';
        status.classList.add('show', 'ok');
      }
      form.reset();
    });
  }

  /* Accessible, rotating client review carousels */
  document.querySelectorAll('[data-review-carousel]').forEach(function (carousel) {
    var slides = Array.from(carousel.querySelectorAll('[data-review-slide]'));
    var status = carousel.querySelector('.review-carousel-status');
    if (!slides.length) return;
    var current = 0;
    var show = function (index) {
      current = (index + slides.length) % slides.length;
      slides.forEach(function (slide, i) {
        var active = i === current;
        slide.classList.toggle('is-active', active);
        slide.setAttribute('aria-hidden', active ? 'false' : 'true');
      });
      if (status) status.textContent = (current + 1) + ' / ' + slides.length;
    };
    var next = carousel.querySelector('[data-review-next]');
    var prev = carousel.querySelector('[data-review-prev]');
    if (next) next.addEventListener('click', function () { show(current + 1); });
    if (prev) prev.addEventListener('click', function () { show(current - 1); });
    var timer = window.setInterval(function () { show(current + 1); }, 6000);
    carousel.addEventListener('mouseenter', function () { window.clearInterval(timer); });
    carousel.addEventListener('mouseleave', function () { timer = window.setInterval(function () { show(current + 1); }, 6000); });
    carousel.addEventListener('focusin', function () { window.clearInterval(timer); });
    carousel.addEventListener('focusout', function () { timer = window.setInterval(function () { show(current + 1); }, 6000); });
  });

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
