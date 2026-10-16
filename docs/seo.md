# 検索対策 (SEO)

2026-10-16 に整備。狙いは2つ。

1. 名前・屋号で検索した人に必ず出る: 「スタジオメタリ」「Studio Metali」「Metalina」「めたりな」「鈴木理那」
2. 依頼を探している人に見つけてもらう: 「振付 依頼 神奈川」「アイドル 振付師」「キッズ HIPHOP 出張レッスン」など

1 はコードと Search Console の登録で数日〜2週間で効く。2 は競争相手 (ココナラ・ランサーズの出品ページ) が強く、1ページのサイトでは届かない。専用のページと外部からのリンクが要る (下の「これから」)。

## コード側で入れたこと

- title: `スタジオメタリ｜ダンサー・振付師 Metalina（めたりな）公式サイト`。屋号と名前を前半に置く
- description: 拠点 (神奈川)、紅白出演、振付・レッスン・出張WS、ハタチたちを前半 80 字に入れた
- 構造化データ (`src/components/json-ld.tsx`): WebSite (検索結果に出るサイト名を「スタジオメタリ」に)、ProfilePage + Person (Metalina 本人。別名に めたりな / 鈴木理那、SNS を sameAs)、Organization (屋号。YouTube を sameAs、依頼メニュー4つを makesOffer)、Hi,Me:) を memberOf
- 画像サイトマップ (`src/app/sitemap.ts`): 本人の写真7枚を載せ、画像検索に出す。lastmod はビルド時刻
- robots メタ: `max-image-preview:large` (検索結果で写真を大きく出してよい)
- 文言・値は全て `src/content/site.ts`。ページに書いていない事実 (対応エリア、料金など) は構造化データにも書かない

## コードの外でやること (YD / Mac の Claude)

公開 (studiometali.com が Cloudflare で表示される) の後に、上から順に。

1. Google Search Console に「ドメイン」プロパティで studiometali.com を登録。DNS が Cloudflare なので、所有権の確認は Search Console の画面から Cloudflare を選ぶと TXT レコードを自動で入れられる (出なければ表示された TXT を Cloudflare の DNS に手で入れる)
2. Search Console → サイトマップ → `https://studiometali.com/sitemap.xml` を送信
3. Search Console → URL 検査 → `https://studiometali.com/` →「インデックス登録をリクエスト」
4. Bing Webmaster Tools に Search Console から取り込み (Bing は ChatGPT の検索や Copilot の元データにもなる)
5. Cloudflare → studiometali.com → Caching → Configuration → Crawler Hints を ON (内容が変わった時に Bing などへ自動で知らせる)
6. Cloudflare の AI クローラーの設定 (AI Crawl Control / Block AI bots、管理された robots.txt) を確認する。Google と Bing の検索には影響しないが、ChatGPT や Perplexity の検索に出したいなら、検索用のクローラーは止めない
7. 本人の SNS のプロフィールのリンクを https://studiometali.com にする: Instagram @metalina_831、X、TikTok、YouTube チャンネル (スタジオメタリ) の「リンク」、Hi,Me:) の各アカウント
8. 姉妹サイト hatachitachi.com からリンクを張る (フッターに「Produced by スタジオメタリ」など)。関係のあるサイトからのリンクは効きが大きい

確認: 1〜2週間後に Google で「スタジオメタリ」「Metalina ダンサー」「めたりな 振付」を検索し、1位に出るか。Search Console の「検索パフォーマンス」で、どの言葉で何回表示・クリックされたかが見える。

## これから (依頼の検索に出るため)

1ページでは「振付 依頼」のような言葉で上位に出るのは難しい。効くのは、言葉ごとの専用ページ。

- レッスン・出張WS のページ: 対象 (キッズ / 大人 / アイドル)、行ける範囲、料金の目安、流れ、よくある質問。「神奈川 キッズ ダンス 出張レッスン」のような長めの言葉を拾う
- 振付実績のページ: 作品ごとに動画と説明 (FEEQUE、CRASH など)。グループ名で検索したファンや運営に見つけてもらえる
- お知らせ: 出演・イベントの告知。更新があるサイトは再訪問されやすい
- Google ビジネスプロフィール (住所を出さない「出張型」で登録できる): 地図検索の「振付 神奈川」に出る可能性がある。本人確認 (動画など) が要る

どれも本人から中身 (料金、行ける範囲、作品の動画) をもらう必要がある。
