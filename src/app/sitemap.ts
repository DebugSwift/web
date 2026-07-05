import type { MetadataRoute } from "next";
import { getAllDocSlugs } from "@/lib/docs";
import { blogPosts } from "@/lib/routes";
import { site } from "@/lib/site";

const routes = [
  "",
  "philosophy",
  "features",
  "install",
  "integration",
  "license",
  "blog",
  "about",
  "roadmap",
  "changelog",
  "faq",
  "support",
  "partners",
  "education",
  "alternatives",
  "compare",
  "flipper-alternative",
  "pulse-alternative",
  "proxyman-alternative",
  "charles-proxy-alternative",
  "wireshark-alternative",
  "fiddler-alternative",
  "privacy",
  "terms",
  "sdlc",
  "sitemap",
  "docs",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;
  const pages = routes.map((r) => ({
    url: `${base}/${r}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: r === "" ? 1 : 0.7,
  }));
  const posts = blogPosts.map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));
  const docs = getAllDocSlugs()
    .filter((s) => s.length > 0)
    .map((s) => ({
      url: `${base}/docs/${s.join("/")}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }));
  return [...pages, ...posts, ...docs];
}
