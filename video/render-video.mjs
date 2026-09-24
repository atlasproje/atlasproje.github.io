// Render atlas-tanitim.html to an MP4, frame by frame.
//
//   node render-video.mjs                      -> atlas-tanitim.mp4, 1920x1080, 30 fps
//   node render-video.mjs --fps 60 --out film.mp4
//   node render-video.mjs --from 9.8 --to 14.4 -> one scene only
//   node render-video.mjs --stills 3,8,21.5    -> PNG stills, no video (quick look)
//   node render-video.mjs --speed 2 --width 1280 --height 720 --crf 23 --out atlas-share.mp4
//                                              -> twice as fast, 720p, small enough to share
//   node render-video.mjs --serve              -> preview in your own browser (plays live)
//
// No npm packages: it drives the Chrome already installed (over the DevTools
// protocol, with Node's built-in WebSocket) and pipes each frame into ffmpeg.
// Each frame is drawn at an exact time, so the video is smooth whatever the
// machine's speed. Needs Node 22+ and ffmpeg on PATH (winget install Gyan.FFmpeg);
// without ffmpeg the frames are written to ./frames and the command is printed.
//
// The page is served from a tiny local web server (the repository root), because
// browsers refuse to load fonts straight from file:// and the page uses the logo
// from ../public/assets.
//
// Env: CHROME=<path to chrome.exe or msedge.exe>, FFMPEG=<path to ffmpeg.exe>.

import { spawn, spawnSync } from 'node:child_process';
import { createReadStream, existsSync, mkdirSync, mkdtempSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { createServer } from 'node:http';
import { tmpdir } from 'node:os';
import { dirname, extname, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '..');
const args = Object.fromEntries(
  process.argv.slice(2).reduce((acc, a, i, all) => (a.startsWith('--') ? [...acc, [a.slice(2), all[i + 1] ?? true]] : acc), []),
);
const FPS = Number(args.fps ?? 30);
// 2 = twice as fast: the film's clock advances two seconds per second of video.
const SPEED = Number(args.speed ?? 1);
// x264 quality: 16 is near-lossless, 23 is a good sharing size, higher is smaller.
const CRF = String(args.crf ?? 16);
const WIDTH = Number(args.width ?? 1920);
const HEIGHT = Number(args.height ?? 1080);
const OUT = resolve(here, typeof args.out === 'string' ? args.out : 'atlas-tanitim.mp4');
const SOURCE = resolve(here, typeof args.page === 'string' ? args.page : 'atlas-tanitim.html');
const STILLS = typeof args.stills === 'string' ? args.stills.split(',').map(Number) : null;

// ------------------------------------------------------------ web server --
const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.woff2': 'font/woff2',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.jpg': 'image/jpeg',
};
const server = createServer((req, res) => {
  const path = resolve(root, '.' + decodeURIComponent(new URL(req.url, 'http://x').pathname));
  if ((path !== root && !path.startsWith(root + sep)) || !existsSync(path) || !statSync(path).isFile()) {
    res.writeHead(404).end('not found');
    return;
  }
  res.writeHead(200, { 'content-type': TYPES[extname(path).toLowerCase()] ?? 'application/octet-stream' });
  createReadStream(path).pipe(res);
});
await new Promise((ok) => server.listen(Number(args.port ?? 0), '127.0.0.1', ok));
const pageUrl = `http://127.0.0.1:${server.address().port}/${relative(root, SOURCE).split(sep).join('/')}`;

if (args.serve) {
  console.log(`Preview: ${pageUrl}`);
  console.log('Space: pause/play · ← →: seek 1 s · 0: restart · Ctrl+C to stop');
  await new Promise(() => {});
}

// ---------------------------------------------------------------- binaries --
const CHROME = process.env.CHROME ?? [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
].find((p) => existsSync(p));
if (!CHROME) fail('No Chrome or Edge found. Set CHROME to its path.');

const FFMPEG = process.env.FFMPEG ?? 'ffmpeg';
const haveFfmpeg = !STILLS && spawnSync(FFMPEG, ['-version']).status === 0;

// ------------------------------------------------------------------ chrome --
const work = mkdtempSync(join(tmpdir(), 'atlas-render-'));
const chrome = spawn(CHROME, [
  '--headless=new',
  '--remote-debugging-port=0',
  `--user-data-dir=${join(work, 'profile')}`,
  `--window-size=${WIDTH},${HEIGHT}`,
  '--hide-scrollbars',
  '--force-device-scale-factor=1',
  '--no-first-run',
  '--no-default-browser-check',
  ...(process.getuid?.() === 0 ? ['--no-sandbox'] : []),
  'about:blank',
], { stdio: ['ignore', 'ignore', 'pipe'] });

const wsUrl = await new Promise((ok, no) => {
  let buf = '';
  chrome.stderr.on('data', (d) => {
    buf += d;
    const m = buf.match(/DevTools listening on (ws:\/\/\S+)/);
    if (m) ok(m[1]);
  });
  chrome.on('exit', (code) => no(new Error(`Chrome exited (${code}) before it was ready.`)));
  setTimeout(() => no(new Error('Chrome did not start within 20 s.')), 20000);
});

// --------------------------------------------------------- tiny CDP client --
const browser = new WebSocket(wsUrl);
await new Promise((ok) => browser.addEventListener('open', ok, { once: true }));
let nextId = 1;
const waiting = new Map();
const events = [];
browser.addEventListener('message', (e) => {
  const msg = JSON.parse(e.data);
  if (msg.id && waiting.has(msg.id)) {
    const { ok, no } = waiting.get(msg.id);
    waiting.delete(msg.id);
    if (msg.error) no(new Error(msg.error.message));
    else ok(msg.result);
  } else if (msg.method) events.push(msg);
});
const send = (method, params = {}, sessionId) =>
  new Promise((ok, no) => {
    const id = nextId++;
    waiting.set(id, { ok, no });
    browser.send(JSON.stringify({ id, method, params, sessionId }));
  });

const { targetId } = await send('Target.createTarget', { url: 'about:blank' });
const { sessionId } = await send('Target.attachToTarget', { targetId, flatten: true });
const page = (method, params) => send(method, params, sessionId);
const evaluate = async (expression) => {
  const r = await page('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true });
  if (r.exceptionDetails) throw new Error(r.exceptionDetails.exception?.description ?? r.exceptionDetails.text);
  return r.result.value;
};

await page('Page.enable');
await page('Emulation.setDeviceMetricsOverride', { width: WIDTH, height: HEIGHT, deviceScaleFactor: 1, mobile: false });
await page('Page.navigate', { url: pageUrl });
await waitFor(() => events.some((e) => e.method === 'Page.loadEventFired'), 30000, 'The page did not load.');
await evaluate('window.__film.ready');
// The film is authored at 1920x1080; other sizes scale it to fit.
const duration = await evaluate(
  `window.__film.record(), document.getElementById('stage').style.transform = 'scale(${WIDTH / 1920}, ${HEIGHT / 1080})', window.__film.duration`,
);
const from = Number(args.from ?? 0);
const to = Math.min(Number(args.to ?? duration), duration);

async function frameAt(t, format = 'jpeg') {
  await evaluate(`window.__film.render(${t}); new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(() => r(true))))`);
  const shot = await page('Page.captureScreenshot', format === 'png' ? { format: 'png' } : { format: 'jpeg', quality: 95 });
  return Buffer.from(shot.data, 'base64');
}

// ---------------------------------------------------------------- stills --
if (STILLS) {
  const dir = join(here, 'stills');
  mkdirSync(dir, { recursive: true });
  for (const t of STILLS) {
    const file = join(dir, `still-${String(t).replace('.', '_')}s.png`);
    writeFileSync(file, await frameAt(t, 'png'));
    console.log(`wrote ${file}`);
  }
  await finish();
}

// ----------------------------------------------------------------- video --
const total = Math.round(((to - from) / SPEED) * FPS);
let encoder = null;
let framesDir = null;
if (haveFfmpeg) {
  encoder = spawn(FFMPEG, [
    '-y', '-loglevel', 'error',
    '-f', 'image2pipe', '-framerate', String(FPS), '-i', '-',
    '-c:v', 'libx264', '-preset', 'slow', '-crf', CRF, '-pix_fmt', 'yuv420p',
    '-movflags', '+faststart', OUT,
  ], { stdio: ['pipe', 'inherit', 'inherit'] });
} else {
  framesDir = join(here, 'frames');
  mkdirSync(framesDir, { recursive: true });
  console.log('ffmpeg not found: writing frames instead.');
}

const started = Date.now();
for (let i = 0; i < total; i += 1) {
  const jpg = await frameAt(from + (i * SPEED) / FPS);
  if (encoder) {
    if (!encoder.stdin.write(jpg)) await new Promise((r) => encoder.stdin.once('drain', r));
  } else {
    writeFileSync(join(framesDir, `${String(i).padStart(5, '0')}.jpg`), jpg);
  }
  if (i % FPS === 0 || i === total - 1) {
    const done = (i + 1) / total;
    const left = ((Date.now() - started) / done - (Date.now() - started)) / 1000;
    process.stdout.write(`\r  ${String(Math.round(done * 100)).padStart(3)}%  frame ${i + 1}/${total}  ~${Math.ceil(left)} s left   `);
  }
}
process.stdout.write('\n');

if (encoder) {
  encoder.stdin.end();
  await new Promise((r) => encoder.on('close', r));
  console.log(`Done: ${OUT}`);
} else {
  console.log(`Frames are in ${framesDir}. With ffmpeg installed, run:`);
  console.log(`  ffmpeg -framerate ${FPS} -i "${join(framesDir, '%05d.jpg')}" -c:v libx264 -crf 16 -pix_fmt yuv420p "${OUT}"`);
}
await finish();

// ---------------------------------------------------------------- helpers --
async function waitFor(cond, ms, message) {
  const end = Date.now() + ms;
  while (!cond()) {
    if (Date.now() > end) fail(message);
    await new Promise((r) => setTimeout(r, 50));
  }
}
async function finish() {
  try { browser.close(); } catch { }
  chrome.kill();
  server.close();
  await new Promise((r) => setTimeout(r, 300));
  try { rmSync(work, { recursive: true, force: true }); } catch { }
  process.exit(0);
}
function fail(message) {
  console.error(message);
  try { chrome?.kill(); } catch { }
  process.exit(1);
}
