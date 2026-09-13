export type TransportType = 'BUS' | 'TRAIN' | 'FLIGHT';
export type Trip = {
  id: string; type: TransportType; operator: string; origin: string; originCode: string; destination: string; destinationCode: string;
  departure: string; arrival: string; durationMinutes: number; price: number; rating: number; stops: number; amenities: string[];
  cancellationPolicy: string; baggage?: string; seatsAvailable: number; source?: string; sourceUrl?: string; service?: string;
};
export type Comparison = { cheapest: Trip; fastest: Trip; bestValue: Trip; valueScores: Record<string, number> };
