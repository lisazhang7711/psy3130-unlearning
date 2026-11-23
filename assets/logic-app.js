/* PSY3130 论证流版：渲染 SVG 导图、动态推演、聚焦、对比、双语 */
(function () {
  'use strict';

  var PSY = window.PSY, LOGIC = window.LOGIC;
  if (!PSY || !LOGIC) { return; }

  /* ---------- 证据索引（中文来自 data.js，英文来自 logic-data.js） ---------- */
  var ZH = {};
  PSY.modules.forEach(function (m) {
    m.weeks.forEach(function (w) {
      w.sessions.forEach(function (s, i) {
        ['contra', 'pro'].forEach(function (side) {
          ZH[w.id + '-' + i + '-' + side] = {
            term: s[side].term, line: s[side].line,
            week: w.label, day: s.day, source: s.source
          };
        });
      });
    });
  });

  var lang = /lang=en/.test(location.search) ? 'en' : 'zh';
  var openCards = {};
  var player = { timer: null, step: -1, on: false };

  var STAGE_LABEL = { myth: 'stageMyth', defense: 'stageDefense', limits: 'stageLimits', action: 'stageAction' };
  var STAGE_HINT = { myth: 'stageMythHint', defense: 'stageDefenseHint', limits: 'stageLimitsHint', action: 'stageActionHint' };
  var CMP_COLS = {
    zh: ['误解的前提', '辩白的逻辑', '本质区别'],
    en: ['Premise of the myth', 'Logic of the defence', 'The real difference']
  };
  var TITLES = { zh: '领导力的另一面｜PSY3130 论证流', en: 'The Other Side of Leadership | PSY3130 argument flow' };

  /* ---------- 工具 ---------- */
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function el(id) { return document.getElementById(id); }
  function T(k) { return LOGIC.i18n[lang][k]; }
  function EV(id) {
    var meta = ZH[id] || {}, en = LOGIC.en[id] || {};
    return {
      t: lang === 'zh' ? meta.term : (en.t || meta.term),
      l: lang === 'zh' ? meta.line : (en.l || meta.line),
      week: meta.week, day: meta.day, source: meta.source,
      side: /-contra$/.test(id) ? 'contra' : 'pro'
    };
  }

  /* ---------- SVG 布局 ---------- */
  var THREAD_Y = [110, 275, 440, 605, 770];
  var COLX = [470, 780, 1090, 1400];
  var NW = 216, NH = 60;

  function edgeHTML(tid, sk, d, color) {
    return '<path class="ledge" data-t="' + tid + '" data-s="' + sk + '" d="' + d +
      '" fill="none" stroke="' + color + '" stroke-width="1.8" marker-end="url(#ar-' + tid + ')"/>';
  }

  function mapSVG() {
    var s = '';
    LOGIC.threads.forEach(function (t) {
      s += '<marker id="ar-' + t.id + '" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">' +
        '<path d="M0,0 L10,5 L0,10 z" fill="' + t.color + '"/></marker>';
    });
    s += '<g class="cnode"><rect x="55" y="398" width="178" height="84" rx="9" fill="#26231f"/>' +
      '<text class="ct" x="144" y="433" text-anchor="middle">' + esc(lang === 'zh' ? '五个误解' : 'Five myths') + '</text>' +
      '<text class="cl" x="144" y="457" text-anchor="middle">' + esc(lang === 'zh' ? 'OF LEADERSHIP' : 'OF LEADERSHIP') + '</text></g>';

    LOGIC.threads.forEach(function (t, ti) {
      var Y = THREAD_Y[ti];
      s += edgeHTML(t.id, 'myth', 'M 233,440 C 330,440 290,' + Y + ' 358,' + Y, t.color);
      s += '<text class="tlab" data-t="' + t.id + '" x="366" y="' + (Y - 40) + '" fill="' + t.color + '">' +
        esc(t.num + ' ' + t.short[lang]) + '</text>';
      LOGIC.stageKeys.forEach(function (sk, si) {
        var X = COLX[si];
        if (si > 0) {
          var x1 = COLX[si - 1] + NW / 2, x2 = X - NW / 2, m = (x1 + x2) / 2;
          s += edgeHTML(t.id, sk, 'M ' + x1 + ',' + Y + ' C ' + m + ',' + Y + ' ' + m + ',' + Y + ' ' + x2 + ',' + Y, t.color);
        }
        var st = t.stages[sk];
        s += '<g class="lnode" data-t="' + t.id + '" data-s="' + sk + '" tabindex="0" role="button" aria-label="' +
          esc(t.title[lang] + ' / ' + T(STAGE_LABEL[sk]) + ' / ' + st.short[lang]) + '">' +
          '<rect x="' + (X - NW / 2) + '" y="' + (Y - NH / 2) + '" width="' + NW + '" height="' + NH + '" rx="8" fill="' +
          (sk === 'myth' ? t.color : '#fffdf9') + '" fill-opacity="' + (sk === 'myth' ? '0.1' : '1') +
          '" stroke="' + t.color + '" stroke-width="1.6"/>' +
          '<text class="short" x="' + X + '" y="' + (Y + 3) + '" text-anchor="middle">' + esc(st.short[lang]) + '</text>' +
          '<text class="lab" x="' + X + '" y="' + (Y + 21) + '" text-anchor="middle">' + esc(T(STAGE_LABEL[sk])) + '</text></g>';
        t.evidence[sk].forEach(function (id, i) {
          var ev = EV(id);
          s += '<g class="evdot" data-t="' + t.id + '" data-s="' + sk + '" data-ev="' + id + '" tabindex="0" role="button" aria-label="' + esc(ev.t) + '">' +
            '<circle cx="' + (X + (i - 1) * 30) + '" cy="' + (Y + NH / 2 + 18) + '" r="7" fill="' +
            (ev.side === 'contra' ? t.color : '#fffdf9') + '" stroke="' + t.color + '" stroke-width="' + (ev.side === 'contra' ? 1 : 2.2) + '"/>' +
            '<title>' + esc(ev.t + ' / ' + ev.week) + '</title></g>';
        });
      });
    });
    return s;
  }

  /* ---------- 侧栏 ---------- */
  function showStage(tid, sk) {
    var t = LOGIC.threads.filter(function (x) { return x.id === tid; })[0];
    if (!t) { return; }
    var evs = t.evidence[sk].map(function (id) {
      var ev = EV(id);
      return '<div class="d-ev d-ev--' + ev.side + '"><span class="dt">' + esc(ev.t) + '</span>' +
        '<span class="dm">' + esc(ev.side === 'contra' ? T('contra') : T('pro')) + ' / ' + esc(ev.week) +
        (ev.source === 'inferred' ? ' / ' + esc(T('inferred')) : ' / ' + esc(T('required'))) + '</span>' +
        '<p class="dl">' + esc(ev.l) + '</p></div>';
    }).join('');
    el('detail').innerHTML =
      '<div class="d-thread" style="color:' + t.color + '">' + esc(t.num + ' ' + t.title[lang]) + '</div>' +
      '<p class="d-q">' + esc(t.question[lang]) + '</p>' +
      '<span class="d-stage" style="color:' + t.color + '">' + esc(T(STAGE_LABEL[sk])) + '</span>' +
      '<p class="d-text">' + esc(t.stages[sk].text[lang]) + '</p>' +
      '<p class="d-hint">' + esc(T(STAGE_HINT[sk])) + '</p>' + evs;
  }

  function showEv(id) {
    var ev = EV(id);
    el('detail').innerHTML =
      '<div class="d-thread">' + esc(ev.t) + '</div>' +
      '<p class="d-q">' + esc(ev.week + ' / ' + ev.day) + '</p>' +
      '<span class="d-stage" style="color:' + (ev.side === 'contra' ? '#963b2c' : '#2c5c4c') + '">' +
      esc(ev.side === 'contra' ? T('contra') : T('pro')) +
      (ev.source === 'inferred' ? ' / ' + esc(T('inferred')) : ' / ' + esc(T('required'))) + '</span>' +
      '<p class="d-text">' + esc(ev.l) + '</p>';
  }

  /* ---------- 播放 ---------- */
  function seq() {
    var out = [];
    LOGIC.threads.forEach(function (t) {
      LOGIC.stageKeys.forEach(function (sk) { out.push({ t: t.id, s: sk }); });
    });
    return out;
  }
  function stopPlay() {
    if (player.timer) { clearTimeout(player.timer); }
    player.timer = null; player.on = false; updatePlayBtn();
  }
  function updatePlayBtn() {
    var b = el('playBtn');
    b.setAttribute('aria-pressed', String(player.on));
    b.textContent = player.on ? T('pause') : T('play');
  }
  function startPlay() {
    stopPlay();
    var order = seq(), svg = el('mapSvg');
    svg.classList.add('playing');
    player.on = true; player.step = -1; updatePlayBtn();
    (function step() {
      player.step++;
      if (player.step >= order.length) {
        svg.querySelectorAll('.dim').forEach(function (x) { x.classList.remove('dim'); });
        svg.classList.remove('playing');
        stopPlay();
        return;
      }
      if (player.step === 0) {
        svg.querySelectorAll('.lnode,.ledge,.evdot,.tlab').forEach(function (x) { x.classList.add('dim'); });
      }
      var c = order[player.step];
      svg.querySelectorAll('.lnode.cur').forEach(function (x) { x.classList.remove('cur'); });
      svg.querySelectorAll('.ledge[data-t="' + c.t + '"][data-s="' + c.s + '"]').forEach(function (x) { x.classList.remove('dim'); });
      var n = svg.querySelector('.lnode[data-t="' + c.t + '"][data-s="' + c.s + '"]');
      if (n) { n.classList.remove('dim'); n.classList.add('cur'); }
      svg.querySelectorAll('.evdot[data-t="' + c.t + '"][data-s="' + c.s + '"]').forEach(function (x) { x.classList.remove('dim'); });
      if (c.s === 'myth') {
        svg.querySelectorAll('.tlab[data-t="' + c.t + '"]').forEach(function (x) { x.classList.remove('dim'); });
      }
      showStage(c.t, c.s);
      player.timer = setTimeout(step, 1700);
    })();
  }

  /* ---------- 聚焦 / 重置 ---------- */
  function setFocus(tid) {
    var svg = el('mapSvg');
    svg.classList.remove('focus-t1', 'focus-t2', 'focus-t3', 'focus-t4', 'focus-t5');
    if (tid) { svg.classList.add('focus-' + tid); }
    el('focusBtns').querySelectorAll('button[data-f]').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.dataset.f === (tid || '')));
    });
  }
  function resetAll() {
    stopPlay();
    var svg = el('mapSvg');
    svg.classList.remove('playing', 'focus-t1', 'focus-t2', 'focus-t3', 'focus-t4', 'focus-t5');
    svg.querySelectorAll('.dim,.cur').forEach(function (x) { x.classList.remove('dim', 'cur'); });
    el('focusBtns').querySelectorAll('button').forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.f === '')); });
    document.querySelectorAll('.evi-chip').forEach(function (b) { b.setAttribute('aria-pressed', 'false'); });
    document.querySelectorAll('.evi-line').forEach(function (d) { d.hidden = true; });
    el('detail').innerHTML = '<p class="d-hint">' + esc(T('detailHint')) + '</p>';
  }

  /* ---------- 渲染 ---------- */
  function render() {
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
    document.title = TITLES[lang];
    el('kicker').textContent = T('kicker');
    el('h1').textContent = T('title');
    el('sub').textContent = T('sub');
    el('lede').textContent = T('lede');
    el('chartCaption').textContent = T('chartCaption');

    el('langBtns').innerHTML = '<span class="tool-label">' + esc(T('langLabel')) + '</span>' +
      '<button class="chip" data-lang="zh" aria-pressed="' + (lang === 'zh') + '">中文</button>' +
      '<button class="chip" data-lang="en" aria-pressed="' + (lang === 'en') + '">EN</button>';
    el('playBtn').textContent = player.on ? T('pause') : T('play');
    el('resetBtn').textContent = T('reset');
    el('compareBtn').textContent = T('compare');
    var curFocus = '';
    ['t1', 't2', 't3', 't4', 't5'].forEach(function (x) {
      if (el('mapSvg').classList.contains('focus-' + x)) { curFocus = x; }
    });
    el('focusBtns').innerHTML = '<span class="tool-label">' + esc(T('focus')) + '</span>' +
      '<button class="chip chip--focus" data-f="" aria-pressed="' + (!curFocus) + '" style="--fc:#26231f">' + esc(T('focusAll')) + '</button>' +
      LOGIC.threads.map(function (t) {
        return '<button class="chip chip--focus" data-f="' + t.id + '" aria-pressed="' + (t.id === curFocus) + '" style="--fc:' + t.color + '">' + esc(t.num) + '</button>';
      }).join('');

    el('mapSvg').innerHTML = mapSVG();

    el('compareTitle').textContent = T('compareTitle');
    el('compareNote').textContent = T('compareNote');
    var cols = CMP_COLS[lang];
    el('cmpTable').innerHTML =
      '<div class="cmp-head"><span></span><span>' + esc(cols[0]) + '</span><span>' + esc(cols[1]) + '</span><span>' + esc(cols[2]) + '</span></div>' +
      LOGIC.threads.map(function (t) {
        return '<div class="cmp-row" style="border-left-color:' + t.color + '">' +
          '<div class="cn" style="color:' + t.color + '">' + esc(t.num) + '<div style="font-family:var(--sans);font-size:11px;color:var(--ink-3);font-weight:400">' + esc(t.short[lang]) + '</div></div>' +
          '<div class="ct c-myth"><span class="col-h">' + esc(cols[0]) + '</span>' + esc(t.distinction.myth[lang]) + '</div>' +
          '<div class="ct c-def"><span class="col-h">' + esc(cols[1]) + '</span>' + esc(t.distinction.defense[lang]) + '</div>' +
          '<div class="ct c-crux"><span class="col-h">' + esc(cols[2]) + '</span>' + esc(t.distinction.crux[lang]) + '</div></div>';
      }).join('');

    el('cardsTitle').textContent = T('cardsTitle');
    el('threadCards').innerHTML = LOGIC.threads.map(function (t) {
      return '<details class="tcard" data-t="' + t.id + '" style="border-left-color:' + t.color + '"' + (openCards[t.id] ? ' open' : '') + '>' +
        '<summary><span class="sn" style="color:' + t.color + '">' + esc(t.num) + '</span>' +
        '<span class="st">' + esc(t.title[lang]) + '</span>' +
        '<span class="sq">' + esc(t.question[lang]) + '</span></summary><div class="tbody">' +
        LOGIC.stageKeys.map(function (sk) {
          return '<div class="tstage"><h4 style="color:' + t.color + '">' + esc(T(STAGE_LABEL[sk])) +
            '<span>' + esc(T(STAGE_HINT[sk])) + '</span></h4>' +
            '<p>' + esc(t.stages[sk].text[lang]) + '</p>' +
            '<div class="evi-btns">' + t.evidence[sk].map(function (id) {
              return '<button class="evi-chip" data-ev="' + id + '" aria-pressed="false">' + esc(EV(id).t) + '</button>';
            }).join('') + '</div>' +
            t.evidence[sk].map(function (id) {
              var ev = EV(id);
              return '<div class="evi-line" data-line="' + id + '" hidden>' + esc(ev.week + ' / ' + ev.t + '（' +
                (ev.side === 'contra' ? T('contra') : T('pro')) + '）：' + ev.l) + '</div>';
            }).join('') + '</div>';
        }).join('') + '</div></details>';
    }).join('');

    el('footerBox').innerHTML =
      '<p>' + esc(T('sourceNote')) + '</p>' +
      '<p><a href="timeline.html">' + esc(T('timelineLink')) + '</a></p>' +
      '<p>' + esc(T('footerNote')) + '</p>';

    el('detail').innerHTML = '<p class="d-hint">' + esc(T('detailHint')) + '</p>';
  }

  /* ---------- 事件 ---------- */
  function activate(node) {
    var n = node.closest('.lnode');
    if (n) { showStage(n.dataset.t, n.dataset.s); return; }
    var d = node.closest('.evdot');
    if (d) { showEv(d.dataset.ev); return; }
  }

  document.addEventListener('click', function (e) {
    var t = e.target;
    var langBtn = t.closest('button[data-lang]');
    if (langBtn) {
      lang = langBtn.dataset.lang;
      history.replaceState(null, '', lang === 'en' ? '?lang=en' : location.pathname);
      stopPlay();
      render();
      return;
    }
    if (t.closest('#playBtn')) { if (player.on) { stopPlay(); } else { startPlay(); } return; }
    if (t.closest('#resetBtn')) { resetAll(); return; }
    if (t.closest('#compareBtn')) { el('compare').scrollIntoView({ behavior: 'smooth' }); return; }
    var fb = t.closest('button[data-f]');
    if (fb) { setFocus(fb.dataset.f || null); return; }
    var chip = t.closest('.evi-chip');
    if (chip) {
      var on = chip.getAttribute('aria-pressed') === 'true';
      chip.setAttribute('aria-pressed', String(!on));
      var line = document.querySelector('.evi-line[data-line="' + chip.dataset.ev + '"]');
      if (line) { line.hidden = on; }
      return;
    }
    activate(t);
  });

  document.addEventListener('keydown', function (e) {
    if ((e.key === 'Enter' || e.key === ' ') && e.target.classList &&
        (e.target.classList.contains('lnode') || e.target.classList.contains('evdot'))) {
      e.preventDefault();
      activate(e.target);
    }
  });

  document.addEventListener('toggle', function (e) {
    var d = e.target;
    if (d && d.classList && d.classList.contains('tcard')) { openCards[d.dataset.t] = d.open; }
  }, true);

  render();
})();
