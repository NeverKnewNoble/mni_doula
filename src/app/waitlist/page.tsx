import type { Metadata } from "next";
import SiteFooter from "@/components/ui/SiteFooter";
import SiteHeader from "@/components/ui/SiteHeader";
import NextSteps from "@/components/waitlist/NextSteps";
import WaitlistForm from "@/components/waitlist/WaitlistForm";

export const metadata: Metadata = {
  title: "Nurse and midwife waitlist",
  description:
    "Register your interest in non-clinical birth and postpartum doula work with OMNI DOULA LTD in Greater Accra.",
};

export default function WaitlistPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto grid max-w-7xl gap-10 px-(--pad) pb-20 pt-32 sm:pt-36 md:pb-28 lg:grid-cols-12 lg:gap-12">
          <section id="apply" aria-labelledby="apply-title" className="lg:col-span-8">
            <h1 id="apply-title" className="t-head text-navy">
              Your application
            </h1>
            <div className="mt-8">
              <WaitlistForm />
            </div>
          </section>

          <aside className="lg:col-span-4 lg:pt-22">
            <div className="lg:sticky lg:top-32">
              <NextSteps />
            </div>
          </aside>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
