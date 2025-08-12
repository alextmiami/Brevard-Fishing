'use client'
import useSWR from 'swr'
import Card from './Card'
const fetcher = (url: string) => fetch(url).then(r => r.json())

function formatLocal(dtStr: string) {
  const d = new Date(dtStr)
  return d.toLocaleString([], { hour: '2-digit', minute: '2-digit', month: 'short', day: '2-digit' })
}

export default function TideWidget({ station }: { station: string }) {
  const { data, error } = useSWR(`/api/tides?station=${station}`, fetcher)
  const items = data?.predictions ?? []
  const future = items.filter((p: any) => new Date(p.t) >= new Date()).slice(0, 6)

  return (
    <Card title="Tides (NOAA)" right={<div className="text-xs text-neutral-500">Station {station}</div>}>
      {error && <div className="text-sm text-red-600">Tide fetch failed.</div>}
      {!data && <div className="text-sm text-neutral-600">Loading tide predictions…</div>}
      {data && (
        <div className="grid grid-cols-1 gap-2 text-sm">
          {future.map((p: any) => (
            <div key={p.t} className="flex items-center justify-between rounded-xl border p-2">
              <div className="font-medium">{p.type === 'H' ? 'High' : 'Low'} tide</div>
              <div className="text-neutral-600">{formatLocal(p.t)}</div>
              <div className="font-medium">{Number(p.v).toFixed(2)} ft</div>
            </div>
          ))}
        </div>
      )}
    </Card>
  )
}
