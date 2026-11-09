/**
 * O que aparece ao lado de cada fase da experiência, na ordem de `ExperienceData`
 * (mais recente primeiro). A primeira entrada (`OWN_STORY`) é "Produtos próprios".
 * Para ligar outro projeto a uma fase, é só editar as listas abaixo.
 */
export type StoryItem =
  | { kind: "phone"; id: string; title: string; src: string }
  | { kind: "web"; id: string; title: string; src?: string; letter: string; color: string };

const P = "/images/projects/";

export const OWN_STORY: StoryItem[] = [
  { kind: "web", id: "clube-da-joia-marketplace", title: "Clube da Joia", src: `${P}marketplace-web.webp`, letter: "CJ", color: "#b08d57" },
  { kind: "phone", id: "clube-da-joia-app", title: "Clube da Joia App", src: `${P}clube-app-home.webp` },
];

export const JOB_STORY: StoryItem[][] = [
  // Superlógica · PJBank (2025 – atual)
  [{ kind: "phone", id: "pjbank", title: "PJBank", src: `${P}pjbank-home.webp` }],
  // Superlógica · Gruvi (2024 – 2025)
  [
    { kind: "phone", id: "gruvi", title: "Gruvi", src: `${P}gruvi-home.webp` },
    { kind: "phone", id: "gruvi", title: "Gruvi", src: `${P}gruvi-minha-casa.webp` },
  ],
  // ecode · Scrum Master e mobile (2023 – 2024)
  [
    { kind: "phone", id: "mont-b2b", title: "Mont B2B", src: `${P}mont-b2b-home.webp` },
    { kind: "phone", id: "mont-b2c", title: "Mont B2C", src: `${P}mont-b2c-carteira.webp` },
    { kind: "phone", id: "consorcio-gazin", title: "Consórcio Gazin", src: `${P}consorcio-gazin-simulador.webp` },
  ],
  // ecode · Mobile (2021 – 2023)
  [
    { kind: "phone", id: "minha-navex", title: "Minha Navex", src: `${P}navex-home.webp` },
    { kind: "phone", id: "minha-navex", title: "Minha Navex", src: `${P}navex-fatura.webp` },
    { kind: "phone", id: "minha-navex", title: "Minha Navex", src: `${P}navex-chamados.webp` },
  ],
  // ecode · Web (2020 – 2021)
  [
    { kind: "web", id: "gazin-b2b-b2c", title: "Gazin B2B & B2C", letter: "G", color: "#e11d48" },
    { kind: "web", id: "venda-direta-gazin", title: "Venda Direta Gazin", letter: "VD", color: "#dc2626" },
    { kind: "web", id: "lojas-manao", title: "Lojas do Manão", src: `${P}lojas-manao.webp`, letter: "LM", color: "#f59e0b" },
  ],
  // ecode · Web júnior (2019 – 2020)
  [
    { kind: "web", id: "agiliza-ai", title: "Agiliza Aí", letter: "A", color: "#10b981" },
    { kind: "web", id: "mix-telecom", title: "Mix Telecom", letter: "MT", color: "#8b5cf6" },
    { kind: "web", id: "gerenciador-senhas", title: "Gerenciador de Senhas", letter: "GS", color: "#3b82f6" },
  ],
];
