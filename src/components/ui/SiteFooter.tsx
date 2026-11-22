import Link from "next/link";
import Logo from "./Logo";

const columns = [
  {
    title: "For families",
    links: [
      { href: "/#care", label: "What a doula does" },
      { href: "/#plan", label: "Your eleven visits" },
      { href: "/#questions", label: "Questions" },
    ],
  },
  {
    title: "For nurses and midwives",
    links: [
      { href: "/#careers", label: "Careers and pay" },
      { href: "/waitlist", label: "Join the waitlist" },
    ],
  },
];

export default function SiteFooter() {
  return (
    <footer className="bg-white">
      <div className="mx-auto max-w-7xl px-[var(--pad)] pb-10 pt-16 md:pt-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-6">
            <Logo compact={false} className="h-24" />
            <p className="mt-6 max-w-[38ch] text-muted">
              Non-clinical birth and postpartum doula support for families in
              Greater Accra, in Ga, Twi, Ewe or English.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title} className="md:col-span-3">
              <h2 className="font-display text-lg font-bold text-navy">{col.title}</h2>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-muted transition-colors hover:text-navy">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="t-small mt-12 border-t border-line pt-6 sm:mt-16 text-muted">
          OMNI DOULA LTD, Greater Accra, Ghana. Every service is non-clinical
          and does not replace care from your midwife or doctor.
        </p>
      </div>
    </footer>
  );
}
