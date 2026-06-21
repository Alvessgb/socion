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
      <nav className="sticky top-0 z-50 bg-black border-b border-white/10">
        <div className="max-w-[1200px] mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link
              href="/app/feed"
              className="text-[22px] font-[330] leading-none [font-feature-settings:'ss03'] text-white"
            >
              SocioN
            </Link>
            <div className="flex items-center gap-1">
              <NavLink href="/app/feed">Feed</NavLink>
              <NavLink href="/app/matches">Matches</NavLink>
              <NavLink href="/app/partnerships">Parcerias</NavLink>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/app/profile/me" className="flex items-center gap-2 group">
              {session.user.image && (
                <Image
                  src={session.user.image}
                  alt={session.user.name ?? ""}
                  width={32}
                  height={32}
                  className="rounded-full border border-white/20"
                />
              )}
              <span className="text-[14px] font-[420] [font-feature-settings:'ss03'] text-white/80 group-hover:text-white transition-colors">
                {session.user.name?.split(" ")[0]}
              </span>
            </Link>
            <Link
              href="/settings/billing"
              className={buttonVariants({ variant: "aloe", size: "sm" })}
            >
              Plano
            </Link>
          </div>
        </div>
      </nav>
      <main>{children}</main>
    </div>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="px-3 py-1.5 rounded-full text-[14px] font-[420] [font-feature-settings:'ss03'] text-white/70 hover:text-white hover:bg-white/10 transition-colors"
    >
      {children}
    </Link>
  );
}
