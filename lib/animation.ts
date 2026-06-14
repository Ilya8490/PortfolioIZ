export const ANIM = {
  duration: {
    fast: 0.3,
    default: 0.6,
    slow: 0.9,
    draw: 0.8,
  },
  ease: {
    default: "power2.out",
    enter: "power3.out",
    exit: "power2.in",
  },
  stagger: {
    words: 0.055,
    cards: 0.1,
    items: 0.08,
  },
  scrollTrigger: {
    start: "top 75%",
    once: true,
  },
} as const;

export function prefersReducedMotion() {
  if (typeof window === "undefined") {
    return true;
  }

  if (!window.matchMedia) {
    return false;
  }

  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
