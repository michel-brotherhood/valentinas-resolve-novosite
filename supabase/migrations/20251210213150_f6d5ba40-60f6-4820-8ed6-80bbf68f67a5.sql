-- Add referral columns to professionals table
ALTER TABLE public.professionals 
  ADD COLUMN was_referred BOOLEAN DEFAULT false,
  ADD COLUMN referred_by TEXT;