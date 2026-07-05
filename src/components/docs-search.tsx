"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  getDocSearchEntries,
  searchDocEntries,
  type DocSearchEntry,
} from "@/lib/docs";

const entries = getDocSearchEntries();

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  );
}

function SearchResult({
  entry,
  active,
  onSelect,
}: {
  entry: DocSearchEntry & { excerpt: string };
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <Link
      href={entry.href}
      onClick={onSelect}
      className={`block rounded-lg px-3 py-2.5 transition-colors ${
        active ? "bg-violet-500/15 text-white" : "text-zinc-300 hover:bg-white/[0.04]"
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-medium">{entry.title}</p>
        <span className="shrink-0 text-xs text-zinc-500">{entry.group}</span>
      </div>
      <p className="mt-0.5 line-clamp-2 text-xs leading-relaxed text-zinc-500">{entry.excerpt}</p>
    </Link>
  );
}

export function DocsSearch() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const results = useMemo(() => searchDocEntries(entries, query), [query]);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActiveIndex(0);
  }, []);

  const openSearch = useCallback(() => {
    setOpen(true);
    setActiveIndex(0);
  }, []);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
        setActiveIndex(0);
        return;
      }

      if (!open) return;

      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }

      if (results.length === 0) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((i) => (i + 1) % results.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((i) => (i - 1 + results.length) % results.length);
      } else if (e.key === "Enter") {
        e.preventDefault();
        const target = results[activeIndex];
        if (target) {
          close();
          router.push(target.href);
        }
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, results, activeIndex, close, router]);

  useEffect(() => {
    if (open) {
      const id = window.requestAnimationFrame(() => inputRef.current?.focus());
      return () => window.cancelAnimationFrame(id);
    }
  }, [open]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={openSearch}
        className="hidden w-full items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 text-left transition hover:border-white/20 md:flex"
        aria-label="Search documentation"
      >
        <SearchIcon className="h-4 w-4 text-zinc-500" />
        <span className="text-sm text-zinc-500">Search…</span>
        <kbd className="ml-auto hidden rounded border border-white/10 bg-white/5 px-1.5 py-0.5 text-[10px] text-zinc-500 lg:inline">
          ⌘K
        </kbd>
      </button>

      <button
        type="button"
        onClick={openSearch}
        className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-zinc-400 transition hover:bg-white/5 hover:text-white md:hidden"
        aria-label="Search documentation"
      >
        <SearchIcon className="h-5 w-5" />
      </button>

      {open && (
        <div className="fixed inset-0 z-[60] flex items-start justify-center px-4 pt-[12vh] sm:px-6">
          <button
            type="button"
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            aria-label="Close search"
            onClick={close}
          />

          <div
            role="dialog"
            aria-modal="true"
            aria-label="Search documentation"
            className="relative z-10 w-full max-w-xl overflow-hidden rounded-xl border border-white/10 bg-[#0c0c14] shadow-2xl"
          >
            <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
              <SearchIcon className="h-4 w-4 shrink-0 text-zinc-500" />
              <input
                ref={inputRef}
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search docs…"
                className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-zinc-500"
                autoComplete="off"
                spellCheck={false}
              />
              <kbd className="hidden rounded border border-white/10 bg-white/5 px-1.5 py-0.5 text-[10px] text-zinc-500 sm:inline">
                esc
              </kbd>
            </div>

            <div className="max-h-[min(50vh,360px)] overflow-y-auto p-2">
              {query.trim() === "" ? (
                <p className="px-3 py-6 text-center text-sm text-zinc-500">
                  Search pages by title or content
                </p>
              ) : results.length === 0 ? (
                <p className="px-3 py-6 text-center text-sm text-zinc-500">
                  No results for &ldquo;{query}&rdquo;
                </p>
              ) : (
                <ul className="space-y-0.5">
                  {results.map((entry, i) => (
                    <li key={entry.href}>
                      <SearchResult
                        entry={entry}
                        active={i === activeIndex}
                        onSelect={close}
                      />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
