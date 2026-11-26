# Warkop Indonesia

Dua versi website Warkop Indonesia dalam satu repo:

| Folder | Isi | Live |
|---|---|---|
| `/` (root) | Versi static — HTML, CSS, JS murni. Tanpa build step. | https://warkop-indonesia-static.vercel.app |
| `/nextjs` | Versi Next.js 16 + TypeScript + Tailwind. | deploy terpisah |

## Versi static (root)

```
index.html          landing page
menu.html           katalog + keranjang
assets/css/style.css
assets/js/app.js    data menu, keranjang (localStorage), pembayaran, form event
assets/img/         logo, QRIS, foto menu
```

Jalankan: buka `index.html` di browser, atau `python -m http.server 8080`.

## Versi Next.js (`/nextjs`)

```bash
cd nextjs
npm install
npm run dev     # http://localhost:3000
npm run build
```

## Sebelum go-live

Ganti data placeholder:

- Static → `assets/js/app.js`: `CONFIG.phone`, `PAYMENT.banks`, `PAYMENT.qris`
- Next.js → `src/lib/payment.ts` dan `src/lib/config.ts`
