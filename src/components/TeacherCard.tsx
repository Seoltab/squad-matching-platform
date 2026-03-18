"use client";

import { STRENGTH_LABELS } from "@/types/teacher";
import type { TeacherPublicSafeCache } from "@/types/teacher";

interface TeacherCardProps {
  teacher: TeacherPublicSafeCache;
  isSelected: boolean;
  selectionCount: number;
  onSelect: () => void;
}

function getStrengthTags(teacher: TeacherPublicSafeCache): string[] {
  const tags: string[] = [];
  const mapping: Record<string, number> = {
    planning_is_top: teacher.planning_is_top,
    explaining_is_top: teacher.explaining_is_top,
    mentoring_is_top: teacher.mentoring_is_top,
    motivation_is_top: teacher.motivation_is_top,
    in_class_comm_is_top: teacher.in_class_comm_is_top,
    out_of_class_comm_is_top: teacher.out_of_class_comm_is_top,
  };
  for (const [key, val] of Object.entries(mapping)) {
    if (val === 1) tags.push(STRENGTH_LABELS[key] ?? key);
  }
  return tags;
}

export default function TeacherCard({
  teacher,
  isSelected,
  selectionCount,
  onSelect,
}: TeacherCardProps) {
  const tags = getStrengthTags(teacher);
  const canSelect = !isSelected && selectionCount < 3;
  const recommendPct =
    teacher.recommend_rate != null
      ? Math.round(teacher.recommend_rate * 100)
      : null;
  const improvementPct =
    teacher.score_improvement_rate != null
      ? Math.round(teacher.score_improvement_rate * 100)
      : null;

  return (
    <article
      className={`
        relative overflow-hidden rounded-2xl border-2 bg-white
        transition-all duration-200
        ${isSelected
          ? "border-seoltab-blue shadow-lg shadow-seoltab-blue/10"
          : "border-seoltab-sub hover:border-seoltab-light hover:shadow-md"
        }
      `}
    >
      {/* 상단 뱃지 영역 */}
      <div className="bg-seoltab-gray px-5 py-4 border-b border-seoltab-sub">
        <div className="flex items-center justify-between">
          <span className="text-seoltab-dark font-bold">#{teacher.user_id}</span>
          {teacher.style && (
            <span className="rounded-full bg-seoltab-light px-3 py-0.5 text-xs font-medium text-seoltab-dark">
              {teacher.style}
            </span>
          )}
        </div>
      </div>

      <div className="p-5 flex flex-col gap-4">
        {/* 강점 태그 */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-lg bg-seoltab-sub/80 px-2.5 py-1 text-xs font-medium text-seoltab-dark"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* 성과 요약 */}
        <div className="flex gap-6 text-sm">
          <div className="flex flex-col items-center">
            <span className="text-seoltab-dark/60 text-xs">리뷰</span>
            <span className="font-semibold text-seoltab-dark">
              {teacher.review_count}건
            </span>
          </div>
          {recommendPct != null && (
            <div className="flex flex-col items-center">
              <span className="text-seoltab-dark/60 text-xs">추천률</span>
              <span className="font-semibold text-seoltab-blue">
                {recommendPct}%
              </span>
            </div>
          )}
          {improvementPct != null && (
            <div className="flex flex-col items-center">
              <span className="text-seoltab-dark/60 text-xs">성적 상승률</span>
              <span className="font-semibold text-seoltab-purple">
                {improvementPct}%
              </span>
            </div>
          )}
        </div>

        {/* 지목 버튼 */}
        <button
          onClick={onSelect}
          disabled={!canSelect}
          className={`
            mt-1 w-full py-3 rounded-xl font-semibold text-sm transition-all
            ${isSelected
              ? "bg-seoltab-sub text-seoltab-dark cursor-default flex items-center justify-center gap-2"
              : canSelect
                ? "bg-seoltab-blue text-white hover:bg-seoltab-purple active:scale-[0.98]"
                : "bg-seoltab-sub/50 text-seoltab-dark/50 cursor-not-allowed"
            }
          `}
        >
          {isSelected ? (
            <>
              <span>✓</span>
              <span>지목됨</span>
            </>
          ) : (
            "지목하기"
          )}
        </button>
      </div>
    </article>
  );
}
