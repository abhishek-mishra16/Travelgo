'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowRight, BadgeCheck, Headphones, Leaf, MapPinned, Play, Route, ShieldCheck,
  Sparkles, Star, Tag, BellRing, BusFront, Plane, TrainFront,
} from 'lucide-react';
import { SearchBox } from '@/components/search-box';
import { Comparison } from '@/components/comparison';
import { IndiaMap } from '@/components/india-map';
import { compareTrips } from '@/lib/comparison';
import { demoTrips } from '@/lib/demo-data';

const comparison = compareTrips(demoTrips());

const destinations = [
  ['Goa', 'Beaches', 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1100&q=85'],
  ['Rajasthan', 'Heritage', 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1100&q=85'],
  ['Kerala', 'Backwaters', 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1100&q=85'],
  ['Kashmir', 'Mountains', 'https://upload.wikimedia.org/wikipedia/commons/5/5c/Landscape_of_kashmir.jpg'],
] as const;

const popularRoutes = [
  ['Delhi → Jaipur', 'View fares', BusFront, 'NDL', 'JAI'],
  ['Mumbai → Goa', 'View fares', Plane, 'BOM', 'GOI'],
  ['Bengaluru → Chennai', 'View fares', TrainFront, 'BLR', 'MAA'],
  ['Kolkata → Varanasi', 'View fares', BusFront, 'CCU', 'VNS'],
  ['Delhi → Mumbai', 'View fares', TrainFront, 'NDL', 'BOM'],
] as const;

export default function Home() {
  return (
    <main>
      <section className="hero relative overflow-hidden pt-[72px]">
        <div className="hero-image absolute inset-0" />
        <div className="hero-overlay absolute inset-0" />
        <div className="container-x relative pb-8 pt-10 md:pb-14 md:pt-14">
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_360px]">
            <div className="max-w-3xl text-white">
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-4 py-2 text-[11px] font-black backdrop-blur">
                <span className="rounded-full bg-green px-2 py-1">🇮🇳</span>
                India&apos;s smart travel marketplace
                <span className="text-white/60">•</span> 10M+ illustrative travellers
              </motion.div>

              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }} className="mt-5 text-5xl font-black leading-[.98] tracking-tight md:text-7xl">
                India <span className="text-orange">Moves Together</span>
                <br />And So Do We! <span className="inline-block text-4xl md:text-6xl">🇮🇳</span>
              </motion.h1>

              <p className="mt-5 max-w-2xl text-base font-medium text-white/90 md:text-xl">
                Compare. Choose. Travel. <b>Bus, Train, Flight</b> — all in one place.
              </p>

              <div className="mt-6 flex flex-wrap gap-2 text-xs font-bold text-white">
                <Pill icon={<Tag />}>Best Prices</Pill>
                <Pill icon={<BadgeCheck />}>Verified Travel Partners</Pill>
                <Pill icon={<Headphones />}>24/7 Support</Pill>
                <Pill icon={<ShieldCheck />}>Easy Cancellation</Pill>
              </div>
            </div>

            <div className="hidden rounded-[30px] border border-white/20 bg-white/10 p-4 text-white backdrop-blur-md lg:block">
              <div className="text-xs font-black uppercase tracking-[.18em] text-white/60">Travel inspiration</div>
              <div className="mt-4 overflow-hidden rounded-2xl">
                <img src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=900&q=85" alt="Indian travel landmark" className="h-52 w-full object-cover" />
              </div>
              <div className="mt-4 flex items-end justify-between">
                <div><div className="text-lg font-black">New routes. New stories.</div><div className="mt-1 text-xs text-white/65">Plan your next India trip.</div></div>
                <span className="grid h-10 w-10 place-items-center rounded-full bg-orange"><Play className="ml-0.5 h-4 w-4 fill-current" /></span>
              </div>
            </div>
          </div>
          <div className="relative z-10 mt-8"><SearchBox /></div>
        </div>
      </section>

      <section className="border-b bg-white shadow-[0_8px_30px_rgba(8,43,76,.05)]">
        <div className="container-x grid grid-cols-2 divide-x divide-slate-100 md:grid-cols-5">
          <Trust icon={<Tag />} title="Best Price Guaranteed" sub="Find the lowest fare" />
          <Trust icon={<ShieldCheck />} title="Secure Booking" sub="Your safety, our priority" />
          <Trust icon={<Route />} title="Flexible Travel" sub="Bus, Train, Flight & Hotels" />
          <Trust icon={<BellRing />} title="Smart Updates" sub="Live-style notifications" />
          <Trust icon={<Leaf />} title="Sustainable Travel" sub="A greener, cleaner India" />
        </div>
      </section>

      <section id="connections" className="container-x py-14 md:py-16">
        <div className="grid gap-7 lg:grid-cols-[1.3fr_.9fr]">
          <div className="rounded-[30px] bg-gradient-to-br from-[#e9f8f1] to-[#edf7ff] p-5 md:p-7">
            <div className="flex items-end justify-between gap-4">
              <div>
                <span className="script-kicker">Not just destinations,</span>
                <h2 className="mt-1 text-3xl font-black md:text-4xl">Connections <span className="text-orange">♥</span></h2>
                <p className="mt-2 max-w-md text-sm text-slate-600">Explore India&apos;s major travel hubs, routes and transport modes.</p>
              </div>
              <MapPinned className="hidden h-10 w-10 text-orange sm:block" />
            </div>
            <div className="mt-5"><IndiaMap /></div>
          </div>

          <div className="grid gap-5">
            <div className="rounded-[30px] bg-white p-5 shadow-soft ring-1 ring-slate-100">
              <div className="flex items-center justify-between">
                <div><span className="text-xs font-black uppercase tracking-[.18em] text-orange">Popular routes</span><h3 className="mt-1 text-2xl font-black">Where India is moving</h3></div>
                <Link href="/search" className="text-xs font-black text-navy">View more →</Link>
              </div>
              <div className="mt-5 grid gap-2">
                {popularRoutes.map(([label, price, Icon, from, to]) => (
                  <Link key={label} href={`/search?from=${from}&to=${to}&date=${new Date().toISOString().slice(0, 10)}&travellers=1&mode=all`} className="group flex items-center justify-between rounded-2xl border border-slate-100 p-3 transition hover:-translate-y-0.5 hover:border-orange/20 hover:shadow-sm">
                    <span className="flex items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-xl bg-orange/10 text-orange"><Icon className="h-4 w-4" /></span><span className="text-sm font-black">{label}</span></span>
                    <span className="text-xs font-black text-slate-500">From <b className="text-orange">{price}</b></span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="relative min-h-[250px] overflow-hidden rounded-[30px] bg-navy">
              <img src="https://images.unsplash.com/photo-1529154036614-a60975f5c760?auto=format&fit=crop&w=1000&q=85" alt="Travellers in India" className="absolute inset-0 h-full w-full object-cover opacity-65" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/20 to-transparent" />
              <div className="relative flex h-full min-h-[250px] flex-col justify-end p-6 text-white">
                <span className="text-xs font-black uppercase tracking-[.18em] text-orange">Travel Stories</span>
                <h3 className="mt-2 text-2xl font-black">Real people. Real India.</h3>
                <p className="mt-1 max-w-xs text-sm text-white/70">Mountains, beaches, heritage and the journeys between them.</p>
                <Link href="/destinations" className="mt-4 inline-flex w-fit rounded-xl bg-white px-4 py-2 text-xs font-black text-navy">Explore stories <ArrowRight className="ml-1 h-3.5 w-3.5" /></Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f4fbff] py-14 md:py-16"><div className="container-x">{comparison && <Comparison comparison={comparison} />}</div></section>

      <section className="container-x py-14 md:py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div><span className="text-xs font-black uppercase tracking-[.2em] text-orange">Travel beyond the usual</span><h2 className="mt-2 text-3xl font-black md:text-4xl">Discover a bigger, brighter India</h2><p className="mt-2 max-w-2xl text-sm text-slate-500">Build a trip around beaches, mountains, heritage, food or slow travel.</p></div>
          <Link href="/destinations" className="rounded-xl border bg-white px-4 py-2.5 text-sm font-black">Explore destinations →</Link>
        </div>
        <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {destinations.map(([name, tag, image]) => (
            <Link href="/destinations" key={name} className="group relative h-80 overflow-hidden rounded-[28px] shadow-sm">
              <img src={image} alt={name} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/5 to-transparent" />
              <div className="absolute bottom-0 p-5 text-white"><div className="text-[11px] font-black uppercase tracking-wider text-white/70">{tag}</div><div className="mt-1 text-2xl font-black">{name}</div><div className="mt-1 text-xs font-semibold text-white/70">Explore →</div></div>
            </Link>
          ))}
        </div>
      </section>

      <section className="container-x py-14 md:py-16">
        <div className="rounded-[32px] bg-white p-6 shadow-soft ring-1 ring-slate-100 md:p-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="text-xs font-black uppercase tracking-[.2em] text-orange">TravelGo tools</span>
              <h2 className="mt-2 text-3xl font-black md:text-4xl">Everything you need before you go.</h2>
              <p className="mt-2 max-w-2xl text-sm text-slate-500">Compare fares, plan your route, keep your booking in one place and discover what to do when you arrive.</p>
            </div>
            <Link href="/dashboard" className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-black">Open My Trips →</Link>
          </div>
          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ['⚡', 'Smart comparison', 'See cheapest, fastest and best-value options from the same search.', '/search'],
              ['🎟️', 'Trip wallet', 'Keep confirmed reservations, passenger details and cancellation actions together.', '/dashboard'],
              ['🧭', 'India route explorer', 'Jump from a city on the map straight into a route search.', '#connections'],
              ['🏨', 'Stay finder', 'Pair your transport plan with hotels and stays at your destination.', '/hotels'],
              ['🏷️', 'Offers & savings', 'Browse travel offers before you finalize your itinerary.', '/offers'],
              ['📍', 'Destination guides', 'Explore beaches, mountains, heritage and spiritual journeys.', '/destinations'],
            ].map(([icon, title, copy, href]) => (
              <Link key={title} href={href} className="group rounded-2xl border border-slate-100 bg-slate-50 p-5 transition hover:-translate-y-1 hover:border-orange/20 hover:bg-white hover:shadow-lg">
                <div className="text-2xl">{icon}</div>
                <div className="mt-4 text-lg font-black">{title}</div>
                <p className="mt-2 text-xs leading-5 text-slate-500">{copy}</p>
                <div className="mt-4 text-xs font-black text-orange">Open tool →</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-14 md:py-16">
        <div className="container-x">
          <div className="grid gap-5 lg:grid-cols-[.9fr_1.1fr]">
            <div className="rounded-[30px] bg-[#fff6f0] p-6 md:p-8">
              <span className="text-xs font-black uppercase tracking-[.2em] text-orange">How it works</span>
              <h2 className="mt-2 text-3xl font-black">From search to boarding plan.</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">TravelGo keeps the decision-making simple while giving you a complete booking journey.</p>
              <Link href="/search" className="mt-6 inline-flex rounded-xl bg-navy px-5 py-3 text-sm font-black text-white">Start a search →</Link>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                ['01', 'Search once', 'Enter your cities, date and travellers.'],
                ['02', 'Compare everything', 'Bus, train and flight choices are ranked together.'],
                ['03', 'Choose your seats', 'Pick available seats and enter passenger details.'],
                ['04', 'Confirm your trip', 'Complete checkout and keep your ticket in My Trips.'],
              ].map(([num, title, copy]) => (
                <div key={num} className="rounded-2xl border border-slate-100 p-5">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-navy text-xs font-black text-white">{num}</span>
                  <h3 className="mt-4 font-black">{title}</h3>
                  <p className="mt-2 text-xs leading-5 text-slate-500">{copy}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-navy py-14 text-white md:py-16">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 20% 20%, white 0 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        <div className="container-x relative">
          <div className="grid items-center gap-8 lg:grid-cols-[1.4fr_.9fr]">
            <div><span className="script-kicker text-white/90">Har Safar Ek Nayi Kahani</span><h2 className="mt-2 text-4xl font-black md:text-5xl">Travel smarter.<br /><span className="text-orange">Go farther.</span></h2><p className="mt-4 max-w-xl text-white/70">From one search to a reservation, TravelGo brings the whole journey into one polished experience.</p><div className="mt-6 flex flex-wrap gap-3"><Link href="/search" className="rounded-xl bg-orange px-5 py-3 text-sm font-black">Start comparing <ArrowRight className="ml-1 inline h-4 w-4" /></Link><Link href="/offers" className="rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-black">See offers</Link></div></div>
            <div className="grid grid-cols-2 gap-3">{[['5000+', 'Destinations', MapPinned], ['50+', 'Travel Partners', BadgeCheck], ['10M+', 'Travellers', Sparkles], ['4.8/5', 'App Rating', Star]].map(([number, label, Icon]) => { const C = Icon as typeof MapPinned; return <div key={String(label)} className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur"><C className="h-5 w-5 text-orange" /><div className="mt-4 text-2xl font-black">{String(number)}</div><div className="mt-1 text-xs text-white/60">{String(label)}</div></div>; })}</div>
          </div>
        </div>
      </section>
    </main>
  );
}

function Trust({ icon, title, sub }: { icon: React.ReactNode; title: string; sub: string }) {
  return <div className="flex items-center gap-3 px-3 py-5 md:px-5"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-orange/10 text-orange">{icon}</span><div><div className="text-xs font-black md:text-sm">{title}</div><div className="mt-0.5 text-[10px] text-slate-500 md:text-xs">{sub}</div></div></div>;
}

function Pill({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-2 backdrop-blur">{icon}<span>{children}</span></span>;
}
