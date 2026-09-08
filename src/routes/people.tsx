import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { PageHero } from "@/components/group/PageHero";
import { DirectorsSection } from "@/components/people/DirectorsSection";
import { PeopleGrid } from "@/components/people/PeopleGrid";
import { PersonDialog } from "@/components/people/PersonDialog";
import type { Person } from "@/components/people/PersonCard";
import people from "@/data/people.json";

const title = "People — Directors, leadership and team at Fabluxe";
const description =
  "Meet the people behind Fabluxe: founders Preet Sahni and Raghu Menon, the leadership of both operating companies, and the designers, engineers and service team who deliver the work.";

export const Route = createFileRoute("/people")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: PeoplePage,
});

function PeoplePage() {
  const [selected, setSelected] = useState<Person | null>(null);

  return (
    <>
      <PageHero
        eyebrow="People"
        title="The group is only as good as the people who sign the drawings."
        intro="Every project is owned by a named person from first sketch to final snag. These are the people who own them."
      />

      <DirectorsSection directors={people.directors} onOpen={setSelected} />

      <PeopleGrid
        eyebrow="Leadership"
        title="Who runs each part of the group."
        intro="Four leaders carry design, electronics, delivery and manufacturing between them."
        people={people.leadership}
        tone="white"
        onOpen={setSelected}
      />

      <PeopleGrid
        eyebrow="The team"
        title="The people you will actually work with."
        intro="Designers, engineers and service leads across Mumbai, Pune and Bengaluru. Select anyone to read more."
        people={people.team}
        tone="beige"
        size="compact"
        onOpen={setSelected}
      />

      <PersonDialog person={selected} onClose={() => setSelected(null)} />
    </>
  );
}
