import Image from "next/image";
import { SERVICES } from "@/content/site";
import { SectionLabel } from "@/components/ui/section-label";

export function Services() {
  return (
    <section id="service" className="bg-sky text-ink">
      <div className="mx-auto w-[var(--container)] py-[var(--section-pad-y)]">
        <SectionLabel>SERVICE</SectionLabel>
        <h2 className="font-hand mt-4 text-[clamp(28px,4.2vw,44px)] leading-[1.4] font-semibold tracking-[0.06em]">
          できること
        </h2>

        <div className="mt-12 grid gap-10 md:grid-cols-[1fr_1fr] md:gap-16">
          <ul className="space-y-8">
            {SERVICES.map((s) => (
              <li key={s.title} className="border-ink/30 border-b pb-6">
                <h3 className="text-[20px] font-bold tracking-[0.06em]">{s.title}</h3>
                <p className="mt-2 text-[15px] leading-[2] tracking-[0.03em]">{s.body}</p>
              </li>
            ))}
          </ul>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[20px] md:aspect-auto md:min-h-[520px]">
            <Image
              src="/assets/about-blue.webp"
              alt="青いカーテンの前でポーズをとる Metalina"
              fill
              sizes="(min-width: 768px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className="mt-12">
          <a
            href="#contact"
            className="bg-ink inline-block rounded-full px-10 py-3.5 text-[14px] font-bold tracking-[0.2em] text-white transition-opacity hover:opacity-85"
          >
            相談する
          </a>
        </div>
      </div>
    </section>
  );
}
