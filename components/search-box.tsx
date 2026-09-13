'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  ArrowLeftRight,
  CalendarDays,
  Grid2X2,
  Hotel,
  MapPin,
  Plane,
  Search,
  TrainFront,
  Users,
  BusFront,
} from 'lucide-react';

const cities = [
  ['LKO', 'Lucknow'], ['NDL', 'New Delhi'], ['BOM', 'Mumbai'], ['BLR', 'Bangalore'],
  ['JAI', 'Jaipur'], ['GOI', 'Goa'], ['MAA', 'Chennai'], ['CCU', 'Kolkata'],
  ['VNS', 'Varanasi'], ['HYD', 'Hyderabad'],
] as const;

export function SearchBox() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const [tripMode, setTripMode] = useState<'one' | 'round' | 'multi'>('one');
  const [form, setForm] = useState({
    from: 'LKO', to: 'NDL', date: new Date().toISOString().slice(0, 10),
    returnDate: '', travellers: '1', mode: 'all',
  });

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const params = new URLSearchParams({
      from: form.from,
      to: form.to,
      date: form.date,
      travellers: form.travellers,
      mode: form.mode,
    });
    if (tripMode === 'round' && form.returnDate) params.set('returnDate', form.returnDate);
    router.push(`/search?${params.toString()}`);
  };

  const quickSearch = (from: string, to: string) => {
    router.push(`/search?from=${from}&to=${to}&date=${form.date}&travellers=1&mode=all`);
  };

  const modes = [
    ['all', 'All', Grid2X2], ['BUS', 'Bus', BusFront], ['TRAIN', 'Train', TrainFront], ['FLIGHT', 'Flight', Plane],
  ] as const;

  if (!mounted) return <div aria-hidden="true" className="h-[238px] rounded-[26px] border border-white/60 bg-white/95 shadow-[0_24px_70px_rgba(8,43,76,.16)] md:h-[214px]" />;

  return (
    <form onSubmit={submit} className="search-panel rounded-[26px] border border-white/80 bg-white p-3 shadow-[0_24px_70px_rgba(8,43,76,.20)] md:p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex gap-1 rounded-2xl bg-slate-100 p-1 text-xs font-black">
          {([['one', 'One Way'], ['round', 'Round Trip'], ['multi', 'Multi City']] as const).map(([value, label]) => (
            <button suppressHydrationWarning type="button" key={value} onClick={() => setTripMode(value)} className={`rounded-xl px-4 py-2.5 ${tripMode === value ? 'bg-navy text-white shadow-sm' : 'text-slate-500'}`}>
              {label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1 rounded-2xl bg-slate-50 p-1">
          {modes.map(([value, label, Icon]) => (
            <button suppressHydrationWarning type="button" key={value} onClick={() => setForm((old) => ({ ...old, mode: value }))} className={`flex items-center gap-1.5 rounded-xl px-3 py-2 text-[11px] font-black ${form.mode === value ? 'bg-white text-navy shadow-sm' : 'text-slate-500'}`}>
              <Icon className="h-3.5 w-3.5" />{label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-3 grid gap-2 md:grid-cols-[1fr_42px_1fr_1.1fr_1fr_auto]">
        <Field icon={<MapPin />} label="From">
          <select value={form.from} onChange={(e) => setForm({ ...form, from: e.target.value })} className="form-control">
            {cities.map(([code, name]) => <option key={code} value={code}>{name} · {code}</option>)}
          </select>
        </Field>

        <button suppressHydrationWarning type="button" onClick={() => setForm((old) => ({ ...old, from: old.to, to: old.from }))} className="self-center justify-self-center rounded-full border bg-white p-2.5 shadow-sm transition hover:rotate-180" aria-label="Swap cities">
          <ArrowLeftRight className="h-4 w-4" />
        </button>

        <Field icon={<MapPin />} label="To">
          <select value={form.to} onChange={(e) => setForm({ ...form, to: e.target.value })} className="form-control">
            {cities.map(([code, name]) => <option key={code} value={code}>{name} · {code}</option>)}
          </select>
        </Field>

        <Field icon={<CalendarDays />} label="Departure">
          <input type="date" value={form.date} min={new Date().toISOString().slice(0, 10)} onChange={(e) => setForm({ ...form, date: e.target.value })} className="form-control" />
        </Field>

        <Field icon={<Users />} label="Travellers">
          <select value={form.travellers} onChange={(e) => setForm({ ...form, travellers: e.target.value })} className="form-control">
            {[1, 2, 3, 4, 5, 6].map((n) => <option key={n} value={n}>{n} {n === 1 ? 'Adult' : 'Adults'} · Economy</option>)}
          </select>
        </Field>

        <button suppressHydrationWarning className="rounded-2xl bg-orange px-7 py-4 text-sm font-black text-white shadow-xl shadow-orange/20 transition hover:-translate-y-0.5">
          <Search className="mr-2 inline h-5 w-5" />Search Trips <span className="ml-1">→</span>
        </button>
      </div>

      {tripMode === 'round' && (
        <div className="mt-2 max-w-[260px]">
          <Field icon={<CalendarDays />} label="Return">
            <input type="date" value={form.returnDate} min={form.date} onChange={(e) => setForm({ ...form, returnDate: e.target.value })} className="form-control" />
          </Field>
        </div>
      )}

      <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px] font-bold text-slate-500">
        <span className="text-navy">Popular Searches:</span>
        {[
          ['Delhi → Mumbai', 'NDL', 'BOM'], ['Mumbai → Goa', 'BOM', 'GOI'], ['Delhi → Jaipur', 'NDL', 'JAI'],
          ['Bangalore → Chennai', 'BLR', 'MAA'], ['Lucknow → Delhi', 'LKO', 'NDL'], ['Kolkata → Varanasi', 'CCU', 'VNS'],
        ].map(([label, from, to]) => (
          <button suppressHydrationWarning type="button" key={label} onClick={() => quickSearch(from, to)} className="rounded-full border bg-slate-50 px-3 py-1.5 transition hover:border-orange/30 hover:bg-orange/5 hover:text-orange">
            {label}
          </button>
        ))}
      </div>

      <div className="mt-2 flex items-center gap-1 text-[10px] font-semibold text-slate-400">
        <Hotel className="h-3.5 w-3.5" /> Looking for hotels?
        <a href="/hotels" className="font-black text-navy underline decoration-orange/40">Explore stays</a>
      </div>
    </form>
  );
}

function Field({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return <label className="field-card"><span className="field-icon">{icon}</span><span className="field-label">{label}</span>{children}</label>;
}
