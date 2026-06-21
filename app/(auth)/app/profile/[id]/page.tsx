import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { notFound } from "next/navigation";
import Image from "next/image";

export default async function ProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await auth();
  const viewerId = session?.user?.id;

  const targetId = id === "me" ? viewerId : id;
  if (!targetId) notFound();

  const user = await db.user.findUnique({
    where:   { id: targetId },
    include: {
      profile: {
        include: {
          skills:      { orderBy: { level: "desc" } },
          experiences: { orderBy: { startDate: "desc" } },
          projects:    true,
        },
      },
    },
  });

  if (!user?.profile) notFound();
  const p = user.profile;

  const subscores = [
    { label: "Identidade",      value: p.scoreIdentity,     icon: "🪪" },
    { label: "Experiência",     value: p.scoreExperience,   icon: "💼" },
    { label: "Competência",     value: p.scoreCompetence,   icon: "⚡" },
    { label: "Reputação",       value: p.scoreReputation,   icon: "⭐" },
    { label: "Comprometimento", value: p.scoreCommitment,   icon: "🔒" },
  ];

  const availability: Record<string, string> = {
    FULL_TIME:  "Dedicação integral",
    PART_TIME:  "Meio período",
    HALF_TIME:  "25h/semana",
    CONSULTING: "Consultoria",
    INVESTING:  "Apenas investindo",
  };

  const investment: Record<string, string> = {
    NONE:         "Sem aporte financeiro",
    UP_TO_10K:    "Até R$10k",
    UP_TO_50K:    "Até R$50k",
    UP_TO_200K:   "Até R$200k",
    ABOVE_200K:   "Acima de R$200k",
  };

  const skillCategory: Record<string, string> = {
    TECHNOLOGY: "Tecnologia",
    DESIGN:     "Design",
    MARKETING:  "Marketing",
    SALES:      "Vendas",
    FINANCE:    "Finanças",
    OPERATIONS: "Operações",
    LEGAL:      "Jurídico",
    PRODUCT:    "Produto",
    OTHER:      "Outro",
  };

  return (
    <div className="max-w-[860px] mx-auto px-6 py-10">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-[#e4e4e7] p-8 mb-6">
        <div className="flex items-start gap-6">
          <Image
            src={user.image ?? `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.id}`}
            alt={user.name ?? ""}
            width={88}
            height={88}
            className="rounded-2xl border border-[#e4e4e7] flex-shrink-0"
          />
          <div className="flex-1">
            <div className="flex items-start justify-between flex-wrap gap-3">
              <div>
                <h1 className="text-[28px] font-[600] leading-[1.2] [font-feature-settings:'ss03'] text-black">
                  {user.name}
                </h1>
                <p className="text-[15px] font-[500] [font-feature-settings:'ss03'] text-[#3f3f46] mt-0.5">
                  {p.headline}
                </p>
                <p className="text-[13px] font-[400] [font-feature-settings:'ss03'] text-[#71717a] mt-1">
                  {p.city}, {p.state}
                </p>
              </div>
              <div className="text-center">
                <div className="text-[48px] font-[330] leading-none [font-feature-settings:'ss03'] text-black">
                  {p.trustScore}
                </div>
                <div className="text-[11px] font-[600] uppercase tracking-widest [font-feature-settings:'ss03'] text-[#a1a1aa] mt-1">
                  Trust Score
                </div>
              </div>
            </div>
            <p className="mt-4 text-[14px] font-[400] [font-feature-settings:'ss03'] text-[#3f3f46] leading-relaxed">
              {p.bio}
            </p>
            <div className="flex flex-wrap gap-3 mt-4">
              <Chip>{availability[p.availability] ?? p.availability}</Chip>
              <Chip>{investment[p.investmentRange] ?? p.investmentRange}</Chip>
              {p.kycStatus === "VERIFIED" && (
                <Chip color="green">✓ Identidade verificada</Chip>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Pitch Video */}
      {p.pitchVideoUrl && (
        <div className="bg-black rounded-2xl overflow-hidden mb-6 aspect-video">
          <iframe
            src={p.pitchVideoUrl}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}

      {/* Trust Score breakdown */}
      <div className="bg-white rounded-2xl border border-[#e4e4e7] p-6 mb-6">
        <h2 className="text-[18px] font-[600] [font-feature-settings:'ss03'] text-black mb-4">
          Trust Score
        </h2>
        <div className="flex flex-col gap-3">
          {subscores.map((s) => (
            <div key={s.label} className="flex items-center gap-3">
              <span className="text-[18px] w-6">{s.icon}</span>
              <span className="text-[13px] font-[500] [font-feature-settings:'ss03'] text-[#3f3f46] w-32">
                {s.label}
              </span>
              <div className="flex-1 h-2 bg-[#f4f4f5] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-[#c1fbd4]"
                  style={{ width: `${s.value}%` }}
                />
              </div>
              <span className="text-[13px] font-[600] [font-feature-settings:'ss03'] text-black w-8 text-right">
                {s.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Skills */}
      {p.skills.length > 0 && (
        <div className="bg-white rounded-2xl border border-[#e4e4e7] p-6 mb-6">
          <h2 className="text-[18px] font-[600] [font-feature-settings:'ss03'] text-black mb-4">
            Competências
          </h2>
          <div className="flex flex-col gap-3">
            {p.skills.map((skill) => (
              <div key={skill.id} className="flex items-center gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[13px] font-[600] [font-feature-settings:'ss03'] text-black">
                      {skill.name}
                    </span>
                    {skill.verified && (
                      <span className="text-[11px] font-[600] text-[#16a34a] bg-[#dcfce7] px-2 py-0.5 rounded-full">
                        ✓ Verificado
                      </span>
                    )}
                    <span className="text-[11px] font-[500] [font-feature-settings:'ss03'] text-[#a1a1aa] ml-auto">
                      {skillCategory[skill.category] ?? skill.category}
                    </span>
                  </div>
                  <div className="h-1.5 bg-[#f4f4f5] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width:      `${skill.level}%`,
                        background: skill.verified ? "#86efac" : "#d4d4d8",
                      }}
                    />
                  </div>
                  {skill.evidence && (
                    <p className="text-[11px] font-[400] [font-feature-settings:'ss03'] text-[#71717a] mt-1">
                      {skill.evidence}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Experience */}
      {p.experiences.length > 0 && (
        <div className="bg-white rounded-2xl border border-[#e4e4e7] p-6 mb-6">
          <h2 className="text-[18px] font-[600] [font-feature-settings:'ss03'] text-black mb-4">
            Experiência
          </h2>
          <div className="flex flex-col gap-5">
            {p.experiences.map((exp) => (
              <div key={exp.id} className="flex gap-4">
                <div className="w-1 bg-[#e4e4e7] rounded-full flex-shrink-0" />
                <div>
                  <p className="text-[14px] font-[600] [font-feature-settings:'ss03'] text-black">
                    {exp.title}
                  </p>
                  <p className="text-[13px] font-[500] [font-feature-settings:'ss03'] text-[#71717a]">
                    {exp.company} · {exp.startDate.getFullYear()} –{" "}
                    {exp.current ? "Presente" : exp.endDate?.getFullYear()}
                  </p>
                  {exp.description && (
                    <p className="text-[13px] font-[400] [font-feature-settings:'ss03'] text-[#3f3f46] mt-1">
                      {exp.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {p.projects.length > 0 && (
        <div className="bg-white rounded-2xl border border-[#e4e4e7] p-6">
          <h2 className="text-[18px] font-[600] [font-feature-settings:'ss03'] text-black mb-4">
            Projetos
          </h2>
          <div className="flex flex-col gap-4">
            {p.projects.map((proj) => (
              <div key={proj.id} className="p-4 bg-[#fbfbf5] rounded-xl">
                <p className="text-[14px] font-[600] [font-feature-settings:'ss03'] text-black">
                  {proj.title}
                </p>
                <p className="text-[13px] font-[400] [font-feature-settings:'ss03'] text-[#3f3f46] mt-1">
                  {proj.description}
                </p>
                {proj.results && (
                  <p className="text-[12px] font-[600] [font-feature-settings:'ss03'] text-[#16a34a] mt-2">
                    → {proj.results}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function Chip({
  children,
  color,
}: {
  children: React.ReactNode;
  color?: "green";
}) {
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-[12px] font-[500] [font-feature-settings:'ss03'] ${
        color === "green"
          ? "bg-[#dcfce7] text-[#16a34a]"
          : "bg-[#f4f4f5] text-[#3f3f46]"
      }`}
    >
      {children}
    </span>
  );
}
