// Renders the share-image canvas inside the page and saves it to disk, so the
// generated PNG can actually be looked at instead of assumed correct.
//
//   node dev/shotcard.mjs <out.png> [id,id,id...]
import { spawn } from 'node:child_process';
import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const [out, ids = '35,26,28,24,9,17,10'] = process.argv.slice(2);
const PORT = 9334;

const chrome = spawn(CHROME, ['--headless=new', '--disable-gpu', '--no-first-run',
  `--remote-debugging-port=${PORT}`, 'about:blank'], { stdio: 'ignore' });
const sleep = (ms) => new Promise(r => setTimeout(r, ms));

async function target() {
  for (let i = 0; i < 60; i++) {
    try {
      const r = await fetch(`http://127.0.0.1:${PORT}/json/list`);
      const t = (await r.json()).find(t => t.type === 'page' && t.webSocketDebuggerUrl);
      if (t) return t.webSocketDebuggerUrl;
    } catch { /* not up */ }
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
  const m = JSON.parse(e.data);
  if (m.id && pending.has(m.id)) {
    const { resolve, reject } = pending.get(m.id);
    pending.delete(m.id);
    m.error ? reject(new Error(JSON.stringify(m.error))) : resolve(m.result);
  } else if (m.method) (events.get(m.method) ?? []).forEach(f => f(m.params));
});
const send = (method, params = {}) => new Promise((res, rej) => {
  const n = ++id;
  pending.set(n, { resolve: res, reject: rej });
  ws.send(JSON.stringify({ id: n, method, params }));
});
const once = (m) => new Promise(r => {
  const arr = events.get(m) ?? [];
  const fn = (p) => { events.set(m, arr.filter(x => x !== fn)); r(p); };
  events.set(m, [...arr, fn]);
});

await send('Page.enable');
const loaded = once('Page.loadEventFired');
await send('Page.navigate', { url: `file://${resolve('index.html')}` });
await loaded;
await sleep(400);

const { result, exceptionDetails } = await send('Runtime.evaluate', {
  awaitPromise: true,
  returnByValue: true,
  expression: `(async () => {
    const ids = [${ids}];
    document.getElementById('resetBtn').click();
    // button.card order matches MODIFIERS-with-a-value order (perks then handicaps)
    const cards = [...document.querySelectorAll('button.card')];
    const order = MODIFIERS.filter(m => m.value !== null);
    for (const i of ids) cards[order.findIndex(m => m.id === i)].click();
    const cv = await window.__renderShareImage(2);
    return { w: cv.width, h: cv.height, data: cv.toDataURL('image/png').split(',')[1] };
  })()`,
});
if (exceptionDetails) throw new Error(JSON.stringify(exceptionDetails));

const { w, h, data } = result.value;
writeFileSync(out, Buffer.from(data, 'base64'));
console.log(`wrote ${out} (${w}x${h})`);

ws.close();
chrome.kill();
process.exit(0);
