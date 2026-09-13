import dynamic from 'next/dynamic';

const IndiaMapClient = dynamic(() => import('./india-map-client').then((m) => m.IndiaMapClient), {
  ssr: false,
  loading: () => (
    <div className="grid h-[460px] place-items-center rounded-[24px] bg-gradient-to-br from-[#effbf7] via-[#f7fcff] to-[#e9f1ff] text-sm font-bold text-slate-500">
      Loading India map…
    </div>
  ),
});

export function IndiaMap() {
  return <IndiaMapClient />;
}
