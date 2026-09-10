export type FaqItem = { question: string; answer: string };

export default function FAQ({
  eyebrow = "FAQs",
  heading = "Frequently asked questions",
  description,
  items,
}: {
  eyebrow?: string;
  heading?: string;
  description?: string;
  items: FaqItem[];
}) {
  if (!items?.length) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <section className="border-b border-line/70">
      <div className="mx-auto max-w-content px-5 py-16 lg:px-6 lg:py-24">
        <div className="max-w-2xl">
          <p className="font-body text-xs font-bold uppercase tracking-[.18em] text-brass">{eyebrow}</p>
          <h2 className="mt-3 font-display text-3xl font-bold text-paper sm:text-4xl">{heading}</h2>
          {description ? <p className="mt-4 font-body text-base leading-7 text-muted">{description}</p> : null}
        </div>
        <div className="mt-10 space-y-3">
          {items.map((item, index) => (
            <details
              key={item.question}
              open={index === 0}
              className="group rounded-2xl border border-white/8 bg-white/[.025] px-6 py-5 open:border-brass/30 open:bg-white/[.035]"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-base font-bold leading-snug text-paper [&::-webkit-details-marker]:hidden sm:text-lg">
                {item.question}
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/15 text-brass transition-transform duration-200 group-open:rotate-45">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M7 1V13M1 7H13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                </span>
              </summary>
              <p className="mt-4 max-w-3xl font-body text-sm leading-7 text-paper/80">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </section>
  );
}
