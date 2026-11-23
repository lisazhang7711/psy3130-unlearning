/* PSY3130 渲染与交互 */
(function () {
  'use strict';

  var D = window.PSY;
  if (!D) { return; }

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function $(sel) { return document.querySelector(sel); }
  function el(id) { return document.getElementById(id); }

  /* 语境筛选组：覆盖大纲里被写进来的具体场域，以及没有指定文献的场次 */
  var PLACE_FILTERS = [
    { label: '印度｜性工作者组织', keys: ['印度', '性工作者组织'] },
    { label: '黎巴嫩｜监狱', keys: ['黎巴嫩监狱'] },
    { label: '越南｜全球南方', keys: ['越南', '全球南方'] },
    { label: '中国｜平台与青年', keys: ['中国', '中国外卖平台', '网约车平台', '青年网络参与', '线上社群', '平台劳动'] },
    { label: '美国｜Enron 与 Jonestown', keys: ['美国 Enron', '美国 Jonestown'] },
    { label: '英国｜呼叫中心', keys: ['英国呼叫中心'] },
    { label: '高权力距离组织', keys: ['高权力距离组织', '企业文化建设', '等级型组织'] },
    { label: '危机与照护', keys: ['公共卫生危机', '危机中的组织', '合规与审计场景', '金融合规一线'] },
    { label: '无指定文献的场次', keys: ['停课周', '课堂讨论', '课堂练习', '小组现场', '期末展品', '画廊漫步现场', '课程评估', '个人反思作业', '概念史'] }
  ];

  /* ---------- hero ---------- */
  el('lede').textContent = D.meta.stance;
  el('meta').innerHTML =
    '<span><b>课程</b> ' + esc(D.meta.course) + '</span>' +
    '<span><b>教师</b> ' + esc(D.meta.instructor) + '</span>' +
    '<span><b>学期</b> ' + esc(D.meta.term) + '</span>' +
    '<span><b>依据</b> ' + esc(D.meta.source) + '</span>';
  var s = D.meta.stats;
  el('stats').innerHTML =
    [['周次块', s.weeks], ['周二 / 周四场次', s.sessions], ['关键词', s.keywords], ['主题模块', s.modules]]
      .map(function (x) { return '<div class="stat"><div class="n">' + x[1] + '</div><div class="l">' + x[0] + '</div></div>'; }).join('');

  /* ---------- 认识变化对照表 ---------- */
  el('shiftTable').innerHTML = D.shiftRows.map(function (r) {
    return '<div class="shift-row">' +
      '<div class="n">' + esc(r.n) + '</div>' +
      '<div class="before-cell"><span class="cell-label">学期开始时</span><div class="txt">' + esc(r.before) + '</div></div>' +
      '<div class="ar" aria-hidden="true">→</div>' +
      '<div class="after-cell"><span class="cell-label">课程之后</span><div class="txt">' + esc(r.after) + '</div></div>' +
      '<div class="where">' + esc(r.where) + '</div>' +
      '</div>';
  }).join('');

  el('shiftTabs').innerHTML = [
    { k: 'both', t: '并排对照' }, { k: 'before', t: '只看传统说法' }, { k: 'after', t: '只看之后' }
  ].map(function (b, i) {
    return '<button role="tab" data-shift="' + b.k + '" aria-selected="' + (i === 0) + '">' + b.t + '</button>';
  }).join('');

  el('shiftTabs').addEventListener('click', function (e) {
    var b = e.target.closest('button[data-shift]');
    if (!b) { return; }
    var k = b.dataset.shift;
    document.body.classList.remove('shift-before', 'shift-after');
    if (k === 'before') { document.body.classList.add('shift-before'); }
    if (k === 'after') { document.body.classList.add('shift-after'); }
    this.querySelectorAll('button').forEach(function (x) { x.setAttribute('aria-selected', String(x === b)); });
  });

  /* ---------- 学期弧线导航 ---------- */
  el('arc').innerHTML = D.modules.map(function (m) {
    return '<button data-goto="' + m.id + '" aria-label="跳到模块 ' + esc(m.num) + ' ' + esc(m.title) + '">' +
      '<div class="a-n">' + esc(m.num) + ' / ' + esc(m.span) + '</div>' +
      '<div class="a-t">' + esc(m.title) + '</div>' +
      '<div class="a-s">' + esc(m.weeks[0].from) + ' → ' + esc(m.weeks[m.weeks.length - 1].to) + '</div>' +
      '</button>';
  }).join('');

  /* ---------- 模块与周卡片 ---------- */
  function kwHTML(kw, side, wid, si) {
    var did = wid + '-' + si + '-' + side;
    return '<div class="kw kw--' + side + '">' +
      '<div class="kw-top"><span class="pill">' + (side === 'contra' ? '反｜挑战传统智慧' : '正｜包容与重建') + '</span>' +
      '<span class="kw-term">' + esc(kw.term) + '</span></div>' +
      '<p class="kw-line">' + esc(kw.line) + '</p>' +
      '<div class="kw-places">' + (kw.places || []).map(function (p) { return '<span class="place-tag">' + esc(p) + '</span>'; }).join('') + '</div>' +
      '<button class="kw-toggle" aria-expanded="false" aria-controls="' + did + '">展开对理论与实践的意义</button>' +
      '<div class="kw-detail" id="' + did + '" hidden>' +
      '<dl><div><dt>对理论</dt><dd>' + esc(kw.theory) + '</dd></div>' +
      '<div><dt>对实践</dt><dd>' + esc(kw.practice) + '</dd></div></dl></div>' +
      '</div>';
  }

  function sessionHTML(sess, wid, si) {
    var badge = sess.source === 'required'
      ? '<span class="place-tag">必读</span>'
      : '<span class="place-tag">主题推导｜无指定文献</span>';
    var places = (sess.places || []).slice();
    ['contra', 'pro'].forEach(function (side) {
      (sess[side].places || []).forEach(function (p) { if (places.indexOf(p) < 0) { places.push(p); } });
    });
    return '<div class="session" data-places="' + esc(places.join('|')) + '">' +
      '<div class="session-day">' + esc(sess.day) + ' &nbsp; ' + badge + '</div>' +
      '<div class="session-reading">' + esc(sess.reading) + '</div>' +
      (sess.extension ? '<div class="session-ext">句中佐证（选读）：' + esc(sess.extension) + '</div>' : '') +
      kwHTML(Object.assign({ places: sess.places }, sess.contra), 'contra', wid, si) +
      kwHTML(Object.assign({ places: sess.places }, sess.pro), 'pro', wid, si) +
      '</div>';
  }

  function weekHTML(w) {
    return '<article class="week-card" id="' + w.id + '" data-places="' +
      esc(w.sessions.map(function (s) {
        var p = (s.places || []).slice();
        (s.contra.places || []).forEach(function (x) { if (p.indexOf(x) < 0) { p.push(x); } });
        (s.pro.places || []).forEach(function (x) { if (p.indexOf(x) < 0) { p.push(x); } });
        return p.join('|');
      }).join('|')) + '">' +
      '<div class="week-head">' +
      '<div class="week-top"><span class="week-label">' + esc(w.label) + '</span>' +
      '<span class="week-topic">' + esc(w.topic) + '</span></div>' +
      '<div class="week-shift"><span class="from">' + esc(w.from) + '</span>' +
      '<span class="arrow" aria-hidden="true">→</span>' +
      '<span class="to">' + esc(w.to) + '</span>' +
      '<span class="tag">认识变化</span></div>' +
      '</div>' +
      '<div class="sessions">' + w.sessions.map(function (s, i) { return sessionHTML(s, w.id, i); }).join('') + '</div>' +
      '</article>';
  }

  el('modules').innerHTML = D.modules.map(function (m) {
    return '<section class="module" id="' + m.id + '">' +
      '<div class="module-head">' +
      '<div class="m-id">模块 ' + esc(m.num) + ' <span class="m-span">' + esc(m.span) + '</span></div>' +
      '<h3>' + esc(m.title) + '</h3>' +
      '<div class="m-en">' + esc(m.en) + '</div>' +
      '<p class="module-thesis">' + esc(m.thesis) + '</p>' +
      '</div>' +
      '<div class="week-grid">' + m.weeks.map(weekHTML).join('') + '</div>' +
      '</section>';
  }).join('');

  /* ---------- 工具栏 ---------- */
  el('moduleChips').insertAdjacentHTML('beforeend', D.modules.map(function (m, i) {
    return '<button class="chip" data-goto="' + m.id + '" aria-pressed="' + (i === 0) + '">' + esc(m.num) + ' ' + esc(m.title) + '</button>';
  }).join(''));

  el('viewChips').insertAdjacentHTML('beforeend',
    '<button class="chip" data-view="all" aria-pressed="true">一反一正</button>' +
    '<button class="chip chip--contra" data-view="contra" aria-pressed="false">只看「反」</button>' +
    '<button class="chip chip--pro" data-view="pro" aria-pressed="false">只看「正」</button>');

  el('placeChips').innerHTML = '<span class="tool-label">场域</span>' + PLACE_FILTERS.map(function (f) {
    return '<button class="chip chip--place" data-place="' + esc(f.label) + '" aria-pressed="false">' + esc(f.label) + '</button>';
  }).join('');

  /* ---------- 语境索引 ---------- */
  var CONTEXTS = [
    { t: '印度｜性工作者 HIV 预防项目', w: 'W6 周四', d: '劝说、抗议、换人情这些策略进不了主流领导力量表。必读把她们放进来，理论的样本边界被推开。' },
    { t: '黎巴嫩｜监狱戏剧治疗', w: 'W8 周四', d: '司法系统封闭的场域里，领导表现为争取被看见的权利，与头衔无关。' },
    { t: '越南｜全球南方女性领导', w: 'W8 周四', d: '离开欧美样本，关于包容的论述才有可核对的证据，不至于停在和谐叙事。' },
    { t: '中国｜平台劳动与青年参与', w: 'W10 / W11 / W13', d: '派单规则、司机排班群、躺平自述、外卖骑手。行动单位落在职级表之外，算法也不中立。' },
    { t: '美国｜Enron 与 Jonestown', w: 'W5 / W9', d: '魅力与共同身份推到极端，说明认同不担保向善，凝聚需要配上后果检验。' },
    { t: '英国｜呼叫中心', w: 'W11 周二', d: '工位布局比制度更早决定谁有隐私、谁能开口，空间从来不中性。' },
    { t: '高权力距离组织', w: 'W5 周四', d: '「为组织好」的语言更容易把代价藏起来，异见通道在这里要真能挡住事。' },
    { t: '危机与照护', w: 'W12', d: '维持日常的人常被剪出复盘叙事，关怀伦理把他们放回决策链。' }
  ];
  el('contextCards').innerHTML = CONTEXTS.map(function (c) {
    return '<div class="key-card"><h4>' + esc(c.t) + '</h4><p>' + esc(c.d) + '</p>' +
      '<span class="sample">' + esc(c.w) + '</span></div>';
  }).join('');

  el('keyCards').innerHTML = [
    { t: '一反一正', d: '每场两个关键词。「反」拆掉传统解释，「正」把关系、差异与被漏掉的人放回去。点开每块，可看它对理论和实践分别改了什么。', s: '共 60 个关键词，每个配一句话' },
    { t: '必读 / 延伸 / 推导', d: '标「必读」的来自大纲 §10 的 Class 1 与 Class 2 指定条目；句中引用 Additional resources 的单独列为「延伸」；停课、案例讨论、小组练习与期末布展没有指定文献，标为「主题推导」，按该周主题提炼。', s: '来源层级在每张卡片上可见' },
    { t: '认识变化', d: '周卡片顶部的 from → to 记下这门课挪走了哪个默认说法。顶部六行对照表把整个学期的移动压在一屏里，可切换只看传统或只看之后。', s: '并排时两侧保持同一视线高度' }
  ].map(function (c) {
    return '<div class="key-card"><h4>' + esc(c.t) + '</h4><p>' + esc(c.d) + '</p><span class="sample">' + esc(c.s) + '</span></div>';
  }).join('');

  el('footer').innerHTML =
    '<p>依据文件：<b>course outline PSY3130_leadership_2026.pdf</b>，§10 Indicative teaching plan（W1–W14，Class 1 / Class 2）。' +
    '课程描述与学习目标取自同一大纲 §1 与 §3。</p>' +
    '<p>标为「主题推导」的场次（停课、Case Study、Group Reflections、Group Exercise、期末 Salon）在大纲里没有指定文献，关键词按该周主题与相邻必读提炼；引用 Additional resources 的地方已单独注明，不计入必读。' +
    '本页是课程阅读的批判性梳理，不替代原文献，交作业前请回查原文。</p>' +
    '<p class="fine">PSY3130 / ' + esc(D.meta.term) + ' / ' + esc(D.meta.instructor) + '</p>';

  /* ---------- 交互：展开 / 视角 / 场域 / 重置 / 跳转 ---------- */
  document.addEventListener('click', function (e) {
    var t = e.target;

    var toggle = t.closest('.kw-toggle');
    if (toggle) {
      var d = el(toggle.getAttribute('aria-controls'));
      var open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      d.hidden = open;
      toggle.textContent = open ? '展开对理论与实践的意义' : '收起';
      return;
    }

    var view = t.closest('button[data-view]');
    if (view) {
      document.body.classList.remove('view-contra', 'view-pro');
      if (view.dataset.view !== 'all') { document.body.classList.add('view-' + view.dataset.view); }
      el('viewChips').querySelectorAll('button[data-view]').forEach(function (x) {
        x.setAttribute('aria-pressed', String(x === view));
      });
      return;
    }

    var goto = t.closest('button[data-goto]');
    if (goto) {
      var target = el(goto.dataset.goto);
      if (target) { target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
      return;
    }

    var place = t.closest('button[data-place]');
    if (place) {
      var on = place.getAttribute('aria-pressed') === 'true';
      place.setAttribute('aria-pressed', String(!on));
      applyPlaceFilter();
      return;
    }

    if (t.closest('#resetBtn')) { resetAll(); }
  });

  function activePlaceKeys() {
    var keys = [];
    el('placeChips').querySelectorAll('button[data-place][aria-pressed="true"]').forEach(function (b) {
      var f = PLACE_FILTERS.filter(function (x) { return x.label === b.dataset.place; })[0];
      if (f) { keys = keys.concat(f.keys); }
    });
    return keys;
  }

  function applyPlaceFilter() {
    var keys = activePlaceKeys();
    var cards = el('modules').querySelectorAll('.week-card');
    var shown = 0;
    cards.forEach(function (c) {
      var ps = (c.dataset.places || '').split('|');
      var hit = keys.length === 0 || keys.some(function (k) { return ps.indexOf(k) >= 0; });
      c.classList.toggle('is-hidden', !hit);
      if (hit) { shown++; }
    });
    el('noResult').classList.toggle('is-on', shown === 0);
  }

  function resetAll() {
    document.body.classList.remove('view-contra', 'view-pro', 'shift-before', 'shift-after');
    el('viewChips').querySelectorAll('button[data-view]').forEach(function (x) {
      x.setAttribute('aria-pressed', String(x.dataset.view === 'all'));
    });
    el('shiftTabs').querySelectorAll('button').forEach(function (x, i) {
      x.setAttribute('aria-selected', String(i === 0));
    });
    el('placeChips').querySelectorAll('button[data-place]').forEach(function (x) {
      x.setAttribute('aria-pressed', 'false');
    });
    document.querySelectorAll('.kw-toggle').forEach(function (x) {
      x.setAttribute('aria-expanded', 'false');
      x.textContent = '展开对理论与实践的意义';
      var d = el(x.getAttribute('aria-controls'));
      if (d) { d.hidden = true; }
    });
    applyPlaceFilter();
  }

  /* ---------- 当前模块高亮 ---------- */
  if ('IntersectionObserver' in window) {
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) { return; }
        var id = en.target.id;
        document.querySelectorAll('button[data-goto]').forEach(function (b) {
          var on = b.dataset.goto === id;
          b.classList.toggle('is-active', on);
          if (b.hasAttribute('aria-pressed')) { b.setAttribute('aria-pressed', String(on)); }
        });
      });
    }, { rootMargin: '-90px 0px -65% 0px', threshold: 0 });
    el('modules').querySelectorAll('.module').forEach(function (m) { obs.observe(m); });
  }
})();
