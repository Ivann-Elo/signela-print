import type { Metadata } from "next";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/lib/auth-server";
import pool from "@/lib/db";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  return { title: `Commande #${id}` };
}

const STATUT_LABEL: Record<string, string> = {
  en_attente: "En attente",
  en_production: "En production",
  expedition: "En cours d'expédition",
  livree: "Livrée",
  annulee: "Annulée",
};

const STATUT_COLOR: Record<string, string> = {
  en_attente: "#f59e0b",
  en_production: "#3b82f6",
  expedition: "#8b5cf6",
  livree: "#22c55e",
  annulee: "#ef4444",
};

export default async function CommandeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await getSession();
  if (!session) redirect(`/compte/connexion?next=/compte/commandes/${id}`);

  const [rows] = await pool.execute(
    "SELECT id, numero, statut, total_ht, adresse_livraison, note, created_at FROM commandes WHERE id = ? AND utilisateur_id = ? LIMIT 1",
    [id, session.userId]
  ) as any[];

  const commande = rows[0];
  if (!commande) notFound();

  const [articles] = await pool.execute(
    "SELECT id, produit_slug, produit_titre, config_label, prix_ht FROM articles_commande WHERE commande_id = ?",
    [commande.id]
  ) as any[];

  function fmtDate(d: string) {
    return new Date(d).toLocaleDateString("fr-FR", { day: "2-digit", month: "long", year: "numeric" });
  }

  return (
    <section style={{ background: "var(--sig-zinc-100)", minHeight: "calc(100vh - 112px)" }}>
      <div className="sig-container py-10 md:py-14" style={{ maxWidth: 800 }}>
        <div style={{ marginBottom: 24 }}>
          <Link href="/compte/commandes" style={{ fontSize: 14, color: "var(--text-muted)", textDecoration: "none" }}>
            ← Mes commandes
          </Link>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 28 }}>
          <div>
            <h1 className="text-[24px] md:text-[30px]" style={{ margin: "0 0 4px", fontWeight: 900, letterSpacing: "-0.5px", color: "var(--text-strong)" }}>
              Commande {commande.numero}
            </h1>
            <p style={{ margin: 0, fontSize: 13, color: "var(--text-muted)" }}>Passée le {fmtDate(commande.created_at)}</p>
          </div>
          <div style={{
            display: "inline-block",
            padding: "6px 16px",
            borderRadius: 20,
            fontSize: 13,
            fontWeight: 700,
            background: STATUT_COLOR[commande.statut] + "20",
            color: STATUT_COLOR[commande.statut],
          }}>
            {STATUT_LABEL[commande.statut] ?? commande.statut}
          </div>
        </div>

        {/* Articles */}
        <div style={{ background: "#fff", border: "1px solid var(--color-border)", borderRadius: 12, marginBottom: 16, overflow: "hidden" }}>
          <div style={{ padding: "16px 24px", borderBottom: "1px solid var(--color-border)", fontWeight: 800, fontSize: 13, textTransform: "uppercase", letterSpacing: "0.4px", color: "var(--text-strong)" }}>
            Articles commandés
          </div>
          {(articles as any[]).map((a, i) => (
            <div key={a.id} style={{ padding: "18px 24px", borderBottom: i < articles.length - 1 ? "1px solid var(--color-border)" : "none", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: 15, color: "var(--text-strong)", marginBottom: 4 }}>{a.produit_titre}</div>
                {a.config_label && (
                  <div style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.5 }}>{a.config_label}</div>
                )}
              </div>
              <div style={{ fontWeight: 700, fontSize: 15, color: "var(--text-strong)", whiteSpace: "nowrap" }}>
                {Number(a.prix_ht).toFixed(2).replace(".", ",")} € H.T.
              </div>
            </div>
          ))}
        </div>

        {/* Total */}
        <div style={{ background: "#fff", border: "1px solid var(--color-border)", borderRadius: 12, padding: "18px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <span style={{ fontWeight: 700, fontSize: 15, color: "var(--text-strong)" }}>Total H.T.</span>
          <span style={{ fontWeight: 900, fontSize: 20, color: "var(--text-strong)" }}>
            {Number(commande.total_ht).toFixed(2).replace(".", ",")} €
          </span>
        </div>

        {/* Adresse livraison */}
        {commande.adresse_livraison && (
          <div style={{ background: "#fff", border: "1px solid var(--color-border)", borderRadius: 12, padding: "18px 24px", marginBottom: 16 }}>
            <div style={{ fontWeight: 800, fontSize: 13, textTransform: "uppercase", letterSpacing: "0.4px", color: "var(--text-strong)", marginBottom: 8 }}>
              Adresse de livraison
            </div>
            <p style={{ margin: 0, fontSize: 14, color: "var(--text-body)", lineHeight: 1.6, whiteSpace: "pre-line" }}>
              {commande.adresse_livraison}
            </p>
          </div>
        )}

        <div style={{ marginTop: 24 }}>
          <Link
            href="/"
            style={{ display: "inline-block", background: "var(--sig-ink)", color: "#fff", padding: "11px 22px", borderRadius: 8, fontWeight: 700, fontSize: 14, textDecoration: "none" }}
          >
            Commander à nouveau →
          </Link>
        </div>
      </div>
    </section>
  );
}
