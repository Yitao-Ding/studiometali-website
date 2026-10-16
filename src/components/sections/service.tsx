import { SERVICE } from "@/content/site";

export function Service() {
  return (
    <section className="chap service" id="service">
      <div className="wrap">
        <span className="tag">Service</span>
        <h2 className="big up">
          {SERVICE.heading[0]}
          <br />
          {SERVICE.heading[1]}
        </h2>
        <p className="h-ja">
          {SERVICE.lead.map((line) => (
            <span className="nb" key={line}>
              {line}
            </span>
          ))}
        </p>
        <div className="svc-grid">
          {SERVICE.items.map((s) => (
            <article className="svc" key={s.en}>
              <span className="en">{s.en}</span>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
              <ul>
                {s.tags.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
