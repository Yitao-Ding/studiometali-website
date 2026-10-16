import { SITE } from "@/content/site";

export function Footer() {
  return (
    <footer>
      <div className="wrap">
        {/* 日本語の屋号を本文に1回は出す (「スタジオメタリ」で検索された時の手がかり。docs/seo.md) */}
        <span>
          © STUDIO METALI <span className="ja">{SITE.name}</span>
        </span>
        <span>{SITE.domain.toUpperCase()}</span>
      </div>
    </footer>
  );
}
