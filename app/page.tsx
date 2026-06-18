import { Navigation } from "@/components/layout/navigation";
import { Footer } from "@/components/layout/footer";
import { About } from "@/components/sections/about";
import { Capabilities } from "@/components/sections/capabilities";
import { Contact } from "@/components/sections/contact";
import { Hero } from "@/components/sections/hero";
import { Process } from "@/components/sections/process";
import { SelectedWork } from "@/components/sections/selected-work";
import { TechnicalFocus } from "@/components/sections/technical-focus";

export default function Home() {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Navigation />
      <main id="main-content">
        <Hero />
        <Capabilities />
        <SelectedWork />
        <Process />
        <TechnicalFocus />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
