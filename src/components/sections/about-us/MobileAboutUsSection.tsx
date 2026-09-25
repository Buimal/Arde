"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import clsx from "clsx";
import useIsRTL from "@/hooks/useIsRTL";
import { useTranslation } from "@/context/app-context";
import SectionText from "@/components/SectionText";
import RefinedChronicleButton from "@/components/RefinedChronicleButton";
import { MessageCircle } from "lucide-react";
import useMobileButtonHeight from "@/hooks/useMobileButtonHeight";
import { asset } from "@/lib/assets";

interface MobileAboutUsSectionProps {
  aboutUsImages?: string[];
  onButtonClick?: (buttonKey: "schedule" | "explore") => void;
}

const DicedGrid: React.FC<{
  images: string[];
  onGridImageClick?: (index: number) => void;
  onGridImageHover?: (index: number) => void;
}> = ({ images, onGridImageClick, onGridImageHover }) => {
  const [gridSize, setGridSize] = useState(0);
  const [mode, setMode] = useState<"grid" | "two" | "one">("grid");
  const containerRef = useRef<HTMLDivElement>(null);

  const updateMode = useCallback(() => {
    const w = window.innerWidth;
    if (w < 600) setMode("one");
    else if (w < 800) setMode("two");
    else setMode("grid");
  }, []);

  useEffect(() => {
    const updateSize = () => {
      const width = containerRef.current ? containerRef.current.offsetWidth : 0;
      setGridSize(width);
    };

    updateSize();
    updateMode();

    window.addEventListener("resize", () => {
      updateSize();
      updateMode();
    });

    const delayed = setTimeout(() => {
      updateSize();
      updateMode();
    }, 2100);

    return () => {
      window.removeEventListener("resize", () => {
        updateSize();
        updateMode();
      });
      clearTimeout(delayed);
    };
  }, [updateMode]);

  if (mode === "two") {
    return (
      <div
        style={{
          display: "flex",
          gap: 12,
          width: "100%",
          justifyContent: "center",
        }}
      >
        {["/images/about-us/1.webp", "/images/about-us/2.webp"].map((img, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              aspectRatio: "1 / 1",
              borderRadius: 12,
              overflow: "hidden",
            }}
          >
            <img
              src={asset(img)}
              alt={`Image ${i + 1}`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                userSelect: "none",
              }}
              draggable={false}
            />
          </div>
        ))}
      </div>
    );
  }

  if (mode === "one") {
    return (
      <div
        style={{
          width: "100%",
          aspectRatio: "4 / 3",
          borderRadius: 8,
          overflow: "hidden",
        }}
      >
        <img
          src={asset("/images/about-us/1.webp")}
          alt="Single Image"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
          draggable={false}
        />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      style={{
        flex: 1,
        display: "flex",
        height: "auto",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 20,
          width: "100%",
          maxWidth: `${gridSize}px`,
          height: `${(gridSize * 91) / 160}px`,
          direction: "ltr", // always ltr
        }}
      >
        {images.slice(0, 4).reverse().map((image, index) => (
          <div
            key={index}
            style={{
              position: "relative",
              width: "100%",
              paddingBottom: `${(91 / 160) * 100}%`,
              overflow: "hidden",
              borderRadius: 20,
              cursor: onGridImageClick ? "pointer" : undefined,
              direction: "ltr",
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
              onClick={() => onGridImageClick && onGridImageClick(index)}
              onMouseEnter={() => onGridImageHover && onGridImageHover(index)}
              draggable={false}
            />
          </div>
        ))}
      </div>
      <style jsx>{`
        .warped-image {
          --r: 16px;
          --s: 34px;
          --x: 22px;
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

export default function MobileAboutUsSection({
  onButtonClick,
}: MobileAboutUsSectionProps) {
  const isRTL = useIsRTL();
  const t = useTranslation();

  const aboutUsImages = isRTL
    ? [
        "/images/about-us/1.webp",
        "/images/about-us/3.webp",
        "/images/about-us/4.webp",
        "/images/about-us/2.webp",
      ]
    : [
        "/images/about-us/4.webp",
        "/images/about-us/3.webp",
        "/images/about-us/2.webp",
        "/images/about-us/1.webp",
      ];

  const measureRef = useRef<HTMLDivElement>(null);
  const [elementWidth, setElementWidth] = useState(0);
  const mobileButtonHeight = useMobileButtonHeight();

  useEffect(() => {
    if (!measureRef.current) return;
    const updateSize = () => setElementWidth(measureRef.current!.offsetWidth);
    updateSize();
    const resizeObs = new ResizeObserver(updateSize);
    resizeObs.observe(measureRef.current);
    return () => resizeObs.disconnect();
  }, []);

  const handleClick = useCallback(
    (buttonKey: "schedule" | "explore") => {
      if (onButtonClick) onButtonClick(buttonKey);
    },
    [onButtonClick]
  );

  return (
    <section
      ref={measureRef}
      className={clsx(
        "relative overflow-hidden flex flex-col transition duration-300 ease-in-out",
        "justify-start min-h-0 py-14"
      )}
    >
      <SectionText
        title={t("about_us_title")}
        description={t("about_us_description")}
        isRTL={isRTL}
      />

      <div className="w-full flex justify-center">
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

      <div className="mt-6 w-full flex justify-center">
        <DicedGrid images={aboutUsImages} />
      </div>
    </section>
  );
}
