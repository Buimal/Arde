"use client";
import React, { useRef, useMemo } from "react";
import { useApp } from "@/context/app-context";
import useIsRTL from "@/hooks/useIsRTL";
import { useIsMobile } from "@/hooks/use-mobile";
import SectionText from "@/components/SectionText";
import PagedTestimonials from "@/components/PagedTestimonials";

const IMAGE_BY_GENDER: Record<string, string> = {
  H: "/images/testimonials/Men.webp",
  M: "/images/testimonials/Women.webp",
};

function testimonialImage(gender: string) {
  return IMAGE_BY_GENDER[gender] ?? IMAGE_BY_GENDER.M;
}

export default function TestimonialsSection() {
  const { t } = useApp();
  const isMobile = useIsMobile();
  const isRTL = useIsRTL();

  const sectionRef = useRef<HTMLElement>(null);

  const testimonials = useMemo(() => {
    return [
      {
        id: "dark-testimonial-1",
        quote: t("testimonial_1_quote"),
        name: t("testimonial_1_name"),
        rating: t("testimonial_1_rating"),
        src: testimonialImage(t("testimonial_1_designation")),
      },
      {
        id: "dark-testimonial-2",
        quote: t("testimonial_2_quote"),
        name: t("testimonial_2_name"),
        rating: t("testimonial_2_rating"),
        src: testimonialImage(t("testimonial_2_designation")),
      },
      {
        id: "dark-testimonial-3",
        quote: t("testimonial_3_quote"),
        name: t("testimonial_3_name"),
        rating: t("testimonial_3_rating"),
        src: testimonialImage(t("testimonial_3_designation")),
      },
    ];
  }, [t]);

  return (
    <section
      ref={sectionRef}
      className={`relative overflow-hidden flex flex-col transition duration-300 ease-in-out ${
        isMobile ? "justify-start min-h-0 py-14" : "py-20"
      }`}
    >
      <SectionText
        title={t("testimonials_title")}
        description={t("testimonials_description")}
        isRTL={isRTL}
      />

      <div className="mt-[18px]">
        <PagedTestimonials
          testimonials={testimonials}
          cardsPerPage={2}
          colors={{
            name: "var(--foreground)",
            testimony: "var(--middle-foreground)",
            arrowBackground: "var(--foreground)",
            arrowHoverBackground: "var(--accent)",
            arrowForeground: "var(--background)",
            arrowForegroundHover: "var(--foreground)",
          }}
          nameFontSize="1.125rem"
          ratingFontSize="0.875rem"
          quoteFontSize="0.95rem"
          isRTL={isRTL}
        />
      </div>
    </section>
  );
}