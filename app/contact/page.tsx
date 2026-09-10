import type { Metadata } from "next";
import BookingForm from "@/components/BookingForm";
import FAQ from "@/components/FAQ";
import { site } from "@/lib/site";
import { contactContent } from "@/content/pages/contact";

export const metadata: Metadata = contactContent.seo;

export default function ContactPage() {
  return (
    <>
    <section className="border-b border-line/70">
      <div className="mx-auto grid max-w-content gap-12 px-5 py-16 lg:grid-cols-[.72fr_1.28fr] lg:px-6 lg:py-24">
        <div>
          <p className="font-body text-xs font-bold uppercase tracking-[.18em] text-brass">{contactContent.hero.eyebrow}</p>
          <h1 className="mt-3 font-display text-4xl font-bold sm:text-5xl">{contactContent.hero.heading}</h1>
          <p className="mt-5 font-body text-base leading-7 text-muted">{contactContent.hero.description}</p>
          <div className="mt-8 space-y-5">
            {[["Phone", site.phoneDisplay], ["Email", site.email], ["Location", contactContent.hero.location]].map(([label, value]) => (
              <div key={label} className="border-t border-line/70 pt-4">
                <p className="font-body text-xs font-bold uppercase tracking-[.15em] text-muted">{label}</p>
                <p className="mt-1 font-body text-sm font-semibold text-paper">{value}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-[2rem] border border-white/8 bg-white/[.025] p-6 sm:p-8"><BookingForm /></div>
      </div>
    </section>
    <section className="border-b border-line/70">
      <div className="mx-auto max-w-content px-5 py-16 lg:px-6 lg:py-24">
        <div className="max-w-none">
          <p className="font-body text-xs font-bold uppercase tracking-[.18em] text-brass">{contactContent.content.eyebrow}</p>
          <h2 className="mt-3 font-display text-3xl font-bold text-paper sm:text-4xl">{contactContent.content.heading}</h2>
          <div className="mt-8 space-y-10">
            {contactContent.content.sections.map((section) => (
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
      eyebrow={contactContent.faqs.eyebrow}
      heading={contactContent.faqs.heading}
      items={contactContent.faqs.items}
    />
    </>
  );
}
