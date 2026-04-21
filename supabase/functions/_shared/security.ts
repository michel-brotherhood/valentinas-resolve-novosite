// Shared security utilities for all Edge Functions
// - CORS allowlist
// - Anti-bot validation (honeypot + time-trap)
// - IP-based + email-based rate limiting
// - Email header sanitization
// - PII-safe logging

const ALLOWED_ORIGINS = [
  "https://valentinasresolve.com.br",
  "https://www.valentinasresolve.com.br",
  "https://valentinas-resolve-site.lovable.app",
  "https://id-preview--49c53d47-ea60-45f7-b21d-83990dd54e37.lovable.app",
  "https://49c53d47-ea60-45f7-b21d-83990dd54e37.lovableproject.com",
];

export const buildCorsHeaders = (req: Request): Record<string, string> => {
  const origin = req.headers.get("origin") ?? "";
  const isAllowed =
    ALLOWED_ORIGINS.includes(origin) ||
    /^https:\/\/[a-z0-9-]+\.lovable\.app$/.test(origin) ||
    /^https:\/\/[a-z0-9-]+\.lovableproject\.com$/.test(origin);

  return {
    "Access-Control-Allow-Origin": isAllowed ? origin : ALLOWED_ORIGINS[0],
    "Access-Control-Allow-Headers":
      "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Vary": "Origin",
  };
};

export const getClientIp = (req: Request): string => {
  const cf = req.headers.get("cf-connecting-ip");
  if (cf) return cf.trim();
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  const real = req.headers.get("x-real-ip");
  if (real) return real.trim();
  return "unknown";
};

export interface AntiBotInput {
  honeypot?: unknown;
  renderedAt?: unknown;
}

export const validateAntiBot = (input: AntiBotInput): { ok: true } | { ok: false; reason: string } => {
  // Honeypot must be empty/absent
  if (typeof input.honeypot === "string" && input.honeypot.trim() !== "") {
    return { ok: false, reason: "honeypot_filled" };
  }

  // Time-trap: render timestamp required, must be 3s..2h old
  const t = typeof input.renderedAt === "number" ? input.renderedAt : Number(input.renderedAt);
  if (!Number.isFinite(t) || t <= 0) {
    return { ok: false, reason: "missing_timestamp" };
  }
  const elapsed = Date.now() - t;
  if (elapsed < 3000) return { ok: false, reason: "too_fast" };
  if (elapsed > 2 * 60 * 60 * 1000) return { ok: false, reason: "too_old" };

  return { ok: true };
};

export interface RateLimitOpts {
  email: string;
  ip: string;
  type: "contact" | "hire_service" | "professional" | "accounting";
}

// deno-lint-ignore no-explicit-any
export const checkRateLimit = async (supabase: any, opts: RateLimitOpts): Promise<{ ok: true } | { ok: false; reason: string }> => {
  const fifteenMinAgo = new Date(Date.now() - 15 * 60 * 1000).toISOString();

  // Email-based: 3 / 15min
  const emailKey = opts.email.toLowerCase().trim();
  const { data: emailHits } = await supabase
    .from("rate_limit_attempts")
    .select("id")
    .eq("identifier", emailKey)
    .eq("attempt_type", opts.type)
    .gte("created_at", fifteenMinAgo);

  if (emailHits && emailHits.length >= 3) {
    return { ok: false, reason: "email_rate_limit" };
  }

  // IP-based: 5 / 15min
  const ipType = `${opts.type}_ip`;
  const { data: ipHits } = await supabase
    .from("rate_limit_attempts")
    .select("id")
    .eq("identifier", opts.ip)
    .eq("attempt_type", ipType)
    .gte("created_at", fifteenMinAgo);

  if (ipHits && ipHits.length >= 5) {
    return { ok: false, reason: "ip_rate_limit" };
  }

  // Record both
  await supabase.from("rate_limit_attempts").insert([
    { identifier: emailKey, attempt_type: opts.type },
    { identifier: opts.ip, attempt_type: ipType },
  ]);

  return { ok: true };
};

export const sanitizeEmailHeader = (email: string): string | null => {
  if (typeof email !== "string") return null;
  // Reject CR/LF (header injection) and control chars
  if (/[\r\n\t\0]/.test(email)) return null;
  const trimmed = email.trim();
  if (trimmed.length < 5 || trimmed.length > 255) return null;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) return null;
  return trimmed;
};

export const maskEmail = (email: string): string => {
  if (!email || typeof email !== "string") return "***";
  const [user, domain] = email.split("@");
  if (!domain) return "***";
  const u = user.length <= 1 ? "*" : user[0] + "***";
  return `${u}@${domain}`;
};

// Real CPF validator (digit checksum) — also accepts CNPJ (14 digits)
export const isValidCpfOrCnpj = (raw: string): boolean => {
  const v = (raw || "").replace(/\D/g, "");
  if (v.length === 11) return validateCpf(v);
  if (v.length === 14) return validateCnpj(v);
  return false;
};

const validateCpf = (cpf: string): boolean => {
  if (/^(\d)\1{10}$/.test(cpf)) return false;
  let sum = 0;
  for (let i = 0; i < 9; i++) sum += parseInt(cpf[i], 10) * (10 - i);
  let d1 = (sum * 10) % 11;
  if (d1 === 10) d1 = 0;
  if (d1 !== parseInt(cpf[9], 10)) return false;
  sum = 0;
  for (let i = 0; i < 10; i++) sum += parseInt(cpf[i], 10) * (11 - i);
  let d2 = (sum * 10) % 11;
  if (d2 === 10) d2 = 0;
  return d2 === parseInt(cpf[10], 10);
};

const validateCnpj = (cnpj: string): boolean => {
  if (/^(\d)\1{13}$/.test(cnpj)) return false;
  const calc = (base: string, weights: number[]): number => {
    let sum = 0;
    for (let i = 0; i < weights.length; i++) sum += parseInt(base[i], 10) * weights[i];
    const r = sum % 11;
    return r < 2 ? 0 : 11 - r;
  };
  const w1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const w2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const d1 = calc(cnpj.slice(0, 12), w1);
  const d2 = calc(cnpj.slice(0, 12) + d1, w2);
  return d1 === parseInt(cnpj[12], 10) && d2 === parseInt(cnpj[13], 10);
};

export const jsonResponse = (
  body: unknown,
  status: number,
  corsHeaders: Record<string, string>,
): Response =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...corsHeaders },
  });
