import { Navigation } from "@/components/layout/navigation";
import { Capabilities } from "@/components/sections/capabilities";
import { Hero } from "@/components/sections/hero";
import { SelectedWork } from "@/components/sections/selected-work";

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <Capabilities />
        <SelectedWork />
      </main>
    </>
  );
}
