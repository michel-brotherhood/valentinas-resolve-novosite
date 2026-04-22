import { useCallback, useState } from "react";

/**
 * Manages a Cloudflare Turnstile token for a form submission.
 * Use together with <TurnstileWidget onVerify={setToken} onExpire={reset} />.
 */
export function useTurnstile() {
  const [token, setToken] = useState<string>("");

  const reset = useCallback(() => setToken(""), []);

  const getTurnstilePayload = useCallback(
    () => ({ _cf: token }),
    [token],
  );

  return { token, setToken, reset, getTurnstilePayload };
}
