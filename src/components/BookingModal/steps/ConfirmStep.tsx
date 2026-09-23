"use client";
import React, { useMemo } from "react";
import { Master, Service } from "@/lib/data";
import useIsRTL from "@/hooks/useIsRTL";
import { useTranslation, useApp } from "@/context/app-context";
import { formatTime } from "@/lib/schedule";

interface ConfirmStepProps {
  service: Service;
  master: Master;
  date: Date;
  time: string;
  formatPrice: (service: Service) => string;
  isMobile?: boolean;
  masterSpecific: boolean;
}

// Helper function to get localized duration string just as in ServicesSection
function getLocalizedDuration(t: (key: string) => string, duration: number) {
  const unit = t("duration_unit") || "minutes";
  return `${duration} ${unit}`;
}

const ConfirmStep: React.FC<ConfirmStepProps> = ({
  service,
  master,
  date,
  time,
  formatPrice,
  isMobile,
  masterSpecific,
}) => {
  const t = useTranslation();
  const isRTL = useIsRTL();
  const { lang } = useApp();

  const baseFontSize = isMobile ? 19 : 20;
  const serviceFontSize = isMobile ? baseFontSize - 2 : baseFontSize; // reduce 2px on mobile
  const dateFontSize = isMobile ? 13 : 14;
  const timeFontSize = isMobile ? 15 : 16;

  // Format full date preserving year, month, and day,
  // but replacing weekday with localized "Today" if the date is today
  const formatFullDate = (date: Date) => {
    const today = new Date();
    const isToday = date.toDateString() === today.toDateString();
    const todayText = t("today") || "Today";

    const options = {
      year: "numeric" as const,
      month: "long" as const,
      day: "numeric" as const,
    };

    // Get localized date part without weekday
    let localizedDatePart: string;
    if (lang === "he") localizedDatePart = date.toLocaleDateString("he-IL", options);
    else if (lang === "it") localizedDatePart = date.toLocaleDateString("it-IT", options);
    else localizedDatePart = date.toLocaleDateString("en-US", options);

    if (isToday) {
      // Return "Today, <Month> <Day>, <Year>"
      return `${todayText}, ${localizedDatePart}`;
    } else {
      // Get localized weekday name
      const weekdayOptions = { weekday: "long" as const };
      let localizedWeekday: string;
      if (lang === "he") localizedWeekday = date.toLocaleDateString("he-IL", weekdayOptions);
      else if (lang === "it") localizedWeekday = date.toLocaleDateString("it-IT", weekdayOptions);
      else localizedWeekday = date.toLocaleDateString("en-US", weekdayOptions);

      // Return "<Weekday>, <Month> <Day>, <Year>"
      return `${localizedWeekday}, ${localizedDatePart}`;
    }
  };

  const formattedDate = useMemo(() => formatFullDate(date), [date, lang]);
  const formattedTime = useMemo(() => formatTime(time, lang, 'medium'), [time, lang]);
  const title = t("confirm_step_title") || "Confirm Your Booking";

  return (
    <div
      className="flex flex-col h-full p-6"
      dir={isRTL ? "rtl" : "ltr"}
      style={{ color: "var(--foreground)", backgroundColor: "var(--background)" }}
    >
      {/* Title */}
      <div className="text-center pb-6">
        <h2
          className="leading-tight whitespace-pre-line font-semibold"
          style={{ fontSize: baseFontSize, color: "var(--foreground)" }}
        >
          {title}
        </h2>
      </div>

      {/* Master Card */}
      {!masterSpecific && master.image && (
        <div className="flex items-center gap-3 mb-6" style={{ direction: isRTL ? "rtl" : "ltr" }}>
          <img
            src={master.image}
            alt={`${master.name} photo`}
            className="rounded-lg object-cover"
            style={{ width: 48, height: 48, flexShrink: 0 }}
            loading="lazy"
          />
          <div className="flex flex-col overflow-hidden">
            <span
              className="whitespace-nowrap overflow-hidden text-ellipsis"
              style={{ color: "var(--foreground)", fontSize: baseFontSize, fontWeight: 700 }}
            >
              {master.name}
            </span>
            <span
              className="text-sm whitespace-nowrap overflow-hidden text-ellipsis"
              style={{ color: "var(--sub-foreground)" }}
            >
              {master.specialization}
            </span>
          </div>
        </div>
      )}

      {/* Outlined card: service name, date, time no labels */}
      <div
        className="flex flex-col items-center justify-center rounded-md border mb-2 py-6 px-4 text-center"
        style={{ borderColor: "var(--button-border-color)", backgroundColor: "var(--language-selector-list-bg)" }}
      >
        <h3
          style={{
            fontSize: serviceFontSize,
            fontWeight: isMobile ? 600 : 700,
            color: "var(--foreground)",
            marginBottom: isMobile ? 4 : 8,
          }}
        >
          {service.name}
        </h3>
        <div
          style={{
            fontSize: dateFontSize,
            fontWeight: 400,
            color: "var(--foreground)",
            marginBottom: isMobile ? 2 : 5,
          }}
        >
          {formattedDate}
        </div>
        <div style={{ fontSize: timeFontSize, fontWeight: 500, color: "var(--foreground)" }}>{formattedTime}</div>
      </div>

      {/* Duration and price aligned on same line below the card with mobile font size reduction */}
      <div className="flex flex-col gap-3 mt-4">
        <div
          className="flex justify-between items-center"
          style={{ fontSize: isMobile ? 13 : 14, color: "var(--sub-foreground)" }}
        >
          <span>{t("confirm_duration_label") || "Duration"}:</span>
          <span style={{ fontWeight: 600, color: "var(--foreground)" }}>
            {getLocalizedDuration(t, service.duration)}
          </span>
        </div>
        <div
          className="flex justify-between items-center"
          style={{ fontSize: isMobile ? 13 : 14, color: "var(--sub-foreground)" }}
        >
          <span>{t("confirm_price_label") || "Price"}:</span>
          <span style={{ fontWeight: 600, color: "var(--foreground)" }}>{formatPrice(service)}</span>
        </div>
      </div>
    </div>
  );
};

export default ConfirmStep;
