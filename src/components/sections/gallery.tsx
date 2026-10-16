import type { CSSProperties } from "react";
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
        {GALLERY.map((p) => {
          const sp = "sp" in p ? p.sp : undefined;
          return (
            <Photo
              key={p.name}
              photo={p}
              className={sp}
              style={{ "--sp-order": p.spOrder } as CSSProperties}
              sizes={sp === "wide" ? "(max-width: 760px) 100vw, 20vw" : "(max-width: 760px) 50vw, 20vw"}
            />
          );
        })}
      </div>
    </section>
  );
}
