export interface ChartPoint {
  x: number;
  y: number;
}

export function ResearchChart({
  title,
  data,
  unitX,
  unitY,
}: {
  title: string;
  data: ChartPoint[] | null;
  unitX: string;
  unitY: string;
}) {
  if (!data || data.length === 0) {
    return (
      <div className="rounded-[24px] border border-dashed border-ink/15 bg-white/50 p-8 text-center">
        <p className="text-sm font-medium text-ink">{title}</p>
        <p className="mt-2 text-sm text-gray">Testing underway</p>
      </div>
    );
  }

  const maxX = Math.max(...data.map((d) => d.x));
  const maxY = Math.max(...data.map((d) => d.y));
  const points = data
    .map((d) => `${(d.x / maxX) * 260 + 20},${140 - (d.y / maxY) * 110}`)
    .join(" ");

  return (
    <div className="rounded-[24px] border border-ink/8 bg-white/70 p-6">
      <p className="mb-3 text-sm font-medium text-ink">{title}</p>
      <svg viewBox="0 0 300 160" className="w-full" role="img" aria-label={`${title} chart, ${unitX} vs ${unitY}`}>
        <line x1="20" y1="140" x2="290" y2="140" stroke="var(--ink)" strokeOpacity="0.2" />
        <line x1="20" y1="20" x2="20" y2="140" stroke="var(--ink)" strokeOpacity="0.2" />
        <polyline points={points} fill="none" stroke="var(--mint)" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
      <p className="mt-2 text-xs text-gray">{unitX} vs. {unitY}</p>
    </div>
  );
}
