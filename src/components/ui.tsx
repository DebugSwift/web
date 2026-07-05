import Link from "next/link";
import type { ReactNode } from "react";
import { highlightSwift } from "@/lib/swift-highlight";
import { site } from "@/lib/site";

export type Accent = "violet" | "cyan" | "emerald";

const accentStyles: Record<
  Accent,
  { icon: string; line: string; header: string; linkHover: string }
> = {
  violet: {
    icon: "bg-violet-500/10 text-violet-400 ring-1 ring-violet-500/20",
    line: "via-violet-500/60",
    header: "from-violet-500/10",
    linkHover: "hover:text-violet-300",
  },
  cyan: {
    icon: "bg-cyan-500/10 text-cyan-400 ring-1 ring-cyan-500/20",
    line: "via-cyan-500/60",
    header: "from-cyan-500/10",
    linkHover: "hover:text-cyan-300",
  },
  emerald: {
    icon: "bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20",
    line: "via-emerald-500/60",
    header: "from-emerald-500/10",
    linkHover: "hover:text-emerald-300",
  },
};

export function AccentIcon({
  accent,
  children,
  size = "md",
}: {
  accent: Accent;
  children: ReactNode;
  size?: "sm" | "md";
}) {
  const sizes = { sm: "h-6 w-6 rounded-lg", md: "h-10 w-10 rounded-xl" };
  return (
    <div className={`flex shrink-0 items-center justify-center ${sizes[size]} ${accentStyles[accent].icon}`}>
      {children}
    </div>
  );
}

export function AccentCard({
  title,
  body,
  icon,
  accent = "violet",
  className = "",
}: {
  title: string;
  body: ReactNode;
  icon: ReactNode;
  accent?: Accent;
  className?: string;
}) {
  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm transition-colors hover:border-white/15 hover:bg-white/[0.05] ${className}`}
    >
      <div
        className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent ${accentStyles[accent].line} to-transparent opacity-0 transition-opacity group-hover:opacity-100`}
      />
      <AccentIcon accent={accent}>{icon}</AccentIcon>
      <h4 className="mt-4 text-sm font-semibold text-white">{title}</h4>
      <p className="mt-2 text-sm leading-relaxed text-zinc-400">{body}</p>
    </div>
  );
}

export function FeatureGroupCard({
  id,
  title,
  icon,
  accent = "violet",
  children,
}: {
  id?: string;
  title: string;
  icon: ReactNode;
  accent?: Accent;
  children: ReactNode;
}) {
  return (
    <div
      id={id}
      className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm transition-colors hover:border-white/15"
    >
      <div
        className={`flex items-center gap-3 border-b border-white/10 bg-gradient-to-r ${accentStyles[accent].header} to-transparent px-5 py-4`}
      >
        <AccentIcon accent={accent}>{icon}</AccentIcon>
        <h2 className="text-lg font-semibold text-white">{title}</h2>
      </div>
      <ul className="divide-y divide-white/5 p-2">{children}</ul>
    </div>
  );
}

export function FeatureLink({
  href,
  children,
  accent = "violet",
}: {
  href: string;
  children: ReactNode;
  accent?: Accent;
}) {
  return (
    <li>
      <Link
        href={href}
        className={`flex items-start gap-3 rounded-xl px-3 py-2.5 text-sm leading-relaxed text-zinc-400 transition hover:bg-white/[0.04] ${accentStyles[accent].linkHover}`}
      >
        <span
          className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${
            accent === "violet"
              ? "bg-violet-400/60"
              : accent === "cyan"
                ? "bg-cyan-400/60"
                : "bg-emerald-400/60"
          }`}
        />
        {children}
      </Link>
    </li>
  );
}

export function AdvantageList({ items, accent = "cyan" }: { items: string[]; accent?: Accent }) {
  return (
    <ul className="mt-4 grid gap-3 sm:grid-cols-2">
      {items.map((item) => (
        <li
          key={item}
          className="flex gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm leading-relaxed text-zinc-400"
        >
          <AccentIcon accent={accent} size="sm">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-3.5 w-3.5" aria-hidden>
              <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </AccentIcon>
          {item}
        </li>
      ))}
    </ul>
  );
}

export function DocList({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 space-y-1">
      {items.map((item, i) => {
        const accent: Accent = i % 2 === 0 ? "violet" : "cyan";
        return (
          <li
            key={item}
            className="flex gap-3 rounded-lg px-2 py-1.5 text-[15px] leading-7 text-zinc-400"
          >
            <span
              className={`mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full ${
                accent === "violet" ? "bg-violet-400/50" : "bg-cyan-400/50"
              }`}
            />
            {item}
          </li>
        );
      })}
    </ul>
  );
}

export function InfoCard({
  title,
  description,
  accent = "violet",
}: {
  title: string;
  description: string;
  accent?: Accent;
}) {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.02] p-5 transition hover:border-white/15 hover:bg-white/[0.04]">
      <div
        className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent ${accentStyles[accent].line} to-transparent opacity-0 transition-opacity group-hover:opacity-100`}
      />
      <h3 className="text-sm font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-zinc-400">{description}</p>
    </div>
  );
}

export function Container({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-6xl px-5 sm:px-8 ${className}`}>
      {children}
    </div>
  );
}

export function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-xs font-medium tracking-wide text-violet-300 uppercase">
      {children}
    </span>
  );
}

export function Button({
  href,
  children,
  variant = "primary",
  external,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  external?: boolean;
  className?: string;
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-200";
  const styles = {
    primary:
      "bg-gradient-to-r from-violet-500 to-cyan-500 text-white shadow-lg shadow-violet-500/25 hover:brightness-110",
    secondary:
      "border border-white/15 bg-white/5 text-white hover:border-white/25 hover:bg-white/10",
    ghost: "text-zinc-300 hover:text-white",
  }[variant];

  const classes = `${base} ${styles} ${className}`;
  if (external || href.startsWith("http") || href.startsWith("mailto:")) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "text-center" : ""}>
      {eyebrow && <Badge>{eyebrow}</Badge>}
      <h2
        className={`mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl ${align === "center" ? "mx-auto max-w-3xl" : "max-w-2xl"}`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 text-lg text-zinc-400 ${align === "center" ? "mx-auto max-w-2xl" : "max-w-2xl"}`}
        >
          {description}
        </p>
      )}
    </div>
  );
}

export function Card({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <div
      id={id}
      className={`rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm ${className}`}
    >
      {children}
    </div>
  );
}

export function CodeBlock({
  children,
  language,
  className = "",
}: {
  children: string;
  language?: "swift";
  className?: string;
}) {
  return (
    <pre
      className={`max-w-full min-w-0 overflow-x-auto rounded-xl border border-white/10 bg-[#161618] p-3 text-xs sm:p-4 sm:text-sm ${language === "swift" ? "swift-code" : "font-mono text-cyan-200"} ${className}`}
    >
      <code className="block min-w-0">{language === "swift" ? highlightSwift(children) : children}</code>
    </pre>
  );
}

export function PageHero({
  title,
  description,
  children,
  compact = false,
}: {
  title: string;
  description?: string;
  children?: React.ReactNode;
  compact?: boolean;
}) {
  return (
    <section
      className={`border-b border-white/10 ${compact ? "py-10 sm:py-12" : "py-16 sm:py-20"}`}
    >
      <Container>
        <div className="max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            {title}
          </h1>
          {description && (
            <p
              className={`text-lg leading-relaxed text-zinc-400 ${compact ? "mt-4" : "mt-5"}`}
            >
              {description}
            </p>
          )}
          {children && (
            <div className={`flex flex-wrap gap-3 ${compact ? "mt-6" : "mt-8"}`}>
              {children}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}

export function Prose({ children }: { children: React.ReactNode }) {
  return (
    <div className="prose prose-invert prose-zinc max-w-none prose-headings:font-semibold prose-a:text-violet-400 prose-a:no-underline hover:prose-a:underline">
      {children}
    </div>
  );
}

export function CTABand() {
  return (
    <section className="border-t border-white/10 py-16">
      <Container>
        <div className="rounded-3xl border border-violet-500/20 bg-gradient-to-br from-violet-500/10 via-transparent to-cyan-500/10 p-8 sm:p-12">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Debug inside your app. Ship with confidence.
          </h2>
          <p className="mt-3 max-w-xl text-zinc-400">
            {site.description}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button href="/install">Get started</Button>
            <Button href={site.github} variant="secondary" external>
              Star on GitHub
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
