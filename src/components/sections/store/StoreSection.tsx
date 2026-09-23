"use client";
import React, { useEffect, useRef, useState, useMemo } from "react";
import { ShoppingBag } from "lucide-react";
import { useApp } from "@/context/app-context";
import { useIsMobile } from "@/hooks/use-mobile";
import useIsRTL from "@/hooks/useIsRTL";
import SectionText from "@/components/SectionText";
import LimitedWidthWrapper from "@/components/limited-width-wrapper";
import InflectedCard, { InflectedCardProps, Tag } from "@/components/InflectedCard";
import ProductModal, { ProductInfo } from "@/components/ProductModal";
import { getProducts, formatCurrency } from "@/lib/products";

interface StoreSectionProps {
  maxWidth: string;
  paddingDesktop: string;
  paddingMobile: string;
  onViewBag?: () => void;
  openProductId?: string | null;
  onProductOpened?: () => void;
}

const PRODUCTS_RAW = getProducts(false);

export default function StoreSection({
  maxWidth,
  paddingDesktop,
  paddingMobile,
  onViewBag,
  openProductId,
  onProductOpened,
}: StoreSectionProps) {
  const { t, addToCart, cartCount } = useApp();
  const isMobile = useIsMobile();
  const isRTL = useIsRTL();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<ProductInfo | null>(null);
  const [containerWidth, setContainerWidth] = useState(1200);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );
  const minBreakpoint = 694;

  useEffect(() => {
    if (!sectionRef.current) return;
    const update = () => {
      setContainerWidth(sectionRef.current!.getBoundingClientRect().width || 1200);
    };
    update();
    const observer = new window.ResizeObserver(update);
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [sectionRef]);

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }
    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
      handleResize();
    }
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, []);

  useEffect(() => {
    if (!openProductId) return;
    const p = PRODUCTS_RAW.find((x) => x.id === openProductId);
    if (!p) return;
    const currencySymbol = t("currency_symbol") || "$";
    setSelected({
      id: p.id,
      title: p.name,
      description: p.description,
      category: p.category,
      volume: p.volume,
      price: formatCurrency(p.price, currencySymbol),
      oldPrice: p.oldPrice != null ? formatCurrency(p.oldPrice, currencySymbol) : undefined,
      image: p.imageUrl,
    });
    onProductOpened?.();
  }, [openProductId, t, onProductOpened]);

  let cardsPerRow = 3;
  let gapPx = 16;
  if (isMobile) {
    gapPx = 12;
    cardsPerRow = windowWidth < minBreakpoint ? 1 : 2;
  }

  const products: InflectedCardProps[] = useMemo(() => {
    const currencySymbol = t("currency_symbol") || "$";
    return [...PRODUCTS_RAW]
      .sort((a, b) => (a.featured === b.featured ? 0 : a.featured ? -1 : 1))
      .map((p) => {
        const tags: Tag[] = [
          {
            name: p.category,
            textColor: "var(--foreground)",
            backgroundColor: "var(--accent)",
            rounding: 8,
            tagHoverBrightness: 0.19,
          },
          {
            name: p.volume,
            textColor: "var(--background)",
            backgroundColor: "var(--foreground)",
            rounding: 8,
            tagHoverBrightness: 0.76,
          },
        ];
        return {
          id: p.id,
          image: p.imageUrl,
          title: p.name,
          description: p.description,
          tags,
          parentBackgroundColor: "var(--background)",
          fontSizes: {
            title: "21px",
            description: "15px",
            tags: "13px",
            price: "16px",
          },
          colors: {
            title: "var(--foreground)",
            description: "var(--middle-foreground)",
          },
          priceTagRounding: "12px",
          oldPriceTextColor: "var(--sub-foreground)",
          priceTagTextColor: "var(--foreground)",
          titleLineClamp: 1,
          // Remove descriptionLineClamp when cardsPerRow is 1 (one item per line)
          ...(cardsPerRow === 1 ? {} : { descriptionLineClamp: 2 }),
          buttonIcon: <ShoppingBag />,
          mirrored: isRTL,
          imageHoverZoom: 1.3,
          ...(isMobile
            ? {}
            : {
                useAspectRatio: true,
                aspectRatio: "160/91",
              }),
          buttonIconColor: "var(--background)",
          buttonIconHoverColor: "var(--foreground)",
          buttonBackgroundColor: "var(--foreground)",
          buttonBackgroundHoverColor: "var(--accent)",
          ...(isRTL
            ? {
                titleAlignment: "right",
                descriptionAlignment: "right",
            }
            : {}),
          price: formatCurrency(p.price, currencySymbol),
          oldPrice: p.oldPrice != null ? formatCurrency(p.oldPrice, currencySymbol) : undefined,
        };
      });
  }, [t, isRTL, isMobile, cardsPerRow]);

  return (
    <section
      ref={sectionRef}
      className={`relative overflow-hidden flex flex-col transition duration-300 ease-in-out ${
        isMobile ? "justify-start min-h-0 py-14" : "py-20"
      }`}
    >
      <LimitedWidthWrapper
        expandToFull={false}
        maxWidth={maxWidth}
        paddingDesktop={paddingDesktop}
        paddingMobile={paddingMobile}
      >
        <SectionText
          title={t("store_title")}
          description={t("store_description")}
          isRTL={isRTL}
        />
        <div style={{ display: "flex", justifyContent: "center", marginTop: 14 }}>
          <button
            onClick={onViewBag}
            className="flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold text-[var(--foreground)] transition-colors"
            style={{ borderColor: "var(--button-border-color)" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "var(--accent)";
              e.currentTarget.style.borderColor = "var(--accent)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.borderColor = "var(--button-border-color)";
            }}
          >
            <ShoppingBag size={16} />
            Bolsa
            {cartCount > 0 && (
              <span
                className="rounded-full px-2 py-0.5 text-xs font-bold"
                style={{ backgroundColor: "var(--accent)", color: "var(--foreground)" }}
              >
                {cartCount}
              </span>
            )}
          </button>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${cardsPerRow}, minmax(0, 1fr))`,
            gap: `${gapPx}px`,
            marginTop: isMobile ? 24 : 50,
            marginBottom: 16,
          }}
        >
          {products.map((card) => (
            <InflectedCard
              key={card.id}
              {...card}
              onClick={(target, id) => {
                const p = products.find((c) => c.id === id);
                if (!p) return;
                if (target === "button") {
                  addToCart({ id: p.id, title: p.title, price: p.price ?? "", image: p.image });
                } else {
                  setSelected({
                    id: p.id,
                    title: p.title,
                    description: p.description,
                    category: (p.tags?.[0]?.name || ""),
                    volume: (p.tags?.[1]?.name || ""),
                    price: p.price ?? "",
                    oldPrice: p.oldPrice,
                    image: p.image,
                  });
                }
              }}
            />
          ))}
        </div>
      </LimitedWidthWrapper>
      <ProductModal
        product={selected}
        onClose={() => setSelected(null)}
        onViewBag={() => {
          setSelected(null);
          onViewBag?.();
        }}
      />
    </section>
  );
}
