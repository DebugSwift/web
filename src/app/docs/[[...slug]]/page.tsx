import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  DocContent,
  DocsBreadcrumb,
  OnThisPage,
} from "@/components/docs-chrome";
import { CopyPageButton, DocsMobileNav } from "@/components/docs-client";
import { DocsFooterLinks, DocsSidebarNav } from "@/components/docs-sidebar-nav";
import {
  extractDocToc,
  getAllDocSlugs,
  getDocGroupTitle,
  getDocPage,
} from "@/lib/docs";

type Props = {
  params: Promise<{ slug?: string[] }>;
};

export async function generateStaticParams() {
  return getAllDocSlugs().map((slug) =>
    slug.length === 0 ? { slug: undefined } : { slug },
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug = [] } = await params;
  const page = getDocPage(slug);
  if (!page) return { title: "Documentation" };
  return {
    title: page.title,
    description: page.description,
  };
}

export default async function DocsCatchAllPage({ params }: Props) {
  const { slug = [] } = await params;
  const page = getDocPage(slug);
  if (!page) notFound();

  const toc = extractDocToc(page.blocks);
  const group = getDocGroupTitle(slug);

  return (
    <>
      <DocsMobileNav>
        <DocsSidebarNav />
      </DocsMobileNav>

      <div className="mx-auto flex w-full min-w-0 max-w-6xl">
        <article className="min-w-0 flex-1 px-4 py-6 sm:px-6 sm:py-8 lg:max-w-[720px] lg:px-8 lg:py-10">
          <div className="mb-4 flex flex-wrap items-start justify-between gap-3 sm:mb-6">
            <DocsBreadcrumb group={group} title={page.title} />
            <CopyPageButton blocks={page.blocks} />
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {page.title}
          </h1>

          <p className="mt-4 break-words text-base leading-7 text-zinc-400">
            {page.description}
          </p>

          <DocContent blocks={page.blocks} />
          <DocsFooterLinks />
        </article>

        <aside className="hidden w-56 shrink-0 xl:block">
          <div className="sticky top-20 py-10 pl-6 pr-8">
            <OnThisPage items={toc} />
          </div>
        </aside>
      </div>
    </>
  );
}
