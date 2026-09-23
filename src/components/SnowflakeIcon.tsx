"use client";

import { cn } from "@/lib/utils";
import type { HTMLMotionProps } from "motion/react";
import { motion, useAnimation, useReducedMotion } from "motion/react";
import { forwardRef, useImperativeHandle, useRef, useEffect } from "react";

export interface SnowflakeIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface SnowflakeIconProps extends HTMLMotionProps<"div"> {
  size?: number;
  isRTL?: boolean;
  animate?: boolean; // controls icon animation and color
}

const SnowflakeIcon = forwardRef<SnowflakeIconHandle, SnowflakeIconProps>(
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
              rotate: 90,
              scale: 1,
              transition: { duration: 0.3 },
            },
            animate: {
              rotate: [90, 100, 80, 90],
              scale: [1, 1.05, 1],
              transition: { duration: 1 },
            },
          }}
          animate={controls}
          initial="normal"
          className="transition-colors duration-300 ease-in-out"
          aria-label="Snowflake Icon"
          role="img"
        >
          <motion.path d="m10 20-1.25-2.5L6 18" variants={pathVariants} />
          <motion.path d="M10 4 8.75 6.5 6 6" variants={pathVariants} />
          <motion.path d="m14 20 1.25-2.5L18 18" variants={pathVariants} />
          <motion.path d="m14 4 1.25 2.5L18 6" variants={pathVariants} />
          <motion.path d="m17 21-3-6h-4" variants={pathVariants} />
          <motion.path d="m17 3-3 6 1.5 3" variants={pathVariants} />
          <motion.path d="M2 12h6.5L10 9" variants={pathVariants} />
          <motion.path d="m20 10-1.5 2 1.5 2" variants={pathVariants} />
          <motion.path d="M22 12h-6.5L14 15" variants={pathVariants} />
          <motion.path d="m4 10 1.5 2L4 14" variants={pathVariants} />
          <motion.path d="m7 21 3-6-1.5-3" variants={pathVariants} />
          <motion.path d="m7 3 3 6h4" variants={pathVariants} />
        </motion.svg>
      </motion.div>
    );
  }
);

SnowflakeIcon.displayName = "SnowflakeIcon";

export { SnowflakeIcon };