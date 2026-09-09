import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

/**
 * 60fps smooth scrolling (Lenis driven by GSAP's ticker) plus a subtle
 * scroll-parallax on every `.editorial-img` photo. Reduced-motion visitors
 * get native scrolling and static images.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    window.__lenis = lenis;

    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Hold scrolling while the FAB-LUX loader runs, then hand over to Lenis.
    lenis.stop();
    const unlock = window.setTimeout(() => lenis.start(), 3500);

    const tweens: gsap.core.Tween[] = [];
    Array.from(document.querySelectorAll<HTMLElement>(".editorial-img")).forEach((box) => {
      const img = box.querySelector<HTMLElement>(".editorial-img__fit");
      if (!img) return;
      img.style.willChange = "transform";
      tweens.push(
        gsap.fromTo(
          img,
          { scale: 1.22, yPercent: -18 },
          {
            scale: 1.42,
            yPercent: 18,
            ease: "none",
            scrollTrigger: { trigger: box, start: "top bottom", end: "bottom top", scrub: 1 },
          },
        ),
      );
    });

    // Hero headline drifts up as the page scrolls, mirroring the reference's
    // faster-than-media title parallax (film itself stays put).
    const heroTitle = document.querySelector<HTMLElement>(".hero-title");
    if (heroTitle) {
      tweens.push(
        gsap.to(heroTitle, {
          yPercent: -28,
          ease: "none",
          scrollTrigger: { trigger: heroTitle.closest("section") ?? heroTitle, start: "top top", end: "bottom top", scrub: 1 },
        }),
      );
    }

    ScrollTrigger.refresh();

    return () => {
      window.clearTimeout(unlock);
      tweens.forEach((t) => t.kill());
      ScrollTrigger.killAll();
      gsap.ticker.remove(raf);
      lenis.destroy();
      if (window.__lenis === lenis) delete window.__lenis;
    };
  }, []);

  return null;
}