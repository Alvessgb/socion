import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { hasAccess, daysLeftInTrial, isTrialActive } from "@/lib/subscription";
import { createCheckoutSession, createCustomerPortalSession } from "@/lib/stripe";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default async function BillingPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const user = await db.user.findUnique({ where: { id: session.user.id } });
  if (!user) redirect("/login");

  const access = hasAccess(user);
  const trialActive = isTrialActive(user);
  const daysLeft = daysLeftInTrial(user);

  return (
    <div className="container mx-auto py-8 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Assinatura</h1>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Plano atual</CardTitle>
            <Badge variant={user.plan === "PRO" ? "default" : "secondary"}>
              {user.plan}
            </Badge>
          </div>
          <CardDescription>
            {trialActive && `Trial: ${daysLeft} dias restantes`}
            {user.plan === "PRO" && "Acesso completo ativo"}
            {!access && "Seu acesso expirou"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {user.plan !== "PRO" && (
            <form
              action={async () => {
                "use server";
                const checkoutSession = await createCheckoutSession(
                  user.id,
                  user.email!,
                  user.stripeCustomerId
                );
                redirect(checkoutSession.url!);
              }}
            >
              <Button type="submit" className="w-full">
                Fazer upgrade para PRO — R$ 49/mês
              </Button>
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
              <Button type="submit" variant="outline" className="w-full">
                Gerenciar assinatura
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
