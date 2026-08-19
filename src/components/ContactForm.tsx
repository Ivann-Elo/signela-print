"use client";

import { useState } from "react";
import { Input, Select, Textarea } from "@/components/ui/Field";
import { CATS } from "@/lib/data";

export default function ContactForm({ defaultProduct }: { defaultProduct?: string }) {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="flex min-h-[420px] flex-col items-center justify-center gap-3 text-center">
        <div
          className="flex h-12 w-12 items-center justify-center rounded-full text-2xl"
          style={{ background: "var(--sig-lime)", color: "var(--sig-ink)" }}
        >
          ✓
        </div>
        <div style={{ fontWeight: 800, fontSize: 20, color: "var(--text-strong)" }}>Demande envoyée !</div>
        <div style={{ fontSize: 14, color: "var(--text-muted)" }}>Nous revenons vers vous sous 24h ouvrées.</div>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="mt-2 cursor-pointer"
          style={{
            background: "transparent",
            border: "1px solid var(--color-border)",
            borderRadius: 6,
            padding: "8px 18px",
            fontSize: 12.5,
            fontWeight: 600,
            color: "var(--text-strong)",
          }}
        >
          Nouvelle demande
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="flex flex-col gap-4.5"
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input label="Nom" name="nom" required placeholder="Votre nom" />
        <Input label="Email" name="email" required type="email" placeholder="vous@exemple.fr" />
      </div>
      <Input label="Téléphone" name="telephone" placeholder="06 12 34 56 78" />
      <Select label="Produit souhaité" name="produit" defaultValue={defaultProduct ?? ""}>
        <option value="">— Sélectionner —</option>
        {Object.values(CATS).map((c) => (
          <option key={c.key} value={c.key}>
            {c.label}
          </option>
        ))}
      </Select>
      <Textarea label="Votre projet" name="projet" required rows={4} placeholder="Quantité, format, matière, délai souhaité…" />
      <button
        type="submit"
        className="flex w-full cursor-pointer items-center justify-center gap-2"
        style={{
          background: "var(--action-primary)",
          color: "var(--text-on-lime)",
          border: "none",
          borderRadius: 6,
          padding: 14,
          fontSize: 16,
          fontWeight: 800,
          letterSpacing: "0.5px",
        }}
      >
        Envoyer la demande <span>→</span>
      </button>
    </form>
  );
}
