# HANDOVER — スタジオメタリ 公式サイト (studiometali.com)

最終更新: 2026-10-16

## 現状

2026-10-16 に、YD が claude.ai の Artifact で完成させたデザイン (https://claude.ai/artifact/1HWb61kAvaKddDgjTCD7cm) へ全面的に差し替えた。
Next.js 16.3.4 + React 19 の単一ページを静的書き出し (`output: "export"`) し、Cloudflare Workers の静的アセットで配る。
文言・URL は `src/content/site.ts` に直書き (更新は Claude に口頭で伝えて push)。`pnpm build` / `pnpm lint` / `tsc` 緑。

構成: 固定ナビ (MENU で開閉) → HERO → PROFILE → SERVICE (4つ) → PROJECTS (ハタチたち / Hi,Me:) / Dance de Charity) → GALLERY (5枚) → CAREER (5分類) → CONTACT (Web3Forms のフォーム + SNS) → フッター。JSON-LD (Organization + Person + WebSite) 入り。

Artifact からの移し方:
- CSS は Artifact のものを `src/app/globals.css` にほぼそのまま移した。Tailwind は外した (preflight が見た目を変えるため)。Artifact の実行環境が足していた `body{margin:0}` と `[hidden]` の非表示は自前で持つ
- 書体 (Archivo / Zen Kaku Gothic New / DM Mono) は Google Fonts の直リンクから next/font の自前配信に変えた
- 写真は Artifact の `img/` を `scripts/build-assets.mjs` で WebP 化し、幅2種の srcset で出す (`src/components/ui/photo.tsx`)
- 原本と同じ幅 (1440 / 390) で Playwright のフルページを撮って画素比較し、差は PC 1.3% / スマホ 2.4% (文字の描画と画像の再圧縮)。目視で同じ
- OGP (`public/assets/ogp.jpg`) は写真を右に寄せ、左にヒーローと同じ「STUDIO / METALI」を置いた

## 公開

- GitHub: `Yitao-Ding/studiometali-website`
- Cloudflare: Worker `studiometali` (YD のアカウント)。main への push で本番、他のブランチと PR はプレビュー URL
- DNS: Cloudflare (ドメインの登録はお名前.com のまま)。手順と経緯は `docs/domain-setup.md`
- 旧ホスティングの Vercel プロジェクト `studiometali` は使っていない。後片付けは `docs/domain-setup.md` の 8

## 検索対策

title・description・構造化データ (ProfilePage / Person / Organization / WebSite)・画像サイトマップを入れてある。
Search Console の登録など、コードの外でやることと、今後の専用ページの案は `docs/seo.md`。

## 確認待ち (2026-10-16 時点)

- 本名「鈴木 理那」をヒーローと説明文・構造化データに出している (Artifact のまま)。旧サイトは本名を出さない方針だったので Metalina の了承を確認する。出さないなら `site.ts` の `PROFILE.realName` と `SITE.description` を直す
- 問い合わせフォームの届け先: Web3Forms の access key (Artifact のまま) に紐づくメールアドレス。Metalina に届くか、本番で1回送って確かめる
- ファビコン (`src/app/icon.svg` / `public/assets/icon-512.png`) は旧デザインの水色の「め」のまま

## 罠

- next/font の変数は `<html>` に付ける (body だと `:root` の `--wide` などから解決できない)
- 日本語フォントは preload しない (unicode-range で100以上に分割され、preload タグが100本以上並ぶ)
- 静的書き出しでは next.config の headers() / redirects() が使えない。ヘッダは `public/_headers`、www → apex はゾーンの Redirect Rule
- `robots.ts` / `sitemap.ts` は `export const dynamic = "force-static"` が無いとビルドが止まる
- スマホのヒーローは写真の上に顔の切り抜き (`hood-tilt-fg`) を重ねて、「METALI」の手前に顔を出している。写真を差し替える時は切り抜きも作り直す
- `scripts/build-assets.mjs` の OGP の文字は OS にインストールされた Archivo Expanded Black で描く。入っていないと別の書体になる (スクリプトのコメント参照)
- 本番と同じ配信の確認は `pnpm preview` (`next build` の後に `wrangler dev`)。ヘッダと 404 も本番と同じになる。`next start` は静的書き出しでは使えないので scripts から外した
