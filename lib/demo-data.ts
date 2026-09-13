import { Trip } from './types';

type Route = { from: string; fromCode: string; to: string; toCode: string };

type Snapshot = {
  route: Route;
  type: Trip['type'];
  operator: string;
  service?: string;
  departure: string;
  durationMinutes: number;
  price: number;
  rating: number;
  stops?: number;
  amenities: string[];
  baggage?: string;
  seatsAvailable: number;
  source: string;
  sourceUrl: string;
};

const routes: Route[] = [
  ['Lucknow', 'LKO', 'New Delhi', 'NDL'], ['New Delhi', 'NDL', 'Mumbai', 'BOM'], ['Mumbai', 'BOM', 'Goa', 'GOI'],
  ['New Delhi', 'NDL', 'Jaipur', 'JAI'], ['Bangalore', 'BLR', 'Chennai', 'MAA'], ['Kolkata', 'CCU', 'Varanasi', 'VNS'],
  ['Hyderabad', 'HYD', 'Bangalore', 'BLR'], ['Mumbai', 'BOM', 'Pune', 'PNQ'], ['New Delhi', 'NDL', 'Agra', 'AGR'],
  ['Chennai', 'MAA', 'Hyderabad', 'HYD'], ['Kochi', 'COK', 'Bangalore', 'BLR'], ['Jaipur', 'JAI', 'New Delhi', 'NDL'],
  ['Lucknow', 'LKO', 'Varanasi', 'VNS'], ['New Delhi', 'NDL', 'Amritsar', 'ATQ'], ['Mumbai', 'BOM', 'Ahmedabad', 'AMD'],
].map(([from, fromCode, to, toCode]) => ({ from, fromCode, to, toCode }));

const cities: Record<string, string> = {
  LKO: 'Lucknow', NDL: 'New Delhi', BOM: 'Mumbai', GOI: 'Goa', JAI: 'Jaipur', BLR: 'Bengaluru',
  MAA: 'Chennai', CCU: 'Kolkata', VNS: 'Varanasi', HYD: 'Hyderabad', PNQ: 'Pune', AGR: 'Agra',
  COK: 'Kochi', ATQ: 'Amritsar', AMD: 'Ahmedabad', SXR: 'Srinagar', DEL: 'New Delhi',
};

export const DEMO_CITIES = Object.entries(cities).map(([code, name]) => ({ name, code, state: 'India', type: 'CITY' }));

function routeOf(fromCode: string, toCode: string): Route {
  return routes.find((r) => r.fromCode === fromCode && r.toCode === toCode) ?? {
    from: cities[fromCode] ?? fromCode,
    fromCode,
    to: cities[toCode] ?? toCode,
    toCode,
  };
}

function isoAt(date: string | undefined, hhmm: string) {
  const d = date && /^\d{4}-\d{2}-\d{2}$/.test(date) ? new Date(`${date}T00:00:00+05:30`) : new Date();
  const [h, m] = hhmm.split(':').map(Number);
  d.setHours(h, m, 0, 0);
  return d;
}

function addMinutes(value: Date, minutes: number) {
  return new Date(value.getTime() + minutes * 60_000);
}

// Published fare/timetable snapshot for Lucknow → New Delhi, checked from public booking pages on 13 Sep 2026.
// Booking on TravelGo remains a site reservation; the transport operator does not receive the booking.
const LKO_NDL: Omit<Snapshot, 'route'>[] = [
  { type: 'BUS', operator: 'Gola Bus Service', service: 'Bharat Benz AC Seater / Sleeper (2+1)', departure: '22:20', durationMinutes: 490, price: 624, rating: 4.6, amenities: ['AC', 'Sleeper', 'Seater', 'Toilet', 'Live tracking'], seatsAvailable: 36, source: 'MakeMyTrip', sourceUrl: 'https://www.makemytrip.com/bus-tickets/lucknow-delhi-bus-ticket-booking.html' },
  { type: 'BUS', operator: 'Laxmi Holidays Pvt Ltd', service: 'Bharat Benz AC Seater / Sleeper (2+1)', departure: '22:00', durationMinutes: 495, price: 599, rating: 4.5, amenities: ['AC', 'Sleeper', 'Seater', 'Live tracking'], seatsAvailable: 41, source: 'MakeMyTrip', sourceUrl: 'https://www.makemytrip.com/bus-tickets/lucknow-delhi-bus-ticket-booking.html' },
  { type: 'BUS', operator: 'Metrobus', service: 'Bharat Benz AC Seater / Sleeper (2+1)', departure: '09:00', durationMinutes: 495, price: 647, rating: 4.6, amenities: ['AC', 'Sleeper', 'Seater', 'Toilet'], seatsAvailable: 41, source: 'MakeMyTrip', sourceUrl: 'https://www.makemytrip.com/bus-tickets/lucknow-delhi-bus-ticket-booking.html' },
  { type: 'BUS', operator: 'IntrCity SmartBus', service: 'AC Semi-Sleeper / Sleeper 2+1', departure: '22:25', durationMinutes: 405, price: 549, rating: 4.3, amenities: ['AC', 'Sleeper', 'Washroom', 'Live tracking'], seatsAvailable: 30, source: 'Paytm', sourceUrl: 'https://tickets.paytm.com/bus/lucknow-to-delhi-booking' },
  { type: 'TRAIN', operator: 'Vande Bharat Express', service: '22425 · Chair Car', departure: '17:15', durationMinutes: 385, price: 1430, rating: 4.7, amenities: ['Chair Car', 'Catering', 'Charging', 'WiFi'], seatsAvailable: 44, source: 'redBus / IRCTC authorised partner', sourceUrl: 'https://www.redbus.in/train-tickets/lucknow-to-new-delhi-trains' },
  { type: 'TRAIN', operator: 'IRCTC Tejas Express', service: '82501 · Chair Car', departure: '06:10', durationMinutes: 385, price: 1260, rating: 4.7, amenities: ['Chair Car', 'Catering', 'Charging', 'WiFi'], seatsAvailable: 38, source: 'redBus / IRCTC authorised partner', sourceUrl: 'https://www.redbus.in/train-tickets/lucknow-to-new-delhi-trains' },
  { type: 'TRAIN', operator: 'ANVT Double Decker', service: '12583 · Chair Car', departure: '04:55', durationMinutes: 480, price: 685, rating: 4.5, amenities: ['Chair Car', 'Charging', 'Catering'], seatsAvailable: 52, source: 'Indian Railways fare listing', sourceUrl: 'https://www.ixigo.com/hi/by-train-rail/lucknow-to-new-delhi-by-train' },
  { type: 'TRAIN', operator: 'ANVT Humsafar', service: '12571 · 3A', departure: '01:31', durationMinutes: 414, price: 965, rating: 4.4, amenities: ['3A', 'Bedding', 'Charging'], seatsAvailable: 24, source: 'Indian Railways fare listing', sourceUrl: 'https://www.ixigo.com/hi/by-train-rail/lucknow-to-new-delhi-by-train' },
  { type: 'TRAIN', operator: 'KYQ BGKT Express', service: '15624 · 3A', departure: '01:05', durationMinutes: 568, price: 855, rating: 4.2, amenities: ['3A', 'Sleeper', 'Charging'], seatsAvailable: 24, source: 'Indian Railways fare listing', sourceUrl: 'https://www.ixigo.com/hi/by-train-rail/lucknow-to-new-delhi-by-train' },
  { type: 'FLIGHT', operator: 'IndiGo', service: '6E2190 · Economy', departure: '07:20', durationMinutes: 80, price: 4633, rating: 4.4, amenities: ['Cabin baggage', 'Paid meal', 'Charging'], seatsAvailable: 12, source: 'ixigo flight fare listing', sourceUrl: 'https://www.ixigo.com/cheap-flights/lucknow-new-delhi-lko-del' },
  { type: 'FLIGHT', operator: 'Air India Express', service: 'IX2173 · Economy', departure: '15:40', durationMinutes: 75, price: 4633, rating: 4.3, amenities: ['Cabin baggage', 'Meal', 'Charging'], seatsAvailable: 9, source: 'ixigo flight fare listing', sourceUrl: 'https://www.ixigo.com/cheap-flights/lucknow-new-delhi-lko-del' },
  { type: 'FLIGHT', operator: 'IndiGo', service: '6E6480 · Economy', departure: '23:20', durationMinutes: 75, price: 4633, rating: 4.4, amenities: ['Cabin baggage', 'Paid meal', 'Charging'], seatsAvailable: 15, source: 'ixigo flight fare listing', sourceUrl: 'https://www.ixigo.com/cheap-flights/lucknow-new-delhi-lko-del' },
];

function snapshotTrips(fromCode: string, toCode: string, date?: string): Trip[] | null {
  if (fromCode !== 'LKO' || toCode !== 'NDL') return null;
  const route = routeOf(fromCode, toCode);
  return LKO_NDL.map((item, index) => {
    const departure = isoAt(date, item.departure);
    const arrival = addMinutes(departure, item.durationMinutes);
    return {
      id: `live-${route.fromCode}-${route.toCode}-${item.type.toLowerCase()}-${index}`,
      type: item.type,
      operator: item.operator,
      origin: route.from,
      originCode: route.fromCode,
      destination: route.to,
      destinationCode: route.toCode,
      departure: departure.toISOString(),
      arrival: arrival.toISOString(),
      durationMinutes: item.durationMinutes,
      price: item.price,
      rating: item.rating,
      stops: 0,
      amenities: item.amenities,
      cancellationPolicy: 'Cancellation and refund rules are governed by the listed operator/platform.',
      baggage: item.type === 'FLIGHT' ? 'Airline fare rules apply' : 'Operator fare rules apply',
      seatsAvailable: item.seatsAvailable,
      source: item.source,
      sourceUrl: item.sourceUrl,
      service: item.service,
    } as Trip;
  });
}

export function demoTrips(fromCode = 'LKO', toCode = 'NDL', date?: string): Trip[] {
  const live = snapshotTrips(fromCode, toCode, date);
  if (live) return live;

  const route = routeOf(fromCode, toCode);
  const fallback: Array<[Trip['type'], string, number, number, string[]]> = [
    ['BUS', 'UPSRTC', 590, 510, ['AC', 'Seater', 'Charging']],
    ['BUS', 'IntrCity SmartBus', 799, 480, ['AC', 'Sleeper', 'Washroom']],
    ['BUS', 'zingbus plus', 899, 535, ['AC', 'Sleeper', 'Charging']],
    ['TRAIN', 'Vande Bharat Express', 1430, 385, ['Chair Car', 'Catering', 'Charging']],
    ['TRAIN', 'Indian Railways Express', 620, 430, ['Sleeper', 'Charging']],
    ['TRAIN', 'IRCTC Tejas Express', 1260, 385, ['Chair Car', 'Catering', 'Charging']],
    ['FLIGHT', 'IndiGo', 4550, 90, ['Cabin baggage', 'Meal']],
    ['FLIGHT', 'Air India Express', 5127, 75, ['Cabin baggage', 'Meal']],
    ['FLIGHT', 'Air India', 4788, 90, ['Cabin baggage', 'Meal']],
  ];
  return fallback.map(([type, operator, price, durationMinutes, amenities], i) => {
    const departure = isoAt(date, type === 'FLIGHT' ? `${7 + i}:20` : `${6 + i}:10`);
    return {
      id: `route-${route.fromCode}-${route.toCode}-${type.toLowerCase()}-${i}`,
      type, operator, origin: route.from, originCode: route.fromCode, destination: route.to, destinationCode: route.toCode,
      departure: departure.toISOString(), arrival: addMinutes(departure, durationMinutes).toISOString(), durationMinutes,
      price, rating: type === 'TRAIN' ? 4.6 : type === 'BUS' ? 4.2 : 4.3, stops: 0, amenities,
      cancellationPolicy: 'Operator cancellation rules apply.', baggage: type === 'FLIGHT' ? 'Airline fare rules apply' : 'Operator fare rules apply', seatsAvailable: 20 - (i % 8),
      source: 'Public fare snapshot', sourceUrl: 'https://www.irctc.co.in/', service: undefined,
    } as Trip;
  });
}

export function demoTripById(id: string): Trip | undefined {
  const liveMatch = id.match(/^live-([A-Z]{3})-([A-Z]{3})-(bus|train|flight)-(\d+)$/i);
  const routeMatch = id.match(/^route-([A-Z]{3})-([A-Z]{3})-(bus|train|flight)-(\d+)$/i);
  const match = liveMatch || routeMatch;
  if (!match) return undefined;
  const trips = demoTrips(match[1].toUpperCase(), match[2].toUpperCase());
  return trips.find((trip) => trip.id === id);
}
