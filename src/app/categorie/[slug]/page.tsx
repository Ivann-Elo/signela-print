import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductCard from "@/components/ui/ProductCard";
import Button from "@/components/ui/Button";
import { CATEGORY_ORDER, buildCategoryGroups, getCategory } from "@/lib/data";

export function generateStaticParams() {
  return CATEGORY_ORDER.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/categorie/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const cat = getCategory(slug);
  if (!cat) return {};
  return { title: cat.label, description: cat.intro };
}

export default async function CategoryPage({ params }: PageProps<"/categorie/[slug]">) {
  const { slug } = await params;
  const cat = getCategory(slug);
  if (!cat) notFound();

  const groups = buildCategoryGroups(cat.key);

  return (
    <>
      <section className="relative overflow-hidden" style={{ background: "var(--sig-navy)" }}>
        <Image src={cat.image} alt="" fill sizes="100vw" style={{ objectFit: "cover", opacity: 0.28 }} />
        <div className="sig-container relative py-14 md:py-16">
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", marginBottom: 14 }}>
            <Link href="/" style={{ color: "rgba(255,255,255,0.6)" }}>Accueil</Link>
            &nbsp;/&nbsp; <span style={{ color: "#fff" }}>{cat.label}</span>
          </div>
          <h1 className="text-[32px] md:text-[44px]" style={{ margin: "0 0 12px", fontWeight: 900, lineHeight: 1.05, letterSpacing: "-1px", color: "#fff" }}>
            {cat.label}
          </h1>
          <p style={{ margin: 0, maxWidth: 560, fontSize: 16, lineHeight: 1.6, color: "rgba(255,255,255,0.75)" }}>{cat.intro}</p>
        </div>
      </section>

      <section style={{ background: "#fff" }}>
        <div className="sig-container flex flex-col gap-12 py-14 md:py-16">
          {groups.map((group, gi) => (
            <div key={gi}>
              {group.title && (
                <h2 className="flex items-center" style={{ margin: "0 0 24px", fontWeight: 900, fontSize: 24, letterSpacing: "-0.3px", color: "var(--text-strong)" }}>
                  <span style={{ width: 12, height: 12, background: "var(--sig-lime)", display: "inline-block", borderRadius: 2, marginRight: 10 }} />
                  {group.title}
                </h2>
              )}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {group.products.map((card) => (
                  <ProductCard key={card.href} {...card} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ background: "var(--sig-ink)" }}>
        <div className="sig-container flex flex-wrap items-center justify-between gap-6 py-12">
          <div>
            <div style={{ fontWeight: 900, fontSize: 26, color: "#fff", letterSpacing: "-0.4px" }}>Un projet sur mesure ?</div>
            <div style={{ fontSize: 15, color: "rgba(255,255,255,0.6)", marginTop: 6 }}>
              Format spécial, gros volume, délai serré — parlons-en.
            </div>
          </div>
          <Button href="/contact" variant="primary" arrow>
            Demander un devis
          </Button>
        </div>
      </section>
    </>
  );
}
