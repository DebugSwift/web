import { Card, Container, PageHero } from "@/components/ui";

export const metadata = { title: "FAQ" };

const faqs = [
  {
    q: "Does DebugSwift ship to production?",
    a: "Wrap all usage in #if DEBUG. The debugger should never be included in App Store release builds.",
  },
  {
    q: "How is traffic captured?",
    a: "URLSession and WebSocket methods are swizzled in-process. No system proxy or certificate trust required.",
  },
  {
    q: "Does it work on Apple Silicon simulators?",
    a: "Yes. Native arm64 simulator builds. Remove legacy EXCLUDED_ARCHS settings if you had them.",
  },
  {
    q: "Flipper vs DebugSwift?",
    a: "Flipper was deprecated by Meta in 2024. DebugSwift is an active MIT alternative with in-app UI.",
  },
  {
    q: "Can I present the debugger without the floating ball?",
    a: "Yes. Call DebugSwift.debugViewController() and present it modally or push it.",
  },
  {
    q: "Is there a paid tier?",
    a: "No. DebugSwift is fully MIT open source with no account or license key.",
  },
];

export default function FAQPage() {
  return (
    <>
      <PageHero title="Frequently asked questions" />
      <section className="pb-20">
        <Container className="max-w-3xl space-y-4">
          {faqs.map((f) => (
            <Card key={f.q}>
              <h2 className="font-semibold text-white">{f.q}</h2>
              <p className="mt-2 text-sm text-zinc-400">{f.a}</p>
            </Card>
          ))}
        </Container>
      </section>
    </>
  );
}
