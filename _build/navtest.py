# Mobile nav overlay, anchors and deep links. Usage: navtest.py BASE
import asyncio, sys
from playwright.async_api import async_playwright
BASE = sys.argv[1] if len(sys.argv) > 1 else 'http://127.0.0.1:8833/dirty-yeti/'
OUT = '/workspace/dirty-yeti/shots/'
async def run():
    async with async_playwright() as p:
        res = {}
        b = await p.webkit.launch(); ctx = await b.new_context(**p.devices['iPhone 15'])
        pg = await ctx.new_page(); errs = []
        pg.on('pageerror', lambda x: errs.append(str(x))); pg.on('console', lambda m: errs.append(m.text) if m.type == 'error' else None)
        await pg.goto(BASE, wait_until='networkidle'); await pg.wait_for_timeout(1500)
        await pg.click('[data-burger]'); await pg.wait_for_timeout(1300)
        res['open'] = await pg.evaluate("!document.querySelector('[data-nav]').hidden && document.querySelector('[data-burger]').getAttribute('aria-expanded')")
        res['focus_in_nav'] = await pg.evaluate("!!document.activeElement.closest('[data-nav]')")
        await pg.screenshot(path=OUT + 'v2-nav-open-phone.png')
        for _ in range(8): await pg.keyboard.press('Tab')
        res['focus_trapped'] = await pg.evaluate("!!(document.activeElement.closest('[data-nav]') || document.activeElement.matches('[data-burger]'))")
        await pg.keyboard.press('Escape'); await pg.wait_for_timeout(900)
        res['esc_closed'] = await pg.evaluate("document.querySelector('[data-nav]').hidden && document.querySelector('[data-burger]').getAttribute('aria-expanded')==='false'")
        res['focus_back'] = await pg.evaluate("document.activeElement.matches('[data-burger]')")
        await pg.click('[data-burger]'); await pg.wait_for_timeout(1000)
        await pg.click('[data-burger]'); await pg.wait_for_timeout(900)
        res['button_closed'] = await pg.evaluate("document.querySelector('[data-nav]').hidden")
        # nav link navigates
        await pg.click('[data-burger]'); await pg.wait_for_timeout(1000)
        await pg.click('.nav-ov-links a[href$="menu/"]'); await pg.wait_for_timeout(2500)
        res['nav_link'] = pg.url
        # anchors
        await pg.click('.jump a[href="#lemonade"]'); await pg.wait_for_timeout(1800)
        res['anchor_lemonade_top'] = await pg.evaluate("Math.round(document.getElementById('lemonade').getBoundingClientRect().top)")
        await pg.goto(BASE + 'menu/#the-yeti', wait_until='networkidle'); await pg.wait_for_timeout(2200)
        res['deep_the_yeti_top'] = await pg.evaluate("Math.round(document.getElementById('the-yeti').getBoundingClientRect().top)")
        await pg.screenshot(path=OUT + 'v2-menu-deeplink-phone.png')
        res['no_sheet_or_tabs'] = await pg.evaluate("!document.querySelector('[data-sheet],[role=tablist],.tabbar,.rail')")
        res['errs'] = errs
        await b.close()
        b = await p.chromium.launch(); ctx = await b.new_context(viewport={'width': 1440, 'height': 900})
        pg = await ctx.new_page(); errs = []
        pg.on('pageerror', lambda x: errs.append(str(x))); pg.on('console', lambda m: errs.append(m.text) if m.type == 'error' else None)
        await pg.goto(BASE + 'menu/#blue-voltage', wait_until='networkidle'); await pg.wait_for_timeout(2200)
        res['desk_deep_blue_voltage_top'] = await pg.evaluate("Math.round(document.getElementById('blue-voltage').getBoundingClientRect().top)")
        res['desk_burger_hidden'] = await pg.evaluate("getComputedStyle(document.querySelector('[data-burger]')).display==='none'")
        await pg.screenshot(path=OUT + 'v2-menu-deeplink-desk.png')
        await pg.goto(BASE, wait_until='networkidle'); await pg.wait_for_timeout(1500)
        await pg.click('a.dcard[href$="#golden-snitch"]'); await pg.wait_for_timeout(3000)
        res['home_card_to_menu'] = pg.url + ' top=' + str(await pg.evaluate("Math.round(document.getElementById('golden-snitch').getBoundingClientRect().top)"))
        res['desk_errs'] = errs
        await b.close()
        for k, v in res.items(): print(k, v)
asyncio.run(run())
