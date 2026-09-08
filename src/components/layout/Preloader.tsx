import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Full-viewport preloader, a recreation of the LPAS loading experience for
 * FAB-LUX. The brand is revealed as two words — FAB, LUX — whose leading
 * letters blur in, chase together, then split apart while the same video that
 * will become the hero scales up behind them. The loader then lifts to hand
 * off to the live hero video with a seamless cut.
 *
 * The sequence is CSS-driven for 60fps — including the final fade, which runs
 * from first paint so the loader hands off to the hero even before React
 * hydrates. This component only keeps scroll locked while the loader is up
 * and removes the (inert) node from the DOM after the fade.
 *
 * The sequence ALWAYS plays on a fresh page load — it is the branded opening
 * of the site and does not honour the OS reduced-motion preference (unlike
 * the rest of the page). It never uses storage, so a hard refresh replays it.
 */
export function Preloader({ className }: { className?: string }) {
  const [gone, setGone] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    const t = window.setTimeout(() => {
      setGone(true);
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }, 3400);

    return () => {
      window.clearTimeout(t);
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, []);

  if (gone) return null;

  return (
    <div
      className={cn("preloader", className)}
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
