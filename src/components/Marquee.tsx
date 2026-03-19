import React from "react";
import { motion, useReducedMotion, useAnimate, AnimationPlaybackControls } from "framer-motion";
import styles from "./Marquee.module.css";
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
}

/**
 * A reusable, accessible, and performant infinite marquee component built with Framer Motion.
 */
export const Marquee: React.FC<MarqueeProps> = ({
  items,
  direction = "left",
  speed = 30,
  pauseOnHover = true,
  className,
  ariaLabel,
  withFade = true,
  skew = false,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const [isHovered, setIsHovered] = React.useState(false);
  const [scope, animate] = useAnimate();
  const animationRef = React.useRef<AnimationPlaybackControls | null>(null);

  // Normalize speed value
  const normalizedSpeed = shouldReduceMotion ? 0 : Math.max(1, Number(speed) || 30);

  // Map items to stable objects for better reconciliation
  const itemsWithIds = React.useMemo(
    () => (items || []).map((item, index) => ({ id: `${item}-${index}`, value: item })),
    [items],
  );

  // Handle animation lifecycle (creation and cleanup)
  React.useEffect(() => {
    if (shouldReduceMotion || !items || items.length === 0) return;

    animationRef.current = animate(
      scope.current,
      { x: direction === "left" ? [0, "-50%"] : ["-50%", 0] },
      {
        duration: normalizedSpeed,
        ease: "linear",
        repeat: Infinity,
        repeatType: "loop",
      },
    );

    // Ensure the new animation instance respects the current pause state
    if (isHovered && pauseOnHover) {
      animationRef.current.pause();
    }

    return () => {
      if (animationRef.current) {
        animationRef.current.stop();
        animationRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [direction, normalizedSpeed, shouldReduceMotion, items, animate, scope]);

  // Handle play/pause without recreating the animation
  React.useEffect(() => {
    if (!animationRef.current) return;

    if (isHovered && pauseOnHover) {
      animationRef.current.pause();
    } else {
      animationRef.current.play();
    }
  }, [isHovered, pauseOnHover]);

  // Defensive guard for empty items
  if (!items || items.length === 0) return null;

  // Duplicate items to ensure a seamless loop
  const displayItems = [...itemsWithIds, ...itemsWithIds];

  return (
    <section
      className={cn(
        styles.marqueeContainer,
        withFade && styles.withFade,
        skew && styles.skewed,
        pauseOnHover && styles.pauseOnHover,
        className,
      )}
      aria-label={ariaLabel || "Infinite scrolling marquee"}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div ref={scope} className={styles.marqueeTrack}>
        {displayItems.map((item, index) => (
          <span
            key={item.id + (index >= itemsWithIds.length ? "-dup" : "")}
            className={styles.marqueeItem}
            aria-hidden={index >= itemsWithIds.length}
          >
            {item.value}
          </span>
        ))}
      </motion.div>
    </section>
  );
};
