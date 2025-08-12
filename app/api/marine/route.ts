import { NextResponse } from 'next/server'
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const lat = searchParams.get('lat')
  const lon = searchParams.get('lon')
  if (!lat || !lon) return NextResponse.json({ error: 'lat/lon required' }, { status: 400 })
  const url = `https://marine-api.open-meteo.com/v1/marine?latitude=${lat}&longitude=${lon}&hourly=wave_height,wind_wave_height,wind_wave_direction,wind_wave_period&timezone=auto`
  const r = await fetch(url, { next: { revalidate: 900 } })
  const j = await r.json()
  return NextResponse.json(j)
}
