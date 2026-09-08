import { createFileRoute } from "@tanstack/react-router";

import { HeroSection } from "@/components/home/HeroSection";
import { StatementSection } from "@/components/home/StatementSection";
import { EditorialLead } from "@/components/home/EditorialLead";
import { ProjectsSection } from "@/components/home/ProjectsSection";
import { AwardsSection } from "@/components/home/AwardsSection";
import { EditorialGallery } from "@/components/home/EditorialGallery";
import { CompaniesSection } from "@/components/home/CompaniesSection";
import { SustainabilitySection } from "@/components/home/SustainabilitySection";
import { CsrSection } from "@/components/home/CsrSection";
import { ReviewsSection } from "@/components/home/ReviewsSection";
import { BlogSection } from "@/components/home/BlogSection";
import { EnquiryBand } from "@/components/home/EnquiryBand";

const title = "Fabluxe Group — Interiors and home technology, India";
const description =
  "Fabluxe is an Indian group of two companies: Fabluxora Interiors for design and turnkey fit-out, and Fabluxe Home Solutions for consumer electronics.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <HeroSection />
      <StatementSection />
      <EditorialLead />
      <ProjectsSection />
      <AwardsSection />
      <EditorialGallery />
      <CompaniesSection />
      <SustainabilitySection />
      <CsrSection />
      <ReviewsSection />
      <BlogSection />
      <EnquiryBand />
    </>
  );
}
