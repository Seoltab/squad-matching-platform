-- Application, Selection 테이블 INSERT 정책 추가
-- Supabase SQL Editor에서 전체 실행

-- 1. 기존 정책 제거 (에러 나도 무시)
DROP POLICY IF EXISTS "Allow insert Application" ON "Application";
DROP POLICY IF EXISTS "Allow insert Selection" ON "Selection";

-- 2. INSERT 정책 생성
CREATE POLICY "Allow insert Application"
ON "Application"
FOR INSERT
TO anon
WITH CHECK (true);

CREATE POLICY "Allow insert Selection"
ON "Selection"
FOR INSERT
TO anon
WITH CHECK (true);
