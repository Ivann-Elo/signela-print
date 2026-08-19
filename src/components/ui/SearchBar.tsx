import type { InputHTMLAttributes } from "react";

/** Product search field from the site header ("Trouver un produit…"). */
export default function SearchBar({
  placeholder = "Trouver un produit…",
  className,
  ...rest
}: { className?: string } & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div
      className={`flex w-full items-center gap-2.5 box-border ${className ?? ""}`}
      style={{ background: "var(--sig-white)", border: "1px solid var(--color-border)", borderRadius: "var(--radius-md)", padding: "9px 16px" }}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" className="shrink-0">
        <circle cx="7" cy="7" r="5" fill="none" stroke="var(--sig-gray-500)" strokeWidth="1.5" />
        <line x1="11" y1="11" x2="14.5" y2="14.5" stroke="var(--sig-gray-500)" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      <input
        placeholder={placeholder}
        style={{ flex: 1, border: "none", outline: "none", background: "transparent", fontSize: "var(--fs-base)", color: "var(--text-strong)" }}
        {...rest}
      />
    </div>
  );
}
