import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar";
import Faded from "./components/faded";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Portifolio: Edson Junior",
  description: "Portifolio: Edson Junior",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt">
      <body className={inter.className}>
        <Faded>
          <Navbar />
          {children}
        </Faded>
      </body>
    </html>
  );
}
