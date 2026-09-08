import { Section } from "@/components/primitives/Section";
import { EyebrowLabel } from "@/components/primitives/EyebrowLabel";
import { Reveal } from "@/components/primitives/Reveal";
import { ActionLink } from "@/components/primitives/ActionLink";
import csrUpdates from "@/data/csr.json";
import image from "@/assets/csr.jpg";

export function CsrSection() {
  const update = csrUpdates[0];
  if (!update) return null;

  return (
    <Section tone="white">
      <Reveal>
        <article className="group grid overflow-hidden bg-beige lg:grid-cols-2">
          <div className="overflow-hidden">
            <img
              src={image}
              alt="Fabluxe volunteers refitting a classroom"
              loading="lazy"
              width={1400}
              height={800}
              className="media-zoom size-full min-h-72 object-cover"
            />
          </div>
          <div className="flex flex-col gap-4 p-10">
            <EyebrowLabel>Latest CSR update</EyebrowLabel>
            <h2 className="font-display text-display-sm text-navy">{update.title}</h2>
            <p className="text-muted-foreground">{update.summary}</p>
            <p className="text-sm text-teal">
              {update.date} · {update.partner}
            </p>
            <ActionLink href="/csr" variant="quiet" className="mt-2 self-start">
              Read the CSR report
            </ActionLink>
          </div>
        </article>
      </Reveal>
    </Section>
  );
}
