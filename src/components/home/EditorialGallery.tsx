import { Section } from "@/components/primitives/Section";
import { SectionHeading } from "@/components/primitives/SectionHeading";
import { Reveal } from "@/components/primitives/Reveal";
import { EditorialImage } from "@/components/primitives/EditorialImage";
import { getImage } from "@/lib/images";

function GalleryCaption({ label, note }: { label: string; note: string }) {
  return (
    <div className="mt-4 flex flex-col gap-2">
      <span className="text-eyebrow font-semibold uppercase text-gold">{label}</span>
      <span className="text-sm text-muted-foreground">{note}</span>
    </div>
  );
}

export function EditorialGallery() {
  return (
    <Section tone="white">
      <Reveal>
        <SectionHeading
          eyebrow="Across the group"
          title="Rooms, works and the teams that keep them."
        />
      </Reveal>
      <div className="mt-16 grid gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <EditorialImage
            src={getImage("sustain-1")}
            alt="Joinery production at the Vasai works"
            aspect="aspect-[3/4]"
            position="center 50%"
            zoom
            className="w-full"
          />
          <GalleryCaption label="Vasai works" note="Most of what ships into a project is made here" />
        </Reveal>
        <div className="flex flex-col gap-12 lg:col-span-7 lg:pt-24">
          <Reveal delay={60}>
            <EditorialImage
              src={getImage("showroom-1")}
              alt="Fabluxe Home Solutions showroom"
              aspect="aspect-[16/9]"
              position="center 60%"
              zoom
              className="w-full"
            />
            <GalleryCaption
              label="Showroom, Bandra"
              note="Specify, install and service under one roof"
            />
          </Reveal>
          <Reveal delay={100} className="lg:pl-24">
            <EditorialImage
              src={getImage("csr-2")}
              alt="Fabluxe handover and training teams"
              aspect="aspect-[16/10]"
              position="center 45%"
              zoom
              className="w-full"
            />
            <GalleryCaption label="Field teams" note="Engineers in every city the group builds in" />
          </Reveal>
        </div>
      </div>
    </Section>
  );
}