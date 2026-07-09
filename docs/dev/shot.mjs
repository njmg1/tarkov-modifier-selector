// Deterministic screenshotter: drives Chrome over CDP, waits for load +
// network idle + two rAFs, then captures. `--screenshot` alone races CSS
// image decodes, which made mask-image icons come out blank.
//
//   node _shot.mjs <file.html> <out.png> [width] [height]
import { spawn } from 'node:child_process';
import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const [page, out, w = 1500, h = 2400] = process.argv.slice(2);
const PORT = 9333;

const chrome = spawn(CHROME, [
  '--headless=new', '--disable-gpu', '--hide-scrollbars', '--no-first-run',
  `--remote-debugging-port=${PORT}`, `--window-size=${w},${h}`, 'about:blank',
], { stdio: 'ignore' });

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

// /json/version gives the *browser* endpoint, which has no Page domain.
// We need the page target from /json/list.
async function target() {
  for (let i = 0; i < 60; i++) {
    try {
      const r = await fetch(`http://127.0.0.1:${PORT}/json/list`);
      const t = (await r.json()).find(t => t.type === 'page' && t.webSocketDebuggerUrl);
      if (t) return t.webSocketDebuggerUrl;
    } catch { /* not up yet */ }
    await sleep(100);
  }
  throw new Error('chrome never came up');
}

const ws = new WebSocket(await target());
await new Promise(r => ws.addEventListener('open', r, { once: true }));

let id = 0;
const pending = new Map();
const events = new Map();
ws.addEventListener('message', (e) => {
  const msg = JSON.parse(e.data);
  if (msg.id && pending.has(msg.id)) {
    const { resolve, reject } = pending.get(msg.id);
    pending.delete(msg.id);
    msg.error ? reject(new Error(JSON.stringify(msg.error))) : resolve(msg.result);
  } else if (msg.method) {
    (events.get(msg.method) ?? []).forEach(fn => fn(msg.params));
  }
});
const send = (method, params = {}) => new Promise((resolve, reject) => {
  const n = ++id;
  pending.set(n, { resolve, reject });
  ws.send(JSON.stringify({ id: n, method, params }));
});
const once = (method) => new Promise(r => {
  const arr = events.get(method) ?? [];
  const fn = (p) => { events.set(method, arr.filter(x => x !== fn)); r(p); };
  events.set(method, [...arr, fn]);
});

await send('Page.enable');
await send('Network.enable');
// --window-size does not size an already-open page target; override explicitly.
await send('Emulation.setDeviceMetricsOverride', {
  width: Number(w), height: Number(h), deviceScaleFactor: 1, mobile: false,
});

// track in-flight requests so we can wait for a genuinely idle network
let inflight = 0;
const bump = (d) => () => { inflight += d; };
events.set('Network.requestWillBeSent', [bump(+1)]);
events.set('Network.loadingFinished', [bump(-1)]);
events.set('Network.loadingFailed', [bump(-1)]);

const loaded = once('Page.loadEventFired');
await send('Page.navigate', { url: `file://${resolve(page)}` });
await loaded;

// network idle: 0 in-flight for 3 consecutive polls
for (let quiet = 0, i = 0; quiet < 3 && i < 100; i++) {
  await sleep(50);
  quiet = inflight === 0 ? quiet + 1 : 0;
}
// let style/paint settle
await send('Runtime.evaluate', {
  awaitPromise: true,
  expression: `new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)))`,
});

const { data } = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true });
writeFileSync(out, Buffer.from(data, 'base64'));
console.log(`wrote ${out}`);

ws.close();
chrome.kill();
process.exit(0);
