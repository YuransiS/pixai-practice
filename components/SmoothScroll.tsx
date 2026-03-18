"use client";

import { useEffect, ReactNode } from "react";
import Lenis from "@studio-freight/lenis";

export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.07, // Чем меньше значение, тем "в'язкіший" та довший ефект гальмування
      wheelMultiplier: 0.8, // Робить сам скролл трішки м'якшим та важчим
      smoothWheel: true,
      touchMultiplier: 1.5, // Комфортніше для тачпадів/телефонів
      orientation: "vertical",
      gestureOrientation: "vertical",
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
