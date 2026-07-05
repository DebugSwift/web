import Link from "next/link";
import { Container, PageHero } from "@/components/ui";
import { blogPosts, routeMap } from "@/lib/routes";

export const metadata = { title: "Site Map" };

const staticRoutes = [
  "/",
  "/philosophy",
  "/features",
  "/install",
  "/integration",
  "/license",
  "/blog",
  "/docs",
  "/about",
  "/roadmap",
  "/changelog",
  "/faq",
  "/support",
  "/partners",
  "/education",
  "/alternatives",
  "/compare",
  "/flipper-alternative",
  "/pulse-alternative",
  "/proxyman-alternative",
  "/charles-proxy-alternative",
  "/wireshark-alternative",
  "/fiddler-alternative",
  "/privacy",
  "/terms",
  "/sdlc",
  "/sitemap",
];

export default function SitemapPage() {
  return (
    <>
      <PageHero
        title="Site map"
        description="DebugSwift routes mapped from rockxy.io structure."
      />
      <section className="pb-20">
        <Container className="max-w-4xl">
          <h2 className="text-lg font-semibold text-white">All pages</h2>
          <ul className="mt-4 columns-2 gap-8 text-sm text-zinc-400 sm:columns-3">
            {staticRoutes.map((r) => (
              <li key={r} className="mb-2">
                <Link href={r} className="hover:text-violet-400">
                  {r}
                </Link>
              </li>
            ))}
            {blogPosts.map((p) => (
              <li key={p.slug} className="mb-2">
                <Link href={`/blog/${p.slug}`} className="hover:text-violet-400">
                  /blog/{p.slug}
                </Link>
              </li>
            ))}
          </ul>

          <h2 className="mt-12 text-lg font-semibold text-white">Rockxy → DebugSwift mapping</h2>
          <div className="mt-4 overflow-x-auto rounded-xl border border-white/10">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.03]">
                  <th className="p-3 text-zinc-400">rockxy.io</th>
                  <th className="p-3 text-zinc-400">debugswift</th>
                  <th className="p-3 text-zinc-400">Note</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(routeMap.rockxy).map(([rockxy, info]) => (
                  <tr key={rockxy} className="border-b border-white/5">
                    <td className="p-3 font-mono text-xs text-zinc-500">{rockxy}</td>
                    <td className="p-3 font-mono text-xs text-violet-400">{info.debugswift}</td>
                    <td className="p-3 text-xs text-zinc-500">{info.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </section>
    </>
  );
}
