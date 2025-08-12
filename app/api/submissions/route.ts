import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function POST(req: Request) {
  const body = await req.json()
  const { name, waterType, lat, lon, tips, species } = body
  if (!name || !waterType || lat==null || lon==null) return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  const rec = await prisma.spotSubmission.create({ data: { name, waterType, lat: Number(lat), lon: Number(lon), tips, species: species ?? [] } })
  return NextResponse.json(rec)
}
