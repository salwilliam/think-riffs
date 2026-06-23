import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const distDir = path.join(root, 'dist/public');
const postsPath = path.join(root, 'src/data-posts.json');
const BASE_URL = 'https://salwilliam.com';

const posts = JSON.parse(fs.readFileSync(postsPath, 'utf8'));
const template = fs.readFileSync(path.join(distDir, 'index.html'), 'utf8');

function escapeAttr(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function escapeJson(str) {
  return str.replace(/</g, '\\u003c').replace(/>/g, '\\u003e').replace(/&/g, '\\u0026');
}

function absoluteImage(img) {
  if (!img) return `${BASE_URL}/images/frankenstein-two-paths.jpg`;
  if (img.startsWith('http')) return img;
  return `${BASE_URL}${img}`;
}

function truncate(str, max) {
  if (str.length <= max) return str;
  return str.slice(0, max - 1).trimEnd() + '\u2026';
}

function formatDate(dateStr) {
  const d = new Date(dateStr + 'T12:00:00Z');
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
}

let generated = 0;

for (const post of posts) {
  if (post.draft) continue;

  const ogTitle = escapeAttr(truncate(`${post.title} — Think Riffs`, 60));
  const ogDescription = escapeAttr(truncate(post.excerpt || post.title, 160));
  const image = absoluteImage(post.featuredImage);
  const url = `${BASE_URL}/post/${post.slug}`;

  let html = template;

  // <title>
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${ogTitle}</title>`);

  // meta description
  html = html.replace(
    /<meta name="description" content="[^"]*"/,
    `<meta name="description" content="${ogDescription}"`
  );

  // og tags
  html = html.replace(/(<meta property="og:title" content=")[^"]*(")/,   `$1${ogTitle}$2`);
  html = html.replace(/(<meta property="og:description" content=")[^"]*(")/,   `$1${ogDescription}$2`);
  html = html.replace(/(<meta property="og:image" content=")[^"]*(")/,   `$1${image}$2`);
  if (html.includes('property="og:url"')) {
    html = html.replace(/(<meta property="og:url" content=")[^"]*(")/,   `$1${url}$2`);
  } else {
    html = html.replace(/(<meta property="og:type"[^>]*>)/, `$1\n    <meta property="og:url" content="${url}" />`);
  }

  // twitter tags
  html = html.replace(/(<meta name="twitter:title" content=")[^"]*(")/,   `$1${ogTitle}$2`);
  html = html.replace(/(<meta name="twitter:description" content=")[^"]*(")/,   `$1${ogDescription}$2`);
  html = html.replace(/(<meta name="twitter:image" content=")[^"]*(")/,   `$1${image}$2`);

  // JSON-LD Article structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt || post.title,
    image: image,
    datePublished: post.date,
    url: url,
    author: { '@type': 'Person', name: 'Salvatore Wm. Delle Palme' },
    publisher: { '@type': 'Organization', name: 'Think Riffs', url: BASE_URL },
  };
  const jsonLdTag = `\n  <script type="application/ld+json">${escapeJson(JSON.stringify(jsonLd))}</script>`;
  html = html.replace('</head>', `${jsonLdTag}\n</head>`);

  // Inject pre-rendered article content into <div id="root"> so Google reads it
  // React will replace this on load — users never see it, crawlers always do
  const featuredImgHtml = post.featuredImage
    ? `<img src="${escapeAttr(absoluteImage(post.featuredImage))}" alt="${escapeAttr(post.title)}" style="width:100%;max-height:420px;object-fit:cover;border-radius:4px;margin-bottom:1.5rem">`
    : '';
  const categoryHtml = (post.categories || [])
    .map(c => `<span style="font-size:0.75rem;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#e8274b;margin-right:.5rem">${escapeAttr(c)}</span>`)
    .join('');

  const prerender = `<div style="font-family:Georgia,serif;max-width:780px;margin:2rem auto;padding:1rem 1.5rem;color:#222">
  ${featuredImgHtml}
  <div style="margin-bottom:.75rem">${categoryHtml}</div>
  <h1 style="font-size:2rem;font-weight:700;margin:0 0 .5rem">${escapeAttr(post.title)}</h1>
  <time style="font-size:.875rem;color:#666">${formatDate(post.date)}</time>
  <div style="margin-top:1.5rem;line-height:1.75">${post.content}</div>
</div>`;

  html = html.replace('<div id="root"></div>', `<div id="root">${prerender}</div>`);

  const outDir = path.join(distDir, 'post', post.slug);
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'index.html'), html);
  generated++;
}

console.log(`\u2713 Generated pre-rendered pages for ${generated} posts`);
