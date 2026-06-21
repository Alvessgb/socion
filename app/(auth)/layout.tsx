import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { buttonVariants } from "@/components/ds/button-variants";

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user) redirect("/login");

  return (
    <div className="min-h-screen bg-[#fbfbf5]">
      {/* Top Nav */}
      <nav className="sticky top-0 z-50 bg-black border-b border-white/10">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-1 sm:gap-6">
            <Link
              href="/app/feed"
              className="text-[20px] sm:text-[22px] font-[330] leading-none [font-feature-settings:'ss03'] text-white mr-2"
            >
              SocioN
            </Link>
            <NavLink href="/app/feed">Feed</NavLink>
            <NavLink href="/app/matches">Matches</NavLink>
            <NavLink href="/app/partnerships" className="hidden sm:inline-flex">Parcerias</NavLink>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <Link href="/app/profile/me" className="flex items-center gap-2 group">
              {session.user.image && (
                <Image
                  src={session.user.image}
                  alt={session.user.name ?? ""}
                  width={30}
                  height={30}
                  className="rounded-full border border-white/20"
                />
              )}
              <span className="hidden sm:inline text-[14px] font-[420] [font-feature-settings:'ss03'] text-white/80 group-hover:text-white transition-colors">
                {session.user.name?.split(" ")[0]}
              </span>
            </Link>
            <Link
              href="/settings/billing"
              className={buttonVariants({ variant: "aloe", size: "sm" })}
            >
              <span className="hidden sm:inline">Plano</span>
              <span className="sm:hidden">PRO</span>
            </Link>
          </div>
        </div>
      </nav>

      <main className="pb-20 sm:pb-0">{children}</main>

      {/* Bottom Nav (mobile only) */}
      <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-black border-t border-white/10">
        <div className="flex items-center justify-around h-16 px-2">
          <BottomNavLink href="/app/feed" icon="🏠" label="Feed" />
          <BottomNavLink href="/app/matches" icon="🤝" label="Matches" />
          <BottomNavLink href="/app/partnerships" icon="🏢" label="Parcerias" />
          <BottomNavLink href="/app/profile/me" icon="👤" label="Perfil" />
        </div>
      </nav>
    </div>
  );
}

function NavLink({ href, children, className = "" }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <Link
      href={href}
      className={`px-3 py-1.5 rounded-full text-[14px] font-[420] [font-feature-settings:'ss03'] text-white/70 hover:text-white hover:bg-white/10 transition-colors ${className}`}
    >
      {children}
    </Link>
  );
}

function BottomNavLink({ href, icon, label }: { href: string; icon: string; label: string }) {
  return (
    <Link href={href} className="flex flex-col items-center gap-1 py-2 px-3 rounded-xl text-white/60 hover:text-white transition-colors">
      <span className="text-[20px] leading-none">{icon}</span>
      <span className="text-[10px] font-[500] [font-feature-settings:'ss03']">{label}</span>
    </Link>
  );
}
