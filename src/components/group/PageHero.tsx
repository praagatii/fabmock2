import { EyebrowLabel } from "@/components/primitives/EyebrowLabel";
import { Reveal } from "@/components/primitives/Reveal";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  intro: string;
};

/** Shared inner-page masthead: navy band that sits under the fixed header. */
export function PageHero({ eyebrow, title, intro }: PageHeroProps) {
  return (
    <section className="bg-navy text-on-dark">
      <div className="shell flex flex-col gap-6 pb-section pt-32">
        <Reveal>
          <EyebrowLabel tone="light">{eyebrow}</EyebrowLabel>
        </Reveal>
        <Reveal>
          <h1 className="max-w-3xl font-display text-display-md text-on-dark">{title}</h1>
        </Reveal>
        <Reveal>
          <p className="max-w-2xl text-on-dark-muted">{intro}</p>
        </Reveal>
      </div>
    </section>
  );
}
