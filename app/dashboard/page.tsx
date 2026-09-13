'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { CalendarDays, Heart, History, LogOut, Ticket, XCircle } from 'lucide-react';
import { signIn, signOut, useSession } from 'next-auth/react';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const [bookings, setBookings] = useState<any[]>([]);
  const [demo, setDemo] = useState(false);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    const response = await fetch('/api/bookings');
    const data = await response.json();
    if (response.ok) {
      setBookings(data.bookings || []);
      setDemo(Boolean(data.demo));
    }
    setLoading(false);
  };

  useEffect(() => { load(); }, [session]);

  if (status === 'loading' || loading) {
    return <main className="container-x pt-28"><div className="h-96 animate-pulse rounded-3xl bg-slate-200" /></main>;
  }

  if (!session && !demo) {
    return (
      <main className="container-x pt-28 pb-20">
        <div className="mx-auto max-w-xl rounded-[32px] border bg-white p-10 text-center shadow-soft">
          <div className="text-5xl">🎫</div>
          <h1 className="mt-4 text-3xl font-black">Your trips live here</h1>
          <p className="mt-2 text-slate-500">Sign in to see bookings, favorites and your travel history.</p>
          <button onClick={() => signIn()} className="mt-6 rounded-xl bg-orange px-6 py-3 font-black text-white">Sign In</button>
        </div>
      </main>
    );
  }

  const confirmed = bookings.filter((booking) => booking.status === 'CONFIRMED');

  const cancel = async (id: string) => {
    if (!window.confirm('Cancel this booking?')) return;
    const response = await fetch(`/api/bookings/${id}/cancel`, { method: 'POST' });
    if (response.ok) load();
  };

  return (
    <main className="container-x pt-24 pb-20">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="text-xs font-black uppercase tracking-[.2em] text-orange">My travel space</span>
          <h1 className="mt-2 text-4xl font-black">Hello{session?.user?.name ? `, ${session.user.name.split(' ')[0]}` : ''} 👋</h1>
          <p className="mt-1 text-slate-500">Manage your journeys in one place.</p>
        </div>
        {session ? <button onClick={() => signOut()} className="rounded-xl border bg-white px-4 py-2 font-bold"><LogOut className="mr-2 inline h-4 w-4" /> Sign out</button> : <Link href="/login" className="rounded-xl border bg-white px-4 py-2 font-bold">Sign in</Link>}
      </div>

      {demo && <div className="mt-5 rounded-2xl border border-orange/20 bg-orange/5 p-4 text-sm text-orange-900"><b>Reservation storage:</b> website bookings remain available while this server is running.</div>}

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <DashStat icon={<Ticket />} title="My Trips" value={String(bookings.length)} />
        <DashStat icon={<CalendarDays />} title="Confirmed" value={String(confirmed.length)} />
        <DashStat icon={<Heart />} title="Favorites" value="0" />
        <DashStat icon={<History />} title="Searches" value="12" />
      </div>

      <section className="mt-8 rounded-[32px] border bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between"><h2 className="text-2xl font-black">My trips</h2><Link href="/" className="font-bold text-orange">Book another →</Link></div>
        {bookings.length === 0 ? (
          <div className="py-16 text-center text-slate-500">No bookings yet. Search a route and complete a booking.</div>
        ) : (
          <div className="mt-5 grid gap-4">
            {bookings.map((booking) => {
              const origin = booking.trip?.origin?.name || booking.trip?.origin;
              const destination = booking.trip?.destination?.name || booking.trip?.destination;
              return (
                <div key={booking.id} className="rounded-2xl border p-5">
                  <div className="flex flex-wrap justify-between gap-4">
                    <div><div className="text-xl font-black">{origin} → {destination}</div><div className="mt-1 text-sm text-slate-500">{booking.trip?.type} · {booking.bookingCode}</div></div>
                    <span className={`h-fit rounded-full px-3 py-1 text-xs font-black ${booking.status === 'CANCELLED' ? 'bg-slate-100 text-slate-500' : 'bg-green/10 text-green'}`}>{booking.status}</span>
                  </div>
                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                    <div><div className="text-sm text-slate-500">Total</div><div className="text-lg font-black text-orange">₹{Number(booking.total).toLocaleString('en-IN')}</div></div>
                    <div className="flex gap-2">
                      <Link href={`/booking/confirmation/${booking.id}`} className="rounded-xl bg-navy px-4 py-2.5 text-sm font-black text-white">View Ticket</Link>
                      {booking.status === 'CONFIRMED' && <button onClick={() => cancel(booking.id)} className="rounded-xl border px-4 py-2.5 text-sm font-black text-red-600"><XCircle className="mr-1 inline h-4 w-4" /> Cancel</button>}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}

function DashStat({ icon, title, value }: { icon: React.ReactNode; title: string; value: string }) {
  return <div className="rounded-2xl border bg-white p-5"><span className="grid h-10 w-10 place-items-center rounded-xl bg-sky text-navy">{icon}</span><div className="mt-4 text-2xl font-black">{value}</div><div className="text-sm text-slate-500">{title}</div></div>;
}
