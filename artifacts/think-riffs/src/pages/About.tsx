import { aboutHtml } from "@/data/about";

export default function About() {
  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-sm border border-gray-100 p-8 md:p-12 animate-in fade-in duration-500 my-8">
      <div 
        className="prose prose-lg prose-gray max-w-none
          prose-p:text-gray-700 prose-p:leading-relaxed
          prose-a:text-accent prose-a:no-underline hover:prose-a:underline
          prose-img:rounded-xl prose-img:shadow-sm
          [&_.about-profile]:flex [&_.about-profile]:justify-center [&_.about-profile]:mb-8
          [&_.about-profile_img]:w-[150px] [&_.about-profile_img]:h-[150px] [&_.about-profile_img]:rounded-full [&_.about-profile_img]:object-cover [&_.about-profile_img]:border-4 [&_.about-profile_img]:border-white [&_.about-profile_img]:shadow-md
          [&_p.divider]:text-center [&_p.divider]:text-2xl [&_p.divider]:text-gray-300 [&_p.divider]:my-8 [&_p.divider]:font-serif
          [&_figure]:mt-10 [&_figcaption]:text-center [&_figcaption]:text-sm [&_figcaption]:text-gray-500 [&_figcaption]:mt-3"
        dangerouslySetInnerHTML={{ __html: aboutHtml }}
      />
    </div>
  );
}
