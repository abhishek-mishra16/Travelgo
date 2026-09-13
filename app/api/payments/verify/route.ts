import {NextResponse} from 'next/server';
export async function POST(){return NextResponse.json({status:'SUCCESS',transactionRef:`TG-${Date.now()}`});}
