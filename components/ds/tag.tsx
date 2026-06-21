import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const tagVariants = cva(
  [
    "inline-flex items-center",
    "rounded-[9999px]",
    "text-[12px] font-[400] leading-[1.2] tracking-[0.72px] uppercase",
    "[font-feature-settings:'ss03']",
    "px-3 py-1",
  ],
  {
    variants: {
      variant: {
        mint:  "bg-[#c1fbd4] text-black",
        shade: "bg-[#d4d4d8] text-black",
        dark:  "bg-[#1e2c31] text-white",
      },
    },
    defaultVariants: { variant: "mint" },
  }
);

export interface TagProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof tagVariants> {}

const Tag = forwardRef<HTMLSpanElement, TagProps>(
  ({ className, variant, ...props }, ref) => (
    <span ref={ref} className={cn(tagVariants({ variant, className }))} {...props} />
  )
);
Tag.displayName = "Tag";

export { Tag, tagVariants };
