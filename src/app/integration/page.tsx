import { CTABand, PageHero, Prose } from "@/components/ui";

export const metadata = { title: "Integration Patterns" };

export default function IntegrationPage() {
  return (
    <>
      <PageHero
        title="Integration patterns"
        description="Map of rockxy.io /workspace: team workflows for DebugSwift without a cloud service."
      />
      <article className="mx-auto max-w-3xl px-5 py-12 sm:px-8">
        <Prose>
          <p>
            DebugSwift has no cloud workspace. Teams share debugging context via exports, screenshots,
            and the documentation recorder, all local-first.
          </p>
          <h2>Programmatic presentation</h2>
          <p>
            Present <code>DebugSwift.debugViewController()</code> from your own debug menu or internal
            admin screens, no floating ball required.
          </p>
          <h2>Custom actions</h2>
          <p>Register team-specific debug actions and deep links in the App Tools section.</p>
          <h2>Export handoffs</h2>
          <p>Network session export, HAR-compatible flows, and doc recorder grids for QA handoffs.</p>
        </Prose>
      </article>
      <CTABand />
    </>
  );
}
