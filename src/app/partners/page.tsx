import { Button, CTABand, PageHero, Prose } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata = { title: "Partners & Sponsors" };

export default function PartnersPage() {
  return (
    <>
      <PageHero
        title="Support open-source iOS debugging"
        description="Sponsor development time or partner on integrations and content."
      >
        <Button href={`${site.github}/sponsors`} external>
          GitHub Sponsors
        </Button>
      </PageHero>
      <article className="mx-auto max-w-3xl px-5 py-12 sm:px-8">
        <Prose>
          <h2>Community tier</h2>
          <p>Star the repo, file detailed bugs, and share DebugSwift with your team.</p>
          <h2>Contributor tier</h2>
          <p>Submit PRs, improve docs, or maintain feature areas you rely on.</p>
          <h2>Sponsor tier</h2>
          <p>Fund roadmap items via GitHub Sponsors to accelerate development.</p>
        </Prose>
      </article>
      <CTABand />
    </>
  );
}
