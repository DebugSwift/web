import Link from "next/link";
import { notFound } from "next/navigation";
import { DocContent } from "@/components/docs-chrome";
import { CTABand, Container } from "@/components/ui";
import { getBlogArticle } from "@/lib/blog";
import { blogPosts } from "@/lib/routes";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const article = getBlogArticle(slug);
  if (!article) notFound();

  return (
    <>
      <header className="border-b border-white/10">
        <Container>
          <div className="mx-auto max-w-3xl py-8 sm:py-10">
            <Link
              href="/blog"
              className="text-sm text-zinc-500 transition hover:text-violet-400"
            >
              ← Back to blog
            </Link>
            <p className="mt-3 text-xs font-medium uppercase tracking-wide text-violet-400">
              {post.category}
            </p>
            <h1 className="mt-1.5 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {post.title}
            </h1>
            <p className="mt-3 text-lg leading-relaxed text-zinc-400">{post.excerpt}</p>
          </div>
        </Container>
      </header>
      <article className="pb-16 pt-6 sm:pt-8">
        <Container>
          <div className="blog-prose mx-auto max-w-3xl">
            <DocContent blocks={article.blocks} compact />
          </div>
        </Container>
      </article>
      <CTABand />
    </>
  );
}
