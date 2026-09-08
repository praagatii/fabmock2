import { useEffect, useState } from "react";
import { ActionLink } from "@/components/primitives/ActionLink";
import { EyebrowLabel } from "@/components/primitives/EyebrowLabel";
import group from "@/data/group.json";
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
        className="absolute inset-x-0 top-0 -z-10 h-40 bg-linear-to-b from-navy/50 to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-64 bg-linear-to-t from-navy/70 via-navy/20 to-transparent"
      />

      <div className="shell mt-auto pb-20 pt-32 sm:pb-24 sm:pt-36">
        <div className="max-w-2xl">
          <div className="hero-rise hero-rise--1">
            <EyebrowLabel tone="light">
              Since {group.founded} &mdash; Interiors &amp; Home Technology
            </EyebrowLabel>
          </div>
          <h1 className="hero-rise hero-rise--2 mt-6 font-display text-display-md leading-tight text-on-dark">
            Two companies that finish what they start.
          </h1>
          <p className="hero-rise hero-rise--3 mt-5 max-w-lg text-body leading-relaxed text-on-dark-muted">
            Fabluxe designs and fits out interiors, and supplies the technology that lives inside
            them. One group, one accountable standard of finish.
          </p>
          <div className="hero-rise hero-rise--3 mt-8 flex flex-wrap items-center gap-x-7 gap-y-3">
            <ActionLink href="/companies" variant="quiet" tone="light">
              Explore our companies
            </ActionLink>
            <ActionLink href="/contact" variant="quiet" tone="light">
              Talk to us
            </ActionLink>
          </div>
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
