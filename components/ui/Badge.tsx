import { cn } from "@/lib/utils/cn";

const styles: Record<string, string> = {
  planned: "bg-blue/40 text-ink",
  "in-progress": "bg-peach/50 text-ink",
  complete: "bg-mint/60 text-ink",
  proposed: "bg-lavender/40 text-ink",
  testing: "bg-peach/50 text-ink",
  measured: "bg-mint/60 text-ink",
  demonstrated: "bg-blue/40 text-ink",
  "future work": "bg-ink/5 text-gray",
};

export function Badge({ children, tone = "planned" }: { children: React.ReactNode; tone?: string }) {
  return (
    <span
      className={cn(
        "inline-block rounded-full px-3 py-1 text-xs font-medium uppercase tracking-wide",
        styles[tone] ?? styles.planned
      )}
    >
      {children}
    </span>
  );
}
