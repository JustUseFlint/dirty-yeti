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
      e.preventDefault(); if (W.__dyCloseNav) W.__dyCloseNav(false); if (lenis) lenis.scrollTo(0); else scrollTo(0, 0); return;
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
  if (lenis) lenis.on('scroll', onScroll); W.addEventListener('scroll', onScroll, { passive: true });
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
    var heroSplits = $$('.hero [data-split], .phero [data-split], .nf [data-split], .dhero [data-split], .ab2-hero [data-split]');
    var tl0 = gsap.timeline({ delay: 0.25 });
    tl0.to($$('.hero [data-split] .wd > span, .phero [data-split] .wd > span, .nf [data-split] .wd > span, .dhero [data-split] .wd > span, .ab2-hero [data-split] .wd > span'), { y: 0, duration: 1.1, ease: 'expo.out', stagger: 0.06 }, 0);
    tl0.to($$('.hero [data-rise], .phero [data-rise], .dhero [data-rise], .ab2-hero [data-rise]'), { opacity: 1, y: 0, duration: 0.9, ease: 'expo.out', stagger: 0.08 }, 0.35);
    var sq = $('.squig path');
    if (sq) tl0.fromTo(sq, { strokeDashoffset: 420 }, { strokeDashoffset: 0, duration: 1, ease: 'power3.inOut' }, 0.6);
    $$('[data-split]').forEach(function (el) {
      if (heroSplits.indexOf(el) > -1) return;
      gsap.to($$('.wd > span', el), { y: 0, duration: 1, ease: 'expo.out', stagger: 0.07, scrollTrigger: { trigger: el, start: 'top 88%', once: true } });
    });
    ScrollTrigger.batch($$('[data-rise]').filter(function (el) { return !el.closest('.hero, .phero, .dhero, .ab2-hero'); }), {
      start: 'top 90%', once: true,
      onEnter: function (b) { gsap.to(b, { opacity: 1, y: 0, duration: 0.9, ease: 'expo.out', stagger: 0.08 }); }
    });
  }

  /* ---------- cups: bubbles while visible, fill on reveal ---------- */
  if ('IntersectionObserver' in W) {
    var io = new IntersectionObserver(function (es) { es.forEach(function (en) { en.target.classList.toggle('live', en.isIntersecting); }); }, { rootMargin: '60px' });
    $$('.dcard, .mcard, .newbanner, .hero-media, .drop-cup, .nyt-tile, .build-cup, .nf-cup, .dhero-cup, .pn, .eq').forEach(function (el) { io.observe(el); });
  }
  if (motion) {
    ScrollTrigger.batch($$('.dcard, .mcard, .newbanner'), {
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

  /* ---------- HOME ---------- */
  // static hero: one-time load-in only, nothing tied to scroll
  var hero = $('[data-hero]');
  if (hero && motion) {
    tl0.fromTo($('.hero-frame', hero), { opacity: 0, y: 40, scale: 0.96 }, { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: 'expo.out', clearProps: 'opacity,transform' }, 0.15);
    $$('.hero-cup svg', hero).forEach(function (c, i) { tl0.fromTo(c, { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 1, ease: 'back.out(1.6)', clearProps: 'opacity,transform' }, 0.55 + i * 0.12); });
  }
  // drink hero: the cup fills once on load
  var pour = $('[data-pour]');
  if (pour && motion) {
    var pl = $('.liq', pour), pp = $('.pile', pour), pf = $('.foam', pour), ps = $('.straw', pour);
    tl0.fromTo(pour.firstElementChild, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.9, ease: 'expo.out' }, 0);
    if (pl) tl0.fromTo(pl, { y: 230 }, { y: 0, duration: 1.6, ease: 'power3.out' }, 0.2);
    if (pf) tl0.fromTo(pf, { y: -40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'back.out(2)' }, 1.2);
    if (pp) tl0.fromTo(pp, { y: -30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'back.out(2.2)' }, 1.35);
    if (ps) tl0.fromTo(ps, { y: -60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }, 1.1);
  }
  // about lede: words fill in as it scrolls past
  $$('[data-lede]').forEach(function (el) {
    var words = el.textContent.trim().split(/\s+/);
    el.innerHTML = '<span class="sr-only">' + el.textContent.trim().replace(/&/g, '&amp;').replace(/</g, '&lt;') + '</span>' + words.map(function (w) { return '<span class="lw" aria-hidden="true">' + w.replace(/&/g, '&amp;').replace(/</g, '&lt;') + '</span>'; }).join(' ');
    if (!motion) return;
    var ws = $$('.lw', el);
    gsap.to(ws, { opacity: 1, ease: 'none', stagger: 0.1, scrollTrigger: { trigger: el, start: 'top 80%', end: 'bottom 45%', scrub: 0.5 } });
  });
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

  /* ---------- mobile nav overlay ---------- */
  var burger = $('[data-burger]'), nav = $('[data-nav]'), navOpen = false;
  function navLinks() { return $$('a', nav); }
  function openNav() {
    if (!nav || navOpen) return; navOpen = true;
    nav.hidden = false; H.classList.add('nav-open', 'html-lock'); if (lenis) lenis.stop();
    burger.setAttribute('aria-expanded', 'true'); $('.burger-t', burger).textContent = 'Close'; $('.sr', burger).textContent = 'Close navigation';
    hdr && hdr.classList.remove('is-hidden');
    if (motion) {
      gsap.fromTo($('.nav-ov-bg', nav), { clipPath: 'circle(0% at calc(100% - 40px) 34px)' }, { clipPath: 'circle(150% at calc(100% - 40px) 34px)', duration: 0.75, ease: 'expo.inOut' });
      gsap.fromTo($$('.nav-ov-links a span', nav), { yPercent: 110 }, { yPercent: 0, duration: 0.9, ease: 'expo.out', stagger: 0.06, delay: 0.25 });
      gsap.fromTo($('.nav-ov-foot', nav), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, ease: 'expo.out', delay: 0.5 });
    }
    setTimeout(function () { var l = navLinks()[0]; l && l.focus({ preventScroll: true }); }, 60);
  }
  function closeNav(focusBack) {
    if (!nav || !navOpen) return; navOpen = false;
    burger.setAttribute('aria-expanded', 'false'); $('.burger-t', burger).textContent = 'Menu'; $('.sr', burger).textContent = 'Open navigation';
    var done = function () { nav.hidden = true; H.classList.remove('nav-open', 'html-lock'); if (lenis) lenis.start(); if (focusBack !== false) burger.focus({ preventScroll: true }); };
    if (motion) {
      gsap.to($$('.nav-ov-links a span, .nav-ov-foot', nav), { opacity: 0, duration: 0.2 });
      gsap.to($('.nav-ov-bg', nav), { clipPath: 'circle(0% at calc(100% - 40px) 34px)', duration: 0.55, ease: 'expo.inOut', onComplete: function () { gsap.set($$('.nav-ov-links a span, .nav-ov-foot', nav), { clearProps: 'opacity' }); done(); } });
    } else done();
  }
  W.__dyCloseNav = closeNav;
  if (burger && nav) {
    burger.addEventListener('click', function () { navOpen ? closeNav() : openNav(); });
    d.addEventListener('keydown', function (e) {
      if (!navOpen) return;
      if (e.key === 'Escape') { e.preventDefault(); closeNav(); return; }
      if (e.key === 'Tab') {
        var f = [burger].concat(navLinks()), i = f.indexOf(d.activeElement);
        e.preventDefault();
        f[(i + (e.shiftKey ? -1 : 1) + f.length) % f.length].focus();
      }
    });
    DESK.addEventListener && DESK.addEventListener('change', function (m) { if (m.matches) closeNav(false); });
  }

  /* ---------- in-page anchors (menu jump row, deep links) ---------- */
  function offsetFor(el) { var j = $('[data-jump]'); return (j ? j.offsetHeight : 0) + (hdr ? hdr.offsetHeight : 0) + 18; }
  function goTo(el, instant) {
    var y = el.getBoundingClientRect().top + scrollY - offsetFor(el);
    if (lenis) lenis.scrollTo(y, { immediate: !!instant, duration: 1.1 }); else scrollTo({ top: y, behavior: instant || RM ? 'auto' : 'smooth' });
    setTimeout(onScroll, 50);
    if (el.classList.contains('mcard')) { $$('.mcard.is-hl').forEach(function (m) { m.classList.remove('is-hl'); }); el.classList.add('is-hl'); setTimeout(function () { el.classList.remove('is-hl'); }, 2600); }
  }
  d.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href^="#"]');
    if (!a || a.classList.contains('skip')) return;
    var t = d.getElementById(decodeURIComponent(a.getAttribute('href').slice(1)));
    if (!t) return;
    e.preventDefault(); history.replaceState(null, '', a.getAttribute('href')); goTo(t);
  });
  if (location.hash && location.hash.length > 1) {
    var tgt = d.getElementById(decodeURIComponent(location.hash.slice(1)));
    if (tgt) { if ('scrollRestoration' in history) history.scrollRestoration = 'manual'; var jumpTo = function () { goTo(tgt, true); }; setTimeout(jumpTo, 80); W.addEventListener('load', function () { setTimeout(jumpTo, 120); }); }
  }
  // highlight the section you're in on the jump row
  var jumps = $$('[data-jump-link]');
  if (jumps.length && 'IntersectionObserver' in W) {
    var secIO = new IntersectionObserver(function (es) {
      es.forEach(function (en) { if (en.isIntersecting) jumps.forEach(function (j) { j.classList.toggle('is-on', j.dataset.jumpLink === en.target.id); }); });
    }, { rootMargin: '-35% 0px -60% 0px' });
    jumps.forEach(function (j) { var t = d.getElementById(j.dataset.jumpLink); if (t) secIO.observe(t); });
  }

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
