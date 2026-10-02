// ============================================================
// FICHIER : src/app/layout.tsx
// RÔLE    : Enveloppe commune à TOUTES les pages du site.
//           Tout ce qui est ici apparaît sur chaque page.
// ============================================================
// CE QUE VOUS POUVEZ MODIFIER ICI :
//   - Titre par défaut du site (balise <title>) → metadata.title.default
//   - Description SEO globale                  → metadata.description
//   - Police (Outfit)                           → const outfit = Outfit(...)
//   - En-tête commun                           → <Header /> (fichier : src/components/Header.tsx)
//   - Pied de page commun                      → <Footer /> (fichier : src/components/Footer.tsx)
// ============================================================

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

// Titre et description affichés dans les résultats Google
export const metadata: Metadata = {
  title: {
    default: "SIGNELA — Imprimerie locale & en ligne", // ← titre de la page d'accueil
    template: "%s · SIGNELA",                          // ← format pour les autres pages
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
