import { NextRequest } from "next/server";
import pool from "@/lib/db";
import { getSession } from "@/lib/auth-server";

export async function GET(_req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) return Response.json({ error: "Non connecté." }, { status: 401 });

  const { id } = await ctx.params;

  const [rows] = await pool.execute(
    `SELECT c.id, c.numero, c.statut, c.total_ht, c.adresse_livraison, c.created_at
     FROM commandes c
     WHERE c.id = ? AND c.utilisateur_id = ?
     LIMIT 1`,
    [id, session.userId]
  ) as any[];

  const commande = rows[0];
  if (!commande) return Response.json({ error: "Commande introuvable." }, { status: 404 });

  const [articles] = await pool.execute(
    "SELECT id, produit_slug, produit_titre, config_label, config_json, prix_ht FROM articles_commande WHERE commande_id = ?",
    [commande.id]
  ) as any[];

  return Response.json({ ...commande, articles });
}
