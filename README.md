# Warkop Indonesia — Static (HTML/CSS/JS)

Versi statis dari landing page Warkop Indonesia. Tanpa framework, tanpa build step.

## Struktur

```
index.html          landing page (hero, tentang, fasilitas, menu, event, lokasi)
menu.html           katalog lengkap + pagination per kategori
assets/css/style.css
assets/js/app.js    data menu, keranjang (localStorage), pembayaran, form event
assets/img/         logo, QRIS, foto menu
```

## Menjalankan

Buka `index.html` langsung di browser, atau:

```bash
python -m http.server 8080
```

## Yang perlu diganti sebelum go-live

- `assets/js/app.js` → `CONFIG.phone` (nomor WhatsApp kasir)
- `assets/js/app.js` → `PAYMENT.banks` (nomor rekening asli)
- `assets/js/app.js` → `PAYMENT.qris` (NMID + gambar QRIS asli di `assets/img/qris.png`)

## Alur pesanan

1. Pilih menu → keranjang tersimpan di `localStorage`.
2. Isi nama + nomor meja / jam ambil.
3. Pilih metode bayar: tunai, transfer bank, atau QRIS.
4. Kirim → WhatsApp terbuka dengan detail pesanan + metode bayar.
5. Lampirkan foto bukti transaksi di chat tersebut.
