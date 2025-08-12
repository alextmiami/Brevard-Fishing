import Card from './Card'
import { moonPhase, phaseName } from '@/lib/moon'

export default function MoonWidget() {
  const p = moonPhase(new Date())
  return (
    <Card title="Moon & Bite Window">
      <div className="text-sm">
        <div className="flex items-center justify-between">
          <div className="font-medium">{phaseName(p)}</div>
          <div>Phase: {(p * 100).toFixed(0)}%</div>
        </div>
        <div className="mt-2 text-neutral-600 text-xs">
          Rule of thumb: stronger tides around new/full moons often juice the bite—pair with dawn/dusk and moving water.
        </div>
      </div>
    </Card>
  )
}
