import Image from "next/image";
import { PROFILE, SITE } from "@/content/site";
import { SectionLabel } from "@/components/ui/section-label";

export function Profile() {
  return (
    <section id="profile" className="bg-paper">
      <div className="mx-auto w-[var(--container)] py-[var(--section-pad-y)]">
        <SectionLabel>PROFILE</SectionLabel>

        <div className="mt-10 grid gap-12 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
          <div className="relative aspect-[2/3] overflow-hidden rounded-[20px]">
            <Image
              src="/assets/profile-white.webp"
              alt="白いワンピースの Metalina"
              fill
              sizes="(min-width: 768px) 35vw, 100vw"
              className="object-cover object-top"
            />
          </div>

          <div>
            <h2 className="font-hand text-[clamp(34px,5vw,56px)] leading-[1.2] font-semibold tracking-[0.04em]">
              {PROFILE.name}
              <span className="text-ink-muted ml-3 text-[16px] font-normal tracking-[0.2em]">
                {PROFILE.nameKana}
              </span>
            </h2>
            <p className="text-sky-ink mt-2 text-[14px] tracking-[0.15em]">{PROFILE.role}</p>

            <div className="mt-8 space-y-5 text-[15px] leading-[2.1] tracking-[0.04em] md:text-[16px]">
              {PROFILE.intro.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>

            <ol className="border-sky-soft mt-10 border-t">
              {PROFILE.timeline.map((t, i) => (
                <li
                  key={`${t.year}-${i}`}
                  className="border-sky-soft grid grid-cols-[64px_1fr] gap-4 border-b py-3.5 text-[14px] leading-[1.8] md:text-[15px]"
                >
                  <span className="font-roman text-sky-ink text-[16px] font-semibold tracking-[0.1em]">
                    {t.year}
                  </span>
                  <span>{t.text}</span>
                </li>
              ))}
            </ol>

            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-[13px] font-bold tracking-[0.15em]">
              {[
                ["Instagram", SITE.instagram],
                ["YouTube", SITE.youtube],
                ["TikTok", SITE.tiktok],
                ["X", SITE.x],
              ].map(([label, href]) => (
                <li key={href}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-sky-ink inline-block py-1.5 underline underline-offset-4"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
