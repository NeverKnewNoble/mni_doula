import Image from "next/image";
import Link from "next/link";

/**
 * The OMNI DOULA LTD logo. `compact` drops the "Care, Support, Wellness"
 * tagline so the mark stays legible at navbar height.
 */
export default function Logo({
  compact = true,
  className = "",
}: {
  compact?: boolean;
  className?: string;
}) {
  const src = compact ? "/brand/omni-logo-mark.png" : "/brand/omni-logo.png";
  const [w, h] = compact ? [1055, 489] : [1055, 553];
  return (
    <Link
      href="/"
      aria-label="OMNI DOULA LTD home"
      className={`inline-flex shrink-0 items-center ${className}`}
    >
      <Image
        src={src}
        alt="OMNI DOULA LTD"
        width={w}
        height={h}
        priority={compact}
        sizes="200px"
        className="h-full w-auto"
      />
    </Link>
  );
}
