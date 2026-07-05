"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DocsSidebar } from "@/components/docs-chrome";
import { docsNav } from "@/lib/docs";

function slugFromPathname(pathname: string): string[] {
  const base = "/docs";
  if (pathname === base) return [];
  if (!pathname.startsWith(`${base}/`)) return [];
  return pathname.slice(base.length + 1).split("/");
}

export function DocsSidebarNav() {
  const pathname = usePathname() ?? "/docs";
  const slug = slugFromPathname(pathname);

  return <DocsSidebar groups={docsNav} currentSlug={slug} />;
}

export function DocsSidebarPanel() {
  return (
    <aside className="docs-sidebar hidden w-[260px] shrink-0 border-r border-white/10 lg:block">
      <div className="sticky top-14 max-h-[calc(100vh-3.5rem)] overflow-y-auto px-4 py-6 sm:px-6">
        <DocsSidebarNav />
      </div>
    </aside>
  );
}

export function DocsFooterLinks() {
  return (
    <div className="mt-16 flex flex-wrap gap-4 border-t border-white/10 pt-8 text-sm text-zinc-500">
      <Link href="/docs/quickstart" className="hover:text-white">
        Quick Start
      </Link>
      <Link href="/install" className="hover:text-white">
        Install
      </Link>
      <Link href="/faq" className="hover:text-white">
        FAQ
      </Link>
      <Link href="/" className="hover:text-white">
        Back to site
      </Link>
    </div>
  );
}
