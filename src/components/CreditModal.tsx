"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { ModalOverlay } from "@/components/modal-overlay";
import { useApp } from "@/context/app-context";
import { useIsMobile } from "@/hooks/use-mobile";
import ChronicleButton from "@/components/RefinedChronicleButton";
import useIsRTL from "@/hooks/useIsRTL";
import HighlightHover from "@/components/HighlightHover";

const creditsMarkdown = `
[Resizable Navbar](https://ui.aceternity.com/components/resizable-navbar) by [Aceternity UI](https://ui.aceternity.com/)

[Limelight Nav](https://21st.dev/easemize/limelight-nav/default) by [EaseMize UI](https://21st.dev/easemize)

[Chronicle Button](https://codepen.io/Haaguitos/pen/OJrVZdJ) by [Haaguitos](https://codepen.io/Haaguitos)

[Wheel Picker](https://21st.dev/ncdai/wheel-picker/default) by [Chánh Đại](https://21st.dev/ncdai)

[React Wheel Picker](https://www.npmjs.com/package/@ncdai/react-wheel-picker) by [Chánh Đại](https://github.com/ncdai)

[すりガラスなプロフィールカード](https://codepen.io/ash_creator/pen/zYaPZLB) by [あしざわ - Webクリエイター](https://codepen.io/ash_creator)

[Text Rotate](https://www.fancycomponents.dev/docs/components/text/text-rotate) by [Fancy Components](https://www.fancycomponents.dev/)

[GSAP (GreenSock Animation Platform)](https://www.npmjs.com/package/gsap)

[framer-motion](https://www.npmjs.com/package/framer-motion)

[motion](https://www.npmjs.com/package/motion)

[AnimateIcons](https://animateicons.vercel.app/)

[Hero Section 6](https://21st.dev/meschacirung/hero-section-6/default) by [Tailark](https://21st.dev/tailark)

[Modern Hero Section](https://21st.dev/ravikatiyar162/modern-hero-section/default) by [Ravi Katiyar](https://21st.dev/ravikatiyar)

[Travel section #tailwind #slick.js](https://codepen.io/kristen17/pen/bGxEqqj) by [Kristen](https://codepen.io/kristen17)

[Scroll Down Icon Animation](https://codepen.io/TKS31/pen/gOaKaxx) by [Tsukasa Aoki](https://codepen.io/TKS31)

[i18next](https://www.npmjs.com/package/i18next)

[Lucide React](https://www.npmjs.com/package/lucide-react)

[tabler-icons-react](https://www.npmjs.com/package/tabler-icons-react)

[Gooey Text Morphing](https://21st.dev/victorwelander/gooey-text-morphing/default) by [Victor Welander](https://21st.dev/victorwelander)

[Morphing Text](https://21st.dev/dillionverma/morphing-text/default) by [Magic UI](https://21st.dev/magicui)

[gsap/component ❍ Interactive Table with Image Hover & Idle Animation](https://codepen.io/filipz/pen/EaVNXmb) by [Filip Zrnzevic](https://codepen.io/filipz)

[Text scroll and hover effect with GSAP and clip](https://codepen.io/Juxtopposed/pen/mdQaNbG) by [Juxtopposed](https://codepen.io/Juxtopposed)

[Animate.css](https://github.com/animate-css/animate.css)

[Animated Testimonials](https://ui.aceternity.com/components/animated-testimonials) by [Aceternity UI](https://ui.aceternity.com/)

[Text Reveal Animation](https://codepen.io/swatiparge/pen/LYVMEag) by [Swati Parge](https://codepen.io/swatiparge)

[Bento Grid](https://ui.aceternity.com/components/bento-grid) by [Aceternity UI](https://ui.aceternity.com/)

[Lens](https://ui.aceternity.com/components/lens) by [Aceternity UI](https://ui.aceternity.com/)

[Profile Card Testimonial Carousel](https://21st.dev/arunachalam0606/profile-card-testimonial-carousel/default) by [Arunachalam](https://21st.dev/arunachalam0606)

[Custom Checkbox](https://21st.dev/Edil-ozi/custom-checkbox/default) by [Edil Ozi](https://21st.dev/Edil-ozi)

[チェックしないと押せないボタン](https://codepen.io/ash_creator/pen/JjZReNm) by [あしざわ - Webクリエイター](https://codepen.io/ash_creator)

[Coach Scheduling Card](https://21st.dev/isaiahbjork/coach-scheduling-card/default) by [Isaiah](https://21st.dev/isaiahbjork)

[Calendar](https://21st.dev/designali-in/calendar/default) by [Ali Imam](https://21st.dev/dalim)

[react-swipeable](https://www.npmjs.com/package/react-swipeable)

[Cards with inverted border-radius #scss](https://codepen.io/kristen17/pen/pomgrKp) by [Kristen](https://codepen.io/kristen17)

[Input Floating Label animation](https://codepen.io/Mahe76/pen/qBQgXyK) by [Elpeeda](https://codepen.io/Mahe76)

[Success Check Animation Pure CSS](https://codepen.io/istiaktridip/pen/BZqaOd) by [Istiak Tridip](https://codepen.io/istiaktridip)

[Inverted border-radius using CSS mask II](https://codepen.io/t_afif/pen/LEPBYvK) by [Temani Afif](https://codepen.io/t_afif)

[Accordion](https://21st.dev/molecule-lab-rushil/accordion/default) by [Molecule UI](https://21st.dev/molecule-ui)

[JTB studios - Link](https://codepen.io/zzznicob/pen/GRPgKLM) by [Nico](https://codepen.io/zzznicob)

[Hover Link Animation](https://21st.dev/erikvalencia1/hover-link-animation/default) by [Ruben](https://21st.dev/rubenerik)

[Multi Colored Text with CSS](https://codepen.io/TajShireen/pen/YzZmbep) by [Shireen Taj](https://codepen.io/TajShireen)

[vue-color-wheel](https://vue-color-wheel.vercel.app/) by [Robert Shaw](https://github.com/xiaoluoboding)

[404 galaxy not found](https://codepen.io/remid/pen/YOVawm) by [Rémi Denimal](https://codepen.io/remid)

Photo by [Majid Akbari](https://unsplash.com/@majidakbaripic?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash) on [Unsplash](https://unsplash.com/photos/woman-in-white-sleeveless-top-O_M1eZ3FHmY?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash)

Photo by [engin akyurt](https://unsplash.com/@enginakyurt?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash) on [Unsplash](https://unsplash.com/photos/woman-in-blue-shirt-holding-her-hair-35NAaB_Nmx8?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash)

Photo by [Farhad Ibrahimzade](https://unsplash.com/@ferhadd?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash) on [Unsplash](https://unsplash.com/photos/a-woman-laying-on-top-of-a-bed-holding-a-hair-dryer-szpFxaqS658?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash)

Photo by [Giorgio Trovato](https://unsplash.com/@giorgiotrovato?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash) on [Unsplash](https://unsplash.com/photos/a-woman-getting-her-nails-done-at-a-nail-salon-gb6gtiTZKB8?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash)

Photo by [Arina Krasnikova](https://www.pexels.com/@arina-krasnikova/) from [Pexels](https://www.pexels.com/photo/a-woman-having-a-facial-treatment-6663373/)

Photo by [Ali Pazani](https://www.pexels.com/@alipazani/) from [Pexels](https://www.pexels.com/photo/woman-wearing-brown-fur-beanies-and-white-and-balck-top-2681751/)

Photo by [Le Petit](https://unsplash.com/@lepetit?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash) on [Unsplash](https://unsplash.com/photos/woman-with-white-hair-clip-Jp4POW00eE0?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash)

Photo by [Grzegorz Rakowski](https://unsplash.com/@gregory_rak?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash) on [Unsplash](https://unsplash.com/photos/woman-in-white-tank-top-qDJh1CayPTA?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash)

Photo by [Raamin ka](https://unsplash.com/@raaminka?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash) on [Unsplash](https://unsplash.com/photos/woman-in-white-off-shoulder-dress-0f9et7fge84?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash)

Photo by [Bave Pictures](https://unsplash.com/@bavepictures?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash) on [Unsplash](https://unsplash.com/photos/a-man-in-a-pink-suit-and-sunglasses-LWV_ki1Bxgo?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash)

Photo by [Layanne Aguiar](https://www.pexels.com/@layanne-aguiar-500650789/) from [Pexels](https://www.pexels.com/photo/woman-in-braids-and-manicure-26933110/)

Photo by [Airam Dato-on](https://www.pexels.com/@airamdphoto/) from [Pexels](https://www.pexels.com/photo/woman-in-beige-shirt-leaning-on-chain-linked-fence-9637730/)

Photo by [Tnarg](https://www.pexels.com/@tnarg/) from [Pexels](https://www.pexels.com/photo/redhead-woman-posing-with-hand-in-hair-5131658/)

Photo by [Jonas Svidras](https://www.pexels.com/@jonas-svidras/) from [Pexels](https://www.pexels.com/photo/woman-wearing-black-spaghetti-strap-top-555787/)

Photo by [Mockup Free](https://unsplash.com/@mockupfreenet?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash) on [Unsplash](https://unsplash.com/photos/a-bottle-of-pump-soap-on-a-white-background-w319lp_rens?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash)

Photo by [Mockup Free](https://unsplash.com/@mockupfreenet?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash) on [Unsplash](https://unsplash.com/photos/a-bottle-of-m-e-on-a-white-background-aehpQ9LtmTo?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash)

Photo by [Mockup Free](https://unsplash.com/@mockupfreenet?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash) on [Unsplash](https://unsplash.com/photos/a-bottle-of-white-plastic-bottle-on-a-white-background-8SrO_OYe5D8?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash)

Photo by [KaLisa Veer](https://unsplash.com/@kalisaveer?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash) on [Unsplash](https://unsplash.com/photos/red-pillar-candle-on-white-textile-Dk-If92Q7tY?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash)

Photo by [Mockup Free](https://unsplash.com/@mockupfreenet?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash) on [Unsplash](https://unsplash.com/photos/jar-of-jar-of-jar-of-jar-of-jar-of-jar-of-jar-of-jar-of-D0C7mQ3HM34?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash)

Photo by [Mockup Free](https://unsplash.com/@mockupfreenet?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash) on [Unsplash](https://unsplash.com/photos/a-bottle-of-cbl-on-a-white-background-MqX0jSMYJC8?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash)

Photo by [Benyamin Bohlouli](https://unsplash.com/@benyamin_bohlouli?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash) on [Unsplash](https://unsplash.com/photos/a-room-filled-with-furniture-and-a-large-window-_C-S7LqxHPw?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash)

Photo by [Guilherme Petri](https://unsplash.com/@guipetri?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash) on [Unsplash](https://unsplash.com/photos/photo-of-saloon-interior-view-PtOfbGkU3uI?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash)

Photo by [Lindsay Cash](https://unsplash.com/@lindsayrc81?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash) on [Unsplash](https://unsplash.com/photos/a-woman-getting-her-hair-cut-by-a-hair-stylist-Md_DhaFsnCQ?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash)

Photo by [Edz Norton](https://unsplash.com/@edznorton?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash) on [Unsplash](https://unsplash.com/photos/a-variety-of-cosmetics-and-makeup-brushes-on-a-table-_nug8KZ8KUQ?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash)
`;

function renderEntry(entry: string) {
  // Normalize an exception case: if the label contains "gsap/component",
  // render it as the literal text "[gsap/component]" inside the link.
  // You can extend this list with more exceptions as needed.
  const EXCEPTIONS: { key: string; replacement: string }[] = [
    { key: "gsap/component", replacement: "[gsap/component]" },
  ];

  // Simple markdown links: [text](url)
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  const applyExceptions = (text: string) => {
    for (const ex of EXCEPTIONS) {
      const idx = text.indexOf(ex.key);
      if (idx !== -1) {
        // only replace the first occurrence per segment to keep simple and predictable
        return (
          text.slice(0, idx) +
          ex.replacement +
          text.slice(idx + ex.key.length)
        );
      }
    }
    return text;
  };

  while ((match = regex.exec(entry)) !== null) {
    if (match.index > lastIndex) {
      parts.push(
        <span key={key++} style={{
          color: "var(--sub-foreground)",
          transform: "translateY(-8px)",
          display: "inline-block",
          marginLeft: "5px",
          marginRight: "5px",
        }}>
          {applyExceptions(entry.slice(lastIndex, match.index))}
        </span>
      );
    }

    // The label, with exception applied
    let label = match[1];
    label = applyExceptions(label);

    parts.push(
      <HighlightHover
        key={key++}
        as="a"
        href={match[2]}
        target="_blank"
        rel="noopener noreferrer"
        isRTL={false}
        barThickness={0.09}
        gapRatio={0.03}
        className="cursor-pointer"
        style={{
          color: "var(--sub-foreground)",
          textDecoration: "none",
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </HighlightHover>
    );
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < entry.length) {
    parts.push(
      <span key={key++} style={{ color: "var(--foreground)" }}>
        {entry.slice(lastIndex)}
      </span>
    );
  }

  return parts;
}

export default function CreditModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { t } = useApp();
  const isMobile = useIsMobile();
  const baseBorderRadius = 12;

  if (!isOpen) return null;

  // Each entry separated by blank lines in original markdown; we split by double line breaks to get individual lines,
  // but the requirement is that each entry be on its own line. We already have blank lines between entries in creditsMarkdown.
  const creditEntries = creditsMarkdown
    .trim()
    .split(/\n{2,}/)
    .map((e) => e.trim())
    .filter(Boolean);

  return (
    <AnimatePresence>
      {isOpen && (
        <ModalOverlay onClose={onClose}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: isMobile ? 100 : 0 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: isMobile ? 100 : 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="fixed inset-0 flex items-center justify-center z-50"
            style={{ overflow: "visible" }}
            onClick={onClose}
          >
            <motion.div
              layout
              transition={{ duration: 0.35, ease: "easeInOut" }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="credit-modal-title"
              className="bg-[var(--background)] flex flex-col relative border text-[var(--foreground)]"
              style={{
                width: "min(480px, 90vw)",
                height: "min(720px, 86vh)",
                borderColor: "var(--button-border-color)",
                borderRadius: baseBorderRadius,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div
                className="flex items-center justify-between px-4 border-b border-[var(--button-border-color)]"
                style={{
                  minHeight: 72,
                  borderTopLeftRadius: baseBorderRadius,
                  borderTopRightRadius: baseBorderRadius,
                  userSelect: "none",
                }}
              >
                <div style={{ width: "36px" }} />
                <span
                  id="credit-modal-title"
                  className="font-semibold text-[22px] select-none mx-auto"
                  style={{ userSelect: "none" }}
                >
                  <span style={{ display: "block" }}>{t("credit_inscription")}</span>
                </span>
                <button
                  onClick={onClose}
                  className="p-2 text-gray-400 hover:text-[var(--foreground)] transition-colors"
                  aria-label={t("close")}
                  type="button"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Content */}
              <div
                className="flex-grow overflow-y-auto px-6 py-4"
                style={{ borderTop: "1px solid var(--button-border-color)", textAlign: "center" }}
              >
                <div className="h-5"/>
                <ul
                  style={{
                    listStyleType: "none",
                    padding: 0,
                    margin: 0,
                    lineHeight: 1.75,
                    textAlign: "center",
                  }}
                >
                  {creditEntries.map((entry, idx) => (
                    <li
                      key={idx}
                      style={{
                        marginBottom: idx === creditEntries.length - 1 ? 0 : 20,
                        wordWrap: "break-word",
                        wordBreak: "break-word",
                        whiteSpace: "normal",
                        fontSize: "1rem",
                        direction: "ltr"
                      }}
                    >
                      {renderEntry(entry)}
                    </li>
                  ))}
                </ul>
                <div className="h-5"/>
              </div>

              {/* Footer */}
              <div
                className="flex-shrink-0 p-6 border-t border-[var(--button-border-color)] bg-[var(--background)]"
                style={{
                  borderBottomLeftRadius: baseBorderRadius,
                  borderBottomRightRadius: baseBorderRadius,
                }}
              >
                <ChronicleButton
                  onClick={onClose}
                  className="w-full"
                  variant="default"
                  backgroundColor="var(--foreground)"
                  hoverBackgroundColor="var(--accent)"
                  textColor="var(--background)"
                  hoverTextColor="var(--foreground)"
                  borderVisible={false}
                  borderRadius="var(--button-border-radius)"
                  fontWeight={700}
                  buttonHeight={isMobile ? "2.75rem" : "2.875rem"}
                  width="100%"
                  type="button"
                >
                  {t("ok_inscription")}
                </ChronicleButton>
              </div>
            </motion.div>
          </motion.div>
        </ModalOverlay>
      )}
    </AnimatePresence>
  );
}
