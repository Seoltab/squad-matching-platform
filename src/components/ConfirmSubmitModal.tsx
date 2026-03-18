"use client";

import { useState } from "react";
import type { StudentApplicationFormData } from "./StudentApplicationForm";

interface ConfirmSubmitModalProps {
  isOpen: boolean;
  selectedUserIds: string[];
  formData: StudentApplicationFormData | null;
  onClose: () => void;
  onSubmit: (data: StudentApplicationFormData) => Promise<void>;
}

export default function ConfirmSubmitModal({
  isOpen,
  selectedUserIds,
  formData,
  onClose,
  onSubmit,
}: ConfirmSubmitModalProps) {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConfirm = async () => {
    if (!formData) return;
    setLoading(true);
    setError(null);
    try {
      await onSubmit(formData);
      setDone(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : "저장에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setDone(false);
    setError(null);
    onClose();
  };

  if (!isOpen) return null;

  if (done) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-xl">
          <p className="text-seoltab-dark text-center text-lg font-medium">
            매칭 제안이 일괄 발송될 예정입니다
          </p>
          <p className="text-seoltab-dark/70 text-center text-sm mt-2">
            선택하신 선생님들에게 수업 요청이 전달됩니다.
          </p>
          <button
            onClick={handleClose}
            className="mt-6 w-full py-3 rounded-lg bg-seoltab-blue text-white font-medium hover:bg-seoltab-purple transition-colors"
          >
            확인
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-xl">
        <h3 className="text-seoltab-dark font-semibold text-lg mb-4">
          수업 요청하기
        </h3>
        <p className="text-seoltab-dark/80 text-sm mb-6">
          지목된 선생님 {selectedUserIds.length}명에게 요청이 전달됩니다.
        </p>
        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
            {error}
          </div>
        )}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleClose}
            className="flex-1 py-3 rounded-lg border border-seoltab-sub text-seoltab-dark font-medium hover:bg-seoltab-gray"
          >
            취소
          </button>
          <button
            onClick={handleConfirm}
            disabled={loading}
            className="flex-1 py-3 rounded-lg bg-seoltab-blue text-white font-medium hover:bg-seoltab-purple disabled:opacity-60 transition-colors"
          >
            {loading ? "처리 중..." : "제출하기"}
          </button>
        </div>
      </div>
    </div>
  );
}
