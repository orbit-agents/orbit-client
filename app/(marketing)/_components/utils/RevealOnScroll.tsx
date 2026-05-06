"use client";
import { useEffect } from "react";

export function RevealOnScroll() {
  useEffect(() => {
    document.documentElement.classList.add("js-reveal");
    const els = document.querySelectorAll<HTMLElement>(".reveal, .reveal-stagger, .step");
    const showIfVisible = (el: HTMLElement) => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      if (r.top < vh - 40 && r.bottom > 0) el.classList.add("in");
    };
    els.forEach(showIfVisible);
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("in");
              io.unobserve(e.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
      );
      els.forEach((el) => {
        if (!el.classList.contains("in")) io.observe(el);
      });
    } else {
      els.forEach((el) => el.classList.add("in"));
    }
  }, []);
  return null;
}
