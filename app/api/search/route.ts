import { NextResponse } from 'next/server';
import { demoTrips } from '@/lib/demo-data';
import { compareTrips, sortTrips } from '@/lib/comparison';
import { isDbEnabled, prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const from = (url.searchParams.get('from') || 'LKO').toUpperCase();
    const to = (url.searchParams.get('to') || 'NDL').toUpperCase();
    const date = url.searchParams.get('date') || new Date().toISOString().slice(0, 10);
    const mode = (url.searchParams.get('mode') || 'all').toUpperCase();
    const travellers = Math.max(1, Math.min(9, Number(url.searchParams.get('travellers') || 1)));
    const sort = url.searchParams.get('sort') || 'best';

    let trips: any[];

    if (isDbEnabled()) {
      const rows = await prisma.trip.findMany({
        where: {
          origin: { code: from },
          destination: { code: to },
          ...(mode !== 'ALL' ? { type: mode as any } : {}),
        },
        include: { operator: true, origin: true, destination: true, seats: { where: { status: 'AVAILABLE' } } },
      });
      trips = rows.map((t) => ({
        id: t.id, type: t.type, operator: t.operator.name, origin: t.origin.name, originCode: t.origin.code,
        destination: t.destination.name, destinationCode: t.destination.code, departure: t.departure.toISOString(),
        arrival: t.arrival.toISOString(), durationMinutes: t.durationMinutes, price: t.price, rating: t.rating,
        stops: t.stops, amenities: t.amenities.split(','), cancellationPolicy: t.cancellationPolicy,
        baggage: t.baggage, seatsAvailable: t.seats.length,
      }));
    } else {
      trips = demoTrips(from, to, date);
      if (mode !== 'ALL') trips = trips.filter((trip) => trip.type === mode);
    }

    const comparison = compareTrips(trips);
    return NextResponse.json({
      results: sortTrips(trips, sort),
      comparison,
      metadata: { demo: !isDbEnabled(), query: { from, to, date, travellers, mode } },
    });
  } catch (error) {
    // Reference mode should remain usable even if a malformed query reaches the route.
    const fallback = demoTrips((new URL(request.url).searchParams.get('from') || 'LKO').toUpperCase(), (new URL(request.url).searchParams.get('to') || 'NDL').toUpperCase(), new URL(request.url).searchParams.get('date') || undefined);
    return NextResponse.json({
      results: fallback,
      comparison: compareTrips(fallback),
      metadata: { demo: true, fallback: true },
      error: error instanceof Error ? error.message : 'Search fallback used',
    });
  }
}
