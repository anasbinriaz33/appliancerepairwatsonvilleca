import type { Metadata } from "next";
import Hero from "@/components/Hero";
import ServicesList from "@/components/ServicesList";
import ServiceAreaStrip from "@/components/ServiceAreaStrip";
import ContentSection from "@/components/ContentSection";
import CtaBand from "@/components/CtaBand";
import FAQ from "@/components/FAQ";
import { homeContent } from "@/content/pages/home";

export const metadata: Metadata = homeContent.seo;

export default function HomePage() {
  return (
    <>
      <Hero content={homeContent.hero} />
      <ServicesList content={homeContent.services} />
      <ServiceAreaStrip content={homeContent.serviceArea} />
      <ContentSection content={homeContent.content} />
      <FAQ
        eyebrow={homeContent.faqs.eyebrow}
        heading={homeContent.faqs.heading}
        description={homeContent.faqs.description}
        items={homeContent.faqs.items}
      />
      <CtaBand content={homeContent.cta} />
    </>
  );
}
