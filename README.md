# 설탭 선생님 상시 탐색 페이지

수파베이스 `teacher_public_safe_cache` 테이블을 활용한 선생님 탐색 및 매칭 요청 시스템입니다.

## 설정

1. `.env.local.example`을 복사하여 `.env.local` 생성
2. Supabase URL 및 Anon Key 입력 (미설정 시 빌드용 placeholder 사용)
3. `npm install` 후 `npm run dev` 실행

```bash
cp .env.local.example .env.local
# .env.local에 실제 Supabase 값 입력
npm run dev
```

## Supabase 테이블

- **teacher_public_safe_cache**: 선생님 공개 정보 (user_id, style, 강점, 추천률 등)
- **Application**: 과외신청서 정보
  - `student_gender`, `student_grade`, `student_subject`, `student_grade_level`, `admission_type`, `desired_field_major`, `preferred_teacher_style`, `preferred_teacher_strengths` (JSON 문자열), `special_requests`
- **Selection**: Application ↔ 선생님 매핑 (`app_id`, `user_id`)

`supabase-schema.sql` 참고하여 테이블 생성 후 RLS 정책을 설정하세요.

## 기능

1. **필터**: 과목, 학년, 성격 스타일, 선생님 강점
2. **선생님 카드**: 유저넘버, 스타일, 강점 태그, 리뷰/추천률/성적 상승률
3. **최대 3명 지목**: 지목하기 버튼으로 선택, 수업 요청 시 Supabase 저장
