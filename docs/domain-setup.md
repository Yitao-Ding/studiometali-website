# studiometali.com を Cloudflare で公開する手順

2026-10-16 に決めた形: ドメインの登録はお名前.com のまま、DNS とホスティングは Cloudflare。
Cloudflare は YD のアカウント (yitaofilm.com と同じ) を使う。
サイトは Cloudflare Workers の静的アセットで配る (`wrangler.jsonc`)。GitHub の main に push すると Workers Builds が `pnpm build` → `npx wrangler deploy` を走らせる。

順番が大事。ゾーンが Active になる前に Workers Builds をつなぐと、`wrangler.jsonc` の Custom Domain の設定で最初のデプロイが失敗する (失敗しても害は無く、Active になってから Retry すればよい)。

## 1. 事前確認

```bash
dig +short NS studiometali.com     # 2026-10-16 時点では dns1/dns2.onamae.com (お名前.com のパーキング) のはず
dig +short studiometali.com A
dig +short www.studiometali.com
```

メール (MX) は使っていない。消して困るレコードは無い。

## 2. Cloudflare にゾーンを追加する

1. https://dash.cloudflare.com → 「Add a domain」(ドメインを追加) → `studiometali.com` → 既存レコードの自動スキャンは ON のままでよい
2. プランは Free
3. スキャンで取り込まれた `studiometali.com` と `www` の A / CNAME (お名前.com のパーキング 150.95.255.x など) は削除する。残っていると、後で Workers の Custom Domain を付ける時に「既にレコードがある」で失敗する
4. 画面に出る Cloudflare のネームサーバー2本 (`xxxx.ns.cloudflare.com`) を控える

## 3. お名前.com でネームサーバーを変える

1. お名前.com Navi にログイン (Metalina のアカウント。hatachitachi.com と同じ)
2. 「ネームサーバー/DNS」→「ネームサーバー変更」→ `studiometali.com` だけを選ぶ。hatachitachi.com は触らない (Vercel で動いている)
3. 「その他のネームサーバーを使う」を選び、2 で控えた2本を入れる → 確認 → 設定
4. 途中で出る購入の誘い (ドメインプロテクション、別ドメインの無料登録、画面右下の「未申請のドメインがあります」) は全部断る

ドメインの登録自体はお名前.com に残る。更新 (2027-09-03) と自動更新はお名前.com 側のまま。

## 4. ゾーンが Active になるのを待つ

Cloudflare の studiometali.com の Overview で「Check nameservers now」を押す。数分〜1時間ほどで Active になる (最大 24 時間)。

```bash
dig +short NS studiometali.com     # xxxx.ns.cloudflare.com が2本返れば OK
```

Active になったら SSL/TLS → Edge Certificates →「Always Use HTTPS」を ON。

## 5. Workers Builds で GitHub とつなぐ

1. Workers & Pages → Create → 「Import a repository」(Git リポジトリから) → GitHub
2. 初回は Cloudflare の GitHub App のインストールを求められる。Yitao-Ding アカウントに入れ、リポジトリは `studiometali-website` だけ選ぶ (All repositories にしない)
3. リポジトリ `Yitao-Ding/studiometali-website` を選んで設定:

   | 項目 | 値 |
   |---|---|
   | Project name (Worker 名) | `studiometali` (`wrangler.jsonc` の name と一致させる。違うとビルドが失敗する) |
   | Production branch | `main` |
   | Build command | `pnpm build` |
   | Deploy command | `npx wrangler deploy` |
   | Builds for non-production branches | ON |
   | Non-production branch deploy command | `npx wrangler versions upload` |
   | Root directory | 空欄 (リポジトリ直下) |

4. Deploy。最初のビルドで `studiometali.com` と `www.studiometali.com` が Custom Domain として付き、DNS レコードと証明書も Cloudflare が作る (`wrangler.jsonc` の routes)

ビルドが pnpm のバージョンで失敗する時は、Settings → Build → Variables に `PNPM_VERSION` = `10.28.0` を足して Retry。

## 6. www を apex に 301 で寄せる

ゾーン studiometali.com → Rules → Redirect Rules → Create rule → テンプレート「Redirect from WWW to Root」→ 301、クエリ文字列は保持 → Deploy。

## 7. 確認

```bash
curl -sSI https://studiometali.com | head -12        # 200、content-security-policy などのヘッダが付く
curl -sSI https://www.studiometali.com | head -3     # 301 → https://studiometali.com/
curl -s -o /dev/null -w "%{http_code}\n" https://studiometali.com/nope   # 404
curl -s https://studiometali.com/robots.txt
```

ブラウザで https://studiometali.com を開き、PC とスマホ幅で表示、MENU の開閉、Hi,Me:) の動画、問い合わせフォームの送信 (Web3Forms の届け先にメールが届くこと) を確認する。

## 8. Vercel の後片付け

Vercel のプロジェクト `studiometali` は GitHub につながったままだと main への push のたびに無駄にビルドする。
Vercel → studiometali → Settings → Git → Disconnect。Domains に studiometali.com が残っていれば Remove。プロジェクトの削除は YD 判断。

## 過去の経緯

- 2026-09-05: ハタチたちと同じく、お名前.com の DNS に Vercel 向けの A / CNAME を入れる予定だった (hatachitachi.com はこの形で Vercel 運用中)。studiometali.com は DNS 未設定のまま、お名前.com のパーキングだった
- 2026-10-16: デザインを差し替え、仕事の依頼を受ける商用ページになったため、非商用限定の Vercel Hobby から Cloudflare に移した。ドメインの Cloudflare Registrar への移管は見送り (YD 判断)
