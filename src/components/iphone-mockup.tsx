const FRAME = "/iphone-17-pro-cosmic-orange.png";

/** Fixed width — every framed screenshot uses the same device size. */
export const PHONE_MOCKUP_CLASS = "w-[280px]";

export function IPhoneMockup({
  alt,
  image,
  className = "",
}: {
  alt: string;
  image: string;
  className?: string;
}) {
  return (
    <div
      className={`relative mx-auto shrink-0 ${PHONE_MOCKUP_CLASS} ${className}`}
      style={{ aspectRatio: "440 / 916", borderRadius: "20%" }}
    >
      <div
        className="absolute inset-0 overflow-hidden bg-black"
        style={{ borderRadius: "20%" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt={alt}
          className="box-border block h-full w-full object-cover object-top"
          style={{ padding: "10px" }}
        />
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={FRAME}
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 h-full w-full"
      />
    </div>
  );
}
