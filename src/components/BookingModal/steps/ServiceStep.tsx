"use client";
import React, { useMemo, useEffect } from "react";
import { Service, Master } from "@/lib/data";
import WheelPicker from "../WheelPicker";
import useIsRTL from "@/hooks/useIsRTL";
import { useTranslation } from "@/context/app-context";

interface ServiceStepProps {
  services: Service[];
  selectedServiceId?: string;
  onSelectService: (id: string) => void;
  onNext: () => void;
  formatPrice: (service: Service) => string;
  lockedMaster?: Master;
  isMobile?: boolean;
}

const ServiceStep: React.FC<ServiceStepProps> = ({
  services,
  selectedServiceId,
  onSelectService,
  onNext,
  formatPrice,
  lockedMaster,
  isMobile,
}) => {
  const isRTL = useIsRTL();
  const t = useTranslation();

  useEffect(() => {
    if (!selectedServiceId && services.length > 0) {
      onSelectService(services[0].id);
    }
  }, [services, selectedServiceId, onSelectService]);

  const options = useMemo(
    () =>
      services.map((service) => ({
        value: service.id,
        label: `${service.name}\n${formatPrice(service)}`,
      })),
    [services, formatPrice]
  );

  const baseFontSize = isMobile ? 19 : 20;
  const title = t("service_tab_title") || "Select a Service";

  return (
    <div
      className="flex flex-col p-6"
      dir={isRTL ? "rtl" : "ltr"}
      style={{
        color: "var(--foreground)",
        backgroundColor: "var(--background)",
      }}
    >
      <div className="text-center pb-6">
        <h2
          className="leading-tight whitespace-pre-line"
          style={{ color: "var(--foreground)", fontSize: baseFontSize }}
        >
          {title}
        </h2>
      </div>
      <div
        className="flex-grow flex items-center justify-center pb-6 w-full mx-auto rounded-md overflow-hidden border"
        style={{
          color: "var(--foreground)",
          backgroundColor: "var(--language-selector-list-bg)",
          borderColor: "var(--button-border-color)",
        }}
      >
        {options.length > 0 && (
          <WheelPicker
            options={options}
            value={selectedServiceId}
            onValueChange={onSelectService}
          />
        )}
      </div>
    </div>
  );
};

export default ServiceStep;
