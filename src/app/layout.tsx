import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: {
    default: "SIGNELA — Imprimerie locale & en ligne",
    template: "%s · SIGNELA",
  },
  description:
    "Imprimerie, panneaux, banderoles, stands et PLV. Imprimé en France, devis gratuit en 24h, livraison offerte dès 150€ HT.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${outfit.variable}`}>
      <body className="min-h-screen flex flex-col font-sans text-[var(--text-strong)] antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
