// Jessica & Nigel — Malta Wedding site scripts

document.addEventListener('DOMContentLoaded', function () {
  /* ---------- Mobile nav toggle ---------- */
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      links.classList.toggle('is-open');
      var expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { links.classList.remove('is-open'); });
    });
  }

  /* ---------- Scroll-spy nav highlighting (one-page site) ---------- */
  var navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  var sections = Array.prototype.map.call(navLinks, function (a) {
    return document.getElementById(a.getAttribute('href').slice(1));
  }).filter(Boolean);

  if (sections.length && 'IntersectionObserver' in window) {
    var setActive = function (id) {
      navLinks.forEach(function (a) {
        a.classList.toggle('active', a.getAttribute('href') === '#' + id);
      });
    };
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { setActive(entry.target.id); }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (section) { observer.observe(section); });
  }

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll('.faq-item').forEach(function (item) {
    var question = item.querySelector('.faq-question');
    var answer = item.querySelector('.faq-answer');
    question.addEventListener('click', function () {
      var isOpen = item.classList.contains('is-open');
      document.querySelectorAll('.faq-item.is-open').forEach(function (openItem) {
        if (openItem !== item) {
          openItem.classList.remove('is-open');
          openItem.querySelector('.faq-answer').style.maxHeight = null;
        }
      });
      if (isOpen) {
        item.classList.remove('is-open');
        answer.style.maxHeight = null;
      } else {
        item.classList.add('is-open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  /* ---------- Tap-through photo galleries (mobile) ---------- */
  document.querySelectorAll('.gallery-full').forEach(function (gallery) {
    var imgs = gallery.querySelectorAll('img');
    if (imgs.length < 2) { return; }
    gallery.classList.add('is-carousel');

    var prev = document.createElement('button');
    prev.type = 'button';
    prev.className = 'gallery-nav prev';
    prev.setAttribute('aria-label', 'Previous photo');
    prev.innerHTML = '&#8249;';

    var next = document.createElement('button');
    next.type = 'button';
    next.className = 'gallery-nav next';
    next.setAttribute('aria-label', 'Next photo');
    next.innerHTML = '&#8250;';

    var dots = document.createElement('div');
    dots.className = 'gallery-dots';
    imgs.forEach(function (img, i) {
      var dot = document.createElement('span');
      dot.className = 'gallery-dot' + (i === 0 ? ' is-active' : '');
      dot.addEventListener('click', function () {
        gallery.scrollTo({ left: img.offsetLeft, behavior: 'smooth' });
      });
      dots.appendChild(dot);
    });

    gallery.appendChild(prev);
    gallery.appendChild(next);
    gallery.appendChild(dots);

    prev.addEventListener('click', function () {
      gallery.scrollBy({ left: -gallery.clientWidth, behavior: 'smooth' });
    });
    next.addEventListener('click', function () {
      gallery.scrollBy({ left: gallery.clientWidth, behavior: 'smooth' });
    });

    var dotEls = dots.querySelectorAll('.gallery-dot');
    var updateActiveDot = function () {
      var idx = Math.round(gallery.scrollLeft / gallery.clientWidth);
      dotEls.forEach(function (d, i) { d.classList.toggle('is-active', i === idx); });
    };
    gallery.addEventListener('scroll', function () {
      window.requestAnimationFrame(updateActiveDot);
    }, { passive: true });
  });

  /* ---------- Timeline info toggles ---------- */
  document.querySelectorAll('.info-toggle').forEach(function (item) {
    var button = item.querySelector('.info-toggle-btn');
    var panel = item.querySelector('.info-panel');
    button.addEventListener('click', function () {
      var isOpen = item.classList.contains('is-open');
      if (isOpen) {
        item.classList.remove('is-open');
        panel.style.maxHeight = null;
      } else {
        item.classList.add('is-open');
        panel.style.maxHeight = panel.scrollHeight + 'px';
      }
    });
  });

  /* ---------- RSVP form logic ---------- */
  var rsvpForm = document.getElementById('rsvp-form');
  if (rsvpForm) {
    var guestRadios = rsvpForm.querySelectorAll('input[name="rsvp_for"]');
    var guestField = document.getElementById('guest-name-field');
    var guestInput = document.getElementById('guest_name');

    function updateGuestField() {
      var selected = rsvpForm.querySelector('input[name="rsvp_for"]:checked');
      if (selected && selected.value === 'Myself and partner / guest') {
        guestField.classList.add('is-visible');
        guestInput.setAttribute('required', 'required');
      } else {
        guestField.classList.remove('is-visible');
        guestInput.removeAttribute('required');
        guestInput.value = '';
      }
    }
    guestRadios.forEach(function (r) { r.addEventListener('change', updateGuestField); });
    updateGuestField();

    var attendingRadios = rsvpForm.querySelectorAll('input[name="attending"]');
    var attendingExtras = document.getElementById('attending-extras');

    function updateAttendingFields() {
      var selected = rsvpForm.querySelector('input[name="attending"]:checked');
      if (selected && selected.value === 'Yes') {
        attendingExtras.classList.add('is-visible');
      } else {
        attendingExtras.classList.remove('is-visible');
      }
    }
    attendingRadios.forEach(function (r) { r.addEventListener('change', updateAttendingFields); });
    updateAttendingFields();

    /* ---------- Ajax submit to Netlify Forms ---------- */
    var successEl = document.getElementById('rsvp-success');
    var errorEl = document.getElementById('rsvp-error');

    rsvpForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var submitBtn = rsvpForm.querySelector('button[type="submit"]');
      var submitLabel = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending…';

      var formData = new FormData(rsvpForm);
      var params = new URLSearchParams();
      formData.forEach(function (value, key) { params.append(key, value); });

      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString(),
      })
        .then(function (response) {
          if (response.ok) {
            rsvpForm.style.display = 'none';
            successEl.style.display = 'block';
            errorEl.style.display = 'none';
          } else {
            throw new Error('Form submission failed');
          }
        })
        .catch(function () {
          errorEl.style.display = 'block';
          submitBtn.disabled = false;
          submitBtn.innerHTML = submitLabel;
        });
    });
  }

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) { yearEl.textContent = new Date().getFullYear(); }
});
