"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function InscriptionPage() {
  const router = useRouter();
  const [erreur, setErreur] = useState("");
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    prenom: "", nom: "", email: "", mot_de_passe: "", telephone: "",
    societe: "", siret: "", adresse: "", code_postal: "", ville: "",
  });

  function change(field: string, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setErreur("");
    setLoading(true);

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setErreur(data.error ?? "Erreur lors de la création du compte.");
      return;
    }

    const next = new URLSearchParams(window.location.search).get("next") ?? "/compte/commandes";
    router.push(next);
    router.refresh();
  }

  const fieldStyle = {
    width: "100%",
    padding: "10px 14px",
    border: "1px solid var(--color-border)",
    borderRadius: 8,
    fontSize: 15,
    outline: "none",
    boxSizing: "border-box" as const,
  };
  const labelStyle = {
    display: "block" as const,
    fontWeight: 600,
    fontSize: 13,
    marginBottom: 6,
    color: "var(--text-strong)",
  };

  return (
    <section style={{ background: "#fff" }}>
      <div className="mx-auto max-w-[600px] px-6 py-16 md:py-20">
        <div style={{ fontWeight: 700, fontSize: 12, letterSpacing: "0.9px", textTransform: "uppercase", color: "var(--sig-lime-dark)", marginBottom: 14 }}>
          Espace client
        </div>
        <h1 className="text-[32px] md:text-[38px]" style={{ margin: "0 0 8px", fontWeight: 900, letterSpacing: "-0.8px", color: "var(--text-strong)" }}>
          Créer un compte
        </h1>
        <p style={{ margin: "0 0 28px", fontSize: 15, color: "var(--text-muted)" }}>
          Déjà un compte ?{" "}
          <Link href="/compte/connexion" style={{ color: "var(--sig-lime-dark)", fontWeight: 600, textDecoration: "underline" }}>
            Se connecter
          </Link>
        </p>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontWeight: 800, fontSize: 13, letterSpacing: "0.4px", textTransform: "uppercase", color: "var(--text-strong)", borderBottom: "1px solid var(--color-border)", paddingBottom: 8 }}>
            Identité
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="prenom" style={labelStyle}>Prénom *</label>
              <input id="prenom" required value={form.prenom} onChange={(e) => change("prenom", e.target.value)} style={fieldStyle} />
            </div>
            <div>
              <label htmlFor="nom" style={labelStyle}>Nom *</label>
              <input id="nom" required value={form.nom} onChange={(e) => change("nom", e.target.value)} style={fieldStyle} />
            </div>
          </div>

          <div>
            <label htmlFor="email" style={labelStyle}>Email *</label>
            <input id="email" type="email" required value={form.email} onChange={(e) => change("email", e.target.value)} style={fieldStyle} />
          </div>

          <div>
            <label htmlFor="mdp" style={labelStyle}>Mot de passe *</label>
            <input id="mdp" type="password" required minLength={8} value={form.mot_de_passe} onChange={(e) => change("mot_de_passe", e.target.value)} style={fieldStyle} />
            <p style={{ marginTop: 5, fontSize: 12, color: "var(--text-muted)" }}>8 caractères minimum</p>
          </div>

          <div>
            <label htmlFor="telephone" style={labelStyle}>Téléphone</label>
            <input id="telephone" type="tel" value={form.telephone} onChange={(e) => change("telephone", e.target.value)} style={fieldStyle} />
          </div>

          <div style={{ fontWeight: 800, fontSize: 13, letterSpacing: "0.4px", textTransform: "uppercase", color: "var(--text-strong)", borderBottom: "1px solid var(--color-border)", paddingBottom: 8 }}>
            Société (optionnel)
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="societe" style={labelStyle}>Raison sociale</label>
              <input id="societe" value={form.societe} onChange={(e) => change("societe", e.target.value)} style={fieldStyle} />
            </div>
            <div>
              <label htmlFor="siret" style={labelStyle}>SIRET</label>
              <input id="siret" value={form.siret} onChange={(e) => change("siret", e.target.value)} style={fieldStyle} />
            </div>
          </div>

          <div style={{ fontWeight: 800, fontSize: 13, letterSpacing: "0.4px", textTransform: "uppercase", color: "var(--text-strong)", borderBottom: "1px solid var(--color-border)", paddingBottom: 8 }}>
            Adresse de livraison
          </div>

          <div>
            <label htmlFor="adresse" style={labelStyle}>Adresse</label>
            <input id="adresse" value={form.adresse} onChange={(e) => change("adresse", e.target.value)} style={fieldStyle} />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="cp" style={labelStyle}>Code postal</label>
              <input id="cp" value={form.code_postal} onChange={(e) => change("code_postal", e.target.value)} style={fieldStyle} />
            </div>
            <div>
              <label htmlFor="ville" style={labelStyle}>Ville</label>
              <input id="ville" value={form.ville} onChange={(e) => change("ville", e.target.value)} style={fieldStyle} />
            </div>
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
            }}
          >
            {loading ? "Création…" : "Créer mon compte →"}
          </button>
        </form>
      </div>
    </section>
  );
}
