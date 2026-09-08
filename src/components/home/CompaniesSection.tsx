import { Section } from "@/components/primitives/Section";
import { SectionHeading } from "@/components/primitives/SectionHeading";
import { Reveal } from "@/components/primitives/Reveal";
import { ActionLink } from "@/components/primitives/ActionLink";
import { EditorialImage } from "@/components/primitives/EditorialImage";
import { cn } from "@/lib/utils";
import { getImage } from "@/lib/images";
import type { Company } from "@/components/cards/CompanyCard";
import companiesData from "@/data/companies.json";

// Interiors first (image-led), Home Solutions second — alternates sides and ratios.
const companiesOrdered = [companiesData[1], companiesData[0]] as Company[];

function CompanyFeature({
  company,
  index,
  flip = false,
}: {
  company: Company;
  index: number;
  flip?: boolean;
}) {
  const imageKey = company.id === "interiors" ? "interiors" : "home-solutions";
  const aspect = company.id === "interiors" ? "aspect-[3/4]" : "aspect-[4/3]";
  const label = `0${index + 1}`;

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
      <div
        className={cn(
          "flex flex-col gap-5 lg:col-span-6",
          flip ? "lg:order-2 lg:pl-16" : "lg:pr-16",
        )}
      >
        <p className="text-eyebrow font-semibold uppercase text-teal">
          {label} &mdash; {company.sector}
        </p>
        <h3 className="font-display text-display-md text-navy">{company.name}</h3>
        <p className="max-w-md text-pretty text-muted-foreground">{company.oneLiner}</p>
        <div className="mt-2">
          <ActionLink href={company.url} variant="gold" external>
            Visit the company site
          </ActionLink>
        </div>
      </div>
      <div className={cn("lg:col-span-6", flip && "lg:order-1")}>
        <EditorialImage
          src={getImage(imageKey)}
          alt={company.name}
          aspect={aspect}
          position={company.id === "interiors" ? "center 62%" : "center 55%"}
          zoom
          className="w-full"
        />
      </div>
    </div>
  );
}

export function CompaniesSection() {
  return (
    <Section tone="beige">
      <Reveal>
        <SectionHeading
          eyebrow="Our companies"
          title="Two businesses, one standard."
          intro="Each company runs its own team, its own sites and its own clients. What they share is the way work is planned, checked and handed over."
        />
      </Reveal>
      <div className="mt-24 flex flex-col gap-y-24 sm:gap-y-32">
        {companiesOrdered.map((company, i) => (
          <Reveal key={company.id} delay={i * 80}>
            <CompanyFeature company={company} index={i} flip={i % 2 === 1} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}