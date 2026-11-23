import { createRequire } from 'node:module';
const require = createRequire('C:/repos/gh-pages-lab/azure-icons/package.json');
const { chromium, webkit } = require('playwright-core');
const url = 'https://raj-microsoft.github.io/azure-landing-zone-sketch/?cb=' + Date.now();
const out = {};
for (const [n, l] of [['edge', () => chromium.launch({ channel: 'msedge', headless: true })], ['webkit', () => webkit.launch({ headless: true })]]) {
  const b = await l(); const p = await (await b.newContext({ ignoreHTTPSErrors: true, viewport: { width: 1600, height: 1000 } })).newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error') errs.push(m.text().slice(0, 160)); });
  await p.goto(url, { waitUntil: 'load' }); await p.waitForTimeout(4000);
  out[n] = { errs, canvas: await p.evaluate(() => document.querySelectorAll('canvas').length) };
  await b.close();
}
console.log(JSON.stringify(out));
