import Image from "next/image";
import Link from "next/link";

export default function ClosingCta() {
  return (
    <section aria-labelledby="closing-title" className="px-3 pb-3">
      <div className="relative isolate overflow-hidden rounded-[36px] bg-navy-ink text-white">
        <Image
          src="/media/mother-doula-talking-1.jpg"
          alt=""
          fill
          sizes="100vw"
          className="-z-20 object-cover object-[40%_center]"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,var(--navy-ink)_20%,rgb(13_23_72/0.7)_55%,rgb(13_23_72/0.2))]"
        />
        <div className="mx-auto max-w-7xl px-(--pad) py-16 sm:py-24 md:py-32">
          <h2 id="closing-title" className="t-head max-w-[16ch]">
            Start with your due date
          </h2>
          <p className="t-lead mt-5 max-w-[38ch] text-white/80">
            See when each of your eleven visits would fall, then keep the plan
            for your first conversation with your doula.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="#plan" className="btn btn--light">
              Plan your visits
            </Link>
            <Link href="/waitlist" className="btn btn--ghost-light">
              I&apos;m a nurse or midwife
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
