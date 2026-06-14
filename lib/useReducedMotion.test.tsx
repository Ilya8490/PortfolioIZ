import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useReducedMotion } from "@/lib/useReducedMotion";

describe("useReducedMotion", () => {
  it("reports the current prefers-reduced-motion setting", () => {
    const { result } = renderHook(() => useReducedMotion());

    expect(result.current).toBe(true);
  });
});
