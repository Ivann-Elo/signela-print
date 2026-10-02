import pool from "@/lib/db";
import { getSession } from "@/lib/auth-server";

export async function GET() {
  const session = await getSession();
  if (!session) return Response.json({ error: "Non connecté." }, { status: 401 });

  const [rows] = await pool.execute(
    "SELECT id, email, prenom, nom, telephone, societe, siret, adresse, code_postal, ville FROM utilisateurs WHERE id = ? LIMIT 1",
    [session.userId]
  ) as any[];

  const user = rows[0];
  if (!user) return Response.json({ error: "Utilisateur introuvable." }, { status: 404 });

  return Response.json(user);
}
