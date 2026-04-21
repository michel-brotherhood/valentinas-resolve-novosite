-- 1. professional_documents: bloquear INSERT público (IDOR fix)
DROP POLICY IF EXISTS "Anyone can insert documents" ON public.professional_documents;
CREATE POLICY "No public insert on documents"
  ON public.professional_documents FOR INSERT
  TO anon, authenticated
  WITH CHECK (false);

-- 2. professionals: forçar status pending e limites de tamanho
DROP POLICY IF EXISTS "Anyone can insert professionals" ON public.professionals;
CREATE POLICY "Public insert pending professionals"
  ON public.professionals FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    status = 'pending'::professional_status
    AND length(full_name) BETWEEN 2 AND 200
    AND length(email) BETWEEN 5 AND 255
    AND length(cpf) BETWEEN 11 AND 18
    AND length(description) BETWEEN 20 AND 2000
    AND length(phone) BETWEEN 8 AND 20
    AND length(address) BETWEEN 5 AND 500
    AND length(service_area) BETWEEN 2 AND 500
    AND length(experience) BETWEEN 1 AND 2000
    AND length(availability) BETWEEN 1 AND 500
    AND length(signature) BETWEEN 2 AND 200
  );

-- 3. service_requests: forçar status pending e limites
DROP POLICY IF EXISTS "Anyone can insert service requests" ON public.service_requests;
CREATE POLICY "Public insert pending service requests"
  ON public.service_requests FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    status = 'pending'::service_request_status
    AND length(client_name) BETWEEN 2 AND 100
    AND length(client_email) BETWEEN 5 AND 255
    AND length(client_phone) BETWEEN 8 AND 20
    AND length(description) BETWEEN 10 AND 2000
    AND length(service_type) BETWEEN 1 AND 200
    AND length(location) BETWEEN 2 AND 500
    AND length(city_neighborhood) BETWEEN 2 AND 200
  );

-- 4. rate_limit_attempts: restringir tipos válidos
DROP POLICY IF EXISTS "Allow public insert for rate limiting" ON public.rate_limit_attempts;
CREATE POLICY "Public insert valid rate limit"
  ON public.rate_limit_attempts FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    attempt_type IN ('contact','hire_service','professional','accounting','contact_ip','hire_service_ip','professional_ip','accounting_ip')
    AND length(identifier) <= 320
    AND length(identifier) >= 3
  );

-- 5. Storage: revogar upload anônimo no bucket professional-documents
DROP POLICY IF EXISTS "Anyone can upload documents" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can upload professional documents" ON storage.objects;
DROP POLICY IF EXISTS "Public upload to professional-documents" ON storage.objects;

-- 6. Índice para rate limit lookups
CREATE INDEX IF NOT EXISTS idx_rate_limit_lookup
  ON public.rate_limit_attempts(attempt_type, identifier, created_at DESC);