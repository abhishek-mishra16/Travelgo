import './globals.css';
import { Providers } from '@/components/providers';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import type { Metadata } from 'next';
export const metadata:Metadata={title:'TravelGo India | Compare Bus, Train & Flight Tickets',description:'Compare bus, train and flight options across India and find the cheapest, fastest and best-value way to travel.',openGraph:{title:'TravelGo India',description:'One search. Bus + Train + Flight. Cheapest, Fastest, Best Value.'}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en" suppressHydrationWarning><body suppressHydrationWarning><Providers><Navbar/>{children}<Footer/></Providers></body></html>}
