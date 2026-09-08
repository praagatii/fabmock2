import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type EditorialImageProps = {
  src: string;
  alt: string;
  /** Aspect-ratio utility applied to the container, e.g. "aspect-4/3" or "aspect-[3/4]". */
  aspect?: string;
  /** CSS object-position focal point, e.g. "center 60%". */
  position?: string;
  /** Enables a restrained hover zoom on pointer devices. */
  zoom?: boolean;
  eager?: boolean;
  className?: string;
  imgClassName?: string;
};

/**
 * Editorial image — treats photography as part of the page composition.
 * The container always reserves its aspect ratio (no layout shift) and the
 * fill reveal is driven by the entering viewport with a subtle scale-out.
 * Reduced-motion users see the image immediately.
 */
export function EditorialImage({
  src,
  alt,
  aspect = "aspect-4/3",
  position = "center",
  zoom = false,
  eager = false,
  className,
  imgClassName,
}: EditorialImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            io.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );

    io.observe(node);
    return () => io.disconnect();
  }, []);

  const shown = visible && loaded;

  return (
    <div
      ref={ref}
      className={cn("editorial-img", aspect, zoom && "editorial-img--zoom", className)}
      style={position !== "center" ? { objectPosition: position } : undefined}
    >
      <img
        src={src}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={cn("editorial-img__fit", shown && "editorial-img--in", imgClassName)}
        style={{ objectPosition: position }}
      />
    </div>
  );
}