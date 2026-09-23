"use client";

import React, { useMemo } from "react";
import { Service, Master } from "@/lib/data";
import { isTimeSlotAvailable, formatTime } from "@/lib/schedule";
import { useApp, useTranslation } from "@/context/app-context";
import { motion } from "framer-motion";
import useIsRTL from "@/hooks/useIsRTL";

interface TimeStepProps {
  service: Service;
  master: Master;
  selectedDate: Date;
  selectedTime?: string;
  onSelectTime: (time: string) => void;
  onNext: () => void;
  isMobile?: boolean;
  dailySchedule: boolean[];
  generatedSlots: string[];
}

const TimeStep: React.FC<TimeStepProps> = ({
  service,
  master,
  selectedDate,
  selectedTime,
  onSelectTime,
  onNext,
  isMobile,
  dailySchedule,
  generatedSlots,
}) => {
  const { lang } = useApp();
  const isRTL = useIsRTL();
  const t = useTranslation();

  const availableSlots = useMemo(() => {
    if (!selectedDate || !service) return [];

    const longestServiceDuration = Math.max(
      ...master.services.map((sId) =>
        sId === service.id ? service.duration : 60
      )
    );

    return generatedSlots.filter((slot) =>
      isTimeSlotAvailable(
        selectedDate,
        slot,
        service.duration,
        dailySchedule,
        longestServiceDuration
      )
    );
  }, [selectedDate, service, generatedSlots, dailySchedule, master.services]);

  const baseFontSize = isMobile ? 19 : 20;
  const titleFontSize = isMobile ? baseFontSize - 1 : baseFontSize;
  const buttonFontSize = isMobile ? 13 : 14;
  const title = t("time_tab_title") || "Select Time";
  const line1 = t("no_slots_line1");
  const line2 = t("no_slots_line2");

  return (
    <div
      className="flex flex-col h-full p-6 text-foreground"
      dir={isRTL ? "rtl" : "ltr"}
      style={{ color: "var(--foreground)", backgroundColor: "var(--background)" }}
    >
      {/* Title */}
      <div className="text-center">
        <h2
          className="leading-tight whitespace-pre-line"
          style={{ fontSize: titleFontSize, color: "var(--foreground)" }}
        >
          {title}
        </h2>
      </div>

      {/* Slots or No Slots Message */}
      <div className="flex-grow flex flex-col items-center mt-6 overflow-y-auto min-h-[200px] w-full">
        {selectedDate && (
          <>
            {availableSlots.length > 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-3 gap-2 w-full"
              >
                {generatedSlots.map((slot) => {
                  const isAvailable = availableSlots.includes(slot);
                  const isSelected = selectedTime === slot;
                  return (
                    <button
                      key={slot}
                      disabled={!isAvailable}
                      onClick={() => onSelectTime(slot)}
                      className={`py-2 px-3 rounded-lg border transition-colors duration-300 ${
                        isSelected
                          ? "bg-[var(--accent)] border-[var(--accent)]"
                          : ""
                      } ${
                        isAvailable && !isSelected
                          ? "bg-[var(--background)] border-[var(--button-border-color)] text-[var(--foreground)] hover:bg-[var(--button-border-color)] hover:border-[var(--button-border-color)]"
                          : ""
                      } ${
                        !isAvailable
                          ? "bg-[var(--button-border-color)] border-[var(--button-border-color)] opacity-35 cursor-not-allowed"
                          : ""
                      }`}
                      style={{
                        color: isSelected
                          ? "var(--foreground)"
                          : isAvailable
                          ? "var(--foreground)"
                          : "var(--middle-foreground)",
                        borderColor: isSelected
                          ? "var(--accent)"
                          : "var(--button-border-color)",
                        backgroundColor: isSelected ? "var(--accent)" : undefined,
                        transition:
                          "background-color 0.25s ease, border-color 0.25s ease",
                        fontSize: buttonFontSize,
                        lineHeight: "inherit",
                      }}
                    >
                      {formatTime(slot, lang)}
                    </button>
                  );
                })}
              </motion.div>
            ) : (
              <p
                className="col-span-3 text-center py-4"
                style={{ color: "var(--sub-foreground)", lineHeight: 1.6 }}
              >
                {line1}
                <br />
                {line2}
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default TimeStep;
