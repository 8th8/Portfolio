/* =========================================================
   Portfolio — Nguyen Anh Tuan  (script.js)
   Reveal on scroll · intro · menu · active nav · carousel · form
   ========================================================= */
(function () {
  'use strict';

  var body = document.body;

  /* ---------- Năm ở footer ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Intro: bấm để bỏ qua ---------- */
  var intro = document.getElementById('intro');
  if (intro) {
    intro.addEventListener('click', function () {
      intro.classList.add('hide');
    });
  }

  /* ---------- Hiện nội dung khi cuộn tới (.reveal -> .visible) ---------- */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    reveals.forEach(function (el) { revealObserver.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('visible'); });
  }

  /* ---------- Menu burger (mobile) ---------- */
  var burger = document.querySelector('.burger');
  var navLinks = document.querySelectorAll('.nav-links a');

  function setMenu(open) {
    body.classList.toggle('menu-open', open);
    if (burger) burger.setAttribute('aria-expanded', String(open));
  }

  if (burger) {
    burger.addEventListener('click', function () {
      setMenu(!body.classList.contains('menu-open'));
    });
  }
  navLinks.forEach(function (a) {
    a.addEventListener('click', function () { setMenu(false); });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') setMenu(false);
  });

  /* ---------- Đánh dấu mục menu đang xem ---------- */
  var sections = ['home', 'about', 'projects', 'experience', 'contact']
    .map(function (id) { return document.getElementById(id); })
    .filter(Boolean);

  function setActive(id) {
    navLinks.forEach(function (a) {
      a.classList.toggle('active', a.getAttribute('href') === '#' + id);
    });
  }

  function onScrollSpy() {
    var y = window.scrollY + 140;
    var current = sections[0] ? sections[0].id : 'home';
    sections.forEach(function (s) {
      if (s.offsetTop <= y) current = s.id;
    });
    // cuối trang -> mục cuối
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4 && sections.length) {
      current = sections[sections.length - 1].id;
    }
    setActive(current);
  }
  window.addEventListener('scroll', onScrollSpy, { passive: true });
  onScrollSpy();

  /* ---------- Carousel dự án ---------- */
  var track = document.getElementById('projectsTrack');
  var prev = document.querySelector('.scroll-btn.prev');
  var next = document.querySelector('.scroll-btn.next');

  function updateArrows() {
    if (!track || !prev || !next) return;
    prev.disabled = track.scrollLeft <= 4;
    next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
  }

  function scrollTrack(dir) {
    if (!track) return;
    track.scrollBy({ left: dir * Math.max(track.clientWidth * 0.8, 280), behavior: 'smooth' });
  }

  if (track && prev && next) {
    prev.addEventListener('click', function () { scrollTrack(-1); });
    next.addEventListener('click', function () { scrollTrack(1); });
    track.addEventListener('scroll', updateArrows, { passive: true });
    window.addEventListener('resize', updateArrows);
    updateArrows();
  }

  /* ---------- Form liên hệ ---------- */
  var form = document.getElementById('contactForm');
  var status = document.getElementById('formStatus');

  function setStatus(msg, type) {
    if (!status) return;
    status.textContent = msg;
    status.className = 'form-status' + (type ? ' ' + type : '');
  }

  if (form) {
    var fName = form.elements['name'];
    var fEmail = form.elements['email'];
    var fMsg = form.elements['message'];

    [fName, fEmail, fMsg].forEach(function (f) {
      f.addEventListener('input', function () { f.classList.remove('invalid'); });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var name = fName.value.trim();
      var email = fEmail.value.trim();
      var msg = fMsg.value.trim();
      var emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

      fName.classList.toggle('invalid', !name);
      fEmail.classList.toggle('invalid', !emailOk);
      fMsg.classList.toggle('invalid', !msg);

      if (!name || !emailOk || !msg) {
        setStatus('Please fill in all fields with a valid email.', 'error');
        return;
      }

      // Chưa có backend: mở ứng dụng email với nội dung đã điền
      var to = 'z2242505@std.kiis.ac.jp';
      var subject = 'Portfolio contact from ' + name;
      var text = msg + '\n\n— ' + name + ' (' + email + ')';
      window.location.href = 'mailto:' + to +
        '?subject=' + encodeURIComponent(subject) +
        '&body=' + encodeURIComponent(text);

      setStatus('Thanks! Opening your email app…', 'ok');
      form.reset();
    });
  }
})();