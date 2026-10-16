# This is NOT the Next.js you know

This version has breaking changes. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code.

# スタジオメタリ 公式サイト (studiometali.com)

- 単一ページ + 固定ナビ。CMS は使わない。文言・URL は全て `src/content/site.ts` (更新は Claude に口頭で伝えて push)
- デザインは 2026-10-16 に YD が claude.ai の Artifact で完成させたもの (https://claude.ai/artifact/1HWb61kAvaKddDgjTCD7cm)。CSS は `src/app/globals.css` にほぼそのまま移してある。Tailwind は使わない
- 色: ink #0B1530 / navy #0E1D4A / cobalt #2448C9 / sky #CFDDF3 / teal #17899E / ember #E2582C。英字の大見出しは Archivo (Expanded, 900)、本文は Zen Kaku Gothic New、ラベルは DM Mono (next/font で自前配信)
- 配信は Cloudflare Workers の静的アセット。`next build` が `out/` に静的書き出し (`output: "export"`) し、`wrangler.jsonc` がそれを配る。main への push で本番、それ以外のブランチはプレビュー URL。セキュリティヘッダは `public/_headers` (next.config の headers() は静的書き出しで使えない)
- 画像は `scripts/build-assets.mjs` で元素材から WebP 化して `public/assets/` に置く。画像最適化は使わない (`images.unoptimized`)
- 問い合わせフォームは Web3Forms (`site.ts` の CONTACT.form)。サーバー側のコードは無い
- 姉妹サイト: ハタチたち https://hatachitachi.com (`~/AI projects/hatachi-tachi-website`、こちらは Vercel のまま)
- dev: `pnpm dev --port 3211`。本番と同じ配信の確認は `pnpm preview` (`next build` → `wrangler dev`)
