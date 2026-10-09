"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import clsx from "clsx";
import { useApp, useTranslation } from "@/context/app-context";
import useIsRTL from "@/hooks/useIsRTL";
import { MobileDisableableMorphText } from "./MobileDisableableMorphText";
import { MobileDisableableMorphText as MobileDisableableMorphTextWithOptionalLineBreak } from "./MobileDisableableMorphTextWithOptionalLineBreak";
import ButtonSection from "./ButtonSection";
import HeroCollage from "./HeroCollage";
import useMobileButtonHeight from "@/hooks/useMobileButtonHeight";
import { asset } from "@/lib/assets";

interface MobileHeroSectionProps {
  onButtonClick?: (buttonKey: "schedule" | "explore") => void;
}

const TESTIMONIAL_IMAGE_BY_GENDER: Record<string, string> = {
  H: "/images/testimonials/Men.webp",
  M: "/images/testimonials/Women.webp",
};

function testimonialImage(gender: string) {
  return TESTIMONIAL_IMAGE_BY_GENDER[gender] ?? TESTIMONIAL_IMAGE_BY_GENDER.M;
}

export default function MobileHeroSection({ onButtonClick }: MobileHeroSectionProps) {
  const isRTL = useIsRTL();
  const sectionRef = useRef<HTMLElement>(null);
  const { lang } = useApp();
  const t = useTranslation();
  const mobileButtonHeight = useMobileButtonHeight();

  // --- Per-language font + padding config ---
  const fontConfig = useMemo(() => {
    if (lang === "he") {
      return { titleMin: 40, titleMax: 94, subMin: 15, subMax: 22, padMin: 12, padMax: 32 };
    }
    if (lang === "it") {
      return { titleMin: 44, titleMax: 88, subMin: 14.4, subMax: 22, padMin: 12, padMax: 60 };
    }
    // default (English and others)
    return { titleMin: 40, titleMax: 92, subMin: 14, subMax: 21.6, padMin: 12, padMax: 40 };
  }, [lang]);

  const [titleFontSize, setTitleFontSize] = useState(fontConfig.titleMin);
  const [subFontSize, setSubFontSize] = useState(fontConfig.subMin);
  const [sectionPadding, setSectionPadding] = useState(fontConfig.padMin);

  const swapWords = useMemo(() => t("hero_slider_words").split("|"), [t, lang]);
  const [currentWord, setCurrentWord] = useState(swapWords[0] || "");

  // Italian possessive adjective mapping
  const genderMappingIt: Record<string, string> = {
    bagliore: "il tuo",
    eleganza: "la tua",
    bellezza: "la tua",
    fiducia: "la tua",
    stile: "il tuo",
    fascino: "il tuo",
  };
  const [currentAdj, setCurrentAdj] = useState("");

  // Cycle words with timing
  useEffect(() => {
    if (!swapWords.length) return;
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % swapWords.length;
      setCurrentWord(swapWords[index]);
    }, 4400);
    return () => clearInterval(interval);
  }, [swapWords]);

  // Responsive scaling
  useEffect(() => {
    if (!sectionRef.current) return;
    const updateSizes = () => {
      if (!sectionRef.current) return;
      const w = sectionRef.current.offsetWidth;
      const minW = 120;
      const maxW = 1226;
      const clamped = Math.min(Math.max(w, minW), maxW);
      const ratio = (clamped - minW) / (maxW - minW);
      setTitleFontSize(fontConfig.titleMin + ratio * (fontConfig.titleMax - fontConfig.titleMin));
      setSubFontSize(fontConfig.subMin + ratio * (fontConfig.subMax - fontConfig.subMin));
      setSectionPadding(fontConfig.padMin + ratio * (fontConfig.padMax - fontConfig.padMin));
    };
    updateSizes();
    const resizeObs = new ResizeObserver(updateSizes);
    if (sectionRef.current) resizeObs.observe(sectionRef.current);
    return () => resizeObs.disconnect();
  }, [fontConfig]);

  // Update possessive adjective when word or language changes
  useEffect(() => {
    if (lang === "it" && swapWords.length > 0) {
      const currentIndex = swapWords.indexOf(currentWord);
      const idx = currentIndex !== -1 ? currentIndex : 0;
      setCurrentAdj(genderMappingIt[swapWords[idx]] || "");
    } else {
      setCurrentAdj("");
    }
  }, [currentWord, lang, swapWords]);

  // Set initial adjective on mount / language change
  useEffect(() => {
    if (lang === "it" && swapWords.length > 0) {
      setCurrentAdj(genderMappingIt[swapWords[0]] || "");
      setCurrentWord(swapWords[0]);
    } else {
      setCurrentAdj("");
    }
  }, [lang, swapWords]);

  return (
    <section
      ref={sectionRef}
      className={clsx(
        "relative w-full flex flex-col items-center justify-center text-center",
        isRTL ? "rtl" : "ltr"
      )}
      style={{ height: "auto", paddingTop: sectionPadding }}
      dir={isRTL ? "rtl" : "ltr"}
    >
      <h1
        className="font-bold tracking-tight text-[var(--foreground)] leading-tight w-full flex flex-col items-center justify-center"
        style={{ fontSize: `${titleFontSize}px` }}
      >
        {/* Logo + title in a 2-row grid */}
        <div className="grid grid-cols-[auto_1fr] gap-x-3 mb-2">
          <img
            src={asset("/LogoPrincipal.jpg")}
            alt="Logo Arde"
            className="row-span-2 w-[min(3.4em,22vw)] self-stretch object-cover rounded-lg"
          />
          {/* Prefix line (top-right cell) */}
          <span className="self-start whitespace-nowrap">
            {lang === "en" ? (
              <MobileDisableableMorphTextWithOptionalLineBreak
                texts={[t("hero_title_prefix")]}
                className="bg-[var(--background)]"
                disable
              />
            ) : (
              <MobileDisableableMorphText
                texts={[t("hero_title_prefix")]}
                className="bg-[var(--background)]"
                disable
              />
            )}
          </span>

          {/* Italian possessive adjective line */}
          {lang === "it" && currentAdj && (
            <div style={{ marginTop: "-20px", marginBottom: "-9px" }}>
              <MobileDisableableMorphText
                texts={[currentAdj]}
                className="bg-[var(--background)]"
                disable={false}
              />
            </div>
          )}

          {/* Morphing word line (bottom-right cell) */}
          <MobileDisableableMorphText
            texts={[currentWord]}
            className="px-3 py-1 bg-[var(--accent)] justify-self-start"
          />

          {/* Hebrew suffix */}
          {lang === "he" && (
            <MobileDisableableMorphText
              texts={[t("hero_title_suffix")]}
              className="bg-[var(--background)] mt-2"
              disable
            />
          )}
        </div>
      </h1>

      <p
        style={{ lineHeight: 1.75, fontSize: `${subFontSize}px` }}
        className="mt-5 text-[var(--sub-foreground)]"
      >
        {t("hero_subtext")}
      </p>

      <div className="w-full flex justify-center">
        <ButtonSection
          buttonsBelowOneAnother
          mobileButtonHeight={mobileButtonHeight}
          isRTL={isRTL}
          onButtonClick={onButtonClick}
        />
      </div>

      <div className="mt-16 w-full">
        <HeroCollage
          images={[
            {
              src: "/images/hero.webp",
              aspectRatio: 1600 / 1842,
              sizeFactor: 0.36,
              positionKind: "left-percent-relative-to-center",
              positionPercent: 50,
              zIndex: 20,
              mirrorForRTL: true,
              top: "0%",
              animDuration: "10s",
            },
            {
              src: "/images/about-us/1.webp",
              aspectRatio: 21 / 9,
              sizeFactor: 0.28,
              positionKind: "left-edge",
              zIndex: 21,
              bottom: "5%",
              animDuration: "3.89s",
            },
            {
              src: "/images/about-us/4.webp",
              aspectRatio: 1,
              sizeFactor: 0.22,
              positionKind: "right-edge",
              zIndex: 22,
              bottom: "10%",
              animDuration: "5.6s",
            },
            {
              src: "/images/about-us/2.webp",
              aspectRatio: 16 / 9,
              sizeFactor: 0.26,
              positionKind: "left-percent",
              positionPercent: 9.4,
              zIndex: 18,
              bottom: "30%",
              animDuration: "8.2s",
            },
            {
              src: "/images/about-us/3.webp",
              aspectRatio: 4 / 3,
              sizeFactor: 0.3,
              positionKind: "right-percent",
              positionPercent: 7.3,
              zIndex: 17,
              top: "10%",
              animDuration: "6.78s",
            },
          ]}
          reviews={[
            {
              name: t("testimonial_1_name"),
              rating: t("testimonial_1_rating"),
              pos: { top: "7%", left: "5%" },
              animDelay: "0s",
              animDuration: "2.76s",
              image: testimonialImage(t("testimonial_1_designation")),
            },
            {
              name: t("testimonial_2_name"),
              rating: t("testimonial_2_rating"),
              pos: { top: "32%", right: "8%" },
              animDelay: "-1.4s",
              animDuration: "5.4s",
              image: testimonialImage(t("testimonial_2_designation")),
              mirrorForRTL: true,
            },
            {
              name: t("testimonial_3_name"),
              rating: t("testimonial_3_rating"),
              pos: { bottom: "12%", left: "20%" },
              animDelay: "-2.7s",
              animDuration: "7s",
              image: testimonialImage(t("testimonial_3_designation")),
            },
          ]}
        />
      </div>
    </section>
  );
}
