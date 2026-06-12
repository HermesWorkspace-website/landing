import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold tracking-wide transition-colors",
  {
    variants: {
      variant: {
        brand: "bg-brand/[0.08] text-brand-dark border border-brand/[0.14]",
        dark: "bg-brand-ink text-white",
        green: "bg-green-500/[0.08] text-green-700 border border-green-500/[0.14]",
        outline: "border border-black/10 text-brand-ink/70",
        purple: "bg-purple-500/[0.08] text-purple-700 border border-purple-500/[0.14]",
      },
    },
    defaultVariants: { variant: "brand" },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

const Badge = React.memo(function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
});

export { Badge, badgeVariants };
