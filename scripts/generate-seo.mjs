/**
 * Generates the crawlable, shareable parts of the site into public/ (runs before every build):
 *   /apps/                 static page listing every app
 *   /apps/<slug>/          one page per app: own title, description, canonical, OG/Twitter card, JSON-LD
 *   /lessons/              share URL for the lessons hub (forwards visitors to /#lessons)
 *   /lessons/<slug>/       share URL per published lesson (forwards to /#lessons/post/<slug>)
 *   sitemap.xml, robots.txt, site.webmanifest
 *   src/seo/lessons.json   lesson titles/excerpts the SPA uses for per-view <title> and meta
 * Share images come from scripts/generate-og.mjs (public/og/...).
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import { SITE, PERSON, APPS, readLessons } from './seo-data.mjs';

const root = new URL('../', import.meta.url).pathname;
const write = (rel, content) => {
  const file = root + rel;
  mkdirSync(file.slice(0, file.lastIndexOf('/')), { recursive: true });
  writeFileSync(file, content);
};
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const today = new Date().toISOString().slice(0, 10);
const lessons = readLessons();

const MONTHS = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
const isoDate = (d) => {
  const m = d.toLowerCase().match(/([a-z]+)\s+(?:(\d{1,2}),\s*)?(\d{4})/);
  if (!m || !MONTHS.includes(m[1])) return undefined;
  return `${m[3]}-${String(MONTHS.indexOf(m[1]) + 1).padStart(2, '0')}-${String(m[2] || 1).padStart(2, '0')}`;
};

const personLd = { '@type': 'Person', '@id': `${SITE.url}/#person`, name: PERSON.name, url: `${SITE.url}/` };

/** <head> shared by every generated page. */
const head = ({ title, description, path, image, imageAlt, type = 'website', jsonld, redirect }) => `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${SITE.url}${path}">
<meta name="robots" content="index, follow, max-image-preview:large">
<meta name="author" content="${PERSON.name}">
<meta name="theme-color" content="${SITE.themeColor}">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/favicon-32.png" type="image/png" sizes="32x32">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<meta property="og:site_name" content="${SITE.name}">
<meta property="og:locale" content="${SITE.locale}">
<meta property="og:type" content="${type}">
<meta property="og:url" content="${SITE.url}${path}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:image" content="${SITE.url}${image}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${esc(imageAlt || title)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:site" content="${SITE.twitter}">
<meta name="twitter:creator" content="${SITE.twitter}">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(description)}">
<meta name="twitter:image" content="${SITE.url}${image}">
<meta name="twitter:image:alt" content="${esc(imageAlt || title)}">
<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@graph': jsonld })}</script>
${redirect ? `<script>location.replace(${JSON.stringify(redirect)})</script>` : ''}
<style>
  *{box-sizing:border-box}body{margin:0;font-family:system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;background:#020617;color:#e2e8f0;line-height:1.6}
  a{color:#67e8f9}.wrap{max-width:1040px;margin:0 auto;padding:24px 20px 64px}
  nav{display:flex;align-items:center;gap:12px;margin-bottom:40px}nav a{text-decoration:none;color:#fff;font-weight:700}
  .bv{display:inline-flex;width:36px;height:36px;border-radius:9px;align-items:center;justify-content:center;background:linear-gradient(135deg,#22d3ee,#6366f1);color:#fff;font:700 14px monospace}
  .kicker{font:700 12px/1 monospace;letter-spacing:3px;text-transform:uppercase;color:#22d3ee}
  h1{font-size:clamp(34px,6vw,56px);line-height:1.05;margin:12px 0 16px;color:#fff}
  .lead{font-size:19px;color:#cbd5e1;max-width:720px}
  .btn{display:inline-block;margin-top:24px;padding:14px 26px;border-radius:14px;background:linear-gradient(90deg,#22d3ee,#6366f1);color:#020617;font-weight:800;text-decoration:none}
  .shot{display:block;width:100%;margin-top:36px;border-radius:16px;border:1px solid rgba(255,255,255,.12);box-shadow:0 30px 80px rgba(0,0,0,.5)}
  .tags{display:flex;flex-wrap:wrap;gap:8px;margin-top:18px}.tags span{font:12px monospace;padding:4px 10px;border-radius:8px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12)}
  .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:16px;margin-top:28px}
  .card{display:block;padding:18px;border-radius:16px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1);text-decoration:none;color:#e2e8f0}
  .card img{width:100%;border-radius:10px;aspect-ratio:1200/630;object-fit:cover}.card b{display:block;margin-top:10px;color:#fff}
  footer{margin-top:56px;font-size:14px;color:#94a3b8}
</style>
</head>`;

const nav = `<nav><span class="bv">BV</span><a href="/">Bala Venkatesh</a><span style="color:#475569">/</span><a href="/apps/" style="font-weight:500;color:#94a3b8">Apps</a></nav>`;
const foot = `<footer>Built by <a href="/">Bala Venkatesh</a>, Lead AI Engineer · <a href="/apps/">All apps</a> · <a href="/lessons/">Lessons</a></footer>`;

/* ---------------------------------------------------------------- app pages */
const appLd = (a) => ({
  '@type': a.game ? ['VideoGame', 'SoftwareApplication'] : 'SoftwareApplication',
  '@id': `${SITE.url}/apps/${a.slug}/#app`,
  name: a.name,
  description: a.description,
  url: a.url,
  sameAs: `${SITE.url}/apps/${a.slug}/`,
  image: `${SITE.url}/og/apps/${a.slug}.jpg`,
  screenshot: `${SITE.url}/previews/${a.preview}`,
  applicationCategory: a.category,
  operatingSystem: 'Web browser',
  isAccessibleForFree: true,
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  keywords: a.keywords.join(', '),
  author: personLd,
  creator: personLd,
  ...(a.game ? { gamePlatform: 'Web browser', playMode: ['SinglePlayer', 'MultiPlayer'] } : {}),
});

for (const a of APPS) {
  const others = APPS.filter((o) => o !== a);
  const title = `${a.name} by Bala Venkatesh | Free ${a.game ? '3D game' : 'AI app'}`;
  write(`public/apps/${a.slug}/index.html`, `${head({
    title,
    description: a.description,
    path: `/apps/${a.slug}/`,
    image: `/og/apps/${a.slug}.jpg`,
    imageAlt: `${a.name}: ${a.pitch}`,
    jsonld: [
      appLd(a),
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE.url}/` },
        { '@type': 'ListItem', position: 2, name: 'Apps', item: `${SITE.url}/apps/` },
        { '@type': 'ListItem', position: 3, name: a.name, item: `${SITE.url}/apps/${a.slug}/` },
      ] },
    ],
  })}
<body><div class="wrap">${nav}
<div class="kicker">${esc(a.kicker)} · free in your browser</div>
<h1>${esc(a.name)}</h1>
<p class="lead">${esc(a.description)}</p>
<a class="btn" href="${a.url}?ref=portfolio" rel="noopener">Open ${esc(a.name)} →</a>
<div class="tags">${a.keywords.map((k) => `<span>${esc(k)}</span>`).join('')}</div>
<img class="shot" src="/previews/${a.preview}" alt="${esc(a.name)} screenshot" width="1280" height="800" loading="lazy">
<h2 style="margin-top:56px;color:#fff">More apps by Bala</h2>
<div class="grid">${others.map((o) => `<a class="card" href="/apps/${o.slug}/"><img src="/og/apps/${o.slug}.jpg" alt="" loading="lazy"><b>${esc(o.name)}</b><span style="font-size:14px;color:#94a3b8">${esc(o.pitch)}</span></a>`).join('')}</div>
${foot}</div></body></html>
`);
}

write('public/apps/index.html', `${head({
  title: 'Bala App Store | Free AI apps, 3D learning tools and games by Bala Venkatesh',
  description: 'Every app Bala Venkatesh has built: 3D Agent Lab, AgentDecode 3D, NeuralDecode 3D, Throne Chess 3D, Open LLM Registry and more. Free in your browser.',
  path: '/apps/',
  image: '/og/apps/bala-app-store.jpg',
  jsonld: [{
    '@type': 'ItemList',
    name: 'Bala App Store',
    itemListElement: APPS.map((a, i) => ({ '@type': 'ListItem', position: i + 1, url: `${SITE.url}/apps/${a.slug}/`, name: a.name })),
  }],
})}
<body><div class="wrap">${nav}
<div class="kicker">Bala App Store</div><h1>Free AI apps, 3D learning tools and games</h1>
<p class="lead">Everything Bala Venkatesh has built and shipped for the public. No sign-up, all in your browser.</p>
<div class="grid">${APPS.map((a) => `<a class="card" href="/apps/${a.slug}/"><img src="/og/apps/${a.slug}.jpg" alt="${esc(a.name)}" loading="lazy"><b>${esc(a.name)}</b><span style="font-size:14px;color:#94a3b8">${esc(a.pitch)}</span></a>`).join('')}</div>
${foot}</div></body></html>
`);

/* ---------------------------------------------------------------- lesson share pages */
for (const l of lessons) {
  const target = `/#lessons/post/${l.slug}`;
  write(`public/lessons/${l.slug}/index.html`, `${head({
    title: `${l.title} | Bala Venkatesh`,
    description: l.excerpt,
    path: `/lessons/${l.slug}/`,
    image: `/og/lessons/${l.slug}.jpg`,
    type: 'article',
    redirect: target,
    jsonld: [{
      '@type': 'BlogPosting',
      headline: l.title,
      description: l.excerpt,
      image: `${SITE.url}/og/lessons/${l.slug}.jpg`,
      url: `${SITE.url}/lessons/${l.slug}/`,
      mainEntityOfPage: `${SITE.url}/lessons/${l.slug}/`,
      ...(isoDate(l.date) ? { datePublished: isoDate(l.date) } : {}),
      articleSection: l.series,
      keywords: l.tags.join(', '),
      author: personLd,
      publisher: personLd,
    }],
  })}
<body><div class="wrap">${nav}
<div class="kicker">${esc(l.series)} · ${esc(l.readTime)}</div><h1>${esc(l.title)}</h1>
<p class="lead">${esc(l.excerpt)}</p><a class="btn" href="${target}">Read the lesson →</a>
${foot}</div></body></html>
`);
}

write('public/lessons/index.html', `${head({
  title: 'Lessons from Production AI | Bala Venkatesh',
  description: 'How Bala Venkatesh thinks about LLMs, RAG, AI agents, product and leadership, from shipping AI in a bank, a clinic and a farm.',
  path: '/lessons/',
  image: '/og/lessons.jpg',
  redirect: '/#lessons',
  jsonld: [{
    '@type': 'Blog',
    name: 'Build with Bala: Lessons from Production AI',
    url: `${SITE.url}/lessons/`,
    author: personLd,
    blogPost: lessons.map((l) => ({ '@type': 'BlogPosting', headline: l.title, url: `${SITE.url}/lessons/${l.slug}/` })),
  }],
})}
<body><div class="wrap">${nav}<h1>Lessons from production AI</h1>
<ul>${lessons.map((l) => `<li><a href="/lessons/${l.slug}/">${esc(l.title)}</a></li>`).join('')}</ul>${foot}</div></body></html>
`);

/* ---------------------------------------------------------------- sitemap, robots, manifest */
const urls = [
  ['/', '1.0', 'weekly'],
  ['/apps/', '0.9', 'weekly'],
  ...APPS.map((a) => [`/apps/${a.slug}/`, '0.8', 'monthly']),
  ['/lessons/', '0.8', 'weekly'],
  ...lessons.map((l) => [`/lessons/${l.slug}/`, '0.7', 'monthly']),
];
write('public/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(([p, pr, cf]) => `  <url><loc>${SITE.url}${p}</loc><lastmod>${today}</lastmod><changefreq>${cf}</changefreq><priority>${pr}</priority></url>`).join('\n')}
</urlset>
`);

write('public/robots.txt', `User-agent: *
Allow: /

Sitemap: ${SITE.url}/sitemap.xml
`);

write('public/site.webmanifest', JSON.stringify({
  name: 'Bala Venkatesh | Lead AI Engineer',
  short_name: 'Bala V',
  description: SITE.description,
  start_url: '/',
  scope: '/',
  display: 'standalone',
  background_color: SITE.themeColor,
  theme_color: SITE.themeColor,
  icons: [
    { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
    { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
    { src: '/icons/maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
  ],
}, null, 2) + '\n');

write('src/seo/lessons.json', JSON.stringify(lessons.map(({ slug, title, excerpt }) => ({ slug, title, excerpt })), null, 2) + '\n');

console.log(`[seo] ${APPS.length} app pages, ${lessons.length} lesson pages, ${urls.length} sitemap URLs`);
