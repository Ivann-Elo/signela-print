import type { ReactNode } from "react";

/**
 * Signela FeatureCard — the muted "Pourquoi choisir" cards: an icon tile,
 * a bold title and a short supporting paragraph on a zinc surface.
 */
export default function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div
      className="flex flex-col gap-2.5 p-5"
      style={{ background: "var(--sig-zinc-100)", borderRadius: "var(--radius-lg)" }}
    >
      <div
        className="flex h-[22px] w-[22px] items-center justify-center rounded"
        style={{ background: "var(--sig-ink)", color: "var(--sig-lime)", fontSize: 12 }}
      >
        {icon}
      </div>
      <div style={{ fontWeight: 700, fontSize: "var(--fs-base)", color: "var(--text-strong)" }}>{title}</div>
      <div style={{ fontWeight: 400, fontSize: 13, lineHeight: 1.5, color: "var(--text-muted)" }}>
        {description}
      </div>
    </div>
  );
}
