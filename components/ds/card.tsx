import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const cardVariants = cva("rounded-xl overflow-hidden", {
  variants: {
    variant: {
      // Pricing card — light canvas + layered tiny shadows
      pricing: [
        "bg-white text-black",
        "border border-[#e4e4e7]",
        "shadow-[0_8px_8px_rgba(0,0,0,0.1),0_4px_4px_rgba(0,0,0,0.1),0_2px_2px_rgba(0,0,0,0.1),0_0_0_1px_rgba(0,0,0,0.1)]",
        "p-8",
      ],
      // Featured pricing — aloe mint fill
      pricingFeatured: [
        "bg-[#c1fbd4] text-black",
        "p-8",
      ],
      // Cinematic feature card — dark canvas with subtle top-edge highlight
      cinematic: [
        "bg-[#0a0a0a] text-white",
        "shadow-[0_1px_2px_rgba(255,255,255,0.05),inset_0_1px_0_rgba(255,255,255,0.04)]",
        "border border-[#1e2c31]",
        "p-8",
      ],
      // Pistachio band — wide section card on light
      pistachio: [
        "bg-[#d4f9e0] text-black",
        "p-8",
      ],
      // Photo frame — full-bleed, no padding, dark canvas
      photo: [
        "bg-black text-white",
        "rounded-[20px] p-0",
      ],
      // Default elevated card
      default: [
        "bg-white text-black",
        "border border-[#e4e4e7]",
        "shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)]",
        "p-8",
      ],
    },
  },
  defaultVariants: { variant: "default" },
});

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, ...props }, ref) => (
    <div ref={ref} className={cn(cardVariants({ variant, className }))} {...props} />
  )
);
Card.displayName = "Card";

const CardHeader = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col gap-2 mb-6", className)} {...props} />
  )
);
CardHeader.displayName = "CardHeader";

const CardTitle = forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn(
        "text-[28px] font-[500] leading-[1.28] tracking-[0.42px] [font-feature-settings:'ss03']",
        "font-[family-name:var(--font-display,_'NeueHaasGrotesk_Display',_Helvetica,_Arial,_sans-serif)]",
        className
      )}
      {...props}
    />
  )
);
CardTitle.displayName = "CardTitle";

const CardDescription = forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("text-[16px] font-[420] leading-[1.5] text-[#71717a] [font-feature-settings:'ss03']", className)}
      {...props}
    />
  )
);
CardDescription.displayName = "CardDescription";

const CardContent = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("", className)} {...props} />
  )
);
CardContent.displayName = "CardContent";

const CardFooter = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center mt-6 pt-6 border-t border-[#e4e4e7]", className)} {...props} />
  )
);
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, cardVariants };
