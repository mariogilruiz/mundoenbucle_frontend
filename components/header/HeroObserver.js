"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Marca <html data-hero-out> cuando el elemento #hero sale del viewport.
// Si la página no tiene #hero, se usa el alto de una pantalla como umbral.
export default function HeroObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const hero = document.getElementById("hero");
    const set = (out) => root.toggleAttribute("data-hero-out", out);

    if (hero) {
      const observer = new IntersectionObserver(([entry]) =>
        set(!entry.isIntersecting && entry.boundingClientRect.top < 0),
      );
      observer.observe(hero);
      return () => {
        observer.disconnect();
        set(false);
      };
    }

    const onScroll = () => set(window.scrollY > window.innerHeight);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      set(false);
    };
  }, [pathname]);

  return null;
}
