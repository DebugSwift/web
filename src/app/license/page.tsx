import { CTABand, PageHero, Prose } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata = { title: "License" };

export default function LicensePage() {
  return (
    <>
      <PageHero
        title="MIT License - free forever"
        description="DebugSwift maps rockxy.io /pricing and /license. There is no paid tier."
      />
      <article className="mx-auto max-w-3xl px-5 py-12 sm:px-8">
        <Prose>
          <p>
            DebugSwift is released under the{" "}
            <a href={`${site.github}/blob/main/LICENSE`}>MIT License</a>. Use it in personal,
            commercial, and educational projects without a license key.
          </p>
          <h2>What you get</h2>
          <ul>
            <li>Full source on GitHub</li>
            <li>All features: network, performance, UI, resources</li>
            <li>No seat limits or subscription</li>
            <li>Fork and modify freely</li>
          </ul>
          <h2>Rockxy comparison</h2>
          <p>
            Rockxy uses AGPL for the open core with paid Pro licenses. DebugSwift is entirely MIT
            with no commercial upsell.
          </p>
        </Prose>
      </article>
      <CTABand />
    </>
  );
}
