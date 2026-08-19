import HeroCarousel from "@/components/HeroCarousel";
import TrustItem from "@/components/ui/TrustItem";
import Rating from "@/components/ui/Rating";
import ProductCard from "@/components/ui/ProductCard";
import CategoryTile from "@/components/ui/CategoryTile";
import FeatureCard from "@/components/ui/FeatureCard";
import Button from "@/components/ui/Button";
import { CATEGORY_ORDER, CATS, PRODUCTS, TOP_PRODUCT_SLUGS, cardOf } from "@/lib/data";

export default function HomePage() {
  const topProducts = TOP_PRODUCT_SLUGS.map((slug) => cardOf(PRODUCTS.find((p) => p.slug === slug)!));

  return (
    <>
      <HeroCarousel />

      <div style={{ borderBottom: "1px solid var(--color-border)", background: "#fff" }}>
        <div className="sig-container flex flex-wrap items-center gap-6 py-4.5 sm:gap-7">
          <TrustItem icon="✓" label="Imprimé en France" sub="Atelier local à Paris" />
          <TrustItem icon="✓" label="Livraison gratuite" sub="Dès 150€ HT en France" />
          <TrustItem icon="✓" label="Satisfait ou réimprimé" sub="Garantie qualité" />
          <TrustItem icon="✓" label="Devis en 24h" sub="Réponse rapide" />
          <span className="hidden flex-1 sm:block" />
          <Rating score={4} />
        </div>
      </div>

      <section style={{ background: "#fff" }}>
        <div className="sig-container py-10 md:py-14">
          <h2 className="flex items-center" style={{ margin: "0 0 28px", fontWeight: 900, fontSize: 28, letterSpacing: "-0.4px", color: "var(--text-strong)" }}>
            <span style={{ width: 14, height: 14, background: "var(--sig-ink)", display: "inline-block", borderRadius: 2, marginRight: 10 }} />
            Top produits
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {topProducts.map((card) => (
              <ProductCard key={card.href} {...card} />
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: "var(--sig-zinc-100)" }}>
        <div className="sig-container py-10 md:py-14">
          <h2 className="flex items-center" style={{ margin: "0 0 28px", fontWeight: 900, fontSize: 28, letterSpacing: "-0.4px", color: "var(--text-strong)" }}>
            <span style={{ width: 14, height: 14, background: "var(--sig-ink)", display: "inline-block", borderRadius: 2, marginRight: 10 }} />
            Nos gammes
          </h2>
          <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
            {CATEGORY_ORDER.map((key) => (
              <CategoryTile
                key={key}
                image={CATS[key].image}
                title={CATS[key].label}
                subtitle={CATS[key].subtitle}
                href={`/categorie/${key}`}
              />
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: "#fff" }}>
        <div className="sig-container grid grid-cols-1 items-center gap-10 py-14 md:grid-cols-2 md:gap-14 md:py-16">
          <div>
            <div style={{ fontWeight: 700, fontSize: 12, letterSpacing: "0.9px", textTransform: "uppercase", color: "var(--sig-lime-dark)", marginBottom: 14 }}>
              Pourquoi choisir SIGNELA ?
            </div>
            <h2 className="text-[30px] md:text-[40px]" style={{ margin: 0, fontWeight: 900, lineHeight: 1.1, letterSpacing: "-0.8px", color: "var(--text-strong)" }}>
              Le savoir-faire local
              <br />à la portée de tous
            </h2>
            <p style={{ margin: "20px 0 28px", fontSize: 15, lineHeight: 1.6, color: "var(--text-muted)", maxWidth: 440 }}>
              Depuis 1998, nous imprimons vos supports de communication avec la rigueur d&apos;un atelier artisanal et les équipements d&apos;une imprimerie moderne. Devis gratuit, réponse en 24h.
            </p>
            <Button href="/contact" variant="primary" arrow>
              Demander un devis gratuit
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FeatureCard icon="■" title="Qualité garantie" description="Chaque commande est vérifiée avant expédition. Satisfait ou réimprimé." />
            <FeatureCard icon="■" title="Délais respectés" description="Production locale = réactivité. Urgences traitées en priorité." />
            <FeatureCard icon="■" title="Accompagnement" description="De la mise en page à la livraison, notre équipe vous guide." />
            <FeatureCard icon="■" title="Prix compétitifs" description="Tarifs imprimerie industrielle, qualité atelier local." />
          </div>
        </div>
      </section>
    </>
  );
}
