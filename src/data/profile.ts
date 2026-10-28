const NOW = new Date().getFullYear();

/** Ano em que começou a estudar programação. */
export const STUDY_SINCE = 2015;
/** Primeiro emprego como desenvolvedor (E/Code, nov/2019). */
export const CAREER_SINCE = 2019;
/** Início em React Native (jun/2021). */
export const MOBILE_SINCE = 2021;

export const yearsStudying = NOW - STUDY_SINCE;
export const yearsCareer = NOW - CAREER_SINCE;
export const yearsMobile = NOW - MOBILE_SINCE;

export const contact = {
  email: "edsonjunior.narvaes@gmail.com",
  linkedin: "https://linkedin.com/in/edsonjuniornarvaes",
  github: "https://github.com/edsonjuniornarvaes",
  devto: "https://dev.to/edsonjuniornarvaes",
};

export const heroWords = [
  "apps React Native de alta performance",
  "fluxos financeiros críticos",
  "arquitetura MVVM escalável",
  "produtos do design à loja",
];

export type WorkRow = {
  year: string;
  name: string;
  what: string;
  stack: string;
  href: string;
};

/** Índice de trabalho selecionado na home. */
export const selectedWork: WorkRow[] = [
  { year: "2026", name: "Clube da Joia — Marketplace", what: "Loja online com painel admin, checkout Mercado Pago e backend Supabase", stack: "Next.js · Supabase", href: "/projects/clube-da-joia-marketplace" },
  { year: "2026", name: "Clube da Joia — App", what: "App iOS e Android da loja, no mesmo backend do site", stack: "React Native · Expo", href: "/projects/clube-da-joia-app" },
  { year: "2025 —", name: "PJBank", what: "Conta digital para empresas: autenticação, autorizações e Pix Automático", stack: "React Native · Auth0", href: "/projects/pjbank" },
  { year: "2024", name: "Gruvi", what: "Superapp para condomínios: visitantes, reservas e chat", stack: "React Native · Redux Saga", href: "/projects/gruvi" },
];

export type JourneyItem = {
  year: string;
  title: string;
  text: string;
  kind: "study" | "work" | "build";
};

export const journey: JourneyItem[] = [
  { year: "2015", title: "Começo na tecnologia", text: "Ingresso em Gestão de Sistemas de Informação na Unipar. Aqui nasce a curiosidade que nunca parou.", kind: "study" },
  { year: "2017", title: "Graduação em Sistemas de Informação", text: "UniALFA Umuarama. Lógica, banco de dados e as primeiras aplicações web de verdade.", kind: "study" },
  { year: "2019", title: "Primeiro emprego como dev", text: "E/Code, como Desenvolvedor Web Júnior (PHP, Laravel). Em paralelo, pós-graduação em Desenvolvimento Web e Mobile.", kind: "work" },
  { year: "2020", title: "Web Pleno", text: "React, Next.js e TypeScript em projetos de grande volume: Gazin, Navex e Lojas do Manão.", kind: "work" },
  { year: "2021", title: "Virada para o mobile", text: "React Native e Expo: Mont Capital, Minha Navex (do zero) e Consórcio Gazin nas lojas.", kind: "work" },
  { year: "2023", title: "Liderança como Scrum Master", text: "Ritos, priorização e alinhamento entre negócio, design e desenvolvimento no time mobile.", kind: "work" },
  { year: "2024", title: "Gruvi na Superlógica", text: "Superapp para condomínios com Redux Saga, MongoDB, Jest e CI/CD com Bitrise.", kind: "work" },
  { year: "2025", title: "PJBank", text: "App financeiro corporativo: Auth0, Pix Automático, MVVM e observabilidade completa.", kind: "work" },
  { year: "Hoje", title: "Produtos próprios", text: "Clube da Joia: site, painel, app e pagamentos em um backend só. Construo de ponta a ponta.", kind: "build" },
];

export type CaseStudy = {
  id: string;
  name: string;
  tag: string;
  period: string;
  color: string;
  summary: string;
  role: string;
  highlights: string[];
  stack: string[];
  href?: string;
  cta?: string;
};

export const cases: CaseStudy[] = [
  {
    id: "pjbank",
    name: "PJBank",
    tag: "Fintech · Conta digital para empresas",
    period: "Abr 2025 – hoje · Superlógica",
    color: "#00d4d4",
    summary: "App financeiro corporativo em produção: operações bancárias, Pix, boletos e gestão financeira.",
    role: "Desenvolvedor Mobile — funcionalidades críticas, autenticação e qualidade.",
    highlights: [
      "Fluxo de autenticação com Auth0 e fluxos sensíveis de autorização",
      "Pix Automático e autorizações de pagamento",
      "MVVM e padronização da arquitetura do app",
      "Jest, Sentry, Datadog, Mixpanel e Kibana; CI/CD com Bitrise e Harness",
    ],
    stack: ["React Native", "TypeScript", "Redux", "Auth0", "Jest"],
    href: "https://apps.apple.com/br/app/pjbank-conta-para-sua-empresa/id1267310347",
    cta: "Ver na App Store",
  },
  {
    id: "gruvi",
    name: "Gruvi",
    tag: "Superapp · Condomínios",
    period: "Jan 2024 – Abr 2025 · Superlógica",
    color: "#ff3b7f",
    summary: "Conecta moradores ao condomínio e aos vizinhos: visitantes, aluguel, reservas e salas de bate-papo por interesse.",
    role: "Desenvolvedor Mobile Pleno — funcionalidades cross-platform e qualidade.",
    highlights: [
      "Aprovação de visitantes, pagamento de aluguel e reserva de espaços",
      "Chats por interesses em comum entre moradores",
      "Testes unitários em fluxos críticos e builds automatizados no Bitrise",
      "Dados em MongoDB e observabilidade com Sentry, Datadog e Mixpanel",
    ],
    stack: ["React Native", "TypeScript", "Redux Saga", "MongoDB", "Bitrise"],
    href: "https://apps.apple.com/br/app/gruvi/id1561610983",
    cta: "Ver na App Store",
  },
  {
    id: "mont-b2b",
    name: "Mont Capital & Minha Navex",
    tag: "Investimentos · Telecom",
    period: "Jun 2021 – Jun 2023 · E/Code",
    color: "#3d7a8c",
    summary: "Apps B2B e B2C de gestão de investimentos e o app de telecom Minha Navex, criado do zero.",
    role: "Desenvolvedor Mobile Pleno — telas, fluxos, integrações e publicação nas lojas.",
    highlights: [
      "Autenticação segura e gestão de carteiras (Mont Capital)",
      "Extrato, fatura e suporte ao cliente (Minha Navex, do zero)",
      "Notificações push com OneSignal e integrações com APIs externas",
      "Publicação e manutenção na App Store e Play Store",
    ],
    stack: ["React Native", "Expo", "TypeScript", "Redux", "OneSignal"],
    href: "https://apps.apple.com/br/app/mont-b2b/id6746648981",
    cta: "Ver Mont B2B",
  },
  {
    id: "clube-da-joia-marketplace",
    name: "Clube da Joia — Marketplace",
    tag: "E-commerce · Projeto próprio",
    period: "2026 · Do zero, ponta a ponta",
    color: "#b08d57",
    summary: "Site e painel de uma joalheria online (prata 925 e moissanite), com pagamentos reais.",
    role: "Produto, design, front-end e backend — tudo.",
    highlights: [
      "Checkout Mercado Pago (cartão, Pix e boleto) com preços validados no servidor e webhook assinado",
      "Painel /admin com login, 2FA obrigatório e permissões por papel via RLS",
      "Catálogo com filtros, cupons, frete por UF, conta de cliente e Meus Pedidos",
      "Catálogo e banners no Supabase, com fallback estático",
    ],
    stack: ["Next.js", "Tailwind", "Supabase", "Mercado Pago", "Vercel"],
    href: "/projects/clube-da-joia-marketplace",
    cta: "Ver detalhes",
  },
  {
    id: "clube-da-joia-app",
    name: "Clube da Joia — App",
    tag: "App · Projeto próprio",
    period: "2026",
    color: "#8a6d3b",
    summary: "App iOS e Android da loja, no mesmo backend do site.",
    role: "Arquitetura, telas, integração com Supabase e checkout.",
    highlights: [
      "MVVM com view, viewModel, models e styles por tela",
      "Abas Início, Loja, Sacola, Categorias e Conta com expo-router",
      "Checkout Mercado Pago com retorno ao app por deep link",
      "Textos em pt, en e es com tipagem; Jest e Sentry",
    ],
    stack: ["React Native", "Expo", "TypeScript", "Supabase"],
    href: "/projects/clube-da-joia-app",
    cta: "Ver detalhes",
  },
];
