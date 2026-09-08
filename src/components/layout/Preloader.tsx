import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Full-viewport preloader, a recreation of the LPAS loading experience for
 * FAB-LUX. The brand is revealed as two words — FAB, LUX — whose leading
 * letters blur in, chase together, then split apart while the same video that
 * will become the hero scales up behind them. The loader then lifts to hand
 * off to the live hero video with a seamless cut.
 *
 * The sequence is CSS-driven for 60fps; this component only locks scroll and
 * times the final fade/unmount to match the CSS timeline (~2.9s).
 *
 * prefers-reduced-motion: the choreography is skipped and the brand is shown
 * statically before a quick fade.
 */
export function Preloader({ className }: { className?: string }) {
  const [reduced] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [fading, setFading] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    const fadeAt = reduced ? 250 : 2900;
    const clearAt = reduced ? 600 : 3050;

    const t1 = window.setTimeout(() => setFading(true), fadeAt);
    const t2 = window.setTimeout(() => {
      setGone(true);
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }, clearAt);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [reduced]);

  if (gone) return null;

  return (
    <div
      className={cn(
        "preloader",
        reduced && "preloader--reduced",
        fading && "preloader--fade",
        className,
      )}
      role="status"
      aria-label="Loading FAB-LUX"
    >
      <video
        className="preloader__video"
        src="/assets/hero-video.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        tabIndex={-1}
      />
      <div className="preloader__words" aria-hidden="true">
        <span className="preloader__section preloader__section--left">
          <span className="preloader__word">
            <span className="preloader__wordFl">F</span>
            <span className="preloader__wordRl">ab</span>
          </span>
        </span>
        <span className="preloader__section preloader__section--right">
          <span className="preloader__word">
            <span className="preloader__wordFl preloader__wordFl--two">L</span>
            <span className="preloader__wordRl">ux</span>
          </span>
        </span>
      </div>
    </div>
  );
}
