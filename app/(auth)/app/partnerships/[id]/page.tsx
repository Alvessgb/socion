import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { notFound, redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default async function PartnershipPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await auth();
  if (!session?.user?.id) redirect("/login");
  const userId = session.user.id;

  const partnership = await db.partnership.findUnique({
    where:   { id },
    include: {
      members:  { include: { user: { include: { profile: true } } } },
      milestones: { orderBy: { order: "asc" } },
      proposals:  { include: { fromUser: true } },
      match:    { include: { user1: true, user2: true } },
    },
  });

  if (!partnership) notFound();

  const isMember = partnership.members.some((m) => m.userId === userId);
  if (!isMember) redirect("/app/matches");

  const statusLabel: Record<string, string> = {
    NEGOTIATING: "Em negociação",
    ACTIVE:      "Ativa",
    PAUSED:      "Pausada",
    DISSOLVED:   "Encerrada",
  };

  const completedCount = partnership.milestones.filter((m) => m.completed).length;
  const totalCount     = partnership.milestones.length;
  const progressPct    = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="max-w-[860px] mx-auto px-6 py-10">
      {/* Header */}
      <div className="bg-black rounded-2xl p-8 mb-6 text-white">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <p className="text-[11px] font-[600] uppercase tracking-widest [font-feature-settings:'ss03'] text-white/50 mb-2">
              Sala da Sociedade
            </p>
            <h1 className="text-[28px] font-[330] leading-[1.2] [font-feature-settings:'ss03']">
              {partnership.members.map((m) => m.user.name?.split(" ")[0]).join(" & ")}
            </h1>
            <span className="inline-flex mt-3 items-center px-3 py-1 rounded-full text-[12px] font-[600] [font-feature-settings:'ss03'] bg-white/10 text-white/80">
              {statusLabel[partnership.status] ?? partnership.status}
            </span>
          </div>
          <div className="text-right">
            <p className="text-[11px] font-[600] uppercase tracking-widest [font-feature-settings:'ss03'] text-white/50">
              Progresso
            </p>
            <p className="text-[40px] font-[330] leading-none [font-feature-settings:'ss03'] mt-1">
              {progressPct}%
            </p>
            <p className="text-[12px] font-[400] [font-feature-settings:'ss03'] text-white/50 mt-1">
              {completedCount}/{totalCount} etapas
            </p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-6 h-2 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#c1fbd4] rounded-full transition-all"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {/* Members */}
      <div className="bg-white rounded-2xl border border-[#e4e4e7] p-6 mb-6">
        <h2 className="text-[18px] font-[600] [font-feature-settings:'ss03'] text-black mb-4">
          Sócios
        </h2>
        <div className="flex gap-4 flex-wrap">
          {partnership.members.map((member) => (
            <Link
              key={member.id}
              href={`/app/profile/${member.userId}`}
              className="flex items-center gap-3 p-4 rounded-xl bg-[#fbfbf5] border border-[#e4e4e7] hover:shadow-sm transition-shadow"
            >
              <Image
                src={member.user.image ?? `https://api.dicebear.com/7.x/avataaars/svg?seed=${member.userId}`}
                alt={member.user.name ?? ""}
                width={48}
                height={48}
                className="rounded-xl border border-[#e4e4e7]"
              />
              <div>
                <p className="text-[14px] font-[600] [font-feature-settings:'ss03'] text-black">
                  {member.user.name}
                </p>
                <p className="text-[12px] font-[400] [font-feature-settings:'ss03'] text-[#71717a]">
                  {member.role ?? "Co-Founder"} · {member.equity ?? 50}% equity
                </p>
                {member.userId === userId && (
                  <span className="text-[11px] font-[600] text-[#16a34a]">Você</span>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Milestones / Etapas */}
      <div className="bg-white rounded-2xl border border-[#e4e4e7] p-6 mb-6">
        <h2 className="text-[18px] font-[600] [font-feature-settings:'ss03'] text-black mb-4">
          Etapas da Parceria
        </h2>
        <div className="flex flex-col gap-3">
          {partnership.milestones.map((ms, idx) => (
            <div key={ms.id} className="flex items-center gap-4">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-[700] flex-shrink-0 ${
                  ms.completed
                    ? "bg-[#c1fbd4] text-[#16a34a]"
                    : "bg-[#f4f4f5] text-[#a1a1aa]"
                }`}
              >
                {ms.completed ? "✓" : idx + 1}
              </div>
              <div className="flex-1">
                <p
                  className={`text-[14px] font-[500] [font-feature-settings:'ss03'] ${
                    ms.completed ? "text-[#3f3f46] line-through" : "text-black"
                  }`}
                >
                  {ms.title}
                </p>
                {ms.completed && ms.completedAt && (
                  <p className="text-[11px] font-[400] [font-feature-settings:'ss03'] text-[#a1a1aa] mt-0.5">
                    Concluído em {new Date(ms.completedAt).toLocaleDateString("pt-BR")}
                  </p>
                )}
              </div>
              {!ms.completed && (
                <ToggleMilestoneButton milestoneId={ms.id} partnershipId={id} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Proposals */}
      {partnership.proposals.length > 0 && (
        <div className="bg-white rounded-2xl border border-[#e4e4e7] p-6">
          <h2 className="text-[18px] font-[600] [font-feature-settings:'ss03'] text-black mb-4">
            Proposta de Sociedade
          </h2>
          {partnership.proposals.map((proposal) => {
            const proposalStatus: Record<string, string> = {
              PENDING:  "Aguardando resposta",
              VIEWED:   "Visualizada",
              ACCEPTED: "Aceita ✓",
              REJECTED: "Recusada",
            };
            return (
              <div key={proposal.id} className="p-5 bg-[#fbfbf5] rounded-xl">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-[13px] font-[600] [font-feature-settings:'ss03'] text-black">
                    De: {proposal.fromUser.name}
                  </p>
                  <span className="text-[12px] font-[600] [font-feature-settings:'ss03'] text-[#71717a]">
                    {proposalStatus[proposal.status] ?? proposal.status}
                  </span>
                </div>
                <div className="flex gap-4 mb-3 flex-wrap">
                  <div>
                    <p className="text-[11px] uppercase tracking-wide font-[600] [font-feature-settings:'ss03'] text-[#a1a1aa]">
                      Cargo proposto
                    </p>
                    <p className="text-[14px] font-[600] [font-feature-settings:'ss03'] text-black">
                      {proposal.role}
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-wide font-[600] [font-feature-settings:'ss03'] text-[#a1a1aa]">
                      Equity
                    </p>
                    <p className="text-[14px] font-[600] [font-feature-settings:'ss03'] text-black">
                      {proposal.equity}%
                    </p>
                  </div>
                  {proposal.investmentType.length > 0 && (
                    <div>
                      <p className="text-[11px] uppercase tracking-wide font-[600] [font-feature-settings:'ss03'] text-[#a1a1aa]">
                        Contribuição
                      </p>
                      <p className="text-[14px] font-[600] [font-feature-settings:'ss03'] text-black">
                        {proposal.investmentType.join(", ")}
                      </p>
                    </div>
                  )}
                </div>
                <p className="text-[13px] font-[400] [font-feature-settings:'ss03'] text-[#3f3f46] leading-relaxed">
                  {proposal.message}
                </p>
                {proposal.toUserId === userId && proposal.status === "VIEWED" && (
                  <div className="flex gap-2 mt-4">
                    <AcceptProposalButton proposalId={proposal.id} />
                    <RejectProposalButton proposalId={proposal.id} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function ToggleMilestoneButton({ milestoneId, partnershipId }: { milestoneId: string; partnershipId: string }) {
  async function complete() {
    "use server";
    await db.milestone.update({
      where: { id: milestoneId },
      data:  { completed: true, completedAt: new Date() },
    });
  }
  return (
    <form action={complete}>
      <button
        type="submit"
        className="px-3 py-1.5 rounded-full bg-[#f4f4f5] text-[12px] font-[500] [font-feature-settings:'ss03'] text-[#3f3f46] hover:bg-[#e4e4e7] transition-colors"
      >
        Concluir
      </button>
    </form>
  );
}

function AcceptProposalButton({ proposalId }: { proposalId: string }) {
  async function accept() {
    "use server";
    await db.proposal.update({ where: { id: proposalId }, data: { status: "ACCEPTED" } });
  }
  return (
    <form action={accept}>
      <button
        type="submit"
        className="px-4 py-2 rounded-full bg-[#c1fbd4] text-[13px] font-[600] [font-feature-settings:'ss03'] text-[#16a34a] hover:bg-[#a8f5c2] transition-colors"
      >
        Aceitar proposta
      </button>
    </form>
  );
}

function RejectProposalButton({ proposalId }: { proposalId: string }) {
  async function reject() {
    "use server";
    await db.proposal.update({ where: { id: proposalId }, data: { status: "REJECTED" } });
  }
  return (
    <form action={reject}>
      <button
        type="submit"
        className="px-4 py-2 rounded-full bg-[#f4f4f5] text-[13px] font-[500] [font-feature-settings:'ss03'] text-[#3f3f46] hover:bg-[#e4e4e7] transition-colors"
      >
        Recusar
      </button>
    </form>
  );
}
