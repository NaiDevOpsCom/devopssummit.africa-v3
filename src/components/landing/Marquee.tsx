import { useMemo } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Props for the Marquee component
 */
interface MarqueeProps {
  /** Array of strings to display in the marquee */
  items: string[];
  /** Direction of the scroll. Defaults to "left" */
  direction?: "left" | "right";
  /** Speed of the animation in seconds for a full cycle. Defaults to 30 */
  speed?: number;
  /** Whether to pause the animation when hovering. Defaults to true */
  pauseOnHover?: boolean;
  /** Additional CSS classes for the container */
  className?: string;
  /** Accessibility label for screen readers */
  ariaLabel?: string;
  /** Whether to show a gradient fade on the edges. Defaults to true */
  withFade?: boolean;
  /** Whether to apply a subtle skew/tilt. Defaults to false */
  skew?: boolean;
  /** Visual variant for the ribbon. Defaults to "primary" */
  variant?: "primary" | "secondary" | "accent";
}

/**
 * A reusable, accessible, and performant infinite marquee component.
 *
 * Uses CSS keyframe animations for smooth, GPU-accelerated scrolling.
 * Respects `prefers-reduced-motion` via Framer Motion's `useReducedMotion` hook.
 */
export function Marquee({
  items,
  direction = "left",
  speed = 30,
  pauseOnHover = true,
  className,
  ariaLabel,
  withFade = true,
  skew = false,
  variant = "primary",
}: MarqueeProps) {
  const shouldReduceMotion = useReducedMotion();

  const normalizedSpeed = Math.max(1, Number(speed) || 30);

  const itemsWithIds = useMemo(
    () => (items || []).map((item, index) => ({ id: `${item}-${index}`, value: item })),
    [items],
  );

  // Triple the items to create a truly seamless loop
  const displayItems = useMemo(
    () => [...itemsWithIds, ...itemsWithIds, ...itemsWithIds],
    [itemsWithIds],
  );

  // Defensive guard for empty items
  if (!items || items.length === 0) return null;

  const animationName = direction === "left" ? "marquee-scroll-left" : "marquee-scroll-right";
  const isPaused = shouldReduceMotion === true;

  return (
    <section
      className={cn(
        "marquee-container",
        `marquee-${variant}`,
        withFade && "marquee-with-fade",
        skew && "marquee-skewed",
        pauseOnHover && "marquee-pause-on-hover",
        className,
      )}
      aria-label={ariaLabel || "Infinite scrolling marquee"}
    >
      <div
        className="marquee-track"
        style={{
          animationName,
          animationDuration: `${normalizedSpeed}s`,
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
          animationPlayState: isPaused ? "paused" : "running",
        }}
      >
        {displayItems.map((item, index) => (
          <span
            key={`${item.id}-${index}`}
            className="marquee-item"
            aria-hidden={index >= itemsWithIds.length}
          >
            <span className="marquee-dot" aria-hidden="true" />
            {item.value}
          </span>
        ))}
      </div>
    </section>
  );
}
