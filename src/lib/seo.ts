import lessons from '../seo/lessons.json';

/**
 * Keeps <title>, description, canonical and the share tags in step with the current view
 * (home, lessons hub, a lesson). Crawlers that don't run JS get the static versions from
 * index.html and the generated /lessons/<slug>/ pages; this covers browsers and Google.
 */
export const SITE_URL = 'https://balavenkatesh.is-a.dev';

const HOME = {
  title: 'Bala Venkatesh | Lead AI Engineer & Enterprise Architect',
  description:
    'Lead AI Engineer at Standard Chartered Bank with 10+ years shipping production GenAI, RAG, multi-agent systems and on-device AI across banking, agritech and healthcare. Free 3D AI apps, lessons and reels.',
  path: '/',
  image: '/og/site.jpg',
};

interface PageMeta { title: string; description: string; path: string; image: string }

export function metaForHash(hash: string): PageMeta {
  if (!hash.startsWith('#lessons')) return HOME;
  const slug = hash.match(/^#lessons\/(?:post\/)?([\w-]+)$/)?.[1];
  const lesson = slug ? lessons.find((l) => l.slug === slug) : undefined;
  if (lesson) {
    return { title: `${lesson.title} | Bala Venkatesh`, description: lesson.excerpt, path: `/lessons/${lesson.slug}/`, image: `/og/lessons/${lesson.slug}.jpg` };
  }
  return {
    title: 'Lessons from Production AI | Bala Venkatesh',
    description: 'How Bala Venkatesh thinks about LLMs, RAG, AI agents, product and leadership, from shipping AI in a bank, a clinic and a farm.',
    path: '/lessons/',
    image: '/og/lessons.jpg',
  };
}

const setMeta = (attr: 'name' | 'property', key: string, value: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.content = value;
};

export function applyMeta(m: PageMeta) {
  const url = SITE_URL + m.path;
  const image = SITE_URL + m.image;
  document.title = m.title;
  setMeta('name', 'description', m.description);
  let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.rel = 'canonical';
    document.head.appendChild(canonical);
  }
  canonical.href = url;
  setMeta('property', 'og:url', url);
  setMeta('property', 'og:title', m.title);
  setMeta('property', 'og:description', m.description);
  setMeta('property', 'og:image', image);
  setMeta('name', 'twitter:title', m.title);
  setMeta('name', 'twitter:description', m.description);
  setMeta('name', 'twitter:image', image);
}
