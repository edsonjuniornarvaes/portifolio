import type { Lang } from "./config";
import type { Project } from "@/app/projects/helper";
import type { CaseStudy, JourneyItem } from "@/data/profile";

type ProjectEn = {
  tagline: string;
  description: string;
  longDescription?: string;
  features?: [string, string][];
};

const PROJECTS_EN: Record<string, ProjectEn> = {
  "clube-da-joia-marketplace": {
    tagline: "Online store for 925 silver and moissanite, with admin panel and checkout",
    description:
      "E-commerce site with a filterable catalog, cart, Mercado Pago checkout and an /admin panel with 2FA, all on a Supabase backend.",
    longDescription: `The **Clube da Joia Marketplace** is the site and admin panel of a jewelry shop that sells 925 silver and moissanite. It was built from scratch with **Next.js (App Router)**, **Tailwind** and **Supabase**, and deployed on **Vercel**.

**Store:** catalog with filters (category, model, ring size, stone, price, sale and sorting), ring size per product, cart, customer account with *My Orders*, coupons, shipping by state and an Instagram carousel.

**Payments:** checkout with **Mercado Pago** (card up to 10 installments, Pix and boleto). Prices are always read from the database on the server, and the webhook is verified with an HMAC signature.

**/admin panel:** login with mandatory TOTP 2FA, password recovery, user invitations, CRUD for products, categories and banners (with Storage upload), orders and role-based permissions (admin, editor, customer) enforced by RLS in the database.`,
    features: [
      ["Catalog", "Filters by category, model, ring size, stone and price"],
      ["Payments", "Mercado Pago with card, Pix and boleto; signed webhook"],
      ["Admin panel", "Mandatory 2FA and role-based permissions with RLS"],
      ["Single backend", "Supabase with Edge Functions, Storage and RLS"],
    ],
  },
  "clube-da-joia-app": {
    tagline: "iOS and Android app for the store, on the same backend as the site",
    description:
      "React Native (Expo) app with catalog, cart, Mercado Pago checkout, account and My Orders, sharing login and data with the site.",
    longDescription: `The **Clube da Joia App** brings the store to the phone. It was built with **Expo (SDK 54)**, **expo-router** and **React Native**, using an **MVVM** architecture, and uses the same Supabase project as the site: customers sign in with the same account and see the same orders.

**Navigation:** Home, Store, Bag (center button), Categories and Account tabs. The catalog and banners come from Supabase, with a local fallback copy in case the network fails.

**Purchase:** bag, server-validated coupon and payment through **Mercado Pago**, opened in the system browser and returning to the app through a deep link.

**Quality:** texts in Portuguese, English and Spanish with typing that flags missing keys, Jest for tests and Sentry for monitoring.`,
    features: [
      ["MVVM", "Screens split into view, viewModel, models and styles"],
      ["Checkout", "Mercado Pago with return to the app via deep link"],
      ["Typed i18n", "pt, en and es checked by TypeScript"],
      ["Same account as the site", "Login and orders shared through Supabase"],
    ],
  },
  pjbank: {
    tagline: "Digital account for businesses",
    description:
      "Corporate financial app for banking operations, Pix, boleto issuing and integrated financial management.",
    longDescription:
      "I worked on critical features of the corporate app: authentication with Auth0, sensitive flows, MVVM, Jest tests and observability (Sentry, Datadog, Mixpanel).",
  },
  gruvi: {
    tagline: "Super app for condominiums, with millions of users",
    description:
      "Super app that connects residents to services and to the condominium: rent payments, space reservations and real-time chat.",
    longDescription:
      "Cross-platform development with React Native, Redux Saga, Jest tests, MongoDB in specific flows and CI/CD with Bitrise.",
  },
  "mont-b2b": {
    tagline: "Investment management",
    description: "App for managing personalized financial portfolios with access to professional managers.",
    longDescription: "App published on the App Store where I worked on evolving the Mont Capital product.",
  },
  "mont-b2c": {
    tagline: "Investments for individuals",
    description: "Investment app for Mont Capital's individual clients.",
  },
  "minha-navex": {
    tagline: "Telecom app",
    description: "App for internet customers with usage statement, invoice copies and support tickets.",
  },
  "consorcio-gazin": {
    tagline: "Consortium management",
    description: "App to follow and manage Grupo Gazin consortiums.",
  },
  "gazin-b2b-b2c": {
    tagline: "Full e-commerce",
    description: "Seller and Manager panels and the complete e-commerce platform of Grupo Gazin.",
  },
  "venda-direta-gazin": {
    tagline: "Marketplace for retailers",
    description: "Platform connecting retailers to Gazin's inventory for commissioned sales.",
  },
  "lojas-manao": {
    tagline: "B2B & B2C",
    description: "Admin panel and sales platform for Lojas do Manão.",
  },
  "agiliza-ai": {
    tagline: "Tax management",
    description: "System for issuing and managing invoices for companies.",
  },
  "mix-telecom": {
    tagline: "Admin panel",
    description: "Dashboard and admin tools for telecom management.",
  },
  "gerenciador-senhas": {
    tagline: "Internal system",
    description: "Internal system for secure management of company credentials.",
  },
};

export function localizeProject(p: Project, lang: Lang): Project {
  if (lang === "pt") return p;
  const e = PROJECTS_EN[p.id];
  if (!e) return p;
  return {
    ...p,
    tagline: e.tagline,
    description: e.description,
    longDescription: e.longDescription ?? (p.longDescription ? e.description : undefined),
    features: e.features
      ? (p.features || []).map((f, i) => ({ ...f, title: e.features![i]?.[0] ?? f.title, description: e.features![i]?.[1] ?? f.description }))
      : p.features,
  };
}

const MONTHS: [RegExp, string][] = [
  [/\bAbr\b/g, "Apr"],
  [/\bMai\b/g, "May"],
  [/\bAgo\b/g, "Aug"],
  [/\bSet\b/g, "Sep"],
  [/\bOut\b/g, "Oct"],
  [/\bDez\b/g, "Dec"],
  [/\bFev\b/g, "Feb"],
  [/\bAtual\b/g, "Present"],
  [/\bhoje\b/g, "present"],
  [/\bDo zero, ponta a ponta\b/g, "From scratch, end to end"],
];

export function localizePeriod(s: string, lang: Lang) {
  if (lang === "pt") return s;
  return MONTHS.reduce((acc, [re, to]) => acc.replace(re, to), s);
}

const CASES_EN: Record<string, Omit<CaseStudy, "id" | "name" | "color" | "stack" | "href" | "period">> = {
  pjbank: {
    tag: "Fintech · Digital account for businesses",
    summary: "Corporate financial app in production: banking operations, Pix, boletos and financial management.",
    role: "Mobile Developer — critical features, authentication and quality.",
    highlights: [
      "MVVM architecture applied and standardized to scale and ease maintenance",
      "Secure authentication flows with Auth0",
      "Critical financial flows: Pix Automático and corporate authorization",
      "Jest, Sentry, Datadog, Mixpanel and Kibana; CI/CD with Bitrise and Harness",
      "Consistent behavior on iOS and Android",
    ],
    cta: "View on the App Store",
  },
  gruvi: {
    tag: "Super app · Condominiums",
    summary: "Super app for condominiums with millions of users: visitors, rent, reservations and chat.",
    role: "Mid-level Mobile Developer — cross-platform features and quality.",
    highlights: [
      "Rent payment and other financial flows",
      "Reservations and property features",
      "Real-time chat between residents",
      "API integration and MongoDB backend; architecture and reliability improvements",
    ],
    cta: "View on the App Store",
  },
  "mont-b2b": {
    tag: "Investments · Telecom",
    summary: "B2B and B2C investment management apps and the Minha Navex telecom app, built from scratch.",
    role: "Mid-level Mobile Developer — screens, flows, integrations and store publishing.",
    highlights: [
      "Secure authentication and portfolio management (Mont Capital)",
      "Usage statement, invoice and customer support (Minha Navex, from scratch)",
      "Push notifications with OneSignal and external API integrations",
      "Publishing and maintenance on the App Store and Play Store",
    ],
    cta: "View Mont B2B",
  },
  "clube-da-joia-marketplace": {
    tag: "E-commerce · Own project",
    summary: "Site and admin panel of an online jewelry shop (925 silver and moissanite), with real payments.",
    role: "Product, design, front end and backend — everything.",
    highlights: [
      "Mercado Pago checkout (card, Pix and boleto) with server-validated prices and a signed webhook",
      "/admin panel with login, mandatory 2FA and role-based permissions via RLS",
      "Catalog with filters, coupons, shipping by state, customer account and My Orders",
      "Catalog and banners in Supabase, with a static fallback",
    ],
    cta: "View details",
  },
  "clube-da-joia-app": {
    tag: "App · Own project",
    summary: "iOS and Android app for the store, on the same backend as the site.",
    role: "Architecture, screens, Supabase integration and checkout.",
    highlights: [
      "MVVM with view, viewModel, models and styles per screen",
      "Home, Store, Bag, Categories and Account tabs with expo-router",
      "Mercado Pago checkout returning to the app by deep link",
      "Typed pt, en and es texts; Jest and Sentry",
    ],
    cta: "View details",
  },
};

export function localizeCase(c: CaseStudy, lang: Lang): CaseStudy {
  if (lang === "pt") return c;
  const e = CASES_EN[c.id];
  return e ? { ...c, ...e, period: localizePeriod(c.period, lang) } : c;
}

const JOURNEY_EN: Pick<JourneyItem, "title" | "text">[] = [
  { title: "Starting in tech", text: "Enrolled in Information Systems Management at Unipar. This is where a curiosity that never stopped was born." },
  { title: "Degree in Information Systems", text: "UniALFA Umuarama. Logic, databases and the first real web applications." },
  { title: "First job as a developer", text: "E/Code, as Junior Web Developer (PHP, Laravel). In parallel, a postgraduate degree in Web and Mobile Development." },
  { title: "Mid-level Web", text: "React, Next.js and TypeScript on high-volume projects: Gazin, Navex and Lojas do Manão." },
  { title: "Moving to mobile", text: "React Native and Expo: Mont Capital, Minha Navex (from scratch) and Consórcio Gazin on the stores." },
  { title: "Scrum Master and mobile developer", text: "Ceremonies, metrics and technical decisions on the mobile team, without leaving the code: Mont Capital, Gazin Consórcio and Minha Navex." },
  { title: "Gruvi at Superlógica", text: "Super app for condominiums with Redux Saga, MongoDB, Jest and CI/CD with Bitrise." },
  { title: "Senior Mobile at PJBank", text: "Digital account for businesses: MVVM, Auth0, Pix Automático, corporate authorization and full observability." },
  { title: "Own products", text: "Clube da Joia: site, admin panel, app and payments on a single backend. I build end to end." },
];

export function localizeJourney(list: JourneyItem[], lang: Lang): JourneyItem[] {
  if (lang === "pt") return list;
  return list.map((j, i) => ({ ...j, ...(JOURNEY_EN[i] || {}), year: j.year === "Hoje" ? "Today" : j.year }));
}

type Exp = {
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  highlights: string[];
  skills: string[];
};

const EXPERIENCE_EN: Pick<Exp, "role" | "location" | "description" | "highlights">[] = [
  {
    role: "Senior Mobile Developer",
    location: "Campinas, SP · Remote",
    description: "On PJBank (digital account for businesses), I handle architecture, performance, user experience and security in critical financial features.",
    highlights: [
      "MVVM architecture applied and standardized to scale and ease maintenance",
      "Native and cross-platform features with React Native",
      "Secure authentication flows with Auth0",
      "Unit testing with Jest",
      "Observability with Sentry, Datadog, Mixpanel and Kibana",
      "CI/CD with Bitrise and Harness",
      "Critical financial flows: Pix Automático and corporate authorization",
    ],
  },
  {
    role: "Mobile Developer",
    location: "Campinas, SP · Remote",
    description: "On Gruvi, a super app for condominiums with millions of users: payments, reservations, real-time chat and property features, working with product, design, backend and engineering.",
    highlights: [
      "Features in React Native and TypeScript",
      "Rent payment and other financial flows",
      "Real-time chat and space reservations",
      "API integration and MongoDB backend",
      "Architecture, reliability and maintainability improvements",
    ],
  },
  {
    role: "Scrum Master and Mobile Developer",
    location: "Umuarama, PR · Remote",
    description: "React Native and TypeScript apps for Mont Capital, Gazin Consórcio and Minha Navex, plus facilitating Scrum ceremonies, team metrics and process improvement.",
    highlights: [
      "Facilitating Scrum ceremonies and tracking metrics",
      "Technical decisions and architecture discussions",
      "Apps in React Native and TypeScript",
    ],
  },
  {
    role: "Mobile Developer",
    location: "Umuarama, PR · Hybrid",
    description: "I built the Minha Navex app from scratch and the financial features of Mont Capital (account opening and investments), with integrations such as OneSignal, for iOS and Android.",
    highlights: [
      "Minha Navex (telecom) built from scratch: statement, invoice and support",
      "Mont Capital: account opening and investments",
      "Notifications with OneSignal and API integration",
      "Publishing on the App Store and Google Play",
    ],
  },
  {
    role: "Web Developer",
    location: "Umuarama, PR · Hybrid",
    description: "Billing and management systems, e-commerce, REST APIs and admin panels with Laravel, PHP, JavaScript and React.js.",
    highlights: [
      "Billing and management systems and e-commerce",
      "REST APIs and admin panels with Laravel",
      "Front end in React.js",
    ],
  },
  {
    role: "Junior Web Developer",
    location: "Umuarama, PR · On-site",
    description: "First professional projects: billing and management systems, e-commerce and REST APIs with Laravel, integrating front end and back end.",
    highlights: [
      "Billing, management and e-commerce systems",
      "Front end and back end integration",
      "Maintaining existing systems",
    ],
  },
];

export function localizeExperience<T extends Exp>(list: T[], lang: Lang): T[] {
  if (lang === "pt") return list;
  return list.map((j, i) => ({
    ...j,
    ...(EXPERIENCE_EN[i] || {}),
    period: localizePeriod(j.period, lang),
    skills: j.skills.map((s) => (s === "Metodologias Ágeis" ? "Agile Methodologies" : s)),
  }));
}

type Edu = { course: string; period: string; institution: string };
const EDU_EN = [
  { course: "Postgraduate Degree in Web and Mobile Development", institution: "UniALFA Umuarama" },
  { course: "Bachelor's Degree in Information Systems", institution: "UniALFA Umuarama" },
  { course: "Bachelor's Degree in Information Systems Management", institution: "Unipar - Universidade Paranaense" },
];

export function localizeEducation<T extends Edu>(list: T[], lang: Lang): T[] {
  if (lang === "pt") return list;
  return list.map((e, i) => ({ ...e, ...(EDU_EN[i] || {}) }));
}

export const SKILL_GROUP_EN: Record<string, string> = {
  Mobile: "Mobile",
  "Linguagens & Web": "Languages & Web",
  "Estado & Dados": "State & Data",
  "Qualidade & Observabilidade": "Quality & Observability",
  "CI/CD & Processo": "CI/CD & Process",
  "Produto & Segurança": "Product & Security",
};
