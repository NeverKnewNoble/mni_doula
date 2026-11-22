import Image from "next/image";

const help = [
  {
    title: "Information when you want it",
    body: "Plain answers about pregnancy, labour and recovery, so the choices stay yours.",
  },
  {
    title: "Comfort through labour",
    body: "Breathing, positions, touch and reassurance, from early labour through the birth.",
  },
  {
    title: "An extra pair of hands",
    body: "Meals, rest, feeding support and a calm presence once you are home.",
  },
  {
    title: "Your language",
    body: "We match you with a doula who speaks Ga, Twi, Ewe or English.",
  },
];

export default function Intro() {
  return (
    <section id="care" aria-labelledby="care-title" className="grid bg-white lg:grid-cols-2">
      <figure className="relative min-h-105 sm:min-h-130 lg:min-h-full">
        <Image
          src="/media/doula-supporting-labour.jpg"
          alt="A doula helps a mother settle her newborn on the sofa at home while the father looks on"
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover object-[62%_center]"
        />
      </figure>

      <div className="px-(--pad) py-14 sm:py-20 md:py-28 lg:px-16 xl:px-24">
        <div className="max-w-150">
          <h2 id="care-title" className="t-head text-navy">
            What a doula does
          </h2>
          <p className="t-statement mt-8 text-navy-ink">
            Your midwife or doctor looks after the medical side. We look after
            everything else.
          </p>
          <p className="mt-6 max-w-[56ch] text-muted">
            A doula is a trained companion for the person giving birth, and for
            the people around them. Every OMNI service is non-clinical. That is
            what lets us offer something a busy ward rarely can: one familiar
            person who stays.
          </p>

          <dl className="mt-12 grid gap-x-10 sm:grid-cols-2">
            {help.map((h) => (
              <div key={h.title} className="border-t border-line py-6">
                <dt className="flex items-center gap-3 font-display text-lg font-bold text-navy">
                  {/* <span aria-hidden className="h-2 w-2 shrink-0 rounded-full bg-gold" /> */}
                  {h.title}
                </dt>
                <dd className="t-small mt-2 text-muted">{h.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
