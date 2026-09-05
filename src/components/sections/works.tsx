import { FEATURED_WORK, SITE, WORKS } from "@/content/site";
import { SectionLabel } from "@/components/ui/section-label";
import { YouTubeFacade } from "@/components/ui/youtube-facade";

export function Works() {
  return (
    <section id="works" className="bg-ink text-white">
      <div className="mx-auto w-[var(--container)] py-[var(--section-pad-y)]">
        <SectionLabel light>WORKS</SectionLabel>
        <h2 className="font-hand mt-4 text-[clamp(28px,4.2vw,44px)] leading-[1.4] font-semibold tracking-[0.06em]">
          作品
        </h2>

        <div className="mt-12 overflow-hidden rounded-[20px]">
          <YouTubeFacade videoId={FEATURED_WORK.videoId} title={FEATURED_WORK.title} />
        </div>
        <div className="mt-5 md:flex md:items-baseline md:justify-between">
          <p className="text-[18px] font-bold tracking-[0.06em] md:text-[20px]">
            {FEATURED_WORK.title}
            <span className="font-roman ml-3 text-[15px] font-normal tracking-[0.2em] text-white/70">
              {FEATURED_WORK.year}
            </span>
          </p>
          {FEATURED_WORK.note && (
            <p className="mt-1 text-[13px] tracking-[0.04em] text-white/70 md:mt-0">{FEATURED_WORK.note}</p>
          )}
        </div>

        <ul className="mt-14 grid grid-cols-2 gap-x-5 gap-y-8 md:grid-cols-3 md:gap-x-8">
          {WORKS.map((w) => (
            <li key={w.videoId}>
              <a
                href={`https://www.youtube.com/watch?v=${w.videoId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <div className="relative aspect-video overflow-hidden rounded-[12px] bg-black">
                  {/* eslint-disable-next-line @next/next/no-img-element -- ytimg は最適化不要の外部サムネ */}
                  <img
                    src={`https://i.ytimg.com/vi/${w.videoId}/hqdefault.jpg`}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover opacity-90 transition-opacity group-hover:opacity-100"
                  />
                </div>
                <p className="mt-3 text-[13px] leading-[1.6] font-bold tracking-[0.04em] group-hover:underline group-hover:underline-offset-4 md:text-[14px]">
                  {w.title}
                </p>
                <p className="font-roman mt-1 text-[13px] tracking-[0.2em] text-white/60">{w.year}</p>
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-12 text-center">
          <a
            href={SITE.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:bg-white hover:text-ink inline-block rounded-full border-2 border-white px-10 py-3.5 text-[14px] font-bold tracking-[0.2em] transition-colors"
          >
            YouTube チャンネルへ
          </a>
        </div>
      </div>
    </section>
  );
}
