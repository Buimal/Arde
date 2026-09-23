"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { useApp } from "@/context/app-context";
import useIsRTL from "@/hooks/useIsRTL";
import { useIsMobile } from "@/hooks/use-mobile";
import SectionText from "@/components/SectionText";
import PagedTestimonials from "@/components/PagedTestimonials";

function useMirroredImage(src: string, mirror: boolean) {
  const [mirroredSrc, setMirroredSrc] = useState<string>(src);
  useEffect(() => {
    if (!mirror) {
      setMirroredSrc(src);
      return;
    }
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = image.width;
      canvas.height = image.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        setMirroredSrc(src);
        return;
      }
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(image, 0, 0);
      setMirroredSrc(canvas.toDataURL());
    };
    image.onerror = () => setMirroredSrc(src);
    image.src = src;
  }, [src, mirror]);
  return mirroredSrc;
}

export default function MobileTestimonialsSection() {
  const { t } = useApp();
  const isMobile = useIsMobile();
  const isRTL = useIsRTL();

  const measureRef = useRef<HTMLDivElement>(null);

  const taliaMirroredImage = useMirroredImage(
    "/images/testimonials/talia-lewin.webp",
    isRTL
  );

  const testimonials = useMemo(
    () => [
      {
        id: "t1",
        quote: t("testimonial_1_quote"),
        name: t("testimonial_1_name"),
        designation: t("testimonial_1_designation"),
        rating: t("testimonial_1_rating"),
        src: "/images/testimonials/naomi-bright.webp",
      },
      {
        id: "t2",
        quote: t("testimonial_2_quote"),
        name: t("testimonial_2_name"),
        designation: t("testimonial_2_designation"),
        rating: t("testimonial_2_rating"),
        src: isRTL ? taliaMirroredImage : "/images/testimonials/talia-lewin.webp",
        mirrorImage: isRTL,
      },
      {
        id: "t3",
        quote: t("testimonial_3_quote"),
        name: t("testimonial_3_name"),
        designation: t("testimonial_3_designation"),
        rating: t("testimonial_3_rating"),
        src: "/images/testimonials/hannah-miller.webp",
      },
    ],
    [t, isRTL, taliaMirroredImage]
  );

  return (
    <section
      ref={measureRef}
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
          cardsPerPage={1}
          colors={{
            name: "var(--foreground)",
            designation: "var(--sub-foreground)",
            testimony: "var(--middle-foreground)",
            arrowBackground: "var(--foreground)",
            arrowHoverBackground: "var(--accent)",
            arrowForeground: "var(--background)",
            arrowForegroundHover: "var(--foreground)",
          }}
          imageSize="64px"
          nameFontSize="1.125rem"
          designationFontSize="0.875rem"
          ratingFontSize="0.875rem"
          quoteFontSize="0.95rem"
          isRTL={isRTL}
        />
      </div>
    </section>
  );
}