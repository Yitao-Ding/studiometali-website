import { NEWS } from "@/content/site";
import { SectionLabel } from "@/components/ui/section-label";

function formatDate(iso: string) {
  const [y, m, d] = iso.split("-");
  return `${y}.${m}.${d}`;
}

export function News() {
  if (NEWS.length === 0) return null;
  return (
    <section id="news" className="bg-paper">
      <div className="mx-auto w-[var(--container)] py-[var(--section-pad-y)]">
        <SectionLabel>NEWS</SectionLabel>
        <h2 className="font-hand mt-4 text-[clamp(28px,4.2vw,44px)] leading-[1.4] font-semibold tracking-[0.06em]">
          お知らせ
        </h2>

        <ul className="border-sky-soft mt-10 border-t">
          {NEWS.map((n) => {
            const inner = (
              <div className="grid gap-2 py-6 md:grid-cols-[140px_1fr] md:gap-8">
                <time dateTime={n.date} className="font-roman text-sky-ink text-[16px] font-semibold tracking-[0.15em]">
                  {formatDate(n.date)}
                </time>
                <div>
                  <p className="text-[17px] font-bold leading-[1.6] tracking-[0.04em] group-hover:underline group-hover:underline-offset-4">
                    {n.title}
                  </p>
                  <p className="mt-1.5 text-[14px] leading-[1.9] tracking-[0.03em]">{n.body}</p>
                </div>
              </div>
            );
            return (
              <li key={n.title} className="border-sky-soft border-b">
                {n.href ? (
                  <a href={n.href} target="_blank" rel="noopener noreferrer" className="group block">
                    {inner}
                  </a>
                ) : (
                  inner
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
