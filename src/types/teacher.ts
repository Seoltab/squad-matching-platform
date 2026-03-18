/**
 * teacher_public_safe_cache 테이블 스키마 (ISMS 준수: 실명/연락처 미포함)
 */
export interface TeacherPublicSafeCache {
  user_id: string;
  style: string | null;
  preferred_student_subject: string | null;
  preferred_student_school_year: string | null;
  planning_is_top: number;
  explaining_is_top: number;
  mentoring_is_top: number;
  motivation_is_top: number;
  in_class_comm_is_top: number;
  out_of_class_comm_is_top: number;
  review_count: number;
  recommend_rate: number | null;
  score_improvement_rate: number | null;
  nps_avg_1y: number | null; // 내부 정렬용, UI 노출 안 함
}

/** 강점 필드 → 한글 라벨 매핑 */
export const STRENGTH_LABELS: Record<string, string> = {
  planning_is_top: "학습계획 강점",
  explaining_is_top: "설명력 우수",
  mentoring_is_top: "멘토링 능숙",
  motivation_is_top: "동기부여 우수",
  in_class_comm_is_top: "수업 내 소통",
  out_of_class_comm_is_top: "수업 외 소통",
};
