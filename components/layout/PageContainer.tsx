import { cn } from "@/lib/utils/cn";

export function PageContainer({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("mx-auto max-w-6xl px-6 py-16 sm:py-24", className)}>{children}</div>;
}
