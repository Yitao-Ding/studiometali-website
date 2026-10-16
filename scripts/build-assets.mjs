// サイト用の写真を public/assets に WebP で書き出す。冪等。
// 元ファイルは 2026-10 に完成したデザイン (claude.ai の Artifact「Studio Metali」) の img/ と同じもの。
// YD の手元では `資料/site-img/` に置く想定。差し替えるときは同じファイル名で置き直して再実行する:
//   node scripts/build-assets.mjs <元画像のフォルダ>
// 幅ごとに <name>-<幅>.webp を出す。srcset は src/components/ui/photo.tsx が組み立てる。
// 幅の一覧は src/content/site.ts の PHOTOS と揃えること。
import sharp from "sharp";
import path from "node:path";
import { mkdir } from "node:fs/promises";

const SRC = path.resolve(process.argv[2] ?? path.join(import.meta.dirname, "../../資料/site-img"));
const OUT = path.resolve(import.meta.dirname, "../public/assets");

// [元ファイル, 出力名, 幅の一覧, 品質]
const DEFS = [
  ["hood-tilt.jpg", "hood-tilt", [800, 1067], 82],
  // スマホのヒーローで写真の上に重ねる切り抜き (透過)。顔の輪郭を文字の前に出す
  ["hood-tilt-fg.png", "hood-tilt-fg", [800, 1067], 85],
  ["stool.jpg", "stool", [800, 1200], 80],
  ["hatachi-group.jpg", "hatachi-group", [800, 1200], 78],
  // ハタチたち公式サイトへのボタンの背景 (CSS の background-image)
  ["hatachi-sky.jpg", "hatachi-sky", [1200], 78],
  ["himer-logo.jpg", "himer-logo", [400], 82],
  ["charity.jpg", "charity", [800, 1600], 78],
  ["phone-booth.jpg", "phone-booth", [600, 1179], 80],
  ["party-hat.jpg", "party-hat", [600, 1067], 80],
  ["hero-hood-wide.jpg", "hero-hood-wide", [800, 1600], 80],
  // 2026-10-16 追加 (ギャラリーの笑顔の 2 枚)。最初は LINE で届いた写真 (2000px / 1045px) から書き出した
  ["hood-smile.jpg", "hood-smile", [600, 1200], 80],
  ["birthday-24.jpg", "birthday-24", [600, 1045], 80],
];

async function build([from, name, widths, quality]) {
  for (const width of widths) {
    const to = `${name}-${width}.webp`;
    const info = await sharp(path.join(SRC, from))
      .rotate()
      .resize({ width, withoutEnlargement: true })
      .webp({ quality, alphaQuality: 90, effort: 6 })
      .toFile(path.join(OUT, to));
    console.log(`${to}  ${info.width}x${info.height}  ${Math.round(info.size / 1024)}KB`);
  }
}

// OGP (1200x630)。横長のポートレートを右に寄せ、空いた左にヒーローと同じ「STUDIO / METALI」を置く。
// 文字は Archivo Expanded Black。sharp (librsvg) は OS のフォントしか使えないので、作り直す前に
// https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@125,900 (古い UA で開くと .ttf の URL が出る)
// をインストールしておく。入っていないと別の書体で書き出されるので、出力を目で確認すること。
async function ogp() {
  const resized = await sharp(path.join(SRC, "hero-hood-wide.jpg"))
    .resize({ height: 630 })
    .ensureAlpha()
    .toBuffer({ resolveWithObject: true });
  const { width } = resized.info;
  // 写真の左寄りの壁の色を地色にする
  const wall = await sharp(resized.data).extract({ left: 260, top: 40, width: 40, height: 200 }).stats();
  const [r, g, b] = wall.channels.map((c) => Math.round(c.mean));
  // 左端の周辺減光を地色に溶かす (左 30% を透明→不透明)
  const fade = 0.3;
  const mask = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="630"><defs><linearGradient id="g" x1="0" x2="1"><stop offset="0" stop-opacity="0"/><stop offset="${fade}" stop-opacity="1"/></linearGradient></defs><rect width="${width}" height="630" fill="url(#g)"/></svg>`;
  const photo = await sharp(resized.data).composite([{ input: Buffer.from(mask), blend: "dest-in" }]).png().toBuffer();
  const words = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
<style>.w{font-family:'Archivo Expanded';font-weight:900;font-size:92px;letter-spacing:-1px}</style>
<text class="w" x="64" y="196" fill="#2448C9">STUDIO</text>
<text class="w" x="64" y="286" fill="#0B1530">METALI</text>
</svg>`;
  const info = await sharp({ create: { width: 1200, height: 630, channels: 3, background: { r, g, b } } })
    .composite([{ input: photo, left: 1200 - width, top: 0 }, { input: Buffer.from(words) }])
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(path.join(OUT, "ogp.jpg"));
  console.log(`ogp.jpg  ${info.width}x${info.height}  ${Math.round(info.size / 1024)}KB`);
}

await mkdir(OUT, { recursive: true });
for (const def of DEFS) await build(def);
await ogp();
