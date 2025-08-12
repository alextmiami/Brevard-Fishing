import { NextResponse } from 'next/server'
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const lat = searchParams.get('lat')
  const lon = searchParams.get('lon')
  if (!lat || !lon) return NextResponse.json({ error: 'lat/lon required' }, { status: 400 })
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,precipitation,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,uv_index_max&timezone=auto`
  const r = await fetch(url, { next: { revalidate: 900 } })
  const j = await r.json()
  return NextResponse.json(j)
}
