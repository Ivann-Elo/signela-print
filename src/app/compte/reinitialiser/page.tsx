"use client";

import { useState, FormEvent, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";

function ReinitialiserForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";

  const [mdp, setMdp] = useState("");
  const [mdpConfirm, setMdpConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [erreur, setErreur] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!token) setErreur("Lien invalide. Veuillez recommencer depuis la page mot de passe oublié.");
  }, [token]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setErreur("");

    if (mdp !== mdpConfirm) {
      setErreur("Les mots de passe ne correspondent pas.");
      return;
    }
    if (mdp.length < 8) {
      setErreur("Le mot de passe doit faire au moins 8 caractères.");
      return;
    }

    setLoading(true);
    const res = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, mot_de_passe: mdp }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setErreur(data.error ?? "Erreur serveur.");
      return;
    }

    setDone(true);
    setTimeout(() => {
      router.push("/compte/commandes");
      router.refresh();
    }, 2000);
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
          Nouveau mot de passe
        </h1>

        {done ? (
          <div style={{ background: "#f0fdf4", border: "1px solid #86efac", borderRadius: 10, padding: "20px 22px" }}>
            <p style={{ margin: 0, fontSize: 15, color: "#15803d", fontWeight: 600, lineHeight: 1.6 }}>
              ✓ Mot de passe mis à jour. Redirection en cours…
            </p>
          </div>
        ) : (
          <>
            {!token ? (
              <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 8, padding: "14px 18px", marginBottom: 20, color: "#dc2626", fontSize: 14 }}>
                Lien invalide. Veuillez{" "}
                <Link href="/compte/mot-de-passe-oublie" style={{ color: "#dc2626", fontWeight: 700, textDecoration: "underline" }}>
                  recommencer depuis la page mot de passe oublié
                </Link>.
              </div>
            ) : (
              <>
                <p style={{ margin: "0 0 28px", fontSize: 15, color: "var(--text-muted)", lineHeight: 1.6 }}>
                  Choisissez un nouveau mot de passe pour votre compte.
                </p>
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <div>
                    <label htmlFor="mdp" style={{ display: "block", fontWeight: 600, fontSize: 13, marginBottom: 6, color: "var(--text-strong)" }}>
                      Nouveau mot de passe *
                    </label>
                    <input
                      id="mdp"
                      type="password"
                      required
                      minLength={8}
                      value={mdp}
                      onChange={(e) => setMdp(e.target.value)}
                      style={inputStyle}
                    />
                    <p style={{ marginTop: 5, fontSize: 12, color: "var(--text-muted)" }}>8 caractères minimum</p>
                  </div>
                  <div>
                    <label htmlFor="mdp2" style={{ display: "block", fontWeight: 600, fontSize: 13, marginBottom: 6, color: "var(--text-strong)" }}>
                      Confirmer le mot de passe *
                    </label>
                    <input
                      id="mdp2"
                      type="password"
                      required
                      value={mdpConfirm}
                      onChange={(e) => setMdpConfirm(e.target.value)}
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
                    {loading ? "Enregistrement…" : "Enregistrer le mot de passe →"}
                  </button>
                </form>
              </>
            )}
          </>
        )}
      </div>
    </section>
  );
}

export default function ReinitialiserPage() {
  return (
    <Suspense>
      <ReinitialiserForm />
    </Suspense>
  );
}
