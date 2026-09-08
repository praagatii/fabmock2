import { Section } from "@/components/primitives/Section";
import { SectionHeading } from "@/components/primitives/SectionHeading";
import { Reveal } from "@/components/primitives/Reveal";
import values from "@/data/values.json";

export function ValuesSection() {
  return (
    <Section tone="white">
      <Reveal>
        <SectionHeading
          eyebrow="What we hold to"
          title="Four things we do not negotiate."
        />
      </Reveal>
      <div className="mt-14 grid gap-10 sm:grid-cols-2">
        {values.map((value) => (
          <Reveal key={value.id}>
            <article className="flex flex-col gap-3 border-t border-border-strong pt-6">
              <h3 className="font-display text-2xl text-navy">{value.title}</h3>
              <p className="text-muted-foreground">{value.body}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
