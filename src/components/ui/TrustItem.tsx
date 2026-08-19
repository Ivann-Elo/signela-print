import type { ReactNode } from "react";

/**
 * Signela TrustItem — a reassurance unit from the trust bar under the hero:
 * an icon, a bold uppercase headline and a muted sub-line.
 */
export default function TrustItem({
  icon,
  label,
  sub,
}: {
  icon: ReactNode;
  label: string;
  sub?: string;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <div
        className="flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-[3px]"
        style={{ background: "var(--sig-ink)", color: "var(--sig-lime)", fontSize: 11 }}
      >
        {icon}
      </div>
      <div className="flex flex-col">
        <span
          style={{
            fontWeight: 800,
            fontSize: 11.5,
            letterSpacing: "0.69px",
            textTransform: "uppercase",
            color: "var(--text-strong)",
          }}
        >
          {label}
        </span>
        {sub && <span style={{ fontWeight: 400, fontSize: 10.9, color: "var(--text-muted)" }}>{sub}</span>}
      </div>
    </div>
  );
}
