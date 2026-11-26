"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, Menu as MenuIcon, X } from "lucide-react";
import { useCart } from "@/context/CartContext";

const LINKS = [
  { href: "/#tentang", label: "Tentang" },
  { href: "/#fasilitas", label: "Fasilitas" },
  { href: "/menu", label: "Menu" },
  { href: "/#event", label: "Event" },
  { href: "/#lokasi", label: "Lokasi" },
];

export default function Navbar() {
  const { totalItems, setIsOpen } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 bg-white/90 backdrop-blur-md transition-shadow ${
        scrolled ? "border-b border-[var(--line)] shadow-[0_1px_2px_rgba(11,31,23,0.04)]" : ""
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        <div className="h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="Warkop Indonesia"
              width={935}
              height={269}
              priority
              className="h-9 sm:h-10 w-auto"
            />
          </Link>

          <nav className="hidden md:flex items-center gap-7">
            {LINKS.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="text-[0.85rem] font-medium text-[var(--muted)] hover:text-[var(--green)] transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
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
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden p-2 text-[var(--ink)]"
              aria-label="Menu"
            >
              {open ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-[var(--line)] bg-white">
          <div className="px-5 py-3 space-y-1">
            {LINKS.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block py-2.5 text-sm font-semibold text-[var(--ink)] border-b border-[var(--line)] last:border-0"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
