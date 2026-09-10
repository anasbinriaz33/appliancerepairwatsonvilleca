"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { services } from "@/lib/services";

type ServicesListProps = { content: { eyebrow: string; heading: string; linkText: string } };

export default function ServicesList({ content }: ServicesListProps) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(3);
  const trackRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef(0);
  const isProgrammaticScroll = useRef(false);
  const maxIndex = Math.max(0, services.length - visible);

  useEffect(() => {
    indexRef.current = index;
  }, [index]);

  useEffect(() => {
    const updateVisible = () => setVisible(window.innerWidth <= 640 ? 1 : window.innerWidth <= 900 ? 2 : 3);
    updateVisible();
    window.addEventListener("resize", updateVisible);
    return () => window.removeEventListener("resize", updateVisible);
  }, []);

  useEffect(() => {
    setIndex((current: number) => Math.min(current, maxIndex));
  }, [maxIndex]);

  // Scrolls the track to the given card index (used by arrows, dots, autoplay)
  const scrollToIndex = useCallback(
    (next: number) => {
      const track = trackRef.current;
      const clamped = Math.min(Math.max(next, 0), maxIndex);
      const card = track?.children[clamped] as HTMLElement | undefined;
      if (track && card) {
        isProgrammaticScroll.current = true;
        track.scrollTo({ left: card.offsetLeft, behavior: "smooth" });
      }
      setIndex(clamped);
    },
    [maxIndex]
  );

  const go = (next: number) => scrollToIndex(next);

  useEffect(() => {
    const timer = window.setInterval(() => {
      const next = indexRef.current >= maxIndex ? 0 : indexRef.current + 1;
      scrollToIndex(next);
    }, 4500);
    return () => window.clearInterval(timer);
  }, [maxIndex, scrollToIndex]);

  // Keep the active dot in sync when the user scrolls manually (touch, trackpad, drag)
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let raf = 0;

    const handleScroll = () => {
      if (isProgrammaticScroll.current) {
        isProgrammaticScroll.current = false;
        return;
      }
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const cards = Array.from(track.children) as HTMLElement[];
        let closest = 0;
        let smallestDiff = Infinity;
        cards.forEach((card, i) => {
          const diff = Math.abs(card.offsetLeft - track.scrollLeft);
          if (diff < smallestDiff) {
            smallestDiff = diff;
            closest = i;
          }
        });
        setIndex(Math.min(closest, maxIndex));
      });
    };

    track.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      track.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(raf);
    };
  }, [maxIndex]);

  // Click-and-drag support for mouse/trackpad users (touch already scrolls natively)
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let isDown = false;
    let didDrag = false;
    let startX = 0;
    let startScroll = 0;

    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      isDown = true;
      didDrag = false;
      startX = e.clientX;
      startScroll = track.scrollLeft;
      track.classList.add("dragging");
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!isDown) return;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 5) didDrag = true;
      track.scrollLeft = startScroll - dx;
    };
    const stopDrag = () => {
      isDown = false;
      track.classList.remove("dragging");
    };
    // Prevent the card link from navigating right after a drag
    const onClickCapture = (e: MouseEvent) => {
      if (didDrag) {
        e.preventDefault();
        e.stopPropagation();
        didDrag = false;
      }
    };

    track.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", stopDrag);
    track.addEventListener("pointerleave", stopDrag);
    track.addEventListener("click", onClickCapture, true);
    return () => {
      track.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", stopDrag);
      track.removeEventListener("pointerleave", stopDrag);
      track.removeEventListener("click", onClickCapture, true);
    };
  }, []);

  return (
    <section className="border-b border-line/70 bg-[#0d0e0f]">
      <div className="mx-auto max-w-content px-5 py-16 lg:px-6 lg:py-20">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="font-body text-xs font-bold uppercase tracking-[.18em] text-brass">{content.eyebrow}</p>
            <h2 className="mt-2 font-display text-3xl font-bold text-paper sm:text-4xl">{content.heading}</h2>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/services" className="mr-2 font-body text-sm font-bold text-paper transition hover:text-brass">{content.linkText}</Link>
            <button aria-label="Previous services" onClick={() => go(index - 1)} className="service-arrow">←</button>
            <button aria-label="Next services" onClick={() => go(index + 1)} className="service-arrow">→</button>
          </div>
        </div>

        <div className="service-track mt-10" ref={trackRef}>
          {services.map((s, i) => (
            <Link key={s.slug} href={`/services/${s.slug}`} className="service-card group">
              <div className="service-card-image">
                <img src={s.image} alt={s.name} loading="lazy" draggable={false} />
                <span className="service-number">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <div className="p-5">
                <h3 className="font-display text-xl font-bold text-paper transition group-hover:text-brass">{s.name}</h3>
                <p className="mt-2 font-body text-sm leading-6 text-muted">{s.shortDescription}</p>
                <span className="mt-5 inline-block font-body text-xs font-bold text-paper/70 transition group-hover:text-paper">View service →</span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-7 flex items-center justify-center gap-2">
          {services.map((s, i) => <button key={s.slug} aria-label={`Go to service ${i + 1}`} onClick={() => go(Math.min(i, maxIndex))} className={`service-dot ${i >= index && i <= index + visible - 1 ? "active" : ""}`} />)}
        </div>
      </div>
    </section>
  );
}
