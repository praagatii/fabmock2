import { ActionLink } from "@/components/primitives/ActionLink";
import { getImage } from "@/lib/images";

export type Company = {
  id: string;
  name: string;
  sector: string;
  oneLiner: string;
  footerLine: string;
  url: string;
};

export function CompanyCard({ company }: { company: Company }) {
  return (
    <article className="group flex h-full flex-col bg-surface">
      <div className="overflow-hidden">
        <img
          src={getImage(company.id)}
          alt={company.name}
          loading="lazy"
          width={1200}
          height={900}
          className="media-zoom aspect-3/2 w-full object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col gap-4 p-8">
        <p className="text-eyebrow font-semibold uppercase text-teal">{company.sector}</p>
        <h3 className="font-display text-heading text-navy">{company.name}</h3>
        <p className="text-muted-foreground">{company.oneLiner}</p>
        <div className="mt-auto pt-4">
          <ActionLink href={company.url} variant="gold" external>
            Visit site
          </ActionLink>
        </div>
      </div>
    </article>
  );
}
