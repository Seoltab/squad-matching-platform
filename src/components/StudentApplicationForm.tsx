"use client";

export interface StudentApplicationFormData {
  studentGender: string;
  studentSubject: string;
  studentGrade: string;
  studentGradeLevel: string;
  admissionType: string;
  desiredFieldMajor: string;
  preferredTeacherStyle: string;
  preferredTeacherStrengths: string[];
  specialRequests: string;
}

const SUBJECT_OPTIONS = [
  { value: "", label: "선택" },
  { value: "국어", label: "국어" },
  { value: "수학", label: "수학" },
  { value: "영어", label: "영어" },
  { value: "사회", label: "사회" },
  { value: "과학", label: "과학" },
];

const GRADE_OPTIONS = [
  { value: "", label: "선택" },
  { value: "중등", label: "중등" },
  { value: "N수생", label: "N수생" },
  { value: "고1", label: "고등 1학년" },
  { value: "고2", label: "고등 2학년" },
  { value: "고3", label: "고등 3학년" },
];

const GRADE_LEVEL_OPTIONS = [
  { value: "", label: "선택" },
  { value: "상", label: "상" },
  { value: "중", label: "중" },
  { value: "하", label: "하" },
];

const ADMISSION_OPTIONS = [
  { value: "", label: "선택" },
  { value: "수시", label: "수시" },
  { value: "정시", label: "정시" },
  { value: "미정", label: "아직 정하지 못했어요" },
];

const STYLE_OPTIONS = [
  { value: "", label: "선택" },
  { value: "유쾌", label: "유쾌" },
  { value: "친근", label: "친근" },
  { value: "엄격", label: "엄격" },
];

const STRENGTH_OPTIONS = [
  { value: "planning_is_top", label: "학습계획" },
  { value: "mentoring_is_top", label: "멘토링" },
  { value: "explaining_is_top", label: "설명력" },
  { value: "in_class_comm_is_top", label: "수업 내 소통" },
  { value: "out_of_class_comm_is_top", label: "수업 외 소통" },
  { value: "motivation_is_top", label: "동기부여" },
];

const MAX_STRENGTH_SELECT = 2;

interface StudentApplicationFormProps {
  form: StudentApplicationFormData;
  onChange: (form: StudentApplicationFormData) => void;
  onSubmit: () => void;
  loading?: boolean;
}

export default function StudentApplicationForm({
  form,
  onChange,
  onSubmit,
  loading = false,
}: StudentApplicationFormProps) {
  const update = (key: keyof StudentApplicationFormData, value: string | string[]) =>
    onChange({ ...form, [key]: value });

  const toggleStrength = (value: string) => {
    const arr = form.preferredTeacherStrengths;
    if (arr.includes(value)) {
      update("preferredTeacherStrengths", arr.filter((s) => s !== value));
    } else if (arr.length < MAX_STRENGTH_SELECT) {
      update("preferredTeacherStrengths", [...arr, value]);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="bg-white rounded-2xl border border-seoltab-sub p-8 max-w-2xl space-y-8"
    >
      <h2 className="text-seoltab-dark font-bold text-xl">과외 신청서</h2>

      {/* 1. 학생 성별/과목/학년 */}
      <section className="space-y-4">
        <h3 className="text-seoltab-dark font-semibold">1. 기본 정보</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-seoltab-dark text-sm font-medium mb-2">
              학생 성별
            </label>
            <select
              required
              value={form.studentGender}
              onChange={(e) => update("studentGender", e.target.value)}
              className="w-full rounded-lg border border-seoltab-sub px-3 py-2 text-seoltab-dark focus:outline-none focus:ring-2 focus:ring-seoltab-blue"
            >
              <option value="">선택</option>
              <option value="M">남자</option>
              <option value="F">여자</option>
            </select>
          </div>
          <div>
            <label className="block text-seoltab-dark text-sm font-medium mb-2">
              과목
            </label>
            <select
              required
              value={form.studentSubject}
              onChange={(e) => update("studentSubject", e.target.value)}
              className="w-full rounded-lg border border-seoltab-sub px-3 py-2 text-seoltab-dark focus:outline-none focus:ring-2 focus:ring-seoltab-blue"
            >
              {SUBJECT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-seoltab-dark text-sm font-medium mb-2">
              학년
            </label>
            <select
              required
              value={form.studentGrade}
              onChange={(e) => update("studentGrade", e.target.value)}
              className="w-full rounded-lg border border-seoltab-sub px-3 py-2 text-seoltab-dark focus:outline-none focus:ring-2 focus:ring-seoltab-blue"
            >
              {GRADE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* 2. 학생 성적대 / 입시 전형 */}
      <section className="space-y-4">
        <h3 className="text-seoltab-dark font-semibold">2. 성적 및 입시 전형</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-seoltab-dark text-sm font-medium mb-2">
              학생 성적대
            </label>
            <select
              value={form.studentGradeLevel}
              onChange={(e) => update("studentGradeLevel", e.target.value)}
              className="w-full rounded-lg border border-seoltab-sub px-3 py-2 text-seoltab-dark focus:outline-none focus:ring-2 focus:ring-seoltab-blue"
            >
              {GRADE_LEVEL_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-seoltab-dark text-sm font-medium mb-2">
              입시 전형
            </label>
            <select
              value={form.admissionType}
              onChange={(e) => update("admissionType", e.target.value)}
              className="w-full rounded-lg border border-seoltab-sub px-3 py-2 text-seoltab-dark focus:outline-none focus:ring-2 focus:ring-seoltab-blue"
            >
              {ADMISSION_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* 3. 희망 계열/학과 */}
      <section className="space-y-4">
        <h3 className="text-seoltab-dark font-semibold">3. 희망 계열 / 학과</h3>
        <textarea
          value={form.desiredFieldMajor}
          onChange={(e) => update("desiredFieldMajor", e.target.value)}
          rows={2}
          placeholder="희망하는 계열이나 학과를 자유롭게 적어주세요"
          className="w-full rounded-lg border border-seoltab-sub px-3 py-2 text-seoltab-dark placeholder:text-seoltab-dark/50 focus:outline-none focus:ring-2 focus:ring-seoltab-blue resize-none"
        />
      </section>

      {/* 4. 희망 선생님 성격 / 강점 */}
      <section className="space-y-4">
        <h3 className="text-seoltab-dark font-semibold">
          4. 희망하는 선생님 (강점 택 2)
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-seoltab-dark text-sm font-medium mb-2">
              선생님 성격
            </label>
            <select
              value={form.preferredTeacherStyle}
              onChange={(e) => update("preferredTeacherStyle", e.target.value)}
              className="w-full rounded-lg border border-seoltab-sub px-3 py-2 text-seoltab-dark focus:outline-none focus:ring-2 focus:ring-seoltab-blue"
            >
              {STYLE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-seoltab-dark text-sm font-medium mb-2">
              선생님 강점 (최대 2개)
            </label>
            <div className="flex flex-wrap gap-2">
              {STRENGTH_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => toggleStrength(opt.value)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    form.preferredTeacherStrengths.includes(opt.value)
                      ? "bg-seoltab-light text-seoltab-dark border-2 border-seoltab-blue"
                      : "bg-seoltab-sub/50 text-seoltab-dark/70 border-2 border-transparent hover:bg-seoltab-sub"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            {form.preferredTeacherStrengths.length > 0 && (
              <p className="text-seoltab-dark/60 text-xs mt-1">
                {form.preferredTeacherStrengths.length}/2 선택됨
              </p>
            )}
          </div>
        </div>
      </section>

      {/* 5. 주관식 요청사항 */}
      <section className="space-y-4">
        <h3 className="text-seoltab-dark font-semibold">5. 주관식 요청사항</h3>
        <textarea
          value={form.specialRequests}
          onChange={(e) => update("specialRequests", e.target.value)}
          rows={4}
          placeholder="원하시는 수업 방식, 특별한 요청사항 등을 자유롭게 적어주세요"
          className="w-full rounded-lg border border-seoltab-sub px-3 py-2 text-seoltab-dark placeholder:text-seoltab-dark/50 focus:outline-none focus:ring-2 focus:ring-seoltab-blue resize-none"
        />
      </section>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-4 rounded-xl bg-seoltab-blue text-white font-semibold hover:bg-seoltab-purple disabled:opacity-60 transition-colors"
      >
        {loading ? "맞춤 선생님 찾는 중..." : "맞춤 선생님 찾기"}
      </button>
    </form>
  );
}
