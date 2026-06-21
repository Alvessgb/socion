import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { hasAccess, daysLeftInTrial, isTrialActive } from "@/lib/subscription";
import { createCheckoutSession, createCustomerPortalSession } from "@/lib/stripe";

export default async function BillingPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const user = await db.user.findUnique({ where: { id: session.user.id } });
  if (!user) redirect("/login");

  const access = hasAccess(user);
  const trialActive = isTrialActive(user);
  const daysLeft = daysLeftInTrial(user);

  const planBadgeColor =
    user.plan === "PRO" ? "bg-[#c1fbd4] text-black" : "bg-[#d4d4d8] text-black";

  return (
    <div className="min-h-screen bg-[#fbfbf5] px-4 py-12">
      <div className="max-w-[640px] mx-auto">
        <h1 className="text-[48px] font-[330] leading-[1.14] [font-feature-settings:'ss03'] text-black mb-8">
          Assinatura
        </h1>

        <div className="bg-white rounded-xl border border-[#e4e4e7] p-8
          shadow-[0_8px_8px_rgba(0,0,0,0.1),0_4px_4px_rgba(0,0,0,0.1),0_2px_2px_rgba(0,0,0,0.1),0_0_0_1px_rgba(0,0,0,0.1)]">

          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-[28px] font-[500] leading-[1.28] [font-feature-settings:'ss03'] text-black mb-1">
                Plano atual
              </h2>
              <p className="text-[16px] font-[420] leading-[1.5] [font-feature-settings:'ss03'] text-[#71717a]">
                {trialActive && `Trial ativo — ${daysLeft} dias restantes`}
                {user.plan === "PRO" && "Acesso PRO completo ativo"}
                {!access && !trialActive && "Seu acesso expirou"}
              </p>
            </div>
            <span className={`inline-flex items-center rounded-[9999px] px-3 py-1 text-[12px] font-[500] tracking-[0.72px] uppercase [font-feature-settings:'ss03'] ${planBadgeColor}`}>
              {user.plan}
            </span>
          </div>

          <div className="border-t border-[#e4e4e7] pt-6">
            {user.plan !== "PRO" && (
              <form
                action={async () => {
                  "use server";
                  const s = await createCheckoutSession(user.id, user.email!, user.stripeCustomerId);
                  redirect(s.url!);
                }}
              >
                <button
                  type="submit"
                  className="w-full rounded-[9999px] bg-black text-white px-6 py-3 min-h-[44px]
                    text-[16px] font-[420] leading-[1.5] [font-feature-settings:'ss03']
                    hover:bg-[#3f3f46] transition-colors duration-150"
                >
                  Fazer upgrade para PRO — R$ 49/mês
                </button>
              </form>
            )}
            {user.plan === "PRO" && user.stripeCustomerId && (
              <form
                action={async () => {
                  "use server";
                  const portal = await createCustomerPortalSession(user.stripeCustomerId!);
                  redirect(portal.url);
                }}
              >
                <button
                  type="submit"
                  className="w-full rounded-[9999px] bg-white text-black border border-black px-6 py-3 min-h-[44px]
                    text-[16px] font-[420] leading-[1.5] [font-feature-settings:'ss03']
                    hover:bg-[#f4f4f5] transition-colors duration-150"
                >
                  Gerenciar assinatura
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
