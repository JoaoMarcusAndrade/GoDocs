// src/context/AccessibilityContext.tsx
import { createContext, useContext, useState } from "react";

type AccessibilityContextType = {
  enabled: boolean;
  setEnabled: (value: boolean) => void;
  handleRead: (e: React.MouseEvent<HTMLElement>) => void;
};

const AccessibilityContext = createContext<AccessibilityContextType | null>(null);

export const AccessibilityProvider = ({ children }: { children: React.ReactNode }) => {
  const [enabled, setEnabled] = useState(false);

  const speak = (text: string) => {
    if (!enabled) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "pt-BR";
    speechSynthesis.speak(utterance);
  };

  const handleRead = (e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget;

    const text =
      el.getAttribute("aria-label") ||
      el.getAttribute("alt") ||
      el.textContent;

    if (text) speak(text);
  };

  return (
    <AccessibilityContext.Provider value={{ enabled, setEnabled, handleRead }}>
      {children}
    </AccessibilityContext.Provider>
  );
};

// Hook pra usar fácil
export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) throw new Error("useAccessibility precisa estar dentro do Provider");
  return context;
};