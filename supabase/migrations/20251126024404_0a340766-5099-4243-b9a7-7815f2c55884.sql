-- Create rate limiting table
CREATE TABLE IF NOT EXISTS public.rate_limit_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  identifier TEXT NOT NULL,
  attempt_type TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for efficient queries
CREATE INDEX IF NOT EXISTS idx_rate_limit_identifier_type_time 
ON public.rate_limit_attempts(identifier, attempt_type, created_at DESC);

-- Enable RLS
ALTER TABLE public.rate_limit_attempts ENABLE ROW LEVEL SECURITY;

-- Allow public INSERT for rate limiting checks
CREATE POLICY "Allow public insert for rate limiting"
ON public.rate_limit_attempts
FOR INSERT
TO public
WITH CHECK (true);

-- Cleanup function to delete old entries (older than 1 hour)
CREATE OR REPLACE FUNCTION public.cleanup_rate_limit_attempts()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  DELETE FROM public.rate_limit_attempts
  WHERE created_at < NOW() - INTERVAL '1 hour';
END;
$$;