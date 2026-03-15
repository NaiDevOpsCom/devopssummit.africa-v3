// src/hooks/useSafeInput.ts
import { useState } from "react";
import { sanitizeText } from "../utils/sanitize";

/**
 * Like useState, but sanitizes every value before storing it.
 * Use for any input that will be displayed back in the UI.
 */
export const useSafeInput = (initial = "") => {
  const [value, setValue] = useState(() => sanitizeText(initial));

  const setSafeValue = (input: string | ((prev: string) => string)) => {
    setValue((prev) => {
      const nextValue = typeof input === "function" ? input(prev) : input;
      return sanitizeText(nextValue);
    });
  };

  return [value, setSafeValue] as const;
};
