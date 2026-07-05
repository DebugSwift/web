import Link from "next/link";
import { Card, Container, PageHero } from "@/components/ui";
import { blogPosts } from "@/lib/routes";

export const metadata = {
  title: "Blog",
  description: "Engineering notes on iOS debugging, network inspection, and Swift performance.",
};

export default function BlogPage() {
  return (
    <>
      <PageHero
        compact
        title="DebugSwift Blog"
        description="Technical articles on in-app debugging, network inspection, and Swift performance."
      />
      <section className="pb-20 pt-8">
        <Container>
          <div className="mx-auto grid max-w-3xl gap-4">
            {blogPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="block">
                <Card className="transition hover:border-violet-500/30 hover:bg-white/[0.05]">
                  <span className="text-xs font-medium uppercase tracking-wide text-violet-400">
                    {post.category}
                  </span>
                  <h2 className="mt-1.5 text-lg font-semibold text-white">{post.title}</h2>
                  <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">{post.excerpt}</p>
                  {post.rockxyEquivalent && (
                    <p className="mt-2 text-xs text-zinc-600">
                      Rockxy equivalent: {post.rockxyEquivalent}
                    </p>
                  )}
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
