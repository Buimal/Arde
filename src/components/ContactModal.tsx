"use client";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Instagram, Mail, MessageCircle, Send, X } from "lucide-react";
import { ModalOverlay } from "@/components/modal-overlay";
import { useApp } from "@/context/app-context";
import { useIsMobile } from "@/hooks/use-mobile";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CHANNELS = [
  {
    id: "instagram",
    icon: Instagram,
    labelKey: "contact_instagram",
    href: "https://instagram.com/arde.shop_co",
    sub: "@arde.shop_co",
  },
  {
    id: "email",
    icon: Mail,
    labelKey: "contact_email",
    href: "mailto:hola.arde.shop@gmail.com",
    sub: "hola.arde.shop@gmail.com",
  },
  {
    id: "whatsapp",
    icon: MessageCircle,
    labelKey: "contact_whatsapp",
    href: "https://wa.me/573000000000",
    sub: "Próximamente",
  },
  {
    id: "telegram",
    icon: Send,
    labelKey: "contact_telegram",
    href: "https://t.me/ardeshop_co",
    sub: "Próximamente",
  },
];

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const { t } = useApp();
  const isMobile = useIsMobile();

  return (
    <AnimatePresence>
      {isOpen && (
        <ModalOverlay onClose={onClose}>
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.95, y: isMobile ? 40 : 0 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: isMobile ? 40 : 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            onClick={(e) => e.stopPropagation()}
            className="relative rounded-xl border bg-[var(--background)] px-6 py-7 w-full max-h-[86vh] overflow-y-auto"
            style={{ borderColor: "var(--button-border-color)", maxWidth: 400 }}
          >
            <button
              onClick={onClose}
              className="absolute top-3 right-3 p-2 text-[var(--sub-foreground)] hover:text-[var(--foreground)] transition-colors"
              aria-label="Cerrar"
            >
              <X size={20} />
            </button>

            <h2
              className="text-xl font-bold text-[var(--foreground)] text-center"
              style={{ userSelect: "none" }}
            >
              {t("contact_modal_title")}
            </h2>
            <p className="mt-2 text-sm text-center text-[var(--sub-foreground)]">
              {t("contact_modal_subtitle")}
            </p>

            <div className="mt-6 flex flex-col gap-3">
              {CHANNELS.map(({ id, icon: Icon, labelKey, href, sub }) => (
                <a
                  key={id}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 rounded-lg border px-4 py-3 transition-colors group"
                  style={{
                    borderColor: "var(--button-border-color)",
                    backgroundColor: "transparent",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "var(--accent)";
                    e.currentTarget.style.borderColor = "var(--accent)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.borderColor = "var(--button-border-color)";
                  }}
                >
                  <span
                    className="flex h-10 w-10 items-center justify-center rounded-full shrink-0"
                    style={{ backgroundColor: "var(--foreground)" }}
                  >
                    <Icon size={20} className="text-[var(--background)]" />
                  </span>
                  <span className="flex flex-col min-w-0">
                    <span className="font-semibold text-[var(--foreground)]">
                      {t(labelKey)}
                    </span>
                    <span className="text-sm text-[var(--sub-foreground)]">
                      {sub}
                    </span>
                  </span>
                </a>
              ))}
            </div>
          </motion.div>
        </ModalOverlay>
      )}
    </AnimatePresence>
  );
}