export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Prefix public-folder paths when the site is hosted under a subpath (e.g. GitHub Pages). */
export function assetPath(path: string): string {
  if (!path || path.startsWith("http://") || path.startsWith("https://")) return path;

  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (!basePath || normalized.startsWith(`${basePath}/`) || normalized === basePath) {
    return normalized;
  }

  return `${basePath}${normalized}`;
}
