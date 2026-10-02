import { NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import pool from "@/lib/db";
import { setAuthCookie } from "@/lib/auth-server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, mot_de_passe, prenom, nom, telephone, societe, siret, adresse, code_postal, ville } = body;

    if (!email || !mot_de_passe || !prenom || !nom) {
      return Response.json({ error: "Champs obligatoires manquants." }, { status: 400 });
    }

    const hash = await bcrypt.hash(mot_de_passe, 12);

    const [result] = await pool.execute(
      `INSERT INTO utilisateurs (email, mot_de_passe, prenom, nom, telephone, societe, siret, adresse, code_postal, ville)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [email, hash, prenom, nom, telephone ?? null, societe ?? null, siret ?? null, adresse ?? null, code_postal ?? null, ville ?? null]
    ) as any[];

    const userId: number = result.insertId;
    await setAuthCookie({ userId, email });

    return Response.json({ ok: true, userId });
  } catch (err: any) {
    if (err?.code === "ER_DUP_ENTRY") {
      return Response.json({ error: "Cette adresse email est déjà utilisée." }, { status: 409 });
    }
    console.error("register error", err);
    return Response.json({ error: "Erreur serveur." }, { status: 500 });
  }
}
