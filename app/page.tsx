import { Topbar } from "./(marketing)/_components/sections/Topbar";
import { Hero } from "./(marketing)/_components/sections/Hero";
import { Values } from "./(marketing)/_components/sections/Values";
import { Metrics } from "./(marketing)/_components/sections/Metrics";
import { HowItWorks } from "./(marketing)/_components/sections/HowItWorks";
import { RevealOnScroll } from "./(marketing)/_components/utils/RevealOnScroll";

export default function Home() {
  return (
    <>
      <RevealOnScroll />
      <Topbar />
      <Hero />
      <Values />
      <Metrics />
      <HowItWorks />
    </>
  );
}
