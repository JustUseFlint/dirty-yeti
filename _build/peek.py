# quick viewport screenshots at scroll positions: peek.py path vk y1,y2,... tag
import asyncio, sys
from playwright.async_api import async_playwright
BASE='http://127.0.0.1:8833/dirty-yeti/'
path, vk, ys, tag = sys.argv[1], sys.argv[2], [int(v) for v in sys.argv[3].split(',')], sys.argv[4]
async def run():
    async with async_playwright() as p:
        if vk == 'phone': b = await p.webkit.launch(); ctx = await b.new_context(**p.devices['iPhone 15'])
        else: b = await p.chromium.launch(); ctx = await b.new_context(viewport={'width': 1440, 'height': 900})
        pg = await ctx.new_page(); errs=[]
        pg.on('pageerror', lambda x: errs.append(str(x)))
        await pg.goto(BASE + path, wait_until='networkidle'); await pg.wait_for_timeout(1800)
        for y in ys:
            await pg.evaluate(f'window.scrollTo(0,{y})'); await pg.wait_for_timeout(1500)
            await pg.screenshot(path=f'/tmp/dy/{tag}-{y}.png')
        print(errs, await pg.evaluate('document.documentElement.scrollHeight'))
        await b.close()
asyncio.run(run())
