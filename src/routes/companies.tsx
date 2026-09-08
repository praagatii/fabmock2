import { createFileRoute } from "@tanstack/react-router";

import { PageHero } from "@/components/group/PageHero";
import { CompanySection, type CompanyDetail } from "@/components/companies/CompanySection";
import { Section } from "@/components/primitives/Section";
import { Reveal } from "@/components/primitives/Reveal";
import { SectionHeading } from "@/components/primitives/SectionHeading";
import companies from "@/data/companies.json";

const title = "Our Companies — Fabluxora Interiors and Fabluxe Home Solutions";
const description =
  "Two separate operating companies under Fabluxe Group: Fabluxora Interiors for design and turnkey fit-out, and Fabluxe Home Solutions for consumer electronics, installation and service.";

export const Route = createFileRoute("/companies")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: CompaniesPage,
});

function CompaniesPage() {
  const list = companies as CompanyDetail[];

  return (
    <>
      <PageHero
        eyebrow="Our Companies"
        title="Two companies. Separate books, one standard."
        intro="Fabluxora Interiors and Fabluxe Home Solutions are independently incorporated businesses with their own teams, contracts and websites. Fabluxe Group is the parent that holds them."
      />

      <Section tone="beige" size="compact">
        <Reveal>
          <SectionHeading
            eyebrow="How to read this page"
            title="You contract with the company, not the group."
            intro="Each section below covers one legal entity: what it sells, where it works, and where to go next. Enquiries sent through this site are routed to the right company."
          />
        </Reveal>
      </Section>

      {list.map((company, i) => (
        <CompanySection
          key={company.id}
          company={company}
          tone={i % 2 === 0 ? "white" : "beige"}
        />
      ))}
    </>
  );
}
