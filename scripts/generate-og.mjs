/**
 * Renders the share cards (Open Graph / Twitter, 1200x630) and the icon set into public/.
 *   public/og/site.jpg, og/lessons.jpg, og/apps/<slug>.jpg, og/lessons/<slug>.jpg
 *   public/favicon.svg, favicon.ico, favicon-32.png, apple-touch-icon.png,
 *   icons/icon-192.png, icons/icon-512.png, icons/maskable-512.png
 *
 * Needs Chrome + puppeteer-core (not a project dependency, run it locally when apps/lessons change):
 *   PUPPETEER_CORE=/path/to/node_modules/puppeteer-core node scripts/generate-og.mjs
 * The images are committed, so the normal build does not need Chrome.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { SITE, APPS, readLessons } from './seo-data.mjs';

const root = new URL('../', import.meta.url).pathname;
const pub = (p) => root + 'public/' + p;
const puppeteer = (await import(process.env.PUPPETEER_CORE || 'puppeteer-core')).default;
const CHROME = process.env.CHROME || '/usr/bin/google-chrome';

const dataUri = (file, mime = 'image/jpeg') => `data:${mime};base64,${readFileSync(file).toString('base64')}`;
const photo = dataUri(pub('images/Bala_profile_pic.jpg'));
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const host = SITE.url.replace(/^https?:\/\//, '');

const BASE_CSS = `
  *{box-sizing:border-box;margin:0}
  html,body{width:1200px;height:630px;overflow:hidden}
  body{font-family:Outfit,sans-serif;color:#e2e8f0;background:#020617;position:relative}
  .bg{position:absolute;inset:0;background:
      radial-gradient(800px 500px at 0% 0%,rgba(34,211,238,.16),transparent 60%),
      radial-gradient(700px 500px at 100% 100%,rgba(99,102,241,.20),transparent 60%),#020617}
  .grid{position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.04) 1px,transparent 1px);background-size:60px 60px}
  .mono{font-family:'Space Mono',monospace}
  .bv{display:inline-flex;align-items:center;justify-content:center;width:44px;height:44px;border-radius:11px;background:linear-gradient(135deg,#22d3ee,#6366f1);color:#fff;font:700 18px 'Space Mono',monospace}
  .foot{position:absolute;left:64px;right:64px;bottom:44px;display:flex;align-items:center;gap:14px;font-size:22px;color:#cbd5e1}
  .foot img{width:44px;height:44px;border-radius:50%;object-fit:cover;object-position:center 20%;border:2px solid rgba(255,255,255,.25)}
  .foot .dom{margin-left:auto;font-family:'Space Mono',monospace;font-size:20px;color:#67e8f9}
`;
const page = (body, extra = '') => `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;800;900&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">
<style>${BASE_CSS}${extra}</style></head><body><div class="bg"></div><div class="grid"></div>${body}</body></html>`;
const footer = (right = host) => `<div class="foot"><img src="${photo}"><span><b style="color:#fff">Bala Venkatesh</b></span><span class="bv">BV</span><span class="dom">${right}</span></div>`;

const siteCard = () => page(`
  <div style="position:absolute;left:64px;top:70px;right:64px;display:flex;gap:56px;align-items:center">
    <div style="flex:0 0 300px;height:300px;border-radius:50%;padding:8px;background:conic-gradient(from 200deg,#22d3ee,#6366f1,#a855f7,#22d3ee)">
      <img src="${photo}" style="width:100%;height:100%;border-radius:50%;object-fit:cover;object-position:center 22%;border:6px solid #020617">
    </div>
    <div style="display:flex;flex-direction:column;gap:18px">
      <div class="mono" style="font-size:20px;letter-spacing:4px;color:#22d3ee;text-transform:uppercase">Lead AI Engineer · Standard Chartered</div>
      <div style="font-size:84px;font-weight:900;line-height:.95;color:#fff">Bala<br>Venkatesh</div>
      <div style="font-size:30px;line-height:1.3;color:#cbd5e1">Turning AI into <span style="color:#67e8f9;font-weight:700">measurable business value</span>.<br>10+ years of production GenAI, RAG &amp; agents.</div>
    </div>
  </div>
  <div class="foot"><span class="mono" style="font-size:19px;color:#94a3b8">Banking · Agritech · Healthcare · Free 3D AI apps</span><span class="dom">${host}</span></div>`);

const lessonsCard = (n) => page(`
  <div style="position:absolute;left:64px;top:84px;right:64px;display:flex;flex-direction:column;gap:22px">
    <div class="mono" style="font-size:20px;letter-spacing:4px;color:#22d3ee;text-transform:uppercase">Build with Bala · ${n} lessons</div>
    <div style="font-size:88px;font-weight:900;line-height:1;color:#fff">Lessons from<br><span style="color:#67e8f9">production AI</span></div>
    <div style="font-size:30px;color:#cbd5e1;max-width:900px">How Bala thinks about LLMs, RAG, agents, product and leadership, learned shipping AI in a bank, a clinic and a farm.</div>
  </div>${footer(host + '/lessons')}`);

const lessonCard = (l) => page(`
  <div style="position:absolute;left:64px;top:70px;right:64px;display:flex;flex-direction:column;gap:22px">
    <div class="mono" style="font-size:19px;letter-spacing:3px;color:#22d3ee;text-transform:uppercase">${esc(l.series)} · ${esc(l.readTime)}</div>
    <div style="font-size:${l.title.length > 60 ? 58 : 68}px;font-weight:900;line-height:1.05;color:#fff;max-width:1060px">${esc(l.title)}</div>
    <div style="font-size:26px;line-height:1.4;color:#cbd5e1;max-width:1000px;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden">${esc(l.excerpt)}</div>
  </div>${footer(host + '/lessons')}`);

const appCard = (a) => page(`
  <div style="position:absolute;left:64px;top:76px;width:500px;display:flex;flex-direction:column;gap:20px">
    <div class="mono" style="align-self:flex-start;font-size:17px;letter-spacing:3px;text-transform:uppercase;color:${a.accent};border:1px solid ${a.accent}66;background:${a.accent}1a;padding:6px 12px;border-radius:8px">${esc(a.kicker)}</div>
    <div style="font-size:${a.name.length > 20 ? 58 : 70}px;font-weight:900;line-height:1;color:#fff">${esc(a.name)}</div>
    <div style="font-size:28px;line-height:1.35;color:#cbd5e1">${esc(a.pitch)}</div>
    <div class="mono" style="font-size:20px;color:${a.accent}">${esc(a.url.replace(/^https?:\/\//, '').replace(/\/$/, ''))}</div>
  </div>
  <div style="position:absolute;right:-40px;top:70px;width:640px;border-radius:18px;overflow:hidden;border:1px solid rgba(255,255,255,.15);box-shadow:0 30px 80px rgba(0,0,0,.6),0 0 60px ${a.accent}33;transform:perspective(1400px) rotateY(-14deg) rotateX(4deg)">
    <div style="height:30px;background:#1e293b;display:flex;align-items:center;gap:7px;padding:0 12px">
      <span style="width:11px;height:11px;border-radius:50%;background:#f87171"></span><span style="width:11px;height:11px;border-radius:50%;background:#fbbf24"></span><span style="width:11px;height:11px;border-radius:50%;background:#34d399"></span>
    </div>
    <img src="${dataUri(pub('previews/' + a.preview))}" style="display:block;width:100%;aspect-ratio:16/10;object-fit:cover;object-position:top">
  </div>
  <div class="foot"><img src="${photo}"><span>by <b style="color:#fff">Bala Venkatesh</b></span><span class="bv">BV</span><span class="dom">Bala App Store</span></div>`);

/* ---------------------------------------------------------------- icons */
const ICON_SVG = (rounded = true) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#22d3ee"/><stop offset="1" stop-color="#6366f1"/></linearGradient></defs>
<rect width="64" height="64" rx="${rounded ? 14 : 0}" fill="url(#g)"/>
<text x="32" y="42" text-anchor="middle" font-family="'Space Mono','DejaVu Sans Mono',monospace" font-weight="700" font-size="27" fill="#fff">BV</text></svg>`;
const iconPage = (size, { rounded = true, pad = 0 } = {}) => `<!doctype html><html><head>
<link href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@700&display=swap" rel="stylesheet">
<style>*{margin:0}html,body{width:${size}px;height:${size}px;background:${rounded ? 'transparent' : '#6366f1'};overflow:hidden}
.w{width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:${pad ? 'linear-gradient(135deg,#22d3ee,#6366f1)' : 'transparent'}}
.w svg{width:${100 - pad * 2}%;height:${100 - pad * 2}%}</style></head><body><div class="w">${ICON_SVG(rounded && !pad)}</div></body></html>`;

/* ---------------------------------------------------------------- render */
const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox'] });
const shot = async (html, file, w = 1200, h = 630, type = 'jpeg') => {
  const p = await browser.newPage();
  await p.setViewport({ width: w, height: h });
  await p.setContent(html, { waitUntil: 'networkidle0' });
  await p.evaluate(() => document.fonts.ready);
  mkdirSync(file.slice(0, file.lastIndexOf('/')), { recursive: true });
  await p.screenshot({ path: file, type, ...(type === 'jpeg' ? { quality: 88 } : { omitBackground: true }) });
  await p.close();
  console.log('wrote', file.replace(root, ''));
};

const lessons = readLessons();
await shot(siteCard(), pub('og/site.jpg'));
await shot(lessonsCard(lessons.length), pub('og/lessons.jpg'));
for (const l of lessons) await shot(lessonCard(l), pub(`og/lessons/${l.slug}.jpg`));
for (const a of APPS) await shot(appCard(a), pub(`og/apps/${a.slug}.jpg`));

writeFileSync(pub('favicon.svg'), ICON_SVG(true));
await shot(iconPage(32), pub('favicon-32.png'), 32, 32, 'png');
await shot(iconPage(180, { rounded: false }), pub('apple-touch-icon.png'), 180, 180, 'png');
await shot(iconPage(192), pub('icons/icon-192.png'), 192, 192, 'png');
await shot(iconPage(512), pub('icons/icon-512.png'), 512, 512, 'png');
await shot(iconPage(512, { pad: 10 }), pub('icons/maskable-512.png'), 512, 512, 'png');
await browser.close();

// favicon.ico (32x32) for old browsers and crawlers that only ask for /favicon.ico
try {
  execFileSync('ffmpeg', ['-v', 'error', '-y', '-i', pub('favicon-32.png'), pub('favicon.ico')]);
  console.log('wrote public/favicon.ico');
} catch {
  if (!existsSync(pub('favicon.ico'))) console.warn('ffmpeg missing: favicon.ico not written');
}
