import { NextResponse } from 'next/server'

function yyyymmdd(d: Date) {
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}${pad(d.getMonth()+1)}${pad(d.getDate())}`
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const station = searchParams.get('station') || process.env.NOAA_STATION || '8721604'
  const days = Number(searchParams.get('days') || 2)
  const now = new Date()
  const end = new Date()
  end.setDate(now.getDate() + (days - 1))
  const url = `https://api.tidesandcurrents.noaa.gov/api/prod/datagetter?product=predictions&application=brevard-fishing&begin_date=${yyyymmdd(now)}&end_date=${yyyymmdd(end)}&datum=MLLW&station=${station}&time_zone=lst_ldt&units=english&interval=hilo&format=json`
  const r = await fetch(url, { next: { revalidate: 900 } })
  const j = await r.json()
  return NextResponse.json(j)
}
