'use client'
import useSWR from 'swr'
import Card from './Card'
const fetcher = (url: string) => fetch(url).then(r => r.json())

export default function WeatherWidget({ lat, lon }: { lat: number, lon: number }) {
  const { data, error } = useSWR(`/api/weather?lat=${lat}&lon=${lon}`, fetcher)
  const daily = data?.daily
  const hourly = data?.hourly

  return (
    <Card title="Weather (Open‑Meteo)" right={daily?.time?.[0] && <div className="text-sm text-neutral-600">{new Date(daily.time[0]).toLocaleDateString()}</div>}>
      {error && <div className="text-sm text-red-600">Weather fetch failed.</div>}
      {!data && <div className="text-sm text-neutral-600">Loading forecast…</div>}
      {data && (
        <div className="text-sm">
          <div className="flex items-center justify-between">
            <div>High: <span className="font-medium">{Math.round(daily.temperature_2m_max?.[0])}°</span> • Low: <span className="font-medium">{Math.round(daily.temperature_2m_min?.[0])}°</span></div>
            <div>Rain: {daily.precipitation_sum?.[0] ?? 0} mm</div>
            <div>UV Max: {daily.uv_index_max?.[0] ?? '-'}</div>
          </div>
          {hourly && (
            <div className="mt-3 grid grid-cols-4 gap-2 text-xs">
              {hourly.time.slice(0, 12).map((t: string, i: number) => (
                <div key={t} className="rounded-xl border p-2 text-center">
                  <div className="font-medium">{new Date(t).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                  <div>{Math.round(hourly.temperature_2m[i])}°</div>
                  <div>{hourly.wind_speed_10m?.[i] ?? '-'} m/s</div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </Card>
  )
}
