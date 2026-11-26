/* Warkop Indonesia — static site logic: keranjang, pembayaran, form event */

const CONFIG = {
  phone: "6285342243869",
  phoneDisplay: "0853-4224-3869",
  address: "Jl. Anggrek Raya No.23, Paropo, Kec. Panakkukang, Kota Makassar, Sulawesi Selatan 90231",
  hours: "Setiap Hari 08.00 - 24.00 WITA",
};

const PAYMENT = {
  banks: [
    { id: "bca", bank: "BCA", holder: "Warkop Indonesia", account: "8430 1122 900", raw: "84301122900" },
    { id: "mandiri", bank: "Mandiri", holder: "Warkop Indonesia", account: "1500 0099 8877", raw: "150000998877" },
  ],
  qris: {
    merchant: "WARKOP INDONESIA",
    nmid: "ID1024000000001",
    image: "assets/img/qris.png",
  },
};

const SERIES = [
  {
    id: "kopi", title: "Kopi Khas Warkop", pages: [
      [
        { id: "kopi-susu", name: "Kopi Susu", desc: "Kopi susu racikan khas warkop yang creamy & legit", price: 15000, img: "kopi-susu.jpg" },
        { id: "es-kopi-susu", name: "Es Kopi Susu", desc: "Es kopi susu dingin segar teman nongkrong", price: 18000, img: "es-kopi-susu.jpg" },
        { id: "kopi-hitam", name: "Kopi Hitam", desc: "Seduhan kopi hitam panas mantap beraroma kuat", price: 15000, img: "kopi-hitam.jpg" },
      ],
      [
        { id: "es-kopi-hitam", name: "Es Kopi Hitam", desc: "Sensasi segar kopi hitam dingin kaya rasa", price: 17000, img: "es-kopi-hitam.jpg" },
        { id: "espresso", name: "Espresso", desc: "Single shot ekstrak kopi murni berkarakter intens", price: 13000, img: "espresso.jpg" },
        { id: "kopi-tarik", name: "Kopi Tarik Spesial", desc: "Kopi tarik berbusa lembut aroma harum nikmat", price: 18000, img: "kopi-tarik.jpg" },
      ],
    ],
  },
  {
    id: "nonkopi", title: "Minuman Non-Kopi & Teh", pages: [
      [
        { id: "coklat-ice", name: "Coklat Ice", desc: "Minuman coklat dingin pekat dan manis pas", price: 20000, img: "coklat-ice.jpg" },
        { id: "thai-tea", name: "Thai Tea", desc: "Teh Thailand autentik aromatik berpadu susu creamy", price: 20000, img: "thai-tea.jpg" },
        { id: "green-tea", name: "Green Tea (Matcha)", desc: "Segarnya matcha berkualitas dengan susu gurih", price: 20000, img: "green-tea.jpg" },
      ],
      [
        { id: "es-teh-manis", name: "Es Teh Manis", desc: "Es teh segar dengan manis gula asli yang pas", price: 15000, img: "es-teh-manis.jpg" },
        { id: "teh-susu", name: "Teh Susu Panas", desc: "Teh seduh wangi melati berpadu susu manis", price: 15000, img: "teh-susu.jpg" },
        { id: "air-mineral", name: "Air Mineral", desc: "Air mineral botol dingin / suhu ruang", price: 5000, img: "air-mineral.jpg" },
      ],
    ],
  },
  {
    id: "makanan", title: "Makanan & Mie Warkop", pages: [
      [
        { id: "indomie-goreng", name: "Indomie Single Goreng", desc: "Indomie goreng legendaris bumbu gurih khas warkop", price: 17000, img: "indomie-goreng.jpg" },
        { id: "indomie-double-goreng", name: "Indomie Double Goreng", desc: "Porsi dobel puas untuk yang lagi lapar berat", price: 20000, img: "indomie-goreng.jpg" },
        { id: "indomie-soto", name: "Indomie Single Soto", desc: "Indomie kuah soto gurih berempah hangat", price: 17000, img: "indomie-kuah.jpg" },
      ],
      [
        { id: "indomie-kaldu", name: "Indomie Single Kaldu", desc: "Indomie kuah kaldu ayam hangat gurih", price: 17000, img: "indomie-kuah.jpg" },
        { id: "nasi-wings", name: "Nasi Chicken Wings", desc: "Nasi hangat dengan sayap ayam gurih renyah", price: 29000, img: "nasi-wings.jpg" },
        { id: "wings-cozy", name: "Chicken Wings Cozy (8 pcs)", desc: "8 potong sayap ayam bumbu spesial sharing", price: 52000, img: "chicken-wings.jpg" },
      ],
    ],
  },
  {
    id: "snack", title: "Snack & Camilan Khas", pages: [
      [
        { id: "pisang-goreng", name: "Pisang Goreng + Sambel", desc: "Pisang renyah khas Makassar cocol sambal terasi", price: 19000, img: "pisang-goreng.jpg" },
        { id: "kentang-goreng", name: "Kentang Goreng", desc: "French fries renyah keemasan saus sambal", price: 20000, img: "kentang-goreng.jpg" },
        { id: "kacang-langkose", name: "Kacang Langkose", desc: "Camilan kacang kulit sangrai gurih teman ngobrol", price: 4000, img: "kacang-langkose.jpg" },
      ],
      [
        { id: "roti-kelapa", name: "Roti Kelapa", desc: "Roti lembut isian parutan kelapa gurih manis", price: 7000, img: "roti-kelapa.jpg" },
        { id: "kue-bolu", name: "Kue Bolu Coklat", desc: "Bolu coklat empuk manis teman seru kopi hitam", price: 6000, img: "kue-bolu.jpg" },
        { id: "puding", name: "Puding Spesial", desc: "Puding manis lembut menyegarkan", price: 8000, img: "puding.jpg" },
      ],
    ],
  },
  {
    id: "beans", title: "Roasted Beans Toraja & Madu", pages: [
      [
        { id: "pulupulu-250", name: "Pulupulu Roasted Bean 250gr", desc: "Biji kopi sangrai Toraja Pulu Pulu aromatik", price: 125000, img: "beans-pulupulu.jpg" },
        { id: "pulupulu-500", name: "Pulupulu Roasted Bean 500gr", desc: "Biji kopi Toraja Pulu Pulu kemasan hemat", price: 20000, img: "beans-pulupulu.jpg" },
        { id: "madu-akasia", name: "Madu Akasia Murni", desc: "Madu alami dari nektar bunga akasia", price: 50000, img: "madu-akasia.jpg" },
      ],
    ],
  },
];

const ICON_PLUS = '<svg class="ico" aria-hidden="true"><use href="#i-plus"/></svg>';
const ICON_CHECK = '<svg class="ico" aria-hidden="true"><use href="#i-check"/></svg>';

const rupiah = (n) => "Rp " + n.toLocaleString("id-ID");
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];

/* ---------- cart state ---------- */
const STORE_KEY = "warkop_cart_static";
let cart = [];

try {
  cart = JSON.parse(localStorage.getItem(STORE_KEY) || "[]");
} catch {
  cart = [];
}

function saveCart() {
  localStorage.setItem(STORE_KEY, JSON.stringify(cart));
  renderCount();
}

function renderCount() {
  const n = cart.reduce((s, i) => s + i.qty, 0);
  $$(".cart-count").forEach((el) => {
    el.textContent = n;
    el.style.display = n > 0 ? "grid" : "none";
  });
}

function addToCart(item) {
  const found = cart.find((c) => c.id === item.id);
  if (found) found.qty += 1;
  else cart.push({ id: item.id, name: item.name, price: item.price, qty: 1 });
  saveCart();
  renderCart();
}

function setQty(id, delta) {
  const item = cart.find((c) => c.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) cart = cart.filter((c) => c.id !== id);
  saveCart();
  renderCart();
}

function removeItem(id) {
  cart = cart.filter((c) => c.id !== id);
  saveCart();
  renderCart();
}

const totalItems = () => cart.reduce((s, i) => s + i.qty, 0);
const totalPrice = () => cart.reduce((s, i) => s + i.price * i.qty, 0);

/* ---------- drawer ---------- */
let step = "form";
let method = "cash";
let bankId = PAYMENT.banks[0].id;

function buildDrawer() {
  const el = document.createElement("div");
  el.innerHTML = `
    <div class="drawer-backdrop" id="backdrop"></div>
    <aside class="drawer" id="drawer" aria-label="Keranjang pesanan">
      <div class="drawer-head">
        <div style="display:flex;align-items:center;gap:8px">
          <button class="icon-btn" id="backStep" style="display:none" aria-label="Kembali"><svg class="ico" aria-hidden="true"><use href="#i-arrow-left"/></svg></button>
          <div>
            <h2 id="drawerTitle">Pesanan saya</h2>
            <p id="drawerSub">0 item dipilih</p>
          </div>
        </div>
        <button class="icon-btn" id="closeDrawer" aria-label="Tutup"><svg class="ico" aria-hidden="true"><use href="#i-x"/></svg></button>
      </div>
      <div class="drawer-body" id="drawerBody"></div>
      <div class="drawer-foot" id="drawerFoot" style="display:none"></div>
    </aside>`;
  document.body.appendChild(el);

  $("#backdrop").addEventListener("click", closeDrawer);
  $("#closeDrawer").addEventListener("click", closeDrawer);
  $("#backStep").addEventListener("click", () => { step = "form"; renderCart(); });
}

function openDrawer() {
  $("#backdrop").classList.add("is-open");
  $("#drawer").classList.add("is-open");
  document.body.style.overflow = "hidden";
  renderCart();
}

function closeDrawer() {
  $("#backdrop").classList.remove("is-open");
  $("#drawer").classList.remove("is-open");
  document.body.style.overflow = "";
  step = "form";
}

function renderCart() {
  if (!$("#drawer")) return;
  const body = $("#drawerBody");
  const foot = $("#drawerFoot");

  $("#drawerTitle").textContent = step === "form" ? "Pesanan saya" : "Pembayaran";
  $("#drawerSub").textContent = step === "form" ? `${totalItems()} item dipilih` : `Total ${rupiah(totalPrice())}`;
  $("#backStep").style.display = step === "pay" ? "grid" : "none";

  if (cart.length === 0) {
    body.innerHTML = `<div class="empty">
      <div class="ico"><svg class="ico-lg" aria-hidden="true"><use href="#i-bag"/></svg></div>
      <h3>Keranjang masih kosong</h3>
      <p>Pilih kopi, mie, atau camilan favoritmu dulu.</p>
    </div>`;
    foot.style.display = "none";
    return;
  }

  if (step === "form") {
    body.innerHTML = `
      <div style="display:flex;align-items:center;justify-content:space-between;padding-bottom:10px;border-bottom:1px solid var(--line);margin-bottom:14px">
        <span class="eyebrow" style="color:var(--muted)">Rincian</span>
        <button id="clearCart" style="font-size:.72rem;font-weight:800;color:#dc2626">Kosongkan</button>
      </div>
      <div id="cartLines"></div>
      <div style="padding-top:16px;border-top:1px solid var(--line);margin-top:16px">
        <div class="eyebrow" style="color:var(--muted);margin-bottom:12px">Opsi pemesanan</div>
        <div class="chip-group" style="margin-bottom:14px">
          <button class="chip is-active" data-order="dine-in">Makan di tempat</button>
          <button class="chip" data-order="takeaway">Bungkus</button>
        </div>
        <div class="field"><label>Nama pemesan *</label><input id="custName" placeholder="Nama kamu" /></div>
        <div class="field" id="tableField"><label>Nomor meja *</label><input id="tableNo" placeholder="04" /></div>
        <div class="field" id="pickupField" style="display:none"><label>Jam ambil</label><input id="pickupTime" placeholder="15 menit lagi" /></div>
        <div class="field"><label>Catatan</label><textarea id="notes" placeholder="Es kopi jangan terlalu manis"></textarea></div>
        <p id="formError" style="display:none;font-size:.78rem;color:#dc2626;font-weight:700"></p>
      </div>`;

    const lines = $("#cartLines");
    cart.forEach((item) => {
      const row = document.createElement("div");
      row.className = "cart-line";
      row.innerHTML = `
        <div class="cart-line-top">
          <div>
            <h4>${item.name}</h4>
            <div class="unit">${rupiah(item.price)}</div>
          </div>
          <button class="icon-btn" data-remove="${item.id}" aria-label="Hapus"><svg class="ico" aria-hidden="true"><use href="#i-x"/></svg></button>
        </div>
        <div class="cart-line-bot">
          <div class="qty">
            <button data-minus="${item.id}"><svg class="ico" aria-hidden="true"><use href="#i-minus"/></svg></button>
            <span>${item.qty}</span>
            <button data-plus="${item.id}"><svg class="ico" aria-hidden="true"><use href="#i-plus"/></svg></button>
          </div>
          <div class="sub">${rupiah(item.price * item.qty)}</div>
        </div>`;
      lines.appendChild(row);
    });

    lines.addEventListener("click", (e) => {
      const rm = e.target.closest("[data-remove]");
      const mi = e.target.closest("[data-minus]");
      const pl = e.target.closest("[data-plus]");
      if (rm) removeItem(rm.dataset.remove);
      if (mi) setQty(mi.dataset.minus, -1);
      if (pl) setQty(pl.dataset.plus, 1);
    });

    $("#clearCart").addEventListener("click", () => { cart = []; saveCart(); renderCart(); });

    $$(".chip[data-order]").forEach((btn) => {
      btn.addEventListener("click", () => {
        $$(".chip[data-order]").forEach((b) => b.classList.remove("is-active"));
        btn.classList.add("is-active");
        const takeaway = btn.dataset.order === "takeaway";
        $("#tableField").style.display = takeaway ? "none" : "block";
        $("#pickupField").style.display = takeaway ? "block" : "none";
      });
    });

    foot.style.display = "block";
    foot.innerHTML = `
      <div class="total-row"><span>Total</span><strong>${rupiah(totalPrice())}</strong></div>
      <button class="btn btn--primary btn--block" id="toPay">Lanjut ke pembayaran</button>
      <p class="foot-note">Pilih metode bayar di langkah berikutnya.</p>`;

    $("#toPay").addEventListener("click", () => {
      if (!validateForm()) return;
      step = "pay";
      renderCart();
    });
  } else {
    const bank = PAYMENT.banks.find((b) => b.id === bankId) || PAYMENT.banks[0];
    body.innerHTML = `
      <div class="pay-total"><span>Total tagihan</span><strong>${rupiah(totalPrice())}</strong></div>
      <div class="eyebrow" style="color:var(--muted);margin-bottom:10px">Metode pembayaran</div>
      <button class="pay-option ${method === "cash" ? "is-active" : ""}" data-pay="cash"><svg class="ico" aria-hidden="true"><use href="#i-banknote"/></svg> Tunai di kasir<span class="radio"></span></button>
      <button class="pay-option ${method === "transfer" ? "is-active" : ""}" data-pay="transfer"><svg class="ico" aria-hidden="true"><use href="#i-bank"/></svg> Transfer bank<span class="radio"></span></button>
      <button class="pay-option ${method === "qris" ? "is-active" : ""}" data-pay="qris"><svg class="ico" aria-hidden="true"><use href="#i-qr"/></svg> QRIS<span class="radio"></span></button>
      <div id="payPanel"></div>`;

    const panel = $("#payPanel");
    if (method === "cash") {
      panel.innerHTML = `<p class="note-box">Bayar langsung di kasir setelah pesanan siap.</p>`;
    } else if (method === "transfer") {
      panel.innerHTML = `
        <div class="pay-panel">
          <div class="bank-tabs">
            ${PAYMENT.banks.map((b) => `<button class="bank-tab ${b.id === bank.id ? "is-active" : ""}" data-bank="${b.id}">${b.bank}</button>`).join("")}
          </div>
          <div class="bank-row">
            <strong>${bank.account}</strong>
            <button class="copy-btn" id="copyAcc">Salin</button>
          </div>
          <p class="pay-hint">a.n. ${bank.holder}. Transfer sesuai total, lalu kirim bukti via WhatsApp.</p>
        </div>`;
    } else {
      panel.innerHTML = `
        <div class="pay-panel" style="text-align:center">
          <div class="eyebrow" style="color:var(--muted)">Scan QRIS · ${PAYMENT.qris.merchant}</div>
          <img class="qris-img" src="${PAYMENT.qris.image}" alt="QRIS Warkop Indonesia" />
          <p class="pay-hint">NMID ${PAYMENT.qris.nmid} · semua e-wallet & m-banking</p>
        </div>`;
    }

    $$("[data-pay]").forEach((btn) => {
      btn.addEventListener("click", () => { method = btn.dataset.pay; renderCart(); });
    });
    $$("[data-bank]").forEach((btn) => {
      btn.addEventListener("click", () => { bankId = btn.dataset.bank; renderCart(); });
    });
    const copyBtn = $("#copyAcc");
    if (copyBtn) {
      copyBtn.addEventListener("click", async () => {
        try {
          await navigator.clipboard.writeText(bank.raw);
          copyBtn.textContent = "Tersalin";
          setTimeout(() => (copyBtn.textContent = "Salin"), 1500);
        } catch { /* clipboard unavailable */ }
      });
    }

    if (!$("#noteBox")) {
      const note = document.createElement("div");
      note.id = "noteBox";
      note.className = "note-box";
      note.style.marginTop = "16px";
      note.innerHTML = "Setelah bayar, klik tombol di bawah. Detail pesanan + metode bayar dikirim ke WhatsApp kasir. <strong>Lampirkan foto bukti transaksi</strong> di chat tersebut.";
      body.appendChild(note);
    }

    foot.style.display = "block";
    foot.innerHTML = `
      <div class="total-row"><span>Total</span><strong>${rupiah(totalPrice())}</strong></div>
      <button class="btn btn--primary btn--block" id="sendOrder">Kirim pesanan & bukti bayar</button>
      <p class="foot-note">Pesan terisi otomatis, langsung ke kasir.</p>`;

    $("#sendOrder").addEventListener("click", sendOrder);
  }
}

function validateForm() {
  const err = $("#formError");
  const name = $("#custName").value.trim();
  const isDineIn = $(".chip[data-order].is-active").dataset.order === "dine-in";

  err.style.display = "none";
  if (!name) { err.textContent = "Nama pemesan wajib diisi."; err.style.display = "block"; return false; }
  if (isDineIn && !$("#tableNo").value.trim()) {
    err.textContent = "Nomor meja wajib diisi.";
    err.style.display = "block";
    return false;
  }
  return true;
}

function sendOrder() {
  const isDineIn = $(".chip[data-order].is-active").dataset.order === "dine-in";
  const name = $("#custName").value.trim();
  const table = $("#tableNo").value.trim();
  const pickup = $("#pickupTime").value.trim();
  const notes = $("#notes").value.trim();
  const bank = PAYMENT.banks.find((b) => b.id === bankId) || PAYMENT.banks[0];

  const methodLabel =
    method === "cash" ? "Bayar di kasir (tunai)"
    : method === "transfer" ? `Transfer ${bank.bank} — ${bank.account}`
    : `QRIS — ${PAYMENT.qris.merchant}`;

  const lines = [
    "☕ *PESANAN BARU - WARKOP INDONESIA*",
    "─────────────────────────",
    `*Tipe Pesanan:* ${isDineIn ? "Makan di Tempat" : "Bungkus (Take Away)"}`,
    `*Nama Pemesan:* ${name}`,
  ];
  if (isDineIn && table) lines.push(`*Nomor Meja:* ${table}`);
  if (!isDineIn && pickup) lines.push(`*Perkiraan Diambil:* ${pickup}`);
  lines.push("", "*RINCIAN MENU:*");
  cart.forEach((i, n) => lines.push(`${n + 1}. *${i.name}* (${i.qty}x) = ${rupiah(i.price * i.qty)}`));
  lines.push("─────────────────────────");
  lines.push(`*TOTAL BAYAR: ${rupiah(totalPrice())}*`);
  lines.push(`*Metode Bayar:* ${methodLabel}`);
  if (notes) lines.push(`*Catatan:* ${notes}`);
  if (method !== "cash") lines.push("", "_Bukti transaksi saya lampirkan di chat ini._");
  lines.push("", "_Mohon konfirmasi ketersediaan pesanan saya. Terima kasih!_");

  window.open(`https://wa.me/${CONFIG.phone}?text=${encodeURIComponent(lines.join("\n"))}`, "_blank");
}

/* ---------- catalog rendering ---------- */
function renderCatalog() {
  const root = $("#catalog");
  if (!root) return;
  const pages = {};

  root.innerHTML = SERIES.map((s) => {
    pages[s.id] = 0;
    return `
      <section class="series" data-series="${s.id}">
        <div class="series-head">
          <h2>${s.title}</h2>
          ${s.pages.length > 1 ? `<div class="dots">${s.pages.map((_, i) => `<button class="dot ${i === 0 ? "is-active" : ""}" data-dot="${s.id}:${i}" aria-label="Halaman ${i + 1}"></button>`).join("")}</div>` : ""}
        </div>
        <div class="item-grid" data-grid="${s.id}"></div>
      </section>`;
  }).join("");

  const paint = (seriesId, page) => {
    const series = SERIES.find((s) => s.id === seriesId);
    const grid = $(`[data-grid="${seriesId}"]`);
    grid.innerHTML = series.pages[page].map((it) => `
      <article class="card item">
        <div class="ph"><img src="assets/img/menu/${it.img}" alt="${it.name}" loading="lazy" /></div>
        <div class="body">
          <h3>${it.name}</h3>
          <p class="desc">${it.desc}</p>
          <div class="foot">
            <span class="price">${rupiah(it.price)}</span>
            <button class="btn-add" data-add="${it.id}"><svg class="ico" aria-hidden="true"><use href="#i-plus"/></svg> Pesan</button>
          </div>
        </div>
      </article>`).join("");

    $$(`[data-dot^="${seriesId}:"]`).forEach((d) => {
      d.classList.toggle("is-active", d.dataset.dot === `${seriesId}:${page}`);
    });
  };

  SERIES.forEach((s) => paint(s.id, 0));

  root.addEventListener("click", (e) => {
    const dot = e.target.closest("[data-dot]");
    if (dot) {
      const [sid, p] = dot.dataset.dot.split(":");
      paint(sid, Number(p));
      return;
    }
    const add = e.target.closest("[data-add]");
    if (add) {
      const item = SERIES.flatMap((s) => s.pages.flat()).find((i) => i.id === add.dataset.add);
      if (!item) return;
      addToCart(item);
      add.classList.add("is-added");
      add.innerHTML = ICON_CHECK + " Masuk";
      setTimeout(() => { add.classList.remove("is-added"); add.innerHTML = ICON_PLUS + " Pesan"; }, 1100);
    }
  });
}

/* ---------- event form ---------- */
function initEventForm() {
  const form = $("#eventForm");
  if (!form) return;
  let type = "Pameran seni";

  $$(".chip[data-event]").forEach((btn) => {
    btn.addEventListener("click", () => {
      $$(".chip[data-event]").forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      type = btn.dataset.event;
    });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const msg = [
      "🎪 *PENGAJUAN EVENT — WARKOP INDONESIA*",
      "─────────────────────────",
      `*Nama / Komunitas:* ${$("#evName").value.trim()}`,
      `*WhatsApp:* ${$("#evWa").value.trim()}`,
      `*Jenis acara:* ${type}`,
      `*Tanggal rencana:* ${$("#evDate").value}`,
      `*Estimasi peserta:* ${$("#evPeople").value || "-"}`,
      $("#evNote").value.trim() ? `\n*Catatan:* ${$("#evNote").value.trim()}` : "",
      "\n_Mohon info ketersediaan tempat & biaya. Terima kasih!_",
    ].filter(Boolean).join("\n");

    window.open(`https://wa.me/${CONFIG.phone}?text=${encodeURIComponent(msg)}`, "_blank");

    form.style.display = "none";
    $("#eventOk").style.display = "block";
  });

  $("#eventReset")?.addEventListener("click", () => {
    form.reset();
    form.style.display = "block";
    $("#eventOk").style.display = "none";
  });
}

/* ---------- busy hours ---------- */
function initBusyHours() {
  const chart = $("#busyChart");
  if (!chart) return;
  const slots = [
    { range: "08–12", label: "Lengang", pct: 30, start: 8, end: 12 },
    { range: "12–15", label: "Sedang", pct: 60, start: 12, end: 15 },
    { range: "15–18", label: "Ramai", pct: 75, start: 15, end: 18 },
    { range: "18–22", label: "Puncak", pct: 95, start: 18, end: 22 },
    { range: "22–24", label: "Mereda", pct: 45, start: 22, end: 24 },
  ];
  const d = new Date();
  const hour = new Date(d.getTime() + d.getTimezoneOffset() * 60000 + 8 * 3600000).getHours();

  chart.innerHTML = slots.map((s) => {
    const now = hour >= s.start && hour < s.end;
    return `<div class="busy-col ${now ? "is-now" : ""}">
      <div class="busy-bar-wrap"><div class="busy-bar" style="height:${s.pct}%"></div></div>
      <div class="busy-label">
        <strong>${s.range}</strong>
        <span>${s.label}</span>
        ${now ? '<em class="busy-now">Kini</em>' : ""}
      </div>
    </div>`;
  }).join("");
}

/* ---------- nav ---------- */
function initNav() {
  const header = $("#siteHeader");
  const toggle = $("#navToggle");
  const mobile = $("#mobileNav");

  if (header) {
    const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  toggle?.addEventListener("click", () => mobile.classList.toggle("is-open"));

  $$("[data-open-cart]").forEach((btn) => btn.addEventListener("click", openDrawer));
}

document.addEventListener("DOMContentLoaded", () => {
  buildDrawer();
  initNav();
  renderCount();
  renderCatalog();
  initEventForm();
  initBusyHours();
});
