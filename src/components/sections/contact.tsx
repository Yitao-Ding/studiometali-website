import { CONTACT } from "@/content/site";
import { SectionLabel } from "@/components/ui/section-label";

export function Contact() {
  return (
    <section id="contact" className="bg-paper">
      <div className="mx-auto w-[var(--container)] py-[var(--section-pad-y)]">
        <SectionLabel>CONTACT</SectionLabel>
        <div className="mt-8 max-w-[680px]">
          <h2 className="font-hand text-[clamp(28px,4.2vw,44px)] leading-[1.4] font-semibold tracking-[0.06em]">
            {CONTACT.heading}
          </h2>
          <p className="mt-6 text-[15px] leading-[2.1] tracking-[0.04em] md:text-[16px]">{CONTACT.body}</p>
          <a
            href={CONTACT.primaryHref}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-ink hover:bg-sky-ink mt-10 inline-block rounded-full px-10 py-4 text-[14px] font-bold tracking-[0.2em] text-white transition-colors"
          >
            {CONTACT.primaryLabel}
          </a>
        </div>
      </div>
    </section>
  );
}
