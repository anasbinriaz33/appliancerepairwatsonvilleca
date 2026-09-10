"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { site } from "@/lib/site";
import { services } from "@/lib/services";

const navLinks=[{href:"/about",label:"About Us"},{href:"/contact",label:"Contact"}];

export default function Header(){
 const pathname = usePathname();
 const [menuOpen, setMenuOpen] = useState(false);
 const [servicesOpen, setServicesOpen] = useState(false);

 useEffect(() => {
  document.body.style.overflow = menuOpen ? "hidden" : "";
  return () => { document.body.style.overflow = ""; };
 }, [menuOpen]);

 return <>
 <header className="sticky top-0 z-50 border-b border-line/80 bg-ink/90 backdrop-blur-xl">
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
   <div className="flex items-center gap-3">
    <a href={`tel:${site.phoneHref}`} className="btn-shine hidden items-center gap-2 rounded-full bg-brass px-4 py-2.5 font-body text-sm font-bold text-ink shadow-[0_8px_25px_rgba(210,170,85,.15)] transition hover:-translate-y-0.5 hover:bg-brassLight md:inline-flex">
     <span>Call Now</span><span className="hidden sm:inline">{site.phoneDisplay}</span>
    </a>
    <button
     type="button"
     onClick={() => setMenuOpen(true)}
     aria-label="Open menu"
     aria-expanded={menuOpen}
     className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line/80 text-paper transition hover:border-brass hover:text-brass md:hidden"
    >
     <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-[1.8]">
      <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" />
     </svg>
    </button>
   </div>
  </div>
 </header>

 {/* Mobile drawer overlay */}
 <div
   onClick={() => setMenuOpen(false)}
   className={`fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm transition-opacity duration-300 md:hidden ${menuOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
  />

  {/* Mobile drawer panel — slides in from the left */}
  <div
   className={`fixed inset-y-0 left-0 z-[70] flex h-full w-[82%] max-w-xs flex-col bg-[#111213] shadow-[0_0_60px_rgba(0,0,0,.6)] transition-transform duration-300 ease-out md:hidden ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}
  >
   <div className="flex shrink-0 items-center justify-between border-b border-white/8 px-5 py-4">
    <Image src="/images/logo/Logo.png" alt={site.brandName} width={160} height={40} className="h-10 w-auto" />
    <button
     type="button"
     onClick={() => setMenuOpen(false)}
     aria-label="Close menu"
     className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line/80 text-paper transition hover:border-brass hover:text-brass"
    >
     <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current stroke-[1.8]">
      <path d="M4 4l16 16M20 4L4 20" strokeLinecap="round" />
     </svg>
    </button>
   </div>

   <nav className="flex min-h-0 flex-1 flex-col overflow-y-auto px-5 py-5">
    <Link
     href="/"
     onClick={() => setMenuOpen(false)}
     className={`rounded-lg px-2 py-3 font-body text-base font-medium transition hover:bg-brass/10 hover:text-brass ${
      pathname === "/" ? "bg-brass/10 text-brass" : "text-paper/90"
     }`}
    >
     Home
    </Link>

    <div className="mt-1 border-t border-white/8 pt-3">
     <button
      type="button"
      onClick={() => setServicesOpen((open) => !open)}
      aria-expanded={servicesOpen}
      className="flex w-full items-center justify-between rounded-lg px-2 py-2.5 text-left font-body text-xs font-bold uppercase tracking-[.14em] text-brass transition hover:bg-brass/10"
     >
      <span>Services</span>
      <svg viewBox="0 0 12 8" className={`h-2.5 w-2.5 fill-none stroke-current stroke-[1.8] transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`}>
       <path d="M1 1.5L6 6.5L11 1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
     </button>
     <div className={`grid transition-[grid-template-rows,opacity] duration-200 ${servicesOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
      <div className="min-h-0 overflow-hidden">
       <div className="mt-1 flex flex-col">
        {services.map((s) => {
         const href = `/services/${s.slug}`;
         const active = pathname === href;
         return (
          <Link
           key={s.slug}
           href={href}
           onClick={() => setMenuOpen(false)}
           className={`rounded-lg px-2 py-2.5 font-body text-sm transition hover:bg-brass/10 hover:text-brass ${
            active ? "bg-brass/10 text-brass" : "text-paper/80"
           }`}
          >
           {s.name}
          </Link>
         );
        })}
        <Link
         href="/services"
         onClick={() => setMenuOpen(false)}
         className={`mt-1 rounded-lg px-2 py-2.5 font-body text-xs font-bold uppercase tracking-[.14em] text-brass transition hover:bg-brass/10 ${
          pathname === "/services" ? "bg-brass/10" : ""
         }`}
        >
         View all services →
        </Link>
       </div>
      </div>
     </div>
    </div>

    <div className="mt-1 flex flex-col border-t border-white/8 pt-3">
     {navLinks.map(l=>(
      <Link
       key={l.href}
       href={l.href}
       onClick={() => setMenuOpen(false)}
       className={`rounded-lg px-2 py-3 font-body text-base font-medium transition hover:bg-brass/10 hover:text-brass ${
        pathname === l.href ? "bg-brass/10 text-brass" : "text-paper/90"
       }`}
      >
       {l.label}
      </Link>
     ))}
    </div>
   </nav>
  </div>
 </>
}
