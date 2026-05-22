export interface Post {
  id: number;
  slug: string;
  date: string;
  title: string;
  excerpt: string;
  content: string;
  categories: string[];
  featuredImage: string | null;
  draft?: boolean;
}

export const ALL_CATEGORIES = [
  "AI",
  "art",
  "crypto",
  "culture",
  "economics",
  "investing",
  "markets",
  "music",
  "philosophy",
  "poetry",
  "poker",
  "politics",
  "sport",
] as const;

export type Category = (typeof ALL_CATEGORIES)[number];
