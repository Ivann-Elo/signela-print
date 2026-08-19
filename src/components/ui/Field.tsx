import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";

/** Shared uppercase field label used across Signela form controls. */
export function FieldLabel({ children, required = false }: { children: ReactNode; required?: boolean }) {
  return (
    <label
      style={{
        display: "block",
        fontWeight: 700,
        fontSize: "var(--fs-label)",
        lineHeight: 1.5,
        letterSpacing: "var(--ls-label)",
        textTransform: "uppercase",
        color: "var(--text-muted)",
        marginBottom: 6,
      }}
    >
      {children}
      {required && <span style={{ color: "var(--action-danger)" }}> *</span>}
    </label>
  );
}

const controlStyle = {
  width: "100%",
  fontSize: "var(--fs-base)",
  color: "var(--text-strong)",
  background: "var(--sig-white)",
  border: "1px solid var(--color-border)",
  borderRadius: "var(--radius-md)",
  padding: "10.5px 19px",
  boxSizing: "border-box" as const,
  outline: "none",
};

/** Single-line text input with optional label. */
export function Input({
  label,
  required = false,
  ...rest
}: { label?: string; required?: boolean } & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex flex-col">
      {label && <FieldLabel required={required}>{label}</FieldLabel>}
      <input style={controlStyle} required={required} {...rest} />
    </div>
  );
}

/** Multi-line textarea with optional label. */
export function Textarea({
  label,
  required = false,
  rows = 4,
  ...rest
}: { label?: string; required?: boolean } & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div className="flex flex-col">
      {label && <FieldLabel required={required}>{label}</FieldLabel>}
      <textarea rows={rows} style={{ ...controlStyle, resize: "vertical" }} required={required} {...rest} />
    </div>
  );
}

/** Native select styled to match Signela inputs, with a custom chevron. */
export function Select({
  label,
  required = false,
  children,
  ...rest
}: { label?: string; required?: boolean; children: ReactNode } & SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className="flex flex-col">
      {label && <FieldLabel required={required}>{label}</FieldLabel>}
      <div className="relative">
        <select
          style={{
            ...controlStyle,
            padding: "10.5px 40px 10.5px 19px",
            appearance: "none",
            WebkitAppearance: "none",
            cursor: "pointer",
          }}
          {...rest}
        >
          {children}
        </select>
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          aria-hidden="true"
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2"
        >
          <path d="M1 1l4 4 4-4" fill="none" stroke="var(--sig-ink)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}
