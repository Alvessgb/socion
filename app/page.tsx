import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 py-24 gap-8">
        <Badge variant="secondary">Plataforma de Formação de Sociedades</Badge>
        <h1 className="text-5xl font-bold tracking-tight max-w-3xl leading-tight">
          Encontre o sócio certo.{" "}
          <span className="text-primary">Com confiança.</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl">
          SocioN valida competências, histórico e compatibilidade antes de você
          assinar qualquer contrato. LinkedIn + Tinder + Due Diligence de Sócios.
        </p>
        <div className="flex gap-4">
          <Link href="/login" className={cn(buttonVariants({ size: "lg" }))}>
            Começar grátis
          </Link>
          <Link href="/pricing" className={cn(buttonVariants({ variant: "outline", size: "lg" }))}>
            Ver planos
          </Link>
        </div>
      </main>

      {/* Features */}
      <section className="py-24 px-4 bg-muted/40">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Por que o SocioN?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((f) => (
              <div key={f.title} className="p-6 rounded-xl bg-background border">
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
                <p className="text-muted-foreground text-sm">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-sm text-muted-foreground border-t">
        © 2025 SocioN. Todos os direitos reservados.
      </footer>
    </div>
  );
}

const features = [
  {
    icon: "🔒",
    title: "Trust Score",
    description:
      "Score de confiança 0-100 baseado em identidade verificada, histórico, competências e reputação.",
  },
  {
    icon: "🤝",
    title: "Match Inteligente",
    description:
      "Algoritmo de compatibilidade que considera perfil comportamental, disponibilidade e objetivos.",
  },
  {
    icon: "📋",
    title: "Sala da Sociedade",
    description:
      "Workspace completo para acompanhar proposta, negociação e assinatura do contrato.",
  },
  {
    icon: "🔍",
    title: "Due Diligence por IA",
    description:
      "IA extrai evidências do LinkedIn, detecta inconsistências e gera explicações verificáveis.",
  },
  {
    icon: "🌐",
    title: "Rede de Confiança",
    description:
      "Descubra conexões em comum e peça referências antes de tomar qualquer decisão.",
  },
  {
    icon: "📱",
    title: "Feed de Pitches",
    description:
      "Scroll infinito de vídeos de 60s. Descubra sócios em potencial de forma rápida e visual.",
  },
];
