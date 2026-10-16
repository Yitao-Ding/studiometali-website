import { PHOTOS, PROFILE } from "@/content/site";
import { Photo } from "@/components/ui/photo";

export function About() {
  return (
    <section className="chap about" id="about">
      <div className="wrap">
        <Photo photo={PHOTOS.about} sizes="(max-width: 760px) 100vw, 480px" />
        <div className="right">
          <span className="tag">Profile</span>
          <h2 className="big">{PROFILE.name}</h2>
          <p className="h-ja">
            {PROFILE.lead.map((line) => (
              <span className="nb" key={line}>
                {line}
              </span>
            ))}
          </p>
          <p className="copy">{PROFILE.body}</p>
        </div>
      </div>
    </section>
  );
}
