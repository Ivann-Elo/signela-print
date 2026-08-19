"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Field";

const STEPS = [
  { title: "Commande reçue", date: "12 janv. 2026 · 09:14", state: "done" as const },
  { title: "Bon à tirer validé", date: "12 janv. 2026 · 15:40", state: "done" as const },
  { title: "En production", date: "En cours à l'atelier", state: "current" as const },
  { title: "Expédiée", date: "Estimée le 15 janv. 2026", state: "todo" as const },
];

export default function SuiviForm() {
  const [shown, setShown] = useState(false);

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setShown(true);
        }}
        className="flex flex-col gap-4.5 p-7"
        style={{ border: "1px solid var(--color-border)", borderRadius: 12 }}
      >
        <Input label="N° de commande" name="numero" required placeholder="ex. SGN-2026-04821" />
        <Input label="Email" name="email" required type="email" placeholder="vous@exemple.fr" />
        <button
          type="submit"
          className="flex w-full cursor-pointer items-center justify-center gap-2"
          style={{
            background: "var(--action-primary)",
            color: "var(--text-on-lime)",
            border: "none",
            borderRadius: 6,
            padding: 13,
            fontSize: 15,
            fontWeight: 800,
            letterSpacing: "0.5px",
          }}
        >
          Suivre ma commande <span>→</span>
        </button>
      </form>

      {shown && (
        <div className="mt-8 overflow-hidden" style={{ border: "1px solid var(--color-border)", borderRadius: 12 }}>
          <div
            className="flex flex-wrap items-center justify-between gap-2 px-6 py-5"
            style={{ background: "var(--sig-ink)" }}
          >
            <div>
              <div style={{ fontSize: 11, letterSpacing: "0.6px", textTransform: "uppercase", color: "rgba(255,255,255,0.6)" }}>
                Commande
              </div>
              <div style={{ fontWeight: 800, fontSize: 18, color: "#fff" }}>SGN-2026-04821</div>
            </div>
            <span
              style={{
                background: "var(--sig-lime)",
                color: "var(--sig-ink)",
                fontWeight: 800,
                fontSize: 11,
                letterSpacing: "0.6px",
                textTransform: "uppercase",
                padding: "5px 12px",
                borderRadius: 4,
              }}
            >
              En production
            </span>
          </div>
          <div className="flex flex-col px-6 py-7">
            {STEPS.map((st, i) => {
              const mark = st.state === "todo" ? "" : "✓";
              const dotBg = st.state === "todo" ? "var(--sig-zinc-100)" : "var(--sig-lime)";
              const dotColor = st.state === "todo" ? "var(--text-muted)" : "var(--sig-ink)";
              const lineBg = i === STEPS.length - 1 ? "transparent" : st.state === "done" ? "var(--sig-lime)" : "var(--color-border)";
              return (
                <div key={st.title} className="flex items-start gap-4">
                  <div className="flex flex-col items-center self-stretch">
                    <div
                      className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full"
                      style={{ fontSize: 13, fontWeight: 800, background: dotBg, color: dotColor }}
                    >
                      {mark}
                    </div>
                    <div style={{ width: 2, flex: 1, minHeight: 22, background: lineBg }} />
                  </div>
                  <div className="pb-5.5">
                    <div style={{ fontWeight: 700, fontSize: 15, color: "var(--text-strong)" }}>{st.title}</div>
                    <div style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 2 }}>{st.date}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
