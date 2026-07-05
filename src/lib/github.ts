import { site } from "@/lib/site";

export async function getGitHubStars(): Promise<number> {
  try {
    const res = await fetch("https://api.github.com/repos/DebugSwift/DebugSwift", {
      next: { revalidate: 3600 },
      headers: { Accept: "application/vnd.github+json" },
    });
    if (!res.ok) return 0;
    const data = (await res.json()) as { stargazers_count: number };
    return data.stargazers_count;
  } catch {
    return 0;
  }
}

export function formatStarCount(count: number): string {
  return new Intl.NumberFormat("en-US").format(count);
}

export { site };
