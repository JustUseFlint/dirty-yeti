// Every fact here comes from The Dirty Yeti's Facebook page and menu boards. Do not add anything that isn't there.
export const SITE = 'https://justuseflint.github.io/dirty-yeti/';
export const EMAIL = 'thedirtyyeti.dirtysodaco@gmail.com';
export const IG = 'https://www.instagram.com/thedirtyyeti_/';
export const IG_HANDLE = '@thedirtyyeti_';
export const FB = 'https://www.facebook.com/people/The-Dirty-Yeti/61586227516939/';
export const V = '2';

export const CATS = [
  { id: 'soda', label: 'Soda', size: '24 oz', price: 6, blurb: 'Soda mixed with flavored syrups, cream and toppings.' },
  { id: 'energy', label: 'Energy', size: '24 oz', price: 8, blurb: 'Alani and Red Bull energy drinks, mixed with flavors.' },
  { id: 'lemonade', label: 'Lemonade', size: '32 oz', price: 10, blurb: 'Lemonade mixed with flavors, in the big 32 oz cup.' },
];

// Cup art: layers run bottom to top. top = what sits on the drink. tint = card background.
// Colors are drawn from each drink's real ingredients.
const DRP = '#4a1219', COKE = '#3a160f', ROOT = '#4b2412', CREAM = '#fff3e4';
export const DRINKS = [
  // ---- 24 oz soda, $6
  { id: 'cinnamon-bun', cat: 'soda', name: 'Cinnamon Bun', ing: ['Dr Pepper', 'Cinnamon Bun', 'Half n Half'],
    cup: { layers: [DRP, '#6d2a22', '#a9663f'], swirl: CREAM, bubbles: 1 }, tint: '#f6dccb' },
  { id: 'velvet-cherry', cat: 'soda', name: 'Velvet Cherry', ing: ['Dr Pepper', 'Cherry', 'Cream', 'Half n Half'],
    cup: { layers: [DRP, '#7a1426', '#b23048'], swirl: '#ffe6ea', bubbles: 1 }, tint: '#ffd2dc' },
  { id: 'butter-me-up', cat: 'soda', name: 'Butter Me Up', ing: ['Dr Pepper', 'Cookie Butter', 'Half n Half', 'Cold Foam'],
    cup: { layers: [DRP, '#7a3a22', '#b97a45'], swirl: CREAM, top: 'foam', foam: '#f7e3c8' }, tint: '#f3dcc2' },
  { id: 'cherry-float', cat: 'soda', name: 'Cherry Float', ing: ['Red Cream Soda', 'Cream', 'Cherry', 'Whipped Cream'],
    cup: { layers: ['#b3122e', '#d92945', '#ef5d74'], swirl: '#fff0f2', top: 'whip', bubbles: 1 }, tint: '#ffc9d3' },
  { id: 'cozy-campfire', cat: 'soda', name: 'Cozy Campfire', ing: ['Rootbeer', 'Toasted Marshmallow', 'Cold Foam', 'Marshmallow Fluff'],
    cup: { layers: [ROOT, '#6a3519', '#94552c'], swirl: '#fbe9d6', top: 'toasted', foam: '#f8ead8' }, tint: '#efd5bd' },
  { id: 'birthday-bash', cat: 'soda', name: 'Birthday Bash', ing: ['Rootbeer', 'Cake Batter', 'White Chocolate', 'Cold Foam', 'Vanilla Frosting'],
    cup: { layers: [ROOT, '#6f3a1f', '#a2683d'], swirl: '#fff7ec', top: 'frosting', foam: '#fff4e6' }, tint: '#f7e1ef' },
  { id: 'the-yeti', cat: 'soda', name: 'The Yeti', ing: ['Coke', 'Vanilla', 'Cherry', 'Cold Foam'],
    cup: { layers: [COKE, '#5a1a18', '#8a2a2b'], swirl: '#ffe9ea', top: 'foam', foam: '#fff1ec', bubbles: 1 }, tint: '#d9ecf2' },
  { id: 'pinkity-drinkity', cat: 'soda', name: 'Pinkity Drinkity', ing: ['Sprite', 'Vanilla', 'Strawberry', 'Coconut Creme'],
    cup: { layers: ['#f2648f', '#f78cab', '#ffc2d3'], swirl: '#fff5f8', bubbles: 1 }, tint: '#ffd6e4' },
  { id: '765', cat: 'soda', name: '765', ing: ['Coke', 'Vanilla', 'Strawberry', 'Cold Foam', 'Marshmallow Fluff'],
    cup: { layers: [COKE, '#6b1a26', '#a83246'], swirl: '#ffe4ea', top: 'fluff', foam: '#fff0f2', bubbles: 1 }, tint: '#ffdad2' },
  { id: 'golden-snitch', cat: 'soda', name: 'Golden Snitch', ing: ['Cream Soda', 'Butterscotch', 'Cream', 'Whipped Cream'],
    cup: { layers: ['#c9771f', '#e3a13c', '#f3c56c'], swirl: '#fff6e2', top: 'whip', bubbles: 1 }, tint: '#fbe6b8' },
  { id: 'purple-rain', cat: 'soda', name: 'Purple Rain', ing: [], unread: true,
    cup: { layers: ['#5b2a86', '#7f43b0', '#a974d6'], swirl: '#f3e8ff', bubbles: 1 }, tint: '#e6d8f6' },
  { id: 'orange-dreamsicle', cat: 'soda', name: 'Orange Dreamsicle', ing: [], unread: true,
    cup: { layers: ['#ec7a1c', '#f59a3e', '#ffc07a'], swirl: '#fff4e8', bubbles: 1 }, tint: '#ffe0c4' },
  // ---- 24 oz energy, $8
  { id: 'princess-peach', cat: 'energy', name: 'Princess Peach', ing: ['Alani Juicy Peach', 'Strawberry', 'Peach'],
    cup: { layers: ['#ef5b7a', '#f7896f', '#ffb98a'], ice: 1, bubbles: 1 }, tint: '#ffdcca' },
  { id: 'berries-n-cream', cat: 'energy', name: "Berries N' Cream", ing: ['Iced Vanilla Berry Red Bull', 'Vanilla', 'Strawberry', 'Cream', 'Whipped Cream'],
    cup: { layers: ['#c4234f', '#e34f74', '#f590ab'], swirl: '#fff2f5', top: 'whip', ice: 1 }, tint: '#ffd0dd' },
  { id: 'yeti-juice', cat: 'energy', name: 'Yeti Juice', ing: ['Strawberry Apricot Red Bull', 'Strawberry', 'Vanilla', 'Marshmallow Fluff'],
    cup: { layers: ['#e8414f', '#f2705a', '#fba06e'], swirl: '#fff3ec', top: 'fluff', foam: '#fff6f0', ice: 1 }, tint: '#ffd9cc' },
  { id: '5-oclock-somewhere', cat: 'energy', name: "5 O'Clock Somewhere", ing: ['Alani Orange Kiss', 'Strawberry', 'Vanilla', 'Cream', 'Orange Juice'],
    cup: { layers: ['#e8434d', '#f4823a', '#ffb45a'], swirl: '#fff3e6', ice: 1 }, tint: '#ffe1c2' },
  { id: 'malibu-barbie', cat: 'energy', name: 'Malibu Barbie', ing: ['Alani Pink Slush', 'Vanilla', 'Strawberry'],
    cup: { layers: ['#e5267a', '#f2559a', '#ff8dbd'], ice: 1, bubbles: 1 }, tint: '#ffcfe3' },
  { id: 'blue-voltage', cat: 'energy', name: 'Blue Voltage', ing: ['Alani Blue Slush', 'Blue Raspberry'], partial: true,
    cup: { layers: ['#0f63c9', '#1f8be6', '#4fc0f2'], ice: 1, bubbles: 1 }, tint: '#cfe7fb' },
  // ---- 32 oz lemonade, $10
  { id: 'peaches-n-cream', cat: 'lemonade', name: "Peaches N' Cream", ing: ['Peach', 'Half n Half', 'Vanilla', 'Cold Foam'],
    cup: { layers: ['#f59a62', '#fbb985', '#ffd7b0'], swirl: '#fff6ec', top: 'foam', foam: '#fff4ea', ice: 1 }, tint: '#ffe2cf' },
  { id: 'jolly-rancher', cat: 'lemonade', name: 'Jolly Rancher', ing: ['Blue Raspberry', 'Watermelon', 'Green Apple'],
    cup: { layers: ['#2a9c3e', '#e9435f', '#2b8fe6'], hard: 1, ice: 1 }, tint: '#d6f0d9' },
  { id: 'sunset', cat: 'lemonade', name: 'Sunset', ing: ['Mango', 'Strawberry'],
    cup: { layers: ['#e5303f', '#f7783a', '#ffc23d'], ice: 1 }, tint: '#ffe3b9' },
  { id: 'love-island', cat: 'lemonade', name: 'Love Island', ing: ['Sprite/Lemonade', 'Vanilla', 'Coconut', 'Strawberry', 'Cream'],
    cup: { layers: ['#ee5b86', '#f7a0b8', '#fde3ea'], swirl: '#ffffff', ice: 1 }, tint: '#ffdbe6' },
  { id: 'gone-fishing', cat: 'lemonade', name: 'Gone Fishing', ing: ['Blue Raspberry', 'Lime'],
    cup: { layers: ['#14a3a0', '#25b9d6', '#58d0ef'], ice: 1 }, tint: '#ccefee' },
  { id: 'strawberry-shortcake', cat: 'lemonade', name: 'Strawberry Shortcake', ing: ['Vanilla', 'Strawberry', 'Half n Half'], partial: true,
    cup: { layers: ['#e9406a', '#f57c98', '#ffc3d0'], swirl: '#fff7f2', ice: 1 }, tint: '#ffd9e1' },
];

// New seasonal drink posted on Facebook. No recipe or price published.
export const DROP = { id: 'jack-frost', cat: 'new', name: 'Jack Frost', ing: [], seasonal: true,
  cup: { layers: ['#4fb0e3', '#9fd8f2', '#e4f6ff'], swirl: '#ffffff', top: 'whip' }, tint: '#d8eef8' };

export const FEATURED = ['the-yeti', 'velvet-cherry', 'pinkity-drinkity', 'cozy-campfire', '765', 'golden-snitch'];
export const RECENT_STOP = { place: 'Walmart', addr: '1835 US 231, Crawfordsville, IN', when: 'Nov 4–7 and Nov 10–14', hours: '11 AM – 5 PM' };
