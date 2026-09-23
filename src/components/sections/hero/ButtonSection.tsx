"use client";

import React from "react";
import RefinedChronicleButton from "@/components/RefinedChronicleButton";
import { MessageCircle } from "lucide-react";
import { useTranslation } from "@/context/app-context";

interface ButtonSectionProps {
  buttonsBelowOneAnother?: boolean;
  mobileButtonHeight?: boolean;
  isRTL?: boolean;
  onButtonClick?: (buttonKey: "schedule" | "explore") => void;
}

export default function ButtonSection({
  buttonsBelowOneAnother = false,
  mobileButtonHeight = false,
  isRTL = false,
  onButtonClick,
}: ButtonSectionProps) {
  const t = useTranslation();

  const handleClick = (buttonKey: "schedule" | "explore") => {
    if (onButtonClick) {
      onButtonClick(buttonKey);
    }
  };

  return (
    <div
      className="flex w-full justify-start items-center mt-8"
      style={{
        gap: buttonsBelowOneAnother ? "12px" : "16px",
        flexDirection: buttonsBelowOneAnother ? "column" : "row",
      }}
      dir={isRTL ? "rtl" : "ltr"}
    >
      <RefinedChronicleButton
        backgroundColor="var(--foreground)"
        textColor="var(--background)"
        hoverBackgroundColor="var(--accent)"
        hoverTextColor="var(--foreground)"
        borderVisible={false}
        buttonHeight={mobileButtonHeight ? "2.75rem" : "2.875rem"}
        width={buttonsBelowOneAnother ? "100%" : "auto"}
        isRTL={isRTL}
        onClick={() => handleClick("schedule")}
      >
        <MessageCircle size={18} strokeWidth={2} />
        {t("schedule_visit")}
      </RefinedChronicleButton>

      <RefinedChronicleButton
        backgroundColor="var(--background)"
        textColor="var(--foreground)"
        borderColor="var(--button-border-color)"
        borderVisible
        hoverBorderVisible
        hoverBackgroundColor="var(--accent)"
        hoverBorderColor="var(--accent)"
        hoverTextColor="var(--foreground)"
        buttonHeight={mobileButtonHeight ? "2.75rem" : "2.875rem"}
        width={buttonsBelowOneAnother ? "100%" : "auto"}
        isRTL={isRTL}
        onClick={() => handleClick("explore")}
      >
        {t("explore_services")}
      </RefinedChronicleButton>
    </div>
  );
}
