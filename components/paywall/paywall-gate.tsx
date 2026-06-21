"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Lock } from "lucide-react";
import Link from "next/link";

interface PaywallGateProps {
  children: React.ReactNode;
  hasAccess: boolean;
  title?: string;
  description?: string;
}

export function PaywallGate({
  children,
  hasAccess,
  title = "Recurso PRO",
  description = "Faça upgrade para ter acesso ilimitado.",
}: PaywallGateProps) {
  if (hasAccess) return <>{children}</>;

  return (
    <Card className="border-dashed">
      <CardHeader className="text-center">
        <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
          <Lock className="h-6 w-6 text-muted-foreground" />
        </div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="text-center space-y-4">
        <p className="text-muted-foreground">{description}</p>
        <Link href="/settings/billing" className={cn(buttonVariants())}>
          Fazer upgrade
        </Link>
      </CardContent>
    </Card>
  );
}
