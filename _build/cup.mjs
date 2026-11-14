// Illustrated cup, drawn from a drink's cup spec. Same cup for every drink so the menu reads as one set.
const INK = '#2b0b1f';
const hash = s => { let h = 2166136261; for (const c of s) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); } return h >>> 0; };
const rng = seed => () => ((seed = Math.imul(seed ^ (seed >>> 15), 2246822507) ^ Math.imul(seed ^ (seed >>> 13), 3266489909), (seed ^= seed >>> 16) >>> 0) / 4294967296);

export function cup(d, { root = '', uid = '', size = 'md', cls = '' } = {}) {
  const c = d.cup, id = (d.id + uid).replace(/[^a-z0-9-]/gi, '');
  const tall = d.cat === 'lemonade';
  const rim = tall ? 54 : 84, bot = 300;
  const xl0 = 44, xr0 = 176, xl1 = 66, xr1 = 154;           // rim and base x
  const xAt = (y, left) => { const t = (y - rim) / (bot - rim); return left ? xl0 + (xl1 - xl0) * t : xr0 + (xr1 - xr0) * t; };
  const body = `M${xl0},${rim} L${xr0},${rim} L${xr1 + 1},${bot - 10} Q${xr1},${bot} ${xr1 - 10},${bot} L${xl1 + 10},${bot} Q${xl1},${bot} ${xl1 - 1},${bot - 10} Z`;
  const r = rng(hash(d.id));
  const domed = ['whip', 'toasted', 'fluff', 'frosting'].includes(c.top);
  const surface = rim + (c.top === 'foam' || domed ? 8 : 14);
  const L = c.layers;
  const stops = c.hard
    ? [...L].reverse().map((col, i) => { const a = (i / L.length) * 100 + (i ? 3 : 0), b = ((i + 1) / L.length) * 100 - 3; return `<stop offset="${a}%" stop-color="${col}"/><stop offset="${b}%" stop-color="${col}"/>`; }).join('')
    : L.map((col, i) => `<stop offset="${(1 - i / (L.length - 1)) * 100}%" stop-color="${col}"/>`).reverse().join('');
  // marbled cream swirls
  let swirls = '';
  if (c.swirl) {
    const n = 4, span = bot - surface;
    for (let i = 0; i < n; i++) {
      const y = surface + 30 + (span - 50) * (i / (n - 1)) + (r() * 14 - 7), a = 10 + r() * 14, w = 5 + r() * 7;
      const k = r() * 40 - 20;
      swirls += `<path d="M20,${y.toFixed(1)} C${(55 + k).toFixed(1)},${(y - a).toFixed(1)} ${(85 - k).toFixed(1)},${(y + a * 1.2).toFixed(1)} ${(118 + k / 2).toFixed(1)},${(y + r() * 8 - 4).toFixed(1)} S${(175 - k).toFixed(1)},${(y - a * 0.9).toFixed(1)} 210,${(y + r() * 16 - 8).toFixed(1)}" stroke="${c.swirl}" stroke-width="${w.toFixed(1)}" stroke-linecap="round" fill="none" opacity="${(0.42 + r() * 0.3).toFixed(2)}"/>`;
    }
    for (let i = 0; i < 3; i++) {
      const x = 70 + r() * 80, y = surface + 20 + r() * (span - 60), h = 30 + r() * 40;
      swirls += `<path d="M${x.toFixed(1)},${y.toFixed(1)} c${(r() * 16 - 8).toFixed(1)},${(h / 3).toFixed(1)} ${(r() * 16 - 8).toFixed(1)},${(h * 0.66).toFixed(1)} ${(r() * 10 - 5).toFixed(1)},${h.toFixed(1)}" stroke="${c.swirl}" stroke-width="${(3 + r() * 4).toFixed(1)}" stroke-linecap="round" fill="none" opacity=".45"/>`;
    }
  }
  let ice = '';
  if (c.ice) for (let i = 0; i < 4; i++) {
    const x = 62 + i * 24 + r() * 10, y = surface + 6 + r() * 38, s = 20 + r() * 8;
    ice += `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${s.toFixed(1)}" height="${s.toFixed(1)}" rx="5" transform="rotate(${(r() * 50 - 25).toFixed(0)} ${(x + s / 2).toFixed(1)} ${(y + s / 2).toFixed(1)})" fill="#fff" fill-opacity=".22" stroke="#fff" stroke-opacity=".55" stroke-width="1.6"/>`;
  }
  let bub = '';
  if (c.bubbles) for (let i = 0; i < 9; i++) {
    const x = 70 + r() * 80, y = surface + 30 + r() * (bot - surface - 50);
    bub += `<circle class="bub" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(1.6 + r() * 2.4).toFixed(1)}" fill="#fff" fill-opacity=".55" style="--bd:${(2.4 + r() * 2.6).toFixed(2)}s;--bdl:-${(r() * 4).toFixed(2)}s"/>`;
  }
  // foam band sitting on the drink, inside the cup
  const foam = (c.top === 'foam' || domed) ? `<path d="M0,${rim - 30} H220 V${rim + 30} C190,${rim + 40} 170,${rim + 24} 140,${rim + 33} S90,${rim + 40} 60,${rim + 30} S20,${rim + 36} 0,${rim + 30} Z" fill="${c.foam || '#fff6ee'}"/><path d="M40,${rim + 31} C70,${rim + 40} 100,${rim + 26} 130,${rim + 35} S170,${rim + 38} 190,${rim + 30}" stroke="#fff" stroke-opacity=".7" stroke-width="3" fill="none"/>` : '';
  // things piled above the rim
  let pile = '';
  const cx = 110;
  if (c.top === 'whip' || c.top === 'frosting') {
    const col = c.top === 'frosting' ? '#fffaf3' : '#fffdf9';
    pile = `<g class="pile">
      <path d="M${xl0 + 4},${rim} C${xl0 - 6},${rim - 26} ${cx - 50},${rim - 30} ${cx - 34},${rim - 38} C${cx - 54},${rim - 54} ${cx - 20},${rim - 70} ${cx - 6},${rim - 62} C${cx - 14},${rim - 84} ${cx + 18},${rim - 92} ${cx + 10},${rim - 106} C${cx + 34},${rim - 92} ${cx + 30},${rim - 74} ${cx + 22},${rim - 64} C${cx + 46},${rim - 70} ${cx + 58},${rim - 50} ${cx + 38},${rim - 38} C${cx + 60},${rim - 34} ${xr0 + 8},${rim - 22} ${xr0 - 4},${rim} Z" fill="${col}" stroke="${INK}" stroke-width="2.6" stroke-linejoin="round"/>
      <path d="M${cx - 34},${rim - 38} C${cx - 10},${rim - 30} ${cx + 16},${rim - 30} ${cx + 38},${rim - 38}" stroke="${INK}" stroke-opacity=".28" stroke-width="2.2" fill="none" stroke-linecap="round"/>
      <path d="M${cx - 6},${rim - 62} C${cx + 4},${rim - 56} ${cx + 14},${rim - 58} ${cx + 22},${rim - 64}" stroke="${INK}" stroke-opacity=".28" stroke-width="2.2" fill="none" stroke-linecap="round"/>
      <path d="M${cx - 40},${rim - 14} C${cx - 30},${rim - 22} ${cx - 18},${rim - 24} ${cx - 8},${rim - 20}" stroke="#fff" stroke-width="4" fill="none" stroke-linecap="round" opacity=".9"/>
      ${c.top === 'frosting' ? `<path d="M${cx - 44},${rim - 30} l10,10 l10,-12 l10,12 l10,-12 l10,12 l10,-12 l10,10" stroke="#f6c7dc" stroke-width="3.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>` : ''}
    </g>`;
  } else if (c.top === 'fluff' || c.top === 'toasted') {
    pile = `<g class="pile">
      <path d="M${xl0 + 6},${rim} C${xl0 - 2},${rim - 22} ${cx - 44},${rim - 34} ${cx - 22},${rim - 36} C${cx - 20},${rim - 58} ${cx + 18},${rim - 60} ${cx + 22},${rim - 38} C${cx + 46},${rim - 40} ${xr0 + 4},${rim - 20} ${xr0 - 6},${rim} Z" fill="#fffdfa" stroke="${INK}" stroke-width="2.6" stroke-linejoin="round"/>
      <path d="M${cx - 30},${rim - 18} C${cx - 18},${rim - 30} ${cx - 4},${rim - 30} ${cx + 4},${rim - 24}" stroke="#fff" stroke-width="5" fill="none" stroke-linecap="round"/>
      ${c.top === 'toasted' ? `<path d="M${cx - 18},${rim - 40} c8,-8 22,-10 30,-2 c-4,6 -20,8 -30,2z M${cx + 20},${rim - 30} c10,-2 20,2 24,8 c-8,4 -20,2 -24,-8z M${cx - 50},${rim - 18} c6,-6 16,-6 22,-2 c-6,5 -16,6 -22,2z" fill="#c88746" opacity=".85"/>` : ''}
    </g>`;
  }
  const lidTop = domed ? rim - (c.top === 'whip' || c.top === 'frosting' ? 112 : 66) : rim - 6;
  const lid = domed
    ? `<path d="M${xl0 - 6},${rim + 1} C${xl0 - 8},${lidTop + 30} ${cx - 42},${lidTop} ${cx},${lidTop} C${cx + 42},${lidTop} ${xr0 + 8},${lidTop + 30} ${xr0 + 6},${rim + 1}" fill="#fff" fill-opacity=".14" stroke="${INK}" stroke-width="2.6" stroke-linejoin="round"/>
       <path d="M${cx - 44},${lidTop + 14} C${cx - 30},${lidTop + 6} ${cx - 16},${lidTop + 4} ${cx - 6},${lidTop + 4}" stroke="#fff" stroke-width="4" stroke-linecap="round" fill="none" opacity=".8"/>
       <rect x="${xl0 - 9}" y="${rim - 3}" width="${xr0 - xl0 + 18}" height="9" rx="4.5" fill="#fff" fill-opacity=".7" stroke="${INK}" stroke-width="2.6"/>`
    : `<rect x="${xl0 - 9}" y="${rim - 8}" width="${xr0 - xl0 + 18}" height="11" rx="5.5" fill="#fff" fill-opacity=".72" stroke="${INK}" stroke-width="2.6"/>`;
  const strawTop = lidTop - (domed ? 30 : 64), sx = 132;
  const straw = `<g class="straw"><path d="M${sx},${surface + 40} L${sx + 24},${strawTop}" stroke="${INK}" stroke-width="15" stroke-linecap="round"/><path d="M${sx},${surface + 40} L${sx + 24},${strawTop}" stroke="#ff6fa8" stroke-width="10" stroke-linecap="round"/><path d="M${sx - 2.5},${surface + 30} L${sx + 20.5},${strawTop + 4}" stroke="#ffd0e3" stroke-width="2.4" stroke-linecap="round"/></g>`;
  const sy = surface + (bot - surface) * 0.52, sr = 31;
  const sticker = `<g class="sticker"><circle cx="${cx}" cy="${sy}" r="${sr + 3}" fill="#fff" stroke="${INK}" stroke-width="2.2"/><clipPath id="s${id}"><circle cx="${cx}" cy="${sy}" r="${sr}"/></clipPath><image href="${root}assets/img/logo-240.png" x="${cx - sr - 4}" y="${sy - sr - 2}" width="${sr * 2 + 8}" height="${(sr * 2 + 8) * 1043 / 1090}" clip-path="url(#s${id})"/></g>`;
  return `<svg class="cup cup-${size} ${cls}" viewBox="0 ${tall ? -110 : -80} 220 ${tall ? 430 : 400}" aria-hidden="true" focusable="false">
  <defs><linearGradient id="g${id}" x1="0" y1="0" x2="0" y2="1">${stops}</linearGradient>
  <filter id="b${id}" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation="1.3"/></filter>
  <clipPath id="c${id}"><path d="${body}"/></clipPath>
  <linearGradient id="h${id}" x1="0" x2="1"><stop offset="0" stop-color="#fff" stop-opacity=".0"/><stop offset=".18" stop-color="#fff" stop-opacity=".55"/><stop offset=".34" stop-color="#fff" stop-opacity="0"/><stop offset=".86" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".16"/></linearGradient></defs>
  <ellipse class="shadow" cx="${cx}" cy="${bot + 8}" rx="62" ry="9" fill="${INK}" opacity=".14"/>
  ${straw}
  <path d="${body}" fill="#fff" fill-opacity=".35"/>
  <g clip-path="url(#c${id})"><g class="liq">
    ${c.base ? `<rect class="base" x="0" y="${surface}" width="220" height="${bot - surface + 20}" fill="${c.base}"/>` : ''}<rect class="syrup" x="0" y="${surface}" width="220" height="${bot - surface + 20}" fill="url(#g${id})"/>
    <g class="swirls" filter="url(#b${id})">${swirls}</g>${ice}${bub}<g class="foam">${foam}</g>
    <path d="M0,${surface} C40,${surface - 4} 80,${surface + 4} 120,${surface} S190,${surface - 3} 220,${surface}" stroke="#fff" stroke-opacity=".35" stroke-width="3" fill="none"/>
  </g></g>
  <path d="${body}" fill="url(#h${id})"/>
  ${pile}
  ${sticker}
  <path d="${body}" fill="none" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
  <path d="M${xAt(rim + 24, 1) + 9},${rim + 24} L${xAt(bot - 26, 1) + 8},${bot - 26}" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".75"/>
  ${lid}
</svg>`;
}
