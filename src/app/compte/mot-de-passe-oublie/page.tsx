"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";

export default function MotDePasseOubliePage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [erreur, setErreur] = useState("");
  // In dev mode, the API returns the reset link directly
  const [devLink, setDevLink] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setErreur("");
    setLoading(true);

    const res = await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setErreur(data.error ?? "Erreur serveur.");
      return;
    }

    setSent(true);
    if (data.devResetUrl) setDevLink(data.devResetUrl);
  }

  const inputStyle = {
    width: "100%",
    padding: "10px 14px",
    border: "1px solid var(--color-border)",
    borderRadius: 8,
    fontSize: 15,
    outline: "none",
    boxSizing: "border-box" as const,
  };

  return (
    <section style={{ background: "#fff" }}>
      <div className="mx-auto max-w-[480px] px-6 py-16 md:py-20">
        <div style={{ fontWeight: 700, fontSize: 12, letterSpacing: "0.9px", textTransform: "uppercase", color: "var(--sig-lime-dark)", marginBottom: 14 }}>
          Espace client
        </div>
        <h1 className="text-[28px] md:text-[34px]" style={{ margin: "0 0 10px", fontWeight: 900, letterSpacing: "-0.6px", color: "var(--text-strong)" }}>
          Mot de passe oublié
        </h1>

        {!sent ? (
          <>
            <p style={{ margin: "0 0 28px", fontSize: 15, color: "var(--text-muted)", lineHeight: 1.6 }}>
              Saisissez votre adresse email. Si un compte existe, vous recevrez un lien pour réinitialiser votre mot de passe.
            </p>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <label htmlFor="email" style={{ display: "block", fontWeight: 600, fontSize: 13, marginBottom: 6, color: "var(--text-strong)" }}>
                  Email *
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={inputStyle}
                />
              </div>

              {erreur && (
                <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 8, padding: "10px 14px", color: "#dc2626", fontSize: 14 }}>
                  {erreur}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                style={{
                  marginTop: 4,
                  padding: "12px 24px",
                  background: loading ? "var(--color-border)" : "var(--sig-ink)",
                  color: "#fff",
                  border: "none",
                  borderRadius: 8,
                  fontWeight: 700,
                  fontSize: 15,
                  cursor: loading ? "not-allowed" : "pointer",
                }}
              >
                {loading ? "Envoi…" : "Envoyer le lien →"}
              </button>
            </form>
          </>
        ) : (
          <div>
            <div style={{ background: "#f0fdf4", border: "1px solid #86efac", borderRadius: 10, padding: "18px 20px", marginBottom: 24 }}>
              <p style={{ margin: 0, fontSize: 15, color: "#15803d", lineHeight: 1.6, fontWeight: 600 }}>
                Si un compte correspond à cette adresse, un lien de réinitialisation a été envoyé.
              </p>
            </div>

            {devLink && (
              <div style={{ background: "#fffbeb", border: "1px solid #fcd34d", borderRadius: 10, padding: "16px 18px", marginBottom: 24 }}>
                <p style={{ margin: "0 0 8px", fontSize: 12, fontWeight: 700, color: "#92400e", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                  Mode développement — lien de réinitialisation :
                </p>
                <a href={devLink} style={{ fontSize: 13, color: "#1d4ed8", wordBreak: "break-all" }}>
                  {devLink}
                </a>
              </div>
            )}

            <Link
              href="/compte/connexion"
              style={{ fontSize: 14, color: "var(--sig-lime-dark)", fontWeight: 600, textDecoration: "underline" }}
            >
              ← Retour à la connexion
            </Link>
          </div>
        )}

        {!sent && (
          <div style={{ marginTop: 20 }}>
            <Link href="/compte/connexion" style={{ fontSize: 13, color: "var(--text-muted)", textDecoration: "none" }}>
              ← Retour à la connexion
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
