@AGENTS.md

# SocioN — Plataforma de Formação de Sociedades

## Stack
- **Framework:** Next.js 14+ App Router (TypeScript strict)
- **Estilização:** Tailwind CSS 4 + shadcn/ui
- **ORM:** Prisma ^6 + PostgreSQL (Neon)
- **Auth:** Auth.js v5 (NextAuth) — Google OAuth + Resend magic link
- **Pagamentos:** Stripe (API version: 2026-02-25.clover)
- **Emails:** Resend
- **Data fetching:** TanStack Query
- **Validação:** Zod

## Regras importantes

### Middleware
Nunca importar `auth` do Auth.js no middleware — estoura 1MB no Vercel free.
Checar cookie `authjs.session-token` diretamente.

### Prisma
Usar Prisma ^6 (não 7). Provider: `prisma-client-js`, datasource usa `env("DATABASE_URL")`.

### Stripe
Usar `2026-02-25.clover` como apiVersion.
`current_period_end` foi removido — usar `invoice.period_end` via `latest_invoice`.
`invoice.subscription` virou `invoice.parent.subscription_details.subscription`.
Lazy init do client Stripe para não crashar no build.

### Toast
Usar `sonner` (não o toast depreciado do shadcn).

### Trial
- Primeiro login → `plan=TRIAL`, `trialEndsAt=now+14dias`
- Upgrade durante trial é imediato (sem `trial_period_days` no Stripe)

## Estrutura de pastas
- `app/(public)/` — Landing, login, pricing
- `app/(auth)/` — App protegido (feed, perfil, matches, partnerships, settings)
- `app/api/` — Route handlers
- `lib/` — auth, db, stripe, email, subscription, validations
- `components/ui/` — shadcn/ui
- `components/paywall/` — PaywallGate
- `components/providers/` — QueryProvider
- `prisma/schema.prisma` — Schema completo

## Entidades principais do SocioN
- `User` — auth + plano + stripe
- `Profile` — dados do sócio + Trust Score
- `ProfileSkill` — competências verificadas
- `Experience` — histórico profissional
- `Project` — projetos realizados
- `Like / Match` — sistema de matching
- `Partnership` — sala da sociedade
- `Proposal` — proposta formal de sociedade
- `Milestone` — marcos da parceria
- `Review` — reputação

## Trust Score (0-100)
5 subscores iguais (20% cada):
1. Identidade (KYC)
2. Experiência (LinkedIn + anos)
3. Competência (skills verificadas)
4. Reputação (reviews)
5. Comprometimento (comportamento na plataforma)
