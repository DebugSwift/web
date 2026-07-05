import type { ReactNode } from "react";
import Link from "next/link";
import { ScreenshotPlaceholder } from "@/components/screenshot-placeholder";
import {
  AccentIcon,
  Badge,
  Button,
  Card,
  Container,
  CTABand,
  FeatureLink,
  type Accent,
} from "@/components/ui";
import { docHref } from "@/lib/docs";

export const metadata = {
  title: "Features",
  description: "Network, performance, app tools, interface debugging, and resource browsers for iOS.",
};

const APP_IMG = "/app-screenshots/docs";

const featureGroups: {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  accent: Accent;
  icon: ReactNode;
  items: { label: string; slug: string[] }[];
}[] = [
  {
    id: "network",
    title: "Network Inspector",
    description:
      "Capture HTTP and WebSocket traffic in-process. Decrypt responses, rewrite payloads, and set thresholds without a proxy or certificate install.",
    image: `${APP_IMG}/network-inspector.png`,
    tags: ["HTTP", "WebSocket", "Encryption", "Mocking"],
    accent: "violet",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5" aria-hidden>
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10Z" />
      </svg>
    ),
    items: [
      { label: "HTTP monitoring with filtering and JSON highlighting", slug: ["network", "http-monitoring"] },
      { label: "WebSocket inspector with zero-config frame capture", slug: ["network", "websocket-inspector"] },
      { label: "AES-256/128 encrypted response decryption", slug: ["network", "encryption"] },
      { label: "Response modifier with CSV import/export", slug: ["network", "response-modifier"] },
      { label: "Request thresholds and session history", slug: ["network", "request-thresholds"] },
    ],
  },
  {
    id: "performance",
    title: "Performance",
    description:
      "Watch CPU, memory, and FPS in real time. Catch leaked view controllers, main-thread violations, and overlay a live metrics widget on your UI.",
    image: `${APP_IMG}/performance-metrics-panel.png`,
    tags: ["CPU", "Memory", "Leaks", "FPS"],
    accent: "cyan",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5" aria-hidden>
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    items: [
      { label: "Real-time CPU, memory, and FPS metrics", slug: ["performance", "metrics"] },
      { label: "Memory leak detection for VCs and Views", slug: ["performance", "memory-leaks"] },
      { label: "Main thread violation checker", slug: ["performance", "thread-checker"] },
      { label: "Performance overlay widget", slug: ["performance", "performance-widget"] },
    ],
  },
  {
    id: "app-tools",
    title: "App Tools",
    description:
      "Crash reports with screenshots, live console output, device and build info, push tokens, and custom actions your team registers at runtime.",
    image: `${APP_IMG}/crash-reports-list.png`,
    tags: ["Crashes", "Logs", "Device", "Actions"],
    accent: "violet",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5" aria-hidden>
        <rect x="5" y="2" width="14" height="20" rx="2" />
        <path d="M12 18h.01" strokeLinecap="round" />
      </svg>
    ),
    items: [
      { label: "Crash reports with screenshots and stacks", slug: ["app-tools", "crash-reports"] },
      { label: "Console log monitoring", slug: ["app-tools", "console-logs"] },
      { label: "Device and build info", slug: ["app-tools", "device-info"] },
      { label: "APNS token access", slug: ["app-tools", "apns-tokens"] },
      { label: "Custom debug actions", slug: ["app-tools", "custom-actions"] },
    ],
  },
  {
    id: "interface",
    title: "Interface Tools",
    description:
      "Inspect view hierarchies in 3D, overlay grids and borders, slow down animations, track SwiftUI renders, and record annotated screenshots for QA.",
    image: `${APP_IMG}/interface-tools.png`,
    tags: ["Hierarchy", "Grid", "SwiftUI", "Recorder"],
    accent: "cyan",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5" aria-hidden>
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
    items: [
      { label: "Grid overlay and view borders", slug: ["interface", "grid-and-borders"] },
      { label: "3D view hierarchy inspector", slug: ["interface", "view-hierarchy"] },
      { label: "Touch indicators and animation slow-mo", slug: ["interface", "touch-and-animation"] },
      { label: "SwiftUI render tracking (beta)", slug: ["interface", "render-tracking"] },
      { label: "Documentation recorder with annotated screenshots", slug: ["interface", "documentation-recorder"] },
    ],
  },
  {
    id: "resources",
    title: "Resources",
    description:
      "Browse sandbox files, UserDefaults, Keychain entries, SQLite and Realm databases, SwiftData models, and simulate push notifications in-app.",
    image: `${APP_IMG}/resources.png`,
    tags: ["Files", "Keychain", "SQLite", "SwiftData"],
    accent: "emerald",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5" aria-hidden>
        <path d="M4 7V4h16v3M9 20h6M12 4v16" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    items: [
      { label: "Sandbox and app group file browser", slug: ["resources", "file-browser"] },
      { label: "UserDefaults inspector", slug: ["resources", "userdefaults"] },
      { label: "Keychain inspector", slug: ["resources", "keychain"] },
      { label: "SQLite and Realm database browser", slug: ["resources", "database-browser"] },
      { label: "Push notification simulator", slug: ["resources", "push-notifications"] },
      { label: "SwiftData browser (iOS 17+)", slug: ["resources", "swiftdata"] },
    ],
  },
];

const stats = [
  { label: "Categories", value: "5" },
  { label: "Capabilities", value: "25+" },
  { label: "Setup", value: "1 call" },
  { label: "Distribution", value: "In-app" },
];

export default function FeaturesPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="glow-orb -top-24 right-1/4 h-72 w-72 bg-violet-600/20" />
        <div className="glow-orb top-10 left-0 h-64 w-64 bg-cyan-500/15" />
        <div className="grid-bg absolute inset-0 opacity-40" />
        <Container className="relative py-16 sm:py-20">
          <div className="max-w-3xl">
            <Badge>Feature overview</Badge>
            <h1 className="mt-5 text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Everything you need to debug iOS apps
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-zinc-400">
              One floating toolkit covering network, performance, UI, crashes, and sandbox resources —
              all inside your running app.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/install">Get started</Button>
              <Button href="/docs" variant="secondary">
                Read the docs
              </Button>
              <Button href="/compare" variant="ghost">
                Compare tools
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-white/10 py-8">
        <Container>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="text-center sm:text-left">
                <div className="text-2xl font-bold text-white">{s.value}</div>
                <div className="mt-1 text-sm text-zinc-500">{s.label}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-b border-white/10 py-8">
        <Container>
          <nav aria-label="Feature categories" className="flex flex-wrap gap-2">
            {featureGroups.map((g) => (
              <a
                key={g.id}
                href={`#${g.id}`}
                className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-zinc-400 transition hover:border-violet-500/30 hover:text-white"
              >
                {g.title}
              </a>
            ))}
          </nav>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container className="space-y-24 sm:space-y-32">
          {featureGroups.map((g, i) => (
            <div key={g.id} id={g.id} className="scroll-mt-24">
              <div
                className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-14 ${
                  i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <Card className="overflow-hidden p-0">
                  <ScreenshotPlaceholder
                    alt={g.title}
                    image={g.image}
                    framed
                    className="rounded-none border-0 bg-zinc-950/40"
                  />
                </Card>

                <div>
                  <div className="flex items-center gap-3">
                    <AccentIcon accent={g.accent}>{g.icon}</AccentIcon>
                    <div className="flex flex-wrap gap-2">
                      {g.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md bg-white/5 px-2 py-1 text-xs text-zinc-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <h2 className="mt-4 text-2xl font-bold text-white sm:text-3xl">{g.title}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-400 sm:text-base">
                    {g.description}
                  </p>
                  <ul className="mt-6 divide-y divide-white/5 rounded-xl border border-white/10 bg-white/[0.02]">
                    {g.items.map((item) => (
                      <FeatureLink key={item.label} href={docHref(item.slug)} accent={g.accent}>
                        {item.label}
                      </FeatureLink>
                    ))}
                  </ul>
                  <div className="mt-5">
                    <Link
                      href={docHref(g.items[0].slug)}
                      className="text-sm font-medium text-violet-400 hover:underline"
                    >
                      View {g.title.toLowerCase()} docs →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Container>
      </section>

      <CTABand />
    </>
  );
}
