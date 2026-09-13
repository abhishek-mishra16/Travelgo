'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Menu, X, ChevronDown, UserRound } from 'lucide-react';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => { const f = () => setScrolled(window.scrollY > 30); window.addEventListener('scroll', f); return () => window.removeEventListener('scroll', f); }, []);
  const links = [['Bus','/search?mode=BUS'],['Train','/search?mode=TRAIN'],['Flight','/search?mode=FLIGHT'],['Hotels','/hotels'],['Explore India','/destinations'],['Offers','/offers']];
  return <header className={`fixed top-0 z-50 w-full transition-all duration-300 ${scrolled ? 'bg-white/95 shadow-sm backdrop-blur-xl' : 'bg-white/65 backdrop-blur-md'}`}>
    <div className="container-x flex h-[72px] items-center justify-between gap-5">
      <Link href="/" className="flex items-center gap-2.5">
        <span className="brand-mark grid h-11 w-11 place-items-center rounded-full bg-navy text-white shadow-lg"><span className="text-xl">✈</span></span>
        <span><span className="block text-[22px] font-black tracking-tight">Travel<span className="text-orange">Go</span></span><span className="block -mt-1 text-[9px] font-bold text-slate-500">India, Your Way.</span></span>
      </Link>
      <nav className="hidden items-center gap-6 lg:flex">{links.map(([l,h]) => <Link key={l} href={h} className="text-[13px] font-bold text-navy transition hover:text-orange">{l}</Link>)}</nav>
      <div className="hidden items-center gap-3 sm:flex"><button className="text-[13px] font-bold">English</button><span className="h-5 w-px bg-slate-300"/><button className="text-[13px] font-bold">₹ INR <ChevronDown className="inline h-3 w-3"/></button><Link href="/login" className="inline-flex items-center gap-1.5 text-[13px] font-bold"><UserRound className="h-4 w-4"/> Login</Link><Link href="/signup" className="rounded-xl bg-orange px-5 py-2.5 text-[13px] font-black text-white shadow-lg shadow-orange/20 transition hover:-translate-y-0.5">Sign Up</Link></div>
      <button className="rounded-xl border border-slate-200 bg-white p-2 lg:hidden" onClick={() => setOpen(!open)} aria-label="Open menu">{open ? <X/> : <Menu/>}</button>
    </div>
    {open && <div className="border-t bg-white p-4 lg:hidden"><div className="grid gap-2">{links.map(([l,h]) => <Link onClick={() => setOpen(false)} key={l} href={h} className="rounded-xl px-4 py-3 font-semibold hover:bg-sky">{l}</Link>)}<div className="mt-2 flex gap-2"><Link href="/login" className="flex-1 rounded-xl border px-4 py-3 text-center font-semibold">Login</Link><Link href="/signup" className="flex-1 rounded-xl bg-orange px-4 py-3 text-center font-semibold text-white">Sign Up</Link></div></div></div>}
  </header>
}
