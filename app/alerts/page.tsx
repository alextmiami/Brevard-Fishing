import Card from '@/components/Card'
export default function AlertsPage() {
  return (
    <Card title="Safety & Alerts">
      <ul className="list-disc pl-5 text-sm space-y-1">
        <li>Check small craft advisories (NWS Melbourne) before launching.</li>
        <li>Inlet currents at Sebastian/Canaveral can be hazardous on strong tides and swell.</li>
        <li>Regulations: Florida FWC saltwater rules (east region). Always verify seasons/size/bag.</li>
      </ul>
      <div className="mt-3 flex flex-wrap gap-3 text-sm">
        <a className="underline" href="https://www.weather.gov/mlb/" target="_blank" rel="noreferrer">NWS Melbourne</a>
        <a className="underline" href="https://myfwc.com/fishing/saltwater/recreational/" target="_blank" rel="noreferrer">FWC Recreational Saltwater</a>
        <a className="underline" href={`https://tidesandcurrents.noaa.gov/stationhome.html?id=${process.env.NOAA_STATION ?? '8721604'}`} target="_blank" rel="noreferrer">NOAA Station</a>
      </div>
    </Card>
  )
}
