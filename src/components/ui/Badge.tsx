import type { ReactNode } from "react";

/**
 * Signela Badge — small uppercase caps tag used on product imagery
 * (BESTSELLER, EXPO, NOUVEAUTÉ, PRÉMIUM, LES ESSENTIELS).
 */
export default function Badge({
  children,
  tone = "lime",
}: {
  children: ReactNode;
  tone?: "lime" | "ink";
}) {
  const tones = {
    lime: { background: "var(--sig-lime)", color: "var(--sig-ink)" },
    ink: { background: "var(--sig-ink)", color: "var(--sig-white)" },
  } as const;
  return (
    <span
      style={{
        display: "inline-block",
        fontWeight: 800,
        fontSize: "var(--fs-micro)",
        lineHeight: 1.5,
        letterSpacing: "var(--ls-badge)",
        textTransform: "uppercase",
        padding: "3px 9px",
        borderRadius: "var(--radius-sm)",
        ...tones[tone],
      }}
    >
      {children}
    </span>
  );
}
