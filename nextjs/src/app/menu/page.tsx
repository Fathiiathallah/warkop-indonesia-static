"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ShoppingBag, Plus, Check } from "lucide-react";
import { CartProvider, useCart } from "@/context/CartContext";
import CartDrawer from "@/components/CartDrawer";
import Footer from "@/components/Footer";
import { MENU_SERIES_DATA, SeriesItem } from "@/data/seriesCatalog";

function MenuContent() {
  const { addToCart, setIsOpen, totalItems } = useCart();
  const [pages, setPages] = useState<Record<string, number>>({});
  const [added, setAdded] = useState<string | null>(null);

  const add = (item: SeriesItem) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      category: item.category,
      available: true,
      description: item.subtitle,
    });
    setAdded(item.id);
    setTimeout(() => setAdded(null), 1100);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-[var(--line)]">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-[var(--muted)] hover:text-[var(--green)] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Beranda
          </Link>

          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="Warkop Indonesia"
              width={935}
              height={269}
              className="h-8 sm:h-9 w-auto"
            />
          </Link>

          <button
            onClick={() => setIsOpen(true)}
            className="inline-flex items-center gap-2 rounded-lg bg-[var(--green)] hover:bg-[var(--green-dark)] px-3.5 py-2.5 text-white transition-colors"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="text-[0.8rem] font-semibold hidden sm:inline">Pesanan</span>
            {totalItems > 0 && (
              <span className="grid place-items-center min-w-[18px] h-[18px] px-1 rounded-full bg-white text-[var(--green)] text-[11px] font-extrabold tabular-nums">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-6xl mx-auto w-full px-5 sm:px-6 py-12 sm:py-16">
        <span className="eyebrow text-[var(--green)]">Katalog</span>
        <h1 className="mt-3 text-[1.9rem] sm:text-[2.6rem] leading-[1.1] font-extrabold text-[var(--ink)] max-w-xl">
          Semua yang bisa dipesan.
        </h1>
        <p className="mt-3 text-[0.92rem] text-[var(--muted)] max-w-lg">
          Pilih menu, tambahkan ke pesanan, kirim langsung ke WhatsApp kasir.
        </p>

        <div className="mt-12 space-y-14">
          {MENU_SERIES_DATA.map((series) => {
            const page = pages[series.id] ?? 0;
            const items = series.pages[page] ?? series.pages[0];

            return (
              <section key={series.id}>
                <div className="flex items-end justify-between gap-4 pb-4 border-b border-[var(--line)]">
                  <h2 className="text-[1.4rem] sm:text-[1.6rem] font-extrabold text-[var(--ink)]">
                    {series.title}
                  </h2>
                  {series.pages.length > 1 && (
                    <div className="flex items-center gap-2 pb-1">
                      {series.pages.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setPages((p) => ({ ...p, [series.id]: i }))}
                          aria-label={`Halaman ${i + 1}`}
                          className={`h-1.5 rounded-full transition-all ${
                            page === i ? "w-6 bg-[var(--green)]" : "w-1.5 bg-[var(--line)] hover:bg-[var(--muted)]"
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>

                <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {items.map((item) => (
                    <article key={item.id} className="card overflow-hidden flex flex-col group">
                      <div className="relative aspect-[4/3] overflow-hidden bg-[var(--surface)]">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                        />
                      </div>

                      <div className="p-4 flex-1 flex flex-col">
                        <h3 className="text-[0.92rem] font-bold text-[var(--ink)] leading-snug">{item.name}</h3>
                        <p className="mt-1 text-[0.78rem] leading-relaxed text-[var(--muted)] flex-1">{item.subtitle}</p>

                        <div className="mt-3 pt-3 border-t border-[var(--line)] flex items-center justify-between">
                          <span className="text-[0.88rem] font-extrabold text-[var(--ink)] tabular-nums">
                            {item.formattedPrice}
                          </span>
                          <button
                            onClick={() => add(item)}
                            className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[0.75rem] font-bold transition-colors ${
                              added === item.id
                                ? "bg-[var(--green)] text-white"
                                : "border border-[var(--line)] text-[var(--ink)] hover:border-[var(--green)] hover:text-[var(--green)]"
                            }`}
                          >
                            {added === item.id ? (
                              <><Check className="w-3 h-3" /> Masuk</>
                            ) : (
                              <><Plus className="w-3 h-3" /> Pesan</>
                            )}
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </main>

      <Footer />
      <CartDrawer />
    </div>
  );
}

export default function MenuPage() {
  return (
    <CartProvider>
      <MenuContent />
    </CartProvider>
  );
}
