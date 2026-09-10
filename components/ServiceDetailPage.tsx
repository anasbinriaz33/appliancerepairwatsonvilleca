import Link from "next/link";
import { site } from "@/lib/site";
import type { Service } from "@/content/services/types";
import { services } from "@/lib/services";
import { servicesPageContent } from "@/content/pages/services";
import CtaBand from "@/components/CtaBand";
import FAQ from "@/components/FAQ";
import OtherServicesSlider from "@/components/OtherServicesSlider";

const otherServicesSlugs = [
  "refrigerator-repair",
  "washing-machine-repair",
  "air-conditioner-repair",
  "washer-dryer-repair",
  "oven-repair",
];

function SectionContent({ service }: { service: Service }) {
  if (service.sections?.length) {
    return (
      <div className="mt-12 space-y-12">
        {service.sections.map((section) => (
          <section key={section.heading} className="scroll-mt-28">
            {section.level === 3 ? (
              <h3 className="font-display text-xl font-bold leading-tight text-paper sm:text-2xl">
                {section.heading}
              </h3>
            ) : (
              <h2 className="font-display text-2xl font-bold leading-tight text-paper sm:text-3xl">
                {section.heading}
              </h2>
            )}
            <div className="mt-5 space-y-5">
              {section.paragraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="max-w-3xl font-body text-base leading-8 text-paper/80"
                >
                  {paragraph}
                </p>
              ))}
            </div>
            {section.subsections?.length ? (
              <div className="mt-8 space-y-8 border-l border-brass/20 pl-5 sm:pl-7">
                {section.subsections.map((subsection) => (
                  <div key={subsection.heading} className="scroll-mt-28">
                    <h3 className="font-display text-xl font-bold leading-tight text-paper sm:text-2xl">
                      {subsection.heading}
                    </h3>
                    <div className="mt-4 space-y-4">
                      {subsection.paragraphs.map((paragraph) => (
                        <p
                          key={paragraph}
                          className="max-w-3xl font-body text-base leading-8 text-paper/80"
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : null}
          </section>
        ))}
      </div>
    );
  }

  return (
    <div className="mt-12 space-y-5">
      {service.body.map((paragraph) => (
        <p
          key={paragraph}
          className="max-w-3xl font-body text-base leading-8 text-paper/80"
        >
          {paragraph}
        </p>
      ))}
    </div>
  );
}

export default function ServiceDetailPage({ service }: { service: Service }) {
  const otherServices = otherServicesSlugs
    .filter((slug) => slug !== service.slug)
    .map((slug) => services.find((s) => s.slug === slug))
    .filter((s): s is Service => Boolean(s));

  return (
    <>
      <section className="border-b border-line/70 bg-[radial-gradient(circle_at_75%_15%,rgba(210,170,85,.08),transparent_30%)]">
        <div className="mx-auto grid max-w-content gap-10 px-5 py-16 lg:grid-cols-[1.25fr,.75fr] lg:px-6 lg:py-24">
          <div>
            <p className="font-body text-xs font-bold uppercase tracking-[.18em] text-brass">
              Watsonville, CA
            </p>
            <h1 className="mt-3 font-display text-4xl font-bold text-paper sm:text-5xl">
              {service.name}
            </h1>
            <p className="mt-4 max-w-3xl font-body text-base leading-8 text-muted">
              {service.heroLine}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={`tel:${site.phoneHref}`}
                className="btn-shine rounded-full bg-brass px-6 py-3.5 font-body text-sm font-medium text-ink transition-colors hover:bg-brassLight"
              >
                Call {site.phoneDisplay}
              </a>
              <Link
                href="/contact"
                className="btn-shine rounded-full border border-white/10 bg-white/[.03] px-6 py-3.5 font-body text-sm text-paper transition-colors hover:border-brass hover:text-brass"
              >
                Book this repair
              </Link>
            </div>
            <OtherServicesSlider content={servicesPageContent.otherServices} services={otherServices} />
            <SectionContent service={service} />
          </div>
          <div className="space-y-8 lg:space-y-4 xl:space-y-8">
            <div className="overflow-hidden rounded-2xl border border-white/8 bg-white/[.025]">
              <div className="relative h-64 sm:h-72 lg:h-44 xl:h-72">
                <img
                  src={service.image}
                  alt={`${service.name} in Watsonville, CA`}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
                <span className="absolute bottom-5 left-5 rounded-full border border-brass/30 bg-black/50 px-3 py-1.5 font-body text-[10px] font-bold uppercase tracking-[.18em] text-brass">
                  {service.name}
                </span>
              </div>
            </div>
            <div className="space-y-8 lg:space-y-4 xl:space-y-8 lg:sticky lg:top-20 xl:top-28 lg:self-start">
              <div className="rounded-2xl border border-white/8 bg-white/[.025] p-6 lg:p-4 xl:p-6">
                <h2 className="font-body text-xs font-bold uppercase tracking-[.16em] text-muted">
                  Common issues
                </h2>
                <ul className="mt-4 lg:mt-3 xl:mt-4 space-y-3 lg:space-y-1.5 xl:space-y-3 border-t border-line pt-4 lg:pt-3 xl:pt-4">
                  {service.commonIssues.map((issue) => (
                    <li key={issue} className="font-body text-sm text-paper/85">
                      {issue}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-white/8 bg-white/[.025] p-6 lg:p-4 xl:p-6">
                <h2 className="font-body text-xs font-bold uppercase tracking-[.16em] text-muted">
                  Brands we service
                </h2>
                <p className="mt-4 lg:mt-3 xl:mt-4 border-t border-line pt-4 lg:pt-3 xl:pt-4 font-body text-sm leading-relaxed text-paper/85">
                  {service.brands.join(", ")}, and most other major residential
                  brands.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <FAQ
        eyebrow="FAQs"
        heading={`${service.name} Questions`}
        description={`Answers to common questions about ${service.name.toLowerCase()} in Watsonville, CA.`}
        items={service.faqs ?? []}
      />
      <CtaBand
        content={{
          eyebrow: "Need a repair?",
          heading: `Need ${service.name.toLowerCase()}?`,
          description:
            "Tell us what’s wrong and we’ll help you find the next available appointment.",
        }}
      />
    </>
  );
}
