# Think Riffs

A personal blog by Salvatore Wm. Delle Palme covering crypto, markets, economics, philosophy, politics, art, poker, and more. Ported from salwilliam.com (WordPress) to a static React + Vite app.

## Run & Operate

- `pnpm --filter @workspace/think-riffs run dev` — run the frontend (port assigned by workflow)
- `pnpm --filter @workspace/api-server run dev` — run the API server (port 8080)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite + Tailwind CSS + shadcn/ui + wouter
- API: Express 5 (currently unused — site is fully static)
- Build: Vite (static output)

## Where things live

- `artifacts/think-riffs/` — the React/Vite frontend (the blog)
- `artifacts/think-riffs/src/pages/` — Home, PostDetail, About, Art, not-found
- `artifacts/think-riffs/src/data-posts.json` — all 74 blog posts (content, categories, featured images)
- `artifacts/think-riffs/src/data/about.ts` — About page content
- `artifacts/think-riffs/src/data/art.ts` — Art page artpoems
- `artifacts/think-riffs/src/data/types.ts` — TypeScript types (Post, Category)
- `artifacts/think-riffs/src/components/Navbar.tsx` — site navigation
- `artifacts/api-server/` — Express backend (unused for now)
- `lib/api-spec/openapi.yaml` — OpenAPI spec (health check only)

## Architecture decisions

- **Fully static, no backend**: All 74 posts are stored as local JSON (`data-posts.json`). No database or API calls needed for the blog content.
- **Content from WordPress REST API**: Posts were ported from salwilliam.com via the WP REST API at `/wp-json/wp/v2/posts`. Images still reference the original WordPress CDN URLs.
- **HTML post content**: Post bodies are raw WordPress HTML rendered via `dangerouslySetInnerHTML` with `@tailwindcss/typography` prose styles applied.
- **wouter for routing**: `/`, `/post/:slug`, `/about`, `/art`

## Product

- **Home** (`/`): Blog post grid with category filter bar, newest-first. Click a category to filter.
- **Post** (`/post/:slug`): Full post with featured image, categories, title, date, and HTML content with typography styles.
- **About** (`/about`): Sal's bio with profile photo.
- **Art** (`/art`): Gallery of artpoems (photo + poem compositions).
- **Nav**: Think Riffs logo → home; ABOUT, ART, X (twitter), SUBSTACK, SUPERCYCLE links.

## Adding new posts

Edit `artifacts/think-riffs/src/data-posts.json` — add a new object to the array following the existing schema:
```json
{
  "id": <number>,
  "slug": "url-slug",
  "date": "YYYY-MM-DD",
  "title": "Post Title",
  "excerpt": "Short preview text...",
  "content": "<p>Full HTML content...</p>",
  "categories": ["crypto", "markets"],
  "featuredImage": "https://..." 
}
```

## User preferences

- Site matches the original salwilliam.com aesthetic: light blue-gray (#e8eef4) background, white cards, red/pink (#e8274b) category labels.
- No emojis in the UI.

## Gotchas

- `data-posts.json` is ~335KB — avoid importing the full file in performance-sensitive contexts.
- Post images are still hosted on salwilliam.com WordPress CDN. If that site goes down, images break. Consider migrating images to object storage.
- The WordPress content HTML includes WP-specific classes (wp-block-*, etc.) — these are unstyled in the React app but harmless.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
