CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  academic_year TEXT,
  faculty TEXT,
  phone TEXT,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'student',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  short_description TEXT,
  price NUMERIC(10,2) NOT NULL DEFAULT 0,
  academic_year TEXT NOT NULL,
  syllabus JSONB DEFAULT '[]'::jsonb,
  video_url TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  anti_piracy_code TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (profile_id, course_id)
);

CREATE TABLE public.chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  chat_scope TEXT NOT NULL DEFAULT 'public' CHECK (chat_scope IN ('public', 'private')),
  course_id UUID REFERENCES public.courses(id) ON DELETE SET NULL,
  body TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.admin_notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  message TEXT NOT NULL,
  seen_by_admin BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read public courses"
ON public.courses FOR SELECT
USING (true);

CREATE POLICY "Authenticated users can insert own profile"
ON public.profiles FOR INSERT
WITH CHECK (true);

CREATE POLICY "Users can read own profile"
ON public.profiles FOR SELECT
USING (auth.uid()::text = id::text OR auth.role() = 'authenticated');

CREATE POLICY "Admins can manage profiles"
ON public.profiles FOR ALL
USING (auth.role() = 'authenticated');

CREATE POLICY "Students can read own enrollments"
ON public.enrollments FOR SELECT
USING (profile_id::text = auth.uid()::text OR auth.role() = 'authenticated');

CREATE POLICY "Admins can approve enrollments"
ON public.enrollments FOR UPDATE
USING (auth.role() = 'authenticated');

CREATE POLICY "Students can create enrollments"
ON public.enrollments FOR INSERT
WITH CHECK (profile_id::text = auth.uid()::text);

CREATE POLICY "Public chat readable by all"
ON public.chat_messages FOR SELECT
USING (chat_scope = 'public' OR auth.role() = 'authenticated');

CREATE POLICY "Students can send public messages"
ON public.chat_messages FOR INSERT
WITH CHECK (chat_scope = 'public');

CREATE POLICY "Admins can see private chat"
ON public.chat_messages FOR SELECT
USING (chat_scope = 'private' AND auth.role() = 'authenticated');

CREATE POLICY "Students can access their course private chat"
ON public.chat_messages FOR SELECT
USING (
  chat_scope = 'private' AND
  EXISTS (
    SELECT 1 FROM public.enrollments e
    WHERE e.profile_id::text = auth.uid()::text AND e.course_id = chat_messages.course_id AND e.status = 'approved'
  )
);

CREATE POLICY "Admins can access notification list"
ON public.admin_notifications FOR ALL
USING (auth.role() = 'authenticated');

CREATE INDEX idx_courses_year ON public.courses(academic_year);
CREATE INDEX idx_enrollments_profile ON public.enrollments(profile_id);
CREATE INDEX idx_chat_scope ON public.chat_messages(chat_scope, course_id);

-- OPTIONAL: Stored function for anti-piracy code generation
CREATE OR REPLACE FUNCTION public.generate_access_code(profile_id UUID)
RETURNS TEXT
LANGUAGE plpgsql
AS $$
DECLARE
  code_text TEXT;
BEGIN
  code_text := 'A-LC-' || RIGHT(encode(digest(profile_id::text, 'sha256'), 'hex'), 6);
  RETURN upper(code_text);
END;
$$;

-- Example trigger to automatically assign anti-piracy code on approval
CREATE OR REPLACE FUNCTION public.set_enrollment_code()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  IF NEW.status = 'approved' AND NEW.anti_piracy_code IS NULL THEN
    NEW.anti_piracy_code := public.generate_access_code(NEW.profile_id);
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_set_enrollment_code
BEFORE INSERT OR UPDATE ON public.enrollments
FOR EACH ROW
EXECUTE FUNCTION public.set_enrollment_code();
