import { GitHubStarsLink } from "@/components/github-stars-link";
import { ScreenshotPlaceholder } from "@/components/screenshot-placeholder";
import {
  Badge,
  Button,
  Card,
  CodeBlock,
  Container,
  SectionHeading,
} from "@/components/ui";
import { getGitHubStars } from "@/lib/github";
import { site } from "@/lib/site";

const stats = [
  { label: "iOS", value: "14.0+" },
  { label: "Swift", value: "6.0+" },
  { label: "License", value: "MIT" },
  { label: "Distribution", value: "SPM + CocoaPods" },
];

const pillars = [
  {
    title: "In-app, not external",
    body: "Debug from a floating overlay inside your running app. No proxy setup, no certificate trust dance, no second machine.",
    tags: ["Floating UI", "Shake to toggle", "SwiftUI ready"],
  },
  {
    title: "One toolkit, every layer",
    body: "Network, performance, crashes, UI inspection, and sandbox resources, unified in a single native debugger.",
    tags: ["Network", "Performance", "Interface", "Resources"],
  },
  {
    title: "Open source by default",
    body: "MIT licensed, fully auditable. Inspect the swizzling, encryption hooks, and UI code before you ship to TestFlight.",
    tags: ["GitHub", "MIT", "No account"],
  },
];

const APP_IMG = "/app-screenshots/docs";

const bentoFeatures = [
  {
    id: "network",
    title: "Network Inspector",
    desc: "HTTP, WebSocket, encryption decrypt, response modifier, and session history.",
    image: `${APP_IMG}/network-inspector.png`,
  },
  {
    id: "performance",
    title: "Performance",
    desc: "CPU, memory, FPS, leak detection, and thread checker.",
    image: `${APP_IMG}/performance.png`,
  },
  {
    id: "interface",
    title: "Interface Tools",
    desc: "View hierarchy, grid overlay, render tracking, doc recorder.",
    image: `${APP_IMG}/interface-tools.png`,
  },
  {
    id: "resources",
    title: "Resources",
    desc: "UserDefaults, Keychain, SQLite, Realm, SwiftData, file browser.",
    image: `${APP_IMG}/resources.png`,
  },
  {
    id: "app-tools",
    title: "App Tools",
    desc: "Crash reports, console logs, device info, APNS tokens, and custom actions.",
    image: `${APP_IMG}/crash-reports-list.png`,
  },
  {
    id: "websocket",
    title: "WebSocket Inspector",
    desc: "Live connection list and frame capture for URLSessionWebSocketTask.",
    image: `${APP_IMG}/websocket-inspector-connection-list.png`,
  },
];

const steps = [
  { n: "1", title: "Add package", body: "SPM or CocoaPods. DEBUG builds only." },
  { n: "2", title: "Call setup()", body: "One line in AppDelegate. Optional shake gesture." },
  { n: "3", title: "Tap the ball", body: "Floating debugger appears over your running app." },
];

const testimonials = [
  {
    quote:
      "DebugSwift is the hidden gem you didn't know you needed. Network monitor, UI inspector, and more, right on your device.",
    author: "Peter Friese",
    handle: "peterfriese",
    role: "Staff Developer Advocate at Google on Firebase and Genkit",
    href: "https://x.com/peterfriese/status/2019720245632762120",
    initials: "PF",
    context: "Featured in #notonlyswift",
  },
];

export default async function HomePage() {
  const stars = await getGitHubStars();

  return (
    <>
      {/* Hero: asymmetric split layout (new vs rockxy centered hero) */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="glow-orb -top-32 left-1/4 h-96 w-96 bg-violet-600/20" />
        <div className="glow-orb top-20 right-0 h-80 w-80 bg-cyan-500/15" />
        <div className="grid-bg absolute inset-0 opacity-50" />
        <Container className="relative py-20 sm:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <Badge>Native iOS debugging toolkit</Badge>
              <h1 className="mt-5 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                See everything.
                <span className="block bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                  Fix faster.
                </span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-400">
                {site.description}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button href="/install">Install via SPM</Button>
                <GitHubStarsLink stars={stars} />
                <Button href="/docs" variant="ghost">
                  Read docs →
                </Button>
              </div>
              <p className="mt-6 text-sm text-zinc-500">
                {site.requirements.ios} · {site.requirements.swift} · {site.requirements.xcode} · Apple Silicon ready
              </p>
            </div>
            <div className="relative">
              <Card className="overflow-hidden p-0">
                <div className="border-b border-white/10 bg-black/40 px-4 py-3">
                  <span className="text-xs text-zinc-500">AppDelegate.swift</span>
                </div>
                <CodeBlock language="swift" className="rounded-none border-0">{`import DebugSwift

#if DEBUG
let debugSwift = DebugSwift()

func application(...) -> Bool {
    debugSwift.setup()
    debugSwift.show()
    return true
}
#endif`}</CodeBlock>
              </Card>
            </div>
          </div>
        </Container>
      </section>

      {/* Stats strip */}
      <section className="border-b border-white/10 py-10">
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

      {/* Pillars */}
      <section className="py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Built for real iOS work"
            title="From symptom to proof, inside the app"
            description="Move from 'something feels slow' to measurable CPU spikes, leaked view controllers, and the exact API call that failed."
            align="center"
          />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {pillars.map((p) => (
              <Card key={p.title} className="flex flex-col">
                <h3 className="text-lg font-semibold text-white">{p.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-zinc-400">{p.body}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-md bg-white/5 px-2 py-1 text-xs text-zinc-400"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Bento feature grid */}
      <section id="features" className="border-y border-white/10 bg-white/[0.02] py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Features"
            title="All-in-one debugging, embedded in your app"
            description="Inspect network, performance, UI, and sandbox data without switching tools."
            align="center"
          />
          <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {bentoFeatures.map((f) => (
              <Card key={f.id} className="overflow-hidden p-0">
                <div className="relative w-full overflow-hidden bg-zinc-900">
                  <ScreenshotPlaceholder
                    alt={f.title}
                    image={f.image}
                    framed
                    className="rounded-none border-0 bg-zinc-900"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-white">{f.title}</h3>
                  <p className="mt-2 text-sm text-zinc-400">{f.desc}</p>
                </div>
              </Card>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button href="/features" variant="secondary">
              Explore all features
            </Button>
          </div>
        </Container>
      </section>

      {/* Social proof */}
      <section className="relative overflow-hidden border-y border-white/10 bg-white/[0.02] py-20 sm:py-24">
        <div className="glow-orb -left-20 top-1/2 h-72 w-72 -translate-y-1/2 bg-violet-600/10" />
        <div className="glow-orb right-0 top-0 h-64 w-64 bg-cyan-500/10" />
        <Container className="relative">
          <SectionHeading
            eyebrow="Community"
            title="What people are saying"
            description="Swift developers using DebugSwift in their daily workflow."
            align="center"
          />
          <div className="mx-auto mt-14 max-w-4xl">
            {testimonials.map((t) => (
              <a
                key={t.author}
                href={t.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group block rounded-3xl border border-violet-500/20 bg-gradient-to-br from-violet-500/[0.08] via-white/[0.02] to-cyan-500/[0.06] p-6 backdrop-blur-sm transition-colors hover:border-violet-500/35 sm:p-8"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex min-w-0 items-center gap-4">
                    <div
                      className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 text-base font-bold text-white shadow-lg shadow-violet-500/20"
                      aria-hidden
                    >
                      {t.initials}
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-white">{t.author}</p>
                      <p className="text-sm text-zinc-400">@{t.handle}</p>
                      <p className="mt-0.5 text-sm text-zinc-500">{t.role}</p>
                    </div>
                  </div>
                  <span
                    className="shrink-0 rounded-full border border-white/10 bg-white/5 p-2.5 text-zinc-500 transition-colors group-hover:border-white/20 group-hover:text-white"
                    aria-hidden
                  >
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </span>
                </div>

                <blockquote className="relative mt-8">
                  <span
                    className="pointer-events-none absolute -top-4 -left-1 font-serif text-7xl leading-none text-violet-500/15 select-none sm:text-8xl"
                    aria-hidden
                  >
                    &ldquo;
                  </span>
                  <p className="relative text-xl leading-relaxed font-medium text-zinc-100 sm:text-2xl sm:leading-relaxed">
                    {t.quote}
                  </p>
                </blockquote>

                {t.context && (
                  <p className="mt-6 text-sm text-zinc-500">{t.context}</p>
                )}
              </a>
            ))}
          </div>
        </Container>
      </section>

      {/* Getting started */}
      <section className="py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Quick start"
            title="Three steps to your first capture"
            align="center"
          />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {steps.map((s) => (
              <Card key={s.n} className="relative">
                <span className="text-4xl font-bold text-violet-500/30">{s.n}</span>
                <h3 className="mt-2 text-lg font-semibold text-white">{s.title}</h3>
                <p className="mt-2 text-sm text-zinc-400">{s.body}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="border-t border-white/10 py-20">
        <Container>
          <div className="rounded-3xl border border-violet-500/20 bg-gradient-to-br from-violet-500/10 to-cyan-500/5 p-10 text-center sm:p-14">
            <h2 className="text-3xl font-bold text-white">Debug locally. Ship with proof.</h2>
            <p className="mx-auto mt-4 max-w-lg text-zinc-400">
              Open source, MIT licensed, and built for Swift teams who want one debugger in every DEBUG build.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button href="/install">Get started</Button>
              <Button href="/philosophy" variant="secondary">
                Our philosophy
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
