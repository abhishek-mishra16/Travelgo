import Link from 'next/link';

export function Footer() {
  return <footer className="mt-20 bg-navy text-white">
    <div className="container-x grid gap-10 py-12 md:grid-cols-[1.5fr_1fr_1fr]">
      <div>
        <div className="text-2xl font-black">Travel<span className="text-orange">Go</span></div>
        <p className="mt-2 max-w-xs text-sm text-white/65">Compare bus, train and flight options across India in one place.</p>
        <p className="mt-6 rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-white/60">Fares and schedules are sourced from public travel listings and can change before purchase.</p>
      </div>
      <div><h3 className="font-bold">Travel</h3><div className="mt-4 grid gap-2 text-sm text-white/70"><Link href="/search?mode=BUS">Bus Tickets</Link><Link href="/search?mode=TRAIN">Train Tickets</Link><Link href="/search?mode=FLIGHT">Flight Tickets</Link><Link href="/hotels">Hotels</Link></div></div>
      <div><h3 className="font-bold">Explore</h3><div className="mt-4 grid gap-2 text-sm text-white/70"><Link href="/destinations">Destinations</Link><Link href="/offers">Offers</Link><Link href="/dashboard">My Trips</Link><Link href="/admin">Admin</Link></div></div>
    </div>
    <div className="border-t border-white/10 py-5 text-center text-xs text-white/50">© 2026 TravelGo India · Travel reservations are issued within TravelGo and are not operator-issued tickets.</div>
  </footer>;
}
