import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import Image from "next/image";
import type { Profile, User, ProfileSkill } from "@prisma/client";

type ProfileWithRelations = Profile & {
  user: User;
  skills: ProfileSkill[];
};

export default async function FeedPage() {
  const session = await auth();
  const userId = session?.user?.id;

  const profiles = await db.profile.findMany({
    where:   { isVisible: true, userId: { not: userId } },
    include: { user: true, skills: { take: 4, orderBy: { level: "desc" } } },
    orderBy: { trustScore: "desc" },
    take:    24,
  });

  const likedIds = userId
    ? new Set(
        (await db.like.findMany({ where: { fromUserId: userId }, select: { toUserId: true } }))
          .map((l) => l.toUserId)
      )
    : new Set<string>();

  const availability: Record<string, string> = {
    FULL_TIME:  "Integral",
    PART_TIME:  "Parcial",
    HALF_TIME:  "Meio período",
    CONSULTING: "Consultoria",
    INVESTING:  "Investindo",
  };

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-6 sm:py-10">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-[26px] sm:text-[32px] font-[330] leading-[1.2] [font-feature-settings:'ss03'] text-black">
          Encontre seu sócio
        </h1>
        <p className="mt-1 text-[14px] sm:text-[16px] font-[400] [font-feature-settings:'ss03'] text-[#71717a]">
          {profiles.length} empreendedores disponíveis
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {profiles.map((profile) => (
          <ProfileCard
            key={profile.id}
            profile={profile}
            userId={userId}
            liked={likedIds.has(profile.userId)}
            availabilityLabel={availability[profile.availability] ?? profile.availability}
          />
        ))}
      </div>
    </div>
  );
}

function TrustBadge({ score }: { score: number }) {
  const color =
    score >= 85 ? "#16a34a" :
    score >= 65 ? "#d97706" : "#dc2626";
  const bg =
    score >= 85 ? "#dcfce7" :
    score >= 65 ? "#fef3c7" : "#fee2e2";
  return (
    <span
      className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[11px] font-[700] [font-feature-settings:'ss03']"
      style={{ background: bg, color }}
    >
      ★ {score}
    </span>
  );
}

function ProfileCard({
  profile,
  userId,
  liked,
  availabilityLabel,
}: {
  profile: ProfileWithRelations;
  userId?: string;
  liked: boolean;
  availabilityLabel: string;
}) {
  async function toggleLike() {
    "use server";
    if (!userId) return;
    const existing = await db.like.findUnique({
      where: { fromUserId_toUserId: { fromUserId: userId, toUserId: profile.userId } },
    });
    if (existing) {
      await db.like.delete({ where: { id: existing.id } });
    } else {
      await db.like.create({ data: { fromUserId: userId, toUserId: profile.userId } });
      const reverse = await db.like.findUnique({
        where: { fromUserId_toUserId: { fromUserId: profile.userId, toUserId: userId } },
      });
      if (reverse) {
        const [u1, u2] = [userId, profile.userId].sort();
        await db.match.upsert({
          where:  { user1Id_user2Id: { user1Id: u1, user2Id: u2 } },
          update: {},
          create: { user1Id: u1, user2Id: u2 },
        });
      }
    }
    revalidatePath("/app/feed");
  }

  return (
    <div className="group bg-white rounded-2xl border border-[#e4e4e7] overflow-hidden hover:shadow-[0_8px_32px_rgba(0,0,0,0.1)] transition-shadow">
      {/* Video thumbnail area */}
      {profile.pitchVideoUrl && (
        <Link href={`/app/profile/${profile.userId}`} className="block relative aspect-video bg-black overflow-hidden">
          <iframe
            src={`${profile.pitchVideoUrl}?autoplay=0&mute=1&controls=0&showinfo=0&rel=0`}
            className="w-full h-full pointer-events-none"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-2 left-2">
            <TrustBadge score={profile.trustScore} />
          </div>
        </Link>
      )}

      <div className="p-4">
        <div className="flex items-start gap-3 mb-2">
          <Link href={`/app/profile/${profile.userId}`} className="flex-shrink-0">
            <Image
              src={profile.user.image ?? `https://api.dicebear.com/7.x/avataaars/svg?seed=${profile.userId}`}
              alt={profile.user.name ?? ""}
              width={40}
              height={40}
              className="rounded-full border border-[#e4e4e7]"
            />
          </Link>
          <div className="flex-1 min-w-0">
            <Link href={`/app/profile/${profile.userId}`}>
              <p className="text-[14px] font-[600] [font-feature-settings:'ss03'] text-black truncate leading-tight">
                {profile.user.name}
              </p>
              <p className="text-[12px] font-[400] [font-feature-settings:'ss03'] text-[#71717a] truncate">
                {profile.city}, {profile.state}
              </p>
            </Link>
          </div>
          {!profile.pitchVideoUrl && <TrustBadge score={profile.trustScore} />}
        </div>

        <Link href={`/app/profile/${profile.userId}`}>
          <p className="text-[13px] font-[500] [font-feature-settings:'ss03'] text-black mb-1 line-clamp-1">
            {profile.headline}
          </p>
          <p className="text-[12px] font-[400] [font-feature-settings:'ss03'] text-[#71717a] mb-3 line-clamp-2">
            {profile.bio}
          </p>
        </Link>

        <div className="flex flex-wrap gap-1.5 mb-3">
          {profile.skills.slice(0, 3).map((s) => (
            <span
              key={s.id}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#f4f4f5] text-[11px] font-[500] [font-feature-settings:'ss03'] text-[#3f3f46]"
            >
              {s.verified && <span className="text-[#16a34a] text-[10px]">✓</span>}
              {s.name}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-[#f4f4f5]">
          <span className="text-[11px] font-[500] [font-feature-settings:'ss03'] text-[#a1a1aa] uppercase tracking-wide">
            {availabilityLabel}
          </span>
          <form action={toggleLike}>
            <button
              type="submit"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-[600] [font-feature-settings:'ss03'] transition-colors ${
                liked
                  ? "bg-[#c1fbd4] text-[#16a34a]"
                  : "bg-[#f4f4f5] text-[#3f3f46] hover:bg-[#e4e4e7] active:scale-95"
              }`}
            >
              {liked ? "✓ Curtiu" : "♡ Curtir"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
