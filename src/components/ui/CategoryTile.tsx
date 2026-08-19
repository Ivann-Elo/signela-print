import Link from "next/link";
import Image from "next/image";

/**
 * Signela CategoryTile — the dark "Nos gammes" range tiles: a photo dimmed
 * under a navy wash, with a title, sub-line and a lime "Voir tout" chip.
 */
export default function CategoryTile({
  image,
  title,
  subtitle,
  cta = "Voir tout",
  href = "#",
}: {
  image?: string;
  title: string;
  subtitle?: string;
  cta?: string;
  href?: string;
}) {
  return (
    <Link
      href={href}
      className="relative block h-[140px] overflow-hidden"
      style={{ borderRadius: "var(--radius-lg)", background: "var(--sig-navy)" }}
    >
      {image && (
        <Image
          src={image}
          alt=""
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          style={{ objectFit: "cover", opacity: 0.45 }}
        />
      )}
      <div className="relative flex h-full flex-col p-4 box-border">
        <div style={{ fontWeight: 800, fontSize: "var(--fs-lg)", color: "var(--sig-white)", lineHeight: 1.2 }}>
          {title}
        </div>
        {subtitle && (
          <div style={{ fontWeight: 400, fontSize: 11.5, color: "rgba(255,255,255,0.7)", marginTop: 2 }}>
            {subtitle}
          </div>
        )}
        <span
          className="mt-auto self-start"
          style={{
            display: "inline-block",
            background: "var(--sig-lime)",
            color: "var(--sig-ink)",
            fontWeight: 700,
            fontSize: 10.9,
            borderRadius: "var(--radius-sm)",
            padding: "2px 10px",
          }}
        >
          {cta} →
        </span>
      </div>
    </Link>
  );
}
