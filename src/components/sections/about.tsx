import Image from "next/image";
import { ABOUT } from "@/content/site";
import { SectionLabel } from "@/components/ui/section-label";

export function About() {
  return (
    <section id="about" className="bg-paper">
      <div className="mx-auto w-[var(--container)] py-[var(--section-pad-y)]">
        <SectionLabel>ABOUT</SectionLabel>

        <div className="mt-10 grid gap-12 md:grid-cols-[1.1fr_1fr] md:items-center md:gap-16">
          <div>
            <h2 className="font-hand text-[clamp(28px,4.2vw,44px)] leading-[1.4] font-semibold tracking-[0.06em]">
              {ABOUT.heading}
            </h2>
            <div className="mt-8 space-y-5 text-[15px] leading-[2.1] tracking-[0.04em] md:text-[16px]">
              {ABOUT.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-[1fr_0.8fr] gap-4">
            <div className="relative aspect-[3/4] overflow-hidden rounded-[20px]">
              <Image
                src="/assets/story-1.webp"
                alt="光の中で踊る Metalina"
                fill
                sizes="(min-width: 768px) 28vw, 55vw"
                className="object-cover"
              />
            </div>
            <div className="relative mt-12 aspect-[3/4] overflow-hidden rounded-[20px]">
              <Image
                src="/assets/hero-sub.webp"
                alt="頬に手を添える Metalina"
                fill
                sizes="(min-width: 768px) 22vw, 45vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
