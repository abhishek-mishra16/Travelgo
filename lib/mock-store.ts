import { Trip } from './types';
export type DemoBooking={id:string;bookingCode:string;trip:Trip;seats:string[];passenger:{fullName:string;age:number;gender:string;email:string;phone:string};total:number;status:'CONFIRMED'|'CANCELLED';createdAt:string;paymentStatus:'SUCCESS'|'REFUND_SIMULATED'};
const bookings=new Map<string,DemoBooking>();
export function saveDemoBooking(b:DemoBooking){bookings.set(b.id,b);return b}
export function getDemoBooking(id:string){return bookings.get(id)}
export function listDemoBookings(){return [...bookings.values()]}
export function cancelDemoBooking(id:string){const b=bookings.get(id);if(!b)return null;b.status='CANCELLED';b.paymentStatus='REFUND_SIMULATED';bookings.set(id,b);return b}
