# DebugSwift Website

Marketing site and documentation for [DebugSwift](https://github.com/DebugSwift/DebugSwift) — built with Next.js.

**Live:** [debugswift.github.io/web](https://debugswift.github.io/web/)

## Stack

- Next.js 16 (App Router, static export)
- React 19 + TypeScript
- Tailwind CSS 4
- GitHub Pages deployment via Actions

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server |
| `npm run build` | Production static export to `out/` |
| `npm run lint` | ESLint |
| `npm run capture-docs` | Capture doc screenshots from iOS Simulator |
| `npm run capture-app` | Capture homepage / flow screenshots |
| `npm run screenshots` | Capture blog screenshots with Playwright |

## Project structure

```
src/app/          Pages (marketing, docs, blog)
src/components/   UI, docs chrome, iPhone mockup
src/lib/          Docs content, blog posts, site config
public/           Static assets and app screenshots
scripts/          Simulator capture automation
```

## Docs content

Documentation pages are defined in `src/lib/docs.ts` as structured blocks. Screenshots live in `public/app-screenshots/docs/` and are captured with `scripts/capture-docs-screenshots.sh`.

## Deployment

Pushes to `main` run `.github/workflows/deploy-pages.yml` and deploy to GitHub Pages at `/web`.

Local GitHub Pages build:

```bash
GITHUB_PAGES=true GITHUB_REPOSITORY=DebugSwift/web npm run build
```

## Related repos

- [DebugSwift/DebugSwift](https://github.com/DebugSwift/DebugSwift) — iOS debugging toolkit (Swift)
- [DebugSwift/web](https://github.com/DebugSwift/web) — this repository

## License

MIT
