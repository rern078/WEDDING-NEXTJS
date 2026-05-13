"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

const STAGGER_MS = 20;
const REVEAL_BOTTOM_FRACTION = 0.06;

function isInRevealZone(el: HTMLElement) {
  const rect = el.getBoundingClientRect();
  const vh = window.innerHeight;
  const bottomEdge = vh * (1 - REVEAL_BOTTOM_FRACTION);
  return rect.bottom > 0 && rect.top < bottomEdge;
}

type InviteRevealProps = {
  children: ReactNode;
  className?: string;
  /** Extra delay when entering (index × STAGGER_MS). Reset to 0 when leaving. */
  delayIndex?: number;
};

export function InviteReveal({ children, className = "", delayIndex = 0 }: InviteRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  /** false on SSR + first paint so markup matches server; updated after mount only (avoids hydration mismatch). */
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setPrefersReducedMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || children == null || prefersReducedMotion) return;
    setVisible(isInRevealZone(el));
  }, [children, prefersReducedMotion]);

  useEffect(() => {
    const el = ref.current;
    if (!el || children == null || prefersReducedMotion) return;

    const ob = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        if (!e) return;
        setVisible(e.isIntersecting);
      },
      { root: null, rootMargin: `0px 0px -${REVEAL_BOTTOM_FRACTION * 100}% 0px`, threshold: 0 },
    );
    ob.observe(el);
    return () => ob.disconnect();
  }, [children, prefersReducedMotion]);

  const delayMs = delayIndex * STAGGER_MS;

  if (children == null) {
    return null;
  }

  const show = prefersReducedMotion || visible;

  const motionClass = show
    ? "translate-x-0 translate-y-0 scale-100 opacity-100"
    : "-translate-x-6 translate-y-2 scale-95 opacity-0";

  const transitionStyle: CSSProperties | undefined = prefersReducedMotion
    ? undefined
    : show
      ? {
          transitionProperty: "opacity, transform",
          transitionDuration: "980ms, 820ms",
          transitionDelay: `${delayMs}ms, ${delayMs}ms`,
          transitionTimingFunction:
            "cubic-bezier(0.4, 0, 0.2, 1), cubic-bezier(0.33, 1, 0.68, 1)",
        }
      : {
          transitionProperty: "opacity, transform",
          transitionDuration: "400ms, 440ms",
          transitionDelay: "0ms, 0ms",
          transitionTimingFunction: "cubic-bezier(0.4, 0, 1, 1), cubic-bezier(0.4, 0, 0.72, 1)",
        };

  return (
    <div ref={ref} className={`${motionClass} transform-gpu ${className}`.trim()} style={transitionStyle}>
      {children}
    </div>
  );
}
