import { Section } from "@/components/primitives/Section";
import { SectionHeading } from "@/components/primitives/SectionHeading";
import { Reveal } from "@/components/primitives/Reveal";
import { ActionLink } from "@/components/primitives/ActionLink";
import { ProjectCard } from "@/components/cards/ProjectCard";
import projects from "@/data/projects.json";

export function ProjectsSection() {
  return (
    <Section tone="beige">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Featured projects"
            title="Recent work from Fabluxora Interiors."
          />
          <ActionLink href="/projects" variant="quiet">
            View all projects
          </ActionLink>
        </div>
      </Reveal>
      <div className="mt-14 grid gap-8 md:grid-cols-3">
        {projects.slice(0, 3).map((project) => (
          <Reveal key={project.id}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
