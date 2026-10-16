import type { MetadataRoute } from "next";
import { GALLERY, PHOTOS } from "@/content/site";
import { SITE_URL } from "@/lib/site-url";

// 静的書き出し (output: "export") では force-static が無いとビルドが止まる
export const dynamic = "force-static";

// 本人の写真を画像検索にも載せる (Google の画像サイトマップ)。一番大きい幅のファイルを渡す
const largest = (p: { name: string; widths: readonly number[] }) =>
  `${SITE_URL}/assets/${p.name}-${p.widths[p.widths.length - 1]}.webp`;

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_URL}/`,
      // ビルドした時刻 (= 本番に出た時刻)
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
      images: [PHOTOS.hero, PHOTOS.about, ...GALLERY].map(largest),
    },
  ];
}
