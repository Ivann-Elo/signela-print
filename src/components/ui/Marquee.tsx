/**
 * Signela Marquee — the lime promo strip that scrolls a repeating message
 * separated by ink squares. Uppercase, tracked, bold.
 */
export default function Marquee({
  text = "-10% SUR LES PREMIÈRES COMMANDES AVEC « BIENVENUE10 » 🚀",
  repeat = 8,
  speed = 30,
}: {
  text?: string;
  repeat?: number;
  speed?: number;
}) {
  const items = Array.from({ length: repeat });
  return (
    <div style={{ background: "var(--sig-lime)", overflow: "hidden", padding: "8px 0" }}>
      <div
        style={{
          display: "inline-flex",
          whiteSpace: "nowrap",
          animation: `sig-marquee ${speed}s linear infinite`,
        }}
      >
        {items.map((_, i) => (
          <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 14, paddingRight: 14 }}>
            <span
              style={{
                fontWeight: 700,
                fontSize: 12.5,
                letterSpacing: "0.62px",
                color: "var(--sig-ink)",
              }}
            >
              {text}
            </span>
            <span aria-hidden="true" style={{ width: 6, height: 6, background: "var(--sig-ink)", display: "inline-block" }} />
          </span>
        ))}
      </div>
    </div>
  );
}
