import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2",
    "rounded-[9999px]",
    "text-[16px] font-[420] leading-[1.5] tracking-[0]",
    "[font-feature-settings:'ss03']",
    "px-6 py-3",
    "min-h-[44px]",
    "transition-colors duration-150",
    "disabled:pointer-events-none disabled:opacity-50",
    "select-none whitespace-nowrap",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    "[&_svg]:size-4 [&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        primary: [
          "bg-[#000000] text-white",
          "hover:bg-[#3f3f46]",
          "active:bg-[#3f3f46]",
          "focus-visible:ring-[#71717a]",
        ],
        outlineDark: [
          "bg-transparent text-white",
          "border-2 border-white",
          "hover:bg-white/10",
          "focus-visible:ring-white",
        ],
        outlineLight: [
          "bg-white text-black",
          "border border-black",
          "hover:bg-[#f4f4f5]",
          "focus-visible:ring-black",
        ],
        aloe: [
          "bg-[#c1fbd4] text-black",
          "hover:bg-[#a8f5c2]",
          "focus-visible:ring-[#c1fbd4]",
        ],
        ghost: [
          "bg-transparent text-white",
          "hover:bg-white/10",
          "focus-visible:ring-white/50",
        ],
      },
      size: {
        sm:   "px-4 py-2 text-sm min-h-[36px]",
        md:   "px-6 py-3 text-[16px] min-h-[44px]",
        lg:   "px-8 py-4 text-lg min-h-[52px]",
        icon: "p-2.5 min-h-[44px] min-w-[44px]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size:    "md",
    },
  }
);
