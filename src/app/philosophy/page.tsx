import Link from "next/link";
import {
  AccentCard,
  Badge,
  Button,
  Card,
  Container,
  CTABand,
  PageHero,
  Prose,
  SectionHeading,
} from "@/components/ui";
import { site } from "@/lib/site";

export const metadata = {
  title: "Philosophy - Open Source In-App Debugging",
  description:
    "Why DebugSwift is MIT open source, runs inside your app, and keeps debugging data on the device with no proxy, cloud service, or account.",
};

const trustLayers = [
  {
    n: "01",
    title: "Source transparency",
    body: "The full toolkit, including network swizzling, Keychain browser, performance hooks, and the UI overlay, is published on GitHub under MIT. You can read exactly how URLSession interception works and what happens to captured traffic.",
  },
  {
    n: "02",
    title: "Build boundary",
    body: "DebugSwift is designed for DEBUG builds. Wrap setup in #if DEBUG and the linker strips the debugger from release binaries. The line between debuggable and shippable code is explicit, not implied.",
  },
  {
    n: "03",
    title: "Runtime locality",
    body: "Instrumentation runs in-process on the device or simulator. Captured requests, sandbox files, and keychain entries never leave your app unless you export them. There is no telemetry backend to work around.",
  },
  {
    n: "04",
    title: "Continuity",
    body: "MIT licensing guarantees the right to fork, modify, and redistribute. If maintainers step away, teams can carry the project forward. Proprietary debug bridges do not offer the same guarantee.",
  },
];

const comparisonRows = [
  {
    dimension: "Setup",
    external: "System proxy, root CA, desktop bridge",
    inApp: "SPM/CocoaPods + one setup() call",
  },
  {
    dimension: "TLS handling",
    external: "Man-in-the-middle with generated certificates",
    inApp: "In-process hooks; no certificate trust dance",
  },
  {
    dimension: "Data path",
    external: "Traffic routed through another machine or app",
    inApp: "Stays on device/simulator memory",
  },
  {
    dimension: "Production risk",
    external: "Misconfigured proxy can leak to prod builds",
    inApp: "Compile-time stripping via #if DEBUG",
  },
  {
    dimension: "Audit surface",
    external: "Proxy binary + helper daemons + cloud sync",
    inApp: "Single Swift package in your dependency graph",
  },
  {
    dimension: "Offline",
    external: "Often needs host machine or license server",
    inApp: "Works in airplane mode on a simulator",
  },
];

const localFirstIdeals = [
  {
    ideal: "Fast",
    body: "Network capture hooks URLSession in-process. No round-trips through a desktop proxy or sync service.",
  },
  {
    ideal: "Offline",
    body: "Debug on a plane, in a Faraday bag, or behind a corporate firewall. No activation server required.",
  },
  {
    ideal: "Longevity",
    body: "Sessions and exports use open formats. Your HAR files and screenshots outlive any single vendor.",
  },
  {
    ideal: "Privacy",
    body: "Sandbox data, tokens, and request bodies stay on the device. Nothing is uploaded by default.",
  },
  {
    ideal: "User control",
    body: "Export, redact, share, or delete on your terms. Toggle features via setup flags without asking a vendor.",
  },
];

const nativeReasons = [
  {
    title: "UIKit rendering",
    body: "View hierarchy and grid overlays integrate with UIKit's rendering pipeline.",
    accent: "violet" as const,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5" aria-hidden>
        <path d="M12 2 2 7l10 5 10-5-10-5Z" strokeLinejoin="round" />
        <path d="m2 12 10 5 10-5" strokeLinejoin="round" />
        <path d="m2 17 10 5 10-5" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "URLSession hooks",
    body: "Swizzling hooks the same APIs your app already uses — no parallel network stack.",
    accent: "cyan" as const,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5" aria-hidden>
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Platform APIs",
    body: "Keychain and sandbox browsers use platform APIs directly — no bridge layer.",
    accent: "cyan" as const,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5" aria-hidden>
        <circle cx="8" cy="15" r="4" />
        <path d="M12 15h9" strokeLinecap="round" />
        <path d="M17 15v3M20 15v2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Lean footprint",
    body: "No Electron shell competing with Xcode and simulators for RAM.",
    accent: "violet" as const,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5" aria-hidden>
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3" strokeLinecap="round" />
      </svg>
    ),
  },
];

const commitments = [
  {
    title: "Source stays public",
    body: "The complete DebugSwift codebase is on GitHub under MIT. That will not change.",
  },
  {
    title: "No cloud for core debugging",
    body: "Network inspection, performance monitoring, and resource browsers run entirely inside your app.",
  },
  {
    title: "No account, no license key",
    body: "Every feature is available without signup, seat limits, or paid tiers.",
  },
  {
    title: "Community-shaped roadmap",
    body: "Priorities follow public GitHub issues and pull requests, not a closed product backlog.",
  },
  {
    title: "Reproducible from source",
    body: "Clone the repo, build the Example app, and verify behavior matches what you ship via SPM or CocoaPods.",
  },
];

const references = [
  {
    cite: "Brooks, F.P. (1987) 'No silver bullet: essence and accidents of software engineering', Computer, 20(4), pp. 10–19.",
    note: "Integrated tooling reduces accidental complexity in the debugging workflow.",
  },
  {
    cite: "Ink & Switch (2019) 'Local-first software: you own your data, in spite of the cloud', Onward! 2019. Available at: https://www.inkandswitch.com/essay/local-first/",
    note: "Seven ideals for software that treats local data as primary.",
  },
  {
    cite: "Lessig, L. (1999) Code and Other Laws of Cyberspace. New York: Basic Books.",
    note: "Architecture shapes behavior. Compile-time DEBUG gates are a design choice, not an afterthought.",
  },
  {
    cite: "Perens, B. (1999) 'The open source definition', Open Source Initiative. Available at: https://opensource.org/osd",
    note: "Criteria for software that can be freely studied, modified, and redistributed.",
  },
  {
    cite: "von Hippel, E. (2005) Democratizing Innovation. Cambridge, MA: MIT Press.",
    note: "Lead users, the engineers closest to the problem, are often the best source of tool improvements.",
  },
  {
    cite: "Weber, S. (2004) The Success of Open Source. Cambridge, MA: Harvard University Press.",
    note: "How open development models sustain complex infrastructure software.",
  },
  {
    cite: "Zittrain, J.L. (2008) The Future of the Internet and How to Stop It. New Haven, CT: Yale University Press.",
    note: "Generative platforms invite unanticipated change; tethered appliances close that path.",
  },
];

export default function PhilosophyPage() {
  return (
    <>
      <PageHero
        title="Why DebugSwift is open source and in-app"
        description="A debugging toolkit that reads network traffic, keychain entries, and sandbox files runs inside the same process as your app. Software with that level of access should be auditable, gated at compile time, and free to fork."
      >
        <p className="mt-6 text-sm text-zinc-500">
          Related:{" "}
          <Link href="/privacy" className="text-violet-400 hover:underline">
            Privacy policy
          </Link>
          ,{" "}
          <Link href="/integration" className="text-violet-400 hover:underline">
            integration patterns
          </Link>
          , and{" "}
          <Link href="/sdlc" className="text-violet-400 hover:underline">
            SDLC policy
          </Link>
          .
        </p>
      </PageHero>

      {/* Trust problem */}
      <section className="border-b border-white/10 py-16 sm:py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-start">
            <SectionHeading
              eyebrow="Context"
              title="The trust problem in mobile debugging"
            />
            <Prose>
              <p>
                External network debuggers sit between your device and the internet. They install root
                certificates, terminate TLS, and forward decrypted traffic to a desktop app or cloud
                workspace. That model works well for backend and cross-platform teams, but it also asks
                you to trust a chain you cannot fully inspect.
              </p>
              <p>
                DebugSwift takes a different path. Instrumentation runs inside your app, only in DEBUG
                builds, using method swizzling on URLSession and WebSocket APIs you already depend on.
                There is no man-in-the-middle certificate, no second machine in the data path, and no
                vendor account between you and your own traffic.
              </p>
              <p>
                Lawrence Lessig argued that code is law: technical architecture constrains what users and
                developers can do as surely as statutes do (Lessig, 1999). An in-app debugger encodes
                different rules than a proxy. Data stays in the process boundary you control, and release
                builds can exclude the instrumentation entirely at compile time.
              </p>
            </Prose>
          </div>
        </Container>
      </section>

      {/* Trust layers */}
      <section className="border-b border-white/10 py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="Framework"
            title="A trust ladder for in-app debuggers"
            description="Each layer supports the ones above. Failure at any layer weakens the rest."
            align="center"
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {trustLayers.map((layer) => (
              <Card key={layer.n} className="relative flex h-full flex-col !p-7 sm:!p-8">
                <span
                  aria-hidden
                  className="pointer-events-none absolute top-5 right-5 font-mono text-4xl font-bold text-white/[0.06] sm:text-5xl"
                >
                  {layer.n}
                </span>
                <h3 className="pr-12 text-lg font-semibold text-white">{layer.title}</h3>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-zinc-400">{layer.body}</p>
              </Card>
            ))}
          </div>
          <p className="mx-auto mt-10 max-w-3xl text-center text-sm text-zinc-500">
            Closed-source debug bridges fail at the first layer by definition. For tooling that touches
            session tokens, API keys, and keychain entries, trusting the vendor alone is not enough.
          </p>
        </Container>
      </section>

      {/* Comparison table */}
      <section className="border-b border-white/10 py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="Architecture"
            title="External proxy vs in-app instrumentation"
            description="Both approaches have a place. DebugSwift exists because iOS teams often need the in-app model."
          />
          <div className="mt-10 overflow-x-auto rounded-2xl border border-white/10">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.03]">
                  <th className="px-5 py-4 font-semibold text-zinc-300">Dimension</th>
                  <th className="px-5 py-4 font-semibold text-zinc-400">External proxy</th>
                  <th className="px-5 py-4 font-semibold text-violet-300">In-app (DebugSwift)</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr
                    key={row.dimension}
                    className={i % 2 === 0 ? "bg-transparent" : "bg-white/[0.02]"}
                  >
                    <td className="px-5 py-4 font-medium text-white">{row.dimension}</td>
                    <td className="px-5 py-4 text-zinc-500">{row.external}</td>
                    <td className="px-5 py-4 text-zinc-300">{row.inApp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </section>

      {/* Generative vs tethered */}
      <section className="border-b border-white/10 py-16 sm:py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <SectionHeading
                eyebrow="Platforms"
                title="Generative tooling on a tethered platform"
              />
              <Prose>
                <p>
                  Jonathan Zittrain distinguishes generative systems, which are open to unanticipated
                  contributions from their users, from tethered appliances controlled by a single vendor
                  (Zittrain, 2008). Modern iOS development sits between these poles. Apple&apos;s platform
                  is tethered, but the apps developers ship can still be generative inside their own
                  boundaries.
                </p>
                <p>
                  An in-app debugger is generative infrastructure for a tethered platform. You can read
                  the swizzling code, add custom debug actions, disable features you do not want, and fork
                  the package if priorities diverge. A closed desktop bridge with a proprietary sync
                  service pulls debugging back toward the tethered model. Features arrive on the
                  vendor&apos;s schedule and disappear when the vendor does.
                </p>
              </Prose>
            </div>
            <Card className="flex flex-col justify-center border-violet-500/20 bg-gradient-to-br from-violet-500/10 to-transparent">
              <p className="text-lg font-medium leading-relaxed text-white">
                &ldquo;Generative technologies invite disruption, along with the good and bad that
                comes with it.&rdquo;
              </p>
              <p className="mt-4 text-sm text-zinc-400">Zittrain (2008), on generative systems</p>
            </Card>
          </div>
        </Container>
      </section>

      {/* Open source definition */}
      <section className="border-b border-white/10 py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="Licensing"
            title="Open source as a verifiability requirement"
            description="DebugSwift is MIT licensed. Bruce Perens' Open Source Definition names the freedoms that make independent audit possible."
            align="center"
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Free redistribution",
                body: "Share DebugSwift across your team, in CI, and in client projects without per-seat negotiation.",
              },
              {
                title: "Source availability",
                body: "Study how network capture, encryption helpers, and Keychain browsers are implemented before you add them to your dependency graph.",
              },
              {
                title: "Derived works",
                body: "Fork, patch, or wrap features behind your own internal flags. Ship modifications under the same MIT terms.",
              },
            ].map((item) => (
              <Card key={item.title}>
                <h3 className="font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm text-zinc-400">{item.body}</p>
              </Card>
            ))}
          </div>
          <div className="mx-auto mt-10 max-w-3xl">
            <Prose>
              <p>
                Steven Weber&apos;s analysis of open-source communities shows that transparency does not
                automatically produce security, but it removes security through obscurity as an option
                (Weber, 2004). For a debugger that can read OAuth tokens and database rows, obscurity is
                not a feature. Inspectability is.
              </p>
            </Prose>
          </div>
        </Container>
      </section>

      {/* Local-first */}
      <section className="border-b border-white/10 py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="Data ownership"
            title="Local-first debugging"
            description="Ink & Switch coined local-first to describe software where your copy of the data is primary, not a cache of someone else's server."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {localFirstIdeals.map((item) => (
              <Card key={item.ideal}>
                <Badge>{item.ideal}</Badge>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400">{item.body}</p>
              </Card>
            ))}
          </div>
          <p className="mx-auto mt-10 max-w-3xl text-center text-sm text-zinc-500">
            Local-first is not anti-cloud. It means debugging data defaults to your device, and you
            should not need a network connection just to inspect a failing request.
          </p>
        </Container>
      </section>

      {/* Lead users / community */}
      <section className="border-b border-white/10 py-16 sm:py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
            <Prose>
              <h2 className="!mt-0">Lead users build better debug tools</h2>
              <p>
                Eric von Hippel&apos;s research on democratizing innovation shows that the people
                closest to a problem, called lead users, often develop solutions before vendors do (von
                Hippel, 2005). Mobile engineers debugging certificate pinning, SwiftUI re-renders, or
                Realm migrations hit edge cases no external roadmap anticipated.
              </p>
              <p>
                In a closed tool, those engineers file tickets and wait. In an open one, they read the
                source, open a pull request, and ship the fix for everyone. DebugSwift&apos;s issue
                tracker is the roadmap. Architecture discussions happen in public. The toolkit improves
                because the people who depend on it can change it.
              </p>
            </Prose>
            <Card>
              <h3 className="font-semibold text-white">No silver bullet, but fewer tools</h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                Fred Brooks argued that no single technique eliminates essential complexity in software
                (Brooks, 1987). Debugging an iOS app is inherently hard. What we can remove is
                accidental complexity: juggling a proxy, a crash reporter, a view debugger, and a
                database browser as separate products with separate accounts. One native overlay, one
                dependency graph, one audit surface.
              </p>
            </Card>
          </div>
        </Container>
      </section>

      {/* Native */}
      <section className="relative overflow-hidden border-b border-white/10 py-16 sm:py-20">
        <div className="glow-orb -left-20 top-1/2 h-72 w-72 -translate-y-1/2 bg-cyan-500/10" />
        <div className="glow-orb right-0 top-0 h-64 w-64 bg-violet-600/10" />
        <Container className="relative">
          <SectionHeading
            eyebrow="Implementation"
            title="Native by conviction"
            description="DebugSwift is UIKit and SwiftUI all the way down, not a web view hosting someone else's debugger."
          />
          <div className="mt-12 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
            <div>
              <h3 className="text-sm font-semibold tracking-wide text-zinc-300 uppercase">
                Why native matters here
              </h3>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {nativeReasons.map((reason) => (
                  <AccentCard
                    key={reason.title}
                    title={reason.title}
                    body={reason.body}
                    icon={reason.icon}
                    accent={reason.accent}
                  />
                ))}
              </div>
            </div>
            <Card className="relative overflow-hidden border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 via-transparent to-violet-500/5 !p-8">
              <div className="pointer-events-none absolute -top-8 -right-8 h-32 w-32 rounded-full bg-cyan-500/10 blur-2xl" />
              <p className="relative text-lg font-medium leading-relaxed text-white">
                A cross-platform debugger in a web stack would ship faster and port more easily.
              </p>
              <p className="relative mt-4 text-sm leading-relaxed text-zinc-400">
                We accept the single-platform cost because a debugger that runs inside your app should
                feel like part of iOS: light enough to leave on during a long profiling session, and
                familiar enough that any Swift developer can use it on day one.
              </p>
            </Card>
          </div>
        </Container>
      </section>

      {/* Commitments */}
      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="Practice"
            title="Our commitments"
            description="Principles without practice are marketing copy. These are the concrete promises that follow."
            align="center"
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {commitments.map((item) => (
              <Card key={item.title} className="border-violet-500/10">
                <h3 className="font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm text-zinc-400">{item.body}</p>
              </Card>
            ))}
          </div>
          <div className="mt-12 flex flex-wrap justify-center gap-3">
            <Button href={site.github} external>
              Read the source
            </Button>
            <Button href="/install" variant="secondary">
              Install via SPM
            </Button>
            <Button href={`${site.github}/issues`} variant="secondary" external>
              Join the community
            </Button>
          </div>
        </Container>
      </section>

      {/* References */}
      <section className="border-t border-white/10 bg-white/[0.02] py-16">
        <Container>
          <h2 className="text-xl font-semibold text-white">References</h2>
          <ol className="mt-6 space-y-4">
            {references.map((ref) => (
              <li key={ref.cite} className="text-sm">
                <p className="text-zinc-400">{ref.cite}</p>
                <p className="mt-1 text-zinc-600">{ref.note}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <CTABand />
    </>
  );
}
