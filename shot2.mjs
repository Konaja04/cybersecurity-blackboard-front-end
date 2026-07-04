import { chromium } from 'playwright-core';
const out = process.env.OUT;
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1000, height: 1180 }, deviceScaleFactor: 2 });
await p.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
await p.fill('#user_id', '20211918');
await p.fill('#password', '1234567890');
await p.locator('#login-block').click({ position: { x: 5, y: 5 } }); // blur
await p.waitForTimeout(600);
await p.screenshot({ path: out + '/ours_filled.png', fullPage: false });
await b.close();
