# Brevard Fishing

Space Coast fishing dashboard (Next.js + Tailwind + API routes) with:
- Live weather & marine (Open-Meteo)
- NOAA tide predictions (station-configurable)
- Moon phase cue
- Curated local spots
- Interactive map (Leaflet)
- User submissions (Prisma / SQLite)
- Wind alerts via Vercel cron + Twilio/Resend (optional)

## Quickstart

```bash
# 1) Install deps
npm install

# 2) Copy env
cp .env.local.example .env.local

# 3) (Optional) init DB for submissions/alerts
npx prisma migrate dev -n init

# 4) Dev server
npm run dev
# Open http://localhost:3000
```

## Endpoints
- `/` dashboard
- `/spots` list
- `/map` interactive map
- `/tides` station selector + upcoming tides
- `/alerts` safety links
- `POST /api/submissions` to submit a spot (JSON body: name, waterType, lat, lon, tips?, species?[])
- `POST /api/subscribe` to register phone/email
- `GET /api/alerts/run` wind check + notify

## Deploy (Vercel)
1. Push this folder to GitHub.
2. Import repo in Vercel → add env vars from `.env.local.example`.
3. Deploy. `vercel.json` sets a cron to hit `/api/alerts/run` every 30 min.

---

**Note:** Always verify marine conditions on site. Tight lines.
