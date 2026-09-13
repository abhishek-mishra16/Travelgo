# TravelGo India

A responsive Indian travel comparison and reservation website built with Next.js, React, TypeScript, Tailwind, Prisma and Framer Motion.

## What changed

- Search now uses real operator/service names and published fare/timetable snapshots where current public listings were available.
- Lucknow → New Delhi includes current public bus, train and flight listings gathered on 13 Sep 2026.
- Every result can show its fare source.
- Booking still works end-to-end inside TravelGo: seat selection → passenger details → checkout → confirmation → QR/PDF → dashboard → cancellation.
- The checkout creates a website reservation; it does not submit a ticket purchase to IRCTC, an airline or a bus operator.
- Removed portfolio/demo wording from the customer-facing interface.
- Removed the "Built for your portfolio" footer section.
- India map pins use city latitude/longitude rather than hand-tuned screen positions.
- Prisma is now lazy-loaded, so the default website mode does not crash when PostgreSQL is not running.

## Important data note

Public travel websites change fares and availability continuously. This project does not scrape or bypass provider systems. For production-grade live search/seat availability/booking, connect authorised provider APIs through the existing server-side search and booking architecture.

## Run

```bash
npm install
npm run dev
```

Open http://localhost:3000

The included `.env.local` keeps the site in website-only reservation mode so PostgreSQL is not required for the core flow.
