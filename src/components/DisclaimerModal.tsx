"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CustomCheckbox from "@/components/CustomCheckbox";
import ChronicleButton from "@/components/RefinedChronicleButton";

interface DisclaimerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
}

const FICTIONAL_PURPOSES_TEXT =
  "All content — including names, services, descriptions, categories, prices, staff profiles, testimonials, product titles, product details, business information, contact data, addresses, and schedules — is entirely fictional and used solely for demonstration purposes.";

const CURRENCY_NOTE =
  "Currency signs and symbols are included purely for demonstrational and formatting purposes. They do not reflect actual market values, commercial rates, or monetary offers.";

const COINCIDENCE_TEXT_GENERAL =
  "Any resemblance to actual persons, businesses, products, brands, prices, services, testimonials, locations, or other entities is entirely coincidental and unintentional.";

const COINCIDENCE_TEXT_SPECIFIC = (value: string) =>
  `Any resemblance to the existing ${value} is entirely coincidental and unintentional.`;

export default function DisclaimerModal({
  isOpen,
  onClose,
  onAccept,
}: DisclaimerModalProps) {
  const [isChecked, setIsChecked] = useState(false);
  const [isBlocked, setIsBlocked] = useState(true);

  useEffect(() => {
    setIsBlocked(!isChecked);
  }, [isChecked]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          dir="ltr"
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="disclaimer-modal-title"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 100 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            style={{
              width: "min(540px, 90vw)",
              maxWidth: 540,
              borderRadius: 8,
              backgroundColor: "#111",
              border: "1px solid var(--button-border-color)",
              display: "flex",
              flexDirection: "column",
              maxHeight: "80vh",
              overflow: "hidden",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <section
              className="px-6 py-6 text-[var(--foreground)] text-sm"
              style={{
                lineHeight: 1.7,
                overflowY: "auto",
                borderRadius: 8,
                scrollbarWidth: "thin",
                scrollbarColor: "var(--accent) var(--scrolbar-track-color)",
              }}
            >
              <h2
                id="disclaimer-modal-title"
                className="text-[24px] font-semibold mb-5 text-center select-none"
                style={{ userSelect: "none" }}
              >
                Disclaimer
              </h2>

              <p className="mb-4">{FICTIONAL_PURPOSES_TEXT}</p>
              <p className="mb-4">
                All service names and descriptions are fictional examples created
                to simulate a beauty salon website. Scheduling, booking slots, and
                master profiles are fabricated for layout demonstration and have no
                real validity.
              </p>
              <p className="mb-4">
                All master or staff profiles, including names, specializations,
                portraits, and biographies, are fabricated. They do not represent
                real individuals, and no qualifications or professional affiliations
                are implied.
              </p>
              <p className="mb-4">
                All product listings, images, names, categories, packaging
                descriptions, old and new prices, and volumes are placeholders used
                to illustrate a store section. None correspond to actual goods
                available for sale.
              </p>
              <p className="mb-4">{CURRENCY_NOTE}</p>
              <p className="mb-4">
                All textual narrative sections — including "About Us" — are entirely
                fabricated and do not describe real events, establishments, or
                people.
              </p>
              <p className="mb-4">
                All customer testimonials, ratings, identities, and quotes are
                fictional and were created to demonstrate testimonial and feedback
                interface elements.
              </p>
              <p className="mb-4">
                This website does not provide commercial offers, booking
                capabilities, or real transactions. Any reservation or payment step
                shown is a simulated interface only. Visitors should not submit
                personal or sensitive information on this site.
              </p>
              <p className="mb-4">
                All design assets, icons, layouts, and textual content are presented
                for conceptual and demonstrational use by developers, UI designers,
                and students. They do not constitute contractual terms or
                solicitations.
              </p>

              <p className="mb-4">{COINCIDENCE_TEXT_GENERAL}</p>
              <p className="mb-4">{COINCIDENCE_TEXT_SPECIFIC("salon")}</p>
              <p className="mb-4">
                {COINCIDENCE_TEXT_SPECIFIC("staff, masters, products, and customer testimonials")}
              </p>

              <p className="mb-4">
                All contact details — including phone numbers, email addresses,
                locations, and business hours — are fictional placeholders and not
                linked to any real-world company or venue. The address shown is used
                solely for design demonstration
              </p>

              <div className="flex items-center space-x-3 mb-6 select-none cursor-pointer">
                <CustomCheckbox
                  accentColor="var(--accent)"
                  borderWidth={1.5}
                  labelFontSize={15}
                  labelSpacing={10}
                  checked={isChecked}
                  onChange={setIsChecked}
                  label="I acknowledge I have read and understood this disclaimer."
                  direction="ltr"
                />
              </div>

              <ChronicleButton
                onClick={onAccept}
                disabled={isBlocked}
                className="w-full max-w-[480px]"
                variant="default"
                backgroundColor="var(--foreground)"
                hoverBackgroundColor="var(--accent)"
                textColor="var(--background)"
                hoverTextColor="var(--foreground)"
                borderVisible={false}
                borderRadius="var(--button-border-radius)"
                fontWeight={700}
                buttonHeight="2.75rem"
                width="100%"
                type="button"
              >
                Continue
              </ChronicleButton>
            </section>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}