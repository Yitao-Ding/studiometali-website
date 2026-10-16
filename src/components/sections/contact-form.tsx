"use client";

import { useState, type FormEvent } from "react";
import { CONTACT } from "@/content/site";

const { form } = CONTACT;

// Web3Forms に fetch で送る。JS が動かない環境では form の action に普通に POST される
export function ContactForm() {
  const [status, setStatus] = useState<string | null>(null);
  const [sending, setSending] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const el = e.currentTarget;
    setSending(true);
    setStatus("送信しています…");
    try {
      const res = await fetch(form.endpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(el),
      });
      const json = (await res.json()) as { success?: boolean };
      if (json.success) {
        el.reset();
        setStatus("送信しました！内容を確認して、折り返しご連絡します。");
      } else {
        setStatus("送信できませんでした。時間をおいてもう一度お試しください。");
      }
    } catch {
      setStatus("送信できませんでした。時間をおいてもう一度お試しください。");
    }
    setSending(false);
  }

  return (
    <form action={form.endpoint} method="POST" onSubmit={onSubmit}>
      <input type="hidden" name="access_key" value={form.accessKey} />
      <input type="hidden" name="subject" value={form.subject} />
      <input type="hidden" name="from_name" value={form.fromName} />
      {/* bot 避け。人には見えない */}
      <input type="checkbox" name="botcheck" className="hp-trap" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <label htmlFor="f-name">
        お名前・団体名
        <input id="f-name" name="name" required placeholder="〇〇ダンススタジオ 山田" autoComplete="name" />
      </label>
      <label htmlFor="f-mail">
        メールアドレス
        <input id="f-mail" name="email" type="email" required placeholder="example@mail.com" autoComplete="email" />
      </label>
      <label htmlFor="f-type">
        ご依頼の種類
        <select id="f-type" name="type">
          {form.types.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </label>
      <label htmlFor="f-body">
        内容
        <textarea id="f-body" name="message" required placeholder="日時、場所、人数、ご予算など" />
      </label>
      <div>
        <button className="btn" type="submit" disabled={sending}>
          送信する →
        </button>
        <span className="sent" role="status" hidden={status === null}>
          {status}
        </span>
      </div>
    </form>
  );
}
