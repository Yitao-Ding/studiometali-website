import { CAREER } from "@/content/site";

export function Career() {
  return (
    <section className="chap cv" id="cv">
      <div className="wrap">
        <div>
          <span className="tag">Career</span>
          <h2 className="big up">Career</h2>
          <p className="h-ja">経歴</p>
        </div>
        <div className="cv-grid">
          {CAREER.map((card) => (
            <div className={card.wide ? "cv-card wide" : "cv-card"} key={card.en}>
              <h3>
                {card.en}
                <small>{card.ja}</small>
              </h3>
              <ul>
                {card.items.map((item) => (
                  <li className={item.year ? undefined : "noy"} key={item.text}>
                    {item.year && <span className="y">{item.year}</span>}
                    <span className={item.star ? "star" : undefined}>{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
