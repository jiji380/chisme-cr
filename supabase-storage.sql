-- Add cédula photo columns to profiles
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS cedula_front TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS cedula_back TEXT;

-- Create storage bucket for cédula photos
INSERT INTO storage.buckets (id, name, public)
VALUES ('cedulas', 'cedulas', false)
ON CONFLICT (id) DO NOTHING;

-- Allow authenticated users to upload to cedulas bucket
CREATE POLICY "Users can upload cedula photos" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'cedulas' AND
    auth.uid() IS NOT NULL
  );

-- Allow admins (authenticated) to view cedula photos
CREATE POLICY "Authenticated users can view cedulas" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'cedulas' AND
    auth.uid() IS NOT NULL
  );

-- Update trigger to include cedula photo columns
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, seudonimo, email, nombre, apellidos, cedula, is_admin, is_verified)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'seudonimo', 'Usuario'),
    NEW.email,
    NEW.raw_user_meta_data->>'nombre',
    NEW.raw_user_meta_data->>'apellidos',
    NEW.raw_user_meta_data->>'cedula',
    false,
    false
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
