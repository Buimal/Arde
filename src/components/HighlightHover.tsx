"use client";

import { useEffect, useMemo, useRef } from "react";
import { motion, type ValueAnimationTransition } from "motion/react";
import { cn } from "@/lib/utils";

interface HighlightHoverProps {
  children: React.ReactNode;
  as?: React.ElementType;
  className?: string;
  effect?: ValueAnimationTransition;
  highlightColor?: string;
  barThickness?: number;
  gapRatio?: number;
  maxWidth?: string | number; // allow caller to constrain width if desired
}

export const Component = ({
  children,
  as: Tag = "span",
  className,
  effect = { type: "spring", stiffness: 260, damping: 24 },
  highlightColor = "var(--foreground)",
  barThickness = 0.12,
  gapRatio = 0.03,
  maxWidth = "100%",
  ...rest
}: HighlightHoverProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const MotionTag = useMemo(() => motion.create(Tag), [Tag]);

  // Compute bar size relative to font size for responsive look
  useEffect(() => {
    const applyVars = () => {
      if (ref.current) {
        const size = parseFloat(getComputedStyle(ref.current).fontSize);
        ref.current.style.setProperty("--hh-bar", `${size * barThickness}px`);
        ref.current.style.setProperty("--hh-gap", `${size * gapRatio}px`);
      }
    };
    applyVars();
    window.addEventListener("resize", applyVars);
    return () => window.removeEventListener("resize", applyVars);
  }, [barThickness, gapRatio]);

  // Hover/rest animation targets
  const barAnim = {
    rest: {
      height: "var(--hh-bar)",
      backgroundColor: "var(--sub-foreground)",
      bottom: "calc(-1 * var(--hh-gap))",
    },
    hover: {
      height: "100%",
      bottom: 0,
      backgroundColor: highlightColor,
      transition: effect,
    },
  };

  const textAnim = {
    rest: {
      color: "var(--sub-foreground)",
      paddingLeft: "0px",
      paddingRight: "0px",
      transition: { duration: 0.3, ease: "easeInOut" },
    },
    hover: {
      color: "var(--background)",
      paddingLeft: "6px",
      paddingRight: "6px",
      transition: { duration: 0.3, ease: "easeInOut" },
    },
  };

  // Wrapping behavior
  // Ensure the text can wrap inside a constrained container
  // The outer wrapper uses inline-block to respect content width unless constrained by parent
  // Add typical wrapping helpers to the inner text
  const wrapperStyle: React.CSSProperties = {
    display: "inline-block",
    // Allow the element to shrink/grow with its content but not overflow its parent
    maxWidth: typeof maxWidth === "number" ? `${maxWidth}px` : maxWidth,
    // Enable wrapping: break long words if needed
    overflowWrap: "anywhere" as const, // modern browsers: anywhere or break-word
    wordBreak: "break-word", // as a fallback for very long words
  };

  // For broader compatibility, also include a more conservative wrap style via CSS-in-JS
  // We apply a className that the host CSS can pick up if needed
  const textWrapperProps = {
    style: wrapperStyle,
  };

  return (
    <MotionTag
      ref={ref}
      whileHover="hover"
      initial="rest"
      animate="rest"
      className={cn(
        "relative inline-block cursor-pointer select-none overflow-hidden",
        className
      )}
      style={textWrapperProps.style}
      {...rest}
    >
      <motion.div
        aria-hidden="true"
        variants={barAnim}
        className="absolute w-full left-0 bg-current rounded-md"
        style={{
          height: "var(--hh-bar)",
          bottom: "calc(-1 * var(--hh-gap))",
          transformOrigin: "bottom center",
        }}
      />
      <motion.span
        variants={textAnim}
        className="relative z-[1] inline-block"
        // Important: allow the text to wrap within this span
        style={{
          display: "inline-block",
          // ensure wrapping is effective on the actual text content
          // fallbacks if a parent imposes tight widths
          whiteSpace: "normal",
          // That the span participates in wrapping
        }}
      >
        {children}
      </motion.span>
    </MotionTag>
  );
};

export default Component;
