"use client";

import { useState, useEffect } from "react";
import { MapPin, Clock, Phone, Navigation, ArrowUpRight } from "lucide-react";
import { WARKOP_CONFIG } from "@/lib/config";

const slots = [
  { range: "08–12", label: "Lengang", pct: 30, start: 8, end: 12 },
  { range: "12–15", label: "Sedang", pct: 60, start: 12, end: 15 },
  { range: "15–18", label: "Ramai", pct: 75, start: 15, end: 18 },
  { range: "18–22", label: "Puncak", pct: 95, start: 18, end: 22 },
  { range: "22–24", label: "Mereda", pct: 45, start: 22, end: 24 },
];

export default function LocationSection() {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    const d = new Date();
    setNow(new Date(d.getTime() + d.getTimezoneOffset() * 60000 + 8 * 3600000).getHours());
  }, []);

  return (
    <section id="lokasi" className="py-16 sm:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        <div className="max-w-xl">
          <span className="eyebrow text-[var(--green)]">Lokasi & Waktu</span>
          <h2 className="mt-3 text-[1.9rem] sm:text-[2.6rem] leading-[1.1] font-extrabold text-[var(--ink)]">
            Mampir ke Warkop Indonesia.
          </h2>
        </div>

        <div className="mt-10 grid lg:grid-cols-5 gap-5">
          {/* info */}
          <div className="lg:col-span-2 card p-6 space-y-6">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-[var(--green-tint)] text-[var(--green)] grid place-items-center shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[0.72rem] font-bold uppercase tracking-wider text-[var(--muted)]">Alamat</p>
                <p className="mt-1 text-[0.88rem] leading-relaxed text-[var(--ink)]">{WARKOP_CONFIG.address}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-[var(--green-tint)] text-[var(--green)] grid place-items-center shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[0.72rem] font-bold uppercase tracking-wider text-[var(--muted)]">Jam operasional</p>
                <p className="mt-1 text-[0.88rem] text-[var(--ink)]">{WARKOP_CONFIG.hours}</p>
                <p className="text-[0.78rem] text-[var(--muted)]">Buka setiap hari termasuk libur nasional</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-[var(--green-tint)] text-[var(--green)] grid place-items-center shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[0.72rem] font-bold uppercase tracking-wider text-[var(--muted)]">WhatsApp</p>
                <a
                  href={`https://wa.me/${WARKOP_CONFIG.phone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-flex items-center gap-1 text-[0.88rem] font-semibold text-[var(--green)] hover:underline"
                >
                  {WARKOP_CONFIG.phoneDisplay} <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            <a
              href={WARKOP_CONFIG.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-lg bg-[var(--green)] hover:bg-[var(--green-dark)] px-5 py-3 text-sm font-semibold text-white transition-colors"
            >
              <Navigation className="w-4 h-4" /> Buka di Google Maps
            </a>
          </div>

          {/* map */}
          <div className="lg:col-span-3 card overflow-hidden">
            <div className="relative w-full h-[300px] sm:h-full min-h-[300px]">
              <iframe
                title="Peta Warkop Indonesia"
                src="https://maps.google.com/maps?q=Jl.+Anggrek+Raya+No.23,+Paropo,+Kec.+Panakkukang,+Kota+Makassar,+Sulawesi+Selatan+90231&t=&z=15&ie=UTF8&iwloc=&output=embed"
                className="absolute inset-0 w-full h-full"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>

        {/* busy hours */}
        <div className="mt-5 card p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h3 className="text-base font-bold text-[var(--ink)]">Indikator jam ramai</h3>
            <p className="text-[0.78rem] text-[var(--muted)]">Estimasi kepadatan berdasarkan jam operasional</p>
          </div>

          <div className="mt-6 grid grid-cols-5 gap-2 sm:gap-4 items-end h-[140px]">
            {slots.map((s) => {
              const active = now !== null && now >= s.start && now < s.end;
              return (
                <div key={s.range} className="flex flex-col justify-end h-full gap-2">
                  <div className="flex-1 flex items-end">
                    <div
                      className={`w-full rounded-t-md transition-colors ${
                        active ? "bg-[var(--green)]" : "bg-[var(--line)]"
                      }`}
                      style={{ height: `${s.pct}%` }}
                    />
                  </div>
                  <div className="text-center">
                    <p className={`text-[0.7rem] font-bold tabular-nums ${active ? "text-[var(--green)]" : "text-[var(--ink)]"}`}>
                      {s.range}
                    </p>
                    <p className="text-[0.65rem] text-[var(--muted)]">{s.label}</p>
                    {active && (
                      <p className="mt-0.5 text-[0.6rem] font-extrabold uppercase tracking-wider text-[var(--green)]">Kini</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-5 pt-4 border-t border-[var(--line)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <p className="text-[0.8rem] text-[var(--muted)]">Mau meja dekat colokan? Datang sebelum jam 15.00.</p>
            <a
              href={`https://wa.me/${WARKOP_CONFIG.phone}?text=Halo%20Warkop%20Indonesia,%20masih%20ada%20meja%20kosong%20sekarang?`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[0.8rem] font-semibold text-[var(--green)] hover:text-[var(--green-dark)]"
            >
              Tanya barista <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
