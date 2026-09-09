import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function HeroSection() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 64);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="relative isolate flex min-h-svh flex-col overflow-hidden bg-navy">
      <video
        className="hero-media absolute inset-0 -z-20 size-full object-cover"
        src="/assets/hero-video.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-label="Atmospheric interior film — FAB-LUX"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-32 bg-linear-to-b from-navy/40 to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-56 bg-linear-to-t from-navy/70 via-navy/25 to-transparent"
      />

      <div className="shell pb-24 pt-36 sm:pb-28 sm:pt-44">
        <div className="hero-rise hero-rise--1 max-w-3xl">
          <h1 className="font-display text-display-lg leading-[1.02] text-on-dark">
            Two companies that
            <br className="hidden sm:block" />
            finish what they start.
          </h1>
        </div>
      </div>

      <div
        className={cn(
          "pointer-events-none absolute inset-x-0 bottom-6 flex justify-center transition-opacity duration-700",
          scrolled && "opacity-0",
        )}
        aria-hidden="true"
      >
        <div className="flex flex-col items-center gap-3">
          <span className="text-eyebrow font-medium uppercase text-on-dark-muted">
            Scroll to explore
          </span>
          <span className="scroll-hint__line">
            <span className="scroll-hint__dot" />
          </span>
        </div>
      </div>
    </section>
  );
}