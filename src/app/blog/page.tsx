import { BlogHero } from "@/components/blog/BlogHero";
import { BlogList } from "@/components/blog/BlogList";

export default function BlogPage() {
  return (
    <main className="flex flex-col">
      <BlogHero />
      <BlogList />
    </main>
  );
}
