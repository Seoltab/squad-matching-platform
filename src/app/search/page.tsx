"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import type { TeacherPublicSafeCache } from "@/types/teacher";
import StudentApplicationForm, {
  type StudentApplicationFormData,
} from "@/components/StudentApplicationForm";
import TeacherCard from "@/components/TeacherCard";
import Pagination from "@/components/Pagination";
import ConfirmSubmitModal from "@/components/ConfirmSubmitModal";
import FindingTeachersLoader from "@/components/FindingTeachersLoader";

const ITEMS_PER_PAGE = 12;

const INITIAL_FORM: StudentApplicationFormData = {
  studentGender: "",
  studentSubject: "",
  studentGrade: "",
  studentGradeLevel: "",
  admissionType: "",
  desiredFieldMajor: "",
  preferredTeacherStyle: "",
  preferredTeacherStrengths: [],
  specialRequests: "",
};

function serializeError(err: unknown): string {
  if (err instanceof Error) return err.message;
  if (typeof err === "object" && err !== null) {
    const o = err as Record<string, unknown>;
    return [
      o.message,
      o.code,
      o.details,
      o.hint,
      JSON.stringify(o, Object.getOwnPropertyNames(o), 2),
    ]
      .filter(Boolean)
      .join(" / ");
  }
  return String(err);
}

export default function TeacherExplorationPage() {
  const [teachers, setTeachers] = useState<TeacherPublicSafeCache[]>([]);
  const [filtered, setFiltered] = useState<TeacherPublicSafeCache[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [formData, setFormData] = useState<StudentApplicationFormData>(INITIAL_FORM);
  const [viewState, setViewState] = useState<"form" | "loading" | "results">("form");
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginatedTeachers = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const fetchTeachers = useCallback(async () => {
    setViewState("loading");
    setLoading(true);
    setFetchError(null);
    const { data, error } = await supabase
      .from("teacher_public_safe_cache")
      .select("*");

    if (error) {
      const msg = serializeError(error);
      setFetchError(msg || "선생님 목록을 불러올 수 없습니다.");
      console.error("Supabase error:", {
        message: error.message,
        code: (error as { code?: string }).code,
        details: (error as { details?: string }).details,
        full: JSON.stringify(error, Object.getOwnPropertyNames(error), 2),
      });
      setTeachers([]);
      setLoading(false);
      setViewState("results");
      return;
    }

    const list = (data ?? []) as TeacherPublicSafeCache[];
    list.sort((a, b) => {
      const npsA = a.nps_avg_1y ?? 0;
      const npsB = b.nps_avg_1y ?? 0;
      if (npsB !== npsA) return npsB - npsA;
      const rateA = a.score_improvement_rate ?? 0;
      const rateB = b.score_improvement_rate ?? 0;
      return rateB - rateA;
    });
    setTeachers(list);
    setLoading(false);
    setViewState("results");
  }, []);

  const handleFindTeachers = () => {
    fetchTeachers();
  };

  useEffect(() => {
    if (viewState !== "results" || teachers.length === 0) {
      setFiltered([]);
      return;
    }

    let result = [...teachers];

    if (formData.studentSubject) {
      result = result.filter((t) =>
        t.preferred_student_subject
          ?.toLowerCase()
          .includes(formData.studentSubject.toLowerCase())
      );
    }
    if (formData.studentGrade) {
      result = result.filter((t) =>
        t.preferred_student_school_year
          ?.toLowerCase()
          .includes(formData.studentGrade.toLowerCase())
      );
    }
    if (formData.preferredTeacherStyle) {
      result = result.filter(
        (t) =>
          t.style?.toLowerCase() === formData.preferredTeacherStyle.toLowerCase()
      );
    }
    if (formData.preferredTeacherStrengths.length > 0) {
      result = result.filter((t) =>
        formData.preferredTeacherStrengths.some(
          (key) => (t[key as keyof TeacherPublicSafeCache] as number) === 1
        )
      );
    }

    setFiltered(result);
  }, [viewState, teachers, formData]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filtered.length]);

  const toggleSelect = (userId: string) => {
    setSelectedIds((prev) => {
      if (prev.includes(userId)) return prev.filter((id) => id !== userId);
      if (prev.length >= 3) return prev;
      return [...prev, userId];
    });
  };

  const handleSubmitApplication = async (data: StudentApplicationFormData) => {
    const res = await fetch("/api/submit-application", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ formData: data, selectedUserIds: selectedIds }),
    });

    const json = await res.json();

    if (!res.ok) {
      throw new Error(json.error ?? "저장에 실패했습니다.");
    }

    setSelectedIds([]);
    setModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-seoltab-gray flex flex-col">
      <header className="bg-white border-b border-seoltab-sub shrink-0">
        <div className="px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-seoltab-blue font-bold text-xl hover:opacity-80">
            설탭
          </Link>
          {viewState === "results" && selectedIds.length > 0 && (
            <button
              onClick={() => setModalOpen(true)}
              className="py-2 px-4 rounded-lg bg-seoltab-blue text-white font-medium text-sm hover:bg-seoltab-purple transition-colors"
            >
              수업 요청하기 ({selectedIds.length}명)
            </button>
          )}
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-6">
        <div className="max-w-6xl mx-auto">
          {viewState === "form" && (
            <StudentApplicationForm
              form={formData}
              onChange={setFormData}
              onSubmit={handleFindTeachers}
              loading={false}
            />
          )}

          {viewState === "loading" && <FindingTeachersLoader />}

          {viewState === "results" && (
            <section className="space-y-6">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <button
                  onClick={() => setViewState("form")}
                  className="text-seoltab-blue font-medium text-sm hover:underline"
                >
                  ← 검색 조건 변경
                </button>
              </div>

              {fetchError && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-sm">
                  <p className="font-medium">데이터를 불러오지 못했습니다.</p>
                  <p className="mt-1 text-red-600/90">{fetchError}</p>
                  <button
                    onClick={() => setViewState("form")}
                    className="mt-3 text-seoltab-blue font-medium hover:underline"
                  >
                    다시 시도
                  </button>
                </div>
              )}

              {!fetchError && (
                <>
                  <div>
                    <h3 className="text-seoltab-dark font-semibold text-lg">
                      맞춤 선생님 ({filtered.length}명)
                    </h3>
                    <p className="text-seoltab-dark/80 text-sm mt-1">
                      데이터 기반의 공정한 기회 제공
                    </p>
                  </div>

                  {filtered.length === 0 ? (
                    <p className="text-seoltab-dark/70 py-8">
                      조건에 맞는 선생님이 없습니다. 검색 조건을 변경해보세요.
                    </p>
                  ) : (
                    <>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {paginatedTeachers.map((teacher) => (
                          <TeacherCard
                            key={teacher.user_id}
                            teacher={teacher}
                            isSelected={selectedIds.includes(teacher.user_id)}
                            selectionCount={selectedIds.length}
                            onSelect={() => toggleSelect(teacher.user_id)}
                          />
                        ))}
                      </div>
                      <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        totalItems={filtered.length}
                        itemsPerPage={ITEMS_PER_PAGE}
                        onPageChange={setCurrentPage}
                      />
                    </>
                  )}
                </>
              )}
            </section>
          )}
        </div>
      </main>

      <ConfirmSubmitModal
        isOpen={modalOpen}
        selectedUserIds={selectedIds}
        formData={formData}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmitApplication}
      />
    </div>
  );
}
