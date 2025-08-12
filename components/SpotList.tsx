import Card from './Card'
import { spots } from '@/lib/spots'

export default function SpotList() {
  return (
    <Card title="Spots (Brevard & nearby)">
      <div className="divide-y">
        {spots.map(s => {
          const gmaps = `https://maps.google.com/?q=${s.lat},${s.lon}`
          return (
            <div key={s.name} className="py-2 flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="font-medium">{s.name}</div>
                <div className="text-sm text-neutral-600">{s.type} • {s.species.join(', ')}</div>
                <div className="text-sm text-neutral-500">Tip: {s.tips}</div>
              </div>
              <div className="mt-2 sm:mt-0"><a className="underline text-sm" target="_blank" rel="noreferrer" href={gmaps}>Map</a></div>
            </div>
          )
        })}
      </div>
    </Card>
  )
}
