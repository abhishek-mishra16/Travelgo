'use client';

import Link from 'next/link';
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Polyline,
  Tooltip,
  Popup,
  ZoomControl,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { ArrowRight, BusFront, Plane, TrainFront } from 'lucide-react';

type Mode = 'BUS' | 'TRAIN' | 'FLIGHT' | 'ALL';

type City = {
  name: string;
  code: string;
  lat: number;
  lon: number;
  mode: Mode;
};

const cities: City[] = [
  { name: 'Srinagar', code: 'SXR', lat: 34.0837, lon: 74.7973, mode: 'ALL' },
  { name: 'Amritsar', code: 'ATQ', lat: 31.6340, lon: 74.8723, mode: 'TRAIN' },
  { name: 'Delhi', code: 'NDL', lat: 28.6139, lon: 77.2090, mode: 'ALL' },
  { name: 'Jaipur', code: 'JAI', lat: 26.9124, lon: 75.7873, mode: 'BUS' },
  { name: 'Lucknow', code: 'LKO', lat: 26.8467, lon: 80.9462, mode: 'TRAIN' },
  { name: 'Varanasi', code: 'VNS', lat: 25.3176, lon: 82.9739, mode: 'TRAIN' },
  { name: 'Ahmedabad', code: 'AMD', lat: 23.0225, lon: 72.5714, mode: 'BUS' },
  { name: 'Kolkata', code: 'CCU', lat: 22.5726, lon: 88.3639, mode: 'FLIGHT' },
  { name: 'Mumbai', code: 'BOM', lat: 19.0760, lon: 72.8777, mode: 'BUS' },
  { name: 'Hyderabad', code: 'HYD', lat: 17.3850, lon: 78.4867, mode: 'ALL' },
  { name: 'Goa', code: 'GOI', lat: 15.2993, lon: 74.1240, mode: 'FLIGHT' },
  { name: 'Bengaluru', code: 'BLR', lat: 12.9716, lon: 77.5946, mode: 'TRAIN' },
  { name: 'Chennai', code: 'MAA', lat: 13.0827, lon: 80.2707, mode: 'BUS' },
  { name: 'Kochi', code: 'COK', lat: 9.9312, lon: 76.2673, mode: 'FLIGHT' },
];

const routeCodes: [string, string, Mode][] = [
  ['NDL', 'JAI', 'BUS'],
  ['NDL', 'LKO', 'TRAIN'],
  ['LKO', 'VNS', 'TRAIN'],
  ['LKO', 'CCU', 'FLIGHT'],
  ['NDL', 'BOM', 'FLIGHT'],
  ['BOM', 'GOI', 'FLIGHT'],
  ['BOM', 'HYD', 'TRAIN'],
  ['HYD', 'BLR', 'TRAIN'],
  ['BLR', 'MAA', 'BUS'],
  ['AMD', 'BOM', 'BUS'],
];

const colors: Record<Mode, string> = {
  BUS: '#ff5a1f',
  TRAIN: '#0b8f5a',
  FLIGHT: '#082b4c',
  ALL: '#ff5a1f',
};

function city(code: string) {
  return cities.find((item) => item.code === code)!;
}

function modeIcon(mode: Mode) {
  if (mode === 'BUS') return <BusFront className="h-3.5 w-3.5" />;
  if (mode === 'FLIGHT') return <Plane className="h-3.5 w-3.5" />;
  return <TrainFront className="h-3.5 w-3.5" />;
}

export function IndiaMapClient() {
  return (
    <div className="relative overflow-hidden rounded-[30px] border border-white/80 bg-white shadow-soft">
      <div className="absolute left-4 top-4 z-[500] rounded-full bg-white/95 px-3 py-2 text-[10px] font-black text-navy shadow-sm backdrop-blur md:text-[11px]">
        India route explorer
      </div>

      <div className="h-[460px] overflow-hidden rounded-[24px]">
        <MapContainer
          center={[22.8, 79.1]}
          zoom={4.8}
          minZoom={4}
          maxZoom={11}
          scrollWheelZoom={false}
          zoomControl={false}
          className="h-full w-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <ZoomControl position="topright" />

          {routeCodes.map(([from, to, mode]) => {
            const a = city(from);
            const b = city(to);
            return (
              <Polyline
                key={`${from}-${to}`}
                positions={[
                  [a.lat, a.lon],
                  [b.lat, b.lon],
                ]}
                pathOptions={{
                  color: colors[mode],
                  weight: 3,
                  opacity: 0.78,
                  dashArray: '8 8',
                }}
              />
            );
          })}

          {cities.map((item) => (
            <CircleMarker
              key={item.code}
              center={[item.lat, item.lon]}
              radius={8}
              pathOptions={{
                color: '#ffffff',
                weight: 3,
                fillColor: colors[item.mode],
                fillOpacity: 1,
              }}
            >
              <Tooltip direction="top" offset={[0, -8]} permanent className="travelgo-map-label">
                {item.name}
              </Tooltip>
              <Popup>
                <div className="min-w-[150px]">
                  <div className="flex items-center gap-2 font-black text-navy">
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-orange/10 text-orange">
                      {modeIcon(item.mode)}
                    </span>
                    {item.name}
                  </div>
                  <div className="mt-1 text-xs text-slate-500">
                    {item.lat.toFixed(4)}° N, {item.lon.toFixed(4)}° E
                  </div>
                  <Link
                    href={`/search?from=${item.code}&to=NDL&date=${new Date().toISOString().slice(0, 10)}&travellers=1&mode=all`}
                    className="mt-3 inline-flex items-center rounded-lg bg-navy px-3 py-2 text-xs font-black text-white"
                  >
                    View routes <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </div>
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>
      </div>

      <div className="grid gap-3 border-t bg-white p-3 md:grid-cols-[1fr_auto]">
        <div className="rounded-2xl bg-slate-50 p-3">
          <div className="flex flex-wrap items-center gap-3 text-[10px] font-bold text-slate-500">
            <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-orange" /> Bus routes</span>
            <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-green" /> Train routes</span>
            <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-navy" /> Flight routes</span>
          </div>
          <p className="mt-2 text-[10px] text-slate-400">
            City pins use geographic latitude/longitude on a real-world OpenStreetMap base map.
          </p>
        </div>
        <Link href="/destinations" className="inline-flex items-center justify-center rounded-2xl bg-navy px-4 py-3 text-xs font-black text-white transition hover:bg-orange">
          Explore India <ArrowRight className="ml-1 h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}
