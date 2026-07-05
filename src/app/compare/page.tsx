import { ComparisonPage } from "@/components/comparison-page";

export const metadata = {
  title: "Compare - DebugSwift vs Flipper vs Pulse",
  description: "Feature comparison of in-app iOS debugging toolkits.",
};

const rows = [
  { feature: "Platform", debugswift: "iOS in-app", flipper: "Desktop + bridge", pulse: "iOS in-app" },
  { feature: "License", debugswift: "MIT", flipper: "MIT (deprecated)", pulse: "Proprietary" },
  { feature: "Network inspect", debugswift: "✓", flipper: "✓", pulse: "✓" },
  { feature: "WebSocket", debugswift: "✓", flipper: "Partial", pulse: "✓" },
  { feature: "Memory leaks", debugswift: "✓", flipper: "✓", pulse: "-" },
  { feature: "SwiftUI tools", debugswift: "✓", flipper: "Limited", pulse: "Limited" },
  { feature: "SwiftData browser", debugswift: "✓ (iOS 17+)", flipper: "-", pulse: "-" },
  { feature: "Setup", debugswift: "SPM + 2 lines", flipper: "Desktop app + SDK", pulse: "SPM" },
];

export default function ComparePage() {
  return (
    <ComparisonPage
      title="DebugSwift vs Flipper vs Pulse"
      description="How in-app Swift debuggers compare for daily iOS development."
      rows={rows}
      whenToChoose={[
        { tool: "DebugSwift", reason: "You want MIT OSS, full feature set, and native SwiftUI/UIKit integration." },
        { tool: "Flipper", reason: "Legacy projects already on Flipper desktop. Note Meta deprecated Flipper in 2024." },
        { tool: "Pulse", reason: "You prefer a commercial in-app logger with a polished network UI." },
      ]}
    />
  );
}
