import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedProjects from "@/components/FeaturedProjects";
import SecondaryProjects from "@/components/SecondaryProjects";
import SkillsGrid from "@/components/SkillsGrid";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import { SiteProvider } from "@/components/site-context";
import { Particles, CursorTrail, SmoothCursor, RibbonsTrail, ClickSpark } from "@/components/animations";

export default function Home() {
  return (
    <SiteProvider>
      <Particles />
      <CursorTrail />
      <RibbonsTrail />
      <SmoothCursor />
      <ClickSpark />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <FeaturedProjects />
        <SecondaryProjects />
        <SkillsGrid />
        <ContactForm />
      </main>
      <Footer />
    </SiteProvider>
  );
}
