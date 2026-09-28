import { cn } from "@/lib/utils/cn";

export function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "rounded-[24px] border border-ink/8 bg-white/70 p-6 shadow-[0_1px_2px_rgba(32,35,42,0.04)]",
        className
      )}
    >
      {children}
    </div>
  );
}
