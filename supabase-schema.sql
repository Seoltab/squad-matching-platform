-- Application 테이블 (과외신청서 데이터)
-- Supabase SQL Editor에서 실행 후 RLS 정책을 설정하세요.

CREATE TABLE IF NOT EXISTS "Application" (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_gender TEXT,
  student_grade TEXT,
  student_subject TEXT,
  student_grade_level TEXT,
  admission_type TEXT,
  desired_field_major TEXT,
  preferred_teacher_style TEXT,
  preferred_teacher_strengths TEXT,
  special_requests TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "Selection" (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  app_id UUID REFERENCES "Application"(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- RLS 활성화 및 정책 (anon 키로 insert 가능)
ALTER TABLE "Application" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Selection" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow insert Application" ON "Application"
  FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow insert Selection" ON "Selection"
  FOR INSERT TO anon WITH CHECK (true);
