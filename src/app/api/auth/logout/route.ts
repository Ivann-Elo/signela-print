import { clearAuthCookie } from "@/lib/auth-server";

export async function POST() {
  await clearAuthCookie();
  return Response.json({ ok: true });
}
