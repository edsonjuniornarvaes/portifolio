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
  /** Imagem de capa do card (tela do app, logo ou arte do projeto) */
  coverImage?: string;
  /** Tela de app mostrada ao lado do notebook, em projetos que juntam site e aplicativo */
  pairScreen?: string;
  /** Quantos projetos este cartão reúne (para a contagem do topo). Padrão: 1 */
  count?: number;
  /** Arte própria (mascote/logo) no lugar de celular ou notebook, para projetos sem print de tela */
  art?: string;
  /** Telas exibidas na página do projeto, independente do SHOW_PROJECT_IMAGES */
  screens?: string[];
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
  coverImage: "/images/projects/clube-site-hero.webp",
  screens: ["/images/projects/clube-site-hero.webp", "/images/projects/clube-site-home.webp", "/images/projects/clube-site-aneis.webp"],
  title: "Clube da Joia: Marketplace",
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
  galleryImages: ["/images/marketplace-home.webp", "/images/marketplace-loja.jpg"],
  features: [
    { title: "Catálogo", description: "Filtros por categoria, modelo, aro, pedra e preço", icon: "" },
    { title: "Pagamentos", description: "Mercado Pago com cartão, Pix e boleto; webhook assinado", icon: "" },
    { title: "Painel admin", description: "2FA obrigatório e permissões por papel com RLS", icon: "" },
    { title: "Backend único", description: "Supabase com Edge Functions, Storage e RLS", icon: "" },
  ],
};

export const clubeDaJoiaAppProject: Project = {
  id: "clube-da-joia-app",
  coverImage: "/images/projects/clube-app-cover.webp",
  screens: ["/images/projects/clube-app-home.webp"],
  title: "Clube da Joia: App",
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
export const multjetProject: Project = {
  id: "multjet",
  title: "MultJet",
  tagline: "Site de uma fábrica de produtos de limpeza em Umuarama",
  description: "Site da MultJet, fábrica própria de produtos de limpeza: catálogo com filtros, página para empresas, antes e depois, lojas com mapa e pedidos pelo WhatsApp.",
  longDescription: `Site de página única da **MultJet**, fábrica de produtos de limpeza de Umuarama, pensado para vender: direto ao ponto, com pedido pelo WhatsApp em todas as seções.

**Produtos:** catálogo em destaque com filtros (casa, empresas, automotivo e industrial) e botão "Consultar preço" em cada item.

**Para empresas:** área de fornecimento recorrente para condomínios, restaurantes, clínicas, oficinas e comércios, com pedido de orçamento pelo WhatsApp do administrativo.

**Confiança:** seção da indústria, slider de antes e depois para mostrar o resultado, depoimentos de clientes, perguntas frequentes e as duas lojas com horário, mapa e "Como chegar".

**Marca:** a identidade visual e o mascote da MultJet em todas as páginas, publicado na Vercel.`,
  icon: "",
  iconLetter: "MJ",
  iconColor: "#d92027",
  art: "/images/projects/multjet-mascot.webp",
  screens: ["/images/projects/multjet-logo.webp"],
  tags: ["Next.js", "TypeScript", "Vercel"],
  status: "production",
  liveUrl: "https://multjet.com.br/",
  liveCtaLabel: "Ver o site",
  type: "personal",
  showGithub: false,
  showFigma: false,
  showPreview: false,
  features: [
    { title: "Catálogo com filtros", description: "Produtos por categoria, com consulta de preço pelo WhatsApp.", icon: "" },
    { title: "Área para empresas", description: "Fornecimento recorrente e orçamento empresarial.", icon: "" },
    { title: "Antes e depois", description: "Slider para arrastar e ver o resultado da limpeza.", icon: "" },
    { title: "Lojas e contato", description: "Duas lojas com mapa, horário e atendimento por WhatsApp.", icon: "" },
  ],
};

export const personalProjects: Project[] = [clubeDaJoiaMarketplaceProject, multjetProject, clubeDaJoiaAppProject];

export const professionalProjects: Project[] = [
  {
    id: "pjbank",
    coverImage: "/images/projects/pjbank-cover.webp",
    screens: ["/images/projects/pjbank-home.webp", "/images/projects/pjbank-cover.webp"],
    title: "Conta Superlógica",
    tagline: "Conta digital integrada ao sistema de gestão",
    description:
      "Conta para empresas, administradoras e condomínios: recebimentos por boleto e Pix, pagamentos com alçadas de aprovação, conciliação automática e carteira Pix, direto do app ou do ERP.",
    longDescription:
      "Atuei em funcionalidades críticas do app corporativo: autenticação com Auth0, fluxos sensíveis, MVVM, testes com Jest e observabilidade (Sentry, Datadog, Mixpanel).",
    icon: "pjbank",
    iconColor: "#00D4D4",
    iconLetter: "CS",
    tags: ["React Native", "TypeScript", "Redux", "Auth0"],
    status: "production",
    liveUrl:
      "https://apps.apple.com/br/app/pjbank-conta-para-sua-empresa/id1267310347",
    type: "professional",
    showPreview: false,
    galleryImages: ["/images/pjbank-app.webp"],
    showGithub: false,
    showFigma: false,
  },
  {
    id: "gruvi",
    coverImage: "/images/projects/gruvi-cover.webp",
    screens: ["/images/projects/gruvi-home.webp", "/images/projects/gruvi-minha-casa.webp", "/images/projects/gruvi-cover.webp"],
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
    showPreview: false,
    galleryImages: ["/images/gruvi-app.webp"],
    showGithub: false,
    showFigma: false,
  },
  {
    id: "mont-capital",
    coverImage: "/images/projects/mont-home-alt.webp",
    screens: ["/images/projects/mont-home-alt.webp", "/images/projects/mont-home-new.webp", "/images/projects/mont-carteira-new.webp", "/images/projects/mont-b2b-login.webp", "/images/projects/mont-b2c-login.webp"],
    title: "Mont Capital",
    tagline: "Investimentos para empresas e pessoas físicas",
    description:
      "Aplicativos de gestão de investimentos da Mont Capital: um para empresas (B2B), com carteiras personalizadas e acesso a gestores profissionais, e outro para pessoas físicas (B2C).",
    longDescription:
      "Atuei na evolução do produto Mont Capital, que tem dois aplicativos: o **Mont B2B**, publicado na App Store, para gestão de carteiras financeiras personalizadas com acesso a gestores profissionais; e o **Mont B2C**, para clientes pessoa física, com patrimônio, carteira e exposição por classe de ativos.",
    icon: "mont",
    iconColor: "#3D7A8C",
    iconLetter: "M",
    tags: ["React Native", "TypeScript", "Redux", "Jest"],
    status: "production",
    liveUrl: "https://apps.apple.com/br/app/mont-b2b/id6746648981",
    type: "professional",
    showPreview: false,
    showGithub: false,
    showFigma: false,
    count: 2,
    features: [
      { title: "Mont B2B", description: "Gestão de carteiras personalizadas, com acesso a gestores profissionais. Publicado na App Store.", icon: "" },
      { title: "Mont B2C", description: "Investimentos para pessoa física: patrimônio total, carteira e exposição por classe de ativos.", icon: "" },
    ],
  },
  {
    id: "minha-navex",
    coverImage: "/images/projects/navex-home-new.webp",
    screens: ["/images/projects/navex-home-new.webp", "/images/projects/navex-fatura-new.webp", "/images/projects/navex-chamados.webp", "/images/projects/navex-board.webp"],
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
    showPreview: false,
    galleryImages: ["/images/navex-app.webp"],
    showGithub: false,
    showFigma: false,
  },
  {
    id: "gazin",
    coverImage: "/images/projects/venda-direta-site.webp",
    screens: ["/images/projects/venda-direta-site.webp"],
    pairScreen: "/images/projects/consorcio-gazin-simulador.webp",
    title: "Grupo Gazin",
    tagline: "Consórcios, e-commerce e venda direta",
    description:
      "Três frentes para o Grupo Gazin: o app de gestão de consórcios, a plataforma de e-commerce com painéis Seller e Gestor, e o marketplace de venda direta para lojistas.",
    longDescription:
      "Trabalhei em três produtos do Grupo Gazin: o **Consórcio Gazin**, app para acompanhar e gerir consórcios; o **Gazin B2B & B2C**, e-commerce completo com painéis Seller e Gestor; e o **Venda Direta**, plataforma que conecta lojistas ao estoque da Gazin para vendas comissionadas.",
    icon: "gazin",
    iconColor: "#EF4444",
    iconLetter: "G",
    tags: ["React Native", "React.js", "Next.js", "TypeScript", "Laravel"],
    status: "paused",
    type: "professional",
    showPreview: false,
    showGithub: false,
    showFigma: false,
    count: 3,
    features: [
      { title: "Consórcio Gazin (app)", description: "Acompanhamento e gestão de consórcios, com simulador de planos.", icon: "" },
      { title: "Gazin B2B & B2C", description: "E-commerce completo, com painéis Seller e Gestor.", icon: "" },
      { title: "Venda Direta", description: "Marketplace que conecta lojistas ao estoque da Gazin para vendas comissionadas.", icon: "" },
    ],
  },
];

export const webProjects: Project[] = [
  {
    id: "erp-sistemas",
    title: "Sistemas de gestão (ERP)",
    tagline: "Painéis e sistemas internos que organizam a operação das empresas",
    description:
      "Sistemas de gestão, os ERPs, onde a empresa organiza a operação em um só lugar: vendas, notas fiscais, equipe e credenciais.",
    longDescription:
      "Sistemas de gestão (ERP) são painéis onde a empresa **organiza o que acontece por dentro**: vendas, notas, atendimento e acessos. Alguns exemplos em que trabalhei:\n\n- **Lojas do Manão:** painel administrativo e plataforma de vendas (B2B e B2C).\n- **Agiliza Aí:** emissão e controle de notas fiscais para empresas.\n- **Mix Telecom:** dashboard e ferramentas administrativas para gestão de telecom.\n- **Gerenciador de Senhas:** sistema interno para guardar e compartilhar credenciais da equipe com segurança.",
    icon: "erp",
    iconColor: "#2EEBAA",
    iconLetter: "ERP",
    tags: ["React.js", "TypeScript", "PHP", "Laravel", "Styled-components"],
    status: "paused",
    type: "professional",
    showGithub: false,
    showFigma: false,
    count: 4,
    features: [
      { title: "Lojas do Manão", description: "Painel administrativo e plataforma de vendas, B2B e B2C.", icon: "" },
      { title: "Agiliza Aí", description: "Emissão e controle de notas fiscais para empresas.", icon: "" },
      { title: "Mix Telecom", description: "Dashboard e ferramentas administrativas para gestão de telecom.", icon: "" },
      { title: "Gerenciador de Senhas", description: "Gestão segura de credenciais da equipe, em sistema interno.", icon: "" },
    ],
  },
];

const allProjects: Project[] = [
  ...personalProjects,
  ...professionalProjects,
  ...webProjects,
];

/** Total de projetos no portfólio (cada cartão pode reunir vários). */
export function projectsTotal(): number {
  return allProjects.reduce((n, p) => n + (p.count ?? 1), 0);
}

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
