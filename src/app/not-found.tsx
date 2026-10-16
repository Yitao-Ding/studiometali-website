import Link from "next/link";

export default function NotFound() {
  return (
    <main className="status">
      <p className="big">404</p>
      <p>ページが見つかりませんでした。</p>
      <Link className="btn" href="/">
        トップへ戻る →
      </Link>
    </main>
  );
}
