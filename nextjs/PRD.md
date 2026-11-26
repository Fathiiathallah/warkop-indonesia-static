# PRD: Warkop Indonesia Landing Page & Digital Ordering System
Version: 1.0.0
Status: Approved

## 1. Executive Summary
Website profil dan sistem pemesanan digital (digital ordering) untuk **Warkop Indonesia**, sebuah warung kopi modern dan tempat nongkrong di Kota Makassar. Menampilkan profil kedai, katalog menu lengkap dengan filter kategori, keranjang belanja interaktif, kalkulasi total, pemilihan opsi makan (Dine-in / Takeaway), serta direct checkout via WhatsApp.

---

## 2. Business & Brand Identity
- **Nama Bisnis:** Warkop Indonesia
- **Tagline / Headline:** Ruang Santai & Cita Rasa Otentik Warung Kopi Makassar
- **Visi:** Top of Mind Casual Creative Space (Tempat pertama yang diingat saat mencari ruang kreatif kasual untuk berkarya dan berjejaring)
- **Misi:** Health & Growth Proven Business Model (Membangun dan menjalankan model bisnis kuliner yang sehat secara operasional, berkelanjutan, dan terus bertumbuh)
- **Vibes / Color Palette:**
  - Dark Pine Green (`#1E3A2F` / `#162E25`)
  - Warm Earth Brown (`#8B5E3C` / `#D4A373`)
  - Warm Beige / Cream (`#FDFBF7` / `#F4EFEA`)
- **Logo:** Logo asli hijau pine "warkop indonesia" (terpasang di navbar & footer)
- **Kontak & Operasional:**
  - WhatsApp: `+62 853-4224-3869` (`085342243869`)
  - Alamat: Jl. Anggrek Raya No.23, Paropo, Kec. Panakkukang, Kota Makassar, Sulawesi Selatan 90231
  - Jam Operasional: Setiap Hari (Senin - Minggu) 08.00 - 24.00 WITA

---

## 3. Scope & Key Features

### 3.1 Hero Section
- Branding kuat Warkop Indonesia dengan background hangat/modern.
- Headline, subheadline, jam buka badge, alamat singkat.
- Quick action CTA: "Lihat Menu & Pesan" (smooth scroll) dan "Petunjuk Arah (Maps)".

### 3.2 About & Facilities Section
- Profil singkat Warkop Indonesia sebagai titik temu komunitas, kerja, dan santai di Panakkukang.
- Fasilitas: Free Wi-Fi kencang, banyak colokan listrik, smoking & non-smoking area, musholla, parkir motor & mobil.

### 3.3 Interactive Menu & Digital Ordering
- **Filter Kategori Cepat:**
  - Semua Menu
  - Kopi
  - Non-Kopi
  - Makanan
  - Snack & Kue
  - Beans & Madu
- **Pencarian Menu Realtime:** Search input untuk menemukan item instan.
- **Kartu Menu:**
  - Foto/ilustrasi item & badge terlaris.
  - Nama produk & harga IDR jelas.
  - Tombol aksi "+ Tambah" / quantity counter (+/-).
- **Floating Cart / Cart Drawer:**
  - Badge counter jumlah item di keranjang.
  - Rincian pesanan (item, quantity, harga per unit, subtotal).
  - Pilihan tipe pesanan:
    - **Dine In (Makan di Tempat):** Input Nomor Meja + Catatan.
    - **Take Away (Bungkus):** Input Nama Pemesan + Perkiraan Jam Ambil + Catatan.
  - Ringkasan total biaya.
  - Tombol Checkout: Men-generate template teks WhatsApp rapi dan membuka link `wa.me` langsung.

### 3.4 Location & Google Maps Section
- Alamat lengkap dan jam operasional terinci.
- Interactive embed Google Maps ke Jl. Anggrek Raya No.23 Paropo Panakkukang Makassar.
- Tombol navigasi langsung ke Google Maps app.

### 3.5 Footer Section
- Logo Warkop Indonesia.
- Kontak WhatsApp, info jam operasional, dan copyright.

---

## 4. Technical Architecture
- **Framework:** Next.js (App Router, TypeScript, Tailwind CSS)
- **Icons:** Lucide-React
- **State Management:** React Context / Local State (Persistent Cart via `localStorage`)
- **Performance & SEO:** Fast static prerender, responsive mobile-first UI.
