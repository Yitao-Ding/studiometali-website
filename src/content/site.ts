// サイトの全文言と URL。更新はこのファイルを直して push する (ハタチたち公式と同じ運用)。
// 出典が無い数字・日付は入れない。推測で埋めた値はここに置かない。

export const SITE = {
  name: "スタジオメタリ",
  nameRoman: "STUDIO METALI",
  tagline: "心躍る物語をダンスと映像で。",
  producedBy: "Produced by Metalina",
  description:
    "スタジオメタリは、ダンサー Metalina が主宰する屋号。二十歳100人のダンス映像「ハタチたち」、2人組ダンスチーム Hi,Me:)、ダンスでチャリティなど、ダンスと映像で物語をつくる活動をまとめています。",
  instagram: "https://www.instagram.com/metalina_831/",
  instagramHandle: "@metalina_831",
  youtube: "https://www.youtube.com/@Studio_Metali",
  tiktok: "https://www.tiktok.com/@metalina_831",
  x: "https://x.com/metalina_831",
  linktree: "https://linktr.ee/metalina831",
} as const;

export const NAV = [
  { href: "#about", label: "ABOUT" },
  { href: "#projects", label: "PROJECTS" },
  { href: "#works", label: "WORKS" },
  { href: "#profile", label: "PROFILE" },
  { href: "#service", label: "SERVICE" },
  { href: "#news", label: "NEWS" },
  { href: "#contact", label: "CONTACT" },
] as const;

export const ABOUT = {
  heading: "スタジオメタリとは。",
  body: [
    "ダンサー・振付師の Metalina が、ダンスと映像でつくる物語の屋号です。",
    "その年の二十歳100人だけで踊るダンス映像「ハタチたち」を2023年から毎年制作し、川崎市・相模原市・福島市の成人式で上映してきました。",
    "友達2人の「本気のごっこ遊びダンス」Hi,Me:)、ワークショップの利益を全額寄付する「ダンスでチャリティ」、ハタチたちの卒業生が集まるイベント「平成たち祭」。",
    "踊る人も、観る人も、撮る人も、全員の心が躍る瞬間をつくることを大切にしています。",
  ],
} as const;

export type Project = {
  id: string;
  title: string;
  sub: string;
  body: string;
  image: string;
  imageAlt: string;
  href: string;
  linkLabel: string;
};

export const PROJECTS: Project[] = [
  {
    id: "hatachitachi",
    title: "ハタチたち",
    sub: "二十歳100人でつくるダンス映像プロジェクト",
    body: "その年に二十歳を迎える100人だけでダンス映像を1本つくる。ダンサーも運営も撮影も編集も全員が二十歳。2023年の初代から毎年続き、第2作からは川崎市の成人式で上映。第5作「ハタチたち5」を制作中。",
    image: "/assets/project-hatachitachi.webp",
    imageAlt: "円陣を組むハタチたちのメンバー",
    href: "https://hatachitachi.com",
    linkLabel: "公式サイト",
  },
  {
    id: "hime",
    title: "Hi,Me:)",
    sub: "友達2人の、本気のごっこ遊びダンス",
    body: "菅野日菜との2人組ダンスチーム。2025年2月結成。「友達がゾンビになった時の対処法」「鏡に恋して」など物語仕立ての作品を Instagram と YouTube で発信し、ダンスイベントへの出演やワークショップも行っています。",
    image: "/assets/project-hime.webp",
    imageAlt: "Hi,Me:) のアーティスト写真",
    href: "https://www.instagram.com/hihi.meme.jp/",
    linkLabel: "Instagram",
  },
  {
    id: "dance-de-charity",
    title: "ダンスでチャリティ",
    sub: "ダンスの可能性で支え合える世界",
    body: "ダンスワークショップの売上からスタジオ代などの経費を引いた全額を寄付する企画。寄付先の団体を訪ねた映像も制作しています。これまでの寄付先はセブ島の孤児院を支援する Christ For Asia International、NPO法人一匹でも犬・ねこを救う会。",
    image: "/assets/silhouette.webp",
    imageAlt: "スタジオで踊る Metalina のシルエット",
    href: "https://www.instagram.com/dance_de_charity/",
    linkLabel: "Instagram",
  },
  {
    id: "heiseitachi",
    title: "平成たち祭",
    sub: "ハタチたちの卒業生が集まるダンスイベント",
    body: "歴代のハタチたち参加者が同窓会のように集まるダンスイベント。vol.2 は2026年9月14日、新宿 Motion にてショーケース形式で開催。",
    image: "/assets/project-heiseitachi.webp",
    imageAlt: "平成たち祭の集合写真",
    href: "https://www.instagram.com/hatachi_tachi/",
    linkLabel: "Instagram",
  },
];

export type Work = {
  videoId: string;
  title: string;
  year: string;
  note: string;
};

// YouTube スタジオメタリ (@Studio_Metali) の公開動画。ID は公式チャンネルのフィードから取得
export const FEATURED_WORK: Work = {
  videoId: "RigEjrlltEM",
  title: "ハタチたち4 - 「ピーターパン」優里",
  year: "2026",
  note: "撮影: 相模女子大学。川崎市・相模原市・福島市の成人式で上映",
};

export const WORKS: Work[] = [
  { videoId: "DQTgxCvuGRY", title: "ハタチたち3 -「かくれんぼ」AliA", year: "2025", note: "川崎市・相模原市の成人式で上映" },
  { videoId: "SLzwOObZcm8", title: "ハタチたち2 - 「生きるをする」マカロニえんぴつ", year: "2024", note: "川崎市の成人式で上映" },
  { videoId: "pkBvdMpLzx8", title: "ハタチたち［二十歳 - LUCCI］", year: "2023", note: "初代。撮影: 自由ヶ丘学園高等学校" },
  { videoId: "Tkoxy3rSYSM", title: "【ハタチたち2】メイキング映像", year: "2024", note: "" },
  { videoId: "DHRB__8jMTo", title: "【ハタチたち2】Special Dance ver.", year: "2024", note: "" },
  { videoId: "tg2G2mIlEmc", title: "ハタチたち Behind The Scene", year: "2023", note: "" },
];

export const PROFILE = {
  name: "Metalina",
  nameKana: "めたりな",
  role: "Dancer / Choreographer / Event Organizer",
  intro: [
    "2002年生まれ、川崎市出身。10歳からダンスを始め、ジュニアクルー CJDA を経て、2021年の第72回NHK紅白歌合戦に YOASOBI「群青」のダンサーとして出演。",
    "東洋大学在学中の2023年、二十歳100人でダンス映像をつくる「ハタチたち」を発案・主催。以来プロデューサーとして毎年制作を続け、神奈川新聞に3度取り上げられました。",
    "現在はスタジオメタリを屋号に、ダンサー・振付・イベントの企画運営・ダンスレッスン (Hiphop / R&B) を行っています。",
  ],
  timeline: [
    { year: "2012", text: "10歳でダンスを始める" },
    { year: "2021", text: "第72回NHK紅白歌合戦 YOASOBI「群青」ダンサーとして出演" },
    { year: "2023", text: "「ハタチたち」発案・主催。第1作を公開 (5月)" },
    { year: "2024", text: "「ハタチたち2」川崎市の成人式で上映。神奈川新聞に掲載" },
    { year: "2024", text: "味の素 presents MissCollegeDancer 2024 FINAL 出場" },
    { year: "2025", text: "「ハタチたち3」川崎市・相模原市で上映。Hi,Me:) 結成 (2月)" },
    { year: "2026", text: "「ハタチたち4」川崎市・相模原市・福島市で上映。「ハタチたち5」始動" },
  ],
} as const;

export type Service = { title: string; body: string };

export const SERVICES: Service[] = [
  {
    title: "振付・出演",
    body: "ミュージックビデオ、イベント、舞台への振付と出演。Hi,Me:) としての出演もご相談ください。",
  },
  {
    title: "ワークショップ・レッスン",
    body: "Hiphop / R&B のレッスン、学校や自治体、団体向けのダンスワークショップ。子どもから大人まで、初心者向けの内容も組み立てます。",
  },
  {
    title: "イベントの企画・プロデュース",
    body: "ハタチたち・平成たち祭・ダンスでチャリティで培った、100人規模の企画の立ち上げから当日運営まで。自治体や学校との連携もお任せください。",
  },
  {
    title: "ダンス映像の制作",
    body: "企画・振付・撮影・編集までを一貫して。撮影は映像作家 Yitao Film と共同で行います。",
  },
];

export type NewsItem = { date: string; title: string; body: string; href: string | null };

// 日付は公式の告知に書かれているものだけ入れる
export const NEWS: NewsItem[] = [
  {
    date: "2026-09-14",
    title: "平成たち祭 vol.2 を新宿 Motion で開催",
    body: "OPEN 17:30 / START 18:00。Hi,Me:) も出演。終演後にハタチたち5の説明会 (入場無料) を予定。",
    href: "https://www.instagram.com/hatachi_tachi/",
  },
  {
    date: "2026-09-19",
    title: "Hi,Me:) Summer Dance Workshop",
    body: "14:15〜15:45、studio worcle (池尻大橋)。参加費 2,500円。",
    href: "https://www.instagram.com/hihi.meme.jp/",
  },
  {
    date: "2026-08-01",
    title: "「ハタチたち5」ダンサー募集中 (9月30日まで)",
    body: "2027年に成人式を迎える代が対象。ダンス歴は問いません。詳細と応募は公式サイトへ。",
    href: "https://hatachitachi.com",
  },
];

// Instagram 埋め込み (公式 blockquote)。差し替えは URL を入れ替えるだけ
export const INSTAGRAM_POST_URLS: string[] = [
  "https://www.instagram.com/p/Dcs61I-E3Ar/",
  "https://www.instagram.com/reel/DcgN5EXTG3j/",
];

export const CONTACT = {
  heading: "お仕事のご相談",
  body: "振付・出演・ワークショップ・イベント企画・映像制作のご相談は、Instagram のダイレクトメッセージからお願いします。学校・自治体・企業の方もお気軽にどうぞ。",
  primaryHref: SITE.instagram,
  primaryLabel: "Instagram で連絡する",
} as const;
