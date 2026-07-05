"use client";

import { useState } from "react";
import { GitHubStarsLink } from "@/components/github-stars-link";
import { Logo } from "@/components/logo";
import { NavLink } from "@/components/nav-link";
import { headerNav } from "@/lib/site";
import { Button } from "./ui";

export function Header({ stars }: { stars: number }) {
  const [open, setOpen] = useState(false);
  const navItems = headerNav.filter((item) => item.label !== "GitHub");

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#08080f]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Logo />

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              external={"external" in item && item.external === true}
              glow={item.label === "Philosophy"}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <GitHubStarsLink stars={stars} size="compact" />
          <Button href="/install" variant="primary">
            Install
          </Button>
        </div>

        <button
          type="button"
          className="rounded-lg p-2 text-zinc-400 md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 px-5 py-4 md:hidden">
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                external={"external" in item && item.external === true}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <GitHubStarsLink stars={stars} size="compact" />
              <Button href="/install" variant="primary">
                Install
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
