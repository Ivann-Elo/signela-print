import type { ReactNode } from "react";

/**
 * Signela PricePill — the red promotional price flag ("DÈS 6,50€ H.T").
 * Reserved for entry-price / promo emphasis; the only warm accent in the palette.
 */
export default function PricePill({ children }: { children: ReactNode }) {
  return (
    <span
      style={{
        display: "inline-block",
        fontWeight: 800,
        fontSize: 16,
        lineHeight: 1.5,
        letterSpacing: "0.48px",
        color: "var(--sig-white)",
        background: "var(--action-danger)",
        padding: "6px 16px",
        borderRadius: "var(--radius-sm)",
      }}
    >
      {children}
    </span>
  );
}
