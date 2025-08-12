'use client'
import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-white/70 backdrop-blur sticky top-0 z-10 border-b">
      <div className="container py-4 flex items-center justify-between gap-3">
        <Link href="/" className="text-2xl font-bold">Brevard Fishing</Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link href="/spots" className="hover:underline">Spots</Link>
          <Link href="/map" className="hover:underline">Map</Link>
          <Link href="/tides" className="hover:underline">Tides</Link>
          <Link href="/alerts" className="hover:underline">Alerts</Link>
        </nav>
      </div>
    </header>
  )
}
