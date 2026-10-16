import { GALLERY } from "@/content/site";
import { Photo } from "@/components/ui/photo";

export function Gallery() {
  return (
    <section className="gallery" id="gallery">
      <div className="wrap">
        <span className="tag">Gallery</span>
        <h2 className="big up">Photos</h2>
      </div>
      <div className="strip">
        {GALLERY.map((p) => (
          <Photo key={p.name} photo={p} sizes="(max-width: 760px) 50vw, 20vw" />
        ))}
      </div>
    </section>
  );
}
