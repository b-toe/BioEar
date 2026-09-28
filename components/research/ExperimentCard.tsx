import { Experiment } from "@/lib/data/research";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export function ExperimentCard({ experiment }: { experiment: Experiment }) {
  return (
    <Card>
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-base font-semibold text-ink">{experiment.title}</h3>
        <Badge tone={experiment.status}>{experiment.status}</Badge>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-gray">{experiment.objective}</p>
      <p className="mt-3 text-xs uppercase tracking-wide text-gray">Metric: {experiment.metric}</p>
    </Card>
  );
}
