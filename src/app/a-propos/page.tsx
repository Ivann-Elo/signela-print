// ============================================================
// FICHIER : src/app/a-propos/page.tsx
// URL     : http://localhost:3000/a-propos
// ============================================================
// SECTIONS DE LA PAGE (dans l'ordre d'affichage) :
//   1. Hero (bandeau sombre avec image de fond)
//      → titre, sous-titre et texte d'intro modifiables directement ici
//      → image de fond : /public/images/hero-atelier.jpg
//   2. "Un atelier, deux mondes"
//      → deux paragraphes de texte modifiables directement ici
//      → image : /public/images/cat-panneaux.jpg
//   3. "Nos engagements" (4 cartes)
//      → src/components/ui/FeatureCard.tsx
//      → textes des 4 cartes modifiables directement ici
//   4. Chiffres clés (4 stats)
//      → tableau STATS ci-dessous — modifiez value et label
//   5. Bloc CTA "Travaillons ensemble"
//      → texte et lien du bouton modifiables directement ici
// ============================================================
// TITRE & DESCRIPTION SEO :
//   → metadata.title       : onglet et Google
//   → metadata.description : résumé Google
// ============================================================

import type { Metadata } from "next";
import Image from "next/image";
import Button from "@/components/ui/Button";
import FeatureCard from "@/components/ui/FeatureCard";

export const metadata: Metadata = {
  title: "À propos",
  description: "L'imprimerie hybride, locale & en ligne. SIGNELA imprime vos supports depuis 1998, dans son atelier Normand.",
};

// ← Modifiez les 4 chiffres affichés dans la section statistiques
const STATS = [
  { value: "2022", label: "Année de création" },
  { value: "+25 000", label: "Commandes livrées" },
  { value: "24h", label: "Délai de devis" },
  { value: "100%", label: "Imprimé en France" },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden" style={{ background: "var(--sig-navy)" }}>
        <Image src="/images/hero-atelier.jpg" alt="" fill sizes="100vw" style={{ objectFit: "cover", opacity: 0.3 }} />
        <div className="sig-container relative py-16 md:py-20">
          <div style={{ fontWeight: 700, fontSize: 12, letterSpacing: "0.9px", textTransform: "uppercase", color: "var(--sig-lime)", marginBottom: 16 }}>
            Notre atelier
          </div>
          <h1 className="max-w-[720px] text-[32px] md:text-[48px]" style={{ margin: "0 0 16px", fontWeight: 900, lineHeight: 1.05, letterSpacing: "-1px", color: "#fff" }}>
            L&apos;imprimerie hybride, locale &amp; en ligne
          </h1>
          <p style={{ margin: 0, maxWidth: 600, fontSize: 17, lineHeight: 1.6, color: "rgba(255,255,255,0.75)" }}>
            Depuis 2022, SIGNELA imprime les supports de communication des entreprises, associations et collectivités de Normandie et partout en France grâce à nos expédition rapide.
          </p>
        </div>
      </section>

      <section style={{ background: "#fff" }}>
        <div className="sig-container grid grid-cols-1 items-center gap-10 py-14 md:grid-cols-2 md:gap-14 md:py-16">
          <div>
            <h2 className="text-[26px] md:text-[32px]" style={{ margin: "0 0 18px", fontWeight: 900, letterSpacing: "-0.6px", color: "var(--text-strong)" }}>
              Un atelier, deux mondes
            </h2>
            <p style={{ margin: "0 0 16px", fontSize: 15, lineHeight: 1.7, color: "var(--text-muted)" }}>
              Nous avons choisi de ne pas choisir. La proximité d&apos;une imprimerie de quartier, où l&apos;on pousse la porte pour valider une matière ou récupérer une commande urgente. Et la puissance d&apos;une plateforme en ligne, disponible 24h/24, qui livre dans toute la France.
            </p>
            <p style={{ margin: 0, fontSize: 15, lineHeight: 1.7, color: "var(--text-muted)" }}>
              Nos presses numériques et grand format, notre découpe et nos finitions sont réunies dans un même atelier parisien. Ce qui sort de nos machines, nous l&apos;avons contrôlé de nos yeux.
            </p>
          </div>
          <div className="relative h-[260px] overflow-hidden md:h-[360px]" style={{ borderRadius: 12, border: "1px solid var(--color-border)" }}>
            <Image src="/images/cat-panneaux.jpg" alt="Atelier SIGNELA" fill sizes="(max-width: 768px) 100vw, 50vw" style={{ objectFit: "cover" }} />
          </div>
        </div>
      </section>

      <section style={{ background: "var(--sig-zinc-100)" }}>
        <div className="sig-container py-10 md:py-14">
          <h2 style={{ margin: "0 0 28px", fontWeight: 900, fontSize: 28, letterSpacing: "-0.4px", color: "var(--text-strong)" }}>
            Nos engagements
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <FeatureCard icon="■" title="Production locale" description="Imprimé et façonné dans notre atelier Normand, jamais sous-traité à l'étranger." />
            <FeatureCard icon="■" title="Éco-responsable" description="Papiers PEFC/FSC, encres à faible impact et tri systématique des chutes." />
            <FeatureCard icon="■" title="Conseil expert" description="Un interlocuteur dédié, du choix de la matière à la livraison." />
            <FeatureCard icon="■" title="Réactivité" description="Devis en 24h, express possible sur la plupart de nos produits." />
          </div>
        </div>
      </section>

      <section style={{ background: "#fff" }}>
        <div className="sig-container grid grid-cols-2 gap-6 py-14 text-center lg:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label}>
              <div style={{ fontWeight: 900, fontSize: 36, color: "var(--sig-ink)", letterSpacing: "-1px" }}>{s.value}</div>
              <div style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ background: "var(--sig-ink)" }}>
        <div className="sig-container flex flex-wrap items-center justify-between gap-6 py-12">
          <div style={{ fontWeight: 900, fontSize: 26, color: "#fff", letterSpacing: "-0.4px" }}>Travaillons ensemble.</div>
          <Button href="/contact" variant="primary" arrow>
            Demander un devis
          </Button>
        </div>
      </section>
    </>
  );
}
