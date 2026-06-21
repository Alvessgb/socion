import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import Link from "next/link";
import Image from "next/image";

export default async function FeedPage() {
  const session = await auth();
  const userId = session?.user?.id;

  const profiles = await db.profile.findMany({
    where:   { isVisible: true, userId: { not: userId } },
    include: { user: true, skills: { take: 4 } },
    orderBy: { trustScore: "desc" },
    take:    20,
  });

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-10">
      <div className="mb-8">
        <h1 className="text-[32px] font-[330] leading-[1.2] [font-feature-settings:'ss03'] text-black">
          Encontre seu sócio
        </h1>
        <p className="mt-1 text-[16px] font-[400] [font-feature-settings:'ss03'] text-[#71717a]">
          {profiles.length} empreendedores disponíveis
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {profiles.map((profile) => (
          <ProfileCard key={profile.id} profile={profile} userId={userId} />
        ))}
      </div>
    </div>
  );
}

function TrustBadge({ score }: { score: number }) {
  const color =
    score >= 85 ? "#22c55e" :
    score >= 65 ? "#f59e0b" : "#ef4444";
  return (
    <span
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-[600] [font-feature-settings:'ss03']"
      style={{ background: `${color}22`, color }}
    >
      ★ {score}
    </span>
  );
}

async function ProfileCard({
  profile,
  userId,
}: {
  profile: Awaited<ReturnType<typeof db.profile.findMany>>[0];
  userId?: string;
}) {
  const alreadyLiked = userId
    ? !!(await db.like.findUnique({
        where: { fromUserId_toUserId: { fromUserId: userId, toUserId: profile.userId } },
      }))
    : false;

  const availability: Record<string, string> = {
    FULL_TIME:  "Integral",
    PART_TIME:  "Parcial",
    HALF_TIME:  "Meio período",
    CONSULTING: "Consultoria",
    INVESTING:  "Investindo",
  };

  return (
    <Link
      href={`/app/profile/${profile.userId}`}
      className="group block bg-white rounded-2xl border border-[#e4e4e7] p-5 hover:shadow-[0_8px_32px_rgba(0,0,0,0.1)] transition-shadow"
    >
      <div className="flex items-start gap-3 mb-3">
        <Image
          src={profile.user.image ?? `https://api.dicebear.com/7.x/avataaars/svg?seed=${profile.userId}`}
          alt={profile.user.name ?? ""}
          width={48}
          height={48}
          className="rounded-full border border-[#e4e4e7] flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[15px] font-[600] [font-feature-settings:'ss03'] text-black truncate">
              {profile.user.name}
            </span>
            <TrustBadge score={profile.trustScore} />
          </div>
          <p className="text-[12px] font-[400] [font-feature-settings:'ss03'] text-[#71717a] mt-0.5">
            {profile.city}, {profile.state}
          </p>
        </div>
      </div>

      <p className="text-[13px] font-[500] [font-feature-settings:'ss03'] text-black mb-1 line-clamp-1">
        {profile.headline}
      </p>
      <p className="text-[12px] font-[400] [font-feature-settings:'ss03'] text-[#71717a] mb-3 line-clamp-2">
        {profile.bio}
      </p>

      <div className="flex flex-wrap gap-1.5 mb-4">
        {profile.skills.map((s) => (
          <span
            key={s.id}
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#f4f4f5] text-[11px] font-[500] [font-feature-settings:'ss03'] text-[#3f3f46]"
          >
            {s.verified && <span className="text-[#22c55e]">✓</span>}
            {s.name}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-[#f4f4f5]">
        <span className="text-[11px] font-[500] [font-feature-settings:'ss03'] text-[#a1a1aa] uppercase tracking-wide">
          {availability[profile.availability] ?? profile.availability}
        </span>
        <LikeButton fromUserId={userId} toUserId={profile.userId} liked={alreadyLiked} />
      </div>
    </Link>
  );
}

function LikeButton({
  fromUserId,
  toUserId,
  liked,
}: {
  fromUserId?: string;
  toUserId: string;
  liked: boolean;
}) {
  async function handleLike() {
    "use server";
    if (!fromUserId) return;
    if (liked) {
      await db.like.deleteMany({ where: { fromUserId, toUserId } });
    } else {
      await db.like.upsert({
        where:  { fromUserId_toUserId: { fromUserId, toUserId } },
        update: {},
        create: { fromUserId, toUserId },
      });
      const reverse = await db.like.findUnique({
        where: { fromUserId_toUserId: { fromUserId: toUserId, toUserId: fromUserId } },
      });
      if (reverse) {
        const [u1, u2] = [fromUserId, toUserId].sort();
        await db.match.upsert({
          where:  { user1Id_user2Id: { user1Id: u1, user2Id: u2 } },
          update: {},
          create: { user1Id: u1, user2Id: u2 },
        });
      }
    }
  }

  return (
    <form action={handleLike} onClick={(e) => e.stopPropagation()}>
      <button
        type="submit"
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-[600] [font-feature-settings:'ss03'] transition-colors ${
          liked
            ? "bg-[#c1fbd4] text-[#16a34a]"
            : "bg-[#f4f4f5] text-[#3f3f46] hover:bg-[#e4e4e7]"
        }`}
      >
        {liked ? "✓ Curtiu" : "♡ Curtir"}
      </button>
    </form>
  );
}
