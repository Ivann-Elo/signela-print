import type { Metadata } from "next";
import SuiviForm from "@/components/SuiviForm";

export const metadata: Metadata = {
  title: "Suivi de commande",
  description: "Renseignez votre numéro de commande et votre email pour suivre l'avancement de votre production.",
};

export default function SuiviPage() {
  return (
    <section style={{ background: "#fff" }}>
      <div className="mx-auto max-w-[720px] px-6 py-16 md:py-20">
        <div style={{ fontWeight: 700, fontSize: 12, letterSpacing: "0.9px", textTransform: "uppercase", color: "var(--sig-lime-dark)", marginBottom: 14 }}>
          Espace client
        </div>
        <h1 className="text-[32px] md:text-[40px]" style={{ margin: "0 0 12px", fontWeight: 900, letterSpacing: "-0.8px", color: "var(--text-strong)" }}>
          Suivi de commande
        </h1>
        <p style={{ margin: "0 0 32px", fontSize: 15, lineHeight: 1.6, color: "var(--text-muted)" }}>
          Renseignez votre numéro de commande et l&apos;email utilisé lors de l&apos;achat.
        </p>
        <SuiviForm />
      </div>
    </section>
  );
}
