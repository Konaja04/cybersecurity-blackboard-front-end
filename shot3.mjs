import { chromium } from 'playwright-core';
const out = process.env.OUT;
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 760, height: 520 }, deviceScaleFactor: 2 });
await p.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
await p.waitForTimeout(500);
// recortar a la zona de los campos
const blk = await p.locator('#login-block').boundingBox();
await p.screenshot({ path: out + '/fields.png', clip: { x: blk.x-10, y: 250, width: blk.width+20, height: 230 } });
await b.close();
