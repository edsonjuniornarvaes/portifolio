export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  icon: string;
  iconColor?: string;
  iconLetter?: string;
  tags: string[];
  status: "development" | "production" | "paused";
  githubUrl?: string;
  liveUrl?: string;
  features?: Feature[];
  type: "personal" | "professional";
}

export interface Feature {
  title: string;
  description: string;
  icon: string;
}

// Projeto pessoal em destaque
export const featuredProject: Project = {
  id: "rachao",
  title: "Rachão",
  tagline: "O app definitivo para o futebol amador",
  description: `Plataforma completa para organizar e viver o futebol amador como nunca antes. 
  Crie partidas, monte times, acompanhe placares em tempo real e construa o histórico completo da sua comunidade.`,
  icon: "/images/rachao-icon.svg",
  tags: ["React Native", "TypeScript", "Expo", "Firebase", "Real-time"],
  status: "development",
  githubUrl: "https://github.com/edsonjuniornarvaes/match",
  type: "personal",
  features: [
    {
      title: "Partidas ao Vivo",
      description: "Placar em tempo real, cronômetro e estatísticas durante o jogo",
      icon: "⚽",
    },
    {
      title: "Histórico Completo",
      description: "Registro de todas as partidas, gols, assistências e resultados",
      icon: "📊",
    },
    {
      title: "Gestão de Times",
      description: "Crie times, convide jogadores e organize escalações",
      icon: "👥",
    },
    {
      title: "Avaliação de Atletas",
      description: "Sistema de notas e feedback para cada jogador",
      icon: "⭐",
    },
    {
      title: "Reserva de Campos",
      description: "Encontre e reserve campos disponíveis na sua cidade",
      icon: "🏟️",
    },
    {
      title: "Comunidade",
      description: "Mural de avisos, chat entre jogadores e grupos por interesse",
      icon: "💬",
    },
  ],
};

// Apps em que atuei profissionalmente
export const professionalProjects: Project[] = [
  {
    id: "pjbank",
    title: "PJBank",
    tagline: "Conta Digital para Empresas",
    description: "App financeiro corporativo para operações bancárias, Pix, emissão de boletos e gestão financeira integrada.",
    icon: "pjbank",
    iconColor: "#00D4D4",
    iconLetter: "PJ",
    tags: ["React Native", "TypeScript", "Redux", "Auth0"],
    status: "production",
    liveUrl: "https://apps.apple.com/br/app/pjbank/id1448812143",
    type: "professional",
  },
  {
    id: "gruvi",
    title: "Gruvi",
    tagline: "Superapp para Condomínios",
    description: "App que conecta moradores a serviços e ao condomínio. Aprovação de visitantes, reserva de espaços e chat.",
    icon: "gruvi",
    iconColor: "#FF3B7F",
    iconLetter: "G",
    tags: ["React Native", "TypeScript", "Redux Saga", "MongoDB"],
    status: "production",
    liveUrl: "https://apps.apple.com/br/app/gruvi/id1489697691",
    type: "professional",
  },
  {
    id: "mont-b2b",
    title: "Mont B2B",
    tagline: "Gestão de Investimentos",
    description: "App para gestão de carteiras financeiras personalizadas com acesso a gestores profissionais.",
    icon: "mont",
    iconColor: "#3D7A8C",
    iconLetter: "M",
    tags: ["React Native", "TypeScript", "Redux", "Jest"],
    status: "production",
    liveUrl: "https://apps.apple.com/br/app/mont-b2b/id6746648981",
    type: "professional",
  },
  {
    id: "mont-b2c",
    title: "Mont B2C",
    tagline: "Investimentos para Pessoa Física",
    description: "App de investimentos para clientes pessoa física da Mont Capital.",
    icon: "mont",
    iconColor: "#3D7A8C",
    iconLetter: "M",
    tags: ["React Native", "TypeScript", "Redux"],
    status: "paused",
    type: "professional",
  },
  {
    id: "minha-navex",
    title: "Minha Navex",
    tagline: "App de Telecom",
    description: "App para clientes de internet com extrato de uso, 2ª via de fatura e abertura de chamados.",
    icon: "navex",
    iconColor: "#6366F1",
    iconLetter: "N",
    tags: ["React Native", "TypeScript", "Redux", "OneSignal"],
    status: "paused",
    type: "professional",
  },
  {
    id: "consorcio-gazin",
    title: "Consórcio Gazin",
    tagline: "Gestão de Consórcios",
    description: "App para acompanhamento e gestão de consórcios do Grupo Gazin.",
    icon: "gazin",
    iconColor: "#EF4444",
    iconLetter: "G",
    tags: ["React Native", "TypeScript", "Redux"],
    status: "paused",
    type: "professional",
  },
];

// Projetos Web em que atuei
export const webProjects: Project[] = [
  {
    id: "gazin-b2b-b2c",
    title: "Gazin B2B & B2C",
    tagline: "E-commerce Completo",
    description: "Painéis Seller, Gestor e plataforma de e-commerce completa do Grupo Gazin.",
    icon: "gazin",
    iconColor: "#E11D48",
    iconLetter: "G",
    tags: ["React.js", "Next.js", "TypeScript", "Styled-components"],
    status: "paused",
    type: "professional",
  },
  {
    id: "venda-direta-gazin",
    title: "Venda Direta Gazin",
    tagline: "Marketplace de Lojistas",
    description: "Plataforma que conecta lojistas ao estoque da Gazin para vendas comissionadas.",
    icon: "gazin",
    iconColor: "#E11D48",
    iconLetter: "VD",
    tags: ["React.js", "TypeScript", "PHP", "Laravel"],
    status: "paused",
    type: "professional",
  },
  {
    id: "lojas-manao",
    title: "Lojas do Manão",
    tagline: "B2B & B2C",
    description: "Painel administrativo e plataforma de vendas das Lojas do Manão.",
    icon: "manao",
    iconColor: "#F59E0B",
    iconLetter: "LM",
    tags: ["React.js", "TypeScript", "Styled-components"],
    status: "paused",
    type: "professional",
  },
  {
    id: "agiliza-ai",
    title: "Agiliza Aí",
    tagline: "Gestão Fiscal",
    description: "Sistema de emissão e controle de notas fiscais para empresas.",
    icon: "agiliza",
    iconColor: "#10B981",
    iconLetter: "A",
    tags: ["React.js", "TypeScript", "PHP", "Laravel"],
    status: "paused",
    type: "professional",
  },
  {
    id: "mix-telecom",
    title: "Mix Telecom",
    tagline: "Painel Administrativo",
    description: "Dashboard e ferramentas administrativas para gestão de telecom.",
    icon: "mix",
    iconColor: "#8B5CF6",
    iconLetter: "MT",
    tags: ["React.js", "TypeScript", "Styled-components"],
    status: "paused",
    type: "professional",
  },
  {
    id: "gerenciador-senhas",
    title: "Gerenciador de Senhas",
    tagline: "Sistema Interno",
    description: "Sistema interno para gestão segura de credenciais da empresa.",
    icon: "senhas",
    iconColor: "#3B82F6",
    iconLetter: "🔐",
    tags: ["PHP", "Laravel", "JavaScript"],
    status: "paused",
    type: "professional",
  },
];
