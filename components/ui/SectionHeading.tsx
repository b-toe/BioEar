import { cn } from "@/lib/utils/cn";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.15em] text-gray">{eyebrow}</p>
      )}
      <h2 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">{title}</h2>
      {description && <p className="mt-4 text-lg leading-relaxed text-gray">{description}</p>}
    </div>
  );
}
