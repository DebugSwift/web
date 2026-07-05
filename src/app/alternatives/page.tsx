import Link from "next/link";
import { Card, Container, PageHero } from "@/components/ui";

export const metadata = {
  title: "iOS Debugging Alternatives",
  description: "Find the right debugging tool for your iOS workflow.",
};

const alternatives = [
  { href: "/compare", title: "Full comparison", desc: "DebugSwift vs Flipper vs Pulse" },
  { href: "/flipper-alternative", title: "Flipper alternative", desc: "In-app Swift toolkit vs desktop bridge" },
  { href: "/pulse-alternative", title: "Pulse alternative", desc: "Open-source network inspector" },
  { href: "/proxyman-alternative", title: "Proxyman + DebugSwift", desc: "Proxy for device traffic, in-app for sandbox" },
  { href: "/charles-proxy-alternative", title: "Charles Proxy", desc: "When you need system proxy vs in-app" },
  { href: "/wireshark-alternative", title: "Wireshark", desc: "Packet layer vs app layer" },
  { href: "/fiddler-alternative", title: "Fiddler", desc: "Cross-platform proxy comparison" },
];

export default function AlternativesPage() {
  return (
    <>
      <PageHero
        title="iOS debugging alternatives in 2026"
        description="Route yourself to the right tool by workflow: in-app inspector, desktop proxy, or packet capture."
      />
      <section className="pb-20">
        <Container>
          <div className="grid gap-4 sm:grid-cols-2">
            {alternatives.map((a) => (
              <Link key={a.href} href={a.href}>
                <Card className="h-full transition hover:border-violet-500/30">
                  <h2 className="font-semibold text-white">{a.title}</h2>
                  <p className="mt-2 text-sm text-zinc-400">{a.desc}</p>
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
