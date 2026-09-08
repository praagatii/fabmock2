import { cn } from "@/lib/utils";
import { EyebrowLabel } from "./EyebrowLabel";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  intro?: string | undefined;
  tone?: "dark" | "light";
  align?: "start" | "center";
  as?: "h1" | "h2" | "h3";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  intro,
  tone = "dark",
  align = "start",
  as: Tag = "h2",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex max-w-2xl flex-col gap-4",
        align === "center" && "mx-auto items-center text-center",
        className,
      )}
    >
      <EyebrowLabel tone={tone}>{eyebrow}</EyebrowLabel>
      <Tag
        className={cn(
          "text-display-sm font-display",
          tone === "dark" ? "text-foreground" : "text-on-dark",
        )}
      >
        {title}
      </Tag>
      {intro ? (
        <p className={cn("text-balance", tone === "dark" ? "text-muted-foreground" : "text-on-dark-muted")}>
          {intro}
        </p>
      ) : null}
    </div>
  );
}
