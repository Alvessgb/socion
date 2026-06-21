import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import Image from "next/image";

export default async function MatchesPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");
  const userId = session.user.id;

  const matches = await db.match.findMany({
    where: { OR: [{ user1Id: userId }, { user2Id: userId }] },
    include: {
      user1: { include: { profile: true } },
      user2: { include: { profile: true } },
      partnership: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-[860px] mx-auto px-4 sm:px-6 py-6 sm:py-10">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-[26px] sm:text-[32px] font-[330] leading-[1.2] [font-feature-settings:'ss03'] text-black">
          Seus Matches
        </h1>
        <p className="mt-1 text-[14px] sm:text-[16px] font-[400] [font-feature-settings:'ss03'] text-[#71717a]">
          {matches.length} {matches.length === 1 ? "match" : "matches"} — interesse mútuo confirmado
        </p>
      </div>

      {matches.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#e4e4e7] p-10 sm:p-12 text-center">
          <p className="text-[48px] mb-3">🤝</p>
          <p className="text-[18px] font-[600] [font-feature-settings:'ss03'] text-black">
            Ainda sem matches
          </p>
          <p className="text-[14px] font-[400] [font-feature-settings:'ss03'] text-[#71717a] mt-2 mb-6">
            Curta perfis no feed para gerar conexões mútuas.
          </p>
          <Link
            href="/app/feed"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-black text-white text-[14px] font-[500] [font-feature-settings:'ss03'] hover:bg-[#1a1a1a] transition-colors"
          >
            Ir para o Feed
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-3 sm:gap-4">
          {matches.map((match) => {
            const other = match.user1Id === userId ? match.user2 : match.user1;
            const otherProfile = other.profile;
            const hasPartnership = !!match.partnership;

            return (
              <div
                key={match.id}
                className="bg-white rounded-2xl border border-[#e4e4e7] p-4 sm:p-5 flex items-center gap-3 sm:gap-5"
              >
                <Link href={`/app/profile/${other.id}`} className="flex-shrink-0">
                  <Image
                    src={other.image ?? `https://api.dicebear.com/7.x/avataaars/svg?seed=${other.id}`}
                    alt={other.name ?? ""}
                    width={52}
                    height={52}
                    className="rounded-xl border border-[#e4e4e7]"
                  />
                </Link>
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] sm:text-[15px] font-[600] [font-feature-settings:'ss03'] text-black">
                    {other.name}
                  </p>
                  {otherProfile && (
                    <p className="text-[12px] sm:text-[13px] font-[400] [font-feature-settings:'ss03'] text-[#71717a] mt-0.5 truncate">
                      {otherProfile.headline}
                    </p>
                  )}
                  <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                    <span className="text-[10px] sm:text-[11px] font-[600] uppercase tracking-wide [font-feature-settings:'ss03'] text-[#a1a1aa]">
                      {new Date(match.createdAt).toLocaleDateString("pt-BR")}
                    </span>
                    {hasPartnership && (
                      <span className="text-[10px] sm:text-[11px] font-[600] bg-[#c1fbd4] text-[#16a34a] px-2 py-0.5 rounded-full">
                        Em negociação
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-2 flex-shrink-0">
                  <Link
                    href={`/app/profile/${other.id}`}
                    className="px-3 sm:px-4 py-2 rounded-full bg-[#f4f4f5] text-[12px] sm:text-[13px] font-[500] [font-feature-settings:'ss03'] text-[#3f3f46] hover:bg-[#e4e4e7] transition-colors text-center whitespace-nowrap"
                  >
                    Ver perfil
                  </Link>
                  {hasPartnership ? (
                    <Link
                      href={`/app/partnerships/${match.partnership!.id}`}
                      className="px-3 sm:px-4 py-2 rounded-full bg-black text-[12px] sm:text-[13px] font-[500] [font-feature-settings:'ss03'] text-white hover:bg-[#1a1a1a] transition-colors text-center whitespace-nowrap"
                    >
                      Parceria
                    </Link>
                  ) : (
                    <StartPartnershipButton matchId={match.id} />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function StartPartnershipButton({ matchId }: { matchId: string }) {
  async function startPartnership() {
    "use server";
    const existing = await db.partnership.findUnique({ where: { matchId } });
    if (!existing) {
      await db.partnership.create({ data: { matchId, status: "NEGOTIATING" } });
    }
    revalidatePath("/app/matches");
  }

  return (
    <form action={startPartnership}>
      <button
        type="submit"
        className="w-full px-3 sm:px-4 py-2 rounded-full bg-[#c1fbd4] text-[12px] sm:text-[13px] font-[500] [font-feature-settings:'ss03'] text-[#16a34a] hover:bg-[#a8f5c2] active:scale-[0.98] transition-all whitespace-nowrap"
      >
        Iniciar parceria
      </button>
    </form>
  );
}
