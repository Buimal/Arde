"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy, Mail, MessageCircle, Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { ModalOverlay } from "@/components/modal-overlay";
import { useApp } from "@/context/app-context";
import { useIsMobile } from "@/hooks/use-mobile";

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const parsePrice = (price: string) => parseFloat(price.replace(/[^\d.]/g, "")) || 0;

export default function CartModal({ isOpen, onClose }: CartModalProps) {
  const { cart, cartCount, setCartQty, clearCart } = useApp();
  const isMobile = useIsMobile();
  const [copied, setCopied] = useState(false);

  const total = cart.reduce((sum, line) => sum + parsePrice(line.price) * line.qty, 0);
  const totalText = `$${total.toLocaleString("es-CO", { maximumFractionDigits: 0 })}`;

  const orderItemsText = cart
    .map((line) => `${line.qty}× ${line.title} (${line.price})`)
    .join(", ");

  const message = `Hola Arde 👋 Quiero pedir: ${orderItemsText}. Total: ${totalText}.`;

  const whatsappHref = `https://wa.me/573000000000?text=${encodeURIComponent(message)}`;
  const emailHref = `mailto:hola.arde.shop@gmail.com?subject=${encodeURIComponent(
    "Pedido Arde"
  )}&body=${encodeURIComponent(message)}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* ignore */
    }
  };

  React.useEffect(() => {
    if (isOpen) setCopied(false);
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <ModalOverlay onClose={onClose}>
          <motion.div
            key="cart-modal"
            initial={{ opacity: 0, scale: 0.95, y: isMobile ? 60 : 0 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: isMobile ? 60 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            onClick={(e) => e.stopPropagation()}
            className="relative rounded-xl border bg-[var(--background)] w-full max-h-[88vh] overflow-y-auto"
            style={{ borderColor: "var(--button-border-color)", maxWidth: 460 }}
          >
            <button
              onClick={onClose}
              className="absolute top-3 right-3 z-10 p-2 rounded-md text-[var(--sub-foreground)] hover:text-[var(--foreground)] transition-colors"
              aria-label="Cerrar"
            >
              <X size={20} />
            </button>

            <div className="px-6 py-6">
              <h2 className="flex items-center gap-2 text-xl font-bold text-[var(--foreground)]">
                <ShoppingBag size={20} className="text-[var(--accent)]" />
                Tu bolsa
                {cartCount > 0 && (
                  <span
                    className="rounded-full px-2.5 py-0.5 text-xs font-bold"
                    style={{ backgroundColor: "var(--accent)", color: "var(--foreground)" }}
                  >
                    {cartCount} {cartCount === 1 ? "producto" : "productos"}
                  </span>
                )}
              </h2>

              {cart.length === 0 ? (
                <p className="mt-6 text-center text-sm text-[var(--sub-foreground)]">
                  Tu bolsa está vacía.
                </p>
              ) : (
                <>
                  <div className="mt-5 flex flex-col gap-3">
                    {cart.map((line) => (
                      <div
                        key={line.id}
                        className="flex items-center gap-3 rounded-lg border px-3 py-3"
                        style={{ borderColor: "var(--button-border-color)" }}
                      >
                        {line.image ? (
                          <div className="w-12 h-12 shrink-0 overflow-hidden rounded-md">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={line.image}
                              alt={line.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-12 h-12 shrink-0 rounded-md bg-[var(--foreground)]" />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-[var(--foreground)] truncate">
                            {line.title}
                          </p>
                          <p className="text-xs text-[var(--sub-foreground)]">
                            {line.price} × {line.qty} = ${line.qty * parsePrice(line.price)}
                          </p>
                        </div>
                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            onClick={() => setCartQty(line.id, line.qty - 1)}
                            className="flex h-7 w-7 items-center justify-center rounded-md border text-[var(--foreground)]"
                            style={{ borderColor: "var(--button-border-color)" }}
                            aria-label="Quitar uno"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-7 text-center text-sm font-bold text-[var(--foreground)]">
                            {line.qty}
                          </span>
                          <button
                            onClick={() => setCartQty(line.id, line.qty + 1)}
                            className="flex h-7 w-7 items-center justify-center rounded-md border text-[var(--foreground)]"
                            style={{ borderColor: "var(--button-border-color)" }}
                            aria-label="Agregar uno"
                          >
                            <Plus size={14} />
                          </button>
                          <button
                            onClick={() => setCartQty(line.id, 0)}
                            className="ml-1 flex h-7 w-7 items-center justify-center rounded-md text-[var(--sub-foreground)] hover:text-[var(--accent)] transition-colors"
                            aria-label="Eliminar"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 flex items-center justify-between border-t pt-4"
                    style={{ borderColor: "var(--button-border-color)" }}>
                    <span className="text-sm font-semibold text-[var(--sub-foreground)]">Total</span>
                    <span className="text-xl font-bold text-[var(--foreground)]">{totalText}</span>
                  </div>

                  <div className="mt-4">
                    <label className="text-xs font-semibold text-[var(--sub-foreground)]">
                      Descripción del pedido para el checkout
                    </label>
                    <textarea
                      readOnly
                      value={message}
                      rows={3}
                      className="mt-1 w-full resize-none rounded-lg border bg-transparent px-3 py-2 text-sm text-[var(--foreground)]"
                      style={{ borderColor: "var(--button-border-color)" }}
                    />
                    <div className="mt-2 flex items-center gap-2">
                      <button
                        onClick={handleCopy}
                        className="flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-xs font-semibold text-[var(--foreground)]"
                        style={{ borderColor: "var(--button-border-color)" }}
                      >
                        {copied ? <Check size={14} /> : <Copy size={14} />}
                        {copied ? "¡Copiado!" : "Copiar"}
                      </button>
                    </div>
                  </div>

                  <div className="mt-5 flex flex-col gap-3">
                    <a
                      href={whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 rounded-lg px-4 py-3 font-bold transition-colors"
                      style={{ backgroundColor: "var(--accent)", color: "var(--foreground)" }}
                      onMouseEnter={(e) => (e.currentTarget.style.filter = "brightness(1.1)")}
                      onMouseLeave={(e) => (e.currentTarget.style.filter = "none")}
                    >
                      <MessageCircle size={18} />
                      Enviar pedido por WhatsApp
                    </a>
                    <a
                      href={emailHref}
                      className="flex items-center justify-center gap-2 rounded-lg border px-4 py-3 font-bold text-[var(--foreground)]"
                      style={{ borderColor: "var(--button-border-color)" }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "var(--foreground)";
                        e.currentTarget.style.color = "var(--background)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "transparent";
                        e.currentTarget.style.color = "var(--foreground)";
                      }}
                    >
                      <Mail size={18} />
                      Enviar por correo
                    </a>
                    <button
                      onClick={clearCart}
                      className="text-sm text-[var(--sub-foreground)] hover:text-[var(--accent)] transition-colors"
                    >
                      Vaciar bolsa
                    </button>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </ModalOverlay>
      )}
    </AnimatePresence>
  );
}