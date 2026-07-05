"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import type { DocBlock } from "@/lib/docs";

function blocksToMarkdown(blocks: DocBlock[]): string {
  return blocks
    .map((b) => {
      switch (b.type) {
        case "paragraph":
          return b.text;
        case "heading":
          return `${"#".repeat(b.level ?? 2)} ${b.text}`;
        case "list":
          return b.items.map((i) => `- ${i}`).join("\n");
        case "code":
          return `\`\`\`${b.language ?? ""}\n${b.code}\n\`\`\``;
        case "cards":
          return b.items.map((c) => `### ${c.title}\n${c.description}`).join("\n\n");
        case "screenshot":
          return `![${b.alt}](${b.image})`;
        default:
          return "";
      }
    })
    .filter(Boolean)
    .join("\n\n");
}

export function CopyPageButton({ blocks }: { blocks: DocBlock[] }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(blocksToMarkdown(blocks));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.03] px-2.5 py-1.5 text-xs font-medium text-zinc-400 transition hover:border-white/20 hover:text-white sm:px-3"
      aria-label={copied ? "Copied" : "Copy page"}
    >
      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
        />
      </svg>
      <span className="hidden sm:inline">{copied ? "Copied" : "Copy page"}</span>
    </button>
  );
}

export function DocsMobileNav({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <div className="border-b border-white/10 px-4 py-3 sm:px-6 lg:hidden">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 text-sm text-zinc-400"
          aria-expanded={open}
          aria-controls="docs-mobile-nav"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          Menu
        </button>
      </div>

      {open && (
        <>
          <button
            type="button"
            className="fixed inset-0 z-40 bg-black/60 lg:hidden"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          />
          <div
            id="docs-mobile-nav"
            className="fixed top-14 bottom-0 left-0 z-50 w-[min(280px,85vw)] overflow-y-auto border-r border-white/10 bg-[#0c0c14] px-4 py-6 shadow-2xl lg:hidden"
          >
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm font-medium text-zinc-300">Documentation</p>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-lg p-1.5 text-zinc-400 transition hover:bg-white/5 hover:text-white"
                aria-label="Close menu"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {children}
          </div>
        </>
      )}
    </>
  );
}
