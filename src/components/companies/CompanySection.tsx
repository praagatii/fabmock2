import { Section } from "@/components/primitives/Section";
import { Reveal } from "@/components/primitives/Reveal";
import { EyebrowLabel } from "@/components/primitives/EyebrowLabel";
import { ActionLink } from "@/components/primitives/ActionLink";
import { getImage } from "@/lib/images";

export type CompanyDetail = {
  id: string;
  name: string;
  sector: string;
  monogram: string;
  legalName: string;
  incorporated: string;
  oneLiner: string;
  description: string;
  offer: string[];
  serviceAreas: string[];
  gallery: string[];
  url: string;
};

type CompanySectionProps = {
  company: CompanyDetail;
  tone?: "beige" | "white" | "navy";
};

/** One long section per operating company. Each is a separate legal entity. */
export function CompanySection({ company, tone = "white" }: CompanySectionProps) {
  return (
    <Section tone={tone} id={company.id} size="large">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="flex flex-col gap-6 lg:col-span-4">
          <Reveal>
            {/* Logo placeholder — designer will replace with the company mark. */}
            <div
              aria-hidden="true"
              className="flex size-24 items-center justify-center border border-border-strong bg-surface font-display text-2xl text-navy"
            >
              {company.monogram}
            </div>
          </Reveal>
          <Reveal delay={60}>
            <EyebrowLabel>{company.sector}</EyebrowLabel>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="font-display text-display-sm text-navy">{company.name}</h2>
          </Reveal>
          <Reveal delay={140}>
            <div className="flex flex-col gap-1 border-t border-border pt-4 text-sm text-muted-foreground">
              <span>{company.legalName}</span>
              <span>{company.incorporated}</span>
              <span>A separate legal entity within Fabluxe Group.</span>
            </div>
          </Reveal>
          <Reveal delay={180}>
            <ActionLink href={company.url} variant="gold" external className="self-start">
              Visit {company.name}
            </ActionLink>
          </Reveal>
        </div>

        <div className="flex flex-col gap-10 lg:col-span-8">
          <Reveal>
            <p className="font-display text-2xl text-navy">{company.oneLiner}</p>
          </Reveal>
          <Reveal delay={60}>
            <p className="max-w-2xl text-teal">{company.description}</p>
          </Reveal>

          <div className="grid gap-10 sm:grid-cols-2">
            <Reveal delay={100}>
              <div className="flex flex-col gap-4">
                <EyebrowLabel>What they do</EyebrowLabel>
                <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
                  {company.offer.map((item) => (
                    <li key={item} className="border-b border-border pb-2">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={140}>
              <div className="flex flex-col gap-4">
                <EyebrowLabel>Where they work</EyebrowLabel>
                <ul className="flex flex-wrap gap-2">
                  {company.serviceAreas.map((area) => (
                    <li
                      key={area}
                      className="border border-border-strong px-3 py-1.5 text-eyebrow font-semibold uppercase text-teal"
                    >
                      {area}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          <Reveal delay={180}>
            <ul className="grid gap-4 sm:grid-cols-3">
              {company.gallery.map((image, i) => (
                <li key={image} className="group overflow-hidden bg-sky">
                  <img
                    src={getImage(image)}
                    alt={`${company.name} — image ${i + 1}`}
                    loading="lazy"
                    width={1200}
                    height={900}
                    className="media-zoom aspect-4/3 w-full object-cover"
                  />
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
