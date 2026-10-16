"use client";

import { useEffect, useState } from "react";
import { NAV } from "@/content/site";

export function Nav() {
  const [open, setOpen] = useState(false);

  // Esc で閉じる
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <nav className="top" aria-label="メインメニュー">
      <div className="wrap">
        <a className="logo" href="#top">
          STUDIO METALI
        </a>
        <div className="top-r">
          <a className="btn" href="#contact">
            依頼する
          </a>
          <button
            type="button"
            className="menu-btn"
            aria-expanded={open}
            aria-controls="menu"
            onClick={() => setOpen((o) => !o)}
          >
            <i />
            MENU
          </button>
        </div>
      </div>
      <div className="menu" id="menu" hidden={!open}>
        <ul>
          {NAV.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={() => setOpen(false)}
                {...("external" in item ? { target: "_blank", rel: "noopener" } : {})}
              >
                <b>{item.en}</b>
                <span>{item.ja}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
