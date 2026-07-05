import Link from "next/link";
import { CodeBlock, DocList, InfoCard } from "@/components/ui";
import { ScreenshotPlaceholder } from "@/components/screenshot-placeholder";
import type { DocBlock, DocNavGroup, DocTocItem } from "@/lib/docs";
import { docHref, slugifyHeading } from "@/lib/docs";

export function ScreenshotSlot({ alt, image }: { alt: string; image: string }) {
  return (
    <figure className="docs-screenshot my-8 overflow-hidden rounded-xl border border-white/10 bg-zinc-900">
      <ScreenshotPlaceholder
        alt={alt}
        image={image}
        framed
        className="rounded-none border-0 bg-zinc-900"
      />
    </figure>
  );
}

function FeatureCards({ items }: { items: { title: string; description: string }[] }) {
  const accents = ["violet", "cyan", "violet", "cyan"] as const;
  return (
    <div className="not-prose my-8 grid gap-4 sm:grid-cols-2">
      {items.map((card, i) => (
        <InfoCard
          key={card.title}
          title={card.title}
          description={card.description}
          accent={accents[i % accents.length]}
        />
      ))}
    </div>
  );
}

export function DocContent({
  blocks,
  compact = false,
}: {
  blocks: DocBlock[];
  compact?: boolean;
}) {
  const h2Class = compact
    ? "docs-anchor mt-10 scroll-mt-24 text-xl font-semibold text-white first:mt-0"
    : "docs-anchor mt-12 scroll-mt-24 text-xl font-semibold text-white first:mt-0";
  const h3Class = compact
    ? "docs-anchor mt-7 scroll-mt-24 text-base font-semibold text-white"
    : "docs-anchor mt-8 scroll-mt-24 text-base font-semibold text-white";
  const pClass = compact
    ? "mt-4 break-words text-[15px] leading-7 text-zinc-300"
    : "mt-5 break-words text-[15px] leading-7 text-zinc-300";

  return (
    <div className="docs-prose min-w-0 max-w-full">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "paragraph":
            return (
              <p key={i} className={pClass}>
                {block.text}
              </p>
            );
          case "heading": {
            const level = block.level ?? 2;
            const id = slugifyHeading(block.text);
            if (level === 3) {
              return (
                <h3 key={i} id={id} className={h3Class}>
                  {block.text}
                </h3>
              );
            }
            return (
              <h2 key={i} id={id} className={h2Class}>
                {block.text}
              </h2>
            );
          }
          case "list":
            return <DocList key={i} items={block.items} />;
          case "code":
            return (
              <div key={i} className="docs-code-block mt-5 min-w-0 max-w-full">
                <CodeBlock language={block.language}>{block.code}</CodeBlock>
              </div>
            );
          case "cards":
            return <FeatureCards key={i} items={block.items} />;
          case "screenshot":
            return <ScreenshotSlot key={i} alt={block.alt} image={block.image} />;
          default:
            return null;
        }
      })}
    </div>
  );
}

export function DocsSidebar({
  groups,
  currentSlug,
}: {
  groups: DocNavGroup[];
  currentSlug: string[];
}) {
  const currentPath = currentSlug.join("/");

  return (
    <nav className="space-y-6">
      {groups.map((group) => (
        <div key={group.title}>
          <p className="mb-1.5 px-3 text-sm font-medium text-zinc-300">{group.title}</p>
          <ul>
            {group.items.map((item) => {
              const href = docHref(item.slug);
              const active =
                item.slug.length === 0
                  ? currentSlug.length === 0
                  : item.slug.join("/") === currentPath;
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={`block rounded-md px-3 py-1.5 text-sm transition-colors ${
                      active
                        ? "bg-violet-500/12 font-medium text-violet-300"
                        : "text-zinc-500 hover:bg-white/[0.04] hover:text-zinc-200"
                    }`}
                  >
                    {item.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}

export function DocsBreadcrumb({
  group,
  title,
}: {
  group: string;
  title: string;
}) {
  return (
    <nav className="mb-2 flex min-w-0 items-center gap-1.5 text-sm text-zinc-500">
      <span>{group}</span>
      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
      <span className="truncate text-zinc-300">{title}</span>
    </nav>
  );
}

export function OnThisPage({ items }: { items: DocTocItem[] }) {
  if (items.length === 0) return null;

  return (
    <nav className="space-y-3">
      <p className="text-sm font-medium text-zinc-300">On this page</p>
      <ul className="space-y-2 border-l border-white/10">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={`block border-l-2 py-0.5 text-sm transition-colors hover:text-white ${
                item.level === 3 ? "ml-3 pl-3" : "pl-3"
              } border-transparent text-zinc-500 hover:border-violet-400/50`}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
