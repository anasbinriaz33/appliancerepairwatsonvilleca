import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site";
import { services } from "@/lib/services";

const navLinks=[{href:"/about",label:"About Us"},{href:"/contact",label:"Contact"}];

export default function Header(){
 return <header className="sticky top-0 z-50 border-b border-line/80 bg-ink/90 backdrop-blur-xl">
  <div className="mx-auto flex max-w-content items-center justify-between px-5 py-4 lg:px-6">
   <Link href="/" className="group flex items-center gap-3">
    <Image src="/images/logo/Logo.png" alt={site.brandName} width={220} height={56} priority className="h-16 w-auto" />
   </Link>
   <nav className="hidden items-center gap-9 md:flex">
    <Link href="/" className="font-body text-sm font-medium text-muted transition hover:text-paper">Home</Link>
    <div className="group relative">
     <Link href="/services" className="flex items-center gap-1.5 font-body text-sm font-medium text-muted transition hover:text-paper">
      Services
      <svg viewBox="0 0 12 8" className="h-2.5 w-2.5 fill-none stroke-current stroke-[1.6] transition-transform duration-200 group-hover:rotate-180 group-hover:text-brass">
       <path d="M1 1.5L6 6.5L11 1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
     </Link>
     <div className="invisible absolute left-1/2 top-full w-72 -translate-x-1/2 translate-y-1 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#111213] p-2 shadow-[0_20px_50px_rgba(0,0,0,.45)]">
       {services.map((s) => (
        <Link key={s.slug} href={`/services/${s.slug}`} className="block rounded-lg px-3.5 py-2.5 font-body text-sm text-paper/80 transition hover:bg-brass/10 hover:text-brass">
         {s.name}
        </Link>
       ))}
       <div className="my-1.5 border-t border-white/8" />
       <Link href="/services" className="block rounded-lg px-3.5 py-2.5 font-body text-xs font-bold uppercase tracking-[.14em] text-brass transition hover:bg-brass/10">
        View all services →
       </Link>
      </div>
     </div>
    </div>
    {navLinks.map(l=><Link key={l.href} href={l.href} className="font-body text-sm font-medium text-muted transition hover:text-paper">{l.label}</Link>)}
   </nav>
   <a href={`tel:${site.phoneHref}`} className="btn-shine inline-flex items-center gap-2 rounded-full bg-brass px-4 py-2.5 font-body text-sm font-bold text-ink shadow-[0_8px_25px_rgba(210,170,85,.15)] transition hover:-translate-y-0.5 hover:bg-brassLight">
    <span>Call Now</span><span className="hidden sm:inline">{site.phoneDisplay}</span>
   </a>
  </div>
 </header>
}
