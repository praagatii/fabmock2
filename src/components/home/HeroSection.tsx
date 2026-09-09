import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import group from "@/data/group.json";
import type { Project } from "@/components/cards/ProjectCard";
import projectsData from "@/data/projects.json";
import { getImage } from "@/lib/images";

/**
 * Cinematic banner sequence modelled on dsgninterior.se/en: a pinned stack of
 * full-viewport slides — an intro film plus stretched headline, followed by
 * one picture slide per featured project. A persistent bottom strip holds
 * contacts / address / scroll hint and the right-hand pip shows progress.
 */
const featured = [projectsData[0]!, projectsData[2]!] satisfies Project[];

export function HeroSection() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 64);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const { email, phone, addressLines } = group.contact;

  return (
    <section className="banners relative isolate bg-cocoa">
      <div className="banners__stack">
        {/* Slide 0 — intro film + headline */}
        <section className="banner" aria-label="Introduction">
          <video
            className="hero-media absolute inset-0 -z-20 size-full object-cover"
            src="/assets/hero-video.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-label="Atmospheric interior film — FAB-LUX"
          />
          <div className="hero-title">
            <span className="hero-title__inner hero-rise hero-rise--1">
              <h1 className="font-sans text-hero-xl font-medium leading-[1.04] tracking-[-0.03em]">
                two companies that
                <br className="hidden sm:block" />
                finish what they start.
              </h1>
            </span>
          </div>
        </section>

        {/* Picture slides — one featured project per viewport, like the reference */}
        {featured.map((project, i) => (
          <article key={project.id} className="banner group relative">
            <div className="banner__media">
              <img
                src={getImage(project.image)}
                alt={`${project.title}, ${project.location}`}
                loading="eager"
                decoding="async"
              />
            </div>
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-linear-to-t from-black/45 via-black/10 to-transparent"
            />
            <div className="banner__caption">
              <p className="text-eyebrow font-semibold uppercase text-bone/80">
                Project 0{i + 1} &mdash; {project.location} · {project.type}
              </p>
              <h2 className="mt-3 font-sans text-display-md font-medium lowercase tracking-[-0.02em] text-bone">
                {project.title}
              </h2>
              <p className="mt-3 max-w-md text-sm text-bone/85">{project.scope}</p>
              <span className="mt-5 inline-flex items-center gap-2 border-b border-bone/40 pb-1 text-eyebrow font-semibold uppercase text-bone transition-colors duration-300 group-hover:border-bone">
                View project
              </span>
            </div>
            {/* Full-bleed destination: keep the anchor phrasing content only so
                the HTML parser can't break the slide tree during hydration. */}
            <Link
              to="/projects/$projectId"
              params={{ projectId: project.id }}
              aria-label={`Open ${project.title} project`}
              className="absolute inset-0 z-20"
            />
          </article>
        ))}
      </div>

      {/* Right-hand progress pips (hidden for reduced motion) */}
      <div className="banners__pages" aria-hidden="true">
        {[0, ...featured].map((_, i) => (
          <span key={i} className="banner__pip" />
        ))}
      </div>

      {/* Persistent bottom strip: contacts / address / scroll hint. Tucked to
          the banner floor; while the sequence runs (JS active) it becomes
          fixed to the viewport bottom via `.banners--pin`. */}
      <div className="hero-strip">
        <div className="grid items-end gap-x-6 gap-y-4 sm:grid-cols-[auto_1fr_auto] sm:items-center">
          <nav aria-label="Contact" className="flex flex-wrap items-center gap-x-5 gap-y-1">
            <a
              href={`mailto:${email}`}
              className="text-sm text-bone transition-opacity duration-300 hover:opacity-70 sm:text-base"
            >
              {email}
            </a>
            <a
              href={`tel:${phone.replace(/\s/g, "")}`}
              className="text-sm text-bone transition-opacity duration-300 hover:opacity-70 sm:text-base"
            >
              {phone}
            </a>
          </nav>

          <p className="hidden text-sm text-bone/70 sm:block">
            {addressLines[0]} · {addressLines[1]}
          </p>

          <div
            data-scroll-hint
            className={cn(
              "pointer-events-none flex items-center gap-4 justify-self-start transition-opacity duration-700 sm:justify-self-end",
              scrolled && "opacity-0",
            )}
          >
            <span className="text-eyebrow font-medium uppercase text-bone/70">
              Scroll to explore
            </span>
            <span className="scroll-hint__line">
              <span className="scroll-hint__dot" />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}