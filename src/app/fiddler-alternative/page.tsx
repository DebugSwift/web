import { AlternativePage } from "@/components/comparison-page";

export const metadata = { title: "Fiddler Alternative for iOS" };

export default function Page() {
  return (
    <AlternativePage
      title="Fiddler vs DebugSwift for iOS teams"
      competitor="Fiddler"
      description="Fiddler is a cross-platform HTTP debugger. DebugSwift is built specifically for Swift iOS apps with native overlay UI and sandbox inspection."
      advantages={[
        "Native iOS UI with no Windows/macOS Fiddler dependency",
        "In-app overlay with shake-to-toggle",
        "Performance and memory tools included",
        "Swift Package Manager distribution",
      ]}
      faq={[
        { q: "Does DebugSwift work on Android?", a: "No. iOS only. Fiddler Everywhere supports multiple platforms via proxy." },
      ]}
    />
  );
}
