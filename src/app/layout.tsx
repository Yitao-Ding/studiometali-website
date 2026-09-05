import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Klee_One, Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import { SITE } from "@/content/site";
import { SITE_URL } from "@/lib/site-url";

// 日本語フォントは preload しない (unicode-range で 100 以上に分割されており、
// preload すると head に <link rel=preload> が 100 本以上並ぶ)。
const notoJp = Noto_Sans_JP({
  variable: "--font-noto-jp",
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

// 手書き寄りの見出し用。サムネイル制作でも使っている書体 (Klee)
const klee = Klee_One({
  variable: "--font-klee",
  weight: ["400", "600"],
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  weight: ["400", "600"],
  subsets: ["latin"],
  display: "swap",
});

const TITLE = `${SITE.name} | ${SITE.tagline}`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: TITLE, template: `%s | ${SITE.name}` },
  description: SITE.description,
  keywords: ["スタジオメタリ", "Studio Metali", "Metalina", "めたりな", "ハタチたち", "Hi,Me:)", "ダンスでチャリティ", "ダンス", "振付"],
  openGraph: {
    title: TITLE,
    description: SITE.description,
    type: "website",
    siteName: SITE.name,
    locale: "ja_JP",
    url: "/",
    images: [{ url: "/assets/ogp.jpg", width: 1200, height: 630, alt: SITE.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: SITE.description,
    images: ["/assets/ogp.jpg"],
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }, { url: "/assets/icon-512.png", sizes: "512x512", type: "image/png" }],
    apple: "/assets/icon-512.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#6fb5d7",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja" className={`${notoJp.variable} ${klee.variable} ${cormorant.variable}`}>
      <body>{children}</body>
    </html>
  );
}
