# セキュリティと運用の手引き

2026-09-05 に整備、2026-10-16 にデザイン差し替えと Cloudflare 移行に合わせて書き直した。
このサイトは静的書き出し (`output: "export"`) で、サーバー側のコードもログインも無い。ユーザー入力は問い合わせフォームだけで、送信先は Web3Forms (サイトには保存も表示もしない)。
守るべきものは「公式ドメイン上で他人のスクリプトが動かないこと」「アカウント (GitHub / Cloudflare / お名前.com / Web3Forms / Gmail) が乗っ取られないこと」「ドメインが止まらないこと」の3つ。

## 入っている対策 (コード側、git に残る)

`public/_headers` で全ページに付けているヘッダ (Cloudflare Workers の静的アセットが読む。next.config の headers() は静的書き出しでは使えない):

| ヘッダ | 値 | 目的 |
|---|---|---|
| Content-Security-Policy | frame-ancestors 'none'; object-src 'none'; base-uri 'self' | 他サイトの iframe に公式サイトを埋め込まれない。`<object>` `<base>` の注入を封じる |
| Content-Security-Policy-Report-Only | default-src 'self' … (通信先の許可リスト) | ブロックはせず、許可外の通信を DevTools Console に出す。下の「CSP の見方」 |
| X-Content-Type-Options | nosniff | ファイル種別の誤認を防ぐ |
| Referrer-Policy | strict-origin-when-cross-origin | 外部リンク先に URL の詳細を渡さない |
| Permissions-Policy | camera, microphone, geolocation, payment, usb を無効 | 使わない機能を閉じる。autoplay / fullscreen は YouTube が使うので絞らない |
| X-Frame-Options | DENY | 古いブラウザ向けの frame-ancestors |
| Cross-Origin-Opener-Policy | same-origin | 別タブで開いたページから window を触られない |

`/_next/static/*` はファイル名にハッシュが入るので 1 年キャッシュ (immutable)。

Report-Only の許可先: 自サイト / YouTube の埋め込み (www.youtube-nocookie.com) / 問い合わせフォームの送信先 (api.web3forms.com)。
script-src の 'unsafe-inline' は外せない。Next.js の静的ページは RSC payload を inline `<script>` で埋め込み、nonce 方式は動的レンダリングでないと使えない。外すとメニューとフォームが動かなくなる。

問い合わせフォームのスパム対策は Web3Forms の honeypot (`botcheck`) だけ。スパムが増えたら Web3Forms の hCaptcha を検討する (CSP の script-src / frame-src に hCaptcha を足す必要がある)。
Web3Forms の access key は公開してよい値 (届け先のメールは Web3Forms 側で固定) なので `site.ts` に直書きしている。

### CSP の見方

Report-Only は「許可リストに無い通信があったら Console に書く」だけで、表示は一切変わらない。
確認は Chrome で https://studiometali.com を開き、右クリック → 検証 → Console。Hi,Me:) の動画を再生し、フォームを1回送ってから、`[Report Only] Refused to` で始まる行が無ければ問題なし。
YouTube の iframe 内部が出す警告 (発生元が youtube-nocookie.com のもの) と `Unrecognized feature: 'web-share'` は対象外なので無視してよい。

違反が出た時は `public/_headers` の Content-Security-Policy-Report-Only の行に足す:

- `Refused to frame 'https://www.youtube.com/…'` → 埋め込み方式を変えた時。frame-src に追加
- `Refused to connect to 'https://…web3forms…'` → Web3Forms の送信先が変わった時。connect-src と form-action に追加
- `Refused to load the image 'https://…'` → 外部の画像を直接貼った時。`scripts/build-assets.mjs` で取り込んで `public/assets` から出す

Report-Only を本当のブロック (enforce) に切り替えるのは、`Content-Security-Policy-Report-Only` を `Content-Security-Policy` に書き換えて、上の行の enforce 分と1本にまとめるだけ。ただし切り替えると、YouTube や Web3Forms が仕様を変えた時に無言で壊れる。「サイトを更新するたびに Console を見る」と決められる場合だけ切り替える。

## 依存パッケージの更新

- GitHub の Dependabot アラートとセキュリティ更新を ON にした。脆弱性が公開されると自動で PR が来る
- `.github/dependabot.yml` で月1回、通常の更新もまとめて PR が来る (メジャー更新は来ない。Next / React の大型更新は手で判断)
- PR が来たら、PR の Checks にある Cloudflare Workers Builds のプレビュー URL を開いてトップを確認 → 問題なければ Merge。手元では `git pull` 後に `pnpm install` (忘れても `pnpm dev` 時に自動で走る設定にしてある)
- `pnpm-workspace.yaml` の `minimumReleaseAge: 10080` で、公開から7日未満の版は `pnpm add` で取れない (乗っ取り直後の版を避ける)。急ぐ時は `pnpm add <pkg> --config.minimumReleaseAge=0`
- 手で確認したい時: `pnpm audit --prod`

## GitHub の設定 (repo Settings)

- Rulesets「protect-main-history」: main の削除と force push を禁止。通常の push は影響なし。履歴を書き換える必要が出たら一時的に Disable
- Secret scanning + Push protection: ON。API キーをコミットしようとすると push が止まる
- リポジトリは public。写真と文言はもとから公開情報だが、パスワード・API キー・個人の連絡先は絶対に入れない (`.env.local` は `.gitignore` 済み)

## YD が手でやること (コードでは守れない部分)

優先順:

1. お名前.com Navi: 移管ロック (ドメイン移管ロック) を ON、2段階認証を ON。どちらも無料。自動更新とカードの有効期限も確認 (次の更新 2027-09-03)。ネームサーバーを Cloudflare に向けた後は、お名前.com の「DNSレコード設定」は効かない
2. Cloudflare / GitHub / お名前.com / Web3Forms に紐づく Gmail の2段階認証を、SMS ではなく認証アプリかパスキーにする。リカバリーコードを保管
3. 外形監視 (任意、無料): UptimeRobot 等に https://studiometali.com を5分間隔で登録すると、落ちた時にメールが来る
4. 写真の原本を恒久フォルダ (`資料/site-img/`) に置いてバックアップ対象に入れる。git に入っているのは WebP 変換後だけ

## 改ざん・事故のときの戻し方

1. Cloudflare ダッシュボード → Workers & Pages → studiometali → Deployments → 直前の正常なバージョンの「⋯」→ Rollback (数秒で戻る)
2. その後、原因のコミットを `git revert <sha>` して push
3. アカウント乗っ取りが疑われる時は、先にパスワード変更と2段階認証の再設定、次に GitHub の Settings → Applications で見知らぬ連携を外す

## やらないと決めたこと (理由つき)

- CSP の nonce 方式: 動的レンダリングが必要になり、静的配信の利点を捨てるほどの脅威が無い
- HSTS の includeSubDomains / preload: サブドメインを http で使う可能性を潰す不可逆の設定。今は不要
- CAA レコード: Cloudflare が証明書の CA を切り替えた時に更新が止まる副作用がある
- CI (GitHub Actions): Workers Builds はビルドが失敗したら本番に出さないので、運用者1人の今は入れない。Dependabot PR の判定はプレビュー URL で足りる
