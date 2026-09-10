import Link from "next/link";
import { site } from "@/lib/site";

type HeroProps = {
  content: {
    eyebrow: string;
    titleBefore: string;
    titleAccent: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
    trustPoints: string[];
  };
};

export default function Hero({ content }: HeroProps) {
 return <section className="relative overflow-hidden border-b border-line/70">
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_28%,rgba(210,170,85,.13),transparent_28%),radial-gradient(circle_at_15%_80%,rgba(255,255,255,.035),transparent_30%)]"/>
  <div className="relative mx-auto grid max-w-content gap-12 px-5 py-14 sm:py-20 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:gap-16 lg:px-6 lg:py-24">
   <div>
    <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brass/30 bg-brass/5 px-3 py-1.5 font-body text-xs font-semibold uppercase tracking-[.16em] text-brass"><span className="h-1.5 w-1.5 rounded-full bg-brass"/>{content.eyebrow}</div>
    <h1 className="max-w-3xl font-display text-4xl font-bold leading-[1.04] tracking-[-.025em] text-paper sm:text-5xl lg:text-6xl">{content.titleBefore} <span className="text-brass">{content.titleAccent}</span></h1>
    <p className="mt-6 max-w-xl font-body text-base leading-7 text-muted sm:text-lg">{content.description}</p>
    <div className="mt-8 flex flex-wrap gap-3">
      <a href={`tel:${site.phoneHref}`} className="btn-shine rounded-full bg-brass px-6 py-3.5 font-body text-sm font-bold text-ink transition hover:-translate-y-0.5 hover:bg-brassLight">{content.primaryCta} {site.phoneDisplay}</a>
      <Link href="/contact" className="btn-shine rounded-full border border-line bg-white/[.03] px-6 py-3.5 font-body text-sm font-semibold text-paper transition hover:border-brass/60 hover:bg-white/[.06]">{content.secondaryCta}</Link>
    </div>
    <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-line/70 pt-6">
      {content.trustPoints.map(x=><div key={x} className="flex items-center gap-2 font-body text-xs font-semibold text-paper/80"><span className="text-brass">✓</span>{x}</div>)}
    </div>
   </div>
   <div className="relative mx-auto w-full max-w-[480px]">
    <div className="absolute -inset-5 rounded-[2rem] bg-brass/10 blur-3xl"/>
    <div className="relative rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#191b1d] to-[#0f1011] p-5 shadow-2xl">
      <div className="rounded-[1.35rem] border border-white/10 bg-[#0b0c0d] p-6">
       <div className="flex items-center justify-between"><div><p className="font-body text-[10px] font-bold uppercase tracking-[.18em] text-muted">Service visit</p><p className="mt-1 font-display text-xl font-bold">Repair in progress</p></div><span className="rounded-full bg-brass/10 px-3 py-1 text-xs font-bold text-brass">ACTIVE</span></div>
       <div className="mt-7 grid grid-cols-2 gap-3">
        {[["01","Diagnose"],["02","Explain"],["03","Repair"],["04","Test"]].map(([n,t])=><div key={n} className="rounded-xl border border-white/8 bg-white/[.025] p-4"><span className="font-body text-[10px] font-bold text-brass">{n}</span><p className="mt-2 font-body text-sm font-semibold">{t}</p></div>)}
       </div>
       <div className="mt-5 rounded-xl border border-brass/20 bg-brass/[.06] p-4"><div className="flex items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-full bg-brass text-ink font-bold">✓</span><div><p className="font-body text-sm font-bold">Your repair, clearly explained</p><p className="mt-0.5 font-body text-xs text-muted">No surprise work. No mystery charges.</p></div></div></div>
      </div>
    </div>
   </div>
  </div>
 </section>
}
