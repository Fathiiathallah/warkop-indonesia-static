import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const featured = [
  { name: "Kopi Susu", note: "Creamy, legit, racikan warkop", price: "15.000", img: "/menu/kopi-susu.jpg", tag: "Terlaris" },
  { name: "Pisang Goreng Sambel", note: "Renyah, dicocol sambal terasi", price: "19.000", img: "/menu/pisang-goreng.jpg", tag: "Khas Makassar" },
  { name: "Indomie Goreng", note: "Gurih, porsi pas buat begadang", price: "17.000", img: "/menu/indomie-goreng.jpg", tag: "Favorit" },
];

export default function MenuSection() {
  return (
    <section id="menu" className="py-16 sm:py-24 bg-[var(--surface)]">
      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="max-w-xl">
            <span className="eyebrow text-[var(--green)]">Menu</span>
            <h2 className="mt-3 text-[1.9rem] sm:text-[2.6rem] leading-[1.1] font-extrabold text-[var(--ink)]">
              Yang paling sering dipesan.
            </h2>
          </div>
          <Link
            href="/menu"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--green)] hover:text-[var(--green-dark)] transition-colors shrink-0"
          >
            Semua menu <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="mt-10 grid sm:grid-cols-3 gap-5">
          {featured.map((item) => (
            <Link key={item.name} href="/menu" className="card overflow-hidden group bg-white">
              <div className="relative aspect-[4/3] overflow-hidden bg-[var(--surface)]">
                <Image
                  src={item.img}
                  alt={item.name}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
                <span className="absolute top-3 left-3 rounded-full bg-white/95 px-2.5 py-1 text-[0.68rem] font-bold text-[var(--green)]">
                  {item.tag}
                </span>
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-[0.95rem] font-bold text-[var(--ink)] group-hover:text-[var(--green)] transition-colors">
                    {item.name}
                  </h3>
                  <span className="text-[0.85rem] font-extrabold text-[var(--green)] tabular-nums whitespace-nowrap">
                    Rp {item.price}
                  </span>
                </div>
                <p className="mt-1 text-[0.8rem] text-[var(--muted)]">{item.note}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 rounded-xl border border-[var(--line)] bg-white px-5 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p className="text-[0.85rem] text-[var(--muted)]">
            40+ item: kopi, teh, mie, camilan, sampai roasted bean Toraja. Pesan langsung, bayar di kasir.
          </p>
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 rounded-lg bg-[var(--ink)] hover:bg-[var(--green)] px-5 py-2.5 text-sm font-semibold text-white transition-colors shrink-0"
          >
            Buka katalog <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
