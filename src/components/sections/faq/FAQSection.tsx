"use client";
import React, { useRef } from "react";
import LimitedWidthWrapper from "@/components/limited-width-wrapper";
import SectionText from "@/components/SectionText";
import UnfoldingFAQ from "@/components/UnfoldingFAQ";
import { useApp } from "@/context/app-context";
import { useIsMobile } from "@/hooks/use-mobile";
import useIsRTL from "@/hooks/useIsRTL";

const FAQS = [
  { question: "faq_q1", answer: "faq_a1" },
  { question: "faq_q2", answer: "faq_a2" },
  { question: "faq_q3", answer: "faq_a3" },
  { question: "faq_q4", answer: "faq_a4" },
];

interface FAQSectionProps {
  maxWidth: string;
  paddingDesktop: string;
  paddingMobile: string;
}

export default function FAQSection({
  maxWidth,
  paddingDesktop,
  paddingMobile,
}: FAQSectionProps) {
  const { t } = useApp();
  const isMobile = useIsMobile();
  const isRTL = useIsRTL();
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={sectionRef}
      className={`relative overflow-hidden flex flex-col transition duration-300 ease-in-out ${
        isMobile ? "justify-start min-h-0 py-14" : "py-20"
      }`}
    >
      <LimitedWidthWrapper
        expandToFull={false}
        maxWidth={maxWidth}
        paddingDesktop={paddingDesktop}
        paddingMobile={paddingMobile}
      >
        <SectionText
          title={t("faq_title")}
          description={t("faq_description")}
          isRTL={isRTL}
        />

        <div
          className="mt-10"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <UnfoldingFAQ
            faqs={FAQS.map((faq) => ({
              question: t(faq.question),
              answer: t(faq.answer),
            }))}
            questionFontSize={isMobile ? "1.05rem" : "1.1rem"}
            answerFontSize={isMobile ? "0.85rem" : "0.92rem"}
            isRTL={isRTL}
            isMobile={isMobile}
          />
        </div>
      </LimitedWidthWrapper>
    </section>
  );
}
