import Image from "next/image";
import { SITE } from "@/content/site";

/*
 * 左に文字、右に写真。写真は 2026-08-07 のスタジオ撮影 (水色背景) で、
 * ブランドの水色と地続きに見えるよう、写真の外側も同じ水色の面にしてある。
 * スマホでは写真を上、文字を下に積む。
 */
export function Hero() {
  return (
    <section id="top" className="bg-sky-soft relative overflow-hidden">
      <div className="mx-auto grid w-[var(--container)] items-center gap-10 pt-24 pb-16 md:min-h-[100svh] md:grid-cols-[1fr_1.15fr] md:gap-14 md:pt-16 md:pb-0">
        <div className="order-2 md:order-1">
          <p className="font-roman text-sky-ink text-[14px] font-semibold tracking-[0.4em]">
            {SITE.nameRoman}
          </p>
          {/* 「スタジオメ/タリ」で割れないよう、必ず「スタジオ」「メタリ」で改行する */}
          <h1 className="font-hand mt-4 text-[clamp(44px,6.4vw,80px)] leading-[1.15] font-semibold tracking-[0.04em]">
            <span className="block">スタジオ</span>
            <span className="block">メタリ</span>
            <span className="sr-only">{SITE.name}</span>
          </h1>
          <p className="font-hand mt-6 text-[clamp(20px,2.6vw,30px)] leading-[1.6] tracking-[0.06em]">
            {SITE.tagline}
          </p>
          <p className="text-ink-muted mt-8 text-[14px] tracking-[0.2em]">{SITE.producedBy}</p>

          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href="#projects"
              className="bg-ink hover:bg-sky-ink inline-block rounded-full px-8 py-3.5 text-[14px] font-bold tracking-[0.2em] text-white transition-colors"
            >
              プロジェクトを見る
            </a>
            <a
              href={SITE.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="border-ink hover:bg-ink inline-block rounded-full border-2 px-8 py-3.5 text-[14px] font-bold tracking-[0.2em] transition-colors hover:text-white"
            >
              Instagram
            </a>
          </div>
        </div>

        <div className="order-1 md:order-2">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] md:aspect-[5/6]">
            <Image
              src="/assets/hero-main.webp"
              alt="水色の背景の前で笑う Metalina"
              fill
              priority
              sizes="(min-width: 768px) 55vw, 100vw"
              className="object-cover object-[50%_20%]"
            />
          </div>
        </div>
      </div>

      {/* 手書きの「め。」を薄く敷く */}
      <Image
        src="/assets/logo-me-white.png"
        alt=""
        width={520}
        height={520}
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -left-16 hidden w-[420px] opacity-70 md:block"
      />
    </section>
  );
}
