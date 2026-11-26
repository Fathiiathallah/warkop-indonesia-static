import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Warkop Indonesia — Warung Kopi & Ruang Kreatif Makassar",
  description:
    "Kopi susu khas, indomie, dan pisang goreng sambel di Paropo, Panakkukang, Makassar. Buka setiap hari 08.00 – 24.00 WITA.",
  icons: { icon: "/logo.png" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body className={`${sans.variable} min-h-screen flex flex-col antialiased`}>
        {children}
      </body>
    </html>
  );
}
