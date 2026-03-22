export const speak = (text: string, enabled: boolean) => {
  if (!enabled) return;

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "pt-BR";
  speechSynthesis.speak(utterance);
};

export const handleRead = (
  e: React.MouseEvent<HTMLElement>,
  enabled: boolean
) => {
  const el = e.currentTarget;

  const text =
    el.getAttribute("aria-label") ||
    el.getAttribute("alt") ||
    el.textContent;

  if (text) speak(text, enabled);
};