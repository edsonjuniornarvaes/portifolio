import type { Metadata } from "next";
import { Outfit, JetBrains_Mono, Anton, Caveat } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar";
import Footer from "@/components/footer";
import StyledComponentsRegistry from "./registry";
import AnalyticsTracker from "@/components/analytics-tracker";
import SideRail from "@/components/ui/side-rail";

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

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Edson Junior | Desenvolvedor Mobile Sênior · React Native",
    template: "%s | Edson Junior",
  },
  description:
    "Desenvolvedor Mobile Sênior com React Native e TypeScript. Apps financeiros, superapps e e-commerce em produção — de PJBank a produtos próprios.",
  keywords: ["React Native", "Desenvolvedor Mobile", "iOS", "Android", "TypeScript", "Redux", "Next.js", "Expo"],
  authors: [{ name: "Edson Junior" }],
  openGraph: {
    title: "Edson Junior | Desenvolvedor Mobile Sênior",
    description: "React Native, TypeScript e produtos digitais de ponta a ponta.",
    type: "website",
    locale: "pt_BR",
    url: siteUrl,
    images: [{ url: "/images/edson.webp", width: 800, height: 800, alt: "Edson Junior" }],
  },
  twitter: { card: "summary", title: "Edson Junior | Desenvolvedor Mobile Sênior", images: ["/images/edson.webp"] },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Edson Junior Narvaes",
  jobTitle: "Desenvolvedor Mobile Sênior",
  url: siteUrl,
  image: `${siteUrl}/images/edson.webp`,
  sameAs: [
    "https://www.linkedin.com/in/edsonjuniornarvaes/",
    "https://github.com/edsonjuniornarvaes",
    "https://dev.to/edsonjuniornarvaes",
    "https://www.instagram.com/edsonjunior.dev",
  ],
  knowsAbout: ["React Native", "TypeScript", "iOS", "Android", "Next.js"],
};

const themeScript = `try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark')document.documentElement.setAttribute('data-theme',t)}catch(e){}`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      className={`${outfit.variable} ${jetbrains.variable} ${anton.variable} ${caveat.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <StyledComponentsRegistry>
          <AnalyticsTracker />
          <SideRail />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
