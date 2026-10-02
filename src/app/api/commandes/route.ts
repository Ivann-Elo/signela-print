import { NextRequest } from "next/server";
import pool from "@/lib/db";
import { getSession } from "@/lib/auth-server";

function genNumero(): string {
  const d = new Date();
  const y = d.getFullYear().toString().slice(-2);
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const rand = Math.floor(Math.random() * 100000).toString().padStart(5, "0");
  return `SIG-${y}${m}-${rand}`;
}

// GET — liste des commandes de l'utilisateur connecté
export async function GET() {
  const session = await getSession();
  if (!session) return Response.json({ error: "Non connecté." }, { status: 401 });

  const [rows] = await pool.execute(
    `SELECT c.id, c.numero, c.statut, c.total_ht, c.created_at,
            COUNT(a.id) AS nb_articles
     FROM commandes c
     LEFT JOIN articles_commande a ON a.commande_id = c.id
     WHERE c.utilisateur_id = ?
     GROUP BY c.id
     ORDER BY c.created_at DESC`,
    [session.userId]
  ) as any[];

  return Response.json(rows);
}

// POST — créer une commande
export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return Response.json({ error: "Non connecté." }, { status: 401 });

  try {
    const { articles, adresse_livraison } = await req.json();

    if (!articles?.length) {
      return Response.json({ error: "Panier vide." }, { status: 400 });
    }

    const totalHt: number = articles.reduce((s: number, a: any) => s + Number(a.prix), 0);
    const numero = genNumero();

    const conn = await pool.getConnection();
    try {
      await conn.beginTransaction();

      const [res] = await conn.execute(
        `INSERT INTO commandes (utilisateur_id, numero, total_ht, adresse_livraison)
         VALUES (?, ?, ?, ?)`,
        [session.userId, numero, totalHt, adresse_livraison ?? null]
      ) as any[];

      const commandeId: number = res.insertId;

      for (const a of articles) {
        await conn.execute(
          `INSERT INTO articles_commande (commande_id, produit_slug, produit_titre, config_label, config_json, prix_ht, quantite)
           VALUES (?, ?, ?, ?, ?, ?, 1)`,
          [commandeId, a.productSlug, a.productTitle, a.configLabel ?? null, JSON.stringify(a.config ?? {}), Number(a.prix)]
        );
      }

      await conn.commit();
      return Response.json({ ok: true, commandeId, numero });
    } catch (e) {
      await conn.rollback();
      throw e;
    } finally {
      conn.release();
    }
  } catch (err) {
    console.error("commandes POST error", err);
    return Response.json({ error: "Erreur serveur." }, { status: 500 });
  }
}
