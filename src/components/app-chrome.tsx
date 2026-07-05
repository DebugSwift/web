"use client";

import { usePathname } from "next/navigation";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

export function AppChrome({
  children,
  stars,
}: {
  children: React.ReactNode;
  stars: number;
}) {
  const pathname = usePathname();
  const isDocs = pathname?.startsWith("/docs");

  if (isDocs) {
    return <>{children}</>;
  }

  return (
    <>
      <Header stars={stars} />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
