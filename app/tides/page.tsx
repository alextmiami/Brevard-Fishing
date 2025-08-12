'use client'
import { useState } from 'react'
import TideWidget from '@/components/TideWidget'
import Card from '@/components/Card'

export default function TidesPage() {
  const [station, setStation] = useState(process.env.NEXT_PUBLIC_DEFAULT_STATION ?? '8721604')
  return (
    <div className="flex flex-col gap-4">
      <Card title="Select NOAA Station">
        <div className="flex items-center gap-2">
          <input value={station as string} onChange={(e)=>setStation(e.target.value)} className="border rounded-xl px-2 py-1 text-sm w-32" />
          <a className="text-sm underline" href="https://tidesandcurrents.noaa.gov/map/index.html" target="_blank" rel="noreferrer">Find station</a>
        </div>
      </Card>
      <TideWidget station={station as string} />
    </div>
  )
}
