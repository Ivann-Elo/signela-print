"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import SearchBar from "@/components/ui/SearchBar";
import AnnouncementBar from "@/components/ui/AnnouncementBar";
import Marquee from "@/components/ui/Marquee";
import { CATEGORY_ORDER, CATS, menuData, type CategoryKey } from "@/lib/data";

export default function Header() {
  const [openMenu, setOpenMenu] = useState<CategoryKey | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileCat, setMobileCat] = useState<CategoryKey | null>(null);
  const [query, setQuery] = useState("");
  const navRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setOpenMenu(null);
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    }
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  function submitSearch(term: string) {
    const q = term.trim();
    if (!q) return;
    router.push(`/recherche?q=${encodeURIComponent(q)}`);
  }

  return (
    <header className="sticky top-0 z-50">
      <AnnouncementBar>
        Votre imprimerie locale &amp; en ligne !&nbsp; ·&nbsp;{" "}
        <strong style={{ fontWeight: 700 }}>LIVRAISON GRATUITE</strong> en France métropolitaine dès 150€ HT
      </AnnouncementBar>

      <div style={{ borderBottom: "1px solid var(--color-border)", background: "#fff" }}>
        <div className="sig-container flex items-center gap-4 py-3.5 md:gap-6">
          <Link href="/" className="shrink-0">
            <Image src="/logo-signela-dark.png" alt="SIGNELA" width={148} height={34} style={{ height: 30, width: "auto" }} priority />
          </Link>

          <div className="hidden flex-1 max-w-[640px] md:block">
            <SearchBar
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") submitSearch(query);
              }}
            />
          </div>

          <div className="hidden text-right leading-tight lg:block">
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.6px", textTransform: "uppercase", color: "var(--text-muted)" }}>
              Appelez-nous
            </div>
            <div style={{ fontSize: 15, fontWeight: 800, color: "var(--text-strong)" }}><a href="tel:0285855522">02 85 85 55 22</a></div>
          </div>

          <div className="hidden shrink-0 gap-3 sm:flex">
            <Button href="/suivi" variant="dark" size="sm">
              Suivi commande
            </Button>
            <Button href="/contact" variant="primary" size="sm">
              Devis gratuit
            </Button>
          </div>

          <button
            type="button"
            aria-label="Ouvrir le menu"
            onClick={() => setMobileOpen(true)}
            className="ml-auto flex h-9 w-9 items-center justify-center rounded-md border md:hidden"
            style={{ borderColor: "var(--color-border)" }}
          >
            <svg width="18" height="14" viewBox="0 0 18 14" fill="none" aria-hidden="true">
              <path d="M0 1h18M0 7h18M0 13h18" stroke="var(--sig-ink)" strokeWidth="1.6" />
            </svg>
          </button>
        </div>
      </div>

      {/* ---- Desktop nav + mega menu ---- */}
      <nav
        ref={navRef}
        className="relative z-20 hidden border-b bg-white md:block"
        style={{ borderColor: "var(--color-border)" }}
      >
        <div className="sig-container flex items-center">
          {CATEGORY_ORDER.map((key) => (
            <div key={key} onClick={(e) => { e.stopPropagation(); setOpenMenu((cur) => (cur === key ? null : key)); }} style={{ cursor: "pointer" }}>
              <span
                className="inline-flex select-none items-center gap-1.5 py-3.5 px-5"
                style={{ fontWeight: 600, fontSize: 13.6, color: openMenu === key ? "var(--sig-ink)" : "var(--text-body)" }}
              >
                {CATS[key].label}
                <span style={{ fontSize: 9 }}>▾</span>
              </span>
            </div>
          ))}
          <span className="flex-1" />
          <Link href="/a-propos" className="py-3.5 px-5" style={{ fontWeight: 600, fontSize: 13.6, color: "var(--text-body)" }}>
            À propos
          </Link>
          <Link href="/contact" className="py-3.5 px-5" style={{ fontWeight: 600, fontSize: 13.6, color: "var(--text-body)" }}>
            Contact
          </Link>
        </div>

        {openMenu && (
          <div
            className="absolute left-0 right-0 top-full bg-white"
            style={{ borderTop: "1px solid var(--color-border)", borderBottom: "1px solid var(--color-border)", boxShadow: "0 24px 40px -28px rgba(13,13,18,0.35)" }}
          >
            <div className="sig-container flex items-start gap-12 py-7">
              <div className="flex flex-1 gap-10">
                {menuData(openMenu).map((group, gi) => (
                  <div key={gi} style={{ minWidth: 180 }}>
                    {group.title && (
                      <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.8px", textTransform: "uppercase", color: "var(--sig-lime-dark)", marginBottom: 12 }}>
                        {group.title}
                      </div>
                    )}
                    <div className={group.title ? "grid grid-cols-2 gap-x-4 gap-y-0.5" : "grid gap-0.5"}>
                      {group.products.map((mp) => (
                        <Link key={mp.href} href={mp.href} className="block py-1.5" style={{ fontSize: 14, fontWeight: 500, color: "var(--text-body)" }}>
                          {mp.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <Link href={`/categorie/${openMenu}`} className="shrink-0">
                <Button variant="primary" size="sm" arrow>
                  Voir toute la gamme
                </Button>
              </Link>
            </div>
          </div>
        )}
      </nav>

      <Marquee />

      {/* ---- Mobile drawer ---- */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-[86%] max-w-sm overflow-y-auto bg-white p-5">
            <div className="mb-5 flex items-center justify-between">
              <Image src="/logo-signela-dark.png" alt="SIGNELA" width={120} height={28} style={{ height: 26, width: "auto" }} />
              <button type="button" aria-label="Fermer le menu" onClick={() => setMobileOpen(false)} className="flex h-9 w-9 items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
                  <path d="M1 1l14 14M15 1L1 15" stroke="var(--sig-ink)" strokeWidth="1.6" />
                </svg>
              </button>
            </div>

            <SearchBar
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") submitSearch(query);
              }}
              className="mb-5"
            />

            <div className="flex flex-col" style={{ borderTop: "1px solid var(--color-border)" }}>
              {CATEGORY_ORDER.map((key) => (
                <div key={key} style={{ borderBottom: "1px solid var(--color-border)" }}>
                  <button
                    type="button"
                    onClick={() => setMobileCat((cur) => (cur === key ? null : key))}
                    className="flex w-full items-center justify-between py-3.5"
                    style={{ fontWeight: 700, fontSize: 15, color: "var(--text-strong)" }}
                  >
                    {CATS[key].label}
                    <span style={{ fontSize: 11, transform: mobileCat === key ? "rotate(180deg)" : undefined }}>▾</span>
                  </button>
                  {mobileCat === key && (
                    <div className="flex flex-col gap-1 pb-4 pl-2">
                      {menuData(key).flatMap((g) => g.products).map((mp) => (
                        <Link key={mp.href} href={mp.href} className="py-1.5" style={{ fontSize: 14, color: "var(--text-body)" }}>
                          {mp.title}
                        </Link>
                      ))}
                      <Link href={`/categorie/${key}`} className="mt-1 py-1.5" style={{ fontSize: 13, fontWeight: 700, color: "var(--sig-lime-dark)" }}>
                        Voir toute la gamme →
                      </Link>
                    </div>
                  )}
                </div>
              ))}
              <Link href="/a-propos" className="py-3.5" style={{ fontWeight: 700, fontSize: 15, color: "var(--text-strong)", borderBottom: "1px solid var(--color-border)" }}>
                À propos
              </Link>
              <Link href="/contact" className="py-3.5" style={{ fontWeight: 700, fontSize: 15, color: "var(--text-strong)", borderBottom: "1px solid var(--color-border)" }}>
                Contact
              </Link>
              <Link href="/suivi" className="py-3.5" style={{ fontWeight: 700, fontSize: 15, color: "var(--text-strong)" }}>
                Suivi de commande
              </Link>
            </div>

            <div className="mt-6 flex flex-col gap-3">
              <Button href="/contact" variant="primary" arrow className="w-full">
                Devis gratuit
              </Button>
              <div style={{ fontSize: 13, color: "var(--text-muted)" }}>📞 01 84 80 12 34</div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
