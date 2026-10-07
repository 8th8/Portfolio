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

  /* ===== Thỉnh thoảng quay đầu trái/phải và cười ===== */
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var lastMove = 0;
  var pending = [];
  var actionTimer = null;

  document.addEventListener('pointermove', function () { lastMove = Date.now(); });

  function later(fn, ms) { pending.push(setTimeout(fn, ms)); }

  function clearPose() {
    pending.forEach(clearTimeout);
    pending = [];
    robot.classList.remove('look-left', 'look-right', 'is-smile');
  }

  function turn(dir) { // -1 = trái, 1 = phải, 0 = chính giữa
    robot.classList.toggle('look-left', dir < 0);
    robot.classList.toggle('look-right', dir > 0);
    eyes.style.transform = 'translate(' + (dir * 6) + 'px,0px)';
  }
  function smile(on) { robot.classList.toggle('is-smile', on); }

  function lookAround(withSmile) {
    var d = Math.random() < 0.5 ? -1 : 1;
    turn(d);                                   // quay sang một bên
    later(function () {                        // rồi quay sang bên kia
      turn(-d);
      if (withSmile) smile(true);
    }, 1500);
    later(function () { turn(0); }, 3000);     // về chính giữa
    if (withSmile) later(function () { smile(false); }, 4200);
  }
  function justSmile() {
    smile(true);
    later(function () { smile(false); }, 1800);
  }

  function perform() {
    clearPose();
    var idle = Date.now() - lastMove > 2500;   // chuột đang di chuyển -> chỉ cười, không quay đầu
    var r = Math.random();
    if (!idle || r < 0.3) justSmile();
    else if (r < 0.75) lookAround(false);
    else lookAround(true);
  }
  function scheduleAction() {
    clearTimeout(actionTimer);
    actionTimer = setTimeout(function () {
      perform();
      scheduleAction();
    }, 4000 + Math.random() * 4000);           // 4–8 giây một lần
  }

  function start() {
    if (timer) return;
    speak();
    timer = setInterval(speak, INTERVAL);
    if (!reduceMotion) scheduleAction();
  }
  function stop() {
    clearInterval(timer);
    clearTimeout(hideTimer);
    clearTimeout(actionTimer);
    actionTimer = null;
    clearPose();
    timer = null;
  }

  // tạm dừng khi chuyển tab để tiết kiệm tài nguyên
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) stop(); else start();
  });

  start();
})();