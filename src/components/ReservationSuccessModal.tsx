"use client";

import React, { useEffect, useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ModalOverlay } from "@/components/modal-overlay";
import useIsRTL from "@/hooks/useIsRTL";
import { useApp } from "@/context/app-context";
import { formatTime } from "@/lib/schedule";
import { useIsMobile } from "@/hooks/use-mobile";
import ChronicleButton from "@/components/RefinedChronicleButton";

interface ReservationSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingData: {
    service: { name: string };
    master: { name: string };
    date: Date;
    time: string;
  };
  iconColor?: string;
  iconCircleColor?: string;
}

const ANIMATION_DURATION = 0.3;

export default function ReservationSuccessModal({
  isOpen,
  onClose,
  bookingData,
  iconColor = "#4CAF50",
  iconCircleColor = "rgba(76,175,80,.5)",
}: ReservationSuccessModalProps) {
  const { lang, t } = useApp();
  const isRTL = useIsRTL();
  const isMobile = useIsMobile();

  // Modal width state with resize handler
  const [modalWidth, setModalWidth] = useState(360);

  // Adjustable values for interpolation
  const minWidth = 200;
  const maxWidth = 564;
  const minTranslateX = isRTL ? 2 : -2;
  const maxTranslateX = isRTL ? 4 : -4;

  useEffect(() => {
    function handleResize() {
      const w = Math.min(window.innerWidth, window.innerHeight, maxWidth);
      setModalWidth(w);
    }
    window.addEventListener("resize", handleResize);
    // Call once initially to set width correctly
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [maxWidth]);

  // Linear interpolation helper function
  function interpolate(
    value: number,
    inputMin: number,
    inputMax: number,
    outputMin: number,
    outputMax: number
  ) {
    if (value <= inputMin) return outputMin;
    if (value >= inputMax) return outputMax;
    return (
      outputMin + ((value - inputMin) * (outputMax - outputMin)) / (inputMax - inputMin)
    );
  }

  // Calculate iconTranslateX using linear interpolation
  const iconTranslateX = interpolate(
    modalWidth,
    minWidth,
    maxWidth,
    minTranslateX,
    maxTranslateX
  );

  const base = modalWidth / maxWidth;

  // Line height unified and font sizes scaled with base, all text lines use same fontSize and lineHeight
  const titleFontSize = Math.round(40 * (base * 0.6));
  const unifiedFontSize = Math.round(16 * base);
  const unifiedLineHeight = 1.875;
  const marginTitleBottom = 14 * base;
  const marginDetailBottom = 36 * base;
  const marginIconBottom = 24 * base;

  // Date/time formatting with conditional line break
  const { waitingPrefix, dateText, dateOnNewLine } = useMemo(() => {
    const dateObj = bookingData.date;
    const today = new Date();
    const isToday = dateObj.toDateString() === today.toDateString();
    const options = { year: "numeric" as const, month: "long" as const, day: "numeric" as const };
    const weekdayOptions = { weekday: "long" as const };
    let dateStr = "";
    let weekdayStr = "";
    if (lang === "he") {
      dateStr = dateObj.toLocaleDateString("he-IL", options);
      weekdayStr = dateObj.toLocaleDateString("he-IL", weekdayOptions);
    } else if (lang === "it") {
      dateStr = dateObj.toLocaleDateString("it-IT", options);
      weekdayStr = dateObj.toLocaleDateString("it-IT", weekdayOptions);
    } else {
      dateStr = dateObj.toLocaleDateString("en-US", options);
      weekdayStr = dateObj.toLocaleDateString("en-US", weekdayOptions);
    }
    const timeString = formatTime(bookingData.time, lang, 'full');
    if (isToday) {
      return {
        waitingPrefix: t("reservation_waiting_prefix_today"),
        dateText: timeString,
        dateOnNewLine: false,
      };
    } else {
      let datePart = "";
      if (lang === "it") {
        datePart = `${weekdayStr}, ${dateStr} ${t("reservation_preposition_it")} ${timeString}`;
      } else if (lang === "he") {
        datePart = `${weekdayStr}, ${dateStr} ${t("reservation_preposition_he")} ${timeString}`;
      } else {
        datePart = `${weekdayStr}, ${dateStr} ${t("reservation_preposition_en")} ${timeString}`;
      }
      return {
        waitingPrefix: t("reservation_waiting_prefix_other"),
        dateText: datePart,
        dateOnNewLine: true,
      };
    }
  }, [bookingData.date, bookingData.time, lang, t]);

  return (
    <AnimatePresence>
      {isOpen && (
        <ModalOverlay onClose={onClose}>
          <motion.div
            key="success-modal"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: ANIMATION_DURATION, ease: "easeInOut" }}
            onClick={(e) => e.stopPropagation()}
            className="relative rounded-lg shadow-xl flex flex-col items-center outline-none border"
            style={{
              width: modalWidth,
              maxWidth: maxWidth,
              height: "auto",
              backgroundColor: "var(--background)",
              borderColor: "var(--button-border-color)",
              borderWidth: 1,
              borderStyle: "solid",
              padding: 24,
              margin: 10,
            }}
            dir={isRTL ? "rtl" : "ltr"}
          >
            {/* Success Icon Container with translateX for manual horiz centering */}
            <div
              className="success-checkmark"
              style={{
                transform: `translateX(${iconTranslateX}px) scale(${0.5 + 0.5 * ((modalWidth - minWidth) / (maxWidth - minWidth))})`,
                background: "transparent",
                marginBottom: marginIconBottom,
                width: 80,
                height: 58,
              }}
            >
              <div
                className="check-icon"
                style={{ borderColor: iconColor, background: "transparent" }}
              >
                <span className="icon-line line-tip" style={{ backgroundColor: iconColor }} />
                <span className="icon-line line-long" style={{ backgroundColor: iconColor }} />
                <div className="icon-circle" style={{ borderColor: iconCircleColor }} />
                <div className="icon-fix" />
              </div>
            </div>
            {/* Wrapper controlling text margins and line height */}
            <div
              style={{
                marginTop: marginIconBottom,
                marginBottom: marginDetailBottom,
                lineHeight: unifiedLineHeight,
                width: "100%",
              }}
            >
              {/* Success Title */}
              <h2
                style={{
                  fontSize: titleFontSize,
                  fontWeight: 700,
                  color: "var(--foreground)",
                  textAlign: "center",
                  margin: 0,
                  padding: 0,
                  lineHeight: 1,
                  marginBottom: marginTitleBottom,
                }}
              >
                {t("reservation_success_title")}
              </h2>
              {/* Success message */}
              <p
                style={{
                  fontSize: unifiedFontSize,
                  color: "var(--foreground)",
                  margin: 0,
                  paddingTop: 8,
                  textAlign: "center",
                  whiteSpace: "pre-line",
                }}
              >
                <span style={{ fontWeight: 600 }}>{t("reservation_success_message")}</span>
                <br />
                <span style={{ fontWeight: 400 }}>
                  {bookingData.master.name} {waitingPrefix}{" "}
                  {dateOnNewLine ? (
                    <>
                      <br />
                      {dateText}
                    </>
                  ) : (
                    dateText
                  )}
                </span>
              </p>
            </div>
            {/* OK Button with exact dynamic height */}
            <ChronicleButton
              onClick={onClose}
              className="w-full"
              variant="default"
              backgroundColor="var(--foreground)"
              hoverBackgroundColor="var(--accent)"
              textColor="var(--background)"
              hoverTextColor="var(--foreground)"
              borderVisible={false}
              borderRadius="var(--button-border-radius)"
              fontWeight={700}
              buttonHeight={isMobile ? "2.75rem" : "2.875rem"}
              width="100%"
            >
              {t("ok_inscription")}
            </ChronicleButton>
            {/* Animation styles */}
            <style>{`
              .success-checkmark { width: 80px; background: transparent !important; margin-left: auto; margin-right: auto; }
              .check-icon { width: 80px; height: 80px; position: relative; border-radius: 50%; box-sizing: content-box; border: 4px solid ${iconColor}; background: transparent !important; }
              .check-icon::before, .check-icon::after { content: ''; height: 100px; position: absolute; background: transparent !important; transform: rotate(-45deg); }
              .check-icon::before { top: 3px; left: -2px; width: 30px; border-radius: 100px 0 0 100px; }
              .check-icon::after { top: 0; left: 30px; width: 60px; border-radius: 0 100px 100px 0; animation: rotate-circle 4.25s ease-in; }
              .icon-line { height: 5px; border-radius: 2px; position: absolute; z-index: 10; }
              .icon-line.line-tip { top: 46px; left: 14px; width: 25px; transform: rotate(45deg); animation: icon-line-tip 0.75s; background-color: ${iconColor}; }
              .icon-line.line-long { top: 38px; right: 8px; width: 47px; transform: rotate(-45deg); animation: icon-line-long 0.75s; background-color: ${iconColor}; }
              .icon-circle { top: -4px; left: -4px; z-index: 10; width: 80px; height: 80px; border-radius: 50%; position: absolute; box-sizing: content-box; border: 4px solid ${iconCircleColor}; background: transparent !important; }
              .icon-fix { top: 8px; width: 5px; left: 26px; z-index: 1; height: 85px; position: absolute; transform: rotate(-45deg); background-color: transparent !important; }
              @keyframes rotate-circle { 0%, 5% { transform: rotate(-45deg); } 12%, 100% { transform: rotate(-405deg); } }
              @keyframes icon-line-tip { 0%, 54% { width: 0; left: 1px; top: 19px; } 70% { width: 50px; left: -8px; top: 37px; } 84% { width: 17px; left: 21px; top: 48px; } 100% { width: 25px; left: 14px; top: 45px; } }
              @keyframes icon-line-long { 0%, 65% { width: 0; right: 46px; top: 54px; } 84% { width: 55px; right: 0; top: 35px; } 100% { width: 47px; right: 8px; top: 38px; } }
            `}</style>
          </motion.div>
        </ModalOverlay>
      )}
    </AnimatePresence>
  );
}
