"use client";
import React from 'react';

export interface FloatingLabelInputProps {
  id: string;
  label: string;
  value: string;
  onValueChange: (value: string) => void;
  type?: string;
  isRTL?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
}

export const FloatingLabelInput: React.FC<FloatingLabelInputProps> = ({ id, label, value, onValueChange, type = 'text', isRTL, ...props }) => {
  return (
    <div className={`mobile-form-group ${isRTL ? 'rtl' : ''}`}>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        className="mobile-form-input"
        placeholder=" " 
        {...props}
      />
      <label htmlFor={id} className="mobile-form-label">
        {label}
      </label>
    </div>
  );
};
