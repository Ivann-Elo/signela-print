import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { CATEGORY_ORDER, CATS } from "@/lib/data";

export default function Footer() {
  return (
    <footer style={{ background: "var(--sig-black)" }}>
      <div className="sig-container grid grid-cols-1 gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Image src="/logo-signela-white.png" alt="SIGNELA" width={130} height={30} style={{ height: 26, width: "auto", marginBottom: 18 }} />
          <p style={{ margin: "0 0 16px", fontSize: 13.5, lineHeight: 1.6, color: "rgba(255,255,255,0.5)", maxWidth: 280 }}>
            L&apos;imprimerie hybride. Locale &amp; en ligne. Grand format, PLV et imprimerie classique depuis notre atelier Normand.
          </p>
          <div className="flex flex-col gap-2" style={{ fontSize: 13, color: "rgba(255,255,255,0.6)" }}>
            <div>📍 31P Av des carrières, 14760 Bretteville-sur-odon</div>
            <div>📞 02 85 85 55 22</div>
            <div>✉️ gestion@signela.fr</div>
          </div>
        </div>

        <div>
          <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.8px", textTransform: "uppercase", color: "#fff", marginBottom: 16 }}>
            Nos gammes
          </div>
          <div className="flex flex-col gap-2.5">
            {CATEGORY_ORDER.map((key) => (
              <Link key={key} href={`/categorie/${key}`} style={{ fontSize: 13.5, color: "rgba(255,255,255,0.6)" }}>
                {CATS[key].label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.8px", textTransform: "uppercase", color: "#fff", marginBottom: 16 }}>
            Entreprise
          </div>
          <div className="flex flex-col gap-2.5">
            <Link href="/a-propos" style={{ fontSize: 13.5, color: "rgba(255,255,255,0.6)" }}>À propos</Link>
            <Link href="/contact" style={{ fontSize: 13.5, color: "rgba(255,255,255,0.6)" }}>Contact &amp; devis</Link>
            <Link href="/suivi" style={{ fontSize: 13.5, color: "rgba(255,255,255,0.6)" }}>Suivi de commande</Link>
            <Link href="/mentions-legales" style={{ fontSize: 13.5, color: "rgba(255,255,255,0.6)" }}>Mentions légales &amp; CGV</Link>
          </div>
        </div>

        <div>
          <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.8px", textTransform: "uppercase", color: "#fff", marginBottom: 16 }}>
            Devis express
          </div>
          <p style={{ margin: "0 0 14px", fontSize: 13, lineHeight: 1.6, color: "rgba(255,255,255,0.5)" }}>
            Réponse en 24h, sans engagement.
          </p>
          <Button href="/contact" variant="primary" size="sm" arrow>
            Demander un devis
          </Button>
        </div>
      </div>

      <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
        <div className="sig-container flex flex-wrap items-center justify-between gap-2 py-5">
          <div style={{ fontSize: 12.5, fontWeight: 700, color: "rgba(255,255,255,0.85)" }}>
            SIGNELA <span style={{ fontWeight: 400, color: "rgba(255,255,255,0.45)" }}>· Imprimerie locale</span>
          </div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>© <a href="https://signela.digital.fr" style={{ textDecoration: "none"}}>2026 SIGNELA DIGITAL</a> · Tous droits réservés</div>
        </div>
      </div>
    </footer>
  );
}
