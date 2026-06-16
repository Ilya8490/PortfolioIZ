import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const animationFrameHandles = new Set<ReturnType<typeof setTimeout>>();
const nativeSetInterval = globalThis.setInterval.bind(globalThis);
const nativeClearInterval = globalThis.clearInterval.bind(globalThis);
type IntervalHandle = number | ReturnType<typeof setTimeout>;
const intervalHandles = new Set<IntervalHandle>();

function clearTrackedInterval(handle: IntervalHandle) {
  nativeClearInterval(handle as Parameters<typeof nativeClearInterval>[0]);
}

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: query === "(prefers-reduced-motion: reduce)",
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
  value: (callback: FrameRequestCallback) => {
    const handle = globalThis.setTimeout(() => {
      animationFrameHandles.delete(handle);
      callback(Date.now());
    }, 16);

    animationFrameHandles.add(handle);
    return handle;
  },
});

Object.defineProperty(window, "cancelAnimationFrame", {
  writable: true,
  value: (handle: ReturnType<typeof setTimeout>) => {
    animationFrameHandles.delete(handle);
    globalThis.clearTimeout(handle);
  },
});

Object.defineProperty(globalThis, "requestAnimationFrame", {
  writable: true,
  value: window.requestAnimationFrame,
});

Object.defineProperty(globalThis, "cancelAnimationFrame", {
  writable: true,
  value: window.cancelAnimationFrame,
});

Object.defineProperty(globalThis, "setInterval", {
  writable: true,
  value: (callback: TimerHandler, delay?: number, ...args: unknown[]) => {
    const handle = nativeSetInterval(callback, delay, ...args);

    intervalHandles.add(handle);
    return handle;
  },
});

Object.defineProperty(globalThis, "clearInterval", {
  writable: true,
  value: (handle: ReturnType<typeof nativeSetInterval>) => {
    intervalHandles.delete(handle);
    clearTrackedInterval(handle);
  },
});

afterEach(() => {
  cleanup();
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  gsap.globalTimeline.clear();
  gsap.ticker.sleep();
  animationFrameHandles.forEach((handle) => globalThis.clearTimeout(handle));
  animationFrameHandles.clear();
  intervalHandles.forEach(clearTrackedInterval);
  intervalHandles.clear();
});
