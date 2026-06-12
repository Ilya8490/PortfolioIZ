import "@testing-library/jest-dom/vitest";

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => undefined,
    removeListener: () => undefined,
    addEventListener: () => undefined,
    removeEventListener: () => undefined,
    dispatchEvent: () => false,
  }),
});

Object.defineProperty(window, "requestAnimationFrame", {
  writable: true,
  value: (callback: FrameRequestCallback) =>
    window.setTimeout(() => callback(Date.now()), 16),
});

Object.defineProperty(window, "cancelAnimationFrame", {
  writable: true,
  value: (handle: number) => window.clearTimeout(handle),
});

Object.defineProperty(globalThis, "requestAnimationFrame", {
  writable: true,
  value: window.requestAnimationFrame,
});

Object.defineProperty(globalThis, "cancelAnimationFrame", {
  writable: true,
  value: window.cancelAnimationFrame,
});
