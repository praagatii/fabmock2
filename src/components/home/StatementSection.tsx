import { Section } from "@/components/primitives/Section";
import { EyebrowLabel } from "@/components/primitives/EyebrowLabel";
import { Reveal } from "@/components/primitives/Reveal";
import { StatFigure } from "@/components/primitives/StatFigure";
import group from "@/data/group.json";

export function StatementSection() {
  return (
    <Section tone="beige">
      <div className="grid gap-10 lg:grid-cols-12">
        <Reveal className="lg:col-span-8">
          <EyebrowLabel>The Fabluxe Group · est. {group.founded}</EyebrowLabel>
          <h2 className="mt-8 font-display text-display-lg leading-[1.02] text-foreground">
            Two companies,
            <br className="hidden sm:block" />
            one standard
            <br className="hidden sm:block" />
            of finish.
          </h2>
        </Reveal>
        <Reveal className="flex flex-col justify-end lg:col-span-4">
          <p className="max-w-sm text-pretty text-muted-foreground">{group.description}</p>
        </Reveal>
      </div>
      <div className="mt-20 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
        {group.stats.map((stat) => (
          <Reveal key={stat.label}>
            <StatFigure figure={stat.figure} label={stat.label} note={stat.note} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}