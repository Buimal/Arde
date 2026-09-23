"use client";
import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import useIsRTL from "@/hooks/useIsRTL";

//
// === Adjustable scaling config ===
//
const SCALE_SETTINGS = {
  maxMultiplier: 2.35,   // at minWidth (200px)
  minMultiplier: 1.01,  // at maxWidth (1200px and above)
  minWidth: 200,
  maxWidth: 1200,
};

function getDynamicScale(width: number) {
  const { maxMultiplier, minMultiplier, minWidth, maxWidth } = SCALE_SETTINGS;

  if (width >= maxWidth) return minMultiplier;
  if (width <= minWidth) return maxMultiplier;

  // Linear interpolation
  const t = (maxWidth - width) / (maxWidth - minWidth);
  return minMultiplier + (maxMultiplier - minMultiplier) * t;
}

//
// === Interfaces ===
//
interface CollageImage {
  src: string;
  aspectRatio: number;
  mirrorForRTL?: boolean;
  zIndex?: number;
  sizeFactor?: number;
  positionKind?:
    | "left-edge"
    | "right-edge"
    | "left-percent"
    | "right-percent"
    | "left-percent-relative-to-center";
  positionPercent?: number;
  top?: string;
  bottom?: string;
  animDuration?: string;
}

interface ReviewBox {
  name: string;
  rating: string;
  pos: { top?: string; left?: string; right?: string; bottom?: string };
  animDelay?: string;
  animDuration?: string;
  image: string;
  mirrorForRTL?: boolean;
}

interface HeroCollageProps extends React.HTMLAttributes<HTMLDivElement> {
  images: CollageImage[];
  reviews?: ReviewBox[];
}

//
// === Animation styles ===
//
const animationStyle = `
  @keyframes float-up {
    0% { transform: translateY(0); }
    50% { transform: translateY(-20px); }
    100% { transform: translateY(0); }
  }
  .animate-float-up {
    animation: float-up var(--anim-duration, 6s) ease-in-out infinite;
  }
`;

//
// === HeroCollage Component ===
//
const HeroCollage = React.forwardRef<HTMLDivElement, HeroCollageProps>(
  ({ className, images, reviews = [], ...props }, ref) => {
    const isRTL = useIsRTL();
    const containerRef = useRef<HTMLDivElement>(null);
    const [containerWidth, setContainerWidth] = useState(600);

    // Track scaling updates with resize
    useEffect(() => {
      if (!containerRef.current) return;
      const updateWidth = () => {
        if (containerRef.current) {
          setContainerWidth(containerRef.current.offsetWidth);
        }
      };
      updateWidth();
      const resizeObserver = new ResizeObserver(() => {
        updateWidth();
      });
      if (containerRef.current) {
        resizeObserver.observe(containerRef.current);
      }
      return () => {
        resizeObserver.disconnect();
      };
    }, []);

    function renderImage(img: CollageImage, idx: number) {
      const zIndex = img.zIndex ?? 10;

      // Non-linear scaling multiplier
      const scaleFactor = getDynamicScale(containerWidth);
      const imgWidth = (img.sizeFactor ?? 0.25) * containerWidth * scaleFactor;
      const animDuration = img.animDuration ?? "6s";

      // Vertical positioning
      const verticalPos =
        img.top !== undefined
          ? { top: img.top }
          : img.bottom !== undefined
          ? { bottom: img.bottom }
          : { top: "50%", transform: "translateY(-50%)" };

      const baseStyle: React.CSSProperties = {
        width: `${imgWidth}px`,
        aspectRatio: img.aspectRatio,
        zIndex,
        ...verticalPos,
        animationDelay: `-${idx * 1.2}s`,
        ["--anim-duration" as any]: animDuration,
      };

      switch (img.positionKind) {
        case "left-edge":
          return (
            <div
              key={`img-${idx}`}
              className="absolute overflow-hidden rounded-xl shadow-lg animate-float-up"
              style={{
                ...baseStyle,
                [isRTL ? "right" : "left"]: "0",
              }}
            >
              <img
                src={img.src}
                alt={`image-${idx}`}
                className={clsx("w-full h-full object-cover", isRTL && img.mirrorForRTL ? "scale-x-[-1]" : "")}
              />
            </div>
          );

        case "right-edge":
          return (
            <div
              key={`img-${idx}`}
              className="absolute overflow-hidden rounded-xl shadow-lg animate-float-up"
              style={{
                ...baseStyle,
                [isRTL ? "left" : "right"]: "0",
              }}
            >
              <img
                src={img.src}
                alt={`image-${idx}`}
                className={clsx("w-full h-full object-cover", isRTL && img.mirrorForRTL ? "scale-x-[-1]" : "")}
              />
            </div>
          );

        case "left-percent":
          return (
            <div
              key={`img-${idx}`}
              className="absolute overflow-hidden rounded-xl shadow-lg animate-float-up"
              style={{
                ...baseStyle,
                [isRTL ? "right" : "left"]: `${img.positionPercent ?? 0}%`,
              }}
            >
              <img
                src={img.src}
                alt={`image-${idx}`}
                className={clsx("w-full h-full object-cover", isRTL && img.mirrorForRTL ? "scale-x-[-1]" : "")}
              />
            </div>
          );

        case "right-percent":
          return (
            <div
              key={`img-${idx}`}
              className="absolute overflow-hidden rounded-xl shadow-lg animate-float-up"
              style={{
                ...baseStyle,
                [isRTL ? "left" : "right"]: `${img.positionPercent ?? 0}%`,
              }}
            >
              <img
                src={img.src}
                alt={`image-${idx}`}
                className={clsx("w-full h-full object-cover", isRTL && img.mirrorForRTL ? "scale-x-[-1]" : "")}
              />
            </div>
          );

        case "left-percent-relative-to-center": {
          const containerPercent = (img.positionPercent ?? 0) / 100;
          const baseLeft = containerWidth * containerPercent - imgWidth / 2;
          return (
            <div
              key={`img-${idx}`}
              className="absolute overflow-hidden rounded-xl shadow-lg animate-float-up"
              style={{
                ...baseStyle,
                left: isRTL ? `${containerWidth - baseLeft - imgWidth}px` : `${baseLeft}px`,
              }}
            >
              <img
                src={img.src}
                alt={`image-${idx}`}
                className={clsx("w-full h-full object-cover", isRTL && img.mirrorForRTL ? "scale-x-[-1]" : "")}
              />
            </div>
          );
        }

        default:
          return null;
      }
    }

    function renderReview(r: ReviewBox, idx: number) {
      const pos = { ...r.pos };
      const animDuration = r.animDuration ?? "6s";

      // Swap left/right if RTL
      if (isRTL) {
        if (pos.left !== undefined) {
          pos.right = pos.left;
          delete pos.left;
        } else if (pos.right !== undefined) {
          pos.left = pos.right;
          delete pos.right;
        }
      }

      return (
        <div
          key={`rev-${idx}`}
          className="absolute flex items-center gap-3 bg-[#111] border border-[#333] rounded-xl px-4 py-3 text-white shadow-lg animate-float-up"
          style={{
            ...pos,
            zIndex: 100 + idx,
            animationDelay: r.animDelay ?? "0s",
            ["--anim-duration" as any]: animDuration,
          }}
        >
          <div className="w-12 aspect-[3/4] overflow-hidden rounded-md flex-shrink-0">
            <img
              src={r.image}
              alt={`reviewer-${idx}`}
              className={clsx(
                "w-full h-full object-cover rounded-md",
                isRTL && r.mirrorForRTL ? "scale-x-[-1]" : ""
              )}
            />
          </div>
          <div className="flex flex-col items-start">
            <span className="font-semibold">{r.name}</span>
            <span
              className="text-sm font-bold text-yellow-400 mt-1 flex items-center gap-[5px]"
            >
              {r.rating}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="icon icon-tabler icons-tabler-filled icon-tabler-star"
                aria-hidden="true"
                focusable="false"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M8.243 7.34l-6.38 .925l-.113 .023a1 1 0 0 0-.44 1.684l4.622 4.499l-1.09 6.355l-.013 .11a1 1 0 0 0 1.464 .944l5.706 -3l5.693 3l.1 .046a1 1 0 0 0 1.352 -1.1l-1.091 -6.355l4.624 -4.5l.078 -.085a1 1 0 0 0-.633 -1.62l-6.38 -.926l-2.852 -5.78a1 1 0 0 0-1.794 0l-2.853 5.78z" />
              </svg>
            </span>
          </div>
        </div>
      );
    }

    return (
      <>
        <style>{animationStyle}</style>
        <section
          ref={ref}
          className={clsx("relative w-full bg-background font-sans overflow-visible", className)}
          {...props}
        >
          <div ref={containerRef} className="relative z-0 h-[600px] m-0 p-0">
            <div className="relative h-full w-full m-0 p-0">
              {images.map(renderImage)}
              {reviews.map(renderReview)}
            </div>
          </div>
        </section>
      </>
    );
  }
);

HeroCollage.displayName = "HeroCollage";
export default HeroCollage;
