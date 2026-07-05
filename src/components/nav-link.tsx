import Link from "next/link";

const baseClass = "text-sm text-zinc-400 transition-colors hover:text-white";
const glowClass =
  "nav-glow inline-flex w-fit text-sm text-txt-secondary transition-colors hover:text-txt";

export function NavLink({
  href,
  children,
  external,
  glow = false,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  glow?: boolean;
  onClick?: () => void;
}) {
  const className = glow ? glowClass : `${baseClass} rounded-lg px-3 py-2`;

  if (external || href.startsWith("http")) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        onClick={onClick}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}
