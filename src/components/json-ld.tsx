import { PROFILE, SITE } from "@/content/site";
import { SITE_URL } from "@/lib/site-url";

// 検索エンジン向けの構造化データ。屋号 (Organization) と本人 (Person) を紐づける
export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#org`,
        name: SITE.name,
        alternateName: [SITE.nameRoman, "Studio Metali"],
        url: SITE_URL,
        logo: `${SITE_URL}/assets/icon-512.png`,
        description: SITE.description,
        founder: { "@id": `${SITE_URL}/#person` },
        sameAs: [SITE.youtube, SITE.instagram, SITE.tiktok, SITE.x, SITE.linktree],
      },
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        name: PROFILE.name,
        alternateName: PROFILE.nameKana,
        jobTitle: "Dancer / Choreographer / Event Organizer",
        url: SITE_URL,
        sameAs: [SITE.instagram, SITE.youtube, SITE.tiktok, SITE.x],
        worksFor: { "@id": `${SITE_URL}/#org` },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE.name,
        inLanguage: "ja",
        publisher: { "@id": `${SITE_URL}/#org` },
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
