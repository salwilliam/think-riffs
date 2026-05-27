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

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function absoluteImage(img) {
  if (!img) return `${BASE_URL}/images/frankenstein-two-paths.jpg`;
  if (img.startsWith('http')) return img;
  return `${BASE_URL}${img}`;
}

function truncate(str, max) {
  if (str.length <= max) return str;
  return str.slice(0, max - 1).trimEnd() + '…';
}

let generated = 0;

for (const post of posts) {
  if (post.draft) continue;

  const title = escapeHtml(truncate(`${post.title} — Think Riffs`, 60));
  const description = escapeHtml(truncate(post.excerpt || post.title, 160));
  const image = absoluteImage(post.featuredImage);
  const url = `${BASE_URL}/post/${post.slug}`;

  let html = template;

  // <title>
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`);

  // meta description
  html = html.replace(
    /<meta name="description" content="[^"]*"/,
    `<meta name="description" content="${description}"`
  );

  // og tags
  html = html.replace(/(<meta property="og:title" content=")[^"]*(")/,  `$1${title}$2`);
  html = html.replace(/(<meta property="og:description" content=")[^"]*(")/,  `$1${description}$2`);
  html = html.replace(/(<meta property="og:image" content=")[^"]*(")/,  `$1${image}$2`);
  // insert og:url after og:type if not already present, else replace
  if (html.includes('property="og:url"')) {
    html = html.replace(/(<meta property="og:url" content=")[^"]*(")/,  `$1${url}$2`);
  } else {
    html = html.replace(/(<meta property="og:type"[^>]*>)/, `$1\n    <meta property="og:url" content="${url}" />`);
  }

  // twitter tags
  html = html.replace(/(<meta name="twitter:title" content=")[^"]*(")/,  `$1${title}$2`);
  html = html.replace(/(<meta name="twitter:description" content=")[^"]*(")/,  `$1${description}$2`);
  html = html.replace(/(<meta name="twitter:image" content=")[^"]*(")/,  `$1${image}$2`);

  const outDir = path.join(distDir, 'post', post.slug);
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'index.html'), html);
  generated++;
}

console.log(`✓ Generated OG pages for ${generated} posts`);
