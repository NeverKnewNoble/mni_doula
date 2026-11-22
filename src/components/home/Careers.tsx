import Link from "next/link";

// Rates and terms from docs/OMNI_Doula_Pay_Rates.pdf (proposed, pending approval).
const rates = [
  { name: "Prenatal visits", value: 30 },
  { name: "Postpartum visits", value: 25 },
  { name: "Calls and messages", value: 25 },
  { name: "Labour, first 9 hours", value: 30 },
  { name: "Labour, 9 to 24 hours", value: 45 },
];

type Item = { name: string; value?: string };

const details: { title: string; items: Item[] }[] = [
  {
    title: "Who we're looking for",
    items: [
      { name: "Midwives" },
      { name: "General nurses" },
      { name: "Community health nurses" },
      { name: "Registration", value: "Active, awaiting or renewing" },
    ],
  },
  {
    title: "What we ask of you",
    items: [
      { name: "Birth clients", value: "1–2 every 8 weeks" },
      { name: "Back up fellow doulas", value: "When called" },
      { name: "Record every visit", value: "Date, times and notes" },
    ],
  },
  {
    title: "Shifts and breaks",
    items: [
      { name: "Longest shift", value: "24 hours" },
      { name: "Overtime", value: "1.5× after 9 hours" },
      { name: "Meal break on 5-hour shifts", value: "30 minutes" },
      { name: "Holiday rate for births", value: "None" },
      { name: "Mileage", value: "Not reimbursed" },
    ],
  },
  {
    title: "Where you'd work",
    items: [
      { name: "Teshie, Nungua, Spintex, Tema" },
      { name: "Osu, Labone, Adenta, Madina" },
      { name: "Settings", value: "Home, hospital and video" },
    ],
  },
];

export default function Careers() {
  return (
    <section
      id="careers"
      aria-labelledby="careers-title"
      className="relative isolate overflow-hidden bg-navy-ink text-white"
    >
      {/* Faint periwinkle glow, top right */}
      <div
        aria-hidden
        className="absolute -right-48 -top-48 -z-10 h-160 w-160 rounded-full bg-[radial-gradient(closest-side,rgb(180_189_240/0.16),transparent)]"
      />

      <div className="mx-auto max-w-7xl px-(--pad) py-16 sm:py-24 md:py-32">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <h2 id="careers-title" className="t-head max-w-[16ch]">
              Careers for nurses and midwives
            </h2>
            <p className="t-lead mt-6 max-w-[40ch] text-white/75">
              Trained as a midwife or nurse? Give families the time a ward
              can&apos;t, on a schedule built around one or two births every
              eight weeks.
            </p>
          </div>
          <div className="lg:col-span-4 lg:justify-self-end">
            <Link href="/waitlist" className="btn btn--light min-h-14 px-8">
              Join the recruitment waitlist
            </Link>
            <p className="t-small mt-3 text-white/55 lg:text-right">
              It takes about five minutes.
            </p>
          </div>
        </div>

        <div className="mt-10 rounded-[28px] bg-white/5 p-5 sm:mt-16 sm:rounded-4xl ring-1 ring-white/10 sm:p-10">
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
            <h3 className="t-title">Hourly pay</h3>
            <p className="t-small text-white/55">
              Proposed gross rates. The effective date is still to be confirmed.
            </p>
          </div>

          <dl className="mt-6 grid sm:mt-8 sm:grid-cols-3 sm:gap-y-8 lg:grid-cols-5">
            {rates.map((r) => (
              <div
                key={r.name}
                className="flex items-center justify-between gap-4 border-b border-white/10 py-4 last:border-b-0 sm:flex-col-reverse sm:items-start sm:justify-end sm:gap-0 sm:border-b-0 sm:py-0 sm:pr-4 lg:border-l lg:border-white/12 lg:pl-6 lg:first:border-l-0 lg:first:pl-0"
              >
                <dt className="t-small text-white/70 sm:mt-2 sm:text-white/65">{r.name}</dt>
                <dd className="flex shrink-0 items-baseline gap-1.5">
                  <span className="text-sm font-medium text-dusk">GHS</span>
                  <span className="font-display text-[2.25rem] font-bold leading-none tabular-nums sm:text-[3.25rem]">
                    {r.value}
                  </span>
                  <span className="text-sm text-white/50">/hr</span>
                </dd>
              </div>
            ))}
          </dl>

          <p className="t-small mt-10 border-t border-white/10 pt-5 text-white/60">
            A 12-hour labour pays GHS 405: nine hours at GHS 30, then three at
            GHS 45.
          </p>
        </div>

        <div className="mt-12 grid gap-x-10 gap-y-10 sm:mt-16 sm:grid-cols-2 lg:grid-cols-4">
          {details.map((d) => (
            <div key={d.title}>
              <h3 className="border-b border-white/15 pb-4 font-display text-xl font-bold">
                {d.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {d.items.map((item) => (
                  <li key={item.name}>
                    <p className="text-white/85">{item.name}</p>
                    {item.value && (
                      <p className="t-small text-dusk">{item.value}</p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
