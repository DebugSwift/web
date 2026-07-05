import { assetPath } from "@/lib/asset-path";

export const site = {
  name: "DebugSwift",
  tagline: "All-in-one debugging for Swift & iOS apps",
  description:
    "Open-source in-app debugging toolkit for iOS. Inspect network traffic, monitor performance, browse resources, and debug UI, all from a floating overlay inside your app.",
  url: "https://debugswift.dev",
  github: "https://github.com/DebugSwift/DebugSwift",
  logo: assetPath("/logo.png"),
  logoSource:
    "https://github.com/DebugSwift/DebugSwift/assets/31082311/3d219290-ba08-441a-a4c7-060f946683c2",
  docs: "https://debugswift.dev/docs",
  email: "mgois.me@gmail.com",
  linkedin: "https://www.linkedin.com/in/maatheusgois",
  license: "MIT",
  requirements: {
    ios: "iOS 14.0+",
    swift: "Swift 6.0+",
    xcode: "Xcode 16.0+",
  },
} as const;

export const headerNav = [
  { label: "Philosophy", href: "/philosophy" },
  { label: "Features", href: "/features" },
  { label: "Install", href: "/install" },
  { label: "Blog", href: "/blog" },
  { label: "Docs", href: "/docs" },
  { label: "GitHub", href: site.github, external: true },
] as const;

export const footerNav = {
  product: [
    { label: "Features", href: "/features" },
    { label: "Install", href: "/install" },
    { label: "Compare", href: "/compare" },
    { label: "Philosophy", href: "/philosophy" },
    { label: "Roadmap", href: "/roadmap" },
    { label: "Changelog", href: "/changelog" },
    { label: "GitHub", href: site.github, external: true },
    { label: "Alternatives", href: "/alternatives" },
  ],
  resources: [
    { label: "Documentation", href: "/docs" },
    { label: "Blog", href: "/blog" },
    { label: "About", href: "/about" },
    { label: "Partners", href: "/partners" },
    { label: "FAQ", href: "/faq" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "License (MIT)", href: "/license" },
  ],
  support: [
    { label: "Support", href: "/support" },
    { label: "Email", href: `mailto:${site.email}` },
    { label: "LinkedIn", href: site.linkedin, external: true },
    { label: "Flipper Alternative", href: "/flipper-alternative" },
    { label: "Pulse Alternative", href: "/pulse-alternative" },
  ],
} as const;
