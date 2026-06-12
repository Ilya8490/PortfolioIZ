export function prefersReducedMotion() {
  if (typeof window === "undefined") {
    return true;
  }

  if (!window.matchMedia) {
    return false;
  }

  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
