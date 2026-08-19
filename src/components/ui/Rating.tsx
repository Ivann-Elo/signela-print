/**
 * Signela Rating — the Trustpilot-style star row ("Bien ★★★★ Trustpilot").
 * Stars use the brand rating green.
 */
export default function Rating({
  score = 4,
  outOf = 5,
  label = "Bien",
  brand = "Trustpilot",
}: {
  score?: number;
  outOf?: number;
  label?: string;
  brand?: string;
}) {
  return (
    <div className="inline-flex items-center gap-2">
      {label && <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text-body)" }}>{label}</span>}
      <span
        style={{ display: "inline-flex", gap: 1, color: "var(--sig-rating)", fontSize: 15, letterSpacing: 1 }}
        aria-label={`${score} / ${outOf}`}
      >
        {Array.from({ length: outOf }).map((_, i) => (
          <span key={i} style={{ color: i < score ? "var(--sig-rating)" : "var(--sig-gray-200)" }}>
            ★
          </span>
        ))}
      </span>
      {brand && <span style={{ fontSize: 13, color: "var(--text-muted)" }}>{brand}</span>}
    </div>
  );
}
