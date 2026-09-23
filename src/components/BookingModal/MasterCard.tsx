"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CustomCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  size?: number;
  disabled?: boolean;
  hovered?: boolean;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  checked,
  onChange,
  size = 24,
  disabled = false,
  hovered = false,
}) => {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      aria-disabled={disabled}
      tabIndex={0}
      onClick={(e) => {
        e.preventDefault();
        if (!disabled) onChange(!checked);
      }}
      className={
        "custom-checkbox" +
        (checked ? " checked" : "") +
        (hovered ? " hovered" : "") +
        (disabled ? " disabled" : "")
      }
      style={{ width: size, height: size }}
      disabled={disabled}
    >
      <span className="fill" />
      <AnimatePresence>
        {checked && (
          <motion.svg
            key="checkmark"
            width={size * 0.75}
            height={size * 0.75}
            viewBox="0 0 24 24"
            stroke="var(--foreground)"
            strokeWidth={3}
            fill="none"
            className="checkmark"
            style={{ pointerEvents: "none" }}
          >
            <motion.path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              exit={{ pathLength: 0, opacity: 0 }}
              transition={{ duration: 0.32, ease: [0.4, 0, 0.2, 1] }}
            />
          </motion.svg>
        )}
      </AnimatePresence>
    </button>
  );
};

export interface MasterCardProps {
  master: { id: string; name: string; specialization: string; image?: string };
  selected: boolean;
  onClick: () => void;
  isRTL: boolean;
}

export default function MasterCard({
  master,
  selected,
  onClick,
  isRTL,
}: MasterCardProps) {
  const [hovered, setHovered] = useState(false);
  const [checked, setChecked] = useState(selected);

  useEffect(() => {
    setChecked(selected);
  }, [selected]);

  return (
    <>
      <style>{`
        .master-card {
          width: 100%;
          border: 1px solid var(--button-border-color);
          border-radius: 8px;
          background-color: var(--background);
          color: var(--foreground);
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          transition: background-color 0.25s ease, border-color 0.25s ease;
          text-align: start;
          direction: ltr;
        }
        .master-card.hovered {
          background-color: var(--button-border-color);
        }
        .master-card__image {
          width: 48px;
          height: 48px;
          object-fit: cover;
          border-radius: 8px;
          flex-shrink: 0;
        }
        .master-card__info {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          align-items: flex-start;
        }
        .master-card__name {
          font-weight: 600;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .master-card__specialization {
          font-size: 0.875rem;
          color: var(--sub-foreground);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .custom-checkbox {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          border-radius: 50%;
          border: 1.5px solid var(--button-border-color);
          cursor: pointer;
          transition: border-color 0.25s ease, background 0.25s ease;
          background: transparent;
        }
        .custom-checkbox.hovered:not(.checked):not(.disabled) {
          border-color: #404040;
        }
        /* Checked state uses legacy background and border-color properties */
        .custom-checkbox.checked {
          border-color: var(--accent);
          background: var(--accent);
        }
        .custom-checkbox.disabled {
          cursor: not-allowed;
          opacity: 0.5;
        }
        .custom-checkbox .fill {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          opacity: 0;
          transition: opacity 0.25s ease;
          background: var(--accent);
        }
        .custom-checkbox.checked .fill {
          opacity: 1;
        }
        .custom-checkbox .checkmark {
          pointer-events: none;
          position: relative;
          display: block;
        }
      `}</style>

      <button
        type="button"
        aria-pressed={selected}
        onClick={onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={`master-card${hovered ? " hovered" : ""}`}
        style={{ direction: isRTL ? "rtl" : "ltr" }}
      >
        {master.image && (
          <img
            src={master.image}
            alt={`${master.name} photo`}
            className="master-card__image"
            style={{ borderRadius: 8 }}
            loading="lazy"
          />
        )}
        <div className="master-card__info">
          <span className="master-card__name">{master.name}</span>
          <span className="master-card__specialization">{master.specialization}</span>
        </div>

        <CustomCheckbox checked={checked} onChange={setChecked} hovered={hovered} />
      </button>
    </>
  );
}
