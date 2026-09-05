import Image from "next/image";
import { PROJECTS } from "@/content/site";
import { SectionLabel } from "@/components/ui/section-label";

export function Projects() {
  return (
    <section id="projects" className="bg-sky-soft">
      <div className="mx-auto w-[var(--container)] py-[var(--section-pad-y)]">
        <SectionLabel>PROJECTS</SectionLabel>
        <h2 className="font-hand mt-4 text-[clamp(28px,4.2vw,44px)] leading-[1.4] font-semibold tracking-[0.06em]">
          動いているプロジェクト
        </h2>

        <ul className="mt-12 grid gap-10 md:grid-cols-2 md:gap-x-10 md:gap-y-14">
          {PROJECTS.map((p) => (
            <li key={p.id} className="flex flex-col">
              <a
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
                aria-label={`${p.title} の${p.linkLabel}を開く`}
              >
                <div className="relative aspect-[16/10] overflow-hidden rounded-[20px]">
                  <Image
                    src={p.image}
                    alt={p.imageAlt}
                    fill
                    sizes="(min-width: 768px) 45vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
              </a>
              <h3 className="font-hand mt-6 text-[26px] leading-[1.3] font-semibold tracking-[0.04em]">
                {p.title}
              </h3>
              <p className="text-sky-ink mt-1 text-[14px] tracking-[0.06em]">{p.sub}</p>
              <p className="mt-4 text-[15px] leading-[2] tracking-[0.03em]">{p.body}</p>
              <a
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink mt-4 inline-block self-start border-b-2 border-current py-1 text-[13px] font-bold tracking-[0.2em] hover:text-sky-ink"
              >
                {p.linkLabel} →
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
