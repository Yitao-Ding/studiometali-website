import Image from "next/image";
import { NAV, SITE } from "@/content/site";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-sky text-ink">
      <div className="mx-auto w-[var(--container)] py-14">
        <div className="flex items-center gap-4">
          <Image src="/assets/logo-me-white.png" alt="" width={56} height={56} />
          <div>
            <p className="font-hand text-[24px] font-semibold tracking-[0.06em]">{SITE.name}</p>
            <p className="font-roman text-[12px] tracking-[0.35em]">{SITE.nameRoman}</p>
          </div>
        </div>

        <nav aria-label="フッター" className="mt-8">
          <ul className="flex flex-wrap gap-x-7 gap-y-0 text-[13px] font-bold tracking-[0.2em]">
            {NAV.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="inline-block py-2.5 hover:underline hover:underline-offset-4">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <ul className="mt-4 flex flex-wrap gap-x-7 gap-y-0 text-[13px] font-bold tracking-[0.2em]">
          {[
            ["Instagram", SITE.instagram],
            ["YouTube", SITE.youtube],
            ["TikTok", SITE.tiktok],
            ["ハタチたち 公式サイト", "https://hatachitachi.com"],
          ].map(([label, href]) => (
            <li key={href}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block py-2.5 underline underline-offset-4"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        <p className="mt-10 text-[12px] tracking-[0.15em]">
          © {year} {SITE.name}
        </p>
      </div>
    </footer>
  );
}
