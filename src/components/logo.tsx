import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";

const sizes = {
  sm: 32,
  md: 40,
  lg: 48,
} as const;

export function Logo({
  showName = true,
  size = "md",
}: {
  showName?: boolean;
  size?: keyof typeof sizes;
}) {
  const px = sizes[size];

  return (
    <Link href="/" className="flex items-center gap-2.5 font-semibold text-white">
      <Image
        src={site.logo}
        alt={`${site.name} logo`}
        width={px}
        height={px}
        className="rounded-full"
        priority
      />
      {showName && <span>{site.name}</span>}
    </Link>
  );
}
