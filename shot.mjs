import { chromium } from 'playwright-core';
const out = process.env.OUT;
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 1200 }, deviceScaleFactor: 1 });
await p.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
await p.waitForTimeout(800);
await p.screenshot({ path: out + '/ours_1440.png', fullPage: false });
const m = await p.evaluate(() => {
  const q = s => document.querySelector(s);
  const r = e => e ? e.getBoundingClientRect() : null;
  const img = q('.login-logo img'), inp = q('#user_id'), blk = q('#login-block');
  return {
    rootFont: getComputedStyle(document.documentElement).fontSize,
    logo: r(img) && {w: Math.round(r(img).width), h: Math.round(r(img).height)},
    input: r(inp) && {w: Math.round(r(inp).width), x: Math.round(r(inp).x)},
    block: r(blk) && {w: Math.round(r(blk).width), x: Math.round(r(blk).x)},
    bodyScrollH: document.body.scrollHeight, winH: window.innerHeight,
  };
});
console.log(JSON.stringify(m));
await b.close();
