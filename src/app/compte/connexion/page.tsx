"use client";

import type { Metadata } from "next";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ConnexionPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [mdp, setMdp] = useState("");
  const [erreur, setErreur] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setErreur("");
    setLoading(true);

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, mot_de_passe: mdp }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setErreur(data.error ?? "Erreur de connexion.");
      return;
    }

    // Redirige vers la page indiquée (ex: retour commande) ou le tableau de bord
    const next = new URLSearchParams(window.location.search).get("next") ?? "/compte/commandes";
    router.push(next);
    router.refresh();
  }

  return (
    <section style={{ background: "#fff" }}>
      <div className="mx-auto max-w-[480px] px-6 py-16 md:py-20">
        <div style={{ fontWeight: 700, fontSize: 12, letterSpacing: "0.9px", textTransform: "uppercase", color: "var(--sig-lime-dark)", marginBottom: 14 }}>
          Espace client
        </div>
        <h1 className="text-[32px] md:text-[38px]" style={{ margin: "0 0 8px", fontWeight: 900, letterSpacing: "-0.8px", color: "var(--text-strong)" }}>
          Connexion
        </h1>
        <p style={{ margin: "0 0 28px", fontSize: 15, color: "var(--text-muted)" }}>
          Pas encore de compte ?{" "}
          <Link href="/compte/inscription" style={{ color: "var(--sig-lime-dark)", fontWeight: 600, textDecoration: "underline" }}>
            Créer un compte
          </Link>
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
              style={{ width: "100%", padding: "10px 14px", border: "1px solid var(--color-border)", borderRadius: 8, fontSize: 15, outline: "none", boxSizing: "border-box" }}
            />
          </div>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6 }}>
              <label htmlFor="mdp" style={{ fontWeight: 600, fontSize: 13, color: "var(--text-strong)" }}>
                Mot de passe *
              </label>
              <Link href="/compte/mot-de-passe-oublie" style={{ fontSize: 12, color: "var(--text-muted)", textDecoration: "underline" }}>
                Mot de passe oublié ?
              </Link>
            </div>
            <input
              id="mdp"
              type="password"
              required
              value={mdp}
              onChange={(e) => setMdp(e.target.value)}
              style={{ width: "100%", padding: "10px 14px", border: "1px solid var(--color-border)", borderRadius: 8, fontSize: 15, outline: "none", boxSizing: "border-box" }}
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
              marginTop: 8,
              padding: "12px 24px",
              background: loading ? "var(--color-border)" : "var(--sig-ink)",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              fontWeight: 700,
              fontSize: 15,
              cursor: loading ? "not-allowed" : "pointer",
              letterSpacing: "0.2px",
            }}
          >
            {loading ? "Connexion…" : "Se connecter →"}
          </button>
        </form>
      </div>
    </section>
  );
}
