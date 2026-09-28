import { whyBioEar } from "@/content/bioear-copy";
import { Card } from "@/components/ui/Card";

export function BioEarStats() {
  return (
    <div className="grid gap-6 sm:grid-cols-3">
      {whyBioEar.map((item) => (
        <Card key={item.title} className="text-center">
          <p className="text-lg font-semibold tracking-tight text-ink">{item.title}</p>
          <p className="mt-3 text-sm leading-relaxed text-gray">{item.description}</p>
        </Card>
      ))}
    </div>
  );
}
