"use client";
import React from "react";

interface TestimonialCardProps {
  name: string;
  designation: string;
  rating: string;
  quote: string;
  imageSrc: string;
  mirrorImage?: boolean;
  isRTL: boolean;
  fontScale: number;
}

export default function TestimonialCard({
  name,
  designation,
  rating,
  quote,
  imageSrc,
  mirrorImage = false,
  isRTL,
  fontScale,
}: TestimonialCardProps) {
  const StarIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className="inline-block text-yellow-400"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M8.243 7.34l-6.38 .925l-.113 .023a1 1 0 0 0-.44 1.684l4.622 4.499l-1.09 6.355l-.013 .11a1 1 0 0 0 1.464 .944l5.706 -3l5.693 3l.1 .046a1 1 0 0 0 1.352 -1.1l-1.091 -6.355l4.624 -4.5l.078 -.085a1 1 0 0 0-.633 -1.62l-6.38 -.926l-2.852 -5.78a1 1 0 0 0-1.794 0l-2.853 5.78z" />
    </svg>
  );

  return (
    <div
      dir={isRTL ? "rtl" : "ltr"}
      className="bg-[#111111] border border-[#242424] rounded-lg p-5 flex flex-col"
      style={{ borderRadius: 8 }}
    >
      <div className="flex gap-3 items-start">
        {/* Image container with fixed width and aspect ratio 334/400 */}
        <div
          className="flex-shrink-0 overflow-hidden rounded-md"
          style={{
            height: "76px", // fixed width for the card
            aspectRatio: "334 / 400",
          }}
        >
          <img
            src={imageSrc}
            alt={`Reviewer ${name}`}
            className={`w-full h-full object-cover rounded-md ${
              mirrorImage ? "scale-x-[-1]" : ""
            }`}
          />
        </div>

        {/* Name, position, rating stacked vertically, container takes full available width */}
        <div className="flex flex-col flex-grow justify-start">
          <span
            className="font-semibold"
            style={{ color: "var(--foreground)", fontSize: `${1.5 * fontScale}rem` }}
          >
            {name}
          </span>
          <span
            className="text-sm text-gray-400 mt-1"
            style={{ fontSize: `${0.875 * fontScale}rem` }}
          >
            {designation}
          </span>
          <span
            className="flex items-center gap-1 font-bold text-yellow-400 mt-1"
            style={{ fontSize: `${1 * fontScale}rem` }}
          >
              <>
              <span>{rating}</span>
                {StarIcon}
                
              </>
          </span>
        </div>
      </div>

      {/* Testimonial quote below image and text container */}
      <p
        className="text-gray-300 mt-4"
        style={{ fontSize: `${1 * fontScale}rem`, lineHeight: 1.5 }}
      >
        {quote}
      </p>
    </div>
  );
}
