import { Fragment } from "react";
import { loadDefaultJapaneseParser } from "budoux";

// 日本語を文節の切れ目でだけ折り返す (2026-10-16 YD「絶妙なところで改行してるの全部直したい」)。
// 切れ目は BudouX (Google の日本語文節分割) で求め、<wbr> を入れて CSS の .jp (keep-all) で文節の途中を切らせない。
// サーバーコンポーネントでだけ使う。静的書き出しなので分割はビルド時に終わり、ブラウザには <wbr> の入った HTML だけが届く
const parser = loadDefaultJapaneseParser();

// BudouX が切る位置のうち、切ると読みにくい語の中は切らない (「ダンサーと/して」のように切られていた)
const KEEP = ["振り付け", "として"];

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

// ／ の前でブラウザが改行して行頭に ／ が来るので、前に WORD JOINER (幅ゼロ、改行させない) を置く
const NO_BREAK_BEFORE = /(?=／)/g;

// 「One Day」「SALAD BOWL」のような 「」 の中の英語の曲名・企画名は、空白で改行させない (改行しない空白に置き換える)
const keepQuoted = (text: string) => text.replace(/「[^」]*」/g, (q) => q.replaceAll(" ", "\u00a0"));

export function Jp({ children }: { children: string }) {
  const text = keepQuoted(children);
  const points = breakPoints(text);
  const parts = [0, ...points].map((from, i) =>
    text.slice(from, points[i] ?? text.length).replace(NO_BREAK_BEFORE, "\u2060"),
  );
  return (
    <span className="jp">
      {parts.map((part, i) => (
        <Fragment key={i}>
          {i > 0 && <wbr />}
          {part}
        </Fragment>
      ))}
    </span>
  );
}
