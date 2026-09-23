"use client";
import React, { useRef, useState, useEffect } from "react";
import { useApp } from "@/context/app-context";
import useIsRTL from "@/hooks/useIsRTL";
import { useIsMobile } from "@/hooks/use-mobile";
import SectionText from "@/components/SectionText";
import { ProjectShowcase } from "@/components/ProjectShowcase";
import { rawMasters } from "@/lib/data";
import LimitedWidthWrapper from "@/components/limited-width-wrapper";
import ProjectCard from "@/components/ProjectCard";
import useMobileButtonHeight from "@/hooks/useMobileButtonHeight";

interface MastersSectionProps {
  bookAppointmentClicked: (masterId: string) => void;
  maxWidth: string;
  paddingDesktop: string;
  paddingMobile: string;
}

export default function MastersSection({
  bookAppointmentClicked,
  maxWidth,
  paddingDesktop,
  paddingMobile,
}: MastersSectionProps) {
  const { t } = useApp();
  const isMobile = useIsMobile();
  const isRTL = useIsRTL();
  const mobileButtonHeight = useMobileButtonHeight();
  const sectionRef = useRef<HTMLElement>(null);

  const masters = rawMasters.map((m) => ({
    quote: t(m.infoKey),
    name: t(m.nameKey),
    designation: t(m.specializationKey),
    src: m.image,
    id: m.id,
    link: m.id,
  }));

  // State to detect if 2-items per row layout is active
  const [is2ItemsPerRow, setIs2ItemsPerRow] = useState(false);

  // Font size adjustments state
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1500
  );

  // Update width and is2ItemsPerRow on resize, init, and 2 seconds after init
  useEffect(() => {
    function updateLayout() {
      const w = window.innerWidth;
      setWindowWidth(w);
      setIs2ItemsPerRow(w >= 640 && w < 1264);
    }
    updateLayout();
    const timeoutId = setTimeout(updateLayout, 2000);
    window.addEventListener("resize", updateLayout);
    return () => {
      window.removeEventListener("resize", updateLayout);
      clearTimeout(timeoutId);
    };
  }, []);

  // Font sizes default and adjusted by window width and layout
  let nameFontSize = 23;
  let descriptionFontSize = 15;
  let nameDescriptionGap = 4;

  if (is2ItemsPerRow) {
    if (windowWidth < 800) {
      nameFontSize -= 1;
      descriptionFontSize -= 1;
      nameDescriptionGap = 3;
    }
  }
  if (isMobile) {
    if (windowWidth < 600) {
      nameFontSize -= 1;
      descriptionFontSize -= 1;
      nameDescriptionGap = 2;
    }
    if (windowWidth <= 520) {
      nameFontSize -= 1;
      descriptionFontSize -= 1;
      nameDescriptionGap = 2;
    }
    if (windowWidth <= 400) {
      nameFontSize -= 1;
      descriptionFontSize -= 1;
      nameDescriptionGap = 2;
    }
  }

  return (
    <section
      ref={sectionRef}
      className={`relative overflow-hidden flex flex-col transition duration-300 ease-in-out ${
        isMobile ? "justify-start min-h-0 py-14" : "py-20"
      }`}
    >
      {/* Heading */}
      <LimitedWidthWrapper
        expandToFull={false}
        maxWidth={maxWidth}
        paddingDesktop={paddingDesktop}
        paddingMobile={paddingMobile}
      >
        <SectionText
          title={t("masters_title")}
          description={t("masters_description")}
          isRTL={isRTL}
        />
      </LimitedWidthWrapper>

      {/* Desktop Showcase unchanged */}
      {!isMobile && (
        <div
          style={{
            maxWidth: maxWidth,
            margin: "0 auto",
            paddingLeft: paddingDesktop,
            paddingRight: paddingDesktop,
          }}
        >
          <div className="mt-[-70px] mb-[-62px]">
            <ProjectShowcase
              testimonials={masters}
              autoplay
              isRTL={isRTL}
              imageAspectRatio={1344 / 1222}
              fontSizes={{
                name: "22px",
                position: "15px",
                testimony: "17px",
              }}
              colors={{
                name: "var(--foreground)",
                position: "var(--sub-foreground)",
                testimony: "var(--middle-foreground)",
              }}
              spacing={{
                top: "20",
                bottom: "20",
                lineHeight: "1.5",
                nameTop: "0",
                nameBottom: "0.25em",
                positionTop: "0",
                positionBottom: "0.25em",
                testimonyTop: "1.75em",
                testimonyBottom: "0em",
              }}
              buttonInscriptions={{
                previousButton: t("previous_button"),
                nextButton: t("next_button"),
                openWebAppButton: t("book_appointment_button"),
              }}
              onItemClick={(masterId) => {
                bookAppointmentClicked(masterId);
              }}
            />
          </div>
        </div>
      )}

      {/* Mobile stacked cards */}
      {isMobile && (
        <LimitedWidthWrapper
          expandToFull={false}
          maxWidth={maxWidth}
          paddingDesktop={paddingDesktop}
          paddingMobile={paddingMobile}
        >
          {is2ItemsPerRow ? (
            <>
              <div className="grid grid-cols-2 gap-[12px]">
                {masters
                  .slice(0, Math.ceil(masters.length / 2))
                  .map((m) => (
                    <ProjectCard
                      key={m.id}
                      name={m.name}
                      description={m.designation}
                      image={m.src}
                      link={m.id}
                      imageAspectRatio={1344 / 1222}
                      buttonInscriptions={{
                        openWebAppButton: t("book_appointment_button"),
                      }}
                      onItemClick={bookAppointmentClicked}
                      cardOuterRounding="12px"
                      cardInnerRounding="12px"
                      imageOuterRounding="10px"
                      imageInnerRounding="10px"
                      outlineColor="#242424"
                      hoverOutlineColor="#242424"
                      cardBackground="#111111"
                      imageBackground="#111111"
                      imageHoverBackground="#1a1a1a"
                      foreground="var(--foreground)"
                      secondaryForeground="var(--sub-foreground)"
                      isRTL={isRTL}
                      mobileButtonHeight={mobileButtonHeight}
                      fontSizes={{
                        name: nameFontSize,
                        description: descriptionFontSize,
                        nameDescriptionGap,
                      }}
                    />
                  ))}
              </div>
              <div className="mt-[12px] grid grid-cols-2 gap-[12px]">
                {masters
                  .slice(Math.ceil(masters.length / 2))
                  .map((m) => (
                    <ProjectCard
                      key={m.id}
                      name={m.name}
                      description={m.designation}
                      image={m.src}
                      link={m.id}
                      imageAspectRatio={1344 / 1222}
                      buttonInscriptions={{
                        openWebAppButton: t("book_appointment_button"),
                      }}
                      onItemClick={bookAppointmentClicked}
                      cardOuterRounding="12px"
                      cardInnerRounding="12px"
                      imageOuterRounding="10px"
                      imageInnerRounding="10px"
                      outlineColor="#242424"
                      hoverOutlineColor="#242424"
                      cardBackground="#111111"
                      imageBackground="#111111"
                      imageHoverBackground="#1a1a1a"
                      foreground="var(--foreground)"
                      secondaryForeground="var(--sub-foreground)"
                      isRTL={isRTL}
                      mobileButtonHeight={mobileButtonHeight}
                      fontSizes={{
                        name: nameFontSize,
                        description: descriptionFontSize,
                        nameDescriptionGap,
                      }}
                    />
                  ))}
              </div>
            </>
          ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-[12px] mt-0">
            {masters.map((m) => (
              <ProjectCard
                key={m.id}
                name={m.name}
                description={m.designation}
                image={m.src}
                link={m.id}
                imageAspectRatio={1344 / 1222}
                buttonInscriptions={{
                  openWebAppButton: t("book_appointment_button"),
                }}
                onItemClick={bookAppointmentClicked}
                cardOuterRounding="12px"
                cardInnerRounding="12px"
                imageOuterRounding="10px"
                imageInnerRounding="10px"
                outlineColor="#242424"
                hoverOutlineColor="#242424"
                cardBackground="#111111"
                imageBackground="#111111"
                imageHoverBackground="#1a1a1a"
                foreground="var(--foreground)"
                secondaryForeground="var(--sub-foreground)"
                isRTL={isRTL}
                mobileButtonHeight={mobileButtonHeight}
                fontSizes={{
                  name: nameFontSize,
                  description: descriptionFontSize,
                  nameDescriptionGap,
                }}
              />
            ))}
          </div>
          )}
        </LimitedWidthWrapper>
      )}
    </section>
  );
}
