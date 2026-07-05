import { AlternativePage } from "@/components/comparison-page";

export const metadata = { title: "Flipper Alternative for iOS" };

export default function Page() {
  return (
    <AlternativePage
      title="DebugSwift as a Flipper Alternative"
      competitor="Flipper"
      description="Meta deprecated Flipper in 2024. DebugSwift offers a native in-app replacement with network, performance, and UI tools, with no desktop bridge required."
      advantages={[
        "MIT licensed and actively maintained",
        "Pure Swift with no React Native desktop dependency",
        "Network, leaks, crashes, and UI tools in one overlay",
        "WebSocket and encrypted API support built in",
        "SwiftUI render tracking and documentation recorder",
      ]}
      faq={[
        { q: "Do I need a desktop app?", a: "No. DebugSwift runs entirely inside your iOS app in DEBUG builds." },
        { q: "Can I migrate from Flipper?", a: "Remove Flipper SDK, add DebugSwift via SPM, call setup() and show()." },
      ]}
    />
  );
}
