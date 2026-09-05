"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { NAV, SITE } from "@/content/site";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors ${
        scrolled || open ? "bg-paper/90 backdrop-blur" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 w-[var(--container)] items-center justify-between">
        <a href="#top" className="flex items-center gap-3" aria-label={`${SITE.name} トップへ`}>
          <span className="bg-sky flex h-9 w-9 items-center justify-center rounded-full">
            <Image src="/assets/logo-me-white.png" alt="" width={24} height={24} />
          </span>
          <span className="font-roman text-[15px] font-semibold tracking-[0.3em]">
            {SITE.nameRoman}
          </span>
        </a>

        <nav aria-label="サイト内" className="hidden md:block">
          <ul className="flex gap-7 text-[13px] font-medium tracking-[0.2em]">
            {NAV.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="hover:text-sky-ink inline-block py-3 transition-colors">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="flex h-12 w-12 items-center justify-center md:hidden"
        >
          <span className="sr-only">メニュー</span>
          <span aria-hidden className="relative block h-4 w-6">
            <span
              className={`bg-ink absolute left-0 h-[2px] w-6 transition-transform ${open ? "top-[7px] rotate-45" : "top-0"}`}
            />
            <span
              className={`bg-ink absolute left-0 top-[7px] h-[2px] w-6 transition-opacity ${open ? "opacity-0" : ""}`}
            />
            <span
              className={`bg-ink absolute left-0 h-[2px] w-6 transition-transform ${open ? "top-[7px] -rotate-45" : "top-[14px]"}`}
            />
          </span>
        </button>
      </div>

      <nav
        id="mobile-nav"
        aria-label="サイト内 (モバイル)"
        className={`md:hidden ${open ? "block" : "hidden"} bg-paper/95 border-t border-sky-soft`}
      >
        <ul className="mx-auto w-[var(--container)] py-4">
          {NAV.map((n) => (
            <li key={n.href}>
              <a
                href={n.href}
                onClick={() => setOpen(false)}
                className="block py-3 text-[15px] font-medium tracking-[0.2em]"
              >
                {n.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
