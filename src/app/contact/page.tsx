// ============================================================
// FICHIER : src/app/contact/page.tsx
// URL     : http://localhost:3000/contact
// ============================================================
// SECTIONS DE LA PAGE :
//   1. Colonne gauche : coordonnées et accroche
//      → adresse, téléphone, email, horaires modifiables directement ici
//   2. Colonne droite : formulaire de contact
//      → champs et logique du formulaire → src/components/ContactForm.tsx
// ============================================================
// ASTUCE : L'URL /contact?produit=panneaux pré-sélectionne
//          la catégorie dans le formulaire (paramètre "produit").
// ============================================================

import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact & devis",
  description: "Un projet ? Parlons-en. Devis gratuit et sans engagement, réponse sous 24h ouvrées.",
};

export default async function ContactPage({ searchParams }: PageProps<"/contact">) {
  const { produit } = await searchParams;
  const defaultProduct = typeof produit === "string" ? produit : undefined;

  return (
    <section style={{ background: "var(--sig-ink)" }}>
      <div className="sig-container grid grid-cols-1 gap-12 py-16 md:grid-cols-2 md:gap-16 md:py-20">
        <div>
          <div style={{ fontWeight: 700, fontSize: 12, letterSpacing: "0.9px", textTransform: "uppercase", color: "var(--sig-lime)", marginBottom: 16 }}>
            Contact &amp; devis
          </div>
          <h1 className="text-[34px] md:text-[44px]" style={{ margin: "0 0 16px", fontWeight: 900, lineHeight: 1.05, letterSpacing: "-1px", color: "#fff" }}>
            Un projet ?
            <br />Parlons-en.
          </h1>
          <p style={{ margin: "0 0 32px", fontSize: 15, lineHeight: 1.6, color: "rgba(255,255,255,0.6)", maxWidth: 420 }}>
            Réponse sous 24h ouvrées. Devis gratuit et sans engagement. Décrivez votre projet, notre équipe vous rappelle.
          </p>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2.5" style={{ fontSize: 14, color: "rgba(255,255,255,0.75)" }}>
              <span style={{ fontSize: 16 }}>📍</span>31P Av des carrières, 14760 Bretteville-sur-odon  
            </div>
            <div className="flex items-center gap-2.5" style={{ fontSize: 14, color: "rgba(255,255,255,0.75)" }}>
              <span style={{ fontSize: 16 }}>📞</span>02 85 85 55 22
            </div>
            <div className="flex items-center gap-2.5" style={{ fontSize: 14, color: "rgba(255,255,255,0.75)" }}>
              <span style={{ fontSize: 16 }}>✉️</span>contact@signela.fr
            </div>
            <div className="flex items-center gap-2.5" style={{ fontSize: 14, color: "rgba(255,255,255,0.75)" }}>
              <span style={{ fontSize: 16 }}>🕒</span>Lun – Ven · 8h30 – 18h00
            </div>
          </div>
        </div>

        <div style={{ background: "#fff", borderRadius: 12, padding: 32 }}>
          <ContactForm defaultProduct={defaultProduct} />
        </div>
      </div>
    </section>
  );
}
