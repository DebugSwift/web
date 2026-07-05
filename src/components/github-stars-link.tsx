import { formatStarCount, site } from "@/lib/github";

export function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.09.66-.22.66-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.58 9.58 0 0 1 12 6.8c.85.004 1.71.115 2.5.34 1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.91.68 1.84v2.73c0 .27.16.58.67.48A10 10 0 0 0 22 12c0-5.52-4.48-10-10-10z" />
    </svg>
  );
}

function StarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
  );
}

export function GitHubStarsLink({
  stars,
  size = "default",
}: {
  stars: number;
  size?: "default" | "compact";
}) {
  const label =
    stars > 0
      ? `Star DebugSwift on GitHub, ${formatStarCount(stars)} stars`
      : "Star DebugSwift on GitHub";

  const compact = size === "compact";

  return (
    <a
      href={site.github}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={`group inline-flex items-stretch overflow-hidden border border-white/15 bg-white/5 font-semibold transition-all duration-200 hover:border-white/25 hover:bg-white/[0.08] ${
        compact ? "rounded-lg text-xs" : "rounded-xl text-sm"
      }`}
    >
      <span
        className={`flex items-center text-zinc-300 transition group-hover:text-white ${
          compact ? "gap-1.5 px-2.5 py-1.5" : "gap-2.5 px-5 py-2.5"
        }`}
      >
        <GitHubIcon className={`shrink-0 ${compact ? "h-3.5 w-3.5" : "h-5 w-5"}`} />
        GitHub
      </span>
      <span
        className={`flex items-center border-l border-white/10 bg-zinc-800/95 tabular-nums ${
          compact ? "gap-1 px-2.5 py-1.5" : "gap-2 px-5 py-2.5"
        }`}
      >
        <StarIcon
          className={`shrink-0 text-amber-400 ${compact ? "h-3.5 w-3.5" : "h-5 w-5"}`}
        />
        <span
          className={`font-bold leading-none text-white ${compact ? "text-sm" : "text-lg"}`}
        >
          {stars > 0 ? formatStarCount(stars) : "-"}
        </span>
      </span>
    </a>
  );
}
