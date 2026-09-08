import { Link } from "@tanstack/react-router";
import { Section } from "@/components/primitives/Section";
import { SectionHeading } from "@/components/primitives/SectionHeading";
import { Reveal } from "@/components/primitives/Reveal";
import { ActionLink } from "@/components/primitives/ActionLink";
import { EditorialImage } from "@/components/primitives/EditorialImage";
import { getImage } from "@/lib/images";
import type { Post } from "@/components/blog/types";
import postsData from "@/data/posts.json";

const posts = [...(postsData as Post[])]
  .sort((a, b) => b.isoDate.localeCompare(a.isoDate))
  .slice(0, 3);

export function BlogSection() {
  const lead = posts[0]!;
  const rows = posts.slice(1, 3);

  return (
    <Section tone="white">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow="Notes from the group" title="Notes we write slowly." />
          <ActionLink href="/blog" variant="quiet">
            Read the blog
          </ActionLink>
        </div>
      </Reveal>

      <Reveal className="mt-16">
        <Link to="/blog/$postId" params={{ postId: lead.id }} className="group block">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <EditorialImage
                src={getImage(lead.cover)}
                alt=""
                aspect="aspect-[16/11]"
                position="center 60%"
                zoom
                className="w-full"
              />
            </div>
            <div className="flex flex-col gap-4 lg:col-span-5 lg:pb-4 lg:pl-10">
              <p className="text-eyebrow font-semibold uppercase text-teal">
                {lead.category} &mdash; {lead.date} · {lead.readTime}
              </p>
              <h3 className="font-display text-display-sm text-navy">{lead.title}</h3>
              <p className="max-w-md text-muted-foreground">{lead.excerpt}</p>
              <p className="text-eyebrow font-semibold uppercase text-navy">{lead.author}</p>
            </div>
          </div>
        </Link>
      </Reveal>

      <Reveal delay={80} className="mt-16">
        <div className="divide-y divide-border border-y border-border">
          {rows.map((post) => (
            <div key={post.id} className="grid gap-2 py-8 lg:grid-cols-12 lg:items-baseline">
              <p className="text-eyebrow font-semibold uppercase text-teal lg:col-span-3">
                {post.date} · {post.readTime}
              </p>
              <div className="flex flex-col gap-2 lg:col-span-7">
                <h3 className="font-display text-xl text-navy">
                  <Link
                    to="/blog/$postId"
                    params={{ postId: post.id }}
                    className="transition-colors duration-300 hover:text-teal"
                  >
                    {post.title}
                  </Link>
                </h3>
                <p className="max-w-xl text-sm text-muted-foreground">{post.excerpt}</p>
              </div>
              <div className="lg:col-span-2 lg:justify-self-end">
                <Link
                  to="/blog/$postId"
                  params={{ postId: post.id }}
                  aria-label={`Read ${post.title}`}
                  className="text-teal transition-colors duration-300 hover:text-navy"
                >
                  →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}