import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

async function main() {
  console.log("🌱 Seeding SocioN database...");

  // ── Test user (credentials: user / user) ──────────────────────────────────
  const testUser = await db.user.upsert({
    where:  { email: "user@socion.test" },
    update: {},
    create: {
      email:         "user@socion.test",
      name:          "Gabriel Teste",
      image:         "https://api.dicebear.com/7.x/avataaars/svg?seed=gabriel",
      plan:          "TRIAL",
      trialEndsAt:   new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      emailVerified: new Date(),
    },
  });

  const testProfile = await db.profile.upsert({
    where:  { userId: testUser.id },
    update: {},
    create: {
      userId:         testUser.id,
      headline:       "CEO & Co-Founder | Ex-Nubank | Buscando CTO",
      bio:            "Empreendedor em série com 2 exits. Construí um produto de 0 a 50k usuários. Agora buscando um CTO para escalar uma solução de IA para RH.",
      city:           "São Paulo",
      state:          "SP",
      linkedinUrl:    "https://linkedin.com/in/gabriel-teste",
      pitchVideoUrl:  "https://www.youtube.com/embed/dQw4w9WgXcQ",
      availability:   "FULL_TIME",
      investmentRange: "UP_TO_50K",
      trustScore:     78,
      scoreIdentity:  100,
      scoreExperience: 85,
      scoreCompetence: 70,
      scoreReputation: 75,
      scoreCommitment: 60,
      kycStatus:      "VERIFIED",
      isVisible:      true,
    },
  });

  // ── 10 Entrepreneurs ──────────────────────────────────────────────────────
  const entrepreneurs = [
    {
      email: "ricardo.mendes@socion.test",
      name:  "Ricardo Mendes",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=ricardo",
      profile: {
        headline:       "CTO | Full Stack | 3 Startups | Python & React",
        bio:            "10 anos de experiência em engenharia de software. Já liderando times de até 20 pessoas. Especialista em arquitetura de microsserviços e IA aplicada a negócios.",
        city:           "São Paulo", state: "SP",
        linkedinUrl:    "https://linkedin.com/in/ricardo-mendes",
        pitchVideoUrl:  "https://www.youtube.com/embed/ScMzIvxBSi4",
        availability:   "FULL_TIME" as const,
        investmentRange: "UP_TO_10K" as const,
        trustScore:     92, scoreIdentity: 100, scoreExperience: 95,
        scoreCompetence: 90, scoreReputation: 88, scoreCommitment: 87,
        kycStatus:      "VERIFIED" as const,
      },
      skills: [
        { name: "Python", category: "TECHNOLOGY" as const, level: 95, verified: true, evidence: "Liderou migração de monolito para microsserviços em Python, reduzindo latência em 40%." },
        { name: "React", category: "TECHNOLOGY" as const, level: 90, verified: true, evidence: "Arquitetou frontend de SaaS com 50k usuários ativos." },
        { name: "Arquitetura de Software", category: "TECHNOLOGY" as const, level: 88, verified: true, evidence: "3 sistemas escaláveis construídos do zero." },
      ],
      experiences: [
        { title: "CTO", company: "Credix Fintech", startDate: new Date("2021-03-01"), current: true, description: "Liderando time de 12 engenheiros. Construiu plataforma de crédito para PMEs." },
        { title: "Tech Lead", company: "Nubank", startDate: new Date("2018-06-01"), endDate: new Date("2021-02-28"), description: "Time de pagamentos internacionais." },
      ],
      projects: [
        { title: "Credix v2 — Plataforma de Crédito", description: "Plataforma B2B de crédito para PMEs. 200+ empresas cadastradas, R$ 5M em crédito concedido.", results: "200 PMEs, R$5M crédito", links: ["https://credix.com.br"] },
        { title: "ML Pipeline para Fraud Detection", description: "Sistema de detecção de fraude em tempo real com precisão de 97%.", results: "R$2M em fraudes bloqueadas/ano", links: [] },
      ],
    },
    {
      email: "ana.paula@socion.test",
      name:  "Ana Paula Santos",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=anapaula",
      profile: {
        headline:       "CMO | Growth | Ex-iFood | Buscando Co-Founder Técnico",
        bio:            "Especialista em crescimento acelerado de produtos digitais. No iFood cresci canais de aquisição de 0 a 2M usuários. Agora com ideia validada no segmento EdTech e buscando co-fundador técnico.",
        city:           "Rio de Janeiro", state: "RJ",
        linkedinUrl:    "https://linkedin.com/in/anapaula-santos",
        pitchVideoUrl:  "https://www.youtube.com/embed/9No-FiEInLA",
        availability:   "FULL_TIME" as const,
        investmentRange: "UP_TO_50K" as const,
        trustScore:     88, scoreIdentity: 100, scoreExperience: 90,
        scoreCompetence: 88, scoreReputation: 85, scoreCommitment: 77,
        kycStatus:      "VERIFIED" as const,
      },
      skills: [
        { name: "Growth Marketing", category: "MARKETING" as const, level: 95, verified: true, evidence: "Cresceu MAU de 0 a 2M em 18 meses no iFood." },
        { name: "Performance (Meta/Google)", category: "MARKETING" as const, level: 90, verified: true, evidence: "ROAS médio de 4.2x em campanhas gerenciadas." },
        { name: "Product Analytics", category: "PRODUCT" as const, level: 82, verified: false, evidence: "Uso avançado de Mixpanel, Amplitude e SQL." },
      ],
      experiences: [
        { title: "Head of Growth", company: "iFood", startDate: new Date("2020-01-01"), endDate: new Date("2023-08-01"), description: "Liderou equipe de 8 pessoas. Canal de referral gerou 30% das aquisições." },
        { title: "Growth Manager", company: "Gympass", startDate: new Date("2018-03-01"), endDate: new Date("2019-12-31"), description: "Expansão para 3 novos mercados." },
      ],
      projects: [
        { title: "Referral Program iFood — 2M Usuários", description: "Construção e lançamento do programa de indicação que se tornou principal canal de aquisição.", results: "600k novos usuários em 6 meses", links: [] },
      ],
    },
    {
      email: "carlos.eduardo@socion.test",
      name:  "Carlos Eduardo",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=carlos",
      profile: {
        headline:       "CFO | Ex-McKinsey | Estruturo finanças de startups",
        bio:            "8 anos entre McKinsey e startups de alto crescimento. Especialista em estruturação financeira, captação de investimentos e modelagem de unit economics.",
        city:           "Belo Horizonte", state: "MG",
        linkedinUrl:    "https://linkedin.com/in/carlos-eduardo-cfo",
        pitchVideoUrl:  "https://www.youtube.com/embed/LXb3EKWsInQ",
        availability:   "PART_TIME" as const,
        investmentRange: "UP_TO_50K" as const,
        trustScore:     85, scoreIdentity: 100, scoreExperience: 88,
        scoreCompetence: 85, scoreReputation: 80, scoreCommitment: 72,
        kycStatus:      "VERIFIED" as const,
      },
      skills: [
        { name: "Modelagem Financeira", category: "FINANCE" as const, level: 97, verified: true, evidence: "Construiu modelos para 4 rodadas Series A/B (total $40M captados)." },
        { name: "Due Diligence", category: "FINANCE" as const, level: 90, verified: true, evidence: "Participou de 12 processos de M&A na McKinsey." },
        { name: "Fundraising", category: "FINANCE" as const, level: 88, verified: true, evidence: "Ajudou startups a captar >$40M em investimentos." },
      ],
      experiences: [
        { title: "CFO", company: "Loggi", startDate: new Date("2020-05-01"), endDate: new Date("2023-10-01"), description: "Estruturou finanças durante crescimento de 10x. Liderou rodada Series C de $15M." },
        { title: "Consultant", company: "McKinsey & Company", startDate: new Date("2015-08-01"), endDate: new Date("2020-04-30"), description: "Foco em Financial Services e Retail." },
      ],
      projects: [
        { title: "Series C Loggi — $15M", description: "Estruturei toda a documentação financeira e pitch para a rodada Series C.", results: "$15M captados em 90 dias", links: [] },
      ],
    },
    {
      email: "fernanda.lima@socion.test",
      name:  "Fernanda Lima",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=fernanda",
      profile: {
        headline:       "CPO | Ex-Vtex | Product Manager Sênior | B2B SaaS",
        bio:            "Mais de 9 anos construindo produtos digitais. Na Vtex liderei 3 squads e lancei features usadas por 40k lojistas. Agora quero construir meu próprio produto no segmento B2B.",
        city:           "São Paulo", state: "SP",
        linkedinUrl:    "https://linkedin.com/in/fernanda-lima-product",
        pitchVideoUrl:  "https://www.youtube.com/embed/5MgBikgcWnY",
        availability:   "FULL_TIME" as const,
        investmentRange: "NONE" as const,
        trustScore:     81, scoreIdentity: 95, scoreExperience: 85,
        scoreCompetence: 80, scoreReputation: 78, scoreCommitment: 67,
        kycStatus:      "VERIFIED" as const,
      },
      skills: [
        { name: "Product Strategy", category: "PRODUCT" as const, level: 92, verified: true, evidence: "Definiu roadmap de plataforma usada por 40k lojistas (Vtex)." },
        { name: "Discovery & Research", category: "PRODUCT" as const, level: 88, verified: true, evidence: "Conduziu mais de 200 entrevistas com usuários." },
        { name: "Data-Driven Decisions", category: "PRODUCT" as const, level: 85, verified: false, evidence: "Uso intensivo de SQL, GA4 e ferramentas de BI." },
      ],
      experiences: [
        { title: "Group Product Manager", company: "Vtex", startDate: new Date("2019-02-01"), endDate: new Date("2023-12-01"), description: "Liderou 3 squads com 18 pessoas. Responsável por checkout e pagamentos." },
        { title: "Product Manager", company: "Conta Azul", startDate: new Date("2016-06-01"), endDate: new Date("2019-01-31"), description: "Primeiro PM da empresa. Construiu módulo fiscal do zero." },
      ],
      projects: [
        { title: "Vtex Checkout 3.0", description: "Redesenho completo do checkout. Aumentou taxa de conversão em 22% para lojistas.", results: "+22% conversão, +R$180M GMV/ano estimado", links: ["https://vtex.com"] },
      ],
    },
    {
      email: "joao.paulo@socion.test",
      name:  "João Paulo Ferreira",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=joaopaulo",
      profile: {
        headline:       "Growth Hacker | SEO | Conteúdo | Construí comunidade de 500k",
        bio:            "Especialista em crescimento orgânico e construção de comunidades. Cresci canal do YouTube de 0 a 500k inscritos. Agora buscando sócio para lançar plataforma de educação para criadores de conteúdo.",
        city:           "Recife", state: "PE",
        linkedinUrl:    "https://linkedin.com/in/joaopaulo-growth",
        pitchVideoUrl:  "https://www.youtube.com/embed/t3_SER-PQCY",
        availability:   "HALF_TIME" as const,
        investmentRange: "UP_TO_10K" as const,
        trustScore:     74, scoreIdentity: 90, scoreExperience: 75,
        scoreCompetence: 72, scoreReputation: 68, scoreCommitment: 65,
        kycStatus:      "IN_REVIEW" as const,
      },
      skills: [
        { name: "SEO", category: "MARKETING" as const, level: 93, verified: true, evidence: "Posicionou 200+ keywords na primeira página do Google." },
        { name: "YouTube / Video Marketing", category: "MARKETING" as const, level: 88, verified: true, evidence: "500k inscritos, 30M views totais." },
        { name: "Copywriting", category: "MARKETING" as const, level: 82, verified: false, evidence: "Email com 35% de open rate consistente." },
      ],
      experiences: [
        { title: "Head de Conteúdo", company: "Rock Content", startDate: new Date("2019-05-01"), endDate: new Date("2022-12-01"), description: "Liderou equipe de 15 redatores. Blog com 2M visitas/mês." },
        { title: "Content Creator", company: "Própria Marca", startDate: new Date("2020-01-01"), current: true, description: "Canal YouTube e newsletter com 500k+ seguidores." },
      ],
      projects: [
        { title: "Canal CreatorHub — 500k Inscritos", description: "Construção de canal educativo sobre criação de conteúdo e monetização digital.", results: "500k inscritos, $8k/mês em receita", links: ["https://youtube.com"] },
      ],
    },
    {
      email: "mariana.costa@socion.test",
      name:  "Mariana Costa",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=mariana",
      profile: {
        headline:       "UX Designer | Design System | B2C & B2B | Figma Expert",
        bio:            "UX/Product Designer com 7 anos de experiência. Já trabalhei em produtos com milhões de usuários (Mercado Livre, Hotmart). Quero construir minha própria ferramenta de design para PMEs.",
        city:           "São Paulo", state: "SP",
        linkedinUrl:    "https://linkedin.com/in/mariana-costa-ux",
        pitchVideoUrl:  "https://www.youtube.com/embed/Q_DaGGQh17s",
        availability:   "FULL_TIME" as const,
        investmentRange: "NONE" as const,
        trustScore:     76, scoreIdentity: 100, scoreExperience: 78,
        scoreCompetence: 80, scoreReputation: 72, scoreCommitment: 50,
        kycStatus:      "VERIFIED" as const,
      },
      skills: [
        { name: "UX Research", category: "DESIGN" as const, level: 90, verified: true, evidence: "Conduziu 300+ testes de usabilidade em Mercado Livre." },
        { name: "Figma / Design System", category: "DESIGN" as const, level: 95, verified: true, evidence: "Criou design system com 400+ componentes usado por 50 designers." },
        { name: "Prototipagem", category: "DESIGN" as const, level: 88, verified: false, evidence: "Protótipos de alta fidelidade para 15+ produtos." },
      ],
      experiences: [
        { title: "Senior Product Designer", company: "Mercado Livre", startDate: new Date("2020-03-01"), endDate: new Date("2024-01-01"), description: "Design do app mobile — 70M usuários ativos." },
        { title: "UX Designer", company: "Hotmart", startDate: new Date("2018-01-01"), endDate: new Date("2020-02-28"), description: "Redesign completo da plataforma de cursos." },
      ],
      projects: [
        { title: "ML Design System — 400+ Componentes", description: "Criação do design system unificado do Mercado Livre, adotado por 50 designers e 200 engenheiros.", results: "50% redução no tempo de design de novas features", links: [] },
      ],
    },
    {
      email: "pedro.alves@socion.test",
      name:  "Pedro Alves",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=pedro",
      profile: {
        headline:       "Full Stack | Node.js | React | Construí 3 SaaS do zero",
        bio:            "Dev com 6 anos de experiência. Construí 3 SaaS que geraram receita real. Excelente em executar MVPs rápidos e escalar produtos. Buscando sócio de negócios/marketing.",
        city:           "Porto Alegre", state: "RS",
        linkedinUrl:    "https://linkedin.com/in/pedro-alves-dev",
        pitchVideoUrl:  "https://www.youtube.com/embed/SqcY0GlETPk",
        availability:   "FULL_TIME" as const,
        investmentRange: "UP_TO_10K" as const,
        trustScore:     83, scoreIdentity: 95, scoreExperience: 80,
        scoreCompetence: 92, scoreReputation: 75, scoreCommitment: 73,
        kycStatus:      "VERIFIED" as const,
      },
      skills: [
        { name: "Node.js", category: "TECHNOLOGY" as const, level: 93, verified: true, evidence: "APIs em produção com 500k req/dia." },
        { name: "React / Next.js", category: "TECHNOLOGY" as const, level: 90, verified: true, evidence: "3 SaaS construídos com Next.js e em produção." },
        { name: "DevOps / AWS", category: "TECHNOLOGY" as const, level: 80, verified: false, evidence: "Infra na AWS com custo otimizado para startups." },
      ],
      experiences: [
        { title: "Founder & CTO", company: "TaskFlow (SaaS)", startDate: new Date("2022-01-01"), current: true, description: "SaaS de gestão de tarefas para agências. 300 clientes pagantes." },
        { title: "Senior Developer", company: "Totvs", startDate: new Date("2019-03-01"), endDate: new Date("2021-12-31"), description: "Backend para ERP de grandes empresas." },
      ],
      projects: [
        { title: "TaskFlow — 300 Clientes Pagantes", description: "SaaS de gestão de tarefas para agências. Construído solo em 4 meses.", results: "R$15k MRR, 300 clientes", links: ["https://taskflow.com.br"] },
      ],
    },
    {
      email: "camila.rodrigues@socion.test",
      name:  "Camila Rodrigues",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=camila",
      profile: {
        headline:       "Sales Director | B2B SaaS | Enterprise | 0 to $1M ARR",
        bio:            "Especialista em vendas enterprise e construção de processos comerciais. Levei dois SaaS de 0 a $1M ARR. Buscando co-fundadora para startup B2B de RH.",
        city:           "São Paulo", state: "SP",
        linkedinUrl:    "https://linkedin.com/in/camila-rodrigues-sales",
        pitchVideoUrl:  "https://www.youtube.com/embed/Bey4XXJAqS8",
        availability:   "FULL_TIME" as const,
        investmentRange: "UP_TO_50K" as const,
        trustScore:     87, scoreIdentity: 100, scoreExperience: 90,
        scoreCompetence: 88, scoreReputation: 82, scoreCommitment: 75,
        kycStatus:      "VERIFIED" as const,
      },
      skills: [
        { name: "Enterprise Sales", category: "SALES" as const, level: 95, verified: true, evidence: "Fechou contratos com Ambev, TOTVS, Bradesco (tickets >$50k/ano)." },
        { name: "Sales Process Design", category: "SALES" as const, level: 90, verified: true, evidence: "Construiu processo do zero para 2 startups, ambas chegando a $1M ARR." },
        { name: "CRM / HubSpot", category: "OPERATIONS" as const, level: 85, verified: false, evidence: "Implementou e otimizou CRM em 3 organizações." },
      ],
      experiences: [
        { title: "VP of Sales", company: "Kenoby (Gupy)", startDate: new Date("2019-06-01"), endDate: new Date("2023-03-01"), description: "Liderou time de 20 AEs. Cresceu ARR de $0 a $2M em 3 anos." },
        { title: "Sales Manager", company: "RD Station", startDate: new Date("2017-01-01"), endDate: new Date("2019-05-31"), description: "Responsável pela vertical enterprise." },
      ],
      projects: [
        { title: "Kenoby Enterprise — $2M ARR", description: "Construção do segmento enterprise do zero, incluindo processo, playbook e time de vendas.", results: "$2M ARR, 85 contas enterprise", links: [] },
      ],
    },
    {
      email: "rafael.neto@socion.test",
      name:  "Rafael Neto",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=rafael",
      profile: {
        headline:       "Data Scientist | AI/ML | Ex-Itaú | LLMs e Computer Vision",
        bio:            "Cientista de dados com especialização em LLMs e Computer Vision. No Itaú construí modelos que economizaram R$30M/ano em fraudes. Quero fundar uma AI startup no segmento financeiro.",
        city:           "Campinas", state: "SP",
        linkedinUrl:    "https://linkedin.com/in/rafael-neto-data",
        pitchVideoUrl:  "https://www.youtube.com/embed/aircAruvnKk",
        availability:   "HALF_TIME" as const,
        investmentRange: "NONE" as const,
        trustScore:     80, scoreIdentity: 95, scoreExperience: 82,
        scoreCompetence: 88, scoreReputation: 70, scoreCommitment: 65,
        kycStatus:      "VERIFIED" as const,
      },
      skills: [
        { name: "Machine Learning", category: "TECHNOLOGY" as const, level: 94, verified: true, evidence: "Modelos em produção com 99.2% de precisão (Itaú)." },
        { name: "LLMs / GenAI", category: "TECHNOLOGY" as const, level: 88, verified: true, evidence: "Fine-tuning de LLaMA e GPT-4 para casos corporativos." },
        { name: "Python / PyTorch", category: "TECHNOLOGY" as const, level: 92, verified: true, evidence: "Colaborador em projetos open-source com 2k stars." },
      ],
      experiences: [
        { title: "Senior Data Scientist", company: "Itaú Unibanco", startDate: new Date("2020-08-01"), current: true, description: "Time de prevenção a fraudes. Modelos em produção 24/7." },
        { title: "Data Scientist", company: "Movile", startDate: new Date("2018-04-01"), endDate: new Date("2020-07-31"), description: "Recomendações e personalização." },
      ],
      projects: [
        { title: "Fraud Detection ML — R$30M Economizados/Ano", description: "Modelo ensemble de detecção de fraude em tempo real, com janela de decisão de 200ms.", results: "R$30M/ano economizados, 0.3% FP rate", links: [] },
      ],
    },
    {
      email: "beatriz.oliveira@socion.test",
      name:  "Beatriz Oliveira",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=beatriz",
      profile: {
        headline:       "COO | Operações | Ex-Rappi | Scaleups de 50 a 500 pessoas",
        bio:            "Especialista em estruturar operações de alto crescimento. Na Rappi Brasil organizei a operação de expansão para 12 cidades em 8 meses. Agora buscando sócio fundador para marketplace de serviços.",
        city:           "São Paulo", state: "SP",
        linkedinUrl:    "https://linkedin.com/in/beatriz-oliveira-ops",
        pitchVideoUrl:  "https://www.youtube.com/embed/ZXsQAXx_ao0",
        availability:   "FULL_TIME" as const,
        investmentRange: "UP_TO_50K" as const,
        trustScore:     86, scoreIdentity: 100, scoreExperience: 88,
        scoreCompetence: 85, scoreReputation: 83, scoreCommitment: 74,
        kycStatus:      "VERIFIED" as const,
      },
      skills: [
        { name: "Operations Management", category: "OPERATIONS" as const, level: 95, verified: true, evidence: "Expandiu Rappi para 12 cidades brasileiras em 8 meses." },
        { name: "People Management", category: "OPERATIONS" as const, level: 88, verified: true, evidence: "Gerenciou times de até 200 pessoas diretas e indiretas." },
        { name: "OKRs / Planejamento", category: "OPERATIONS" as const, level: 85, verified: false, evidence: "Implementou OKR em 3 organizações com +100 pessoas." },
      ],
      experiences: [
        { title: "Head de Operações BR", company: "Rappi", startDate: new Date("2019-01-01"), endDate: new Date("2022-06-01"), description: "Responsável pela operação de 12 cidades, 3000+ entregadores parceiros." },
        { title: "Operations Manager", company: "iFood", startDate: new Date("2016-07-01"), endDate: new Date("2018-12-31"), description: "Operações em São Paulo e Rio de Janeiro." },
      ],
      projects: [
        { title: "Expansão Rappi Brasil — 12 Cidades", description: "Planejamento e execução da expansão nacional da Rappi Brasil, incluindo contratação de 200 pessoas.", results: "12 cidades em 8 meses, GMV 5x", links: [] },
      ],
    },
  ];

  const createdUsers: { user: { id: string }; profile: { id: string } }[] = [];

  for (const e of entrepreneurs) {
    const user = await db.user.upsert({
      where:  { email: e.email },
      update: {},
      create: {
        email:         e.email,
        name:          e.name,
        image:         e.image,
        plan:          "PRO",
        emailVerified: new Date(),
        stripeCurrentPeriodEnd: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
      },
    });

    const profile = await db.profile.upsert({
      where:  { userId: user.id },
      update: {},
      create: { userId: user.id, ...e.profile },
    });

    for (const s of e.skills) {
      await db.profileSkill.upsert({
        where: { id: `${profile.id}-${s.name}`.slice(0, 25) },
        update: {},
        create: { profileId: profile.id, ...s },
      }).catch(() =>
        db.profileSkill.create({ data: { profileId: profile.id, ...s } })
      );
    }

    for (const exp of e.experiences) {
      await db.experience.create({
        data: { profileId: profile.id, ...exp },
      }).catch(() => {});
    }

    for (const proj of e.projects) {
      await db.project.create({
        data: { profileId: profile.id, ...proj },
      }).catch(() => {});
    }

    createdUsers.push({ user, profile });
  }

  // ── Likes: testUser → 5 perfis ────────────────────────────────────────────
  const likedTargets = createdUsers.slice(0, 5);
  for (const { user: target } of likedTargets) {
    await db.like.upsert({
      where:  { fromUserId_toUserId: { fromUserId: testUser.id, toUserId: target.id } },
      update: {},
      create: { fromUserId: testUser.id, toUserId: target.id },
    });
  }

  // ── Likes recíprocos de 3 perfis → testUser (= 3 matches) ─────────────────
  const matchTargets = createdUsers.slice(0, 3);
  for (const { user: target } of matchTargets) {
    await db.like.upsert({
      where:  { fromUserId_toUserId: { fromUserId: target.id, toUserId: testUser.id } },
      update: {},
      create: { fromUserId: target.id, toUserId: testUser.id },
    });

    // Match object
    const [u1, u2] = [testUser.id, target.id].sort();
    await db.match.upsert({
      where:  { user1Id_user2Id: { user1Id: u1, user2Id: u2 } },
      update: {},
      create: { user1Id: u1, user2Id: u2 },
    });
  }

  // ── Partnership entre testUser e Ricardo (match[0]) ────────────────────────
  const [u1, u2] = [testUser.id, matchTargets[0].user.id].sort();
  const match = await db.match.findUnique({
    where: { user1Id_user2Id: { user1Id: u1, user2Id: u2 } },
  });

  if (match) {
    const partnership = await db.partnership.upsert({
      where:  { matchId: match.id },
      update: {},
      create: { matchId: match.id, status: "NEGOTIATING" },
    });

    // Members
    await db.partnershipMember.upsert({
      where:  { partnershipId_userId: { partnershipId: partnership.id, userId: testUser.id } },
      update: {},
      create: { partnershipId: partnership.id, userId: testUser.id, role: "CEO", equity: 50 },
    });
    await db.partnershipMember.upsert({
      where:  { partnershipId_userId: { partnershipId: partnership.id, userId: matchTargets[0].user.id } },
      update: {},
      create: { partnershipId: partnership.id, userId: matchTargets[0].user.id, role: "CTO", equity: 50 },
    });

    // Milestones
    const milestones = [
      { title: "Documentos enviados e verificados", completed: true, completedAt: new Date("2024-11-01"), order: 1 },
      { title: "Teste de compatibilidade concluído", completed: true, completedAt: new Date("2024-11-15"), order: 2 },
      { title: "Proposta de sociedade enviada", completed: true, completedAt: new Date("2024-12-01"), order: 3 },
      { title: "Contrato em elaboração com advogado", completed: false, order: 4 },
      { title: "Contrato assinado digitalmente", completed: false, order: 5 },
    ];
    for (const m of milestones) {
      await db.milestone.create({ data: { partnershipId: partnership.id, ...m } }).catch(() => {});
    }

    // Proposal
    await db.proposal.create({
      data: {
        partnershipId:  partnership.id,
        fromUserId:     testUser.id,
        toUserId:       matchTargets[0].user.id,
        equity:         50,
        role:           "CEO",
        investmentType: ["time", "knowledge"],
        message:        "Ricardo, adorei nosso papo. Acho que somos complementares: eu trago o negócio e você traz a tecnologia. Proponho 50/50 com vesting de 4 anos e cliff de 1 ano. O que acha?",
        status:         "VIEWED",
      },
    }).catch(() => {});
  }

  // ── Reviews ───────────────────────────────────────────────────────────────
  for (const { user: reviewer } of createdUsers.slice(0, 4)) {
    await db.review.upsert({
      where:  { authorId_targetId: { authorId: reviewer.id, targetId: testUser.id } },
      update: {},
      create: {
        authorId:  reviewer.id,
        targetId:  testUser.id,
        score:     5,
        comment:   "Excelente empreendedor. Comunicação clara, comprometimento total e visão de longo prazo.",
        context:   "partnership",
      },
    });
  }

  // ── Seeking & Offering do testUser ────────────────────────────────────────
  await db.seeking.upsert({
    where:  { profileId: testProfile.id },
    update: {},
    create: {
      profileId:      testProfile.id,
      skills:         ["TECHNOLOGY", "PRODUCT"],
      availability:   ["FULL_TIME", "HALF_TIME"],
      investmentRange: ["NONE", "UP_TO_10K"],
      businessTypes:  ["SAAS", "AI"],
    },
  });

  await db.offering.upsert({
    where:  { profileId: testProfile.id },
    update: {},
    create: {
      profileId:      testProfile.id,
      skills:         ["SALES", "MARKETING", "OPERATIONS"],
      availability:   "FULL_TIME",
      investmentRange: "UP_TO_50K",
      businessTypes:  ["SAAS", "AI", "MARKETPLACE"],
    },
  });

  console.log("✅ Seed completo!");
  console.log(`   • 1 usuário de teste (user@socion.test)`);
  console.log(`   • 10 empreendedores com perfis completos`);
  console.log(`   • 5 likes enviados, 3 matches criados`);
  console.log(`   • 1 partnership em negociação com milestones`);
  console.log(`   • 1 proposta de sociedade`);
  console.log(`   • 4 avaliações recebidas`);
}

main()
  .catch(console.error)
  .finally(() => db.$disconnect());
