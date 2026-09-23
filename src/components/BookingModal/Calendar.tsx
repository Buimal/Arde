"use client";
import React, { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useApp } from "@/context/app-context";
import useIsRTL from "@/hooks/useIsRTL";
import { AnimatePresence, motion } from "framer-motion";
import { MorphingText } from "@/components/MorphingText";
import { useSwipeable } from "react-swipeable";

type CalendarProps = {
  selected?: Date;
  onSelect: (date: Date) => void;
  disabled?: (date: Date) => boolean;
  isMobile?: boolean;
};

const dayNames: { [key: string]: string[] } = {
  en: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  he: ["א׳", "ב׳", "ג׳", "ד׳", "ה׳", "ו׳", "ש׳"],
  it: ["Dom", "Lun", "Mar", "Mer", "Gio", "Ven", "Sab"],
};

function isSameDay(d1: Date, d2: Date) {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}

export function Calendar({
  selected,
  onSelect,
  disabled = () => false,
  isMobile = false,
}: CalendarProps) {
  const { lang } = useApp();
  const isRTL = useIsRTL();
  const [currentDate, setCurrentDate] = useState(selected || new Date());
  const [direction, setDirection] = useState<"next" | "prev">("next");

  // Refs for prev/next buttons to blur after gesture to prevent stuck hover/focus styles
  const prevButtonRef = useRef<HTMLButtonElement | null>(null);
  const nextButtonRef = useRef<HTMLButtonElement | null>(null);

  const currentMonth = currentDate.toLocaleString(lang, { month: "long" });
  const currentYear = currentDate.getFullYear();
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );
  let firstDayOfWeek = firstDayOfMonth.getDay();

  if (lang === "he") {
    firstDayOfWeek = (firstDayOfWeek + 0) % 7;
  }

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const sizes = {
    desktop: {
      padding: 12,
      daySize: 36,
      spacing: 8,
      borderRadius: 8,
      chevronSize: 28,
      fontSize: "14px",
      monthFont: "16px",
      chevronIcon: 16,
    },
    mobile: {
      padding: 12,
      daySize: 32,
      spacing: 6,
      borderRadius: 8,
      chevronSize: 24,
      fontSize: "13px",
      monthFont: "14px",
      chevronIcon: 15,
    },
  };

  const cfg = isMobile ? sizes.mobile : sizes.desktop;
  const totalWidth = 2 + cfg.padding * 2 + cfg.daySize * 7 + cfg.spacing * 6;

  const isPastMonth = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return (
      date.getFullYear() < today.getFullYear() ||
      (date.getFullYear() === today.getFullYear() &&
        date.getMonth() < today.getMonth())
    );
  };

  // Blur prev/next buttons to avoid lingering hover/focus styles after gesture change
  const blurButtons = () => {
    if (prevButtonRef.current) prevButtonRef.current.blur();
    if (nextButtonRef.current) nextButtonRef.current.blur();
  };

  // Button click handlers remain the same
  const handlePrevMonth = () => {
    const newDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
      1,
      12
    );
    if (!isPastMonth(newDate)) {
      setDirection("prev");
      setCurrentDate(newDate);
    }
  };

  const handleNextMonth = () => {
    const newDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      1,
      12
    );
    setDirection("next");
    setCurrentDate(newDate);
  };

  const handleDayClick = (day: number) => {
    const newDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day,
      12
    );
    if (!disabled(newDate)) {
      onSelect(newDate);
    }
  };

  const renderCalendarDays = () => {
    const days: JSX.Element[] = [];
    const localeDayNames = dayNames[lang] || dayNames["en"];
    for (let i = 0; i < 7; i++) {
      const dayIndex = i;
      const dayLabel = isMobile
        ? localeDayNames[dayIndex].slice(0, 2)
        : localeDayNames[dayIndex];
      days.push(
        <div
          key={`header-${i}`}
          className="flex items-center justify-center text-muted-foreground select-none"
          style={{
            width: cfg.daySize,
            height: cfg.daySize,
            fontSize: cfg.fontSize,
          }}
          aria-hidden="true"
        >
          {dayLabel}
        </div>
      );
    }
    const startOffset = firstDayOfWeek;
    for (let i = 0; i < startOffset; i++) {
      days.push(
        <div
          key={`empty-${i}`}
          style={{ width: cfg.daySize, height: cfg.daySize }}
        />
      );
    }
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        day,
        12
      );
      const isSelected = selected ? isSameDay(selected, date) : false;
      const isDisabled = disabled(date);
      days.push(
        <div
          key={`day-${day}`}
          className="flex items-center justify-center"
          style={{ width: cfg.daySize, height: cfg.daySize }}
        >
          <button
            type="button"
            disabled={isDisabled}
            onClick={() => handleDayClick(day)}
            aria-pressed={isSelected}
            aria-label={`Select day ${day}`}
            style={{
              width: cfg.daySize,
              height: cfg.daySize,
              borderRadius: cfg.borderRadius,
              fontSize: cfg.fontSize,
            }}
            className={`flex items-center justify-center font-medium transition-colors duration-300 ${
              isDisabled
                ? "cursor-not-allowed border border-[var(--button-border-color)] text-[var(--middle-foreground)] opacity-50"
                : isSelected
                ? "cursor-pointer bg-[var(--accent)] border border-[var(--accent)]"
                : "cursor-pointer border border-[var(--button-border-color)] text-[var(--foreground)] hover:bg-[var(--button-border-color)] hover:border-[var(--button-border-color)] hover:text-[var(--foreground)]"
            } `}
          >
            {day}
          </button>
        </div>
      );
    }
    return days;
  };

  const navButtonBaseStyles = `
    flex items-center justify-center border border-[var(--button-border-color)]
    text-[var(--foreground)] transition-colors duration-300
    hover:bg-[var(--button-border-color)]
    hover:text-[var(--foreground)]
    disabled:opacity-30 disabled:cursor-not-allowed
  `;

  const variants = {
    enter: (dir: "next" | "prev") => ({
      x: isRTL ? (dir === "next" ? 40 : -40) : dir === "next" ? -40 : 40,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (dir: "next" | "prev") => ({
      x: isRTL ? (dir === "next" ? -40 : 40) : dir === "next" ? 40 : -40,
      opacity: 0,
    }),
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (isRTL) {
        setDirection("next");
        const newDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() - 1,
          1,
          12
        );
        if (!isPastMonth(newDate)) {
          setCurrentDate(newDate);
          blurButtons();
        }
      } else {
        setDirection("prev");
        const newDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() + 1,
          1,
          12
        );
        setCurrentDate(newDate);
        blurButtons();
      }
    },
    onSwipedRight: () => {
      if (isRTL) {
        setDirection("prev");
        const newDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() + 1,
          1,
          12
        );
        setCurrentDate(newDate);
        blurButtons();
      } else {
        setDirection("next");
        const newDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() - 1,
          1,
          12
        );
        if (!isPastMonth(newDate)) {
          setCurrentDate(newDate);
          blurButtons();
        }
      }
    },
    trackTouch: true,
    trackMouse: false,
  });

  return (
    <div
      {...handlers}
      className="rounded-[8px] border border-[var(--button-border-color)] bg-[var(--calendar-background)] text-[var(--foreground)] select-none overflow-hidden"
      role="grid"
      aria-readonly="true"
      dir={isRTL ? "rtl" : "ltr"}
      style={{ width: `${totalWidth}px`, padding: cfg.padding }}
    >
      {/* Header */}
      <div className="flex justify-between items-center pb-2">
        <MorphingText
          texts={[`${currentMonth} ${currentYear}`]}
          className="font-semibold"
        />
        <div className="flex items-center gap-2">
          {isRTL ? (
            <>
              <button
                ref={prevButtonRef}
                onClick={handlePrevMonth}
                disabled={isPastMonth(
                  new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
                )}
                aria-label="Next month"
                className={navButtonBaseStyles}
                style={{
                  width: cfg.chevronSize,
                  height: cfg.chevronSize,
                  borderRadius: cfg.borderRadius,
                }}
                type="button"
              >
                <ChevronRight size={cfg.chevronIcon} />
              </button>
              <button
                ref={nextButtonRef}
                onClick={handleNextMonth}
                aria-label="Previous month"
                className={navButtonBaseStyles}
                style={{
                  width: cfg.chevronSize,
                  height: cfg.chevronSize,
                  borderRadius: cfg.borderRadius,
                }}
                type="button"
              >
                <ChevronLeft size={cfg.chevronIcon} />
              </button>
            </>
          ) : (
            <>
              <button
                ref={prevButtonRef}
                onClick={handlePrevMonth}
                disabled={isPastMonth(
                  new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
                )}
                aria-label="Previous month"
                className={navButtonBaseStyles}
                style={{
                  width: cfg.chevronSize,
                  height: cfg.chevronSize,
                  borderRadius: cfg.borderRadius,
                }}
                type="button"
              >
                <ChevronLeft size={cfg.chevronIcon} />
              </button>
              <button
                ref={nextButtonRef}
                onClick={handleNextMonth}
                aria-label="Next month"
                className={navButtonBaseStyles}
                style={{
                  width: cfg.chevronSize,
                  height: cfg.chevronSize,
                  borderRadius: cfg.borderRadius,
                }}
                type="button"
              >
                <ChevronRight size={cfg.chevronIcon} />
              </button>
            </>
          )}
        </div>
      </div>
      {/* Calendar grid */}
      <div className="relative w-full h-full">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentDate.getMonth() + "-" + currentDate.getFullYear()}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35 }}
            className="grid grid-cols-7 text-center w-full"
            style={{ gap: `${cfg.spacing}px` }}
          >
            {renderCalendarDays()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
