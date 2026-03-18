"use client";

export default function FindingTeachersLoader() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6">
      <div
        className="w-12 h-12 rounded-full border-4 border-seoltab-sub border-t-seoltab-blue animate-spin"
        aria-hidden
      />
      <p className="text-seoltab-dark font-medium text-lg">
        선생님을 찾고있습니다
      </p>
    </div>
  );
}
