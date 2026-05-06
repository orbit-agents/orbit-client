import { Topbar } from "./(marketing)/_components/sections/Topbar";
import { Hero } from "./(marketing)/_components/sections/Hero";
import { Values } from "./(marketing)/_components/sections/Values";
import { Metrics } from "./(marketing)/_components/sections/Metrics";
import { HowItWorks } from "./(marketing)/_components/sections/HowItWorks";
import { Compare } from "./(marketing)/_components/sections/Compare";
import { Agents } from "./(marketing)/_components/sections/Agents";
import { Download } from "./(marketing)/_components/sections/Download";
import { Footer } from "./(marketing)/_components/sections/Footer";
import { RevealOnScroll } from "./(marketing)/_components/utils/RevealOnScroll";
import { SmoothScroll } from "./(marketing)/_components/utils/SmoothScroll";

export default function Home() {
  return (
    <>
      <RevealOnScroll />
      <SmoothScroll />
      <Topbar />
      <Hero />
      <Values />
      <Metrics />
      <HowItWorks />
      <Compare />
      <Agents />
      <Download />
      <Footer />
    </>
  );
}
