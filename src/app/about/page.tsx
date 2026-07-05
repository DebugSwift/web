import { Button, CTABand, PageHero, Prose } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata = { title: "About DebugSwift" };

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="Built for Swift iOS developers"
        description="DebugSwift is a community-driven toolkit to make in-app debugging as capable as desktop proxy tools, without leaving the simulator."
      >
        <Button href={site.github} external>GitHub</Button>
      </PageHero>
      <article className="mx-auto max-w-3xl px-5 py-12 sm:px-8">
        <Prose>
          <h2>What it is</h2>
          <p>
            A floating debug menu for iOS apps covering network inspection, performance monitoring,
            crash analysis, UI debugging, and sandbox resource browsers. Add via SPM or CocoaPods,
            wrap in <code>#if DEBUG</code>, and ship without it in production.
          </p>
          <h2>Tech stack</h2>
          <ul>
            <li>UIKit + SwiftUI for the debugger UI</li>
            <li>Method swizzling for URLSession and WebSocket capture</li>
            <li>Native SQLite/Realm/SwiftData browsers</li>
            <li>MIT licensed on GitHub</li>
          </ul>
        </Prose>
      </article>
      <CTABand />
    </>
  );
}
