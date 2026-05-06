import { Topbar } from "./(marketing)/_components/sections/Topbar";
import { RevealOnScroll } from "./(marketing)/_components/utils/RevealOnScroll";

export default function Home() {
  return (
    <>
      <RevealOnScroll />
      <Topbar />
      <main style={{ minHeight: "100vh" }} />
    </>
  );
}
