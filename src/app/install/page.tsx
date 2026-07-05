import Link from "next/link";
import {
  Badge,
  Button,
  Card,
  CodeBlock,
  Container,
  CTABand,
  SectionHeading,
} from "@/components/ui";
import { docHref } from "@/lib/docs";
import { site } from "@/lib/site";

export const metadata = {
  title: "Install",
  description: "Add DebugSwift via Swift Package Manager or CocoaPods.",
};

const steps = [
  { n: "1", title: "Add dependency", body: "SPM or CocoaPods", href: "#dependency" },
  { n: "2", title: "Call setup()", body: "Wrap in #if DEBUG", href: "#setup" },
  { n: "3", title: "Tap the ball", body: "Floating debugger appears", href: "#run" },
];

const requirements = [
  { label: "iOS", value: site.requirements.ios },
  { label: "Swift", value: site.requirements.swift },
  { label: "Xcode", value: site.requirements.xcode },
  { label: "Simulator", value: "Apple Silicon arm64" },
];

const setupCode = `import DebugSwift

#if DEBUG
let debugSwift = DebugSwift()

func application(...) -> Bool {
    debugSwift.setup()
    debugSwift.show()
    return true
}
#endif`;

export default function InstallPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="glow-orb -top-24 left-1/3 h-72 w-72 bg-violet-600/20" />
        <div className="glow-orb top-10 right-0 h-64 w-64 bg-cyan-500/15" />
        <div className="grid-bg absolute inset-0 opacity-40" />
        <Container className="relative py-16 sm:py-20">
          <div className="max-w-3xl">
            <Badge>Quick start</Badge>
            <h1 className="mt-5 text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Install DebugSwift
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-zinc-400">
              Add to your project in under two minutes. DEBUG builds only — never ship the debugger
              to App Store releases.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="#dependency">Start installing</Button>
              <Button href={docHref(["installation"])} variant="secondary">
                Full docs
              </Button>
              <Button href={site.github} external variant="ghost">
                View on GitHub
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-white/10 py-8">
        <Container>
          <nav aria-label="Install steps" className="grid gap-4 sm:grid-cols-3">
            {steps.map((s) => (
              <a
                key={s.n}
                href={s.href}
                className="group flex items-start gap-4 rounded-xl border border-white/10 bg-white/[0.02] p-4 transition hover:border-violet-500/30 hover:bg-white/[0.04]"
              >
                <span className="text-2xl font-bold text-violet-500/40 transition group-hover:text-violet-400/60">
                  {s.n}
                </span>
                <div>
                  <div className="font-semibold text-white">{s.title}</div>
                  <div className="mt-0.5 text-sm text-zinc-500">{s.body}</div>
                </div>
              </a>
            ))}
          </nav>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container className="space-y-16">
          <div id="dependency" className="scroll-mt-24">
            <SectionHeading
              eyebrow="Step 1"
              title="Add the dependency"
              description="Swift Package Manager is recommended for most projects. CocoaPods works too, with an optional XCFramework for faster builds."
            />
            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              <Card className="flex flex-col">
                <div className="flex items-center gap-3">
                  <h2 className="text-lg font-semibold text-white">Swift Package Manager</h2>
                  <span className="rounded-md bg-violet-500/15 px-2 py-0.5 text-xs font-medium text-violet-300">
                    Recommended
                  </span>
                </div>
                <p className="mt-3 text-sm text-zinc-400">
                  In Xcode: File → Add Package Dependencies → paste the URL:
                </p>
                <CodeBlock className="mt-4">{`https://github.com/DebugSwift/DebugSwift`}</CodeBlock>
                <p className="mt-4 text-sm text-zinc-500">Or declare it in Package.swift:</p>
                <CodeBlock language="swift" className="mt-2">{`.package(url: "https://github.com/DebugSwift/DebugSwift.git", from: "1.0.0")`}</CodeBlock>
              </Card>

              <Card className="flex flex-col">
                <h2 className="text-lg font-semibold text-white">CocoaPods</h2>
                <p className="mt-3 text-sm text-zinc-400">Add to your Podfile:</p>
                <CodeBlock className="mt-4">{`pod 'DebugSwift'`}</CodeBlock>
                <div className="mt-6 rounded-xl border border-white/10 bg-black/20 p-4">
                  <h3 className="text-sm font-semibold text-white">XCFramework (faster builds)</h3>
                  <p className="mt-2 text-sm text-zinc-500">
                    Prebuilt binary — up to 50% faster compile times. Ideal for CI and large teams.
                  </p>
                  <CodeBlock className="mt-3">{`pod 'DebugSwift', :http => 'https://github.com/DebugSwift/DebugSwift/releases/latest/download/DebugSwift.xcframework.zip'`}</CodeBlock>
                </div>
              </Card>
            </div>

            <div className="mt-6 rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-4 text-sm text-zinc-400">
              <span className="font-medium text-cyan-300">Apple Silicon:</span> native arm64 simulator
              slices ship by default. Remove any{" "}
              <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs text-zinc-300">
                EXCLUDED_ARCHS arm64
              </code>{" "}
              entries from your Podfile or build settings.
            </div>
          </div>

          <div id="setup" className="scroll-mt-24">
            <SectionHeading
              eyebrow="Step 2"
              title="Initialize in AppDelegate"
              description="One setup() call enables the floating debugger. Wrap everything in #if DEBUG so release builds strip the toolkit."
            />
            <Card className="mt-10 overflow-hidden p-0">
              <div className="flex items-center justify-between border-b border-white/10 bg-black/40 px-4 py-3">
                <span className="text-xs text-zinc-500">AppDelegate.swift</span>
                <span className="rounded-md bg-amber-500/15 px-2 py-0.5 text-xs font-medium text-amber-300">
                  DEBUG only
                </span>
              </div>
              <CodeBlock language="swift" className="rounded-none border-0">
                {setupCode}
              </CodeBlock>
            </Card>
            <p className="mt-4 text-sm text-zinc-500">
              Need filters, custom actions, or programmatic presentation? See{" "}
              <Link href={docHref(["configuration"])} className="text-violet-400 hover:underline">
                configuration docs
              </Link>
              .
            </p>
          </div>

          <div id="run" className="scroll-mt-24">
            <SectionHeading
              eyebrow="Step 3"
              title="Run and open the debugger"
              description="Build for the simulator or a device. The floating ball appears over your app — tap it or shake to toggle."
            />
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {[
                {
                  title: "Build & run",
                  body: "Select a DEBUG scheme and launch on simulator or device.",
                },
                {
                  title: "Tap the ball",
                  body: "The floating overlay opens the full debugger UI in-app.",
                },
                {
                  title: "Shake to toggle",
                  body: "Optional gesture to show or hide without leaving your screen.",
                },
              ].map((item) => (
                <Card key={item.title}>
                  <h3 className="font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">{item.body}</p>
                </Card>
              ))}
            </div>
          </div>

          <div id="requirements" className="scroll-mt-24">
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
              <h2 className="text-lg font-semibold text-white">Requirements</h2>
              <p className="mt-2 text-sm text-zinc-500">
                DebugSwift runs in DEBUG configuration only. Release binaries exclude the toolkit.
              </p>
              <dl className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-4">
                {requirements.map((r) => (
                  <div key={r.label}>
                    <dt className="text-sm text-zinc-500">{r.label}</dt>
                    <dd className="mt-1 text-lg font-semibold text-white">{r.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </Container>
      </section>

      <CTABand />
    </>
  );
}
