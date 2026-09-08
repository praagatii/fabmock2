import { Link } from "@tanstack/react-router";
import { Section } from "@/components/primitives/Section";
import { SectionHeading } from "@/components/primitives/SectionHeading";
import { Reveal } from "@/components/primitives/Reveal";
import { ActionLink } from "@/components/primitives/ActionLink";
import { EditorialImage } from "@/components/primitives/EditorialImage";
import { cn } from "@/lib/utils";
import { getImage } from "@/lib/images";
import type { Project } from "@/components/cards/ProjectCard";
import projectsData from "@/data/projects.json";

const featured = {
  p1: projectsData[0]!,
  p2: projectsData[1]!,
  p3: projectsData[2]!,
  p4: projectsData[3]!,
} satisfies Record<string, Project>;

function ProjectMeta({ project, light = false }: { project: Project; light?: boolean }) {
  const meta = [project.type, project.year, project.area, project.status]
    .filter(Boolean)
    .join(" · ");
  return (
    <p
      className={cn(
        "text-eyebrow font-semibold uppercase",
        light ? "text-on-dark-muted" : "text-teal",
      )}
    >
      {meta}
    </p>
  );
}

function ProjectLabel({ index, project }: { index: number; project: Project }) {
  return (
    <p className="text-eyebrow font-semibold uppercase text-teal">
      Project 0{index} &mdash; {project.location}
    </p>
  );
}

export function ProjectsSection() {
  const { p1, p2, p3, p4 } = featured;

  return (
    <Section tone="beige">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Selected work"
            title="Work that stays standing."
            intro="Four projects, four scales, one standard of finish."
          />
          <ActionLink href="/projects" variant="quiet">
            View all projects
          </ActionLink>
        </div>
      </Reveal>

      <div className="mt-24 flex flex-col gap-y-24 sm:gap-y-32">
        <Reveal>
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <Link
              to="/projects/$projectId"
              params={{ projectId: p1.id }}
              className="group block lg:col-span-7"
            >
              <EditorialImage
                src={getImage(p1.image)}
                alt={`${p1.title}, ${p1.location}`}
                aspect="aspect-[4/3]"
                position="center 70%"
                zoom
                className="w-full"
              />
            </Link>
            <div className="flex flex-col gap-5 lg:col-span-5 lg:pb-4 lg:pl-10">
              <ProjectLabel index={1} project={p1} />
              <h3 className="font-display text-display-sm text-navy">{p1.title}</h3>
              <p className="max-w-md text-muted-foreground">{p1.scope}</p>
              <ProjectMeta project={p1} />
              <div className="mt-2">
                <ActionLink href={`/projects/${p1.id}`} variant="quiet">
                  View project
                </ActionLink>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="order-2 flex flex-col gap-5 lg:order-1 lg:col-span-5 lg:pb-4 lg:pr-10">
              <ProjectLabel index={2} project={p2} />
              <h3 className="font-display text-display-sm text-navy">{p2.title}</h3>
              <p className="max-w-md text-muted-foreground">{p2.scope}</p>
              <ProjectMeta project={p2} />
              <div className="mt-2">
                <ActionLink href={`/projects/${p2.id}`} variant="quiet">
                  View project
                </ActionLink>
              </div>
            </div>
            <Link
              to="/projects/$projectId"
              params={{ projectId: p2.id }}
              className="group order-1 block lg:order-2 lg:col-span-7"
            >
              <EditorialImage
                src={getImage(p2.image)}
                alt={`${p2.title}, ${p2.location}`}
                aspect="aspect-[3/4]"
                position="center 40%"
                zoom
                className="w-full"
              />
            </Link>
          </div>
        </Reveal>

        <Reveal delay={60}>
          <Link to="/projects/$projectId" params={{ projectId: p3.id }} className="group block">
            <div className="relative">
              <EditorialImage
                src={getImage(p3.image)}
                alt={`${p3.title}, ${p3.location}`}
                aspect="aspect-[16/10] lg:aspect-[24/10]"
                position="center 55%"
                zoom
                className="w-full"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col gap-3 bg-linear-to-t from-navy/80 via-navy/20 to-transparent p-8 pt-24 lg:p-12 lg:pt-32">
                <p className="text-eyebrow font-semibold uppercase text-on-dark">
                  Project 03 &mdash; {p3.location}
                </p>
                <h3 className="font-display text-display-md text-on-dark">{p3.title}</h3>
                <ProjectMeta project={p3} light />
              </div>
            </div>
          </Link>
        </Reveal>

        <Reveal delay={80}>
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <Link
              to="/projects/$projectId"
              params={{ projectId: p4.id }}
              className="group block lg:col-span-5"
            >
              <EditorialImage
                src={getImage(p4.image)}
                alt={`${p4.title}, ${p4.location}`}
                aspect="aspect-[4/5]"
                position="center 60%"
                zoom
                className="w-full"
              />
            </Link>
            <div className="flex flex-col gap-5 lg:col-span-6 lg:col-start-8 lg:pb-8">
              <ProjectLabel index={4} project={p4} />
              <h3 className="font-display text-display-sm text-navy">{p4.title}</h3>
              <p className="max-w-md text-muted-foreground">{p4.scope}</p>
              <ProjectMeta project={p4} />
              <div className="mt-2">
                <ActionLink href={`/projects/${p4.id}`} variant="quiet">
                  View project
                </ActionLink>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}