import { createRequire } from 'node:module';
const require = createRequire('C:/repos/gh-pages-lab/azure-icons/package.json');
const { chromium, webkit } = require('playwright-core');
const base = 'https://raj-microsoft.github.io/azure-landing-zone-sketch/';
const urls = process.argv.slice(2).length ? process.argv.slice(2) : [base];
const out = {};
for (const [n, l] of [['edge', () => chromium.launch({ channel: 'msedge', headless: true })], ['webkit', () => webkit.launch({ headless: true })]]) {
  const b = await l();
  for (const u of urls) {
    const p = await (await b.newContext({ ignoreHTTPSErrors: true, viewport: { width: 1400, height: 900 } })).newPage();
    const errs = []; p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error') errs.push(m.text().slice(0, 160)); });
    const r = await p.goto(u + (u.includes('?') ? '&' : '?') + 'cb=' + Date.now(), { waitUntil: 'load' }); await p.waitForTimeout(3500);
    out[n + ' ' + u.replace(base, '/')] = { status: r.status(), errs: errs.length, first: errs[0] || null, cards: await p.evaluate(() => document.querySelectorAll('a[href*="a/"],a[href*="?a="]').length), canvas: await p.evaluate(() => document.querySelectorAll('canvas').length) };
  }
  await b.close();
}
console.log(JSON.stringify(out, null, 1));
