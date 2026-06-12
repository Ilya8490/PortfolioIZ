import { clsx } from "clsx";

type SectionHeaderProps = {
  title: string;
  description?: string;
  className?: string;
};

export function SectionHeader({ title, description, className }: SectionHeaderProps) {
  return (
    <div className={clsx("max-w-3xl", className)}>
      <h1 className="text-display text-5xl leading-[1.02] text-(--paper) md:text-7xl">
        {title}
      </h1>
      {description ? (
        <p className="mt-6 max-w-2xl text-base leading-7 text-(--fog) md:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
