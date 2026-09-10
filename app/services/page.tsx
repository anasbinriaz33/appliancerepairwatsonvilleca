import type { Metadata } from "next";
import Link from "next/link";
import { servicesPageContent } from "@/content/pages/services";
import { services } from "@/lib/services";
import CtaBand from "@/components/CtaBand";
import FAQ from "@/components/FAQ";

export const metadata: Metadata = servicesPageContent.seo;

export default function ServicesPage() {
  return (
    <>
      <section className="border-b border-line/70">
        <div className="mx-auto max-w-content px-5 py-16 lg:px-6 lg:py-24">
          <p className="font-body text-xs font-bold uppercase tracking-[.18em] text-brass">{servicesPageContent.hero.eyebrow}</p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold sm:text-5xl">{servicesPageContent.hero.heading}</h1>
          <p className="mt-5 max-w-2xl font-body text-base leading-7 text-muted">{servicesPageContent.hero.description}</p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <Link key={s.slug} href={`/services/${s.slug}`} className="group overflow-hidden rounded-2xl border border-white/8 bg-white/[.025] transition duration-200 hover:-translate-y-1 hover:border-brass/35">
                <div className="relative h-48 overflow-hidden">
                  <img src={s.image} alt={`${s.name} in Watsonville, CA`} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                  <span className="absolute bottom-4 left-5 font-body text-xs font-bold text-brass">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <div className="p-6">
                  <h2 className="font-display text-2xl font-bold group-hover:text-brass">{s.name}</h2>
                  <p className="mt-2 font-body text-sm leading-6 text-muted">{s.shortDescription}</p>
                  <span className="mt-6 block font-body text-xs font-bold text-paper/70">{servicesPageContent.cardLink}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <FAQ
        eyebrow={servicesPageContent.faqs.eyebrow}
        heading={servicesPageContent.faqs.heading}
        items={servicesPageContent.faqs.items}
      />
      <CtaBand content={{ eyebrow: "Need a repair?", heading: "Let’s get your appliance working again.", description: "Tell us what’s wrong and we’ll help you find the next available appointment." }} />
    </>
  );
}
