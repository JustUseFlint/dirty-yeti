import fs from 'node:fs'; import path from 'node:path'; import { fileURLToPath } from 'node:url';
import { home, menu, findUs, events, about, notFound } from './pages.mjs';
const OUT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const w = (p, html) => { const f = path.join(OUT, p); fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, html); };
w('index.html', home()); w('menu/index.html', menu()); w('find-us/index.html', findUs()); w('events/index.html', events()); w('about/index.html', about()); w('404.html', notFound());
console.log('built 6 pages');
