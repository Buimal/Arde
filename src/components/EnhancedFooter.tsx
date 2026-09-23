"use client";

import React, { useState, useEffect } from "react";
import { useApp } from "@/context/app-context";
import { cn } from "@/lib/utils";
import { Instagram, Mail, MessageCircle } from "lucide-react";
import { FlameIcon } from "./FlameIcon";
import LimitedWidthWrapper from "@/components/limited-width-wrapper";
import HighlightHover from "@/components/HighlightHover";

interface NavItem {
  id: string;
  label: string;
  icon?: React.ReactElement;
  targetId: string;
}

interface EnhancedFooterProps {
  navItems: NavItem[];
  paddingDesktop: string;
  paddingMobile: string;
  maxWidth: string;
  isMobile: boolean;
  isRTL: boolean;
}

export default function EnhancedFooter({
  navItems,
  paddingDesktop,
  paddingMobile,
  maxWidth,
  isMobile,
  isRTL,
}: EnhancedFooterProps) {
  const { t } = useApp();
  const [primaryColor, setPrimaryColor] = useState("var(--foreground)");
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const style = getComputedStyle(document.documentElement);
    const accent = style.getPropertyValue("--accent").trim();
    if (accent) setPrimaryColor(accent);
  }, []);

  const gapClass = isRTL
    ? isMobile
      ? "gap-[6.5px]"
      : "gap-[7px]"
    : isMobile
    ? "gap-[5.5px]"
    : "gap-[6px]";
  const snowflakeSize = isMobile ? 30 : 32;
  const logoFontSize = isMobile ? "text-[19px]" : "text-xl";

  const handleSmoothScroll = (targetId: string) => {
    const scrollContainer = document.getElementById("page-scroll-container");
    if (!scrollContainer) return;
    const el =
      targetId === "hero"
        ? document.getElementById("hero-anchor")
        : document.getElementById(targetId);
    if (el)
      scrollContainer.scrollTo({ top: el.offsetTop, behavior: "smooth" });
  };

  const columnTitleClass = "font-bold text-base mb-4";

  return (
    <footer
      className="w-full text-[var(--foreground)] flex flex-col items-center border-t border-[var(--button-border-color)]"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className={cn(isMobile ? "h-[24px]" : "h-[36px]")} />
      <LimitedWidthWrapper
        expandToFull={false}
        maxWidth={maxWidth}
        paddingDesktop={paddingDesktop}
        paddingMobile={paddingMobile}
      >
        <div className={`flex flex-col gap-10 ${isMobile ? "items-center" : ""}`}>
          {/* Logo + description */}
          <div
            className={cn(
              "flex flex-col",
              "items-center text-center"
            )}
            style={{ width: "100%" }}
          >
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                handleSmoothScroll("hero");
              }}
              className={`group/logo flex items-center font-bold ${gapClass} justify-center`}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              style={{
                color: isHovered ? primaryColor : "var(--foreground)",
                transition: "color 0.3s ease-in-out",
                userSelect: "none",
                fontSize: isMobile ? 19 : 20,
                maxWidth: "max-content",
              }}
            >
              <FlameIcon
                animate={isHovered}
                size={snowflakeSize}
                isRTL={isRTL}
                className="stroke-current transition-colors duration-300 ease-in-out"
              />
              <span
                className={`font-bold ${logoFontSize} transition-colors duration-300 ease-in-out`}
              >
                {t("salon_name")}
              </span>
            </a>
            <p className="text-[var(--sub-foreground)] text-sm mt-4 max-w-[280px]">
              {t("hero_subtitle")}
            </p>
          </div>

          {/* Navigation / Social / Contact in one row */}
          <div className="grid grid-cols-1 w-full md:grid-cols-3 gap-10 md:gap-6">
            {/* Navigation */}
            <nav
              aria-label="Footer Navigation"
              className="flex flex-col items-center text-center md:items-start md:text-start"
              style={{ direction: isRTL ? "rtl" : "ltr" }}
            >
              <h3 className={cn(columnTitleClass, "flex items-center gap-2")}>
                {t("footer_navigation")}
              </h3>
              <ul className="space-y-[4px]">
                {navItems.map(({ id, label }) => (
                  <li
                    key={id}
                    onClick={() => handleSmoothScroll(id)}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleSmoothScroll(id);
                      }
                    }}
                    style={{ maxWidth: "max-content" }}
                  >
                    <HighlightHover
                      as="span"
                      barThickness={0.09}
                      gapRatio={0.03}
                      className="cursor-pointer text-sm"
                    >
                      {label}
                    </HighlightHover>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Social / Follow us */}
            <div className="flex flex-col items-center text-center md:items-start md:text-start">
              <h3 className={cn(columnTitleClass, "flex items-center gap-2")}>
                {t("footer_social")}
              </h3>
              <ul className="space-y-3 text-[var(--sub-foreground)] text-sm">
                <li>
                  <HighlightHover
                    as="a"
                    href="https://instagram.com/arde.shop_co"
                    target="_blank"
                    rel="noopener noreferrer"
                    barThickness={0.09}
                    gapRatio={0.03}
                    className="cursor-pointer inline-flex items-center gap-2"
                  >
                    <Instagram className="w-4 h-4 shrink-0" />
                    @arde.shop_co
                  </HighlightHover>
                </li>
                <li>
                  <HighlightHover
                    as="a"
                    href="mailto:hola.arde.shop@gmail.com"
                    barThickness={0.09}
                    gapRatio={0.03}
                    className="cursor-pointer inline-flex items-center gap-2"
                  >
                    <Mail className="w-4 h-4 shrink-0" />
                    hola.arde.shop@gmail.com
                  </HighlightHover>
                </li>
                <li className="text-[var(--sub-foreground)] inline-flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 shrink-0" />
                  WhatsApp y Telegram muy pronto
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div className="flex flex-col items-center text-center md:items-start md:text-start">
              <h3 className={cn(columnTitleClass, "flex items-center gap-2")}>
                {t("footer_contact")}
              </h3>
              <div
                className="flex items-center gap-2 mb-2"
                style={{ width: "100%" }}
              >
                <Instagram className="w-4 h-4 shrink-0 text-[var(--sub-foreground)]" />
                <HighlightHover
                  as="a"
                  href="https://instagram.com/arde.shop_co"
                  target="_blank"
                  rel="noopener noreferrer"
                  barThickness={0.09}
                  gapRatio={0.03}
                  className="text-[var(--sub-foreground)] cursor-pointer"
                  style={{ direction: "ltr" }}
                >
                  @arde.shop_co
                </HighlightHover>
              </div>
              <div
                className="flex items-center gap-2 mb-2"
                style={{ width: "100%" }}
              >
                <Mail className="w-4 h-4 shrink-0 text-[var(--sub-foreground)]" />
                <HighlightHover
                  as="a"
                  href="mailto:hola.arde.shop@gmail.com"
                  barThickness={0.09}
                  gapRatio={0.03}
                  className="text-[var(--sub-foreground)] cursor-pointer"
                  style={{ direction: "ltr" }}
                >
                  hola.arde.shop@gmail.com
                </HighlightHover>
              </div>
              <p
                className="text-[var(--sub-foreground)] text-sm"
                style={{
                  lineHeight: 1.8,
                  width: "100%",
                }}
              >
                {t("salon_address_line3")}
              </p>
            </div>
          </div>

          <div
            style={{
              height: "1px",
              width: "100%",
              backgroundColor: "var(--button-border-color)",
            }}
          />
          <div className="text-center text-[var(--sub-foreground)] text-sm pb-8">
            <p>
              © {new Date().getFullYear()} {t("salon_name")}.{" "}
              {t("footer_tagline")}
            </p>
          </div>
        </div>
      </LimitedWidthWrapper>
    </footer>
  );
}