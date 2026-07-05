/**
 * Maps rockxy.io routes → DebugSwift equivalents.
 * Rockxy is a macOS HTTP proxy; DebugSwift is an in-app iOS debugger.
 * Routes are preserved where it makes sense; others are adapted or omitted.
 */
export const routeMap = {
  rockxy: {
    // Core marketing
    "/": { debugswift: "/", note: "Homepage" },
    "/philosophy": { debugswift: "/philosophy", note: "Open source philosophy" },
    "/#features": { debugswift: "/features", note: "Rockxy uses anchor; we use a page" },
    "/workspace": { debugswift: "/integration", note: "Team workflow → integration patterns" },
    "/pricing": { debugswift: "/license", note: "MIT free vs Rockxy Pro pricing" },
    "/blog": { debugswift: "/blog", note: "Blog index" },
    "/docs": { debugswift: "/docs", note: "In-site docs (modeled on docs.rockxy.io)" },
    "/download": { debugswift: "/install", note: "SPM/CocoaPods vs .dmg" },
    "/about": { debugswift: "/about", note: "About the project" },
    "/roadmap": { debugswift: "/roadmap", note: "Public roadmap" },
    "/changelog": { debugswift: "/changelog", note: "Release history" },
    "/faq": { debugswift: "/faq", note: "FAQ" },
    "/support": { debugswift: "/support", note: "Support hub" },
    "/partners": { debugswift: "/partners", note: "Sponsors & partners" },
    "/education": { debugswift: "/education", note: "Academic access" },

    // Comparisons
    "/alternatives": { debugswift: "/alternatives", note: "Alternatives hub" },
    "/compare": { debugswift: "/compare", note: "Multi-tool comparison" },
    "/proxyman-alternative": { debugswift: "/proxyman-alternative", note: "iOS in-app vs macOS proxy" },
    "/charles-proxy-alternative": { debugswift: "/charles-proxy-alternative", note: "Adapted positioning" },
    "/wireshark-alternative": { debugswift: "/wireshark-alternative", note: "App-layer vs packet layer" },
    "/fiddler-alternative": { debugswift: "/fiddler-alternative", note: "Adapted positioning" },
    "/best-mitmproxy-alternative": { debugswift: "/flipper-alternative", note: "Flipper as closest OSS peer" },

    // Legal
    "/privacy": { debugswift: "/privacy", note: "Privacy policy" },
    "/terms": { debugswift: "/terms", note: "Terms of service" },
    "/eula": { debugswift: "/license", note: "No paid EULA; MIT license page" },
    "/refund": { debugswift: "/license", note: "N/A, free OSS" },
    "/license": { debugswift: "/license", note: "MIT vs AGPL" },
    "/sdlc": { debugswift: "/sdlc", note: "SDLC policy" },

    // Sibling products → DebugSwift feature areas
    "/ios": { debugswift: "/features#app-tools", note: "Rockxy iOS app → DebugSwift is iOS-native" },
    "/shieldxy": { debugswift: "/features#network", note: "Network inspector coverage" },
    "/tracexy": { debugswift: "/features#performance", note: "Performance monitoring" },
    "/license-manager/access-link": { debugswift: "/license", note: "N/A for MIT OSS" },

    // Locales (rockxy has 20)
    "/ar": { debugswift: "/[locale]", note: "i18n placeholder, en only for now" },
    "/vi": { debugswift: "/[locale]", note: "i18n placeholder" },
    "/zh": { debugswift: "/[locale]", note: "i18n placeholder" },
  },

  omitted: [
    "workspace.rockxy.io/login: no cloud workspace",
  ],
} as const;

export type BlogPost = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  rockxyEquivalent?: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "why-we-built-debugswift",
    title: "Why We Built DebugSwift",
    category: "Philosophy",
    excerpt: "In-app debugging should feel native, stay local, and ship with zero backend dependencies.",
    rockxyEquivalent: "/blog/why-we-built-rockxy",
  },
  {
    slug: "in-app-network-inspection-ios",
    title: "In-App Network Inspection on iOS",
    category: "Network",
    excerpt: "Capture URLSession traffic, WebSockets, and encrypted responses without leaving the simulator.",
    rockxyEquivalent: "/blog/debugging-https-traffic-on-macos",
  },
  {
    slug: "memory-leak-detection-swiftui",
    title: "Memory Leak Detection in SwiftUI Apps",
    category: "Performance",
    excerpt: "Automatic ViewController and View leak tracking with actionable stack traces.",
  },
  {
    slug: "swiftui-render-tracking",
    title: "SwiftUI Render Tracking: Finding Unnecessary Re-renders",
    category: "Interface",
    excerpt: "Visualize which SwiftUI views re-render and why: beta feature deep dive.",
  },
  {
    slug: "response-modifier-mocking-apis",
    title: "Response Modifier: Mock APIs Without a Backend",
    category: "Network",
    excerpt: "Rewrite responses in real time with rules, CSV import, and live traffic generation.",
  },
  {
    slug: "documentation-recorder",
    title: "Documentation Recorder for QA Handoffs",
    category: "Interface",
    excerpt: "Record taps and scrolls as annotated screenshots for bug reports and design reviews.",
  },
  {
    slug: "flipper-vs-debugswift",
    title: "Flipper vs DebugSwift for iOS Teams",
    category: "Comparison",
    excerpt: "When an in-app Swift toolkit beats a desktop bridge for daily iOS debugging.",
    rockxyEquivalent: "/blog/charles-proxy-vs-proxyman-vs-rockxy",
  },
  {
    slug: "websocket-inspector-zero-config",
    title: "Zero-Config WebSocket Inspector",
    category: "Network",
    excerpt: "Automatic WebSocket frame capture with no swizzling configuration required.",
  },
  {
    slug: "swiftdata-browser-ios17",
    title: "Browsing SwiftData at Runtime (iOS 17+)",
    category: "Resources",
    excerpt: "Inspect models, edit values, and export JSON from registered SwiftData containers.",
  },
  {
    slug: "apple-silicon-simulator-support",
    title: "Native Apple Silicon Simulator Builds",
    category: "Engineering",
    excerpt: "arm64 simulator slices, XCFramework distribution, and faster compile times.",
  },
];
