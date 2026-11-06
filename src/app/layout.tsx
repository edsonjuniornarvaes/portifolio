import type { Metadata } from "next";
import { Outfit, JetBrains_Mono, Anton, Caveat } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar";
import Footer from "@/components/footer";
import StyledComponentsRegistry from "./registry";
import AnalyticsTracker from "@/components/analytics-tracker";
import SideRail from "@/components/ui/side-rail";
import { LangProvider } from "@/i18n/provider";
import { getLang } from "@/i18n/server";
import { ui } from "@/i18n/dict";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://portifolio-wheat-omega-16.vercel.app";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-condensed",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-script-next",
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
    keywords: ["React Native", "Mobile Developer", "Desenvolvedor Mobile", "iOS", "Android", "TypeScript", "Redux", "Next.js", "Expo"],
    authors: [{ name: "Edson Junior" }],
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
      className={`${outfit.variable} ${jetbrains.variable} ${anton.variable} ${caveat.variable}`}
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
            <SideRail />
            <Navbar />
            <main>{children}</main>
            <Footer />
          </StyledComponentsRegistry>
        </LangProvider>
      </body>
    </html>
  );
}
