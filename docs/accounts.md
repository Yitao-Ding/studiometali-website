# 引き継ぎ資産一覧 (スタジオメタリ)

ハタチたち公式サイトと同じ方針。所有アカウントは PD (Metalina) 個人でよく、制作・技術は YD が代行している。

| サービス | 用途 | 現状 |
|---|---|---|
| GitHub | ソースコード | `Yitao-Ding/studiometali-website` (public) |
| Cloudflare | DNS とホスティング | YD のアカウント (yitaofilm.com と同じ)。ゾーン `studiometali.com`、Worker `studiometali` (2026-10-16 から) |
| お名前.com | ドメイン `studiometali.com` の登録 | 2026-09-03 取得、自動更新 ON、更新期限 2027-09-03。ネームサーバーは Cloudflare を向く |
| Web3Forms | 問い合わせフォームの送信 | access key は `src/content/site.ts`。届け先メールは Web3Forms 側の設定 |
| Vercel | 旧ホスティング | yitao-ding アカウントのプロジェクト `studiometali`。Cloudflare 移行後は使っていない (削除は YD 判断) |
