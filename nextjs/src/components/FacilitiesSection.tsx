import { Wifi, Zap, Flame, Compass, Car, Users } from "lucide-react";

const facilities = [
  { icon: Wifi, title: "Wi-Fi kencang", desc: "Stabil untuk nugas, kerja remote, atau sekadar scrolling." },
  { icon: Zap, title: "Stopkontak di meja", desc: "Hampir setiap meja punya colokan. Baterai aman." },
  { icon: Flame, title: "Area smoking", desc: "Sirkulasi terbuka khas warkop Makassar." },
  { icon: Compass, title: "Buka sampai 24.00", desc: "Dari kopi pembuka pagi sampai obrolan tengah malam." },
  { icon: Car, title: "Parkir luas", desc: "Motor dan mobil, langsung di Jl. Anggrek Raya." },
  { icon: Users, title: "Titik temu komunitas", desc: "Mahasiswa, pekerja kreatif, dan warga lokal." },
];

export default function FacilitiesSection() {
  return (
    <section id="fasilitas" className="py-16 sm:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        <div className="max-w-xl">
          <span className="eyebrow text-[var(--green)]">Fasilitas</span>
          <h2 className="mt-3 text-[1.9rem] sm:text-[2.6rem] leading-[1.1] font-extrabold text-[var(--ink)]">
            Yang bikin betah lama.
          </h2>
        </div>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {facilities.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className="rounded-xl border border-[var(--line)] p-5 hover:border-[var(--green)]/40 hover:bg-[var(--surface)] transition-colors"
              >
                <Icon className="w-5 h-5 text-[var(--green)]" strokeWidth={1.9} />
                <h3 className="mt-3 text-[0.92rem] font-bold text-[var(--ink)]">{f.title}</h3>
                <p className="mt-1.5 text-[0.82rem] leading-relaxed text-[var(--muted)]">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
