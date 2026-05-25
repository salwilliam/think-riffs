import { useMemo, useState } from "react";
import { Link } from "wouter";
import { format, parseISO } from "date-fns";
import postsData from "@/data-posts.json";
import { ALL_CATEGORIES, Post } from "@/data/types";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Cast imported JSON to Post[] type
  const posts = postsData as Post[];

  const filteredPosts = useMemo(() => {
    let result = posts.filter(post => !post.draft);
    if (selectedCategory) {
      result = result.filter(post => post.categories.includes(selectedCategory));
    }
    // Sort by date descending
    return result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [posts, selectedCategory]);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(prev => prev === category ? null : category);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Category Filter Bar */}
      <div className="flex flex-wrap gap-2 pb-4 border-b border-gray-200">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-md transition-colors ${
            selectedCategory === null 
              ? "bg-accent text-white" 
              : "bg-white text-muted-foreground hover:bg-gray-100 border border-gray-200"
          }`}
          data-testid="filter-category-all"
        >
          All
        </button>
        {ALL_CATEGORIES.map(category => (
          <button
            key={category}
            onClick={() => handleCategoryClick(category)}
            className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-md transition-colors ${
              selectedCategory === category 
                ? "bg-accent text-white" 
                : "bg-white text-muted-foreground hover:bg-gray-100 border border-gray-200"
            }`}
            data-testid={`filter-category-${category}`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Posts Grid */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredPosts.map(post => (
            <Link 
              key={post.id} 
              href={`/post/${post.slug}`}
              className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col h-full"
              data-testid={`post-card-${post.id}`}
            >
              <div className="aspect-video w-full bg-gray-100 overflow-hidden relative border-b border-gray-100">
                {post.featuredImage ? (
                  <img 
                    src={post.featuredImage} 
                    alt={post.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100 group-hover:bg-gray-200 transition-colors">
                    <span className="text-gray-400 font-serif italic text-xl">
                      {post.categories[0] || 'Think Riffs'}
                    </span>
                  </div>
                )}
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex flex-wrap gap-2 mb-3">
                  {post.categories.slice(0, 3).map(cat => (
                    <span 
                      key={cat} 
                      className="text-accent text-[10px] font-bold uppercase tracking-wider"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
                <h2 className="text-2xl text-gray-900 mb-2 leading-tight group-hover:text-accent transition-colors line-clamp-2" style={{ fontFamily: "'Faculty Glyphic', sans-serif" }}>
                  {post.title}
                </h2>
                <div 
                  className="text-gray-600 mb-4 line-clamp-3 text-sm leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: post.excerpt }} 
                />
                <div className="mt-auto text-xs font-medium text-gray-400 uppercase tracking-wide">
                  {format(parseISO(post.date), 'MMMM d, yyyy')}
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-xl border border-gray-100" data-testid="empty-state">
          <p className="text-gray-500">No posts found for this category.</p>
          <button 
            onClick={() => setSelectedCategory(null)}
            className="mt-4 text-accent hover:underline font-medium"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
