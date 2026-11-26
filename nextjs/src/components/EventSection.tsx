"use client";

import { useState } from "react";
import {
  CalendarDays,
  Users,
  Paintbrush,
  Music,
  Presentation,
  PartyPopper,
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react";
import { WARKOP_CONFIG } from "@/lib/config";

const eventTypes = [
  { icon: Paintbrush, label: "Pameran seni" },
  { icon: Music, label: "Live music" },
  { icon: Presentation, label: "Workshop / talkshow" },
  { icon: PartyPopper, label: "Gathering komunitas" },
];

export default function EventSection() {
  const [name, setName] = useState("");
  const [wa, setWa] = useState("");
  const [eventType, setEventType] = useState("Pameran seni");
  const [date, setDate] = useState("");
  const [people, setPeople] = useState("");
  const [note, setNote] = useState("");
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !wa.trim() || !date.trim()) return;

    const msg = [
      "🎪 *PENGAJUAN EVENT — WARKOP INDONESIA*",
      "─────────────────────────",
      `*Nama / Komunitas:* ${name.trim()}`,
      `*WhatsApp:* ${wa.trim()}`,
      `*Jenis acara:* ${eventType}`,
      `*Tanggal rencana:* ${date.trim()}`,
      `*Estimasi peserta:* ${people.trim() || "-"}`,
      note.trim() ? `\n*Catatan:* ${note.trim()}` : "",
      "\n_Mohon info ketersediaan tempat & biaya. Terima kasih!_",
    ]
      .filter(Boolean)
      .join("\n");

    window.open(
      `https://wa.me/${WARKOP_CONFIG.phone}?text=${encodeURIComponent(msg)}`,
      "_blank"
    );
    setSent(true);
  };

  const inputCls =
    "w-full rounded-lg border border-[var(--line)] px-3.5 py-3 text-[0.88rem] text-[var(--ink)] placeholder:text-[var(--muted)]/60 focus:outline-none focus:border-[var(--green)] focus:ring-2 focus:ring-[var(--green)]/10 transition-colors";

  return (
    <section id="event" className="py-16 sm:py-24 bg-[var(--surface)]">
      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        <div className="max-w-xl">
          <span className="eyebrow text-[var(--green)]">Event & Kolaborasi</span>
          <h2 className="mt-3 text-[1.9rem] sm:text-[2.6rem] leading-[1.1] font-extrabold text-[var(--ink)]">
            Punya acara? Pakai tempat kami.
          </h2>
          <p className="mt-3 text-[0.92rem] leading-relaxed text-[var(--muted)]">
            Warkop Indonesia rutin jadi ruang pameran lukisan, workshop kecil,
            dan gathering komunitas. Ajukan tanggalmu, kami cek ketersediaan.
          </p>
        </div>

        <div className="mt-10 grid lg:grid-cols-5 gap-5">
          {/* left: what we host */}
          <div className="lg:col-span-2 space-y-3">
            {eventTypes.map((t) => {
              const Icon = t.icon;
              return (
                <div
                  key={t.label}
                  className="flex items-center gap-3 rounded-xl border border-[var(--line)] bg-white px-4 py-3.5"
                >
                  <div className="w-8 h-8 rounded-lg bg-[var(--green-tint)] text-[var(--green)] grid place-items-center shrink-0">
                    <Icon className="w-4 h-4" strokeWidth={1.9} />
                  </div>
                  <span className="text-[0.88rem] font-semibold text-[var(--ink)]">
                    {t.label}
                  </span>
                </div>
              );
            })}

            <div className="rounded-xl bg-[var(--green)] text-white p-4 mt-4">
              <p className="text-[0.78rem] leading-relaxed text-white/85">
                Kapasitas indoor ±40 orang. Untuk acara lebih besar, kami bisa
                pakai area parkir & teras.
              </p>
            </div>
          </div>

          {/* right: form */}
          <div className="lg:col-span-3 card bg-white p-6 sm:p-7">
            {sent ? (
              <div className="h-full flex flex-col items-center justify-center text-center gap-3 py-10">
                <CheckCircle2 className="w-10 h-10 text-[var(--green)]" strokeWidth={1.6} />
                <h3 className="text-base font-extrabold text-[var(--ink)]">
                  Pengajuan terkirim
                </h3>
                <p className="text-[0.85rem] text-[var(--muted)] max-w-[34ch]">
                  WhatsApp sudah terbuka dengan detail acaramu. Kami balas
                  maksimal 1x24 jam.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="mt-2 rounded-lg border border-[var(--line)] px-4 py-2 text-[0.78rem] font-bold text-[var(--ink)] hover:border-[var(--green)] hover:text-[var(--green)] transition-colors"
                >
                  Ajukan lagi
                </button>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b border-[var(--line)]">
                  <CalendarDays className="w-4 h-4 text-[var(--green)]" />
                  <span className="text-[0.72rem] font-bold uppercase tracking-wider text-[var(--muted)]">
                    Form pengajuan event
                  </span>
                </div>

                <div className="grid sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-[0.74rem] font-bold text-[var(--ink)] mb-1.5">
                      Nama / komunitas *
                    </label>
                    <input
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Nama kamu atau komunitas"
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className="block text-[0.74rem] font-bold text-[var(--ink)] mb-1.5">
                      WhatsApp *
                    </label>
                    <input
                      required
                      type="tel"
                      value={wa}
                      onChange={(e) => setWa(e.target.value)}
                      placeholder="08xx xxxx xxxx"
                      className={inputCls}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[0.74rem] font-bold text-[var(--ink)] mb-1.5">
                    Jenis acara
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {eventTypes.map((t) => (
                      <button
                        key={t.label}
                        type="button"
                        onClick={() => setEventType(t.label)}
                        className={`rounded-lg border py-2.5 text-[0.78rem] font-semibold transition-colors ${
                          eventType === t.label
                            ? "border-[var(--green)] bg-[var(--green-tint)] text-[var(--green)]"
                            : "border-[var(--line)] text-[var(--muted)] hover:border-[var(--green)]"
                        }`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-[0.74rem] font-bold text-[var(--ink)] mb-1.5">
                      Tanggal rencana *
                    </label>
                    <input
                      required
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className="block text-[0.74rem] font-bold text-[var(--ink)] mb-1.5">
                      Estimasi peserta
                    </label>
                    <div className="relative">
                      <Users className="w-4 h-4 text-[var(--muted)] absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="number"
                        min="1"
                        value={people}
                        onChange={(e) => setPeople(e.target.value)}
                        placeholder="30"
                        className={`${inputCls} pl-10`}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[0.74rem] font-bold text-[var(--ink)] mb-1.5">
                    Detail acara
                  </label>
                  <textarea
                    rows={3}
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Ceritakan singkat acaramu: tema pameran, kebutuhan sound, dsb."
                    className={`${inputCls} resize-none`}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--green)] hover:bg-[var(--green-dark)] py-3.5 text-sm font-bold text-white transition-colors"
                >
                  Kirim pengajuan via WhatsApp
                  <ArrowUpRight className="w-4 h-4" />
                </button>
                <p className="text-[0.7rem] text-center text-[var(--muted)]">
                  Data hanya dipakai untuk konfirmasi ketersediaan jadwal.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
