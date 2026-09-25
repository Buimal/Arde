"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import clsx from "clsx";
import useIsRTL from "@/hooks/useIsRTL";
import { useTranslation } from "@/context/app-context";
import RefinedChronicleButton from "@/components/RefinedChronicleButton";
import { MessageCircle } from "lucide-react";
import useMobileButtonHeight from "@/hooks/useMobileButtonHeight";
import { asset } from "@/lib/assets";

interface AboutUsSectionProps {
  onButtonClick?: (buttonKey: "schedule" | "explore") => void;
}

const DicedGrid: React.FC<{ images: string[]; containerHeight: number }> = ({ images, containerHeight }) => {
  const gapPx = 16;

  // Adjust image height by subtracting gap once and dividing by 2 rows
  const imageHeight = (containerHeight - gapPx) / 2;

  return (
    <div
      style={{
        width: "100%",
        height: containerHeight,
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gridTemplateRows: "1fr 1fr",
        gap: gapPx,
        borderRadius: 20,
        direction: "ltr",
      }}
    >
      {images.slice(0, 4).reverse().map((image, index) => (
        <div
          key={index}
          style={{
            position: "relative",
            borderRadius: 20,
            overflow: "hidden",
            width: "100%",
            height: imageHeight,
          }}
        >
          <img
            src={asset(image)}
            alt={`Image ${index + 1}`}
            className={`warped-image ${
              ["bottom-right", "bottom-left", "top-right", "top-left"][index]
            }`}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              userSelect: "none",
            }}
            draggable={false}
          />
        </div>
      ))}
      <style jsx>{`
        .warped-image {
          --r: 20px;
          --s: 40px;
          --x: 25px;
          --y: 5px;
        }
        .top-right {
          --_m: /calc(2 * var(--r)) calc(2 * var(--r)) radial-gradient(#000 70%, #0000 72%);
          --_g: conic-gradient(at calc(100% - var(--r)) var(--r), #0000 25%, #000 0);
          --_d: (var(--s) + var(--r));
          mask: calc(100% - var(--_d) - var(--x)) 0 var(--_m),
            100% calc(var(--_d) + var(--y)) var(--_m),
            radial-gradient(var(--s) at 100% 0, #0000 99%, #000 calc(100% + 1px))
              calc(-1 * var(--r) - var(--x)) calc(var(--r) + var(--y)),
            var(--_g) calc(-1 * var(--_d) - var(--x)) 0,
            var(--_g) 0 calc(var(--_d) + var(--y));
          mask-repeat: no-repeat;
        }
        .top-left {
          --_m: /calc(2 * var(--r)) calc(2 * var(--r)) radial-gradient(#000 70%, #0000 72%);
          --_g: conic-gradient(at var(--r) var(--r), #000 75%, #0000 0);
          --_d: (var(--s) + var(--r));
          mask: calc(var(--_d) + var(--x)) 0 var(--_m),
            0 calc(var(--_d) + var(--y)) var(--_m),
            radial-gradient(var(--s) at 0 0, #0000 99%, #000 calc(100% + 1px))
              calc(var(--r) + var(--x)) calc(var(--r) + var(--y)),
            var(--_g) calc(var(--_d) + var(--x)) 0,
            var(--_g) 0 calc(var(--_d) + var(--y));
          mask-repeat: no-repeat;
        }
        .bottom-left {
          --_m: /calc(2 * var(--r)) calc(2 * var(--r)) radial-gradient(#000 70%, #0000 72%);
          --_g: conic-gradient(from 180deg at var(--r) calc(100% - var(--r)), #0000 25%, #000 0);
          --_d: (var(--s) + var(--r));
          mask: calc(var(--_d) + var(--x)) 100% var(--_m),
            0 calc(100% - var(--_d) - var(--y)) var(--_m),
            radial-gradient(var(--s) at 0 100%, #0000 99%, #000 calc(100% + 1px))
              calc(var(--r) + var(--x)) calc(-1 * var(--r) - var(--y)),
            var(--_g) calc(var(--_d) + var(--x)) 0,
            var(--_g) 0 calc(-1 * var(--_d) - var(--y));
          mask-repeat: no-repeat;
        }
        .bottom-right {
          --_m: /calc(2 * var(--r)) calc(2 * var(--r)) radial-gradient(#000 70%, #0000 72%);
          --_g: conic-gradient(
            from 90deg at calc(100% - var(--r)) calc(100% - var(--r)),
            #0000 25%,
            #000 0
          );
          --_d: (var(--s) + var(--r));
          mask: calc(100% - var(--_d) - var(--x)) 100% var(--_m),
            100% calc(100% - var(--_d) - var(--y)) var(--_m),
            radial-gradient(var(--s) at 100% 100%, #0000 99%, #000 calc(100% + 1px))
              calc(-1 * var(--r) - var(--x)) calc(-1 * var(--r) - var(--y)),
            var(--_g) calc(-1 * var(--_d) - var(--x)) 0,
            var(--_g) 0 calc(-1 * var(--_d) - var(--y));
          mask-repeat: no-repeat;
        }
      `}</style>
    </div>
  );
};

export default function AboutUsSection({ onButtonClick }: AboutUsSectionProps) {
  const isRTL = useIsRTL();
  const t = useTranslation();
  const mobileButtonHeight = useMobileButtonHeight();

  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [titleHeight, setTitleHeight] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(typeof window !== "undefined" ? window.innerHeight : 800);

  // Update viewport height on resize
  useEffect(() => {
    const onResize = () => setViewportHeight(window.innerHeight);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Measure container width and title height
  useEffect(() => {
    if (!sectionRef.current) return;
    const updateSizes = () => {
      setContainerWidth(sectionRef.current!.offsetWidth);
      if (titleRef.current) setTitleHeight(titleRef.current.offsetHeight);
    };
    updateSizes();
    const resizeObserver = new ResizeObserver(updateSizes);
    resizeObserver.observe(sectionRef.current);
    if (titleRef.current) resizeObserver.observe(titleRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  const aboutUsImages = isRTL
    ? ["/images/about-us/1.webp", "/images/about-us/3.webp", "/images/about-us/4.webp", "/images/about-us/2.webp"]
    : ["/images/about-us/4.webp", "/images/about-us/3.webp", "/images/about-us/2.webp", "/images/about-us/1.webp"];

  const calculateGap = useCallback((width: number) => {
    const minWidth = 1024, maxWidth = 1456;
    const minGap = 60, maxGap = 86;
    if (width <= minWidth) return minGap;
    if (width >= maxWidth) return Math.max(minGap, maxGap + 0.06018 * (width - maxWidth));
    return minGap + ((maxGap - minGap) * (width - minWidth)) / (maxWidth - minWidth);
  }, []);

  const horizontalGap = calculateGap(containerWidth);

  const handleClick = useCallback(
    (buttonKey: "schedule" | "explore") => onButtonClick?.(buttonKey),
    [onButtonClick]
  );

  // Heights and paddings
  const paddingTopBottom = 80 + 80 + 96; // pt-20 + pb-20
  const titleMarginBottom = 50;

  // Fix: Add 80px to gridHeight and offset grid top with negative margin to move grid upwards
  const gridHeight = Math.max(viewportHeight - paddingTopBottom - titleHeight - titleMarginBottom + 80, 0);

  return (
    <section
      ref={sectionRef}
      className={clsx(
        "relative overflow-hidden flex flex-col transition duration-300 ease-in-out pt-20 pb-[78px]",
        "min-h-[calc(100vh-2px)] max-h-[calc(100vh-2px)] w-full box-border"
      )}
      dir={isRTL ? "rtl" : "ltr"}
      aria-label={t("about_us_section_aria_label")}
      style={{
        gap: horizontalGap,
        paddingLeft: 0,
        paddingRight: 0,
      }}
    >
      <h2
        ref={titleRef}
        style={{
          fontSize: (() => {
            const MIN_WIDTH = 200;
            const MAX_WIDTH = 1400;
            const TITLE_MIN = 24;
            const TITLE_MAX = 36;
            const clampedWidth = Math.min(Math.max(containerWidth, MIN_WIDTH), MAX_WIDTH);
            const ratio = (clampedWidth - MIN_WIDTH) / (MAX_WIDTH - MIN_WIDTH);
            return `${(TITLE_MIN + ratio * (TITLE_MAX - TITLE_MIN)).toFixed(2)}px`;
          })(),
          lineHeight: 1.3,
          fontWeight: 700,
          fontFamily: "var(--font-headline, sans-serif)",
          color: "var(--foreground)",
          textAlign: isRTL ? "right" : "left",
          direction: isRTL ? "rtl" : "ltr",
          marginBottom: titleMarginBottom,
          userSelect: "none",
          whiteSpace: "normal",
          width: "100%",
          overflowWrap: "break-word",
          wordWrap: "break-word",
        }}
      >
        {t("about_us_title")}
      </h2>

      <div
        style={{
          display: "flex",
          gap: horizontalGap,
          flexGrow: 1,
          minHeight: 0,
          height: gridHeight,
          alignItems: "center",
          userSelect: "text",
          marginTop: "-80px",
        }}
      >
        <div
          style={{
            flex: "1 1 50%",
            maxWidth: "600px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "1.5rem",
            boxSizing: "border-box",
          }}
        >
          <p
            style={{
              fontSize: "18px",
              lineHeight: 1.5,
              color: "var(--sub-foreground)",
              textAlign: isRTL ? "right" : "left",
              direction: isRTL ? "rtl" : "ltr",
              margin: 0,
              userSelect: "text",
            }}
          >
            {t("about_us_description")}
          </p>

          <div style={{ width: "100%", maxWidth: "320px" }}>
            <RefinedChronicleButton
              backgroundColor="var(--foreground)"
              textColor="var(--background)"
              hoverBackgroundColor="var(--accent)"
              hoverTextColor="var(--foreground)"
              borderVisible={false}
              buttonHeight={mobileButtonHeight ? "2.75rem" : "2.875rem"}
              width="100%"
              isRTL={isRTL}
              onClick={() => handleClick("schedule")}
            >
              <MessageCircle size={18} strokeWidth={2} />
              {t("schedule_visit")}
            </RefinedChronicleButton>
          </div>
        </div>

        <div
          style={{
            flex: "1 1 50%",
            maxWidth: "auto",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            boxSizing: "border-box",
            overflow: "hidden",
          }}
        >
          {gridHeight > 0 && <DicedGrid images={aboutUsImages} containerHeight={gridHeight} />}
        </div>
      </div>
    </section>
  );
}
