import type { AnchorHTMLAttributes, ButtonHTMLAttributes, CSSProperties, ReactNode } from "react";
import Link from "next/link";

type Variant = "primary" | "dark" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

interface CommonProps {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  arrow?: boolean;
  className?: string;
  style?: CSSProperties;
}

type ButtonAsLink = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "style" | "className"> & {
    href: string;
  };

type ButtonAsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "style" | "className"> & {
    href?: undefined;
  };

type ButtonProps = ButtonAsLink | ButtonAsButton;

const sizes: Record<Size, CSSProperties> = {
  sm: { padding: "7.2px 16px", fontSize: 12.5, fontWeight: 700 },
  md: { padding: "11.2px 28px", fontSize: 14, fontWeight: 800, letterSpacing: "0.56px" },
  lg: { padding: "14px 32px", fontSize: 16, fontWeight: 800, letterSpacing: "0.5px" },
};

const variants: Record<Variant, CSSProperties> = {
  primary: { background: "var(--action-primary)", color: "var(--text-on-lime)", border: "1px solid transparent" },
  dark: { background: "var(--action-dark)", color: "var(--text-on-dark)", border: "1px solid transparent" },
  outline: { background: "transparent", color: "var(--text-strong)", border: "1px solid var(--color-border)", fontWeight: 600 },
  ghost: { background: "transparent", color: "var(--text-body)", border: "1px solid transparent", fontWeight: 600 },
};

/**
 * Signela Button — the site's action primitive.
 * Variants: primary (lime), dark (ink), outline (hairline), ghost (nav link).
 */
export default function Button({
  children,
  variant = "primary",
  size = "md",
  arrow = false,
  href,
  className,
  style = {},
  ...rest
}: ButtonProps) {
  const base: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    lineHeight: 1.4,
    borderRadius: "var(--radius-md)",
    textDecoration: "none",
    whiteSpace: "nowrap",
    transition:
      "background-color .15s ease, color .15s ease, border-color .15s ease, transform .05s ease",
    boxSizing: "border-box",
    ...sizes[size],
    ...variants[variant],
    ...style,
  };

  const content = (
    <>
      <span>{children}</span>
      {arrow && <span aria-hidden="true">→</span>}
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={className}
        style={base}
        {...(rest as Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "style" | "className">)}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type="button"
      className={className}
      style={base}
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {content}
    </button>
  );
}
