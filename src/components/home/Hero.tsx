import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-svh flex-col overflow-hidden bg-navy-ink text-white"
    >
      <Image
        src="/media/doula-holding-newborn.jpg"
        alt="Late at night, a doula holds a sleeping newborn while the baby's mother sleeps in the chair beside her"
        fill
        priority
        sizes="100vw"
        className="-z-30 object-cover object-[28%_center] md:object-center"
      />
      {/* Navy wash: clear over the faces, deep at the base where the type sits */}
      <div
        aria-hidden
        className="absolute inset-0 -z-20 bg-[linear-gradient(to_top,var(--navy-ink)_0%,rgb(13_23_72/0.92)_30%,rgb(13_23_72/0.35)_62%,rgb(13_23_72/0.55)_100%)]"
      />

      {/* The logo's swoosh, as a single thin line drawn across the photo */}
      <svg
        aria-hidden
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        className="pointer-events-none absolute inset-0 -z-10 hidden h-full w-full sm:block"
      >
        <path
          className="ribbon-path"
          pathLength={1}
          d="M -40 772 C 520 742 1060 768 1330 742 C 1392 736 1398 440 1352 168"
          fill="none"
          stroke="var(--gold-light)"
          strokeOpacity="0.75"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <g fill="var(--gold-light)" fillOpacity="0.85">
          <path className="ribbon-leaf" d="M 1352 168 C 1338 144 1342 118 1362 100 C 1376 124 1372 150 1352 168 Z" />
          <path className="ribbon-leaf" style={{ animationDelay: "2.05s" }} d="M 1354 170 C 1370 150 1394 144 1416 150 C 1404 172 1378 180 1354 170 Z" />
        </g>
      </svg>

      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-end px-(--pad) pb-8 pt-28 sm:pt-36">
        <h1 id="hero-title" className="t-hero enter max-w-[13ch] text-[clamp(2.75rem,1.6rem+5.6vw,7rem)]">
          Birth doulas who stay with you
        </h1>

        <div className="mt-5 grid gap-6 sm:mt-8 sm:gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <p className="t-lead enter enter-1 max-w-[44ch] text-white/80">
            Calm, non-clinical support for Greater Accra families, from
            pregnancy through the birth to the first weeks home. Even at
            3&nbsp;a.m.
          </p>
          <div className="enter enter-2 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap">
            <Link href="/waitlist" className="btn btn--light min-h-12 px-4 text-[0.9375rem] sm:min-h-14 sm:px-8 sm:text-[1.0625rem]">
              Join the waitlist
            </Link>
            <Link href="#plan" className="btn btn--ghost-light min-h-12 px-4 text-[0.9375rem] sm:min-h-14 sm:px-7 sm:text-base">
              Plan your visits
            </Link>
          </div>
        </div>

        {/* Keeps the hero text where the facts bar used to hold it */}
        <div aria-hidden className="hidden h-36 sm:block" />
      </div>
    </section>
  );
}
