"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Service } from "@/content/services/types";

type OtherServicesSliderProps = {
  content: { eyebrow: string; heading: string };
  services: Service[];
};

export default function OtherServicesSlider({ content, services }: OtherServicesSliderProps) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(2);
  const trackRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef(0);
  const isProgrammaticScroll = useRef(false);
  const maxIndex = Math.max(0, services.length - visible);

  useEffect(() => {
    indexRef.current = index;
  }, [index]);

  useEffect(() => {
    const updateVisible = () => setVisible(window.innerWidth <= 640 ? 1 : 2);
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
    const DRAG_THRESHOLD = 8; // px of movement before a mousedown counts as a drag, not a click
    let pointerId: number | null = null;
    let isDragging = false;
    let didDrag = false;
    let startX = 0;
    let startScroll = 0;

    // Only arm on mousedown - we don't capture the pointer or touch scroll
    // behaviour yet, so a plain click on a card still reaches the <Link>
    // untouched and navigates normally.
    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      pointerId = e.pointerId;
      isDragging = false;
      didDrag = false;
      startX = e.clientX;
      startScroll = track.scrollLeft;
    };
    const onPointerMove = (e: PointerEvent) => {
      if (pointerId === null || e.pointerId !== pointerId) return;
      const dx = e.clientX - startX;
      if (!isDragging) {
        if (Math.abs(dx) < DRAG_THRESHOLD) return;
        // Movement just crossed the threshold: this is now a real drag.
        // Only now do we take pointer capture and hijack scrolling, so
        // ordinary clicks never touch this path at all.
        isDragging = true;
        didDrag = true;
        track.classList.add("dragging");
        track.setPointerCapture(e.pointerId);
      }
      track.scrollLeft = startScroll - dx;
      e.preventDefault();
    };
    const stopDrag = (e: PointerEvent) => {
      if (pointerId === null || e.pointerId !== pointerId) return;
      if (isDragging && track.hasPointerCapture(e.pointerId)) {
        track.releasePointerCapture(e.pointerId);
      }
      isDragging = false;
      pointerId = null;
      track.classList.remove("dragging");
    };
    // Prevent the card link from navigating right after a genuine drag
    const onClickCapture = (e: MouseEvent) => {
      if (didDrag) {
        e.preventDefault();
        e.stopPropagation();
      }
      didDrag = false;
    };
    // Let mouse wheel / trackpad scroll move the slider horizontally too
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
      track.scrollLeft += e.deltaY;
      e.preventDefault();
    };

    track.addEventListener("pointerdown", onPointerDown);
    track.addEventListener("pointermove", onPointerMove);
    track.addEventListener("pointerup", stopDrag);
    track.addEventListener("pointercancel", stopDrag);
    track.addEventListener("click", onClickCapture, true);
    track.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      track.removeEventListener("pointerdown", onPointerDown);
      track.removeEventListener("pointermove", onPointerMove);
      track.removeEventListener("pointerup", stopDrag);
      track.removeEventListener("pointercancel", stopDrag);
      track.removeEventListener("click", onClickCapture, true);
      track.removeEventListener("wheel", onWheel);
    };
  }, []);

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between gap-4">
        <h2 className="font-display text-lg font-bold text-paper sm:text-xl">{content.heading}</h2>
        <div className="flex items-center gap-2">
          <button aria-label="Previous services" onClick={() => go(index - 1)} className="other-service-arrow">←</button>
          <button aria-label="Next services" onClick={() => go(index + 1)} className="other-service-arrow">→</button>
        </div>
      </div>

      <div className="other-service-track mt-4" ref={trackRef}>
        {services.map((s, i) => (
          <Link key={s.slug} href={`/services/${s.slug}`} className="other-service-card group">
            <div className="other-service-card-image">
              <img src={s.image} alt={s.name} loading="lazy" draggable={false} />
            </div>
            <div className="p-3">
              <h3 className="font-display text-sm font-bold text-paper transition group-hover:text-brass">{s.name}</h3>
              <span className="mt-1 inline-block font-body text-[11px] font-bold text-paper/60 transition group-hover:text-paper">View service →</span>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-3 flex items-center gap-2">
        {services.map((s, i) => <button key={s.slug} aria-label={`Go to service ${i + 1}`} onClick={() => go(Math.min(i, maxIndex))} className={`other-service-dot ${i >= index && i <= index + visible - 1 ? "active" : ""}`} />)}
      </div>
    </div>
  );
}
