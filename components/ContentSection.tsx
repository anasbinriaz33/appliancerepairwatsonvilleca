import type { HomeSection } from "@/content/pages/home";

export default function ContentSection({ content }: { content: HomeSection }) {
  if (!content?.sections?.length) return null;

  return (
    <section className="border-b border-line/70">
      <div className="mx-auto max-w-content px-5 py-16 lg:px-6 lg:py-24">
        <div className="max-w-none">
          {content.eyebrow ? (
            <p className="font-body text-xs font-bold uppercase tracking-[.18em] text-brass">
              {content.eyebrow}
            </p>
          ) : null}

          <h2 className="mt-3 font-display text-3xl font-bold text-paper sm:text-4xl">
            {content.heading}
          </h2>

          <div className="mt-8 space-y-10">
            {content.sections.map((section) => (
              <div key={section.heading}>
                <h3 className="font-display text-2xl font-bold text-paper">
                  {section.heading}
                </h3>

                <div className="mt-4 space-y-5">
                  {section.paragraphs.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="font-body text-base leading-8 text-muted"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
