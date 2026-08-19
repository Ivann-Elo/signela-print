/**
 * Signela FeatureList — the marked spec list used in the hero (bullet, on dark)
 * and inside product cards (check, on light).
 */
export default function FeatureList({
  items = [],
  marker = "check",
  onDark = false,
  className,
}: {
  items?: string[];
  marker?: "check" | "bullet";
  onDark?: boolean;
  className?: string;
}) {
  const markerColor = "var(--sig-lime)";
  const textColor = onDark ? "var(--text-on-dark-soft)" : "var(--text-body)";
  const glyph = marker === "bullet" ? "•" : "✓";
  return (
    <ul className={`m-0 flex list-none flex-col gap-1.5 p-0 ${className ?? ""}`}>
      {items.map((item, i) => (
        <li key={i} className="flex items-baseline gap-2">
          <span
            aria-hidden="true"
            style={{ color: markerColor, fontWeight: 700, flexShrink: 0, fontSize: marker === "bullet" ? 14.4 : 13 }}
          >
            {glyph}
          </span>
          <span style={{ fontWeight: 400, fontSize: marker === "bullet" ? 14.4 : 13, lineHeight: 1.5, color: textColor }}>
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}
