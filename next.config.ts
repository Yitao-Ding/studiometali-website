import type { NextConfig } from "next";
import path from "node:path";

// 2026-10-16 から Cloudflare Workers (静的アセット) で配信している。`next build` で out/ に静的ファイルを書き出し、
// wrangler.jsonc がそのフォルダをそのまま公開する。サーバーは動かない。
// 静的書き出しでは next.config の headers() / redirects() が使えないので、
// セキュリティヘッダは public/_headers に置いている (理由と見方は docs/security.md)。
const nextConfig: NextConfig = {
  output: "export",
  turbopack: {
    // 親ディレクトリの package-lock.json 等に引きずられないよう workspace root を固定する
    root: path.resolve("."),
  },
  images: {
    // 画像は全て事前 WebP 化した静的ファイル (scripts/build-assets.mjs)。静的書き出しでは画像最適化が使えない
    unoptimized: true,
  },
};

export default nextConfig;
