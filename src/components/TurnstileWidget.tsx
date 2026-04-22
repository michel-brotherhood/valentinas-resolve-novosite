import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    turnstile?: {
      render: (
        el: HTMLElement,
        opts: {
          sitekey: string;
          callback: (token: string) => void;
          "error-callback"?: () => void;
          "expired-callback"?: () => void;
          "timeout-callback"?: () => void;
          theme?: "light" | "dark" | "auto";
          size?: "normal" | "flexible" | "compact" | "invisible";
          appearance?: "always" | "execute" | "interaction-only";
        },
      ) => string;
      reset: (widgetId?: string) => void;
      remove: (widgetId?: string) => void;
    };
  }
}

const SCRIPT_SRC =
  "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

let scriptPromise: Promise<void> | null = null;
let cachedSiteKey: string | null = null;
let configPromise: Promise<string> | null = null;

const fetchSiteKey = async (): Promise<string> => {
  if (cachedSiteKey !== null) return cachedSiteKey;
  if (configPromise) return configPromise;

  const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/get-public-config`;
  configPromise = fetch(url, {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
    },
  })
    .then(async (r) => {
      if (!r.ok) throw new Error(`config_${r.status}`);
      const json = (await r.json()) as { turnstileSiteKey?: string };
      cachedSiteKey = json.turnstileSiteKey ?? "";
      return cachedSiteKey;
    })
    .catch((err) => {
      configPromise = null;
      throw err;
    });

  return configPromise;
};

const loadTurnstileScript = (): Promise<void> => {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.turnstile) return Promise.resolve();
  if (scriptPromise) return scriptPromise;

  scriptPromise = new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      `script[src^="https://challenges.cloudflare.com/turnstile/v0/api.js"]`,
    );
    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () => reject(new Error("turnstile_load_failed")));
      return;
    }
    const s = document.createElement("script");
    s.src = SCRIPT_SRC;
    s.async = true;
    s.defer = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("turnstile_load_failed"));
    document.head.appendChild(s);
  });

  return scriptPromise;
};

interface Props {
  onVerify: (token: string) => void;
  onExpire?: () => void;
  className?: string;
}

/**
 * Cloudflare Turnstile widget (managed mode).
 * Site key is fetched from the get-public-config edge function (cached in-memory).
 */
export const TurnstileWidget = ({ onVerify, onExpire, className }: Props) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const widgetIdRef = useRef<string | null>(null);
  const onVerifyRef = useRef(onVerify);
  const onExpireRef = useRef(onExpire);
  const [siteKey, setSiteKey] = useState<string>(cachedSiteKey ?? "");

  useEffect(() => {
    onVerifyRef.current = onVerify;
    onExpireRef.current = onExpire;
  }, [onVerify, onExpire]);

  useEffect(() => {
    let cancelled = false;
    if (!siteKey) {
      fetchSiteKey()
        .then((key) => {
          if (!cancelled) setSiteKey(key);
        })
        .catch((err) => console.error("turnstile config:", err?.message));
    }
    return () => {
      cancelled = true;
    };
  }, [siteKey]);

  useEffect(() => {
    if (!siteKey) return;
    let cancelled = false;

    loadTurnstileScript()
      .then(() => {
        if (cancelled || !containerRef.current || !window.turnstile) return;
        widgetIdRef.current = window.turnstile.render(containerRef.current, {
          sitekey: siteKey,
          theme: "auto",
          size: "flexible",
          appearance: "always",
          callback: (token) => onVerifyRef.current(token),
          "expired-callback": () => onExpireRef.current?.(),
          "timeout-callback": () => onExpireRef.current?.(),
          "error-callback": () => onExpireRef.current?.(),
        });
      })
      .catch((err) => console.error("turnstile load:", err?.message));

    return () => {
      cancelled = true;
      if (widgetIdRef.current && window.turnstile) {
        try {
          window.turnstile.remove(widgetIdRef.current);
        } catch {
          /* ignore */
        }
      }
    };
  }, [siteKey]);

  return <div ref={containerRef} className={className} />;
};
