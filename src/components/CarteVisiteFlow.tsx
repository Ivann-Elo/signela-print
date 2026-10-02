'use client';

// ============================================================
// FICHIER : src/components/CarteVisiteFlow.tsx
// RÔLE    : Parcours commande complet pour les produits configurables.
//           5 étapes : produit → configuration → récap article
//                      → panier → confirmation
//
// UTILISÉ : src/app/produit/[slug]/page.tsx
//
// POUR MODIFIER LES OPTIONS :  tableaux FORMATS, QUANTITES, etc.
// POUR MODIFIER LES PRIX    :  objets BASE_PRIX, *_EXTRA
// ============================================================

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import PricePill from '@/components/ui/PricePill';
import FeatureList from '@/components/ui/FeatureList';
import TrustItem from '@/components/ui/TrustItem';
import ProductCard from '@/components/ui/ProductCard';
import { cardOf, CATS } from '@/lib/data';
import type { Product } from '@/lib/data';

// ─── Types ───────────────────────────────────────────────────

type Format     = 'standard' | 'americain' | 'carre';
type Quantite   = 100 | 250 | 500 | 1000 | 2000 | 5000;
type Impression = 'recto' | 'rv';
type Papier     = 'mat' | 'brillant' | 'recycle';
type Finition   = 'aucune' | 'pellicmat' | 'pellicbrillant';
type Coins      = 'droits' | 'arrondis';
type Delai      = 'standard' | 'express';
type Delivery   = 'address' | 'pickup';
type Step       = 'product' | 'config' | 'item_recap' | 'cart' | 'confirmed';

interface Config {
  format:     Format;
  qty:        Quantite;
  impression: Impression;
  papier:     Papier;
  finition:   Finition;
  coins:      Coins;
  delai:      Delai;
}

interface CartItem {
  id:           string;
  productSlug:  string;
  productTitle: string;
  config:       Config;
  configLabel:  string;
  prix:         number;
}

// ─── Options ─────────────────────────────────────────────────

const FORMATS = [
  { value: 'standard'  as Format, label: 'Standard',  sub: '85 × 54 mm' },
  { value: 'americain' as Format, label: 'Américain', sub: '88 × 50 mm' },
  { value: 'carre'     as Format, label: 'Carré',     sub: '55 × 55 mm' },
];

const QUANTITES = [
  { value: 100  as Quantite, label: '100 ex.'     },
  { value: 250  as Quantite, label: '250 ex.'     },
  { value: 500  as Quantite, label: '500 ex.'     },
  { value: 1000 as Quantite, label: '1 000 ex.'   },
  { value: 2000 as Quantite, label: '2 000 ex.'   },
  { value: 5000 as Quantite, label: '5 000 ex.'   },
];

const IMPRESSIONS = [
  { value: 'recto' as Impression, label: 'Recto',       sub: '1 face imprimée'  },
  { value: 'rv'    as Impression, label: 'Recto-Verso', sub: '2 faces imprimées' },
];

const PAPIERS = [
  { value: 'mat'      as Papier, label: 'Couché mat',     sub: '350 g/m²' },
  { value: 'brillant' as Papier, label: 'Couché brillant',sub: '350 g/m²' },
  { value: 'recycle'  as Papier, label: 'Recyclé',        sub: '300 g/m²' },
];

const FINITIONS = [
  { value: 'aucune'         as Finition, label: 'Sans finition',       sub: 'Aspect naturel'    },
  { value: 'pellicmat'      as Finition, label: 'Pelliculage mat',     sub: 'Toucher doux'      },
  { value: 'pellicbrillant' as Finition, label: 'Pelliculage brillant',sub: 'Couleurs éclatantes'},
];

const COINS_OPTS = [
  { value: 'droits'   as Coins, label: 'Coins droits',   sub: 'Classique'  },
  { value: 'arrondis' as Coins, label: 'Coins arrondis', sub: 'Rayon 3 mm' },
];

const DELAIS = [
  { value: 'standard' as Delai, label: 'Standard', sub: '5 jours ouvrés'       },
  { value: 'express'  as Delai, label: 'Express',  sub: '3 jours ouvrés (+35%)' },
];

const CONFIG_SECTIONS = [
  { title: 'Format',              opts: FORMATS,     key: 'format'     as keyof Config },
  { title: 'Quantité',            opts: QUANTITES,   key: 'qty'        as keyof Config },
  { title: 'Impression',          opts: IMPRESSIONS, key: 'impression' as keyof Config },
  { title: 'Papier',              opts: PAPIERS,     key: 'papier'     as keyof Config },
  { title: 'Finition',            opts: FINITIONS,   key: 'finition'   as keyof Config },
  { title: 'Type de coins',       opts: COINS_OPTS,  key: 'coins'      as keyof Config },
  { title: 'Délai de production', opts: DELAIS,      key: 'delai'      as keyof Config },
];

// ─── Pricing ─────────────────────────────────────────────────

const BASE_PRIX: Record<Quantite, number> = {
  100: 14.90, 250: 19.90, 500: 24.90, 1000: 34.90, 2000: 54.90, 5000: 99.00,
};
const RV_EXTRA: Record<Quantite, number> = {
  100: 4, 250: 6, 500: 8, 1000: 12, 2000: 18, 5000: 35,
};
const PELLIC_MAT_EXTRA: Record<Quantite, number> = {
  100: 8, 250: 10, 500: 14, 1000: 20, 2000: 30, 5000: 55,
};
const PELLIC_BRI_EXTRA: Record<Quantite, number> = {
  100: 6, 250: 8, 500: 12, 1000: 18, 2000: 26, 5000: 48,
};

function calcPrix(c: Config): number {
  let p = BASE_PRIX[c.qty];
  if (c.format === 'americain')        p += 2;
  if (c.format === 'carre')            p += 4;
  if (c.impression === 'rv')           p += RV_EXTRA[c.qty];
  if (c.finition === 'pellicmat')      p += PELLIC_MAT_EXTRA[c.qty];
  if (c.finition === 'pellicbrillant') p += PELLIC_BRI_EXTRA[c.qty];
  if (c.coins === 'arrondis')          p += 5;
  if (c.delai === 'express')           p *= 1.35;
  return Math.round(p * 100) / 100;
}

function fmtEuro(n: number) {
  return n.toFixed(2).replace('.', ',') + ' €';
}

function buildLabel(c: Config): string {
  const fmt = FORMATS.find(f => f.value === c.format)!.label;
  const fin = FINITIONS.find(f => f.value === c.finition)!.label;
  const pap = PAPIERS.find(p => p.value === c.papier)!.label;
  return [
    `${c.qty.toLocaleString('fr-FR')} ex.`,
    `Format ${fmt}`,
    c.impression === 'rv' ? 'Recto-Verso' : 'Recto',
    pap,
    c.finition !== 'aucune' ? fin : null,
    c.coins === 'arrondis' ? 'Coins arrondis' : null,
    c.delai === 'express' ? 'Express 3j' : 'Standard 5j',
  ].filter(Boolean).join(' · ');
}

// ─── Cart hook (localStorage) ────────────────────────────────

const CART_KEY = 'signela-cart';

function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(CART_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
  }, []);

  const persist = (next: CartItem[]) => {
    setItems(next);
    try { localStorage.setItem(CART_KEY, JSON.stringify(next)); } catch {}
  };

  return {
    items,
    total: items.reduce((s, i) => s + i.prix, 0),
    addItem:    (item: CartItem)         => persist([...items, item]),
    removeItem: (id: string)             => persist(items.filter(i => i.id !== id)),
    updateItem: (id: string, u: CartItem)=> persist(items.map(i => i.id === id ? u : i)),
    clearCart:  ()                       => persist([]),
  };
}

// ─── Shared UI atoms ─────────────────────────────────────────

function EyebrowLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontWeight: 700, fontSize: 11.5, letterSpacing: '0.9px', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 8 }}>
      {children}
    </div>
  );
}

function Chip({ active, onClick, label, sub }: {
  active: boolean; onClick: () => void; label: string; sub?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
        padding: sub ? '9px 15px' : '9px 15px',
        fontSize: 13, fontWeight: active ? 700 : 500, lineHeight: 1.3,
        borderRadius: 'var(--radius-md)',
        border: active ? '2px solid var(--sig-ink)' : '1.5px solid var(--color-border)',
        background: active ? 'var(--sig-lime)' : '#fff',
        color: 'var(--text-strong)', cursor: 'pointer',
        transition: 'border-color .1s, background .1s',
      }}
    >
      <span>{label}</span>
      {sub && (
        <span style={{ fontSize: 11, fontWeight: 400, color: active ? 'var(--sig-ink)' : 'var(--text-muted)', marginTop: 1 }}>
          {sub}
        </span>
      )}
    </button>
  );
}

function StickyImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="hidden md:block" style={{ position: 'sticky', top: 92 }}>
      <div
        className="relative overflow-hidden"
        style={{ height: 420, border: '1px solid var(--color-border)', borderRadius: 12, background: 'var(--sig-zinc-100)' }}
      >
        <Image src={src} alt={alt} fill sizes="50vw" style={{ objectFit: 'cover' }} />
      </div>
    </div>
  );
}

function PrimaryBtn({ onClick, children, disabled = false }: {
  onClick?: () => void; children: React.ReactNode; disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        padding: '13px 28px', fontSize: 15, fontWeight: 800, letterSpacing: '0.3px',
        borderRadius: 'var(--radius-md)',
        background: disabled ? 'var(--sig-gray-200)' : 'var(--action-primary)',
        color: disabled ? 'var(--text-muted)' : 'var(--text-on-lime)',
        border: 'none', cursor: disabled ? 'not-allowed' : 'pointer',
      }}
    >
      {children}
    </button>
  );
}

function GhostBtn({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        padding: '10px 18px', fontSize: 13, fontWeight: 600,
        borderRadius: 'var(--radius-md)', background: 'transparent',
        color: 'var(--text-muted)', border: '1px solid var(--color-border)', cursor: 'pointer',
      }}
    >
      {children}
    </button>
  );
}

// ─── Main component ───────────────────────────────────────────

export default function CarteVisiteFlow({ product, related }: {
  product: Product;
  related: Product[];
}) {
  const router = useRouter();
  const cat = CATS[product.cat];

  const [step, setStep] = useState<Step>('product');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [delivery, setDelivery] = useState<Delivery>('pickup');
  const [orderLoading, setOrderLoading] = useState(false);
  const [orderError, setOrderError] = useState('');

  // snapshot cart items + total at confirmation so we can clear the cart
  const [confirmedItems, setConfirmedItems] = useState<CartItem[]>([]);
  const [confirmedTotal, setConfirmedTotal] = useState(0);
  const [orderNumber, setOrderNumber] = useState('');

  const [config, setConfig] = useState<Config>({
    format: 'standard', qty: 500, impression: 'rv',
    papier: 'mat', finition: 'aucune', coins: 'droits', delai: 'standard',
  });

  const cart = useCart();
  const prix = calcPrix(config);
  const set = <K extends keyof Config>(k: K, v: Config[K]) => setConfig(c => ({ ...c, [k]: v }));

  const goToConfig = (id?: string) => {
    if (id) {
      const item = cart.items.find(i => i.id === id);
      if (item) setConfig(item.config);
      setEditingId(id);
    } else {
      setEditingId(null);
    }
    setStep('config');
  };

  const handlePasserCommande = async () => {
    setOrderError('');
    setOrderLoading(true);

    // Check auth
    const meRes = await fetch('/api/auth/me');
    if (meRes.status === 401) {
      setOrderLoading(false);
      router.push('/compte/connexion?next=' + encodeURIComponent('/produit/' + product.slug));
      return;
    }

    const res = await fetch('/api/commandes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ articles: cart.items }),
    });

    const data = await res.json();
    setOrderLoading(false);

    if (!res.ok) {
      setOrderError(data.error ?? 'Erreur lors de la commande.');
      return;
    }

    setConfirmedItems([...cart.items]);
    setConfirmedTotal(cart.total);
    setOrderNumber(data.numero);
    cart.clearCart();
    setStep('confirmed');
  };

  // ── Step: product ──────────────────────────────────────────
  if (step === 'product') {
    return (
      <>
        <section style={{ background: '#fff' }}>
          <div className="sig-container grid grid-cols-1 items-start gap-10 py-10 md:grid-cols-2 md:gap-14 md:py-12">
            <div
              className="relative h-[300px] overflow-hidden md:h-[460px]"
              style={{ border: '1px solid var(--color-border)', borderRadius: 12, background: 'var(--sig-zinc-100)' }}
            >
              <Image src={`/images/${product.img}`} alt={product.title} fill sizes="(max-width: 768px) 100vw, 50vw" style={{ objectFit: 'cover' }} priority />
            </div>
            <div>
              <div style={{ fontWeight: 600, fontSize: 12, letterSpacing: '0.6px', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 10 }}>
                {cat.label}
              </div>
              <h1 className="text-[32px] md:text-[40px]" style={{ margin: '0 0 10px', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.8px', color: 'var(--text-strong)' }}>
                {product.title}
              </h1>
              <p style={{ margin: '0 0 20px', fontSize: 17, lineHeight: 1.5, color: 'var(--text-body)' }}>{product.tagline}</p>
              <PricePill>À PARTIR DE {product.price} H.T {product.unit}</PricePill>
              <p style={{ margin: '22px 0 24px', fontSize: 15, lineHeight: 1.7, color: 'var(--text-muted)' }}>{product.desc}</p>
              <FeatureList items={product.adv} marker="check" />
              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  onClick={() => goToConfig()}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    padding: '14px 32px', fontSize: 16, fontWeight: 800, letterSpacing: '0.4px',
                    borderRadius: 'var(--radius-md)', background: 'var(--action-primary)', color: 'var(--text-on-lime)',
                    border: 'none', cursor: 'pointer',
                  }}
                >
                  <span>Configurer</span>
                  <span aria-hidden>→</span>
                </button>
                <Link href="/contact" style={{
                  display: 'inline-flex', alignItems: 'center', padding: '14px 32px',
                  fontSize: 16, fontWeight: 600, borderRadius: 'var(--radius-md)',
                  background: 'transparent', color: 'var(--text-strong)',
                  border: '1px solid var(--color-border)', textDecoration: 'none',
                }}>
                  Nous contacter
                </Link>
              </div>
              <div className="mt-7 flex flex-wrap gap-6 pt-6" style={{ borderTop: '1px solid var(--color-border)' }}>
                <TrustItem icon="✓" label="Imprimé en France" sub="Atelier local" />
                <TrustItem icon="✓" label="BAT gratuit" sub="Bon à tirer validé" />
                <TrustItem icon="✓" label="Devis 24h" sub="Réponse rapide" />
              </div>
            </div>
          </div>
        </section>

        {related.length > 0 && (
          <section style={{ background: 'var(--sig-zinc-100)' }}>
            <div className="sig-container py-10 md:py-14">
              <h2 className="flex items-center" style={{ margin: '0 0 28px', fontWeight: 900, fontSize: 24, letterSpacing: '-0.3px', color: 'var(--text-strong)' }}>
                <span style={{ width: 12, height: 12, background: 'var(--sig-ink)', display: 'inline-block', borderRadius: 2, marginRight: 10 }} />
                Dans la même gamme
              </h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {related.map(rp => <ProductCard key={rp.slug} {...cardOf(rp)} />)}
              </div>
            </div>
          </section>
        )}
      </>
    );
  }

  // ── Step: config ───────────────────────────────────────────
  if (step === 'config') {
    return (
      <section style={{ background: '#fff' }}>
        <div className="sig-container grid grid-cols-1 items-start gap-8 py-10 md:grid-cols-2 md:gap-12 md:py-12">
          {/* Left — sticky image */}
          <StickyImage src={`/images/${product.img}`} alt={product.title} />

          {/* Right — panneau fixe, contenu scrollable */}
          <div
            className="hidden md:flex"
            style={{
              position: 'sticky',
              top: 92,
              height: 'calc(100vh - 112px)',
              flexDirection: 'column',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-xl)',
              background: '#fff',
              overflow: 'hidden',
            }}
          >
            {/* Zone scrollable */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '24px 24px 0' }}>
              <EyebrowLabel>Configurateur produit</EyebrowLabel>
              <h2 style={{ margin: '0 0 4px', fontWeight: 900, fontSize: 24, letterSpacing: '-0.5px', color: 'var(--text-strong)' }}>
                {product.title}
              </h2>
              <p style={{ margin: '0 0 20px', fontSize: 13.5, color: 'var(--text-muted)', lineHeight: 1.5 }}>{product.tagline}</p>

              {CONFIG_SECTIONS.map(({ title, opts, key }) => (
                <div key={title} style={{ marginBottom: 18 }}>
                  <EyebrowLabel>{title}</EyebrowLabel>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                    {opts.map(o => (
                      <Chip
                        key={String(o.value)}
                        active={config[key] === o.value}
                        onClick={() => set(key, o.value as Config[typeof key])}
                        label={o.label}
                        sub={'sub' in o ? o.sub : undefined}
                      />
                    ))}
                  </div>
                </div>
              ))}

              {/* Espace de respiration avant le footer */}
              <div style={{ height: 12 }} />
            </div>

            {/* Footer fixe : prix + boutons */}
            <div style={{ padding: '16px 24px', borderTop: '1px solid var(--color-border)', background: '#fff', flexShrink: 0 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 14 }}>
                <span style={{ fontSize: 30, fontWeight: 900, color: 'var(--text-strong)', letterSpacing: '-1px', lineHeight: 1 }}>
                  {fmtEuro(prix)}
                </span>
                <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>H.T.</span>
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <PrimaryBtn onClick={() => setStep('item_recap')}>
                  <span>Valider la configuration</span>
                  <span aria-hidden>→</span>
                </PrimaryBtn>
                <GhostBtn onClick={() => editingId ? setStep('cart') : setStep('product')}>
                  ← Retour
                </GhostBtn>
              </div>
            </div>
          </div>

          {/* Version mobile (pas de panneau fixe) */}
          <div className="md:hidden">
            <EyebrowLabel>Configurateur produit</EyebrowLabel>
            <h2 style={{ margin: '0 0 4px', fontWeight: 900, fontSize: 22, letterSpacing: '-0.5px', color: 'var(--text-strong)' }}>
              {product.title}
            </h2>
            <p style={{ margin: '0 0 20px', fontSize: 13.5, color: 'var(--text-muted)', lineHeight: 1.5 }}>{product.tagline}</p>

            {CONFIG_SECTIONS.map(({ title, opts, key }) => (
              <div key={title} style={{ marginBottom: 18 }}>
                <EyebrowLabel>{title}</EyebrowLabel>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                  {opts.map(o => (
                    <Chip
                      key={String(o.value)}
                      active={config[key] === o.value}
                      onClick={() => set(key, o.value as Config[typeof key])}
                      label={o.label}
                      sub={'sub' in o ? o.sub : undefined}
                    />
                  ))}
                </div>
              </div>
            ))}

            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, margin: '4px 0 20px', paddingTop: 16, borderTop: '1px solid var(--color-border)' }}>
              <span style={{ fontSize: 30, fontWeight: 900, color: 'var(--text-strong)', letterSpacing: '-1px', lineHeight: 1 }}>
                {fmtEuro(prix)}
              </span>
              <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>H.T.</span>
            </div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <PrimaryBtn onClick={() => setStep('item_recap')}>
                <span>Valider la configuration</span>
                <span aria-hidden>→</span>
              </PrimaryBtn>
              <GhostBtn onClick={() => editingId ? setStep('cart') : setStep('product')}>
                ← Retour
              </GhostBtn>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ── Step: item_recap ───────────────────────────────────────
  if (step === 'item_recap') {
    const label = buildLabel(config);
    const lines = label.split(' · ');

    const handleAdd = () => {
      const item: CartItem = {
        id: editingId ?? Date.now().toString(),
        productSlug: product.slug,
        productTitle: product.title,
        config,
        configLabel: label,
        prix,
      };
      if (editingId) {
        cart.updateItem(editingId, item);
        setEditingId(null);
      } else {
        cart.addItem(item);
      }
      setStep('cart');
    };

    return (
      <section style={{ background: '#fff' }}>
        <div className="sig-container grid grid-cols-1 items-start gap-8 py-10 md:grid-cols-2 md:gap-12 md:py-12">
          {/* Left — sticky image */}
          <StickyImage src={`/images/${product.img}`} alt={product.title} />

          {/* Right — recap */}
          <div>
            <EyebrowLabel>confirmation de commande</EyebrowLabel>
            <h2 style={{ margin: '0 0 24px', fontWeight: 900, fontSize: 26, letterSpacing: '-0.5px', color: 'var(--text-strong)' }}>
              {product.title}
            </h2>

            {/* Config box */}
            <div style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-xl)', padding: '20px 24px', marginBottom: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, paddingBottom: 16, borderBottom: '1px solid var(--color-border)' }}>
                <span style={{ fontWeight: 700, fontSize: 15, color: 'var(--text-strong)' }}>Votre configuration</span>
                <span style={{ fontWeight: 900, fontSize: 22, color: 'var(--text-strong)', letterSpacing: '-0.5px' }}>
                  {fmtEuro(prix)} H.T.
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                {lines.map((line, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: 'var(--text-body)' }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--sig-lime)', border: '1px solid var(--sig-lime-dark)', flexShrink: 0 }} />
                    {line}
                  </div>
                ))}
              </div>
            </div>

            <PrimaryBtn onClick={handleAdd}>
              <span>{editingId ? 'Mettre à jour la commande' : 'Ajouter à la commande'}</span>
              <span aria-hidden>→</span>
            </PrimaryBtn>

            <div style={{ marginTop: 14 }}>
              <GhostBtn onClick={() => setStep('config')}>
                ← Modifier la configuration
              </GhostBtn>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ── Step: cart ─────────────────────────────────────────────
  if (step === 'cart') {
    return (
      <>
        <section style={{ background: '#fff' }}>
          <div className="sig-container py-10 md:py-12">
            <EyebrowLabel>Résumé</EyebrowLabel>
            <h2 style={{ margin: '0 0 28px', fontWeight: 900, fontSize: 28, letterSpacing: '-0.6px', color: 'var(--text-strong)' }}>
              Commande en cours
            </h2>

            {/* Table */}
            <div style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-xl)', overflow: 'hidden', marginBottom: 8 }}>
              {/* Header */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 100px 120px 44px', gap: 12, padding: '14px 20px', background: 'var(--sig-ink)' }}>
                {['Désignation', 'Quantité', 'Prix', ''].map(h => (
                  <div key={h} style={{ fontWeight: 700, fontSize: 13, color: '#fff' }}>{h}</div>
                ))}
              </div>

              {/* Rows */}
              {cart.items.length === 0 && (
                <div style={{ padding: '32px 20px', textAlign: 'center', fontSize: 14, color: 'var(--text-muted)' }}>
                  Votre commande est vide.
                </div>
              )}
              {cart.items.map(item => (
                <div
                  key={item.id}
                  style={{ display: 'grid', gridTemplateColumns: '1fr 100px 120px 44px', gap: 12, padding: '16px 20px', borderTop: '1px solid var(--color-border)', alignItems: 'center' }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                    {item.productSlug === product.slug ? (
                      <button
                        onClick={() => goToConfig(item.id)}
                        title="Modifier"
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: '2px 0', fontSize: 15, lineHeight: 1, marginTop: 1 }}
                      >
                        ⚙
                      </button>
                    ) : (
                      <span style={{ width: 19 }} />
                    )}
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--text-strong)' }}>{item.productTitle}</div>
                      <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 3, lineHeight: 1.4 }}>{item.configLabel}</div>
                    </div>
                  </div>
                  <div style={{ fontSize: 14, color: 'var(--text-body)', textAlign: 'center' }}>
                    {item.config.qty.toLocaleString('fr-FR')}
                  </div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-strong)', textAlign: 'right' }}>
                    {fmtEuro(item.prix)}
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <button
                      onClick={() => cart.removeItem(item.id)}
                      title="Supprimer"
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--sig-sale)', fontSize: 15, lineHeight: 1, padding: 4 }}
                    >
                      🗑
                    </button>
                  </div>
                </div>
              ))}

              {/* Footer total */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 100px 120px 44px', gap: 12, padding: '14px 20px', background: 'var(--sig-zinc-100)', borderTop: '1px solid var(--color-border)' }}>
                <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>
                  Total de articles : <strong style={{ color: 'var(--text-strong)' }}>{cart.items.length}</strong>
                </div>
                <div />
                <div style={{ fontWeight: 900, fontSize: 16, color: 'var(--text-strong)', textAlign: 'right' }}>
                  {fmtEuro(cart.total)} *
                </div>
                <div />
              </div>
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 32 }}>* hors frais de livraison</div>

            {/* Mode de réception */}
            <div style={{ marginBottom: 36 }}>
              <div style={{ fontWeight: 800, fontSize: 16, color: 'var(--text-strong)', marginBottom: 14, textAlign: 'center' }}>
                Mode de réception
              </div>
              <div style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-xl)', display: 'flex', overflow: 'hidden' }}>
                {[
                  { value: 'address' as Delivery, label: 'Adresse du compte client' },
                  { value: 'pickup'  as Delivery, label: 'Retrait à l\'atelier'      },
                ].map((opt, i) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setDelivery(opt.value)}
                    style={{
                      flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                      padding: '16px 20px', background: 'transparent',
                      borderLeft: i > 0 ? '1px solid var(--color-border)' : 'none',
                      border: 'none', cursor: 'pointer',
                      fontWeight: delivery === opt.value ? 700 : 500, fontSize: 14, color: 'var(--text-strong)',
                    }}
                  >
                    <span style={{
                      width: 14, height: 14, borderRadius: '50%', flexShrink: 0,
                      border: `2px solid ${delivery === opt.value ? 'var(--sig-ink)' : 'var(--sig-gray-400)'}`,
                      background: delivery === opt.value ? 'var(--sig-lime)' : 'transparent',
                    }} />
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            {orderError && (
              <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 8, padding: '10px 14px', color: '#dc2626', fontSize: 14, marginBottom: 16, textAlign: 'center' }}>
                {orderError}
              </div>
            )}
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => setStep('product')}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '13px 28px', fontSize: 15, fontWeight: 700,
                  borderRadius: 'var(--radius-md)', background: 'var(--action-primary)', color: 'var(--text-on-lime)',
                  border: 'none', cursor: 'pointer',
                }}
              >
                Continuer la commande
              </button>
              <button
                type="button"
                onClick={handlePasserCommande}
                disabled={cart.items.length === 0 || orderLoading}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '13px 28px', fontSize: 15, fontWeight: 700,
                  borderRadius: 'var(--radius-md)',
                  background: cart.items.length > 0 && !orderLoading ? 'var(--action-dark)' : 'var(--sig-gray-200)',
                  color: cart.items.length > 0 && !orderLoading ? '#fff' : 'var(--text-muted)',
                  border: 'none', cursor: cart.items.length > 0 && !orderLoading ? 'pointer' : 'not-allowed',
                }}
              >
                {orderLoading ? 'Traitement…' : 'Passer la commande →'}
              </button>
            </div>
          </div>
        </section>

        {/* Autre gamme */}
        {related.length > 0 && (
          <section style={{ background: 'var(--sig-zinc-100)' }}>
            <div className="sig-container py-10 md:py-14">
              <h2 className="flex items-center" style={{ margin: '0 0 28px', fontWeight: 900, fontSize: 24, letterSpacing: '-0.3px', color: 'var(--text-strong)' }}>
                <span style={{ width: 12, height: 12, background: 'var(--sig-ink)', display: 'inline-block', borderRadius: 2, marginRight: 10 }} />
                Autre gamme
              </h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {related.map(rp => <ProductCard key={rp.slug} {...cardOf(rp)} />)}
              </div>
            </div>
          </section>
        )}
      </>
    );
  }

  // ── Step: confirmed ────────────────────────────────────────
  const STEPS = [
    'Commande passée',
    'BAT validé',
    'Paiement effectué',
    'Commande en cours de réalisation',
    delivery === 'pickup' ? 'Commande prête en atelier' : 'Commande envoyée',
  ];

  return (
    <section style={{ background: '#fff' }}>
      <div className="sig-container grid grid-cols-1 items-start gap-8 py-10 md:grid-cols-2 md:gap-12 md:py-12">
        {/* Left — sticky image + mini recap */}
        <div className="hidden md:block" style={{ position: 'sticky', top: 92 }}>
          <div className="relative overflow-hidden mb-6" style={{ height: 260, border: '1px solid var(--color-border)', borderRadius: 12, background: 'var(--sig-zinc-100)' }}>
            <Image src={`/images/${product.img}`} alt={product.title} fill sizes="50vw" style={{ objectFit: 'cover' }} />
          </div>

          {/* Mini recap */}
          <div style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-xl)', padding: '18px 20px' }}>
            <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 12, color: 'var(--text-strong)' }}>
              Récapitulatif de la commande
            </div>
            {confirmedItems.map(item => (
              <div key={item.id} style={{ fontSize: 13, color: 'var(--text-body)', marginBottom: 4 }}>
                {item.productTitle} — {item.config.qty.toLocaleString('fr-FR')} ex.
              </div>
            ))}
            <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid var(--color-border)', display: 'flex', justifyContent: 'flex-end' }}>
              <span style={{ fontWeight: 900, fontSize: 22, color: 'var(--text-strong)', letterSpacing: '-0.5px' }}>
                {fmtEuro(confirmedTotal)}
              </span>
            </div>
            <div style={{ marginTop: 8, fontSize: 12.5, color: 'var(--text-muted)' }}>
              {delivery === 'pickup' ? '📍 Retrait à l\'atelier' : '🚚 Livraison à votre adresse'}
            </div>
          </div>
        </div>

        {/* Right — confirmation */}
        <div>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 6 }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--sig-lime)', border: '2px solid var(--sig-ink)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0, marginTop: 2 }}>
              ✓
            </div>
            <div>
              <h2 style={{ margin: 0, fontWeight: 900, fontSize: 24, color: 'var(--text-strong)' }}>
                Commande réalisée
              </h2>
              <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 4 }}>
                Numéro de commande : <strong style={{ color: 'var(--text-strong)' }}>{orderNumber}</strong>
              </div>
            </div>
          </div>

          <div style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-xl)', padding: 24, margin: '24px 0' }}>
            <EyebrowLabel>Fichiers &amp; prochaines étapes</EyebrowLabel>
            <p style={{ margin: '0 0 20px', fontSize: 14.5, lineHeight: 1.7, color: 'var(--text-body)' }}>
              Après avoir passé la commande, notre équipe vous contactera afin de valider avec vous les fichiers nécessaires à la production.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {STEPS.map((label, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 14 }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: i === 0 ? 'var(--sig-lime)' : 'var(--sig-zinc-100)',
                    border: i === 0 ? '2px solid var(--sig-ink)' : '1px solid var(--color-border)',
                    fontSize: 11, fontWeight: 800,
                    color: i === 0 ? 'var(--sig-ink)' : 'var(--text-muted)',
                  }}>
                    {i === 0 ? '✓' : i + 1}
                  </div>
                  <span style={{ fontWeight: i === 0 ? 700 : 400, color: i === 0 ? 'var(--text-strong)' : 'var(--text-muted)' }}>
                    Étape {i + 1} : {label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Link
              href="/compte/commandes"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: '13px 24px', fontSize: 14, fontWeight: 800,
                borderRadius: 'var(--radius-md)', background: 'var(--action-primary)', color: 'var(--text-on-lime)',
                textDecoration: 'none',
              }}
            >
              Mon espace client
            </Link>
            <Link
              href="/"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: '13px 24px', fontSize: 14, fontWeight: 700,
                borderRadius: 'var(--radius-md)', background: 'var(--action-dark)', color: '#fff',
                textDecoration: 'none',
              }}
            >
              Retour à l&apos;accueil
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
