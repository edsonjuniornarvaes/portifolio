export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  icon: string;
  iconColor?: string;
  iconLetter?: string;
  /** @deprecated usar icon com path de imagem */
  useBenjaminLogo?: boolean;
  tags: string[];
  status: "development" | "production" | "paused";
  githubUrl?: string;
  liveUrl?: string;
  features?: Feature[];
  type: "personal" | "professional";
  /** Texto longo na página de detalhes */
  longDescription?: string;
  figmaUrl?: string;
  /** default: true se houver githubUrl */
  showGithub?: boolean;
  /** default: false */
  showFigma?: boolean;
  /** URLs opcionais para mockups estilo loja */
  mockupAppleUrl?: string;
  mockupPlayUrl?: string;
  /** Seção Preview (mockups App Store / Play). default: true */
  showPreview?: boolean;
  /** Mostrar frame App Store no preview. default: true */
  showMockupApple?: boolean;
  /** Mostrar frame Google Play no preview. default: true */
  showMockupPlay?: boolean;
  /** Seção Destaques. default: true se houver features */
  showHighlights?: boolean;
  /** Carrossel de imagens abaixo do sobre. default: false até ligar no admin */
  showGallery?: boolean;
  /** URLs do carrossel (uma por slide) */
  galleryImages?: string[];
  /** Texto do botão do link principal (ex.: Confira) */
  liveCtaLabel?: string;
}

/** Campos graváveis no CMS (merge sobre o projeto base do código) */
export type ProjectCmsPatch = Partial<
  Pick<
    Project,
    | "mockupAppleUrl"
    | "mockupPlayUrl"
    | "features"
    | "showPreview"
    | "showMockupApple"
    | "showMockupPlay"
    | "showHighlights"
    | "showGallery"
    | "galleryImages"
    | "liveCtaLabel"
  >
>;

export interface Feature {
  title: string;
  description: string;
  icon: string;
}

export const rachaoProject: Project = {
  id: "rachao",
  title: "Rachão",
  tagline: "Partidas, placar e comunidade de futebol",
  description:
    "Organize rachões com placar ao vivo, tempo de partida, histórico e cadastro de jogos — sem redundância: foco em quem joga.",
  longDescription: `O **Rachão** centraliza o que importa na pelada: criar partida, registrar placar e tempo, guardar histórico e conectar a comunidade (campos, avaliações, mural). Tudo com identidade esportiva e fluxos pensados para quem está em campo.

**Destaques:** cronômetro e placar em tempo real, registro de partidas, times e atletas, evolução para reserva de quadras e nota dos jogadores — no mesmo ecossistema.`,
  icon: "/images/rachao-icon.svg",
  tags: ["React Native", "TypeScript", "Expo", "Firebase"],
  status: "development",
  githubUrl: "https://github.com/edsonjuniornarvaes/rachao",
  type: "personal",
  showGithub: true,
  showFigma: false,
  figmaUrl: "",
  features: [
    {
      title: "Placar e tempo",
      description: "Placar ao vivo e controle de tempo de partida",
      icon: "⚽",
    },
    {
      title: "Histórico",
      description: "Registro de jogos, resultados e desempenho",
      icon: "📊",
    },
    {
      title: "Times e atletas",
      description: "Escalações, convites e avaliações",
      icon: "👥",
    },
    {
      title: "Comunidade",
      description: "Mural, comentários e campos da cidade (roadmap)",
      icon: "💬",
    },
  ],
};

export const osBarberClubProject: Project = {
  id: "os-barber-club",
  title: "OS Barber Club",
  tagline: "Agenda, preços e identidade — sem taxas de marketplace",
  description:
    "App próprio para agenda, profissionais, serviços e preços. O cliente marca horário com a cara da barbearia, sem depender de apps genéricos e comissões altas.",
  longDescription: `O **OS Barber Club** ganha um app com a identidade visual do salão, experiência fluida e foco em **agenda**, **lista de cortes e preços**, **profissionais** e **histórico do cliente**.

O objetivo é **tirar a dependência de marketplaces** que cobram por agendamento e não refletem a marca. Tudo pensado para escalar com notificações, fidelidade e módulos futuros — mantendo o controle no estabelecimento.`,
  icon: "/images/osbarberclub-icon.svg",
  iconColor: "#0D0D12",
  tags: ["React Native", "TypeScript", "Expo", "UI dedicada"],
  status: "development",
  type: "personal",
  githubUrl: undefined,
  showGithub: false,
  showFigma: true,
  figmaUrl: "",
  features: [
    {
      title: "Agendamento",
      description: "Escolha de profissional, horário e serviço",
      icon: "📅",
    },
    {
      title: "Cardápio de cortes",
      description: "Serviços e preços sempre atualizados",
      icon: "✂️",
    },
    {
      title: "Time",
      description: "Perfis dos barbeiros e especialidades",
      icon: "👤",
    },
    {
      title: "Marca própria",
      description: "Visual alinhado ao OS Barber Club",
      icon: "✨",
    },
  ],
};

export const clubeDaClutchProject: Project = {
  id: "clube-da-clutch",
  title: "Clube da Clutch & Joias",
  tagline: "Semijoias, locação de clutchs e acessórios exclusivos",
  description:
    "Descubra a sofisticação e elegância com nossas semijoias de alta qualidade e serviço exclusivo de locação de acessórios e clutchs. Peças refinadas para elevar seu estilo em qualquer ocasião.",
  longDescription: `O **Clube da Clutch & Joias** é uma plataforma que une **e-commerce de semijoias** com um serviço exclusivo de **locação de clutchs e acessórios** para eventos especiais.

O foco é oferecer peças refinadas, curadoria de qualidade e uma experiência de compra elegante — do catálogo ao checkout. Tudo com identidade visual sofisticada e fluxos pensados para quem busca brilho e praticidade.`,
  icon: "/images/clubedaclutch-logo.png",
  iconColor: "#b5a17c",
  tags: ["React Native", "TypeScript", "Expo", "E-commerce"],
  status: "development",
  type: "personal",
  liveUrl: "https://www.clubedaclutch.com.br",
  liveCtaLabel: "Visitar site",
  githubUrl: undefined,
  showGithub: false,
  showFigma: false,
  features: [
    {
      title: "Catálogo",
      description: "Semijoias e acessórios com fotos e detalhes",
      icon: "💎",
    },
    {
      title: "Locação",
      description: "Clutchs e acessórios para eventos especiais",
      icon: "👜",
    },
    {
      title: "Carrinho e checkout",
      description: "Compra simples e segura",
      icon: "🛒",
    },
    {
      title: "Elegância",
      description: "UI sofisticada alinhada à marca",
      icon: "✨",
    },
  ],
};

/** Projetos pessoais (cards compactos + link para detalhes) */
export const personalProjects: Project[] = [osBarberClubProject, clubeDaClutchProject, rachaoProject];

/** @deprecated use rachaoProject */
export const featuredProject = rachaoProject;

export const professionalProjects: Project[] = [
  {
    id: "pjbank",
    title: "PJBank",
    tagline: "Conta Digital para Empresas",
    description:
      "App financeiro corporativo para operações bancárias, Pix, emissão de boletos e gestão financeira integrada.",
    longDescription:
      "Atuei em funcionalidades críticas do app corporativo: autenticação com Auth0, fluxos sensíveis, MVVM, testes com Jest e observabilidade (Sentry, Datadog, Mixpanel).",
    icon: "pjbank",
    iconColor: "#00D4D4",
    iconLetter: "PJ",
    tags: ["React Native", "TypeScript", "Redux", "Auth0"],
    status: "production",
    liveUrl:
      "https://apps.apple.com/br/app/pjbank-conta-para-sua-empresa/id1267310347",
    type: "professional",
    showGithub: false,
    showFigma: false,
  },
  {
    id: "gruvi",
    title: "Gruvi",
    tagline: "Superapp para Condomínios",
    description:
      "App que conecta moradores a serviços e ao condomínio. Aprovação de visitantes, reserva de espaços e chat.",
    longDescription:
      "Desenvolvimento cross-platform em React Native, Redux Saga, testes com Jest, MongoDB em fluxos específicos e CI/CD com Bitrise.",
    icon: "gruvi",
    iconColor: "#FF3B7F",
    iconLetter: "G",
    tags: ["React Native", "TypeScript", "Redux Saga", "MongoDB"],
    status: "production",
    liveUrl: "https://apps.apple.com/br/app/gruvi/id1561610983",
    type: "professional",
    showGithub: false,
    showFigma: false,
  },
  {
    id: "mont-b2b",
    title: "Mont B2B",
    tagline: "Gestão de Investimentos",
    description:
      "App para gestão de carteiras financeiras personalizadas com acesso a gestores profissionais.",
    longDescription:
      "App publicado na App Store em que atuei em evolução do produto Mont Capital.",
    icon: "mont",
    iconColor: "#3D7A8C",
    iconLetter: "M",
    tags: ["React Native", "TypeScript", "Redux", "Jest"],
    status: "production",
    liveUrl: "https://apps.apple.com/br/app/mont-b2b/id6746648981",
    type: "professional",
    showGithub: false,
    showFigma: false,
  },
  {
    id: "mont-b2c",
    title: "Mont B2C",
    tagline: "Investimentos para Pessoa Física",
    description:
      "App de investimentos para clientes pessoa física da Mont Capital.",
    icon: "mont",
    iconColor: "#3D7A8C",
    iconLetter: "M",
    tags: ["React Native", "TypeScript", "Redux"],
    status: "paused",
    type: "professional",
    showGithub: false,
    showFigma: false,
  },
  {
    id: "minha-navex",
    title: "Minha Navex",
    tagline: "App de Telecom",
    description:
      "App para clientes de internet com extrato de uso, 2ª via de fatura e abertura de chamados.",
    icon: "navex",
    iconColor: "#6366F1",
    iconLetter: "N",
    tags: ["React Native", "TypeScript", "Redux", "OneSignal"],
    status: "paused",
    type: "professional",
    showGithub: false,
    showFigma: false,
  },
  {
    id: "consorcio-gazin",
    title: "Consórcio Gazin",
    tagline: "Gestão de Consórcios",
    description:
      "App para acompanhamento e gestão de consórcios do Grupo Gazin.",
    icon: "gazin",
    iconColor: "#EF4444",
    iconLetter: "G",
    tags: ["React Native", "TypeScript", "Redux"],
    status: "paused",
    type: "professional",
    showGithub: false,
    showFigma: false,
  },
];

export const webProjects: Project[] = [
  {
    id: "gazin-b2b-b2c",
    title: "Gazin B2B & B2C",
    tagline: "E-commerce Completo",
    description:
      "Painéis Seller, Gestor e plataforma de e-commerce completa do Grupo Gazin.",
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
    description:
      "Plataforma que conecta lojistas ao estoque da Gazin para vendas comissionadas.",
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
    description:
      "Painel administrativo e plataforma de vendas das Lojas do Manão.",
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
    description:
      "Sistema de emissão e controle de notas fiscais para empresas.",
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
    description:
      "Dashboard e ferramentas administrativas para gestão de telecom.",
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
    description:
      "Sistema interno para gestão segura de credenciais da empresa.",
    icon: "senhas",
    iconColor: "#3B82F6",
    iconLetter: "🔐",
    tags: ["PHP", "Laravel", "JavaScript"],
    status: "paused",
    type: "professional",
  },
];

const allProjects: Project[] = [
  ...personalProjects,
  ...professionalProjects,
  ...webProjects,
];

export function getProjectById(id: string): Project | undefined {
  return allProjects.find((p) => p.id === id);
}

export function mergeProjectPatch(base: Project, patch: ProjectCmsPatch | null | undefined): Project {
  if (!patch) return base;
  const out: Project = { ...base };
  (Object.keys(patch) as (keyof ProjectCmsPatch)[]).forEach((key) => {
    const v = patch[key];
    if (v !== undefined) (out as unknown as Record<string, unknown>)[key as string] = v;
  });
  return out;
}

export function getAllProjectsBrief(): { id: string; title: string; type: Project["type"] }[] {
  return allProjects.map((p) => ({ id: p.id, title: p.title, type: p.type }));
}
