import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function POST(req: Request) {
  const { phone, email } = await req.json()
  if (!phone && !email) return NextResponse.json({ error: 'Provide phone or email' }, { status: 400 })
  const rec = await prisma.subscriber.create({ data: { phone, email } })
  return NextResponse.json({ ok: true, id: rec.id })
}
