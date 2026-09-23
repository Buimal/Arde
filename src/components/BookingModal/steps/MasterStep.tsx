"use client";
import React, { useEffect } from "react";
import { Master, Service } from "@/lib/data";
import MasterCard from "../MasterCard";
import useIsRTL from "@/hooks/useIsRTL";
import { useTranslation, useApp } from "@/context/app-context";

interface MasterStepProps {
  masters: Master[];
  selectedMasterId?: string;
  onSelectMaster: (id: string) => void;
  onNext: () => void;
  preselectedService?: Service;
}

const MasterStep: React.FC<MasterStepProps> = ({
  masters,
  selectedMasterId,
  onSelectMaster,
  onNext,
  preselectedService,
}) => {
  const isRTL = useIsRTL();
  const t = useTranslation();
  const { lang } = useApp();

  useEffect(() => {
    if (!selectedMasterId && masters.length > 0) {
      onSelectMaster(masters[0].id);
    }
  }, [selectedMasterId, masters, onSelectMaster]);

  const isMobile = typeof window !== "undefined" && window.innerWidth <= 640;
  const baseFontSize = isMobile ? 19 : 20; // reduced 1px for mobile
  const adjustedFontSize =
    lang === "it" && preselectedService ? baseFontSize - 1 : baseFontSize;

  const title = preselectedService ? (
    <>
      <span style={{ color: "var(--foreground)", fontSize: adjustedFontSize }}>
        {t("book_for_service_title") || "Book for"}
      </span>
      <br />
      <span
        style={{ fontWeight: "bold", color: "var(--foreground)", fontSize: adjustedFontSize }}
      >
        {preselectedService.name}
      </span>
    </>
  ) : (
    <span style={{ color: "var(--foreground)", fontSize: adjustedFontSize }}>
      {t("master_tab_title") || "Select a Master"}
    </span>
  );

  return (
    <div
      className="flex flex-col h-full p-6"
      dir={isRTL ? "rtl" : "ltr"}
      style={{ color: "var(--foreground)", backgroundColor: "var(--background)" }}
    >
      <div className="text-center pb-4">
        <h2
          className="leading-tight whitespace-pre-line"
          style={{ color: "var(--foreground)", fontSize: adjustedFontSize }}
        >
          {title}
        </h2>
      </div>
      <div className="flex-grow -mx-2 px-2 space-y-2 overflow-visible">
        {masters.map((master) => (
          <MasterCard
            key={master.id}
            master={master}
            selected={selectedMasterId === master.id}
            onClick={() => onSelectMaster(master.id)}
            isRTL={isRTL}
          />
        ))}
      </div>
    </div>
  );
};

export default MasterStep;
