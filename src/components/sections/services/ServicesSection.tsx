"use client";

import React, { useState, useEffect, useRef } from "react";
import { gsap, Power2, Power3 } from "gsap";
import { useApp } from "@/context/app-context";
import { getLocalizedData, Service } from "@/lib/data";
import { useIsMobile } from "@/hooks/use-mobile";
import useIsRTL from "@/hooks/useIsRTL";
import SectionText from "@/components/SectionText";
import LimitedWidthWrapper from "@/components/limited-width-wrapper";
import RefinedChronicleButton from "@/components/RefinedChronicleButton";
import useMobileButtonHeight from "@/hooks/useMobileButtonHeight";
import "animate.css/animate.min.css";

interface ServicesSectionProps {
  id: string;
  onServiceClick: (serviceId: string) => void;
  maxWidth: string;
  paddingDesktop: string;
  paddingMobile: string;
  darkenBackground?: boolean;
  onShowLessButtonClick?: () => void;
}

function linearInterpolate(
  x: number,
  x0: number,
  y0: number,
  x1: number,
  y1: number
): number {
  if (x <= x0) return y0;
  if (x >= x1) return y1;
  return y0 + ((y1 - y0) * (x - x0)) / (x1 - x0);
}

function getImageHeight(windowHeight: number): number {
  let multiplier = 0.675;

  if (windowHeight >= 924 && windowHeight <= 1047) {
    multiplier = 0.715;
  } else if (windowHeight >= 1048) {
    multiplier = 0.74;
  }

  return Math.min(windowHeight * multiplier, 800);
}

export default function ServicesSection({
  id,
  onServiceClick,
  maxWidth,
  paddingDesktop,
  paddingMobile,
  onShowLessButtonClick,
}: ServicesSectionProps) {
  const { lang, t } = useApp();
  const isMobile = useIsMobile();
  const isRTL = useIsRTL();

  const [services, setServices] = useState<Service[]>([]);
  const [currencySymbol, setCurrencySymbol] = useState("$");
  const [activeService, setActiveService] = useState<Service | null>(null);
  const [desktopCount, setDesktopCount] = useState(4);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [imageHeight, setImageHeight] = useState(getImageHeight(window.innerHeight));

  const sectionRef = useRef<HTMLElement>(null);
  const sectionTextWrapperRef = useRef<HTMLDivElement>(null);
  const servicesBlockRef = useRef<HTMLDivElement>(null);
  const animatedBlockRef = useRef<HTMLDivElement>(null);
  const bgImageRef = useRef<HTMLDivElement>(null);
  const [servicesBlockMargin, setServicesBlockMargin] = useState(0);
  const mobileButtonHeight = useMobileButtonHeight();
  const [isServiceHovered, setIsServiceHovered] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [animating, setAnimating] = useState(false);

  const toggleShowAll = () => {
    if (animating) return;
    const el = animatedBlockRef.current;
    if (!el) return;

    const isHiding = showAll; // true if user is about to collapse (Show Less)

    if (isHiding && typeof onShowLessButtonClick === "function") {
      setTimeout(() => {
        onShowLessButtonClick();
      }, 700);
    }

    // Choose animations based on isHiding and RTL
    if (isHiding) {
      // Show Less clicked
      if (isRTL) {
        el.classList.add("animate__animated", "animate__fadeOutLeft");
      } else {
        el.classList.add("animate__animated", "animate__fadeOutRight");
      }
    } else {
      // Show More clicked, keep existing fadeOutUp
      el.classList.add("animate__animated", "animate__fadeOutUp");
    }

    setAnimating(true);

    const onFadeOutEnd = () => {
      if (isHiding) {
        // Remove fadeOutLeft or fadeOutRight
        if (isRTL) {
          el.classList.remove("animate__fadeOutLeft");
        } else {
          el.classList.remove("animate__fadeOutRight");
        }
      } else {
        el.classList.remove("animate__fadeOutUp");
      }

      // Toggle after fade-out completes
      setShowAll((v) => !v);

      void el.offsetWidth; // force reflow

      // Fade in with direction opposite to fade out for hiding
      if (isHiding) {
        if (isRTL) {
          el.classList.add("animate__fadeInRight");
        } else {
          el.classList.add("animate__fadeInLeft");
        }
      } else {
        // For show more keep existing fadeInDown
        el.classList.add("animate__fadeInDown");
      }

      const onFadeInEnd = () => {
        if (isHiding) {
          if (isRTL) {
            el.classList.remove("animate__animated", "animate__fadeInRight");
          } else {
            el.classList.remove("animate__animated", "animate__fadeInLeft");
          }
        } else {
          el.classList.remove("animate__animated", "animate__fadeInDown");
        }
        setAnimating(false);
        el.removeEventListener("animationend", onFadeInEnd);
      };

      el.addEventListener("animationend", onFadeInEnd);
      el.removeEventListener("animationend", onFadeOutEnd);
    };

    el.addEventListener("animationend", onFadeOutEnd);
  };

  function handleServiceMouseEnter() {
    setIsServiceHovered(true);
  }

  function handleServiceMouseLeave() {
    setIsServiceHovered(false);
  }

  useEffect(() => {
    getLocalizedData(lang).then(({ services, currencySymbol }) => {
      setServices(services);
      setCurrencySymbol(currencySymbol);
    });
  }, [lang]);

  useEffect(() => {
    function onResize() {
      setWindowHeight(window.innerHeight);
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    const updateCount = () => {
      const h = window.innerHeight;
      if (h >= 1048) setDesktopCount(6);
      else if (h >= 924) setDesktopCount(5);
      else setDesktopCount(4);
    };
    updateCount();
    window.addEventListener("resize", updateCount);
    return () => window.removeEventListener("resize", updateCount);
  }, [isMobile]);

  // Center services block vertically on desktop
  useEffect(() => {
    if (isMobile) return;
    const updateHeights = () => {
      if (!sectionRef.current || !sectionTextWrapperRef.current || !servicesBlockRef.current) return;
      const style = window.getComputedStyle(sectionRef.current);
      const padTop = parseFloat(style.paddingTop) || 0;
      const padBot = parseFloat(style.paddingBottom) || 0;
      const avail = sectionRef.current.offsetHeight - padTop - padBot - sectionTextWrapperRef.current.offsetHeight;
      const marginTop = avail > servicesBlockRef.current.offsetHeight ? (avail - servicesBlockRef.current.offsetHeight) / 2 : 0;
      setServicesBlockMargin(marginTop);
    };
    updateHeights();
    const resizeObserver = new ResizeObserver(updateHeights);
    if (sectionRef.current) resizeObserver.observe(sectionRef.current);
    if (sectionTextWrapperRef.current) resizeObserver.observe(sectionTextWrapperRef.current);
    if (servicesBlockRef.current) resizeObserver.observe(servicesBlockRef.current);
    window.addEventListener("resize", updateHeights);
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateHeights);
    };
  }, [isMobile]);

  // Animate background image scale and opacity inside section container
  useEffect(() => {
    if (!bgImageRef.current) return;
    const el = bgImageRef.current;

    gsap.killTweensOf(el);

    if (!activeService) {
      gsap.to(el, {
        scale: 1.32,
        opacity: 0,
        duration: 0.3,
        ease: Power2.easeIn,
      });
      return;
    }

    gsap.fromTo(
      el,
      { scale: 1.32, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, ease: Power3.easeOut }
    );
  }, [activeService]);

  function getLocalizedPrice(service: Service) {
    if (lang === "he" && (service as any)["price-he"] != null) return (service as any)["price-he"];
    if (lang === "it" && (service as any)["price-it"] != null) return (service as any)["price-it"];
    if ((service as any)["price-en"] != null) return (service as any)["price-en"];
  }
  function formatPrice(lang: string, symbol: string, price: number) {
    if (lang === "it") return `${price} ${symbol}`;
    return `${symbol}${price}`;
  }
  function getDurationUnit() {
    return t("duration_unit");
  }

  const featuredServices = services.filter((s) => s.featured);
  const visibleServices = isMobile
    ? featuredServices
    : showAll
    ? featuredServices
    : featuredServices.slice(0, desktopCount);

  function isSeparatorActive(idx: number) {
    if (!activeService) return false;
    const activeIndex = visibleServices.findIndex((s) => s.id === activeService.id);
    return idx === activeIndex || idx === activeIndex + 1;
  }

  function handleMouseEnter(service: Service) {
    setActiveService(service);
  }
  function handleMouseLeave() {
    setActiveService(null);
  }

  // Interpolate translateY offset for background image top:
  const translateYOffsetPx = (() => {
    if (windowHeight >= 800 && windowHeight <= 923) {
      return linearInterpolate(windowHeight, 800, 40, 923, 40);
    }
    if (windowHeight >= 924 && windowHeight <= 1047) {
      return linearInterpolate(windowHeight, 924, 40, 1047, 40);
    }
    if (windowHeight >= 1048 && windowHeight <= 1080) {
      return linearInterpolate(windowHeight, 1048, 40, 1080, 40);
    }
    return 0;
  })();

  // Update on window resize
  useEffect(() => {
    function handleResize() {
      const height = window.innerHeight;
      setWindowHeight(height);
      setImageHeight(getImageHeight(height));
    }

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Update on size changes of servicesBlockRef element
  useEffect(() => {
    if (!servicesBlockRef.current) return;

    const resizeObserver = new ResizeObserver(() => {
      // On services block resize, update image height based on current windowHeight state
      setImageHeight(getImageHeight(windowHeight));
    });

    resizeObserver.observe(servicesBlockRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, [windowHeight]);


return (
  <section
    ref={sectionRef}
    id={id}
    className={`relative overflow-hidden flex flex-col transition duration-300 ease-in-out ${isMobile ? "justify-start min-h-0 py-14" : "py-20"}`}
    style={(isMobile || showAll) ? undefined : { height: "min(calc(100vh - 2px), 1078px)" }}
  >
    {/* Background image container inside section */}
    {!isMobile && !showAll && (
      <div
        ref={bgImageRef}
        aria-hidden="true"
        className="background-image-container overflow-hidden pointer-events-none absolute z-0"
        style={{
          backgroundImage: activeService ? `url(${activeService.imageUrl})` : "none",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          borderRadius: 12,
          width: "auto",
          height: imageHeight,
          aspectRatio: "4 / 3",
          top: `calc(50% + ${translateYOffsetPx.toFixed(1)}px)`,
          left: "50%",
          transform: "translate(-50%, -50%) scale(1.32)",
          willChange: "transform, opacity",
          transition: "opacity 0.4s ease, transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          position: "absolute",
        }}
      />
    )}

    {/* Foreground content */}
    <div className="relative z-10 flex flex-col h-full items-center">
      <LimitedWidthWrapper
        expandToFull={false}
        maxWidth={maxWidth}
        paddingDesktop={paddingDesktop}
        paddingMobile={paddingMobile}
      >
        <div ref={sectionTextWrapperRef}>
          <SectionText title={t("services_title")} description={t("services_description")} isRTL={isRTL} />
        </div>
        <div
          ref={animatedBlockRef}
        >
          <div
            ref={servicesBlockRef}
            className="flex flex-col items-center justify-center w-full"
            style={{ paddingLeft: 0, paddingRight: 0, marginTop: (isMobile || showAll) ? undefined : servicesBlockMargin }}
          >
            <ul className="service-list list-none m-0 p-0 w-full max-w-full" role="list" style={{ borderTop: "none" }}>
              {Array(visibleServices.length + 1)
                .fill(null)
                .map((_, sepIdx) => (
                  <React.Fragment key={`separator-${sepIdx}`}>
                    <li
                      style={{
                        height: "1px",
                        backgroundColor: isSeparatorActive(sepIdx)
                          ? "var(--accent)"
                          : "var(--lightened-border-color)",
                        transition: "background-color 0.3s ease-in-out",
                        width: "100%",
                      }}
                    />
                    {sepIdx < visibleServices.length && (
                      <li key={visibleServices[sepIdx].id} style={{ width: "100%" }}>
                        <div
                          className="service-item group cursor-pointer w-full relative"
                          onClick={() => onServiceClick(visibleServices[sepIdx].id)}
                          onMouseEnter={() => {
                            handleMouseEnter(visibleServices[sepIdx]);
                            handleServiceMouseEnter();
                          }}
                          onMouseLeave={() => {
                            handleMouseLeave();
                            handleServiceMouseLeave();
                          }}
                          role="button"
                          tabIndex={0}
                          aria-label={`${visibleServices[sepIdx].name} ${formatPrice(
                            lang,
                            currencySymbol,
                            getLocalizedPrice(visibleServices[sepIdx])
                          )}, ${
                            visibleServices[sepIdx].volume
                              ? visibleServices[sepIdx].volume
                              : ""
                          }`}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") onServiceClick(visibleServices[sepIdx].id);
                          }}
                        >
                          <div className="relative w-full py-[18px] flex flex-col justify-center">
                            <div className="grid grid-cols-[1fr,auto] gap-x-6 items-center w-full">
                              {/* Name + Description */}
                              <div
                                className="overflow-hidden w-full relative flex flex-col"
                                style={{ paddingLeft: 0, paddingRight: 0 }}
                              >
                                {/* Name */}
                                <h3
                                  className="text-2xl sm:text-3xl font-headline relative inline-block"
                                  style={{
                                    textIndent: lang === "he" ? 0 : undefined,
                                    position: "relative",
                                    direction: lang === "he" ? "rtl" : "ltr",
                                    color: "var(--foreground)",
                                  }}
                                >
                                  <div
                                    className="outer-container"
                                    style={{
                                      maxWidth: "100%",
                                      overflowWrap: "break-word",
                                      position: "relative",
                                    }}
                                  >
                                    <div
                                      className="inner-container px-1.5"
                                      style={{
                                        display: "inline-block",
                                        whiteSpace: "normal",
                                        position: "relative",
                                        wordBreak: "break-word",
                                      }}
                                    >
                                      <span
                                        className="leading-[48px]"
                                        style={{ position: "relative", zIndex: 1, fontWeight: 500 }}
                                      >
                                        {visibleServices[sepIdx].name}
                                      </span>
                                      {activeService?.id === visibleServices[sepIdx].id && (
                                        <span
                                          aria-hidden="true"
                                          style={{
                                            position: "absolute",
                                            inset: 0,
                                            backgroundColor: "var(--accent)",
                                            color: "var(--background)",
                                            clipPath: "polygon(0 50%, 100% 50%, 100% 50%, 0 50%)",
                                            display: "flex",
                                            alignItems: "center",
                                            whiteSpace: "normal",
                                            transition:
                                              "clip-path 0.4s cubic-bezier(.1,.5,.5,1), color 0.4s",
                                            zIndex: 2,
                                            padding: 6,
                                            borderRadius: 8,
                                            fontWeight: 500,
                                          }}
                                          ref={(el) => {
                                            if (!el) return;
                                            gsap.killTweensOf(el);
                                            gsap.fromTo(
                                              el,
                                              { clipPath: "polygon(0 50%, 100% 50%, 100% 50%, 0 50%)", opacity: 0 },
                                              {
                                                clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                                                opacity: 1,
                                                duration: 0.35,
                                                ease: Power2.easeOut,
                                              }
                                            );
                                          }}
                                        >
                                          {visibleServices[sepIdx].name}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                </h3>

                                {/* Description */}
                                <p
                                  className="mt-1.5 relative"
                                  style={{
                                    textIndent: 0,
                                    position: "relative",
                                    direction: lang === "he" ? "rtl" : "ltr",
                                    color: "var(--sub-foreground)",
                                  }}
                                >
                                  <div
                                    className="outer-container"
                                    style={{ maxWidth: "100%", position: "relative" }}
                                  >
                                    <div
                                      className="inner-container px-1.5"
                                      style={{
                                        display: "inline-block",
                                        whiteSpace: "normal",
                                        position: "relative",
                                        wordBreak: "break-word",
                                      }}
                                    >
                                      <span
                                        className="leading-[30px]"
                                        style={{ position: "relative", zIndex: 1, fontWeight: 400 }}
                                      >
                                        {visibleServices[sepIdx].description}
                                      </span>
                                      {activeService?.id === visibleServices[sepIdx].id && (
                                        <span
                                          aria-hidden="true"
                                          style={{
                                            position: "absolute",
                                            inset: 0,
                                            backgroundColor: "var(--accent)",
                                            color: "var(--background)",
                                            clipPath: "polygon(0 50%, 100% 50%, 100% 50%, 0 50%)",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: lang === "he" ? "flex-end" : "flex-start",
                                            whiteSpace: "normal",
                                            transition:
                                              "clip-path 0.4s cubic-bezier(.1,.5,.5,1), color 0.4s",
                                            zIndex: 2,
                                            padding: 6,
                                            borderRadius: 8,
                                            fontWeight: 400,
                                          }}
                                          ref={(el) => {
                                            if (!el) return;
                                            gsap.killTweensOf(el);
                                            gsap.fromTo(
                                              el,
                                              { clipPath: "polygon(0 50%, 100% 50%, 100% 50%, 0 50%)", opacity: 0 },
                                              {
                                                clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                                                opacity: 1,
                                                duration: 0.35,
                                                delay: 0.1,
                                                ease: Power2.easeOut,
                                              }
                                            );
                                          }}
                                        >
                                          {visibleServices[sepIdx].description}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                </p>
                              </div>

                              {/* Price + Duration (unchanged) */}
                              <div className="text-right flex flex-col items-end min-w-[5rem] gap-1.5 relative">
                                <p
                                  className="text-xl leading-[28px] font-semibold whitespace-nowrap relative"
                                  style={{ color: "var(--accent)" }}
                                >
                                  <span
                                    className="px-1.5 leading-[24px]"
                                    aria-hidden="true"
                                    style={{ position: "relative", zIndex: 1, fontWeight: 600 }}
                                  >
                                    {formatPrice(lang, currencySymbol, getLocalizedPrice(visibleServices[sepIdx]))}
                                  </span>
                                  {activeService?.id === visibleServices[sepIdx].id && (
                                    <span
                                      aria-hidden="true"
                                      style={{
                                        position: "absolute",
                                        inset: 0,
                                        backgroundColor: "var(--accent)",
                                        color: "var(--background)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "flex-end",
                                        whiteSpace: "nowrap",
                                        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                                        transition: "clip-path 0.4s cubic-bezier(.1,.5,.5,1), color 0.4s",
                                        zIndex: 2,
                                        padding: 6,
                                        borderRadius: 8,
                                        fontWeight: 600,
                                      }}
                                      ref={(el) => {
                                        if (!el) return;
                                        gsap.killTweensOf(el);
                                        gsap.fromTo(
                                          el,
                                          { clipPath: "polygon(0 50%, 100% 50%, 100% 50%, 0 50%)", opacity: 0 },
                                          {
                                            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                                            opacity: 1,
                                            duration: 0.35,
                                            delay: 0.2,
                                            ease: Power2.easeOut,
                                          }
                                        );
                                      }}
                                    >
                                      {formatPrice(lang, currencySymbol, getLocalizedPrice(visibleServices[sepIdx]))}
                                    </span>
                                  )}
                                </p>
                                <p
                                    className="text-sm relative"
                                    style={{ color: "var(--sub-foreground)" }}
                                  >
                                    <span
                                      className="px-1.5 leading-[24px]"
                                      aria-hidden="true"
                                      style={{ position: "relative", zIndex: 1, fontWeight: 600 }}
                                    >
                                      {visibleServices[sepIdx].volume
                                        ? visibleServices[sepIdx].volume
                                        : ""}
                                    </span>
                                    {activeService?.id === visibleServices[sepIdx].id && (
                                      <span
                                        aria-hidden="true"
                                        style={{
                                          position: "absolute",
                                          inset: 0,
                                          backgroundColor: "var(--accent)",
                                          color: "var(--background)",
                                          display: "flex",
                                          alignItems: "center",
                                          justifyContent: "flex-end",
                                          whiteSpace: "nowrap",
                                          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                                          transition: "clip-path 0.4s cubic-bezier(.1,.5,.5,1), color 0.4s",
                                          zIndex: 2,
                                          padding: 6,
                                          borderRadius: 8,
                                          fontWeight: 600,
                                        }}
                                        ref={(el) => {
                                          if (!el) return;
                                          gsap.killTweensOf(el);
                                          gsap.fromTo(
                                            el,
                                            { clipPath: "polygon(0 50%, 100% 50%, 100% 50%, 0 50%)", opacity: 0 },
                                            {
                                              clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                                              opacity: 1,
                                              duration: 0.35,
                                              delay: 0.3,
                                              ease: Power2.easeOut,
                                            }
                                          );
                                        }}
                                      >
                                        {visibleServices[sepIdx].volume
                                          ? visibleServices[sepIdx].volume
                                          : ""}
                                      </span>
                                    )}
                                  </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    )}
                  </React.Fragment>
                ))}
            </ul>
          </div>

          {!isMobile && featuredServices.length > desktopCount && (
            <div className="text-center mt-12 w-full px-0 max-w-full">
              <RefinedChronicleButton
                backgroundColor={showAll ? "transparent" : (isServiceHovered ? "var(--foreground)" : "transparent")}
                textColor={showAll ? "var(--foreground)" : (isServiceHovered ? "var(--background)" : "var(--foreground)")}
                borderColor="var(--button-border-color)"
                borderVisible={showAll ? true : !isServiceHovered}
                hoverBorderVisible={showAll ? true : !isServiceHovered}
                hoverBackgroundColor="var(--accent)"
                hoverBorderColor="var(--accent)"
                hoverTextColor="var(--foreground)"
                buttonHeight={mobileButtonHeight ? "2.75rem" : "2.875rem"}
                width="auto"
                onClick={toggleShowAll}
                disabled={animating}
              >
                {showAll ? t("show_less") : t("show_more")}
              </RefinedChronicleButton>
            </div>
          )}
        </div>
      </LimitedWidthWrapper>
    </div>
  </section>
);

}
