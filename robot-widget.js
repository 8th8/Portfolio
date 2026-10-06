(function () {
  var robot = document.getElementById('robotMascot');
  if (!robot) return;

  var svg = robot.querySelector('.rm-svg');
  var eyes = document.getElementById('rmEyes');
  var bubble = document.getElementById('rmBubble');

  /* ===== Lời thoại: sửa danh sách này để đổi câu nói ===== */
  // Câu thoại EN / JA nằm trong i18n.js (khóa 'robot.messages'); đây chỉ là bản dự phòng
  var FALLBACK = [
    'Hello! 👋',
    "I'm Anh Tuan's robot!",
    'Welcome to my portfolio!',
    'Check out the Projects!',
    "Let's build something together!",
    'Feel free to contact me 😊'
  ];
  function getMessages() {
    var m = window.I18N && window.I18N.t('robot.messages');
    return Array.isArray(m) && m.length ? m : FALLBACK;
  }
  var INTERVAL = 2000; // 2 giây đổi một câu

  /* ===== Mắt nhìn theo con trỏ ===== */
  document.addEventListener('pointermove', function (e) {
    var r = svg.getBoundingClientRect();
    var cx = r.left + r.width / 2;
    var cy = r.top + r.height * 0.35;
    var dx = e.clientX - cx, dy = e.clientY - cy;
    var d = Math.sqrt(dx * dx + dy * dy) || 1;
    var k = Math.min(1, d / 200);
    eyes.style.transform =
      'translate(' + (dx / d * 7 * k).toFixed(2) + 'px,' + (dy / d * 5 * k).toFixed(2) + 'px)';
  });

  /* ===== Bong bóng thoại: cứ 2 giây hiện một câu mới ===== */
  var idx = 0;
  var timer = null;
  var hideTimer = null;

  function speak() {
    bubble.classList.remove('is-on');
    clearTimeout(hideTimer);
    // ẩn rất ngắn rồi hiện câu mới để có hiệu ứng "bật ra"
    hideTimer = setTimeout(function () {
      var messages = getMessages();
      idx = idx % messages.length;
      bubble.textContent = messages[idx];
      idx = (idx + 1) % messages.length;
      bubble.classList.add('is-on');
    }, 220);
  }

  // đổi ngôn ngữ -> robot nói lại từ đầu bằng ngôn ngữ mới
  document.addEventListener('languagechange', function () {
    idx = 0;
    if (timer) {
      clearInterval(timer);
      speak();
      timer = setInterval(speak, INTERVAL);
    }
  });

  function start() {
    if (timer) return;
    speak();
    timer = setInterval(speak, INTERVAL);
  }
  function stop() {
    clearInterval(timer);
    clearTimeout(hideTimer);
    timer = null;
  }

  // tạm dừng khi chuyển tab để tiết kiệm tài nguyên
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) stop(); else start();
  });

  start();
})();