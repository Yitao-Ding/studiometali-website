import { HIME, PHOTOS, PROFILE, SERVICE, SITE } from "@/content/site";
import { SITE_URL } from "@/lib/site-url";

// 検索エンジン向けの構造化データ (JSON-LD)。
// - WebSite: 検索結果の上に出るサイト名を「スタジオメタリ」にする
// - ProfilePage + Person: このページが Metalina 本人のページだと示す。SNS は本人のアカウントを sameAs に
// - Organization: 屋号のスタジオメタリ。YouTube チャンネルは屋号名義なのでこちらの sameAs に。依頼メニューは makesOffer
// 値は全て site.ts から取る。ページに書いていない事実 (対応エリア、料金など) はここにも書かない
export function JsonLd() {
  const url = `${SITE_URL}/`;
  const personId = `${SITE_URL}/#person`;
  const orgId = `${SITE_URL}/#org`;
  const websiteId = `${SITE_URL}/#website`;
  const portrait = `${SITE_URL}/assets/${PHOTOS.hero.name}-${PHOTOS.hero.widths[PHOTOS.hero.widths.length - 1]}.webp`;
  // 静的書き出しなのでビルドした時刻になる
  const builtAt = new Date().toISOString();

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": websiteId,
        url,
        name: SITE.name,
        alternateName: [SITE.nameRoman, "STUDIO METALI"],
        inLanguage: "ja",
        publisher: { "@id": orgId },
      },
      {
        "@type": "ProfilePage",
        "@id": `${SITE_URL}/#profile`,
        url,
        name: SITE.title,
        description: SITE.description,
        inLanguage: "ja",
        isPartOf: { "@id": websiteId },
        mainEntity: { "@id": personId },
        primaryImageOfPage: { "@type": "ImageObject", url: portrait },
        dateModified: builtAt,
      },
      {
        "@type": "Person",
        "@id": personId,
        name: PROFILE.name,
        alternateName: [PROFILE.nameKana, PROFILE.realName.replace(" ", ""), PROFILE.realName],
        jobTitle: PROFILE.jobTitles,
        description: PROFILE.body,
        image: portrait,
        url,
        homeLocation: {
          "@type": "Place",
          address: { "@type": "PostalAddress", addressRegion: PROFILE.region, addressCountry: "JP" },
        },
        knowsAbout: PROFILE.knowsAbout,
        memberOf: {
          "@type": "PerformingGroup",
          name: HIME.heading,
          alternateName: HIME.ja,
          sameAs: HIME.links.map((l) => l.href),
        },
        worksFor: { "@id": orgId },
        sameAs: [SITE.instagram, SITE.x, SITE.tiktok],
      },
      {
        "@type": "Organization",
        "@id": orgId,
        name: SITE.name,
        alternateName: [SITE.nameRoman, "STUDIO METALI"],
        url,
        logo: `${SITE_URL}/assets/icon-512.png`,
        image: `${SITE_URL}/assets/ogp.jpg`,
        description: SITE.description,
        founder: { "@id": personId },
        sameAs: [SITE.youtube],
        makesOffer: SERVICE.items.map((s) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: s.title,
            description: s.body,
            provider: { "@id": personId },
          },
        })),
      },
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
