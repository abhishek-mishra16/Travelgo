import {NextResponse} from 'next/server';
export async function POST(req:Request){const body=await req.json();return NextResponse.json({status:'PENDING',amount:body.amount,provider:'TravelGo Checkout',message:'Checkout session created'});}
