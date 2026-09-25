"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";
import useIsRTL from "@/hooks/useIsRTL";
import ScrollIndicator from "./ScrollIndicator";
import TextSwap from "@/components/TextSwap";
import { MorphingText } from "@/components/MorphingText";
import { DisableableMorphText } from "./DisableableMorphText";
import ButtonSection from "./ButtonSection";
import { useApp, useTranslation } from "@/context/app-context";
import { asset } from "@/lib/assets";

interface HeroSectionProps {
  scrollContainerRef: React.RefObject<HTMLDivElement>;
  onButtonClick?: (buttonKey: "schedule" | "explore") => void;
}

interface ReviewPos {
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
}

interface Review {
  name: string;
  rating: string;
  pos: ReviewPos;
  anim: string;
  image: string;
  mirror?: boolean;
}

const HEBREW_SWAP_THRESHOLD = 1336;

export default function HeroSection({ scrollContainerRef, onButtonClick }: HeroSectionProps) {
  const isRTL = useIsRTL();
  const imageRef = useRef<HTMLImageElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [imageRect, setImageRect] = useState<DOMRect | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const [isHeroVisible, setIsHeroVisible] = useState(false);
  const [titleFontSize, setTitleFontSize] = useState("56px");
  const [subFontSize, setSubFontSize] = useState("18px");
  const { lang } = useApp();
  const t = useTranslation();

  // Font config
  const fontConfig = useMemo(() => {
    if (lang === "he") return { titleMin: 44, titleMax: 60, subMin: 16, subMax: 20.6 };
    if (lang === "it") return { titleMin: 56, titleMax: 67, subMin: 16.4, subMax: 19.6 };
    return { titleMin: 56, titleMax: 67, subMin: 16.4, subMax: 19 };
  }, [lang]);

  // Font size calculation based on section width
  useEffect(() => {
    function updateFontSizes() {
      if (!sectionRef.current) return;
      const w = sectionRef.current.offsetWidth;
      const minW = 1232;
      const maxW = 1400;
      const clamped = Math.min(Math.max(w, minW), maxW);
      const ratio = (clamped - minW) / (maxW - minW);
      const curTitle = fontConfig.titleMin + ratio * (fontConfig.titleMax - fontConfig.titleMin);
      const curSub = fontConfig.subMin + ratio * (fontConfig.subMax - fontConfig.subMin);
      setTitleFontSize(`${curTitle}px`);
      setSubFontSize(`${curSub}px`);
    }
    updateFontSizes();
    if (!sectionRef.current) return;
    const resizeObserver = new ResizeObserver(updateFontSizes);
    resizeObserver.observe(sectionRef.current);
    return () => resizeObserver.disconnect();
  }, [fontConfig]);

  // Scroll detection
  useEffect(() => {
    const scroller = scrollContainerRef.current;
    if (!scroller) return;
    const onScroll = () => {
      setScrollY(scroller.scrollTop);
      if (sectionRef.current) {
        const scrollerRect = scroller.getBoundingClientRect();
        const secRect = sectionRef.current.getBoundingClientRect();
        setIsHeroVisible(secRect.bottom > scrollerRect.top && secRect.top < scrollerRect.bottom);
      }
    };
    scroller.addEventListener("scroll", onScroll);
    onScroll();
    return () => scroller.removeEventListener("scroll", onScroll);
  }, [scrollContainerRef]);

  // Image rect update
  useEffect(() => {
    const updateRect = () => {
      if (imageRef.current && sectionRef.current) {
        const rect = imageRef.current.getBoundingClientRect();
        const relativeTop = imageRef.current.offsetTop;
        setImageRect(new DOMRect(rect.x, relativeTop, rect.width, rect.height));
      }
    };

    // Run immediately at init
    updateRect();

    const timeout = setTimeout(updateRect, 2240);

    // Run on window resize
    window.addEventListener("resize", updateRect);

    // Also re-run when the hero image itself finishes loading
    if (imageRef.current) {
      imageRef.current.onload = updateRect;
    }

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("resize", updateRect);
    };
  }, []);

  // Reviews localized
  const baseReviewsLTR: Review[] = [
    { name: t("testimonial_1_name"), rating: t("testimonial_1_rating"), pos: { top: "15%", left: "-90px" }, anim: "float-left 6s ease-in-out infinite", image: "/images/testimonials/naomi-bright.webp" },
    { name: t("testimonial_2_name"), rating: t("testimonial_2_rating"), pos: { top: "45%", right: "-100px" }, anim: "float-right 8s ease-in-out infinite", image: "/images/testimonials/talia-lewin.webp" },
    { name: t("testimonial_3_name"), rating: t("testimonial_3_rating"), pos: { bottom: "15%", left: "-95px" }, anim: "float-slow 10s ease-in-out infinite", image: "/images/testimonials/hannah-miller.webp" },
  ];

  const baseReviewsRTL: Review[] = [
    { name: t("testimonial_1_name"), rating: t("testimonial_1_rating"), pos: { top: "15%", right: "-90px" }, anim: "float-right 6s ease-in-out infinite", image: "/images/testimonials/naomi-bright.webp" },
    { name: t("testimonial_2_name"), rating: t("testimonial_2_rating"), pos: { top: "45%", left: "-100px" }, anim: "float-left 8s ease-in-out infinite", image: "/images/testimonials/talia-lewin.webp", mirror: true },
    { name: t("testimonial_3_name"), rating: t("testimonial_3_rating"), pos: { bottom: "15%", right: "-95px" }, anim: "float-slow 10s ease-in-out infinite", image: "/images/testimonials/hannah-miller.webp" },
  ];

  let reviews = isRTL ? baseReviewsRTL : baseReviewsLTR;

  // Remove float-left for Hebrew if window width < 1600
  if (lang === "he" && window.innerWidth < 1600) {
    reviews = reviews.filter((r) => !r.anim.includes("float-left"));
  }
  // Remove float-right for English, Italian and Spanish if width < 1600
  if (lang !== "he" && window.innerWidth < 1600) {
    reviews = reviews.filter((r) => !r.anim.includes("float-right"));
  }

  const variants = {
    visible: { opacity: 1, filter: "blur(0px)", transition: { delay: 2.4, duration: 2.5, ease: "easeOut" } },
    hidden: { opacity: 0, filter: "blur(4px)", transition: { duration: 0.01, ease: "easeIn" } },
  };

  const swapWords = useMemo(() => t("hero_slider_words").split("|"), [t, lang]);

  const genderMappingIt: Record<string, string> = {
    bagliore: "il tuo",
    eleganza: "la tua",
    bellezza: "la tua",
    fiducia: "la tua",
    stile: "il tuo",
    fascino: "il tuo",
  };

  const [currentAdj, setCurrentAdj] = useState("");
  const delayTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (swapWords.length > 0) {
      const firstAdj = lang === "it" ? genderMappingIt[swapWords[0]] || "" : "";
      setCurrentAdj(firstAdj);
    }
  }, [lang, swapWords]);

  const onSwapNext = (index: number) => {
    const newWord = swapWords[index] || swapWords[0];
    const newAdj = lang === "it" ? genderMappingIt[newWord] || "" : "";

    if (newAdj !== currentAdj) {
      if (delayTimeoutRef.current) clearTimeout(delayTimeoutRef.current);
      delayTimeoutRef.current = window.setTimeout(() => {
        setCurrentAdj(newAdj);
      }, 312);
    }
  };

  // Decide to show normal Hebrew version (TextSwap) or morphing Hebrew version
  const sectionWidth = sectionRef.current?.offsetWidth || 0;
  const isHebrewMorphingVersion = lang === "he" && sectionWidth < HEBREW_SWAP_THRESHOLD;

  // To simulate TextSwap callback for MorphingText in Hebrew below threshold,
  // cycle through swapWords every 7s (same as rotationInterval ~2200ms *3)
  const [morphIndex, setMorphIndex] = useState(0);
  useEffect(() => {
    if (!isHebrewMorphingVersion) return;
    const interval = setInterval(() => {
      setMorphIndex((idx) => (idx + 1) % swapWords.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [isHebrewMorphingVersion, swapWords.length]);

  const handleButtonClick = (buttonKey: "schedule" | "explore") => {
    if (onButtonClick) {
      onButtonClick(buttonKey);
    }
  };

  return (
    <>
      <style>{`
        @keyframes float-left {0%,100%{transform:translateX(0)}50%{transform:translateX(-25px)}}
        @keyframes float-right {0%,100%{transform:translateX(0)}50%{transform:translateX(25px)}}
        @keyframes float-slow {0%,100%{transform:translateX(0)}50%{transform:translateX(15px)}}
      `}</style>
      <section
        ref={sectionRef}
        className="relative w-full translateY(-23px) overflow-hidden flex flex-row items-center"
        style={{ height: "calc(100vh - 60px)" }}
      >
        <div
          className="flex w-full relative flex-row gap-12"
          style={{ height: "100%", transform: "translateY(-20px)" }}
        >
          <div
            className="flex-1 flex flex-col justify-center"
            dir={isRTL ? "rtl" : "ltr"}
          >
            <h1 className="font-bold tracking-tight text-[var(--foreground)] leading-tight" style={{ fontSize: titleFontSize }}>
              {lang === "he" && !isHebrewMorphingVersion ? (
                <>
                  <TextSwap
                    texts={[t("hero_title_prefix")]}
                    mainClassName="ps-0 pe-[6px] pt-[4px] bg-[var(--background)] text-[var(--foreground)] overflow-hidden justify-center rounded-lg"
                    staggerFrom="first"
                    initial={{ y: "-100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "120%" }}
                    staggerDuration={0.05}
                    splitLevelClassName="overflow-hidden translate-y-[-8px] inline-flex items-center justify-center"
                    transition={{ type: "spring", damping: 20, stiffness: 200 }}
                    rotationInterval={2200}
                    style={{ color: "#111", fontWeight: 700, fontSize: titleFontSize }}
                    disableRotation
                  />
                  <TextSwap
                    texts={swapWords}
                    mainClassName="px-2 pt-[4px] bg-[var(--accent)] text-[var(--foreground)] overflow-hidden justify-center rounded-lg"
                    staggerFrom="first"
                    initial={{ y: "-100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "120%" }}
                    staggerDuration={0.05}
                    splitLevelClassName="overflow-hidden translate-y-[-8px] inline-flex items-center justify-center"
                    transition={{ type: "spring", damping: 20, stiffness: 200 }}
                    rotationInterval={2200}
                    style={{ color: "#111", fontWeight: 700, fontSize: titleFontSize }}
                    onNext={onSwapNext}
                  />
                  <TextSwap
                    texts={[t("hero_title_suffix")]}
                    mainClassName="ps-[6px] pe-0 pt-[4px] bg-[var(--background)] text-[var(--foreground)] overflow-hidden justify-center rounded-lg"
                    staggerFrom="first"
                    initial={{ y: "-100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "120%" }}
                    staggerDuration={0.05}
                    splitLevelClassName="overflow-hidden translate-y-[-8px] inline-flex items-center justify-center"
                    transition={{ type: "spring", damping: 20, stiffness: 200 }}
                    rotationInterval={2200}
                    style={{ color: "#111", fontWeight: 700, fontSize: titleFontSize }}
                    disableRotation
                  />
                </>
              ) : lang === "he" && isHebrewMorphingVersion ? (
                <>
                  <div style={{ transform: 'translateY(4px)' }} className="inline-flex items-center gap-1">
                    <DisableableMorphText
                      texts={[t("hero_title_prefix")]}
                      className="ps-0 pe-[5px] py-2 bg-[var(--background)] rounded-lg overflow-hidden font-bold text-[var(--foreground)] inline-block"
                      disable
                    />
                    <DisableableMorphText
                      texts={[swapWords[morphIndex]]}
                      className="px-[10px] py-2 bg-[var(--accent)] rounded-lg overflow-hidden font-bold text-[var(--foreground)] inline-block"
                    />
                    <DisableableMorphText
                      texts={[t("hero_title_suffix")]}
                      className="ps-[5px] pe-0 py-2 bg-[var(--background)] rounded-lg overflow-hidden font-bold text-[var(--foreground)] inline-block"
                      disable
                    />
                  </div>
                </>
              ) : lang === "en" ? (
                <>
                  {t("hero_title_prefix")}
                  <br />
                  <TextSwap
                    texts={swapWords}
                    mainClassName="px-3 py-1 bg-[var(--accent)] overflow-hidden justify-center rounded-lg"
                    staggerFrom="last"
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "-120%" }}
                    staggerDuration={0.025}
                    splitLevelClassName="overflow-hidden inline-flex items-center justify-center"
                    transition={{ type: "spring", damping: 30, stiffness: 400 }}
                    rotationInterval={2000}
                    style={{ color: "#fff", fontWeight: 700, fontSize: titleFontSize }}
                    onNext={onSwapNext}
                  />
                </>
              ) : (
                <>
                  <div className="grid grid-cols-[auto_1fr] gap-x-5">
                    <img
                      src={asset("/LogoPrincipal.jpg")}
                      alt="Logo Arde"
                      className="row-span-2 w-[min(3.6em,26vw)] self-stretch object-cover rounded-xl"
                    />
                    <span className="self-start whitespace-nowrap">
                      {t("hero_title_prefix")}{" "}
                    </span>
                    <div className="self-start justify-self-start">
                      <TextSwap
                        texts={swapWords}
                        mainClassName="px-3 py-1 bg-[var(--accent)] overflow-hidden justify-start rounded-lg inline-flex items-center whitespace-nowrap"
                        staggerFrom="last"
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "-120%" }}
                        staggerDuration={0.025}
                        splitLevelClassName="overflow-hidden inline-flex items-center justify-center"
                        transition={{ type: "spring", damping: 30, stiffness: 400 }}
                        rotationInterval={2200}
                        style={{ color: "#fff", fontWeight: 700, fontSize: titleFontSize }}
                        onNext={onSwapNext}
                      />
                    </div>
                  </div>
                </>
              )}
            </h1>
            <p style={{ lineHeight: 1.75, fontSize: subFontSize }} className="mt-5 text-[var(--sub-foreground)]">
              {t("hero_subtext")}
            </p>
            <ButtonSection isRTL={isRTL} onButtonClick={handleButtonClick} />
          </div>
          <div
            className="flex-1 flex items-center justify-center relative"
          >
            <img
              ref={imageRef}
              src={asset("/images/hero.webp")}
              alt="Hero"
              className={clsx("w-full h-auto object-contain rounded-xl", isRTL && "scale-x-[-1]")}
            />
          </div>
        </div>
        <div className="absolute left-1/2 -translate-x-1/2 bottom-4" style={{ transition: "opacity 2s ease-in-out", pointerEvents: "none" }}>
          <ScrollIndicator scrollContainerRef={scrollContainerRef} />
        </div>
      </section>
      {imageRect && sectionRef.current && (
        <AnimatePresence>
          {isHeroVisible && (
            <motion.div
              key="reviews"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={variants}
              className="pointer-events-none absolute z-50"
              style={{
                top: `${sectionRef.current.offsetTop + imageRect.y - 20 - scrollY}px`,
                left: `${imageRect.x}px`,
                width: `${imageRect.width}px`,
                height: `${imageRect.height}px`,
              }}
            >
              {reviews.map((r, i) => (
                <div key={i}
                  className="absolute flex items-center gap-3 bg-[#111] border border-[#242424] rounded-xl px-4 py-3 text-white shadow-lg text-base"
                  style={{ ...r.pos, animation: r.anim }}
                >
                  <div className="w-12 aspect-[3/4] overflow-hidden rounded-md flex-shrink-0">
                    <img
                      src={asset(r.image)}
                      alt="Reviewer"
                      className={clsx(
                        "w-full h-full object-cover rounded-md",
                        r.mirror && "scale-x-[-1]"
                      )}
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold">{r.name}</span>
                    <span
                      className="text-sm font-bold text-yellow-400 mt-1 flex items-center gap-1.5"
                    >
                      {r.rating}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="icon icon-tabler icons-tabler-filled icon-tabler-star"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M8.243 7.34l-6.38 .925l-.113 .023a1 1 0 0 0 -.44 1.684l4.622 4.499l-1.09 6.355l-.013 .11a1 1 0 0 0 1.464 .944l5.706 -3l5.693 3l.1 .046a1 1 0 0 0 1.352 -1.1l-1.091 -6.355l4.624 -4.5l.078 -.085a1 1 0 0 0 -.633 -1.62l-6.38 -.926l-2.852 -5.78a1 1 0 0 0 -1.794 0l-2.853 5.78z" />
                      </svg>
                    </span>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </>
  );
}
