import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedProjects from "@/components/FeaturedProjects";
import SecondaryProjects from "@/components/SecondaryProjects";
import SkillsGrid from "@/components/SkillsGrid";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <FeaturedProjects />
        <SecondaryProjects />
        <SkillsGrid />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
