import { NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import pool from "@/lib/db";
import { setAuthCookie } from "@/lib/auth-server";

export async function POST(req: NextRequest) {
  try {
    const { token, mot_de_passe } = await req.json();

    if (!token || !mot_de_passe) {
      return Response.json({ error: "Token et mot de passe requis." }, { status: 400 });
    }
    if (mot_de_passe.length < 8) {
      return Response.json({ error: "Le mot de passe doit faire au moins 8 caractères." }, { status: 400 });
    }

    const [rows] = await pool.execute(
      `SELECT rt.user_id, u.email
       FROM reset_tokens rt
       JOIN utilisateurs u ON u.id = rt.user_id
       WHERE rt.token = ? AND rt.expires_at > UTC_TIMESTAMP()
       LIMIT 1`,
      [token]
    ) as any[];

    const row = rows[0];
    if (!row) {
      return Response.json({ error: "Lien invalide ou expiré. Veuillez recommencer." }, { status: 400 });
    }

    const hash = await bcrypt.hash(mot_de_passe, 12);
    await pool.execute("UPDATE utilisateurs SET mot_de_passe = ? WHERE id = ?", [hash, row.user_id]);
    await pool.execute("DELETE FROM reset_tokens WHERE user_id = ?", [row.user_id]);

    await setAuthCookie({ userId: row.user_id, email: row.email });
    return Response.json({ ok: true });
  } catch (err) {
    console.error("reset-password error", err);
    return Response.json({ error: "Erreur serveur." }, { status: 500 });
  }
}
