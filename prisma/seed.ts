import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

const VIDEOS = {
  flavioAugusto: "https://www.youtube.com/embed/L_MIF8QQRJA",
  joelJota:      "https://www.youtube.com/embed/sENKVyLF2fs",
  camilaFarani:  "https://www.youtube.com/embed/XjJwpnmVFhg",
  thiago:        "https://www.youtube.com/embed/rSjMyeNcSmo",
  conrado:       "https://www.youtube.com/embed/gLAsHkpfTCc",
  ana:           "https://www.youtube.com/embed/5MgBikgcWnY",
  carlos:        "https://www.youtube.com/embed/LXb3EKWsInQ",
  pedro:         "https://www.youtube.com/embed/SqcY0GlETPk",
  rafael:        "https://www.youtube.com/embed/aircAruvnKk",
  beatriz:       "https://www.youtube.com/embed/ZXsQAXx_ao0",
  mariana:       "https://www.youtube.com/embed/Q_DaGGQh17s",
};

async function main() {
  console.log("🌱 Seeding SocioN...");

  // ── 1. user / user ────────────────────────────────────────────────────────
  const testUser = await db.user.upsert({
    where:  { email: "user@socion.test" },
    update: { name: "Gabriel Teste", plan: "TRIAL" },
    create: {
      email: "user@socion.test", name: "Gabriel Teste",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=gabriel",
      plan: "TRIAL", emailVerified: new Date(),
      trialEndsAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    },
  });

  await db.profile.upsert({
    where:  { userId: testUser.id },
    update: {},
    create: {
      userId: testUser.id,
      headline: "CEO & Co-Founder | Ex-Nubank | Buscando CTO",
      bio: "Empreendedor em série com 2 exits. Construí produto de 0 a 50k usuários. Busco CTO para escalar IA para RH.",
      city: "São Paulo", state: "SP",
      linkedinUrl: "https://linkedin.com/in/gabriel-teste",
      pitchVideoUrl: VIDEOS.flavioAugusto,
      availability: "FULL_TIME", investmentRange: "UP_TO_50K",
      trustScore: 78, scoreIdentity: 100, scoreExperience: 85,
      scoreCompetence: 70, scoreReputation: 75, scoreCommitment: 60,
      kycStatus: "VERIFIED", isVisible: true,
    },
  });

  // ── 2. zero / zero (onboarding em branco) ────────────────────────────────
  await db.user.upsert({
    where:  { email: "zero@socion.test" },
    update: { name: "Usuário Zero" },
    create: {
      email: "zero@socion.test", name: "Usuário Zero",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=zero",
      plan: "TRIAL", emailVerified: new Date(),
      trialEndsAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    },
  });

  // ── 3. Empreendedores ─────────────────────────────────────────────────────
  const entrepreneurs: Array<{
    email: string; name: string; image: string;
    profile: {
      headline: string; bio: string; city: string; state: string;
      linkedinUrl: string; pitchVideoUrl: string;
      availability: "FULL_TIME"|"PART_TIME"|"HALF_TIME"|"CONSULTING"|"INVESTING";
      investmentRange: "NONE"|"UP_TO_10K"|"UP_TO_50K"|"UP_TO_200K"|"ABOVE_200K"|"ABOVE_50K";
      trustScore: number; scoreIdentity: number; scoreExperience: number;
      scoreCompetence: number; scoreReputation: number; scoreCommitment: number;
      kycStatus: "PENDING"|"IN_REVIEW"|"VERIFIED"|"REJECTED"; isVisible: boolean;
    };
    skills: Array<{ name: string; category: "TECHNOLOGY"|"DESIGN"|"MARKETING"|"SALES"|"FINANCE"|"OPERATIONS"|"LEGAL"|"PRODUCT"|"OTHER"; level: number; verified: boolean; evidence: string }>;
    experiences: Array<{ title: string; company: string; startDate: Date; endDate?: Date; current?: boolean; description: string }>;
    projects: Array<{ title: string; description: string; results: string; links: string[] }>;
  }> = [
    {
      email: "flavio.augusto@socion.test", name: "(seed) Flávio Augusto",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=flavioaugusto",
      profile: {
        headline: "Fundador Wise Up | Vendeu por R$700M | Investidor",
        bio: "Vendi a Wise Up por R$700 milhões. Invisto em negócios disruptivos e mentorias de alto impacto. Buscando co-investidores para portfólio de edtechs e healthtechs.",
        city: "Rio de Janeiro", state: "RJ",
        linkedinUrl: "https://linkedin.com/in/flavioaugustoofficiel",
        pitchVideoUrl: VIDEOS.flavioAugusto,
        availability: "INVESTING", investmentRange: "ABOVE_200K",
        trustScore: 99, scoreIdentity: 100, scoreExperience: 100,
        scoreCompetence: 100, scoreReputation: 98, scoreCommitment: 97,
        kycStatus: "VERIFIED", isVisible: true,
      },
      skills: [
        { name: "Negociação & M&A",       category: "SALES",      level: 99, verified: true,  evidence: "Vendeu Wise Up por R$700M em 2013." },
        { name: "Estratégia de Negócios", category: "OPERATIONS", level: 98, verified: true,  evidence: "Criou e escalou 6 empresas do zero." },
        { name: "Liderança & Cultura",    category: "OPERATIONS", level: 95, verified: true,  evidence: "Mentorou +5.000 empreendedores no Brasil." },
      ],
      experiences: [
        { title: "Fundador & CEO", company: "Wise Up", startDate: new Date("1995-01-01"), endDate: new Date("2013-12-01"), description: "Escola de inglês: 0 a 65.000 alunos." },
        { title: "Investidor Anjo / Mentor", company: "Geração de Valor", startDate: new Date("2014-01-01"), current: true, description: "Portfólio com 20+ empresas investidas." },
      ],
      projects: [
        { title: "Venda da Wise Up — R$700M", description: "Maior rede de inglês do Brasil vendida em 2013.", results: "R$700M, 65k alunos ativos", links: [] },
      ],
    },
    {
      email: "joel.jota@socion.test", name: "(seed) Joel Jota",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=joeljota",
      profile: {
        headline: "Coach Executivo | Ex-Atleta | Alta Performance para Empresários",
        bio: "Campeão mundial de polo aquático. Hoje ajudo CEOs a performar no nível mais alto. 2M seguidores, +500 empresas mentoradas.",
        city: "São Paulo", state: "SP",
        linkedinUrl: "https://linkedin.com/in/joeljota",
        pitchVideoUrl: VIDEOS.joelJota,
        availability: "CONSULTING", investmentRange: "UP_TO_50K",
        trustScore: 94, scoreIdentity: 100, scoreExperience: 95,
        scoreCompetence: 93, scoreReputation: 95, scoreCommitment: 87,
        kycStatus: "VERIFIED", isVisible: true,
      },
      skills: [
        { name: "Alta Performance",     category: "OPERATIONS", level: 97, verified: true,  evidence: "Mentorou +500 CEOs e líderes." },
        { name: "Comunicação & Palestra", category: "MARKETING", level: 95, verified: true,  evidence: "2M seguidores no Instagram." },
        { name: "Metodologia Esportiva", category: "OPERATIONS", level: 90, verified: true,  evidence: "Campeão mundial de polo aquático." },
      ],
      experiences: [
        { title: "CEO & Head Coach", company: "Joel Jota | Método JJ", startDate: new Date("2016-01-01"), current: true, description: "Treinamento e mentoria de alta performance." },
        { title: "Atleta Profissional", company: "Seleção Brasileira", startDate: new Date("2000-01-01"), endDate: new Date("2015-12-31"), description: "Campeão mundial de polo aquático." },
      ],
      projects: [
        { title: "Método JJ — 500 Empresas", description: "Sistema de alta performance do esporte para negócios.", results: "500+ empresas, R$50M em valor", links: [] },
      ],
    },
    {
      email: "camila.farani@socion.test", name: "(seed) Camila Farani",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=camilafarani",
      profile: {
        headline: "Investidora Anjo | Shark Tank Brasil | CEO Gávea Angels",
        bio: "Investidora mais conhecida do Brasil. 50+ investimentos, 3 unicórnios no portfólio. Busco startups em early stage com produto validado.",
        city: "Rio de Janeiro", state: "RJ",
        linkedinUrl: "https://linkedin.com/in/camilafarani",
        pitchVideoUrl: VIDEOS.camilaFarani,
        availability: "INVESTING", investmentRange: "ABOVE_200K",
        trustScore: 97, scoreIdentity: 100, scoreExperience: 98,
        scoreCompetence: 95, scoreReputation: 97, scoreCommitment: 95,
        kycStatus: "VERIFIED", isVisible: true,
      },
      skills: [
        { name: "Angel Investing",   category: "FINANCE", level: 98, verified: true, evidence: "50+ investimentos, 3 unicórnios." },
        { name: "Pitch & Valuation", category: "FINANCE", level: 95, verified: true, evidence: "3.000+ pitches avaliados no Shark Tank." },
        { name: "Fundraising",       category: "FINANCE", level: 93, verified: true, evidence: "$30M+ captados via Gávea Angels." },
      ],
      experiences: [
        { title: "CEO & Investidora", company: "Gávea Angels",   startDate: new Date("2015-01-01"), current: true, description: "Maior rede de anjos do Rio." },
        { title: "Shark",            company: "Shark Tank Brasil", startDate: new Date("2018-01-01"), current: true, description: "5 temporadas na Band." },
      ],
      projects: [
        { title: "Portfólio Gávea — 50+ Startups", description: "Gestão de portfólio diversificado.", results: "50+ startups, 3 exits bem-sucedidos", links: [] },
      ],
    },
    {
      email: "ricardo.mendes@socion.test", name: "(seed) Ricardo Mendes",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=ricardo",
      profile: {
        headline: "CTO | Full Stack | 3 Startups | Python & React",
        bio: "10 anos em engenharia de software. Liderei times de 20 pessoas. Especialista em microsserviços e IA aplicada a negócios.",
        city: "São Paulo", state: "SP",
        linkedinUrl: "https://linkedin.com/in/ricardo-mendes",
        pitchVideoUrl: VIDEOS.thiago,
        availability: "FULL_TIME", investmentRange: "UP_TO_10K",
        trustScore: 92, scoreIdentity: 100, scoreExperience: 95,
        scoreCompetence: 90, scoreReputation: 88, scoreCommitment: 87,
        kycStatus: "VERIFIED", isVisible: true,
      },
      skills: [
        { name: "Python",                  category: "TECHNOLOGY", level: 95, verified: true,  evidence: "Migrou monolito para microsserviços, latência -40%." },
        { name: "React / Next.js",         category: "TECHNOLOGY", level: 90, verified: true,  evidence: "3 SaaS em produção." },
        { name: "Arquitetura de Software", category: "TECHNOLOGY", level: 88, verified: true,  evidence: "3 sistemas escaláveis do zero." },
      ],
      experiences: [
        { title: "CTO",       company: "Credix Fintech", startDate: new Date("2021-03-01"), current: true,                    description: "12 engenheiros, plataforma de crédito para PMEs." },
        { title: "Tech Lead", company: "Nubank",          startDate: new Date("2018-06-01"), endDate: new Date("2021-02-28"), description: "Pagamentos internacionais." },
      ],
      projects: [
        { title: "Credix v2 — Crédito PMEs", description: "200+ empresas, R$5M concedido.", results: "200 PMEs, R$5M crédito", links: [] },
      ],
    },
    {
      email: "ana.paula@socion.test", name: "(seed) Ana Paula Santos",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=anapaula",
      profile: {
        headline: "CMO | Growth | Ex-iFood | Buscando Co-Founder Técnico",
        bio: "No iFood cresci aquisição de 0 a 2M usuários. Ideia validada em EdTech buscando co-fundador técnico.",
        city: "Rio de Janeiro", state: "RJ",
        linkedinUrl: "https://linkedin.com/in/anapaula-santos",
        pitchVideoUrl: VIDEOS.ana,
        availability: "FULL_TIME", investmentRange: "UP_TO_50K",
        trustScore: 88, scoreIdentity: 100, scoreExperience: 90,
        scoreCompetence: 88, scoreReputation: 85, scoreCommitment: 77,
        kycStatus: "VERIFIED", isVisible: true,
      },
      skills: [
        { name: "Growth Marketing",         category: "MARKETING", level: 95, verified: true,  evidence: "0 a 2M MAU em 18 meses (iFood)." },
        { name: "Performance (Meta/Google)", category: "MARKETING", level: 90, verified: true,  evidence: "ROAS médio 4.2x." },
        { name: "Product Analytics",        category: "PRODUCT",   level: 82, verified: false, evidence: "Mixpanel, Amplitude, SQL avançado." },
      ],
      experiences: [
        { title: "Head of Growth", company: "iFood",  startDate: new Date("2020-01-01"), endDate: new Date("2023-08-01"), description: "Referral = 30% das aquisições." },
        { title: "Growth Manager", company: "Gympass", startDate: new Date("2018-03-01"), endDate: new Date("2019-12-31"), description: "Expansão para 3 mercados." },
      ],
      projects: [
        { title: "Referral iFood — 600k Usuários", description: "Principal canal de aquisição.", results: "600k novos usuários em 6 meses", links: [] },
      ],
    },
    {
      email: "carlos.eduardo@socion.test", name: "(seed) Carlos Eduardo",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=carlos",
      profile: {
        headline: "CFO | Ex-McKinsey | Estruturo finanças de startups",
        bio: "8 anos entre McKinsey e startups. Especialista em captação e unit economics. 4 rodadas de $10M+ estruturadas.",
        city: "Belo Horizonte", state: "MG",
        linkedinUrl: "https://linkedin.com/in/carlos-eduardo-cfo",
        pitchVideoUrl: VIDEOS.carlos,
        availability: "PART_TIME", investmentRange: "UP_TO_50K",
        trustScore: 85, scoreIdentity: 100, scoreExperience: 88,
        scoreCompetence: 85, scoreReputation: 80, scoreCommitment: 72,
        kycStatus: "VERIFIED", isVisible: true,
      },
      skills: [
        { name: "Modelagem Financeira", category: "FINANCE", level: 97, verified: true, evidence: "4 rodadas Series A/B, $40M captados." },
        { name: "Due Diligence",        category: "FINANCE", level: 90, verified: true, evidence: "12 processos M&A na McKinsey." },
        { name: "Fundraising",          category: "FINANCE", level: 88, verified: true, evidence: ">$40M ajudou startups a captar." },
      ],
      experiences: [
        { title: "CFO",        company: "Loggi",    startDate: new Date("2020-05-01"), endDate: new Date("2023-10-01"), description: "Series C de $15M." },
        { title: "Consultant", company: "McKinsey", startDate: new Date("2015-08-01"), endDate: new Date("2020-04-30"), description: "Financial Services & Retail." },
      ],
      projects: [
        { title: "Series C Loggi — $15M", description: "Pitch + documentação para Series C.", results: "$15M em 90 dias", links: [] },
      ],
    },
    {
      email: "pedro.alves@socion.test", name: "(seed) Pedro Alves",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=pedro",
      profile: {
        headline: "Full Stack | Node.js | React | 3 SaaS do zero",
        bio: "Construí 3 SaaS com receita real. MVP em 4 meses, R$15k MRR. Buscando sócio de negócios.",
        city: "Porto Alegre", state: "RS",
        linkedinUrl: "https://linkedin.com/in/pedro-alves-dev",
        pitchVideoUrl: VIDEOS.pedro,
        availability: "FULL_TIME", investmentRange: "UP_TO_10K",
        trustScore: 83, scoreIdentity: 95, scoreExperience: 80,
        scoreCompetence: 92, scoreReputation: 75, scoreCommitment: 73,
        kycStatus: "VERIFIED", isVisible: true,
      },
      skills: [
        { name: "Node.js",       category: "TECHNOLOGY", level: 93, verified: true,  evidence: "APIs com 500k req/dia em produção." },
        { name: "React/Next.js", category: "TECHNOLOGY", level: 90, verified: true,  evidence: "3 SaaS em Next.js." },
        { name: "DevOps / AWS",  category: "TECHNOLOGY", level: 80, verified: false, evidence: "Infra AWS custo-eficiente." },
      ],
      experiences: [
        { title: "Founder & CTO", company: "TaskFlow", startDate: new Date("2022-01-01"), current: true, description: "SaaS para agências, 300 clientes." },
        { title: "Senior Dev",    company: "Totvs",    startDate: new Date("2019-03-01"), endDate: new Date("2021-12-31"), description: "Backend ERP enterprise." },
      ],
      projects: [
        { title: "TaskFlow — R$15k MRR", description: "SaaS construído solo em 4 meses.", results: "R$15k MRR, 300 clientes", links: [] },
      ],
    },
    {
      email: "beatriz.oliveira@socion.test", name: "(seed) Beatriz Oliveira",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=beatriz",
      profile: {
        headline: "COO | Ex-Rappi | Operações de Alto Crescimento",
        bio: "Expandiu Rappi para 12 cidades em 8 meses. Busco sócio fundador para marketplace de serviços.",
        city: "São Paulo", state: "SP",
        linkedinUrl: "https://linkedin.com/in/beatriz-oliveira-ops",
        pitchVideoUrl: VIDEOS.beatriz,
        availability: "FULL_TIME", investmentRange: "UP_TO_50K",
        trustScore: 86, scoreIdentity: 100, scoreExperience: 88,
        scoreCompetence: 85, scoreReputation: 83, scoreCommitment: 74,
        kycStatus: "VERIFIED", isVisible: true,
      },
      skills: [
        { name: "Operations",     category: "OPERATIONS", level: 95, verified: true,  evidence: "Rappi BR: 12 cidades em 8 meses." },
        { name: "People Mgmt",    category: "OPERATIONS", level: 88, verified: true,  evidence: "Times de até 200 pessoas." },
        { name: "OKRs",           category: "OPERATIONS", level: 85, verified: false, evidence: "OKR em 3 org +100 pessoas." },
      ],
      experiences: [
        { title: "Head de Ops BR",    company: "Rappi", startDate: new Date("2019-01-01"), endDate: new Date("2022-06-01"), description: "12 cidades, 3000+ parceiros." },
        { title: "Operations Manager", company: "iFood", startDate: new Date("2016-07-01"), endDate: new Date("2018-12-31"), description: "SP e RJ." },
      ],
      projects: [
        { title: "Expansão Rappi — 12 Cidades", description: "Expansão nacional, 200 contratações.", results: "12 cidades, GMV 5x", links: [] },
      ],
    },
    {
      email: "mariana.costa@socion.test", name: "(seed) Mariana Costa",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=mariana",
      profile: {
        headline: "UX Designer | Design System | Mercado Livre | Figma Expert",
        bio: "7 anos em produtos com milhões de usuários. Design system com 400+ componentes. Quero construir ferramenta de design para PMEs.",
        city: "São Paulo", state: "SP",
        linkedinUrl: "https://linkedin.com/in/mariana-costa-ux",
        pitchVideoUrl: VIDEOS.mariana,
        availability: "FULL_TIME", investmentRange: "NONE",
        trustScore: 76, scoreIdentity: 100, scoreExperience: 78,
        scoreCompetence: 80, scoreReputation: 72, scoreCommitment: 50,
        kycStatus: "VERIFIED", isVisible: true,
      },
      skills: [
        { name: "UX Research",    category: "DESIGN", level: 90, verified: true,  evidence: "300+ testes de usabilidade." },
        { name: "Figma / DS",     category: "DESIGN", level: 95, verified: true,  evidence: "400+ componentes no Mercado Livre." },
        { name: "Prototipagem",   category: "DESIGN", level: 88, verified: false, evidence: "15+ produtos." },
      ],
      experiences: [
        { title: "Senior Product Designer", company: "Mercado Livre", startDate: new Date("2020-03-01"), endDate: new Date("2024-01-01"), description: "70M usuários." },
        { title: "UX Designer",            company: "Hotmart",        startDate: new Date("2018-01-01"), endDate: new Date("2020-02-28"), description: "Redesign da plataforma." },
      ],
      projects: [
        { title: "ML Design System", description: "400+ componentes, 50 designers.", results: "-50% tempo de design", links: [] },
      ],
    },
    {
      email: "camila.rodrigues@socion.test", name: "(seed) Camila Rodrigues",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=camila",
      profile: {
        headline: "Sales Director | B2B SaaS | 0 to $1M ARR",
        bio: "Levei dois SaaS de 0 a $1M ARR. Construo processos enterprise do zero. Busco co-fundadora para B2B de RH.",
        city: "São Paulo", state: "SP",
        linkedinUrl: "https://linkedin.com/in/camila-rodrigues-sales",
        pitchVideoUrl: VIDEOS.conrado,
        availability: "FULL_TIME", investmentRange: "UP_TO_50K",
        trustScore: 87, scoreIdentity: 100, scoreExperience: 90,
        scoreCompetence: 88, scoreReputation: 82, scoreCommitment: 75,
        kycStatus: "VERIFIED", isVisible: true,
      },
      skills: [
        { name: "Enterprise Sales",     category: "SALES",      level: 95, verified: true,  evidence: "Ambev, TOTVS, Bradesco (>$50k/ano)." },
        { name: "Sales Process Design", category: "SALES",      level: 90, verified: true,  evidence: "2 startups a $1M ARR do zero." },
        { name: "CRM / HubSpot",        category: "OPERATIONS", level: 85, verified: false, evidence: "CRM em 3 organizações." },
      ],
      experiences: [
        { title: "VP of Sales",    company: "Kenoby (Gupy)", startDate: new Date("2019-06-01"), endDate: new Date("2023-03-01"), description: "20 AEs. $0 a $2M ARR." },
        { title: "Sales Manager",  company: "RD Station",    startDate: new Date("2017-01-01"), endDate: new Date("2019-05-31"), description: "Vertical enterprise." },
      ],
      projects: [
        { title: "Kenoby Enterprise — $2M ARR", description: "Processo, playbook e time do zero.", results: "$2M ARR, 85 contas", links: [] },
      ],
    },
    {
      email: "rafael.neto@socion.test", name: "(seed) Rafael Neto",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=rafael",
      profile: {
        headline: "Data Scientist | AI/ML | Ex-Itaú | LLMs & Computer Vision",
        bio: "Modelos que economizaram R$30M/ano no Itaú. Quero fundar AI startup no setor financeiro.",
        city: "Campinas", state: "SP",
        linkedinUrl: "https://linkedin.com/in/rafael-neto-data",
        pitchVideoUrl: VIDEOS.rafael,
        availability: "HALF_TIME", investmentRange: "NONE",
        trustScore: 80, scoreIdentity: 95, scoreExperience: 82,
        scoreCompetence: 88, scoreReputation: 70, scoreCommitment: 65,
        kycStatus: "VERIFIED", isVisible: true,
      },
      skills: [
        { name: "Machine Learning", category: "TECHNOLOGY", level: 94, verified: true, evidence: "99.2% precisão (Itaú)." },
        { name: "LLMs / GenAI",     category: "TECHNOLOGY", level: 88, verified: true, evidence: "Fine-tuning LLaMA e GPT-4." },
        { name: "Python/PyTorch",   category: "TECHNOLOGY", level: 92, verified: true, evidence: "Contrib. open-source, 2k stars." },
      ],
      experiences: [
        { title: "Senior Data Scientist", company: "Itaú Unibanco", startDate: new Date("2020-08-01"), current: true, description: "Prevenção a fraudes 24/7." },
        { title: "Data Scientist",        company: "Movile",         startDate: new Date("2018-04-01"), endDate: new Date("2020-07-31"), description: "Recomendações." },
      ],
      projects: [
        { title: "Fraud Detection — R$30M/ano", description: "Modelo em tempo real, 200ms.", results: "R$30M/ano, 0.3% FP rate", links: [] },
      ],
    },
  ];

  const createdUserIds: string[] = [];

  for (const e of entrepreneurs) {
    const user = await db.user.upsert({
      where:  { email: e.email },
      update: { name: e.name },
      create: {
        email: e.email, name: e.name, image: e.image, plan: "PRO",
        emailVerified: new Date(),
        stripeCurrentPeriodEnd: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
      },
    });

    const profile = await db.profile.upsert({
      where:  { userId: user.id },
      update: { ...e.profile },
      create: { userId: user.id, ...e.profile },
    });

    await db.profileSkill.deleteMany({ where: { profileId: profile.id } });
    for (const s of e.skills) {
      await db.profileSkill.create({ data: { profileId: profile.id, ...s } });
    }

    await db.experience.deleteMany({ where: { profileId: profile.id } });
    for (const exp of e.experiences) {
      await db.experience.create({ data: { profileId: profile.id, ...exp } });
    }

    await db.project.deleteMany({ where: { profileId: profile.id } });
    for (const proj of e.projects) {
      await db.project.create({ data: { profileId: profile.id, ...proj } });
    }

    createdUserIds.push(user.id);
  }

  // ── 4. Flávio e Joel já curtiram testUser → ao clicar Like, match imediato ──
  const flavioUser = await db.user.findUnique({ where: { email: "flavio.augusto@socion.test" } });
  const joelUser   = await db.user.findUnique({ where: { email: "joel.jota@socion.test" } });

  for (const preUser of [flavioUser, joelUser]) {
    if (!preUser) continue;
    await db.like.upsert({
      where:  { fromUserId_toUserId: { fromUserId: preUser.id, toUserId: testUser.id } },
      update: {},
      create: { fromUserId: preUser.id, toUserId: testUser.id },
    });
  }

  // ── 5. Matches pré-criados (Ricardo, Ana, Carlos) ─────────────────────────
  for (const targetId of createdUserIds.slice(3, 6)) {
    await db.like.upsert({
      where:  { fromUserId_toUserId: { fromUserId: testUser.id, toUserId: targetId } },
      update: {}, create: { fromUserId: testUser.id, toUserId: targetId },
    });
    await db.like.upsert({
      where:  { fromUserId_toUserId: { fromUserId: targetId, toUserId: testUser.id } },
      update: {}, create: { fromUserId: targetId, toUserId: testUser.id },
    });
    const [u1, u2] = [testUser.id, targetId].sort();
    await db.match.upsert({
      where:  { user1Id_user2Id: { user1Id: u1, user2Id: u2 } },
      update: {}, create: { user1Id: u1, user2Id: u2 },
    });
  }

  // ── 6. Partnership testUser + Ricardo ────────────────────────────────────
  const ricardoUser = await db.user.findUnique({ where: { email: "ricardo.mendes@socion.test" } });
  if (ricardoUser) {
    const [u1, u2] = [testUser.id, ricardoUser.id].sort();
    const match = await db.match.findUnique({ where: { user1Id_user2Id: { user1Id: u1, user2Id: u2 } } });
    if (match) {
      const p = await db.partnership.upsert({
        where:  { matchId: match.id },
        update: {},
        create: { matchId: match.id, status: "NEGOTIATING" },
      });
      for (const [uid, role] of [[testUser.id, "CEO"], [ricardoUser.id, "CTO"]] as const) {
        await db.partnershipMember.upsert({
          where:  { partnershipId_userId: { partnershipId: p.id, userId: uid } },
          update: {}, create: { partnershipId: p.id, userId: uid, role, equity: 50 },
        });
      }
      await db.milestone.deleteMany({ where: { partnershipId: p.id } });
      for (const m of [
        { title: "Documentos verificados",             completed: true,  completedAt: new Date("2024-11-01"), order: 1 },
        { title: "Teste de compatibilidade concluído", completed: true,  completedAt: new Date("2024-11-15"), order: 2 },
        { title: "Proposta enviada",                   completed: true,  completedAt: new Date("2024-12-01"), order: 3 },
        { title: "Contrato em elaboração",             completed: false, order: 4 },
        { title: "Contrato assinado",                  completed: false, order: 5 },
      ]) {
        await db.milestone.create({ data: { partnershipId: p.id, ...m } });
      }
      await db.proposal.deleteMany({ where: { partnershipId: p.id } });
      await db.proposal.create({
        data: {
          partnershipId: p.id, fromUserId: testUser.id, toUserId: ricardoUser.id,
          equity: 50, role: "CEO", investmentType: ["tempo", "conhecimento"],
          message: "Ricardo, somos complementares. Proponho 50/50 com vesting de 4 anos.",
          status: "VIEWED",
        },
      });
    }
  }

  // ── 7. Reviews para testUser ──────────────────────────────────────────────
  for (const reviewerId of createdUserIds.slice(3, 7)) {
    await db.review.upsert({
      where:  { authorId_targetId: { authorId: reviewerId, targetId: testUser.id } },
      update: {},
      create: {
        authorId: reviewerId, targetId: testUser.id, score: 5,
        comment: "Excelente empreendedor. Comunicação clara e visão de longo prazo.",
        context: "partnership",
      },
    });
  }

  console.log("\n✅ Seed concluído!");
  console.log("   user / user  → perfil completo, matches, partnership");
  console.log("   zero / zero  → usuário em branco para testar onboarding");
  console.log("   Curtir Flávio Augusto no feed → match imediato ⚡");
}

main()
  .catch(console.error)
  .finally(() => db.$disconnect());
