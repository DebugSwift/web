import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "..", "screenshots");
const baseUrl = process.env.SCREENSHOT_BASE_URL ?? "http://localhost:3000";

const blogSlugs = [
  "why-we-built-debugswift",
  "in-app-network-inspection-ios",
  "memory-leak-detection-swiftui",
  "swiftui-render-tracking",
  "response-modifier-mocking-apis",
  "documentation-recorder",
  "flipper-vs-debugswift",
  "websocket-inspector-zero-config",
  "swiftdata-browser-ios17",
  "apple-silicon-simulator-support",
];

const pages = [
  { path: "/", name: "home" },
  { path: "/philosophy", name: "philosophy" },
  { path: "/features", name: "features" },
  { path: "/install", name: "install" },
  { path: "/integration", name: "integration" },
  { path: "/license", name: "license" },
  { path: "/about", name: "about" },
  { path: "/roadmap", name: "roadmap" },
  { path: "/changelog", name: "changelog" },
  { path: "/faq", name: "faq" },
  { path: "/support", name: "support" },
  { path: "/partners", name: "partners" },
  { path: "/education", name: "education" },
  { path: "/sitemap", name: "sitemap" },
  { path: "/blog", name: "blog" },
  { path: "/alternatives", name: "alternatives" },
  { path: "/compare", name: "compare" },
  { path: "/flipper-alternative", name: "flipper-alternative" },
  { path: "/pulse-alternative", name: "pulse-alternative" },
  { path: "/proxyman-alternative", name: "proxyman-alternative" },
  { path: "/charles-proxy-alternative", name: "charles-proxy-alternative" },
  { path: "/wireshark-alternative", name: "wireshark-alternative" },
  { path: "/fiddler-alternative", name: "fiddler-alternative" },
  { path: "/privacy", name: "privacy" },
  { path: "/terms", name: "terms" },
  { path: "/sdlc", name: "sdlc" },
  ...blogSlugs.map((slug) => ({
    path: `/blog/${slug}`,
    name: `blog-${slug}`,
  })),
];

async function waitForPageReady(page) {
  await page.waitForLoadState("networkidle", { timeout: 15_000 }).catch(() => {});
  await page.waitForTimeout(500);
}

async function main() {
  await mkdir(outDir, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
  });
  const page = await context.newPage();
  const manifest = [];

  for (const { path: routePath, name } of pages) {
    const url = `${baseUrl}${routePath}`;
    const viewportFile = `${name}.png`;
    const fullFile = `${name}-full.png`;

    process.stdout.write(`Capturing ${routePath} ... `);

    try {
      const response = await page.goto(url, {
        waitUntil: "domcontentloaded",
        timeout: 30_000,
      });

      if (!response || !response.ok()) {
        throw new Error(`HTTP ${response?.status() ?? "no response"}`);
      }

      await waitForPageReady(page);

      await page.screenshot({
        path: path.join(outDir, viewportFile),
        fullPage: false,
      });

      await page.screenshot({
        path: path.join(outDir, fullFile),
        fullPage: true,
      });

      manifest.push({
        route: routePath,
        name,
        viewport: viewportFile,
        full: fullFile,
        status: "ok",
      });
      process.stdout.write("ok\n");
    } catch (error) {
      manifest.push({
        route: routePath,
        name,
        status: "error",
        error: error instanceof Error ? error.message : String(error),
      });
      process.stdout.write(`failed (${error instanceof Error ? error.message : error})\n`);
    }
  }

  await browser.close();

  await writeFile(
    path.join(outDir, "manifest.json"),
    `${JSON.stringify({ capturedAt: new Date().toISOString(), baseUrl, pages: manifest }, null, 2)}\n`,
  );

  const failed = manifest.filter((entry) => entry.status !== "ok");
  if (failed.length > 0) {
    process.exitCode = 1;
    console.error(`\n${failed.length} screenshot(s) failed.`);
  } else {
    console.log(`\nCaptured ${manifest.length} pages to ${outDir}`);
  }
}

main();
