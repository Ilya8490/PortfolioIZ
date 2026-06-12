import { Navigation } from "@/components/layout/navigation";
import { Capabilities } from "@/components/sections/capabilities";
import { Hero } from "@/components/sections/hero";

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <Capabilities />
      </main>
    </>
  );
}
