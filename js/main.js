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

  /* ---------- Countdown to the wedding day ---------- */
  var countdownEl = document.getElementById('countdown-days');
  if (countdownEl) {
    var weddingDate = new Date('2027-05-13T00:00:00');
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    var diff = Math.ceil((weddingDate - today) / (1000 * 60 * 60 * 24));
    countdownEl.textContent = diff > 0 ? diff + ' day' + (diff === 1 ? '' : 's') + ' to go' : 'It’s the big day!';
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

  /* ---------- RSVP form logic ---------- */
  var rsvpForm = document.getElementById('rsvp-form');
  if (rsvpForm) {
    var guestRadios = rsvpForm.querySelectorAll('input[name="rsvp_for"]');
    var guestField = document.getElementById('guest-name-field');
    var guestInput = document.getElementById('guest_name');

    function updateGuestField() {
      var selected = rsvpForm.querySelector('input[name="rsvp_for"]:checked');
      if (selected && selected.value === 'Myself & Partner / Guest') {
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
          submitBtn.textContent = 'Submit';
        });
    });
  }

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) { yearEl.textContent = new Date().getFullYear(); }
});
