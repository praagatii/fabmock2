import { Section } from "@/components/primitives/Section";
import { EyebrowLabel } from "@/components/primitives/EyebrowLabel";
import { Reveal } from "@/components/primitives/Reveal";
import { ActionLink } from "@/components/primitives/ActionLink";
import { EditorialImage } from "@/components/primitives/EditorialImage";
import { getImage } from "@/lib/images";
import group from "@/data/group.json";

export function EditorialLead() {
  return (
    <Section tone="beige" className="sm:pt-0">
      <Reveal>
        <div className="relative">
          <EditorialImage
            src={getImage("hero-interior")}
            alt="Turnkey interior by Fabluxora, finished and furnished end to end"
            aspect="aspect-[16/10] sm:aspect-[16/8]"
            position="center 62%"
            zoom
            eager
            className="w-full"
          />
        </div>
        <div className="mt-8 grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <EyebrowLabel>Statement of work</EyebrowLabel>
            <p className="mt-4 max-w-xl text-pretty text-foreground">
              From the first measurement to the last device on the wall, one team owns the
              result: Fabluxora builds it, Fabluxe Home Solutions makes it live.
            </p>
          </div>
          <div className="flex items-end lg:col-span-5 lg:justify-end">
            <p className="text-sm text-muted-foreground">
              {group.founded} &mdash; two companies, {group.stats[1]?.figure ?? "2,400+"} projects
              delivered.
            </p>
          </div>
        </div>
      </Reveal>
      <div className="mt-12 flex items-center gap-6">
        <span className="gold-rule w-16" aria-hidden="true" />
        <ActionLink href="/the-group" variant="quiet">
          More about the group
        </ActionLink>
      </div>
    </Section>
  );
}