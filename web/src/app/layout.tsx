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
  keywords: ["SMA PGRI 1 Lumajang", "SMAGRISA", "SMA Lumajang", "Sekolah Terbaik Lumajang", "PPDB SMA Lumajang", "Kurikulum Merdeka Lumajang"],
  authors: [{ name: "SMA PGRI 1 Lumajang" }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "SMA PGRI 1 Lumajang | The Character of Success",
    description: "Mencetak generasi unggul, religius, cerdas, terampil, dan siap kerja di industri masa depan.",
    url: "https://smapgri1lumajang.sch.id",
    siteName: "SMA PGRI 1 Lumajang",
    images: [
      {
        url: "/image.png",
        width: 1200,
        height: 630,
        alt: "Gedung dan Kampus SMA PGRI 1 Lumajang",
      },
      {
        url: "/logo-sekolah.png",
        width: 800,
        height: 800,
        alt: "Logo SMA PGRI 1 Lumajang",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SMA PGRI 1 Lumajang | The Character of Success",
    description: "Mencetak generasi unggul, religius, cerdas, terampil, dan siap kerja di industri masa depan.",
    images: ["/image.png"],
  },
  icons: {
    icon: "/logo-sekolah.png",
    apple: "/logo-sekolah.png",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HighSchool",
  name: "SMA PGRI 1 Lumajang",
  alternateName: ["SMAGRISA", "SMA PGRI 1"],
  url: "https://smapgri1lumajang.sch.id",
  logo: "https://smapgri1lumajang.sch.id/logo-sekolah.png",
  image: "https://smapgri1lumajang.sch.id/image.png",
  description: "Mencetak generasi unggul, religius, cerdas, terampil, dan siap kerja di industri masa depan.",
  telephone: "+62-334-881352",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Jl. K.H. Wachid Hasyim No.20-B",
    addressLocality: "Lumajang",
    addressRegion: "Jawa Timur",
    postalCode: "67311",
    addressCountry: "ID",
  },
  sameAs: [
    "https://facebook.com",
    "https://instagram.com",
    "https://youtube.com"
  ]
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
