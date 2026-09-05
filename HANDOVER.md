# HANDOVER — スタジオメタリ 公式サイト (studiometali.com)

最終更新: 2026-09-06

## 現状

Next.js 16.3.4 + React 19 + Tailwind v4 の単一ページ。CMS は使わず、文言・URL は `src/content/site.ts` に直書き
(ハタチたち公式と同じ運用: 更新は Claude に口頭で伝えて push)。`pnpm build` / `pnpm lint` 緑。

姉妹サイトのハタチたち (`~/AI projects/hatachi-tachi-website`) から設定 (next.config のセキュリティヘッダ・CSP・
pnpm-workspace・eslint) を引き継ぎ、microCMS 依存だけ外した。

## 調べて分かったこと (2026-09-06)

- LINE トーク履歴 (2026-08-30 保存分) を全文検索した結果、スタジオメタリ本体の HP モックアップ (Canva / Google サイト) の
  リンクは無かった。Canva リンク 7 本は全て開いて確認済み:
  DAHCaP6QDmY = 空の 4:3 / DAHCaAEuskQ = 平成たち祭 RE:PLAYGROUND 資料 / DAG-dR40J3I = Arte grow 資料 /
  qrui6wv0q37e2e9 = 1時間撮り放題キャンペーン IG 投稿 / fmlymmgz7tbr83i = サムネ / z6hue3rxkp6xj4x = しおり表紙 /
  34707g8vpyurk5o = ハタチたち Webサイト (1ページ、公開済みの hatachitachi.com の元)
- 本人は 2026-07-08 の会話で「1年前に Google サイトで HP の仕組みは作った」と言っているが、リンクは履歴に無く、
  Web 検索でも見つからない。したがってモックアップ無しで、YouTube チャンネルのブランド (水色 + 手書き「め。」) と
  `資料/metalina_research_2026-08-24.md` の一次情報からゼロ設計した
- ブランド色は YouTube アバターの背景平均 (111,181,215) = #6fb5d7。ロゴは同アバターの白い手書き「め。」を抜き出した
  (`資料/logo_me_white.png`)。見出し書体はサムネ制作で使っている Klee (Klee One)

## 構成

ヘッダー (固定) → HERO → ABOUT → PROJECTS (ハタチたち / Hi,Me:) / ダンスでチャリティ / 平成たち祭) → WORKS (YouTube 7本、
ファサード) → PROFILE (経歴 + 年表) → SERVICE (振付・出演 / WS・レッスン / イベント企画 / 映像制作) → NEWS → INSTAGRAM (公式埋め込み 2件)
→ CONTACT (Instagram DM) → フッター。JSON-LD (Organization + Person + WebSite) 入り。

## 写真の出どころ

`scripts/build-assets.mjs` に全部書いてある。ヒーロー・SERVICE = 2026-08-07 スタジオ撮影 (`ALL WORKs/つんた_2026-08/写真_JPG`)、
PROFILE・ダンチャリ = 2026-07 納品 (`つんた_2026-07/納品`)、ABOUT = 2024-09 Leica (`Yitao HDD/りな_2024-2026`)、
Hi,Me:) = 2025-02-04 アー写仕上げ (`Yitao HDD/HiMe_2026`)、ハタチたち・平成たち祭 = ハタチたち公式サイトと同じ素材。
外付け HDD が無くても `public/assets/` の WebP はリポジトリに入っているので再生成は不要。

## 公開

- GitHub: `Yitao-Ding/studiometali-website`
- Vercel: プロジェクト `studiometali` (yitao-ding)、本番 https://studiometali.com
- DNS: お名前.com 側 (ハタチたちと同じ方式)。手順と実際のレコード値は `docs/domain-setup.md`

## 内容の裏取りが要るところ

- SERVICE の「ダンス映像の制作 (Yitao Film と共同)」: 料金は載せていない。2026 年限定価格 (LINE 2026-05-18 の投稿文) を出すなら site.ts に追記
- NEWS の日付・会場は 2026-08-24 の調査時点の公開情報。開催後は消すか差し替える
- PROFILE の経歴は 神奈川新聞 3 記事 + 本人 SNS の一次情報のみ。本名は載せていない

## 罠

ハタチたちの HANDOVER と同じ (next/font の変数は `<html>` / 日本語フォントは preload しない / cacheComponents は有効化しない /
Tailwind の display 固定は避ける)。加えて:

- ヒーローの「スタジオメタリ」は `<span class=block>` で「スタジオ」「メタリ」に割っている。1 行に戻すと 1280px でも
  「スタジオメ/タリ」で折れる
- Instagram 埋め込みは viewport に入ってから embed.js を読むので、fullPage スクショでは空に見える。scrollTo してから撮る
