import { IPhoneMockup } from "@/components/iphone-mockup";

export function ScreenshotPlaceholder({
  alt,
  image,
  className = "",
  aspectClass = "aspect-[16/10]",
  framed = false,
}: {
  alt: string;
  image: string;
  className?: string;
  aspectClass?: string;
  /** Composite the screenshot inside the Cosmic Orange iPhone frame. */
  framed?: boolean;
}) {
  if (framed) {
    return (
      <div
        className={`flex w-full items-center justify-center py-12 sm:py-14 ${className}`}
      >
        <IPhoneMockup alt={alt} image={image} />
      </div>
    );
  }

  return (
    <div
      className={`relative w-full overflow-hidden border border-white/10 bg-zinc-900 ${aspectClass} ${className}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={image} alt={alt} className="h-full w-full object-cover object-top" />
    </div>
  );
}
