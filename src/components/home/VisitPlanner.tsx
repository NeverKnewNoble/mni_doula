"use client";

import { useId, useState, type ReactNode } from "react";

type Mode = "video" | "home";

type Visit = {
  name: string;
  /** Longest paid time, from docs/OMNI_Doula_Pay_Rates.pdf. */
  length: string;
  mode: Mode;
  /** Weeks of pregnancy (before birth) or days after the due date. */
  week?: number;
  day?: number;
};

// A suggested spread of the 11 visits. The doula agrees exact days with each family.
const before: Visit[] = [
  { name: "First visit", length: "up to 1½ hrs", mode: "video", week: 28 },
  { name: "Prenatal visit", length: "1–2 hrs", mode: "video", week: 30 },
  { name: "Prenatal visit", length: "1–2 hrs", mode: "video", week: 33 },
  { name: "Hands-on visit", length: "2 hrs", mode: "home", week: 35 },
  { name: "Prenatal visit", length: "1–2 hrs", mode: "video", week: 37 },
];

const after: Visit[] = [
  { name: "Postpartum visit", length: "1–2 hrs", mode: "video", day: 3 },
  { name: "Extended visit", length: "up to 3 hrs", mode: "home", day: 5 },
  { name: "Postpartum visit", length: "1–2 hrs", mode: "video", day: 10 },
  { name: "Extended visit", length: "up to 3 hrs", mode: "home", day: 14 },
  { name: "Postpartum visit", length: "1–2 hrs", mode: "video", day: 21 },
  { name: "Postpartum visit", length: "1–2 hrs", mode: "video", day: 35 },
];

const birth = [
  {
    name: "Your doula joins you",
    body: "From early labour, at home or in hospital, for up to 24 hours.",
  },
  {
    name: "A back-up doula takes over",
    body: "If labour passes 24 hours, so you are never left without support.",
  },
];

const fmt = new Intl.DateTimeFormat("en-GB", {
  weekday: "short",
  day: "numeric",
  month: "short",
});

function dateFor(visit: Visit, due: Date) {
  const d = new Date(due);
  if (visit.week !== undefined) d.setDate(d.getDate() - (40 - visit.week) * 7);
  else d.setDate(d.getDate() + (visit.day ?? 0));
  return d;
}

const fmtShort = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short" });

/** Short label for the timeline column. */
function whenShort(visit: Visit, due: Date | null) {
  if (due) return fmtShort.format(dateFor(visit, due));
  return visit.week !== undefined ? `Week ${visit.week}` : `Day ${visit.day}`;
}

/** Full label for the copied plan. */
function whenLong(visit: Visit, due: Date | null) {
  if (due) return fmt.format(dateFor(visit, due));
  return visit.week !== undefined
    ? `week ${visit.week}`
    : `${visit.day} days after birth`;
}

const modeLabel: Record<Mode, string> = { video: "By video", home: "At home" };

export default function VisitPlanner() {
  const [dueRaw, setDueRaw] = useState("");
  const [copied, setCopied] = useState(false);
  const id = useId();

  const due = dueRaw ? new Date(`${dueRaw}T12:00:00`) : null;

  async function copyPlan() {
    const line = (v: Visit, n: number) =>
      `  ${n}. ${v.name}, ${modeLabel[v.mode].toLowerCase()} (${v.length}): ${whenLong(v, due)}`;
    const text = [
      `My OMNI DOULA visits${due ? ` (due ${fmt.format(due)})` : ""}`,
      "Before birth",
      ...before.map((v, i) => line(v, i + 1)),
      "The birth",
      ...birth.map((b) => `  ${b.name}: ${b.body}`),
      "After birth",
      ...after.map((v, i) => line(v, i + 1 + before.length)),
    ].join("\n");
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      setCopied(false);
    }
  }

  return (
    <section id="plan" aria-labelledby="plan-title" className="bg-porcelain py-16 sm:py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-(--pad) lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <h2 id="plan-title" className="t-head text-navy">
              Your eleven visits
            </h2>
            <p className="mt-5 max-w-[46ch] text-muted">
              One care package with one doula, from the first conversation to
              five weeks after the birth. Add your due date to see roughly when
              each visit falls; your doula agrees the exact days with you.
            </p>

            <div className="mt-10 rounded-[28px] bg-white p-6 ring-1 ring-line sm:p-7">
              <label htmlFor={`${id}-due`} className="block font-semibold text-navy">
                Your due date
              </label>
              <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                <input
                  id={`${id}-due`}
                  type="date"
                  value={dueRaw}
                  onChange={(e) => setDueRaw(e.target.value)}
                  className="h-13 w-full min-w-0 shrink-0 rounded-full sm:flex-1 border border-line bg-porcelain px-5 font-medium text-navy outline-none focus-visible:border-navy focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-dusk"
                />
                <button type="button" onClick={copyPlan} className="btn">
                  {copied ? "Copied" : "Copy my plan"}
                </button>
              </div>
              <p className="t-small mt-5 border-t border-line pt-5 text-muted">
                Eight visits are by video and three are at your home. Between
                visits you can call or text your doula, about five hours in
                all.
              </p>
            </div>
          </div>
        </div>

        <div aria-live="polite" className="rounded-4xl bg-white p-5 ring-1 ring-line sm:p-8 lg:col-span-7 lg:p-10">
          <Stage id={`${id}-before`} title="Before birth" range="Weeks 28 to 37">
            <Timeline visits={before} start={1} due={due} />
          </Stage>

          <section aria-labelledby={`${id}-birth`} className="my-8 rounded-3xl bg-navy-ink p-6 text-white sm:p-8">
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
              <h3 id={`${id}-birth`} className="t-title">
                The birth
              </h3>
              <p className="t-small text-dusk">
                {due ? `Due ${fmt.format(due)}` : "Around your due date"}
              </p>
            </div>
            <ul className="mt-5 grid gap-5 sm:grid-cols-2">
              {birth.map((b) => (
                <li key={b.name} className="border-t border-white/15 pt-4">
                  <p className="font-semibold">{b.name}</p>
                  <p className="t-small mt-1 text-white/70">{b.body}</p>
                </li>
              ))}
            </ul>
          </section>

          <Stage id={`${id}-after`} title="After birth" range="Days 3 to 35">
            <Timeline visits={after} start={before.length + 1} due={due} />
          </Stage>
        </div>
      </div>
    </section>
  );
}

function Stage({
  id,
  title,
  range,
  children,
}: {
  id: string;
  title: string;
  range: string;
  children: ReactNode;
}) {
  return (
    <section aria-labelledby={id}>
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 px-1">
        <h3 id={id} className="t-title text-navy">
          {title}
        </h3>
        <p className="t-small text-muted">{range}</p>
      </div>
      {children}
    </section>
  );
}

function Timeline({
  visits,
  start,
  due,
}: {
  visits: Visit[];
  start: number;
  due: Date | null;
}) {
  return (
    <ol className="relative mt-5 before:absolute before:inset-y-6 before:left-[calc(5.75rem-0.5px)] sm:before:left-[calc(7.75rem-0.5px)] before:w-px before:bg-line">
      {visits.map((v, i) => (
        <li
          key={`${v.name}-${i}`}
          className="relative grid grid-cols-[3.75rem_2rem_1fr] items-center gap-x-3 rounded-2xl sm:grid-cols-[5.5rem_2rem_1fr] sm:gap-x-4 px-1 py-3 transition-colors hover:bg-porcelain"
        >
          <span
            className={`text-right text-[0.875rem] leading-snug tabular-nums sm:text-[0.9375rem] ${due ? "font-semibold text-navy" : "text-muted"}`}
          >
            {whenShort(v, due)}
          </span>
          <span
            className={`relative grid h-8 w-8 place-items-center rounded-full text-sm font-semibold tabular-nums ${
              v.mode === "home"
                ? "bg-navy text-white"
                : "bg-white text-navy ring-1 ring-line"
            }`}
          >
            {start + i}
          </span>
          <div>
            <p className="font-semibold leading-snug text-navy-ink">{v.name}</p>
            <div className="mt-1 flex flex-wrap items-center gap-x-2.5 gap-y-1">
              <span className="t-small text-muted">{v.length}</span>
              <span
              className={`rounded-full px-2.5 py-0.5 text-[0.8125rem] font-medium ${
                v.mode === "home" ? "bg-dusk/35 text-navy" : "bg-mist text-muted"
              }`}
            >
              {modeLabel[v.mode]}
            </span>
          </div>
          </div>
        </li>
      ))}
    </ol>
  );
}
