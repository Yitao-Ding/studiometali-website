import { SITE } from "@/content/site";

export function Footer() {
  return (
    <footer>
      <div className="wrap">
        <span>© STUDIO METALI</span>
        <span>{SITE.domain.toUpperCase()}</span>
      </div>
    </footer>
  );
}
