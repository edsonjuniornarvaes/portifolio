import type { Metadata } from "next";
import { Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar";
import Footer from "@/components/footer";
import StyledComponentsRegistry from "./registry";
import AnalyticsTracker from "@/components/analytics-tracker";
import { ShootingStars } from "@/components/orbit-bg";

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

export const metadata: Metadata = {
  title: "Edson Junior | Desenvolvedor Mobile",
  description: "Desenvolvedor Mobile Sênior especializado em React Native, iOS e Android. Criando aplicativos de alta performance com experiência de usuário excepcional.",
  keywords: ["React Native", "Mobile Developer", "iOS", "Android", "TypeScript", "Redux"],
  authors: [{ name: "Edson Junior" }],
  openGraph: {
    title: "Edson Junior | Desenvolvedor Mobile",
    description: "Desenvolvedor Mobile Sênior especializado em React Native, iOS e Android.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${outfit.variable} ${jetbrainsMono.variable}`}>
      <body>
        <StyledComponentsRegistry>
          <ShootingStars />
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
