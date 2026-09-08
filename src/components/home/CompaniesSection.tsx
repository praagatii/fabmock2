import { Section } from "@/components/primitives/Section";
import { SectionHeading } from "@/components/primitives/SectionHeading";
import { Reveal } from "@/components/primitives/Reveal";
import { CompanyCard } from "@/components/cards/CompanyCard";
import companies from "@/data/companies.json";

export function CompaniesSection() {
  return (
    <Section tone="white">
      <Reveal>
        <SectionHeading
          eyebrow="Our Companies"
          title="Two businesses, one group standard."
          intro="Each company runs its own team, its own sites and its own clients. What they share is the way work is planned, checked and handed over."
        />
      </Reveal>
      <div className="mt-14 grid gap-8 lg:grid-cols-2">
        {companies.map((company, i) => (
          <Reveal key={company.id} className="h-full">
            <CompanyCard company={company} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
