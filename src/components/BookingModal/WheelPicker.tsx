"use client";
import React from "react";
import * as WheelPickerPrimitive from "@ncdai/react-wheel-picker";
import "@ncdai/react-wheel-picker/style.css";
import useIsRTL from "@/hooks/useIsRTL";

interface WheelPickerProps extends React.ComponentProps<typeof WheelPickerPrimitive.WheelPicker> { }

function WheelPicker({ classNames, ...props }: WheelPickerProps) {
  const isRTL = useIsRTL();

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className="w-full">
      <WheelPickerPrimitive.WheelPicker
        classNames={{
          optionItem: "text-[var(--language-selector-inactive-foreground)]",
          highlightWrapper:
            "bg-[var(--language-selector-center-line-bg)] text-[var(--foreground)] font-semibold",
          ...classNames,
        }}
        {...props}
      />
    </div>
  );
}

export default WheelPicker;
