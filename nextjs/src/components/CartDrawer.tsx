"use client";

import { useState } from "react";
import Image from "next/image";
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  Store,
  AlertCircle,
  Send,
  Banknote,
  QrCode,
  Building2,
  Copy,
  Check,
  ArrowLeft,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import {
  formatRupiah,
  generateWhatsAppOrderUrl,
  CheckoutPayload,
  WARKOP_CONFIG,
} from "@/lib/config";
import { PAYMENT_CONFIG } from "@/lib/payment";

type Method = "cash" | "transfer" | "qris";

export default function CartDrawer() {
  const {
    items,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
    isOpen,
    setIsOpen,
  } = useCart();

  const [orderType, setOrderType] = useState<"dine-in" | "takeaway">("dine-in");
  const [customerName, setCustomerName] = useState("");
  const [tableNumber, setTableNumber] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [generalNotes, setGeneralNotes] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const [step, setStep] = useState<"form" | "pay">("form");
  const [method, setMethod] = useState<Method>("cash");
  const [bankId, setBankId] = useState(PAYMENT_CONFIG.banks[0].id);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const inputCls =
    "w-full rounded-lg border border-[var(--line)] px-3 py-2.5 text-[0.85rem] text-[var(--ink)] placeholder:text-[var(--muted)]/60 focus:outline-none focus:border-[var(--green)] focus:ring-2 focus:ring-[var(--green)]/10 transition-colors";

  const bank = PAYMENT_CONFIG.banks.find((b) => b.id === bankId) ?? PAYMENT_CONFIG.banks[0];

  const validate = () => {
    setErrorMsg("");
    if (!customerName.trim()) {
      setErrorMsg("Nama pemesan wajib diisi.");
      return false;
    }
    if (orderType === "dine-in" && !tableNumber.trim()) {
      setErrorMsg("Nomor meja wajib diisi.");
      return false;
    }
    return true;
  };

  const toPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) setStep("pay");
  };

  const send = () => {
    if (!validate()) {
      setStep("form");
      return;
    }

    const methodLabel =
      method === "cash"
        ? "Bayar di kasir (tunai)"
        : method === "transfer"
        ? `Transfer ${bank.bank} — ${bank.account}`
        : `QRIS — ${PAYMENT_CONFIG.qris.merchant}`;

    const payload: CheckoutPayload = {
      orderType,
      customerName: customerName.trim(),
      tableNumber: tableNumber.trim(),
      pickupTime: pickupTime.trim(),
      generalNotes: [
        generalNotes.trim(),
        `Metode bayar: ${methodLabel}`,
        method !== "cash"
          ? "Bukti transaksi saya lampirkan di chat ini."
          : "",
      ]
        .filter(Boolean)
        .join(" | "),
      items,
      totalPrice,
    };

    window.open(generateWhatsAppOrderUrl(payload), "_blank");
  };

  const copyAccount = async (val: string) => {
    try {
      await navigator.clipboard.writeText(val);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50">
      <div onClick={() => setIsOpen(false)} className="absolute inset-0 bg-[var(--ink)]/40 backdrop-blur-sm" />

      <aside className="absolute inset-y-0 right-0 w-full max-w-[430px] bg-white flex flex-col shadow-2xl">
        <div className="px-5 py-4 border-b border-[var(--line)] flex items-center justify-between">
          <div className="flex items-center gap-2">
            {step === "pay" && (
              <button
                onClick={() => setStep("form")}
                className="p-1.5 -ml-1.5 rounded-lg text-[var(--muted)] hover:bg-[var(--surface)] hover:text-[var(--ink)] transition-colors"
                aria-label="Kembali"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}
            <div>
              <h2 className="text-base font-extrabold text-[var(--ink)]">
                {step === "form" ? "Pesanan saya" : "Pembayaran"}
              </h2>
              <p className="text-[0.78rem] text-[var(--muted)]">
                {step === "form" ? `${totalItems} item dipilih` : `Total ${formatRupiah(totalPrice)}`}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-lg text-[var(--muted)] hover:bg-[var(--surface)] hover:text-[var(--ink)] transition-colors"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5 space-y-5">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center gap-3 py-16">
              <div className="w-14 h-14 rounded-full bg-[var(--surface)] grid place-items-center text-[var(--muted)]">
                <ShoppingBag className="w-6 h-6" strokeWidth={1.6} />
              </div>
              <p className="text-sm font-bold text-[var(--ink)]">Keranjang masih kosong</p>
              <p className="text-[0.8rem] text-[var(--muted)] max-w-[26ch]">
                Pilih kopi, mie, atau camilan favoritmu dulu.
              </p>
              <button
                onClick={() => setIsOpen(false)}
                className="mt-1 rounded-lg bg-[var(--green-tint)] text-[var(--green)] px-4 py-2 text-[0.78rem] font-bold hover:bg-[var(--green)] hover:text-white transition-colors"
              >
                Lihat menu
              </button>
            </div>
          ) : step === "form" ? (
            <>
              <div className="flex items-center justify-between pb-2 border-b border-[var(--line)]">
                <span className="text-[0.72rem] font-bold uppercase tracking-wider text-[var(--muted)]">Rincian</span>
                <button
                  onClick={clearCart}
                  className="inline-flex items-center gap-1 text-[0.72rem] font-bold text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-3 h-3" /> Kosongkan
                </button>
              </div>

              <div className="space-y-3">
                {items.map((item) => (
                  <div key={item.id} className="rounded-xl border border-[var(--line)] p-3.5">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h4 className="text-[0.88rem] font-bold text-[var(--ink)] leading-snug">{item.name}</h4>
                        <p className="text-[0.76rem] text-[var(--muted)] tabular-nums mt-0.5">{formatRupiah(item.price)}</p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-[var(--muted)] hover:text-red-600 p-1 transition-colors"
                        aria-label="Hapus item"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center rounded-lg border border-[var(--line)]">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-7 h-7 grid place-items-center text-[var(--muted)] hover:text-[var(--green)] transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-7 text-center text-[0.78rem] font-bold tabular-nums text-[var(--ink)]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-7 h-7 grid place-items-center text-[var(--muted)] hover:text-[var(--green)] transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <span className="text-[0.85rem] font-extrabold tabular-nums text-[var(--ink)]">
                        {formatRupiah(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <form id="checkout" onSubmit={toPayment} className="space-y-3.5 pt-4 border-t border-[var(--line)]">
                <p className="text-[0.72rem] font-bold uppercase tracking-wider text-[var(--muted)]">Opsi pemesanan</p>

                <div className="grid grid-cols-2 gap-2">
                  {([
                    ["dine-in", "Makan di tempat", Store],
                    ["takeaway", "Bungkus", ShoppingBag],
                  ] as const).map(([val, txt, Icon]) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setOrderType(val)}
                      className={`rounded-lg border py-2.5 text-[0.75rem] font-bold flex items-center justify-center gap-1.5 transition-colors ${
                        orderType === val
                          ? "border-[var(--green)] bg-[var(--green)] text-white"
                          : "border-[var(--line)] text-[var(--muted)] hover:border-[var(--green)]"
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" /> {txt}
                    </button>
                  ))}
                </div>

                <div>
                  <label className="block text-[0.74rem] font-bold text-[var(--ink)] mb-1">Nama pemesan *</label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Nama kamu"
                    className={inputCls}
                  />
                </div>

                {orderType === "dine-in" ? (
                  <div>
                    <label className="block text-[0.74rem] font-bold text-[var(--ink)] mb-1">Nomor meja *</label>
                    <input
                      type="text"
                      required
                      value={tableNumber}
                      onChange={(e) => setTableNumber(e.target.value)}
                      placeholder="04"
                      className={inputCls}
                    />
                  </div>
                ) : (
                  <div>
                    <label className="block text-[0.74rem] font-bold text-[var(--ink)] mb-1">Jam ambil</label>
                    <input
                      type="text"
                      value={pickupTime}
                      onChange={(e) => setPickupTime(e.target.value)}
                      placeholder="15 menit lagi"
                      className={inputCls}
                    />
                  </div>
                )}

                <div>
                  <label className="block text-[0.74rem] font-bold text-[var(--ink)] mb-1">Catatan</label>
                  <textarea
                    rows={2}
                    value={generalNotes}
                    onChange={(e) => setGeneralNotes(e.target.value)}
                    placeholder="Es kopi jangan terlalu manis"
                    className={`${inputCls} resize-none`}
                  />
                </div>

                {errorMsg && (
                  <div className="flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2.5 text-[0.78rem] font-semibold text-red-700">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {errorMsg}
                  </div>
                )}
              </form>
            </>
          ) : (
            <>
              <div className="rounded-xl bg-[var(--surface)] p-4">
                <div className="flex items-center justify-between">
                  <span className="text-[0.78rem] text-[var(--muted)]">Total tagihan</span>
                  <span className="text-lg font-extrabold tabular-nums text-[var(--ink)]">
                    {formatRupiah(totalPrice)}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-[0.72rem] font-bold uppercase tracking-wider text-[var(--muted)]">Metode pembayaran</p>

                {([
                  ["cash", "Tunai di kasir", Banknote],
                  ["transfer", "Transfer bank", Building2],
                  ["qris", "QRIS", QrCode],
                ] as const).map(([val, txt, Icon]) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setMethod(val)}
                    className={`w-full flex items-center gap-3 rounded-lg border px-3.5 py-3 text-[0.82rem] font-bold transition-colors ${
                      method === val
                        ? "border-[var(--green)] bg-[var(--green-tint)] text-[var(--green)]"
                        : "border-[var(--line)] text-[var(--ink)] hover:border-[var(--green)]"
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" strokeWidth={1.9} />
                    <span className="flex-1 text-left">{txt}</span>
                    <span
                      className={`w-3.5 h-3.5 rounded-full border-2 ${
                        method === val ? "border-[var(--green)] bg-[var(--green)]" : "border-[var(--line)]"
                      }`}
                    />
                  </button>
                ))}
              </div>

              {method === "cash" && (
                <p className="rounded-lg bg-[var(--surface)] px-3.5 py-3 text-[0.78rem] leading-relaxed text-[var(--muted)]">
                  {PAYMENT_CONFIG.cashNote}
                </p>
              )}

              {method === "transfer" && (
                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    {PAYMENT_CONFIG.banks.map((b) => (
                      <button
                        key={b.id}
                        type="button"
                        onClick={() => setBankId(b.id)}
                        className={`rounded-lg border py-2.5 text-[0.78rem] font-bold transition-colors ${
                          bankId === b.id
                            ? "border-[var(--green)] bg-[var(--green)] text-white"
                            : "border-[var(--line)] text-[var(--muted)] hover:border-[var(--green)]"
                        }`}
                      >
                        {b.bank}
                      </button>
                    ))}
                  </div>

                  <div className="rounded-xl border border-[var(--line)] p-4 space-y-2">
                    <p className="text-[0.7rem] font-bold uppercase tracking-wider text-[var(--muted)]">
                      {bank.bank} · a.n. {bank.holder}
                    </p>
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-[0.95rem] font-extrabold tabular-nums text-[var(--ink)]">
                        {bank.account}
                      </span>
                      <button
                        type="button"
                        onClick={() => copyAccount(bank.accountRaw)}
                        className="inline-flex items-center gap-1 rounded-lg border border-[var(--line)] px-2.5 py-1.5 text-[0.7rem] font-bold text-[var(--muted)] hover:border-[var(--green)] hover:text-[var(--green)] transition-colors"
                      >
                        {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                        {copied ? "Tersalin" : "Salin"}
                      </button>
                    </div>
                    <p className="text-[0.72rem] text-[var(--muted)]">
                      Transfer sesuai total, lalu kirim bukti via WhatsApp.
                    </p>
                  </div>
                </div>
              )}

              {method === "qris" && (
                <div className="rounded-xl border border-[var(--line)] p-4 space-y-3 text-center">
                  <p className="text-[0.7rem] font-bold uppercase tracking-wider text-[var(--muted)]">
                    Scan QRIS · {PAYMENT_CONFIG.qris.merchant}
                  </p>
                  <div className="relative mx-auto w-[200px] h-[200px] rounded-lg border border-[var(--line)] p-2 bg-white">
                    <Image
                      src={PAYMENT_CONFIG.qris.image}
                      alt="QRIS Warkop Indonesia"
                      fill
                      className="object-contain p-2"
                    />
                  </div>
                  <p className="text-[0.72rem] text-[var(--muted)]">
                    NMID {PAYMENT_CONFIG.qris.nmid} · bisa dari semua e-wallet & m-banking
                  </p>
                </div>
              )}

              <div className="rounded-lg border border-dashed border-[var(--line)] px-3.5 py-3 text-[0.75rem] leading-relaxed text-[var(--muted)]">
                Setelah bayar, klik tombol di bawah. Detail pesanan + metode bayar dikirim ke
                WhatsApp kasir. <strong className="text-[var(--ink)]">Lampirkan foto bukti transaksi</strong> di chat tersebut.
              </div>
            </>
          )}
        </div>

        {items.length > 0 && (
          <div className="px-5 py-4 border-t border-[var(--line)] bg-[var(--surface)] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[0.82rem] text-[var(--muted)]">Total</span>
              <span className="text-lg font-extrabold tabular-nums text-[var(--ink)]">{formatRupiah(totalPrice)}</span>
            </div>

            {step === "form" ? (
              <button
                type="submit"
                form="checkout"
                className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--green)] hover:bg-[var(--green-dark)] py-3 text-sm font-bold text-white transition-colors"
              >
                Lanjut ke pembayaran
              </button>
            ) : (
              <button
                onClick={send}
                className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--green)] hover:bg-[var(--green-dark)] py-3 text-sm font-bold text-white transition-colors"
              >
                <Send className="w-4 h-4" /> Kirim pesanan & bukti bayar
              </button>
            )}

            <p className="text-[0.68rem] text-center text-[var(--muted)]">
              {step === "form"
                ? "Pilih metode bayar di langkah berikutnya."
                : "Pesan terisi otomatis, langsung ke kasir."}
            </p>
          </div>
        )}
      </aside>
    </div>
  );
}
