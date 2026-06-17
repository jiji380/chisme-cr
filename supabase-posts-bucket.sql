-- Create public storage bucket for post photos
INSERT INTO storage.buckets (id, name, public)
VALUES ('posts', 'posts', true)
ON CONFLICT (id) DO NOTHING;

-- Allow authenticated users to upload post photos
CREATE POLICY "Users can upload post photos" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'posts' AND
    auth.uid() IS NOT NULL
  );

-- Allow everyone to view post photos (public bucket)
CREATE POLICY "Anyone can view post photos" ON storage.objects
  FOR SELECT USING (bucket_id = 'posts');
