// 実素材を public/assets 用に切り出して WebP 化する。冪等。
// 元ファイルは YD の Mac / 外付け HDD にある撮影オリジナル (下の SRC 定義)。
// 差し替えるときは定義を直して `node scripts/build-assets.mjs` を再実行する。
import sharp from "sharp";
import path from "node:path";
import { mkdir, copyFile } from "node:fs/promises";

const OUT = path.resolve(import.meta.dirname, "../public/assets");
const ALL = "/Users/ittou/ALL WORKs";
const HDD = "/Volumes/Yitao HDD";
const HATACHI = "/Users/ittou/AI projects/hatachi-tachi-website/public/assets";
const SHIRYO = "/Users/ittou/AI projects/Studiometali HP/資料";

// [元ファイル, 出力名, 幅, 品質, アスペクト(任意), 縦アンカー(任意 0..1)]
const DEFS = [
  // ヒーロー: 2026-08-07 スタジオ撮影 (水色背景)。ブランド色と同系
  [`${ALL}/つんた_2026-08/写真_JPG/つんた_0807-050.JPG`, "hero-main.webp", 1600, 82],
  [`${ALL}/つんた_2026-08/写真_JPG/つんた_0807-036.JPG`, "hero-sub.webp", 1200, 80],
  [`${ALL}/つんた_2026-08/写真_JPG/つんた_0807-079.JPG`, "about-blue.webp", 1400, 80],
  // プロフィール: 2026-07 納品 (白ドレス) と 2024-09 Leica (teamLab)
  [`${ALL}/つんた_2026-07/納品/つんた-8.JPG`, "profile-white.webp", 1200, 82],
  [`${ALL}/つんた_2026-07/納品/つんた-7.JPG`, "silhouette.webp", 1600, 80],
  [`${HDD}/りな_2024-2026/写真/2024-09-02_Leica/L1000124.jpg`, "story-1.webp", 1400, 78],
  [`${HDD}/りな_2024-2026/写真/2024-09-02_Leica/L1000297.jpg`, "story-2.webp", 1400, 78],
  // Hi,Me:) アー写仕上げ (2025-02-04)
  [`${HDD}/HiMe_2026/写真/2025-02-04_アー写仕上げ/Sony-0198.jpg`, "project-hime.webp", 1400, 80, 16 / 10, 0.5],
  // ハタチたち (公式サイトと同じ素材)
  [`${HATACHI}/hero-circle.webp`, "project-hatachitachi.webp", 1400, 80, 16 / 10, 0.5],
  [`${HATACHI}/about-1.webp`, "hatachi-about.webp", 1400, 80],
  [`${HATACHI}/archive-heiseitachi.webp`, "project-heiseitachi.webp", 1400, 80, 16 / 10, 0.5],
];

async function build([from, to, width, quality, aspect, anchor = 0.5]) {
  let img = sharp(from).rotate();
  if (aspect) {
    const m = await img.metadata();
    const W = m.width, H = m.height;
    let w = W, h = Math.round(W / aspect);
    if (h > H) { h = H; w = Math.round(H * aspect); }
    img = img.extract({ left: Math.round((W - w) / 2), top: Math.round((H - h) * anchor), width: w, height: h });
  }
  await img.resize({ width }).webp({ quality }).toFile(path.join(OUT, to));
}

async function main() {
  await mkdir(OUT, { recursive: true });
  for (const d of DEFS) {
    await build(d);
    const m = await sharp(path.join(OUT, d[1])).metadata();
    console.log(`${d[1]}\t${m.width}x${m.height}\t${(m.size / 1024).toFixed(0)}KB`);
  }
  // ロゴ (YouTube アバターの手書き「め。」を白抜きしたもの)
  await copyFile(`${SHIRYO}/logo_me_white.png`, path.join(OUT, "logo-me-white.png"));
  await sharp(`${SHIRYO}/logo_me_navy.png`).resize({ width: 512 }).png().toFile(path.join(OUT, "logo-me-navy.png"));
  await sharp(`${SHIRYO}/logo_me_white.png`).resize({ width: 512 }).png().toFile(path.join(OUT, "logo-me-white.png"));
  // OGP 1200x630
  await sharp(`${ALL}/つんた_2026-08/写真_JPG/つんた_0807-079.JPG`).rotate()
    .resize({ width: 1200, height: 630, fit: "cover", position: "attention" })
    .jpeg({ quality: 84, mozjpeg: true }).toFile(path.join(OUT, "ogp.jpg"));
  // favicon 用 (水色地に白の「め。」)
  const bg = sharp({ create: { width: 512, height: 512, channels: 4, background: "#6fb5d7" } });
  const mark = await sharp(`${SHIRYO}/logo_me_white.png`).resize({ width: 400 }).png().toBuffer();
  await bg.composite([{ input: mark, gravity: "centre" }]).png().toFile(path.join(OUT, "icon-512.png"));
  console.log("done");
}
main();
