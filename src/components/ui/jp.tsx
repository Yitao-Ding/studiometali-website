import { Fragment } from "react";
import { loadDefaultJapaneseParser } from "budoux";

// 日本語を文節の切れ目でだけ折り返す (2026-10-16 YD「絶妙なところで改行してるの全部直したい」)。
// 切れ目は BudouX (Google の日本語文節分割) で求め、<wbr> を入れて CSS の .jp (keep-all) で文節の途中を切らせない。
// サーバーコンポーネントでだけ使う。静的書き出しなので分割はビルド時に終わり、ブラウザには <wbr> の入った HTML だけが届く
const parser = loadDefaultJapaneseParser();

// BudouX が切る位置のうち、切ると読みにくい語の中は切らない (「ダンサーと/して」のように切られていた)
const KEEP = ["振り付け", "として", "企画・運営", "学童・児童館"];

function breakPoints(text: string): number[] {
  const points = new Set<number>();
  let at = 0;
  for (const phrase of parser.parse(text)) {
    at += phrase.length;
    if (at < text.length) points.add(at);
  }
  // 「映像ディレクション・イベント企画」のように BudouX が 1 文節にする語の並びは、・ と ／ の後ろで切ってよい
  for (const m of text.matchAll(/[・／]/g)) {
    if (m.index + 1 < text.length) points.add(m.index + 1);
  }
  for (const word of KEEP) {
    for (const m of text.matchAll(new RegExp(word, "g"))) {
      for (let i = m.index + 1; i < m.index + word.length; i++) points.delete(i);
    }
  }
  return [...points].sort((a, b) => a - b);
}

// keep-all でもブラウザは約物の前後では改行する。行頭に ／ が来たり、「群青」/の のように閉じ括弧の後で
// 切れたりするので、文節の途中にある ／ の前と、閉じ括弧・中黒の後ろに WORD JOINER (幅ゼロ、改行させない) を置く
const glue = (phrase: string) => phrase.replace(/(?=／)/g, "\u2060").replace(/([」』）)・])(?=.)/g, "$1\u2060");

// 「One Day」「SALAD BOWL」のような 「」 の中の英語の曲名・企画名は、空白で改行させない (改行しない空白に置き換える)
const keepQuoted = (text: string) => text.replace(/「[^」]*」/g, (q) => q.replaceAll(" ", "\u00a0"));

// 句点・読点・／ で区切った「節」のうち短いものは、途中で折り返さない塊 (.nb、inline-block) にする。
// 前の行に入りきらない節は頭から次の行に送られるので、行末に「国内の」のような節の切れ端が残らない
// (2026-10-17 YD 指摘、Hi,Me:) の説明文)。
// 塊にするのは、1 行に収まる長さ (unit 字以下) で、かつ文頭か直前の節も塊のときだけ。
// 長い節のあとの「、」の次を塊にすると「思いから、」だけの行ができるので、そこは文節の切れ目で普通に折り返す。
// unit は 360px のスマホで 1 行に入る字数 (全角換算) にする。超えると塊の中で折り返して、かえって行が増える
const widthOf = (s: string) => [...s].reduce((w, ch) => w + (/[\x20-\x7e\u00a0]/.test(ch) ? 0.5 : 1), 0);

export function Jp({ children, unit = 19 }: { children: string; unit?: number }) {
  const text = keepQuoted(children);
  const points = breakPoints(text);
  const clauses: { from: number; to: number }[] = [];
  let from = 0;
  for (const m of text.matchAll(/[、。／]/g)) {
    const to = m.index + 1;
    if (to < text.length) {
      clauses.push({ from, to });
      from = to;
    }
  }
  clauses.push({ from, to: text.length });

  let prevUnit = true;
  const isUnit = clauses.map(({ from, to }, ci) => {
    const startsSentence = ci === 0 || /[。／]$/.test(text.slice(0, from)) || prevUnit;
    prevUnit = startsSentence && widthOf(text.slice(from, to)) <= unit;
    return prevUnit;
  });

  return (
    <span className="jp">
      {clauses.map(({ from, to }, ci) => {
        const inner = points.filter((p) => p > from && p < to);
        const phrases = [from, ...inner].map((start, i) =>
          glue(text.slice(start, inner[i] ?? to)),
        );
        const body = phrases.map((phrase, i) => (
          <Fragment key={i}>
            {i > 0 && <wbr />}
            {phrase}
          </Fragment>
        ));
        return (
          <Fragment key={ci}>
            {ci > 0 && <wbr />}
            {isUnit[ci] ? <span className="nb">{body}</span> : body}
          </Fragment>
        );
      })}
    </span>
  );
}
