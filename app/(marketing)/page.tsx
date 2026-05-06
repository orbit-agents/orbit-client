import { Hero } from "./_components/sections/Hero";
import { Values } from "./_components/sections/Values";
import { Metrics } from "./_components/sections/Metrics";
import { HowItWorks } from "./_components/sections/HowItWorks";
import { Compare } from "./_components/sections/Compare";
import { Agents } from "./_components/sections/Agents";
import { Download } from "./_components/sections/Download";

export default function Home() {
  return (
    <>
      <Hero />
      <Values />
      <Metrics />
      <HowItWorks />
      <Compare />
      <Agents />
      <Download />
    </>
  );
}
