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

export const clubeDaJoiaMarketplaceProject: Project = {
  id: "clube-da-joia-marketplace",
  title: "Clube da Joia — Marketplace",
  tagline: "Loja online de prata 925 e moissanite, com painel administrativo e checkout",
  description:
    "Site de e-commerce com catálogo filtrável, sacola, checkout Mercado Pago e painel /admin com 2FA, tudo sobre um backend Supabase.",
  longDescription: `O **Marketplace do Clube da Joia** é o site e o painel de uma joalheria que vende prata 925 e moissanite. Foi construído do zero em **Next.js (App Router)** com **Tailwind** e **Supabase**, e publicado na **Vercel**.

**Loja:** catálogo com filtros (categoria, modelo, aro, pedra, preço, promoção e ordem), tamanho do aro por produto, sacola, conta de cliente com *Meus Pedidos*, cupons, frete por UF e carrossel do Instagram.

**Pagamentos:** checkout com **Mercado Pago** (cartão em até 10x, Pix e boleto). Os preços são sempre lidos do banco, no servidor, e o webhook é validado por assinatura HMAC.

**Painel /admin:** login com 2FA TOTP obrigatório, recuperação de senha, convite de usuários, CRUD de produtos, categorias e banners (com upload no Storage), pedidos e permissões por papel (admin, editor, cliente) reforçadas por RLS no banco.`,
  icon: "",
  iconLetter: "CJ",
  iconColor: "#b08d57",
  tags: ["Next.js", "Tailwind", "Supabase", "Mercado Pago", "Vercel"],
  status: "development",
  type: "personal",
  githubUrl: undefined,
  showGithub: false,
  showFigma: false,
  showPreview: false,
  galleryImages: ["/images/marketplace-loja.jpg"],
  features: [
    { title: "Catálogo", description: "Filtros por categoria, modelo, aro, pedra e preço", icon: "" },
    { title: "Pagamentos", description: "Mercado Pago com cartão, Pix e boleto; webhook assinado", icon: "" },
    { title: "Painel admin", description: "2FA obrigatório e permissões por papel com RLS", icon: "" },
    { title: "Backend único", description: "Supabase com Edge Functions, Storage e RLS", icon: "" },
  ],
};

export const clubeDaJoiaAppProject: Project = {
  id: "clube-da-joia-app",
  title: "Clube da Joia — App",
  tagline: "App iOS e Android da loja, no mesmo backend do site",
  description:
    "App em React Native (Expo) com catálogo, sacola, checkout Mercado Pago, conta e Meus Pedidos, compartilhando login e dados com o site.",
  longDescription: `O **App do Clube da Joia** leva a loja para o celular. Foi feito com **Expo (SDK 54)**, **expo-router** e **React Native**, em arquitetura **MVVM**, e usa o mesmo projeto Supabase do site: o cliente entra com a mesma conta e vê os mesmos pedidos.

**Navegação:** abas Início, Loja, Sacola (botão central), Categorias e Conta. O catálogo e os banners vêm do Supabase, com uma cópia local de reserva caso a rede falhe.

**Compra:** sacola, cupom validado no servidor e pagamento pelo **Mercado Pago**, aberto no navegador do sistema e com retorno para dentro do app por deep link.

**Qualidade:** textos em português, inglês e espanhol com tipagem que acusa chave faltando, Jest nos testes e Sentry para monitoramento.`,
  icon: "",
  iconLetter: "CJ",
  iconColor: "#8a6d3b",
  tags: ["React Native", "Expo", "TypeScript", "Supabase", "MVVM"],
  status: "development",
  type: "personal",
  githubUrl: undefined,
  showGithub: false,
  showFigma: false,
  showPreview: false,
  features: [
    { title: "MVVM", description: "Telas separadas em view, viewModel, models e styles", icon: "" },
    { title: "Checkout", description: "Mercado Pago com retorno ao app por deep link", icon: "" },
    { title: "i18n tipado", description: "pt, en e es verificados pelo TypeScript", icon: "" },
    { title: "Mesma conta do site", description: "Login e pedidos compartilhados via Supabase", icon: "" },
  ],
};

/** Projetos pessoais */
export const personalProjects: Project[] = [clubeDaJoiaMarketplaceProject, clubeDaJoiaAppProject];

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
    tagline: "Superapp para condomínios, com milhões de usuários",
    description:
      "Superapp que conecta moradores a serviços e ao condomínio: pagamento de aluguel, reserva de espaços e chat em tempo real.",
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
