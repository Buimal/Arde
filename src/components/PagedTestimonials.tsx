"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useSwipeable } from "react-swipeable";
import { useIsMobile } from "@/hooks/use-mobile";
import useIsRTL from "@/hooks/useIsRTL";

export interface PagedTestimonialItem {
  id: string;
  quote: string;
  name: string;
  designation: string;
  rating: string;
  src: string;
  mirrorImage?: boolean;
}

interface Colors {
  name?: string;
  designation?: string;
  testimony?: string;
  cardBackground?: string;
  cardBorder?: string;
  arrowBackground?: string;
  arrowHoverBackground?: string;
  arrowForeground?: string;
  arrowForegroundHover?: string;
}

interface PagedTestimonialsProps {
  testimonials: PagedTestimonialItem[];
  cardsPerPage?: number;
  autoplay?: boolean;
  autoplayInterval?: number;
  colors?: Colors;
  nameFontSize?: string;
  designationFontSize?: string;
  ratingFontSize?: string;
  quoteFontSize?: string;
  imageSize?: string;
  isRTL?: boolean;
}

function StarIcon({ size = 14 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className="inline-block text-yellow-400"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M8.243 7.34l-6.38 .925l-.113 .023a1 1 0 0 0-.44 1.684l4.622 4.499l-1.09 6.355l-.013 .11a1 1 0 0 0 1.464 .944l5.706 -3l5.693 3l.1 .046a1 1 0 0 0 1.352 -1.1l-1.091 -6.355l4.624 -4.5l.078 -.085a1 1 0 0 0-.633 -1.62l-6.38 -.926l-2.852 -5.78a1 1 0 0 0-1.794 0l-2.853 5.78z" />
    </svg>
  );
}

function TestimonialBox({
  item,
  colors,
  fontSizes,
  imageSize,
}: {
  item: PagedTestimonialItem;
  colors: Required<Pick<Colors, "name" | "designation" | "testimony">> &
    Partial<Colors>;
  fontSizes: { name: string; designation: string; rating: string; quote: string };
  imageSize: string;
}) {

  return (
    <div
      className="flex flex-col rounded-xl h-full"
      style={{
        backgroundColor: colors.cardBackground ?? "var(--background)",
        border: `1px solid ${colors.cardBorder ?? "var(--button-border-color)"}`,
        padding: "24px",
      }}
    >
      <div className="flex items-center gap-4">
        <div
          className="flex-shrink-0 overflow-hidden rounded-full"
          style={{ width: imageSize, height: imageSize }}
        >
          <img
            src={item.src}
            alt={item.name}
            loading="lazy"
            decoding="async"
            className={`w-full h-full object-cover ${
              item.mirrorImage ? "scale-x-[-1]" : ""
            }`}
          />
        </div>
        <div className="flex flex-col flex-grow min-w-0">
          <span
            className="font-bold leading-tight truncate"
            style={{ color: colors.name, fontSize: fontSizes.name }}
          >
            {item.name}
          </span>
          <span
            className="mt-0.5 truncate"
            style={{ color: colors.designation, fontSize: fontSizes.designation }}
          >
            {item.designation}
          </span>
          <span
            className="flex items-center gap-1 font-bold mt-1"
            style={{ color: "var(--accent)", fontSize: fontSizes.rating }}
          >
            <StarIcon size={14} />
            {item.rating}
          </span>
        </div>
      </div>
      <p
        className="mt-4 leading-relaxed"
        style={{ color: colors.testimony, fontSize: fontSizes.quote }}
      >
        {item.quote}
      </p>
    </div>
  );
}

export function PagedTestimonials({
  testimonials,
  cardsPerPage = 2,
  autoplay = false,
  autoplayInterval = 5000,
  colors = {},
  nameFontSize = "1.125rem",
  designationFontSize = "0.875rem",
  ratingFontSize = "0.875rem",
  quoteFontSize = "0.95rem",
  imageSize = "56px",
  isRTL = false,
}: PagedTestimonialsProps) {
  const isMobile = useIsMobile();
  const rtl = isRTL;
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(1);
  const [hoverPrev, setHoverPrev] = useState(false);
  const [hoverNext, setHoverNext] = useState(false);

  // Force one card per page on mobile regardless of prop
  const perPage = isMobile ? 1 : cardsPerPage;
  const totalPages = Math.max(1, Math.ceil(testimonials.length / perPage));

  const currentItems = useMemo(() => {
    const start = page * perPage;
    return testimonials.slice(start, start + perPage);
  }, [page, perPage, testimonials]);

  const clampPage = useCallback(
    (next: number) => {
      if (next < 0) return totalPages - 1;
      if (next >= totalPages) return 0;
      return next;
    },
    [totalPages]
  );

  const goToPage = useCallback(
    (next: number, dir: number) => {
      setDirection(dir);
      setPage((prev) =>
        clampPage(next)
      );
    },
    [clampPage]
  );

  const handleNext = useCallback(() => {
    goToPage(page + 1, rtl ? -1 : 1);
  }, [goToPage, page, rtl]);

  const handlePrev = useCallback(() => {
    goToPage(page - 1, rtl ? 1 : -1);
  }, [goToPage, page, rtl]);

  // Keep page in range if the list changes
  useEffect(() => {
    setPage((prev) => Math.min(prev, totalPages - 1));
  }, [totalPages]);

  // Autoplay
  useEffect(() => {
    if (!autoplay || totalPages <= 1) return;
    const id = setInterval(() => {
      setDirection(rtl ? -1 : 1);
      setPage((prev) => clampPage(prev + 1));
    }, autoplayInterval);
    return () => clearInterval(id);
  }, [autoplay, autoplayInterval, totalPages, clampPage, rtl]);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => handleNext(),
    onSwipedRight: () => handlePrev(),
    preventScrollOnSwipe: false,
    trackMouse: false,
  });

  const colorName = colors.name ?? "var(--foreground)";
  const colorDesignation = colors.designation ?? "var(--sub-foreground)";
  const colorTestimony = colors.testimony ?? "var(--middle-foreground)";
  const colorArrowBg = colors.arrowBackground ?? "var(--foreground)";
  const colorArrowHoverBg = colors.arrowHoverBackground ?? "var(--accent)";
  const colorArrowFg = colors.arrowForeground ?? "var(--background)";
  const colorArrowFgHover = colors.arrowForegroundHover ?? "var(--foreground)";

  const boxFontSizes = {
    name: nameFontSize,
    designation: designationFontSize,
    rating: ratingFontSize,
    quote: quoteFontSize,
  };

  const arrowStyle = (hover: boolean) => ({
    backgroundColor: hover ? colorArrowHoverBg : colorArrowBg,
    width: "44px",
    height: "44px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    border: "none",
    transition: "background-color 0.3s, color 0.3s",
  });

  const paginationDots = Array.from({ length: totalPages }, (_, i) => i);

  return (
    <div dir={rtl ? "rtl" : "ltr"}>
      <div
        {...(isMobile ? swipeHandlers : {})}
        className="w-full"
        style={{ touchAction: isMobile ? "pan-y" : undefined }}
      >
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={page}
            custom={direction}
            initial={{ opacity: 0, x: direction > 0 ? 40 : -40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction > 0 ? -40 : 40 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="grid h-full"
            style={{
              gridTemplateColumns: `repeat(${currentItems.length}, minmax(0, 1fr))`,
              gap: "20px",
            }}
          >
            {currentItems.map((item) => (
              <TestimonialBox
                key={item.id}
                item={item}
                colors={{
                  name: colorName,
                  designation: colorDesignation,
                  testimony: colorTestimony,
                  cardBackground: colors.cardBackground,
                  cardBorder: colors.cardBorder,
                }}
                fontSizes={boxFontSizes}
                imageSize={imageSize}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <div
        className="flex items-center justify-center mt-8 gap-6"
        style={{ direction: "ltr" }}
      >
        <button
          aria-label="Testimonio anterior"
          onClick={handlePrev}
          onMouseEnter={() => setHoverPrev(true)}
          onMouseLeave={() => setHoverPrev(false)}
          style={arrowStyle(hoverPrev)}
        >
          <ArrowLeft
            size={20}
            color={hoverPrev ? colorArrowFgHover : colorArrowFg}
          />
        </button>

        <div className="flex items-center gap-2">
          {paginationDots.map((i) => (
            <button
              key={i}
              aria-label={`Ir a la página ${i + 1}`}
              onClick={() => goToPage(i, i > page ? 1 : -1)}
              className="rounded-full border-none p-0 cursor-pointer transition-all duration-300"
              style={{
                width: i === page ? "26px" : "8px",
                height: "8px",
                backgroundColor:
                  i === page ? "var(--accent)" : "var(--sub-foreground)",
                opacity: i === page ? 1 : 0.5,
              }}
            />
          ))}
        </div>

        <button
          aria-label="Siguiente testimonio"
          onClick={handleNext}
          onMouseEnter={() => setHoverNext(true)}
          onMouseLeave={() => setHoverNext(false)}
          style={arrowStyle(hoverNext)}
        >
          <ArrowRight
            size={20}
            color={hoverNext ? colorArrowFgHover : colorArrowFg}
          />
        </button>
      </div>
    </div>
  );
}

export default PagedTestimonials;