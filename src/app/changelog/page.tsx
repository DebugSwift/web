import { Button, Container, PageHero } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata = { title: "Changelog" };

export default function ChangelogPage() {
  return (
    <>
      <PageHero
        title="Release history"
        description="Canonical changelog lives in the GitHub repository and release notes."
      >
        <Button href={`${site.github}/releases`} external>
          GitHub Releases
        </Button>
      </PageHero>
      <section className="pb-20">
        <Container className="max-w-3xl">
          <p className="text-zinc-400">
            See the full changelog at{" "}
            <a href={`${site.github}/blob/main/CHANGELOG.md`} className="text-violet-400 hover:underline">
              CHANGELOG.md
            </a>{" "}
            on GitHub for version-by-version Added, Changed, and Fixed entries.
          </p>
        </Container>
      </section>
    </>
  );
}
