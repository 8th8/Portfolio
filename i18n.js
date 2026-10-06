/* =========================================================
   Chuyển ngôn ngữ EN / 日本語  (i18n.js)
   - Nạp file này TRƯỚC script.js và robot-widget.js
   - Thêm/sửa câu chữ ở bảng DICT bên dưới
   - Trong HTML: data-i18n="khóa"            -> đổi textContent
                 data-i18n-html="khóa"       -> đổi innerHTML (có thẻ <strong>...)
                 data-i18n-attr="attr:khóa;attr2:khóa2" -> đổi thuộc tính (aria-label, alt...)
   ========================================================= */
(function () {
  'use strict';

  var STORAGE_KEY = 'portfolio-lang';
  var DEFAULT_LANG = 'en';

  var DICT = {
    en: {
      'meta.description': 'Portfolio of Nguyen Anh Tuan — Web Developer based in Fukuoka, Japan.',

      'lang.group': 'Language',
      'aria.menu': 'Toggle menu',
      'aria.nav': 'Main navigation',

      'intro.welcome': 'Welcome to my Portfolio',

      'nav.home': 'Home',
      'nav.about': 'About',
      'nav.projects': 'Projects',
      'nav.experience': 'Experience',
      'nav.contact': 'Contact',

      'hero.eyebrow': 'Web Developer · Fukuoka, Japan',
      'hero.hello': "Hello, I'm <strong>Nguyen Anh Tuan</strong>",
      'hero.sub': 'I build modern, responsive and user-friendly web applications.',
      'hero.lead': "I specialize in front-end development (HTML, CSS, JavaScript) and I'm currently advancing my skills in React and Node.js. I focus on user experience, performance, and clean, maintainable code.",
      'hero.learning': '(learning)',
      'hero.btnProjects': 'View Projects',
      'hero.btnContact': 'Hire / Contact',
      'alt.portrait': 'Portrait of Nguyen Anh Tuan',

      'about.title': 'About me',
      'about.intro': 'I am currently studying IT at Kyushu University of Information Science. I work part-time at a restaurant while developing my web development skills.',
      'bio.title': 'Short bio',
      'bio.text': 'Passionate about web development, UI/UX and performance optimization. Seeking to work in a fast-growing environment with the opportunity to learn from a mentor.',
      'tag.fukuoka': 'Fukuoka',
      'tag.studying': 'Studying',
      'skills.title': 'Skills & Tools',
      'langs.title': 'Languages',
      'langs.vi': 'Vietnamese',
      'langs.viLevel': 'Native',
      'langs.ja': 'Japanese',
      'langs.jaLevel': 'JLPT N2 (studying)',
      'langs.en': 'English',
      'langs.enLevel': 'Beginner',

      'projects.title': 'Projects',
      'projects.intro': 'Featured projects — scroll or use the arrows to browse.',
      'aria.prev': 'Previous projects',
      'aria.next': 'Next projects',
      'proj.food': 'Food Order Page',
      'proj.robot': 'Robot Page',
      'proj.dash': 'Mini Dashboard',
      'proj.p4': 'Project 04',
      'proj.p5': 'Project 05',
      'alt.dash': 'Mini Dashboard preview',
      'alt.p4': 'Project 4 preview',
      'alt.p5': 'Project 5 preview',
      'tag.ui': 'UI',
      'tag.responsive': 'Responsive',
      'tag.data': 'Data',
      'tag.charts': 'Charts',
      'link.live': 'Live',
      'link.git': 'Git',
      'aria.live': 'Live demo',
      'aria.repo': 'GitHub repository',

      'exp.title': 'Experience',
      'exp.job1': 'Part-time server',
      'exp.job1when': 'Restaurant · 2025 — present',
      'exp.job1text': 'Working evenings while studying web development.',
      'exp.job2': 'Student, Information Technology',
      'exp.job2when': 'Kyushu University of Information Science',
      'exp.job2text': 'Majoring in IT, building web projects alongside coursework.',

      'contact.title': 'Contact',
      'contact.intro': 'Want to work together? Send me an email or use the form below.',
      'contact.info': 'Contact info',
      'contact.email': 'Email:',
      'contact.location': 'Location:',
      'contact.place': 'Fukuoka, Japan',
      'form.name': 'Name',
      'form.email': 'Email',
      'form.message': 'Message',
      'form.send': 'Send message',
      'form.error': 'Please fill in all fields with a valid email.',
      'form.ok': 'Thanks! Opening your email app…',

      'footer.built': 'Built with HTML / CSS / JS',

      'robot.messages': [
        'Hello! 👋',
        "I'm Anh Tuan's robot!",
        'Welcome to my portfolio!',
        'Check out the Projects!',
        "Let's build something together!",
        'Feel free to contact me 😊'
      ]
    },

    ja: {
      'meta.description': 'Nguyen Anh Tuan のポートフォリオ — 福岡在住のWeb開発者。',

      'lang.group': '言語',
      'aria.menu': 'メニューを開閉',
      'aria.nav': 'メインナビゲーション',

      'intro.welcome': '私のポートフォリオへようこそ',

      'nav.home': 'ホーム',
      'nav.about': '自己紹介',
      'nav.projects': '作品',
      'nav.experience': '経歴',
      'nav.contact': 'お問い合わせ',

      'hero.eyebrow': 'Web開発者 · 日本・福岡',
      'hero.hello': 'こんにちは、<strong>Nguyen Anh Tuan</strong>です',
      'hero.sub': 'モダンでレスポンシブ、使いやすいWebアプリケーションを作っています。',
      'hero.lead': 'フロントエンド開発（HTML、CSS、JavaScript）を得意とし、現在はReactとNode.jsのスキルを磨いています。ユーザー体験、パフォーマンス、そして保守しやすいクリーンなコードを大切にしています。',
      'hero.learning': '（学習中）',
      'hero.btnProjects': '作品を見る',
      'hero.btnContact': '依頼・お問い合わせ',
      'alt.portrait': 'Nguyen Anh Tuan のポートレート',

      'about.title': '自己紹介',
      'about.intro': '現在、九州情報大学で情報技術を学んでいます。飲食店でアルバイトをしながら、Web開発のスキルを磨いています。',
      'bio.title': 'プロフィール',
      'bio.text': 'Web開発、UI/UX、パフォーマンス最適化に情熱を持っています。メンターから学べる、成長の早い環境で働きたいと考えています。',
      'tag.fukuoka': '福岡',
      'tag.studying': '学習中',
      'skills.title': 'スキル・ツール',
      'langs.title': '言語',
      'langs.vi': 'ベトナム語',
      'langs.viLevel': '母語',
      'langs.ja': '日本語',
      'langs.jaLevel': 'JLPT N2（学習中）',
      'langs.en': '英語',
      'langs.enLevel': '初級',

      'projects.title': '作品',
      'projects.intro': '注目のプロジェクト — スクロールまたは矢印で閲覧できます。',
      'aria.prev': '前のプロジェクト',
      'aria.next': '次のプロジェクト',
      'proj.food': '料理注文ページ',
      'proj.robot': 'ロボットページ',
      'proj.dash': 'ミニダッシュボード',
      'proj.p4': 'プロジェクト04',
      'proj.p5': 'プロジェクト05',
      'alt.dash': 'ミニダッシュボードのプレビュー',
      'alt.p4': 'プロジェクト4のプレビュー',
      'alt.p5': 'プロジェクト5のプレビュー',
      'tag.ui': 'UI',
      'tag.responsive': 'レスポンシブ',
      'tag.data': 'データ',
      'tag.charts': 'グラフ',
      'link.live': 'デモ',
      'link.git': 'Git',
      'aria.live': 'ライブデモ',
      'aria.repo': 'GitHubリポジトリ',

      'exp.title': '経歴',
      'exp.job1': 'アルバイト（ホールスタッフ）',
      'exp.job1when': '飲食店 · 2025年 — 現在',
      'exp.job1text': 'Web開発を学びながら、夜に勤務しています。',
      'exp.job2': '学生（情報技術専攻）',
      'exp.job2when': '九州情報大学',
      'exp.job2text': '情報技術を専攻し、授業と並行してWebプロジェクトを制作しています。',

      'contact.title': 'お問い合わせ',
      'contact.intro': '一緒にお仕事しませんか？メールまたは下のフォームからご連絡ください。',
      'contact.info': '連絡先',
      'contact.email': 'メール：',
      'contact.location': '所在地：',
      'contact.place': '日本・福岡',
      'form.name': 'お名前',
      'form.email': 'メールアドレス',
      'form.message': 'メッセージ',
      'form.send': '送信する',
      'form.error': 'すべての項目を入力し、正しいメールアドレスを入力してください。',
      'form.ok': 'ありがとうございます！メールアプリを開いています…',

      'footer.built': 'HTML / CSS / JS で制作',

      'robot.messages': [
        'こんにちは！👋',
        'Anh Tuan のロボットです！',
        'ポートフォリオへようこそ！',
        '作品もぜひ見てね！',
        '一緒に何か作りましょう！',
        'お気軽にご連絡ください 😊'
      ]
    }
  };

  /* ---------- lưu / đọc lựa chọn ---------- */
  function readSaved() {
    try {
      var v = localStorage.getItem(STORAGE_KEY);
      if (v && DICT[v]) return v;
    } catch (e) { /* bỏ qua */ }
    return DEFAULT_LANG;
  }
  function save(lang) {
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* bỏ qua */ }
  }

  var current = readSaved();

  function t(key) {
    var d = DICT[current] || DICT[DEFAULT_LANG];
    if (key in d) return d[key];
    return key in DICT[DEFAULT_LANG] ? DICT[DEFAULT_LANG][key] : key;
  }

  /* ---------- áp dụng bản dịch lên trang ---------- */
  function apply() {
    var root = document.documentElement;
    root.setAttribute('lang', current);

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      el.textContent = t(el.getAttribute('data-i18n'));
    });

    document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
      el.innerHTML = t(el.getAttribute('data-i18n-html')); // chỉ dùng nội dung trong DICT (đáng tin)
    });

    document.querySelectorAll('[data-i18n-attr]').forEach(function (el) {
      el.getAttribute('data-i18n-attr').split(';').forEach(function (pair) {
        var i = pair.indexOf(':');
        if (i < 1) return;
        el.setAttribute(pair.slice(0, i).trim(), t(pair.slice(i + 1).trim()));
      });
    });

    var meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', t('meta.description'));

    document.querySelectorAll('[data-lang]').forEach(function (btn) {
      btn.setAttribute('aria-pressed', String(btn.getAttribute('data-lang') === current));
    });
  }

  function setLang(lang) {
    if (!DICT[lang] || lang === current) return;
    current = lang;
    save(lang);
    apply();
    document.dispatchEvent(new CustomEvent('languagechange', { detail: { lang: lang } }));
  }

  document.querySelectorAll('[data-lang]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      setLang(btn.getAttribute('data-lang'));
    });
  });

  window.I18N = {
    t: t,
    get lang() { return current; },
    set: setLang
  };

  apply();
})();