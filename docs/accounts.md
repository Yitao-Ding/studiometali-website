# 引き継ぎ資産一覧 (スタジオメタリ)

事業の持ち主は Metalina (スタジオメタリは本人の屋号)。ドメインは本人のお名前.com アカウントで取ってある。
DNS と配信 (Cloudflare) とソースコード (GitHub) は、制作・運用を代行している YD のアカウントに置いている。
2026-10-16 に YD がこのままでよいと判断した (下の「名義について」)。

| サービス | 用途 | 現状 |
|---|---|---|
| GitHub | ソースコード | `Yitao-Ding/studiometali-website` (public) |
| Cloudflare | DNS とホスティング | YD のアカウント (yitaofilm.com と同じ)。ゾーン `studiometali.com`、Worker `studiometali` (2026-10-16 から) |
| お名前.com | ドメイン `studiometali.com` の登録 | Metalina のアカウント (登録メールは YD の Gmail なので、認証・更新の連絡は YD に届く)。2026-09-03 取得、自動更新 ON、更新期限 2027-09-03。ネームサーバーは Cloudflare を向く |
| Web3Forms | 問い合わせフォームの送信 | access key は `src/content/site.ts`。届け先メールは Web3Forms 側の設定 |
| Vercel | 旧ホスティング | yitao-ding アカウントのプロジェクト `studiometali`。Cloudflare 移行後は使っていない。Hobby プランは商用利用不可なので削除する |

## 名義について (2026-10-16)

ドメインが Metalina 名義なので、看板の持ち主は本人。Cloudflare と GitHub が YD 名義でも、法律・検索順位・広告の出稿に影響は無い
(Google 広告や Meta 広告の審査は広告主の本人確認で、サイトを置いているアカウントは問われない)。

YD 名義で困るのは「YD の手が要る作業」があることだけ:

- DNS を触る作業: Search Console の所有確認、Meta (Instagram 広告) のドメイン認証、独自ドメインのメール
- サイトの文言・コードの変更

本人のアカウントに移す時の手順 (所要 1 時間ほど、付け替えの 1〜2 分だけ止まる):

1. GitHub のリポジトリを Metalina のアカウントか本人がオーナーの Organization に移す (Settings → Transfer ownership)
2. Metalina の Cloudflare アカウントで `docs/domain-setup.md` の 2〜7 をやり直す (ゾーン追加 → お名前.com のネームサーバーを新しい 2 本に → Workers Builds → Custom Domain)
3. YD の Cloudflare から `studiometali.com` のゾーンと Worker を削除する
