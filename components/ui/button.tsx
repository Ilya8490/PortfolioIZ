import Link from "next/link";
import { clsx } from "clsx";
import type { CSSProperties } from "react";

type ButtonVariant = "primary" | "secondary";

type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  variant?: ButtonVariant;
  className?: string;
};

const variantClassName: Record<ButtonVariant, string> = {
  primary: "border-(--lime) bg-(--lime) hover:bg-(--lime) [&_*]:text-current",
  secondary: "border-(--line) bg-transparent text-(--paper) hover:border-(--lime)",
};

const variantStyle: Record<ButtonVariant, CSSProperties | undefined> = {
  primary: {
    color: "#111111",
  },
  secondary: undefined,
};

export function Button({ children, href, variant = "primary", className }: ButtonProps) {
  const classes = clsx(
    "inline-flex min-h-11 items-center justify-center border px-5 text-sm font-semibold transition-colors",
    "rounded-[4px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--lime)",
    variantClassName[variant],
    className,
  );

  if (href) {
    return (
      <Link href={href} className={classes} style={variantStyle[variant]}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} style={variantStyle[variant]} type="button">
      {children}
    </button>
  );
}
