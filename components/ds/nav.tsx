import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ds/button-variants";

interface NavItem {
  label: string;
  href: string;
}

interface NavProps {
  track?: "dark" | "light";
  items?: NavItem[];
  ctaLabel?: string;
  ctaHref?: string;
  loginHref?: string;
  className?: string;
}

export function Nav({
  track = "light",
  items = [],
  ctaLabel = "Começar grátis",
  ctaHref  = "/login",
  loginHref = "/login",
  className,
}: NavProps) {
  const isDark = track === "dark";

  return (
    <nav
      className={cn(
        "flex items-center justify-between px-6 py-4",
        isDark ? "bg-black text-white" : "bg-white text-black",
        className
      )}
    >
      {/* Logo */}
      <Link
        href="/"
        className={cn(
          "text-[20px] font-[500] leading-[1.4] tracking-[0.3px] [font-feature-settings:'ss03']",
          isDark ? "text-white" : "text-black"
        )}
      >
        SocioN
      </Link>

      {/* Nav items */}
      {items.length > 0 && (
        <ul className="hidden md:flex items-center gap-6">
          {items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "text-[16px] font-[420] leading-[1.5] [font-feature-settings:'ss03']",
                  isDark ? "text-[#a1a1aa] hover:text-white" : "text-[#52525b] hover:text-black",
                  "transition-colors duration-150"
                )}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      )}

      {/* CTAs */}
      <div className="flex items-center gap-3">
        <Link
          href={loginHref}
          className={cn(
            buttonVariants({
              variant: isDark ? "outlineDark" : "outlineLight",
              size: "md",
            })
          )}
        >
          Entrar
        </Link>
        <Link
          href={ctaHref}
          className={cn(
            buttonVariants({
              variant: isDark ? "outlineDark" : "primary",
              size: "md",
            })
          )}
        >
          {ctaLabel}
        </Link>
      </div>
    </nav>
  );
}
