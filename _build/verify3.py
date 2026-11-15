import asyncio, json, re, sys
from playwright.async_api import async_playwright
B = 'https://justuseflint.github.io/dirty-yeti/'
ids = sorted(set(re.findall(r'href="([^"/]+)/"', open('/workspace/dirty-yeti/menu/index.html').read())) - {'..'})
async def main():
  out = {}
  async with async_playwright() as p:
    for vk in ['phone', 'desk']:
      if vk == 'phone': b = await p.webkit.launch(); ctx = await b.new_context(**p.devices['iPhone 15'])
      else: b = await p.chromium.launch(); ctx = await b.new_context(viewport={'width': 1440, 'height': 900})
      r = out[vk] = {'drinks': {}, 'errs': []}
      pg = await ctx.new_page()
      pg.on('pageerror', lambda x: r['errs'].append(str(x)))
      pg.on('console', lambda m: r['errs'].append(m.text) if m.type == 'error' else None)
      for i in ids:
        resp = await pg.goto(B + 'menu/' + i + '/', wait_until='domcontentloaded')
        h1 = await pg.text_content('h1'); ov = await pg.evaluate('document.documentElement.scrollWidth - innerWidth')
        t = await pg.title()
        r['drinks'][i] = [resp.status, h1.strip(), ov, t] if (resp.status != 200 or ov > 0 or not h1.strip()) else 'ok'
      # home hero static
      await pg.goto(B, wait_until='networkidle'); await pg.wait_for_timeout(2500)
      tf = lambda: pg.evaluate("(() => { const f = document.querySelector('.hero-frame'); const r = f.getBoundingClientRect(); return [getComputedStyle(f).transform, Math.round(r.width), Math.round(r.height)] })()")
      t0 = await tf(); hh = await pg.evaluate("document.querySelector('.hero').offsetHeight")
      await pg.evaluate('window.scrollTo(0, 600)'); await pg.wait_for_timeout(1200); t1 = await tf()
      r['hero'] = {'before': t0, 'after': t1, 'same': t0 == t1, 'heroHeight': hh, 'pinSpacers': await pg.evaluate("document.querySelectorAll('.pin-spacer').length")}
      await pg.evaluate('window.scrollTo(0, 0)'); await pg.wait_for_timeout(500)
      # home card click
      c = pg.locator('.fgrid .dcard').first; href = await c.get_attribute('href'); await c.scroll_into_view_if_needed(); await pg.wait_for_timeout(600); await c.click(); await pg.wait_for_url('**/menu/**/', timeout=15000); r['homeClick'] = [href, pg.url]
      await pg.goto(B + 'menu/', wait_until='networkidle')
      c = pg.locator('.mcard[href="butter-me-up/"]'); await c.scroll_into_view_if_needed(); await pg.wait_for_timeout(600); await c.click(); await pg.wait_for_url('**/butter-me-up/', timeout=15000); r['menuClick'] = pg.url
      await pg.goto(B + 'menu/#the-yeti'); await pg.wait_for_url('**/menu/the-yeti/', timeout=15000); r['redirect'] = pg.url
      await pg.goto(B + 'menu/#energy', wait_until='networkidle'); await pg.wait_for_timeout(1500); r['catAnchor'] = [pg.url, await pg.evaluate("Math.round(document.getElementById('energy').getBoundingClientRect().top)")]
      for path in ['about/', 'menu/', '']:
        await pg.goto(B + path, wait_until='networkidle'); r.setdefault('ov', {})[path or 'home'] = await pg.evaluate('document.documentElement.scrollWidth - innerWidth')
      await b.close()
  print(json.dumps(out, indent=1))
asyncio.run(main())
