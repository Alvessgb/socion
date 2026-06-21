type User = {
  plan: string;
  trialEndsAt: Date | null;
  stripeCurrentPeriodEnd: Date | null;
};

export function isTrialActive(user: Pick<User, "plan" | "trialEndsAt">): boolean {
  return user.plan === "TRIAL" && !!user.trialEndsAt && user.trialEndsAt > new Date();
}

export function isSubscribed(
  user: Pick<User, "plan" | "stripeCurrentPeriodEnd">
): boolean {
  return (
    user.plan === "PRO" &&
    !!user.stripeCurrentPeriodEnd &&
    user.stripeCurrentPeriodEnd > new Date()
  );
}

export function hasAccess(
  user: Pick<User, "plan" | "trialEndsAt" | "stripeCurrentPeriodEnd">
): boolean {
  return isTrialActive(user) || isSubscribed(user);
}

export function daysLeftInTrial(
  user: Pick<User, "trialEndsAt">
): number {
  if (!user.trialEndsAt) return 0;
  const diff = user.trialEndsAt.getTime() - Date.now();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

export const PLAN_LIMITS = {
  FREE: {
    likes: 5,
    profiles: 10,
    proposals: 0,
  },
  TRIAL: {
    likes: Infinity,
    profiles: Infinity,
    proposals: Infinity,
  },
  PRO: {
    likes: Infinity,
    profiles: Infinity,
    proposals: Infinity,
  },
} as const;
