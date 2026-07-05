export type DocBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string; level?: 2 | 3 }
  | { type: "list"; items: string[] }
  | { type: "code"; code: string; language?: "swift" }
  | { type: "cards"; items: { title: string; description: string }[] }
  | { type: "screenshot"; alt: string; image: string };

export type DocPage = {
  slug: string[];
  title: string;
  description: string;
  blocks: DocBlock[];
};

export type DocNavGroup = {
  title: string;
  items: { slug: string[]; title: string }[];
};

const DOC_IMG = "/app-screenshots/docs";

function shot(alt: string, file?: string): DocBlock {
  const name =
    file ??
    alt
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  return { type: "screenshot", alt, image: `${DOC_IMG}/${name}.png` };
}

export const docsNav: DocNavGroup[] = [
  {
    title: "Getting Started",
    items: [
      { slug: [], title: "Overview" },
      { slug: ["quickstart"], title: "Quick Start" },
      { slug: ["installation"], title: "Installation" },
      { slug: ["configuration"], title: "Configuration" },
      { slug: ["first-session"], title: "First Debug Session" },
    ],
  },
  {
    title: "Network",
    items: [
      { slug: ["network", "http-monitoring"], title: "HTTP Monitoring" },
      { slug: ["network", "websocket-inspector"], title: "WebSocket Inspector" },
      { slug: ["network", "encryption"], title: "Encryption & Decryption" },
      { slug: ["network", "response-modifier"], title: "Response Modifier" },
      { slug: ["network", "request-thresholds"], title: "Request Thresholds" },
    ],
  },
  {
    title: "Performance",
    items: [
      { slug: ["performance", "metrics"], title: "Real-time Metrics" },
      { slug: ["performance", "memory-leaks"], title: "Memory Leak Detection" },
      { slug: ["performance", "thread-checker"], title: "Thread Checker" },
      { slug: ["performance", "performance-widget"], title: "Performance Widget" },
    ],
  },
  {
    title: "App Tools",
    items: [
      { slug: ["app-tools", "crash-reports"], title: "Crash Reports" },
      { slug: ["app-tools", "console-logs"], title: "Console Logs" },
      { slug: ["app-tools", "device-info"], title: "Device Info" },
      { slug: ["app-tools", "apns-tokens"], title: "APNS Tokens" },
      { slug: ["app-tools", "custom-actions"], title: "Custom Actions" },
    ],
  },
  {
    title: "Interface",
    items: [
      { slug: ["interface", "grid-and-borders"], title: "Grid & View Borders" },
      { slug: ["interface", "view-hierarchy"], title: "View Hierarchy" },
      { slug: ["interface", "touch-and-animation"], title: "Touch & Animation" },
      { slug: ["interface", "render-tracking"], title: "SwiftUI Render Tracking" },
      { slug: ["interface", "documentation-recorder"], title: "Documentation Recorder" },
    ],
  },
  {
    title: "Resources",
    items: [
      { slug: ["resources", "file-browser"], title: "File Browser" },
      { slug: ["resources", "userdefaults"], title: "UserDefaults" },
      { slug: ["resources", "keychain"], title: "Keychain" },
      { slug: ["resources", "database-browser"], title: "Database Browser" },
      { slug: ["resources", "push-notifications"], title: "Push Notification Simulator" },
      { slug: ["resources", "swiftdata"], title: "SwiftData Browser" },
    ],
  },
  {
    title: "Troubleshooting",
    items: [
      { slug: ["troubleshooting"], title: "Common Issues" },
    ],
  },
];

function slugKey(slug: string[]) {
  return slug.length === 0 ? "__overview__" : slug.join("/");
}

export const docPages: Record<string, DocPage> = {
  __overview__: {
    slug: [],
    title: "Overview",
    description:
      "DebugSwift is an open-source in-app debugging toolkit for iOS. Inspect network traffic, monitor performance, browse sandbox resources, and debug UI — all from a floating overlay inside your running app.",
    blocks: [
      {
        type: "paragraph",
        text: "Everything runs locally inside your DEBUG build. DebugSwift captures URLSession traffic, WebSocket frames, performance metrics, and sandbox state without a proxy, certificate trust step, or external desktop tool.",
      },
      shot("DebugSwift main window overview", "main-window"),
      { type: "heading", text: "What DebugSwift Helps You Do" },
      {
        type: "cards",
        items: [
          {
            title: "Inspect network traffic in-app",
            description:
              "Capture URLSession requests and responses, WebSocket frames, and encrypted payloads from the simulator or device — no proxy setup.",
          },
          {
            title: "Debug API calls faster",
            description:
              "Mock responses with rules, decrypt encrypted bodies, and filter session history without leaving your running app.",
          },
          {
            title: "Monitor performance live",
            description:
              "Track CPU, memory, FPS, memory leaks, and main-thread violations with real-time charts and overlays.",
          },
          {
            title: "Browse sandbox resources",
            description:
              "Inspect UserDefaults, Keychain, databases, files, and SwiftData models at runtime from one toolkit.",
          },
        ],
      },
      { type: "heading", text: "Core Workflows" },
      { type: "heading", text: "Capture and inspect traffic", level: 3 },
      {
        type: "paragraph",
        text: "DebugSwift hooks URLSession automatically after setup(). Every request and response appears in the Network tab with headers, body, timing, JSON highlighting, and optional decryption for encrypted payloads.",
      },
      shot("Network Inspector overview", "network-inspector"),
      { type: "heading", text: "Modify and mock responses", level: 3 },
      {
        type: "paragraph",
        text: "Use the Response Modifier to rewrite status codes and bodies based on URL patterns. Import rules from CSV, edit in a body editor, or generate rules from live captured traffic — no backend changes required.",
      },
      { type: "heading", text: "Debug performance and UI", level: 3 },
      {
        type: "paragraph",
        text: "Track CPU, memory, and FPS with the performance overlay. Detect leaked view controllers and SwiftUI views. Inspect the 3D view hierarchy, slow down animations, and record annotated screenshots for QA handoffs.",
      },
      shot("Performance and interface tools", "interface-tools"),
      { type: "heading", text: "Browse app resources", level: 3 },
      {
        type: "paragraph",
        text: "Navigate the sandbox, inspect and edit UserDefaults, browse Keychain entries, query SQLite and Realm databases, and explore SwiftData models on iOS 17+.",
      },
      shot("Resources browser", "resources"),
      { type: "heading", text: "Read This First" },
      {
        type: "list",
        items: [
          "Quick Start — install, call setup(), and open the debugger in under two minutes",
          "Installation — SPM, CocoaPods, XCFramework, and Apple Silicon notes",
          "Configuration — network filters, selective feature disable, and custom actions",
          "First Debug Session — verify network capture, performance overlay, and resource browsers",
        ],
      },
      { type: "heading", text: "Positioning" },
      {
        type: "list",
        items: [
          "In-app iOS debugging toolkit (not a macOS system proxy)",
          "Zero proxy or certificate setup for URLSession traffic",
          "MIT licensed, fully open source, no account required",
          "DEBUG builds only — never ship to App Store releases",
        ],
      },
      { type: "heading", text: "System Requirements" },
      {
        type: "list",
        items: [
          "iOS 14.0 or later",
          "Swift 6.0+",
          "Xcode 16.0+",
          "Apple Silicon or Intel Mac for development",
        ],
      },
    ],
  },

  quickstart: {
    slug: ["quickstart"],
    title: "Quick Start",
    description: "Install DebugSwift, call setup(), and inspect your first network request in minutes.",
    blocks: [
      {
        type: "paragraph",
        text: "This guide gets you from zero to a working debugger overlay. You only need a DEBUG build, one setup call, and a running simulator or device.",
      },
      { type: "heading", text: "1. Add the package" },
      {
        type: "paragraph",
        text: "In Xcode, go to File → Add Package Dependencies and paste the DebugSwift repository URL. Or add the CocoaPods line to your Podfile.",
      },
      { type: "code", language: "swift", code: `// Package.swift or Xcode SPM\n.package(url: "https://github.com/DebugSwift/DebugSwift.git", from: "1.0.0")` },
      { type: "heading", text: "2. Call setup() in AppDelegate" },
      {
        type: "paragraph",
        text: "Import DebugSwift and call setup() during application launch. Wrap everything in #if DEBUG so the toolkit never ships to production.",
      },
      {
        type: "code",
        language: "swift",
        code: `import DebugSwift

#if DEBUG
let debugSwift = DebugSwift()

func application(...) -> Bool {
    debugSwift.setup()
    debugSwift.show()  // floating debug ball
    return true
}
#endif`,
      },
      shot("Floating debug ball on app screen"),
      { type: "heading", text: "3. Tap the ball and open Network" },
      {
        type: "paragraph",
        text: "Trigger any URLSession request in your app. Open the Network tab in DebugSwift to see the captured request with headers, body, and timing.",
      },
      shot("First captured HTTP request", "network-inspector"),
      { type: "heading", text: "4. Optional: shake to toggle" },
      {
        type: "paragraph",
        text: "Override motionEnded on UIWindow to toggle the debugger with a device shake gesture.",
      },
      { type: "heading", text: "Next steps" },
      {
        type: "list",
        items: [
          "Configure URL filters to reduce noise from analytics endpoints",
          "Try the Response Modifier to mock an API without a backend",
          "Present debugViewController() programmatically instead of the floating ball",
        ],
      },
    ],
  },

  installation: {
    slug: ["installation"],
    title: "Installation",
    description: "Add DebugSwift via Swift Package Manager or CocoaPods. DEBUG builds only.",
    blocks: [
      { type: "heading", text: "Swift Package Manager" },
      {
        type: "paragraph",
        text: "Recommended for most projects. Add the package through Xcode or declare it in Package.swift.",
      },
      { type: "code", code: `https://github.com/DebugSwift/DebugSwift` },
      { type: "heading", text: "CocoaPods" },
      { type: "code", code: `pod 'DebugSwift'` },
      { type: "heading", text: "XCFramework (faster builds)" },
      {
        type: "paragraph",
        text: "Use the prebuilt XCFramework for up to 50% faster compile times. Ideal for CI and large teams.",
      },
      {
        type: "code",
        code: `pod 'DebugSwift', :http => 'https://github.com/DebugSwift/DebugSwift/releases/latest/download/DebugSwift.xcframework.zip'`,
      },
      { type: "heading", text: "Apple Silicon" },
      {
        type: "paragraph",
        text: "DebugSwift ships native arm64 simulator slices. Remove any EXCLUDED_ARCHS arm64 exclusions from your Podfile or build settings — they are no longer needed.",
      },
      { type: "heading", text: "Requirements" },
      {
        type: "list",
        items: ["iOS 14.0+", "Swift 6.0+", "Xcode 16.0+", "DEBUG configuration only"],
      },
    ],
  },

  configuration: {
    slug: ["configuration"],
    title: "Configuration",
    description: "Network filters, selective feature disable, custom actions, and programmatic presentation.",
    blocks: [
      { type: "heading", text: "Disable specific features" },
      {
        type: "paragraph",
        text: "Pass a disable array to setup() when you want network capture without leak detection, or performance metrics without the floating ball.",
      },
      {
        type: "code",
        language: "swift",
        code: `debugSwift.setup(disable: [.leaksDetector, .network])`,
      },
      { type: "heading", text: "Network URL filtering" },
      {
        type: "paragraph",
        text: "Ignore analytics noise or restrict capture to your API domain.",
      },
      {
        type: "code",
        language: "swift",
        code: `DebugSwift.Network.shared.ignoredURLs = ["https://analytics.com"]
DebugSwift.Network.shared.onlyURLs = ["https://api.myapp.com"]`,
      },
      { type: "heading", text: "Clear network history" },
      {
        type: "paragraph",
        text: "Reset HTTP and WebSocket history when switching environments.",
      },
      {
        type: "code",
        language: "swift",
        code: `DebugSwift.Network.shared.clearNetworkHistory()
await DebugSwift.Network.shared.clearAllNetworkData()`,
      },
      { type: "heading", text: "Manual URLSessionConfiguration injection" },
      {
        type: "paragraph",
        text: "If you create URLSessionConfiguration before setup(), inject the monitoring protocol manually.",
      },
      {
        type: "code",
        language: "swift",
        code: `let config = DebugSwift.Network.shared.defaultConfiguration()
let session = URLSession(configuration: config)`,
      },
      { type: "heading", text: "Programmatic presentation" },
      {
        type: "paragraph",
        text: "Skip the floating ball and present debugViewController() from your own debug menu or SwiftUI sheet.",
      },
      shot("Programmatic debugger presentation"),
      { type: "heading", text: "Custom actions and info" },
      {
        type: "paragraph",
        text: "Register team-specific debug actions and read-only info panels in App Tools.",
      },
      {
        type: "code",
        language: "swift",
        code: `DebugSwift.App.shared.customAction = {
    [.init(title: "Dev Tools", actions: [
        .init(title: "Clear User Data") { /* ... */ }
    ])]
}`,
      },
    ],
  },

  "first-session": {
    slug: ["first-session"],
    title: "First Debug Session",
    description: "Verify network capture, performance metrics, and resource browsers are working.",
    blocks: [
      {
        type: "paragraph",
        text: "Use this checklist when DebugSwift is installed but something does not appear to be working as expected.",
      },
      { type: "heading", text: "Checklist" },
      {
        type: "list",
        items: [
          "Running a DEBUG build (not Release or TestFlight)",
          "setup() called before the first URLSession request",
          "Floating ball visible or debugViewController() presented",
          "At least one network request triggered after setup",
          "Performance tab shows live CPU and memory readings",
        ],
      },
      { type: "heading", text: "Network not capturing?" },
      {
        type: "paragraph",
        text: "If you create URLSessionConfiguration instances before setup(), inject manually with DebugSwift.Network.shared.injectIntoConfiguration(_:). Also check ignoredURLs and onlyURLs filters.",
      },
      shot("Network tab with captured requests"),
      { type: "heading", text: "WebSocket not appearing?" },
      {
        type: "paragraph",
        text: "WebSocket capture is automatic for URLSessionWebSocketTask. No extra configuration is required after setup().",
      },
      { type: "heading", text: "Performance overlay empty?" },
      {
        type: "paragraph",
        text: "Ensure .performance was not passed to setup(disable:). The widget needs a few seconds of runtime to stabilize readings.",
      },
      shot("Performance metrics panel"),
    ],
  },

  "network/http-monitoring": {
    slug: ["network", "http-monitoring"],
    title: "HTTP Monitoring",
    description: "Capture URLSession requests and responses with filtering, JSON highlighting, and session history.",
    blocks: [
      {
        type: "paragraph",
        text: "DebugSwift intercepts URLSession traffic at the protocol level. Every HTTP and HTTPS request your app makes appears in the Network inspector with full request and response detail.",
      },
      shot("HTTP Monitoring — request list and detail", "network-inspector"),
      { type: "heading", text: "What you see per request" },
      {
        type: "list",
        items: [
          "Method, URL, status code, and response time",
          "Request and response headers",
          "Body with automatic JSON formatting and syntax highlighting",
          "Raw view for non-JSON payloads",
          "Copy as cURL for reproducing outside the app",
        ],
      },
      { type: "heading", text: "Filtering" },
      {
        type: "paragraph",
        text: "Search and filter the session list by URL, method, or status. Use ignoredURLs at setup time to permanently exclude analytics or CDN endpoints.",
      },
      shot("HTTP Monitoring — JSON body detail"),
      { type: "heading", text: "Session history" },
      {
        type: "paragraph",
        text: "Requests persist for the current app session. Clear history programmatically when switching API environments or after a logout flow.",
      },
    ],
  },

  "network/websocket-inspector": {
    slug: ["network", "websocket-inspector"],
    title: "WebSocket Inspector",
    description: "Zero-config capture of WebSocket connections and frames via URLSessionWebSocketTask.",
    blocks: [
      {
        type: "paragraph",
        text: "DebugSwift automatically monitors WebSocket connections created through URLSessionWebSocketTask. No swizzling configuration or manual registration is required beyond setup().",
      },
      shot("WebSocket Inspector — connection list"),
      { type: "heading", text: "Frame inspection" },
      {
        type: "list",
        items: [
          "Text and binary frames with timestamps",
          "Connection open, close, and error events",
          "Per-connection message history",
          "Separate tab from HTTP traffic for clarity",
        ],
      },
      shot("WebSocket Inspector — frame detail"),
      { type: "heading", text: "Clear WebSocket history" },
      {
        type: "code",
        language: "swift",
        code: `await DebugSwift.Network.shared.clearWebSocketHistory()`,
      },
    ],
  },

  "network/encryption": {
    slug: ["network", "encryption"],
    title: "Encryption & Decryption",
    description: "Decrypt AES-128/256 encrypted API responses inside the network inspector.",
    blocks: [
      {
        type: "paragraph",
        text: "When your API returns encrypted payloads, DebugSwift can decrypt them in the inspector so you see readable JSON instead of opaque base64. Supports AES-128 and AES-256 with custom decryptor hooks.",
      },
      shot("Encrypted response — ciphertext view"),
      { type: "heading", text: "How it works" },
      {
        type: "paragraph",
        text: "Register your decryption key or custom decryptor. When a matching response arrives, DebugSwift decrypts the body before display. The original ciphertext remains available in the raw view.",
      },
      shot("Encrypted response — decrypted JSON view"),
      { type: "heading", text: "Custom decryptors" },
      {
        type: "paragraph",
        text: "For non-standard encryption schemes, provide a custom decryptor closure that transforms the raw Data into a displayable string.",
      },
    ],
  },

  "network/response-modifier": {
    slug: ["network", "response-modifier"],
    title: "Response Modifier",
    description: "Mock or rewrite API responses in real time with rules, CSV import, and live traffic generation.",
    blocks: [
      {
        type: "paragraph",
        text: "The Response Modifier lets you change status codes and response bodies for matching URLs without touching your backend. Enable rules individually, test edge cases, and disable them when done.",
      },
      shot("Response Modifier — rules list"),
      { type: "heading", text: "Rule matching" },
      {
        type: "list",
        items: [
          "Match by exact URL or wildcard pattern",
          "Override HTTP status code and response body",
          "Toggle rules on/off without deleting them",
          "Body editor with JSON validation",
        ],
      },
      { type: "heading", text: "Import and export" },
      {
        type: "paragraph",
        text: "Share rule sets across teammates with CSV import and export. Generate rules directly from captured live traffic to mock an endpoint you just observed.",
      },
      shot("Response Modifier — rule editor"),
    ],
  },

  "network/request-thresholds": {
    slug: ["network", "request-thresholds"],
    title: "Request Thresholds",
    description: "Set limits on API usage and get alerted when thresholds are exceeded.",
    blocks: [
      {
        type: "paragraph",
        text: "Request Thresholds help you catch runaway API loops, duplicate polling, or unexpected traffic spikes during development.",
      },
      shot("Request Thresholds — configuration"),
      { type: "heading", text: "Use cases" },
      {
        type: "list",
        items: [
          "Detect infinite retry loops hitting the same endpoint",
          "Monitor third-party SDK call volume",
          "Verify pagination stops at the expected page count",
          "Alert when a single screen triggers too many requests",
        ],
      },
      shot("Request Thresholds — alert state"),
    ],
  },

  "performance/metrics": {
    slug: ["performance", "metrics"],
    title: "Real-time Metrics",
    description: "Monitor CPU, memory, and FPS with live charts inside the Performance tab.",
    blocks: [
      {
        type: "paragraph",
        text: "The Performance tab shows CPU usage, memory footprint, and frame rate updated in real time. Use it to spot regressions while navigating your app.",
      },
      shot("Real-time CPU, memory, and FPS metrics", "performance"),
      { type: "heading", text: "What each metric tells you" },
      {
        type: "list",
        items: [
          "CPU — main thread and total process usage",
          "Memory — resident and allocated heap size",
          "FPS — frames per second with drop detection",
        ],
      },
      shot("Performance metrics — detailed charts"),
      { type: "heading", text: "Disk I/O and usage" },
      {
        type: "paragraph",
        text: "Enable Disk I/O Monitoring to watch live read and write throughput, then review on-device storage breakdown: bundle size, caches, temp files, and Documents. MetricKit 24-hour write totals appear when available.",
      },
      shot("Performance disk I/O monitoring panel", "performance-disk-io-monitoring"),
      { type: "heading", text: "Battery monitoring" },
      {
        type: "paragraph",
        text: "Scroll the Performance tab to inspect open file descriptors, then enable Battery Monitoring to track level, charging state, and energy impact over time. On device, readings update from UIDevice; the simulator uses mock data when battery APIs are unavailable.",
      },
      shot("Performance battery monitoring panel", "performance-battery-monitoring"),
    ],
  },

  "performance/memory-leaks": {
    slug: ["performance", "memory-leaks"],
    title: "Memory Leak Detection",
    description: "Automatic detection of leaked UIViewControllers and SwiftUI views with stack traces.",
    blocks: [
      {
        type: "paragraph",
        text: "DebugSwift tracks view controller and view lifecycles. When an object survives after it should have been deallocated, it appears in the Leaks section with a retention path.",
      },
      shot("Memory leak detection — leaked objects list"),
      { type: "heading", text: "How to use it" },
      {
        type: "list",
        items: [
          "Navigate through your app normally, then pop back",
          "Check the Leaks tab for surviving view controllers",
          "Review the stack trace to find the retaining reference",
          "Disable with setup(disable: [.leaksDetector]) if needed",
        ],
      },
      shot("Memory leak — stack trace detail"),
    ],
  },

  "performance/thread-checker": {
    slug: ["performance", "thread-checker"],
    title: "Thread Checker",
    description: "Detect main thread violations with detailed stack traces.",
    blocks: [
      {
        type: "paragraph",
        text: "The Thread Checker flags UI updates and other main-thread-only work happening on background queues. Each violation includes a stack trace pointing to the offending call site.",
      },
      shot("Thread Checker — violation list"),
      { type: "heading", text: "Common causes" },
      {
        type: "list",
        items: [
          "Updating UILabel or SwiftUI state from a URLSession callback",
          "Core Data access off the main context queue",
          "Dispatching UI work to a global queue by mistake",
        ],
      },
      shot("Thread Checker — stack trace"),
    ],
  },

  "performance/performance-widget": {
    slug: ["performance", "performance-widget"],
    title: "Performance Widget",
    description: "A floating overlay showing live CPU, memory, and FPS on top of your app.",
    blocks: [
      {
        type: "paragraph",
        text: "The Performance Widget is a compact overlay you can position over your running UI. It updates continuously so you see the impact of each screen transition without opening the full debugger.",
      },
      shot("Performance Widget overlay on app UI"),
      { type: "heading", text: "When to use it" },
      {
        type: "list",
        items: [
          "Profiling scroll performance on long lists",
          "Watching memory during image-heavy screens",
          "Comparing FPS before and after an optimization",
        ],
      },
    ],
  },

  "app-tools/crash-reports": {
    slug: ["app-tools", "crash-reports"],
    title: "Crash Reports",
    description: "View crash logs with screenshots and stack traces from previous app sessions.",
    blocks: [
      {
        type: "paragraph",
        text: "DebugSwift collects crash reports from prior runs. Each entry includes the exception type, stack trace, and a screenshot captured at crash time when available.",
      },
      shot("Crash Reports — list view", "crash-reports-list"),
      { type: "heading", text: "What you get" },
      {
        type: "list",
        items: [
          "Exception name and reason",
          "Full thread backtrace",
          "Screenshot of the UI at crash time",
          "Timestamp and app version",
        ],
      },
      shot("Crash Reports — detail with stack trace"),
    ],
  },

  "app-tools/console-logs": {
    slug: ["app-tools", "console-logs"],
    title: "Console Logs",
    description: "Real-time NSLog and print output with search and filtering.",
    blocks: [
      {
        type: "paragraph",
        text: "The Console tab mirrors your app's log output in real time. Search by keyword, filter by log level, and copy lines for bug reports.",
      },
      shot("Console Logs — live output"),
      { type: "heading", text: "Tips" },
      {
        type: "list",
        items: [
          "Use alongside Network to correlate API errors with log lines",
          "Filter noise from third-party SDKs",
          "Copy selected lines to paste into Slack or Jira",
        ],
      },
    ],
  },

  "app-tools/device-info": {
    slug: ["app-tools", "device-info"],
    title: "Device Info",
    description: "App version, build number, device model, OS version, and runtime details.",
    blocks: [
      {
        type: "paragraph",
        text: "Device Info surfaces everything you need when filing a bug report: bundle ID, version, build, device model, iOS version, locale, and screen dimensions.",
      },
      shot("Device Info panel"),
      { type: "heading", text: "Custom info panels" },
      {
        type: "paragraph",
        text: "Add your own read-only info sections for environment name, feature flags, or auth state.",
      },
      {
        type: "code",
        language: "swift",
        code: `DebugSwift.App.shared.customInfo = {
    [.init(title: "Environment", infos: [
        .init(title: "API", subtitle: "staging")
    ])]
}`,
      },
    ],
  },

  "app-tools/apns-tokens": {
    slug: ["app-tools", "apns-tokens"],
    title: "APNS Tokens",
    description: "Capture and copy push notification device tokens during development.",
    blocks: [
      {
        type: "paragraph",
        text: "Register for remote notifications as usual, then forward the token to DebugSwift. The APNS tab displays the hex token ready to copy for your push testing tools.",
      },
      shot("APNS token display"),
      {
        type: "code",
        language: "swift",
        code: `func application(_ application: UIApplication,
    didRegisterForRemoteNotificationsWithDeviceToken deviceToken: Data) {
    DebugSwift.APNSToken.didRegister(deviceToken: deviceToken)
}`,
      },
    ],
  },

  "app-tools/custom-actions": {
    slug: ["app-tools", "custom-actions"],
    title: "Custom Actions",
    description: "Add team-specific debug actions to the App Tools menu.",
    blocks: [
      {
        type: "paragraph",
        text: "Custom Actions let you register one-tap shortcuts for common dev tasks: clearing caches, toggling feature flags, switching API environments, or resetting onboarding.",
      },
      shot("Custom Actions menu", "custom-actions-menu"),
      {
        type: "code",
        language: "swift",
        code: `DebugSwift.App.shared.customAction = {
    [.init(title: "Dev Tools", actions: [
        .init(title: "Reset onboarding") { /* ... */ },
        .init(title: "Switch to staging") { /* ... */ }
    ])]
}`,
      },
      shot("Custom Actions — grouped sections"),
    ],
  },

  "interface/grid-and-borders": {
    slug: ["interface", "grid-and-borders"],
    title: "Grid & View Borders",
    description: "Visual alignment grid and colored view boundary overlays.",
    blocks: [
      {
        type: "paragraph",
        text: "Toggle a customizable alignment grid over your running UI. Highlight view boundaries with colorized borders to spot layout issues, clipping, and unexpected frame sizes.",
      },
      shot("Grid overlay on app UI", "grid-overlay"),
      { type: "heading", text: "Controls" },
      {
        type: "list",
        items: [
          "Grid color and opacity",
          "Per-view border highlighting",
          "Toggle without leaving the debugger",
        ],
      },
      shot("View borders highlighting layout"),
    ],
  },

  "interface/view-hierarchy": {
    slug: ["interface", "view-hierarchy"],
    title: "View Hierarchy",
    description: "3D interactive view hierarchy inspector with per-view attribute detail.",
    blocks: [
      {
        type: "paragraph",
        text: "The View Hierarchy presents your UIKit tree in a 3D explodable view. Press and hold on any view to see its class, subviews, background color, and type-specific attributes like UILabel text and font.",
      },
      shot("3D view hierarchy inspector"),
      { type: "heading", text: "Workflow" },
      {
        type: "list",
        items: [
          "Long-press the debug ball for snapshot and hierarchy access",
          "Rotate and zoom the 3D tree to find overlapping views",
          "Long-press a specific view for attribute detail",
        ],
      },
      shot("View hierarchy — per-view attributes"),
    ],
  },

  "interface/touch-and-animation": {
    slug: ["interface", "touch-and-animation"],
    title: "Touch & Animation",
    description: "Visual touch indicators and animation slow-motion for UI debugging.",
    blocks: [
      {
        type: "paragraph",
        text: "Touch Indicators draw circles where taps land — useful for verifying hit targets and gesture recognizer coverage. Animation Control slows UIKit animations so you can step through transitions frame by frame.",
      },
      shot("Touch indicators on screen"),
      { type: "heading", text: "Use cases" },
      {
        type: "list",
        items: [
          "Verify tap targets on small buttons",
          "Debug gesture conflicts between overlapping views",
          "Slow down navigation transitions to inspect intermediate states",
        ],
      },
      shot("Slow-motion animation control"),
    ],
  },

  "interface/render-tracking": {
    slug: ["interface", "render-tracking"],
    title: "SwiftUI Render Tracking",
    description: "Detect and visualize unnecessary SwiftUI view re-renders (beta).",
    blocks: [
      {
        type: "paragraph",
        text: "Render Tracking highlights SwiftUI views that re-render more often than expected. A dedicated settings screen lets you tune sensitivity and filter noise.",
      },
      shot("SwiftUI render tracking overlay"),
      { type: "heading", text: "Finding wasted work" },
      {
        type: "list",
        items: [
          "Identify @State changes that trigger full-screen redraws",
          "Spot missing Equatable on expensive child views",
          "Compare render counts before and after optimization",
        ],
      },
      shot("Render tracking — settings and stats"),
    ],
  },

  "interface/documentation-recorder": {
    slug: ["interface", "documentation-recorder"],
    title: "Documentation Recorder",
    description: "Record app interactions as annotated screenshots for QA and design handoffs.",
    blocks: [
      {
        type: "paragraph",
        text: "The Documentation Recorder captures your taps and scrolls as a sequence of annotated screenshots. Taps appear as numbered circles, scrolls as arrows. Save, copy as a grid, or share the recording.",
      },
      shot("Documentation Recorder — annotated screenshots", "documentation-recorder"),
      { type: "heading", text: "Handoff workflow" },
      {
        type: "list",
        items: [
          "Record a bug reproduction or onboarding flow",
          "Export as an image grid for Jira or Slack",
          "Share directly from the recorder sheet",
        ],
      },
      shot("Documentation Recorder — export grid"),
    ],
  },

  "resources/file-browser": {
    slug: ["resources", "file-browser"],
    title: "File Browser",
    description: "Navigate the app sandbox and shared app group containers.",
    blocks: [
      {
        type: "paragraph",
        text: "Browse Documents, Library, tmp, and app group directories. Preview text files, view image thumbnails, and verify that caches and downloads land where you expect.",
      },
      shot("File Browser — sandbox directories", "file-browser-file-preview"),
      { type: "heading", text: "App group support" },
      {
        type: "paragraph",
        text: "When your target uses App Groups, DebugSwift lists shared container paths alongside the main sandbox.",
      },
      shot("File Browser — file preview"),
    ],
  },

  "resources/userdefaults": {
    slug: ["resources", "userdefaults"],
    title: "UserDefaults",
    description: "View and modify app preferences at runtime.",
    blocks: [
      {
        type: "paragraph",
        text: "The UserDefaults browser lists every key in your app's preference store. Edit values in place to test onboarding skips, feature flags, or A/B variants without reinstalling.",
      },
      shot("UserDefaults key-value browser"),
      { type: "heading", text: "Safety" },
      {
        type: "paragraph",
        text: "Changes apply immediately to the running process. Use custom actions to reset known keys when testing flows that depend on fresh state.",
      },
    ],
  },

  "resources/keychain": {
    slug: ["resources", "keychain"],
    title: "Keychain",
    description: "Inspect keychain entries stored by your app.",
    blocks: [
      {
        type: "paragraph",
        text: "Browse keychain items your app has written. Verify auth tokens, refresh tokens, and credential storage without dropping into the Keychain Access app on macOS.",
      },
      shot("Keychain inspector"),
      { type: "heading", text: "Common checks" },
      {
        type: "list",
        items: [
          "Confirm tokens persist across app restarts",
          "Verify key names match your auth module",
          "Debug keychain sharing between app and extension targets",
        ],
      },
    ],
  },

  "resources/database-browser": {
    slug: ["resources", "database-browser"],
    title: "Database Browser",
    description: "Inspect SQLite and Realm databases at runtime.",
    blocks: [
      {
        type: "paragraph",
        text: "DebugSwift discovers SQLite and Realm database files in your sandbox. Browse tables, run queries, and inspect row data without exporting the database file.",
      },
      shot("SQLite database browser"),
      { type: "heading", text: "Supported engines" },
      {
        type: "list",
        items: ["SQLite (.sqlite, .db)", "Realm (.realm)"],
      },
      shot("Database table row detail"),
    ],
  },

  "resources/push-notifications": {
    slug: ["resources", "push-notifications"],
    title: "Push Notification Simulator",
    description: "Simulate push notifications with templates and custom payloads.",
    blocks: [
      {
        type: "paragraph",
        text: "Test notification handling without sending a real push from your server. Use built-in templates or paste a custom JSON payload to trigger your notification delegate.",
      },
      shot("Push notification simulator"),
      { type: "heading", text: "Templates" },
      {
        type: "list",
        items: [
          "Basic alert with title and body",
          "Silent push with content-available",
          "Custom payload JSON editor",
        ],
      },
    ],
  },

  "resources/swiftdata": {
    slug: ["resources", "swiftdata"],
    title: "SwiftData Browser",
    description: "Inspect SwiftData models, edit values, and export JSON (iOS 17+).",
    blocks: [
      {
        type: "paragraph",
        text: "On iOS 17 and later, DebugSwift lists registered SwiftData containers. Browse models, inspect properties and relationships, edit values at runtime, and export records as JSON.",
      },
      shot("SwiftData model browser"),
      { type: "heading", text: "Capabilities" },
      {
        type: "list",
        items: [
          "List all models in a container",
          "Inspect properties and relationships",
          "Edit field values in place",
          "Export selected records as JSON",
        ],
      },
      shot("SwiftData record detail and export"),
    ],
  },

  troubleshooting: {
    slug: ["troubleshooting"],
    title: "Common Issues",
    description: "Fix build errors, missing network capture, and Apple Silicon compatibility problems.",
    blocks: [
      { type: "heading", text: "Apple Silicon build errors" },
      {
        type: "paragraph",
        text: "If you see unsupported Swift architecture or x86_64-only simulator slice errors, update to the latest DebugSwift release or switch to the XCFramework distribution.",
      },
      {
        type: "code",
        code: `pod 'DebugSwift', :http => 'https://github.com/DebugSwift/DebugSwift/releases/latest/download/DebugSwift.xcframework.zip'`,
      },
      { type: "heading", text: "Remove architecture exclusions" },
      {
        type: "paragraph",
        text: "Delete EXCLUDED_ARCHS[sdk=iphonesimulator*] = arm64 from your Podfile. DebugSwift ships native arm64 simulator support.",
      },
      { type: "heading", text: "Network not capturing" },
      {
        type: "list",
        items: [
          "Confirm setup() runs before the first URLSession request",
          "Check ignoredURLs and onlyURLs filters",
          "Inject manually if URLSessionConfiguration is created early",
          "Verify you are in a DEBUG build",
        ],
      },
      shot("Troubleshooting — network capture verification"),
      { type: "heading", text: "Clean build" },
      {
        type: "paragraph",
        text: "Product → Clean Build Folder (⌘⇧K), then delete DerivedData if issues persist.",
      },
      { type: "heading", text: "More help" },
      {
        type: "paragraph",
        text: "See the FAQ page or open a GitHub issue with your Xcode version, distribution method (SPM/CocoaPods/XCFramework), and steps to reproduce.",
      },
    ],
  },
};

export function getDocPage(slug: string[]): DocPage | undefined {
  return docPages[slugKey(slug)];
}

export function getAllDocSlugs(): string[][] {
  return docsNav.flatMap((g) => g.items.map((i) => i.slug));
}

export function docHref(slug: string[]) {
  return slug.length === 0 ? "/docs" : `/docs/${slug.join("/")}`;
}

export function isActiveDocSlug(current: string[], target: string[]) {
  if (target.length === 0) return current.length === 0;
  if (current.length < target.length) return false;
  return target.every((s, i) => current[i] === s);
}

export type DocTocItem = { id: string; text: string; level: 2 | 3 };

export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function getDocGroupTitle(slug: string[]): string {
  const path = slug.join("/");
  for (const group of docsNav) {
    if (group.items.some((item) => item.slug.join("/") === path)) {
      return group.title;
    }
  }
  return "Documentation";
}

export function extractDocToc(blocks: DocBlock[]): DocTocItem[] {
  return blocks
    .filter((b): b is Extract<DocBlock, { type: "heading" }> => b.type === "heading")
    .map((b) => ({
      id: slugifyHeading(b.text),
      text: b.text,
      level: (b.level ?? 2) as 2 | 3,
    }));
}

function blockToSearchText(block: DocBlock): string {
  switch (block.type) {
    case "paragraph":
    case "heading":
      return block.text;
    case "list":
      return block.items.join(" ");
    case "code":
      return block.code;
    case "cards":
      return block.items.map((c) => `${c.title} ${c.description}`).join(" ");
    case "screenshot":
      return block.alt;
    default:
      return "";
  }
}

export type DocSearchEntry = {
  title: string;
  href: string;
  group: string;
  description: string;
  content: string;
};

export function getDocSearchEntries(): DocSearchEntry[] {
  return Object.values(docPages).map((page) => ({
    title: page.title,
    href: docHref(page.slug),
    group: getDocGroupTitle(page.slug),
    description: page.description,
    content: page.blocks.map(blockToSearchText).join(" "),
  }));
}

function excerptAround(text: string, query: string, radius = 60): string {
  const lower = text.toLowerCase();
  const idx = lower.indexOf(query.toLowerCase());
  if (idx === -1) return text.slice(0, radius * 2).trim();

  const start = Math.max(0, idx - radius);
  const end = Math.min(text.length, idx + query.length + radius);
  const slice = text.slice(start, end).trim();
  const prefix = start > 0 ? "…" : "";
  const suffix = end < text.length ? "…" : "";
  return `${prefix}${slice}${suffix}`;
}

export function searchDocEntries(
  entries: DocSearchEntry[],
  query: string,
  limit = 8,
): Array<DocSearchEntry & { excerpt: string; score: number }> {
  const trimmed = query.trim().toLowerCase();
  if (!trimmed) return [];

  const terms = trimmed.split(/\s+/).filter(Boolean);

  return entries
    .map((entry) => {
      const title = entry.title.toLowerCase();
      const description = entry.description.toLowerCase();
      const content = entry.content.toLowerCase();
      const group = entry.group.toLowerCase();
      const haystack = `${title} ${description} ${group} ${content}`;

      if (!terms.every((term) => haystack.includes(term))) return null;

      let score = 0;
      for (const term of terms) {
        if (title === term) score += 120;
        else if (title.startsWith(term)) score += 90;
        else if (title.includes(term)) score += 70;
        else if (group.includes(term)) score += 50;
        else if (description.includes(term)) score += 40;
        else if (content.includes(term)) score += 20;
      }

      const excerptSource = description.includes(trimmed)
        ? entry.description
        : content.includes(trimmed)
          ? excerptAround(entry.content, trimmed)
          : entry.description;

      return { ...entry, excerpt: excerptSource, score };
    })
    .filter((entry): entry is DocSearchEntry & { excerpt: string; score: number } => entry !== null)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}
