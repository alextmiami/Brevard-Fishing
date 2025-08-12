export function moonPhase(date = new Date()) {
  const lp = 2551443; // lunar period in seconds
  const now = date.getTime() / 1000;
  const new_moon_2000 = 947182440; // 2000-01-06 18:14 UTC approximate
  const phase = ((now - new_moon_2000) % lp) / lp; // 0..1
  return phase;
}
export function phaseName(p: number) {
  if (p < 0.03 || p > 0.97) return 'New Moon'
  if (p < 0.22) return 'Waxing Crescent'
  if (p < 0.28) return 'First Quarter'
  if (p < 0.47) return 'Waxing Gibbous'
  if (p < 0.53) return 'Full Moon'
  if (p < 0.72) return 'Waning Gibbous'
  if (p < 0.78) return 'Last Quarter'
  return 'Waning Crescent'
}
