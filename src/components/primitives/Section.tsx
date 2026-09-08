import { cn } from "@/lib/utils";

type SectionProps = {
  children: React.ReactNode;
  tone?: "beige" | "white" | "sky" | "navy";
  size?: "default" | "large" | "compact";
  id?: string;
  className?: string;
};

const toneClasses: Record<NonNullable<SectionProps["tone"]>, string> = {
  beige: "bg-background text-foreground",
  white: "bg-surface text-surface-foreground",
  sky: "bg-sky text-foreground",
  navy: "bg-navy text-on-dark",
};

const sizeClasses: Record<NonNullable<SectionProps["size"]>, string> = {
  compact: "py-14",
  default: "py-14 sm:py-[var(--spacing-section)]",
  large: "py-14 sm:py-[var(--spacing-section-lg)]",
};

export function Section({
  children,
  tone = "beige",
  size = "default",
  id,
  className,
}: SectionProps) {
  return (
    <section id={id} className={cn(toneClasses[tone], sizeClasses[size], className)}>
      <div className="shell">{children}</div>
    </section>
  );
}
