import { site } from "@/lib/site";

export default function FloatingCallButton() {
  return (
    <a
      href={`tel:${site.phoneHref}`}
      aria-label={`Call ${site.brandName} now at ${site.phoneDisplay}`}
      className="group fixed right-4 bottom-5 z-50 md:right-6 md:bottom-6"
    >
      <span className="absolute inset-0 rounded-full bg-brass opacity-70 animate-ping" />
      <span className="absolute inset-0 rounded-full bg-brass/40 blur-md" />
      <span className="relative flex items-center gap-2 rounded-full bg-brass px-4 py-3.5 text-ink shadow-lg shadow-black/40 ring-1 ring-brassLight/60 transition-transform duration-200 group-hover:scale-105 group-active:scale-95 md:px-5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-5 w-5 shrink-0"
          aria-hidden="true"
        >
          <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.61 21 3 13.39 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.24.2 2.45.57 3.57a1 1 0 0 1-.25 1.02l-2.2 2.2Z" />
        </svg>
        <span className="hidden text-sm font-semibold tracking-wide sm:inline whitespace-nowrap">
          Call Now
        </span>
      </span>
    </a>
  );
}
