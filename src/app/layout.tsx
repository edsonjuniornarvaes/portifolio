import type { Metadata } from "next";
import { Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar";
import Footer from "@/components/footer";
import StyledComponentsRegistry from "./registry";
import AnalyticsTracker from "@/components/analytics-tracker";
import { ShootingStars } from "@/components/orbit-bg";
import Spotlight from "@/components/ui/spotlight";
import ScrollProgress from "@/components/ui/scroll-progress";

const outfit = Outfit({ 
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://portifolio-wheat-omega-16.vercel.app";

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
  ],
  knowsAbout: ["React Native", "TypeScript", "iOS", "Android", "Next.js"],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${outfit.variable} ${jetbrainsMono.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <StyledComponentsRegistry>
          <ShootingStars />
          <Spotlight />
          <ScrollProgress />
          <AnalyticsTracker />
          <Navbar />
          <main style={{ position: 'relative', zIndex: 1 }}>
            {children}
          </main>
          <Footer />
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
