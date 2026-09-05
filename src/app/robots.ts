import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-url";

// 独自ドメインが未設定の間 (= *.vercel.app のまま) はクロールさせない。
// 本番ドメインが付いた時点で自動的に許可へ切り替わる。
const isTemporaryHost = SITE_URL.includes("vercel.app") || SITE_URL.includes("localhost");

export default function robots(): MetadataRoute.Robots {
  if (isTemporaryHost) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
