import { Topbar } from "./(marketing)/_components/sections/Topbar";
import { Hero } from "./(marketing)/_components/sections/Hero";
import { RevealOnScroll } from "./(marketing)/_components/utils/RevealOnScroll";

export default function Home() {
  return (
    <>
      <RevealOnScroll />
      <Topbar />
      <Hero />
    </>
  );
}
