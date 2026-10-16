import { PROFILE, SITE } from "@/content/site";
import { SITE_URL } from "@/lib/site-url";

// 検索エンジン向けの構造化データ。屋号 (Organization) と本人 (Person) を紐づける
export function JsonLd() {
  const sns = [SITE.instagram, SITE.youtube, SITE.tiktok, SITE.x];
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#org`,
        name: SITE.nameRoman,
        alternateName: [SITE.name, "STUDIO METALI"],
        url: SITE_URL,
        logo: `${SITE_URL}/assets/icon-512.png`,
        description: SITE.description,
        founder: { "@id": `${SITE_URL}/#person` },
        sameAs: sns,
      },
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        name: PROFILE.name,
        alternateName: [PROFILE.realName.replace(" ", ""), "めたりな"],
        jobTitle: PROFILE.roles,
        url: SITE_URL,
        image: `${SITE_URL}/assets/hood-tilt-1067.webp`,
        sameAs: sns,
        worksFor: { "@id": `${SITE_URL}/#org` },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE.nameRoman,
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
