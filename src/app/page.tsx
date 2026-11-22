import Careers from "@/components/home/Careers";
import ClosingCta from "@/components/home/ClosingCta";
import Hero from "@/components/home/Hero";
import Intro from "@/components/home/Intro";
import Questions from "@/components/home/Questions";
import VisitPlanner from "@/components/home/VisitPlanner";
import SiteFooter from "@/components/ui/SiteFooter";
import SiteHeader from "@/components/ui/SiteHeader";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <Intro />
        <VisitPlanner />
        <Careers />
        <Questions />
        <ClosingCta />
      </main>
      <SiteFooter />
    </>
  );
}
