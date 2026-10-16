import type { Metadata, Viewport } from "next";
import { Archivo, DM_Mono, Zen_Kaku_Gothic_New } from "next/font/google";
import "./globals.css";
import { SITE } from "@/content/site";
import { SITE_URL } from "@/lib/site-url";

// 英字の大見出し。font-stretch: 125% (Expanded) を使うので幅の軸 (wdth) も読み込む
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
});

// 日本語フォントは preload しない (unicode-range で 100 以上に分割されており、
// preload すると head に <link rel=preload> が 100 本以上並ぶ)。
const zenKaku = Zen_Kaku_Gothic_New({
  variable: "--font-zen-kaku",
  weight: ["500", "700", "900"],
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  weight: ["400", "500"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE.title, template: `%s | ${SITE.nameRoman}` },
  description: SITE.description,
  keywords: ["スタジオメタリ", "Studio Metali", "Metalina", "めたりな", "鈴木理那", "振付", "振付師", "ダンサー", "ダンスレッスン", "ハタチたち", "Hi,Me:)"],
  openGraph: {
    title: SITE.title,
    description: SITE.description,
    type: "website",
    siteName: SITE.nameRoman,
    locale: "ja_JP",
    url: "/",
    images: [{ url: "/assets/ogp.jpg", width: 1200, height: 630, alt: SITE.nameRoman }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    description: SITE.description,
    images: ["/assets/ogp.jpg"],
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }, { url: "/assets/icon-512.png", sizes: "512x512", type: "image/png" }],
    apple: "/assets/icon-512.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#0B1530",
  colorScheme: "light",
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja" className={`${archivo.variable} ${zenKaku.variable} ${dmMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
