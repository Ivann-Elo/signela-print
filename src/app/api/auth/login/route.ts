import { NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import pool from "@/lib/db";
import { setAuthCookie } from "@/lib/auth-server";

export async function POST(req: NextRequest) {
  try {
    const { email, mot_de_passe } = await req.json();

    if (!email || !mot_de_passe) {
      return Response.json({ error: "Email et mot de passe requis." }, { status: 400 });
    }

    const [rows] = await pool.execute(
      "SELECT id, mot_de_passe FROM utilisateurs WHERE email = ? LIMIT 1",
      [email]
    ) as any[];

    const user = rows[0];
    if (!user) {
      return Response.json({ error: "Identifiants incorrects." }, { status: 401 });
    }

    const valid = await bcrypt.compare(mot_de_passe, user.mot_de_passe);
    if (!valid) {
      return Response.json({ error: "Identifiants incorrects." }, { status: 401 });
    }

    await setAuthCookie({ userId: user.id, email });
    return Response.json({ ok: true });
  } catch (err) {
    console.error("login error", err);
    return Response.json({ error: "Erreur serveur." }, { status: 500 });
  }
}
