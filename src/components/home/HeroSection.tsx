import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import group from "@/data/group.json";

/**
 * Cinematic hero modelled on dsgninterior.se/en:
 * a full-viewport cocoa banner, a grayscale screen-blended film behind a
 * giant centred lowercase headline, and a bottom strip of contacts / address
 * / scroll hint.
 */
export function HeroSection() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 64);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const { email, phone, addressLines } = group.contact;

  return (
    <section className="relative isolate flex min-h-svh flex-col overflow-hidden bg-cocoa">
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

      <div className="hero-title">
        <span className="hero-title__inner hero-rise hero-rise--1">
          <h1 className="font-sans text-hero-xl font-medium leading-[1.04] tracking-[-0.03em]">
            two companies that
            <br className="hidden sm:block" />
            finish what they start.
          </h1>
        </span>
      </div>

      <div className="hero-strip">
        <div className="grid items-end gap-x-6 gap-y-4 sm:grid-cols-[auto_1fr_auto] sm:items-center">
          <nav aria-label="Contact" className="flex flex-wrap items-center gap-x-5 gap-y-1">
            <a
              href={`mailto:${email}`}
              className="text-sm text-bone transition-opacity duration-300 hover:opacity-70 sm:text-base"
            >
              {email}
            </a>
            <a
              href={`tel:${phone.replace(/\s/g, "")}`}
              className="text-sm text-bone transition-opacity duration-300 hover:opacity-70 sm:text-base"
            >
              {phone}
            </a>
          </nav>

          <p className="hidden text-sm text-bone/70 sm:block">
            {addressLines[0]} · {addressLines[1]}
          </p>

          <div
            data-scroll-hint
            className={cn(
              "pointer-events-none flex items-center gap-4 justify-self-start transition-opacity duration-700 sm:justify-self-end",
              scrolled && "opacity-0",
            )}
          >
            <span className="text-eyebrow font-medium uppercase text-bone/70">
              Scroll to explore
            </span>
            <span className="scroll-hint__line">
              <span className="scroll-hint__dot" />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}