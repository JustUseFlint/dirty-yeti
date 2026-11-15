import { SITE, EMAIL, IG, IG_HANDLE, FB, V, CATS, DRINKS, DROP, FEATURED, RECENT_STOP } from './data.mjs';
import { esc, pic, ico, btn, head, header, footer, scripts } from './shell.mjs';
import { cup } from './cup.mjs';

const byId = id => DRINKS.find(d => d.id === id) || (id === DROP.id ? DROP : null);
const catOf = d => CATS.find(c => c.id === d.cat);
const priceOf = d => d.seasonal ? 'New' : '$' + catOf(d).price;
const sizeOf = d => d.seasonal ? 'Seasonal' : catOf(d).size;
const card = (root, d, { href, uid = '', cls = '' } = {}) => `<a class="dcard ${cls}" href="${href}" style="--tint:${d.cup && d.tint}">
  <span class="dcard-cup">${cup(d, { root, uid })}</span>
  <span class="dcard-meta"><span class="dcard-size">${sizeOf(d)}</span><span class="dcard-price">${priceOf(d)}</span></span>
  <span class="dcard-name">${esc(d.name)}</span>
  <span class="dcard-ing">${d.unread || d.seasonal ? 'Ask at the window' : esc(d.ing.join(' · ')) + (d.partial ? ' · and more' : '')}</span>
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
      </div>
    </div>
  </section>

  ${marquee(DRINKS.filter(d => d.cat === 'soda').map(d => d.name), 'mq-ink')}

  <section class="feat sec" aria-labelledby="feat-h">
    <div class="wrap sec-head">
      <div><p class="eyebrow">24 oz · $6</p><h2 id="feat-h" class="h2" data-split>The soda lineup.</h2></div>
      <p class="sec-sub" data-rise>Dr Pepper, Coke, root beer and more, mixed with syrups and cream. Here are a few from the board.</p>
    </div>
    <div class="wrap">
      <div class="fgrid">${feat.map(d => card(root, d, { href: `menu/#${d.id}`, uid: 'f' })).join('')}</div>
      <div class="feat-foot" data-rise><p>Six more sodas, six energy drinks and six lemonades are on the full menu.</p>${btn('menu/', 'See the full menu', { cls: 'btn-ink' })}</div>
    </div>
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
const mcard = (root, d) => `<article class="mcard" id="${d.id}" style="--tint:${d.tint}">
  <div class="mcard-art">${cup(d, { root, uid: 'm' })}</div>
  <div class="mcard-body">
    <div class="mcard-top"><h3 class="mcard-name">${esc(d.name)}</h3><p class="mcard-price">${priceOf(d)}</p></div>
    ${d.unread ? `<p class="mcard-ask">Ask at the window for what goes in this one.</p>`
      : `<ul class="mcard-ing" aria-label="Ingredients">${d.ing.map(i => `<li>${esc(i)}</li>`).join('')}${d.partial ? '<li class="more">and more</li>' : ''}</ul>${d.partial ? `<p class="mcard-ask">The rest is on the board at the window.</p>` : ''}`}
  </div>
</article>`;
export function menu() {
  const root = '../';
  return head({ root, title: 'Menu · The Dirty Yeti', desc: 'The Dirty Yeti menu: 24 oz dirty sodas $6, 24 oz energy drinks $8 and 32 oz lemonades $10. Every flavor and what goes in it.', path: 'menu/', body: 'p-menu' }) + header(root, 'menu/') + `
<main id="main">
  <section class="phero phero-menu">
    <div class="wrap">
      <p class="eyebrow eb-cream" data-rise>Order at the window</p>
      <h1 class="ph-h" data-split>The menu.</h1>
      <p class="ph-sub" data-rise>Every drink on the board at the camper, and what goes in it.</p>
    </div>
    ${marquee([...DRINKS].map(d => d.name).filter((_, i) => i % 2 === 0), 'mq-pink')}
  </section>

  <nav class="jump" aria-label="Menu sections" data-jump>
    <div class="wrap jump-in">
      <span class="jump-l">Jump to</span>
      ${CATS.map(c => `<a href="#${c.id}" data-jump-link="${c.id}">${c.label} <em>$${c.price}</em></a>`).join('')}
      <a href="#jack-frost" data-jump-link="jack-frost">New: Jack Frost</a>
    </div>
  </nav>

  <section class="wrap new-w" aria-labelledby="jack-frost-h">
    <article class="newbanner" id="jack-frost">
      <div class="nb-cup">${cup(DROP, { root, uid: 'm' })}</div>
      <div class="nb-copy">
        <p class="badge-new">${ico.spark}New on the board</p>
        <h2 id="jack-frost-h" class="nb-h">Jack Frost</h2>
        <p>Our newest seasonal drink. Ask at the window for what’s in it and the price.</p>
      </div>
    </article>
  </section>

  ${CATS.map(c => {
    const list = DRINKS.filter(d => d.cat === c.id);
    return `<section class="msec" id="${c.id}" aria-labelledby="${c.id}-h">
    <div class="wrap">
      <header class="msec-head">
        <h2 class="h2" id="${c.id}-h" data-split>${c.label}</h2>
        <div class="msec-meta"><p class="msec-price"><b>$${c.price}</b><span>${c.size}</span></p><p>${c.blurb}</p></div>
      </header>
      <div class="mgrid">${list.map(d => mcard(root, d)).join('')}</div>
    </div>
  </section>`;
  }).join('')}

  <section class="wrap menu-note">
    <p>Prices and flavors are from the menu board on the camper. Pickup is at the window wherever we’re parked.</p>
    ${btn('../find-us/', 'Where we’ll be next', { cls: 'btn-ink', icon: ico.pin, iconFirst: true })}
  </section>
</main>
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
