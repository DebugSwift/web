import Link from "next/link";
import { Logo } from "@/components/logo";
import { footerNav, site } from "@/lib/site";

function FooterLink({
  href,
  label,
  external,
}: {
  href: string;
  label: string;
  external?: boolean;
}) {
  const className = "text-sm text-zinc-500 transition hover:text-zinc-300";
  if (external || href.startsWith("http") || href.startsWith("mailto:")) {
    return (
      <a href={href} className={className} target="_blank" rel="noopener noreferrer">
        {label}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {label}
    </Link>
  );
}

export function Footer() {
  const columns = [
    { title: "Product", links: footerNav.product },
    { title: "Resources", links: footerNav.resources },
    { title: "Legal", links: footerNav.legal },
    { title: "Support", links: footerNav.support },
  ];

  return (
    <footer className="mt-auto border-t border-white/10 bg-black/20">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-1">
            <Logo size="sm" />
            <p className="mt-3 text-sm text-zinc-500">{site.tagline}</p>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-xs font-semibold tracking-wider text-zinc-400 uppercase">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <FooterLink
                      href={link.href}
                      label={link.label}
                      external={"external" in link ? link.external : undefined}
                    />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-8 text-sm text-zinc-600 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {site.name}. Open source under {site.license}.</p>
          <p>
            Site structure inspired by{" "}
            <a href="https://rockxy.io" className="text-zinc-500 hover:text-zinc-300">
              rockxy.io
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
