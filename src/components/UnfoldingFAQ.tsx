"use client";

import React, { useState, useMemo, useRef, useLayoutEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { type ValueAnimationTransition } from "motion/react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: React.ReactNode;
}

interface UnfoldingFAQProps {
  faqs: FAQItem[];
  customRounding?: string;
  borderColor?: string;
  questionBackground?: string;
  answerBackground?: string;
  textColor?: string;
  questionFontSize?: string;
  answerFontSize?: string;
  isRTL?: boolean;
  isMobile?: boolean;
}

interface HighlightHoverProps {
  children: React.ReactNode;
  as?: React.ElementType;
  className?: string;
  effect?: ValueAnimationTransition;
  highlightColor?: string;
  barThickness?: number;
  gapRatio?: number;
  style?: React.CSSProperties;
  hovered?: boolean;
}

const HighlightHover: React.FC<HighlightHoverProps> = React.memo(
  ({
    children,
    as: Tag = "span",
    className,
    effect = { type: "spring", stiffness: 260, damping: 24 },
    highlightColor = "var(--foreground)",
    barThickness = 0,
    gapRatio = 0,
    style,
    hovered = false,
    ...rest
  }) => {
    const ref = useRef<HTMLSpanElement>(null);
    const MotionTag = useMemo(() => motion.create(Tag), [Tag]);

    // Use layout effect to avoid flashing style changes on mount
    useLayoutEffect(() => {
      if (!ref.current) return;
      const element = ref.current;
      const size = parseFloat(getComputedStyle(element).fontSize);
      element.style.setProperty("--hh-bar", `${size * barThickness}px`);
      element.style.setProperty("--hh-gap", `${size * gapRatio}px`);
    }, [barThickness, gapRatio]);

    const barAnim = useMemo(
      () => ({
        rest: {
          height: "var(--hh-bar)",
          backgroundColor: "var(--sub-foreground)",
          bottom: "calc(-1 * var(--hh-gap))",
          width: "100%",
        },
        hover: {
          height: "100%",
          bottom: 0,
          backgroundColor: highlightColor,
          transition: effect,
          width: "100%",
        },
      }),
      [highlightColor, effect]
    );

    const textAnim = useMemo(
      () => ({
        rest: {
          color: "var(--foreground)",
          fontWeight: "bold",
          paddingLeft: "0px",
          paddingRight: "0px",
          display: "inline-block",
          transition: { duration: 0.25 },
        },
        hover: {
          color: "var(--background)",
          fontWeight: "bold",
          paddingLeft: "8px",
          paddingRight: "8px",
          display: "inline-block",
          transition: { duration: 0.25 },
        },
      }),
      []
    );

    return (
      <MotionTag
        ref={ref}
        initial="rest"
        animate={hovered ? "hover" : "rest"}
        className={cn("relative cursor-pointer select-none overflow-visible", className)}
        style={{
          ...style,
          position: "relative",
          zIndex: 1,
          display: "inline-block",
          willChange: "color, transform, height",
        }}
        {...rest}
      >
        <motion.div
          aria-hidden="true"
          variants={barAnim}
          className="absolute left-0 rounded-md"
          style={{
            height: "var(--hh-bar)",
            bottom: "calc(-1 * var(--hh-gap))",
            transformOrigin: "bottom left",
            zIndex: -1,
            width: "100%",
          }}
        />
        <motion.span variants={textAnim} className="relative z-[1] inline-block">
          {children}
        </motion.span>
      </MotionTag>
    );
  }
);

const UnfoldingFAQ: React.FC<UnfoldingFAQProps> = ({
  faqs,
  customRounding = "8px",
  borderColor = "#242424",
  questionBackground = "var(--background)",
  answerBackground = "#111",
  textColor = "var(--foreground)",
  questionFontSize = "1.32rem",
  answerFontSize = "0.98rem",
  isRTL = false,
  isMobile = false,
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const toggleFAQ = useCallback(
    (index: number) => {
      setOpenIndex(prev => (prev === index ? null : index));
    },
    []
  );

  const paddingY = isMobile ? 12 : 16;
  const paddingX = isMobile ? 10 : 20;

  return (
    <div className="w-full flex flex-col gap-6 py-4" dir={isRTL ? "rtl" : "ltr"}>
      {faqs.map((faq, idx) => {
        const isOpen = openIndex === idx;
        const isHovered = hoveredIndex === idx && !isMobile;

        return (
          <motion.div
            key={idx}
            className="relative w-full overflow-hidden group cursor-pointer"
            onMouseEnter={() => !isMobile && setHoveredIndex(idx)}
            onMouseLeave={() => !isMobile && setHoveredIndex(null)}
            onClick={() => toggleFAQ(idx)}
            style={{
              border: `1px solid ${borderColor}`,
              borderRadius: customRounding,
              backgroundColor: "transparent",
              transition: "border-color 0.25s ease, background-color 0.25s ease",
              willChange: "transform, background-color, border-color",
            }}
          >
            <div
              className="relative z-10 flex items-center select-none flex-row-reverse"
              style={{
                padding: `${paddingY}px ${paddingX}px`,
                minHeight: 56,
                justifyContent: "space-between",
                backgroundColor: questionBackground,
                borderTopLeftRadius: customRounding,
                borderTopRightRadius: customRounding,
                borderBottomLeftRadius: isOpen ? "0px" : customRounding,
                borderBottomRightRadius: isOpen ? "0px" : customRounding,
                transition: "border-radius 0.25s ease",
                userSelect: "none",
              }}
            >
              <motion.span
                className="flex-shrink-0 select-none"
                style={{
                  color: isHovered ? textColor : "var(--sub-foreground)",
                  fontSize: questionFontSize,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 24,
                  height: 24,
                }}
                animate={{ rotate: isOpen ? (isRTL ? -180 : 180) : 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
              >
                <ChevronDown size={24} strokeWidth={2} />
              </motion.span>

              <HighlightHover
                className="max-w-max"
                highlightColor="var(--foreground)"
                hovered={isHovered}
                style={{
                  fontSize: isMobile
                    ? `calc(${questionFontSize} * 0.88)`
                    : questionFontSize,
                  color: textColor,
                  whiteSpace: "normal",
                  textAlign: isRTL ? "right" : "left",
                  fontWeight: "bold",
                }}
              >
                {faq.question}
              </HighlightHover>
            </div>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: "auto",
                    opacity: 1,
                    transition: {
                      height: { duration: 0.35, ease: "easeInOut" },
                      opacity: { duration: 0.25, delay: 0.1 },
                    },
                  }}
                  exit={{
                    height: 0,
                    opacity: 0,
                    transition: {
                      height: { duration: 0.3, ease: "easeInOut" },
                      opacity: { duration: 0.2 },
                    },
                  }}
                  style={{
                    overflow: "hidden",
                    backgroundColor: answerBackground,
                    borderBottomLeftRadius: customRounding,
                    borderBottomRightRadius: customRounding,
                    marginTop: -1,
                    willChange: "height, opacity",
                  }}
                >
                  <div
                    className="relative z-10"
                    style={{
                      padding: `${paddingY}px ${paddingX}px`,
                      color: "var(--sub-foreground)",
                      fontSize: isMobile
                        ? `calc(${answerFontSize} * 0.92)`
                        : answerFontSize,
                      fontWeight: 500,
                      textAlign: isRTL ? "right" : "left",
                    }}
                  >
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
};

export default React.memo(UnfoldingFAQ);
