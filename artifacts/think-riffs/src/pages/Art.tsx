import { artItems } from "@/data/art";
import { Link } from "wouter";

export default function Art() {
  return (
    <div className="max-w-4xl mx-auto py-8 animate-in fade-in duration-500">
      <header className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">Art</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Blending words and photography into artpoems. For music, go to <a href="https://www.youtube.com/@salsongs" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline font-medium">salsongs</a>.
        </p>
      </header>

      <div className="space-y-16 md:space-y-24">
        {artItems.map((item, i) => (
          <article key={i} className="flex flex-col bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden" data-testid={`art-item-${i}`}>
            {item.postSlug ? (
              <Link href={`/post/${item.postSlug}`} className="block group overflow-hidden">
                <img 
                  src={item.imageUrl} 
                  alt={item.title} 
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                  loading="lazy"
                />
              </Link>
            ) : (
              <div className="block overflow-hidden">
                <img 
                  src={item.imageUrl} 
                  alt={item.title} 
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
              </div>
            )}
            
            <div className="p-6 md:p-8 text-center border-t border-gray-50">
              <h2 className="text-xl md:text-2xl font-serif font-bold text-gray-900 mb-2">
                {item.postSlug ? (
                  <Link href={`/post/${item.postSlug}`} className="hover:text-accent transition-colors">
                    {item.title}
                  </Link>
                ) : (
                  item.title
                )}
              </h2>
              <div className="text-sm font-medium text-gray-400 mb-3">{item.year}</div>
              <p className="text-gray-600 text-sm md:text-base">{item.caption}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
