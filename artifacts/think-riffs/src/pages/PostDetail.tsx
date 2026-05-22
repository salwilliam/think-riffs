import { useEffect } from "react";
import { useParams, Link } from "wouter";
import { format, parseISO } from "date-fns";
import { ChevronLeft } from "lucide-react";
import postsData from "@/data-posts.json";
import { Post } from "@/data/types";
import NotFound from "./not-found";

export default function PostDetail() {
  const params = useParams();
  const slug = params.slug;

  const posts = postsData as Post[];
  const post = posts.find((p) => p.slug === slug);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post || post.draft) {
    return <NotFound />;
  }

  return (
    <article className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500 mb-10">
      {post.featuredImage && (
        <div className="w-full h-[30vh] sm:h-[40vh] md:h-[50vh] bg-gray-100 border-b border-gray-100">
          <img 
            src={post.featuredImage} 
            alt={post.title} 
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <div className="p-6 md:p-10 lg:p-12">
        <Link 
          href="/" 
          className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-accent mb-8 transition-colors"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to home
        </Link>
        
        <header className="mb-10 text-center">
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {post.categories.map(cat => (
              <span 
                key={cat} 
                className="text-accent text-xs font-bold uppercase tracking-widest"
              >
                {cat}
              </span>
            ))}
          </div>
          
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-gray-900 mb-6 leading-tight">
            {post.title}
          </h1>
          
          <div className="text-sm font-medium text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-8">
            {format(parseISO(post.date), 'MMMM d, yyyy')}
          </div>
        </header>

        <div 
          className="prose prose-lg prose-gray max-w-none 
            prose-headings:font-serif prose-headings:font-bold prose-headings:text-gray-900
            prose-p:text-gray-700 prose-p:leading-relaxed
            prose-a:text-accent prose-a:no-underline hover:prose-a:underline
            prose-blockquote:border-l-accent prose-blockquote:bg-gray-50 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r-lg prose-blockquote:not-italic
            prose-img:rounded-xl prose-img:shadow-sm"
          dangerouslySetInnerHTML={{ __html: post.content }} 
        />
      </div>
    </article>
  );
}
