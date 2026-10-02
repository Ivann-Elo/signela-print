// ============================================================
// FICHIER : src/app/produit/[slug]/page.tsx
// URL     : http://localhost:3000/produit/carte-de-visite
//           http://localhost:3000/produit/panneau-akilux
//           http://localhost:3000/produit/rollup  (etc.)
// ============================================================
// Ce fichier génère UNE page pour CHAQUE produit.
// Le [slug] dans l'URL détermine quel produit est affiché.
//
// POUR MODIFIER UN PRODUIT (nom, prix, description, avantages, image) :
//   → src/lib/data.ts  (export PRODUCTS — cherchez le slug du produit)
//
// DEUX MODES DE PAGE :
//   1. Fiche classique (tous les produits sauf configurables)
//      → affiche : image, titre, prix, description, avantages, CTAs
//   2. Parcours commande interactif (produits dans SLUGS_CONFIGURABLES)
//      → src/components/CarteVisiteFlow.tsx
//      → 5 étapes : produit → config → récap article → panier → confirmation
//
// POUR AJOUTER UN PRODUIT CONFIGURABLE :
//   → ajoutez son slug dans SLUGS_CONFIGURABLES ci-dessous
// ============================================================

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Button from "@/components/ui/Button";
import PricePill from "@/components/ui/PricePill";
import FeatureList from "@/components/ui/FeatureList";
import TrustItem from "@/components/ui/TrustItem";
import ProductCard from "@/components/ui/ProductCard";
import CarteVisiteFlow from "@/components/CarteVisiteFlow";
import RollupFlow from "@/components/RollupFlow";
import { CATS, PRODUCTS, cardOf, getProduct, getRelatedProducts } from "@/lib/data";

// ← Ajoutez ici le slug de chaque produit avec parcours commande interactif
const SLUGS_CONFIGURABLES = ["carte-de-visite", "rollup"];

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/produit/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return {};
  return { title: p.title, description: p.tagline };
}

export default async function ProductPage({ params }: PageProps<"/produit/[slug]">) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) notFound();

  const cat = CATS[p.cat];
  const related = getRelatedProducts(p, 3);

  return (
    <>
      {/* Fil d'Ariane */}
      <div style={{ background: "#fff", borderBottom: "1px solid var(--color-border)" }}>
        <div className="sig-container py-4" style={{ fontSize: 12.5, color: "var(--text-muted)" }}>
          <Link href="/" style={{ color: "var(--text-muted)" }}>Accueil</Link>
          &nbsp;/&nbsp;
          <Link href={`/categorie/${p.cat}`} style={{ color: "var(--text-muted)" }}>{cat.label}</Link>
          &nbsp;/&nbsp;
          <span style={{ color: "var(--text-strong)", fontWeight: 600 }}>{p.title}</span>
        </div>
      </div>

      {SLUGS_CONFIGURABLES.includes(p.slug) ? (
        /* ── Parcours commande interactif (5 étapes) ── */
        p.slug === "rollup"
          ? <RollupFlow product={p} related={related} />
          : <CarteVisiteFlow product={p} related={related} />
      ) : (
        /* ── Fiche produit classique ── */
        <>
          <section style={{ background: "#fff" }}>
            <div className="sig-container grid grid-cols-1 items-start gap-10 py-10 md:grid-cols-2 md:gap-14 md:py-12">
              <div
                className="relative h-[300px] overflow-hidden md:h-[460px]"
                style={{ border: "1px solid var(--color-border)", borderRadius: 12, background: "var(--sig-zinc-100)" }}
              >
                <Image src={`/images/${p.img}`} alt={p.title} fill sizes="(max-width: 768px) 100vw, 50vw" style={{ objectFit: "cover" }} priority />
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: 12, letterSpacing: "0.6px", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 10 }}>
                  {cat.label}
                </div>
                <h1 className="text-[32px] md:text-[40px]" style={{ margin: "0 0 10px", fontWeight: 900, lineHeight: 1.05, letterSpacing: "-0.8px", color: "var(--text-strong)" }}>
                  {p.title}
                </h1>
                <p style={{ margin: "0 0 20px", fontSize: 17, lineHeight: 1.5, color: "var(--text-body)" }}>{p.tagline}</p>
                <PricePill>À PARTIR DE {p.price} H.T {p.unit}</PricePill>
                <p style={{ margin: "22px 0 24px", fontSize: 15, lineHeight: 1.7, color: "var(--text-muted)" }}>{p.desc}</p>
                <div style={{ fontWeight: 800, fontSize: 13, letterSpacing: "0.4px", textTransform: "uppercase", color: "var(--text-strong)", marginBottom: 12 }}>
                  Avantages
                </div>
                <FeatureList items={p.adv} marker="check" />
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button href={`/contact?produit=${p.cat}`} variant="primary" size="lg" arrow>
                    Demander un devis
                  </Button>
                  <Button href="/contact" variant="outline" size="lg">
                    Nous contacter
                  </Button>
                </div>
                <div className="mt-7 flex flex-wrap gap-6 pt-6" style={{ borderTop: "1px solid var(--color-border)" }}>
                  <TrustItem icon="✓" label="Imprimé en France" sub="Atelier local" />
                  <TrustItem icon="✓" label="BAT gratuit" sub="Bon à tirer validé" />
                  <TrustItem icon="✓" label="Devis 24h" sub="Réponse rapide" />
                </div>
              </div>
            </div>
          </section>

          {related.length > 0 && (
            <section style={{ background: "var(--sig-zinc-100)" }}>
              <div className="sig-container py-10 md:py-14">
                <h2 className="flex items-center" style={{ margin: "0 0 28px", fontWeight: 900, fontSize: 24, letterSpacing: "-0.3px", color: "var(--text-strong)" }}>
                  <span style={{ width: 12, height: 12, background: "var(--sig-ink)", display: "inline-block", borderRadius: 2, marginRight: 10 }} />
                  Dans la même gamme
                </h2>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {related.map((rp) => (
                    <ProductCard key={rp.slug} {...cardOf(rp)} />
                  ))}
                </div>
              </div>
            </section>
          )}
        </>
      )}
    </>
  );
}
