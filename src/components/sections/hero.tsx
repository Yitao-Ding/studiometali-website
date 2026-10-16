import { PHOTOS, PROFILE } from "@/content/site";
import { Photo } from "@/components/ui/photo";

// PC は写真の左の余白に文字を置く。スマホは写真の上に文字を重ね、顔の切り抜き (hero-fg) を
// さらに上に重ねて「METALI」の手前に顔が来るようにしている (globals.css の hero の項)
export function Hero() {
  return (
    <header className="chap hero" id="top">
      <Photo className="hero-img" photo={PHOTOS.hero} sizes="(max-width: 760px) 100vw, 44vw" eager />
      <Photo className="hero-fg" photo={PHOTOS.heroFg} sizes="100vw" decorative />
      <div className="wrap hero-head">
        <span className="tag">{PROFILE.roles}</span>
        <h1 className="big up">
          <span>Studio</span>
          <span>Metali</span>
        </h1>
      </div>
      <div className="wrap hero-meta">
        <p className="who">
          {PROFILE.name}
          <small>{PROFILE.realName}</small>
        </p>
        <a className="btn" href="#contact">
          お仕事のご依頼 →
        </a>
      </div>
    </header>
  );
}
