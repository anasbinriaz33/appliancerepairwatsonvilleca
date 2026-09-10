import type { Metadata } from "next";
import CtaBand from "@/components/CtaBand";
import FAQ from "@/components/FAQ";
import { aboutContent } from "@/content/pages/about";
import { site } from "@/lib/site";

export const metadata: Metadata = aboutContent.seo;

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-line/70">
        <div className="mx-auto grid max-w-content gap-12 px-5 py-16 lg:grid-cols-[1.1fr_.9fr] lg:px-6 lg:py-24">
          <div>
            <p className="font-body text-xs font-bold uppercase tracking-[.18em] text-brass">{aboutContent.hero.eyebrow}</p>
            <h1 className="mt-3 font-display text-4xl font-bold sm:text-5xl">{aboutContent.hero.heading}</h1>
            {aboutContent.hero.paragraphs.map((paragraph) => (
              <p key={paragraph} className="mt-6 font-body text-base leading-7 text-muted">{paragraph}</p>
            ))}
            <div className="mt-8">
              <a
                href={`tel:${site.phoneHref}`}
                className="btn-shine inline-flex items-center gap-2 rounded-full bg-brass px-6 py-3.5 font-body text-sm font-bold text-ink transition hover:bg-brassLight"
              >
                <span>Call Now</span>
                <span className="hidden sm:inline">{site.phoneDisplay}</span>
              </a>
            </div>
          </div>
          <div className="rounded-[2rem] border border-white/8 bg-white/[.025] p-6 sm:p-8">
            <p className="font-body text-xs font-bold uppercase tracking-[.18em] text-muted">{aboutContent.promise.eyebrow}</p>
            <div className="mt-6 space-y-5">
              {aboutContent.promise.items.map(([number, heading, text]) => (
                <div key={number} className="flex gap-4 border-t border-line/70 pt-5">
                  <span className="font-body text-xs font-bold text-brass">{number}</span>
                  <div><h2 className="font-display text-lg font-bold">{heading}</h2><p className="mt-1 font-body text-sm leading-6 text-muted">{text}</p></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="border-b border-line/70">
        <div className="mx-auto max-w-content px-5 py-16 lg:px-6 lg:py-24">
          <div className="max-w-none">
            <p className="font-body text-xs font-bold uppercase tracking-[.18em] text-brass">{aboutContent.content.eyebrow}</p>
            <h2 className="mt-3 font-display text-3xl font-bold text-paper sm:text-4xl">{aboutContent.content.heading}</h2>
            <div className="mt-8 space-y-10">
              {aboutContent.content.sections.map((section) => (
                <div key={section.heading}>
                  <h3 className="font-display text-2xl font-bold text-paper">{section.heading}</h3>
                  <div className="mt-4 space-y-5">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph} className="font-body text-base leading-8 text-muted">{paragraph}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <FAQ
        eyebrow={aboutContent.faqs.eyebrow}
        heading={aboutContent.faqs.heading}
        items={aboutContent.faqs.items}
      />
      <CtaBand content={aboutContent.cta} />
    </>
  );
}
