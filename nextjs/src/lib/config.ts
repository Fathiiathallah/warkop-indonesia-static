export const WARKOP_CONFIG = {
  name: "Warkop Indonesia",
  tagline: "Ruang Santai & Cita Rasa Otentik Warung Kopi Makassar",
  phone: "6285342243869",
  phoneDisplay: "0853-4224-3869",
  address: "Jl. Anggrek Raya No.23, Paropo, Kec. Panakkukang, Kota Makassar, Sulawesi Selatan 90231",
  addressShort: "Jl. Anggrek Raya No.23, Panakkukang, Makassar",
  hours: "Setiap Hari 08.00 - 24.00 WITA",
  mapsUrl: "https://maps.google.com/?q=Jl.+Anggrek+Raya+No.23,+Paropo,+Kec.+Panakkukang,+Kota+Makassar,+Sulawesi+Selatan+90231",
  instagramUrl: "https://www.instagram.com/",
};

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  notes?: string;
}

export interface CheckoutPayload {
  orderType: "dine-in" | "takeaway";
  customerName: string;
  tableNumber?: string;
  pickupTime?: string;
  generalNotes?: string;
  items: OrderItem[];
  totalPrice: number;
}

export function formatRupiah(value: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export function generateWhatsAppOrderUrl(payload: CheckoutPayload): string {
  const lines: string[] = [];
  
  lines.push(`☕ *PESANAN BARU - WARKOP INDONESIA*`);
  lines.push(`─────────────────────────`);
  lines.push(`*Tipe Pesanan:* ${payload.orderType === "dine-in" ? "🪑 Makan di Tempat (Dine In)" : "🥡 Bungkus (Take Away)"}`);
  lines.push(`*Nama Pemesan:* ${payload.customerName}`);
  
  if (payload.orderType === "dine-in" && payload.tableNumber) {
    lines.push(`*Nomor Meja:* Meja ${payload.tableNumber}`);
  }
  
  if (payload.orderType === "takeaway" && payload.pickupTime) {
    lines.push(`*Perkiraan Diambil:* ${payload.pickupTime}`);
  }

  lines.push(`\n*RINCIAN MENU:*`);
  payload.items.forEach((item, index) => {
    lines.push(`${index + 1}. *${item.name}* (${item.quantity}x) = ${formatRupiah(item.price * item.quantity)}`);
    if (item.notes && item.notes.trim()) {
      lines.push(`   _Catatan: ${item.notes.trim()}_`);
    }
  });

  lines.push(`─────────────────────────`);
  lines.push(`*TOTAL BAYAR: ${formatRupiah(payload.totalPrice)}*`);
  
  if (payload.generalNotes && payload.generalNotes.trim()) {
    lines.push(`\n*Catatan Khusus:* ${payload.generalNotes.trim()}`);
  }
  
  lines.push(`\n_Mohon konfirmasi ketersediaan pesanan saya. Terima kasih!_`);

  const message = encodeURIComponent(lines.join("\n"));
  return `https://wa.me/${WARKOP_CONFIG.phone}?text=${message}`;
}
