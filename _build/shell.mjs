import { SITE, EMAIL, IG, IG_HANDLE, FB, V, DRINKS } from './data.mjs';
export const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
import dims from './img-dims.json' with { type: 'json' };

// <picture> for a processed photo: 800 + up-to-1600, WebP first.
export const pic = (root, name, alt, { cls = '', sizes = '100vw', eager = false } = {}) => {
  const [w8, h8] = dims[name + '-800'], [w16] = dims[name + '-1600'];
  const set = ext => `${root}assets/img/${name}-800.${ext} 800w, ${root}assets/img/${name}-1600.${ext} ${w16}w`;
  return `<picture${cls ? ` class="${cls}"` : ''}><source type="image/webp" srcset="${set('webp')}" sizes="${sizes}"><img src="${root}assets/img/${name}-800.jpg" srcset="${set('jpg')}" sizes="${sizes}" alt="${esc(alt)}" width="${w8}" height="${h8}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async"></picture>`;
};

export const ico = {
  ig: `<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="17.2" cy="6.8" r="1.2" fill="currentColor"/></svg>`,
  fb: `<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M13.6 21v-7.4h2.5l.4-3h-2.9V8.8c0-.9.3-1.5 1.5-1.5h1.5V4.6c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2.3H8.2v3h2.5V21" fill="currentColor"/></svg>`,
  mail: `<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5.5" width="18" height="13" rx="3" fill="none" stroke="currentColor" stroke-width="2"/><path d="M4 7.5l8 6 8-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>`,
  arrow: `<svg class="ico arr" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  pin: `<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-6.5-6.1-6.5-11a6.5 6.5 0 0113 0c0 4.9-6.5 11-6.5 11z" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="10" r="2.4" fill="currentColor"/></svg>`,
  clock: `<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" stroke-width="2"/><path d="M12 7.5V12l3 2" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
  home: `<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 11l8-6.5 8 6.5V20h-5v-5.5H9V20H4z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>`,
  cup: `<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 8h12l-1.4 12.2a1 1 0 01-1 .8H8.4a1 1 0 01-1-.8zM5 8h14M13 8l2-5.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/></svg>`,
  party: `<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20l5-13 8 8zM14 4c.5 1.5 0 2.5-1 3.5M19 9c-1.5-.4-2.6 0-3.5 1M18.5 4.5l.01 0M20 13.5l.01 0" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/></svg>`,
  yeti: `<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3.5c-4 0-7 3-7 7.2V20h14v-9.3c0-4.2-3-7.2-7-7.2z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M8.5 13.5c1 1.6 2.2 2.2 3.5 2.2s2.5-.6 3.5-2.2" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><circle cx="9.5" cy="10" r="1.1" fill="currentColor"/><circle cx="14.5" cy="10" r="1.1" fill="currentColor"/></svg>`,
  close: `<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg>`,
  chev: `<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  spark: `<svg class="spark" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 1.5c.6 5.6 4.9 9.9 10.5 10.5-5.6.6-9.9 4.9-10.5 10.5C11.4 16.9 7.1 12.6 1.5 12 7.1 11.4 11.4 7.1 12 1.5z" fill="currentColor"/></svg>`,
};

export const btn = (href, label, { cls = 'btn-ink', icon = ico.arrow, ext = false, iconFirst = false, attrs = '' } = {}) =>
  `<a class="btn ${cls}" href="${href}"${ext ? ' target="_blank" rel="noopener"' : ''} data-magnetic${attrs ? ' ' + attrs : ''}><span class="btn-in">${iconFirst ? icon : ''}<span class="btn-t" data-text="${esc(label)}">${esc(label)}</span>${iconFirst ? '' : icon}</span></a>`;

const NAV = [['Menu', 'menu/', ico.cup], ['Find us', 'find-us/', ico.pin], ['Events', 'events/', ico.party], ['About', 'about/', ico.yeti]];
const FONTS = 'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wdth,wght@12..96,75..100,400..800&family=Figtree:ital,wght@0,400..800;1,500&display=swap';

export function head({ root, title, desc, path = '', body = '' }) {
  const url = SITE + path;
  const ld = { '@context': 'https://schema.org', '@type': 'FoodEstablishment', name: 'The Dirty Yeti', alternateName: 'The Dirty Yeti Dirty Soda Co.', description: 'Mobile dirty soda co. in Indiana. Yes, we\u2019re THAT pink camper.', email: EMAIL, url: SITE, image: SITE + 'assets/img/og.jpg', logo: SITE + 'assets/img/logo-640.png', servesCuisine: 'Dirty soda, energy drinks, lemonade', areaServed: 'Indiana', sameAs: [FB, IG], hasMenu: SITE + 'menu/', priceRange: '$6–$10' };
  return `<!doctype html>
<html lang="en" class="no-js">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<meta name="theme-color" content="#f0418c">
<meta property="og:site_name" content="The Dirty Yeti"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(desc)}"><meta property="og:type" content="website"><meta property="og:url" content="${url}">
<meta property="og:image" content="${SITE}assets/img/og.jpg"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:alt" content="The Dirty Yeti logo next to the pink camper and a row of dirty sodas">
<meta name="twitter:card" content="summary_large_image">
<meta name="format-detection" content="telephone=no">
<link rel="canonical" href="${url}">
<link rel="icon" href="${root}assets/img/favicon.png" type="image/png"><link rel="apple-touch-icon" href="${root}assets/img/apple-touch-icon.png">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${FONTS}">
<link rel="stylesheet" href="${root}assets/css/site.css?v=${V}">
<script type="application/ld+json">${JSON.stringify(ld)}</script>
<script>(function(d,w){var h=d.documentElement;h.className=h.className.replace('no-js','js');var rm=w.matchMedia&&w.matchMedia('(prefers-reduced-motion: reduce)').matches;if(!rm){h.classList.add('motion');try{if(sessionStorage.getItem('dy-pt')==='1')h.classList.add('pt-in')}catch(e){}}else{h.classList.add('no-motion')}setTimeout(function(){if(!w.__dyReady){h.classList.remove('motion','pt-in');h.classList.add('no-motion')}},4000)})(document,window)</script>
</head>
<body class="${body}">`;
}

export function header(root, path) {
  const cur = p => path.startsWith(p) ? ' aria-current="page"' : '';
  return `<div class="pt" aria-hidden="true"><div class="pt-in"><img src="${root}assets/img/logo-240.png" alt="" width="240" height="230"></div></div>
<a class="skip" href="#main">Skip to content</a>
<header class="hdr" data-hdr>
  <a class="hdr-logo" href="${root}" aria-label="The Dirty Yeti, home"><img src="${root}assets/img/logo-240.png" alt="" width="240" height="230"></a>
  <nav class="hdr-nav" aria-label="Primary">${NAV.map(([t, h]) => `<a href="${root}${h}"${cur(h)}>${t}</a>`).join('')}</nav>
  <div class="hdr-r">
    ${btn(root + 'find-us/', 'Where’s the camper?', { cls: 'btn-ink btn-sm hdr-cta' })}
    <button class="burger" type="button" aria-expanded="false" aria-controls="nav-overlay" data-burger><span class="burger-t">Menu</span><span class="burger-i" aria-hidden="true"><i></i><i></i></span><span class="sr">Open navigation</span></button>
  </div>
</header>
<div class="nav-ov" id="nav-overlay" data-nav hidden>
  <div class="nav-ov-bg" aria-hidden="true"></div>
  <div class="nav-ov-in" role="dialog" aria-modal="true" aria-label="Site navigation">
    <nav class="nav-ov-links" aria-label="Mobile">${[['Home', '']].concat(NAV.map(([t, h]) => [t, h])).map(([t, h]) => `<a href="${root}${h}"${(h === '' ? path === '' : path.startsWith(h)) ? ' aria-current="page"' : ''}><span>${t}</span></a>`).join('')}</nav>
    <div class="nav-ov-foot">
      <p>Yes, we’re THAT pink camper. Follow along to see where we’ll be next.</p>
      <div class="nav-ov-soc"><a href="${IG}" target="_blank" rel="noopener">${ico.ig}Instagram</a><a href="${FB}" target="_blank" rel="noopener">${ico.fb}Facebook</a><a href="mailto:${EMAIL}">${ico.mail}Email us</a></div>
    </div>
  </div>
</div>`;
}

export function footer(root) {
  return `<footer class="ftr">
  <div class="ftr-top wrap">
    <div class="ftr-brand">
      <img src="${root}assets/img/logo-240.png" alt="The Dirty Yeti, Dirty Soda Co." width="240" height="230" loading="lazy">
      <p class="ftr-tag">Mobile dirty soda co. in Indiana. Dirty sodas, energy drinks and lemonades, served from THAT pink camper.</p>
    </div>
    <div class="ftr-cols">
      <div><p class="lbl">Explore</p><a href="${root}">Home</a><a href="${root}menu/">Menu</a><a href="${root}find-us/">Find us</a><a href="${root}events/">Events</a><a href="${root}about/">About</a></div>
      <div><p class="lbl">The menu</p><a href="${root}menu/#soda">Soda · $6</a><a href="${root}menu/#energy">Energy · $8</a><a href="${root}menu/#lemonade">Lemonade · $10</a><a href="${root}menu/jack-frost/">Jack Frost</a></div>
      <div><p class="lbl">Follow along</p><a href="${IG}" target="_blank" rel="noopener">${ico.ig}Instagram</a><a href="${FB}" target="_blank" rel="noopener">${ico.fb}Facebook</a></div>
      <div class="ftr-mail"><p class="lbl">Email</p><a href="mailto:${EMAIL}">${ico.mail}<span>thedirtyyeti.<wbr>dirtysodaco<wbr>@gmail.com</span></a></div>
    </div>
  </div>
  <div class="ftr-word" aria-hidden="true"><span>The Dirty Yeti</span></div>
  <div class="ftr-bot wrap"><p>© <span data-year>2026</span> The Dirty Yeti · Dirty Soda Co. All rights reserved.</p><p>Locations change, so check <a href="${FB}" target="_blank" rel="noopener">Facebook</a> or <a href="${IG}" target="_blank" rel="noopener">Instagram</a> before you head out.</p></div>
</footer>`;
}

export function scripts(root, extra = '') {
  return `<script src="${root}assets/vendor/gsap.min.js?v=${V}"></script>
<script src="${root}assets/vendor/ScrollTrigger.min.js?v=${V}"></script>
<script src="${root}assets/vendor/lenis.min.js?v=${V}"></script>
${extra}<script src="${root}assets/js/site.js?v=${V}"></script>
</body>
</html>`;
}
