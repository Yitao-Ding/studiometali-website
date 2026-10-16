import { CHARITY, HATACHI, HIME, PHOTOS, SITE } from "@/content/site";
import { Photo } from "@/components/ui/photo";

function Links({ links }: { links: readonly { label: string; href: string }[] }) {
  return (
    <ul className="links">
      {links.map((l) => (
        <li key={l.href}>
          <a href={l.href} target="_blank" rel="noopener">
            {l.label}
          </a>
        </li>
      ))}
    </ul>
  );
}

function Facts({ facts }: { facts: readonly string[] }) {
  return (
    <ul className="facts">
      {facts.map((f) => (
        <li key={f}>{f}</li>
      ))}
    </ul>
  );
}

// 主な活動。ハタチたち (写真背景) → Hi,Me:) (黒) → ダンスでチャリティ (青) の3章
export function Projects() {
  return (
    <>
      <div id="projects" />
      <section className="chap proj-photo">
        <Photo className="bg" photo={PHOTOS.hatachi} sizes="100vw" />
        <div className="wrap">
          <div className="right">
            <span className="tag">{HATACHI.tag}</span>
            <h2 className="big up">
              {HATACHI.heading[0]}
              <br />
              {HATACHI.heading[1]}
            </h2>
            <p className="h-ja">{HATACHI.ja}</p>
            <p className="copy">{HATACHI.body}</p>
            <Facts facts={HATACHI.facts} />
            <a className="btn big-cta" href={SITE.hatachitachi} target="_blank" rel="noopener">
              <span className="lbl">OFFICIAL SITE</span>
              <b className="main">
                <span className="nb">ハタチたち</span> <span className="nb">公式サイトへ</span>
              </b>
              <span className="foot">
                <small>hatachitachi.com</small>
                <i className="arr">→</i>
              </span>
            </a>
            <Links links={HATACHI.links} />
          </div>
        </div>
      </section>

      <section className="chap himer">
        <div className="wrap">
          <div>
            <span className="tag">{HIME.tag}</span>
            <div className="himer-head">
              <div>
                <h2 className="big">{HIME.heading}</h2>
                <p className="h-ja">{HIME.ja}</p>
              </div>
              <Photo className="himer-icon" photo={PHOTOS.himerLogo} sizes="160px" />
            </div>
            <p className="copy">{HIME.body}</p>
            <Facts facts={HIME.facts} />
            <Links links={HIME.links} />
            <div className="himer-video">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${HIME.videoId}`}
                title="Hi,Me:)の動画"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
            <p className="video-note">
              <a href={`https://youtu.be/${HIME.videoId}`} target="_blank" rel="noopener">
                YouTubeで動画を見る ↗
              </a>
            </p>
          </div>
        </div>
      </section>

      <section className="chap charity">
        <div className="wrap">
          <div className="right">
            <span className="tag">{CHARITY.tag}</span>
            <h2 className="big">
              <span className="nb">{CHARITY.heading[0]}</span>
              <br />
              {CHARITY.heading[1]}
            </h2>
            <p className="h-ja">{CHARITY.ja}</p>
            <p className="copy">{CHARITY.body}</p>
          </div>
          <Photo photo={PHOTOS.charity} sizes="(max-width: 760px) 100vw, 680px" />
        </div>
      </section>
    </>
  );
}
