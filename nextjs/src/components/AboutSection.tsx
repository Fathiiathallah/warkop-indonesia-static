import { Target, TrendingUp, Compass } from "lucide-react";

const pillars = [
  {
    icon: Target,
    title: "Top of Mind",
    sub: "Casual Creative Space",
    desc: "Yang pertama terlintas saat orang mencari tempat kreatif untuk berkumpul, bekerja, atau bertukar ide di Makassar.",
  },
  {
    icon: TrendingUp,
    title: "Model Bisnis Terbukti",
    sub: "Health & Growth",
    desc: "Usaha yang sehat secara finansial dan operasional, tumbuh terukur bersama komunitas pelanggan setianya.",
  },
  {
    icon: Compass,
    title: "Visi",
    sub: "Ruang Kreatif Kasual",
    desc: "Menjadi ruang kreatif kasual paling diingat — inklusif, ramah kantong, dan konsisten dari hari ke hari.",
  },
];

export default function AboutSection() {
  return (
    <section id="tentang" className="py-16 sm:py-24 bg-[var(--surface)]">
      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        <div className="max-w-2xl">
          <span className="eyebrow text-[var(--green)]">Tentang Warkop</span>
          <h2 className="mt-3 text-[1.9rem] sm:text-[2.6rem] leading-[1.1] font-extrabold text-[var(--ink)]">
            Bukan sekadar tempat ngopi.
          </h2>
          <p className="mt-4 text-[0.95rem] leading-relaxed text-[var(--muted)]">
            Berakar dari kultur warung kopi Makassar — tempat orang datang tanpa
            janji, duduk berlama-lama, dan pulang dengan satu masalah yang selesai.
          </p>
        </div>

        <div className="mt-10 grid sm:grid-cols-3 gap-4">
          {pillars.map((p) => {
            const Icon = p.icon;
            return (
              <div key={p.title} className="card p-6 bg-white">
                <div className="w-10 h-10 rounded-lg bg-[var(--green-tint)] text-[var(--green)] grid place-items-center">
                  <Icon className="w-5 h-5" strokeWidth={1.9} />
                </div>
                <h3 className="mt-4 text-base font-bold text-[var(--ink)]">{p.title}</h3>
                <p className="mt-0.5 text-[0.72rem] font-semibold uppercase tracking-wider text-[var(--green)]">
                  {p.sub}
                </p>
                <p className="mt-2.5 text-[0.85rem] leading-relaxed text-[var(--muted)]">
                  {p.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
