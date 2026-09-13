import { PrismaClient, TransportType, LocationType } from "@prisma/client";
import bcrypt from "bcryptjs";
const prisma = new PrismaClient();
const cities = [
  ["Lucknow","Uttar Pradesh","LKO",26.8467,80.9462],["New Delhi","Delhi","NDL",28.6139,77.2090],
  ["Mumbai","Maharashtra","BOM",19.076,72.8777],["Bangalore","Karnataka","BLR",12.9716,77.5946],
  ["Chennai","Tamil Nadu","MAA",13.0827,80.2707],["Kolkata","West Bengal","CCU",22.5726,88.3639],
  ["Hyderabad","Telangana","HYD",17.385,78.4867],["Pune","Maharashtra","PNQ",18.5204,73.8567],
  ["Jaipur","Rajasthan","JAI",26.9124,75.7873],["Ahmedabad","Gujarat","AMD",23.0225,72.5714],
  ["Goa","Goa","GOI",15.2993,74.124],["Varanasi","Uttar Pradesh","VNS",25.3176,82.9739],
  ["Agra","Uttar Pradesh","AGR",27.1767,78.0081],["Kanpur","Uttar Pradesh","KNU",26.4499,80.3319],
  ["Patna","Bihar","PAT",25.5941,85.1376],["Bhopal","Madhya Pradesh","BHO",23.2599,77.4126],
  ["Indore","Madhya Pradesh","IDR",22.7196,75.8577],["Amritsar","Punjab","ATQ",31.634,74.8723],
  ["Chandigarh","Chandigarh","IXC",30.7333,76.7794],["Kochi","Kerala","COK",9.9312,76.2673],
  ["Thiruvananthapuram","Kerala","TRV",8.5241,76.9366],["Srinagar","Jammu & Kashmir","SXR",34.0837,74.7973]
] as const;
const routes = [["LKO","NDL"],["NDL","BOM"],["BOM","GOI"],["NDL","JAI"],["BLR","MAA"],["CCU","VNS"],["HYD","BLR"],["BOM","PNQ"],["NDL","AGR"],["MAA","HYD"],["COK","BLR"],["JAI","NDL"],["LKO","VNS"],["NDL","ATQ"],["BOM","AMD"]];
const basePrice: Record<TransportType, number> = { BUS: 599, TRAIN: 745, FLIGHT: 3240 };
async function main() {
  await prisma.bookingSeat.deleteMany(); await prisma.passenger.deleteMany(); await prisma.payment.deleteMany(); await prisma.booking.deleteMany(); await prisma.seat.deleteMany(); await prisma.review.deleteMany(); await prisma.trip.deleteMany(); await prisma.favorite.deleteMany(); await prisma.searchHistory.deleteMany(); await prisma.transportOperator.deleteMany(); await prisma.location.deleteMany(); await prisma.coupon.deleteMany(); await prisma.user.deleteMany();
  const loc = new Map<string,string>();
  for (const [name,state,code,latitude,longitude] of cities) { const l=await prisma.location.create({data:{name,state,code,type:code.length===3&&["LKO","NDL"].includes(code)?LocationType.CITY:LocationType.CITY,latitude,longitude}}); loc.set(code,l.id); }
  for (const type of Object.values(TransportType)) await prisma.transportOperator.create({data:{name:`${type[0]+type.slice(1).toLowerCase()} Network`,type,rating:type==='TRAIN'?4.5:type==='BUS'?4.2:4.3}});
  const ops=await prisma.transportOperator.findMany();
  for (const [ri,[from,to]] of routes.entries()) for (const type of Object.values(TransportType)) for (let i=0;i<3;i++) {
    const op=ops.find(x=>x.type===type)!; const d=new Date(); d.setDate(d.getDate()+1+(ri%5)); d.setHours(6+i*4+(type==='FLIGHT'?1:0),10+i*7,0,0);
    const mins= type==='BUS'?480+i*30+(ri%3)*20 : type==='TRAIN'?390+i*25+(ri%4)*15 : 80+i*15+(ri%2)*10;
    const price=basePrice[type]+ri*35+i*90+(type==='FLIGHT'?ri*80:0);
    const trip=await prisma.trip.create({data:{operatorId:op.id,originId:loc.get(from)!,destinationId:loc.get(to)!,type,departure:d,arrival:new Date(d.getTime()+mins*60000),durationMinutes:mins,price,rating:Math.min(4.9,op.rating+i*.15),stops:type==='FLIGHT'&&i===2?1:0,amenities:type==='BUS'?'AC,WiFi,Charging,Recliner':type==='TRAIN'?'AC,Food,Charging,Sleeper':'WiFi,Meal,Charging',cancellationPolicy:'Free cancellation up to 4 hours before departure',baggage:type==='FLIGHT'?'15 kg cabin + 7 kg check-in':undefined}});
    const labels=type==='BUS'?[...Array(24)].map((_,j)=>String(j+1)):type==='TRAIN'?[...Array(32)].map((_,j)=>`B${Math.floor(j/8)+1}-${(j%8)+1}`):[...Array(18)].map((_,j)=>`${String.fromCharCode(65+Math.floor(j/6))}${(j%6)+1}`);
    for (const label of labels) await prisma.seat.create({data:{tripId:trip.id,label,status:Math.random()<.15?'OCCUPIED':'AVAILABLE'}});
    await prisma.review.create({data:{tripId:trip.id,authorName:'Aarav S.',rating:trip.rating,comment:'Smooth demo journey with clear timing and comfortable seating.'}});
  }
  const passwordHash=await bcrypt.hash('TravelGo@123',10);
  await prisma.user.createMany({data:[{name:'TravelGo Traveller',email:'demo@travelgo.dev',passwordHash,role:'USER'},{name:'TravelGo Admin',email:'admin@travelgo.dev',passwordHash,role:'ADMIN'}]});
  await prisma.coupon.createMany({data:[{code:'FIRSTTRIP',type:'PERCENT',value:10,minAmount:500},{code:'WEEKEND',type:'FIXED',value:300,minAmount:2000},{code:'TRAIN50',type:'FIXED',value:50,minAmount:500}]});
}
main().catch(e=>{console.error(e);process.exit(1)}).finally(()=>prisma.$disconnect());
