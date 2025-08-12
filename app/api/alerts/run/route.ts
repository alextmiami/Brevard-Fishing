import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { DEFAULTS } from '@/lib/thresholds'

async function getWind(lat: number, lon: number) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=wind_speed_10m&timezone=auto`
  const r = await fetch(url)
  const j = await r.json()
  const mps = j?.hourly?.wind_speed_10m?.[0]
  return mps == null ? null : mps * 1.94384 // m/s -> kt
}

async function notifySMS(to: string, msg: string) {
  const sid = process.env.TWILIO_ACCOUNT_SID
  const tok = process.env.TWILIO_AUTH_TOKEN
  const from = process.env.TWILIO_FROM
  if (!sid || !tok || !from) return
  const b = new URLSearchParams({ To: to, From: from, Body: msg })
  await fetch(`https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`, {
    method: 'POST',
    headers: { 'Authorization': 'Basic ' + Buffer.from(`${sid}:${tok}`).toString('base64'), 'Content-Type': 'application/x-www-form-urlencoded' },
    body: b
  })
}

async function notifyEmail(to: string, subject: string, text: string) {
  const key = process.env.RESEND_API_KEY
  if (!key) return
  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: 'alerts@spacecoast.fish', to, subject, text })
  })
}

export async function GET() {
  const lat = Number(process.env.DEFAULT_LAT || 28.4159)
  const lon = Number(process.env.DEFAULT_LON || -80.6003)
  const kts = await getWind(lat, lon)
  const fire = kts != null && kts >= DEFAULTS.maxWindKts
  const subs = await prisma.subscriber.findMany()
  const note = fire ? `Wind alert: ${kts?.toFixed(0)} kt near Port Canaveral.` : null
  if (note) {
    await Promise.all(subs.map(async s => {
      if (s.phone) await notifySMS(s.phone, note)
      if (s.email) await notifyEmail(s.email, 'Brevard Fishing – Wind Alert', note)
    }))
  }
  return NextResponse.json({ ok: true, windKts: kts, alerted: !!note, subscribers: subs.length })
}
