import Link from "next/link";
import { cn } from "@/lib/utils/cn";

type Variant = "primary" | "secondary" | "ghost" | "outline";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  className?: string;
  type?: "button" | "submit";
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-gradient-to-r from-lavender to-blue text-ink hover:opacity-90 shadow-sm",
  secondary: "bg-mint text-ink hover:opacity-90",
  ghost: "text-ink hover:bg-ink/5",
  outline: "border border-ink/15 text-ink hover:bg-ink/5",
};

export function Button({ children, href, onClick, variant = "primary", className, type = "button" }: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all duration-200",
    variantClasses[variant],
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
