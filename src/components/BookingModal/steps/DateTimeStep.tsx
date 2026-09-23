"use client";

import React, { useEffect, useState } from "react";
import { Calendar } from "../Calendar";
import useIsRTL from "@/hooks/useIsRTL";
import { useTranslation } from "@/context/app-context";
import { generateTimeSlots, isTimeSlotAvailable } from "@/lib/schedule";
import { Master } from "@/lib/data";

interface DateTimeStepProps {
  selectedDate?: Date;
  onSelectDate: (date: Date) => void;
  onGenerateSchedule: (dailySchedule: boolean[], generatedSlots: string[]) => void;
  onNext: () => void;
  isMobile?: boolean;
  master?: Master;
}

const DateTimeStep: React.FC<DateTimeStepProps> = ({
  selectedDate,
  onSelectDate,
  onGenerateSchedule,
  onNext,
  isMobile,
  master,
}) => {
  const t = useTranslation();
  const isRTL = useIsRTL();

  const [dailySchedule, setDailySchedule] = useState<boolean[]>([]);
  const [generatedSlots, setGeneratedSlots] = useState<string[]>([]);

  // Generate availability mock (random) and filter slots depending on current time for today
  const handleDateSelect = (date: Date) => {
    onSelectDate(date);

    if (date && master) {
      const schedule = [...Array(96)].map(() => Math.random() > 0.8);
      setDailySchedule(schedule);

      let slots = generateTimeSlots(date, "en");

      // Filter out past slots if today
      const now = new Date();
      const isToday =
        date.getFullYear() === now.getFullYear() &&
        date.getMonth() === now.getMonth() &&
        date.getDate() === now.getDate();

      if (isToday) {
        const currentMinutes = now.getHours() * 60 + now.getMinutes();

        slots = slots.filter((slot) => {
          const [hourStr, minuteStr] = slot.split(":");
          let hours = parseInt(hourStr, 10);
          let minutes = parseInt(minuteStr, 10);

          const slotMinutes = hours * 60 + minutes;
          return slotMinutes >= currentMinutes;
        });
      }

      setGeneratedSlots(slots);
      onGenerateSchedule(schedule, slots);
    }
  };

  // Disable if date before today, Saturday, or no available slots on that day
  const isDateDisabled = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (date < today) return true;
    if (date.getDay() === 6) return true; // Saturday off

    if (!master) return false; // No master, allow booking

    // Generate daily schedule mock for check (for consistent availability, can be cached)
    const schedule = [...Array(96)].map(() => Math.random() > 0.8);
    const slots = generateTimeSlots(date, "en");

    // Filter slots for today past time also
    let availableSlots = slots;

    const now = new Date();
    const isToday = 
      date.getFullYear() === now.getFullYear() &&
      date.getMonth() === now.getMonth() &&
      date.getDate() === now.getDate();

    if (isToday) {
      const currentMinutes = now.getHours() * 60 + now.getMinutes();
      availableSlots = slots.filter((slot) => {
        const [hourStr, minuteStr] = slot.split(":");
        const hours = parseInt(hourStr, 10);
        const minutes = parseInt(minuteStr, 10);
        return (hours * 60 + minutes) >= currentMinutes;
      });
    }

    const hasAvailableSlot = availableSlots.some((slot) =>
      isTimeSlotAvailable(date, slot, 15, schedule, 15)
    );

    return !hasAvailableSlot;
  };

  const baseFontSize = isMobile ? 19 : 20;
  const title = t("date_tab_title") || "Select Date";

  return (
    <div
      className="flex flex-col p-6"
      dir={isRTL ? "rtl" : "ltr"}
      style={{
        color: "var(--foreground)",
        backgroundColor: "var(--background)",
      }}
    >
      {/* Title Section */}
      <div className="text-center pb-6">
        <h2
          className="leading-tight whitespace-pre-line"
          style={{ fontSize: baseFontSize }}
        >
          {title}
        </h2>
      </div>

      {/* Calendar Section */}
      <div
        className="flex-grow flex flex-col items-center justify-center w-full mx-auto rounded-md overflow-hidden border"
        style={{
          color: "var(--foreground)",
          backgroundColor: "var(--language-selector-list-bg)",
          borderColor: "var(--button-border-color)",
        }}
      >
        <Calendar
          selected={selectedDate}
          onSelect={handleDateSelect}
          disabled={isDateDisabled}
          isMobile={isMobile}
        />
      </div>
    </div>
  );
};

export default DateTimeStep;
