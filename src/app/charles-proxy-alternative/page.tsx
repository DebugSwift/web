import { AlternativePage } from "@/components/comparison-page";

export const metadata = { title: "Charles Proxy Alternative" };

export default function Page() {
  return (
    <AlternativePage
      title="Charles Proxy vs in-app debugging"
      competitor="Charles Proxy"
      description="Charles excels at system-wide HTTPS proxying on desktop. DebugSwift targets iOS developers who need in-app context: sandbox, UI, and performance alongside network logs."
      advantages={[
        "Zero proxy or certificate configuration",
        "Captures traffic with full app context (process, sandbox)",
        "UI debugging tools Charles cannot provide",
        "MIT open source",
      ]}
      faq={[
        { q: "When use Charles instead?", a: "When debugging traffic from non-instrumented apps or cross-device proxy scenarios." },
      ]}
    />
  );
}
