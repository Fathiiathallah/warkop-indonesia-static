export interface SeriesItem {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  formattedPrice: string;
  image: string;
  category: "kopi" | "non-kopi" | "makanan" | "snack-kue" | "beans";
}

export interface MenuSeries {
  id: string;
  title: string;
  pages: SeriesItem[][];
}

export const MENU_SERIES_DATA: MenuSeries[] = [
  {
    id: "kopi-warkop",
    title: "Kopi Khas Warkop",
    pages: [
      [
        {
          id: "kopi-susu",
          name: "Kopi Susu",
          subtitle: "Kopi susu racikan khas warkop yang creamy & legit",
          price: 15000,
          formattedPrice: "Rp 15.000",
          image: "/menu/kopi-susu.jpg",
          category: "kopi",
        },
        {
          id: "es-kopi-susu",
          name: "Es Kopi Susu",
          subtitle: "Es kopi susu dingin segar teman nongkrong",
          price: 18000,
          formattedPrice: "Rp 18.000",
          image: "/menu/es-kopi-susu.jpg",
          category: "kopi",
        },
        {
          id: "kopi-hitam",
          name: "Kopi Hitam",
          subtitle: "Seduhan kopi hitam panas mantap beraroma kuat",
          price: 15000,
          formattedPrice: "Rp 15.000",
          image: "/menu/kopi-hitam.jpg",
          category: "kopi",
        },
      ],
      [
        {
          id: "es-kopi-hitam",
          name: "Es Kopi Hitam",
          subtitle: "Sensasi segar kopi hitam dingin kaya rasa",
          price: 17000,
          formattedPrice: "Rp 17.000",
          image: "/menu/es-kopi-hitam.jpg",
          category: "kopi",
        },
        {
          id: "espresso",
          name: "Espresso",
          subtitle: "Single shot ekstrak kopi murni berkarakter intens",
          price: 13000,
          formattedPrice: "Rp 13.000",
          image: "/menu/espresso.jpg",
          category: "kopi",
        },
        {
          id: "kopi-tarik",
          name: "Kopi Tarik Spesial",
          subtitle: "Kopi tarik berbusa lembut aroma harum nikmat",
          price: 18000,
          formattedPrice: "Rp 18.000",
          image: "/menu/kopi-tarik.jpg",
          category: "kopi",
        },
      ],
    ],
  },
  {
    id: "non-kopi",
    title: "Minuman Non-Kopi & Teh",
    pages: [
      [
        {
          id: "coklat-ice",
          name: "Coklat Ice",
          subtitle: "Minuman coklat dingin pekat dan manis pas",
          price: 20000,
          formattedPrice: "Rp 20.000",
          image: "/menu/coklat-ice.jpg",
          category: "non-kopi",
        },
        {
          id: "thai-tea",
          name: "Thai Tea",
          subtitle: "Teh Thailand autentik aromatik berpadu susu creamy",
          price: 20000,
          formattedPrice: "Rp 20.000",
          image: "/menu/thai-tea.jpg",
          category: "non-kopi",
        },
        {
          id: "green-tea",
          name: "Green Tea (Matcha)",
          subtitle: "Segarnya matcha berkualitas dengan susu gurih",
          price: 20000,
          formattedPrice: "Rp 20.000",
          image: "/menu/green-tea.jpg",
          category: "non-kopi",
        },
      ],
      [
        {
          id: "es-teh-manis",
          name: "Es Teh Manis",
          subtitle: "Es teh segar dengan manis gula asli yang pas",
          price: 15000,
          formattedPrice: "Rp 15.000",
          image: "/menu/es-teh-manis.jpg",
          category: "non-kopi",
        },
        {
          id: "teh-susu-panas",
          name: "Teh Susu Panas",
          subtitle: "Teh seduh wangi melati berpadu susu manis",
          price: 15000,
          formattedPrice: "Rp 15.000",
          image: "/menu/teh-susu.jpg",
          category: "non-kopi",
        },
        {
          id: "air-mineral",
          name: "Air Mineral",
          subtitle: "Air mineral botol dingin / suhu ruang",
          price: 5000,
          formattedPrice: "Rp 5.000",
          image: "/menu/air-mineral.jpg",
          category: "non-kopi",
        },
      ],
    ],
  },
  {
    id: "makanan",
    title: "Makanan & Mie Warkop",
    pages: [
      [
        {
          id: "indomie-single-goreng",
          name: "Indomie Single Goreng",
          subtitle: "Indomie goreng legendaris bumbu gurih khas warkop",
          price: 17000,
          formattedPrice: "Rp 17.000",
          image: "/menu/indomie-goreng.jpg",
          category: "makanan",
        },
        {
          id: "indomie-double-goreng",
          name: "Indomie Double Goreng",
          subtitle: "Porsi dobel puas untuk yang lagi lapar berat",
          price: 20000,
          formattedPrice: "Rp 20.000",
          image: "/menu/indomie-goreng.jpg",
          category: "makanan",
        },
        {
          id: "indomie-single-soto",
          name: "Indomie Single Soto",
          subtitle: "Indomie kuah soto gurih berempah hangat",
          price: 17000,
          formattedPrice: "Rp 17.000",
          image: "/menu/indomie-kuah.jpg",
          category: "makanan",
        },
      ],
      [
        {
          id: "indomie-single-kaldu",
          name: "Indomie Single Kaldu",
          subtitle: "Indomie kuah kaldu ayam hangat gurih",
          price: 17000,
          formattedPrice: "Rp 17.000",
          image: "/menu/indomie-kuah.jpg",
          category: "makanan",
        },
        {
          id: "nasi-chicken-wings",
          name: "Nasi Chicken Wings",
          subtitle: "Nasi hangat dengan sayap ayam gurih renyah",
          price: 29000,
          formattedPrice: "Rp 29.000",
          image: "/menu/nasi-wings.jpg",
          category: "makanan",
        },
        {
          id: "chicken-wings-cozy",
          name: "Chicken Wings Cozy (8 pcs)",
          subtitle: "8 potong sayap ayam bumbu spesial sharing",
          price: 52000,
          formattedPrice: "Rp 52.000",
          image: "/menu/chicken-wings.jpg",
          category: "makanan",
        },
      ],
    ],
  },
  {
    id: "snack-kue",
    title: "Snack & Camilan Khas",
    pages: [
      [
        {
          id: "pisang-goreng-sambel",
          name: "Pisang Goreng + Sambel",
          subtitle: "Pisang renyah khas Makassar cocol sambal terasi",
          price: 19000,
          formattedPrice: "Rp 19.000",
          image: "/menu/pisang-goreng.jpg",
          category: "snack-kue",
        },
        {
          id: "kentang-goreng",
          name: "Kentang Goreng",
          subtitle: "French fries renyah keemasan saus sambal",
          price: 20000,
          formattedPrice: "Rp 20.000",
          image: "/menu/kentang-goreng.jpg",
          category: "snack-kue",
        },
        {
          id: "kacang-langkose",
          name: "Kacang Langkose",
          subtitle: "Camilan kacang kulit sangrai gurih teman ngobrol",
          price: 4000,
          formattedPrice: "Rp 4.000",
          image: "/menu/kacang-langkose.jpg",
          category: "snack-kue",
        },
      ],
      [
        {
          id: "roti-kelapa",
          name: "Roti Kelapa",
          subtitle: "Roti lembut isian parutan kelapa gurih manis",
          price: 7000,
          formattedPrice: "Rp 7.000",
          image: "/menu/roti-kelapa.jpg",
          category: "snack-kue",
        },
        {
          id: "kue-bolu-coklat",
          name: "Kue Bolu Coklat",
          subtitle: "Bolu coklat empuk manis teman seru kopi hitam",
          price: 6000,
          formattedPrice: "Rp 6.000",
          image: "/menu/kue-bolu.jpg",
          category: "snack-kue",
        },
        {
          id: "puding",
          name: "Puding Spesial",
          subtitle: "Puding manis lembut menyegarkan",
          price: 8000,
          formattedPrice: "Rp 8.000",
          image: "/menu/puding.jpg",
          category: "snack-kue",
        },
      ],
    ],
  },
  {
    id: "beans",
    title: "Roasted Beans Toraja & Madu",
    pages: [
      [
        {
          id: "pulupulu-roasted-250",
          name: "Pulupulu Roasted Bean 250gr",
          subtitle: "Biji kopi sangrai Toraja Pulu Pulu aromatik",
          price: 125000,
          formattedPrice: "Rp 125.000",
          image: "/menu/beans-pulupulu.jpg",
          category: "beans",
        },
        {
          id: "pulupulu-roasted-500",
          name: "Pulupulu Roasted Bean 500gr",
          subtitle: "Biji kopi Toraja Pulu Pulu kemasan hemat",
          price: 20000,
          formattedPrice: "Rp 20.000",
          image: "/menu/beans-pulupulu.jpg",
          category: "beans",
        },
        {
          id: "madu-akasia",
          name: "Madu Akasia Murni",
          subtitle: "Madu alami dari nektar bunga akasia",
          price: 50000,
          formattedPrice: "Rp 50.000",
          image: "/menu/madu-akasia.jpg",
          category: "beans",
        },
      ],
    ],
  },
];
