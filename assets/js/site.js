/* The Dirty Yeti · interaction + motion (GSAP + ScrollTrigger + Lenis) */
(function () {
  'use strict';
  var d = document, H = d.documentElement, W = window;
  var RM = W.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var FINE = W.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var DESK = W.matchMedia('(min-width: 900px)');
  var hasG = !!(W.gsap && W.ScrollTrigger);
  var motion = !RM && hasG;
  var $ = function (s, c) { return (c || d).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || d).querySelectorAll(s)); };
  var lenis = null;
  W.__dyReady = true;
  H.classList.toggle('motion', motion);
  H.classList.toggle('no-motion', !motion);
  if (hasG) gsap.registerPlugin(ScrollTrigger);
  $$('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });

  /* ---------- smooth scroll ---------- */
  if (motion && W.Lenis) {
    lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(function (t) { lenis.raf(t * 1000); });
    gsap.ticker.lagSmoothing(0);
  }

  /* ---------- page transitions ---------- */
  var pt = $('.pt'), ptIn = pt && $('.pt-in', pt);
  if (motion && pt) {
    if (H.classList.contains('pt-in')) {
      gsap.set(pt, { visibility: 'visible' });
      gsap.fromTo(ptIn, { clipPath: 'circle(150% at 50% 50%)' }, { clipPath: 'circle(0% at 50% 50%)', duration: 0.8, ease: 'expo.inOut', delay: 0.05, onComplete: function () { gsap.set(pt, { visibility: 'hidden' }); } });
      gsap.fromTo($('img', pt), { scale: 1, rotate: 0 }, { scale: 0.4, rotate: -25, duration: 0.7, ease: 'expo.in' });
    }
  }
  H.classList.remove('pt-in'); try { sessionStorage.removeItem('dy-pt'); } catch (e) {}
  function leave(href, e) {
    try { sessionStorage.setItem('dy-pt', '1'); } catch (er) {}
    if (!motion || !pt) { location.href = href; return; }
    var x = e && e.clientX ? (e.clientX / innerWidth * 100) : 50, y = e && e.clientY ? (e.clientY / innerHeight * 100) : 50;
    gsap.set(pt, { visibility: 'visible' });
    gsap.fromTo(ptIn, { clipPath: 'circle(0% at ' + x + '% ' + y + '%)' }, { clipPath: 'circle(150% at ' + x + '% ' + y + '%)', duration: 0.7, ease: 'expo.inOut', onComplete: function () { location.href = href; } });
    gsap.fromTo($('img', pt), { scale: 0.4, rotate: 25 }, { scale: 1, rotate: 0, duration: 0.7, ease: 'expo.out', delay: 0.2 });
  }
  W.addEventListener('pageshow', function (e) { if (e.persisted && pt) { gsap && gsap.set(pt, { visibility: 'hidden' }); } });
  d.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href]');
    if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if ((a.target && a.target !== '_self') || a.hasAttribute('download')) return;
    var href = a.getAttribute('href');
    if (!href || href.charAt(0) === '#' || /^(mailto|tel):/.test(href)) return;
    var u = new URL(a.href, location.href);
    if (u.origin !== location.origin) return;
    if (u.pathname === location.pathname) {
      if (u.hash) return; // same page anchor, let page code handle
      e.preventDefault(); if (lenis) lenis.scrollTo(0); else scrollTo(0, 0); return;
    }
    e.preventDefault(); leave(a.href, e);
  });

  /* ---------- header ---------- */
  var hdr = $('[data-hdr]'), lastY = 0;
  function onScroll() {
    var y = W.scrollY;
    if (hdr) {
      hdr.classList.toggle('is-solid', y > 24);
      var hide = y > 240 && y > lastY + 2 && !H.classList.contains('html-lock');
      if (y < lastY - 2 || y < 240) hide = false;
      if (y !== lastY) { hdr.classList.toggle('is-hidden', hide); H.classList.toggle('hdr-shown', !hide); }
    }
    lastY = y;
  }
  H.classList.add('hdr-shown');
  if (lenis) lenis.on('scroll', onScroll); else W.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- split text + reveals ---------- */
  $$('[data-split]').forEach(function (el) {
    var html = [];
    el.textContent.trim().split(/\s+/).forEach(function (w) { html.push('<span class="wd"><span>' + w.replace(/&/g, '&amp;').replace(/</g, '&lt;') + '</span></span>'); });
    el.setAttribute('aria-label', el.textContent.trim());
    el.innerHTML = html.join(' ');
    $$('.wd', el).forEach(function (w) { w.setAttribute('aria-hidden', 'true'); });
  });
  if (motion) {
    var heroSplits = $$('.hero [data-split], .phero [data-split], .nf [data-split]');
    var tl0 = gsap.timeline({ delay: 0.25 });
    tl0.to($$('.hero [data-split] .wd > span, .phero [data-split] .wd > span, .nf [data-split] .wd > span'), { y: 0, duration: 1.1, ease: 'expo.out', stagger: 0.06 }, 0);
    tl0.to($$('.hero [data-rise], .phero [data-rise]'), { opacity: 1, y: 0, duration: 0.9, ease: 'expo.out', stagger: 0.08 }, 0.35);
    var sq = $('.squig path');
    if (sq) tl0.fromTo(sq, { strokeDashoffset: 420 }, { strokeDashoffset: 0, duration: 1, ease: 'power3.inOut' }, 0.6);
    $$('[data-split]').forEach(function (el) {
      if (heroSplits.indexOf(el) > -1) return;
      gsap.to($$('.wd > span', el), { y: 0, duration: 1, ease: 'expo.out', stagger: 0.07, scrollTrigger: { trigger: el, start: 'top 88%', once: true } });
    });
    ScrollTrigger.batch($$('[data-rise]').filter(function (el) { return !el.closest('.hero, .phero'); }), {
      start: 'top 90%', once: true,
      onEnter: function (b) { gsap.to(b, { opacity: 1, y: 0, duration: 0.9, ease: 'expo.out', stagger: 0.08 }); }
    });
  }

  /* ---------- cups: bubbles while visible, fill on reveal ---------- */
  if ('IntersectionObserver' in W) {
    var io = new IntersectionObserver(function (es) { es.forEach(function (en) { en.target.classList.toggle('live', en.isIntersecting); }); }, { rootMargin: '60px' });
    $$('.dcard, .hero-media, .drop-cup, .nyt-tile, .build-cup, .dropbar, .nf-cup').forEach(function (el) { io.observe(el); });
  }
  if (motion) {
    ScrollTrigger.batch($$('.dcard:not(.dcard-all)'), {
      start: 'top 92%', once: true,
      onEnter: function (b) {
        b.forEach(function (c, i) {
          var liq = $('.liq', c), pile = $('.pile', c);
          gsap.fromTo(liq, { y: 230 }, { y: 0, duration: 1.4, ease: 'power3.out', delay: i * 0.08 });
          if (pile) gsap.fromTo(pile, { y: -30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'back.out(2.2)', delay: 0.9 + i * 0.08 });
        });
      }
    });
    $$('[data-float]').forEach(function (el, i) {
      gsap.to(el, { y: i % 2 ? -10 : -14, rotation: '+=' + (i % 2 ? 2 : -2), duration: 2.4 + (i % 3) * 0.4, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: i * 0.2 });
    });
  }

  /* ---------- magnetic buttons + tilt ---------- */
  if (FINE && motion) {
    $$('[data-magnetic]').forEach(function (el) {
      var xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'elastic.out(1, .4)' }), yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'elastic.out(1, .4)' });
      el.addEventListener('mousemove', function (e) { var r = el.getBoundingClientRect(); xTo((e.clientX - r.left - r.width / 2) * 0.28); yTo((e.clientY - r.top - r.height / 2) * 0.38); });
      el.addEventListener('mouseleave', function () { xTo(0); yTo(0); });
    });
    $$('[data-tilt]').forEach(function (el) {
      el.addEventListener('mousemove', function (e) { var r = el.getBoundingClientRect(); gsap.to(el, { rotationY: ((e.clientX - r.left) / r.width - 0.5) * 8, rotationX: -((e.clientY - r.top) / r.height - 0.5) * 8, transformPerspective: 900, duration: 0.6, ease: 'power3.out' }); });
      el.addEventListener('mouseleave', function () { gsap.to(el, { rotationY: 0, rotationX: 0, duration: 0.9, ease: 'elastic.out(1, .5)' }); });
    });
  }

  /* ---------- marquee with scroll velocity ---------- */
  $$('.mq').forEach(function (mq, k) {
    if (!motion) return;
    var track = $('.mq-track', mq), dir = k % 2 ? 1 : -1, x = 0, boost = 0;
    var w = function () { return track.scrollWidth / 2; };
    gsap.ticker.add(function (t, dt) {
      var v = (0.045 + boost) * dt * dir; x += v;
      var ww = w(); if (x <= -ww) x += ww; if (x > 0) x -= ww;
      track.style.transform = 'translate3d(' + x + 'px,0,0)';
      boost *= 0.92;
    });
    ScrollTrigger.create({ trigger: mq, start: 'top bottom', end: 'bottom top', onUpdate: function (s) { boost = Math.min(0.9, Math.abs(s.getVelocity()) / 2600); } });
  });

  /* ---------- rails: progress bars ---------- */
  function railBar(rail) {
    var bar = rail.parentNode.querySelector('[data-rail-bar]') || (rail.nextElementSibling && rail.nextElementSibling.querySelector('[data-rail-bar]'));
    if (!bar) return;
    var upd = function () { var m = rail.scrollWidth - rail.clientWidth; var p = m > 0 ? rail.scrollLeft / m : 1; bar.style.transform = 'scaleX(' + (0.18 + p * 0.82) + ')'; };
    rail.addEventListener('scroll', upd, { passive: true }); upd(); rail.__upd = upd;
  }
  $$('[data-rail]').forEach(railBar);

  /* ---------- HOME ---------- */
  var hero = $('[data-hero]');
  if (hero && motion) {
    var pin = $('.hero-pin', hero), media = $('[data-hero-media]', hero), frame = $('.hero-frame', hero), copy = $('.hero-copy', hero);
    var htl = gsap.timeline({ scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom bottom', scrub: 0.6, invalidateOnRefresh: true } });
    htl.to(copy, { y: -120, opacity: 0, ease: 'power2.in', duration: 0.5 }, 0)
      .fromTo(frame, { top: 0, left: 0, width: function () { return media.clientWidth; }, height: function () { return frame.offsetHeight; }, rotation: -2.5, borderWidth: 5, borderRadius: 28 },
        { top: function () { return -media.offsetTop; }, left: function () { return -media.offsetLeft; }, width: function () { return pin.clientWidth; }, height: function () { return pin.clientHeight; }, rotation: 0, borderWidth: 0, borderRadius: 0, ease: 'power2.inOut', duration: 1 }, 0)
      .to('.hc1', { xPercent: -160, yPercent: 60, rotation: -40, ease: 'power2.in', duration: 0.8 }, 0)
      .to('.hc2', { xPercent: 160, yPercent: -80, rotation: 40, ease: 'power2.in', duration: 0.8 }, 0)
      .to('.hc3', { yPercent: 160, rotation: 30, ease: 'power2.in', duration: 0.8 }, 0)
      .to($('.hero-frame img', hero), { scale: 1.08, ease: 'none', duration: 1 }, 0)
      .to('.hero-chip', { y: 10, scale: 1.08, ease: 'none', duration: 1 }, 0);
  }
  // desktop: featured rail scrolls sideways while pinned
  var feat = $('.feat');
  if (feat && motion) {
    ScrollTrigger.matchMedia({
      '(min-width: 900px)': function () {
        var track = $('[data-rail-track]', feat), bar = $('[data-rail-bar]', feat);
        var dist = function () { return Math.max(0, track.scrollWidth - innerWidth + 40); };
        gsap.to(track, { x: function () { return -dist(); }, ease: 'none', scrollTrigger: { trigger: feat, start: 'top top', end: function () { return '+=' + dist(); }, pin: true, scrub: 0.6, invalidateOnRefresh: true, onUpdate: function (s) { if (bar) bar.style.transform = 'scaleX(' + (0.18 + s.progress * 0.82) + ')'; } } });
      }
    });
  }
  // dirty soda, built
  var build = $('[data-build]');
  if (build && motion) {
    var bc = $('[data-build-cup]', build), steps = $$('[data-build-steps] li', build);
    var base = $('.base', bc), syrup = $('.syrup', bc), sw = $('.swirls', bc), fo = $('.foam', bc), straw = $('.straw', bc), bubs = $$('.bub', bc);
    gsap.set(base, { y: 230 }); gsap.set([syrup, sw], { opacity: 0 }); gsap.set(fo, { y: -70, opacity: 0 }); gsap.set(straw, { y: -40, opacity: 0 });
    gsap.set(steps.slice(1), { opacity: 0, y: 30 });
    var btl = gsap.timeline({ scrollTrigger: { trigger: build, start: 'top top', end: 'bottom bottom', scrub: 0.7 } });
    var swap = function (i, at) { btl.to(steps[i - 1], { opacity: 0, y: -30, duration: 0.25 }, at).to(steps[i], { opacity: 1, y: 0, duration: 0.25 }, at + 0.1); };
    btl.to(base, { y: 0, duration: 1, ease: 'power1.out' }, 0)
      .to(straw, { y: 0, opacity: 1, duration: 0.4 }, 0.6);
    swap(1, 1.1); btl.to(syrup, { opacity: 1, duration: 0.9 }, 1.2);
    swap(2, 2.2); btl.fromTo(sw, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.9 }, 2.3);
    swap(3, 3.3); btl.to(fo, { y: 0, opacity: 1, duration: 0.8, ease: 'back.out(1.6)' }, 3.4);
    btl.to({}, { duration: 0.6 });
    gsap.to(bc.querySelector('.cup'), { rotation: 2, y: -8, duration: 2.6, ease: 'sine.inOut', yoyo: true, repeat: -1 });
  }
  // soda not your thing: words slide in from the sides
  var nyt = $('[data-nyt]');
  if (nyt && motion) {
    var ntl = gsap.timeline({ scrollTrigger: { trigger: nyt, start: 'top 100%', end: 'center 62%', scrub: 0.8 } });
    ntl.from('.nyt-h .w1', { xPercent: -28, ease: 'power2.out' }, 0).from('.nyt-h .w2', { xPercent: 30, ease: 'power2.out' }, 0).from('.nyt-h .w3', { xPercent: -22, rotation: -3, ease: 'power2.out' }, 0);
    gsap.fromTo($$('.nyt-tile'), { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 1.1, ease: 'expo.out', stagger: 0.12, scrollTrigger: { trigger: '.nyt-tiles', start: 'top 85%', once: true } });
    gsap.fromTo($$('.nt-cup svg'), { y: 140 }, { y: 0, duration: 1.2, ease: 'back.out(1.4)', stagger: 0.06, scrollTrigger: { trigger: '.nyt-tiles', start: 'top 80%', once: true } });
  }
  // photo strip drifts sideways on desktop
  var strip = $('[data-strip]');
  if (strip && motion) {
    ScrollTrigger.matchMedia({ '(min-width: 900px)': function () {
      gsap.fromTo(strip, { x: 0 }, { x: function () { return -(strip.scrollWidth - innerWidth) ; }, ease: 'none', scrollTrigger: { trigger: strip.parentNode, start: 'top bottom', end: 'bottom top', scrub: 0.6, invalidateOnRefresh: true } });
    } });
  }
  // footer wordmark rises
  var fw = $('.ftr-word span');
  if (fw && motion) gsap.from(fw, { yPercent: 70, ease: 'none', scrollTrigger: { trigger: '.ftr-word', start: 'top bottom', end: 'bottom bottom', scrub: 0.6 } });

  /* ---------- MENU: tabs ---------- */
  var tabs = $$('[data-tab]'), ink = $('[data-tab-ink]'), tabsW = $('[data-tabs-w]');
  function selectTab(id, opts) {
    opts = opts || {};
    var idx = 0;
    tabs.forEach(function (t, i) { var on = t.dataset.tab === id; if (on) idx = i; t.setAttribute('aria-selected', on); t.tabIndex = on ? 0 : -1; });
    if (ink) ink.style.transform = 'translateX(' + idx * 100 + '%)';
    $$('[data-panel]').forEach(function (p) {
      var on = p.dataset.panel === id;
      if (on && p.hidden) {
        p.hidden = false;
        var r = $('[data-rail]', p); if (r) { r.scrollLeft = 0; r.__upd && r.__upd(); }
        if (motion && !opts.quiet) {
          var cards = $$('.dcard', p);
          gsap.fromTo(cards, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'expo.out', stagger: 0.05 });
          cards.forEach(function (c, i) { gsap.fromTo($('.liq', c), { y: 230 }, { y: 0, duration: 1.3, ease: 'power3.out', delay: 0.1 + i * 0.05 }); var pl = $('.pile', c); if (pl) gsap.fromTo(pl, { y: -30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'back.out(2.2)', delay: 0.8 + i * 0.05 }); });
          gsap.fromTo($('.panel-head', p), { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'expo.out' });
        }
      } else if (!on) p.hidden = true;
    });
    if (hasG) ScrollTrigger.refresh();
    if (opts.scroll && tabsW) { var y = tabsW.getBoundingClientRect().top + scrollY - 4; if (lenis) lenis.scrollTo(y, { duration: 0.9 }); else scrollTo({ top: y, behavior: RM ? 'auto' : 'smooth' }); }
  }
  tabs.forEach(function (t, i) {
    t.addEventListener('click', function () { selectTab(t.dataset.tab, { scroll: tabsW && tabsW.getBoundingClientRect().top < 0 }); history.replaceState(null, '', '#' + t.dataset.tab); });
    t.addEventListener('keydown', function (e) {
      var k = e.key, n = null;
      if (k === 'ArrowRight') n = tabs[(i + 1) % tabs.length]; else if (k === 'ArrowLeft') n = tabs[(i - 1 + tabs.length) % tabs.length]; else if (k === 'Home') n = tabs[0]; else if (k === 'End') n = tabs[tabs.length - 1];
      if (n) { e.preventDefault(); n.focus(); n.click(); }
    });
  });
  if (tabsW) {
    var stuck = function () { tabsW.classList.toggle('is-stuck', tabsW.getBoundingClientRect().top <= 0.5); };
    if (lenis) lenis.on('scroll', stuck); else W.addEventListener('scroll', stuck, { passive: true });
    stuck();
  }

  /* ---------- MENU: drink sheet ---------- */
  var MENU = W.DY_MENU || [], sheet = $('[data-sheet]');
  var byId = {}; MENU.forEach(function (m) { byId[m.id] = m; });
  var current = null, lastFocus = null;
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;'); }
  function fill(m) {
    var tpl = d.getElementById('cup-' + m.id);
    var art = $('[data-sheet-art]', sheet);
    art.innerHTML = tpl ? tpl.innerHTML : '';
    art.style.setProperty('--tint', m.tint);
    $('[data-sheet-cat]', sheet).textContent = m.label;
    $('[data-sheet-size]', sheet).textContent = m.size;
    $('[data-sheet-name]', sheet).textContent = m.name;
    $('[data-sheet-price]', sheet).textContent = m.seasonal ? 'New seasonal drink' : m.price + ' · ' + m.size;
    var b = $('[data-sheet-build]', sheet), h = [];
    m.ing.forEach(function (x, i) { if (i) h.push('<li class="plus" aria-hidden="true">+</li>'); h.push('<li>' + esc(x) + '</li>'); });
    b.innerHTML = h.join('');
    b.previousElementSibling.hidden = !m.ing.length;
    var note = '';
    if (m.partial) note = 'Plus a little more. Ask at the window for the full build.';
    if (m.unread) note = 'Ask at the window for what goes in this one.';
    if (m.seasonal) note = 'Ask at the window for what’s in it and the price.';
    $('[data-sheet-note]', sheet).textContent = note;
    if (motion) {
      var liq = $('.liq', art), pile = $('.pile', art), c = $('.cup', art);
      gsap.fromTo(liq, { y: 260 }, { y: 0, duration: 1.2, ease: 'power3.out', delay: 0.15 });
      if (pile) gsap.fromTo(pile, { y: -40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'back.out(2.2)', delay: 0.8 });
      gsap.fromTo(c, { y: 30, rotation: -6 }, { y: 0, rotation: 0, duration: 1, ease: 'elastic.out(1, .6)' });
      gsap.fromTo($$('.sheet-k, .sheet-name, .sheet-price, .sheet-lbl, .sheet-build li, .sheet-note', sheet), { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'expo.out', stagger: 0.03, delay: 0.1 });
    }
  }
  function siblings() { if (!current) return []; return MENU.filter(function (m) { return current.seasonal ? true : m.cat === current.cat; }); }
  function step(dir) { var s = siblings(), i = s.indexOf(current); if (i < 0) return; current = s[(i + dir + s.length) % s.length]; fill(current); history.replaceState(null, '', '#' + current.id); }
  function openSheet(id, fromEl) {
    var m = byId[id]; if (!m || !sheet) return;
    if (m.cat !== 'new' && tabs.length) selectTab(m.cat, { quiet: true });
    current = m; lastFocus = fromEl || d.activeElement;
    fill(m);
    sheet.hidden = false; H.classList.add('html-lock'); if (lenis) lenis.stop();
    var panel = $('[data-sheet-panel]', sheet);
    if (motion) {
      gsap.fromTo($('.sheet-scrim', sheet), { opacity: 0 }, { opacity: 1, duration: 0.4 });
      if (DESK.matches) gsap.fromTo(panel, { opacity: 0, scale: 0.92, xPercent: -50, yPercent: -46, x: 0, y: 0 }, { opacity: 1, scale: 1, yPercent: -50, duration: 0.7, ease: 'expo.out' });
      else gsap.fromTo(panel, { yPercent: 100 }, { yPercent: 0, y: 0, duration: 0.7, ease: 'expo.out' });
    }
    panel.scrollTop = 0;
    setTimeout(function () { panel.focus({ preventScroll: true }); }, 30);
    history.replaceState(null, '', '#' + id);
  }
  function closeSheet() {
    if (!sheet || sheet.hidden) return;
    var panel = $('[data-sheet-panel]', sheet);
    var done = function () { sheet.hidden = true; H.classList.remove('html-lock'); if (lenis) lenis.start(); gsap && gsap.set(panel, { clearProps: 'transform,opacity' }); if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true }); };
    history.replaceState(null, '', location.pathname + (current && current.cat !== 'new' ? '#' + current.cat : ''));
    if (motion) {
      gsap.to($('.sheet-scrim', sheet), { opacity: 0, duration: 0.35 });
      if (DESK.matches) gsap.to(panel, { opacity: 0, scale: 0.94, duration: 0.35, ease: 'power3.in', onComplete: done });
      else gsap.to(panel, { yPercent: 100, duration: 0.45, ease: 'power3.in', onComplete: done });
    } else done();
  }
  if (sheet) {
    d.addEventListener('click', function (e) {
      var a = e.target.closest && e.target.closest('[data-drink]');
      if (a && !sheet.contains(a)) { e.preventDefault(); openSheet(a.dataset.drink, a); }
    });
    $$('[data-sheet-close]', sheet).forEach(function (b) { b.addEventListener('click', closeSheet); });
    $('[data-sheet-prev]', sheet).addEventListener('click', function () { step(-1); });
    $('[data-sheet-next]', sheet).addEventListener('click', function () { step(1); });
    d.addEventListener('keydown', function (e) {
      if (sheet.hidden) return;
      if (e.key === 'Escape') closeSheet();
      if (e.key === 'ArrowRight' && !/INPUT|TEXTAREA/.test(e.target.tagName)) step(1);
      if (e.key === 'ArrowLeft' && !/INPUT|TEXTAREA/.test(e.target.tagName)) step(-1);
      if (e.key === 'Tab') {
        var f = $$('button, a[href]', sheet).filter(function (x) { return x.offsetParent !== null; });
        if (!f.length) return;
        if (e.shiftKey && d.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
        else if (!e.shiftKey && d.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
      }
    });
    // drag down to close (phones), swipe sideways on the cup to change drinks
    var panelEl = $('[data-sheet-panel]', sheet), sy0 = null, sx0 = 0, dy = 0, dx = 0, mode = null;
    panelEl.addEventListener('touchstart', function (e) {
      if (DESK.matches) return;
      var t = e.touches[0]; sy0 = t.clientY; sx0 = t.clientX; dy = 0; dx = 0; mode = null;
    }, { passive: true });
    panelEl.addEventListener('touchmove', function (e) {
      if (sy0 === null) return;
      var t = e.touches[0]; dy = t.clientY - sy0; dx = t.clientX - sx0;
      if (!mode) { if (Math.abs(dx) > 10 && Math.abs(dx) > Math.abs(dy) && e.target.closest('.sheet-art')) mode = 'x'; else if (dy > 8 && panelEl.scrollTop <= 0) mode = 'y'; else if (Math.abs(dy) > 8) mode = 'none'; }
      if (mode === 'y') { e.preventDefault(); panelEl.style.transform = 'translateY(' + Math.max(0, dy) + 'px)'; }
      if (mode === 'x') { var c = $('.sheet-art .cup', sheet); if (c) c.style.transform = 'translateX(' + dx * 0.5 + 'px) rotate(' + dx * 0.03 + 'deg)'; }
    }, { passive: false });
    panelEl.addEventListener('touchend', function () {
      if (mode === 'y') { if (dy > 110) closeSheet(); else { if (hasG) gsap.to(panelEl, { y: 0, duration: 0.4, ease: 'expo.out', onComplete: function () { panelEl.style.transform = ''; } }); else panelEl.style.transform = ''; } panelEl.style.transform = dy > 110 ? panelEl.style.transform : ''; }
      if (mode === 'x') { var c = $('.sheet-art .cup', sheet); if (c) c.style.transform = ''; if (Math.abs(dx) > 60) step(dx < 0 ? 1 : -1); }
      sy0 = null; mode = null;
    });
  }
  // deep links: #soda / #energy / #lemonade or #<drink-id>
  function fromHash() {
    var h = decodeURIComponent(location.hash.slice(1));
    if (!h) return;
    if (tabs.some(function (t) { return t.dataset.tab === h; })) { selectTab(h, { quiet: true }); setTimeout(function () { var y = tabsW.getBoundingClientRect().top + scrollY - 4; if (lenis) lenis.scrollTo(y, { immediate: true }); else scrollTo(0, y); }, 60); }
    else if (byId[h]) openSheet(h);
  }
  if (sheet || tabs.length) { fromHash(); W.addEventListener('hashchange', fromHash); }

  /* ---------- EVENTS: mailto composer ---------- */
  var form = $('[data-evform]');
  if (form) form.addEventListener('submit', function (e) {
    e.preventDefault();
    var v = function (n) { return (form.elements[n].value || '').trim(); };
    var name = form.elements.name;
    if (!v('name')) { name.classList.add('is-err'); name.focus(); return; }
    name.classList.remove('is-err');
    var lines = ['Hi Dirty Yeti,', '', 'We’d love to have the pink camper at our event.', ''];
    if (v('kind')) lines.push('Event: ' + v('kind'));
    if (v('date')) lines.push('Date: ' + v('date'));
    if (v('where')) lines.push('Where: ' + v('where'));
    if (v('count')) lines.push('Rough headcount: ' + v('count'));
    if (v('notes')) lines.push('', v('notes'));
    lines.push('', 'Thanks,', v('name'));
    location.href = 'mailto:' + W.DY_EMAIL + '?subject=' + encodeURIComponent('The pink camper at our event' + (v('date') ? ' (' + v('date') + ')' : '')) + '&body=' + encodeURIComponent(lines.join('\n'));
  });

  if (hasG) { ScrollTrigger.sort(); ScrollTrigger.refresh(); W.addEventListener('load', function () { ScrollTrigger.refresh(); }); }
})();
