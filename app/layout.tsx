import './globals.css'
import type { Metadata } from 'next'
import Header from '@/components/Header'

export const metadata: Metadata = {
  title: 'Brevard Fishing – Live Tides, Weather, Spots',
  description: 'Space Coast fishing dashboard with live weather, tides, marine, and local spots.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      </head>
      <body>
        <Header />
        <main className="container py-6">{children}</main>
        <footer className="container py-6 text-xs text-neutral-500">
          Data from Open‑Meteo & NOAA. Verify conditions onsite. Tight lines.
        </footer>
      </body>
    </html>
  )
}
