"use client";
import { useEffect, useRef, useState } from "react";

export function CountUp({ target, format = "default" }: { target: number; format?: "default" | "comma" }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [text, setText] = useState("0");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let started = false;
    const animate = () => {
      if (started) return;
      started = true;
      const t0 = performance.now();
      const dur = 1400;
      const ease = (t: number) => 1 - Math.pow(1 - t, 3);
      const fmt = (n: number) =>
        format === "comma" || target >= 1000
          ? Math.floor(n).toLocaleString("en-US")
          : Math.floor(n).toString();
      const tick = (now: number) => {
        const t = Math.min(1, (now - t0) / dur);
        setText(fmt(target * ease(t)));
        if (t < 1) requestAnimationFrame(tick);
        else setText(fmt(target));
      };
      requestAnimationFrame(tick);
    };
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              animate();
              io.disconnect();
            }
          });
        },
        { threshold: 0.4 }
      );
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      if (r.top < vh && r.bottom > 0) animate();
      else io.observe(el);
    } else {
      animate();
    }
  }, [target, format]);

  return <span ref={ref}>{text}</span>;
}
