import type { Photo as PhotoDef } from "@/content/site";

type Props = {
  photo: PhotoDef;
  // 表示幅の目安。srcset からブラウザが選ぶ幅の基準になる
  sizes: string;
  className?: string;
  // ファーストビューの写真だけ true (LCP)
  eager?: boolean;
  decorative?: boolean;
};

// 事前に WebP 化した複数幅 (/assets/<name>-<幅>.webp) を srcset で出す。
// 画像は next.config の images.unoptimized で Vercel の最適化を使わない方針なので、next/image ではなく <img> にしている
export function Photo({ photo, sizes, className, eager = false, decorative = false }: Props) {
  const src = (w: number) => `/assets/${photo.name}-${w}.webp`;
  const largest = photo.widths[photo.widths.length - 1];
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={className}
      src={src(largest)}
      srcSet={photo.widths.map((w) => `${src(w)} ${w}w`).join(", ")}
      sizes={sizes}
      width={photo.width}
      height={photo.height}
      alt={decorative ? "" : photo.alt}
      aria-hidden={decorative || undefined}
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : undefined}
      decoding="async"
    />
  );
}
