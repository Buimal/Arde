"use client";

import { cn } from "@/lib/utils";
import type { HTMLMotionProps } from "motion/react";
import { motion, useAnimation, useReducedMotion } from "motion/react";
import { forwardRef, useImperativeHandle, useRef, useEffect } from "react";

export interface FlameIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface FlameIconProps extends HTMLMotionProps<"div"> {
  size?: number;
  isRTL?: boolean;
  animate?: boolean; // controls icon animation and color
}

const FlameIcon = forwardRef<FlameIconHandle, FlameIconProps>(
  (
    {
      className,
      size = 28,
      isRTL = false,
      animate = false,
      ...props
    },
    ref
  ) => {
    const controls = useAnimation();
    const reduced = useReducedMotion();

    useImperativeHandle(ref, () => ({
      startAnimation: () =>
        reduced ? controls.start("normal") : controls.start("animate"),
      stopAnimation: () => controls.start("normal"),
    }));

    useEffect(() => {
      if (animate) {
        controls.start("animate");
      } else {
        controls.start("normal");
      }
    }, [animate, controls]);

    const pathVariants = {
      normal: {
        pathLength: 1,
        opacity: 1,
        transition: { duration: 0.3 },
      },
      animate: {
        pathLength: [1, 0.3, 1],
        opacity: [1, 0.7, 1],
        transition: { duration: 0.8 },
      },
    };

    return (
      <motion.div
        style={{
          height: 32,
          width: "auto",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          cursor: "pointer",
          transformOrigin: "center",
          ...(isRTL ? { scaleX: -1 } : {}),
          userSelect: "none",
        }}
        className={cn(className)}
        {...props}
      >
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke={animate ? "var(--accent)" : "var(--foreground)"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={{
            normal: {
              rotate: 0,
              scale: 1,
              transition: { duration: 0.3 },
            },
            animate: {
              rotate: [0, 10, -10, 0],
              scale: [1, 1.05, 1],
              transition: { duration: 1 },
            },
          }}
          animate={controls}
          initial="normal"
          className="transition-colors duration-300 ease-in-out"
          aria-label="Flame Icon"
          role="img"
        >
          <motion.path
            d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"
            variants={pathVariants}
          />
        </motion.svg>
      </motion.div>
    );
  }
);

FlameIcon.displayName = "FlameIcon";

export { FlameIcon };