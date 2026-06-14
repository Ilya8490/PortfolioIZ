import { describe, expect, it } from "vitest";
import { ANIM } from "@/lib/animation";

describe("animation config", () => {
  it("exports the shared Phase 10 animation tokens", () => {
    expect(ANIM).toEqual({
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
    });
  });
});
