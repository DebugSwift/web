import { AlternativePage } from "@/components/comparison-page";

export const metadata = { title: "Proxyman + DebugSwift" };

export default function Page() {
  return (
    <AlternativePage
      title="Proxyman and DebugSwift: complementary tools"
      competitor="Proxyman"
      description="Proxyman captures device traffic via system proxy. DebugSwift inspects in-app URLSession traffic, sandbox data, and UI. Use both for full coverage."
      advantages={[
        "No certificate setup for in-app URLSession capture",
        "Inspect UserDefaults, Keychain, and databases Proxyman cannot see",
        "Memory leaks and SwiftUI render tracking",
        "Works in Simulator without proxy configuration",
      ]}
      faq={[
        { q: "Can DebugSwift replace Proxyman?", a: "For in-app HTTP/WebSocket yes; for system-wide proxy capture, use Proxyman or Charles alongside." },
        { q: "Do they conflict?", a: "No. DebugSwift hooks URLSession in-process; Proxyman uses system proxy." },
      ]}
    />
  );
}
