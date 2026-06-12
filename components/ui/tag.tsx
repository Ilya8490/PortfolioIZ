import { clsx } from "clsx";

type TagProps = {
  children: React.ReactNode;
  className?: string;
};

export function Tag({ children, className }: TagProps) {
  return (
    <span
      className={clsx(
        "text-mono-label inline-flex items-center border border-(--line) px-3 py-1 text-[11px] text-(--paper)",
        className,
      )}
    >
      {children}
    </span>
  );
}
