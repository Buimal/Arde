"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import gsap from "gsap";
import { motion } from "framer-motion";

interface Testimonial {
  id: string;
  name: string;
  designation: string;
  quote: string;
  src: string;
}

interface Colors {
  name?: string;
  designation?: string;
  testimony?: string;
  arrowBackground?: string;
  arrowHoverBackground?: string;
  arrowForeground?: string;
  arrowForegroundHover?: string;
}

interface Props {
  testimonials: Testimonial[];
  isRTL?: boolean;
  testimonialStartFraction?: number;
  testimonialHeight?: number;
  testimonialPadding?: string;
  imageBorderRadius?: string;
  imageAspectRatio?: string;
  nameFontSize?: string;
  designationFontSize?: string;
  quoteFontSize?: string;
  autoplay?: boolean;
  autoplayInterval?: number;
  showFirstSentenceOnly?: boolean;
  colors?: Colors;
}

export function TestimonialCarousel({
  testimonials,
  isRTL = false,
  testimonialStartFraction = 0.75,
  testimonialHeight = 300,
  testimonialPadding = "32px 40px",
  imageBorderRadius = "12px",
  imageAspectRatio = "1 / 1",
  nameFontSize = "1.5rem",
  designationFontSize = "0.875rem",
  quoteFontSize = "1rem",
  autoplay = true,
  autoplayInterval = 5000,
  showFirstSentenceOnly = false,
  colors = {},
}: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [imageWidth, setImageWidth] = useState(0);
  const imgWrapperRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const designationRef = useRef<HTMLParagraphElement>(null);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isAutoplayActiveRef = useRef(autoplay);

  const testimonialsLength = testimonials.length;
  const active = testimonials[activeIndex];

  // Colors
  const {
    name: colorName = "white",
    designation: colorDesignation = "#9ca3af",
    testimony: colorTestimony = "#d1d5db",
    arrowBackground = "#141414",
    arrowHoverBackground = "#00a6fb",
    arrowForeground = "#fafafa",
    arrowForegroundHover = "#000",
  } = colors;

  // Navigation + Stop autoplay
  const stopAutoplay = useCallback(() => {
    if (autoplayRef.current) clearInterval(autoplayRef.current);
    isAutoplayActiveRef.current = false;
  }, []);

  const next = useCallback(() => {
    setDirection(1);
    setActiveIndex((i) => (i + 1) % testimonialsLength);
    stopAutoplay();
  }, [testimonialsLength, stopAutoplay]);

  const prev = useCallback(() => {
    setDirection(-1);
    setActiveIndex((i) => (i - 1 + testimonialsLength) % testimonialsLength);
    stopAutoplay();
  }, [testimonialsLength, stopAutoplay]);

  // Track image wrapper size
  useEffect(() => {
    if (!imgWrapperRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) setImageWidth(entry.contentRect.width);
    });
    observer.observe(imgWrapperRef.current);
    return () => observer.disconnect();
  }, []);

  const horizontalOffset = imageWidth * testimonialStartFraction;

  // Animate Images
  useEffect(() => {
    if (!imagesRef.current) return;
    const imgs = imagesRef.current.children;
    Array.from(imgs).forEach((img, idx) => {
      if (idx === activeIndex) {
        gsap.fromTo(
          img,
          { opacity: 0, filter: "blur(12px)" },
          { opacity: 1, filter: "blur(0px)", duration: 0.8, ease: "power2.out" }
        );
      } else {
        gsap.to(img, {
          opacity: 0,
          filter: "blur(12px)",
          duration: 0.6,
          ease: "power2.inOut",
        });
      }
    });
  }, [activeIndex]);

  // Text animation
  const wrapLines = (element: HTMLElement, text: string) => {
    element.innerHTML = "";
    const parent = document.createElement("div");
    parent.classList.add("split-parent");
    const child = document.createElement("div");
    child.classList.add("split-child");
    child.textContent = text;
    parent.appendChild(child);
    element.appendChild(parent);
    return child;
  };

  const animateNameAndDesignation = useCallback(() => {
    if (!nameRef.current || !designationRef.current) return;
    const nameChild = wrapLines(nameRef.current, active.name);
    const designationChild = wrapLines(
      designationRef.current,
      active.designation
    );
    const fromY = direction === 1 ? -100 : 100;
    gsap.fromTo(nameChild, { yPercent: fromY, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.8, ease: "power3.out" });
    gsap.fromTo(designationChild, { yPercent: fromY, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.05 });
  }, [active, direction]);

  useEffect(() => {
    animateNameAndDesignation();
  }, [activeIndex, animateNameAndDesignation]);

  // Autoplay (use next() so it's the SAME as click)
  useEffect(() => {
    if (autoplay && isAutoplayActiveRef.current) {
      autoplayRef.current = setInterval(() => {
        next();
      }, autoplayInterval);
    }
    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [autoplay, autoplayInterval, next]);

  // Quote handling
  const quoteToDisplay = useMemo(() => {
    if (!active.quote) return "";
    if (!showFirstSentenceOnly) return active.quote;
    const match = active.quote.match(/.*?[.?!](\s|$)/);
    return match ? match[0] : active.quote;
  }, [active, showFirstSentenceOnly]);

  return (
    <div style={{ position: "relative", width: "100%", display: "flex" }}>
      {/* Image Container */}
      <div
        ref={imgWrapperRef}
        style={{
          width: "50%",
          aspectRatio: imageAspectRatio,
          borderRadius: imageBorderRadius,
          overflow: "hidden",
          position: "relative",
          flexShrink: 0,
          order: isRTL ? 2 : 1,
        }}
      >
        <div ref={imagesRef} style={{ position: "absolute", inset: 0 }}>
          {testimonials.map((t, idx) => (
            <div
              key={t.id}
              style={{
                position: "absolute",
                inset: 0,
                opacity: idx === activeIndex ? 1 : 0,
                borderRadius: imageBorderRadius,
                overflow: "hidden",
              }}
            >
              <Image
                src={t.src}
                alt={t.name}
                fill
                priority={idx === activeIndex}
                draggable={false}
                className="object-cover"
                style={{ borderRadius: imageBorderRadius, objectFit: "cover" }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Testimonial Container */}
      <div
        style={{
          backgroundColor: "#111",
          border: "1px solid #242424",
          borderRadius: imageBorderRadius,
          padding: testimonialPadding,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "absolute",
          top: "50%",
          transform: "translateY(-50%)",
          height: `${testimonialHeight}px`,
          marginLeft: isRTL ? 0 : horizontalOffset,
          marginRight: isRTL ? horizontalOffset : 0,
          left: isRTL ? "auto" : 0,
          right: isRTL ? 0 : "auto",
          width: `calc(100% - ${horizontalOffset}px)`,
          boxSizing: "border-box",
          zIndex: 100,
          color: "var(--foreground)",
        }}
      >
        <div>
          <h3
            ref={nameRef}
            style={{ fontSize: nameFontSize, fontWeight: "bold", marginBottom: "0.5rem", color: colorName }}
          />
          <p
            ref={designationRef}
            style={{ fontSize: designationFontSize, marginBottom: "1rem", color: colorDesignation }}
          />
          <motion.p
            key={active.id}
            style={{ fontSize: quoteFontSize, lineHeight: 1.5, color: colorTestimony }}
          >
            {quoteToDisplay.split(" ").map((word, index) => (
              <motion.span
                key={index}
                initial={{ filter: "blur(8px)", opacity: 0, y: 10 }}
                animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                transition={{ duration: 0.25, ease: "easeOut", delay: 0.02 * index }}
                className="inline-block"
              >
                {word}&nbsp;
              </motion.span>
            ))}
          </motion.p>
        </div>

        {/* Navigation */}
        <div className="flex gap-4 mt-6" style={{ justifyContent: "flex-start" }}>
          <button
            onClick={prev}
            aria-label="Previous"
            style={{
              borderRadius: "50%",
              width: "44px",
              height: "44px",
              backgroundColor: arrowBackground,
              color: arrowForeground,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "background 0.3s, color 0.3s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = arrowHoverBackground;
              e.currentTarget.style.color = arrowForegroundHover;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = arrowBackground;
              e.currentTarget.style.color = arrowForeground;
            }}
          >
            {isRTL ? <ArrowRight className="w-5 h-5" /> : <ArrowLeft className="w-5 h-5" />}
          </button>

          <button
            onClick={next}
            aria-label="Next"
            style={{
              borderRadius: "50%",
              width: "44px",
              height: "44px",
              backgroundColor: arrowBackground,
              color: arrowForeground,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "background 0.3s, color 0.3s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = arrowHoverBackground;
              e.currentTarget.style.color = arrowForegroundHover;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = arrowBackground;
              e.currentTarget.style.color = arrowForeground;
            }}
          >
            {isRTL ? <ArrowLeft className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </div>
  );
}
