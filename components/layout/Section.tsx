import { cn } from "@/lib/utils/cn";

export function Section({
  children,
  className,
  tone,
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "cream" | "lavender" | "blue" | "mint" | "peach";
}) {
  const toneClasses: Record<string, string> = {
    cream: "bg-cream",
    lavender: "bg-lavender/20",
    blue: "bg-blue/20",
    mint: "bg-mint/20",
    peach: "bg-peach/20",
  };

  return (
    <section className={cn("py-20 sm:py-28", tone && toneClasses[tone], className)}>
      <div className="mx-auto max-w-6xl px-6">{children}</div>
    </section>
  );
}
