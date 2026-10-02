import { NextRequest } from "next/server";
import crypto from "crypto";
import pool from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email) return Response.json({ error: "Email requis." }, { status: 400 });

    // Always return success to not leak whether the email exists
    const [rows] = await pool.execute(
      "SELECT id FROM utilisateurs WHERE email = ? LIMIT 1",
      [email]
    ) as any[];

    const user = rows[0];
    if (!user) return Response.json({ ok: true });

    // Delete any existing token for this user
    await pool.execute("DELETE FROM reset_tokens WHERE user_id = ?", [user.id]);

    const token = crypto.randomBytes(48).toString("hex");
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1h

    await pool.execute(
      "INSERT INTO reset_tokens (user_id, token, expires_at) VALUES (?, ?, ?)",
      [user.id, token, expiresAt]
    );

    const resetUrl = `${req.nextUrl.origin}/compte/reinitialiser?token=${token}`;

    // TODO: envoyer resetUrl par email (nodemailer, Resend, etc.)
    // En développement : on renvoie le lien directement dans la réponse
    const isDev = process.env.NODE_ENV !== "production";
    return Response.json({ ok: true, ...(isDev && { devResetUrl: resetUrl }) });
  } catch (err) {
    console.error("forgot-password error", err);
    return Response.json({ error: "Erreur serveur." }, { status: 500 });
  }
}
