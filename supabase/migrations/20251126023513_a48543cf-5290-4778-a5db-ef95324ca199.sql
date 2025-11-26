-- Create enum types
CREATE TYPE public.professional_status AS ENUM ('pending', 'approved', 'rejected');
CREATE TYPE public.document_type AS ENUM ('id_document', 'proof_of_address', 'certificate');
CREATE TYPE public.urgency_type AS ENUM ('immediate', 'days', 'scheduled');
CREATE TYPE public.budget_type AS ENUM ('estimate', 'detailed');
CREATE TYPE public.service_request_status AS ENUM ('pending', 'in_progress', 'completed', 'cancelled');
CREATE TYPE public.app_role AS ENUM ('admin', 'staff');

-- Create professionals table
CREATE TABLE public.professionals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  cpf TEXT NOT NULL,
  birth_date DATE NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  address TEXT NOT NULL,
  service_area TEXT NOT NULL,
  experience TEXT NOT NULL,
  education TEXT,
  availability TEXT NOT NULL,
  home_service BOOLEAN NOT NULL,
  description TEXT NOT NULL,
  signature TEXT NOT NULL,
  status professional_status NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create professional_documents table
CREATE TABLE public.professional_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  professional_id UUID NOT NULL REFERENCES public.professionals(id) ON DELETE CASCADE,
  document_type document_type NOT NULL,
  file_path TEXT NOT NULL,
  file_name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create service_requests table
CREATE TABLE public.service_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name TEXT NOT NULL,
  client_phone TEXT NOT NULL,
  client_email TEXT NOT NULL,
  city_neighborhood TEXT NOT NULL,
  service_type TEXT NOT NULL,
  description TEXT NOT NULL,
  location TEXT NOT NULL,
  urgency urgency_type NOT NULL,
  scheduled_date DATE,
  contact_preference TEXT[] NOT NULL,
  budget_type budget_type NOT NULL,
  status service_request_status NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user_roles table for admin access
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, role)
);

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Create storage bucket for professional documents
INSERT INTO storage.buckets (id, name, public) 
VALUES ('professional-documents', 'professional-documents', false);

-- Enable RLS on all tables
ALTER TABLE public.professionals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.professional_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- RLS Policies for professionals table
CREATE POLICY "Anyone can insert professionals"
  ON public.professionals
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can view all professionals"
  ON public.professionals
  FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'staff'));

CREATE POLICY "Admins can update professionals"
  ON public.professionals
  FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'staff'))
  WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'staff'));

-- RLS Policies for professional_documents table
CREATE POLICY "Anyone can insert documents"
  ON public.professional_documents
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can view all documents"
  ON public.professional_documents
  FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'staff'));

-- RLS Policies for service_requests table
CREATE POLICY "Anyone can insert service requests"
  ON public.service_requests
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can view all service requests"
  ON public.service_requests
  FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'staff'));

CREATE POLICY "Admins can update service requests"
  ON public.service_requests
  FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'staff'))
  WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'staff'));

-- RLS Policies for user_roles table
CREATE POLICY "Admins can view all roles"
  ON public.user_roles
  FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage roles"
  ON public.user_roles
  FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Storage policies for professional-documents bucket
CREATE POLICY "Anyone can upload documents"
  ON storage.objects
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (bucket_id = 'professional-documents');

CREATE POLICY "Admins can view all documents"
  ON storage.objects
  FOR SELECT
  TO authenticated
  USING (bucket_id = 'professional-documents' AND (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'staff')));

-- Create trigger function for updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Create triggers for updated_at columns
CREATE TRIGGER update_professionals_updated_at
  BEFORE UPDATE ON public.professionals
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_service_requests_updated_at
  BEFORE UPDATE ON public.service_requests
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();