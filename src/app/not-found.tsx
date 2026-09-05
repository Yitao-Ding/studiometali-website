import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[70svh] flex-col items-center justify-center gap-8 bg-paper">
      <p className="font-hand text-sky-ink text-6xl font-bold tracking-[0.2em]">404</p>
      <p className="tracking-[0.2em]">ページが見つかりませんでした。</p>
      <Link
        href="/"
        className="border-2 border-ink px-8 py-3 font-hand text-sm font-bold tracking-[0.25em] text-ink transition-colors hover:bg-ink hover:text-white"
      >
        トップへ戻る
      </Link>
    </main>
  );
}
