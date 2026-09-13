'use client';

import { useEffect, useMemo, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Filter, SlidersHorizontal, RefreshCw } from 'lucide-react';
import { Trip, Comparison as ComparisonType } from '@/lib/types';
import { demoTrips } from '@/lib/demo-data';
import { TripCard } from '@/components/trip-card';
import { Comparison } from '@/components/comparison';

export default function SearchPage() {
  const params = useSearchParams();
  const router = useRouter();
  const from = (params.get('from') || 'LKO').toUpperCase();
  const to = (params.get('to') || 'NDL').toUpperCase();
  const date = params.get('date') || new Date().toISOString().slice(0, 10);
  const travellers = params.get('travellers') || '1';
  const mode = (params.get('mode') || 'all').toUpperCase();

  const [trips, setTrips] = useState<Trip[]>([]);
  const [comparison, setComparison] = useState<ComparisonType | null>(null);
  const [sort, setSort] = useState('best');
  const [transport, setTransport] = useState(mode === 'ALL' ? 'ALL' : mode);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState('');

  useEffect(() => {
    let active = true;
    setLoading(true);
    setApiError('');

    fetch(`/api/search?from=${from}&to=${to}&date=${date}&travellers=${travellers}&mode=${mode}&sort=${sort}`)
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Search failed');
        return data;
      })
      .then((data) => {
        if (!active) return;
        setTrips(data.results || []);
        setComparison(data.comparison || null);
      })
      .catch((error) => {
        if (!active) return;
        const fallback = demoTrips(from, to, date);
        setTrips(fallback);
        setComparison(null);
        setApiError(error instanceof Error ? error.message : 'Reference listing loaded');
      })
      .finally(() => active && setLoading(false));

    return () => { active = false; };
  }, [from, to, date, travellers, mode, sort]);

  const shown = useMemo(
    () => transport === 'ALL' ? trips : trips.filter((trip) => trip.type === transport),
    [trips, transport],
  );

  return (
    <main className="container-x pt-28 pb-20">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="text-sm font-bold text-slate-500">{date} · {travellers} {Number(travellers) === 1 ? 'traveller' : 'travellers'}</div>
          <h1 className="mt-1 text-3xl font-black md:text-4xl">{from} <span className="text-orange">→</span> {to}</h1>
          <p className="mt-1 text-sm text-slate-500">Published fares and schedules · updated from public travel listings</p>
        </div>
        <button onClick={() => router.push('/')} className="rounded-xl border bg-white px-4 py-2.5 text-sm font-bold">Modify Search</button>
      </div>

      <div className="mt-7 grid gap-6 lg:grid-cols-[220px_1fr]">
        <aside className="hidden rounded-3xl border bg-white p-5 lg:block">
          <div className="flex items-center gap-2 font-black"><Filter className="h-4 w-4" /> Filters</div>
          <div className="mt-6">
            <div className="text-xs font-black uppercase text-slate-400">Transport</div>
            {['ALL', 'BUS', 'TRAIN', 'FLIGHT'].map((value) => (
              <button key={value} onClick={() => setTransport(value)} className={`mt-2 block w-full rounded-xl px-3 py-2 text-left text-sm font-bold ${transport === value ? 'bg-sky text-navy' : 'hover:bg-slate-50'}`}>
                {value === 'ALL' ? 'All modes' : value}
              </button>
            ))}
          </div>
          <div className="mt-7 rounded-2xl bg-sky p-4 text-xs leading-5 text-slate-600">
            <b className="text-navy">Tip:</b> Best Value balances fare, duration, rating, stops and available seats.
          </div>
        </aside>

        <div>
          <div className="flex gap-2 overflow-x-auto rounded-2xl border bg-white p-1">
            {[
              ['best', '⭐ Best Value'], ['cheapest', '₹ Cheapest'], ['fastest', '⚡ Fastest'],
            ].map(([value, label]) => (
              <button key={value} onClick={() => setSort(value)} className={`whitespace-nowrap rounded-xl px-5 py-3 text-sm font-black ${sort === value ? 'bg-navy text-white' : 'text-slate-500'}`}>{label}</button>
            ))}
          </div>

          {comparison && <div className="mt-5"><Comparison comparison={comparison} /></div>}

          <div className="mt-6 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-black">{shown.length} travel options</h2>
              <p className="mt-1 text-xs text-slate-400">Fare and timing snapshots can change before purchase.</p>
            </div>
            <button className="rounded-xl border bg-white px-3 py-2 text-sm font-bold lg:hidden"><SlidersHorizontal className="mr-2 inline h-4 w-4" /> Filters</button>
          </div>

          {apiError && (
            <div className="mt-4 flex items-center justify-between rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
              <span>Live provider data is unavailable for this route right now, so reference listings are shown.</span>
              <RefreshCw className="h-4 w-4" />
            </div>
          )}

          {loading ? (
            <div className="mt-4 grid gap-4">{[1, 2, 3].map((item) => <div key={item} className="h-60 animate-pulse rounded-3xl bg-slate-200" />)}</div>
          ) : shown.length ? (
            <div className="mt-4 grid gap-4">{shown.map((trip) => <TripCard key={trip.id} trip={trip} badge={comparison?.cheapest.id === trip.id ? 'CHEAPEST' : comparison?.fastest.id === trip.id ? 'FASTEST' : comparison?.bestValue.id === trip.id ? 'BEST VALUE' : undefined} />)}</div>
          ) : (
            <div className="mt-4 rounded-3xl border bg-white p-10 text-center">
              <div className="text-4xl">🧭</div>
              <h3 className="mt-3 text-xl font-black">No trips found</h3>
              <p className="mt-2 text-slate-500">Try another route or select All modes.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
