import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, hint, error, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-[16px] font-[550] leading-[1.5] [font-feature-settings:'ss03'] text-black"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            "w-full rounded-[8px]",
            "bg-white text-black",
            "border border-[#e4e4e7]",
            "px-3 py-[10px]",
            "text-[16px] font-[420] leading-[1.5] [font-feature-settings:'ss03']",
            "min-h-[44px]",
            "placeholder:text-[#a1a1aa]",
            "focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black",
            "transition-colors duration-150",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            error && "border-red-500 focus:ring-red-500/20",
            className
          )}
          {...props}
        />
        {hint && !error && (
          <p className="text-[13px] font-[500] leading-[1.5] text-[#71717a] [font-feature-settings:'ss03']">
            {hint}
          </p>
        )}
        {error && (
          <p className="text-[13px] font-[500] leading-[1.5] text-red-600 [font-feature-settings:'ss03']">
            {error}
          </p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
