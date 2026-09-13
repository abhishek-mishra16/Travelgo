import { Trip, Comparison } from './types';

function minMax(values:number[]){return {min:Math.min(...values),max:Math.max(...values)}}
function normalize(value:number,min:number,max:number,invert=false){ if(max===min)return 1; const n=(value-min)/(max-min); return invert?1-n:n; }
export function compareTrips(trips:Trip[]):Comparison|null{
  if(!trips.length)return null;
  const ps=minMax(trips.map(t=>t.price)), ds=minMax(trips.map(t=>t.durationMinutes));
  const rs=minMax(trips.map(t=>t.rating));
  const valueScores:Record<string,number>={};
  for(const t of trips){
    const price=normalize(t.price,ps.min,ps.max,true);
    const duration=normalize(t.durationMinutes,ds.min,ds.max,true);
    const rating=normalize(t.rating,rs.min,rs.max);
    const convenience=(t.stops===0?1:t.stops===1?.65:.35)*(t.seatsAvailable>8?1:.75);
    valueScores[t.id]=price*.4+duration*.3+rating*.15+convenience*.15;
  }
  const cheapest=[...trips].sort((a,b)=>a.price-b.price)[0];
  const fastest=[...trips].sort((a,b)=>a.durationMinutes-b.durationMinutes)[0];
  const bestValue=[...trips].sort((a,b)=>valueScores[b.id]-valueScores[a.id])[0];
  return {cheapest,fastest,bestValue,valueScores};
}
export function sortTrips(trips:Trip[],sort:string){
  const copy=[...trips]; if(sort==='cheapest')return copy.sort((a,b)=>a.price-b.price); if(sort==='fastest')return copy.sort((a,b)=>a.durationMinutes-b.durationMinutes);
  const c=compareTrips(copy); return copy.sort((a,b)=>(c?.valueScores[b.id]??0)-(c?.valueScores[a.id]??0));
}
