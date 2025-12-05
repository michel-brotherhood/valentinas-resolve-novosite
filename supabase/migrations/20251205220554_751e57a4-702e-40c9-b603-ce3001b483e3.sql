-- Add SELECT policy to rate_limit_attempts table restricting access to admins only
CREATE POLICY "Only admins can view rate limits"
ON public.rate_limit_attempts
FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'));