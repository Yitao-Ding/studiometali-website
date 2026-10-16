"use client";

import { useEffect } from "react";

// 描画中の例外で Next の既定の 500 画面を見せない。
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="status">
      <p>ページを表示できませんでした。</p>
      <p>時間をおいて、もう一度お試しください。</p>
      <button type="button" className="btn" onClick={reset}>
        再読み込み
      </button>
    </main>
  );
}
