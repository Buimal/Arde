"use client";

import * as React from "react";
import { useRef, useEffect, useState, useCallback } from "react";
import Navbar, { NavItem } from "@/components/CustomizedTruncatingNavbar";
import {
  Sparkles,
  Info,
  MessageSquareQuote,
  Store as StoreIcon,
  HomeIcon,
  HelpCircle,
  ShoppingBag,
} from "lucide-react";
import useIsRTL from "@/hooks/useIsRTL";
import { useTranslation } from "@/context/app-context";
import LimitedWidthWrapper from "@/components/limited-width-wrapper";
import UnblurringWrapper from "@/components/unblurringWrapper";
import HeroSection from "@/components/sections/hero/HeroSection";
import MobileHeroSection from "@/components/sections/hero/MobileHeroSection";
import ServicesSection from "@/components/sections/services/ServicesSection";
import TestimonialsSection from "@/components/sections/testimonials/TestimonialsSection";
import MobileTestimonialsSection from "@/components/sections/testimonials/MobileTestimonialsSection";
import StoreSection from "@/components/sections/store/StoreSection";
import AboutUsSection from "@/components/sections/about-us/AboutUsSection";
import MobileAboutUsSection from "@/components/sections/about-us/MobileAboutUsSection";
import FAQSection from "@/components/sections/faq/FAQSection"
import ContactModal from "@/components/ContactModal";
import CartModal from "@/components/CartModal";
import { useApp } from "@/context/app-context";
import { useIsMobile } from "@/hooks/use-mobile";
import EnhancedFooter from "@/components/EnhancedFooter";

const HEIGHT_MIN = 800;
const HEIGHT_MAX = 912;

const LARGE_SETTINGS = {
  CONTENT_MAX_WIDTH: "1448px",
  NAVBAR_PADDING_DESKTOP: 24,
  NAVBAR_PADDING_MOBILE: 10,
  CONTENT_PADDING_DESKTOP: 48,
  CONTENT_PADDING_MOBILE: 20,
};

const SMALL_SETTINGS = {
  CONTENT_MAX_WIDTH: "1306px",
  NAVBAR_PADDING_DESKTOP: 16,
  NAVBAR_PADDING_MOBILE: 10,
  CONTENT_PADDING_DESKTOP: 40,
  CONTENT_PADDING_MOBILE: 20,
};

function lerp(min: number, max: number, t: number) {
  return min + (max - min) * t;
}

function Section({
  id,
  bg,
  height,
  maxWidth,
  paddingDesktop,
  paddingMobile,
  children,
}: {
  id: string;
  bg: string;
  height: string;
  maxWidth: string;
  paddingDesktop: string;
  paddingMobile: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      id={id}
      style={{
        background: bg,
        minHeight: height,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <LimitedWidthWrapper
        expandToFull={false}
        maxWidth={maxWidth}
        paddingDesktop={paddingDesktop}
        paddingMobile={paddingMobile}
      >
        {children || id}
      </LimitedWidthWrapper>
    </div>
  );
}

function SectionWithExternalWidthLimiter({
  id,
  bg,
  height,
  children,
}: {
  id: string;
  bg: string;
  height: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      id={id}
      style={{
        background: bg,
        minHeight: height,
        position: "relative",
      }}
      className="flex flex-col"
    >
      {children}
    </div>
  );
}

export default function HomePage() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isRTL = useIsRTL();
  const { lang } = useApp();
  const [animationKey, setAnimationKey] = useState(0);
  const [windowHeight, setWindowHeight] = useState(
    typeof window !== "undefined" ? window.innerHeight : HEIGHT_MAX
  );
  const isMobile = useIsMobile();

  const [showContactModal, setShowContactModal] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false);
  const [storeProductToOpen, setStoreProductToOpen] = useState<string | null>(null);
  const { cartCount } = useApp();

  useEffect(() => {
    setAnimationKey((v) => v + 1);
  }, [lang]);

  useEffect(() => {
    function onResize() {
      setWindowHeight(window.innerHeight);
    }
    window.addEventListener("resize", onResize);
    onResize();
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const t =
    windowHeight >= HEIGHT_MAX
      ? 1
      : windowHeight <= HEIGHT_MIN
      ? 0
      : (windowHeight - HEIGHT_MIN) / (HEIGHT_MAX - HEIGHT_MIN);

  const NAVBAR_PADDING_DESKTOP = `${lerp(
    SMALL_SETTINGS.NAVBAR_PADDING_DESKTOP,
    LARGE_SETTINGS.NAVBAR_PADDING_DESKTOP,
    t
  )}px`;

  const NAVBAR_PADDING_MOBILE = `${lerp(
    SMALL_SETTINGS.NAVBAR_PADDING_MOBILE,
    LARGE_SETTINGS.NAVBAR_PADDING_MOBILE,
    t
  )}px`;

  const CONTENT_PADDING_DESKTOP = `${lerp(
    SMALL_SETTINGS.CONTENT_PADDING_DESKTOP,
    LARGE_SETTINGS.CONTENT_PADDING_DESKTOP,
    t
  )}px`;

  const CONTENT_PADDING_MOBILE = `${lerp(
    SMALL_SETTINGS.CONTENT_PADDING_MOBILE,
    LARGE_SETTINGS.CONTENT_PADDING_MOBILE,
    t
  )}px`;

  function interpolatePx(minPxStr: string, maxPxStr: string, t: number) {
    const minPx = parseInt(minPxStr, 10);
    const maxPx = parseInt(maxPxStr, 10);
    const val = Math.round(lerp(minPx, maxPx, t));
    return `${val}px`;
  }

  const CONTENT_MAX_WIDTH = interpolatePx(
    SMALL_SETTINGS.CONTENT_MAX_WIDTH,
    LARGE_SETTINGS.CONTENT_MAX_WIDTH,
    t
  );

  const transl = useTranslation();

  const navItems: NavItem[] = [
    { id: "hero", label: transl("section_label_hero"), icon: <HomeIcon />, targetId: "hero" },
    { id: "productos", label: transl("services_title"), icon: <Sparkles />, targetId: "productos" },
    { id: "testimonials", label: transl("testimonials_title"), icon: <MessageSquareQuote />, targetId: "testimonials" },
    { id: "store", label: transl("store_title"), icon: <StoreIcon />, targetId: "store" },
    { id: "about", label: transl("about_us_title"), icon: <Info />, targetId: "about" },
    { id: "faq", label: transl("faq_title"), icon: <HelpCircle />, targetId: "faq" },
  ];

  const handleButtonClick = useCallback((buttonKey: "schedule" | "explore") => {
    if (buttonKey === "explore" && scrollContainerRef.current) {
      const target = document.getElementById("productos");
      if (target) {
        scrollContainerRef.current.scrollTo({
          top: target.offsetTop,
          behavior: "smooth",
        });
      }
    }
    if (buttonKey === "schedule") {
      setShowContactModal(true);
    }
  }, []);

  const handleProductClick = useCallback((serviceId: string) => {
    setStoreProductToOpen(serviceId);
    if (scrollContainerRef.current) {
      const target = document.getElementById("store");
      if (target) {
        scrollContainerRef.current.scrollTo({
          top: target.offsetTop,
          behavior: "smooth",
        });
      }
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[var(--background)]">
      <UnblurringWrapper key={animationKey} delay={1.2} duration={0.45}>
        <div className="flex flex-col min-h-screen bg-[var(--background)]">
          <div
            id="page-scroll-container"
            ref={scrollContainerRef}
            className="flex-grow overflow-y-auto overflow-x-hidden h-screen"
          >
            <div id="hero-anchor" style={{ height: 0, margin: 0, padding: 0 }} />
            <div className="sticky top-0 z-[1000] w-full bg-transparent">
              <LimitedWidthWrapper
                expandToFull={false}
                maxWidth={CONTENT_MAX_WIDTH}
                paddingDesktop={NAVBAR_PADDING_DESKTOP}
                paddingMobile={NAVBAR_PADDING_MOBILE}
              >
                <Navbar
                  navItems={navItems}
                  isRTL={isRTL}
                  isMobile={isMobile}
                  scrollContainerRef={scrollContainerRef}
                />
              </LimitedWidthWrapper>
            </div>
            <main className="flex-1">
              <Section
                  id="hero"
                  bg="transparent"
                  height="auto"
                  maxWidth={CONTENT_MAX_WIDTH}
                  paddingDesktop={CONTENT_PADDING_DESKTOP}
                  paddingMobile={CONTENT_PADDING_MOBILE}
                >
                {isMobile ? (
                  <MobileHeroSection onButtonClick={handleButtonClick} />
                ) : (
                  <HeroSection
                    scrollContainerRef={scrollContainerRef}
                    onButtonClick={handleButtonClick}
                  />
                )}
              </Section>
              <div style={{ height: "2px" }} />
              <SectionWithExternalWidthLimiter
                id="productos"
                bg="#0a0a0a"
                height="auto"
              >
                <ServicesSection
                  id="productos"
                  maxWidth={CONTENT_MAX_WIDTH}
                  paddingDesktop={CONTENT_PADDING_DESKTOP}
                  paddingMobile={CONTENT_PADDING_MOBILE}
                  onServiceClick={handleProductClick}
                />
              </SectionWithExternalWidthLimiter>
              <div className="h-[2px] bg-[#0a0a0a]" />
              <Section
                id="testimonials"
                bg="#0a0a0a"
                height="auto"
                maxWidth={CONTENT_MAX_WIDTH}
                paddingDesktop={CONTENT_PADDING_DESKTOP}
                paddingMobile={CONTENT_PADDING_MOBILE}
              >
                {isMobile ? (
                  <MobileTestimonialsSection />
                ) : (
                  <TestimonialsSection />
                )}
              </Section>
              <div className="h-[2px] bg-[#0a0a0a]" />
              <SectionWithExternalWidthLimiter
                id="store"
                bg="transparent"
                height="auto"
              >
                <StoreSection
                  maxWidth={CONTENT_MAX_WIDTH}
                  paddingDesktop={CONTENT_PADDING_DESKTOP}
                  paddingMobile={CONTENT_PADDING_MOBILE}
                  onViewBag={() => setShowCartModal(true)}
                  openProductId={storeProductToOpen}
                  onProductOpened={() => setStoreProductToOpen(null)}
                />
              </SectionWithExternalWidthLimiter>
              <div className="h-[2px]" />
              {isMobile ? (
                <Section
                    id="about"
                    bg="#0a0a0a"
                    height="auto"
                    maxWidth={CONTENT_MAX_WIDTH}
                    paddingDesktop={CONTENT_PADDING_DESKTOP}
                    paddingMobile={CONTENT_PADDING_MOBILE}
                  >
                  <MobileAboutUsSection onButtonClick={handleButtonClick} />
                </Section>
              ) : (
                <>
<Section
                    id="about"
                    bg="#0a0a0a"
                    height="auto"
                    maxWidth={CONTENT_MAX_WIDTH}
                    paddingDesktop={CONTENT_PADDING_DESKTOP}
                    paddingMobile={CONTENT_PADDING_MOBILE}
                  >
                    <AboutUsSection onButtonClick={handleButtonClick} />
                  </Section>
                  <div className="h-[2px] bg-[#0a0a0a]" />
                </>
              )}
              <SectionWithExternalWidthLimiter
                id="faq"
                bg="transparent"
                height="auto"
              >
                <FAQSection
                  maxWidth={CONTENT_MAX_WIDTH}
                  paddingDesktop={CONTENT_PADDING_DESKTOP}
                  paddingMobile={CONTENT_PADDING_MOBILE}
                />
              </SectionWithExternalWidthLimiter>
              <SectionWithExternalWidthLimiter
                id="irrelevant"
                bg="#0a0a0a"
                height="auto"
              >
                <EnhancedFooter
                  navItems={navItems}
                  maxWidth={CONTENT_MAX_WIDTH}
                  paddingDesktop={CONTENT_PADDING_DESKTOP}
                  paddingMobile={CONTENT_PADDING_MOBILE}
                  isMobile={isMobile}
                  isRTL={isRTL}
                />
              </SectionWithExternalWidthLimiter>
            </main>
          </div>
          <ContactModal
            isOpen={showContactModal}
            onClose={() => setShowContactModal(false)}
          />
          <CartModal
            isOpen={showCartModal}
            onClose={() => setShowCartModal(false)}
          />
          {cartCount > 0 && (
            <button
              onClick={() => setShowCartModal(true)}
              className="fixed bottom-6 right-6 z-[1001] flex items-center gap-2 rounded-full px-4 py-3 font-bold shadow-lg"
              style={{
                backgroundColor: "var(--accent)",
                color: "var(--foreground)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.filter = "brightness(1.1)")}
              onMouseLeave={(e) => (e.currentTarget.style.filter = "none")}
              aria-label="Ver bolsa"
            >
              <ShoppingBag size={18} />
              {cartCount}
            </button>
          )}
        </div>
      </UnblurringWrapper>
    </div>
  );
}