type Props = { children: string; light?: boolean };

// セクションの英字ラベル。水色の短い線を添える
export function SectionLabel({ children, light = false }: Props) {
  return (
    <p
      className={`font-roman flex items-center gap-4 text-[14px] font-semibold tracking-[0.4em] ${
        light ? "text-white" : "text-sky-ink"
      }`}
    >
      <span aria-hidden className={`inline-block h-[2px] w-8 ${light ? "bg-white" : "bg-sky"}`} />
      {children}
    </p>
  );
}
