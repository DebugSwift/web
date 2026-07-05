import Image from "next/image";
import Link from "next/link";
import { DocsSearch } from "@/components/docs-search";
import { GitHubIcon } from "@/components/github-stars-link";
import { Button } from "@/components/ui";
import { site } from "@/lib/site";

export function DocsHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0c0c14]/95 backdrop-blur-xl">
      <div className="flex h-14 items-center gap-4 px-4 sm:px-6">
        <Link href="/" className="flex shrink-0 items-center gap-2 font-semibold text-white">
          <Image
            src={site.logo}
            alt=""
            width={28}
            height={28}
            className="rounded-full"
          />
          <span className="hidden sm:inline">{site.name}</span>
        </Link>

        <div className="mx-auto flex max-w-md flex-1 items-center justify-center gap-2">
          <DocsSearch />
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <Link
            href="/support"
            className="hidden text-sm text-zinc-400 transition hover:text-white sm:inline"
          >
            Support
          </Link>
          <Button href="/install" variant="primary" className="!px-3 !py-1.5 !text-xs sm:!px-4 sm:!text-sm">
            Install
          </Button>
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-zinc-400 transition hover:bg-white/5 hover:text-white"
            aria-label="GitHub"
          >
            <GitHubIcon className="h-5 w-5" />
          </a>
        </div>
      </div>
    </header>
  );
}
