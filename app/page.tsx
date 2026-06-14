import { Navigation } from "@/components/layout/navigation";
import { Footer } from "@/components/layout/footer";
import { About } from "@/components/sections/about";
import { Capabilities } from "@/components/sections/capabilities";
import { Contact } from "@/components/sections/contact";
import { Hero } from "@/components/sections/hero";
import { InterfaceLab } from "@/components/sections/interface-lab";
import { Process } from "@/components/sections/process";
import { SelectedWork } from "@/components/sections/selected-work";
import { Services } from "@/components/sections/services";

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <Capabilities />
        <SelectedWork />
        <Process />
        <InterfaceLab />
        <Services />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
