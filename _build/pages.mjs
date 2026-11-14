import { SITE, EMAIL, IG, IG_HANDLE, FB, V, CATS, DRINKS, DROP, FEATURED, RECENT_STOP } from './data.mjs';
import { esc, pic, ico, btn, head, header, footer, scripts } from './shell.mjs';
import { cup } from './cup.mjs';

const byId = id => DRINKS.find(d => d.id === id) || (id === DROP.id ? DROP : null);
const catOf = d => CATS.find(c => c.id === d.cat);
const priceOf = d => d.seasonal ? 'New' : '$' + catOf(d).price;
const sizeOf = d => d.seasonal ? 'Seasonal' : catOf(d).size;
const tagsOf = (d, max = 3) => {
  if (d.unread || d.seasonal) return `<span class="tag tag-ask">Ask at the window</span>`;
  const t = d.ing.slice(0, max).map(i => `<span class="tag">${esc(i)}</span>`);
  const more = d.ing.length - max + (d.partial ? 1 : 0);
  if (d.ing.length > max) t.push(`<span class="tag tag-more">+${d.ing.length - max} more</span>`);
  else if (d.partial) t.push(`<span class="tag tag-more">+ more</span>`);
  return t.join('');
};
const card = (root, d, { href, uid = '', cls = '' } = {}) => `<a class="dcard ${cls}" href="${href}" data-drink="${d.id}" style="--tint:${d.cup && d.tint}">
  <span class="dcard-cup">${cup(d, { root, uid })}</span>
  <span class="dcard-meta"><span class="dcard-size">${sizeOf(d)}</span><span class="dcard-price">${priceOf(d)}</span></span>
  <span class="dcard-name">${esc(d.name)}</span>
  <span class="dcard-tags">${tagsOf(d)}</span>
</a>`;
const split = s => s; // words are split client-side ([data-split])
const marquee = (names, cls = '') => `<div class="mq ${cls}" aria-hidden="true"><div class="mq-track">${[0, 1].map(() => `<div class="mq-set">${names.map(n => `<span>${esc(n)}</span>${ico.spark}`).join('')}</div>`).join('')}</div></div>`;

/* ---------------- HOME ---------------- */
export function home() {
  const root = '';
  const feat = FEATURED.map(byId);
  const yeti = byId('the-yeti'), pinkity = byId('pinkity-drinkity'), cherry = byId('cherry-float');
  const build = { ...byId('butter-me-up'), id: 'build' }; build.cup = { ...build.cup, base: '#4a1219' };
  const en = ['malibu-barbie', 'blue-voltage', 'princess-peach'].map(byId), le = ['sunset', 'gone-fishing', 'jolly-rancher'].map(byId);
  return head({ root, title: 'The Dirty Yeti · Dirty Soda Co. | Yes, we’re THAT pink camper', desc: 'The Dirty Yeti is a mobile dirty soda co. in Indiana. Dirty sodas, energy drinks and lemonades from THAT pink camper. Follow along to see where we’ll be next.', path: '', body: 'p-home' }) + header(root, '') + `
<main id="main">
  <section class="hero" data-hero>
    <div class="hero-pin">
      <div class="hero-bg" aria-hidden="true"><i></i><i></i><i></i></div>
      <div class="hero-copy">
        <p class="hero-kick" data-rise>Mobile dirty soda co. · Indiana</p>
        <h1 class="hero-h"><span class="l l1"><span data-split>Yes, we’re</span></span><span class="l l2"><span data-split>THAT</span><svg class="squig" viewBox="0 0 300 30" aria-hidden="true" preserveAspectRatio="none"><path d="M4 18 C 40 4, 70 28, 104 15 S 170 4, 204 16 S 262 28, 296 10" fill="none" stroke="currentColor" stroke-width="7" stroke-linecap="round"/></svg></span><span class="l l3"><span data-split>pink camper.</span></span></h1>
        <div class="hero-ctas" data-rise>${btn('menu/', 'See the menu', { cls: 'btn-cream' })}${btn('find-us/', 'Find the camper', { cls: 'btn-line', icon: ico.pin, iconFirst: true })}</div>
      </div>
      <div class="hero-media" data-hero-media>
        <div class="hero-frame">${pic(root, 'cover', 'The pink Dirty Yeti camper with a row of dirty sodas lined up in front and smiling staff at the order windows', { sizes: '(min-width: 900px) 60vw, 100vw', eager: true })}</div>
        <span class="hero-cup hc1" data-float>${cup(yeti, { root, uid: 'h' })}</span>
        <span class="hero-cup hc2" data-float>${cup(pinkity, { root, uid: 'h' })}</span>
        <span class="hero-cup hc3" data-float>${cup(cherry, { root, uid: 'h' })}</span>
        <p class="hero-chip"><span class="dot"></span>Order at the window</p>
      </div>
    </div>
  </section>

  ${marquee(DRINKS.filter(d => d.cat === 'soda').map(d => d.name), 'mq-ink')}

  <section class="feat sec" aria-labelledby="feat-h">
    <div class="wrap sec-head">
      <div><p class="eyebrow">24 oz · $6</p><h2 id="feat-h" class="h2" data-split>The soda lineup.</h2></div>
      <p class="sec-sub" data-rise>Dr Pepper, Coke, root beer and more, mixed with syrups and cream. Tap a cup to see what’s in it.</p>
    </div>
    <div class="rail" data-rail>
      <div class="rail-track" data-rail-track>${feat.map(d => card(root, d, { href: `menu/#${d.id}`, uid: 'f' })).join('')}
        <a class="dcard dcard-all" href="menu/"><span class="all-t">See all twelve sodas</span><span class="all-i">${ico.arrow}</span><span class="all-s">Plus energy drinks and lemonades</span></a>
      </div>
    </div>
    <div class="wrap rail-foot"><div class="rail-bar" aria-hidden="true"><i data-rail-bar></i></div>${btn('menu/', 'Full menu', { cls: 'btn-ink btn-sm' })}</div>
  </section>

  <section class="build" data-build aria-labelledby="build-h">
    <div class="build-pin">
      <div class="build-copy">
        <p class="eyebrow">What’s a dirty soda?</p>
        <h2 id="build-h" class="h2">Soda, plus syrup, plus cream.</h2>
        <p class="build-sub">Here’s <b>Butter Me Up</b>, built the way it’s written on the board.</p>

      </div>
      <ol class="build-steps" data-build-steps>
          <li><span class="bs-dot" style="--c:#4a1219"></span><b>Dr Pepper</b><span>The base, poured over ice.</span></li>
          <li><span class="bs-dot" style="--c:#b97a45"></span><b>Cookie Butter</b><span>The flavor goes in.</span></li>
          <li><span class="bs-dot" style="--c:#fff3e4"></span><b>Half n Half</b><span>The cream makes it dirty.</span></li>
          <li><span class="bs-dot" style="--c:#f7e3c8"></span><b>Cold Foam</b><span>Finished on top.</span></li>
        </ol>
      <div class="build-cup" data-build-cup>${cup(build, { root, uid: 'b', size: 'xl' })}<p class="build-tag">Butter Me Up · 24 oz · $6</p></div>
    </div>
  </section>

  <section class="nyt" aria-labelledby="nyt-h">
    <h2 id="nyt-h" class="nyt-h" data-nyt><span class="w w1">Soda</span><span class="w w2">not your</span><span class="w w3">thing?</span></h2>
    <p class="nyt-sub" data-rise>No problem. There’s a whole other side of the board.</p>
    <div class="nyt-tiles wrap">
      <a class="nyt-tile t-energy" href="menu/#energy" data-tilt>
        <span class="nt-cups">${en.map((d, i) => `<span class="nt-cup n${i}">${cup(d, { root, uid: 'n' })}</span>`).join('')}</span>
        <span class="nt-t"><span class="nt-k">24 oz · $8</span><span class="nt-h">Energy</span><span class="nt-s">Alani and Red Bull, from Princess Peach to Blue Voltage.</span></span>
        <span class="nt-go">${ico.arrow}</span>
      </a>
      <a class="nyt-tile t-lemon" href="menu/#lemonade" data-tilt>
        <span class="nt-cups">${le.map((d, i) => `<span class="nt-cup n${i}">${cup(d, { root, uid: 'n' })}</span>`).join('')}</span>
        <span class="nt-t"><span class="nt-k">32 oz · $10</span><span class="nt-h">Lemonade</span><span class="nt-s">Big ones, from Sunset to Strawberry Shortcake.</span></span>
        <span class="nt-go">${ico.arrow}</span>
      </a>
    </div>
  </section>

  <section class="drop" aria-labelledby="drop-h">
    <div class="snow" aria-hidden="true">${Array.from({ length: 26 }, (_, i) => `<i style="--x:${(i * 37) % 100}%;--d:${6 + (i * 7) % 9}s;--dl:-${(i * 13) % 11}s;--s:${3 + (i * 5) % 6}px"></i>`).join('')}</div>
    <div class="wrap drop-in">
      <div class="drop-cup" data-float>${cup(DROP, { root, uid: 'd', size: 'xl' })}</div>
      <div class="drop-copy">
        <p class="badge-new">${ico.spark}New on the board</p>
        <h2 id="drop-h" class="drop-h" data-split>Jack Frost</h2>
        <p class="drop-sub" data-rise>The newest seasonal drink from the camper. Ask at the window what’s in it.</p>
        <div data-rise>${btn('menu/#jack-frost', 'See it on the menu', { cls: 'btn-ink' })}</div>
      </div>
    </div>
  </section>

  <section class="strip sec" aria-labelledby="strip-h">
    <div class="wrap sec-head"><div><p class="eyebrow">From the window</p><h2 id="strip-h" class="h2" data-split>Fresh from the camper.</h2></div>${btn(IG, IG_HANDLE, { cls: 'btn-line-ink btn-sm', icon: ico.ig, iconFirst: true, ext: true })}</div>
    <div class="strip-row" data-strip>
      <figure class="ph ph-a">${pic(root, 'drink-1', 'A blue and white swirled drink topped with whipped cream and blue sprinkles, with a Dirty Yeti sticker on the cup', { sizes: '(min-width: 900px) 30vw, 72vw' })}</figure>
      <figure class="ph ph-b">${pic(root, 'truck-1', 'The pink Dirty Yeti camper with its order window open and the menu boards on the side', { sizes: '(min-width: 900px) 30vw, 72vw' })}</figure>
      <figure class="ph ph-c">${pic(root, 'drink-4', 'A caramel-drizzled drink with a pink straw held up in front of the camper’s menu boards', { sizes: '(min-width: 900px) 30vw, 72vw' })}</figure>
      <figure class="ph ph-d">${pic(root, 'drink-2', 'A hot drink in a pink cup topped with whipped cream, chocolate and crushed peppermint', { sizes: '(min-width: 900px) 30vw, 72vw' })}</figure>
      <figure class="ph ph-e">${pic(root, 'drink-3', 'A hot drink in a pink cup topped with whipped cream and cookie crumbles', { sizes: '(min-width: 900px) 30vw, 72vw' })}</figure>
    </div>
  </section>

  <section class="follow wrap" aria-labelledby="follow-h">
    <div class="follow-card">
      <div class="follow-copy">
        <p class="eyebrow">Where’s the camper?</p>
        <h2 id="follow-h" class="h2" data-split>We move around.</h2>
        <p class="follow-q" data-rise>“Follow us to see where we’ll be next and to keep up with your newest obsession!”</p>
        <div class="follow-btns" data-rise>${btn(FB, 'Facebook', { cls: 'btn-ink', icon: ico.fb, iconFirst: true, ext: true })}${btn(IG, 'Instagram', { cls: 'btn-cream', icon: ico.ig, iconFirst: true, ext: true })}</div>
      </div>
      <a class="follow-last" href="find-us/" data-tilt>
        <span class="fl-k">Recent stop</span>
        <span class="fl-p">${RECENT_STOP.place}</span>
        <span class="fl-a">${ico.pin}${RECENT_STOP.addr}</span>
        <span class="fl-a">${ico.clock}<span>${RECENT_STOP.when}<br>${RECENT_STOP.hours}</span></span>
        <span class="fl-go">How finding us works ${ico.arrow}</span>
      </a>
    </div>
  </section>

  <section class="book" aria-labelledby="book-h">
    <div class="wrap book-in">
      <h2 id="book-h" class="book-h" data-split>Want THAT pink camper at your event?</h2>
      <div class="book-r" data-rise><p>Email us with the date, the place and what you’re planning.</p>${btn(`mailto:${EMAIL}?subject=${encodeURIComponent('The pink camper at our event')}`, 'Email us', { cls: 'btn-pink', icon: ico.mail, iconFirst: true })}<a class="ul-link" href="events/">More about events</a></div>
    </div>
  </section>
</main>
` + footer(root) + scripts(root);
}

/* ---------------- MENU ---------------- */
export function menu() {
  const root = '../';
  const data = [...DRINKS, DROP].map(d => ({ id: d.id, name: d.name, cat: d.cat, ing: d.ing, partial: !!d.partial, unread: !!d.unread, seasonal: !!d.seasonal, tint: d.tint, size: sizeOf(d), price: priceOf(d), label: d.seasonal ? 'New' : catOf(d).label }));
  return head({ root, title: 'Menu · The Dirty Yeti', desc: 'The Dirty Yeti menu: 24 oz dirty sodas $6, 24 oz energy drinks $8 and 32 oz lemonades $10. Every flavor and what goes in it.', path: 'menu/', body: 'p-menu' }) + header(root, 'menu/') + `
<main id="main">
  <section class="phero phero-menu">
    <div class="wrap">
      <p class="eyebrow eb-cream" data-rise>Order at the window</p>
      <h1 class="ph-h" data-split>The menu.</h1>
      <ul class="sizes" data-rise>${CATS.map(c => `<li><b>${c.label}</b><span>${c.size}</span><em>$${c.price}</em></li>`).join('')}</ul>
    </div>
    ${marquee([...DRINKS].map(d => d.name).filter((_, i) => i % 2 === 0), 'mq-pink')}
  </section>

  <section class="wrap dropbar-w">
    <a class="dropbar" href="#jack-frost" data-drink="jack-frost">
      <span class="db-cup">${cup(DROP, { root, uid: 'm' })}</span>
      <span class="db-t"><span class="badge-new">${ico.spark}New</span><span class="db-h">Jack Frost</span><span class="db-s">Our newest seasonal drink. Tap for the details.</span></span>
      <span class="db-go">${ico.chev}</span>
    </a>
  </section>

  <div class="tabs-w" data-tabs-w>
    <div class="tabs wrap" role="tablist" aria-label="Menu categories" data-tabs>
      ${CATS.map((c, i) => `<button role="tab" id="tab-${c.id}" aria-controls="p-${c.id}" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}" data-tab="${c.id}"><span>${c.label}</span><em>$${c.price}</em></button>`).join('')}
      <span class="tab-ink" data-tab-ink aria-hidden="true"></span>
    </div>
  </div>

  ${CATS.map((c, i) => {
    const list = DRINKS.filter(d => d.cat === c.id);
    return `<section class="panel" id="p-${c.id}" role="tabpanel" aria-labelledby="tab-${c.id}" data-panel="${c.id}"${i ? ' hidden' : ''}>
    <div class="wrap panel-head"><h2 class="h2">${c.label}</h2><p><b>${c.size} · $${c.price}</b> ${c.blurb}</p></div>
    <div class="rail rail-menu" data-rail><div class="rail-track grid" data-rail-track>${list.map(d => card(root, d, { href: `#${d.id}`, uid: 'm' })).join('')}</div></div>
    <div class="wrap rail-foot rail-foot-m"><div class="rail-bar" aria-hidden="true"><i data-rail-bar></i></div><p class="swipe-hint">Swipe for more</p></div>
    <div class="wrap"><ul class="mlist">${list.map(d => `<li><a href="#${d.id}" data-drink="${d.id}"><span class="ml-sw" style="--a:${d.cup.layers[0]};--b:${d.cup.layers[2]}"></span><span class="ml-t"><b>${esc(d.name)}</b><span>${d.unread ? 'Ask at the window' : esc(d.ing.join(' · ')) + (d.partial ? ' · and more' : '')}</span></span>${ico.chev}</a></li>`).join('')}</ul></div>
  </section>`;
  }).join('')}

  <section class="wrap menu-note">
    <p>Prices and flavors are from the menu board on the camper. Pickup is at the window wherever we’re parked.</p>
    ${btn('../find-us/', 'Where we’ll be next', { cls: 'btn-ink', icon: ico.pin, iconFirst: true })}
  </section>
</main>

<div class="sheet" data-sheet hidden>
  <div class="sheet-scrim" data-sheet-close></div>
  <div class="sheet-panel" role="dialog" aria-modal="true" aria-labelledby="sheet-name" tabindex="-1" data-sheet-panel>
    <div class="sheet-grab" data-sheet-grab><i></i></div>
    <button class="sheet-x" type="button" aria-label="Close" data-sheet-close>${ico.close}</button>
    <div class="sheet-art" data-sheet-art></div>
    <div class="sheet-body">
      <p class="sheet-k"><span data-sheet-cat></span><span data-sheet-size></span></p>
      <h2 class="sheet-name" id="sheet-name" data-sheet-name></h2>
      <p class="sheet-price" data-sheet-price></p>
      <h3 class="sheet-lbl">What’s in it</h3>
      <ul class="sheet-build" data-sheet-build></ul>
      <p class="sheet-note" data-sheet-note></p>
      <div class="sheet-foot">
        <p class="sheet-order">${ico.cup}Order at the window. No online ordering.</p>
        <div class="sheet-nav"><button type="button" data-sheet-prev aria-label="Previous drink">${ico.chev}</button><button type="button" data-sheet-next aria-label="Next drink">${ico.chev}</button></div>
      </div>
    </div>
  </div>
</div>
${[...DRINKS, DROP].map(d => `<template id="cup-${d.id}">${cup(d, { root, uid: 's', size: 'xl' })}</template>`).join('')}
<script>window.DY_MENU=${JSON.stringify(data)};</script>
` + footer(root) + scripts(root);
}

/* ---------------- FIND US ---------------- */
export function findUs() {
  const root = '../';
  const s = RECENT_STOP;
  return head({ root, title: 'Find us · The Dirty Yeti', desc: 'The Dirty Yeti is a mobile dirty soda camper, so our stops change. Follow us on Facebook and Instagram to see where we’ll be next.', path: 'find-us/', body: 'p-find' }) + header(root, 'find-us/') + `
<main id="main">
  <section class="phero phero-find">
    <div class="wrap">
      <p class="eyebrow eb-cream" data-rise>Where’s the camper?</p>
      <h1 class="ph-h" data-split>Follow the pink.</h1>
      <p class="ph-sub" data-rise>We’re a camper, so we move around. Follow us to see where we’ll be next and to keep up with your newest obsession.</p>
      <div class="ph-btns" data-rise>${btn(FB, 'Facebook', { cls: 'btn-ink', icon: ico.fb, iconFirst: true, ext: true })}${btn(IG, 'Instagram', { cls: 'btn-cream', icon: ico.ig, iconFirst: true, ext: true })}</div>
    </div>
  </section>

  <section class="how wrap sec" aria-labelledby="how-h">
    <h2 id="how-h" class="h2" data-split>How finding us works.</h2>
    <div class="how-grid">
      <article class="how-c" data-rise><span class="how-i">${ico.fb}</span><h3>Check our page</h3><p>We post where the camper will be on Facebook and Instagram, usually as a schedule for the week.</p></article>
      <article class="how-c" data-rise><span class="how-i">${ico.pin}</span><h3>Look for the pink</h3><p>You can’t miss it. The camper is pink, and so is pretty much everything else.</p></article>
      <article class="how-c" data-rise><span class="how-i">${ico.cup}</span><h3>Order at the window</h3><p>Pick a flavor from the board, order at the window and walk away with your drink.</p></article>
    </div>
  </section>

  <section class="recent wrap sec" aria-labelledby="recent-h">
    <div class="recent-card">
      <div class="recent-copy">
        <p class="eyebrow">Recent stop</p>
        <h2 id="recent-h" class="h2">${s.place}, Crawfordsville</h2>
        <ul class="recent-list"><li>${ico.pin}<span>${s.addr}</span></li><li>${ico.clock}<span>${s.when}<br>${s.hours}</span></li></ul>
        <p class="recent-note">This is where we were recently, not a permanent spot. Stops change, so check Facebook before you head out.</p>
        ${btn(FB, 'See this week on Facebook', { cls: 'btn-ink btn-sm', ext: true })}
      </div>
      <div class="recent-pics">
        <figure data-tilt>${pic(root, 'schedule-1', 'The Dirty Yeti schedule for November 10 to 14: Walmart, 1835 US 231, Crawfordsville, 11 AM to 5 PM each day', { sizes: '(min-width: 900px) 24vw, 46vw' })}</figure>
        <figure data-tilt>${pic(root, 'schedule-2', 'The Dirty Yeti schedule for November 4 to 7: Walmart, 1835 US 231, Crawfordsville, 11 AM to 5 PM each day', { sizes: '(min-width: 900px) 24vw, 46vw' })}</figure>
        <figcaption>Recent weekly schedules, as posted on our Facebook page.</figcaption>
      </div>
    </div>
  </section>

  <section class="follow-big" aria-label="Follow The Dirty Yeti">
    <a class="fb-row" href="${FB}" target="_blank" rel="noopener"><span class="fb-i">${ico.fb}</span><span class="fb-t">Facebook</span><span class="fb-s">The Dirty Yeti</span>${ico.arrow}</a>
    <a class="fb-row" href="${IG}" target="_blank" rel="noopener"><span class="fb-i">${ico.ig}</span><span class="fb-t">Instagram</span><span class="fb-s">${IG_HANDLE}</span>${ico.arrow}</a>
  </section>
</main>
` + footer(root) + scripts(root);
}

/* ---------------- EVENTS ---------------- */
export function events() {
  const root = '../';
  return head({ root, title: 'Events · The Dirty Yeti', desc: 'Want THAT pink camper at your event? Email The Dirty Yeti with the details.', path: 'events/', body: 'p-events' }) + header(root, 'events/') + `
<main id="main">
  <section class="phero phero-events">
    <div class="wrap ev-hero">
      <div>
        <p class="eyebrow eb-cream" data-rise>Events</p>
        <h1 class="ph-h ph-h-sm" data-split>Want the pink camper at your event?</h1>
        <p class="ph-sub" data-rise>Email us and tell us about it. A few details up front make it easy to answer.</p>
        <div class="ph-btns" data-rise>${btn(`mailto:${EMAIL}?subject=${encodeURIComponent('The pink camper at our event')}`, 'Email us', { cls: 'btn-ink', icon: ico.mail, iconFirst: true })}</div>
      </div>
      <figure class="ev-photo" data-tilt>${pic(root, 'truck-1', 'The pink Dirty Yeti camper parked with its window open', { sizes: '(min-width: 900px) 40vw, 90vw', eager: true })}</figure>
    </div>
  </section>

  <section class="wrap sec ev-form-w" aria-labelledby="ev-h">
    <div class="ev-side">
      <h2 id="ev-h" class="h2" data-split>Start the email here.</h2>
      <p>Fill in what you know and we’ll open your email app with it all written out. Nothing is sent until you press send.</p>
      <p class="ev-or">Or email us directly at<br><a href="mailto:${EMAIL}">thedirtyyeti.<wbr>dirtysodaco<wbr>@gmail.com</a></p>
    </div>
    <form class="ev-form" data-evform novalidate>
      <label><span>Your name</span><input name="name" autocomplete="name" required></label>
      <label><span>Kind of event</span><input name="kind" placeholder="Birthday, school, work party…"></label>
      <div class="ev-2"><label><span>Date</span><input name="date" type="date"></label><label><span>Rough headcount</span><input name="count" inputmode="numeric" placeholder="About how many?"></label></div>
      <label><span>Where</span><input name="where" placeholder="Town or address"></label>
      <label><span>Anything else</span><textarea name="notes" rows="4" placeholder="Times, parking, questions"></textarea></label>
      <button class="btn btn-pink" type="submit" data-magnetic><span class="btn-in">${ico.mail}<span class="btn-t" data-text="Open my email">Open my email</span></span></button>
      <p class="ev-fine">Opens your email app, addressed to ${EMAIL}.</p>
    </form>
  </section>
</main>
<script>window.DY_EMAIL=${JSON.stringify(EMAIL)};</script>
` + footer(root) + scripts(root);
}

/* ---------------- ABOUT ---------------- */
export function about() {
  const root = '../';
  return head({ root, title: 'About · The Dirty Yeti', desc: 'The Dirty Yeti is a mobile dirty soda co. in Indiana, serving from THAT pink camper.', path: 'about/', body: 'p-about' }) + header(root, 'about/') + `
<main id="main">
  <section class="phero phero-about">
    <div class="wrap ab-hero">
      <div>
        <p class="eyebrow eb-cream" data-rise>About</p>
        <h1 class="ph-h ph-h-ab" data-split>Mobile dirty soda co.</h1>
        <p class="ph-sub" data-rise>The Dirty Yeti serves dirty sodas, energy drinks and lemonades out of a pink camper in Indiana.</p>
      </div>
      <img class="ab-logo" src="${root}assets/img/logo-640.png" alt="The Dirty Yeti logo: a grinning white yeti holding a pink soda" width="640" height="612" data-float>
    </div>
  </section>

  <section class="wrap sec ab-split">
    <figure class="ab-ph" data-tilt>${pic(root, 'cover', 'The pink camper with dirty sodas lined up in front', { sizes: '(min-width: 900px) 50vw, 100vw' })}</figure>
    <div class="ab-copy">
      <h2 class="h2" data-split>Yes, we’re THAT pink camper.</h2>
      <p data-rise>If you’ve spotted a pink camper with a yeti on the side, that was us. We park, open the window and start pouring.</p>
      <p data-rise>We don’t stay in one place, so the best way to find us is to follow along on <a href="${FB}" target="_blank" rel="noopener">Facebook</a> and <a href="${IG}" target="_blank" rel="noopener">Instagram</a>.</p>
    </div>
  </section>

  <section class="ab-what">
    <div class="wrap ab-what-in">
      <h2 class="h2" data-split>So what’s a dirty soda?</h2>
      <div class="ab-what-grid">
        <p data-rise>A dirty soda is a soda that’s been mixed up: flavored syrups, plus cream or creamer, sometimes finished with cold foam or whipped cream.</p>
        <p data-rise>Ours start with sodas like Dr Pepper, Coke, root beer, cream soda and Sprite. If soda isn’t your thing, we also do energy drinks and lemonades.</p>
      </div>
      <ul class="ab-cats">${CATS.map(c => `<li data-rise><a href="${root}menu/#${c.id}"><b>${c.label}</b><span>${c.size} · $${c.price}</span>${ico.arrow}</a></li>`).join('')}</ul>
    </div>
  </section>

  <section class="wrap sec ab-yeti">
    <div class="ab-yeti-card">
      <img src="${root}assets/img/logo-240.png" alt="" width="240" height="230" loading="lazy">
      <div><h2 class="h2">About the yeti.</h2><p>He’s on the side of the camper and on every cup. He’s holding a soda and he looks thrilled about it.</p></div>
    </div>
  </section>

  <section class="book">
    <div class="wrap book-in">
      <h2 class="book-h" data-split>Come find the pink camper.</h2>
      <div class="book-r" data-rise><p>Check where we’ll be next, or see what’s on the board.</p>${btn('../find-us/', 'Find us', { cls: 'btn-pink', icon: ico.pin, iconFirst: true })}<a class="ul-link" href="../menu/">See the menu</a></div>
    </div>
  </section>
</main>
` + footer(root) + scripts(root);
}

/* ---------------- 404 ---------------- */
export function notFound() {
  const root = '/dirty-yeti/';
  return head({ root, title: 'Page not found · The Dirty Yeti', desc: 'This page wandered off.', path: '404.html', body: 'p-404' }) + header(root, '404') + `
<main id="main" class="nf">
  <div class="nf-cup">${cup(byId('cherry-float'), { root, uid: 'x', size: 'xl' })}</div>
  <h1 class="ph-h" data-split>This yeti wandered off.</h1>
  <p>We couldn’t find that page. The camper moves around, but the menu stays put.</p>
  <div class="ph-btns">${btn(root, 'Back home', { cls: 'btn-ink' })}${btn(root + 'menu/', 'See the menu', { cls: 'btn-cream' })}</div>
</main>
` + footer(root) + scripts(root);
}
