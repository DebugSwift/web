import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { getGitHubStars } from "@/lib/github";

export async function SiteHeader() {
  const stars = await getGitHubStars();
  return <Header stars={stars} />;
}

export { Footer };
