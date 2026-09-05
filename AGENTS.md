# This is NOT the Next.js you know

This version has breaking changes. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code.

# スタジオメタリ 公式サイト (studiometali.com)

- 単一ページ + 固定ヘッダー。CMS は使わない。文言・URL は全て `src/content/site.ts` (更新は Claude に口頭で伝えて push)
- 色: 水色 #6fb5d7 (YouTube アバター実測) / 紺 #12314a / 白。見出しは Klee One、本文は Noto Sans JP、英字ラベルは Cormorant Garamond
- 画像は `scripts/build-assets.mjs` で元素材から WebP 化して `public/assets/` に置く。Vercel 画像最適化は使わない (`images.unoptimized`)
- 姉妹サイト: ハタチたち https://hatachitachi.com (`~/AI projects/hatachi-tachi-website`)。セキュリティヘッダ・CSP・運用ルールはそちらと同じ
- dev: `pnpm dev --port 3211`
