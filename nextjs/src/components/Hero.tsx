import Image from "next/image";
import Link from "next/link";
import { Clock, MapPin, ArrowRight, Coffee } from "lucide-react";
import { WARKOP_CONFIG } from "@/lib/config";

export default function Hero() {
  return (
    <section className="pt-16 bg-white">
      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center py-14 sm:py-20">
          {/* Copy */}
          <div className="fade-in">
            <span className="eyebrow inline-flex items-center gap-1.5 text-[var(--green)] bg-[var(--green-tint)] px-3 py-1.5 rounded-full">
              <Coffee className="w-3.5 h-3.5" /> Warung Kopi · Panakkukang
            </span>

            <h1 className="mt-5 text-[2.35rem] sm:text-[3.25rem] lg:text-[3.5rem] leading-[1.06] font-extrabold text-[var(--ink)]">
              Ruang santai &<br />
              cita rasa otentik <span className="text-[var(--green)]">Makassar</span>.
            </h1>

            <p className="mt-5 text-[0.95rem] sm:text-base leading-relaxed text-[var(--muted)] max-w-lg">
              Kopi susu racikan warkop, indomie gurih, dan pisang goreng sambel.
              Tempat yang pas untuk nugas, rapat kecil, atau sekadar menunda pulang.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                href="/menu"
                className="inline-flex items-center gap-2 rounded-xl bg-[var(--green)] hover:bg-[var(--green-dark)] px-5 py-3 text-sm font-semibold text-white transition-colors"
              >
                Lihat menu <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={WARKOP_CONFIG.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-[var(--line)] px-5 py-3 text-sm font-semibold text-[var(--ink)] hover:border-[var(--green)] hover:text-[var(--green)] transition-colors"
              >
                <MapPin className="w-4 h-4" /> Petunjuk arah
              </a>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-[0.8rem] text-[var(--muted)]">
              <span className="inline-flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[var(--green)]" /> 08.00 – 24.00 WITA
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[var(--green)]" /> Jl. Anggrek Raya No.23
              </span>
            </div>
          </div>

          {/* Visual */}
          <div className="fade-in d2 relative">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[var(--surface)]">
              <Image
                src="/menu/kopi-susu.jpg"
                alt="Kopi susu Warkop Indonesia"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            <div className="hidden sm:block absolute -bottom-6 -left-6 w-[46%] aspect-square rounded-2xl overflow-hidden border-4 border-white bg-[var(--surface)] shadow-lg">
              <Image
                src="/menu/pisang-goreng.jpg"
                alt="Pisang goreng sambel"
                fill
                sizes="25vw"
                className="object-cover"
              />
            </div>

            <div className="hidden sm:flex absolute -top-4 right-4 items-center gap-2 rounded-xl bg-white px-3.5 py-2.5 shadow-lg border border-[var(--line)]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[0.78rem] font-semibold text-[var(--ink)]">Buka sekarang</span>
            </div>
          </div>
        </div>

        {/* stat strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-[var(--line)] border-y border-[var(--line)]">
          {[
            ["40+", "Menu tersedia"],
            ["16", "Jam buka / hari"],
            ["4.8", "Rating pengunjung"],
            ["2019", "Melayani sejak"],
          ].map(([n, l]) => (
            <div key={l} className="px-4 py-5 text-center">
              <p className="text-xl sm:text-2xl font-extrabold text-[var(--green)] tabular-nums">{n}</p>
              <p className="mt-0.5 text-[0.72rem] sm:text-[0.78rem] text-[var(--muted)]">{l}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
