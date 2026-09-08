import { ActionLink } from "@/components/primitives/ActionLink";
import { EyebrowLabel } from "@/components/primitives/EyebrowLabel";
import group from "@/data/group.json";
import hero from "@/assets/hero-interior.jpg";

export function HeroSection() {
  return (
    <section className="relative isolate flex min-h-[92svh] items-end overflow-hidden">
      <img
        src={hero}
        alt="Evening light in a Fabluxora Interiors residential project"
        width={1920}
        height={1088}
        className="absolute inset-0 -z-20 size-full object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{ backgroundColor: "var(--overlay-navy)" }}
      />

<div className="shell pb-24 pt-32">
        <div className="flex max-w-3xl flex-col gap-6">
          <EyebrowLabel tone="light">Since {group.founded} &mdash; The Group</EyebrowLabel>
          <h1 className="font-display text-display-lg text-on-dark">
            Two companies that finish what they start.
          </h1>
          <p className="max-w-xl text-on-dark-muted">
            Fabluxe designs and fits out interiors, and supplies the technology that lives inside
            them. One group, one accountable standard of finish.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <ActionLink href="/companies" variant="solid" tone="light">
              Explore our companies
            </ActionLink>
            <ActionLink href="/contact" variant="quiet" tone="light">
              Talk to us
            </ActionLink>
          </div>
</div>
      </div>
    </section>
  );
}
