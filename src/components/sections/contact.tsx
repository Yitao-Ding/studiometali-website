import { CONTACT } from "@/content/site";
import { ContactForm } from "./contact-form";
import { Jp } from "@/components/ui/jp";

export function Contact() {
  return (
    <section className="chap contact" id="contact">
      <div className="wrap">
        <div>
          <span className="tag">Contact</span>
          <h2 className="big up">Contact</h2>
          <p className="h-ja">
            {CONTACT.lead.map((line) => (
              <span className="nb" key={line}>
                {line}
              </span>
            ))}
          </p>
          <p className="copy">
            <Jp>{CONTACT.body}</Jp>
          </p>
          <ul className="sns">
            {CONTACT.sns.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
