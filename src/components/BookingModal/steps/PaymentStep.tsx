"use client";

import React, { useState } from "react";
import FloatingLabelInput from "@/components/FloatingLabelInput";
import { useTranslation } from "@/context/app-context";

const PaymentStep: React.FC<{
  isMobile?: boolean;
  isRTL?: boolean;
}> = ({
  isMobile,
  isRTL,
}) => {
  const t = useTranslation();

  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [cardholder, setCardholder] = useState("");

  const formatCardNumber = (value: string) => {
    return (
      value
        .replace(/\D/g, "")
        .match(/.{1,4}/g)
        ?.join(" ") || ""
    );
  };

  const handleCardNumberChange = (v: string) => {
    const formatted = formatCardNumber(v);
    setCardNumber(formatted);
  };

  const handleExpiryChange = (value: string) => {
    // Remove invalid characters: allow only digits and slash
    let sanitized = value.replace(/[^0-9/]/g, "");

    // If already more than 5 characters, trim
    if (sanitized.length > 5) {
      sanitized = sanitized.slice(0, 5);
    }

    // Special handling when input length is exactly 3
    if (sanitized.length === 3) {
      const lastChar = sanitized.charAt(2);
      const firstTwo = sanitized.slice(0, 2);

      if (/[0-9]/.test(lastChar)) {
        // If 3rd char is digit: insert slash as 3rd char and move digit to 4th
        sanitized = firstTwo + "/" + lastChar;
      } else {
        // If 3rd char is not a digit: replace it with slash
        sanitized = firstTwo + "/";
      }
    }

    setExpiry(sanitized);
  };

  const handleCvcChange = (v: string) => {
    const digits = v.replace(/\D/g, "");
    setCvc(digits.slice(0, 3));
  };

  const inputFontSize = isMobile ? "0.9rem" : "1rem";
  const labelFontSize = isMobile ? "0.9rem" : "1rem";
  const labelActiveFontSize = "12px";
  const inputHeight = isMobile ? "47px" : "49px";
  const inputPadding = isMobile ? "11px 13px" : "12px 15px";
  const containerGap = "2px";

  return (
    <div
      className="flex flex-col p-6"
      style={{
        color: "var(--foreground)",
        backgroundColor: "var(--background)",
        gap: containerGap,
      }}
    >
      <h2
        className="text-center font-semibold pb-[22px]"
        style={{
          fontSize: isMobile ? 19 : 20,
          color: "var(--foreground)",
          marginBottom: 0,
        }}
      >
        {t("payment_tab_title") || "Payment Details"}
      </h2>

      <FloatingLabelInput
        label={t("card_number") || "Card Number"}
        value={cardNumber}
        onValueChange={handleCardNumberChange}
        type="text"
        autoComplete="cc-number"
        required
        inputFontSize={inputFontSize}
        labelFontSize={labelFontSize}
        labelActiveFontSize={labelActiveFontSize}
        inputHeight={inputHeight}
        inputPadding={inputPadding}
        parentBackground = "var(--background)"
        accentColor="var(--middle-foreground)"
        inputOutlineColor = "var(--inactive-floating-label-input-outline-color)"
        inputFocusOutlineColor = "var(--accent)"
        mutedForegroundColor = "var(--floating-label-input-muted-foreground)"
        isRTL={isRTL}
      />

      <FloatingLabelInput
        label={t("cardholder_name") || "Cardholder Name"}
        value={cardholder}
        onValueChange={setCardholder}
        type="text"
        autoComplete="cc-name"
        required
        inputFontSize={inputFontSize}
        labelFontSize={labelFontSize}
        labelActiveFontSize={labelActiveFontSize}
        inputHeight={inputHeight}
        inputPadding={inputPadding}
        parentBackground = "var(--background)"
        accentColor="var(--middle-foreground)"
        inputOutlineColor = "var(--inactive-floating-label-input-outline-color)"
        inputFocusOutlineColor = "var(--accent)"
        mutedForegroundColor = "var(--floating-label-input-muted-foreground)"
        isRTL={isRTL}
      />

      <div className="flex gap-6">
        <div className="flex-1">
          <FloatingLabelInput
            label={t("valid_thru") || "Valid Thru"}
            value={expiry}
            onValueChange={handleExpiryChange}
            type="text"
            autoComplete="cc-exp"
            required
            inputFontSize={inputFontSize}
            labelFontSize={labelFontSize}
            labelActiveFontSize={labelActiveFontSize}
            inputHeight={inputHeight}
            inputPadding={inputPadding}
            parentBackground = "var(--background)"
            accentColor="var(--middle-foreground)"
            inputOutlineColor = "var(--inactive-floating-label-input-outline-color)"
            inputFocusOutlineColor = "var(--accent)"
            mutedForegroundColor = "var(--floating-label-input-muted-foreground)"
            isRTL={isRTL}
          />
        </div>
        <div className="flex-1">
          <FloatingLabelInput
            label={t("cvc") || "CVC"}
            value={cvc}
            onValueChange={handleCvcChange}
            type="text"
            autoComplete="off"
            required
            inputFontSize={inputFontSize}
            labelFontSize={labelFontSize}
            labelActiveFontSize={labelActiveFontSize}
            inputHeight={inputHeight}
            inputPadding={inputPadding}
            parentBackground = "var(--background)"
            accentColor="var(--middle-foreground)"
            inputOutlineColor = "var(--inactive-floating-label-input-outline-color)"
            inputFocusOutlineColor = "var(--accent)"
            mutedForegroundColor = "var(--floating-label-input-muted-foreground)"
            isRTL={isRTL}
          />
        </div>
      </div>
    </div>
  );
};

export default PaymentStep;
