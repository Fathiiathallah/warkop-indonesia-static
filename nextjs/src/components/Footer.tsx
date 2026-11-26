import Image from "next/image";
import Link from "next/link";
import { MapPin, Clock, ArrowUp } from "lucide-react";
import { WARKOP_CONFIG } from "@/lib/config";

export default function Footer() {
  return (
    <footer className="bg-[var(--ink)] text-white mt-auto">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 py-14">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="lg:col-span-2">
            <div className="inline-flex items-center rounded-lg bg-white px-3 py-2">
              <Image
                src="/logo.png"
                alt="Warkop Indonesia"
                width={935}
                height={269}
                className="h-7 w-auto"
              />
            </div>
            <p className="mt-4 max-w-sm text-[0.85rem] leading-relaxed text-white/60">
              Warung kopi di Paropo, Panakkukang. Kopi otentik, makanan khas, dan
              ruang yang selalu terbuka untuk siapa saja.
            </p>
          </div>

          <div>
            <h4 className="text-[0.72rem] font-bold uppercase tracking-wider text-white/40">Halaman</h4>
            <ul className="mt-3 space-y-2 text-[0.85rem] text-white/70">
              {[
                { h: "/#tentang", t: "Tentang" },
                { h: "/#fasilitas", t: "Fasilitas" },
                { h: "/menu", t: "Menu & Pesan" },
                { h: "/#lokasi", t: "Lokasi" },
              ].map((l) => (
                <li key={l.t}>
                  <Link href={l.h} className="hover:text-white transition-colors">{l.t}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[0.72rem] font-bold uppercase tracking-wider text-white/40">Kontak</h4>
            <ul className="mt-3 space-y-2.5 text-[0.85rem] text-white/70">
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0 text-[var(--green)]" />
                <span>{WARKOP_CONFIG.addressShort}</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 shrink-0 text-[var(--green)]" />
                <span>08.00 – 24.00 WITA</span>
              </li>
              <li>
                <a
                  href={`https://wa.me/${WARKOP_CONFIG.phone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-white hover:text-[var(--green)] transition-colors"
                >
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[0.75rem] text-white/40">© 2026 Warkop Indonesia. Hak cipta dilindungi.</p>
          <a href="#" className="inline-flex items-center gap-1.5 text-[0.75rem] text-white/50 hover:text-white transition-colors">
            Kembali ke atas <ArrowUp className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
