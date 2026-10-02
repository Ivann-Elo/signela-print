"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  }

  return (
    <button
      onClick={logout}
      style={{
        padding: "9px 18px",
        border: "1px solid var(--color-border)",
        borderRadius: 8,
        background: "#fff",
        fontWeight: 600,
        fontSize: 14,
        cursor: "pointer",
        color: "var(--text-body)",
      }}
    >
      Déconnexion
    </button>
  );
}
