import { clsx } from "clsx";

type SectionEyebrowProps = {
  children: React.ReactNode;
  className?: string;
};

export function SectionEyebrow({ children, className }: SectionEyebrowProps) {
  return (
    <p className={clsx("text-mono-label mb-5 text-xs text-(--lime)", className)}>
      {children}
    </p>
  );
}
