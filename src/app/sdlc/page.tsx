import { PageHero, Prose } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata = { title: "SDLC Policy" };

export default function SDLCPolicyPage() {
  return (
    <>
      <PageHero title="Software Development Lifecycle" />
      <article className="mx-auto max-w-3xl px-5 py-12 sm:px-8">
        <Prose>
          <h2>Development</h2>
          <p>Feature work happens in public on GitHub with PR review and CI on the Example app.</p>
          <h2>Testing</h2>
          <p>Unit tests in ExampleTests cover core helpers and network injection.</p>
          <h2>Releases</h2>
          <p>Tagged releases on GitHub with SPM and CocoaPods XCFramework artifacts.</p>
          <h2>Security</h2>
          <p>
            Report vulnerabilities via{" "}
            <a href={`${site.github}/security/advisories`}>GitHub Security Advisories</a>.
          </p>
        </Prose>
      </article>
    </>
  );
}
