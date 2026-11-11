import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import ScrollProgress from "@/components/ui/scroll-progress";
import CommandPalette from "@/components/command-palette";
import StyledComponentsRegistry from "./registry";
import AnalyticsTracker from "@/components/analytics-tracker";
import { LangProvider } from "@/i18n/provider";
import { getLang } from "@/i18n/server";
import { ui } from "@/i18n/dict";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://portifolio-wheat-omega-16.vercel.app";

const body = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const m = ui[await getLang()].meta;
  return {
    metadataBase: new URL(siteUrl),
    title: { default: m.title, template: "%s | Edson Junior" },
    description: m.description,
    keywords: ["React Native", "Next.js", "TypeScript", "Desenvolvedor Web", "Desenvolvedor Mobile", "iOS", "Android", "Portfólio"],
    authors: [{ name: "Edson Junior" }],
    icons: { icon: [{ url: "/icon.svg", type: "image/svg+xml" }] },
    openGraph: {
      title: m.ogTitle,
      description: m.ogDescription,
      type: "website",
      locale: m.ogLocale,
      url: siteUrl,
      images: [{ url: "/images/edson.webp", width: 800, height: 800, alt: "Edson Junior" }],
    },
    twitter: { card: "summary", title: m.ogTitle, images: ["/images/edson.webp"] },
  };
}

const personJsonLd = (jobTitle: string) => ({
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Edson Junior Narvaes",
  jobTitle,
  url: siteUrl,
  image: `${siteUrl}/images/edson.webp`,
  sameAs: [
    "https://www.linkedin.com/in/edsonjuniornarvaes/",
    "https://github.com/edsonjuniornarvaes",
    "https://dev.to/edsonjuniornarvaes",
    "https://www.instagram.com/edsonjunior.dev",
  ],
  knowsAbout: ["React Native", "TypeScript", "iOS", "Android", "Next.js"],
});

const themeScript = `try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark')document.documentElement.setAttribute('data-theme',t)}catch(e){}`;

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const lang = await getLang();
  return (
    <html
      lang={lang === "pt" ? "pt-BR" : "en"}
      className={`${body.variable} ${jetbrains.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd(ui[lang].meta.jobTitle)) }}
        />
        <LangProvider initial={lang}>
          <StyledComponentsRegistry>
            <AnalyticsTracker />
            <ScrollProgress />
            <CommandPalette />
            <SiteHeader />
            <main>{children}</main>
            <SiteFooter />
          </StyledComponentsRegistry>
        </LangProvider>
      </body>
    </html>
  );
}
