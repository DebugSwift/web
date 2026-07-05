# DebugSwift Web Site Map

Next.js App Router site in `web/`, structure mapped from [rockxy.io](https://rockxy.io).

## Stack

- **Next.js 16** (App Router)
- **TypeScript**
- **Tailwind CSS v4**

## Dev

```bash
cd web
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Rockxy → DebugSwift route mapping

| rockxy.io | DebugSwift | Notes |
|-----------|------------|-------|
| `/` | `/` | Homepage |
| `/philosophy` | `/philosophy` | Open source philosophy |
| `/#features` | `/features` | Dedicated page (not anchor) |
| `/workspace` | `/integration` | Team patterns, no cloud |
| `/pricing` | `/license` | MIT free (no paid tier) |
| `/blog` | `/blog` | Blog index + `[slug]` posts |
| `/docs` | `/docs` | Redirects to GitHub README |
| `/download` | `/install` | SPM / CocoaPods |
| `/about` | `/about` | |
| `/roadmap` | `/roadmap` | |
| `/changelog` | `/changelog` | |
| `/faq` | `/faq` | |
| `/support` | `/support` | |
| `/partners` | `/partners` | |
| `/education` | `/education` | |
| `/alternatives` | `/alternatives` | |
| `/compare` | `/compare` | |
| `/proxyman-alternative` | `/proxyman-alternative` | |
| `/charles-proxy-alternative` | `/charles-proxy-alternative` | |
| `/wireshark-alternative` | `/wireshark-alternative` | |
| `/fiddler-alternative` | `/fiddler-alternative` | |
| `/best-mitmproxy-alternative` | `/flipper-alternative` | Closest OSS peer |
| `/privacy` | `/privacy` | |
| `/terms` | `/terms` | |
| `/eula`, `/refund` | `/license` | N/A for MIT OSS |
| `/license` | `/license` | MIT vs AGPL |
| `/sdlc` | `/sdlc` | |
| `/ios`, `/shieldxy`, `/tracexy` | `/features#…` | Feature area anchors |
| Locales `/vi`, `/zh`, … | - | Not implemented (en only) |
| `docs.rockxy.io/*` | GitHub README | Future docs subdomain |
| `workspace.rockxy.io` | - | No cloud workspace |

Full mapping: `src/lib/routes.ts` and live table at `/sitemap`.

## All routes (36+ pages)

### Core
- `/` - Home (bento layout, hero + code snippet)
- `/philosophy`
- `/features`
- `/install`
- `/integration`
- `/license`
- `/about`
- `/roadmap`
- `/changelog`
- `/faq`
- `/support`
- `/partners`
- `/education`
- `/sitemap`

### Blog (10 posts)
- `/blog`
- `/blog/[slug]` - see `src/lib/routes.ts` for slugs

### Comparisons
- `/alternatives`
- `/compare`
- `/flipper-alternative`
- `/pulse-alternative`
- `/proxyman-alternative`
- `/charles-proxy-alternative`
- `/wireshark-alternative`
- `/fiddler-alternative`

### Legal
- `/privacy`
- `/terms`
- `/sdlc`

### Generated
- `/sitemap.xml` - from `src/app/sitemap.ts`

## Layout

New design (not a rockxy clone):
- Dark `#08080f` background, violet/cyan accents
- Asymmetric hero with inline setup code
- Bento feature grid with GitHub screenshots
- Glass sticky header
