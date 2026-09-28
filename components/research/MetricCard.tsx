import { Card } from "@/components/ui/Card";

export function MetricCard({ label, value }: { label: string; value: string | number }) {
  return (
    <Card className="text-center">
      <p className="text-3xl font-semibold text-ink">{value}</p>
      <p className="mt-1 text-xs uppercase tracking-wide text-gray">{label}</p>
    </Card>
  );
}
