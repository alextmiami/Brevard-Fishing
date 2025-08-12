import SpotList from '@/components/SpotList'
import WeatherWidget from '@/components/WeatherWidget'
import MarineWidget from '@/components/MarineWidget'
import TideWidget from '@/components/TideWidget'
import MoonWidget from '@/components/MoonWidget'

const LAT = Number(process.env.DEFAULT_LAT ?? 28.4159)
const LON = Number(process.env.DEFAULT_LON ?? -80.6003)
const NOAA_STATION = process.env.NOAA_STATION ?? '8721604' // Trident Pier

export default function Home() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 flex flex-col gap-6">
        <SpotList />
      </div>
      <div className="flex flex-col gap-6">
        <WeatherWidget lat={LAT} lon={LON} />
        <MarineWidget lat={LAT} lon={LON} />
        <TideWidget station={NOAA_STATION} />
        <MoonWidget />
      </div>
    </div>
  )
}
