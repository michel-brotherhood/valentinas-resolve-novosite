import { useState } from "react";

/**
 * Hook for anti-bot protection on public forms.
 * Returns:
 * - HoneypotField: hidden input component to render inside <form>
 * - getAntiBotPayload(): { _hp, _t } to spread into POST body
 */
export function useAntiBot() {
  const [renderedAt] = useState<number>(() => Date.now());
  const [hp, setHp] = useState<string>("");

  const HoneypotField = () => (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        left: "-9999px",
        top: "-9999px",
        height: 0,
        width: 0,
        overflow: "hidden",
        opacity: 0,
        pointerEvents: "none",
      }}
    >
      <label htmlFor="company_website">Não preencha este campo</label>
      <input
        type="text"
        id="company_website"
        name="company_website"
        tabIndex={-1}
        autoComplete="off"
        value={hp}
        onChange={(e) => setHp(e.target.value)}
      />
    </div>
  );

  const getAntiBotPayload = () => ({
    _hp: hp,
    _t: renderedAt,
  });

  return { HoneypotField, getAntiBotPayload };
}
