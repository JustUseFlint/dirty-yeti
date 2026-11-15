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
    <div class="hero-bg" aria-hidden="true"><i></i><i></i><i></i></div>
    <div class="hero-in wrap">
      <div class="hero-copy">
        <p class="hero-kick" data-rise>Mobile dirty soda co. · Indiana</p>
        <h1 class="hero-h"><span class="l l1"><span data-split>Yes, we’re</span></span><span class="l l2"><span data-split>THAT</span><svg class="squig" viewBox="0 0 300 30" aria-hidden="true" preserveAspectRatio="none"><path d="M4 18 C 40 4, 70 28, 104 15 S 170 4, 204 16 S 262 28, 296 10" fill="none" stroke="currentColor" stroke-width="7" stroke-linecap="round"/></svg></span><span class="l l3"><span data-split>pink camper.</span></span></h1>
        <p class="hero-sub" data-rise>Dirty sodas, energy drinks and lemonades, poured at the window of a pink camper. Follow along to see where we’ll be next.</p>
        <div class="hero-ctas" data-rise>${btn('menu/', 'See the menu', { cls: 'btn-cream' })}${btn('find-us/', 'Find the camper', { cls: 'btn-line', icon: ico.pin, iconFirst: true })}</div>
      </div>
      <div class="hero-media" data-hero-media>
        <figure class="hero-frame">${pic(root, 'cover', 'The pink Dirty Yeti camper with a row of dirty sodas lined up in front and smiling staff at the order windows', { sizes: '(min-width: 900px) 52vw, 92vw', eager: true })}</figure>
        <a class="hero-cup hc1" href="menu/the-yeti/" aria-label="The Yeti">${cup(yeti, { root, uid: 'h' })}</a>
        <a class="hero-cup hc2" href="menu/pinkity-drinkity/" aria-label="Pinkity Drinkity">${cup(pinkity, { root, uid: 'h' })}</a>
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
      <div class="fgrid">${feat.map(d => card(root, d, { href: `menu/${d.id}/`, uid: 'f' })).join('')}</div>
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
        <div data-rise>${btn('menu/jack-frost/', 'More about Jack Frost', { cls: 'btn-ink' })}</div>
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
const mcard = (root, d) => `<a class="mcard" href="${d.id}/" style="--tint:${d.tint}">
  <span class="mcard-art">${cup(d, { root, uid: 'm' })}</span>
  <span class="mcard-body">
    <span class="mcard-top"><span class="mcard-name">${esc(d.name)}</span><span class="mcard-price">${priceOf(d)}</span></span>
    ${d.unread ? `<span class="mcard-ask">Ask at the window for what goes in this one.</span>`
      : `<span class="mcard-ing">${d.ing.map(i => `<span>${esc(i)}</span>`).join('')}${d.partial ? '<span class="more">and more</span>' : ''}</span>`}
    <span class="mcard-go">Details ${ico.arrow}</span>
  </span>
</a>`;
export function menu() {
  const root = '../';
  return head({ root, title: 'Menu · The Dirty Yeti', desc: 'The Dirty Yeti menu: 24 oz dirty sodas $6, 24 oz energy drinks $8 and 32 oz lemonades $10. Every flavor and what goes in it.', path: 'menu/', body: 'p-menu' }) + header(root, 'menu/') + `
<script>(function(){var h=decodeURIComponent(location.hash.slice(1));var ids=${JSON.stringify([...DRINKS, DROP].map(d => d.id))};if(ids.indexOf(h)>-1)location.replace(h+'/');})()</script>
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
      <a href="#new" data-jump-link="new">New: Jack Frost</a>
    </div>
  </nav>

  <section class="wrap new-w" aria-label="New on the board">
    <a class="newbanner" id="new" href="jack-frost/">
      <div class="nb-cup">${cup(DROP, { root, uid: 'm' })}</div>
      <div class="nb-copy">
        <p class="badge-new">${ico.spark}New on the board</p>
        <span id="jack-frost-h" class="nb-h">Jack Frost</span>
        <p>Our newest seasonal drink. Ask at the window for what’s in it and the price.</p>
        <span class="mcard-go">Details ${ico.arrow}</span>
      </div>
    </a>
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
      <h1 class="ph-h" data-split>Follow the yeti</h1>
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

/* ---------------- DRINK DETAIL ---------------- */
const SODA_BASES = ['Dr Pepper', 'Coke', 'Rootbeer', 'Red Cream Soda', 'Cream Soda', 'Sprite', 'Sprite/Lemonade'];
const CREAMS = ['Half n Half', 'Cream', 'Coconut Creme'];
const TOPS = ['Cold Foam', 'Whipped Cream', 'Marshmallow Fluff'];
const roleOf = (d, ing, i) => {
  if (i === 0 && (SODA_BASES.includes(ing) || /^Alani |Red ?Bull/.test(ing))) return 'Base';
  if (CREAMS.includes(ing)) return 'Cream';
  if (TOPS.includes(ing)) return 'Topping';
  return 'Flavor';
};
const lc = x => /^(Alani|Dr Pepper|Coke|Sprite)|Red ?Bull/.test(x) ? x.replace('Sprite/Lemonade', 'Sprite and lemonade') : x.toLowerCase().replace('rootbeer', 'root beer');
const list = a => a.length < 2 ? a.join('') : a.slice(0, -1).join(', ') + ' and ' + a[a.length - 1];
// Plain sentences built only from the ingredient list on the menu board.
function helper(d) {
  const c = catOf(d);
  if (d.seasonal) return [`Jack Frost is the newest drink on the board, and it’s a seasonal one.`, `We haven’t listed what goes in it or the price here. Ask at the window and we’ll tell you.`];
  if (d.unread) return [`${d.name} is one of the ${c.size} sodas on the board, $${c.price}.`, `We haven’t listed what goes in this one here yet. Ask at the window for the full build.`];
  const roles = d.ing.map((x, i) => [x, roleOf(d, x, i)]);
  const base = roles.filter(r => r[1] === 'Base').map(r => lc(r[0])), fl = roles.filter(r => r[1] === 'Flavor').map(r => lc(r[0]));
  const cr = roles.filter(r => r[1] === 'Cream').map(r => lc(r[0])), tp = roles.filter(r => r[1] === 'Topping').map(r => lc(r[0]));
  const out = [];
  const what = d.cat === 'soda' ? 'dirty soda' : d.cat === 'energy' ? 'energy drink' : 'lemonade';
  let first = `${d.name} is a ${c.size} ${what}`;
  if (base.length) first += d.cat === 'energy' ? ` built on ${base[0]}` : ` that starts with ${base[0]}`;
  if (fl.length) first += `${base.length ? ',' : ''} flavored with ${list(fl)}`;
  out.push(first + '.');
  const bits = [];
  if (cr.length) bits.push(`It’s made creamy with ${list(cr)}`);
  if (tp.length) bits.push(`${cr.length ? 'and' : 'It’s'} finished with ${list(tp)}`);
  if (bits.length) out.push(bits.join(' ') + '.');
  else if (d.cat !== 'soda' && !d.partial) out.push(`No cream or toppings are listed for this one.`);
  if (d.partial) out.push(`The menu lists a little more than what’s shown here. Ask at the window for the full build.`);
  return out;
}
const ALL = [...DRINKS, DROP];
export const drinkIds = ALL.map(d => d.id);
export function drink(id) {
  const d = byId(id), root = '../../', c = d.seasonal ? null : catOf(d);
  const i = ALL.indexOf(d), prev = ALL[(i - 1 + ALL.length) % ALL.length], next = ALL[(i + 1) % ALL.length];
  const same = d.seasonal ? FEATURED.map(byId).slice(0, 4) : (() => { const l = DRINKS.filter(x => x.cat === d.cat); const k = l.indexOf(d); return [1, 2, 3, 4].map(n => l[(k + n) % l.length]); })();
  const label = d.seasonal ? 'New · Seasonal' : c.label;
  const what = d.seasonal ? 'Seasonal drink' : `${c.size} ${c.label.toLowerCase()}`;
  const desc = d.seasonal ? 'Jack Frost is the newest seasonal drink at The Dirty Yeti. Ask at the window for what’s in it.'
    : `${d.name}: a ${c.size} ${c.label.toLowerCase()} from The Dirty Yeti, $${c.price}. ${d.ing.length ? 'Made with ' + list(d.ing) + (d.partial ? ' and more' : '') + '.' : 'Ask at the window for what goes in it.'}`;
  const known = d.ing.map((x, k) => `<li class="layer" data-rise><span class="ly-dot" aria-hidden="true"></span><span class="ly-name">${esc(x)}</span><span class="ly-role">${roleOf(d, x, k)}</span></li>`).join('');
  const ask = (d.partial || d.unread || d.seasonal) ? `<li class="layer layer-ask" data-rise><span class="ly-dot" aria-hidden="true"></span><span class="ly-name">${d.partial ? 'And a little more' : 'Ask at the window'}</span><span class="ly-role">${d.partial ? 'Ask at the window' : 'Not listed yet'}</span></li>` : '';
  const pn = (x, dir) => `<a class="pn pn-${dir}" href="${root}menu/${x.id}/" style="--tint:${x.tint}"><span class="pn-k">${dir === 'prev' ? 'Previous drink' : 'Next drink'}</span><span class="pn-n">${esc(x.name)}</span><span class="pn-cup">${cup(x, { root, uid: 'p' + dir })}</span></a>`;
  return head({ root, title: `${d.name} · ${d.seasonal ? 'New' : c.label} · The Dirty Yeti`, desc, path: `menu/${d.id}/`, body: 'p-drink' }) + header(root, 'menu/') + `
<main id="main">
  <section class="dhero" style="--tint:${d.tint}">
    <div class="wrap dhero-in">
      <div class="dhero-copy">
        <nav class="crumbs" aria-label="Breadcrumb" data-rise><a href="${root}menu/">Menu</a><span aria-hidden="true">/</span>${d.seasonal ? `<a href="${root}menu/#new">New</a>` : `<a href="${root}menu/#${c.id}">${c.label}</a>`}</nav>
        <h1 class="dh-name" data-split>${esc(d.name)}</h1>
        <ul class="dh-facts" data-rise>
          <li><span>Menu</span><b>${label}</b></li>
          <li><span>Size</span><b>${d.seasonal ? 'Ask' : c.size}</b></li>
          <li><span>Price</span><b>${d.seasonal ? 'Ask' : '$' + c.price}</b></li>
        </ul>
        <div class="dh-ctas" data-rise>${btn(root + 'find-us/', 'Find the camper', { cls: 'btn-ink', icon: ico.pin, iconFirst: true })}${btn(root + 'menu/', 'Full menu', { cls: 'btn-line-ink' })}</div>
      </div>
      <div class="dhero-cup" data-pour>${cup(d, { root, uid: 'd', size: 'xl' })}</div>
    </div>
  </section>

  <section class="wrap sec dbuild" aria-labelledby="build-h">
    <div class="db-side">
      <p class="eyebrow">The build</p>
      <h2 id="build-h" class="h2" data-split>What’s in it.</h2>
      <div class="db-copy">${helper(d).map(t => `<p data-rise>${esc(t)}</p>`).join('')}</div>
    </div>
    <ol class="layers" aria-label="Ingredients, in menu order">${known}${ask}</ol>
  </section>

  <section class="dorder">
    <div class="wrap dorder-in">
      <div><h2 class="dorder-h" data-split>Order at the window.</h2><p data-rise>No online ordering. Find the camper, pick from the board and order at the window.</p></div>
      <div data-rise>${btn(root + 'find-us/', 'Find the camper', { cls: 'btn-pink', icon: ico.pin, iconFirst: true })}</div>
    </div>
  </section>

  <nav class="wrap pnav" aria-label="More drinks">${pn(prev, 'prev')}${pn(next, 'next')}</nav>

  <section class="wrap sec more" aria-labelledby="more-h">
    <div class="sec-head"><div><p class="eyebrow">${d.seasonal ? 'From the board' : c.size + ' · $' + c.price}</p><h2 id="more-h" class="h2" data-split>${d.seasonal ? 'More on the menu.' : 'More from ' + c.label + '.'}</h2></div>${btn(root + 'menu/' + (d.seasonal ? '' : '#' + c.id), d.seasonal ? 'See the menu' : 'All ' + c.label.toLowerCase(), { cls: 'btn-line-ink btn-sm' })}</div>
    <div class="fgrid fgrid-4">${same.map(x => card(root, x, { href: `${root}menu/${x.id}/`, uid: 'r' })).join('')}</div>
  </section>
</main>
` + footer(root) + scripts(root);
}

/* ---------------- ABOUT ---------------- */
export function about() {
  const root = '../';
  const sig = ['the-yeti', 'butter-me-up', 'malibu-barbie', 'love-island'].map(byId);
  const en = ['princess-peach', 'malibu-barbie', 'blue-voltage'].map(byId), le = ['sunset', 'love-island', 'gone-fishing'].map(byId);
  const mini = (d, k) => `<span class="eq-cup">${cup(d, { root, uid: k })}</span>`;
  return head({ root, title: 'About · The Dirty Yeti', desc: 'The Dirty Yeti is a mobile dirty soda co. based in Indiana, serving dirty sodas, energy drinks and lemonades from THAT pink camper.', path: 'about/', body: 'p-about' }) + header(root, 'about/') + `
<main id="main">
  <section class="ab2-hero">
    <div class="wrap ab2-hero-in">
      <div class="ab2-hero-copy">
        <p class="eyebrow eb-cream" data-rise>About The Dirty Yeti</p>
        <h1 class="ab2-h" data-split>Yes, we’re THAT pink camper.</h1>
        <p class="ph-sub" data-rise>A mobile dirty soda co. based in Indiana.</p>
      </div>
      <div class="ab2-hero-pic">
        <figure class="ab2-frame" data-rise>${pic(root, 'truck-1', 'The pink Dirty Yeti camper with its order window open, menu boards on the side and the yeti logo on the door', { sizes: '(min-width: 900px) 46vw, 92vw', eager: true })}</figure>
        <img class="ab2-badge" src="${root}assets/img/logo-240.png" alt="" width="240" height="230">
      </div>
    </div>
  </section>

  <section class="ab2-lede wrap">
    <p class="lede" data-lede>The Dirty Yeti serves dirty sodas, energy drinks and lemonades out of a pink camper. We park, open the window and start pouring. Then we move on, so the best way to find us is to follow along.</p>
  </section>

  <section class="ab2-spread wrap" aria-label="Photos from the camper">
    <figure class="sp-main" data-tilt>${pic(root, 'cover', 'The pink camper with staff at both windows and a lineup of drinks in front', { sizes: '(min-width: 900px) 62vw, 92vw' })}<figcaption>The camper, the windows and a lineup from the board.</figcaption></figure>
    <figure class="sp-a" data-tilt>${pic(root, 'drink-1', 'A blue and white swirled drink with whipped cream and blue sprinkles', { sizes: '(min-width: 900px) 28vw, 46vw' })}</figure>
    <figure class="sp-b" data-tilt>${pic(root, 'drink-4', 'A caramel-drizzled drink with a pink straw held up at the window', { sizes: '(min-width: 900px) 28vw, 46vw' })}</figure>
  </section>

  <section class="ab2-what" aria-labelledby="what-h">
    <div class="wrap ab2-what-in">
      <div class="aw-copy">
        <p class="eyebrow">The short version</p>
        <h2 id="what-h" class="h2" data-split>What’s a dirty soda?</h2>
        <p data-rise>A dirty soda is a soda mixed with flavored syrups and a splash of cream or creamer, usually over ice. Some get a topping like cold foam or whipped cream.</p>
        <p data-rise>The idea took off in Utah’s soda shops and has spread from there. Ours start with sodas like Dr Pepper, Coke, root beer, cream soda and Sprite.</p>
      </div>
      <div class="eq" aria-hidden="true" data-rise>
        <div class="eq-row"><span class="eq-t">Soda</span><span class="eq-op">+</span><span class="eq-t">Syrup</span><span class="eq-op">+</span><span class="eq-t">Cream</span></div>
        <div class="eq-cups">${mini(byId('the-yeti'), 'e1')}${mini(byId('velvet-cherry'), 'e2')}${mini(byId('butter-me-up'), 'e3')}</div>
      </div>
    </div>
  </section>

  <section class="wrap sec ab2-how" aria-labelledby="how-h">
    <h2 id="how-h" class="h2" data-split>How it works.</h2>
    <div class="how-grid">
      <article class="how-c" data-rise><span class="how-i">${ico.pin}</span><h3>Find the camper</h3><p>We move around. Check <a href="${FB}" target="_blank" rel="noopener">Facebook</a> or <a href="${IG}" target="_blank" rel="noopener">Instagram</a> to see where we’ll be.</p></article>
      <article class="how-c" data-rise><span class="how-i">${ico.cup}</span><h3>Pick from the board</h3><ul class="how-menu">${CATS.map(c => `<li><a href="${root}menu/#${c.id}"><b>${c.label}</b><span>${c.size}</span><em>$${c.price}</em></a></li>`).join('')}</ul></article>
      <article class="how-c" data-rise><span class="how-i">${ico.yeti}</span><h3>Order at the window</h3><p>Order and pick up right at the camper window. There’s no online ordering.</p></article>
    </div>
  </section>

  <section class="ab2-nyt" aria-labelledby="ab-nyt-h">
    <div class="wrap">
      <h2 id="ab-nyt-h" class="ab2-nyt-h" data-split>Soda not your thing?</h2>
      <div class="nyt-tiles">
        <a class="nyt-tile t-energy" href="${root}menu/#energy" data-tilt><span class="nt-cups">${en.map((d, i) => `<span class="nt-cup n${i}">${cup(d, { root, uid: 'an' })}</span>`).join('')}</span><span class="nt-t"><span class="nt-k">24 oz · $8</span><span class="nt-h">Energy</span><span class="nt-s">Alani and Red Bull energy drinks, mixed with flavors.</span></span><span class="nt-go">${ico.arrow}</span></a>
        <a class="nyt-tile t-lemon" href="${root}menu/#lemonade" data-tilt><span class="nt-cups">${le.map((d, i) => `<span class="nt-cup n${i}">${cup(d, { root, uid: 'al' })}</span>`).join('')}</span><span class="nt-t"><span class="nt-k">32 oz · $10</span><span class="nt-h">Lemonade</span><span class="nt-s">Lemonade mixed with flavors, in the big cup.</span></span><span class="nt-go">${ico.arrow}</span></a>
      </div>
    </div>
  </section>

  <section class="wrap sec" aria-labelledby="sig-h">
    <div class="sec-head"><div><p class="eyebrow">From the board</p><h2 id="sig-h" class="h2" data-split>A few to start with.</h2></div>${btn(root + 'menu/', 'Full menu', { cls: 'btn-line-ink btn-sm' })}</div>
    <div class="fgrid fgrid-4">${sig.map(d => card(root, d, { href: `${root}menu/${d.id}/`, uid: 's' })).join('')}</div>
  </section>

  <section class="ab2-yeti">
    <div class="wrap ab2-yeti-in">
      <img src="${root}assets/img/logo-640.png" alt="The Dirty Yeti logo: a grinning white yeti holding a pink soda topped with whipped cream and cherries" width="640" height="612" loading="lazy" data-float>
      <div>
        <p class="eyebrow">The mascot</p>
        <h2 class="h2" data-split>Meet the yeti.</h2>
        <p data-rise>He’s on the side of the camper and on every cup: a big white yeti with a wide grin, holding a pink soda with whipped cream and cherries on top. He’s the reason it’s The Dirty Yeti.</p>
        <p data-rise>And yes, there’s a drink named after him. <a href="${root}menu/the-yeti/">The Yeti</a> is Coke, vanilla, cherry and cold foam.</p>
      </div>
    </div>
  </section>

  <section class="book">
    <div class="wrap book-in">
      <h2 class="book-h" data-split>Want the yeti at your event?</h2>
      <div class="book-r" data-rise><p>Email us with the date, the place and what you’re planning.</p>${btn(`mailto:${EMAIL}?subject=${encodeURIComponent('The pink camper at our event')}`, 'Email us', { cls: 'btn-pink', icon: ico.mail, iconFirst: true })}<a class="ul-link" href="${root}events/">More about events</a></div>
    </div>
  </section>

  <section class="follow-big" aria-label="Follow The Dirty Yeti">
    <a class="fb-row" href="${FB}" target="_blank" rel="noopener"><span class="fb-i">${ico.fb}</span><span class="fb-t">Facebook</span><span class="fb-s">See where we’ll be next</span>${ico.arrow}</a>
    <a class="fb-row" href="${IG}" target="_blank" rel="noopener"><span class="fb-i">${ico.ig}</span><span class="fb-t">Instagram</span><span class="fb-s">${IG_HANDLE}</span>${ico.arrow}</a>
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
