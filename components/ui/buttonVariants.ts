import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[10px] text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-brand-ink text-white shadow-sm hover:opacity-88 hover:-translate-y-px",
        brand: "bg-brand text-white shadow-[0_4px_20px_rgba(96,99,238,0.35)] hover:bg-brand-dark hover:-translate-y-px hover:shadow-[0_8px_32px_rgba(96,99,238,0.4)]",
        outline: "border border-black/10 bg-white text-brand-ink shadow-sm hover:shadow-md hover:-translate-y-px",
        ghost: "hover:bg-black/[0.04] text-brand-ink",
        link: "text-brand underline-offset-4 hover:underline p-0 h-auto",
      },
      size: {
        default: "h-10 px-5 py-2.5",
        sm: "h-8 px-4 text-xs",
        lg: "h-12 px-7 text-base",
        xl: "h-14 px-8 text-base",
        icon: "size-10",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
);


