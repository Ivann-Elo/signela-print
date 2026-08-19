import type { ReactNode } from "react";

/**
 * Signela AnnouncementBar — the slim dark utility strip at the very top of
 * the site. Center-aligned, one promotional line.
 */
export default function AnnouncementBar({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        background: "var(--sig-ink)",
        color: "var(--sig-white)",
        fontSize: 12.5,
        fontWeight: 400,
        textAlign: "center",
        padding: "8px 16px",
      }}
    >
      {children}
    </div>
  );
}
