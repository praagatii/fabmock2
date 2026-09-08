import { cn } from "@/lib/utils";

type Variant = "solid" | "outline" | "gold" | "quiet";
type Tone = "dark" | "light";

type ActionLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  tone?: Tone;
  external?: boolean;
  className?: string;
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-xs px-6 py-3 text-eyebrow font-semibold uppercase transition-colors duration-300";

const variants: Record<Variant, Record<Tone, string>> = {
  solid: {
    dark: "bg-navy text-on-dark hover:bg-beige hover:text-navy",
    light: "bg-navy text-on-dark hover:bg-beige hover:text-navy",
  },
  outline: {
    dark: "border border-border-strong text-navy hover:border-navy hover:bg-navy hover:text-on-dark",
    light: "border border-on-dark-muted/50 text-on-dark hover:bg-surface hover:text-navy",
  },
  gold: {
    dark: "border border-gold text-navy hover:bg-gold hover:text-accent-foreground",
    light: "border border-gold text-gold hover:bg-gold hover:text-accent-foreground",
  },
  quiet: {
    dark: "px-0 py-1 text-teal hover:text-navy",
    light: "px-0 py-1 text-on-dark-muted hover:text-on-dark",
  },
};

/** Shared link/button treatment. `external` marks outbound group properties. */
export function ActionLink({
  href,
  children,
  variant = "solid",
  tone = "dark",
  external = false,
  className,
}: ActionLinkProps) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
      className={cn(base, variants[variant][tone], className)}
    >
      {children}
      {external ? <ExternalMark /> : null}
      {variant === "quiet" && !external ? <span aria-hidden="true">→</span> : null}
    </a>
  );
}

function ExternalMark() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 12 12"
      className="size-3 fill-none stroke-current"
      strokeWidth="1.4"
    >
      <path d="M4 2h6v6" />
      <path d="M10 2 2.5 9.5" />
    </svg>
  );
}
