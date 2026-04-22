import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { buildCorsHeaders, jsonResponse } from "../_shared/security.ts";

// Returns public (browser-safe) configuration values stored as Edge secrets.
// Site keys are designed to be public — only the secret key must stay server-side.
const handler = async (req: Request): Promise<Response> => {
  const corsHeaders = buildCorsHeaders(req);
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  const turnstileSiteKey = Deno.env.get("TURNSTILE_SITE_KEY") ?? "";

  return jsonResponse(
    { turnstileSiteKey },
    200,
    {
      ...corsHeaders,
      "Cache-Control": "public, max-age=300",
    },
  );
};

serve(handler);
