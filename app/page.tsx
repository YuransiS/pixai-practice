import Hero from "@/components/Hero";
import TargetAudience from "@/components/TargetAudience";
import Portfolio from "@/components/Portfolio";
import AboutExpert from "@/components/AboutExpert";
import ProgramTimeline from "@/components/ProgramTimeline";
import StudentResults from "@/components/StudentResults";
import FAQ from "@/components/FAQ";
import FooterCTA from "@/components/FooterCTA";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between w-full overflow-x-hidden pt-0 md:pt-0 pb-0">
      <Hero />
      <TargetAudience />
      <Portfolio />
      <AboutExpert />
      <ProgramTimeline />
      <StudentResults />
      <FAQ />
      <FooterCTA />
    </main>
  );
}
