export function formatHz(hz: number): string {
  return hz >= 1000 ? `${(hz / 1000).toFixed(hz % 1000 === 0 ? 0 : 1)} kHz` : `${hz} Hz`;
}

export function formatPercent(value: number): string {
  return `${Math.round(value)}%`;
}
