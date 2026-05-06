import { ReactNode } from "react";
import { Topbar } from "./_components/sections/Topbar";
import { Footer } from "./_components/sections/Footer";
import { RevealOnScroll } from "./_components/utils/RevealOnScroll";
import { SmoothScroll } from "./_components/utils/SmoothScroll";

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <RevealOnScroll />
      <SmoothScroll />
      <Topbar />
      {children}
      <Footer />
    </>
  );
}
