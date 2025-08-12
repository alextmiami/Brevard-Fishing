'use client'
import dynamic from 'next/dynamic'
import { useMemo, useState } from 'react'
import { spots } from '@/lib/spots'
import Card from './Card'

const MapContainer = dynamic(() => import('react-leaflet').then(m => m.MapContainer), { ssr: false })
const TileLayer    = dynamic(() => import('react-leaflet').then(m => m.TileLayer),    { ssr: false })
const Marker       = dynamic(() => import('react-leaflet').then(m => m.Marker),       { ssr: false })
const Popup        = dynamic(() => import('react-leaflet').then(m => m.Popup),        { ssr: false })

export default function Map() {
  const [filter, setFilter] = useState<string>('all')
  const filtered = useMemo(() => filter==='all' ? spots : spots.filter(s => s.type.toLowerCase().includes(filter)), [filter])
  const center: [number, number] = [Number(process.env.NEXT_PUBLIC_LAT ?? 28.4159), Number(process.env.NEXT_PUBLIC_LON ?? -80.6003)]

  return (
    <Card title="Interactive Map" right={
      <select className="border rounded-xl px-2 py-1 text-sm" value={filter} onChange={e=>setFilter(e.target.value)}>
        <option value="all">All</option>
        <option value="ocean">Ocean</option>
        <option value="estuary">Estuary</option>
        <option value="lagoon">Lagoon</option>
        <option value="inlet">Inlet</option>
        <option value="pier">Pier</option>
        <option value="bridge">Bridge</option>
      </select>
    }>
      <div className="h-[420px] rounded-xl overflow-hidden">
        <MapContainer center={center} zoom={10} style={{ height: '100%', width: '100%' }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {filtered.map((s) => (
            // @ts-ignore – dynamic import types
            <Marker key={s.name} position={[s.lat, s.lon] as [number, number]}>
              <Popup>
                <div className="font-medium">{s.name}</div>
                <div className="text-xs text-neutral-600">{s.type}</div>
                <div className="text-xs">{s.species.join(', ')}</div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </Card>
  )
}
