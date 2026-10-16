// サイトの全文言と URL。更新はこのファイルを直して push する (ハタチたち公式と同じ運用)。
// 出典が無い数字・日付は入れない。推測で埋めた値はここに置かない。
// 2026-10-16 に、YD が完成させたデザイン (claude.ai の Artifact「Studio Metali」) の文言へ全面的に差し替えた。

// title と description は検索結果に出る文。屋号 (スタジオメタリ) と名前 (Metalina / めたりな) で検索した人に
// 本人のサイトだと分かるよう、両方を前半に入れている。Google は title を全角 30 字前後、description を 80〜120 字で切る
export const SITE = {
  name: "スタジオメタリ",
  nameRoman: "Studio Metali",
  title: "スタジオメタリ｜ダンサー・振付師 Metalina（めたりな）公式サイト",
  description:
    "神奈川を拠点に活動するダンサー・振付師 Metalina（めたりな／鈴木理那）の公式サイト。NHK紅白歌合戦 YOASOBI「群青」ダンサー出演、アイドルの振付制作、キッズから大人までのHIPHOPレッスン・出張WS、ダンス映像「ハタチたち」のプロデュース。お仕事のご依頼はフォームから。",
  domain: "studiometali.com",
  instagram: "https://www.instagram.com/metalina_831/",
  xHandle: "@metalina_831",
  x: "https://x.com/metalina_831",
  tiktok: "https://www.tiktok.com/@metalina_831",
  youtube: "https://youtube.com/@studio_metali",
  hatachitachi: "https://hatachitachi.com/",
} as const;

export const PROFILE = {
  name: "Metalina",
  nameKana: "めたりな",
  realName: "鈴木 理那",
  // 構造化データ (json-ld.tsx) に使う。ページ本文に書いてある事実だけ
  region: "神奈川県",
  jobTitles: ["ダンサー", "振付師", "プロデューサー"],
  knowsAbout: ["ダンス", "振付", "HIPHOP", "ダンスレッスン", "ダンス映像", "イベント企画"],
  roles: "Dancer / Choreographer / Producer",
  lead: ["ダンスで、", "人と人をつなぐ。"],
  body: "神奈川県を拠点に、ダンサー・振付師・イベントプロデューサーとして活動しています。これまでにNHK紅白歌合戦でのダンサー出演やアイドルグループの振付を担当してきました。二十歳100人でダンス映像をつくる「ハタチたち」のプロデュースや、チャリティイベントの主催もしています。",
} as const;

export const NAV = [
  { href: "#about", en: "PROFILE", ja: "プロフィール" },
  { href: "#service", en: "SERVICE", ja: "依頼メニュー" },
  { href: "#projects", en: "PROJECTS", ja: "主な活動" },
  { href: "#gallery", en: "GALLERY", ja: "写真" },
  { href: "#cv", en: "CAREER", ja: "経歴" },
  { href: SITE.hatachitachi, en: "HATACHI TACHI", ja: "ハタチたち公式 ↗", external: true },
  { href: "#contact", en: "CONTACT", ja: "お問い合わせ" },
] as const;

// 写真。幅の一覧は scripts/build-assets.mjs の書き出し幅と揃える (/assets/<name>-<幅>.webp)
export type Photo = {
  name: string;
  widths: readonly number[];
  width: number;
  height: number;
  alt: string;
};

export const PHOTOS = {
  hero: { name: "hood-tilt", widths: [800, 1067], width: 1067, height: 1600, alt: "青い布のフードをかぶって首をかしげるMetalinaのポートレート" },
  heroFg: { name: "hood-tilt-fg", widths: [800, 1067], width: 1067, height: 608, alt: "" },
  about: { name: "stool", widths: [800, 1200], width: 1200, height: 1600, alt: "キャップをかぶってスツールに座るMetalina" },
  hatachi: { name: "hatachi-group", widths: [800, 1200], width: 1200, height: 1600, alt: "ハタチたちの参加者の集合写真" },
  himerLogo: { name: "himer-logo", widths: [400], width: 400, height: 400, alt: "Hi,Me:)のメインビジュアル" },
  charity: { name: "charity", widths: [800, 1600], width: 1600, height: 1200, alt: "フィリピンでのダンスワークショップに参加した子どもたちとの集合写真" },
} as const satisfies Record<string, Photo>;

export const SERVICE = {
  heading: ["Work", "With Me"],
  lead: ["振付・レッスン指導、", "承ります。"],
  items: [
    {
      en: "CHOREOGRAPHY",
      title: "振付制作",
      body: "アイドルグループの楽曲やダンスナンバー、イベントのショーケースなどの振付をつくります。",
      tags: ["アイドル", "ナンバー", "イベント"],
    },
    {
      en: "LESSON",
      title: "レッスン指導・WS",
      body: "キッズから大人、アイドルグループまで、HIPHOPを中心に教えています。少人数グループへの出張レッスンもご相談ください。",
      tags: ["キッズ", "大人", "アイドル", "出張"],
    },
    {
      en: "PERFORMANCE",
      title: "ダンサー出演",
      body: "CM、MV、ライブなどに出演します。NHK紅白歌合戦ではYOASOBI「群青」のダンサーとして出演しました。",
      tags: ["CM", "MV", "ライブ", "ダンスイベント"],
    },
    {
      en: "DIRECTION",
      title: "映像ディレクション・イベント企画",
      body: "ダンス映像のディレクションのほか、ディレクションアシスタントや撮影サポートも承ります。ダンスイベントの企画・運営もしています。",
      tags: ["映像ディレクション", "アシスタント・サポート", "イベント企画・運営"],
    },
  ],
} as const;

export const HATACHI = {
  tag: "Project — Produce",
  heading: ["Hatachi", "Tachi"],
  ja: "ハタチたち",
  body: "二十歳の100人が、ゼロから一本のダンス映像をつくるプロジェクトです。2022年から毎年開催していて、完成した映像は川崎市・相模原市・福島市の成人式で上映されています。",
  facts: ["2022〜毎年開催", "川崎市・相模原市・福島市で上映", "平成たち祭"],
  links: [
    { label: "映像を見る ↗", href: "https://youtu.be/pkBvdMpLzx8" },
    { label: "Instagram ↗", href: "https://www.instagram.com/hatachi_tachi/" },
  ],
} as const;

export const HIME = {
  tag: "Project — Dance Team",
  heading: "Hi,Me:)",
  ja: "ハイミー",
  body: "2025年に結成した2人組のダンスチームです。国内のイベントに出演しているほか、海外でワークショップも開いています。",
  facts: ["2025〜", "2人組ダンスチーム"],
  links: [
    { label: "Instagram ↗", href: "https://www.instagram.com/hihi.meme.jp/" },
    { label: "TikTok ↗", href: "https://www.tiktok.com/@hihi.meme.jp" },
    { label: "YouTube ↗", href: "https://youtube.com/@danceteam-hime" },
  ],
  videoId: "iZmdtR8Co74",
} as const;

export const CHARITY = {
  tag: "Project — Charity",
  heading: ["Dance de", "Charity"],
  ja: "ダンスでチャリティ",
  body: "ダンスを通じて社会に何かを返したいという思いから、チャリティ企画を主催しています。",
} as const;

export const GALLERY = [
  { name: "hood-front", widths: [600, 1200], width: 1200, height: 1600, alt: "青い布のフードをかぶったMetalina" },
  { name: "phone-booth", widths: [600, 1179], width: 1179, height: 1179, alt: "公衆電話の前でサングラスをずらすMetalina" },
  { name: "party-hat", widths: [600, 1067], width: 1067, height: 1600, alt: "青いパーティーハットを持つMetalina" },
  { name: "hero-hood-wide", widths: [800, 1600], width: 1600, height: 1067, alt: "青い布を顔のまわりに巻いたMetalinaのポートレート" },
  { name: "white-glitter", widths: [600, 1067], width: 1067, height: 1600, alt: "白い衣装のMetalina" },
] as const satisfies readonly Photo[];

// 経歴。year が無い行は年を出さない (振付は作品名だけ)。star は強調表示
export type CareerItem = { year?: string; text: string; star?: boolean };
export type CareerCard = { en: string; ja: string; wide?: boolean; items: readonly CareerItem[] };

export const CAREER: readonly CareerCard[] = [
  {
    en: "Performance",
    ja: "テレビ・CM・MV・ライブ出演",
    items: [
      { year: "2023", text: "JFLオープニングセレモニー 野田愛実ライブ メインダンサー" },
      { year: "2022", text: "NHK紅白歌合戦 YOASOBI「群青」", star: true },
      { year: "2022", text: "横浜中華街映画祭「Odore.」春節MV" },
      { year: "2021", text: "GANMI「SHUJINKO STYLE」" },
      { year: "2020", text: "Gulliver TVCM" },
      { year: "2018", text: "ポカリスエット TVCM" },
    ],
  },
  {
    en: "Choreography",
    ja: "振付",
    items: [
      { text: "FEEQUE「キミメモリー」「オツカレーション」「猫ジェラシー」「信じてしまったアタシが馬鹿でした」" },
      { text: "CRASH「このハカナイ世界で」" },
      { text: "まかろんぱぁてぃ「ニーハオ×ニーハオ」" },
      { text: "ビビッとときたかも！「アイスミラクル！！」" },
      { text: "振付アシスタント：AKB48「元カレです」、Zillion「TIMELESS」「やめとこっか」「One Day」" },
    ],
  },
  {
    en: "Produce",
    ja: "主催・プロデュース",
    items: [
      { year: "2025", text: "「ハタチたち4」プロデュース" },
      { year: "2024", text: "「ハタチたち3」プロデュース／「SALAD BOWL」主催" },
      { year: "2023", text: "「ハタチたち2」プロデュース" },
      { year: "2022", text: "「ハタチたち」総合監督／ライブ「とりあえず生で」共同主催" },
    ],
  },
  {
    en: "Teaching",
    ja: "インストラクター・講師",
    wide: true,
    items: [
      // 2025〜2023 の3行は 2026-10-16 YD 指示で書き換え (スタジオ名・施設名は出さない)
      { year: "2025–", text: "大人向けダンススタジオ インストラクター" },
      { year: "2024–", text: "少人数グループ向け出張クラスを展開／アイドルの振り付けや出張レッスン" },
      { year: "2023–", text: "学童・児童館等での小学生に向けたレッスン" },
      { year: "2020–", text: "アートクリエーションスタジオ HIPHOPインストラクター（小学校高学年〜高校生）" },
    ],
  },
  {
    en: "Talks & Awards",
    ja: "講演・コンテスト",
    items: [
      { year: "20–25", text: "神奈川県主催 産業人材育成フォーラム 講演（3回）" },
      { year: "2020", text: "GKKJ×HDI MOERO PROJECT ファイナリスト" },
    ],
  },
];

export const CONTACT = {
  lead: ["お仕事のご依頼・", "ご相談"],
  body: "振付やレッスン、出演、イベントのことなど、お仕事のご依頼やご相談はこちらからお気軽にどうぞ。内容を確認して、折り返しご連絡します。",
  sns: [
    { label: "Instagram", href: SITE.instagram },
    { label: "X", href: SITE.x },
    { label: "TikTok", href: SITE.tiktok },
    { label: "YouTube", href: SITE.youtube },
  ],
  // 送信は Web3Forms (https://web3forms.com)。access key は公開してよい値で、届け先のメールは Web3Forms 側で決まる。
  // 届け先を変えるときは Web3Forms で新しいキーを作ってここを差し替える
  form: {
    endpoint: "https://api.web3forms.com/submit",
    accessKey: "66e04f23-a49c-41b7-b516-6cbf13a4c5bf",
    subject: "【Studio Metali】HPからお問い合わせが届きました",
    fromName: "Studio Metali HP",
    types: ["振付制作", "レッスン指導・WS", "ダンサー出演", "映像ディレクション・イベント企画", "その他"],
  },
} as const;
