-- Defense-in-depth: explicit deny-by-default for storage.objects on the
-- 'professional-documents' bucket. Only admins/staff can INSERT/UPDATE/DELETE
-- via the anon/authenticated roles. The Edge Function uploads use the
-- service_role key, which bypasses RLS and is unaffected.

-- INSERT
DROP POLICY IF EXISTS "professional_documents_admin_insert" ON storage.objects;
CREATE POLICY "professional_documents_admin_insert"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'professional-documents'
  AND (
    public.has_role(auth.uid(), 'admin'::public.app_role)
    OR public.has_role(auth.uid(), 'staff'::public.app_role)
  )
);

-- UPDATE
DROP POLICY IF EXISTS "professional_documents_admin_update" ON storage.objects;
CREATE POLICY "professional_documents_admin_update"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'professional-documents'
  AND (
    public.has_role(auth.uid(), 'admin'::public.app_role)
    OR public.has_role(auth.uid(), 'staff'::public.app_role)
  )
)
WITH CHECK (
  bucket_id = 'professional-documents'
  AND (
    public.has_role(auth.uid(), 'admin'::public.app_role)
    OR public.has_role(auth.uid(), 'staff'::public.app_role)
  )
);

-- DELETE
DROP POLICY IF EXISTS "professional_documents_admin_delete" ON storage.objects;
CREATE POLICY "professional_documents_admin_delete"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'professional-documents'
  AND (
    public.has_role(auth.uid(), 'admin'::public.app_role)
    OR public.has_role(auth.uid(), 'staff'::public.app_role)
  )
);