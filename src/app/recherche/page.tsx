import type { Metadata } from "next";
import Link from "next/link";
import ProductCard from "@/components/ui/ProductCard";
import { cardOf, searchProducts } from "@/lib/data";

export const metadata: Metadata = { title: "Recherche" };

export default async function SearchPage({ searchParams }: PageProps<"/recherche">) {
  const { q } = await searchParams;
  const term = typeof q === "string" ? q : "";
  const results = term ? searchProducts(term) : [];

  const summary = term
    ? `${results.length} résultat${results.length > 1 ? "s" : ""} pour « ${term} »`
    : "Saisissez un terme dans la barre de recherche puis appuyez sur Entrée.";

  return (
    <section style={{ background: "#fff" }}>
      <div className="sig-container py-12 md:py-14">
        <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 10 }}>
          <Link href="/" style={{ color: "var(--text-muted)" }}>Accueil</Link>
          &nbsp;/&nbsp; <span style={{ color: "var(--text-strong)" }}>Recherche</span>
        </div>
        <h1 className="text-[26px] md:text-[32px]" style={{ margin: "0 0 6px", fontWeight: 900, letterSpacing: "-0.6px", color: "var(--text-strong)" }}>
          Résultats de recherche
        </h1>
        <p style={{ margin: "0 0 28px", fontSize: 15, color: "var(--text-muted)" }}>{summary}</p>

        {results.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((p) => (
              <ProductCard key={p.slug} {...cardOf(p)} />
            ))}
          </div>
        )}

        {term && results.length === 0 && (
          <div className="py-14 text-center" style={{ border: "1px dashed var(--color-border)", borderRadius: 12 }}>
            <div style={{ fontSize: 18, fontWeight: 800, color: "var(--text-strong)", marginBottom: 8 }}>Aucun produit trouvé</div>
            <div style={{ fontSize: 14, color: "var(--text-muted)" }}>
              Essayez « carte », « bâche », « roll-up », « dibond » ou parcourez nos gammes.
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
