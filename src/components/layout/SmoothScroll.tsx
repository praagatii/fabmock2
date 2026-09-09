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

    // Hero title can't live in a separate tween once the banner stack scrubs.
    const banners = document.querySelector<HTMLElement>(".banners");
    if (banners) {
      const slides = Array.from(banners.querySelectorAll<HTMLElement>(".banner"));
      if (slides.length > 1) {
        // Scroll-scrubbed banner sequence. We deliberately avoid ScrollTrigger
        // pinning: `pin` wraps the SSR'd hero in a .pin-spacer right before
        // React hydrates that lazy subtree, which trips a full-tree hydration
        // mismatch. So the stack sticks (native, no DOM move) and a plain
        // scroll handler translates it one viewport per scroll pad. Reserve
        // the full column height up front so each slide earns a viewport.
        const stack = banners.querySelector<HTMLElement>(".banners__stack");
        banners.classList.add("banners--pin");
        if (stack) {
          banners.style.minHeight = `${slides.length * 100}vh`;
          stack.style.position = "sticky";
          stack.style.top = "0";
          stack.style.height = "100vh";
          stack.style.overflow = "hidden";
        }

        const nth = slides.length - 1;
        const apply = () => {
          const vh = window.innerHeight;
          const total = (slides.length * vh) - vh;
          const progress = total > 0 ? Math.min(1, Math.max(0, -banners.getBoundingClientRect().top / total)) : 0;
          const idx = Math.round(progress * nth);
          slides.forEach((s, i) => s.classList.toggle("is-active", i === idx));
          banners.querySelectorAll<HTMLElement>(".banner__pip").forEach((pip, i) => {
            pip.classList.toggle("is-active", i === idx);
          });
          if (stack) stack.style.transform = `translate3d(0, ${(-progress * nth * 100).toFixed(4)}vh, 0)`;
        };
        window.addEventListener("scroll", apply, { passive: true });
        window.addEventListener("resize", apply, { passive: true });
        apply();
      }
    } else {
      // Single-slide hero (no sequence): the headline drifts up as the page
      // scrolls, mirroring the reference's faster-than-media title parallax.
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
    }

    ScrollTrigger.refresh();

    return () => {
      window.clearTimeout(unlock);
      tweens.forEach((t) => t.kill());
      ScrollTrigger.killAll();
      if (banners) {
        banners.classList.remove("banners--pin");
        banners.style.minHeight = "";
        const stack = banners.querySelector<HTMLElement>(".banners__stack");
        if (stack) {
          stack.style.position = "";
          stack.style.top = "";
          stack.style.height = "";
          stack.style.overflow = "";
          stack.style.transform = "";
        }
      }
      gsap.ticker.remove(raf);
      lenis.destroy();
      if (window.__lenis === lenis) delete window.__lenis;
    };
  }, []);

  return null;
}