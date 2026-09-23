"use client";
import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { useIsMobile } from "@/hooks/use-mobile";

interface SectionTextProps {
  title: string;
  description?: string;
  isRTL?: boolean; // added
}

export default function SectionText({ title, description, isRTL = false }: SectionTextProps) {
  const isMobile = useIsMobile();
  const ref = useRef<HTMLDivElement>(null);

  const MIN_WIDTH = 200;
  const MAX_WIDTH = 1400;
  const TITLE_MIN = 24;
  const TITLE_MAX = 36;
  const DESC_MIN = 15;
  const DESC_MAX = 19;
  const MT_MIN = 0;
  const MT_MAX = 0.6;

  const [titleFontSize, setTitleFontSize] = useState(`${TITLE_MIN}px`);
  const [descFontSize, setDescFontSize] = useState(`${DESC_MIN}px`);
  const [descMarginTop, setDescMarginTop] = useState(`${MT_MIN}rem`);

  useEffect(() => {
    if (!ref.current) return;

    const updateSizes = () => {
      if (!ref.current) return;
      const width = ref.current.offsetWidth;
      const clamped = Math.min(Math.max(width, MIN_WIDTH), MAX_WIDTH);
      const ratio = (clamped - MIN_WIDTH) / (MAX_WIDTH - MIN_WIDTH);

      const interpTitle = TITLE_MIN + ratio * (TITLE_MAX - TITLE_MIN);
      const interpDesc = DESC_MIN + ratio * (DESC_MAX - DESC_MIN);
      const interpMargin = MT_MIN + ratio * (MT_MAX - MT_MIN);

      setTitleFontSize(`${interpTitle.toFixed(2)}px`);
      setDescFontSize(`${interpDesc.toFixed(2)}px`);
      setDescMarginTop(`${interpMargin.toFixed(3)}rem`);
    };

    updateSizes();

    const resizeObserver = new ResizeObserver(updateSizes);
    resizeObserver.observe(ref.current);

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={clsx(
        isMobile ? "mb-6 mt-0.25" : "mb-10",
        "flex flex-col transition-all w-full",
        isMobile
          ? "items-center text-center"
          : isRTL
          ? "items-end text-right"
          : "items-start text-left"
      )}
      style={{ direction: isRTL ? "rtl" : "ltr" }}
    >
      <h2
        className="font-headline font-bold tracking-tight leading-tight w-full"
        style={{
          fontSize: titleFontSize,
          lineHeight: 1.2,
          color: "var(--foreground)",
        }}
      >
        {title}
      </h2>
      {description && (
        <p
          className="w-full max-w-full"
          style={{
            fontSize: descFontSize,
            lineHeight: 1.5,
            color: "var(--sub-foreground)",
            marginTop: descMarginTop,
          }}
        >
          {description}
        </p>
      )}
    </div>
  );
}
