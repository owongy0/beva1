-- Add HKID field to users table
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS hkid TEXT;

-- Add phone number field as well (optional but useful)
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS phone TEXT;

-- Create index for HKID lookups
CREATE INDEX IF NOT EXISTS idx_users_hkid ON public.users(hkid);
