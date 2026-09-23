"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import RefinedChronicleButton from "@/components/RefinedChronicleButton";
import { Lens } from "./Lens";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";

interface FontSizes {
  name: number;
  description: number;
  nameDescriptionGap?: number;
}

interface ProjectCardProps {
  name: string;
  description: string;
  image: string;
  link: string;
  imageAspectRatio: number;
  buttonInscriptions: { openWebAppButton: string };
  onItemClick: (link: string) => void;
  cardOuterRounding: string;
  cardInnerRounding: string;
  imageOuterRounding: string;
  imageInnerRounding: string;
  outlineColor: string;
  hoverOutlineColor: string;
  cardBackground: string;
  imageBackground: string;
  imageHoverBackground: string;
  foreground: string;
  secondaryForeground: string;
  isRTL?: boolean;
  mobileButtonHeight?: boolean;
  lensZoomFactor?: number;
  lensSize?: number;
  fontSizes?: FontSizes;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  name,
  description,
  image,
  link,
  imageAspectRatio,
  buttonInscriptions,
  onItemClick,
  cardOuterRounding,
  cardInnerRounding,
  imageOuterRounding,
  imageInnerRounding,
  outlineColor,
  hoverOutlineColor,
  cardBackground,
  imageBackground,
  imageHoverBackground,
  foreground,
  secondaryForeground,
  isRTL = false,
  mobileButtonHeight = false,
  lensZoomFactor = 1.61,
  lensSize = 176,
  fontSizes = { name: 23, description: 15, nameDescriptionGap: 8 },
}) => {
  const [isCardHovered, setIsCardHovered] = useState(false);
  const [isImageHovered, setIsImageHovered] = useState(false);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const [calculatedLensSize, setCalculatedLensSize] = useState(lensSize);

  useEffect(() => {
    function updateLensSize() {
      if (imageContainerRef.current) {
        const width = imageContainerRef.current.clientWidth;
        setCalculatedLensSize(width * 0.35);
      }
    }
    updateLensSize();
    window.addEventListener("resize", updateLensSize);
    return () => window.removeEventListener("resize", updateLensSize);
  }, []);

  const rtlTextStyle = isRTL
    ? { textAlign: "center" as const, direction: "rtl" as const }
    : { textAlign: "center" as const, direction: "ltr" as const };

  return (
    <motion.div
      className={cn("group/bento flex flex-col h-full relative")}
      style={{
        backgroundColor: isCardHovered ? hoverOutlineColor : outlineColor,
        padding: "1px",
        borderRadius: cardOuterRounding,
        transition: "background-color 0.3s ease-in-out",
        height: "100%",
        minWidth: 0,
        cursor: "pointer",
      }}
      onMouseEnter={() => setIsCardHovered(true)}
      onMouseLeave={() => setIsCardHovered(false)}
    >
      <div
        className="flex flex-col h-full"
        style={{
          borderRadius: cardInnerRounding,
          backgroundColor: cardBackground,
          padding: "1rem",
          height: "100%",
        }}
      >
        <Lens
          zoomFactor={lensZoomFactor}
          lensSize={calculatedLensSize}
          onHoverChange={setIsImageHovered}
          disabled={false}
          imageInnerRounding={imageInnerRounding}
        >
          <div
            className="relative w-full overflow-hidden"
            style={{ paddingTop: `${(1 / imageAspectRatio) * 100}%` }}
            ref={imageContainerRef}
          >
            <div
              className="absolute inset-0"
              style={{
                padding: "1px",
                background: isImageHovered
                  ? imageHoverBackground
                  : imageBackground,
                borderRadius: imageOuterRounding,
                transition: "background-color 0.3s ease-in-out",
              }}
            >
              <div
                className="relative h-full w-full overflow-hidden"
                style={{
                  borderRadius: imageInnerRounding,
                  overflow: "hidden",
                }}
              >
                <Image src={image} alt={name} fill className="object-cover" />
              </div>
            </div>
          </div>
        </Lens>

        <div
          style={{
            ...rtlTextStyle,
            marginTop: "1rem",
            fontWeight: 600,
            fontSize: `${fontSizes.name}px`,
            color: foreground,
            userSelect: "none",
            textAlign: "center",
            marginBottom: `${fontSizes.nameDescriptionGap ?? 8}px`,
          }}
        >
          {name}
        </div>

        <div
          style={{
            ...rtlTextStyle,
            fontSize: `${fontSizes.description}px`,
            color: secondaryForeground,
            userSelect: "none",
            textAlign: "center",
          }}
        >
          {description}
        </div>

        <div style={{ marginTop: "1.5rem" }}>
          <RefinedChronicleButton
            backgroundColor="var(--foreground)"
            textColor="var(--background)"
            hoverBackgroundColor="var(--accent)"
            hoverTextColor="var(--foreground)"
            borderVisible={false}
            buttonHeight={mobileButtonHeight ? "2.75rem" : "2.875rem"}
            width="100%"
            isRTL={isRTL}
            onClick={() => onItemClick(link)}
          >
            <Calendar size={18} strokeWidth={2} style={{ marginRight: 8 }} />
            {buttonInscriptions.openWebAppButton || "Schedule"}
          </RefinedChronicleButton>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
