import { Section } from "@/components/primitives/Section";
import { SectionHeading } from "@/components/primitives/SectionHeading";
import { Reveal } from "@/components/primitives/Reveal";
import { PersonCard, type Person } from "./PersonCard";

type PeopleGridProps = {
  eyebrow: string;
  title: string;
  intro?: string | undefined;
  people: Person[];
  tone?: "beige" | "white" | "navy";
  size?: "default" | "compact";
  onOpen: (person: Person) => void;
};

export function PeopleGrid({
  eyebrow,
  title,
  intro,
  people,
  tone = "white",
  size = "default",
  onOpen,
}: PeopleGridProps) {
  return (
    <Section tone={tone}>
      <Reveal>
        <SectionHeading eyebrow={eyebrow} title={title} intro={intro} />
      </Reveal>
      <div
        className={
          size === "compact"
            ? "mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            : "mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4"
        }
      >
        {people.map((person, i) => (
          <Reveal key={person.id} delay={Math.min(i * 60, 300)}>
            <PersonCard person={person} size={size} onOpen={onOpen} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
