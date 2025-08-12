'use client'
import useSWR from 'swr'
import Card from './Card'
const fetcher = (url: string) => fetch(url).then(r => r.json())

export default function MarineWidget({ lat, lon }: { lat: number, lon: number }) {
  const { data } = useSWR(`/api/marine?lat=${lat}&lon=${lon}`, fetcher)
  const h = data?.hourly
  return (
    <Card title="Marine (Open‑Meteo)">
      {!h && <div className="text-sm text-neutral-600">Loading marine conditions…</div>}
      {h && (
        <div className="grid grid-cols-2 gap-2 text-xs">
          {h.time.slice(0, 8).map((t: string, i: number) => (
            <div key={t} className="rounded-xl border p-2">
              <div className="font-medium">{new Date(t).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
              <div>Wave Ht: {h.wave_height?.[i] ?? '-'} m</div>
              <div>Wind Wave: {h.wind_wave_height?.[i] ?? '-'} m • {h.wind_wave_period?.[i] ?? '-'} s</div>
            </div>
          ))}
        </div>
      )}
    </Card>
  )
}
