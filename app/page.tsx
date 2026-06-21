import Link from "next/link";
import { Nav } from "@/components/ds/nav";
import { Tag } from "@/components/ds/tag";
import { buttonVariants } from "@/components/ds/button-variants";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Recursos", href: "#features" },
  { label: "Preços",   href: "/pricing" },
];

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* Nav — dark track */}
      <Nav track="dark" items={navItems} />

      {/* Hero — cinematic canvas-night */}
      <section className="flex flex-col items-center justify-center text-center px-6 pt-32 pb-40 gap-8 bg-black">
        <Tag variant="dark">Plataforma de Formação de Sociedades</Tag>

        <h1 className="text-display-xl max-w-4xl text-white">
          Encontre o sócio certo.
          <br />
          Com confiança.
        </h1>

        <p className="text-body-lg text-[#a1a1aa] max-w-[560px]">
          SocioN valida competências, histórico e compatibilidade antes de você
          assinar qualquer contrato.
        </p>

        <div className="flex gap-4 mt-4">
          <Link
            href="/login"
            className={cn(buttonVariants({ variant: "outlineDark", size: "lg" }))}
          >
            Começar grátis
          </Link>
          <Link
            href="/pricing"
            className={cn(buttonVariants({ variant: "ghost", size: "lg" }))}
          >
            Ver planos
          </Link>
        </div>
      </section>

      {/* Features — transactional canvas-cream */}
      <section id="features" className="py-32 px-6 bg-[#fbfbf5]">
        <div className="max-w-5xl mx-auto">
          <p className="text-eyebrow text-[#71717a] text-center mb-4">Por que o SocioN?</p>
          <h2 className="text-display-md text-black text-center mb-16">
            Infraestrutura de confiança
            <br />
            para formação de empresas.
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="p-8 rounded-xl bg-white border border-[#e4e4e7]
                  shadow-[0_8px_8px_rgba(0,0,0,0.1),0_4px_4px_rgba(0,0,0,0.1),0_2px_2px_rgba(0,0,0,0.1),0_0_0_1px_rgba(0,0,0,0.1)]"
              >
                <div className="text-3xl mb-4">{f.icon}</div>
                <h3 className="text-heading-md text-black mb-2">{f.title}</h3>
                <p className="text-body-md text-[#71717a]">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Score section — pistachio band */}
      <section className="py-24 px-6 bg-[#d4f9e0]">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-eyebrow text-[#52525b] mb-4">Trust Engine</p>
          <h2 className="text-display-md text-black mb-6">
            Confiança subjetiva
            <br />
            em confiança mensurável.
          </h2>
          <p className="text-body-lg text-[#52525b] mb-10">
            Score 0-100 baseado em identidade verificada, histórico profissional,
            competências, reputação e comprometimento.
          </p>
          <Link
            href="/login"
            className={cn(buttonVariants({ variant: "primary", size: "lg" }))}
          >
            Criar meu perfil
          </Link>
        </div>
      </section>

      {/* Footer — dark canvas */}
      <footer className="py-16 px-6 bg-black border-t border-[#1e2c31]">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between gap-8">
          <div>
            <p className="text-heading-md text-white mb-2">SocioN</p>
            <p className="text-caption text-[#71717a]">
              © 2025 SocioN. Todos os direitos reservados.
            </p>
          </div>
          <nav className="flex flex-col gap-2">
            <p className="text-eyebrow text-[#52525b] mb-2">Produto</p>
            {["Recursos", "Preços", "Login"].map((l) => (
              <a key={l} href="#" className="text-caption text-[#9dabad] hover:text-white transition-colors">
                {l}
              </a>
            ))}
          </nav>
        </div>
      </footer>
    </div>
  );
}

const features = [
  { icon: "🔒", title: "Trust Score",        description: "Score 0-100 baseado em identidade verificada, histórico, competências e reputação." },
  { icon: "🤝", title: "Match Inteligente",  description: "Algoritmo de compatibilidade que considera perfil comportamental, disponibilidade e objetivos." },
  { icon: "📋", title: "Sala da Sociedade",  description: "Workspace completo para acompanhar proposta, negociação e assinatura do contrato." },
  { icon: "🔍", title: "Due Diligence por IA", description: "IA extrai evidências do LinkedIn, detecta inconsistências e gera explicações verificáveis." },
  { icon: "🌐", title: "Rede de Confiança",  description: "Descubra conexões em comum e peça referências antes de tomar qualquer decisão." },
  { icon: "📱", title: "Feed de Pitches",    description: "Scroll infinito de vídeos de 60s. Descubra sócios em potencial de forma rápida e visual." },
];
