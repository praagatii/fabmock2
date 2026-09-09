import { Link } from "@tanstack/react-router";
import { Section } from "@/components/primitives/Section";
import { SectionHeading } from "@/components/primitives/SectionHeading";
import { Reveal } from "@/components/primitives/Reveal";
import { ActionLink } from "@/components/primitives/ActionLink";
import type { Post } from "@/components/blog/types";
import postsData from "@/data/posts.json";

const posts = [...(postsData as Post[])]
  .sort((a, b) => b.isoDate.localeCompare(a.isoDate))
  .slice(0, 3);

export function BlogSection() {
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

      <Reveal delay={60} className="mt-16">
        <div className="divide-y divide-border border-y border-border">
          {posts.map((post) => (
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