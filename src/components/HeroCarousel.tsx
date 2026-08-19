"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Badge from "@/components/ui/Badge";
import PricePill from "@/components/ui/PricePill";
import FeatureList from "@/components/ui/FeatureList";
import Button from "@/components/ui/Button";
import { HERO } from "@/lib/data";

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % HERO.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const slide = HERO[index];

  return (
    <section style={{ background: "var(--sig-navy)" }}>
      <div className="sig-container grid grid-cols-1 items-center gap-10 py-10 md:grid-cols-2 md:gap-14 md:py-12">
        <div className="relative h-[260px] overflow-hidden md:h-[400px]" style={{ borderRadius: 12, background: "var(--sig-ink)" }}>
          <Image src={slide.image} alt={slide.title} fill sizes="(max-width: 768px) 100vw, 50vw" style={{ objectFit: "cover" }} priority />
        </div>
        <div>
          <Badge>{slide.badge}</Badge>
          <h1
            className="text-[36px] md:text-[56px]"
            style={{ margin: "16px 0 4px", fontWeight: 900, lineHeight: 1, letterSpacing: "-1.12px", color: "#fff" }}
          >
            {slide.title}
          </h1>
          <div
            className="text-[18px] md:text-[24px]"
            style={{ fontWeight: 400, lineHeight: 1.4, letterSpacing: "0.24px", color: "rgba(255,255,255,0.75)", marginBottom: 20 }}
          >
            {slide.subtitle}
          </div>
          <PricePill>{slide.price}</PricePill>
          <div style={{ margin: "24px 0 32px" }}>
            <FeatureList items={slide.features} marker="bullet" onDark />
          </div>
          <Button href={`/produit/${slide.slug}`} variant="primary" arrow>
            Découvrir ce produit
          </Button>
          <div className="mt-8 flex gap-2">
            {HERO.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Diapositive ${i + 1}`}
                onClick={() => setIndex(i)}
                style={{
                  height: 8,
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  borderRadius: 4,
                  transition: "width .2s ease, background .2s ease",
                  width: i === index ? 22 : 8,
                  background: i === index ? "var(--sig-lime)" : "rgba(255,255,255,0.3)",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
