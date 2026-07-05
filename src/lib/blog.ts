import type { DocBlock } from "./docs";

const IMG = "/app-screenshots/docs";

function shot(alt: string, file: string): DocBlock {
  return { type: "screenshot", alt, image: `${IMG}/${file}` };
}

export type BlogArticle = {
  blocks: DocBlock[];
};

export const blogArticles: Record<string, BlogArticle> = {
  "why-we-built-debugswift": {
    blocks: [
      {
        type: "paragraph",
        text: "Every iOS team eventually hits the same wall: you need to see what your app is doing — network calls, memory, UI layout, sandbox state — but the tools that work well on macOS or Android do not map cleanly onto Swift and UIKit. Proxies need certificate trust. Desktop bridges need a host machine. Flipper needs a React Native integration that Meta deprecated in 2023. We kept reaching for one toolkit that felt native, stayed local, and shipped with zero backend dependencies. That gap is why DebugSwift exists.",
      },
      { type: "heading", text: "The problem with external debugging" },
      {
        type: "paragraph",
        text: "macOS HTTP proxies like Charles and Proxyman are excellent at what they do. They terminate TLS, show decrypted bodies, and support breakpoints. But on iOS they introduce friction: install a root CA on the simulator or device, configure system proxy settings, work around certificate pinning, and route traffic through another process on your Mac. None of that is wrong — it is just a different model than in-process inspection.",
      },
      {
        type: "paragraph",
        text: "Flipper took another path: a desktop app connected to your mobile app over a bridge. Meta integrated it into React Native for years, then deprecated first-party support in RN 0.73 and removed the template integration in 0.74. The product still exists, but the default workflow for native iOS teams no longer includes it. Teams migrating away need something that runs inside the app, not beside it.",
      },
      { type: "heading", text: "What we actually needed" },
      {
        type: "paragraph",
        text: "We listed the tasks we perform every day while building Swift apps — not a feature checklist, but real workflow steps:",
      },
      {
        type: "list",
        items: [
          "See every URLSession request and response without proxy setup or cert pinning workarounds",
          "Inspect WebSocket frames from URLSessionWebSocketTask with no manual registration",
          "Catch leaked view controllers after popping a navigation stack",
          "Browse UserDefaults, Keychain, SQLite, and SwiftData without exporting files",
          "Overlay CPU, memory, and FPS while scrolling a heavy list",
          "Record a bug reproduction as annotated screenshots for QA",
          "Strip all of it from release builds with a single #if DEBUG guard",
        ],
      },
      {
        type: "paragraph",
        text: "No single tool covered all of this for pure Swift/UIKit/SwiftUI projects. Network proxies do not show your view hierarchy. Xcode Instruments does not mock API responses. Console.app does not browse your sandbox. We kept switching between four or five apps per debugging session.",
      },
      { type: "heading", text: "In-app, not beside-app" },
      {
        type: "paragraph",
        text: "DebugSwift hooks the same APIs your app already uses. URLSession configuration is swizzled after setup(). WebSocket monitoring attaches to URLSessionWebSocketTask automatically. Leak detection instruments UIViewController lifecycle methods. Everything runs in-process on the simulator or device.",
      },
      {
        type: "code",
        language: "swift",
        code: `#if DEBUG
import DebugSwift

let debugSwift = DebugSwift()
debugSwift.setup().show()
#endif`,
      },
      {
        type: "paragraph",
        text: "Captured traffic never leaves your app unless you export it. There is no cloud account, no license server, and no desktop companion required. Debug on a plane, behind a corporate firewall, or with your Mac unplugged — the debugger travels with the binary.",
      },
      shot("DebugSwift main window", "main-window"),
      { type: "heading", text: "Open source by default" },
      {
        type: "paragraph",
        text: "DebugSwift is MIT licensed. The full source — network swizzling, Keychain browser, performance hooks, and the UI overlay — is on GitHub. When a debugger reads your auth tokens and sandbox files, you should be able to audit every line that handles that data. MIT also means teams can fork and maintain the project if priorities shift.",
      },
      { type: "heading", text: "DEBUG builds only" },
      {
        type: "paragraph",
        text: "The compile-time boundary matters. Wrap setup in #if DEBUG and the linker strips DebugSwift from release binaries. There is no runtime flag that accidentally ships a debug overlay to the App Store. The line between debuggable and shippable code is explicit.",
      },
      { type: "heading", text: "Where we are today" },
      {
        type: "paragraph",
        text: "DebugSwift ships network inspection, WebSocket capture, encrypted response decryption, response mocking, performance metrics, leak detection, view hierarchy tools, SwiftUI render tracking (beta), a documentation recorder, and runtime browsers for files, databases, and SwiftData. It is actively maintained, distributed via SPM and CocoaPods, and includes a prebuilt XCFramework for faster CI builds.",
      },
      {
        type: "paragraph",
        text: "If you are an iOS engineer tired of juggling proxies, desktop bridges, and half a dozen single-purpose tools, DebugSwift is built for your workflow. Star the repo, file issues, or contribute — the toolkit improves when real teams use it daily.",
      },
    ],
  },

  "in-app-network-inspection-ios": {
    blocks: [
      {
        type: "paragraph",
        text: "Inspecting HTTPS traffic on iOS traditionally means standing up a man-in-the-middle proxy: generate a root CA, trust it on the simulator, route traffic through Charles or Proxyman, and hope certificate pinning does not block you. That workflow works — and for cross-app traffic on a Mac, it is often the right tool. For day-to-day iOS development inside your own app, in-process capture is faster and avoids the TLS trust dance entirely.",
      },
      { type: "heading", text: "How proxy debugging works (and where it hurts)" },
      {
        type: "paragraph",
        text: "A debugging proxy terminates TLS at the proxy machine. Your app connects to the proxy using a certificate signed by a locally trusted root CA; the proxy connects to the real server using the server's certificate. Traffic is decrypted in the middle, inspected, and re-encrypted. On macOS this is straightforward. On iOS you must install the root CA on each simulator or device, configure proxy settings, and handle apps that pin certificates — banking SDKs, some auth libraries, and security-hardened APIs will reject the proxy's certificate outright.",
      },
      { type: "heading", text: "In-process capture with URLSession hooks" },
      {
        type: "paragraph",
        text: "DebugSwift takes a different approach. After setup(), it swizzles URLSessionConfiguration factory methods so every session your app creates — including Alamofire, async URLSession, and third-party SDKs that use URLSession under the hood — flows through the same monitoring pipeline. Requests and responses are logged before encryption on the way out and after decryption on the way in. No certificate is substituted. Pinning continues to work because TLS still terminates inside your app's network stack.",
      },
      {
        type: "code",
        language: "swift",
        code: `let debugSwift = DebugSwift()
debugSwift.setup().show()

// Optional: filter noise or scope to your API
DebugSwift.Network.shared.ignoredURLs = ["https://analytics.example.com"]
DebugSwift.Network.shared.onlyURLs = ["https://api.myapp.com"]`,
      },
      shot("Network tab with captured requests", "network-tab-with-captured-requests"),
      { type: "heading", text: "What you see in the inspector" },
      {
        type: "list",
        items: [
          "Request and response headers with syntax-highlighted JSON bodies",
          "Timing information for each transaction",
          "Status codes, redirects, and error states",
          "Filtering by URL pattern to cut analytics noise",
          "Encrypted payloads decrypted in-place when you register AES keys or custom decryptors",
        ],
      },
      shot("HTTP monitoring JSON body detail", "http-monitoring-json-body-detail"),
      { type: "heading", text: "Encrypted APIs" },
      {
        type: "paragraph",
        text: "Some backends return AES-encrypted JSON wrapped in base64. A proxy shows ciphertext. DebugSwift can decrypt responses in the inspector when you register your key or a custom decryptor closure — the ciphertext remains available in the raw view for comparison.",
      },
      shot("Encrypted response decrypted to JSON", "encrypted-response-decrypted-json-view"),
      { type: "heading", text: "Mocking without a backend" },
      {
        type: "paragraph",
        text: "The Response Modifier rewrites status codes and bodies for matching URLs at runtime. Test error states, empty lists, and edge-case payloads without deploying a staging server. Rules can be generated from live traffic you just captured.",
      },
      { type: "heading", text: "When to use a proxy instead" },
      {
        type: "paragraph",
        text: "In-app capture excels for URLSession-based traffic inside your DEBUG build. A system proxy still wins when you need to inspect traffic from multiple apps simultaneously, debug WKWebView content that bypasses URLSession, capture CLI tools, or set request breakpoints mid-flight. Many teams use both: DebugSwift for daily iOS work, a macOS proxy for cross-process or pinning-heavy scenarios.",
      },
      { type: "heading", text: "Getting started" },
      {
        type: "paragraph",
        text: "Add DebugSwift via SPM, call setup() inside #if DEBUG, and tap the floating debug ball. Every URLSession request from that point forward appears in the Network tab. If you create URLSessionConfiguration before setup(), inject the monitoring configuration manually — see the configuration docs for details.",
      },
    ],
  },

  "memory-leak-detection-swiftui": {
    blocks: [
      {
        type: "paragraph",
        text: "Memory leaks in iOS apps are rarely dramatic. They do not crash immediately. They accumulate — a view controller that never deallocates after pop, a closure that captures self strongly, a notification observer left registered. Over a long session the footprint grows, scroll performance degrades, and eventually iOS jetsams your app. Catching these leaks early means watching object lifecycles, not just peak memory on a chart.",
      },
      { type: "heading", text: "Why view controller leaks matter most" },
      {
        type: "paragraph",
        text: "UIViewController instances anchor large object graphs: their view hierarchies, child view controllers, presented sheets, and every object those views retain. When a controller survives a pop or dismiss, everything it owns survives with it. SwiftUI apps are not immune — UIHostingController and navigation wrappers still participate in UIKit lifecycle, and leaked hosting controllers keep entire SwiftUI trees alive.",
      },
      { type: "heading", text: "How DebugSwift detects leaks" },
      {
        type: "paragraph",
        text: "DebugSwift instruments UIViewController lifecycle methods at runtime. When you navigate into a screen and then pop back, the framework expects the controller to deallocate within a short window. If it survives, it appears in the Leaks tab with a retention path and stack trace pointing to where the object was created.",
      },
      shot("Leaked objects list", "memory-leak-detection-leaked-objects-list"),
      { type: "heading", text: "A practical workflow" },
      {
        type: "list",
        items: [
          "Enable leak detection via setup() — it is on by default unless you pass disable: [.leaksDetector]",
          "Navigate through your app normally: push, present, pop, dismiss",
          "Open the Performance tab and check Leaks after each flow",
          "Tap a leaked object to read the stack trace and find the retaining reference",
          "Fix the retain cycle, rerun the flow, and confirm the object disappears",
        ],
      },
      shot("Leak stack trace detail", "memory-leak-stack-trace-detail"),
      { type: "heading", text: "Common SwiftUI and UIKit causes" },
      {
        type: "list",
        items: [
          "Closures in .onAppear or Task blocks that capture self without [weak self]",
          "Delegates declared as strong instead of weak",
          "NotificationCenter observers not removed in deinit",
          "Timer or CADisplayLink retaining the target",
          "Child view controllers added but never removed from parent",
          "Combine cancellables stored on a view model that outlives the view",
        ],
      },
      { type: "heading", text: "Disabling when needed" },
      {
        type: "paragraph",
        text: "Some APM SDKs install their own lifecycle swizzling — New Relic is a documented example. If you see conflicts, disable leak detection selectively while keeping other features:",
      },
      {
        type: "code",
        language: "swift",
        code: `debugSwift.setup(disable: [.leaksDetector])`,
      },
      { type: "heading", text: "Complementing Instruments" },
      {
        type: "paragraph",
        text: "Xcode Instruments Leaks and Allocations remain the gold standard for deep memory profiling — finding malloc leaks, analyzing heap growth, and attaching to release builds. DebugSwift's leak detector is lighter-weight: it runs continuously during development, flags surviving view controllers without a separate Instruments session, and includes stack traces in the same overlay you use for network and UI debugging. Use both: DebugSwift for daily regression checks, Instruments when you need a full heap analysis.",
      },
    ],
  },

  "swiftui-render-tracking": {
    blocks: [
      {
        type: "paragraph",
        text: "SwiftUI makes UI code concise, but performance debugging is harder than UIKit. There is no drawRect to breakpoint. A state change can re-render an entire tree, and nothing in Xcode tells you which views redrew or why. The symptom is familiar: scrolling stutters, typing lags, or CPU spikes on a screen that looks simple. The cause is often an @State or @ObservableObject update propagating farther than you expected.",
      },
      { type: "heading", text: "What render tracking shows" },
      {
        type: "paragraph",
        text: "DebugSwift's SwiftUI Render Tracking (beta) overlays your running UI with visual indicators when views re-render. A dedicated settings screen lets you tune sensitivity and filter noise so you can focus on views that redraw excessively.",
      },
      shot("SwiftUI render tracking overlay", "swiftui-render-tracking-overlay"),
      { type: "heading", text: "Enabling the beta feature" },
      {
        type: "paragraph",
        text: "Render tracking is behind the beta features flag because it adds instrumentation overhead. Enable it explicitly at setup time:",
      },
      {
        type: "code",
        language: "swift",
        code: `debugSwift
    .setup(enableBetaFeatures: [.swiftUIRenderTracking])
    .show()`,
      },
      { type: "heading", text: "Finding wasted work" },
      {
        type: "list",
        items: [
          "Identify @State changes that trigger full-screen redraws instead of local updates",
          "Spot expensive child views missing Equatable conformance",
          "Compare render counts before and after wrapping a subtree in EquatableView or using @Observable (iOS 17+)",
          "Detect unnecessary body re-evaluations when parent state changes but child inputs do not",
        ],
      },
      shot("Render tracking settings and stats", "render-tracking-settings-and-stats"),
      { type: "heading", text: "Typical fixes once you find the culprit" },
      {
        type: "paragraph",
        text: "After render tracking highlights a hot view, the fixes are usually structural: move state closer to the views that need it, split large bodies into smaller subviews so SwiftUI's diffing can skip unchanged branches, add Equatable to models passed into ForEach, or replace @ObservedObject with @StateObject at the correct ownership boundary. The overlay tells you where to look; Apple's SwiftUI performance documentation and Instruments Time Profiler tell you how deep the problem runs.",
      },
      { type: "heading", text: "Beta expectations" },
      {
        type: "paragraph",
        text: "This feature is actively evolving. Expect some false positives on system-managed views and containers. Use it as a directional signal during development, not as a CI gate. Feedback via GitHub issues directly shapes sensitivity defaults and filtering rules.",
      },
    ],
  },

  "response-modifier-mocking-apis": {
    blocks: [
      {
        type: "paragraph",
        text: "Backend-dependent UI development is a bottleneck. The API is down, staging has stale data, or the edge case you need — an empty cart, a 403, a malformed JSON field — does not exist in any environment. Teams respond with hardcoded mocks in unit tests, feature flags, or local stub servers. All of these work, but they require code changes, PRs, and often a restart. The Response Modifier lets you rewrite live traffic at runtime without touching your backend or recompiling.",
      },
      { type: "heading", text: "How it works" },
      {
        type: "paragraph",
        text: "After DebugSwift captures a URLSession response, the Response Modifier checks active rules before your app sees the data. Matching rules can override the HTTP status code and response body. Non-matching traffic passes through unchanged. Rules toggle on and off individually, so you can keep a library of test scenarios and enable one at a time.",
      },
      shot("Response Modifier rules list", "response-modifier-rules-list"),
      { type: "heading", text: "Rule matching" },
      {
        type: "list",
        items: [
          "Match by exact URL or wildcard pattern",
          "Override status code — test 401, 404, 500 without server cooperation",
          "Replace the response body with custom JSON, XML, or plain text",
          "Body editor with JSON validation to catch syntax errors before saving",
        ],
      },
      shot("Response Modifier rule editor", "response-modifier-rule-editor"),
      { type: "heading", text: "Generate rules from live traffic" },
      {
        type: "paragraph",
        text: "The fastest workflow: reproduce the real request in your app, find it in the Network tab, and generate a modifier rule from the captured response. You start with production-shaped data, then edit the fields you need to test. No hand-writing URLs from memory.",
      },
      { type: "heading", text: "Import and export with CSV" },
      {
        type: "paragraph",
        text: "Share rule sets across teammates via CSV import and export. A QA engineer can load the same error-state rules a developer created, or you can version-control a CSV of regression scenarios alongside your test plan.",
      },
      { type: "heading", text: "Practical scenarios" },
      {
        type: "list",
        items: [
          "Empty list — return [] for a feed endpoint to test your zero-state UI",
          "Pagination end — cap results at page 2 to verify the footer spinner stops",
          "Auth expiry — force 401 on a protected route and confirm the login redirect",
          "Slow network — combine with request thresholds to verify loading states",
          "Offline shape — return cached-shaped JSON when the real API is unreachable",
        ],
      },
      { type: "heading", text: "Limits to know" },
      {
        type: "paragraph",
        text: "The Response Modifier intercepts URLSession traffic inside your DEBUG build. It does not affect WKWebView loads, raw socket connections, or gRPC streams unless they route through URLSession. Disable all rules when testing against real staging to avoid confusing results. Nothing ships to release — the modifier exists only in debug binaries.",
      },
    ],
  },

  "documentation-recorder": {
    blocks: [
      {
        type: "paragraph",
        text: "Bug reports fail when reproduction steps are ambiguous. \"Tap the button on the settings screen\" — which button? Which settings screen? Screen recordings help, but they are large, hard to annotate, and awkward in Jira. Screenshots alone miss the sequence. The Documentation Recorder bridges that gap by capturing your interactions as a numbered sequence of annotated stills.",
      },
      { type: "heading", text: "What it records" },
      {
        type: "paragraph",
        text: "Enable the recorder from the Interface tools section. As you interact with your app, each tap is marked with a numbered circle and each scroll with a directional arrow. The result is a step-by-step visual story that anyone on your team can follow without running the build.",
      },
      shot("Documentation Recorder annotated screenshots", "documentation-recorder"),
      { type: "heading", text: "Export options" },
      {
        type: "list",
        items: [
          "Save the recording as individual images or a combined grid",
          "Copy the grid to the clipboard for pasting into Slack or Linear",
          "Share directly from the recorder sheet on device or simulator",
        ],
      },
      shot("Documentation Recorder export grid", "documentation-recorder-export-grid"),
      { type: "heading", text: "Workflows that benefit" },
      {
        type: "paragraph",
        text: "QA handoffs: reproduce a bug once, export the grid, attach it to a ticket. Design reviews: record an onboarding flow and share annotated steps with stakeholders who do not have Xcode. Regression documentation: capture the happy path before a refactor, then compare behavior after. Knowledge transfer: new engineers see exactly which sequence triggers a feature flag or hidden debug menu.",
      },
      { type: "heading", text: "Tips for clear recordings" },
      {
        type: "list",
        items: [
          "Pause between steps so each tap gets its own frame",
          "Use slow-motion animation control if transitions happen too fast to follow",
          "Combine with the grid overlay when alignment issues are part of the bug",
          "Keep recordings short — ten to fifteen steps fit cleanly on a single export grid",
        ],
      },
      { type: "heading", text: "Privacy reminder" },
      {
        type: "paragraph",
        text: "Recordings capture whatever is on screen, including user data if your debug build points at production. Redact or use staging accounts before exporting. DebugSwift does not upload recordings anywhere — they stay in your app process until you explicitly save or share them.",
      },
    ],
  },

  "flipper-vs-debugswift": {
    blocks: [
      {
        type: "paragraph",
        text: "For years, Flipper was the default debugging companion for React Native and many native iOS teams. Meta integrated it into the RN template, shipped desktop plugins for network and layout inspection, and made it the path of least resistance. That changed: React Native 0.73 deprecated first-party Flipper support, and 0.74 removed the native integration from new project templates. Flipper as a standalone product still exists, but it is no longer the recommended default — and native iOS teams need a replacement that does not depend on a desktop bridge.",
      },
      { type: "heading", text: "Architectural difference" },
      {
        type: "paragraph",
        text: "Flipper connects a desktop Electron app to your mobile app over a socket. Plugins on the desktop side render network traffic, databases, and layout trees relayed from the device. DebugSwift runs entirely inside your iOS app as a UIKit overlay. There is no host machine requirement, no plugin installation on desktop, and no socket handshake to debug when connections fail.",
      },
      { type: "heading", text: "Side-by-side comparison" },
      {
        type: "list",
        items: [
          "Setup — Flipper: desktop app + SDK + RN bootstrap code. DebugSwift: SPM/CocoaPods + setup().show()",
          "License — Flipper: BSD-style Meta license. DebugSwift: MIT",
          "Network — Flipper: desktop Network plugin. DebugSwift: in-process URLSession capture with decryption and response mocking",
          "Layout — Flipper: desktop Layout plugin. DebugSwift: 3D view hierarchy, grid, borders, touch indicators in-app",
          "Leaks — Flipper: limited native support. DebugSwift: automatic UIViewController leak detection with stack traces",
          "SwiftUI — Flipper: no first-class render tracking. DebugSwift: beta SwiftUI render overlay",
          "Release safety — Both should be DEBUG-only; DebugSwift enforces via #if DEBUG compile stripping",
          "Maintenance — Flipper decoupled from RN core. DebugSwift: active iOS-first development",
        ],
      },
      shot("Network inspector in DebugSwift", "network-inspector"),
      { type: "heading", text: "Migrating from Flipper" },
      {
        type: "paragraph",
        text: "Remove Flipper SDK dependencies and bootstrap code from your Podfile or Gradle config. Add DebugSwift via Swift Package Manager. Wrap initialization in #if DEBUG:",
      },
      {
        type: "code",
        language: "swift",
        code: `#if DEBUG
import DebugSwift

@main
struct MyApp: App {
    init() {
        DebugSwift().setup().show()
    }
    // ...
}
#endif`,
      },
      { type: "heading", text: "When Flipper still makes sense" },
      {
        type: "paragraph",
        text: "If you rely on a specific Flipper plugin that has no DebugSwift equivalent — a custom Redux inspector, a proprietary analytics plugin, or cross-platform Android+iOS debugging from one desktop — keeping Flipper for that workflow may be justified. For standard native iOS needs (network, layout, logs, sandbox, performance), an in-app toolkit removes the desktop dependency and matches how Swift teams already work in Xcode.",
      },
      { type: "heading", text: "React Native teams" },
      {
        type: "paragraph",
        text: "JavaScript debugging now flows through React Native DevTools (Hermes). Native-layer inspection — the part Flipper's plugins handled — falls to Xcode and in-app tools. DebugSwift covers the native iOS side: URLSession traffic, crashes, sandbox files, and UI inspection inside your RN host app without reopening Flipper.",
      },
    ],
  },

  "websocket-inspector-zero-config": {
    blocks: [
      {
        type: "paragraph",
        text: "WebSockets power live feeds, chat, collaborative editing, and real-time notifications. Debugging them is painful: browser DevTools cover WKWebView only partially, proxies often struggle with upgraded connections, and raw logging with print statements loses frame boundaries. If your iOS app uses URLSessionWebSocketTask — Apple's first-party WebSocket API since iOS 13 — DebugSwift captures every connection and frame with zero configuration beyond setup().",
      },
      { type: "heading", text: "What gets captured automatically" },
      {
        type: "paragraph",
        text: "DebugSwift's WebSocket monitor hooks URLSessionWebSocketTask at runtime. New connections appear in a dedicated WebSocket tab, separate from HTTP traffic. Each connection shows open, message, and close events with timestamps.",
      },
      shot("WebSocket connection list", "websocket-inspector-connection-list"),
      { type: "heading", text: "Frame inspection" },
      {
        type: "list",
        items: [
          "Text frames displayed as readable strings",
          "Binary frames shown with size and hex preview",
          "Direction indicators — client-to-server vs server-to-client",
          "Per-connection message history for replaying conversation flow",
          "Connection errors and close codes when handshakes fail",
        ],
      },
      shot("WebSocket frame detail", "websocket-inspector-frame-detail"),
      { type: "heading", text: "No manual registration" },
      {
        type: "paragraph",
        text: "Unlike some debugging libraries that require you to wrap each WebSocket instance or register delegates, DebugSwift enables WebSocket capture globally in setup(). If you did not disable it with setup(disable: [.webSocket]), frames flow into the inspector automatically.",
      },
      {
        type: "code",
        language: "swift",
        code: `// WebSocket capture is on by default after setup()
let debugSwift = DebugSwift()
debugSwift.setup().show()

// Clear history when switching environments
await DebugSwift.Network.shared.clearWebSocketHistory()`,
      },
      { type: "heading", text: "What is not covered" },
      {
        type: "paragraph",
        text: "URLSessionWebSocketTask is the supported path. Third-party WebSocket libraries that use raw NWConnection or Starscream's own socket layer bypass URLSession and will not appear unless they ultimately route through a monitored API. WKWebView WebSockets are handled separately via the WKWebView network monitor. If a connection is missing, check which stack your library uses.",
      },
      { type: "heading", text: "Debugging workflow" },
      {
        type: "paragraph",
        text: "Reproduce the real-time feature in your app — open a chat channel, subscribe to a feed, trigger a push over WS. Switch to the WebSocket tab, select the connection, and walk through frames in order. Compare client requests against server responses to spot missing acknowledgments, duplicate subscriptions, or JSON parse errors in message payloads. Pair with the HTTP tab when your app uses REST for auth and WebSockets for streaming on the same host.",
      },
    ],
  },

  "swiftdata-browser-ios17": {
    blocks: [
      {
        type: "paragraph",
        text: "SwiftData arrived in iOS 17 as Apple's Swift-native persistence layer — @Model macros, relationship graphs, and tight SwiftUI integration. Debugging it is less mature than Core Data. Xcode does not ship a SwiftData browser. LLDB can po objects, but traversing relationships and verifying migrations at runtime is tedious. DebugSwift's SwiftData browser lists registered containers, shows models, and lets you edit values without exporting the store.",
      },
      { type: "heading", text: "What you can inspect" },
      {
        type: "paragraph",
        text: "On iOS 17 and later, DebugSwift discovers SwiftData containers registered in your app. Browse each model type, inspect properties and relationships, and open individual records.",
      },
      shot("SwiftData model browser", "swiftdata-model-browser"),
      {
        type: "list",
        items: [
          "List all @Model types in a container",
          "View property values and relationship links between records",
          "Edit field values in place to test UI reactions",
          "Export selected records as JSON for diffing or bug reports",
        ],
      },
      shot("SwiftData record detail and export", "swiftdata-record-detail-and-export"),
      { type: "heading", text: "When this saves hours" },
      {
        type: "list",
        items: [
          "Migration testing — verify default values and required fields after a schema change",
          "Relationship debugging — confirm cascade deletes and inverse relationships behave correctly",
          "Seed data inspection — check whether your preview or test seeder wrote expected rows",
          "Sync conflicts — compare local records against what your API claims should exist",
        ],
      },
      { type: "heading", text: "SwiftData vs the database browser" },
      {
        type: "paragraph",
        text: "DebugSwift also ships a SQLite and Realm browser for file-based stores. SwiftData often persists to SQLite under the hood, but the raw SQL view lacks model semantics — table names are opaque, relationships are foreign keys you must join manually. The SwiftData browser operates at the model layer, which matches how you think about your code. Use the SQLite browser when you need to inspect non-SwiftData databases or third-party stores.",
      },
      { type: "heading", text: "Requirements and limits" },
      {
        type: "paragraph",
        text: "The browser requires iOS 17+ and a DEBUG build with DebugSwift setup. It reflects the live in-memory and on-disk state of the running process — edits apply immediately, so treat changes like any runtime mutation during development. Back up important test data before bulk edits. CloudKit sync is not mirrored in real time; you see the local container state on device or simulator.",
      },
    ],
  },

  "apple-silicon-simulator-support": {
    blocks: [
      {
        type: "paragraph",
        text: "When Apple Silicon Macs launched, the iOS simulator gained native arm64 execution — faster launches, lower battery use, and no Rosetta translation layer. Many CocoaPods projects fought this transition: dependencies shipped x86_64-only simulator slices, Podfiles excluded arm64 to force Intel builds, and compile times ballooned. DebugSwift ships native arm64 simulator support and a prebuilt XCFramework so Apple Silicon development stays fast.",
      },
      { type: "heading", text: "The arm64 exclusion problem" },
      {
        type: "paragraph",
        text: "A common workaround during the Intel-to-ARM transition was EXCLUDED_ARCHS[sdk=iphonesimulator*] = arm64 in the Podfile. That forced the simulator to build x86_64 and run under Rosetta on M1/M2/M3 Macs. As dependencies added arm64 slices, teams removed the exclusion — but stale Podfiles still carry it, breaking arm64-native packages like DebugSwift with \"unsupported architecture\" errors.",
      },
      { type: "heading", text: "What DebugSwift ships" },
      {
        type: "list",
        items: [
          "Native arm64 and x86_64 simulator slices in the Swift package",
          "XCFramework distribution for up to 50% faster compile times in large projects",
          "Device arm64 slices for on-hardware debugging",
          "Swift 6 compatibility with Xcode 16+",
        ],
      },
      { type: "heading", text: "Recommended installation" },
      {
        type: "paragraph",
        text: "Swift Package Manager is the default path — Xcode resolves the correct slice automatically. For CI pipelines and large monorepos where compile time matters, use the prebuilt XCFramework via CocoaPods:",
      },
      {
        type: "code",
        code: `pod 'DebugSwift', :http => 'https://github.com/DebugSwift/DebugSwift/releases/latest/download/DebugSwift.xcframework.zip'`,
      },
      { type: "heading", text: "Fixing build errors" },
      {
        type: "paragraph",
        text: "If you see unsupported Swift architecture or missing arm64 simulator slice errors, try these steps in order:",
      },
      {
        type: "list",
        items: [
          "Update to the latest DebugSwift release — older tags may predate arm64 simulator support",
          "Remove EXCLUDED_ARCHS[sdk=iphonesimulator*] = arm64 from your Podfile and project build settings",
          "Switch from source-based CocoaPods to the XCFramework URL above",
          "Clean build folder (Shift+Cmd+K) and delete DerivedData if Xcode caches stale slices",
          "Verify you are on Xcode 16+ with iOS 14+ deployment target",
        ],
      },
      { type: "heading", text: "Why XCFramework for CI" },
      {
        type: "paragraph",
        text: "Compiling DebugSwift from source on every CI run adds minutes to pipelines that already build your app target, extensions, and test bundles. The XCFramework is a precompiled binary — the linker drops in the right slice for simulator or device without recompiling Swift sources. Teams report roughly 50% faster debug builds when switching from source pods to the XCFramework on large projects. Keep SPM source integration for small apps where compile time is negligible.",
      },
      { type: "heading", text: "Verifying your setup" },
      {
        type: "paragraph",
        text: "After installation, run on an Apple Silicon Mac with an arm64 simulator (iPhone 15 or later). Call setup().show(), confirm the floating debug ball appears, and open the Network tab. If the overlay renders and captures traffic, your architecture slice is correct. See the troubleshooting docs for network capture verification if requests are missing.",
      },
    ],
  },
};

export function getBlogArticle(slug: string): BlogArticle | undefined {
  return blogArticles[slug];
}
