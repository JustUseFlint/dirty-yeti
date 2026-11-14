# Playwright checks + screenshots. Usage: python3 shoot.py [BASE] [phone,desk]
import asyncio, sys, json
from playwright.async_api import async_playwright
BASE = sys.argv[1] if len(sys.argv) > 1 else 'http://127.0.0.1:8833/dirty-yeti/'
OUT = '/workspace/dirty-yeti/shots/'
TAG = sys.argv[3] if len(sys.argv) > 3 else ''
PAGES = ['', 'menu/', 'find-us/', 'events/', 'about/', 'nope-404/']
only = sys.argv[2].split(',') if len(sys.argv) > 2 else ['phone', 'desk']
async def run():
    async with async_playwright() as p:
        report = {}
        for vk in only:
            if vk == 'phone':
                b = await p.webkit.launch(); ctx = await b.new_context(**p.devices['iPhone 15'], timezone_id='America/Indianapolis')
            else:
                b = await p.chromium.launch(); ctx = await b.new_context(viewport={'width': 1440, 'height': 900}, timezone_id='America/Indianapolis')
            for path in PAGES:
                pg = await ctx.new_page(); errs = []; bad = []
                pg.on('console', lambda m, e=errs: e.append(m.text) if m.type == 'error' else None)
                pg.on('pageerror', lambda x, e=errs: e.append('PAGEERR ' + str(x)))
                pg.on('response', lambda r, e=bad: e.append(f'{r.status} {r.url}') if r.status >= 400 and 'nope-404' not in r.url else None)
                await pg.goto(BASE + path, wait_until='networkidle', timeout=60000)
                await pg.wait_for_timeout(1800)
                name = (path.strip('/') or 'home') + '-' + vk + TAG
                await pg.screenshot(path=OUT + name + '.png')
                h = await pg.evaluate('document.documentElement.scrollHeight'); y = 0; i = 0
                while y < h:
                    y += 450; await pg.mouse.wheel(0, 450) if vk == 'desk' else await pg.evaluate(f'window.scrollTo(0,{y})'); await pg.wait_for_timeout(140)
                    h = await pg.evaluate('document.documentElement.scrollHeight')
                await pg.wait_for_timeout(1000)
                broken = await pg.evaluate('[...document.images].filter(i=>i.complete && i.naturalWidth===0).map(i=>i.currentSrc||i.src)')
                ow = await pg.evaluate('document.documentElement.scrollWidth - innerWidth')
                await pg.evaluate('window.scrollTo(0,0)'); await pg.wait_for_timeout(600)
                report[name] = {'errors': errs, 'bad': bad, 'broken': broken, 'overflowX': ow}
                await pg.close()
            await ctx.close(); await b.close()
        print(json.dumps(report, indent=1))
asyncio.run(run())
