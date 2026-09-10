"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Service } from "@/content/services/types";

type OtherServicesCompactProps = {
  heading: string;
  services: Service[];
};

export default function OtherServicesCompact({ heading, services }: OtherServicesCompactProps) {
  const [index, setIndex] = useState(0);
  const indexRef = useRef(0);
  const total = services.length;

  useEffect(() => {
    indexRef.current = index;
  }, [index]);

  const go = (next: number) => {
    if (total === 0) return;
    setIndex(((next % total) + total) % total);
  };

  useEffect(() => {
    if (total <= 1) return;
    const timer = window.setInterval(() => {
      go(indexRef.current + 1);
    }, 4500);
    return () => window.clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total]);

  if (total === 0) return null;
  const s = services[index];

  return (
    <div className="rounded-2xl border border-white/8 bg-white/[.025] p-6 lg:p-4 xl:p-6">
      <div className="flex items-center justify-between">
        <h2 className="font-body text-xs font-bold uppercase tracking-[.16em] text-muted">{heading}</h2>
        {total > 1 ? (
          <div className="flex items-center gap-2">
            <button
              aria-label="Previous service"
              onClick={() => go(index - 1)}
              className="grid h-7 w-7 place-items-center rounded-full border border-white/10 bg-white/[.03] text-xs text-paper transition hover:border-brass/50 hover:text-brass"
            >
              ←
            </button>
            <button
              aria-label="Next service"
              onClick={() => go(index + 1)}
              className="grid h-7 w-7 place-items-center rounded-full border border-white/10 bg-white/[.03] text-xs text-paper transition hover:border-brass/50 hover:text-brass"
            >
              →
            </button>
          </div>
        ) : null}
      </div>
      <div className="mt-4 lg:mt-3 xl:mt-4 border-t border-line pt-4 lg:pt-3 xl:pt-4">
        <Link href={`/services/${s.slug}`} className="group flex items-center gap-3">
          <div className="h-14 w-14 flex-shrink-0 overflow-hidden rounded-lg">
            <img src={s.image} alt={s.name} className="h-full w-full object-cover transition duration-300 group-hover:scale-105" />
          </div>
          <div className="min-w-0">
            <h3 className="truncate font-display text-sm font-bold text-paper transition group-hover:text-brass">{s.name}</h3>
            <span className="mt-1 block font-body text-xs font-bold text-paper/60 transition group-hover:text-paper">View service →</span>
          </div>
        </Link>
      </div>
      {total > 1 ? (
        <div className="mt-4 lg:mt-3 xl:mt-4 flex items-center justify-center gap-1.5">
          {services.map((svc, i) => (
            <button
              key={svc.slug}
              aria-label={`Go to service ${i + 1}`}
              onClick={() => go(i)}
              className={`h-1.5 rounded-full transition-all ${i === index ? "w-5 bg-brass" : "w-1.5 bg-white/20"}`}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
