import Image from "next/image";
import Badge from "./Badge";
import FeatureList from "./FeatureList";
import Button from "./Button";
import type { ProductCardData } from "@/lib/data";

/**
 * Signela ProductCard — the merchandising tile in the "Top produits" grid.
 * Flat white card, hairline border, image well with an optional badge,
 * category eyebrow, title, price line and a spec list.
 */
export default function ProductCard({
  image,
  badge,
  badgeTone = "lime",
  category,
  title,
  price,
  priceUnit,
  features = [],
  cta = "Découvrir",
  href = "#",
}: ProductCardData & { cta?: string }) {
  return (
    <div
      className="flex h-full flex-col overflow-hidden"
      style={{ background: "var(--sig-white)", border: "1px solid var(--color-border)", borderRadius: "var(--radius-xl)" }}
    >
      <div className="relative h-[260px] overflow-hidden" style={{ background: "var(--sig-zinc-100)" }}>
        {image && (
          <Image src={image} alt={title} fill sizes="(max-width: 768px) 100vw, 33vw" style={{ objectFit: "cover" }} />
        )}
        {badge && (
          <span className="absolute left-3 top-3">
            <Badge tone={badgeTone}>{badge}</Badge>
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        {category && (
          <div
            style={{
              fontWeight: 600,
              fontSize: "var(--fs-xs)",
              letterSpacing: "0.6px",
              textTransform: "uppercase",
              color: "var(--text-muted)",
            }}
          >
            {category}
          </div>
        )}
        <div style={{ fontWeight: 800, fontSize: "var(--fs-lg)", color: "var(--text-strong)", lineHeight: 1.25 }}>
          {title}
        </div>
        {price && (
          <div style={{ fontSize: "var(--fs-base)", color: "var(--text-body)" }}>
            À partir de{" "}
            <strong style={{ fontWeight: 800, color: "var(--text-strong)" }}>{price}</strong>
            {priceUnit && <span style={{ color: "var(--text-muted)" }}> {priceUnit}</span>}
          </div>
        )}
        {features.length > 0 && <FeatureList items={features} marker="check" className="my-1 flex-1" />}
        <div className="pt-2">
          <Button href={href} variant="outline" size="sm" arrow>
            {cta}
          </Button>
        </div>
      </div>
    </div>
  );
}
