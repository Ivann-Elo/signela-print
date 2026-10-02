import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/lib/auth-server";
import pool from "@/lib/db";
import LogoutButton from "@/components/LogoutButton";

export const metadata: Metadata = {
  title: "Mes commandes",
  description: "Tableau de bord — historique et suivi de vos commandes.",
};

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

export default async function CommandesPage() {
  const session = await getSession();
  if (!session) redirect("/compte/connexion?next=/compte/commandes");

  const [userRows] = await pool.execute(
    "SELECT prenom, nom FROM utilisateurs WHERE id = ? LIMIT 1",
    [session.userId]
  ) as any[];
  const user = userRows[0];

  const [commandes] = await pool.execute(
    `SELECT c.id, c.numero, c.statut, c.total_ht, c.created_at, COUNT(a.id) as nb_articles
     FROM commandes c
     LEFT JOIN articles_commande a ON a.commande_id = c.id
     WHERE c.utilisateur_id = ?
     GROUP BY c.id
     ORDER BY c.created_at DESC`,
    [session.userId]
  ) as any[];

  function fmtDate(d: string) {
    return new Date(d).toLocaleDateString("fr-FR", { day: "2-digit", month: "long", year: "numeric" });
  }

  return (
    <section style={{ background: "var(--sig-zinc-100)", minHeight: "calc(100vh - 112px)" }}>
      <div className="sig-container py-10 md:py-14">
        {/* En-tête */}
        <div className="flex flex-wrap items-start justify-between gap-4" style={{ marginBottom: 32 }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: 12, letterSpacing: "0.9px", textTransform: "uppercase", color: "var(--sig-lime-dark)", marginBottom: 10 }}>
              Espace client
            </div>
            <h1 className="text-[28px] md:text-[34px]" style={{ margin: 0, fontWeight: 900, letterSpacing: "-0.6px", color: "var(--text-strong)" }}>
              Bonjour, {user?.prenom} {user?.nom}
            </h1>
          </div>
          <LogoutButton />
        </div>

        {/* Commandes */}
        {(commandes as any[]).length === 0 ? (
          <div style={{ background: "#fff", border: "1px solid var(--color-border)", borderRadius: 12, padding: "40px 32px", textAlign: "center" }}>
            <p style={{ fontSize: 16, color: "var(--text-muted)", marginBottom: 20 }}>Vous n&apos;avez pas encore de commande.</p>
            <Link
              href="/"
              style={{ display: "inline-block", background: "var(--sig-ink)", color: "#fff", padding: "11px 22px", borderRadius: 8, fontWeight: 700, fontSize: 14, textDecoration: "none" }}
            >
              Découvrir nos produits →
            </Link>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {(commandes as any[]).map((c) => (
              <Link
                key={c.id}
                href={`/compte/commandes/${c.id}`}
                style={{ display: "block", background: "#fff", border: "1px solid var(--color-border)", borderRadius: 12, padding: "20px 24px", textDecoration: "none", transition: "box-shadow 0.15s" }}
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div style={{ fontWeight: 800, fontSize: 15, color: "var(--text-strong)", marginBottom: 4 }}>
                      Commande {c.numero}
                    </div>
                    <div style={{ fontSize: 13, color: "var(--text-muted)" }}>
                      {fmtDate(c.created_at)} · {c.nb_articles} article{c.nb_articles > 1 ? "s" : ""}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div style={{ fontWeight: 700, fontSize: 16, color: "var(--text-strong)" }}>
                      {Number(c.total_ht).toFixed(2).replace(".", ",")} € H.T.
                    </div>
                    <div style={{
                      display: "inline-block",
                      padding: "4px 12px",
                      borderRadius: 20,
                      fontSize: 12,
                      fontWeight: 700,
                      background: STATUT_COLOR[c.statut] + "20",
                      color: STATUT_COLOR[c.statut],
                    }}>
                      {STATUT_LABEL[c.statut] ?? c.statut}
                    </div>
                    <span style={{ color: "var(--text-muted)", fontSize: 18 }}>›</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
