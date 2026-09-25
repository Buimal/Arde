"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ShoppingBag, X } from "lucide-react";
import { ModalOverlay } from "@/components/modal-overlay";
import { useApp } from "@/context/app-context";
import { useIsMobile } from "@/hooks/use-mobile";
import { asset } from "@/lib/assets";

export interface ProductInfo {
  id: string;
  title: string;
  description: string;
  category: string;
  volume: string;
  price: string;
  oldPrice?: string;
  image?: string;
}

interface ProductModalProps {
  product: ProductInfo | null;
  onClose: () => void;
  onViewBag: () => void;
}

export default function ProductModal({
  product,
  onClose,
  onViewBag,
}: ProductModalProps) {
  const { addToCart } = useApp();
  const isMobile = useIsMobile();
  const [added, setAdded] = useState(false);

  // Reset "added" state whenever a new product is opened
  React.useEffect(() => {
    setAdded(false);
  }, [product?.id]);

  if (!product) return null;

  const handleAdd = () => {
    addToCart({ id: product.id, title: product.title, price: product.price, image: product.image });
    setAdded(true);
  };

  const numericPrice = parseFloat(product.price.replace(/[^\d.]/g, "")) || 0;

  return (
    <AnimatePresence>
      <ModalOverlay onClose={onClose}>
        <motion.div
          key="product-modal"
          initial={{ opacity: 0, scale: 0.95, y: isMobile ? 60 : 0 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: isMobile ? 60 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          onClick={(e) => e.stopPropagation()}
          className="relative rounded-xl border bg-[var(--background)] w-full max-h-[88vh] overflow-y-auto"
          style={{ borderColor: "var(--button-border-color)", maxWidth: 440 }}
        >
          <button
            onClick={onClose}
            className="absolute top-3 right-3 z-10 p-2 rounded-md bg-[rgba(0,0,0,0.55)] text-[var(--foreground)] hover:text-[var(--accent)] transition-colors"
            aria-label="Cerrar"
          >
            <X size={20} />
          </button>

          {product.image && (
            <div className="relative w-full aspect-[4/3] overflow-hidden rounded-t-xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={asset(product.image)}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="px-6 py-6">
            <div className="flex flex-wrap gap-2 mb-3">
              <span
                className="px-2.5 py-1 text-xs font-bold rounded-md"
                style={{ backgroundColor: "var(--accent)", color: "var(--foreground)" }}
              >
                {product.category}
              </span>
              <span
                className="px-2.5 py-1 text-xs font-bold rounded-md"
                style={{ backgroundColor: "var(--foreground)", color: "var(--background)" }}
              >
                {product.volume}
              </span>
            </div>

            <h2 className="text-xl font-bold text-[var(--foreground)]">{product.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-[var(--sub-foreground)]">
              {product.description}
            </p>

            <div className="mt-5 flex items-end gap-3">
              <span className="text-2xl font-bold text-[var(--foreground)]">
                {product.price}
              </span>
              {product.oldPrice && (
                <span className="text-sm font-bold line-through text-[var(--sub-foreground)]">
                  {product.oldPrice}
                </span>
              )}
            </div>

            {added ? (
              <div className="mt-5 flex flex-col gap-2">
                <div className="rounded-lg border px-4 py-3 text-center text-[var(--foreground)] font-semibold"
                  style={{ borderColor: "var(--button-border-color)" }}>
                  Agregado a la bolsa
                </div>
                <button
                  onClick={onViewBag}
                  className="rounded-lg px-4 py-3 font-bold transition-colors"
                  style={{ backgroundColor: "var(--accent)", color: "var(--foreground)" }}
                >
                  Ver bolsa ({product.price} c/u)
                </button>
              </div>
            ) : (
              <button
                onClick={handleAdd}
                className="mt-5 w-full flex items-center justify-center gap-2 rounded-lg px-4 py-3 font-bold transition-colors"
                style={{ backgroundColor: "var(--accent)", color: "var(--foreground)" }}
              >
                <ShoppingBag size={18} />
                Agregar a la bolsa · {product.price}
              </button>
            )}

            <div className="mt-3 text-center text-xs text-[var(--sub-foreground)]">
              {numericPrice > 0 && `${numericPrice}`.length > 0
                ? "El total se calcula en la bolsa."
                : null}
            </div>
          </div>
        </motion.div>
      </ModalOverlay>
    </AnimatePresence>
  );
}