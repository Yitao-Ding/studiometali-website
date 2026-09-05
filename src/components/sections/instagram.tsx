import { INSTAGRAM_POST_URLS, SITE } from "@/content/site";
import { SectionLabel } from "@/components/ui/section-label";
import { InstagramEmbeds } from "@/components/ui/instagram-embed";

export function Instagram() {
  if (INSTAGRAM_POST_URLS.length === 0) return null;
  return (
    <section id="instagram" className="bg-sky-soft">
      <div className="mx-auto w-[var(--container)] py-[var(--section-pad-y)]">
        <SectionLabel>INSTAGRAM</SectionLabel>
        <h2 className="font-hand mt-4 text-[clamp(28px,4.2vw,44px)] leading-[1.4] font-semibold tracking-[0.06em]">
          {SITE.instagramHandle}
        </h2>
        <div className="mt-10">
          <InstagramEmbeds postUrls={INSTAGRAM_POST_URLS} />
        </div>
        <div className="mt-10 text-center">
          <a
            href={SITE.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="border-ink hover:bg-ink inline-block rounded-full border-2 px-10 py-3.5 text-[14px] font-bold tracking-[0.2em] transition-colors hover:text-white"
          >
            Instagram を見る
          </a>
        </div>
      </div>
    </section>
  );
}
