import { Section } from "@/components/primitives/Section";
import { SectionHeading } from "@/components/primitives/SectionHeading";
import { Reveal } from "@/components/primitives/Reveal";
import { ActionLink } from "@/components/primitives/ActionLink";
import { BlogCard } from "@/components/blog/BlogCard";
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
          <SectionHeading eyebrow="From the group" title="Notes from our teams." />
          <ActionLink href="/blog" variant="quiet">
            Read the blog
          </ActionLink>
        </div>
      </Reveal>
      <div className="mt-14 grid gap-8 md:grid-cols-3">
        {posts.map((post) => (
          <Reveal key={post.id} className="h-full">
            <BlogCard post={post} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
