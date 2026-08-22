import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/ThemeProvider";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const lora = Lora({
  variable: "--font-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://smapgri1lumajang.sch.id"),
  title: {
    default: "SMA PGRI 1 Lumajang | The Character of Success",
    template: "%s | SMA PGRI 1 Lumajang",
  },
  description: "Mencetak generasi unggul, religius, cerdas, terampil, dan siap kerja di industri masa depan.",
  keywords: ["SMA PGRI 1 Lumajang", "SMA Lumajang", "Sekolah Terbaik Lumajang", "PPDB SMA Lumajang", "Sekolah Religius"],
  authors: [{ name: "SMA PGRI 1 Lumajang" }],
  openGraph: {
    title: "SMA PGRI 1 Lumajang",
    description: "Mencetak generasi unggul, religius, cerdas, terampil, dan siap kerja di industri masa depan.",
    url: "https://smapgri1lumajang.sch.id",
    siteName: "SMA PGRI 1 Lumajang",
    images: [
      {
        url: "/logo-sekolah.png",
        width: 800,
        height: 600,
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  icons: {
    icon: "/logo-sekolah.png",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HighSchool",
  name: "SMA PGRI 1 Lumajang",
  url: "https://smapgri1lumajang.sch.id",
  logo: "https://smapgri1lumajang.sch.id/logo-sekolah.png",
  description: "Mencetak generasi unggul, religius, cerdas, terampil, dan siap kerja di industri masa depan.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Jl. K.H. Wachid Hasyim No.20-B",
    addressLocality: "Lumajang",
    addressRegion: "Jawa Timur",
    postalCode: "67311",
    addressCountry: "ID",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="id"
      suppressHydrationWarning
      className={`${inter.variable} ${lora.variable} font-sans h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-slate-50 text-slate-900 antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
