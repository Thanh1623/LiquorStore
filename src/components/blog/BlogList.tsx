import Image from "next/image";
import Link from "next/link";

const posts = [
  {
    id: 1,
    title: "The Art of Aging Whiskey",
    excerpt: "Discover why time in the barrel is the most crucial ingredient in our finest whiskies.",
    date: "May 8, 2026",
    image: "https://images.unsplash.com/photo-1527281400688-1961e5f171d2?auto=format&fit=crop&w=600&h=400&q=80",
  },
  {
    id: 2,
    title: "Understanding Gin Botanicals",
    excerpt: "From juniper to citrus peels, explore the complex blend of aromatics in our gins.",
    date: "May 5, 2026",
    image: "https://images.unsplash.com/photo-1598214886806-c87b84b7078b?auto=format&fit=crop&w=600&h=400&q=80",
  },
  {
    id: 3,
    title: "Classic Cocktails Reimagined",
    excerpt: "Simple twists that bring traditional recipes into the modern era.",
    date: "May 1, 2026",
    image: "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?auto=format&fit=crop&w=600&h=400&q=80",
  },
];

export function BlogList() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-12">
          {posts.map((post) => (
            <div key={post.id} className="group">
              <div className="relative aspect-[4/3] mb-6 overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <p className="text-[#AB4227] text-sm italic font-serif mb-2">{post.date}</p>
              <h3 className="text-2xl font-serif font-bold text-[#212529] mb-4 group-hover:underline underline-offset-4">
                {post.title}
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">{post.excerpt}</p>
              <Link href={`/blog/${post.id}`} className="text-[#AB4227] font-bold underline">
                Read More
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
