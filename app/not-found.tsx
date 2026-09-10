import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-content flex-col items-start px-6 py-24">
      <p className="font-body text-xs uppercase tracking-wide text-brass">
        404
      </p>
      <h1 className="mt-2 font-display text-3xl text-paper">
        Can&apos;t find that page
      </h1>
      <p className="mt-3 font-body text-sm text-muted">
        The page you&apos;re looking for moved or doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-sm border border-line px-6 py-3 font-body text-sm text-paper transition-colors hover:border-brass hover:text-brass"
      >
        Back to home
      </Link>
    </section>
  );
}
