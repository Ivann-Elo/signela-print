import type { Metadata } from "next";
import { LEGAL } from "@/lib/data";

export const metadata: Metadata = {
  title: "Mentions légales & CGV",
  description: "Mentions légales et conditions générales de vente de SIGNELA.",
};

export default function LegalPage() {
  return (
    <section style={{ background: "#fff" }}>
      <div className="mx-auto max-w-[820px] px-6 py-16 md:py-20">
        <h1 className="text-[32px] md:text-[40px]" style={{ margin: "0 0 8px", fontWeight: 900, letterSpacing: "-0.8px", color: "var(--text-strong)" }}>
          Mentions légales &amp; CGV
        </h1>
        <p style={{ margin: "0 0 40px", fontSize: 14, color: "var(--text-muted)" }}>Dernière mise à jour : janvier 2026</p>
        {LEGAL.map((section) => (
          <div key={section.title} className="mb-8">
            <h2 style={{ margin: "0 0 10px", fontWeight: 800, fontSize: 19, color: "var(--text-strong)" }}>{section.title}</h2>
            <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.75, color: "var(--text-muted)" }}>{section.body}</p>
          </div>
        ))}
        <p className="mt-10" style={{ fontSize: 13, color: "var(--text-muted)", fontStyle: "italic" }}>
          Ce texte est un contenu d&apos;exemple destiné à la mise en page. Faites valider vos mentions légales et CGV définitives par un juriste avant mise en ligne.
        </p>
      </div>
    </section>
  );
}
