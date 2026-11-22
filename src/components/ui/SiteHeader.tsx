import Link from "next/link";
import Logo from "./Logo";

const nav = [
  { href: "/#care", label: "Our care" },
  { href: "/#plan", label: "Your visits" },
  { href: "/#careers", label: "Careers" },
  { href: "/#questions", label: "Questions" },
];

/**
 * Floating pill navbar. The mobile menu is a <details>, so it needs no JS.
 */
export default function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:pt-4">
      <div className="mx-auto flex h-[var(--header-h)] max-w-6xl items-center justify-between gap-4 rounded-full border border-navy/10 bg-white/85 pl-5 pr-2 shadow-[0_12px_40px_-18px_rgb(13_23_72/0.45)] backdrop-blur-xl sm:pl-6">
        <Logo className="h-9 sm:h-10" />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="rounded-full px-4 py-2.5 text-[0.9375rem] font-medium text-muted transition-colors hover:bg-mist hover:text-navy"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/waitlist"
            className="btn hidden min-h-11 px-5 text-[0.9375rem] sm:inline-flex"
          >
            Join the waitlist
          </Link>

          <details className="group relative lg:hidden">
            <summary
              aria-label="Menu"
              className="grid h-11 w-11 cursor-pointer list-none place-items-center rounded-full bg-mist text-navy transition-colors hover:bg-line [&::-webkit-details-marker]:hidden"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
                <path className="group-open:hidden" d="M4 8h16M4 16h16" />
                <path className="hidden group-open:block" d="M6 6l12 12M18 6L6 18" />
              </svg>
            </summary>
            <div className="absolute right-0 top-[calc(100%+12px)] w-64 rounded-[28px] border border-navy/10 bg-white p-2 shadow-[0_24px_48px_-16px_rgb(13_23_72/0.4)]">
              <ul>
                {nav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="block rounded-full px-5 py-3 font-medium hover:bg-mist"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li className="mt-1 border-t border-line pt-2 sm:hidden">
                  <Link href="/waitlist" className="btn w-full">
                    Join the waitlist
                  </Link>
                </li>
              </ul>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}
